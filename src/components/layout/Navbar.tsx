import React, { useState, useEffect, useRef } from 'react';
import { ViewName } from '../../types';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  Phone,
  Wrench,
  X,
  Sun,
  Moon,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Sparkles,
  SlidersHorizontal,
  Menu,
  Home,
  Zap,
  Calendar,
  Package,
  MapPin,
  Building2,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { STORE_INFO } from '../../data/initialData';

interface NavbarProps {
  currentView: ViewName;
  onNavigate: (view: ViewName) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  searchQuery,
  setSearchQuery
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const { user, userProfile, isAdmin, signInWithGoogle, signOutUser, setIsProfileModalOpen } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks: { labelBn: string; view: ViewName; icon: React.ElementType }[] = [
    { labelBn: 'হোম', view: 'home', icon: Home },
    { labelBn: 'সার্ভিসসমূহ', view: 'services', icon: Zap },
    { labelBn: 'সার্ভিস বুকিং', view: 'service-booking', icon: Calendar },
    { labelBn: 'পার্টস ক্যাটালগ', view: 'shop', icon: Package },
    { labelBn: 'লাইভ ট্র্যাকিং', view: 'track', icon: MapPin },
    { labelBn: 'ল্যাব পরিচিতি', view: 'about', icon: Building2 },
    { labelBn: 'যোগাযোগ', view: 'contact', icon: Phone }
  ];

  return (
    <>
      {/* ULTRA-SLIM & MINIMALIST SINGLE-ROW HEADER (Max Height 54px) */}
      <header className="w-full bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-50 h-[54px] transition-colors shadow-2xs">
        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 flex items-center justify-between gap-3">
          
          {/* Left: Sleek Minimalist Logo Icon + Bold Text "MM ELECTROLAB" */}
          <button
            onClick={() => onNavigate('home')}
            className="text-left group flex items-center gap-2 sm:gap-2.5 cursor-pointer shrink-0 min-w-0"
            aria-label="MM ELECTROLAB Home"
          >
            {/* Minimalist Tech Vector Logo with Electric Blue to Violet Gradient */}
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] flex items-center justify-center p-1.5 shadow-sm shadow-blue-500/25 group-hover:scale-105 transition-all shrink-0">
              <svg
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-white"
              >
                <defs>
                  <linearGradient id="boltGrad" x1="6" y1="4" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#93C5FD" />
                  </linearGradient>
                  <linearGradient id="pulseGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#67E8F9" />
                    <stop offset="100%" stopColor="#A5B4FC" />
                  </linearGradient>
                </defs>
                <path
                  d="M5 26L11 11L18 24L25 11L31 26"
                  stroke="url(#boltGrad)"
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
                <circle cx="18" cy="6" r="1.6" fill="url(#pulseGlow)" />
              </svg>
            </div>

            {/* Brand Typography */}
            <span className="text-[15px] sm:text-[16px] font-[800] tracking-wider font-heading text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-none uppercase">
              MM ELECTROLAB
            </span>
          </button>

          {/* Desktop Direct Search Box (Visible on xl: and 2xl: screen, sleek & compact 36px) */}
          <div className="hidden xl:flex items-center flex-1 max-w-xs mx-3">
            <div className="relative w-full flex items-center h-8 bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-lg px-2.5 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:border-blue-500 dark:focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'shop' && currentView !== 'services') onNavigate('services');
                }}
                placeholder="পার্টস বা সার্ভিস খুঁজুন..."
                className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-normal"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-0.5 cursor-pointer"
                  title="মুছুন"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Quick Nav Links (md:flex - visible on tablet & desktop) */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-5 text-xs font-semibold text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => onNavigate(link.view)}
                className={`transition-colors py-1 cursor-pointer hover:text-blue-600 dark:hover:text-cyan-400 relative whitespace-nowrap ${
                  currentView === link.view
                    ? 'text-blue-600 dark:text-cyan-400 font-bold border-b-2 border-blue-600 dark:border-cyan-400'
                    : ''
                }`}
              >
                {link.labelBn}
              </button>
            ))}

            {isAdmin && (
              <button
                onClick={() => onNavigate('admin')}
                className={`transition-colors py-1 cursor-pointer hover:text-amber-500 relative flex items-center gap-1 font-bold whitespace-nowrap ${
                  currentView === 'admin'
                    ? 'text-amber-500 border-b-2 border-amber-500'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>অ্যাডমিন</span>
              </button>
            )}
          </nav>

          {/* Right Action Cluster: Clean & Balanced spacing (gap-2 sm:gap-2.5) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* 1. Slide-down Search Toggle Icon (🔍 - on mobile & tablet) */}
            <button
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                isSearchOpen
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="সার্চ করুন"
              aria-label="Search items"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* 2. Theme Toggle Icon (🌙/☀️) */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full transition-colors cursor-pointer flex items-center justify-center text-slate-600 dark:text-amber-400 hover:text-slate-900 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              title={isDark ? 'লাইট মোডে সুইচ করুন' : 'ডার্ক মোডে সুইচ করুন'}
              aria-label="Toggle light or dark theme"
            >
              {isDark ? (
                <Sun key="sun" className="w-4 h-4 text-amber-400 theme-icon-spring" />
              ) : (
                <Moon key="moon" className="w-4 h-4 text-slate-700 theme-icon-spring" />
              )}
            </button>

            {/* 3. Circular User Profile Picture (32px) or Google Login */}
            {user ? (
              <div className="relative shrink-0" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="w-8 h-8 rounded-full ring-2 ring-transparent hover:ring-blue-500/50 transition-all cursor-pointer flex items-center justify-center overflow-hidden"
                  aria-label="User Profile Menu"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                      {user.displayName?.charAt(0) || 'U'}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-[#1F2937]">
                      <p className="text-xs font-bold text-[#0F172A] dark:text-[#F9FAFB] truncate">
                        {userProfile?.displayName || user.displayName}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onNavigate('admin');
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 flex items-center gap-2 cursor-pointer transition-colors border-l-2 border-amber-500"
                      >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsProfileModalOpen(true);
                      }}
                      className="w-full px-4 py-2.5 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1F2937] flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                      <span>প্রোফাইল ও ঠিকানা</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onNavigate('track');
                      }}
                      className="w-full px-4 py-2.5 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#1F2937] flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Wrench className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>সার্ভিস ট্র্যাকিং</span>
                    </button>

                    <div className="my-1 border-t border-slate-100 dark:border-[#1F2937]" />

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        signOutUser();
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>লগআউট</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="h-8 px-2.5 sm:px-3 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs shrink-0"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="hidden sm:inline">লগইন</span>
              </button>
            )}

            {/* 4. Hamburger Menu Button (☰ - hidden on md: & lg:, visible on mobile) */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Smooth Slide-down Search Bar (Appears when search icon is clicked) */}
      {isSearchOpen && (
        <div className="w-full bg-white dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-slate-800 px-4 py-2.5 sticky top-[54px] z-40 animate-in slide-in-from-top-2 duration-150 shadow-sm">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <div className="relative flex-1 flex items-center h-10 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:border-blue-500 dark:focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mr-2.5" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'shop' && currentView !== 'services') onNavigate('services');
                }}
                placeholder="টিভি প্যানেল, ইনভার্টার পিসিবি বা যেকোনো পার্টস খুঁজুন..."
                className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-normal"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 cursor-pointer transition-colors"
                  title="সার্চ মুছুন"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-xs font-semibold"
              title="সার্চ বন্ধ করুন"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Slide-in Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* 1. Backdrop Overlay (Dark blur + tap outside to close) */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
          />

          {/* Drawer Content Container */}
          <div className="absolute top-0 right-0 w-[310px] sm:w-[340px] max-w-[88vw] h-full bg-white dark:bg-[#0B0F19] border-l border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200 z-10">
            {/* Top Fixed Header of Drawer */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] flex items-center justify-center p-1 text-white shadow-xs">
                  <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
                    <path d="M5 26L11 11L18 24L25 11L31 26" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 9L20.5 15.5H16.5L19 22" stroke="#FDE047" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <span className="font-heading font-black text-sm text-slate-900 dark:text-white tracking-wider block leading-none">
                    MM ELECTROLAB
                  </span>
                  <p className="text-[10px] text-slate-400 dark:text-slate-400 font-mono mt-0.5">Precision Tech Lab</p>
                </div>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Scrollable Center Body: Profile, Admin, Theme & Nav Items */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 divide-y divide-slate-100 dark:divide-slate-800/60">
              
              {/* 2. Profile & Action Card */}
              <div className="pt-1">
                {user ? (
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative shrink-0">
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt="User"
                              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/20"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                              {user.displayName?.charAt(0) || 'U'}
                            </div>
                          )}
                          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {userProfile?.displayName || user.displayName}
                            </span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                          </div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate block">
                            {user.email}
                          </span>
                        </div>
                      </div>

                      {/* Clean & Sleek Logout Icon Button */}
                      <button
                        onClick={() => {
                          signOutUser();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer shrink-0"
                        title="লগআউট"
                        aria-label="Logout"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsProfileModalOpen(true);
                        }}
                        className="text-blue-600 dark:text-cyan-400 font-medium hover:underline flex items-center gap-1"
                      >
                        <UserIcon className="w-3 h-3" />
                        <span>প্রোফাইল সেটিংস</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onNavigate('track');
                        }}
                        className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        সার্ভিস ট্র্যাকিং
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      signInWithGoogle();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-xs font-bold text-slate-800 dark:text-white flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer active:scale-98"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>গুগল দিয়ে সাইন ইন করুন</span>
                  </button>
                )}

                {/* Admin Highlight Card (Golden/Orange Gradient Border) */}
                {isAdmin && (
                  <button
                    onClick={() => {
                      onNavigate('admin');
                      setIsMobileMenuOpen(false);
                    }}
                    className="mt-3 w-full p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/40 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center justify-between shadow-2xs hover:border-amber-500 transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>অ্যাডমিন ড্যাশবোর্ড</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold uppercase shadow-xs">
                      Admin
                    </span>
                  </button>
                )}
              </div>

              {/* 3. Modern Navigation Menu Items with Icons & Active Indicator */}
              <div className="pt-3">
                <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2 px-1">
                  মেনু নেভিগেশন
                </p>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    const isActive = currentView === link.view;
                    return (
                      <button
                        key={link.view}
                        onClick={() => {
                          onNavigate(link.view);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-300 font-bold border-l-3 border-blue-600 dark:border-cyan-400 shadow-2xs'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <IconComponent
                            className={`w-4 h-4 transition-colors ${
                              isActive
                                ? 'text-blue-600 dark:text-cyan-400'
                                : 'text-slate-400 dark:text-slate-400 group-hover:text-slate-600'
                            }`}
                          />
                          <span>{link.labelBn}</span>
                        </div>
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            isActive
                              ? 'text-blue-600 dark:text-cyan-400 translate-x-0.5'
                              : 'text-slate-300 dark:text-slate-500'
                          }`}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Theme Switcher Row in Drawer */}
              <div className="pt-3">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200">
                    {isDark ? (
                      <Sun className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-blue-600" />
                    )}
                    <span>{isDark ? 'ডার্ক থিম সক্রিয়' : 'লাইট থিম সক্রিয়'}</span>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-amber-300 transition-colors cursor-pointer shadow-2xs"
                  >
                    {isDark ? 'লাইট করুন' : 'ডার্ক করুন'}
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Drawer Fixed Bottom Actions (Call & Service Booking) */}
            <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col gap-2 shrink-0">
              <a
                href={`tel:${STORE_INFO.phone1}`}
                className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition-all shadow-2xs"
              >
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>কল: {STORE_INFO.phone1}</span>
              </a>

              <button
                onClick={() => {
                  onNavigate('service-booking');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
              >
                <Wrench className="w-4 h-4 text-cyan-200" />
                <span>অনলাইন ল্যাব বুকিং</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
