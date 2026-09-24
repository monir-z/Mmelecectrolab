import { BlogPost } from '../types';

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'led-tv-display-line-problem-solution-bonding',
    title: 'Why LED TV Displays Get Lines & How Laser Bonding Restores Them',
    titleBn: 'LED টিভির ডিসপ্লেতে দাগ পড়ার কারণ এবং লেজার বন্ডিংয়ের মাধ্যমে স্থায়ী সমাধান',
    excerpt: 'Understanding COF IC burnout, humidity ingress, and why high-precision thermode bonding saves your original 4K panel.',
    excerptBn: 'টিভি স্ক্রিনে চিকন বা মোটা রঙিন দাগ? পুরো ডিসপ্লে পরিবর্তন না করে মাত্র ২০-৩০% খরচে কীভাবে ডিসপ্লে বন্ডিং মেশিনে এটি ১০০% মেরামত করা যায় জেনে নিন।',
    contentBn: [
      'অনেকেরই প্রশ্ন থাকে: “আমার এলইডি টিভির ডিসপ্লেতে খাড়া বা আড়াআড়ি রঙিন দাগ এসেছে, এখন কি পুরো প্যানেল বদলাতে হবে?” উত্তর হলো: বেশিরভাগ ক্ষেত্রেই পুরো প্যানেল পরিবর্তনের প্রয়োজন হয় না।',
      'টিভি ডিসপ্লে গঠিত হয় গ্লাস ওপেন সেল এবং তার সাথে মাইক্রোস্কেল কপার ট্রানজিস্টর সংবলিত COF (Chip on Film) ফিতা দ্বারা। ভোল্টেজ তারতম্য, ভেজা কাপড় দিয়ে স্ক্রিন মোছা বা দীর্ঘদিনের ব্যবহারে এই ফিতার কন্ডাক্টিভ আঠা দুর্বল হয়ে যায় বা আইসি পুড়ে যায়।',
      'পূর্বে এর সমাধান ছিল সম্পূর্ণ ডিসপ্লে পরিবর্তন করা যার খরচ একটি নতুন টিভির ৬০-৮০%। কিন্তু MM ELECTROLAB-এর আধুনিক পালস-হিট বন্ডিং মেশিনে মাইক্রোস্কোপ দিয়ে ন্যানোমিটার লেভেলে নতুন COF IC প্রতিস্থাপন করে ডিসপ্লেটি একদম ফ্যাক্টরি কন্ডিশনে ফিরিয়ে আনা সম্ভব।',
      'আমাদের পরামর্শ: স্ক্রিন পরিষ্কার করার সময় কখনোই সরাসরি পানি বা স্প্রে ব্যবহার করবেন না। নরম মাইক্রোফাইবার কাপড়ে সামান্য গ্লাস ক্লিনার ছিটিয়ে আলতোভাবে মুছুন।'
    ],
    readTime: '৪ মিনিট পাঠ',
    author: 'মোঃ রবিউল ইসলাম (BTEB Certified Technician)',
    date: '১৫ সেপ্টেম্বর, ২০২৬',
    category: 'LED TV Care',
    tags: ['COF IC', 'Display Bonding', 'LED TV Repair', 'Maintenance']
  },
  {
    id: 'post-2',
    slug: 'inverter-fridge-compressor-board-care-tips',
    title: 'Inverter Refrigerator Motherboard Care: Prevent Expensive Failures',
    titleBn: 'ইনভার্টার ফ্রিজের মাদারবোর্ড ও কম্প্রেসর সুরক্ষিত রাখার জরুরি নির্দেশিকা',
    excerpt: 'Crucial tips on voltage stabilizer necessity, earthing, and heat dissipation for inverter refrigerators.',
    excerptBn: 'ইনভার্টার ফ্রিজ বিদ্যুৎ সাশ্রয়ী হলেও এর সার্কিট অত্যন্ত স্পর্শকাতর। লো-ভোল্টেজ ও বজ্রপাত থেকে আপনার প্রিয় ফ্রিজটি যেভাবে রক্ষা করবেন।',
    contentBn: [
      'ইনভার্টার ফ্রিজের প্রাণ হলো এর ইনভার্টার কন্ট্রোল পিসিবি (PCB) এবং বিএলডিসি ৩-ফেজ কম্প্রেসর। সাধারণ ফ্রিজের মতো এটি রিলে দিয়ে চলে না, চলে মাইক্রোপ্রসেসর অ্যালগরিদমের মাধ্যমে।',
      'পল্লী বিদ্যুৎ এলাকায় বজ্রপাত বা হঠাৎ ফেজ ড্রপের কারণে ফ্রিজের আউটডোর বা পেছনের ড্রাইভার বোর্ডে থাকা আইজিবিটি চিপ শর্ট হয়ে যেতে পারে। এর লক্ষণ হলো ফ্রিজ অন হলেও ঠান্ডা হয় না এবং লাইট ব্লিংক করে।',
      'সুরক্ষা টিপস: ১. ফ্রিজের সাথে একটি ভালো মানের ডিজিটাল ভোল্টেজ স্ট্যাবিলাইজার ব্যবহার করুন যাতে ৩ মিনিট টাইম ডিলে অপশন থাকে। ২. ফ্রিজের পেছনের ভেন্টিলেশন গ্রিল দেয়াল থেকে অন্তত ৪ ইঞ্চি দূরে রাখুন যাতে বাতাস চলাচলের সুযোগ থাকে।'
    ],
    readTime: '৩ মিনিট পাঠ',
    author: 'মোঃ রবিউল ইসলাম',
    date: '০৮ সেপ্টেম্বর, ২০২৬',
    category: 'Refrigerator',
    tags: ['Inverter Fridge', 'Compressor Driver', 'Voltage Protection']
  },
  {
    id: 'post-3',
    slug: 'lightning-surge-protection-for-home-appliances',
    title: 'Protecting Costly Smart Home Electronics from Thunderstorm Surges',
    titleBn: 'বজ্রপাত ও হাই-ভোল্টেজ থেকে ঘরের দামি ইলেকট্রনিক্স রক্ষার উপায়',
    excerpt: 'Why standard multi-plugs fail and how proper earthing + surge arrester saves your appliances.',
    excerptBn: 'উত্তরবঙ্গে বর্ষা ও কালবৈশাখীতে বজ্রপাতে সবচেয়ে বেশি ক্ষতিগ্রস্ত হয় স্মার্ট টিভি, ওয়াইফাই রাউটার ও ইনভার্টার এসি। জেনে নিন সঠিক সুরক্ষা কৌশল।',
    contentBn: [
      'আমাদের সুন্দরগঞ্জ ও গাইবান্ধা অঞ্চলে বজ্রপাতের প্রকোপ তুলনামূলক বেশি। অনেক গ্রাহক অভিযোগ করেন যে টিভি বন্ধ ছিল তবুও মাদারবোর্ড জ্বলে গেছে। এর কারণ হলো টিভির এইচডিএমআই ক্যাবল, ডিশ লাইন বা আন-গ্রাউন্ডেড পাওয়ার লাইন দিয়ে হাই-ভোল্টেজ কারেন্ট প্রবেশ করে।',
      'সমাধান হলো: ১. ঘরের মেইন ডিবি বোর্ডে Class-II সার্কিট সার্জ প্রটেকশন ডিভাইস (SPD) বসানো। ২. ডিসপ্লে ও স্মার্ট টিভির জন্য লাইটনিং প্রটেক্টেড মাল্টিপ্লাগ ব্যবহার করা। ৩. ভারী বজ্রপাতের সময় টিভির পাওয়ার প্লাগ ও ডিশ ক্যাবল খুলে রাখা।'
    ],
    readTime: '৫ মিনিট পাঠ',
    author: 'MM ElectroLab Technical Team',
    date: '২৮ আগস্ট, ২০২৬',
    category: 'Electrical Safety',
    tags: ['Surge Protection', 'Lightning Safety', 'Earthing', 'DB Board']
  },
  {
    id: 'post-4',
    slug: 'why-bldc-ceiling-fan-is-future-of-cooling',
    title: 'Why BLDC Ceiling Fans Cut 65% Electricity Bills in Bangladesh',
    titleBn: 'বিএলডিসি ফ্যান কেন সাধারণ ফ্যানের চেয়ে ৬৫% বিদ্যুৎ সাশ্রয় করে?',
    excerpt: 'Comparison of induction motor vs brushless DC motors and rewinding longevity analysis.',
    excerptBn: 'সাধারণ ফ্যানে ৭৫-৮০ ওয়াট খরচ হয়, অথচ বিএলডিসি ফ্যানে মাত্র ২৮-৩২ ওয়াট। কয়েল বাঁধাই ও নতুন প্রযুক্তি সম্পর্কিত বিস্তারিত বিশ্লেষণ।',
    contentBn: [
      'সাধারণ সিলিং ফ্যান চলে এসি ইন্ডাকশন মোটরে, যাতে অতিরিক্ত বিদ্যুৎ তাপ হিসেবে অপচয় হয়। পক্ষান্তরে বিএলডিসি (Brushless DC) ফ্যান স্থায়ী নিওডাইমিয়াম চুম্বক ও ইলেকট্রনিক ড্রাইভারের মাধ্যমে বিদ্যুৎ শক্তিকে শতভাগ ঘূর্ণন শক্তিতে রূপান্তর করে।',
      'আমাদের ল্যাবে আমরা সাধারণ পুরোনো ফ্যানকে ১০০% সুপার এনামেল্ড পিউর কপার ওয়্যার দিয়ে এমনভাবে রিবাইন্ডিং করি যাতে ফ্যানের কারেন্ট গ্রহণ কমে যায় এবং বাতাস সর্বোচ্চ হয়। যাদের ইনভার্টার বা আইপিএস আছে তাদের জন্য বিএলডিসি বা হাই-এফিসিয়েন্সি কপার ফ্যান আশীর্বাদস্বরূপ।'
    ],
    readTime: '৪ মিনিট পাঠ',
    author: 'মোঃ রবিউল ইসলাম',
    date: '২০ আগস্ট, ২০২৬',
    category: 'Energy Saving',
    tags: ['BLDC Fan', 'Motor Rewinding', 'Energy Efficiency']
  }
];

export const BLOG_POSTS = BLOG_POSTS_DATA;
