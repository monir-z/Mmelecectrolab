import { Order, ServiceBooking } from '../types';

export const STORE_INFO = {
  name: 'M M Electric & Electronics Servicing Center',
  shortName: 'MM ELECTROLAB',
  tagline: 'Precision Electronics & Display Lab',
  taglineBn: 'প্রিসিশন ইলেকট্রনিক্স অ্যান্ড ডিসপ্লে ল্যাব',
  authorizedBadge: 'SINGER & BEKO অনুমোদিত সার্ভিস সেন্টার',
  proprietor: 'Md. Robiul Islam (BTEB Certified Technician)',
  proprietorBn: 'মোঃ রবিউল ইসলাম (BTEB Certified Technician)',
  address: 'Singer Plaza, Upazila Road, Sundarganj, Gaibandha - 5730',
  addressBn: 'সিঙ্গার প্লাজা, উপজেলা রোড, সুন্দরগঞ্জ, গাইবান্ধা – ৫৭৩০',
  phone1: '01760655650',
  phone2: '01955242850',
  email: 'mmeletronicsservicingcenter@gmail.com',
  hoursBn: 'প্রতিদিন সকাল ৯:০০ টা – রাত ৯:০০ টা (সপ্তাহে ৭ দিন খোলা)',
  serviceAreaBn: 'সুন্দরগঞ্জ, গাইবান্ধা জেলা ও সমগ্র উত্তরবঙ্গ',
  googleMapsQuery: 'Singer Plaza Sundarganj Gaibandha',
  whatsappUrl: 'https://wa.me/8801760655650'
};

export const COUPONS: Record<string, { discountPercent: number; maxDiscount: number; minOrder: number; description: string }> = {
  'MMNEW10': { discountPercent: 10, maxDiscount: 300, minOrder: 500, description: '১০% ছাড় নতুন গ্রাহকদের জন্য' },
  'BONDING500': { discountPercent: 15, maxDiscount: 500, minOrder: 1500, description: '১৫% ছাড় ডিসপ্লে ও মাদারবোর্ড পার্টসে' },
  'SUNDARGANJ': { discountPercent: 8, maxDiscount: 200, minOrder: 400, description: 'স্থানীয় গ্রাহকদের জন্য বিশেষ ছাড়' }
};

export const SUPPORTED_BRANDS = [
  'Samsung', 'LG', 'Sony', 'Singer', 'Beko', 'Walton',
  'Vision', 'Jamuna', 'Transtec', 'MyOne', 'Hisense', 'TCL'
];

export const BRANDS_MARQUEE = [
  { name: 'Samsung', category: 'Crystal UHD / OLED / QLED' },
  { name: 'LG', category: 'NanoCell / 4K UHD / OLED' },
  { name: 'Sony', category: 'Bravia XR / 4K Google TV' },
  { name: 'Singer', category: 'অনুমোদিত সার্ভিস পার্টনার' },
  { name: 'Beko', category: 'অনুমোদিত সার্ভিস সেন্টার' },
  { name: 'Walton', category: 'Smart TV & Inverter Refrigerator' },
  { name: 'Vision', category: 'Android TV & Home Appliances' },
  { name: 'Jamuna', category: 'Inverter AC & Refrigerator' },
  { name: 'Transtec', category: 'Appliances & Display Repair' },
  { name: 'MyOne', category: 'LED TV & Refrigeration' },
  { name: 'Hisense', category: '4K ULED & Inverter Units' },
  { name: 'TCL', category: 'Mini-LED & QLED Smart TV' }
];

export const OFFICIAL_SERVICES = [
  {
    id: 'tv-display-laser-bonding',
    titleBn: 'LED TV ডিসপ্লে মেরামত (বিশেষ সেবা)',
    tag: 'স্পেশাল ল্যাব সার্ভিস',
    tagColor: 'bg-blue-600 text-white',
    description:
      'অত্যাধুনিক জাপানি COF বন্ডিং মেশিন দ্বারা ডিসপ্লে মেরামত, ভার্টিক্যাল লাইন সমস্যা, নো-পিকচার, ডাবল ইমেজ ফিক্স ও ল্যাব টেস্ট। ৭০% খরচ সাশ্রয়ে নতুনের মতো পিকচার কোয়ালিটি।',
    highlights: [
      'জাপানি পালস-হিট লেজার COF বন্ডিং',
      'ভার্টিক্যাল ও হরিজন্টাল লাইন সমস্যা ফিক্স',
      'নো-পিকচার ও ব্ল্যাঙ্ক ডিসপ্লে পুনরুদ্ধার',
      'ডাবল ইমেজ ও ফ্লিকারিং ত্রুটি সমাধান'
    ],
    startingPrice: '৳১,৫০০',
    turnaround: '২–৩ ঘণ্টা (সেম-ডে)',
    warranty: '১৮০ দিন লিখিত ওয়ারেন্টি',
    imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'ac-fridge-service',
    titleBn: 'এসি ও ফ্রিজ সার্ভিসিং',
    tag: 'হোম ও ল্যাব সার্ভিস',
    tagColor: 'bg-teal-600 text-white',
    description:
      'গ্যাস চার্জিং, কম্প্রেসার ও থার্মোস্ট্যাট মেরামত/পরিবর্তন। ইনভার্টার পিসিবি মডিউল রিপ্লেসমেন্ট ও নির্ভুল কুলিং পারফরম্যান্স পুনরুদ্ধার।',
    highlights: [
      'জেনুইন R600a / R32 / R410a গ্যাস চার্জিং',
      'কম্প্রেসার ও থার্মোস্ট্যাট পরিবর্তন ও রিপেয়ার',
      'ইনভার্টার কন্ট্রোলার ও IPM পাওয়ার সার্কিট সমাধান',
      'ডোর গ্যাসকেট ও কুলিং চেম্বার লিকেজ ফিক্স'
    ],
    startingPrice: '৳১,২০০',
    turnaround: 'সেম ডে ভিজিট',
    warranty: '৯০ দিন সার্ভিস ওয়ারেন্টি',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'fan-motor-pump',
    titleBn: 'ফ্যান, মোটর ও ওয়াটার পাম্প',
    tag: 'কপার ওয়্যারিং ল্যাব',
    tagColor: 'bg-indigo-600 text-white',
    description:
      'কয়েল বাঁধাই, ক্যাপাসিটর ও বেয়ারিং পরিবর্তন। ১০০% সুপার এনামেল কপার ওয়্যার দ্বারা হেভি-ডিউটি মোটর এবং সিলিং/স্ট্যান্ড ফ্যান রিবাইন্ডিং।',
    highlights: [
      '১০০% কপার তার দিয়ে নিখুঁত কয়েল বাঁধাই',
      'অরিজিনাল জাপানি ও প্রিমিয়াম বিয়ারিং ফিটিং',
      'হাই-কোয়ালিটি ক্যাপাসিটর পরিবর্তন',
      'কম্পন ও শব্দহীন ব্যালান্সিং টেস্ট'
    ],
    startingPrice: '৳৪৫০',
    turnaround: '৩–৫ ঘণ্টা',
    warranty: '১৮০ দিন কয়েল গ্যারান্টি',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'home-appliances',
    titleBn: 'হোম অ্যাপ্লায়েন্স সার্ভিসিং',
    tag: 'মাল্টি-অ্যাপ্লায়েন্স ল্যাব',
    tagColor: 'bg-amber-600 text-white',
    description:
      'মাইক্রোওয়েভ ওভেন, রাইস কুকার, ইন্ডাকশন ও ইনফ্রারেড চুলা, পিওর সাইন ওয়েভ IPS ও UPS সার্কিট নিখুঁতভাবে সার্ভিসিং ও পার্টস রিপ্লেসমেন্ট।',
    highlights: [
      'মাইক্রোওয়েভ ওভেন ম্যাগনেট্রন ও এইচভি ট্রান্সফরমার',
      'ইন্ডাকশন কুকার আইজিবিটি (IGBT) ও কয়েল মেরামত',
      'রাইস কুকার থার্মোস্ট্যাট ও হিটিং প্লেট সমাধান',
      'IPS / UPS ইনভার্টার কার্ড ও চার্জার রিপেয়ার'
    ],
    startingPrice: '৳৫০০',
    turnaround: 'সেম-ডে ডেলিভারি',
    warranty: '৯০ দিন সার্ভিস ওয়ারেন্টি',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'electric-wiring',
    titleBn: 'ইলেকট্রিক ওয়্যারিং',
    tag: 'সেফটি ও সিকিউরিটি',
    tagColor: 'bg-emerald-600 text-white',
    description:
      'বাসা-বাড়ি, দোকান ও বাণিজ্যিক ভবনের সম্পূর্ণ নিরাপদ ও আধুনিক কনসিল্ড/সারফেস ওয়্যারিং কাজ। সার্কিট ব্রেকার, আর্থিং ও লোড ক্যালকুলেশন।',
    highlights: [
      'আধুনিক কনসিল্ড ও ডাক্ট পাইপ ওয়্যারিং',
      'MCB / RCCB সার্কিট ব্রেকার ও আর্থিং সিস্টেম স্থাপন',
      'শর্ট সার্কিট ও ফল্ট ডিটেকশন ও রিকভারি',
      'ডিভিশনাল ফায়ার সেফটি ও লোড ব্যালান্সিং'
    ],
    startingPrice: 'প্রজেক্ট আলোচনা সাপেক্ষে',
    turnaround: 'শিডিউল অনুযায়ী দ্রুত সম্পন্ন',
    warranty: 'পূর্ণাঙ্গ সেফটি টেস্টিং',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'old-goods-trade',
    titleBn: 'পুরাতন পণ্য ক্রয়-বিক্রয় ও এক্সচেঞ্জ',
    tag: 'ন্যায্য মূল্য ও এক্সচেঞ্জ',
    tagColor: 'bg-purple-600 text-white',
    description:
      'পুরাতন এলইডি টিভি, ফ্রিজ, সিলিং ফ্যান ও ইলেকট্রিক মোটর ন্যায্য মূল্যে ক্রয়-বিক্রয় এবং ল্যাব কন্ডিশনে টেস্ট করা ডিভাইসের সাথে এক্সচেঞ্জ সুবিধা।',
    highlights: [
      'পুরাতন অচল বা সচল ডিভাইস আকর্ষণীয় মূল্যে বিক্রয়',
      '১০০% ল্যাব টেস্টেড সার্টিফাইড ডিভাইস ক্রয়',
      'এক্সচেঞ্জ করে আপগ্রেড করার সহজ সুযোগ',
      'টেস্টিং গ্যারান্টি ও ফ্রি ডায়াগনোসিস'
    ],
    startingPrice: 'কন্ডিশন অনুযায়ী সেরা রেট',
    turnaround: 'তাৎক্ষণিক ক্যাশ / এক্সচেঞ্জ',
    warranty: 'ল্যাব টেস্টিং সার্টিফিকেট',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'MM-8821',
    customerName: 'মোঃ শফিকুল ইসলাম',
    phone: '01712345678',
    address: 'মীরগঞ্জ রোড, সুন্দরগঞ্জ পৌরসভা',
    district: 'Gaibandha',
    upazila: 'Sundarganj',
    items: [
      {
        product: {
          id: 'prod-cof-01',
          name: 'NT39538H-C1272A COF IC Tab Tape',
          nameBn: 'NT39538H-C1272A সিওএফ আইসি ট্যাব ফিতা (4K UHD TV)',
          category: 'display_cof',
          brand: 'Novatek',
          price: 850,
          regularPrice: 1100,
          rating: 4.9,
          reviewsCount: 42,
          inStock: true,
          stockCount: 85,
          warranty: 'ল্যাব টেস্টিং গ্যারান্টি',
          specs: [],
          tags: [],
          description: '',
          descriptionBn: '',
          imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80'
        },
        quantity: 2
      }
    ],
    subtotal: 1700,
    deliveryFee: 60,
    discount: 170,
    couponCode: 'MMNEW10',
    total: 1590,
    paymentMethod: 'bkash',
    paymentStatus: 'verified',
    transactionId: 'BK9A82J03X',
    orderStatus: 'shipped',
    createdAt: '2026-09-22 14:30',
    deliveryDateEstimate: 'আজ বিকেল ৫টার মধ্যে'
  },
  {
    id: 'MM-7940',
    customerName: 'আতিকুর রহমান',
    phone: '01899123456',
    address: 'ডিবি রোড, গাইবান্ধা সদর',
    district: 'Gaibandha',
    upazila: 'Gaibandha Sadar',
    items: [
      {
        product: {
          id: 'prod-mb-01',
          name: 'T.V53.671 Universal LED TV Motherboard',
          nameBn: 'T.V53.671 ইউনিভার্সাল LED টিভি মাদারবোর্ড',
          category: 'mainboards',
          brand: 'Top-Tech',
          price: 1850,
          regularPrice: 2200,
          rating: 4.9,
          reviewsCount: 78,
          inStock: true,
          stockCount: 24,
          warranty: '৬ মাস সার্ভিস ওয়ারেন্টি',
          specs: [],
          tags: [],
          description: '',
          descriptionBn: '',
          imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80'
        },
        quantity: 1
      }
    ],
    subtotal: 1850,
    deliveryFee: 100,
    discount: 0,
    total: 1950,
    paymentMethod: 'cod',
    paymentStatus: 'cod',
    orderStatus: 'delivered',
    createdAt: '2026-09-20 10:15',
    deliveryDateEstimate: 'ডেলিভারি সম্পন্ন'
  }
];

// Zero fake/dummy data: service requests come 100% from Firestore in real-time
export const INITIAL_BOOKINGS: ServiceBooking[] = [];

