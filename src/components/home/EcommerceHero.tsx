import React, { useState } from 'react';
import { ViewName } from '../../types';
import { OptimizedImage } from '../ui/OptimizedImage';
import {
  Wrench,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Clock,
  Zap,
  PlayCircle,
  Star,
  Sparkles
} from 'lucide-react';

interface EcommerceHeroProps {
  onNavigate: (view: ViewName, targetId?: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const EcommerceHero: React.FC<EcommerceHeroProps> = ({
  onNavigate
}) => {
  const [bondingStep, setBondingStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const bondingSteps = [
    { title: '১০µm ফল্ট স্ক্যান', desc: 'মাইক্রোস্কোপ দিয়ে COF ও গ্লাস ট্র্যাক ডিটেকশন' },
    { title: 'আল্ট্রাসনিক ক্লিন', desc: 'আইসোপ্রোপাইল সলভেন্ট দিয়ে মাইক্রো ক্লিনিং' },
    { title: 'Hitachi ACF ফিল্ম', desc: 'জাপানি থার্মোসেটিং কন্ডাক্টিভ আঠা প্লেসমেন্ট' },
    { title: 'পালস-হিট ফিউশন', desc: '২৪০°C তাপে থার্মোড প্রেসার বন্ডিং' },
    { title: '৪কে প্যাটার্ন টেস্ট', desc: '১০০% ক্রিস্টাল ক্লিয়ার রেজোলিউশন টেস্ট' }
  ];

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const runBondingSimulation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsSimulating(true);
    setBondingStep(0);
    let step = 0;
    intervalRef.current = setInterval(() => {
      step += 1;
      if (step < bondingSteps.length) {
        setBondingStep(step);
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsSimulating(false);
      }
    }, 1000);
  };

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-[#070D18] text-[#0F172A] dark:text-white border-b border-slate-200 dark:border-slate-800 transition-colors">
      
      {/* ============================================================== */}
      {/* 1. SLIM & VISUAL HERO SECTION (WHITE/SLATE SURFACE)             */}
      {/* ============================================================== */}
      <div className="relative overflow-hidden pt-5 sm:pt-7 lg:pt-8 pb-10 sm:pb-14 lg:pb-16">
        
        {/* Soft Ambient Glows (Subtle, clean, not dark) */}
        <div className="absolute top-0 left-1/3 w-[450px] h-[450px] bg-blue-500/[0.04] dark:bg-blue-600/[0.08] rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/[0.03] dark:bg-cyan-500/[0.06] rounded-full blur-[120px] pointer-events-none" />
        
        {/* Clean Grid Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            
            {/* LEFT COLUMN: Clean Typography & Compact 44px Action Buttons */}
            <div className="flex flex-col items-start text-left w-full">
              
              {/* Engineering Certification Kicker */}
              <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-cyan-400 text-[11px] sm:text-xs font-semibold mb-3 shadow-2xs max-w-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-mono tracking-tight text-[10px] sm:text-xs truncate">
                  BTEB সার্টিফাইড ল্যাব · Singer, Walton ও Beko অনুমোদিত
                </span>
              </div>

              {/* Master Headline (22px on mobile, responsive up to 40px on lg:) */}
              <h1 className="text-[22px] sm:text-3xl md:text-4xl lg:text-[40px] font-black font-heading tracking-tight leading-[1.25] text-[#0F172A] dark:text-white mb-2.5">
                জাপানি প্রযুক্তিতে আধুনিক{' '}
                <span className="text-blue-600 dark:text-cyan-400">
                  টিভি ডিসপ্লে ও সার্কিট ল্যাব
                </span>
              </h1>

              {/* Sub-Text (13px on mobile, balanced & concise) */}
              <p className="text-[13px] sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal mt-0.5 mb-5 max-w-xl">
                অত্যাধুনিক লেজার বন্ডিং ও চিপ ডায়াগনস্টিকে ৭০% খরচে মেরামত। ১৮০ দিনের লিখিত গ্যারান্টি সহ সেইম-ডে ডেলিভারি।
              </p>

              {/* Compact 44px Action Buttons - Balanced Flex Row on mobile & desktop */}
              <div className="flex flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('service-booking')}
                  className="flex-1 sm:flex-initial h-11 px-4 sm:px-6 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 group whitespace-nowrap"
                >
                  <Wrench className="w-4 h-4 text-white group-hover:rotate-12 transition-transform shrink-0" />
                  <span>অনলাইন ল্যাব বুকিং</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="flex-1 sm:flex-initial h-11 px-3.5 sm:px-5 rounded-xl bg-white dark:bg-[#0B1528] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold text-xs sm:text-sm shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap"
                >
                  <span>সার্ভিস রেট চার্ট</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              </div>

              {/* Trust Metric Micro-Line */}
              <div className="flex items-center gap-2.5 sm:gap-3 mt-4 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium flex-wrap">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-[#0F172A] dark:text-white font-mono">৪.৯/৫</span>
                  <span className="text-slate-500 dark:text-slate-400">(৫,২০০+ সফল মেরামত)</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">·</span>
                <span className="text-[11px] sm:text-xs">সুন্দরগঞ্জ উপজেলা রোড ল্যাব ভিজিট</span>
              </div>

            </div>

            {/* RIGHT COLUMN: Modern Visual Equipment Card (grid-cols-2 item, no horizontal overflow) */}
            <div className="relative w-full max-w-full overflow-hidden">
              <div className="relative rounded-[16px] overflow-hidden bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl dark:shadow-2xl max-w-full">
                
                {/* Visual Image with High-Tech Electronics Lab Image */}
                <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full overflow-hidden bg-slate-950">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80"
                    alt="জাপানি অপটিক্যাল লেজার ডিসপ্লে বন্ডিং ইকুইপমেন্ট ও সার্কিট ল্যাব"
                    priority
                    fill
                    objectFit="cover"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    fallbackSrc="https://images.unsplash.com/photo-1597733336794-12d05021d510?w=1000&auto=format&fit=crop&q=80"
                  />

                  {/* Stylish Dark Linear-Gradient Overlay for Superior Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/20 pointer-events-none z-10" />

                  {/* Top HUD Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-20">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-md border border-cyan-500/30 text-[10px] sm:text-[11px] font-mono text-cyan-300 font-bold flex items-center gap-1.5 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Hitachi ACF Pulse-Heat</span>
                    </span>

                    <span className="px-2.5 py-1 rounded-md bg-blue-600/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-mono font-bold shadow-md">
                      ১০µm অপটিক্যাল প্রিসিশন
                    </span>
                  </div>

                  {/* Bottom Interactive Simulation Bar */}
                  <div className="absolute inset-x-2.5 sm:inset-x-3 bottom-2.5 sm:bottom-3 p-2.5 sm:p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-white z-10">
                    <div className="flex items-center justify-between text-[11px] sm:text-xs mb-1">
                      <span className="font-bold font-mono flex items-center gap-1.5 text-slate-100">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{bondingSteps[bondingStep]?.title || bondingSteps[0].title}</span>
                      </span>
                      <span className="text-cyan-300 font-mono font-bold text-[9px] sm:text-[10px] bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                        ধাপ {Math.min(bondingStep + 1, bondingSteps.length)}/{bondingSteps.length}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-300 mb-2 line-clamp-1">
                      {bondingSteps[bondingStep]?.desc || bondingSteps[0].desc}
                    </p>
                    <button
                      onClick={runBondingSimulation}
                      disabled={isSimulating}
                      className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    >
                      <PlayCircle className="w-4 h-4 text-cyan-200" />
                      <span>{isSimulating ? 'লেজার বন্ডিং প্রসেস ডেমো চলছে...' : 'লেজার বন্ডিং প্রসেস ডেমো দেখুন'}</span>
                    </button>
                  </div>

                </div>
              </div>

              {/* Floating Badge Overlay: 180 Days Warranty */}
              <div className="hidden sm:flex absolute -top-3 -right-3 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-700 shadow-md items-center gap-1.5 text-[11px] font-bold text-slate-800 dark:text-cyan-300 z-10">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>১৮০ দিন ফুল লিখিত গ্যারান্টি</span>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. SLIM HORIZONTAL TRUST STRIP (NO TRUNCATION / NO ELLIPSIS)    */}
      {/* ============================================================== */}
      <div className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1325] transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-3.5">
          <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800 items-center">
            
            {/* Trust Point 1: ৳ ১,৫০০ শুরু */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 px-1 sm:px-3 text-center sm:text-left">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-amber-400" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-sm font-black font-mono text-[#0F172A] dark:text-white whitespace-nowrap leading-tight">
                  ৳ ১,৫০০ শুরু
                </div>
                <div className="text-[9px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                  স্বচ্ছ রেট চার্ট · হিডেন ফি নেই
                </div>
              </div>
            </div>

            {/* Trust Point 2: ২–৩ ঘণ্টা ডেলিভারি */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 px-1 sm:px-3 text-center sm:text-left">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-sm font-black text-[#0F172A] dark:text-white whitespace-nowrap leading-tight">
                  ২-৩ ঘণ্টা ডেলিভারি
                </div>
                <div className="text-[9px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                  সেম-ডে এক্সপ্রেস ল্যাব সার্ভিস
                </div>
              </div>
            </div>

            {/* Trust Point 3: ১৮০ দিন ওয়ারেন্টি */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 px-1 sm:px-3 text-center sm:text-left">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-100 dark:border-cyan-900/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-sm font-black text-[#0F172A] dark:text-white whitespace-nowrap leading-tight">
                  ১৮০ দিন ওয়ারেন্টি
                </div>
                <div className="text-[9px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                  ডিজিটাল সিল ও জেনুইন পার্টস
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
