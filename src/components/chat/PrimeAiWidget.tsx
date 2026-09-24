import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Sparkles,
  Send,
  X,
  Minus,
  ArrowRight,
  User,
  RotateCcw,
  Zap
} from 'lucide-react';
import { AiSparkleIcon } from '../ui/AiSparkleIcon';
import { ViewName } from '../../types';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

interface PrimeAiWidgetProps {
  onNavigate: (view: ViewName) => void;
}

export const PrimeAiWidget: React.FC<PrimeAiWidgetProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPillBadge, setShowPillBadge] = useState(false);

  // Periodic typing pill badge loop
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowPillBadge(true);
      setTimeout(() => setShowPillBadge(false), 2300);
    }, 2000);

    const interval = setInterval(() => {
      setShowPillBadge(true);
      setTimeout(() => setShowPillBadge(false), 2300);
    }, 6800);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Scroll lock effect on background page when chat is open (especially crucial on mobile)
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const INITIAL_WELCOME = `স্বাগতম! আমি **PRIME AI** — আপনার টেকনিক্যাল অ্যাসিস্ট্যান্ট।\n\nটিভি ডিসপ্লে, এসি বা ফ্রিজের সমস্যা বলুন; সম্ভাব্য কারণ ও খরচের সঠিক ধারণা দিচ্ছি।`;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: INITIAL_WELCOME,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const quickPrompts = [
    {
      label: '📺 টিভি ডিসপ্লেতে দাগ',
      query: 'আমার LED টিভির ডিসপ্লেতে দাগ পড়েছে ও মাঝে মাঝে ছবি আসে না। এটা ঠিক হতে কেমন খরচ ও সময় লাগবে?'
    },
    {
      label: '❄️ ইনভার্টার এসিতে এরর কোড',
      query: 'আমার ইনভার্টার এসিতে এরর কোড দেখাচ্ছে এবং কম্প্রেসর চলছে না। সম্ভাব্য কারণ ও মেরামত খরচ কত?'
    },
    {
      label: '🧊 ফ্রিজে ঠান্ডা হয় না',
      query: 'ফ্রিজ চলছে কিন্তু নিচের অংশে ঠান্ডা হয় না, বরফ গলছে। গ্যাস লিকেজ কি না এবং খরচ কত পড়বে?'
    },
    {
      label: '🏡 হোম সার্ভিস বুকিং',
      query: 'সুন্দরগঞ্জ ও আশপাশের এলাকায় কি টেকনিশিয়ান হোম সার্ভিস পাওয়া যায়? কীভাবে বুকিং দেব?'
    }
  ];

  // Typewriter effect simulation for smooth progressive text reveal
  const typeOutMessage = (fullText: string, messageId: string) => {
    let currentIndex = 0;
    const chunkSize = Math.max(2, Math.floor(fullText.length / 35));
    
    // Add the message with initial empty string
    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        sender: 'ai',
        text: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isStreaming: true
      }
    ]);

    const timer = setInterval(() => {
      currentIndex += chunkSize;
      if (currentIndex >= fullText.length) {
        clearInterval(timer);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, text: fullText, isStreaming: false } : msg
          )
        );
        scrollToBottom();
      } else {
        const currentSlice = fullText.slice(0, currentIndex);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, text: currentSlice } : msg
          )
        );
        scrollToBottom();
      }
    }, 18);
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const aiReplyText = data.reply || 'দুঃখিত, কোনো ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';

      setIsLoading(false);
      typeOutMessage(aiReplyText, String(Date.now() + 1));
    } catch (err) {
      console.warn('Fallback response triggered:', err);
      let fallback = `আপনার সমস্যার বিষয়ে আমাদের BTEB সার্টিফাইড টেকনিশিয়ান সরাসরি ডায়াগনোসিস করতে প্রস্তুত।\n\n- **ল্যাব ঠিকানা:** সিঙ্গার প্লাজা, উপজেলা রোড, সুন্দরগঞ্জ\n- **হটলাইন:** \`01760655650\``;
      
      if (text.includes('টিভি') || text.includes('দাগ') || text.includes('ডিসপ্লে')) {
        fallback = `আপনার টিভির সমস্যাটি মূলত ডিসপ্লে প্যানেলের **COF / TAB রিবন আইসি** অক্সিডেশন বা লুজ কানেকশনের কারণে হয়।\n\n* **সমাধান:** জাপানি অপটিক্যাল লেজার বন্ডিং (প্যানেল পরিবর্তন ছাড়াই)\n* **খরচ:** ৳১,৫০০ – ৳৪,৫০০\n* **গ্যারান্টি:** ১৮০ দিনের লিখিত ওয়ারেন্টি (২–৪ ঘণ্টায় ডেলিভারি)\n\n*মেরামত না হলে নো ডায়াগনোসিস ফি।* সরাসরি সাইটে বুকিং দিতে পারেন।`;
      } else if (text.includes('এসি') || text.includes('এরর') || text.includes('error')) {
        fallback = `ইনভার্টার এসিতে এরর কোড মূলত **IPM কন্ট্রোলার সার্কিট**, কমিউনিকেশন বা সেন্সর ফল্টের সংকেত দেয়।\n\n* **সমাধান:** পিসিবি সিগনাল ট্রেসিং ও কম্প্রেসর ড্রাইভ মেরামত\n* **খরচ:** ৳১,৪০০ – ৳৩,৫০০\n* **সুবিধা:** সুন্দরগঞ্জে অন-সাইট হোম সার্ভিস ও ল্যাব টেস্ট\n\nআমাদের টেকনিশিয়ান ভিজিটের জন্য বুকিং দিন বা কল করুন: \`01760655650\`।`;
      } else if (text.includes('ফ্রিজ') || text.includes('ঠান্ডা') || text.includes('গ্যাস')) {
        fallback = `ফ্রিজে বরফ না হওয়ার প্রধান কারণ **রেফ্রিজারেন্ট গ্যাস লিকেজ (R600a)** অথবা ইনভার্টার ডিফ্রোস্ট সার্কিট ত্রুটি।\n\n* **সমাধান:** নাইট্রোজেন প্রেশার টেস্ট, লিকেজ সিলিং ও পিওর গ্যাস চার্জিং\n* **খরচ:** ৳১,২০০ – ৳২,৮০০\n* **ওয়ারেন্টি:** ৯০ দিনের সার্ভিস ওয়ারেন্টি\n\nহোম সার্ভিসের জন্য এখনই অনলাইন বুকিং দিন।`;
      }

      setIsLoading(false);
      typeOutMessage(fallback, String(Date.now() + 1));
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: INITIAL_WELCOME,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Modern Glassmorphic Circular Floating PRIME AI Button */}
      <div className="fixed bottom-[74px] right-4 sm:bottom-[80px] sm:right-6 z-40">
        {/* Periodic Typing Pill Badge */}
        {showPillBadge && !isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 animate-badge-pop flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-[#0B1528]/95 backdrop-blur-xl border border-cyan-400/40 shadow-xl shadow-cyan-950/40 text-white text-xs font-bold whitespace-nowrap cursor-pointer hover:border-cyan-300 transition-all select-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="font-heading tracking-wide">Ask PRIME AI</span>
            <span className="text-cyan-400 font-bold">✨</span>
            <span className="w-1 h-3.5 bg-cyan-400 animate-pulse ml-0.5 rounded-full" />
          </button>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="group relative w-12 h-12 rounded-full bg-[#0D1322]/95 hover:bg-[#111A2E] text-white flex items-center justify-center border border-cyan-500/40 hover:border-cyan-400 backdrop-blur-xl shadow-xl shadow-cyan-950/40 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer animate-prime-neon-pulse"
          aria-label="Open PRIME AI Assistant"
          title="PRIME AI ডায়াগনোসিস"
        >
          {/* Subtle Ambient Radial Glow Inside */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600/30 via-blue-600/20 to-cyan-500/30 blur-sm pointer-events-none" />

          {/* Modern Radiant AI Sparkle Logo */}
          <AiSparkleIcon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]" />

          {/* Pulsing online badge */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 border-2 border-[#0B0F19]" />
          </span>

          <span className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold whitespace-nowrap shadow-xl border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            PRIME AI • ডায়াগনোসিস
          </span>
        </button>
      </div>

      {/* Mobile Full Screen / Desktop Floating Modal Window */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] w-full h-[100dvh] rounded-none sm:rounded-3xl sm:inset-auto sm:bottom-20 sm:right-4 md:bottom-22 md:right-6 sm:w-[410px] md:w-[420px] sm:h-[580px] md:h-[600px] bg-[#0B0F19] sm:bg-[#0B0F19]/98 dark:bg-[#0B0F19] sm:dark:bg-[#0B0F19]/98 backdrop-blur-2xl border-0 sm:border sm:border-cyan-500/30 shadow-2xl shadow-blue-950/90 flex flex-col overflow-hidden animate-chat-spring">
          
          {/* Premium AI Glass-morphism Header */}
          <div className="px-4 py-3 bg-[#080C16] border-b border-slate-800/80 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-3">
              {/* Sleek Deep Slate Glass Surface with Radiant AI Sparkle */}
              <div className="relative w-9 h-9 rounded-xl bg-[#0F172A] border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-950/50 shrink-0 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 via-blue-600/20 to-cyan-500/30 pointer-events-none" />
                <AiSparkleIcon className="w-5 h-5 relative z-10 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-[#080C16] z-20" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-black font-heading tracking-tight text-white">
                    PRIME AI
                  </span>
                  <span className="text-[8.5px] px-1.5 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 font-bold border border-cyan-500/40 uppercase font-mono tracking-wider">
                    Diagnostic Lab
                  </span>
                </div>
                {/* Single line, clean & elegant subtitle */}
                <p className="text-[10px] text-slate-400 tracking-normal whitespace-nowrap mt-0.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>MM ELECTROLAB টেকনিক্যাল ইন্টেলিজেন্স</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="নতুন চ্যাট শুরু করুন"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="মিনিমাইজ করুন"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="বন্ধ করুন"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer ml-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-[#070A12]/90 scroll-smooth">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isUser ? 'flex-row-reverse items-end' : 'flex-row items-start'} group`}
                >
                  {/* Sender Avatar */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white shadow-2xs ${
                      isUser
                        ? 'bg-gradient-to-tr from-blue-600 to-indigo-600'
                        : 'bg-[#0F172A] border border-cyan-500/40 text-cyan-400 shadow-xs shadow-cyan-950/30'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <AiSparkleIcon className="w-4 h-4 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]" />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[82%]`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-relaxed transition-all ${
                        isUser
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs shadow-md shadow-blue-900/20 font-medium'
                          : 'bg-[#111827] text-slate-200 border border-slate-800 rounded-bl-xs shadow-sm'
                      }`}
                    >
                      {/* Rich Markdown Parser */}
                      <ReactMarkdown
                        components={{
                          strong: ({ children }) => (
                            <strong className="font-bold text-cyan-300 dark:text-cyan-300 font-sans">{children}</strong>
                          ),
                          p: ({ children }) => (
                            <p className="mb-1.5 last:mb-0 leading-relaxed">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-4 space-y-1 mb-1.5 marker:text-cyan-400">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-4 space-y-1 mb-1.5 marker:text-blue-400">{children}</ol>
                          ),
                          li: ({ children }) => (
                            <li className="leading-snug">{children}</li>
                          ),
                          code: ({ children }) => (
                            <code className="bg-slate-950/80 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded text-[11px] font-mono mx-0.5">
                              {children}
                            </code>
                          )
                        }}
                      >
                        {m.text}
                      </ReactMarkdown>

                      {/* Streaming Blinking Cursor */}
                      {m.isStreaming && (
                        <span className="inline-block w-1.5 h-3.5 bg-cyan-400 animate-pulse ml-1 rounded-sm align-middle" />
                      )}
                    </div>

                    {/* Timestamp */}
                    <span className="text-[9.5px] text-slate-500 mt-1 px-1">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Smart 3-Dot Animated Typing Bubble */}
            {isLoading && (
              <div className="flex items-end gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#0F172A] border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 shadow-xs shadow-cyan-950/30">
                  <AiSparkleIcon className="w-4 h-4 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)] animate-pulse" />
                </div>
                <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-xs bg-[#111827] border border-slate-800 text-slate-300 flex items-center gap-2.5 shadow-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-typing-dot-1" />
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-typing-dot-2" />
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-typing-dot-3" />
                  </div>
                  <span className="text-[11px] text-cyan-300/90 font-mono">বিশ্লেষণ চলছে...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-2 bg-[#090D16] border-t border-slate-800/80 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.query)}
                disabled={isLoading}
                className="px-2.5 py-1.5 rounded-xl bg-[#111827] hover:bg-cyan-950/40 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-[11px] whitespace-nowrap transition-all cursor-pointer shrink-0 active:scale-95 disabled:opacity-50"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Direct Booking Link Strip */}
          <div className="px-4 py-2 bg-[#0F1422] border-t border-slate-800/80 flex items-center justify-between text-[11.5px] shrink-0">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">ল্যাবে টেস্ট বা হোম সার্ভিস বুক করতে চান?</span>
            </span>
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigate('service-booking');
              }}
              className="text-cyan-400 font-bold hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors shrink-0 ml-2"
            >
              <span>বুকিং দিন</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Input Box Form (Pinned at bottom with mobile safe-area padding) */}
          <div className="p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[#080C16] border-t border-slate-800/80 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="সমস্যা লিখুন (যেমন: টিভিতে দাগ, এসিতে এরর)..."
                className="flex-1 bg-[#111827] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white disabled:opacity-40 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 shrink-0"
                title="পাঠান"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
