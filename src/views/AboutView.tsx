import React from 'react';
import { ViewName } from '../types';
import { STORE_INFO, SUPPORTED_BRANDS } from '../data/initialData';
import {
  Award,
  ShieldCheck,
  Cpu,
  Monitor,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  Wrench,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: ViewName) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 flex flex-col gap-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-white/[0.05] border border-blue-200 dark:border-white/10 text-xs font-semibold text-blue-700 dark:text-cyan-300 shadow-xs mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse" />
          <span>{STORE_INFO.authorizedBadge}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-slate-900 dark:text-white mt-1 leading-tight">
          {STORE_INFO.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
          {STORE_INFO.addressBn} • {STORE_INFO.hoursBn}
        </p>
      </div>

      {/* 4 Trust Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-white/10 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">জাপানি COF বন্ডিং</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">লেজার মাইক্রোস্কোপিক টেকনোলজি</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-white/10 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">BTEB সার্টিফাইড</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">কারিগরি শিক্ষা বোর্ড সনদপ্রাপ্ত</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-white/10 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">১০০% পার্টস ও ওয়ারেন্টি</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">লিখিত গ্যারান্টি সুবিধা</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-white/10 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">সেইম ডে ডেলিভারি</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">দ্রুত মেরামত ও হোম সাপোর্ট</p>
          </div>
        </div>
      </div>

      {/* Proprietor & Certification Spotlight */}
      <div className="rounded-3xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-white/10 p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-full bg-blue-50 dark:bg-blue-950/50 border-2 border-blue-600 dark:border-cyan-500 p-2 flex items-center justify-center shadow-md">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600/10 to-teal-500/20 dark:from-blue-500/20 dark:to-cyan-500/30 flex items-center justify-center">
                <Award className="w-12 h-12 text-blue-700 dark:text-cyan-400" />
              </div>
            </div>

            <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mt-4">
              {STORE_INFO.proprietorBn}
            </h3>
            <p className="text-xs text-blue-700 dark:text-cyan-400 font-mono font-bold mt-0.5">
              প্রোপ্রাইটর ও লিড টেকনিক্যাল ইঞ্জিনিয়ার
            </p>
            <div className="inline-block px-3 py-1 mt-2 rounded-full bg-slate-100 dark:bg-white/[0.06] text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              {STORE_INFO.authorizedBadge}
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              BTEB কারিগরি শিক্ষা বোর্ডের সনদপ্রাপ্ত ও বিশ্বমানের ল্যাব ফ্যাসিলিটি
            </h4>
            <p>
              মোঃ রবিউল ইসলাম বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB) থেকে ইলেকট্রনিক্স ইঞ্জিনিয়ারিংয়ে বিশেষ ডিগ্রি ও প্রশিক্ষণপ্রাপ্ত।
              দীর্ঘ পেশাগত অভিজ্ঞতা এবং সিঙ্গার ও বেকো-এর অনুমোদিত সার্ভিসিংয়ের ধারাবাহিকতায় তিনি গড়ে তুলেছেন
              উত্তরবঙ্গের অন্যতম আধুনিক ইলেকট্রনিক্স ল্যাব।
            </p>
            <p>
              টিভি ডিসপ্লেতে ভার্টিক্যাল/হরিজন্টাল দাগ, নো-পিকচার, ডাবল ইমেজ কিংবা ফ্রিজ-এসির ইনভার্টার পিসিবি সমস্যাগুলোর ক্ষেত্রে
              এখন আর ঢাকা বা রংপুর যাওয়ার প্রয়োজন নেই। সুন্দরগঞ্জ উপজেলা রোডের সিঙ্গার প্লাজাতেই মিলছে সম্পূর্ণ জাপানি COF বন্ডিং ও ল্যাব টেস্ট সুবিধা।
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-white/10 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>BTEB নিবন্ধিত টেকনিশিয়ান</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>SINGER & BEKO অনুমোদিত</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>১০,০০০+ সফল ডিভাইস মেরামত</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supported Brands Marquee / Grid */}
      <div className="rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-6 sm:p-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-xs font-mono font-bold text-blue-700 dark:text-cyan-400 uppercase tracking-wider">
            Supported Brands
          </span>
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-1">
            যেসব ব্র্যান্ডের ডিভাইসে বিশেষায়িত সার্ভিস দেওয়া হয়
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {SUPPORTED_BRANDS.map((brand) => (
            <span
              key={brand}
              className="px-4 py-2 rounded-xl bg-white dark:bg-[#0D1527] border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 shadow-xs"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* Direct Contact & Visit Card */}
      <div className="p-8 rounded-3xl bg-slate-900 dark:bg-[#070D18] text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-slate-800">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Direct Contact & Visit
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
            {STORE_INFO.addressBn}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            মোবাইল: {STORE_INFO.phone1} (হোয়াটসঅ্যাপ/বিকাশ/ইমো), {STORE_INFO.phone2} | {STORE_INFO.hoursBn}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${STORE_INFO.phone1}`}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>সরাসরি কল: {STORE_INFO.phone1}</span>
          </a>
          <button
            onClick={() => onNavigate('service-booking')}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer transition-colors"
          >
            অনলাইন সার্ভিস বুকিং
          </button>
        </div>
      </div>
    </div>
  );
};
