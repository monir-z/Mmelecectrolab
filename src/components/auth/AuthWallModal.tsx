import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { STORE_INFO } from '../../data/initialData';
import {
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock,
  ArrowRight,
  X
} from 'lucide-react';

export const AuthWallModal: React.FC = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    try {
      return typeof window !== 'undefined' && sessionStorage.getItem('mm_guest_browsing') === 'true';
    } catch {
      return false;
    }
  });

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('mm_guest_browsing', 'true');
    } catch {
      // ignore
    }
  };

  // If already authenticated, dismissed, or still checking initial session, do not show wall
  if (loading || user || isDismissed) {
    return null;
  }

  const handleGoogleLogin = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle();
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#050811]/85 backdrop-blur-md transition-all animate-in fade-in duration-300">
      <div className="relative w-full max-w-md rounded-3xl bg-[#111827] border border-[#1F2937] shadow-2xl p-6 sm:p-8 text-white flex flex-col gap-6 overflow-hidden">
        {/* Close Button to allow guest viewing */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors z-20 cursor-pointer"
          title="গেস্ট হিসেবে দেখুন"
          aria-label="বন্ধ করুন"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Branding */}
        <div className="flex flex-col items-center text-center gap-3 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 border border-blue-400/30">
            <Cpu className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{STORE_INFO.authorizedBadge}</span>
          </div>

          <div>
            <h2 className="text-2xl font-black font-heading tracking-tight text-[#F9FAFB]">
              MM ELECTROLAB
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Display & Precision Lab • সুন্দরগঞ্জ, গাইবান্ধা
            </p>
          </div>
        </div>

        {/* Description & Value Proposition */}
        <div className="relative z-10 bg-[#0B0F19] rounded-2xl p-4 border border-[#1F2937] flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <span>লগইন সুবিধা</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            সার্ভিস বুকিং, ট্র্যাকিং ও প্রোফাইল হিস্ট্রি নিরাপদ রাখতে গুগল দিয়ে লগইন করুন অথবা চাইলে গেস্ট হিসেবে প্ল্যাটফর্ম ঘুরে দেখুন।
          </p>

          <div className="pt-2 border-t border-[#1F2937] flex flex-col gap-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>লাইভ সার্ভিস ও রিকভারি স্ট্যাটাস ট্র্যাকিং</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>জাপানি COF বন্ডিং ও সেইম ডে ল্যাব স্লট</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>১৮০ দিনের ডিজিটাল ওয়ারেন্টি ও সার্ভিস রেকর্ড</span>
            </div>
          </div>
        </div>

        {/* Continue with Google & Guest Buttons */}
        <div className="relative z-10 flex flex-col gap-3">
          <button
            onClick={handleGoogleLogin}
            disabled={isSigningIn}
            className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-md active:scale-[0.98] disabled:opacity-60 cursor-pointer"
          >
            {isSigningIn ? (
              <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>{isSigningIn ? 'লগইন হচ্ছে...' : 'গুগল দিয়ে লগইন করুন'}</span>
          </button>

          <button
            onClick={handleDismiss}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-700/80"
          >
            <span>লগইন ছাড়াই গেস্ট হিসেবে ভিজিট করুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <p className="text-[11px] text-slate-500 text-center">
            যেকোনো সময় ওপরের প্রোফাইল আইকন থেকে গুগল লগইন করতে পারবেন।
          </p>
        </div>

        {/* Trust Badges Footer */}
        <div className="relative z-10 pt-3 border-t border-[#1F2937] flex items-center justify-between text-[11px] text-slate-400">
          <span>প্রোপ্রাইটর: {STORE_INFO.proprietorBn}</span>
          <span className="text-emerald-400 font-medium">BTEB সার্টিফাইড</span>
        </div>
      </div>
    </div>
  );
};

