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

  // Lock background scroll when full-screen mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
          {/* Brand Logo Only (Bold & Clearly Visible on Mobile & Desktop) */}
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
                  width: '44px',
                  height: '44px',
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

            {/* Mobile Menu Toggle Button with Tactile Feedback */}
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
                backdropFilter: isTransparent ? 'blur(6px)' : 'none'
              }}
              className="mobile-menu-btn"
            >
              <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: mobileMenuOpen ? 'rotate(90deg)' : 'none'
              }}>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation with Smooth Entrance & Cascade Animation */}
      <div
        className={`mobile-menu-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Top Bar with Close X, Centered Bold Logo */}
        <div className="mobile-menu-header">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="mobile-menu-close-btn"
          >
            <X size={24} />
          </button>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="/sandy logo.png"
              alt="Sandy Beauty Haven Logo"
              style={{ width: '46px', height: '46px', objectFit: 'contain', borderRadius: '50%' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '36px' }} />
        </div>

        {/* Full-Screen Clean Navigation Links with Staggered Cascade */}
        <nav className="mobile-nav-links-list">
          {navLinks.map((link, idx) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-nav-link ${active ? 'is-active' : ''}`}
                style={{ animationDelay: `${(idx + 1) * 0.05}s` }}
              >
                <span>{link.name}</span>
                {active ? (
                  <span className="mobile-nav-dot" />
                ) : (
                  <span className="mobile-nav-arrow">→</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Booking Action & Studio Location Details */}
        <div className="mobile-menu-footer">
          <Link
            to="/schedule"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.95rem',
              fontSize: '0.85rem',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <Calendar size={16} />
            Book Appointment
          </Link>

          <div
            style={{
              fontSize: '0.825rem',
              color: 'var(--color-taupe)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              textAlign: 'center'
            }}
          >
            <p style={{ margin: 0, fontWeight: 500, color: 'var(--color-espresso)' }}>101 Easter Road, Edinburgh</p>
            <p style={{ margin: 0 }}>Mon–Sat: 9am – 5pm • +44 07733777956</p>
          </div>
        </div>
      </div>

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
