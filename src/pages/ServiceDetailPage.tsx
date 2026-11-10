import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, ShieldCheck, Calendar, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
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
          gap: ' clamp(2rem, 4vw, 4rem)',
          alignItems: 'start',
          marginBottom: '4rem'
        }}>
          {/* Left Column: Image */}
          <div>
            <div style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-card)',
              backgroundColor: 'var(--color-surface)'
            }}>
              <img
                src={service.image}
                alt={service.name}
                style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }}
              />
            </div>

            {/* Quick Policies Callout */}
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
                A £{service.deposit} non-refundable deposit is required to secure your slot. You may reschedule without penalty up to 24 hours prior. Arrive on time; a 10-minute grace period is provided.
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

            {/* Description */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>About this Treatment</h3>
              <p style={{ lineHeight: 1.7, fontSize: '0.975rem', whiteSpace: 'pre-line' }}>
                {service.description}
              </p>
            </div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Key Highlights</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {service.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--color-rose)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct CTA */}
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-subtle)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem' }}>Ready to reserve your appointment?</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-taupe)' }}>
                    Choose your date & time slot at 101 Easter Road
                  </p>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                  Due Today: £{service.deposit}
                </span>
              </div>
              <button
                type="button"
                onClick={handleBook}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.95rem' }}
              >
                <Calendar size={16} />
                Book {service.name}
              </button>
            </div>
          </div>
        </div>

        {/* Preparation & Aftercare Protocol Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          paddingTop: '2.5rem',
          borderTop: '1px solid var(--color-border)',
          marginBottom: '4rem'
        }}>
          {/* Preparation */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={20} style={{ color: 'var(--color-rose)' }} />
              Appointment Preparation
            </h3>
            <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', color: 'var(--color-taupe)', fontSize: '0.9rem' }}>
              {service.preparation.map((step, i) => (
                <li key={i} style={{ lineHeight: 1.5 }}>{step}</li>
              ))}
            </ul>
          </div>

          {/* Aftercare */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={20} style={{ color: 'var(--color-rose)' }} />
              Recommended Aftercare
            </h3>
            <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', color: 'var(--color-taupe)', fontSize: '0.9rem' }}>
              {service.aftercare.map((step, i) => (
                <li key={i} style={{ lineHeight: 1.5 }}>{step}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Treatments */}
        {relatedServices.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Related {service.category} Treatments</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {relatedServices.map((rel) => (
                <div key={rel.id} className="editorial-card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>
                      <Link to={`/services/${rel.slug}`} style={{ color: 'inherit' }}>
                        {rel.name}
                      </Link>
                    </h4>
                    <span style={{ fontWeight: 600 }}>£{rel.price}</span>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--color-taupe)', marginBottom: '1rem' }}>
                    {rel.duration} mins • Deposit £{rel.deposit}
                  </p>
                  <Link to={`/services/${rel.slug}`} className="btn-link" style={{ fontSize: '0.8rem' }}>
                    Learn More →
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
