import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { TESTIMONIALS_DATA } from '../../data/testimonials';
import { Testimonial } from '../../types';
import {
  Star,
  ShieldCheck,
  MapPin,
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Calendar
} from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface TestimonialsProps {
  onNavigate?: (view: any) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onNavigate }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 overflow-hidden">
      {/* Background Decorative Radial Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-cyan-400 text-xs font-semibold mb-3 shadow-2xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real Customer Feedback</span>
          <span>·</span>
          <span>গাইবান্ধা ও সুন্দরগঞ্জ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight text-slate-900 dark:text-white">
          গ্রাহকদের বাস্তব অভিজ্ঞতা ও সাফল্যগাথা
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          জাপানি অপটিক্যাল লেজার বন্ডিং, ইনভার্টার সার্কিট ও অরিজিনাল কম্পোনেন্ট মেরামতে শত শত সন্তুষ্ট পরিবারের অভিমত।
        </p>
      </div>

      {/* Swiper Carousel Container */}
      <div className="relative z-10">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={false}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          pagination={{
            clickable: true,
            el: '.custom-swiper-pagination',
            bulletClass: 'custom-bullet',
            bulletActiveClass: 'custom-bullet-active'
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current
          }}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24
            }
          }}
          className="pb-12"
        >
          {TESTIMONIALS_DATA.map((t: Testimonial) => (
            <SwiperSlide key={t.id} className="h-auto">
              <div className="h-full p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0E1526] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                {/* Accent Top Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* Top: Ratings, Verified Badge & Quote Icon */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      {t.verifiedRepair && (
                        <span className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                          <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>ভেরিফাইড মেরামত</span>
                        </span>
                      )}
                      <Quote className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                    </div>
                  </div>

                  {/* Device Tag */}
                  <div className="mb-3">
                    <span className="inline-block text-[11px] font-medium text-blue-700 dark:text-cyan-300 bg-blue-50/80 dark:bg-blue-950/50 px-2.5 py-1 rounded-md border border-blue-200/70 dark:border-blue-800/70 font-mono">
                      {t.deviceRepaired}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "{t.commentBn || t.comment}"
                  </p>
                </div>

                {/* Bottom: Client Profile & Location */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* User Avatar Circle */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                      {t.nameBn ? t.nameBn.charAt(0) : t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1">
                        <span>{t.nameBn || t.name}</span>
                        <CheckCircle2 className="w-3 h-3 text-blue-500 dark:text-cyan-400 shrink-0" />
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {t.role}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-end gap-1 font-medium">
                      <MapPin className="w-2.5 h-2.5 text-slate-400" />
                      <span>{t.location}</span>
                    </div>
                    {t.date && (
                      <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">
                        {t.date}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Carousel Navigation Controls & Custom Pagination */}
        <div className="flex items-center justify-between mt-4 px-2">
          {/* Previous Button */}
          <button
            ref={prevRef}
            className="w-9 h-9 rounded-full bg-white dark:bg-[#0E1526] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-all flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 active:scale-95 shrink-0"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Centered Bullet Indicators */}
          <div className="custom-swiper-pagination flex items-center justify-center gap-1.5 flex-1" />

          {/* Next Button */}
          <button
            ref={nextRef}
            className="w-9 h-9 rounded-full bg-white dark:bg-[#0E1526] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-all flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 active:scale-95 shrink-0"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
