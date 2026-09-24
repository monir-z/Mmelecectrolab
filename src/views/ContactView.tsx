import React, { useState } from 'react';
import { ViewName } from '../types';
import { STORE_INFO } from '../data/initialData';
import { useToast } from '../context/ToastContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Navigation
} from 'lucide-react';

interface ContactViewProps {
  onNavigate: (view: ViewName) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast('অনুগ্রহ করে নাম, ফোন নম্বর ও বার্তা লিখুন', 'warning');
      return;
    }
    setIsSent(true);
    showToast('আপনার বার্তাটি পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।', 'success');
  };

  const openGoogleMaps = () => {
    const query = encodeURIComponent('Singer Plaza, Upazila Road, Sundarganj, Gaibandha');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20 flex flex-col gap-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-white/[0.05] border border-blue-200 dark:border-white/10 text-xs font-semibold text-blue-700 dark:text-cyan-300 shadow-xs mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse" />
          <span>{STORE_INFO.authorizedBadge} • {STORE_INFO.proprietorBn}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white mt-1">
          যোগাযোগ ও ল্যাব লোকেশন
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          {STORE_INFO.name} — যেকোনো কারিগরি পরামর্শ, পার্টসের খোঁজ বা হোম সার্ভিসের প্রয়োজনে সরাসরি যোগাযোগ করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information Cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 flex flex-col gap-6 shadow-sm">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              ল্যাব তথ্য
            </h3>

            {/* Address */}
            <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100 dark:border-blue-900">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">সিঙ্গার প্লাজা (১ম তলা)</p>
                <p className="text-slate-600 dark:text-slate-400">উপজেলা রোড, সুন্দরগঞ্জ</p>
                <p className="text-slate-500 dark:text-slate-400">গাইবান্ধা - ৫৭৩০, বাংলাদেশ</p>
                <button
                  onClick={openGoogleMaps}
                  className="mt-2 text-blue-700 dark:text-cyan-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>গুগল ম্যাপে লোকেশন দেখুন</span>
                </button>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100 dark:border-emerald-900">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">হটলাইন ও বিকাশ নম্বর</p>
                <a href={`tel:${STORE_INFO.phone1}`} className="text-blue-700 dark:text-cyan-400 font-mono font-bold block mt-0.5 hover:underline">
                  {STORE_INFO.phone1}
                </a>
                <a href={`tel:${STORE_INFO.phone2}`} className="text-slate-500 dark:text-slate-400 font-mono block hover:underline">
                  {STORE_INFO.phone2}
                </a>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">IMO / WhatsApp চালু আছে</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5 border border-teal-100 dark:border-teal-900">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">অফিসিয়াল ইমেইল</p>
                <a href={`mailto:${STORE_INFO.email}`} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white break-all">
                  {STORE_INFO.email}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-100 dark:border-amber-900">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">খোলা থাকার সময়</p>
                <p className="text-slate-600 dark:text-slate-400">{STORE_INFO.hoursBn}</p>
                <p className="text-emerald-700 dark:text-emerald-400 text-[11px] mt-0.5 font-semibold">সপ্তাহের ৭ দিনই ল্যাব খোলা থাকে</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct card */}
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-emerald-700 dark:text-emerald-400" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">সরাসরি হোয়াটসঅ্যাপ চ্যাট</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">ছবি বা ভিডিও পাঠিয়ে দ্রুত কোটেশন নিন</span>
              </div>
            </div>
            <a
              href={`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent('হ্যালো MM ELECTROLAB, আমি সার্ভিস সম্পর্কে কথা বলতে চাই।')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              মেসেজ দিন
            </a>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 mb-6">
            অনলাইন বার্তা পাঠান
          </h3>

          {isSent ? (
            <div className="py-12 text-center flex flex-col items-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-3" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">আপনার বার্তা পৌঁছেছে!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-sm">
                ধন্যবাদ। মোঃ রবিউল ইসলাম বা আমাদের টেকনিশিয়ান অল্প সময়ের মধ্যেই আপনার দেওয়া নম্বরে কল করবেন।
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setName('');
                  setPhone('');
                  setMessage('');
                }}
                className="mt-5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
              >
                অন্য একটি বার্তা পাঠান
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">আপনার নাম *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: মোঃ কামরুল হাসান"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-mono placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">বিষয়</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="যেমন: ডিসপ্লে বন্ডিং খরচ / পার্টস প্রাপ্যতা"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">বিস্তারিত বার্তা *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="আপনার জিজ্ঞাসা বা ডিভাইসের সমস্যা সম্পর্কে লিখুন..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>বার্তা পাঠান</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Map visualizer section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">সিঙ্গার প্লাজা ম্যাপ লোকেশন</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">উপজেলা রোড, সুন্দরগঞ্জ বাজার কেন্দ্রস্থল</p>
          </div>
          <button
            onClick={openGoogleMaps}
            className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>গুগল ম্যাপে নেভিগেট করুন</span>
          </button>
        </div>

        <div className="relative aspect-[21/9] w-full rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-cyan-400 flex items-center justify-center animate-bounce mb-2">
            <MapPin className="w-6 h-6" />
          </div>
          <span className="font-heading font-bold text-slate-900 dark:text-white text-sm">MM ELECTROLAB</span>
          <span className="text-xs text-blue-700 dark:text-cyan-400 font-mono mt-0.5 font-bold">Singer Plaza, Upazila Road, Sundarganj, Gaibandha</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            সুস্পষ্ট ল্যান্ডমার্ক: সুন্দরগঞ্জ সিঙ্গার শোরুম ভবনের ১ম তলা
          </span>
        </div>
      </div>
    </div>
  );
};
