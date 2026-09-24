import React, { useState } from 'react';
import { ViewName } from '../types';
import { useCart } from '../context/CartContext';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  ShieldCheck,
  ArrowLeft,
  Truck
} from 'lucide-react';

interface CartViewProps {
  onNavigate: (view: ViewName, productId?: string) => void;
}

export const CartView: React.FC<CartViewProps> = ({ onNavigate }) => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    deliveryFee,
    total,
    couponCode,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-slate-700">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">আপনার শপিং ব্যাগ বর্তমানে খালি</h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
          আপনার প্রয়োজনীয় এলইডি টিভি ডিসপ্লে পার্টস, মাদারবোর্ড বা ফ্রিজের ইনভার্টার পিসিবি ব্রাউজ করুন।
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="mt-6 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
        >
          পার্টস শপে যান
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-cyan-400 mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>পার্টস শপে ফিরে যান</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white">
            শপিং ব্যাগ ({items.length}টি পণ্য)
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 flex items-center gap-1 cursor-pointer font-semibold"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>ব্যাগ খালি করুন</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div
                  onClick={() => onNavigate('product-detail', product.id)}
                  className="w-20 h-20 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0 flex items-center justify-center p-1.5 cursor-pointer"
                >
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
                  <span className="text-[11px] font-mono text-blue-700 dark:text-cyan-400 font-bold uppercase">{product.brand}</span>
                  <h3
                    onClick={() => onNavigate('product-detail', product.id)}
                    className="text-sm font-bold text-slate-900 dark:text-white hover:text-blue-700 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    {product.nameBn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{product.name}</p>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">ওয়ারেন্টি: {product.warranty}</div>
                </div>
              </div>

              {/* Quantity Stepper & Price */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                <div className="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-slate-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-blue-700 dark:text-cyan-400 font-mono tabular-nums">
                    ৳{(product.price * quantity).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    ৳{product.price.toLocaleString()} প্রতি পিস
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-5 sticky top-24">
          <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            অর্ডার সামারি
          </h2>

          {/* Coupon */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                placeholder="কুপন কোড (যেমন: MMNEW10)"
                className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white uppercase placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400"
              />
            </div>
            {couponCode ? (
              <button
                onClick={removeCoupon}
                className="px-3 py-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-200 dark:border-rose-800 cursor-pointer"
              >
                বাতিল
              </button>
            ) : (
              <button
                onClick={() => {
                  if (inputCoupon) applyCoupon(inputCoupon);
                }}
                className="px-3 py-2 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 cursor-pointer"
              >
                প্রয়োগ
              </button>
            )}
          </div>

          {couponCode && (
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
              <span>কুপন '{couponCode}' সক্রিয়</span>
              <span>-৳{discount}</span>
            </div>
          )}

          {/* Breakdown */}
          <div className="flex flex-col gap-2.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between">
              <span>সাবটোটাল</span>
              <span className="text-slate-900 dark:text-white font-mono font-bold tabular-nums">৳{subtotal.toLocaleString()}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>কুপন ডিসকাউন্ট</span>
                <span className="font-mono tabular-nums">-৳{discount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>ডেলিভারি চার্জ</span>
              <span className="text-slate-900 dark:text-white font-mono">
                {deliveryFee === 0 ? 'ফ্রি (৳২৫০০+ অফার)' : `৳${deliveryFee}`}
              </span>
            </div>

            <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-3 border-t border-slate-100 dark:border-slate-800">
              <span>সর্বমোট প্রদেয়</span>
              <span className="text-blue-700 dark:text-cyan-400 font-heading font-black text-xl tabular-nums">
                ৳{total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
            <span className="font-bold block mb-0.5">⚠️ কেনা-বেচা সাময়িক স্থগিত</span>
            সরাসরি খুচরা পার্টস বিক্রয় বন্ধ রয়েছে। আপনি এই পার্টসগুলো আপনার ডিভাইসে ফিটিং করাতে ল্যাব সার্ভিস বুক করতে পারেন।
          </div>

          <button
            onClick={() => onNavigate('service-booking')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>মেরামত সার্ভিস বুকিং দিন</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
            <span>১০০% নিরাপদ ট্রানজেকশন ও মানসম্মত পার্টস</span>
          </div>
        </div>
      </div>
    </div>
  );
};
