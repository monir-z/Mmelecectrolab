import React, { useEffect, useState, useRef } from 'react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix = '',
  decimals = 0,
  label,
  subLabel,
  icon
}) => {
  const [count, setCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 1800; // ms
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = value / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={counterRef}
      className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0B1528] border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-md dark:shadow-none dark:hover:border-cyan-500/40 transition-all flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-3">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-cyan-400 flex items-center justify-center border border-blue-100 dark:border-blue-800/60">
            {icon}
          </div>
        )}
        <span className="text-[11px] font-mono font-bold text-teal-700 dark:text-teal-300 uppercase bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800/80">
          Verified
        </span>
      </div>

      <div>
        <div className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-slate-900 dark:text-white tabular-nums">
          {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
          <span className="text-blue-600 dark:text-cyan-400 ml-0.5">{suffix}</span>
        </div>

        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{label}</h4>
        {subLabel && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subLabel}</p>}
      </div>
    </div>
  );
};
