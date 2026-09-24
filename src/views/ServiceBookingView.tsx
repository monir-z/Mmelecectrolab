import React, { useState, useEffect } from 'react';
import { ViewName, ServiceBooking } from '../types';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { STORE_INFO } from '../data/initialData';
import { RepairProgressStepper } from '../components/common/RepairProgressStepper';
import {
  Wrench,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  MapPin,
  Phone,
  AlertCircle,
  Truck,
  ArrowRight,
  Share2,
  Sparkles
} from 'lucide-react';

interface ServiceBookingViewProps {
  onNavigate: (view: ViewName, trackingId?: string) => void;
}

const DEVICE_TYPES = [
  'LED / Smart TV (টিভি)',
  'Inverter Refrigerator (ফ্রিজ)',
  'Inverter AC (এয়ার কন্ডিশনার)',
  'BLDC / Ceiling Fan (ফ্যান)',
  'Pure Sine Wave IPS / UPS',
  'Microwave Oven (ওভেন)',
  'অন্যান্য ইলেকট্রনিক্স ডিভাইস'
];

const BRANDS = ['Sony', 'Samsung', 'LG', 'Singer', 'Walton', 'Vision', 'Haier', 'Gree', 'General', 'অন্যান্য'];

const UPAZILAS = [
  'সুন্দরগঞ্জ (Sundarganj)',
  'গাইবান্ধা সদর (Gaibandha Sadar)',
  'সাদুল্লাপুর (Sadullapur)',
  'পলাশবাড়ী (Palashbari)',
  'গোবিন্দগঞ্জ (Gobindaganj)',
  'সাঘাটা (Saghata)',
  'ফুলছড়ি (Fulchhari)',
  'অন্যান্য'
];

export const ServiceBookingView: React.FC<ServiceBookingViewProps> = ({ onNavigate }) => {
  const { addBooking } = useOrders();
  const { showToast } = useToast();
  const { user, userProfile, signInWithGoogle } = useAuth();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deviceType, setDeviceType] = useState('LED / Smart TV (টিভি)');
  const [brand, setBrand] = useState('Samsung');
  const [modelNumber, setModelNumber] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [serviceType, setServiceType] = useState<'lab_drop' | 'home_service'>('lab_drop');
  const [address, setAddress] = useState('');
  const [upazila, setUpazila] = useState('সুন্দরগঞ্জ (Sundarganj)');
  const [preferredDate, setPreferredDate] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  const [submittedBooking, setSubmittedBooking] = useState<ServiceBooking | null>(null);

  // Pre-fill user information if logged in
  useEffect(() => {
    if (userProfile) {
      if (userProfile.displayName && !customerName) setCustomerName(userProfile.displayName);
      if (userProfile.phone && !phone) setPhone(userProfile.phone);
      if (userProfile.address && !address) setAddress(userProfile.address);
      if (userProfile.upazila) setUpazila(userProfile.upazila);
    } else if (user && user.displayName && !customerName) {
      setCustomerName(user.displayName);
    }
  }, [user, userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !phone.trim() || !issueDescription.trim()) {
      showToast('অনুগ্রহ করে নাম, ফোন নম্বর ও সমস্যার বিবরণ দিন', 'warning');
      return;
    }

    const estimatedCost =
      serviceType === 'home_service'
        ? '৳৮০০ - ৩,৫০০ (হোম ভিজিট সহ)'
        : '৳৫০০ - ৩,০০০ (ল্যাব ড্রপ)';

    const bookingId = addBooking({
      customerName,
      phone,
      deviceType,
      brand,
      modelNumber: modelNumber || undefined,
      issueDescription,
      serviceType,
      address: address || 'সিঙ্গার প্লাজা ল্যাব ড্রপ',
      district: 'গাইবান্ধা',
      upazila,
      preferredDate: preferredDate || 'যত দ্রুত সম্ভব',
      preferredTimeSlot: 'সকাল ১০টা - বিকাল ৫টা',
      isUrgent,
      estimatedCostRange: estimatedCost
    });

    const fullBooking: ServiceBooking = {
      id: bookingId,
      customerName,
      phone,
      deviceType,
      brand,
      modelNumber,
      issueDescription,
      serviceType,
      address,
      district: 'গাইবান্ধা',
      upazila,
      preferredDate: preferredDate || 'আজই',
      preferredTimeSlot: 'সকাল ১০টা - বিকাল ৫টা',
      isUrgent,
      status: 'submitted',
      createdAt: new Date().toISOString(),
      estimatedCostRange: estimatedCost
    };

    // Save to Firestore service_requests and bookings collections
    try {
      const payload = {
        id: bookingId,
        userId: user?.uid || null,
        customerName,
        phone,
        deviceType,
        brand,
        modelNumber: modelNumber || '',
        issueDescription,
        serviceType,
        address,
        upazila,
        district: 'গাইবান্ধা',
        isUrgent,
        status: 'submitted',
        createdAt: new Date().toISOString(),
        estimatedCostRange: estimatedCost
      };

      await Promise.all([
        setDoc(doc(db, 'service_requests', bookingId), payload),
        setDoc(doc(db, 'bookings', bookingId), payload)
      ]);
    } catch (err) {
      console.warn('Could not sync booking to Firestore immediately:', err);
    }

    setSubmittedBooking(fullBooking);
    showToast('আপনার সার্ভিস বুকিং সফলভাবে জমা হয়েছে!', 'success');
  };

  const handleShareToWhatsApp = () => {
    if (!submittedBooking) return;
    const text = `আসসালামু আলাইকুম, আমি MM ELECTROLAB-এ সার্ভিস বুকিং দিয়েছি।\nটোকেন নম্বর: ${submittedBooking.id}\nডিভাইস: ${submittedBooking.deviceType} (${submittedBooking.brand})\nসমস্যা: ${submittedBooking.issueDescription}\nনাম: ${submittedBooking.customerName}\nমোবাইল: ${submittedBooking.phone}`;
    window.open(`${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (submittedBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-24 animate-in fade-in duration-300">
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-800 shadow-md shadow-emerald-500/10">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs font-mono font-bold uppercase text-blue-600 dark:text-cyan-400 tracking-wider">
            Booking Confirmed & Token Generated
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white mt-1">
            সার্ভিস টোকেন সফলভাবে জেনারেট হয়েছে!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto">
            আপনার অনুরোধটি আমাদের ল্যাব রেজিস্টারে সংরক্ষিত হয়েছে। নিচে আপনার সার্ভিসের বর্তমান লাইফসাইকেল দেখতে পাচ্ছেন।
          </p>

          {/* Embedded 5-Stage Stepper Component */}
          <div className="my-6 text-left">
            <RepairProgressStepper
              status={submittedBooking.status || 'received'}
              trackingId={submittedBooking.id}
              deviceTitle={`${submittedBooking.deviceType} (${submittedBooking.brand})`}
              showDetails={true}
            />
          </div>

          <div className="my-6 p-4 rounded-2xl bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-[#1F2937] text-left text-xs text-slate-700 dark:text-slate-300 flex flex-col gap-2">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-[#1F2937]">
              <span className="text-slate-500 dark:text-slate-400">সার্ভিস টোকেন নম্বর:</span>
              <span className="font-mono text-base font-bold text-blue-600 dark:text-cyan-400">{submittedBooking.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">ডিভাইস ও ব্র্যান্ড:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{submittedBooking.deviceType} - {submittedBooking.brand}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">সার্ভিসের ধরন:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {submittedBooking.serviceType === 'lab_drop' ? 'সিঙ্গার প্লাজা ল্যাব ড্রপ' : 'হোম সার্ভিস'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">আনুমানিক খরচ:</span>
              <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">{submittedBooking.estimatedCostRange}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onNavigate('track', submittedBooking.id)}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-900/20 active:scale-98 transition-all cursor-pointer"
            >
              লাইভ ট্র্যাকিং পেজে যান
            </button>

            <button
              onClick={handleShareToWhatsApp}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20 active:scale-98 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপে পাঠান</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-20">
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold text-blue-700 dark:text-cyan-400 uppercase tracking-wider">
          Instant Service Appointment
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white mt-1">
          অনলাইন সার্ভিস স্লট বুকিং
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          ল্যাবে আসার আগে স্লট বুক করুন অথবা দক্ষ টেকনিশিয়ানের হোম সার্ভিস পান।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-6">
        {/* Device Information */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Wrench className="w-4 h-4 text-blue-700 dark:text-cyan-400" />
            <span>১. ডিভাইসের তথ্য</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">ডিভাইসের ধরন *</label>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 cursor-pointer"
              >
                {DEVICE_TYPES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">ব্র্যান্ড *</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 cursor-pointer"
              >
                {BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">মডেল নম্বর (যদি জানা থাকে)</label>
              <input
                type="text"
                value={modelNumber}
                onChange={(e) => setModelNumber(e.target.value)}
                placeholder="যেমন: Sony Bravia 43W660G বা Singer Inverter 220L"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">সমস্যার বিবরণ *</label>
              <textarea
                required
                rows={3}
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="যেমন: টিভির পর্দায় চিকন রঙিন দাগ এসেছে / ফ্রিজের ফ্যান চলে কিন্তু ঠান্ডা হয় না..."
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Service Type Selection */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <MapPin className="w-4 h-4 text-blue-700 dark:text-cyan-400" />
            <span>২. সার্ভিসের ধরন নির্বাচন করুন</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label
              className={`p-4 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                serviceType === 'lab_drop'
                  ? 'bg-blue-50/70 dark:bg-blue-950/60 border-blue-600 dark:border-cyan-500 ring-2 ring-blue-500/10'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <input
                type="radio"
                name="serviceType"
                value="lab_drop"
                checked={serviceType === 'lab_drop'}
                onChange={() => setServiceType('lab_drop')}
                className="accent-blue-700 dark:accent-cyan-400"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">ল্যাব ড্রপ-অফ (Lab Drop-off)</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">সিঙ্গার প্লাজা ল্যাবে ডিভাইস নিয়ে আসবেন</span>
              </div>
            </label>

            <label
              className={`p-4 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                serviceType === 'home_service'
                  ? 'bg-blue-50/70 dark:bg-blue-950/60 border-blue-600 dark:border-cyan-500 ring-2 ring-blue-500/10'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <input
                type="radio"
                name="serviceType"
                value="home_service"
                checked={serviceType === 'home_service'}
                onChange={() => setServiceType('home_service')}
                className="accent-blue-700 dark:accent-cyan-400"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">অন-সাইট হোম সার্ভিস (Home Service)</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">টেকনিশিয়ান আপনার বাসায় গিয়ে সার্ভিস দিবেন</span>
              </div>
            </label>
          </div>
        </div>

        {/* Customer Information */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Phone className="w-4 h-4 text-blue-700 dark:text-cyan-400" />
            <span>৩. গ্রাহকের যোগাযোগের তথ্য</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">আপনার নাম *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="যেমন: মোঃ রবিউল ইসলাম"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 placeholder-slate-400 dark:placeholder-slate-500"
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
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-mono focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">উপজেলা / এলাকা</label>
              <select
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 cursor-pointer"
              >
                {UPAZILAS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-700 dark:text-slate-300 font-semibold block mb-1">বিস্তারিত ঠিকানা (গ্রাম / রোড)</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="যেমন: সুন্দরগঞ্জ বাজার, ডাকবাংলো মোড়"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>সার্ভিস বুকিং নিশ্চিত করুন</span>
        </button>
      </form>
    </div>
  );
};
