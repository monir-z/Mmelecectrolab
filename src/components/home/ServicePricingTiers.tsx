import React, { useState } from 'react';
import { ViewName } from '../../types';
import {
  Check,
  Clock,
  ShieldCheck,
  Wrench,
  Monitor,
  Cpu,
  ArrowRight,
  PhoneCall,
  SlidersHorizontal,
  Layers,
  Sparkles,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface ServicePricingTiersProps {
  onNavigate: (view: ViewName) => void;
}

type ServiceCategory = 'bonding' | 'component' | 'matrix';

interface ServiceTier {
  id: string;
  tierNumber: string;
  name: string;
  nameBn: string;
  targetScreens: string;
  targetScreensBn: string;
  priceDisplay: string;
  priceNoteBn: string;
  estimatedTime: string;
  warrantyPeriod: string;
  isPopular?: boolean;
  technology: string;
  technologyBn: string;
  featuresBn: string[];
  solvedIssuesBn: string[];
}

const DISPLAY_BONDING_TIERS: ServiceTier[] = [
  {
    id: 'tier-bonding-standard',
    tierNumber: '০১',
    name: 'Standard Single-COF Bonding',
    nameBn: 'স্ট্যান্ডার্ড সিঙ্গেল-কফ বন্ডিং',
    targetScreens: '32" to 43" HD / Full HD Panels',
    targetScreensBn: '৩২" থেকে ৪৩" বেসিক ও স্মার্ট টিভি প্যানেল',
    priceDisplay: '৳১,৫০০ – ৳২,২০০',
    priceNoteBn: 'প্যানেল প্রতি ১টি COF রিবন্ডিং ও টেস্ট অন্তর্ভুক্ত',
    estimatedTime: '২ – ৩ ঘণ্টা (একই দিনে ডেলিভারি)',
    warrantyPeriod: '৯০ দিনের লিখিত ওয়ারেন্টি',
    isPopular: false,
    technology: 'Computerized Pulse Heat Thermode + Japanese Hitachi ACF',
    technologyBn: 'কম্পিউটারাইজড পালস-হিট থার্মোড ও অরিজিনাল হিতাচি এসিএফ টেপ',
    featuresBn: [
      '১টি TAB/COF আইসি সম্পূর্ণ রিবন্ডিং',
      'জাপানি হিতাচি থার্মোসেটিং কন্ডাক্টিভ এসিএফ ফিল্ম',
      'আইসোপ্রোপাইল আল্ট্রাসনিক সারফেস ক্লিয়ারিং',
      '১০৮০p ফুল এইচডি কালার প্যাটার্ন টেস্ট',
      'ল্যাব টেস্ট রিপোর্ট ও সিলযুক্ত ওয়ারেন্টি কার্ড'
    ],
    solvedIssuesBn: [
      'ডিসপ্লেতে খাড়া রঙিন চিকন দাগ (Vertical lines)',
      'স্ক্রিনের একপাশে হালকা ঝাপসা ভাব',
      'তাপ বাড়লে ছবি কেপে ওঠা বা ফ্লিকারিং'
    ]
  },
  {
    id: 'tier-bonding-pro',
    tierNumber: '০২',
    name: 'Multi-COF & 4K UHD Laser Bonding',
    nameBn: 'মাল্টি-কফ ও ৪কে ইউএইচডি প্রিসিশন বন্ডিং',
    targetScreens: '43" to 55" 4K Smart TV / OLED / QLED',
    targetScreensBn: '৪৩" থেকে ৫৫" ৪কে স্মার্ট টিভি ও কিউলেড প্যানেল',
    priceDisplay: '৳২,৫০০ – ৳৩,৮০০',
    priceNoteBn: '২ থেকে ৪টি COF একযোগে লেজার রিবন্ডিং ও গ্লাস ট্র্যাকিং',
    estimatedTime: '৩ – ৫ ঘণ্টা (ল্যাব প্রায়োরিটি)',
    warrantyPeriod: '১৮০ দিনের (৬ মাস) পূর্ণ গ্যারান্টি',
    isPopular: true,
    technology: 'Dual-Axis Optical Microscope Alignment (10-Micron Accuracy)',
    technologyBn: 'ডুয়াল অপটিক্যাল মাইক্রোস্কোপ অ্যালাইনমেন্ট ও পালস প্রেসার কন্ট্রোল',
    featuresBn: [
      '২ থেকে ৪টি COF মাইক্রো-প্রিসিশন রি-বন্ডিং',
      'উচ্চ ঘনত্বের মাইক্রোস্কোপিক গ্লাস ট্র্যাক রিকনস্ট্রাকশন',
      'উচ্চ তাপ ও আর্দ্রতা প্রতিরোধী স্পেশাল কোটিং',
      '৪কে ইউএইচডি ৬০Hz/১২০Hz কালার স্পেকট্রাম টেস্ট',
      '৪৮ ঘণ্টার বার্ন-ইন স্ট্রেস ও রিফ্রেশ রেট যাচাই'
    ],
    solvedIssuesBn: [
      'অর্ধেক ডিসপ্লে কালো বা অর্ধেক সাদা হয়ে থাকা',
      'ডাবল ইমেজ বা ছবির পেছনে ছায়া পড়া (Ghosting)',
      'ছবি আস্তে আস্তে আসা বা স্লো মোশন ডিসপ্লে',
      'প্যানেলে পানি বা তরল পড়ে ক্ষয়ে যাওয়া ট্র্যাক'
    ]
  },
  {
    id: 'tier-bonding-enterprise',
    tierNumber: '০৩',
    name: 'Ultra-Large & Curved Screen Bonding',
    nameBn: 'লার্জ ডিসপ্লে, কার্ভড ও গেট-কাটার রিস্টোরেশন',
    targetScreens: '58" to 85"+ Premium & Curved Commercial Panels',
    targetScreensBn: '৫৮" থেকে ৮৫"+ আল্ট্রা লার্জ ও কমার্শিয়াল প্যানেল',
    priceDisplay: '৳৪,২০০ – ৳৬,৫০০',
    priceNoteBn: 'লেজার শর্ট-কাটিং, জিআইজি গেট রিস্টোর ও মাল্টি-হেড ফিউশন',
    estimatedTime: '২৪ – ৪৮ ঘণ্টা (কম্প্রিহেনসিভ ল্যাব রান)',
    warrantyPeriod: '১৮০ দিনের এক্সটেন্ডেড গ্যারান্টি',
    isPopular: false,
    technology: 'Computerized Vacuum Platform & Micro Laser Short Repair Head',
    technologyBn: 'কম্পিউটারাইজড ভ্যাকুয়াম প্ল্যাটফর্ম ও মাইক্রো-লেজার শর্ট রিমুভার',
    featuresBn: [
      'গেট-ইন-গ্লাস (GIG/GOA) ইন্টারনাল শর্ট লেজার কাটিং',
      'কার্ভড ও আল্ট্রা-ওয়াইড প্যানেল ভ্যাকুয়াম ব্যালেন্সিং',
      'জিরো রেজিসট্যান্স গোল্ড-প্লেটেড এক্সটার্নাল বাইপাস',
      'এইচডিআর১০+ কালার ও ইউনিফরমিটি ডাইনামিক অ্যানালাইসিস',
      'কমপ্লিট সার্টিফাইড ল্যাব ডায়াগনস্টিক রিপোর্ট'
    ],
    solvedIssuesBn: [
      'প্যানেলের ভেতরে শর্ট সার্কিটের কারণে কোনো ছবি না আসা',
      'প্যানেলে অনুভূমিক ও উল্লম্ব বহুবিধ দাগ',
      'কার্ভড স্ক্রিনে ডিসপ্লে ফ্লিকারিং ও ব্ল্যাক-আউট',
      'নতুন প্যানেল পরিবর্তনের ৬০-৭০% খরচ সাশ্রয়'
    ]
  }
];

const COMPONENT_REPAIR_TIERS: ServiceTier[] = [
  {
    id: 'tier-component-power',
    tierNumber: '০১',
    name: 'Power Supply & SMPS Circuit Restoration',
    nameBn: 'পাওয়ার সাপ্লাই ও এসএমপিএস সার্কিট মেরামত',
    targetScreens: 'Smart TVs, Inverters & Audio-Video Systems',
    targetScreensBn: 'টিভি এসএমপিএস, ইনভার্টার বোর্ড ও অডিও সিস্টেম',
    priceDisplay: '৳৮০০ – ৳১,৪০০',
    priceNoteBn: 'কম্পোনেন্ট ও মাইক্রো-সোল্ডারিং সার্ভিসিং চার্জ অন্তর্ভুক্ত',
    estimatedTime: '২ – ৪ ঘণ্টা (দ্রুত সমাধান)',
    warrantyPeriod: '৯০ দিনের পার্টস ও সার্ভিস ওয়ারেন্টি',
    isPopular: false,
    technology: 'Digital Oscilloscope Waveform Analysis & High-Temp SMD Rework',
    technologyBn: 'অসিলোস্কোপ রিপল অ্যানালাইসিস ও লিড-ফ্রি এসএমডি সোল্ডারিং',
    featuresBn: [
      'নো পাওয়ার / পুরোপুরি ডেড সার্কিট পুনরুজ্জীবন',
      'হাই-ভোল্টেজ সার্জ প্রটেকশন ও মসফেট প্রতিস্থাপন',
      'অরিজিনাল জাপানি নিচিকন/রুবিঙ্কন লো-ইএসআর ক্যাপাসিটর',
      'রিপল ভোল্টেজ ও থার্মাল লোড স্টেবিলিটি টেস্ট',
      'লিখিত সার্ভিস গ্যারান্টি কার্ড'
    ],
    solvedIssuesBn: [
      'পাওয়ার দিলে কোনো লাইট জ্বলে না (Complete Dead)',
      'বজ্রপাত বা ভোল্টেজ ওঠানামায় ধোঁয়া বা পোড়া গন্ধ',
      'টিভি কিছুক্ষণ চলে বন্ধ হয়ে যাওয়া'
    ]
  },
  {
    id: 'tier-component-mainboard',
    tierNumber: '০২',
    name: 'Smart TV Mainboard & BGA Chip-Level Rework',
    nameBn: 'স্মার্ট টিভি মাদারবোর্ড ও বিজিএ প্রসেসর রিপেয়ার',
    targetScreens: 'Android Smart TVs (Sony, LG, Samsung, Walton, Singer, etc.)',
    targetScreensBn: 'সকল ব্র্যান্ডের অ্যান্ড্রয়েড ও গুগল স্মার্ট টিভি মাদারবোর্ড',
    priceDisplay: '৳১,৫০০ – ৳২,৫০০',
    priceNoteBn: 'বিজিএ রিবলিং অথবা ইএমএমসি ফ্ল্যাশ মেমোরি প্রোগ্রামিং সহ',
    estimatedTime: '৪ – ৬ ঘণ্টা (একই দিনে ডেলিভারি)',
    warrantyPeriod: '৯০ দিনের লিখিত ওয়ারেন্টি',
    isPopular: true,
    technology: 'Infrared BGA Rework Station & High-Speed eMMC Programmer',
    technologyBn: 'ইনফ্রারেড বিজিএ আরওয়ার্ক স্টেশন ও আরটি৮০৯এইচ / টি৪৮ প্রোগ্রামার',
    featuresBn: [
      'বিজিএ প্রসেসর রিবলিং ও রিফ্লো মাইক্রো-সোল্ডারিং',
      'ইএমএমসি (eMMC) ফ্ল্যাশ আইসি ডাম্প রিড/রাইট ও আনব্রিক',
      'ব্র্যান্ড অরিজিনাল ফার্মওয়্যার আপডেট ও কাস্টম বুট ফাইল',
      'এইচডিএমআই, সাউন্ড সেকশন ও ওয়াইফাই/ব্লুটুথ মডিউল ফিক্স',
      '৪কে ভিডিও স্ট্রিমিং ও থার্মাল ইমেজিং ক্যামেরা টেস্ট'
    ],
    solvedIssuesBn: [
      'স্ট্যান্ডবাই লাল বাতি জ্বলে থাকে কিন্তু চালু হয় না',
      'টিভি অন হয়ে লোগো (Logo)-তে আটকে থাকা বা রিস্টার্ট হওয়া',
      'ছবি আছে কিন্তু কোনো শব্দ বা সাউন্ড নেই',
      'এইচডিএমআই পোর্ট বা ওয়াইফাই সংযোগ না পাওয়া'
    ]
  },
  {
    id: 'tier-component-inverter',
    tierNumber: '০৩',
    name: 'Inverter AC & Refrigerator Drive PCB Restoration',
    nameBn: 'ইনভার্টার এসি ও রেফ্রিজারেটর ড্রাইভ পিসিবি মেরামত',
    targetScreens: 'Inverter Air Conditioners & Frost-Free Refrigerators',
    targetScreensBn: 'গ্রী, মিডিয়া, জেনারেল, ওয়ালটন, সিঙ্গার ইনভার্টার পিসিবি',
    priceDisplay: '৳১,৮০০ – ৳৩,৫০০',
    priceNoteBn: 'আইপিএম মডিউল ও কমিউনিকেশন ড্রাইভ রিস্টোরেশন সহ',
    estimatedTime: '২৪ ঘণ্টা (ল্যাব অথবা অন-সাইট ট্রাবলশুট)',
    warrantyPeriod: '৯০ দিনের সার্ভিস ওয়ারেন্টি',
    isPopular: false,
    technology: '3-Phase BLDC Simulated Load Testing & Conformal Moisture Sealing',
    technologyBn: 'থ্রি-ফেজ বিএলডিসি মোটর সিমুলেটেড লোড টেস্ট ও সিলিকন কোটিং',
    featuresBn: [
      'ইনভার্টার ইন্টেলিজেন্ট পাওয়ার মডিউল (IPM) প্রতিস্থাপন',
      'ইনডোর-আউটডোর মাইক্রোকন্ট্রোলার কমিউনিকেশন এরর ফিক্স',
      'সেন্সর নেটওয়ার্ক ক্যালিব্রেশন ও গেট ড্রাইভ আইসোলেশন',
      'আর্দ্রতা নিরোধক ইন্ডাস্ট্রিয়াল কনফরমাল সিলিকন কোটিং',
      'কম্প্রেসর ড্রাইভ স্মুথ স্টার্ট ও ভোল্টেজ সেফগার্ড টেস্ট'
    ],
    solvedIssuesBn: [
      'এসি চালু হয় কিন্তু আউটডোর কম্প্রেসর ঘোরে না',
      'ডিসপ্লেতে E1, E6, F3 ইত্যাদি এরর কোড প্রদর্শিত হওয়া',
      'ইনভার্টার ফ্রিজের কম্প্রেসর টিক টিক শব্দ করে বন্ধ হওয়া',
      'নতুন মাদারবোর্ড না কিনে ৭০% খরচে দীর্ঘস্থায়ী সমাধান'
    ]
  }
];

export const ServicePricingTiers: React.FC<ServicePricingTiersProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('bonding');

  // Quick estimator state
  const [selectedDeviceSize, setSelectedDeviceSize] = useState<string>('43_smart');

  const estimatorRates: Record<string, { serviceName: string; tierTitle: string; cost: string; time: string; warranty: string }> = {
    '32_led': {
      serviceName: 'LED টিভি ডিসপ্লে সিঙ্গেল-কফ বন্ডিং',
      tierTitle: 'টিয়ার ০১: স্ট্যান্ডার্ড সিঙ্গেল-কফ',
      cost: '৳১,৫০০ – ৳১,৮০০',
      time: '২ – ৩ ঘণ্টা',
      warranty: '৯০ দিন লিখিত ওয়ারেন্টি'
    },
    '43_smart': {
      serviceName: '৪৩" ৪কে স্মার্ট টিভি ডিসপ্লে লেজার বন্ডিং',
      tierTitle: 'টিয়ার ০২: মাল্টি-কফ ও ৪কে বন্ডিং (পপুলার)',
      cost: '৳২,৫০০ – ৳৩,২০০',
      time: '৩ – ৪ ঘণ্টা',
      warranty: '১৮০ দিন (৬ মাস) পূর্ণ গ্যারান্টি'
    },
    '55_uhd': {
      serviceName: '৫৫" ইউএইচডি / কিউলেড ডিসপ্লে বন্ডিং',
      tierTitle: 'টিয়ার ০২: মাল্টি-কফ প্রিসিশন বন্ডিং',
      cost: '৳৩,২০০ – ৳৩,৮০০',
      time: '৪ – ৫ ঘণ্টা',
      warranty: '১৮০ দিন (৬ মাস) পূর্ণ গ্যারান্টি'
    },
    '65_plus': {
      serviceName: '৬৫"-৮৫" প্রিমিয়াম / কার্ভড ডিসপ্লে রিস্টোরেশন',
      tierTitle: 'টিয়ার ০৩: আল্ট্রা লার্জ ও ভ্যাকুয়াম লেজার',
      cost: '৳৪,২০০ – ৳৬,৫০০',
      time: '২৪ – ৪৮ ঘণ্টা',
      warranty: '১৮০ দিন এক্সটেন্ডেড গ্যারান্টি'
    },
    'mainboard_smart': {
      serviceName: 'স্মার্ট টিভি মাদারবোর্ড বিজিএ / ইএমএমসি ফিক্স',
      tierTitle: 'টিয়ার ০২: বিজিএ প্রসেসর ও মেমোরি রিস্টোর',
      cost: '৳১,৫০০ – ৳২,৫০০',
      time: '৪ – ৬ ঘণ্টা',
      warranty: '৯০ দিন লিখিত ওয়ারেন্টি'
    },
    'ac_fridge_pcb': {
      serviceName: 'ইনভার্টার এসি বা ফ্রিজ ড্রাইভ পিসিবি মেরামত',
      tierTitle: 'টিয়ার ০৩: ইনভার্টার আইপিএম ও কমিউনিকেশন',
      cost: '৳১,৮০০ – ৳৩,৫০০',
      time: '২৪ ঘণ্টা',
      warranty: '৯০ দিন লিখিত ওয়ারেন্টি'
    }
  };

  const currentEstimator = estimatorRates[selectedDeviceSize] || estimatorRates['43_smart'];

  const tiersToDisplay = activeTab === 'bonding' ? DISPLAY_BONDING_TIERS : COMPONENT_REPAIR_TIERS;

  return (
    <section className="bg-slate-50/80 dark:bg-[#070D18] border-y border-slate-200 dark:border-slate-800/80 py-7 sm:py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-blue-700 dark:text-cyan-400 uppercase tracking-wider mb-1 font-mono">
            <span>Engineering Lab Services</span>
            <span aria-hidden="true">·</span>
            <span>Transparent Pricing</span>
          </div>

          <h2 className="text-lg sm:text-2xl font-bold font-heading text-slate-900 dark:text-white leading-tight">
            সার্ভিস টিয়ার ও নির্ধারিত রেট চার্ট
          </h2>

          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
            কোনো গোপন চার্জ নেই। জাপানি পালস-হিট বন্ডিং ও ইনফ্রারেড বিজিএ ল্যাবে সরাসরি পরীক্ষিত সার্ভিস ও লিখিত ওয়ারেন্টি।
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
            <button
              onClick={() => setActiveTab('bonding')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'bonding'
                  ? 'bg-blue-700 dark:bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>ডিসপ্লে বন্ডিং সার্ভিস (Display Bonding)</span>
            </button>

            <button
              onClick={() => setActiveTab('component')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'component'
                  ? 'bg-blue-700 dark:bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>কম্পোনেন্ট লেভেল রিপেয়ার (Chip-Level PCB)</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`hidden md:flex px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all items-center gap-2 cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-blue-700 dark:bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>তুলনামূলক মেট্রিক্স (Full Matrix)</span>
            </button>
          </div>
        </div>

        {/* Service Subhead Banner with Lab Metadata */}
        {activeTab !== 'matrix' && (
          <div className="mb-8 p-4 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800/60">
                {activeTab === 'bonding' ? <Monitor className="w-5 h-5" /> : <Cpu className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {activeTab === 'bonding' 
                    ? 'অত্যাধুনিক অপটিক্যাল পালস-হিট বন্ডিং ল্যাব'
                    : 'মাইক্রো-সোল্ডারিং ও বিজিএ চিপ-লেভেল ডায়াগনস্টিক ল্যাব'}
                </h4>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                  <span>সুন্দরগঞ্জ সিঙ্গার প্লাজা ল্যাব</span>
                  <span aria-hidden="true">·</span>
                  <span>১০০% অরিজিনাল স্পেয়ার্স</span>
                  <span aria-hidden="true">·</span>
                  <span>বিনামূল্যে প্রাথমিক ফল্ট টেলেমেট্রি চেক</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 self-end md:self-auto">
              <span className="text-[11px]">জরুরি পরামর্শের জন্য সরাসরি কল দিন:</span>
              <a 
                href="tel:01792583892" 
                className="font-mono font-bold text-blue-700 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>০১৭৯২-৫৮৩৮৯২</span>
              </a>
            </div>
          </div>
        )}

        {/* 3-COLUMN SERVICE TIERS GRID */}
        {activeTab !== 'matrix' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {tiersToDisplay.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-3xl bg-white dark:bg-[#0B1528] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 ${
                  tier.isPopular
                    ? 'border-2 border-blue-600 dark:border-cyan-400 shadow-lg ring-4 ring-blue-50 dark:ring-cyan-950/40'
                    : 'border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Marquee Badge for Recommended Tier */}
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-blue-700 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-xs">
                      সর্বাধিক গ্রাহক কর্তৃক নির্বাচিত
                    </span>
                  </div>
                )}

                <div>
                  {/* Tier Number & Category Tag */}
                  <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mb-2 font-mono">
                    <span className="font-bold text-blue-700 dark:text-cyan-400">টিয়ার {tier.tierNumber}</span>
                    <span>{tier.name}</span>
                  </div>

                  {/* Bengali Title */}
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white leading-snug">
                    {tier.nameBn}
                  </h3>

                  {/* Target Scope */}
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-4 flex items-center gap-1.5 font-medium">
                    <span className="text-slate-400 dark:text-slate-500">উপযোগী:</span>
                    <span className="text-slate-800 dark:text-slate-200">{tier.targetScreensBn}</span>
                  </div>

                  {/* Price Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
                        {tier.priceDisplay}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {tier.priceNoteBn}
                    </p>
                  </div>

                  {/* Time & Warranty Badges */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-mono">ডেলিভারি সময়</span>
                        <span className="font-semibold text-[11px]">{tier.estimatedTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-mono">লিখিত ওয়ারেন্টি</span>
                        <span className="font-semibold text-[11px] text-emerald-800 dark:text-emerald-300">{tier.warrantyPeriod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Solved Issues (What it fixes) */}
                  <div className="mb-5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-2 font-heading">
                      যেসব সমস্যার স্থায়ী সমাধান:
                    </span>
                    <ul className="flex flex-col gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {tier.solvedIssuesBn.map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600 dark:text-cyan-400 font-bold mt-0.5">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Scope & Features */}
                  <div className="mb-6">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-2 font-heading">
                      ল্যাব প্রোটোকল ও স্পেসিফিকেশন:
                    </span>
                    <ul className="flex flex-col gap-2 text-xs text-slate-700 dark:text-slate-300">
                      {tier.featuresBn.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onNavigate('service-booking')}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      tier.isPopular
                        ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-sm'
                        : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>এই সার্ভিসে বুকিং দিন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* COMPARISON MATRIX VIEW */
          <div className="bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800/90 rounded-3xl overflow-hidden shadow-xs">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                ডিসপ্লে বন্ডিং ও চিপ-লেভেল সার্ভিস কম্প্যারিজিন ম্যাট্রিক্স
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                আপনার ডিভাইসের ধরন ও জটিলতা অনুযায়ী সঠিক সার্ভিস টিয়ার নির্বাচন করুন
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold">
                    <th className="p-4 w-1/4">ফিচার ও টেকনিক্যাল স্পেক্স</th>
                    <th className="p-4 text-center">টিয়ার ০১: স্ট্যান্ডার্ড</th>
                    <th className="p-4 text-center bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-cyan-300">টিয়ার ০২: প্রো (জনপ্রিয়)</th>
                    <th className="p-4 text-center">টিয়ার ০৩: এন্টারপ্রাইজ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">উপযোগী ডিভাইস</td>
                    <td className="p-4 text-center">৩২" - ৪৩" বেসিক / এসএমপিএস</td>
                    <td className="p-4 text-center bg-blue-50/30 dark:bg-blue-950/20 font-medium text-blue-950 dark:text-cyan-200">৪৩" - ৫৫" ৪কে টিভি / অ্যান্ড্রয়েড বোর্ড</td>
                    <td className="p-4 text-center">৫৮" - ৮৫" কার্ভড / ইনভার্টার ড্রাইভ</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">আনুমানিক ল্যাব রেট</td>
                    <td className="p-4 text-center font-mono font-bold text-slate-900 dark:text-white">৳১,৫০০ – ৳২,২০০</td>
                    <td className="p-4 text-center bg-blue-50/30 dark:bg-blue-950/20 font-mono font-bold text-blue-700 dark:text-cyan-400">৳২,৫০০ – ৳৩,৮০০</td>
                    <td className="p-4 text-center font-mono font-bold text-slate-900 dark:text-white">৳৪,২০০ – ৳৬,৫০০</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">ডেলিভারি সময়</td>
                    <td className="p-4 text-center font-mono">২ – ৩ ঘণ্টা</td>
                    <td className="p-4 text-center bg-blue-50/30 dark:bg-blue-950/20 font-mono font-bold text-blue-900 dark:text-cyan-300">৩ – ৫ ঘণ্টা (সেম ডে)</td>
                    <td className="p-4 text-center font-mono">২৪ – ৪৮ ঘণ্টা</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">লিখিত ওয়ারেন্টি মেয়াদ</td>
                    <td className="p-4 text-center text-emerald-700 dark:text-emerald-400 font-bold">৯০ দিন</td>
                    <td className="p-4 text-center bg-blue-50/30 dark:bg-blue-950/20 text-emerald-800 dark:text-emerald-300 font-bold">১৮০ দিন (৬ মাস)</td>
                    <td className="p-4 text-center text-emerald-700 dark:text-emerald-400 font-bold">১৮০ দিন (৬ মাস)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">যন্ত্রাংশ ও উপাদান</td>
                    <td className="p-4 text-center">জাপানি হিটাচি ACF টেপ</td>
                    <td className="p-4 text-center bg-blue-50/30 dark:bg-blue-950/20">হিটাচি হাই-কন্ডাকশন ACF + অরিজিনাল COF</td>
                    <td className="p-4 text-center">লেজার মাইক্রো-শট + ভ্যাকুয়াম ফিউশন</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">ডায়াগনস্টিক প্রটোকল</td>
                    <td className="p-4 text-center">১০৮০p প্যাটার্ন টেস্ট</td>
                    <td className="p-4 text-center bg-blue-50/30 dark:bg-blue-950/20">৪কে ইউএইচডি কালার স্পেকট্রাম টেস্ট</td>
                    <td className="p-4 text-center">কম্পিউটারাইজড ভ্যাকুয়াম লেজার টেস্ট</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">অ্যাকশন</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => onNavigate('service-booking')}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs"
                      >
                        বুকিং দিন
                      </button>
                    </td>
                    <td className="p-4 text-center bg-blue-50/30 dark:bg-blue-950/20">
                      <button 
                        onClick={() => onNavigate('service-booking')}
                        className="px-4 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs"
                      >
                        বুকিং দিন
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => onNavigate('service-booking')}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs"
                      >
                        বুকিং দিন
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* QUICK COST ESTIMATOR WIDGET */}
        <div className="mt-12 rounded-3xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800/90 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 dark:text-cyan-400 uppercase mb-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Instant Cost & Turnaround Estimator</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                আপনার ডিভাইসের সঠিক রিপেয়ার খরচ ও সময় জানুন
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                নিচের তালিকা থেকে আপনার টিভি স্ক্রিন সাইজ বা সার্ভিস ক্যাটাগরি বাছাই করুন:
              </p>

              {/* Quick Select Options */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                {[
                  { id: '32_led', label: '৩২" ইঞ্চি টিভি ডিসপ্লে' },
                  { id: '43_smart', label: '৪৩" ৪কে স্মার্ট টিভি' },
                  { id: '55_uhd', label: '৫৫" ইউএইচডি / কিউলেড' },
                  { id: '65_plus', label: '৬৫"+ আল্ট্রা লার্জ / কার্ভড' },
                  { id: 'mainboard_smart', label: 'অ্যান্ড্রয়েড মাদারবোর্ড' },
                  { id: 'ac_fridge_pcb', label: 'ইনভার্টার এসি / ফ্রিজ পিসিবি' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedDeviceSize(item.id)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                      selectedDeviceSize === item.id
                        ? 'border-blue-600 dark:border-cyan-500 bg-blue-50/70 dark:bg-blue-950/50 text-blue-900 dark:text-cyan-200 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimator Result Box */}
            <div className="lg:w-80 p-5 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 flex flex-col justify-between shadow-md">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">
                  প্রস্তাবিত সার্ভিস টিয়ার
                </span>
                <h4 className="text-sm font-bold text-blue-400 dark:text-cyan-400 mt-0.5">
                  {currentEstimator.tierTitle}
                </h4>
                <p className="text-xs text-slate-300 mt-1 pb-3 border-b border-slate-800">
                  {currentEstimator.serviceName}
                </p>

                <div className="mt-3 flex flex-col gap-1.5 text-xs font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">আনুমানিক রেট:</span>
                    <span className="font-bold text-emerald-400 text-sm">{currentEstimator.cost}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">আনুমানিক সময়:</span>
                    <span className="text-slate-200">{currentEstimator.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">লিখিত ওয়ারেন্টি:</span>
                    <span className="text-slate-200">{currentEstimator.warranty}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800">
                <button
                  onClick={() => onNavigate('service-booking')}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>অনলাইনে অ্যাপয়েন্টমেন্ট নিন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Trust Banner */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800/90 shadow-xs flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">জিরো আনসলভড চার্জ পলিসি</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">কোন কারণে মেরামত সফল না হলে কোনো টাকা দিতে হবে না</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800/90 shadow-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-700 dark:text-cyan-400 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">১০০% জাপানি হিটাচি ACF</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">লোকাল আঠা নয়, আমদানি করা অরিজিনাল কন্ডাক্টিভ ফিল্ম</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800/90 shadow-xs flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">সেম-ডে এক্সপ্রেস ডেলিভারি</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">ল্যাবে ড্রপ করার ২ থেকে ৪ ঘণ্টার মধ্যে ডেলিভারি প্রস্তুত</span>
            </div>
          </div>
        </div>

        {/* View All Lab Services Link */}
        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('services')}
            className="px-6 py-3 rounded-xl bg-white dark:bg-[#0B1528] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 text-xs font-bold shadow-xs hover:border-slate-400 dark:hover:border-slate-700 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>সকল ৬টি স্পেশালাইজড ল্যাব সার্ভিস ও সম্পূর্ণ রেট চার্ট দেখুন</span>
            <ArrowRight className="w-4 h-4 text-blue-700 dark:text-cyan-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
