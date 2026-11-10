import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Star,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { REVIEWS } from '../data/reviews';
import { useBooking } from '../context/BookingContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedService } = useBooking();

  // Curate 4 top services
  const featuredServices = SERVICES.filter((s) => s.popular).slice(0, 4);

  const handleBookService = (service: (typeof SERVICES)[0]) => {
    setSelectedService(service);
    navigate('/schedule');
  };

  return (
    <div>
      {/* 1. HERO SECTION - Grounded, Confident, High Contrast */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          paddingTop: 'clamp(3.5rem, 7vw, 6rem)',
          paddingBottom: 'clamp(3.5rem, 7vw, 6rem)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'center'
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--color-rose)',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                101 Easter Road, Edinburgh
              </p>

              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
                  lineHeight: 1.12,
                  color: 'var(--color-espresso)',
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.02em'
                }}
              >
                Bespoke lash extensions, brow styling, and private training.
              </h1>

              <p
                style={{
                  fontSize: '1.125rem',
                  lineHeight: 1.7,
                  color: '#5C524F',
                  marginBottom: '2.25rem',
                  maxWidth: '540px'
                }}
              >
                Natural lash health comes first. Every extension set is custom mapped to your eyes, and every training course is taught privately one-to-one with Sandy.
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  alignItems: 'center'
                }}
              >
                <Link
                  to="/schedule"
                  className="btn btn-primary"
                  style={{ padding: '0.95rem 2rem', fontSize: '0.85rem' }}
                >
                  <Calendar size={15} />
                  Book an Appointment
                </Link>

                <Link
                  to="/services"
                  className="btn btn-secondary"
                  style={{ padding: '0.95rem 1.85rem', fontSize: '0.85rem' }}
                >
                  View Treatment Menu
                </Link>
              </div>
            </div>

            <div>
              <div
                style={{
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface-subtle)',
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                <img
                  src="/lashes inspo img.jpg"
                  alt="Sandy Beauty Haven lash extension styling"
                  style={{
                    width: '100%',
                    height: 'clamp(360px, 45vw, 500px)',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO - Three Clear Offerings (No Fake Numbers, No Floating Badges) */}
      <section
        style={{
          paddingTop: 'clamp(4rem, 6vw, 5.5rem)',
          paddingBottom: 'clamp(4rem, 6vw, 5.5rem)',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-ivory)'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '620px', marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                color: 'var(--color-espresso)',
                marginBottom: '0.75rem'
              }}
            >
              Services & Training
            </h2>
            <p style={{ fontSize: '1.0625rem', color: '#5C524F', lineHeight: 1.7, margin: 0 }}>
              Choose your path: relax in the studio chair for custom extensions and brows, or build your own lash business with direct one-to-one mentorship.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2.25rem)'
            }}
          >
            {/* Offering 1 */}
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.65rem',
                    color: 'var(--color-espresso)',
                    marginBottom: '0.85rem'
                  }}
                >
                  Lash Extensions
                </h3>
                <p style={{ fontSize: '1rem', color: '#5C524F', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  Classic, hybrid, volume, and express sets designed around your natural lash strength. No heavy fans, no clumping, and long retention.
                </p>
              </div>
              <div>
                <Link
                  to="/services"
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <span>Explore Lash Sets</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Offering 2 */}
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.65rem',
                    color: 'var(--color-espresso)',
                    marginBottom: '0.85rem'
                  }}
                >
                  Ombré Powder Brows
                </h3>
                <p style={{ fontSize: '1rem', color: '#5C524F', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  Semi-permanent pixelated shading that heals into a soft powder finish. Custom measured to balance your bone structure and skin tone.
                </p>
              </div>
              <div>
                <Link
                  to="/services"
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <span>Explore Brow Styling</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Offering 3 */}
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.65rem',
                    color: 'var(--color-espresso)',
                    marginBottom: '0.85rem'
                  }}
                >
                  1-on-1 CPD Academy
                </h3>
                <p style={{ fontSize: '1rem', color: '#5C524F', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  Three days of accredited private training in Edinburgh. Includes complete starter kit, practical live model sets, and ongoing business guidance.
                </p>
              </div>
              <div>
                <Link
                  to="/training"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <span>Course Curriculum</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE TREATMENTS LIST */}
      <section
        style={{
          paddingTop: 'clamp(4rem, 6vw, 5.5rem)',
          paddingBottom: 'clamp(4rem, 6vw, 5.5rem)',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                  color: 'var(--color-espresso)',
                  marginBottom: '0.5rem'
                }}
              >
                Popular Treatments
              </h2>
              <p style={{ fontSize: '1.0625rem', color: '#5C524F', margin: 0 }}>
                Straightforward pricing, clear durations, and easy online booking.
              </p>
            </div>

            <Link
              to="/services"
              className="btn btn-secondary"
              style={{ padding: '0.75rem 1.35rem', fontSize: '0.85rem' }}
            >
              View All Treatments →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {featuredServices.map((service) => (
              <div
                key={service.id}
                style={{
                  backgroundColor: 'var(--color-ivory)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={service.image}
                    alt={service.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--color-espresso)', margin: 0 }}>
                      <Link to={`/services/${service.slug}`} style={{ color: 'inherit' }}>
                        {service.name}
                      </Link>
                    </h3>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: 'var(--color-espresso)'
                      }}
                    >
                      £{service.price}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: '#5C524F',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      flex: 1
                    }}
                  >
                    {service.duration} minutes • £{service.deposit} deposit to reserve
                  </p>

                  <div
                    style={{
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-espresso)', textDecoration: 'underline' }}
                    >
                      Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleBookService(service)}
                      className="btn btn-primary"
                      style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}
                    >
                      Book Slot
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CPD LASH ACADEMY - Flattened, Grounded, Clear Numbers */}
      <section
        style={{
          paddingTop: 'clamp(4rem, 6vw, 6rem)',
          paddingBottom: 'clamp(4rem, 6vw, 6rem)',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-espresso)',
          color: '#FFFFFF'
        }}
      >
        <div className="container" style={{ maxWidth: '1040px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4rem)',
              alignItems: 'center'
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--color-blush)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.85rem'
                }}
              >
                Accredited Education in Edinburgh
              </p>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 4vw, 2.85rem)',
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  marginBottom: '1.25rem'
                }}
              >
                3-Day Private Lash Mentorship
              </h2>

              <p
                style={{
                  fontSize: '1.0625rem',
                  lineHeight: 1.7,
                  color: '#D5CDC7',
                  marginBottom: '2rem'
                }}
              >
                Learn directly from Sandy in an intensive, one-to-one studio setting. No crowded classrooms. You will work on real live models, learn proper isolation, master custom styling formulas, and receive continuous support after graduating.
              </p>

              {/* What is included */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  marginBottom: '2.25rem',
                  fontSize: '1rem',
                  color: '#F4EFEB'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={17} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                  <span>Full professional starter kit with tools and supplies (over £150 value)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={17} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                  <span>Hands-on live model application with direct supervision</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={17} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                  <span>Lash anatomy, natural hair health, and safe removal protocols</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={17} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                  <span>Pricing strategies, client consultation forms, and marketing setup</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={17} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                  <span>Accredited CPD Certificate of Completion</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={17} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                  <span>Unlimited shadowing and direct WhatsApp mentorship access</span>
                </div>
              </div>

              {/* Clear Pricing Breakdown (No Hidden Fees) */}
              <div
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.15)',
                  borderBottom: '1px solid rgba(255,255,255,0.15)',
                  paddingTop: '1.25rem',
                  paddingBottom: '1.25rem',
                  marginBottom: '2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#D5CDC7', display: 'block', marginBottom: '0.2rem' }}>
                    Total Course Tuition
                  </span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600 }}>
                    £600
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600, display: 'block' }}>
                    £100 deposit to reserve dates
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#D5CDC7' }}>
                    Remaining £500 balance paid at the studio on Day 1
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link
                  to="/training"
                  className="btn btn-rose"
                  style={{ padding: '0.95rem 1.85rem', fontSize: '0.85rem' }}
                >
                  View Full Course Details
                </Link>
                <Link
                  to="/schedule"
                  className="btn btn-secondary"
                  style={{
                    padding: '0.95rem 1.65rem',
                    fontSize: '0.85rem',
                    color: '#FFFFFF',
                    borderColor: 'rgba(255,255,255,0.4)'
                  }}
                >
                  Reserve with £100 Deposit
                </Link>
              </div>
            </div>

            <div>
              <div
                style={{
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              >
                <img
                  src="/settings inspo img.jpg"
                  alt="Sandy Beauty Haven training room setup"
                  style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT SANDY - Honest, Grounded Studio Story */}
      <section
        style={{
          paddingTop: 'clamp(4rem, 6vw, 5.5rem)',
          paddingBottom: 'clamp(4rem, 6vw, 5.5rem)',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)'
        }}
      >
        <div className="container" style={{ maxWidth: '960px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              alignItems: 'center'
            }}
          >
            <div>
              <div
                style={{
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)'
                }}
              >
                <img
                  src="/Sandy pfp.png"
                  alt="Sandy, founder and lash artist"
                  style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                  color: 'var(--color-espresso)',
                  marginBottom: '1.25rem'
                }}
              >
                Meet Sandy
              </h2>

              <p style={{ fontSize: '1.0625rem', color: '#5C524F', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                Sandy has specialized in eyelash extensions and semi-permanent ombré powder brows for over two years in Edinburgh.
              </p>

              <p style={{ fontSize: '1.0625rem', color: '#5C524F', lineHeight: 1.7, marginBottom: '2rem' }}>
                Her approach centers strictly on natural lash preservation: selecting the proper diameter and length for your natural lash strength so you enjoy full, lightweight sets week after week with zero damage.
              </p>

              <Link to="/about" className="btn btn-secondary">
                Read Sandy's Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED CLIENT REVIEWS */}
      <section
        style={{
          paddingTop: 'clamp(4rem, 6vw, 5.5rem)',
          paddingBottom: 'clamp(4rem, 6vw, 5.5rem)',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-ivory)'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '600px', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                color: 'var(--color-espresso)',
                marginBottom: '0.5rem'
              }}
            >
              Client Reviews
            </h2>
            <p style={{ fontSize: '1.0625rem', color: '#5C524F', margin: 0 }}>
              Feedback from clients who visit our Easter Road studio.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {REVIEWS.slice(0, 3).map((r) => (
              <div
                key={r.id}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="var(--color-rose)" color="var(--color-rose)" />
                    ))}
                  </div>
                  <p
                    style={{
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      color: 'var(--color-espresso)',
                      marginBottom: '1.5rem',
                      fontStyle: 'italic'
                    }}
                  >
                    "{r.comment}"
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-espresso)' }}>
                    {r.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#5C524F', marginTop: '0.15rem' }}>
                    {r.service}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <Link to="/reviews" className="btn btn-secondary">
              Read All Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. LOCATION & BOOKING CALLOUT */}
      <section
        style={{
          paddingTop: 'clamp(4.5rem, 7vw, 6rem)',
          paddingBottom: 'clamp(4.5rem, 7vw, 6rem)',
          backgroundColor: 'var(--color-surface)',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.25rem, 4.5vw, 3rem)',
              color: 'var(--color-espresso)',
              marginBottom: '1rem'
            }}
          >
            Visit the Studio
          </h2>

          <p
            style={{
              fontSize: '1.125rem',
              color: '#5C524F',
              lineHeight: 1.7,
              marginBottom: '2.25rem'
            }}
          >
            101 Easter Road, Edinburgh. Open Monday to Saturday from 9:00 AM to 5:00 PM. Book your slot online with an instant deposit to confirm your time.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <Link
              to="/schedule"
              className="btn btn-primary"
              style={{ padding: '1rem 2.25rem', fontSize: '0.875rem' }}
            >
              <Calendar size={15} />
              Book an Appointment
            </Link>

            <Link
              to="/contact"
              className="btn btn-secondary"
              style={{ padding: '1rem 2rem', fontSize: '0.875rem' }}
            >
              Find Our Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
