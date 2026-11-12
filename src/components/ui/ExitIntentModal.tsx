import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const ExitIntentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { selectedServices } = useBooking();

  useEffect(() => {
    // Don't show on booking confirmation page
    if (location.pathname === '/booking-confirmed') return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when cursor leaves towards the top window edge
      if (e.clientY <= 12 && !sessionStorage.getItem('sbh_exit_intent_shown')) {
        sessionStorage.setItem('sbh_exit_intent_shown', 'true');
        setIsOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const hasItems = selectedServices.length > 0;
  const firstService = hasItems ? selectedServices[0] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(20, 15, 14, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          maxWidth: '480px',
          width: '100%',
          padding: 'clamp(2rem, 5vw, 2.75rem)',
          boxShadow: 'var(--shadow-modal)',
          position: 'relative',
          textAlign: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--color-taupe)',
            cursor: 'pointer',
            padding: '0.4rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color var(--transition-fast)'
          }}
        >
          <X size={18} />
        </button>

        {/* Atelier Icon */}
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-blush-light)',
          color: 'var(--color-rose)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto',
          border: '1px solid rgba(163, 111, 114, 0.2)'
        }}>
          <Sparkles size={20} />
        </div>

        {/* Eyebrow */}
        <span style={{
          fontSize: '0.725rem',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--color-rose)',
          fontWeight: 600,
          display: 'block',
          marginBottom: '0.5rem'
        }}>
          A Moment Before You Leave
        </span>

        {/* Headline */}
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.75rem, 4vw, 2.2rem)',
          lineHeight: 1.18,
          marginBottom: '0.85rem',
          color: 'var(--color-espresso)',
          fontWeight: 400
        }}>
          You're One Step Away From Effortless Beauty.
        </h3>

        {/* Thoughtful Body Copy */}
        <p style={{
          fontSize: '0.925rem',
          color: 'var(--color-taupe)',
          lineHeight: 1.6,
          marginBottom: '1.75rem'
        }}>
          {hasItems && firstService ? (
            <>
              Your selected treatment (<strong>{firstService.name}</strong>) is currently saved. Secure your preferred slot at 101 Easter Road before appointments fill up.
            </>
          ) : (
            <>
              Wake up with beautifully mapped brows and lightweight, customized lash sets. Appointments at our 101 Easter Road studio are limited to ensure high-touch, private care.
            </>
          )}
        </p>

        {/* Trust Highlight */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          fontSize: '0.775rem',
          color: 'var(--color-espresso-light)',
          backgroundColor: 'var(--color-surface-subtle)',
          padding: '0.4rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.75rem',
          border: '1px solid var(--color-border-subtle)'
        }}>
          <Clock size={13} style={{ color: 'var(--color-rose)' }} />
          <span>Quick 60-second reservation • £50 deposit secures slot</span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link
            to="/schedule"
            onClick={handleClose}
            className="btn btn-rose"
            style={{
              padding: '0.95rem 1.75rem',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              width: '100%',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <span>Continue My Reservation</span>
            <ArrowRight size={15} />
          </Link>

          <button
            type="button"
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-taupe)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              padding: '0.5rem',
              transition: 'color var(--transition-fast)'
            }}
          >
            I'll return later
          </button>
        </div>
      </div>
    </div>
  );
};
