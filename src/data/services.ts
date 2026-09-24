import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-bonding',
    name: 'LED TV Display TAB/COF Laser Bonding (Special Service)',
    nameBn: 'LED TV ডিসপ্লে মেরামত (বিশেষ সেবা)',
    category: 'led_bonding',
    priceRange: '৳১,৫০০ - ৳৪,৫০০',
    estimatedTime: '২ - ৪ ঘণ্টা (একই দিনে ডেলিভারি)',
    warrantyPeriod: '১৮০ দিন লিখিত গ্যারান্টি',
    popular: true,
    features: [
      'Japanese Pulse-Heat Optical Microscope COF Bonding',
      'Original Hitachi ACF tape with zero conductivity leakage',
      'Full resolution test with 4K UHD color pattern generator',
      'Resolves vertical/horizontal lines, no-picture, double image & flickering'
    ],
    featuresBn: [
      'অত্যাধুনিক জাপানি COF বন্ডিং মেশিন দ্বারা ডিসপ্লে মেরামত',
      'ভার্টিক্যাল ও হরিজন্টাল লাইন সমস্যা, নো-পিকচার ও ব্ল্যাঙ্ক স্ক্রিন ফিক্স',
      'ডাবল ইমেজ, কালার বার্ন ও ফ্লিকারিং সমস্যার শতভাগ স্থায়ী সমাধান',
      'হায়ার রেজোলিউশন ল্যাব টেস্টিং ও ৭০% খরচ সাশ্রয়'
    ],
    description: 'Specialized lab service equipped with Japanese optical positioning pulse-heat thermode machine. Repair broken display ribbons, vertical lines, double image, and blank screens with 180 days warranty.',
    descriptionBn: 'নতুন ডিসপ্লে কেনার বিপুল খরচ না করে আপনার শখের LED টিভির ডিসপ্লে ঠিক করুন আমাদের অত্যাধুনিক জাপানি COF বন্ডিং মেশিনে। সুন্দরগঞ্জ ও গাইবান্ধা জেলার একমাত্র বিশ্বস্ত মাস্টার ল্যাব।',
    icon: 'Monitor',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'srv-ac-fridge',
    name: 'AC & Inverter Refrigerator Servicing & Gas Charging',
    nameBn: 'এসি ও ফ্রিজ সার্ভিস',
    category: 'ac_inverter',
    priceRange: '৳১,২০০ - ৳৩,৫০০',
    estimatedTime: 'সেম ডে হোম / ল্যাব ভিজিট',
    warrantyPeriod: '৯০ দিন সার্ভিস ওয়ারেন্টি',
    popular: true,
    features: [
      'Compressor replacement & repair',
      'Thermostat calibration & sensor troubleshooting',
      'Original R600a, R32 & R410a precision gas charging',
      'BLDC inverter IPM motor driver IC repair'
    ],
    featuresBn: [
      'গ্যাস চার্জিং, ভ্যাকুয়াম ও প্রিসিশন গ্যাস প্রেশার টিউনিং',
      'কম্প্রেসার ও থার্মোস্ট্যাট মেরামত ও অরিজিনাল পার্টস পরিবর্তন',
      'ইনভার্টার পিসিবি ও আইপিএম পাওয়ার ড্রাইভ মেরামত',
      'হোম সার্ভিসের মাধ্যমে সরাসরি বাসা-বাড়িতে দ্রুত সমাধান'
    ],
    description: 'Expert diagnostics for cooling loss, compressor tripping, and inverter PCB faults with high-purity refrigerants.',
    descriptionBn: 'কুলিং সমস্যা, গ্যাস লিকেজ, কম্প্রেসর বন্ধ হওয়া কিংবা ইনভার্টার সার্কিটের জটিল ত্রুটির দ্রুত ও টেকসই সমাধান।',
    icon: 'Snowflake',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'srv-motor-fan',
    name: 'Fan, Motor & Water Pump Rewinding & Bearing Fitment',
    nameBn: 'ফ্যান, মোটর ও ওয়াটার পাম্প',
    category: 'motor_fan',
    priceRange: '৳৪৫০ - ৳১,৮০০',
    estimatedTime: '৩ - ৬ ঘণ্টা',
    warrantyPeriod: '১৮০ দিন কয়েল ওয়ারেন্টি',
    popular: false,
    features: [
      '100% Super Enamelled Pure Copper Wire rewinding',
      'Automated pitch winding for vibration-free rotation',
      'Original SKF / NSK precision ball bearing fitment',
      'Capacitor replacement and load current balancing'
    ],
    featuresBn: [
      '১০০% খাঁটি সুপার এনামেল কপার তার দিয়ে কয়েল বাঁধাই',
      'অরিজিনাল ক্যাপাসিটর ও প্রিমিয়াম বিয়ারিং পরিবর্তন',
      'পানির পাম্প ও সাবমার্সিবল মোটর রিবাইন্ডিং ও সিল পরিবর্তন',
      'নিঃশব্দ ও দীর্ঘস্থায়ী ঘূর্ণন নিশ্চিতকরণ'
    ],
    description: 'Pure copper wire rewinding, high-grade insulation, capacitor change, and bearing replacement for ceiling fans, stand fans, and pumps.',
    descriptionBn: 'সিলিং ফ্যান, ওয়াটার পাম্প ও মোটরের টেকসই কয়েল বাঁধাই, ক্যাপাসিটর ও বিয়ারিং পরিবর্তন। আসল তামা ও বার্নিশের ব্যবহারে ফ্যান চলে বিদ্যুতের গতিতে।',
    icon: 'Fan',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'srv-home-appliances',
    name: 'Home Appliance Care (Oven, Rice Cooker, Induction, IPS & UPS)',
    nameBn: 'হোম অ্যাপ্লায়েন্স সার্ভিসিং',
    category: 'appliances',
    priceRange: '৳৫০০ - ৳২,৫০০',
    estimatedTime: 'সেম-ডে ডেলিভারি',
    warrantyPeriod: '৯০ দিন সার্ভিস ওয়ারেন্টি',
    popular: false,
    features: [
      'Microwave oven magnetron & high-voltage diode repair',
      'Induction cooker IGBT & touch panel circuit restoration',
      'Rice cooker thermal fuse, switch & heating plate service',
      'Pure Sine Wave IPS & UPS microcontroller board repair'
    ],
    featuresBn: [
      'মাইক্রোওয়েভ ওভেন হিট না হওয়া ও সার্কিট শর্ট ফিক্স',
      'ইন্ডাকশন ও ইনফ্রারেড চুলার আইজিবিটি এবং মেইনবোর্ড রিপেয়ার',
      'রাইস কুকার অটোমেটিক সুইচ, ফিউজ ও হিটিং প্লেট সার্ভিসিং',
      'পিওর সাইন ওয়েভ IPS ও UPS সার্কিট ও চার্জিং সিস্টেম ফিক্স'
    ],
    description: 'Dedicated component-level repair for household electronic appliances with genuine components and safety inspection.',
    descriptionBn: 'ওভেন, রাইস কুকার, ইন্ডাকশন চুলা, আইপিএস ও ইউপিএস-এর মতো অতি প্রয়োজনীয় নিত্যদিনের অ্যাপ্লায়েন্সের যত্নশীল ও নিরাপদ মেরামত।',
    icon: 'Cpu',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'srv-wiring',
    name: 'Safe & Precision Residential/Commercial Electrical Wiring',
    nameBn: 'ইলেকট্রিক ওয়্যারিং',
    category: 'wiring',
    priceRange: '৳১,৫০০ - ৳১২,০০০ (প্রজেক্ট ভিত্তিক)',
    estimatedTime: 'শিডিউল অনুযায়ী দ্রুত সম্পন্ন',
    warrantyPeriod: '১ বছর ইনস্টলেশন সেফটি ওয়ারেন্টি',
    popular: false,
    features: [
      'Concealed conduit wiring with BNBC electrical standards',
      'MCB / RCCB safety circuit breaker & load balancing',
      'Proper earthing & lightning surge protection',
      'Short-circuit fault finding and industrial switchgear'
    ],
    featuresBn: [
      'বাসা-বাড়ি ও দোকানের সম্পূর্ণ নিরাপদ ও টেকসই কনসিল্ড ওয়্যারিং',
      'সার্কিট ব্রেকার, ডিবি বোর্ড ও সঠিক ফেজ লোড ক্যালকুলেশন',
      'নিরাপদ আর্থিং স্থাপন ও বজ্রপাত সুরক্ষা ব্যবস্থা',
      'শর্ট-সার্কিট ট্র্যাকিং ও দ্রুত ফল্ট রিকভারি'
    ],
    description: 'Complete, safe, and certified electrical wiring planning for residences, commercial shops, and offices.',
    descriptionBn: 'বাসা-বাড়ি ও দোকানের সম্পূর্ণ নিরাপদ ওয়্যারিং কাজ। BTEB সার্টিফাইড টেকনিশিয়ান দ্বারা ফায়ার-সেফ ওয়্যারিং ও দীর্ঘস্থায়ী সমাধান।',
    icon: 'Zap',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'srv-old-trade',
    name: 'Used Appliances Trading & Exchange (Buy/Sell/Repair)',
    nameBn: 'পুরাতন পণ্য ক্রয়-বিক্রয় ও এক্সচেঞ্জ',
    category: 'used_appliances',
    priceRange: 'কন্ডিশন অনুযায়ী সেরা মূল্য',
    estimatedTime: 'তাৎক্ষণিক ক্যাশ / এক্সচেঞ্জ',
    warrantyPeriod: 'ল্যাব টেস্টিং সার্টিফিকেট ও গ্যারান্টি',
    popular: false,
    features: [
      'Fair market value evaluation for old TVs, fridges & motors',
      'Trade-in discount when servicing or upgrading devices',
      '100% lab tested and certified pre-owned appliances for purchase',
      'Complete safety diagnostics and parts verification'
    ],
    featuresBn: [
      'পুরাতন টিভি, ফ্রিজ, ফ্যান ও মোটর ন্যায্য মূল্যে ক্রয় ও বিক্রয়',
      'পুরাতন অচল ডিভাইস দিয়ে মেরামত বা নতুন ডিভাইসে এক্সচেঞ্জ সুবিধা',
      'ল্যাব কন্ডিশনে টেস্ট করা টেকসই সার্টিফাইড ডিভাইস ক্রয়ের সুযোগ',
      'তাৎক্ষণিক যাচাই ও নগদ মূল্য প্রদান'
    ],
    description: 'Fair valuation, buying, selling, and exchange service for pre-owned televisions, refrigerators, fans, and electric motors.',
    descriptionBn: 'পুরাতন টিভি, ফ্রিজ, ফ্যান, মোটর ক্রয়-বিক্রয় ও মেরামত। ঘরে পড়ে থাকা অচল পণ্য দিয়ে নতুন বা আপগ্রেড করার সহজ সুযোগ।',
    icon: 'HelpCircle',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80'
  }
];
