import React from 'react';
import { ViewName } from '../../types';
import { useCart } from '../../context/CartContext';
import { OptimizedImage } from './OptimizedImage';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (view: ViewName) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    discount,
    deliveryFee,
    total
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#0B1528] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-700 dark:text-cyan-400" />
              <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                শপিং ব্যাগ ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100 dark:divide-slate-800/80">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">আপনার ব্যাগ খালি</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[200px]">
                  প্রয়োজনীয় ডিসপ্লে বা সার্কিট পার্টস খুঁজে ব্যাগে যুক্ত করুন।
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('shop');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-blue-700 dark:bg-blue-600 text-white text-xs font-bold"
                >
                  শপে যান
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div key={product.id} className="py-4 flex gap-3 items-center">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-slate-50 dark:bg-slate-900/90 p-1.5 shrink-0 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden">
                    <OptimizedImage
                      src={product.imageUrl}
                      alt={product.name}
                      objectFit="contain"
                      containerClassName="w-full h-full"
                      className="max-h-full max-w-full object-contain"
                      fallbackSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-blue-700 dark:text-cyan-400 uppercase font-bold">
                      {product.brand}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {product.nameBn}
                    </h4>
                    <div className="text-xs font-bold font-mono text-slate-900 dark:text-white mt-1">
                      ৳{(product.price * quantity).toLocaleString()}
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 hover:text-blue-700 dark:hover:text-cyan-400 text-slate-600 dark:text-slate-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-slate-900 dark:text-white">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 hover:text-blue-700 dark:hover:text-cyan-400 text-slate-600 dark:text-slate-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 transition-colors"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070D18] flex flex-col gap-3">
              <div className="flex flex-col gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">৳{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>ডিসকাউন্ট</span>
                    <span className="font-mono font-bold">-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ</span>
                  <span className="font-mono text-slate-900 dark:text-white">
                    {deliveryFee === 0 ? 'ফ্রি' : `৳${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>সর্বমোট প্রদেয়</span>
                  <span className="text-blue-700 dark:text-cyan-400 font-mono text-base">৳{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
                  <span className="font-bold block">⚠️ কেনা-বেচা অফ নোটিশ</span>
                  বর্তমানে সরাসরি কেনা-বেচা স্থগিত। শুধুমাত্র ল্যাব রিপেয়ার সার্ভিস চালু আছে।
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('service-booking');
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>ল্যাব মেরামত বুকিং দিন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1 mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>নিরাপদ পেমেন্ট ও ৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
