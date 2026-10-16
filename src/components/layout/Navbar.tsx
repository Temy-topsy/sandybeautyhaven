import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItemCount, openCart } = useCart();
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
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 90,
          backgroundColor: isScrolled ? 'rgba(250, 247, 242, 0.97)' : 'var(--color-ivory)',
          backdropFilter: isScrolled ? 'blur(8px)' : 'none',
          borderBottom: '1px solid var(--color-border)',
          transition: 'all var(--transition-fast)'
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
          {/* Brand Logo & Wordmark (Shifted Left & Compact) */}
          <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'start' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                textDecoration: 'none'
              }}
            >
              <img
                src="/sandy logo.png"
                alt="Sandy Beauty Haven Logo"
                style={{
                  width: '32px',
                  height: '32px',
                  objectFit: 'contain',
                  borderRadius: '50%'
                }}
              />
              <span
                className="brand-wordmark"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-espresso)',
                  whiteSpace: 'nowrap'
                }}
              >
                Sandy Beauty Haven
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links (Mathematically Centered with Generous Pacing) */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              justifySelf: 'center',
              gap: 'clamp(2rem, 3.2vw, 3.5rem)'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  color: isActive(link.path) ? 'var(--color-espresso)' : 'var(--color-taupe)',
                  borderBottom: isActive(link.path) ? '2px solid var(--color-rose)' : '2px solid transparent',
                  padding: '4px 6px',
                  transition: 'all var(--transition-fast)',
                  whiteSpace: 'nowrap'
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action: Shopping Bag & Primary Booking CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', justifySelf: 'end' }}>
            <button
              type="button"
              onClick={openCart}
              aria-label="View shopping bag"
              style={{
                position: 'relative',
                background: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-espresso)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <ShoppingBag size={17} />
              {totalItemCount > 0 && (
                <span
                  key={totalItemCount}
                  className="cart-bounce"
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    backgroundColor: 'var(--color-rose)',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.12)'
                  }}
                >
                  {totalItemCount}
                </span>
              )}
            </button>

            <Link
              to="/schedule"
              className="btn btn-primary"
              style={{
                padding: '0.55rem 1.15rem',
                fontSize: '0.785rem',
                display: 'inline-flex'
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
                background: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.45rem',
                cursor: 'pointer',
                color: 'var(--color-espresso)'
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
            zIndex: 99,
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
                  alt="Logo"
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                />
                <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.1rem' }}>
                  SANDY BEAUTY HAVEN
                </span>
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
          .brand-wordmark {
            display: none !important;
          }
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
          .desktop-info {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
};
