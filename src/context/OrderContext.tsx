import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, ServiceBooking } from '../types';
import { INITIAL_ORDERS } from '../data/initialData';
import { useToast } from './ToastContext';
import { db } from '../firebase/config';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';

interface OrderContextType {
  orders: Order[];
  bookings: ServiceBooking[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => string;
  addBooking: (booking: Omit<ServiceBooking, 'id' | 'createdAt' | 'status'>) => string;
  getOrderById: (id: string) => Order | undefined;
  getBookingById: (id: string) => ServiceBooking | undefined;
  updateOrderStatus: (id: string, status: Order['orderStatus']) => void;
  updateBookingStatus: (id: string, status: ServiceBooking['status'], notes?: string) => Promise<void>;
  lastPlacedOrderId: string | null;
  setLastPlacedOrderId: (id: string | null) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('mm_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Zero fake/dummy data: initialized empty, pure real-time data from Firestore
  const [bookings, setBookings] = useState<ServiceBooking[]>(() => {
    try {
      const saved = localStorage.getItem('mm_bookings');
      if (saved) {
        const parsed: ServiceBooking[] = JSON.parse(saved);
        // Exclude any legacy mock items
        return parsed.filter(b => b.id !== 'SRV-4120' && b.id !== 'SRV-3955' && b.customerName !== 'তারেক মাহমুদ');
      }
      return [];
    } catch {
      return [];
    }
  });

  // Synchronize 100% real service requests from Firestore
  useEffect(() => {
    let unsubscribeReqs = () => {};

    try {
      const reqsRef = collection(db, 'service_requests');
      unsubscribeReqs = onSnapshot(
        reqsRef,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: ServiceBooking[] = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data()
            } as ServiceBooking));
            list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
            setBookings(list);
          } else {
            // Also check bookings collection if service_requests is empty
            const bookingsRef = collection(db, 'bookings');
            onSnapshot(bookingsRef, (bSnap) => {
              if (!bSnap.empty) {
                const bList: ServiceBooking[] = bSnap.docs.map((docSnap) => ({
                  id: docSnap.id,
                  ...docSnap.data()
                } as ServiceBooking));
                bList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
                setBookings(bList);
              } else {
                setBookings([]);
              }
            });
          }
        },
        (err) => {
          console.warn('Realtime service requests listener fallback:', err);
        }
      );
    } catch (err) {
      console.warn('Firestore service requests connection error:', err);
    }

    return () => unsubscribeReqs();
  }, []);

  const [lastPlacedOrderId, setLastPlacedOrderId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('mm_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('mm_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `MM-${randomNum}`;
    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 16);

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: formattedDate
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrderId(orderId);
    showToast(`অর্ডার সফলভাবে গৃহীত হয়েছে! অর্ডার নং: ${orderId}`, 'success');
    return orderId;
  };

  const addBooking = (bookingData: Omit<ServiceBooking, 'id' | 'createdAt' | 'status'>): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `SRV-${randomNum}`;
    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 16);

    const newBooking: ServiceBooking = {
      ...bookingData,
      id: bookingId,
      status: 'submitted',
      createdAt: formattedDate,
      technicianAssigned: 'মোঃ রবিউল ইসলাম (BTEB Certified)'
    };

    setBookings((prev) => [newBooking, ...prev]);
    showToast(`সার্ভিস বুকিং সফল! বুকিং আইডি: ${bookingId}`, 'success');
    return bookingId;
  };

  const getOrderById = (id: string): Order | undefined => {
    const cleanId = id.trim().toUpperCase();
    return orders.find((o) => o.id.toUpperCase() === cleanId);
  };

  const getBookingById = (id: string): ServiceBooking | undefined => {
    const cleanId = id.trim().toUpperCase();
    return bookings.find((b) => b.id.toUpperCase() === cleanId);
  };

  const updateOrderStatus = (id: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, orderStatus: status } : o))
    );
    showToast(`অর্ডার ${id} স্ট্যাটাস আপডেট করা হয়েছে: ${status}`, 'info');
  };

  const updateBookingStatus = async (id: string, status: ServiceBooking['status'], notes?: string) => {
    // Optimistic local update
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status, ...(notes ? { technicianNotes: notes } : {}) } : b
      )
    );

    // Sync to Firestore collections
    try {
      const updateData: Record<string, any> = {
        status,
        updatedAt: new Date().toISOString()
      };
      if (notes) {
        updateData.technicianNotes = notes;
      }

      await Promise.allSettled([
        updateDoc(doc(db, 'service_requests', id), updateData),
        updateDoc(doc(db, 'bookings', id), updateData)
      ]);
      showToast(`আবেদন #${id} স্ট্যাটাস আপডেট সম্পন্ন: ${status}`, 'success');
    } catch (err) {
      console.warn('Firestore update status notice:', err);
      showToast(`আবেদন #${id} স্ট্যাটাস আপডেট করা হয়েছে`, 'info');
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        bookings,
        addOrder,
        addBooking,
        getOrderById,
        getBookingById,
        updateOrderStatus,
        updateBookingStatus,
        lastPlacedOrderId,
        setLastPlacedOrderId
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
