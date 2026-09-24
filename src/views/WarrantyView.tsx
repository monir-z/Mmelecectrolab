import React from 'react';
import { ViewName } from '../types';
import { STORE_INFO } from '../data/initialData';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Phone,
  RotateCcw
} from 'lucide-react';

interface WarrantyViewProps {
  onNavigate: (view: ViewName) => void;
}

export const WarrantyView: React.FC<WarrantyViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-20 flex flex-col gap-10">
      <div className="text-center">
        <span className="text-xs font-mono font-bold text-blue-700 dark:text-cyan-400 uppercase tracking-wider">
          Official Quality Assurance
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white mt-1">
          ওয়ারেন্টি পলিসি ও সেবা শর্তাবলী
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          MM ELECTROLAB থেকে যেকোনো সার্ভিস বা পার্টস ক্রয়ে গ্রাহক সম্পূর্ণ নিরাপদ।
        </p>
      </div>

      {/* Main Warranty Coverage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono font-bold text-blue-700 dark:text-cyan-400">Display Bonding</span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">৬ মাসের লিখিত গ্যারান্টি</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            লেজার বন্ডিং করা ডিসপ্লেতে যদি কোনো কারণে নির্দিষ্ট ট্র্যাকের সমস্যা পুনরায় দেখা দেয়, তবে সম্পূর্ণ বিনামূল্যে পুনরায় বন্ডিং করে দেওয়া হবে।
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">Spare Parts</span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">৭ দিনের রিপ্লেসমেন্ট</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            অনলাইনে কেনা কোনো সার্কিট বা যন্ত্রাংশে ম্যানুফ্যাকচারিং ত্রুটি থাকলে আনবক্সিং প্রমাণ সহ ৭ দিনের ভেতর ফ্রেশ রিপ্লেসমেন্ট পাবেন।
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">Motor & Inverter</span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">১ বছরের সার্ভিস ওয়ারেন্টি</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            ইনভার্টার পিসিবি ও পিউর কপার মোটর রিবাইন্ডিংয়ে ১ বছর মেয়াদে টেকনিক্যাল সার্ভিসিং ফ্রি প্রদান করা হয়।
          </p>
        </div>
      </div>

      {/* Conditions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-700 dark:text-cyan-400" />
          <span>ওয়ারেন্টি প্রযোজ্য হওয়ার শর্তাবলী</span>
        </h3>

        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>ল্যাব থেকে প্রদত্ত আসল মানি রিসিট বা অনলাইন ইনভয়েস কপি সংরক্ষণ করতে হবে।</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>ডিভাইসে লাগানো MM ELECTROLAB সিকিউরিটি সিল বা স্টিকার অক্ষত থাকতে হবে।</span>
          </div>
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              <strong>যা ওয়ারেন্টির আওতাভুক্ত নয়:</strong> বজ্রপাত, অতিরিক্ত হাই-ভোল্টেজ শক, ডিসপ্লে ভেঙে যাওয়া বা পানিতে ভিজে যাওয়া ইত্যাদি প্রাকৃতিক বা বাহ্যিক কারণে নষ্ট হলে তা ফ্রি ওয়ারেন্টির আওতায় পড়বে না।
            </span>
          </div>
        </div>
      </div>

      {/* Claim steps */}
      <div className="p-8 rounded-3xl bg-slate-900 dark:bg-[#070D18] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
        <div>
          <h3 className="text-lg font-bold font-heading text-white">ওয়ারেন্টি ক্লেইম করতে চান?</h3>
          <p className="text-xs text-slate-300 mt-1">
            আপনার ইনভয়েস নম্বর বা টোকেন আইডি নিয়ে ল্যাবে যোগাযোগ করুন অথবা কল দিন।
          </p>
        </div>

        <a
          href={`tel:${STORE_INFO.phone1}`}
          className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold transition-all flex items-center gap-2 border border-slate-200 dark:border-slate-700 cursor-pointer"
        >
          <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>হটলাইনে কল করুন</span>
        </a>
      </div>
    </div>
  );
};
