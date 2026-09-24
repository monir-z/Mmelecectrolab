import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinish?: () => void;
  minDurationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  minDurationMs = 1500
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(5);
  const [statusIndex, setStatusIndex] = useState(0);

  const diagnosticStages = [
    'Initializing Neural System...',
    'Calibrating Lab Diagnostics...',
    'Welcome to MM ElectroLab'
  ];

  useEffect(() => {
    // Dynamic diagnostics text steps based on duration
    const stageDuration = minDurationMs / 3;
    const stage1Timer = setTimeout(() => setStatusIndex(1), stageDuration);
    const stage2Timer = setTimeout(() => setStatusIndex(2), stageDuration * 2);

    // Smooth, precision progress calculation
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.round((elapsed / minDurationMs) * 100));
      setProgress(calculatedProgress);

      if (elapsed >= minDurationMs) {
        clearInterval(interval);
        setProgress(100);
        setIsExiting(true);

        // Smooth cinematic exit animation (Scale up 1.05 + Fade-out opacity 0 in 500ms)
        const unmountTimer = setTimeout(() => {
          setShouldRender(false);
          if (onFinish) onFinish();
        }, 500);

        return () => clearTimeout(unmountTimer);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      clearTimeout(stage1Timer);
      clearTimeout(stage2Timer);
    };
  }, [minDurationMs, onFinish]);

  if (!shouldRender) return null;

  return (
    <aside
      aria-label="Loading MM ELECTROLAB"
      role="status"
      aria-busy={!isExiting}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-500 ease-in-out ${
        isExiting
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      } bg-[#07090E]`}
    >
      {/* 1. Futuristic Ambient Radial Glow & Core Blur */}
      <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full bg-radial from-blue-600/20 via-indigo-600/15 to-transparent blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />

      {/* Cyber Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Modern MM ELECTROLAB Core with Rotating Neon Circuit Ring & Light Sweep Shimmer */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Rotating Outer Neon Circuit Ring */}
          <div className="absolute -inset-4 sm:-inset-5 rounded-full border border-dashed border-cyan-400/40 animate-[spin_8s_linear_infinite]" />
          <div className="absolute -inset-2.5 sm:-inset-3 rounded-full border border-blue-500/30 animate-[spin_5s_linear_infinite_reverse]" />
          
          {/* Glowing Radial Halo */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 opacity-60 blur-xl animate-pulse" />

          {/* Central Logo Box with Shimmer / Light Sweep */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-[#1E40AF] via-[#2563EB] to-[#4F46E5] p-3.5 sm:p-4 shadow-[0_0_35px_rgba(37,99,235,0.45)] border border-cyan-400/30 flex items-center justify-center overflow-hidden">
            {/* Shimmer Light Sweep Effect (Left to Right Reflection) */}
            <div className="absolute inset-0 w-[200%] -left-1/2 animate-shimmer-sweep bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

            {/* Vector Core Tech Logo */}
            <svg
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-white relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            >
              <defs>
                <linearGradient id="splashBoltGrad" x1="6" y1="4" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#93C5FD" />
                </linearGradient>
                <linearGradient id="splashPulseGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#67E8F9" />
                  <stop offset="100%" stopColor="#A5B4FC" />
                </linearGradient>
              </defs>
              <path
                d="M5 26L11 11L18 24L25 11L31 26"
                stroke="url(#splashBoltGrad)"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 9L20.5 15.5H16.5L19 22"
                stroke="#FDE047"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="18" cy="6" r="1.6" fill="url(#splashPulseGlow)" />
            </svg>
          </div>
        </div>

        {/* 2. Brand Name Typography & Crisp Letter-Spacing */}
        <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-[0.25em] uppercase text-white leading-tight drop-shadow-md">
          MM ELECTROLAB
        </h1>

        {/* Subtitle */}
        <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-cyan-400/90 mt-1 uppercase font-mono">
          Precision Electronics &amp; Display Lab
        </p>

        {/* Dynamic Diagnostics Micro-Animation */}
        <div className="h-6 mt-4 flex items-center justify-center">
          <p
            key={statusIndex}
            className="text-xs sm:text-[13px] font-mono tracking-wider text-slate-300 animate-[fadeIn_0.35s_ease-out] flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span>{diagnosticStages[statusIndex]}</span>
          </p>
        </div>

        {/* Ultra-Slim (2px) Gradient Progress Bar (Cyan to Indigo) */}
        <div className="w-56 sm:w-64 h-[2px] bg-slate-800/80 rounded-full mt-5 overflow-hidden relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Percentage Indicator */}
        <div className="w-56 sm:w-64 flex justify-between items-center text-[10px] text-slate-500 font-mono mt-2 tracking-widest uppercase">
          <span>DIAGNOSTIC STATUS</span>
          <span className="text-cyan-400 font-bold">{progress}%</span>
        </div>
      </div>
    </aside>
  );
};
