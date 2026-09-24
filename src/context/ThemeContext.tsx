import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const THEME_STORAGE_KEY = 'mmelectrolab_theme';

/**
 * Synchronously determine the initial theme without layout shifts or flicker.
 * Prioritizes:
 * 1. Saved localStorage preference
 * 2. Already set DOM class/data-theme (from index.html anti-flicker script)
 * 3. System prefers-color-scheme
 * 4. Default: 'dark' (Precision electronics lab styling)
 */
const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // localStorage may be disabled in certain security contexts
  }

  // Check if index.html head script already initialized documentElement
  if (typeof document !== 'undefined') {
    const rootTheme = document.documentElement.getAttribute('data-theme');
    if (rootTheme === 'light' || rootTheme === 'dark') {
      return rootTheme;
    }
    if (document.documentElement.classList.contains('dark')) {
      return 'dark';
    }
  }

  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // Media query unavailable
  }

  return 'dark';
};

/**
 * Apply theme to document root, body, and meta theme-color.
 * If animate is true (during an explicit user toggle), enables .theme-transitioning
 * so that properties smoothly transition, without causing newly mounted elements
 * during view navigation to flicker or animate colors.
 */
const applyThemeToDOM = (theme: Theme, animate = false) => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const body = document.body;

  if (animate) {
    root.classList.add('theme-transitioning');
  }

  if (theme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
    if (body) {
      body.classList.add('dark');
      body.setAttribute('data-theme', 'dark');
    }
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
    if (body) {
      body.classList.remove('dark');
      body.setAttribute('data-theme', 'light');
    }
  }

  // Sync mobile browser header color
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#090D16' : '#F8FAFC');
  }

  if (animate) {
    window.setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 350);
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Synchronously update DOM prior to paint
  useLayoutEffect(() => {
    applyThemeToDOM(theme, false);
  }, [theme]);

  // Handle storage sync across tabs & listen for OS color-scheme changes
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage unavailable or quota exceeded
    }

    // Storage event for multi-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
        setThemeState(e.newValue);
        applyThemeToDOM(e.newValue, true);
      }
    };

    // System OS preference change listener
    const mediaQuery =
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null;

    const handleMediaChange = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        // Only adapt to OS if user has not explicitly picked a preference
        if (!stored) {
          const newTheme: Theme = e.matches ? 'dark' : 'light';
          setThemeState(newTheme);
          applyThemeToDOM(newTheme, true);
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('storage', handleStorageChange);
    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      }
    };
  }, [theme]);

  // Toggle theme with smooth transition
  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme) => {
      const nextTheme: Theme = prevTheme === 'light' ? 'dark' : 'light';
      applyThemeToDOM(nextTheme, true);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {
        // ignore
      }
      return nextTheme;
    });
  }, []);

  // Explicitly set theme
  const setTheme = useCallback((newTheme: Theme) => {
    applyThemeToDOM(newTheme, true);
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        setTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
