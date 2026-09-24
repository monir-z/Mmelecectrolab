import React from 'react';

interface AiSparkleIconProps {
  className?: string;
  size?: number;
}

/**
 * Modern AI Sparkle & Neural Cluster Icon (inspired by modern AI design systems like OpenAI, Gemini, Copilot)
 * Features a central 4-point radiant diamond star and orbiting neural nodes.
 */
export const AiSparkleIcon: React.FC<AiSparkleIconProps> = ({ className = 'w-5 h-5', size }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
    >
      <defs>
        {/* Vibrant Violet to Cyan AI Gradient */}
        <linearGradient id="aiGradientPrimary" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />   {/* Violet */}
          <stop offset="50%" stopColor="#3B82F6" />  {/* Blue */}
          <stop offset="100%" stopColor="#06B6D4" /> {/* Cyan */}
        </linearGradient>

        <linearGradient id="aiGradientSecondary" x1="18" y1="2" x2="24" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        <filter id="aiGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main 4-point Radiant AI Diamond Star */}
      <path
        d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z"
        fill="url(#aiGradientPrimary)"
        filter="url(#aiGlow)"
      />

      {/* Secondary Companion Star (Top Right) */}
      <path
        d="M19 1.5C19 3.5 17.5 5 15.5 5C17.5 5 19 6.5 19 8.5C19 6.5 20.5 5 22.5 5C20.5 5 19 3.5 19 1.5Z"
        fill="url(#aiGradientSecondary)"
        opacity="0.95"
      />

      {/* Tertiary Mini Node (Bottom Left) */}
      <circle cx="5" cy="19" r="1.5" fill="#38BDF8" opacity="0.85" />
    </svg>
  );
};
