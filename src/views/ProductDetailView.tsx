import React, { useState } from 'react';
import { ViewName, Product } from '../types';
import { PRODUCTS_DATA } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { ProductCard } from '../components/ui/ProductCard';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import {
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowLeft,
  Share2,
  Cpu,
  ChevronRight,
  Plus,
  Minus,
  Wrench,
  Phone
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { STORE_INFO } from '../data/initialData';
import { useSocialMeta } from '../hooks/useSocialMeta';

interface ProductDetailViewProps {
  productId: string;
  onNavigate: (view: ViewName, productId?: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  productId,
  onNavigate
}) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare } = useCompare();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc'>('specs');

  const product = PRODUCTS_DATA.find((p) => p.id === productId) || PRODUCTS_DATA[0];

  // Dynamic OpenGraph and Twitter cards for social sharing
  useSocialMeta({
    title: `${product.name} - ৳${product.price}`,
    description: `${product.nameBn} - ${product.descriptionBn || product.description}`,
    image: product.imageUrl,
  });

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleShare = async () => {
    const shareData = {
      title: `${product.name} | MM ELECTROLAB`,
      text: `${product.nameBn} - ৳${product.price} (MM ELECTROLAB)`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User cancelled or aborted, fallback silently
      }
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('প্রোডাক্ট লিংক কপি করা হয়েছে! WhatsApp বা Facebook-এ শেয়ার করুন', 'info');
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onNavigate('checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
        <button onClick={() => onNavigate('home')} className="hover:text-blue-700 dark:hover:text-cyan-400 cursor-pointer">হোম</button>
        <span>/</span>
        <button onClick={() => onNavigate('shop')} className="hover:text-blue-700 dark:hover:text-cyan-400 cursor-pointer">পার্টস শপ</button>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-semibold line-clamp-1">{product.nameBn}</span>
      </div>

      {/* Main PDP Grid (5 cols / 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        {/* Left: Product Media Gallery (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center justify-center relative">
          <div className="w-full aspect-square flex items-center justify-center p-4">
            <OptimizedImage
              src={product.imageUrl}
              alt={product.name}
              priority
              objectFit="contain"
              containerClassName="w-full h-full flex items-center justify-center"
              className="max-h-full max-w-full object-contain"
              fallbackSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
            />
          </div>

          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.badge && (
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {product.badge}
              </span>
            )}
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800">
              {product.brand}
            </span>
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product.id, product.nameBn)}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                  : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:text-rose-600 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => addToCompare(product)}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 border-blue-200 dark:border-blue-800'
                  : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:text-blue-600 border-slate-200 dark:border-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Buy Box & Configuration (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-700 dark:text-cyan-400 uppercase font-bold mb-1">
              <span>{product.brand}</span>
              <span>•</span>
              <span>{product.category}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white leading-snug">
              {product.nameBn}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-1">{product.name}</p>

            {/* Ratings & Warranty */}
            <div className="flex flex-wrap items-center gap-4 text-xs mt-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-mono font-bold text-slate-900 dark:text-white">{product.rating}</span>
                <span className="text-slate-400 dark:text-slate-500">({product.reviewsCount} কাস্টমার রিভিউ)</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <div className="flex items-center gap-1 text-teal-700 dark:text-teal-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>{product.warranty}</span>
              </div>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black font-heading text-blue-700 dark:text-cyan-400 font-mono">
                ৳{product.price.toLocaleString()}
              </span>
              {product.regularPrice && product.regularPrice > product.price && (
                <span className="text-base text-slate-400 dark:text-slate-500 font-mono line-through">
                  ৳{product.regularPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                ইন স্টক ({product.stockCount} টি ল্যাবে প্রস্তুত)
              </span>
            </div>

            {/* Service Replacement Booking CTA */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                <span className="font-bold block mb-0.5">⚠️ কেনা-বেচা অফ নোটিশ:</span>
                খুচরা পার্টস সরাসরি বিক্রয় সাময়িকভাবে বন্ধ আছে। আমাদের টেকনিশিয়ান দ্বারা আপনার ডিভাইসে এই পার্টসটির প্রফেশনাল ফিটিং ও মেরামত করাতে সার্ভিস বুকিং দিন।
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('service-booking')}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Wrench className="w-4 h-4 text-cyan-200" />
                  <span>এই পার্টসের সার্ভিস বুকিং দিন</span>
                </button>

                <a
                  href={`tel:${STORE_INFO.phone1}`}
                  className="py-3.5 px-5 rounded-xl border border-slate-300 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-800 dark:text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>কল দিয়ে পরামর্শ নিন</span>
                </a>
              </div>
            </div>
          </div>

          {/* Delivery & Trust Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Truck className="w-5 h-5 text-blue-700 dark:text-cyan-400 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">কুরিয়ার ডেলিভারি</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">সুন্দরগঞ্জ ও সারাদেশে</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">৭ দিনের রিপ্লেসমেন্ট</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">কোনো ত্রুটি থাকলে ফ্রি চেঞ্জ</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">ল্যাব ভেরিফাইড</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">টেকনিশিয়ান দ্বারা পরীক্ষিত</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specs, Description */}
      <div className="bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-16">
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8 mb-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-bold transition-colors cursor-pointer ${
              activeTab === 'specs'
                ? 'text-blue-700 dark:text-cyan-400 border-b-2 border-blue-600 dark:border-cyan-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            টেকনিক্যাল স্পেসিফিকেশন
          </button>
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-3 text-sm font-bold transition-colors cursor-pointer ${
              activeTab === 'desc'
                ? 'text-blue-700 dark:text-cyan-400 border-b-2 border-blue-600 dark:border-cyan-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            বিস্তারিত বিবরণ
          </button>
        </div>

        {activeTab === 'specs' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {product.specs.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-900/40' : 'bg-white dark:bg-[#0B1528]'}>
                    <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300 w-1/3">{item.label}</td>
                    <td className="py-3 px-4 font-mono text-slate-900 dark:text-white">{item.value}</td>
                  </tr>
                ))}
                {product.tags && product.tags.length > 0 && (
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">উপযোগী ট্যাগ ও সামঞ্জস্য</td>
                    <td className="py-3 px-4 text-slate-800 dark:text-slate-200">
                      {product.tags.join(', ')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'desc' && (
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex flex-col gap-3">
            <p>{product.descriptionBn}</p>
            <p className="text-slate-500 dark:text-slate-400 font-mono text-xs">{product.description}</p>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-6">
            একই ক্যাটাগরির অন্যান্য পার্টস
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
