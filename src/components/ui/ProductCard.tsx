import React from 'react';
import { Product, ViewName } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { Heart, Star } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface ProductCardProps {
  product: Product;
  onNavigate: (view: ViewName, productId?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const discountPercent =
    product.regularPrice && product.regularPrice > product.price
      ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)
      : 0;

  // Single clean badge logic (only 1 badge, no clutter)
  const badgeText =
    discountPercent > 0
      ? `-${discountPercent}%`
      : product.isBestSeller
      ? 'বেস্টসেলার'
      : 'স্টকে আছে';

  const badgeStyle =
    discountPercent > 0
      ? 'bg-rose-600 text-white'
      : product.isBestSeller
      ? 'bg-amber-500 text-white'
      : 'bg-emerald-600 text-white';

  return (
    <div
      onClick={() => onNavigate('product-detail', product.id)}
      className="group card-hover-lift relative rounded-xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800/90 hover:border-blue-500/50 dark:hover:border-cyan-400/50 hover:shadow-xl dark:hover:shadow-cyan-950/30 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* 1. Image Container (Fixed height 135px, Centered, Clean with blur-up) */}
      <div className="relative w-full h-[135px] sm:h-[140px] bg-slate-50 dark:bg-slate-900/50 p-2.5 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800/80">
        <OptimizedImage
          src={product.imageUrl}
          alt={product.nameBn || product.name}
          objectFit="contain"
          containerClassName="w-full h-full flex items-center justify-center"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          fallbackSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80"
        />

        {/* Exactly 1 Single Clean Badge */}
        <span
          className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold tracking-tight shadow-xs ${badgeStyle}`}
        >
          {badgeText}
        </span>

        {/* Minimal Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id, product.nameBn || product.name);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-md shadow-2xs transition-colors cursor-pointer ${
            isWishlisted
              ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
              : 'bg-white/85 dark:bg-slate-800/85 text-slate-400 hover:text-rose-500 border border-slate-200/60 dark:border-slate-700/60'
          }`}
          title="পছন্দের তালিকায় রাখুন"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* 2. Product Details (Compact & Clean) */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand Tag */}
          <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider block mb-1">
            {product.brand}
          </span>

          {/* Single Title: Clear font, max 2 lines */}
          <h3
            className="font-bold text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug h-[34px]"
            title={product.nameBn || product.name}
          >
            {product.nameBn || product.name}
          </h3>

          {/* Compact Rating: "★ ৪.৯ (৪২)" */}
          <div className="flex items-center gap-1 mt-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
            <span className="text-amber-500 font-bold flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
            </span>
            <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* 3. Pricing & Compact Order Button */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-black font-mono text-slate-900 dark:text-white leading-none">
                ৳{product.price.toLocaleString()}
              </span>
              {discountPercent > 0 && product.regularPrice && (
                <span className="text-[10px] text-slate-400 line-through font-mono leading-none">
                  ৳{product.regularPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium leading-none mt-1">
              ফিটিংসহ
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('product-detail', product.id);
            }}
            className="h-7 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[11px] font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center whitespace-nowrap"
          >
            অর্ডার
          </button>
        </div>
      </div>
    </div>
  );
};
