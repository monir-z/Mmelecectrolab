import React from 'react';

export interface ServiceCardSkeletonProps {
  /**
   * Additional custom class names for the card container
   */
  className?: string;
  /**
   * Whether to display an animated pulse and shimmer wave
   * @default true
   */
  animated?: boolean;
}

/**
 * ServiceCardSkeleton
 * 
 * Accurately mirrors the structural layout, proportions, and typography placeholders 
 * of the HomeView popular service cards to provide a seamless, zero-layout-shift
 * loading experience in both light and dark modes.
 */
export const ServiceCardSkeleton: React.FC<ServiceCardSkeletonProps> = ({
  className = '',
  animated = true
}) => {
  return (
    <div
      role="status"
      aria-label="সার্ভিস লোড হচ্ছে..."
      aria-busy="true"
      className={`relative rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800/90 flex flex-col justify-between overflow-hidden shadow-xs select-none ${
        animated ? 'animate-pulse' : ''
      } ${className}`}
    >
      {/* 1. Header: Aspect Ratio 16/10 Image Placeholder */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200 dark:bg-slate-800/80">
        {/* Subtle Shimmer Gradient Highlight */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-300/40 dark:from-slate-950/60 via-transparent to-transparent pointer-events-none" />

        {/* Top-Left Category/Popularity Badge Placeholder */}
        <div className="absolute top-3 left-3">
          <div className="h-5 w-24 rounded-md bg-slate-300/90 dark:bg-slate-700/80 shadow-xs" />
        </div>

        {/* Bottom Metadata Bar: Rating & Turnaround Time Placeholders */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between">
          {/* Rating Pill Placeholder */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-300/80 dark:bg-slate-700/80 backdrop-blur-xs">
            <div className="w-3 h-3 rounded-full bg-amber-300/60 dark:bg-amber-400/50" />
            <div className="w-6 h-2.5 rounded bg-slate-400/60 dark:bg-slate-600/70" />
            <div className="w-5 h-2 rounded bg-slate-400/50 dark:bg-slate-600/50" />
          </div>

          {/* Turnaround Time Pill Placeholder */}
          <div className="h-4 w-20 rounded bg-slate-300/80 dark:bg-slate-700/80 backdrop-blur-xs" />
        </div>
      </div>

      {/* 2. Body: Typography & Descriptions */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Primary Bengali Title */}
          <div className="h-5 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800" />
          
          {/* English Subtitle / Technical Term */}
          <div className="h-3 w-1/2 rounded bg-slate-200/80 dark:bg-slate-800/60 mt-2" />

          {/* 2-line Bengali Description Placeholder */}
          <div className="mt-3 space-y-1.5">
            <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800/50" />
            <div className="h-3 w-5/6 rounded bg-slate-100 dark:bg-slate-800/50" />
          </div>
        </div>

        {/* 3. Footer: Pricing & Action Button */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          {/* Starting Fee & Amount Placeholder */}
          <div>
            <div className="h-2.5 w-10 rounded bg-slate-200 dark:bg-slate-800 mb-1.5" />
            <div className="h-5 w-16 rounded-md bg-slate-300/80 dark:bg-slate-700/80" />
          </div>

          {/* Fast Booking CTA Button Placeholder */}
          <div className="h-8 w-24 rounded-xl bg-blue-200/80 dark:bg-blue-900/40" />
        </div>
      </div>

      <span className="sr-only">লোড হচ্ছে...</span>
    </div>
  );
};

export interface ServiceGridSkeletonProps {
  /**
   * Number of skeleton cards to render in the grid
   * @default 4
   */
  count?: number;
  /**
   * Additional class names for the grid container
   */
  className?: string;
  /**
   * Whether cards are animated
   * @default true
   */
  animated?: boolean;
}

/**
 * ServiceGridSkeleton
 *
 * Renders a responsive grid of ServiceCardSkeletons matching the HomeView
 * 4-column layout (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
 */
export const ServiceGridSkeleton: React.FC<ServiceGridSkeletonProps> = ({
  count = 4,
  className = '',
  animated = true
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${className}`}
      role="status"
      aria-label="সার্ভিস তালিকা লোড হচ্ছে..."
    >
      {Array.from({ length: count }).map((_, index) => (
        <ServiceCardSkeleton key={`service-skeleton-${index}`} animated={animated} />
      ))}
    </div>
  );
};
