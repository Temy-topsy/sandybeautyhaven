import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { InstagramIcon, TikTokIcon } from '../ui/SocialIcons';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--color-noir)',
      color: 'var(--color-noir-text)',
      paddingTop: 'clamp(3rem, 6vw, 4.5rem)',
      paddingBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
      borderTop: '1px solid var(--color-noir-border)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 'clamp(2.5rem, 5vw, 4rem)',
          marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)'
        }}>
          {/* Left Column: Brand, Short Bio, Socials */}
          <div style={{ maxWidth: '380px' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
              <img
                src="/sandy logo light.png"
                alt="Sandy Beauty Haven"
                style={{
                  height: '48px',
                  width: 'auto',
                  maxWidth: '160px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.35))'
                }}
              />
            </Link>
            <p style={{ color: 'var(--color-noir-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Bespoke lash extensions, brow artistry, and accredited one-to-one mentorship in Edinburgh.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="https://instagram.com/Lashbysandy__"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'var(--color-noir-text)',
                  fontSize: '0.8rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  textDecoration: 'none'
                }}
              >
                <InstagramIcon size={14} style={{ color: 'var(--color-rose)' }} />
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
                  color: 'var(--color-noir-text)',
                  fontSize: '0.8rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  textDecoration: 'none'
                }}
              >
                <TikTokIcon size={14} style={{ color: 'var(--color-rose)' }} />
                TikTok
              </a>
            </div>
          </div>

          {/* Right Columns: Left-aligned clean links */}
          <div style={{
            display: 'flex',
            gap: 'clamp(2rem, 5vw, 4rem)',
            flexWrap: 'wrap'
          }}>
            <div>
              <span style={{
                display: 'block',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-rose)',
                fontWeight: 600,
                marginBottom: '1rem'
              }}>
                Studio
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
                <li><Link to="/services" style={{ color: 'var(--color-noir-muted)' }} className="footer-link">Services</Link></li>
                <li><Link to="/my-booking" style={{ color: 'var(--color-noir-muted)' }} className="footer-link">Find My Booking</Link></li>
                <li><Link to="/training" style={{ color: 'var(--color-noir-muted)' }} className="footer-link">1-on-1 Training</Link></li>
                <li><Link to="/gallery" style={{ color: 'var(--color-noir-muted)' }} className="footer-link">Gallery</Link></li>
                <li><Link to="/reviews" style={{ color: 'var(--color-noir-muted)' }} className="footer-link">Reviews</Link></li>
                <li><Link to="/about" style={{ color: 'var(--color-noir-muted)' }} className="footer-link">About Sandy</Link></li>
                <li><Link to="/contact" style={{ color: 'var(--color-noir-muted)' }} className="footer-link">Contact</Link></li>
              </ul>
            </div>

            <div>
              <span style={{
                display: 'block',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-rose)',
                fontWeight: 600,
                marginBottom: '1rem'
              }}>
                Policies
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
                <li><Link to="/policies/booking" style={{ color: 'var(--color-noir-muted)' }} className="footer-link">Booking Policy</Link></li>
                <li><Link to="/policies/cancellation" style={{ color: 'var(--color-noir-muted)' }} className="footer-link">48h Cancellation</Link></li>
                <li><Link to="/policies/terms" style={{ color: 'var(--color-noir-muted)' }} className="footer-link">Terms & Conditions</Link></li>
                <li><Link to="/policies/privacy" style={{ color: 'var(--color-noir-muted)' }} className="footer-link">Privacy (UK GDPR)</Link></li>
                <li><Link to="/faq" style={{ color: 'var(--color-noir-muted)' }} className="footer-link">FAQs</Link></li>
              </ul>
            </div>

            <div>
              <span style={{
                display: 'block',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-rose)',
                fontWeight: 600,
                marginBottom: '1rem'
              }}>
                Appointments
              </span>
              <p style={{ color: 'var(--color-noir-muted)', fontSize: '0.825rem', lineHeight: 1.5, marginBottom: '1.25rem', maxWidth: '180px' }}>
                101 Easter Road, Edinburgh<br />
                Mon – Sat: 9am – 5pm
              </p>
              <Link to="/schedule" className="btn btn-rose" style={{ padding: '0.65rem 1.25rem', fontSize: '0.75rem' }}>
                <Calendar size={13} />
                Book Online
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div style={{
          paddingTop: '1.75rem',
          borderTop: '1px solid var(--color-noir-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.775rem',
          color: 'var(--color-noir-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} Sandy Beauty Haven. All rights reserved.
          </div>
          <div>
            101 Easter Road, Edinburgh, EH7 5PP
          </div>
        </div>
      </div>
    </footer>
  );
};
