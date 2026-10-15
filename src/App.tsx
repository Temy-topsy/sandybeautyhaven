import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CookieBanner } from './components/layout/CookieBanner';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { BookingPage } from './pages/BookingPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { TrainingPage } from './pages/TrainingPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';

// Policies
import { PolicyLayout } from './pages/policies/PolicyLayout';
import { BookingPolicy } from './pages/policies/BookingPolicy';
import { CancellationPolicy } from './pages/policies/CancellationPolicy';
import { RefundPolicy } from './pages/policies/RefundPolicy';
import { PrivacyPolicy } from './pages/policies/PrivacyPolicy';
import { TermsPolicy } from './pages/policies/TermsPolicy';
import { CookiePolicy } from './pages/policies/CookiePolicy';

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

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <ScrollToTop />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/schedule" element={<BookingPage />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/checkout" element={<BookingPage />} />
              <Route path="/booking-confirmed" element={<BookingConfirmationPage />} />
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
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;
