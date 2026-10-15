import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('sbh_cookie_consent');
    if (!consent) {
      // Delay slightly for smooth page entrance
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('sbh_cookie_consent', JSON.stringify({ essential: true, analytics: true, date: new Date().toISOString() }));
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('sbh_cookie_consent', JSON.stringify({ essential: true, analytics: false, date: new Date().toISOString() }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        left: '1.25rem',
        right: '1.25rem',
        maxWidth: '540px',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-modal)',
        padding: '1.25rem 1.5rem',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <Shield size={20} style={{ color: 'var(--color-rose)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Privacy & Cookie Preferences
          </h4>
          <p style={{ fontSize: '0.825rem', color: 'var(--color-taupe)', margin: 0, lineHeight: 1.5 }}>
            We use essential cookies to maintain your booking session and anonymous analytics to understand site performance in compliance with UK GDPR and PECR. Read our{' '}
            <Link to="/policies/cookies" style={{ textDecoration: 'underline', color: 'var(--color-espresso)' }}>
              Cookie Policy
            </Link>.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={handleEssentialOnly}
          className="btn btn-subtle"
          style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
        >
          Essential Only
        </button>
        <button
          type="button"
          onClick={handleAcceptAll}
          className="btn btn-primary"
          style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem' }}
        >
          Accept All
        </button>
      </div>
    </div>
  );
};
