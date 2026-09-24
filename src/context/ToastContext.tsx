import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentToast, setCurrentToast] = useState<Toast | null>(null);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearExistingTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
  };

  const closeToast = useCallback(() => {
    setIsFadingOut(true);
    fadeTimerRef.current = setTimeout(() => {
      setCurrentToast(null);
      setIsFadingOut(false);
    }, 280); // Smooth fade-out duration
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success', description?: string) => {
    clearExistingTimers();
    const id = Math.random().toString(36).substring(2, 9);
    setIsFadingOut(false);
    // Replace with latest (no stacked duplicate bulk)
    setCurrentToast({ id, type, message, description });

    // Auto fade-out exactly after 3000ms (3 seconds)
    timerRef.current = setTimeout(() => {
      closeToast();
    }, 3000);
  }, [closeToast]);

  useEffect(() => {
    return () => {
      clearExistingTimers();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Modern Sonner-Style Top-Center Floating Slim Pill Toast */}
      {currentToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 inset-x-0 z-[99999] flex justify-center pointer-events-none px-4"
        >
          <div
            className={`pointer-events-auto max-w-md w-auto inline-flex items-center gap-2.5 px-4 h-10 rounded-full border shadow-xl backdrop-blur-md transition-all duration-300 transform ${
              isFadingOut
                ? 'opacity-0 -translate-y-3 scale-95'
                : 'opacity-100 translate-y-0 scale-100 animate-in fade-in slide-in-from-top-4'
            } bg-white/95 dark:bg-[#0B1323]/95 border-slate-200/90 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 shadow-slate-900/10 dark:shadow-black/40`}
          >
            {/* Status Type Icon */}
            {currentToast.type === 'success' && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            )}
            {currentToast.type === 'error' && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 shrink-0">
                <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            )}
            {currentToast.type === 'warning' && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 shrink-0">
                <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            )}
            {currentToast.type === 'info' && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 shrink-0">
                <Info className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            )}

            {/* Message & Description */}
            <div className="flex items-center gap-1.5 min-w-0 pr-1 text-xs">
              <span className="font-semibold truncate leading-none">
                {currentToast.message}
              </span>
              {currentToast.description && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-none font-normal">
                    {currentToast.description}
                  </span>
                </>
              )}
            </div>

            {/* Quick Dismiss Button */}
            <button
              onClick={closeToast}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 -mr-1 cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
