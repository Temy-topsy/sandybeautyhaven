import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ShieldCheck, Calendar, MapPin } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '85vh', paddingBottom: '7rem' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--color-surface-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
        paddingTop: 'clamp(3.5rem, 6vw, 5.5rem)',
        paddingBottom: 'clamp(2.5rem, 5vw, 4rem)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '600px' }}>
            <span className="section-eyebrow">Our Story</span>
            <h1 style={{ marginBottom: '1rem' }}>Behind Sandy Beauty Haven</h1>
            <p className="lead" style={{ margin: 0, color: 'var(--color-taupe)' }}>
              An intimate Edinburgh studio dedicated to bespoke lash mapping, brow precision, and accredited beauty mentorship.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'clamp(3.5rem, 6vw, 5rem)' }}>
        {/* Sandy's Bio & Portrait */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
          marginBottom: 'clamp(4.5rem, 8vw, 7.5rem)'
        }}>
          <div>
            <div style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: 'var(--shadow-card)',
              backgroundColor: '#FFFFFF'
            }}>
              <img
                src="/Sandy pfp.png"
                alt="Sandy - Certified Lash & Brow Artist"
                style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div style={{ maxWidth: '520px' }}>
            <span className="section-eyebrow">Sandy</span>
            <h2 style={{ marginBottom: '1.25rem', fontSize: 'clamp(2rem, 3.8vw, 2.75rem)' }}>
              "Crafting lashes and brows that align with your natural aesthetic."
            </h2>
            <p className="lead" style={{ marginBottom: '1.25rem', color: 'var(--color-taupe)' }}>
              With over two years of specialized experience in Edinburgh, Sandy established Sandy Beauty Haven to provide a serene space where clients receive genuinely customized treatments.
            </p>
            <p style={{ color: 'var(--color-taupe)', lineHeight: 1.75, marginBottom: '2.5rem' }}>
              From delicate classic sets to full volume Russian lashes and ombré powder shading, every look is mapped to complement your unique bone structure and protect natural lash health.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/schedule" className="btn btn-primary">
                <Calendar size={15} />
                Book an Appointment
              </Link>
              <Link to="/training" className="btn btn-secondary">
                View Training Course →
              </Link>
            </div>
          </div>
        </div>

        {/* The 3 Pillars */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: 'clamp(2.5rem, 5vw, 4rem)',
          marginBottom: 'clamp(4.5rem, 8vw, 7.5rem)',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div className="section-header" style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            <span className="section-eyebrow">Our Ethos</span>
            <h2 className="section-title">The Three Pillars</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)'
          }}>
            <div>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-blush-light)',
                color: 'var(--color-rose)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Heart size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Lash Health First</h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                We calibrate every fan weight and diameter to ensure zero strain on natural lashes.
              </p>
            </div>

            <div>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-blush-light)',
                color: 'var(--color-rose)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Sparkles size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Bespoke Mapping</h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Tailored styling that complements eye contour, facial bone structure, and lifestyle.
              </p>
            </div>

            <div>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-blush-light)',
                color: 'var(--color-rose)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <ShieldCheck size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Clinical Hygiene</h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                Medical sterilization, single-use disposables, and a tranquil studio space at 101 Easter Road.
              </p>
            </div>
          </div>
        </div>

        {/* Studio Space Showcase */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(2.5rem, 5vw, 4.5rem)',
          alignItems: 'center'
        }}>
          <div>
            <span className="section-eyebrow">The Studio</span>
            <h2 style={{ marginBottom: '1rem', fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)' }}>A Calm Sanctuary</h2>
            <p style={{ color: 'var(--color-taupe)', lineHeight: 1.75, marginBottom: '1.75rem' }}>
              Conveniently located on Easter Road, Edinburgh. Soft warm tones, natural daylight, and plush ergonomic treatment beds created for a peaceful lash nap.
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--color-espresso)'
            }}>
              <MapPin size={17} style={{ color: 'var(--color-rose)' }} />
              101 Easter Road, Edinburgh, EH7 5PP
            </div>
          </div>

          <div>
            <div style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: 'var(--shadow-card)'
            }}>
              <img
                src="/inspo design img.jpg"
                alt="Sandy Beauty Haven Interior Ambience"
                style={{ width: '100%', maxHeight: '380px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* Client Love & Social Proof */}
        <div style={{
          marginTop: 'clamp(4.5rem, 8vw, 7.5rem)',
          paddingTop: 'clamp(3rem, 6vw, 4.5rem)',
          borderTop: '1px solid var(--color-border-subtle)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span className="section-eyebrow">Client Feedback</span>
              <h2 style={{ margin: 0, fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)' }}>
                Trusted by Edinburgh Clients
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/reviews" className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}>
                Read All Reviews →
              </Link>
              <Link to="/gallery" className="btn btn-subtle" style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}>
                View Client Sets →
              </Link>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-subtle)'
            }}>
              <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--color-rose)', marginBottom: '0.75rem' }}>
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} style={{ fontSize: '0.9rem' }}>{s}</span>
                ))}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-espresso-light)', lineHeight: 1.6, marginBottom: '1rem' }}>
                "I got my lashes done here yesterday for the first time and I absolutely love how comfortable Sandy made me feel throughout the whole process. My lashes came out gorgeous and flattering!"
              </p>
              <div style={{ fontSize: '0.785rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                Ayishat A. • <span style={{ color: 'var(--color-taupe)', fontWeight: 400 }}>Hybrid Lash Set</span>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-subtle)'
            }}>
              <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--color-rose)', marginBottom: '0.75rem' }}>
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} style={{ fontSize: '0.9rem' }}>{s}</span>
                ))}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-espresso-light)', lineHeight: 1.6, marginBottom: '1rem' }}>
                "Always go back to Sandy’s lashes, she is so good at her craft and the lashes always last so long 💕 so flattering as well! The studio space is lovely and calm."
              </p>
              <div style={{ fontSize: '0.785rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                Maggie H. • <span style={{ color: 'var(--color-taupe)', fontWeight: 400 }}>Volume / Russian Lashes</span>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-subtle)'
            }}>
              <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--color-rose)', marginBottom: '0.75rem' }}>
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} style={{ fontSize: '0.9rem' }}>{s}</span>
                ))}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-espresso-light)', lineHeight: 1.6, marginBottom: '1rem' }}>
                "Taking Sandy’s 1-on-1 lash training was the best investment I made this year. She gave practical tips on isolation, adhesive control, and client setup."
              </p>
              <div style={{ fontSize: '0.785rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                Chloe T. • <span style={{ color: 'var(--color-taupe)', fontWeight: 400 }}>1-on-1 Academy Student</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
