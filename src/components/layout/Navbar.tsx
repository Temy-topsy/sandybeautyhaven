import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Main Navigation Bar (Overlays Hero on Home, Frosted Solid on Scroll/Other Pages) */}
      <header
        className={`main-navbar ${isTransparent ? 'navbar-transparent' : 'navbar-solid'}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100
        }}
      >
        <div
          className="navbar-container"
          style={{
            height: 'var(--header-height)',
            width: '100%',
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 clamp(1.25rem, 3.5vw, 2.5rem)',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center'
          }}
        >
          {/* Brand Logo Only (Clean Quiet-Luxury Monogram - Zero Border Artifacts) */}
          <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'start' }}>
            <Link
              to="/"
              className="navbar-brand-logo"
              aria-label="Sandy Beauty Haven Home"
            >
              <img
                src="/sandy logo.png"
                alt="Sandy Beauty Haven Logo"
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'contain',
                  borderRadius: '50%',
                  border: 'none',
                  outline: 'none',
                  display: 'block'
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation Links (Centered with Very Strong Tactile Hover) */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              justifySelf: 'center',
              gap: 'clamp(1rem, 2.5vw, 2.5rem)'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link-item ${active ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Primary Booking CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', justifySelf: 'end' }}>
            <Link
              to="/schedule"
              className={`btn ${isTransparent ? 'btn-navbar-hero' : 'btn-primary'} navbar-cta-btn`}
              style={{
                padding: '0.55rem 1.25rem',
                fontSize: '0.8rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <Calendar size={14} />
              Book Now
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isTransparent ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                border: isTransparent ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.45rem',
                cursor: 'pointer',
                color: isTransparent ? '#FFFFFF' : 'var(--color-espresso)',
                backdropFilter: isTransparent ? 'blur(6px)' : 'none',
                transition: 'all 0.25s ease'
              }}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(36, 29, 28, 0.4)',
            zIndex: 101,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: '85%',
              maxWidth: '360px',
              height: '100%',
              backgroundColor: 'var(--color-ivory)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-modal)',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img
                  src="/sandy logo.png"
                  alt="Sandy Beauty Haven Logo"
                  style={{ width: '38px', height: '38px', borderRadius: '50%' }}
                />
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  color: 'var(--color-espresso)'
                }}
              >
                <X size={24} />
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: isActive(link.path) ? 'var(--color-espresso)' : 'var(--color-taupe)',
                    backgroundColor: isActive(link.path) ? 'var(--color-surface-warm)' : 'transparent'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link
                to="/schedule"
                className="btn btn-primary"
                style={{ width: '100%', textAlign: 'center' }}
              >
                <Calendar size={16} />
                Book Appointment
              </Link>
              <div style={{
                paddingTop: '1rem',
                borderTop: '1px solid var(--color-border)',
                fontSize: '0.85rem',
                color: 'var(--color-taupe)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <p style={{ margin: 0 }}>101 Easter Road, Edinburgh</p>
                <p style={{ margin: 0 }}>+44 07733777956</p>
                <p style={{ margin: 0 }}>Mon–Sat: 9am – 5pm</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Responsive CSS rule */}
      <style>{`
        @media (max-width: 899px) {
          .navbar-container {
            display: flex !important;
            justify-content: space-between !important;
          }
        }
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
