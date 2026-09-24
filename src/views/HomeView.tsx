import React, { useState } from 'react';
import { ViewName } from '../types';
import { PRODUCTS_DATA } from '../data/products';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { BRANDS_MARQUEE, STORE_INFO } from '../data/initialData';
import { ProductCard } from '../components/ui/ProductCard';
import { StatCounter } from '../components/ui/StatCounter';
import { Marquee } from '../components/ui/Marquee';
import { ServiceCardSkeleton, ServiceGridSkeleton } from '../components/ui/ServiceCardSkeleton';
import { ServicePricingTiers } from '../components/home/ServicePricingTiers';
import { EcommerceHero } from '../components/home/EcommerceHero';
import { RepairsGalleryFeed } from '../components/home/RepairsGalleryFeed';
import { Testimonials } from '../components/home/Testimonials';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { useSocialMeta } from '../hooks/useSocialMeta';
import {
  Wrench,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Monitor,
  Phone,
  Flame,
  Star,
  Award,
  Clock,
  Sparkles,
  MapPin,
  ChevronRight,
  Tag,
  Snowflake,
  Truck,
  Layers,
  Zap
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewName, productId?: string) => void;
  isLoadingServices?: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, isLoadingServices = false }) => {
  useSocialMeta({
    title: '',
    description: 'সুন্দরগঞ্জ ও গাইবান্ধার শীর্ষস্থানীয় LED TV ডিসপ্লে বন্ডিং ল্যাব ও ইলেকট্রনিক্স পার্টস শপ। BTEB সার্টিফাইড টেকনিশিয়ান ও ১৮০ দিনের ওয়ারেন্টি।',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&h=630&q=80',
  });

  const [selectedProductCategory, setSelectedProductCategory] = useState<string>('all');

  const productCategories = [
    { id: 'all', label: 'সকল পার্টস' },
    { id: 'mainboards', label: 'স্মার্ট মাদারবোর্ড' },
    { id: 'display_cof', label: 'COF ও T-CON' },
    { id: 'ac_electronics', label: 'ইনভার্টার সার্কিট' },
    { id: 'tools_consumables', label: 'ল্যাব টুলস ও ACF' }
  ];

  const filteredProducts =
    selectedProductCategory === 'all'
      ? PRODUCTS_DATA.slice(0, 8)
      : PRODUCTS_DATA.filter((p) => p.category === selectedProductCategory).slice(0, 8);

  const popularServices = [
    {
      id: 'laser-bonding',
      titleBn: 'টিভি ডিসপ্লে লেজার ট্যাব বন্ডিং',
      titleEn: 'Laser Optical TAB Bonding Service',
      description:
        'দাগ পড়া, ডাবল ইমেজ বা ব্লাঙ্ক ডিসপ্লে জাপানি হিটাচি ACF ফিল্ম ও পালস-হিট থার্মোড দিয়ে ৭০% খরচে নতুনের মতো সমাধান।',
      startingPrice: '৳১,৫০০',
      turnaround: '২–৩ ঘণ্টা (সেম-ডে)',
      warranty: '১৮০ দিন লিখিত গ্যারান্টি',
      rating: 4.9,
      reviews: 185,
      tag: 'সর্বাধিক জনপ্রিয়',
      tagColor: 'bg-blue-600 text-white',
      imageUrl:
        'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80',
      action: () => onNavigate('service-booking')
    },
    {
      id: 'fridge-inverter',
      titleBn: 'ইনভার্টার ফ্রিজ পিসিবি ড্রাইভ মেরামত',
      titleEn: 'Refrigerator Inverter PCB Drive Repair',
      description:
        'কম্প্রেসর চালু না হওয়া, কুলিং মিসিং বা অতিরিক্ত বিদ্যুৎ খরচের ত্রুটি আইপিএম পাওয়ার মডিউল রিপ্লেসমেন্ট দ্বারা সমাধান।',
      startingPrice: '৳১,২০০',
      turnaround: 'সেম ডে ল্যাব / হোম ভিজিট',
      warranty: '৯০ দিন সার্ভিস ওয়ারেন্টি',
      rating: 4.8,
      reviews: 94,
      tag: 'ইনভার্টার স্পেশাল',
      tagColor: 'bg-cyan-600 text-white',
      imageUrl:
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      action: () => onNavigate('service-booking')
    },
    {
      id: 'ac-inverter',
      titleBn: 'ইনভার্টার এসি পিসিবি ও সেন্সর সার্কিট',
      titleEn: 'Inverter AC Controller & IPM Repair',
      description:
        'E1, E6, F3 এরর কোড, আউটডোর ইউনিট ফ্যান বা কম্প্রেসর ড্রাইভ ফেইলিউর নিখুঁত ডিজিটাল সিগনাল ট্রেসিং সহ ফিক্স।',
      startingPrice: '৳১,৪০০',
      turnaround: 'সেম ডে ডেলিভারি',
      warranty: '৯০ দিন ওয়ারেন্টি',
      rating: 4.9,
      reviews: 78,
      tag: 'এরর কোড সমাধান',
      tagColor: 'bg-indigo-600 text-white',
      imageUrl:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
      action: () => onNavigate('service-booking')
    },
    {
      id: 'motherboard-bga',
      titleBn: 'স্মার্ট টিভি মাদারবোর্ড বিজিএ রিবলিং',
      titleEn: 'Smart TV Mainboard CPU Rework',
      description:
        'স্মার্ট লোগো হ্যাং, রেড লাইট ব্লিংকিং বা ডেড মাদারবোর্ডে প্রফেশনাল হট-এয়ার রিবলিং ও ফার্মওয়্যার প্রোগ্রামিং।',
      startingPrice: '৳১,০০০',
      turnaround: '৩–৪ ঘণ্টা',
      warranty: '৬০ দিন ওয়ারেন্টি',
      rating: 4.8,
      reviews: 112,
      tag: 'চিপ-লেভেল ল্যাব',
      tagColor: 'bg-amber-600 text-white',
      imageUrl:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      action: () => onNavigate('service-booking')
    }
  ];

  return (
    <div className="flex flex-col gap-10 sm:gap-14 pb-16">
      {/* 1. PROFESSIONAL FULL-WIDTH TECH HERO & TRUST STRIP */}
      <EcommerceHero
        onNavigate={onNavigate}
        onSelectCategory={(cat) => setSelectedProductCategory(cat)}
      />

      {/* 2. POPULAR REPAIR SERVICES (Modern Professional Web Layout) */}
      <ScrollReveal className="w-full">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-widest font-mono mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Precision Lab Engineering</span>
              <span>·</span>
              <span>BTEB Certified</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-slate-900 dark:text-white">
              বিশেষায়িত ল্যাব সার্ভিসসমূহ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              জাপানি অপটিক্যাল লেজার বন্ডিং ও ইনভার্টার সার্কিট ল্যাব। প্যানেল পরিবর্তন না করে ৭০% খরচে নির্ভরযোগ্য সমাধান।
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-blue-600 dark:hover:border-cyan-400 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
          >
            <span>সকল সার্ভিস রেট চার্ট</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {isLoadingServices ? (
          <ServiceGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {popularServices.map((svc) => (
              <div
                key={svc.id}
                className="group card-hover-lift rounded-2xl bg-white dark:bg-[#0C1425] border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-cyan-400/60 hover:shadow-xl dark:hover:shadow-cyan-950/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Image & Badges (180px Height, Object Cover, Crisp Glassmorphism) */}
                <div
                  className="relative w-full h-[180px] overflow-hidden bg-slate-950"
                  style={{ width: '100%', height: '180px' }}
                >
                  <OptimizedImage
                    src={svc.imageUrl}
                    alt={svc.titleBn}
                    fill
                    objectFit="cover"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    fallbackSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
                  />
                  {/* Dark linear gradient overlay for superior contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-slate-950/15 pointer-events-none z-10" />
                  
                  {/* Top Badge: Category / Highlight (Glass-morphism) */}
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-black tracking-wide ${svc.tagColor} shadow-lg backdrop-blur-md border border-white/25 z-20`}>
                    {svc.tag}
                  </span>

                  {/* Top Right: Rating (Glass-morphic) */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[10px] sm:text-[11px] font-black flex items-center gap-1.5 shadow-lg z-20">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                    <span>★ {svc.rating}</span>
                  </div>

                  {/* Bottom: Turnaround & Warranty (Glass-morphic) */}
                  <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[11px] text-white z-20">
                    <span className="font-mono text-cyan-300 font-bold text-[10px] sm:text-[11px] bg-slate-900/85 backdrop-blur-md border border-cyan-500/40 px-2 py-0.5 rounded shadow-sm">
                      {svc.turnaround}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-emerald-300 font-bold bg-slate-900/85 backdrop-blur-md border border-emerald-500/40 px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{svc.warranty}</span>
                    </span>
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                      {svc.titleBn}
                    </h3>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block mt-0.5">
                      {svc.titleEn}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  {/* Pricing & Full Web CTA */}
                  <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-mono">শুরুর সার্ভিস ফি</span>
                      <span className="text-base sm:text-lg font-black font-mono text-slate-900 dark:text-white tabular-nums">
                        {svc.startingPrice}
                      </span>
                    </div>

                    <button
                      onClick={svc.action}
                      className="py-2 px-3.5 sm:px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg active:scale-95 group/btn"
                    >
                      <Wrench className="w-3.5 h-3.5 text-cyan-200 transition-transform group-hover/btn:rotate-12" />
                      <span>বুকিং দিন</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      </ScrollReveal>

      {/* 3. BEST-SELLING SPARE PARTS (Daraz/Amazon style product cards with instant Add to Cart) */}
      <ScrollReveal className="w-full">
        <section className="max-w-7xl mx-auto px-3 sm:px-6 w-full">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3 h-3" />
              <span>Tested Genuine Components</span>
            </div>
            <h2 className="text-base sm:text-xl font-bold font-heading text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
              ল্যাব পার্টস ক্যাটালগ
            </h2>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="text-[11px] sm:text-xs font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>সকল পার্টস</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-3">
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedProductCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedProductCategory === cat.id
                  ? 'bg-blue-700 dark:bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>
      </ScrollReveal>

      {/* 4. SERVICE PRICING & TIER ARCHITECTURE (Display Bonding & Component Level Repair) */}
      <ScrollReveal className="w-full">
        <ServicePricingTiers onNavigate={onNavigate} />
      </ScrollReveal>

      {/* 4.1 RECENT SUCCESSFUL REPAIRS REAL-TIME GALLERY FEED (from Firestore repairs_gallery) */}
      <ScrollReveal className="w-full">
        <RepairsGalleryFeed onNavigate={onNavigate} />
      </ScrollReveal>

      {/* 5. STAT COUNTERS (Compact High-Tech Cards) */}
      <ScrollReveal className="w-full">
        <section className="max-w-7xl mx-auto px-3 sm:px-6 w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <StatCounter
              value={5200}
              suffix="+"
              label="সফল মেরামত সম্পন্ন"
              subLabel="টিভি, ফ্রিজ ও হোম অ্যাপ্লায়েন্স"
              icon={<Cpu className="w-4 h-4 text-blue-700 dark:text-cyan-400" />}
            />
            <StatCounter
              value={99.2}
              suffix="%"
              decimals={1}
              label="বন্ডিং সাকসেস রেট"
              subLabel="Hitachi ACF পালস-হিট টেকনোলজি"
              icon={<ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
            />
            <StatCounter
              value={12}
              suffix=" বছর"
              label="পেশাগত কারিগরি অভিজ্ঞতা"
              subLabel="BTEB সনদপ্রাপ্ত প্রকৌশলী"
              icon={<Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
            />
            <StatCounter
              value={100}
              suffix="%"
              label="জেনুইন পার্টসের নিশ্চয়তা"
              subLabel="লিখিত রিপ্লেসমেন্ট ওয়ারেন্টি"
              icon={<Star className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* 6. BRAND MARQUEE */}
      <section className="w-full">
        <div className="text-center mb-2">
          <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
            আমরা যেসব শীর্ষ ব্র্যান্ডের মেরামত ও অরিজিনাল পার্টস সরবরাহ করি
          </span>
        </div>
        <Marquee items={BRANDS_MARQUEE} />
      </section>

      {/* 7. VERIFIED CUSTOMER TESTIMONIALS (Swiper.js Professional Responsive Carousel) */}
      <ScrollReveal className="w-full">
        <Testimonials onNavigate={onNavigate} />
      </ScrollReveal>
    </div>
  );
};
