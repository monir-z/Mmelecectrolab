import React from 'react';
import { ViewName } from '../types';
import { useOrders } from '../context/OrderContext';
import { STORE_INFO } from '../data/initialData';
import { RepairProgressStepper } from '../components/common/RepairProgressStepper';
import {
  CheckCircle2,
  Package,
  Truck,
  FileText,
  Share2,
  ArrowRight,
  ShieldCheck,
  Printer,
  Wrench,
  Clock,
  MapPin,
  Phone,
  Sparkles
} from 'lucide-react';

interface OrderSuccessViewProps {
  orderId?: string;
  onNavigate: (view: ViewName, orderId?: string) => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({ orderId, onNavigate }) => {
  const { getOrderById, getBookingById, lastPlacedOrderId, orders, bookings } = useOrders();

  const activeId = orderId || lastPlacedOrderId || (orders[0] ? orders[0].id : 'MM-8821');
  const booking = getBookingById(activeId) || (activeId?.startsWith('SRV-') ? bookings.find((b) => b.id === activeId) : undefined);
  const order = !booking ? getOrderById(activeId) || orders[0] : undefined;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppUpdate = () => {
    if (booking) {
      const text = `আসসালামু আলাইকুম, আমি MM ELECTROLAB-এ সার্ভিস বুকিং নিশ্চিত করেছি।\nটোকেন নম্বর: ${booking.id}\nডিভাইস: ${booking.deviceType} (${booking.brand})\nসমস্যা: ${booking.issueDescription}\nনাম: ${booking.customerName}\nমোবাইল: ${booking.phone}`;
      window.open(`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
      return;
    }

    if (order) {
      const text = `আসসালামু আলাইকুম, আমি MM ELECTROLAB-এ নতুন পার্টস অর্ডার সম্পন্ন করেছি।\nঅর্ডার আইডি: ${order.id}\nমোট টাকা: ৳${order.total}\nনাম: ${order.customerName}\nমোবাইল: ${order.phone}`;
      window.open(`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-24">
      {/* Container Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xl">
        {/* Top Success Banner */}
        <div className="text-center pb-8 border-b border-slate-100 dark:border-[#1F2937]">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-800 shadow-md shadow-emerald-500/10">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs font-mono uppercase text-blue-600 dark:text-cyan-400 font-bold tracking-wider">
            {booking ? 'Service Booking Confirmed & Registered' : 'Order Confirmed & Received'}
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white mt-1">
            {booking ? 'আপনার সার্ভিস বুকিং সফলভাবে গৃহীত হয়েছে!' : 'আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে!'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-lg mx-auto leading-relaxed">
            {booking
              ? 'MM ELECTROLAB বেছে নেওয়ার জন্য ধন্যবাদ। আমাদের BTEB সার্টিফাইড টেকনিক্যাল টিম আপনার ডিভাইসটির ডায়াগনোসিস ও সার্ভিসের প্রস্তুতি নিচ্ছে।'
              : 'MM ELECTROLAB বেছে নেওয়ার জন্য ধন্যবাদ। আমাদের টিম পণ্যটি ল্যাব টেস্ট ও প্যাকেজিং সম্পন্ন করে দ্রুততম সময়ে ডেলিভারি নিশ্চিত করবে।'}
          </p>

          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-[#1F2937] font-mono text-sm shadow-xs">
            <span className="text-slate-500 dark:text-slate-400">
              {booking ? 'সার্ভিস টোকেন নম্বর:' : 'অর্ডার নম্বর:'}
            </span>
            <span className="text-blue-600 dark:text-cyan-400 font-bold">
              {booking ? booking.id : order ? order.id : activeId}
            </span>
          </div>
        </div>

        {/* Visual Progress Stepper Section */}
        <div className="my-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {booking ? 'সার্ভিস লাইফসাইকেল ট্র্যাকার (৫টি পর্যায়)' : 'ল্যাব সার্ভিস ও ডেলিভারি অগ্রগতি ট্র্যাকার'}
              </h2>
            </div>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline-block">
              ধাপের বিস্তারিত দেখতে আইকনে ক্লিক করুন
            </span>
          </div>

          <RepairProgressStepper
            status={booking ? booking.status || 'received' : 'received'}
            trackingId={booking ? booking.id : order?.id || activeId}
            deviceTitle={
              booking
                ? `${booking.deviceType} (${booking.brand})`
                : `${order?.items[0]?.product?.nameBn || 'অর্ডারকৃত পণ্য'} — ল্যাব টেস্ট ও প্যাকেজিং`
            }
            technicianNotes={booking?.technicianNotes}
            showDetails={true}
          />
        </div>

        {/* Details Section: Service Booking View */}
        {booking && (
          <div className="py-4 border-t border-slate-100 dark:border-[#1F2937] text-xs text-slate-700 dark:text-slate-300 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-[#090D16] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-[#1F2937]">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block font-medium">গ্রাহকের নাম:</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{booking.customerName}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block font-medium">মোবাইল নম্বর:</span>
                <span className="font-mono text-slate-900 dark:text-white font-semibold text-sm">{booking.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block font-medium">ডিভাইস ও ব্র্যান্ড:</span>
                <span className="text-slate-900 dark:text-white font-semibold">{booking.deviceType} ({booking.brand})</span>
                {booking.modelNumber && (
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-mono">
                    মডেল: {booking.modelNumber}
                  </span>
                )}
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block font-medium">সার্ভিসের ধরন:</span>
                <span className="text-blue-600 dark:text-cyan-400 font-bold">
                  {booking.serviceType === 'lab_drop' ? 'সিঙ্গার প্লাজা ল্যাব ড্রপ' : 'অন-সাইট হোম সার্ভিস'}
                </span>
                {booking.preferredDate && (
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                    তারিখ: {booking.preferredDate} ({booking.preferredTimeSlot || 'সকাল ১০টা - ৫টা'})
                  </span>
                )}
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-slate-200 dark:border-[#1F2937]">
                <span className="text-slate-500 dark:text-slate-400 block font-medium">সমস্যার বিবরণ:</span>
                <p className="text-slate-800 dark:text-slate-200 font-medium mt-0.5">{booking.issueDescription}</p>
              </div>
              <div className="sm:col-span-2 flex items-center justify-between pt-2 border-t border-slate-200 dark:border-[#1F2937]">
                <span className="text-slate-500 dark:text-slate-400">আনুমানিক সার্ভিস খরচ:</span>
                <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold text-sm">
                  {booking.estimatedCostRange || '৳৫০০ - ৩,০০০'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Details Section: Product Order View */}
        {order && (
          <div className="py-4 border-t border-slate-100 dark:border-[#1F2937] flex flex-col gap-6 text-xs text-slate-700 dark:text-slate-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-[#090D16] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-[#1F2937]">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block font-medium">গ্রাহকের নাম:</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{order.customerName}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block font-medium">মোবাইল নম্বর:</span>
                <span className="font-mono text-slate-900 dark:text-white font-semibold text-sm">{order.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block font-medium">ডেলিভারি ঠিকানা:</span>
                <span className="text-slate-900 dark:text-white">{order.address}, {order.upazila}, {order.district}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block font-medium">পেমেন্ট মেথড:</span>
                <span className="text-blue-600 dark:text-cyan-400 font-bold uppercase">{order.paymentMethod}</span>
                {order.transactionId && (
                  <span className="text-slate-500 dark:text-slate-400 font-mono block text-[11px]">
                    TrxID: {order.transactionId}
                  </span>
                )}
              </div>
            </div>

            {/* Items summary */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2.5">অর্ডারের আইটেমসমূহ:</h3>
              <div className="divide-y divide-slate-100 dark:divide-[#1F2937] bg-slate-50 dark:bg-[#090D16] rounded-2xl p-4 border border-slate-200 dark:border-[#1F2937]">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{item.product.nameBn}</span>
                    <span className="font-mono text-blue-600 dark:text-cyan-400 font-bold">
                      {item.quantity} পিস × ৳{item.product.price.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="pt-3 flex justify-between items-center font-bold text-slate-900 dark:text-white text-sm">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span className="text-blue-600 dark:text-cyan-400 font-mono text-base">
                    ৳{order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions Button Row */}
        <div className="pt-6 border-t border-slate-100 dark:border-[#1F2937] flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onNavigate('track', booking ? booking.id : order ? order.id : activeId)}
            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-900/20 active:scale-98 transition-all"
          >
            <Truck className="w-4 h-4" />
            <span>লাইভ স্ট্যাটাস ট্র্যাকিং দেখুন</span>
          </button>

          <button
            onClick={handleWhatsAppUpdate}
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-900/20 active:scale-98 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>হোয়াটসঅ্যাপে স্লিপ পাঠান</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#090D16] dark:hover:bg-[#1F2937] text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer border border-slate-200 dark:border-[#1F2937] active:scale-98 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>রসিদ প্রিন্ট করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
