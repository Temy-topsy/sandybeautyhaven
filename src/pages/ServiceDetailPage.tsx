import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, ShieldCheck, Calendar, ArrowLeft } from 'lucide-react';
import { SERVICES } from '../data/services';
import { useBooking } from '../context/BookingContext';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { setSelectedService } = useBooking();

  const service = SERVICES.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <h2>Treatment Not Found</h2>
        <p style={{ marginBottom: '2rem' }}>The requested beauty service could not be found.</p>
        <Link to="/services" className="btn btn-primary">
          Back to Services Menu
        </Link>
      </div>
    );
  }

  const handleBook = () => {
    setSelectedService(service);
    navigate('/schedule');
  };

  // Related services in the same category
  const relatedServices = SERVICES.filter(
    (s) => s.category === service.category && s.id !== service.id
  ).slice(0, 3);

  return (
    <div style={{ backgroundColor: 'var(--color-ivory)', paddingBottom: '5rem' }}>
      {/* Breadcrumb & Navigation */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        padding: '1rem 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
          <Link to="/services" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-taupe)' }}>
            <ArrowLeft size={14} />
            Services
          </Link>
          <span style={{ color: 'var(--color-border)' }}>/</span>
          <span style={{ color: 'var(--color-taupe)' }}>{service.category}</span>
          <span style={{ color: 'var(--color-border)' }}>/</span>
          <span style={{ color: 'var(--color-espresso)', fontWeight: 600 }}>{service.name}</span>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(2rem, 4vw, 4rem)',
          alignItems: 'start',
          marginBottom: '4rem'
        }}>
          {/* Left Column: Image */}
          <div>
            <div style={{
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-card)',
              backgroundColor: 'var(--color-surface)'
            }}>
              <img
                src={service.image}
                alt={service.name}
                style={{
                  width: '100%',
                  maxHeight: '480px',
                  objectFit: 'cover',
                  objectPosition: service.imagePosition || 'center 20%'
                }}
              />
            </div>

            {/* Deposit & Rescheduling Callout */}
            <div style={{
              marginTop: '1.5rem',
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.25rem'
            }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-rose)' }} />
                Booking & Deposit Terms
              </h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-taupe)', margin: 0, lineHeight: 1.5 }}>
                A £{service.deposit} deposit is required to reserve your slot at 101 Easter Road. 48 hours notice is required for cancellations or rescheduling.
              </p>
            </div>
          </div>

          {/* Right Column: Details & Booking Action */}
          <div>
            <span className="badge badge-rose" style={{ marginBottom: '0.75rem' }}>
              {service.category}
            </span>
            <h1 style={{ marginBottom: '1rem', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}>
              {service.name}
            </h1>

            {/* Price & Duration Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              padding: '1rem 0',
              borderTop: '1px solid var(--color-border)',
              borderBottom: '1px solid var(--color-border)',
              marginBottom: '1.75rem'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-taupe)', display: 'block' }}>
                  Price
                </span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                  £{service.price}
                </span>
              </div>
              <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '2rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-taupe)', display: 'block' }}>
                  Duration
                </span>
                <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-espresso)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={16} style={{ color: 'var(--color-rose)' }} />
                  {service.duration} mins
                </span>
              </div>
              <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '2rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-taupe)', display: 'block' }}>
                  Deposit
                </span>
                <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-rose)' }}>
                  £{service.deposit}
                </span>
              </div>
            </div>

            {/* Authentic Description */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>About this Treatment</h3>
              <p style={{ lineHeight: 1.7, fontSize: '0.975rem', whiteSpace: 'pre-line', color: 'var(--color-espresso)' }}>
                {service.description}
              </p>
            </div>

            {/* Direct Booking CTA */}
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-subtle)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem' }}>Ready to reserve your appointment?</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-taupe)' }}>
                    101 Easter Road, Edinburgh
                  </p>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                  Deposit Due Today: £{service.deposit}
                </span>
              </div>
              <button
                type="button"
                onClick={handleBook}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.95rem 1.25rem',
                  fontSize: '0.875rem',
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'normal',
                  textAlign: 'center'
                }}
              >
                <Calendar size={16} />
                Book This Treatment
              </button>
            </div>
          </div>
        </div>

        {/* Related Treatments */}
        {relatedServices.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>Other {service.category} Treatments</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {relatedServices.map((rel) => (
                <div key={rel.id} className="editorial-card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1.05rem' }}>
                      <Link to={`/services/${rel.slug}`} style={{ color: 'inherit' }}>
                        {rel.name}
                      </Link>
                    </h4>
                    <span style={{ fontWeight: 600, color: 'var(--color-espresso)' }}>£{rel.price}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', marginBottom: '1rem' }}>
                    {rel.duration} mins • £{rel.deposit} deposit
                  </p>
                  <Link to={`/services/${rel.slug}`} className="btn-link" style={{ fontSize: '0.8rem' }}>
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
