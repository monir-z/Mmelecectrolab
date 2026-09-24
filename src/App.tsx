import React, { useState, useEffect } from 'react';
import { ViewName } from './types';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';
import { OrderProvider } from './context/OrderContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { BackToTop } from './components/layout/BackToTop';
import { CartDrawer } from './components/ui/CartDrawer';
import { CompareModal } from './components/ui/CompareModal';
import { UserProfileModal } from './components/ui/UserProfileModal';
import { AuthWallModal } from './components/auth/AuthWallModal';
import { PrimeAiWidget } from './components/chat/PrimeAiWidget';
import { SplashScreen } from './components/common/SplashScreen';
import { trackVisitorTraffic } from './services/analytics';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { ServicesView } from './views/ServicesView';
import { ServiceBookingView } from './views/ServiceBookingView';
import { TrackView } from './views/TrackView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { BlogView } from './views/BlogView';
import { FAQView } from './views/FAQView';
import { WarrantyView } from './views/WarrantyView';
import { AdminView } from './views/AdminView';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewName>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('prod-cof-nt39567');
  const [trackingQueryId, setTrackingQueryId] = useState<string>('MM-8821');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Track visitor traffic session
  useEffect(() => {
    trackVisitorTraffic();
  }, []);

  const navigateTo = (view: ViewName, idParam?: string) => {
    if (view === 'product-detail' && idParam) {
      setSelectedProductId(idParam);
    }
    if (view === 'track' && idParam) {
      setTrackingQueryId(idParam);
    }
    if (view === 'order-success' && idParam) {
      setTrackingQueryId(idParam);
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090D16] text-[#0F172A] dark:text-[#F9FAFB] flex flex-col selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-cyan-200 relative antialiased">
      {/* Modern Ultra-Smooth Splash Screen */}
      <SplashScreen minDurationMs={1500} />

      {/* Mandatory Auth Wall: displayed immediately until Google sign in is completed */}
      <AuthWallModal />

      {/* Top Header & Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area with explicit 80px bottom padding to prevent floating widget overlaps */}
      <main className="flex-1 w-full pb-[80px]" style={{ paddingBottom: '80px' }}>
        {currentView === 'home' && <HomeView onNavigate={navigateTo} />}
        {currentView === 'shop' && (
          <ShopView
            onNavigate={navigateTo}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        {currentView === 'product-detail' && (
          <ProductDetailView productId={selectedProductId} onNavigate={navigateTo} />
        )}
        {currentView === 'services' && <ServicesView onNavigate={navigateTo} />}
        {currentView === 'service-booking' && <ServiceBookingView onNavigate={navigateTo} />}
        {currentView === 'track' && (
          <TrackView initialTrackingId={trackingQueryId} onNavigate={navigateTo} />
        )}
        {currentView === 'cart' && <CartView onNavigate={navigateTo} />}
        {currentView === 'checkout' && <CheckoutView onNavigate={navigateTo} />}
        {currentView === 'order-success' && (
          <OrderSuccessView orderId={trackingQueryId} onNavigate={navigateTo} />
        )}
        {currentView === 'about' && <AboutView onNavigate={navigateTo} />}
        {currentView === 'contact' && <ContactView onNavigate={navigateTo} />}
        {currentView === 'blog' && <BlogView onNavigate={navigateTo} />}
        {currentView === 'faq' && <FAQView onNavigate={navigateTo} />}
        {currentView === 'warranty' && <WarrantyView onNavigate={navigateTo} />}
        {currentView === 'admin' && <AdminView onNavigate={navigateTo} />}
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer onNavigate={navigateTo} />

      {/* Side-by-side Product Comparison Modal */}
      <CompareModal onNavigate={navigateTo} />

      {/* Firebase Auth User Profile Modal */}
      <UserProfileModal onNavigate={navigateTo} />

      {/* PRIME AI Assistant Floating Widget */}
      <PrimeAiWidget onNavigate={navigateTo} />

      {/* 3D Glassmorphic WhatsApp Floating Widget */}
      <FloatingWhatsApp />

      {/* Back to Top */}
      <BackToTop />

      {/* Enterprise Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <CompareProvider>
                  <OrderProvider>
                    <ErrorBoundary>
                      <AppContent />
                    </ErrorBoundary>
                  </OrderProvider>
                </CompareProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
