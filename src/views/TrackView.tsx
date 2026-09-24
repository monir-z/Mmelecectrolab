import React, { useState, useEffect } from 'react';
import { ViewName, Order, ServiceBooking } from '../types';
import { useOrders } from '../context/OrderContext';
import { RepairProgressStepper } from '../components/common/RepairProgressStepper';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  Wrench,
  ShieldCheck,
  AlertCircle,
  MapPin,
  Phone,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { STORE_INFO } from '../data/initialData';

interface TrackViewProps {
  initialTrackingId?: string;
  onNavigate: (view: ViewName) => void;
}

export const TrackView: React.FC<TrackViewProps> = ({ initialTrackingId = '', onNavigate }) => {
  const { getOrderById, getBookingById, bookings, orders } = useOrders();
  const [searchId, setSearchId] = useState<string>(initialTrackingId || (bookings[0]?.id || ''));
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [searchedBooking, setSearchedBooking] = useState<ServiceBooking | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (initialTrackingId) {
      handleSearch(initialTrackingId);
    } else if (bookings.length > 0 && bookings[0].id) {
      setSearchId(bookings[0].id);
      handleSearch(bookings[0].id);
    }
  }, [initialTrackingId, bookings]);

  const handleSearch = async (idToSearch?: string) => {
    const query = (idToSearch || searchId).trim().toUpperCase();
    if (!query) return;

    setIsSearching(true);
    let order = getOrderById(query);
    let booking = getBookingById(query);

    // If not in local context, fetch live from Firestore service_requests and bookings
    if (!booking) {
      try {
        const srvSnap = await getDoc(doc(db, 'service_requests', query));
        if (srvSnap.exists()) {
          booking = { id: srvSnap.id, ...srvSnap.data() } as ServiceBooking;
        } else {
          const bkgSnap = await getDoc(doc(db, 'bookings', query));
          if (bkgSnap.exists()) {
            booking = { id: bkgSnap.id, ...bkgSnap.data() } as ServiceBooking;
          }
        }
      } catch (err) {
        console.warn('TrackView Firestore lookup:', err);
      }
    }

    setSearchedOrder(order || null);
    setSearchedBooking(booking || null);
    setHasSearched(true);
    setIsSearching(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-24">
      {/* Title Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-time Lab Tracker</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white">
          সার্ভিস ও অর্ডার লাইভ ট্র্যাকিং
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          আপনার সার্ভিস টোকেন বা পার্টস অর্ডার নম্বর দিয়ে ৫টি ধাপের অগ্রগতি রিয়েলটাইমে ট্র্যাক করুন।
        </p>
      </div>

      {/* Search Input Box */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm mb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="ট্র্যাকিং আইডি লিখুন (যেমন: SRV-4120 বা MM-8821)"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-[#1F2937] text-xs sm:text-sm text-slate-900 dark:text-white font-mono uppercase placeholder-slate-400 focus:bg-white dark:focus:bg-[#090D16] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-900/20 transition-all cursor-pointer whitespace-nowrap active:scale-98"
          >
            স্ট্যাটাস ট্র্যাক করুন
          </button>
        </form>

        {/* Dynamic Quick Search Suggestions */}
        {bookings.length > 0 || orders.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-[#1F2937]">
            <span className="font-medium text-[11px]">সাম্প্রতিক আইডি:</span>

            {bookings.slice(0, 3).map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setSearchId(b.id);
                  handleSearch(b.id);
                }}
                className="font-mono text-cyan-600 dark:text-cyan-400 font-bold hover:underline bg-cyan-50 dark:bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-200 dark:border-cyan-900/60 cursor-pointer text-[11px]"
              >
                #{b.id} ({b.deviceType})
              </button>
            ))}

            {orders.slice(0, 2).map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setSearchId(o.id);
                  handleSearch(o.id);
                }}
                className="font-mono text-blue-600 dark:text-blue-400 font-bold hover:underline bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-900/60 cursor-pointer text-[11px]"
              >
                #{o.id} (অর্ডার)
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Result Display */}
      {hasSearched && (
        <div className="space-y-6">
          {/* Service Booking Tracking Result */}
          {searchedBooking && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* The 5-Step Visual Stepper Component */}
              <RepairProgressStepper
                status={searchedBooking.status}
                trackingId={searchedBooking.id}
                deviceTitle={`${searchedBooking.deviceType} (${searchedBooking.brand})`}
                technicianNotes={searchedBooking.technicianNotes}
                showDetails={true}
              />

              {/* Service Booking Info Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm">
                <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-[#1F2937] gap-3">
                  <div>
                    <span className="text-xs text-cyan-600 dark:text-cyan-400 font-mono font-bold block">
                      সার্ভিস ল্যাব টোকেন
                    </span>
                    <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                      {searchedBooking.id}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                      আনুমানিক খরচ
                    </span>
                    <span className="text-sm font-bold text-blue-600 dark:text-cyan-400 font-mono">
                      {searchedBooking.estimatedCostRange || '৳১,৫০০ - ৩,০০০'}
                    </span>
                  </div>
                </div>

                {/* Technician Notes Box */}
                {searchedBooking.technicianNotes && (
                  <div className="p-4 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/50 mb-5 text-xs">
                    <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-300 font-bold mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>ল্যাব ইঞ্জিনিয়ারের অগ্রগতি নোট:</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {searchedBooking.technicianNotes}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 font-mono">
                      প্রধান টেকনিশিয়ান: {searchedBooking.technicianAssigned || 'মোঃ রবিউল ইসলাম (BTEB Certified)'}
                    </p>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block font-medium">গ্রাহকের নাম:</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {searchedBooking.customerName} ({searchedBooking.phone})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block font-medium">ডিভাইস ও মডেল:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {searchedBooking.deviceType} - {searchedBooking.brand}
                    </span>
                    {searchedBooking.modelNumber && (
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-mono">
                        মডেল: {searchedBooking.modelNumber}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block font-medium">সার্ভিসের ধরন:</span>
                    <span className="text-blue-600 dark:text-cyan-400 font-bold">
                      {searchedBooking.serviceType === 'lab_drop' ? 'সিঙ্গার প্লাজা ল্যাব ড্রপ' : 'অন-সাইট হোম সার্ভিস'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block font-medium">ঠিকানা ও এলাকা:</span>
                    <span className="text-slate-900 dark:text-white">
                      {searchedBooking.address}, {searchedBooking.upazila}
                    </span>
                  </div>
                  <div className="sm:col-span-2 pt-2 border-t border-slate-100 dark:border-[#1F2937]">
                    <span className="text-slate-500 dark:text-slate-400 block font-medium">গ্রাহকের সমস্যা বিবরণ:</span>
                    <p className="text-slate-800 dark:text-slate-200 mt-0.5">{searchedBooking.issueDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Order Tracking Result */}
          {searchedOrder && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Stepper for Order Processing & Testing */}
              <RepairProgressStepper
                status={
                  searchedOrder.orderStatus === 'delivered'
                    ? 'ready'
                    : searchedOrder.orderStatus === 'shipped'
                    ? 'testing'
                    : searchedOrder.orderStatus === 'processing'
                    ? 'repairing'
                    : 'received'
                }
                trackingId={searchedOrder.id}
                deviceTitle={`অর্ডার #${searchedOrder.id} — ল্যাব প্যাকেজিং ও ডেলিভারি`}
                showDetails={true}
              />

              {/* Order Info Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm">
                <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-[#1F2937] gap-3">
                  <div>
                    <span className="text-xs text-blue-600 dark:text-cyan-400 font-mono font-bold block">
                      অর্ডার ট্র্যাকিং নম্বর
                    </span>
                    <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                      {searchedOrder.id}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                      আনুমানিক ডেলিভারি
                    </span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {searchedOrder.deliveryDateEstimate || 'আজ বা আগামীকাল'}
                    </span>
                  </div>
                </div>

                {/* Customer & Item details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 dark:text-slate-300">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">গ্রাহকের ঠিকানা:</h4>
                    <p className="font-semibold text-slate-900 dark:text-white">{searchedOrder.customerName}</p>
                    <p className="text-slate-500 dark:text-slate-400 font-mono">{searchedOrder.phone}</p>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                      {searchedOrder.address}, {searchedOrder.upazila}, {searchedOrder.district}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">অর্ডারের আইটেম সমূহ:</h4>
                    <div className="flex flex-col gap-2">
                      {searchedOrder.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center bg-slate-50 dark:bg-[#090D16] p-2.5 rounded-lg border border-slate-200 dark:border-[#1F2937]"
                        >
                          <span className="text-slate-800 dark:text-slate-200 line-clamp-1">
                            {item.product.nameBn}
                          </span>
                          <span className="font-mono text-blue-600 dark:text-cyan-400 font-bold shrink-0 ml-2">
                            x{item.quantity} (৳{(item.product.price * item.quantity).toLocaleString()})
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center font-bold text-slate-900 dark:text-white mt-3 pt-2 border-t border-slate-100 dark:border-[#1F2937]">
                      <span>সর্বমোট প্রদেয়:</span>
                      <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm">
                        ৳{searchedOrder.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Not Found View */}
          {!searchedOrder && !searchedBooking && (
            <div className="p-10 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] text-center shadow-sm">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">কোনো রেকর্ড পাওয়া যায়নি</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                '{searchId}' আইডির কোনো রেকর্ড পাওয়া যায়নি। অনুগ্রহ করে সঠিক টোকেন বা অর্ডার নম্বর দিন অথবা উপরের ডেমো বাটনে ক্লিক করুন।
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
