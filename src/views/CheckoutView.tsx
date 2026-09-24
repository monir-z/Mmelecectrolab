import React, { useState } from 'react';
import { ViewName, PaymentMethod } from '../types';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { STORE_INFO } from '../data/initialData';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

interface CheckoutViewProps {
  onNavigate: (view: ViewName, orderId?: string) => void;
}

const DISTRICTS = ['গাইবান্ধা', 'রংপুর', 'বগুড়া', 'দিনাজপুর', 'কুড়িগ্রাম', 'নীলফামারী', 'ঢাকা', 'অন্যান্য'];

const UPAZILAS = [
  'সুন্দরগঞ্জ (Sundarganj)',
  'গাইবান্ধা সদর (Gaibandha Sadar)',
  'সাদুল্লাপুর (Sadullapur)',
  'পলাশবাড়ী (Palashbari)',
  'গোবিন্দগঞ্জ (Gobindaganj)',
  'সাঘাটা (Saghata)',
  'ফুলছড়ি (Fulchhari)',
  'অন্যান্য উপজেলা (Other)'
];

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onNavigate }) => {
  const { items, subtotal, discount, deliveryFee, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { showToast } = useToast();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('গাইবান্ধা');
  const [upazila, setUpazila] = useState('সুন্দরগঞ্জ (Sundarganj)');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [senderPhone, setSenderPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500">চেকআউট করার জন্য আপনার কার্টে কোনো পণ্য নেই।</p>
        <button
          onClick={() => onNavigate('shop')}
          className="mt-4 px-5 py-2.5 rounded-xl bg-blue-700 text-white text-xs font-bold"
        >
          শপে ফিরে যান
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      showToast('অনুগ্রহ করে গ্রাহকের পুরো নাম লিখুন', 'warning');
      return;
    }
    if (!phone.trim() || phone.length < 11) {
      showToast('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন', 'warning');
      return;
    }
    if (!address.trim()) {
      showToast('ডেলিভারি ঠিকানা উল্লেখ করুন', 'warning');
      return;
    }

    if (paymentMethod !== 'cod') {
      if (!transactionId.trim() || transactionId.length < 5) {
        showToast('অনুগ্রহ করে সঠিক ট্রানজেকশন আইডি (TrxID) দিন', 'warning');
        return;
      }
    }

    setIsSubmitting(true);

    const orderId = addOrder({
      customerName,
      phone,
      address,
      district,
      upazila,
      items,
      subtotal,
      discount,
      deliveryFee,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'cod' : 'pending_verification',
      orderStatus: 'received',
      transactionId: transactionId || undefined,
      deliveryDateEstimate: '২-৩ কার্যদিবস'
    });

    clearCart();
    setIsSubmitting(false);
    onNavigate('order-success', orderId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => onNavigate('cart')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>কার্টে ফিরে যান</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Checkout Form (7 cols) */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 flex flex-col gap-6">
          {/* Section 1: Customer Details */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
            <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Truck className="w-4 h-4 text-blue-700 dark:text-cyan-400" />
              <span>১. ডেলিভারি ঠিকানা ও তথ্য</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">গ্রাহকের পূর্ণ নাম *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="যেমন: মোঃ আল-আমিন সরকার"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-mono placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">জেলা</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 cursor-pointer"
                >
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">উপজেলা / থানা</label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 cursor-pointer"
                >
                  {UPAZILAS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">বিস্তারিত ঠিকানা (গ্রাম / রোড / ল্যান্ডমার্ক) *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="যেমন: সিঙ্গার প্লাজার পূর্ব পাশে, সুন্দরগঞ্জ বাজার"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">বিশেষ কোনো নির্দেশনা (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="যেমন: দুপুরের পর ডেলিভারি দিন"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
            <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <CreditCard className="w-4 h-4 text-blue-700 dark:text-cyan-400" />
              <span>২. মূল্য পরিশোধের মাধ্যম নির্বাচন</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* bKash */}
              <label
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'bkash'
                    ? 'bg-pink-50 dark:bg-pink-950/40 border-pink-500 ring-2 ring-pink-500/20'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bkash"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="accent-pink-600"
                  />
                  <div>
                    <span className="text-xs font-bold block text-pink-700 dark:text-pink-400">bKash (বিকাশ)</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">01760655650</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-pink-700 dark:text-pink-400">bKash</span>
              </label>

              {/* Nagad */}
              <label
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'nagad'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/20'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="nagad"
                    checked={paymentMethod === 'nagad'}
                    onChange={() => setPaymentMethod('nagad')}
                    className="accent-amber-600"
                  />
                  <div>
                    <span className="text-xs font-bold block text-amber-700 dark:text-amber-400">Nagad (নগদ)</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">01760655650</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">Nagad</span>
              </label>

              {/* Rocket */}
              <label
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'rocket'
                    ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/20'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="rocket"
                    checked={paymentMethod === 'rocket'}
                    onChange={() => setPaymentMethod('rocket')}
                    className="accent-purple-600"
                  />
                  <div>
                    <span className="text-xs font-bold block text-purple-700 dark:text-purple-400">Rocket (রকেট)</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">01760655650</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400">Rocket</span>
              </label>

              {/* Cash On Delivery */}
              <label
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-emerald-600"
                  />
                  <div>
                    <span className="text-xs font-bold block text-emerald-800 dark:text-emerald-300">ক্যাশ অন ডেলিভারি</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">পণ্য হাতে পেয়ে মূল্য দিন</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">COD</span>
              </label>
            </div>

            {/* MFS Instructions if bKash / Nagad / Rocket */}
            {paymentMethod !== 'cod' && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col gap-3 text-xs animate-in fade-in duration-200">
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  অনুগ্রহ করে আপনার <strong className="text-slate-900 dark:text-white uppercase">{paymentMethod}</strong> অ্যাপ থেকে
                  পার্সোনাল নম্বর <span className="text-blue-700 dark:text-cyan-400 font-mono font-bold">01760655650</span> এ
                  <strong className="text-slate-900 dark:text-white"> 'Send Money' </strong> করুন মোট পরিমাণ:
                  <span className="text-blue-700 dark:text-cyan-400 font-mono font-bold ml-1">৳{total.toLocaleString()}</span>।
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] text-slate-600 dark:text-slate-300 block mb-1">প্রেরকের মোবাইল নম্বর</label>
                    <input
                      type="tel"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-mono placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 dark:text-slate-300 block mb-1">ট্রানজেকশন আইডি (TrxID) *</label>
                    <input
                      type="text"
                      required
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="যেমন: 9J7A6B8C"
                      className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-mono uppercase placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="py-4 px-6 rounded-2xl bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Lock className="w-4 h-4" />
            <span>অর্ডারটি নিশ্চিত করুন (৳{total.toLocaleString()})</span>
          </button>
        </form>

        {/* Order Summary on Right (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4 sticky top-24">
          <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            আপনার অর্ডারের আইটেম ({items.length})
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto pr-1">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 dark:bg-slate-900 p-1 shrink-0 flex items-center justify-center border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <OptimizedImage
                      src={product.imageUrl}
                      alt={product.name}
                      objectFit="contain"
                      containerClassName="w-full h-full"
                      className="max-w-full max-h-full object-contain"
                      fallbackSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-1">{product.nameBn}</h4>
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">x{quantity}</span>
                  </div>
                </div>

                <span className="font-mono font-bold text-blue-700 dark:text-cyan-400 tabular-nums shrink-0">
                  ৳{(product.price * quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-xs text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between">
              <span>সাবটোটাল</span>
              <span className="text-slate-900 dark:text-white font-mono font-bold tabular-nums">৳{subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>ছাড়</span>
                <span className="font-mono tabular-nums">-৳{discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>কুরিয়ার চার্জ</span>
              <span className="text-slate-900 dark:text-white font-mono font-semibold">
                {deliveryFee === 0 ? 'ফ্রি' : `৳${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>সর্বমোট প্রদেয়</span>
              <span className="text-blue-700 dark:text-cyan-400 font-heading font-black text-xl tabular-nums">
                ৳{total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0 mt-0.5" />
            <span>
              আপনার ব্যক্তিগত তথ্য এনক্রিপ্ট করে সংরক্ষণ করা হয়। কোনো ত্রুটিযুক্ত পণ্য পেলে ৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি।
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
