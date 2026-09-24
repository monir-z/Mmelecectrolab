import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { STORE_INFO } from '../../data/initialData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPillBadge, setShowPillBadge] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Periodic typing pill badge loop (every 7.2s staggered with PRIME AI, visible for 2.3s)
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowPillBadge(true);
      setTimeout(() => setShowPillBadge(false), 2300);
    }, 4500);

    const interval = setInterval(() => {
      setShowPillBadge(true);
      setTimeout(() => setShowPillBadge(false), 2300);
    }, 7200);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const quickMessages = [
    'আমার LED টিভি ডিসপ্লেতে দাগ পড়েছে, জাপানি বন্ডিং খরচ কত?',
    'ইনভার্টার ফ্রিজের কম্প্রেসর ঠান্ডা হচ্ছে না, টেকনিশিয়ান ভিজিট লাগবে।',
    'ইনভার্টার এসি গ্যাস চার্জিং ও সার্ভিসিং করাতে চাই।',
    'সার্ভিস ট্র্যাকিং টোকেন স্ট্যাটাস জানতে চাই।'
  ];

  const handleSendMessage = (msg: string) => {
    const encoded = encodeURIComponent(msg);
    window.open(`${STORE_INFO.whatsappUrl}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* WhatsApp Quick Chat Popover Modal */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="fixed bottom-20 right-4 sm:bottom-22 sm:right-6 z-50 w-80 max-w-[calc(100vw-32px)] rounded-3xl bg-[#111827]/98 backdrop-blur-xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/60 p-4 text-xs animate-in slide-in-from-bottom-3 duration-200 text-white"
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1F2937]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-100 flex items-center gap-1.5">
                  <span>MM ELECTROLAB</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">অনলাইন সাপোর্ট টিম</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-slate-300 text-[11px] mb-3 leading-relaxed">
            দ্রুত উত্তরের জন্য নিচের যেকোনো প্রশ্নে ট্যাপ করুন অথবা সরাসরি মেসেজ লিখুন:
          </p>

          <div className="space-y-1.5 mb-4">
            {quickMessages.map((msg, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(msg)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 hover:border-emerald-500/50 text-[11px] text-slate-200 transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="line-clamp-1">{msg}</span>
                <Send className="w-3 h-3 text-emerald-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
              </button>
            ))}
          </div>

          <a
            href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent('হ্যালো MM ELECTROLAB, আমি সার্ভিসিং সংক্রান্ত তথ্য জানতে চাই।')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-center flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/30 cursor-pointer text-xs active:scale-98"
          >
            <MessageCircle className="w-4 h-4" />
            <span>সরাসরি WhatsApp চ্যাট শুরু করুন</span>
          </a>
        </div>
      )}

      {/* Modern Circular Floating WhatsApp Button with Glass-morphism & Wave Animation */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40">
        {/* Periodic Typing Pill Badge ("WhatsApp Support 💬") */}
        {showPillBadge && !isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 animate-badge-pop flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-[#0B1528]/95 backdrop-blur-xl border border-emerald-400/40 shadow-xl shadow-emerald-950/40 text-white text-xs font-bold whitespace-nowrap cursor-pointer hover:border-emerald-300 transition-all select-none"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/30" />
            <span className="font-heading tracking-wide">WhatsApp Support</span>
            <span className="text-emerald-400 font-bold">💬</span>
            <span className="w-1 h-3.5 bg-emerald-400 animate-pulse ml-0.5 rounded-full" />
          </button>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="group relative w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600/95 via-emerald-500/95 to-teal-400/95 text-white flex items-center justify-center border border-white/30 backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer animate-whatsapp-wave"
          aria-label="WhatsApp Live Support"
          title="WhatsApp লাইভ চ্যাট"
        >
          <MessageCircle className="w-5 h-5 fill-white/25 transition-transform group-hover:scale-110" />

          {/* Pulsing online status dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-[#111827]" />
          </span>

          {/* Desktop Hover Tooltip Only */}
          <span className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold whitespace-nowrap shadow-xl border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            WhatsApp লাইভ চ্যাট
          </span>
        </button>
      </div>
    </>
  );
};
