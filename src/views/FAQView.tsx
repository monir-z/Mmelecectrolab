import React, { useState } from 'react';
import { ViewName, FAQItem } from '../types';
import { FAQS_DATA } from '../data/faqs';
import { ChevronDown, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';

interface FAQViewProps {
  onNavigate: (view: ViewName) => void;
}

export const FAQView: React.FC<FAQViewProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'সব প্রশ্ন' },
    { key: 'bonding', label: 'লেজার বন্ডিং ও টিভি' },
    { key: 'warranty', label: 'পার্টস ও ওয়ারেন্টি' },
    { key: 'service', label: 'হোম সার্ভিস ও চার্জ' }
  ];

  const filteredFaqs = selectedCategory === 'all'
    ? FAQS_DATA
    : FAQS_DATA.filter((f) => f.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-20 flex flex-col gap-10">
      <div className="text-center">
        <span className="text-xs font-mono font-bold text-blue-700 dark:text-cyan-400 uppercase tracking-wider">
          Frequently Asked Questions
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white mt-1">
          সাধারণ জিজ্ঞাসা ও উত্তর (FAQ)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          ডিসপ্লে বন্ডিং, সার্ভিস চার্জ, ওয়ারেন্টি ও ডেলিভারি সংক্রান্ত প্রয়োজনীয় তথ্যাবলী।
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setSelectedCategory(cat.key);
              setOpenIndex(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat.key
                ? 'bg-blue-700 text-white shadow-xs dark:bg-blue-600'
                : 'bg-white dark:bg-[#0B1528] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="flex flex-col gap-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.id}
              className="rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900">
                    Q
                  </span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    {faq.questionBn}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-blue-700 dark:text-cyan-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
                  <p>{faq.answerBn}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help box */}
      <div className="p-8 rounded-3xl bg-slate-900 dark:bg-[#070D18] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left border border-slate-800">
        <div>
          <h3 className="text-lg font-bold font-heading text-white">আপনার প্রশ্নের উত্তর খুঁজে পাননি?</h3>
          <p className="text-xs text-slate-300 mt-1">আমাদের ল্যাব টেকনিশিয়ানের সাথে সরাসরি কথা বলতে পারেন।</p>
        </div>

        <a
          href={`tel:${STORE_INFO.phone1}`}
          className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold transition-all flex items-center gap-2 border border-slate-200 dark:border-slate-700 cursor-pointer"
        >
          <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>কল করুন: {STORE_INFO.phone1}</span>
        </a>
      </div>
    </div>
  );
};
