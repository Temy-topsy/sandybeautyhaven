import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CookieBanner } from './components/layout/CookieBanner';
import { Toast } from './components/ui/Toast';
import { ExitIntentModal } from './components/ui/ExitIntentModal';

// Primary Instant Landing Route (Synchronous for instantaneous first paint)
import { HomePage } from './pages/HomePage';

// Code-split Secondary Routes (Loaded on-demand to maximize initial page speed)
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const BookingPage = lazy(() => import('./pages/BookingPage').then(m => ({ default: m.BookingPage })));
const BookingConfirmationPage = lazy(() => import('./pages/BookingConfirmationPage').then(m => ({ default: m.BookingConfirmationPage })));
const TrainingPage = lazy(() => import('./pages/TrainingPage').then(m => ({ default: m.TrainingPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage').then(m => ({ default: m.ReviewsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(m => ({ default: m.FaqPage })));
const MyBookingPage = lazy(() => import('./pages/MyBookingPage').then(m => ({ default: m.MyBookingPage })));

// Policies
const PolicyLayout = lazy(() => import('./pages/policies/PolicyLayout').then(m => ({ default: m.PolicyLayout })));
const BookingPolicy = lazy(() => import('./pages/policies/BookingPolicy').then(m => ({ default: m.BookingPolicy })));
const CancellationPolicy = lazy(() => import('./pages/policies/CancellationPolicy').then(m => ({ default: m.CancellationPolicy })));
const RefundPolicy = lazy(() => import('./pages/policies/RefundPolicy').then(m => ({ default: m.RefundPolicy })));
const PrivacyPolicy = lazy(() => import('./pages/policies/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsPolicy = lazy(() => import('./pages/policies/TermsPolicy').then(m => ({ default: m.TermsPolicy })));
const CookiePolicy = lazy(() => import('./pages/policies/CookiePolicy').then(m => ({ default: m.CookiePolicy })));

// Quiet Luxury Subtle Loading State
const PageLoader = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-ivory)'
  }}>
    <div style={{
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      border: '2px solid var(--color-border)',
      borderTopColor: 'var(--color-rose)',
      animation: 'spin 0.65s linear infinite'
    }} />
  </div>
);

// Scroll to top on every route transition
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// 404 Not Found Page
const NotFoundPage = () => (
  <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
    <div style={{ textAlign: 'center', maxWidth: '500px' }}>
      <span className="section-eyebrow">404 Error</span>
      <h1 style={{ marginBottom: '1rem' }}>Page Not Found</h1>
      <p style={{ color: 'var(--color-taupe)', marginBottom: '2rem' }}>
        The beauty treatment or page you are looking for has moved or does not exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Return to Home
      </Link>
    </div>
  </div>
);

const MainLayout: React.FC = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: isHome ? 0 : 'var(--header-height)' }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/schedule" element={<BookingPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/checkout" element={<BookingPage />} />
            <Route path="/booking-confirmed" element={<BookingConfirmationPage />} />
            <Route path="/my-booking" element={<MyBookingPage />} />
            <Route path="/find-booking" element={<MyBookingPage />} />
            <Route path="/lookup-booking" element={<MyBookingPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />

            {/* Legal & Policy Sub-routes */}
            <Route path="/policies" element={<PolicyLayout />}>
              <Route index element={<BookingPolicy />} />
              <Route path="booking" element={<BookingPolicy />} />
              <Route path="cancellation" element={<CancellationPolicy />} />
              <Route path="refunds" element={<RefundPolicy />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsPolicy />} />
              <Route path="cookies" element={<CookiePolicy />} />
            </Route>

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <BookingProvider>
          <ScrollToTop />
          <Toast />
          <ExitIntentModal />
          <MainLayout />
        </BookingProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
