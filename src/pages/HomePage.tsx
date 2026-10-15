import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Star, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/services';
import { REVIEWS } from '../data/reviews';
import { useBooking } from '../context/BookingContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedService } = useBooking();

  // Curate 4 top services
  const featuredServices = SERVICES.filter(s => s.popular).slice(0, 4);

  const handleBookService = (service: typeof SERVICES[0]) => {
    setSelectedService(service);
    navigate('/schedule');
  };

  return (
    <div>
      {/* 1. HERO SECTION - Full Viewport Screen on Mobile & Desktop */}
      <section style={{
        position: 'relative',
        minHeight: 'calc(100svh - var(--header-height))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-ivory)',
        backgroundImage: 'linear-gradient(180deg, rgba(34, 27, 26, 0.42) 0%, rgba(34, 27, 26, 0.78) 100%), url("/lashes inspo img.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        padding: 'clamp(2.5rem, 5vw, 4rem) 1.5rem'
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <span style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--color-blush)',
            display: 'inline-block',
            marginBottom: '1.25rem',
            fontWeight: 600
          }}>
            Lash & Brow Studio • Edinburgh
          </span>

          <h1 style={{
            color: 'var(--color-ivory)',
            fontSize: 'clamp(2.75rem, 7.5vw, 4.75rem)',
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            lineHeight: 1.08,
            marginBottom: '1.5rem'
          }}>
            Beauty that feels like you, only <span style={{ fontStyle: 'italic', color: 'var(--color-blush)' }}>elevated.</span>
          </h1>

          <p style={{
            color: '#EFE8E1',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '520px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Bespoke lash extensions, semi-permanent brows, and certified one-to-one training.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/schedule"
              className="btn btn-rose"
              style={{ padding: '1.1rem 2.25rem' }}
            >
              <Calendar size={15} />
              Book Appointment
            </Link>
            <Link
              to="/services"
              className="btn btn-secondary"
              style={{
                padding: '1.1rem 2rem',
                color: 'var(--color-ivory)',
                borderColor: 'var(--color-ivory)'
              }}
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE SERVICES */}
      <section className="section" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <span className="section-eyebrow">Treatment Menu</span>
            <h2 className="section-title">Signature Services</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            marginBottom: '3.5rem'
          }}>
            {featuredServices.map((service) => (
              <div key={service.id} className="editorial-card">
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={service.image}
                    alt={service.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    className="badge badge-rose"
                    style={{ position: 'absolute', top: '0.85rem', left: '0.85rem' }}
                  >
                    {service.category}
                  </span>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>
                      <Link to={`/services/${service.slug}`} style={{ color: 'inherit' }}>
                        {service.name}
                      </Link>
                    </h3>
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      color: 'var(--color-espresso)'
                    }}>
                      £{service.price}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '0.825rem',
                    color: 'var(--color-taupe)',
                    lineHeight: 1.5,
                    marginBottom: '1.25rem',
                    flex: 1
                  }}>
                    {service.duration} mins • £{service.deposit} deposit
                  </p>

                  <div style={{
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Link to={`/services/${service.slug}`} className="btn-link" style={{ fontSize: '0.8rem' }}>
                      Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleBookService(service)}
                      className="btn btn-primary"
                      style={{ padding: '0.65rem 1.25rem', fontSize: '0.75rem' }}
                    >
                      Book Slot
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/services" className="btn btn-secondary" style={{ padding: '0.95rem 2.25rem' }}>
              Explore All Treatments
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SANDY - Clean & Direct */}
      <section className="section section-warm" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            alignItems: 'center'
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
                  alt="Sandy"
                  style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div>
              <span className="section-eyebrow">The Artist</span>
              <h2 style={{ marginBottom: '1rem', fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)' }}>
                Precision lash & brow styling tailored to you.
              </h2>
              <p style={{ color: 'var(--color-taupe)', lineHeight: 1.7, marginBottom: '2rem' }}>
                With over two years of experience, Sandy crafts custom lash sets and ombré brows that enhance your natural facial contours while protecting lash health.
              </p>
              <Link to="/about" className="btn btn-secondary">
                Learn More About Sandy →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CPD LASH ACADEMY - Clean Highlight */}
      <section className="section" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{
            backgroundColor: 'var(--color-espresso)',
            color: 'var(--color-ivory)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            alignItems: 'center'
          }}>
            <div style={{ padding: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <span style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-blush)',
                display: 'block',
                marginBottom: '0.75rem',
                fontWeight: 600
              }}>
                1-on-1 Academy
              </span>

              <h2 style={{
                color: 'var(--color-ivory)',
                fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
                marginBottom: '1rem'
              }}>
                3-Day Beginner Lash Course
              </h2>

              <p style={{ color: '#D5CDC7', lineHeight: 1.6, marginBottom: '2rem', fontSize: '0.95rem' }}>
                Comprehensive private tuition covering theory, isolation, custom mapping, live models, and full starter kit (£150+ value).
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                <Link to="/training" className="btn btn-rose" style={{ padding: '0.95rem 1.75rem' }}>
                  Course Details (£600)
                </Link>
                <Link to="/schedule" style={{ color: 'var(--color-ivory)', fontSize: '0.85rem', textDecoration: 'underline' }}>
                  Reserve (£100 Deposit)
                </Link>
              </div>
            </div>

            <div style={{ height: '100%', minHeight: '300px' }}>
              <img
                src="/settings inspo img.jpg"
                alt="Sandy Beauty Haven Training Studio"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED REVIEWS */}
      <section className="section section-subtle" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            <span className="section-eyebrow">Feedback</span>
            <h2 className="section-title">Client Reviews</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)',
            marginBottom: '3rem'
          }}>
            {REVIEWS.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', color: '#B38B59', marginBottom: '1rem' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#B38B59" />
                    ))}
                  </div>
                  <p style={{
                    fontStyle: 'italic',
                    color: 'var(--color-espresso-light)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    "{rev.comment}"
                  </p>
                </div>

                <div style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>
                      {rev.name}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-taupe)' }}>
                      {rev.service}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.675rem',
                    color: 'var(--color-success)',
                    fontWeight: 600,
                    backgroundColor: 'var(--color-success-bg)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/reviews" className="btn-link">
              Read All Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CLOSING CTA */}
      <section className="section-sm" style={{
        backgroundColor: 'var(--color-surface-warm)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '560px' }}>
          <h2 style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)', marginBottom: '0.75rem' }}>
            Ready for your appointment?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-taupe)', marginBottom: '2rem' }}>
            Choose your service and pick your preferred time slot online.
          </p>
          <Link to="/schedule" className="btn btn-primary" style={{ padding: '1rem 2.25rem' }}>
            <Calendar size={15} />
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};
