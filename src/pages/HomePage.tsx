import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BookOpen
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

  // 1. Cinematic Auto-Moving Hero Slideshow
  const slides = [
    {
      id: 1,
      tag: 'Bespoke Lash & Brow Atelier • Edinburgh',
      title: 'Beauty that feels like you, only',
      titleItalic: 'elevated.',
      description:
        'Precision Russian volume, wispy hybrids, and ombré powder brows crafted to enhance your natural facial contours.',
      primaryBtn: { text: 'Book Appointment', link: '/schedule', icon: Calendar },
      secondaryBtn: { text: 'View Treatment Menu', link: '/services' },
      image: '/lashes inspo img.jpg'
    },
    {
      id: 2,
      tag: 'CPD Accredited Private Mentorship • Edinburgh',
      title: 'Launch your lash career with',
      titleItalic: 'master guidance.',
      description:
        'Comprehensive 3-day private intensive: theory, live model supervision, full starter kit (£150+ value), and lifetime business support.',
      primaryBtn: { text: 'Course Details (£600)', link: '/training', icon: BookOpen },
      secondaryBtn: { text: 'Reserve (£100 Deposit)', link: '/schedule' },
      image: '/settings inspo img.jpg'
    },
    {
      id: 3,
      tag: '101 Easter Road • Edinburgh Studio',
      title: 'Flawless retention with',
      titleItalic: 'zero natural lash damage.',
      description:
        'Specialized isolation technique that protects natural lash health while delivering full, long-lasting lightweight beauty.',
      primaryBtn: { text: 'Explore Client Gallery', link: '/gallery' },
      secondaryBtn: { text: 'Read 5-Star Reviews', link: '/reviews' },
      image: '/appointments/hybrid-lashes.jpg'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoSlideInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPaused) {
      autoSlideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5500);
    }
    return () => {
      if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
    };
  }, [isPaused, slides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlide = slides[currentSlide];

  // Marquee announcement ticker items
  const tickerItems = [
    'CPD Accredited 1-on-1 Lash Academy',
    '101 Easter Road, Edinburgh',
    'Bespoke Handcrafted Extensions',
    '48-Hour Cancellation Guarantee',
    'Health-First Isolation Technique',
    'Mon–Sat Appointments Open',
    'Private One-to-One Mentorship',
    '5-Star Verified Client Reviews'
  ];

  return (
    <div>
      {/* 1. CINEMATIC AUTO-MOVING HERO */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        style={{
          position: 'relative',
          minHeight: 'calc(100svh - var(--header-height))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-ivory)',
          backgroundImage: `linear-gradient(180deg, rgba(34, 27, 26, 0.44) 0%, rgba(34, 27, 26, 0.82) 100%), url("${activeSlide.image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          padding: 'clamp(2.5rem, 5vw, 4rem) 1.5rem',
          transition: 'background-image 0.85s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <span
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--color-blush)',
              display: 'inline-block',
              marginBottom: '1.25rem',
              fontWeight: 600,
              animation: 'fadeIn 0.4s ease'
            }}
          >
            {activeSlide.tag}
          </span>

          <h1
            key={`title-${currentSlide}`}
            style={{
              color: 'var(--color-ivory)',
              fontSize: 'clamp(2.75rem, 7.5vw, 4.75rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              lineHeight: 1.08,
              marginBottom: '1.5rem',
              animation: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {activeSlide.title}{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-blush)' }}>
              {activeSlide.titleItalic}
            </span>
          </h1>

          <p
            key={`desc-${currentSlide}`}
            style={{
              color: '#EFE8E1',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              maxWidth: '540px',
              marginLeft: 'auto',
              marginRight: 'auto',
              animation: 'fadeIn 0.6s ease'
            }}
          >
            {activeSlide.description}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <Link
              to={activeSlide.primaryBtn.link}
              className="btn btn-rose"
              style={{ padding: '1.1rem 2.25rem' }}
            >
              {activeSlide.primaryBtn.icon && <activeSlide.primaryBtn.icon size={15} />}
              {activeSlide.primaryBtn.text}
            </Link>
            <Link
              to={activeSlide.secondaryBtn.link}
              className="btn btn-secondary"
              style={{
                padding: '1.1rem 2rem',
                color: 'var(--color-ivory)',
                borderColor: 'var(--color-ivory)'
              }}
            >
              {activeSlide.secondaryBtn.text}
            </Link>
          </div>
        </div>

        {/* Carousel Desktop Navigation Arrows */}
        <button
          type="button"
          onClick={handlePrevSlide}
          aria-label="Previous slide"
          style={{
            position: 'absolute',
            left: 'clamp(1rem, 3vw, 2.5rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(34, 27, 26, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            backdropFilter: 'blur(4px)',
            zIndex: 10
          }}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={handleNextSlide}
          aria-label="Next slide"
          style={{
            position: 'absolute',
            right: 'clamp(1rem, 3vw, 2.5rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(34, 27, 26, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            backdropFilter: 'blur(4px)',
            zIndex: 10
          }}
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Progress Indicator Bars */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.75rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            zIndex: 10
          }}
        >
          {slides.map((s, index) => {
            const isActive = currentSlide === index;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Jump to slide ${index + 1}`}
                style={{
                  width: isActive ? '36px' : '16px',
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: isActive ? 'var(--color-rose)' : 'rgba(255, 255, 255, 0.35)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all var(--transition-smooth)'
                }}
              />
            );
          })}
        </div>
      </section>

      {/* 2. INFINITE LUXURY AUTO-TICKER (CLEAN REFINED TYPOGRAPHY) */}
      <div
        className="marquee-container"
        style={{
          backgroundColor: 'var(--color-espresso)',
          color: 'var(--color-ivory)',
          padding: '0.85rem 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="marquee-track">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.75rem',
                padding: '0 1.75rem',
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#E0D8D3'
              }}
            >
              <span>{item}</span>
              <span style={{ color: 'var(--color-rose)', fontSize: '0.9rem', lineHeight: 1 }}>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. THE 3-PORTAL JOURNEY GATEWAY */}
      <section className="section" style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center' }}>
            <span className="section-eyebrow">Choose Your Journey</span>
            <h2 className="section-title">Three Pillars of Beauty & Mentorship</h2>
            <p style={{ maxWidth: '600px', margin: '0.75rem auto 0', color: 'var(--color-taupe)', fontSize: '0.95rem' }}>
              Whether arriving for bespoke salon enhancements, advancing your career in our private academy, or exploring client transformations.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2.5rem)'
            }}
          >
            {/* Portal 1: Salon Appointments */}
            <div
              className="editorial-card interactive-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                backgroundColor: 'var(--color-ivory)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/lashes inspo img.jpg"
                  alt="Bespoke Lash Treatments"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
                <span
                  className="badge badge-rose"
                  style={{ position: 'absolute', top: '1rem', left: '1rem' }}
                >
                  01. In-Studio Appointments
                </span>
              </div>
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.65rem' }}>
                  Bespoke Lashes & Brows
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                  Custom hybrid sets, Russian volume, express weekend lashes, and semi-permanent ombré powder brows. Tailored specifically to your eye shape.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link
                    to="/schedule"
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 1.35rem', fontSize: '0.785rem', flex: 1, textAlign: 'center' }}
                  >
                    <Calendar size={14} />
                    Book Slot
                  </Link>
                  <Link
                    to="/services"
                    className="btn btn-secondary"
                    style={{ padding: '0.75rem 1.15rem', fontSize: '0.785rem' }}
                  >
                    View Menu →
                  </Link>
                </div>
              </div>
            </div>

            {/* Portal 2: 1-on-1 CPD Academy */}
            <div
              className="editorial-card interactive-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                backgroundColor: 'var(--color-ivory)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/settings inspo img.jpg"
                  alt="Lash Academy Training"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
                <span
                  className="badge"
                  style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: 'var(--color-espresso)', color: '#FFFFFF' }}
                >
                  02. Private Mentorship
                </span>
              </div>
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.65rem' }}>
                  Accredited Lash Academy
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                  Comprehensive 3-day private intensive with Sandy. Theory, live models, full professional kit (£150+ value), and lifetime mentorship.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link
                    to="/training"
                    className="btn btn-rose"
                    style={{ padding: '0.75rem 1.35rem', fontSize: '0.785rem', flex: 1, textAlign: 'center' }}
                  >
                    <BookOpen size={14} />
                    Course Details
                  </Link>
                  <Link
                    to="/schedule"
                    className="btn btn-secondary"
                    style={{ padding: '0.75rem 1.15rem', fontSize: '0.785rem' }}
                  >
                    £100 Deposit
                  </Link>
                </div>
              </div>
            </div>

            {/* Portal 3: Studio & Transformations */}
            <div
              className="editorial-card interactive-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                backgroundColor: 'var(--color-ivory)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/client-results.jpg"
                  alt="Client Transformations"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
                <span
                  className="badge badge-rose"
                  style={{ position: 'absolute', top: '1rem', left: '1rem' }}
                >
                  03. Real Results
                </span>
              </div>
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.65rem' }}>
                  Portfolio & Client Stories
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                  Explore our verified gallery of healed ombré brow results, 4-week lash retention, and 5-star testimonials from Edinburgh clients.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link
                    to="/gallery"
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 1.35rem', fontSize: '0.785rem', flex: 1, textAlign: 'center' }}
                  >
                    View Gallery
                  </Link>
                  <Link
                    to="/reviews"
                    className="btn btn-secondary"
                    style={{ padding: '0.75rem 1.15rem', fontSize: '0.785rem' }}
                  >
                    Reviews →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE SERVICES */}
      <section className="section" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <span className="section-eyebrow">Treatment Menu</span>
            <h2 className="section-title">Signature Studio Services</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              marginBottom: '3.5rem'
            }}
          >
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
                      fontSize: '0.825rem',
                      color: 'var(--color-taupe)',
                      lineHeight: 1.5,
                      marginBottom: '1.25rem',
                      flex: 1
                    }}
                  >
                    {service.duration} mins • £{service.deposit} deposit
                  </p>

                  <div
                    style={{
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
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
              Explore Full Treatment Menu
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CPD LASH ACADEMY - ELEVATED WITH HONEY BEE BEAUTIFUL HIGH-VALUE CLARITY */}
      <section className="section" style={{ backgroundColor: 'var(--color-surface-subtle)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="container" style={{ maxWidth: '1060px' }}>
          <div
            style={{
              backgroundColor: 'var(--color-espresso)',
              color: 'var(--color-ivory)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center'
            }}
          >
            <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="badge badge-rose" style={{ fontSize: '0.7rem' }}>
                  1-on-1 Private Tuition
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-blush)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  CPD Accredited
                </span>
              </div>

              <h2
                style={{
                  color: 'var(--color-ivory)',
                  fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
                  marginBottom: '1rem',
                  lineHeight: 1.15
                }}
              >
                3-Day Classic & Hybrid Lash Mentorship
              </h2>

              <p style={{ color: '#D5CDC7', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.925rem' }}>
                Designed for ambitious beginners ready to step into a profitable lash career with accredited certification, high-touch 1-on-1 supervision, and zero guesswork.
              </p>

              {/* Value Checklist */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.65rem',
                  marginBottom: '2rem',
                  fontSize: '0.8rem',
                  color: '#EFE8E1'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                  <span>Full Starter Kit (£150+ value)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                  <span>Live Model Practical Day</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                  <span>Lash Theory & Safe Removal</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                  <span>Pricing & Instagram Growth</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                  <span>Accredited CPD Certificate</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                  <span>Lifetime Shadowing Access</span>
                </div>
              </div>

              {/* Pricing & Deposit Split */}
              <div
                style={{
                  padding: '1rem 1.25rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '1.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-blush)', display: 'block' }}>
                    Course Tuition
                  </span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600 }}>
                    £600
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: '#D5CDC7', display: 'block' }}>
                    Reserve with <strong>£100 deposit</strong>
                  </span>
                  <span style={{ fontSize: '0.675rem', color: 'var(--color-blush)' }}>
                    Remaining £500 balance due in studio on Day 1
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                <Link to="/training" className="btn btn-rose" style={{ padding: '0.85rem 1.75rem', fontSize: '0.8rem' }}>
                  Full Course Details →
                </Link>
                <Link
                  to="/schedule"
                  className="btn btn-secondary"
                  style={{ padding: '0.85rem 1.5rem', fontSize: '0.8rem', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)' }}
                >
                  Reserve Date (£100)
                </Link>
              </div>
            </div>

            <div style={{ height: '100%', minHeight: '380px' }}>
              <img
                src="/settings inspo img.jpg"
                alt="Sandy Beauty Haven Training Studio"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT SANDY */}
      <section className="section section-warm" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
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
                  border: '1px solid var(--color-border-subtle)',
                  boxShadow: 'var(--shadow-card)',
                  backgroundColor: '#FFFFFF'
                }}
              >
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

      {/* 7. VERIFIED REVIEWS */}
      <section className="section section-subtle" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            <span className="section-eyebrow">Feedback</span>
            <h2 className="section-title">Client Reviews</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(1.25rem, 3vw, 2rem)'
            }}
          >
            {REVIEWS.slice(0, 3).map((r) => (
              <div
                key={r.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '2rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="var(--color-rose)" color="var(--color-rose)" />
                    ))}
                  </div>
                  <p style={{ fontStyle: 'italic', color: 'var(--color-espresso-light)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.925rem' }}>
                    "{r.comment}"
                  </p>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.name}</div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--color-taupe)' }}>{r.service}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/reviews" className="btn btn-secondary" style={{ padding: '0.85rem 1.75rem' }}>
              Read All Verified Reviews
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. STUDIO LOCATION & FINAL BOOKING CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <span className="section-eyebrow">Visit The Haven</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
            Ready to elevate your everyday look?
          </h2>
          <p style={{ color: 'var(--color-taupe)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Located at 101 Easter Road, Edinburgh. Appointments book quickly — reserve your preferred slot with an instant online deposit.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/schedule" className="btn btn-primary" style={{ padding: '1rem 2.25rem' }}>
              <Calendar size={15} />
              Book Your Appointment
            </Link>
            <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
              Find Our Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
