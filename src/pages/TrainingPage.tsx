import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  Users,
  MessageCircle,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { useBooking } from '../context/BookingContext';

export const TrainingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedService } = useBooking();

  const trainingService = SERVICES.find((s) => s.slug === 'beginner-lash-course') || SERVICES[SERVICES.length - 3];

  const handleBookTraining = () => {
    setSelectedService(trainingService);
    navigate('/schedule');
  };

  const courseCurriculum = [
    {
      day: 'Day 1',
      title: 'Theory, Hygiene & Classic Isolation',
      topics: [
        'Lash anatomy, shedding cycles & contraindications',
        'Adhesive chemistry: humidity, temperature & retention',
        'Classic 1:1 application & isolation drills',
        'Ergonomics, posture & tweezer tension control'
      ]
    },
    {
      day: 'Day 2',
      title: 'Mapping, Infills & Removal Protocols',
      topics: [
        'Custom mapping: Cat Eye, Doll Eye & Natural Sweep',
        'Selecting curls (C, CC, D), diameters & lengths',
        'Infill protocols & gentle cream dissolver removal',
        'Speed-building drills & fan geometry'
      ]
    },
    {
      day: 'Day 3',
      title: 'Live Model Application & Business Setup',
      topics: [
        'Full set on live model with direct 1-on-1 mentorship',
        'Direction correction & inner corner refinement',
        'Studio lighting, photography & portfolio building',
        'Pricing structure, UK insurance & client acquisition'
      ]
    }
  ];

  const kitItems = [
    'Medical-Grade Fast-Drying Adhesives',
    'Hand-Calibrated Isolation & Volume Tweezers',
    'Mixed Trays of Classic & Flat Silk Lashes (8–15mm)',
    'Foaming Lash Cleanser & Prep Brushes',
    'Hydrogel Collagen Eye Pads & Sensitive Tapes',
    'Digital Hygrometer / Studio Thermometer',
    'Comprehensive 60-Page Academy Manual & Supplier Directory'
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '85vh', paddingBottom: 'clamp(4.5rem, 8vw, 7.5rem)' }}>
      {/* Editorial Hero Header */}
      <div style={{
        backgroundColor: 'var(--color-espresso)',
        color: 'var(--color-ivory)',
        paddingTop: 'clamp(3.5rem, 6vw, 5.5rem)',
        paddingBottom: 'clamp(3.5rem, 6vw, 5rem)',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'var(--color-blush)',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem'
              }}>
                <Award size={15} />
                CPD-Accredited Edinburgh Academy
              </div>

              <h1 style={{
                color: 'var(--color-ivory)',
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                lineHeight: 1.1,
                marginBottom: '1.25rem'
              }}>
                Master the Art of Lashes with 1-on-1 Mentorship.
              </h1>

              <p style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: '#D5CDC7',
                lineHeight: 1.6,
                marginBottom: '2rem',
                maxWidth: '540px'
              }}>
                Our intensive 3-Day Beginner Lash Course in Edinburgh takes you from complete novice to a confident, certified lash artist capable of taking paying clients immediately.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <button
                  type="button"
                  onClick={handleBookTraining}
                  className="btn btn-rose"
                  style={{ padding: '0.95rem 2rem' }}
                >
                  <Calendar size={16} />
                  Reserve Course (£100 Deposit)
                </button>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--color-ivory)' }}>
                    Total: £600
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-blush)' }}>
                    Includes £150+ Full Kit & Certificate
                  </span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                fontSize: '0.825rem',
                color: '#ECE5DF',
                flexWrap: 'wrap'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Users size={15} style={{ color: 'var(--color-blush)' }} />
                  Strictly 1-on-1 Private Tuition
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={15} style={{ color: 'var(--color-blush)' }} />
                  Insurable UK CPD Accreditation
                </span>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: 'var(--shadow-modal)',
                backgroundColor: '#000000'
              }}>
                <img
                  src="/Sandy pfp.png"
                  alt="Sandy - Certified Lash Educator Edinburgh"
                  style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Highlights Grid */}
      <section className="section-sm section-subtle" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-rose)'
              }}>
                <Award size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>CPD Certified</h3>
                <p style={{ fontSize: '0.85rem', margin: 0 }}>
                  Internationally recognized qualification allowing you to secure beauty therapist insurance and trade discounts.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-rose)'
              }}>
                <PackageCheck size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Pro Starter Kit</h3>
                <p style={{ fontSize: '0.85rem', margin: 0 }}>
                  A complete, professional-grade kit packed with medical adhesives, hand-calibrated tweezers, and lashes to service your first 20 clients.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-rose)'
              }}>
                <MessageCircle size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Lifetime Mentorship</h3>
                <p style={{ fontSize: '0.85rem', margin: 0 }}>
                  Direct access to Sandy via WhatsApp for ongoing technique critiques, troubleshooting, and advice long after graduation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed 3-Day Curriculum */}
      <section className="section" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div className="section-header">
            <span className="section-eyebrow">Comprehensive Syllabus</span>
            <h2 className="section-title">The 3-Day Course Breakdown</h2>
            <p className="section-description">
              Every hour is structured to build your muscle memory, confidence, and theoretical understanding without feeling rushed.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {courseCurriculum.map((day, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-rose" style={{ fontSize: '0.75rem' }}>
                    {day.day}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', margin: 0 }}>{day.title}</h3>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '0.75rem',
                  marginTop: '1.25rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--color-border-subtle)'
                }}>
                  {day.topics.map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem' }}>
                      <CheckCircle2 size={15} style={{ color: 'var(--color-rose)', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: 'var(--color-espresso-light)' }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Starter Kit Showcase */}
      <section className="section section-warm" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="section-eyebrow">Everything You Need To Start</span>
              <h2 style={{ marginBottom: '1.25rem' }}>The Luxury Pro Kit (Value £150+)</h2>
              <p className="lead" style={{ marginBottom: '1.5rem' }}>
                We do not supply cheap sample trays. You receive the exact high-performance products and tools Sandy uses daily in her Edinburgh studio.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '0.5rem',
                marginBottom: '2rem'
              }}>
                {kitItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-taupe)' }}>
                    <Sparkles size={14} style={{ color: 'var(--color-rose)' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleBookTraining}
                className="btn btn-primary"
                style={{ padding: '0.95rem 2rem' }}
              >
                Enroll Now • £100 Deposit
              </button>
            </div>

            <div>
              <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)'
              }}>
                <img
                  src="/settings inspo img.jpg"
                  alt="Sandy Beauty Haven Kit and Training Workspace"
                  style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Inquiries / FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: '780px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>Have questions about course dates or finance?</h2>
          <p style={{ color: 'var(--color-taupe)', marginBottom: '2rem' }}>
            We host one student at a time to ensure complete focus. Contact Sandy directly to coordinate upcoming flexible training dates around your work schedule.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="tel:+447733777956" className="btn btn-secondary">
              Call Sandy: +44 07733777956
            </a>
            <a href="mailto:Lashbysandy9@gmail.com" className="btn btn-subtle">
              Email Course Enquiries
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
