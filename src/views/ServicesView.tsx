import React from 'react';
import { ViewName, ServiceItem } from '../types';
import { SERVICES_DATA } from '../data/services';
import { STORE_INFO } from '../data/initialData';
import { useSocialMeta } from '../hooks/useSocialMeta';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import {
  Wrench,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Phone,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';

interface ServicesViewProps {
  onNavigate: (view: ViewName) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onNavigate }) => {
  useSocialMeta({
    title: 'সার্ভিস তালিকা ও স্বচ্ছ রেট চার্ট',
    description: 'LED TV ডিসপ্লে COF বন্ডিং, ইনভার্টার ফ্রিজ ও এসি সার্ভিসিং, ফ্যান ও মোটর কয়েল বাঁধাই। ১৮০ দিনের লিখিত ওয়ারেন্টি ও সেইম ডে ডেলিভারি।',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 flex flex-col gap-12">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-white/[0.05] border border-blue-200 dark:border-white/10 text-xs font-semibold text-blue-700 dark:text-cyan-300 shadow-xs mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse" />
          <span>{STORE_INFO.authorizedBadge} • {STORE_INFO.proprietorBn}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white mt-1">
          সার্ভিস তালিকা ও স্বচ্ছ রেট চার্ট
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          কোনো লুকানো চার্জ নেই। প্রতিটি সার্ভিসে ব্যবহৃত হয় বিশ্বমানের যন্ত্রপাতি, জাপানি হিটাচি অরিজিনাল ACF টেপ এবং প্রদান করা হয় অফিশিয়াল লিখিত ওয়ারেন্টি।
        </p>

        {/* 4 Trust Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 text-left">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">জাপানি COF বন্ডিং</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">BTEB সার্টিফাইড</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">১০০% পার্টস ও ওয়ারেন্টি</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">সেইম ডে সার্ভিস ডেলিভারি</span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.id}
            className="group card-hover-lift rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-cyan-950/30 hover:border-blue-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Header Media Image with Blur-up Loading */}
            {service.imageUrl && (
              <div className="relative w-full h-[160px] bg-slate-950 overflow-hidden">
                <OptimizedImage
                  src={service.imageUrl}
                  alt={service.nameBn}
                  fill
                  objectFit="cover"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  fallbackSrc="https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none z-10" />
                
                {/* Badges Overlay */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20">
                  <span className="font-mono font-bold text-cyan-300 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cyan-500/40 text-[11px] shadow-sm">
                    {service.estimatedTime}
                  </span>
                  <span className="text-emerald-300 font-bold bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/40 text-[11px] shadow-sm flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{service.warrantyPeriod}</span>
                  </span>
                </div>
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {!service.imageUrl && (
                  /* Fallback Badge & Turnaround if no image */
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-mono font-bold text-teal-700 dark:text-cyan-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                      {service.estimatedTime}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">{service.warrantyPeriod}</span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {service.nameBn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{service.name}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {service.descriptionBn}
                </p>

                {/* Features List */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {service.featuresBn.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Booking CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-mono">আনুমানিক রেট</span>
                  <span className="text-base font-bold font-mono text-blue-700 dark:text-cyan-400">
                    {service.priceRange}
                  </span>
                </div>

                <button
                  onClick={() => onNavigate('service-booking')}
                  className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>বুকিং দিন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lab Guarantee Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 dark:bg-[#070D18] text-white border border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            MM ELECTROLAB Commitment
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
            "যদি মেরামত না হয়, তবে কোনো ডায়াগনোসিস ফি নেওয়া হবে না"
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            সুন্দরগঞ্জ ও গাইবান্ধা জেলার মানুষের ভরসা ধরে রাখতে আমরা শতভাগ স্বচ্ছতায় বিশ্বাসী।
          </p>
        </div>

        <div className="flex gap-3">
          <a
            href={`tel:${STORE_INFO.phone1}`}
            className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 border border-slate-200 dark:border-slate-700"
          >
            <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>সরাসরি কথা বলুন</span>
          </a>

          <button
            onClick={() => onNavigate('service-booking')}
            className="px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
          >
            অনলাইন সার্ভিস বুকিং
          </button>
        </div>
      </div>
    </div>
  );
};
