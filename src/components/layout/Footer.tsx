import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, TikTokIcon } from '../ui/SocialIcons';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--color-espresso)',
      color: 'var(--color-ivory)',
      paddingTop: '3.5rem',
      paddingBottom: '3.5rem',
      borderTop: '1px solid rgba(255,255,255,0.08)'
    }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
        {/* Logo alone */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
          <img
            src="/sandy logo.png"
            alt="Logo"
            style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FFFFFF', padding: '2px' }}
          />
        </div>

        {/* Minimal Navigation */}
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(1rem, 3vw, 2rem)',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          fontSize: '0.85rem'
        }}>
          <Link to="/services" style={{ color: '#D5CDC7' }}>Services</Link>
          <Link to="/training" style={{ color: '#D5CDC7' }}>Training</Link>
          <Link to="/gallery" style={{ color: '#D5CDC7' }}>Gallery</Link>
          <Link to="/reviews" style={{ color: '#D5CDC7' }}>Reviews</Link>
          <Link to="/about" style={{ color: '#D5CDC7' }}>About</Link>
          <Link to="/contact" style={{ color: '#D5CDC7' }}>Contact</Link>
          <Link to="/policies/booking" style={{ color: '#D5CDC7' }}>Policies</Link>
        </nav>

        {/* Direct Socials */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <a
            href="https://instagram.com/Lashbysandy__"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--color-ivory)',
              fontSize: '0.8rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(255,255,255,0.06)'
            }}
          >
            <InstagramIcon size={14} style={{ color: 'var(--color-blush)' }} />
            @Lashbysandy__
          </a>
          <a
            href="https://tiktok.com/@kar_zandrah08"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--color-ivory)',
              fontSize: '0.8rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(255,255,255,0.06)'
            }}
          >
            <TikTokIcon size={14} style={{ color: 'var(--color-blush)' }} />
            TikTok
          </a>
        </div>

        {/* Bottom Minimal Copyright */}
        <div style={{
          paddingTop: '1.75rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          fontSize: '0.775rem',
          color: '#A99E98'
        }}>
          <div>
            101 Easter Road, Edinburgh • Mon–Sat 9AM–5PM
          </div>
          <div>
            © {new Date().getFullYear()} Sandy Beauty Haven. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
