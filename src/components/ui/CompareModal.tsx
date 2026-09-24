import React from 'react';
import { ViewName } from '../../types';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import { OptimizedImage } from './OptimizedImage';
import { X, Trash2, ShoppingBag, Check, ShieldCheck } from 'lucide-react';

interface CompareModalProps {
  onNavigate: (view: ViewName, productId?: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ onNavigate }) => {
  const { compareProducts, isCompareModalOpen, setIsCompareModalOpen, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  if (!isCompareModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsCompareModalOpen(false)}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
          <div>
            <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
              পণ্য তুলনা ({compareProducts.length}/4)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">স্পেসিফিকেশন ও ওয়ারেন্টি পাশাপাশি যাচাই করুন</p>
          </div>

          <div className="flex items-center gap-3">
            {compareProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>সব মুছুন</span>
              </button>
            )}

            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {compareProducts.length === 0 ? (
          <div className="py-12 text-center text-slate-500 dark:text-slate-400">
            তুলনা করার জন্য কোনো পণ্য যোগ করা হয়নি।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-3 bg-slate-50 dark:bg-slate-900 w-1/4 border border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-200">বৈশিষ্ট্য</th>
                  {compareProducts.map((p) => (
                    <th key={p.id} className="p-3 bg-white dark:bg-[#0B1528] w-1/4 border border-slate-200 dark:border-slate-800 align-top">
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="w-20 h-20 rounded-xl bg-slate-50 dark:bg-slate-900/90 p-1.5 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden">
                          <OptimizedImage
                            src={p.imageUrl}
                            alt={p.name}
                            objectFit="contain"
                            containerClassName="w-full h-full"
                            className="max-h-full max-w-full object-contain"
                            fallbackSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80"
                          />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white line-clamp-1">{p.nameBn}</span>
                        <span className="font-mono text-blue-700 dark:text-cyan-400 font-bold">৳{p.price.toLocaleString()}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => addToCart(p, 1)}
                            className="p-1.5 bg-blue-700 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-800 dark:hover:bg-blue-500 cursor-pointer"
                            title="কার্টে নিন"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="p-1.5 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-lg border border-rose-200 dark:border-rose-800 hover:bg-rose-100 cursor-pointer"
                            title="তুলনা থেকে বাদ দিন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white">ব্র্যান্ড</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 border border-slate-200 dark:border-slate-800 font-mono font-bold text-blue-700 dark:text-cyan-400 text-center">
                      {p.brand}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white">ক্যাটাগরি</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 border border-slate-200 dark:border-slate-800 text-center font-mono">
                      {p.category}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white">ওয়ারেন্টি</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 border border-slate-200 dark:border-slate-800 text-center text-teal-700 dark:text-teal-400 font-semibold">
                      {p.warranty}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white">রেটিং</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 border border-slate-200 dark:border-slate-800 text-center font-bold text-amber-600 dark:text-amber-400 font-mono">
                      ★ {p.rating} / 5
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white">জেনুইন পার্টস</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-3 border border-slate-200 dark:border-slate-800 text-center">
                      {p.badge ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{p.badge}</span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">গ্রেড-এ সামঞ্জস্যপূর্ণ</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
