import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { RepairGalleryItem, ViewName } from '../../types';
import { INITIAL_REPAIRS_GALLERY } from '../../data/repairsGallery';
import { OptimizedImage } from '../ui/OptimizedImage';
import {
  Wrench,
  CheckCircle2,
  Clock,
  MapPin,
  Star,
  ThumbsUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Sliders
} from 'lucide-react';

interface RepairsGalleryFeedProps {
  onNavigate: (view: ViewName, targetId?: string) => void;
}

export const RepairsGalleryFeed: React.FC<RepairsGalleryFeedProps> = ({ onNavigate }) => {
  const [repairs, setRepairs] = useState<RepairGalleryItem[]>(INITIAL_REPAIRS_GALLERY);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeImageTab, setActiveImageTab] = useState<Record<string, 'after' | 'before'>>({});
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likesCountMap, setLikesCountMap] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Real-time synchronization with Firestore repairs_gallery collection
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const repairsRef = collection(db, 'repairs_gallery');
      const q = query(repairsRef, orderBy('createdAt', 'desc'), limit(12));

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const fetched = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                title: data.title || '',
                titleBn: data.titleBn || '',
                deviceType: data.deviceType || 'LED TV',
                brand: data.brand || '',
                modelNumber: data.modelNumber || '',
                problemDescription: data.problemDescription || '',
                problemDescriptionBn: data.problemDescriptionBn || '',
                solutionApplied: data.solutionApplied || '',
                solutionAppliedBn: data.solutionAppliedBn || '',
                beforeImageUrl: data.beforeImageUrl,
                afterImageUrl: data.afterImageUrl || 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80',
                customerLocation: data.customerLocation || 'গাইবান্ধা',
                rating: data.rating || 5,
                turnaroundHours: data.turnaroundHours || 3,
                isVerified: data.isVerified ?? true,
                createdAt: data.createdAt || new Date().toISOString().split('T')[0],
                likesCount: data.likesCount || 25
              } as RepairGalleryItem;
            });
            setRepairs(fetched);
          } else {
            // Keep curated default list if database collection is empty
            setRepairs(INITIAL_REPAIRS_GALLERY);
          }
          setIsLoading(false);
        },
        (error) => {
          console.warn('Firestore repairs_gallery snapshot listener fallback:', error);
          setRepairs(INITIAL_REPAIRS_GALLERY);
          setIsLoading(false);
        }
      );
    } catch {
      setRepairs(INITIAL_REPAIRS_GALLERY);
      setIsLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const categories = [
    { id: 'all', label: 'সকল সাম্প্রতিক মেরামত' },
    { id: 'LED TV', label: 'LED TV & 4K বন্ডিং' },
    { id: 'ইনভার্টার ফ্রিজ', label: 'ইনভার্টার ফ্রিজ' },
    { id: 'ইনভার্টার এসি', label: 'ইনভার্টার এসি' }
  ];

  const filteredRepairs =
    activeCategory === 'all'
      ? repairs
      : repairs.filter((r) => r.deviceType === activeCategory || r.deviceType.includes(activeCategory));

  const toggleImageTab = (id: string, tab: 'after' | 'before') => {
    setActiveImageTab((prev) => ({ ...prev, [id]: tab }));
  };

  const handleLike = (id: string) => {
    if (likedMap[id]) return;
    setLikedMap((prev) => ({ ...prev, [id]: true }));
    setLikesCountMap((prev) => ({
      ...prev,
      [id]: (prev[id] ?? repairs.find((r) => r.id === id)?.likesCount ?? 30) + 1
    }));
  };

  return (
    <section className="py-12 sm:py-16 border-t border-slate-200/80 dark:border-slate-800/80 relative">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 dark:bg-cyan-500/5 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-400 text-xs font-bold mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 animate-pulse" />
              <span>রিয়েল-টাইম ল্যাব গ্যালারি</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
              সাম্প্রতিক সফল মেরামতের সরাসরি ফিড
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              জাপানি লেজার বন্ডিং মেশিন ও মাইক্রো-সোল্ডারিং ল্যাবে সম্পন্ন হওয়া সর্বশেষ এলইডি টিভি, ইনভার্টার ফ্রিজ ও এসির লাইভ কেস-স্টাডি।
            </p>
          </div>

          <button
            onClick={() => onNavigate('service-booking')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all self-start md:self-auto cursor-pointer"
          >
            <span>আপনার ডিভাইসের জন্য বুকিং দিন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-blue-600 dark:bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#0B1528] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Repairs Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepairs.map((item) => {
            const currentTab = activeImageTab[item.id] || 'after';
            const displayImage =
              currentTab === 'before' && item.beforeImageUrl
                ? item.beforeImageUrl
                : item.afterImageUrl;

            const isLiked = likedMap[item.id] || false;
            const currentLikes = likesCountMap[item.id] ?? item.likesCount ?? 28;

            return (
              <div
                key={item.id}
                className="group card-hover-lift rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-cyan-400/50 shadow-sm hover:shadow-xl dark:hover:shadow-cyan-950/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* 1. Media Container with Before / After Toggle */}
                <div className="relative w-full h-[220px] bg-slate-950 overflow-hidden">
                  <OptimizedImage
                    src={displayImage}
                    alt={item.titleBn}
                    fill
                    objectFit="cover"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    fallbackSrc="https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80"
                  />

                  {/* Top Badges: Brand & Verified Seal */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-900/85 backdrop-blur-md border border-white/20 text-cyan-300 shadow-sm">
                      {item.brand} • {item.deviceType}
                    </span>

                    {item.isVerified && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-md flex items-center gap-1 shadow-sm">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                        <span>ল্যাব টেস্ট ভেরিফাইড</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Toggle Pills: Before vs After */}
                  {item.beforeImageUrl && (
                    <div className="absolute bottom-3 left-3 z-20 flex items-center p-0.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white shadow-lg">
                      <button
                        onClick={() => toggleImageTab(item.id, 'after')}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          currentTab === 'after'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        মেরামতের পরে ✨
                      </button>
                      <button
                        onClick={() => toggleImageTab(item.id, 'before')}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          currentTab === 'before'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        মেরামতের পূর্বে ⚠️
                      </button>
                    </div>
                  )}

                  {/* Bottom Right: Turnaround time */}
                  <div className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono text-cyan-300 font-bold flex items-center gap-1 shadow-sm">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{item.turnaroundHours} ঘণ্টায় ডেলিভারি</span>
                  </div>
                </div>

                {/* 2. Content Details */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {item.titleBn}
                    </h3>

                    {/* Problem Description */}
                    <div className="mt-2.5 p-2 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-[11px] text-rose-800 dark:text-rose-300">
                      <span className="font-bold block text-[10px] uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-0.5">
                        ত্রুটি / সমস্যা:
                      </span>
                      <p className="line-clamp-2 leading-relaxed">{item.problemDescriptionBn}</p>
                    </div>

                    {/* Solution Applied */}
                    <div className="mt-2 p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-[11px] text-emerald-800 dark:text-emerald-300">
                      <span className="font-bold block text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-0.5">
                        ল্যাব সমাধান:
                      </span>
                      <p className="line-clamp-2 leading-relaxed">{item.solutionAppliedBn}</p>
                    </div>

                    {/* Customer Location & Rating */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="line-clamp-1">{item.customerLocation}</span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 font-bold font-mono text-[11px]">
                        <Star className="w-3 h-3 fill-current" />
                        <span>৫.০</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Action Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    {/* Interactive Like/Clap Button */}
                    <button
                      onClick={() => handleLike(item.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                        isLiked
                          ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-cyan-300 border border-blue-200 dark:border-blue-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                      title="প্রশংসা করুন"
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                      <span className="font-mono text-[11px]">{currentLikes}</span>
                    </button>

                    {/* Book Service for Similar Issue */}
                    <button
                      onClick={() => onNavigate('service-booking')}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>একই সমস্যা? বুকিং দিন</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RepairsGalleryFeed;
