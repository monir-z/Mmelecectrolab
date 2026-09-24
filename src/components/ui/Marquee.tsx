import React from 'react';

interface MarqueeProps {
  items: { name: string; category?: string }[];
  speed?: 'normal' | 'slow' | 'fast';
}

export const Marquee: React.FC<MarqueeProps> = ({ items }) => {
  return (
    <div className="w-full overflow-hidden bg-slate-50 dark:bg-[#0B1528] border-y border-slate-200 dark:border-slate-800 py-3 select-none">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 shrink-0">
            <span className="font-heading font-black text-sm tracking-wider text-slate-800 dark:text-slate-100 uppercase">
              {item.name}
            </span>
            {item.category && (
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {item.category}
              </span>
            )}
            <span className="text-slate-300 dark:text-slate-700 font-bold">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};
