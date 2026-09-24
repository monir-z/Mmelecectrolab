import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { COUPONS } from '../data/initialData';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string>(() => {
    try {
      return localStorage.getItem('mm_coupon') || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('mm_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('mm_coupon', couponCode);
    } catch (e) {
      console.error(e);
    }
  }, [couponCode]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`${product.nameBn} কার্টে যোগ করা হয়েছে`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('পণ্যটি কার্ট থেকে সরানো হয়েছে', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  if (couponCode && COUPONS[couponCode.toUpperCase()]) {
    const coupon = COUPONS[couponCode.toUpperCase()];
    if (subtotal >= coupon.minOrder) {
      discount = Math.min(
        Math.round((subtotal * coupon.discountPercent) / 100),
        coupon.maxDiscount
      );
    }
  }

  // Delivery fee: free for orders >= 2500, else 60 BDT default
  const deliveryFee = subtotal > 0 ? (subtotal >= 2500 ? 0 : 60) : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (!COUPONS[cleanCode]) {
      showToast('ভুল কুপন কোড! দয়া করে সঠিক কোড দিন', 'error');
      return false;
    }
    const coupon = COUPONS[cleanCode];
    if (subtotal < coupon.minOrder) {
      showToast(`এই কুপনটি প্রযোজ্য হতে ন্যূনতম ৳${coupon.minOrder} টাকার অর্ডার প্রয়োজন`, 'warning');
      return false;
    }
    setCouponCode(cleanCode);
    showToast(`কুপন কোড '${cleanCode}' সফলভাবে প্রয়োগ করা হয়েছে!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setCouponCode('');
    showToast('কুপন বাতিল করা হয়েছে', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        deliveryFee,
        total,
        couponCode,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
