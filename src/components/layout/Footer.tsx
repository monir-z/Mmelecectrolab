import React from 'react';
import { ViewName } from '../../types';
import { STORE_INFO, SUPPORTED_BRANDS } from '../../data/initialData';
import { MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2, Cpu, Wrench, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewName) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative z-10 bg-white dark:bg-[#0B0F19] text-[#64748B] dark:text-[#94A3B8] text-sm pt-14 pb-24 border-t border-slate-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Supported Brands Marquee Bar */}
        <div className="mb-12 pb-8 border-b border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 shrink-0">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span>অনুমোদিত ও সমর্থিত ব্র্যান্ডস:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {SUPPORTED_BRANDS.map((brand) => (
              <span
                key={brand}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 font-medium"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200 dark:border-white/10">
          {/* Brand & Proprietor Info */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-lg font-bold font-heading text-[#0F172A] dark:text-[#F8FAFC] tracking-tight block">
                {STORE_INFO.name}
              </span>
              <p className="text-xs text-blue-600 dark:text-cyan-400 font-mono mt-1 font-semibold">
                {STORE_INFO.authorizedBadge}
              </p>
              <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-1">
                {STORE_INFO.taglineBn} (MM ELECTROLAB)
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 shadow-xs text-xs">
              <div className="font-semibold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>প্রোপ্রাইটর:</span>
              </div>
              <p className="text-[#0F172A] dark:text-[#F8FAFC] font-bold">{STORE_INFO.proprietorBn}</p>
              <p className="text-emerald-600 dark:text-emerald-400 text-[11px] mt-0.5 font-medium">
                BTEB Certified Technician
              </p>
            </div>

            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
              জাপানি COF বন্ডিং টেকনোলজি, BTEB সার্টিফাইড টেকনিশিয়ান, ১০০% অরিজিনাল পার্টস ও সেইম ডে ডেলিভারি সুবিধা।
            </p>
          </div>

          {/* Quick Services (6 Official) */}
          <div>
            <h4 className="font-heading font-semibold text-sm tracking-wide uppercase mb-4 text-blue-700 dark:text-cyan-400">
              সার্ভিস ও ক্যাটাগরি
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-blue-700 dark:hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-blue-600 dark:text-cyan-400">›</span>
                  <span>LED TV ডিসপ্লে মেরামত (বিশেষ সেবা)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-blue-700 dark:hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-blue-600 dark:text-cyan-400">›</span>
                  <span>এসি ও ফ্রিজ সার্ভিস</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-blue-700 dark:hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-blue-600 dark:text-cyan-400">›</span>
                  <span>ফ্যান, মোটর ও ওয়াটার পাম্প</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-blue-700 dark:hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-blue-600 dark:text-cyan-400">›</span>
                  <span>হোম অ্যাপ্লায়েন্স (ওভেন, রাইস কুকার, IPS)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-blue-700 dark:hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-blue-600 dark:text-cyan-400">›</span>
                  <span>ইলেকট্রিক ওয়্যারিং কাজ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-blue-700 dark:hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-blue-600 dark:text-cyan-400">›</span>
                  <span>পুরাতন পণ্য ক্রয়-বিক্রয় ও মেরামত</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Useful Navigation & Policies */}
          <div>
            <h4 className="font-heading font-semibold text-sm tracking-wide uppercase mb-4 text-blue-700 dark:text-cyan-400">
              গুরুত্বপূর্ণ লিঙ্ক
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('service-booking')} className="hover:text-blue-700 dark:hover:text-white transition-colors cursor-pointer">
                  অনলাইন সার্ভিস বুকিং
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-blue-700 dark:hover:text-white transition-colors cursor-pointer">
                  সার্ভিস তালিকা ও রেট চার্ট
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-700 dark:hover:text-white transition-colors cursor-pointer">
                  প্রতিষ্ঠান পরিচিতি ও টেকনিশিয়ান
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-700 dark:hover:text-white transition-colors cursor-pointer">
                  যোগাযোগ ও লোকেশন
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track')} className="hover:text-blue-700 dark:hover:text-white transition-colors cursor-pointer">
                  সার্ভিস স্ট্যাটাস ট্র্যাকিং
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('warranty')} className="hover:text-blue-700 dark:hover:text-white transition-colors cursor-pointer">
                  ওয়ারেন্টি পলিসি ও শর্তাবলী
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="flex flex-col gap-3.5 text-xs">
            <h4 className="font-heading font-semibold text-sm tracking-wide uppercase mb-1 text-blue-700 dark:text-cyan-400">
              যোগাযোগ ও কাজের সময়
            </h4>

            <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{STORE_INFO.addressBn}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <a href={`tel:${STORE_INFO.phone1}`} className="hover:text-blue-700 dark:hover:text-white font-mono text-slate-800 dark:text-slate-200 font-bold block">
                  {STORE_INFO.phone1} (হোয়াটসঅ্যাপ/বিকাশ/ইমো)
                </a>
                <a href={`tel:${STORE_INFO.phone2}`} className="hover:text-blue-700 dark:hover:text-white font-mono text-slate-600 dark:text-slate-400 block mt-0.5">
                  {STORE_INFO.phone2}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
              <a href={`mailto:${STORE_INFO.email}`} className="hover:text-blue-700 dark:hover:text-white break-all text-slate-600 dark:text-slate-400">
                {STORE_INFO.email}
              </a>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-700 dark:text-slate-300 font-medium">{STORE_INFO.hoursBn}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} {STORE_INFO.name}. সর্বস্বত্ব সংরক্ষিত।</p>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
            <span className="text-slate-500 dark:text-slate-400">পেমেন্ট মেথড:</span>
            <span className="text-pink-600 dark:text-pink-400 font-bold">bKash (01760655650)</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">Nagad</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">ক্যাশ অন ডেলিভারি</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
