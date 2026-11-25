import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { REVIEWS } from '../data/reviews';

export const HomePage: React.FC = () => {
  // 6 Main Service Categories in Studio Hierarchy Order
  const serviceCategories = [
    {
      id: 'lashes',
      name: 'Lashes',
      categoryParam: 'Lashes',
      badge: 'Signature',
      image: '/appointments/hybrid-lashes-luxury.webp',
      imagePosition: 'center center',
      description: 'Classic, hybrid, volume, wispy sets and maintenance infills tailored to your eye shape.',
      count: SERVICES.filter((s) => s.category === 'Lash Extensions' || s.category === 'Lash Infills').length
    },
    {
      id: 'brows',
      name: 'Brows',
      categoryParam: 'Brows',
      badge: 'Bespoke',
      image: '/appointments/ombre-powder-brows-luxury.webp',
      imagePosition: 'center center',
      description: 'Ombré powder brows, combo brows, and precision African razor brow shaping.',
      count: SERVICES.filter((s) => s.category === 'Brows').length
    },
    {
      id: 'hair',
      name: 'Hair',
      categoryParam: 'Hair',
      badge: 'Styling',
      image: '/appointments/hair-services.webp',
      imagePosition: 'center center',
      description: 'Luxury wig installations, frontal customization, and silk-finish studio hair styling.',
      count: SERVICES.filter((s) => s.category === 'Hair').length
    },
    {
      id: 'makeup',
      name: 'Makeup',
      categoryParam: 'Makeup',
      badge: 'Glam',
      image: '/appointments/full-glam-makeup.webp',
      imagePosition: 'center center',
      description: 'Soft radiant daytime glow and full-coverage waterproof glam for special events.',
      count: SERVICES.filter((s) => s.category === 'Makeup').length
    },
    {
      id: 'extras',
      name: 'Extras',
      categoryParam: 'Extras',
      badge: 'Care & Add-Ons',
      image: '/appointments/bespoke-lashes-luxury.webp',
      imagePosition: 'center center',
      description: 'Gentle lash removals, cleansing lash baths, bottom lashes, and aftercare kits.',
      count: SERVICES.filter((s) => s.category === 'Extras').length
    },
    {
      id: 'training',
      name: 'Training',
      categoryParam: 'Training',
      badge: 'Academy',
      image: '/appointments/lash-training.webp',
      imagePosition: 'center center',
      description: 'CPD-accredited 1-on-1 beginner lash mentorship with full luxury starter kit.',
      count: SERVICES.filter((s) => s.category === 'Training').length
    }
  ];

  // 1. Honey Bee Beautiful Style Horizontal Slider
  const slides = [
    {
      id: 1,
      tag: 'Sandy Beauty Haven • Edinburgh',
      title: 'Luxury Lashes, Brows & Beauty in Edinburgh',
      description: 'Expert lash extensions, brows, makeup & beauty treatments in the heart of Edinburgh.',
      btnText: 'Book Appointment',
      btnLink: '/schedule',
      image: '/lashes inspo img.jpg'
    },
    {
      id: 2,
      tag: '1-on-1 Lash Academy',
      title: 'Master the Art of Lashes.',
      description: 'CPD accredited private mentorship with full starter kit & live model training.',
      btnText: 'View Academy Details',
      btnLink: '/training',
      image: '/settings inspo img.jpg'
    },
    {
      id: 3,
      tag: 'Health-First Isolation',
      title: 'Natural Lash Health, Zero Damage.',
      description: 'Bespoke lightweight sets tailored for long-lasting, damage-free retention.',
      btnText: 'Explore Treatments',
      btnLink: '/services',
      image: '/appointments/hybrid-lashes-luxury.webp'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-advance slider every 5s reliably
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, currentSlide, slides.length]);

  return (
    <div>
      {/* 1. HONEY BEE BEAUTIFUL STYLE HORIZONTAL SLIDING HERO CAROUSEL */}
      <section
        className="hero-slider-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current !== null) {
            const deltaX = touchStartX.current - e.changedTouches[0].clientX;
            if (deltaX > 40) handleNextSlide();
            else if (deltaX < -40) handlePrevSlide();
            touchStartX.current = null;
          }
        }}
      >
        <div
          className="hero-slider-track"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="hero-slider-slide"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(20, 15, 14, 0.48) 0%, rgba(20, 15, 14, 0.8) 100%), url("${slide.image}")`
              }}
            >
              <div className="hero-slider-content" style={{ maxWidth: '640px', margin: '0 auto', padding: '0 1rem' }}>
                <h1
                  style={{
                    color: '#FFFFFF',
                    fontSize: 'clamp(2.1rem, 5.5vw, 3.8rem)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    lineHeight: 1.12,
                    marginBottom: '0.85rem'
                  }}
                >
                  {slide.title}
                </h1>

                <p
                  style={{
                    color: '#FFFFFF',
                    fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                    lineHeight: 1.6,
                    maxWidth: '520px',
                    margin: '0 auto 1.75rem auto',
                    fontWeight: 450,
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  {slide.description}
                </p>

                <div>
                  <Link
                    to={slide.btnLink}
                    className="btn btn-rose"
                    style={{
                      padding: '0.85rem 1.85rem',
                      fontSize: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Calendar size={14} />
                    {slide.btnText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Desktop Navigation Arrows */}
        <button
          type="button"
          onClick={handlePrevSlide}
          aria-label="Previous slide"
          className="hero-slider-arrow hero-slider-arrow-prev"
          style={{
            position: 'absolute',
            left: 'clamp(0.75rem, 2.5vw, 2rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(20, 15, 14, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
            zIndex: 10
          }}
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={handleNextSlide}
          aria-label="Next slide"
          className="hero-slider-arrow hero-slider-arrow-next"
          style={{
            position: 'absolute',
            right: 'clamp(0.75rem, 2.5vw, 2rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(20, 15, 14, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
            zIndex: 10
          }}
        >
          <ChevronRight size={18} />
        </button>

        {/* Slide Counter & Dots Indicator (Uniform & Pixel-Perfect Product Design) */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            zIndex: 10,
            background: 'rgba(20, 15, 14, 0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: '#EDE5DF', fontWeight: 600 }}>
            0{currentSlide + 1} / 0{slides.length}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {slides.map((s, index) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Jump to slide ${index + 1}`}
                style={{
                  width: currentSlide === index ? '16px' : '6px',
                  height: '3px',
                  borderRadius: '1px',
                  backgroundColor: currentSlide === index ? 'var(--color-rose)' : 'rgba(255, 255, 255, 0.35)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE SERVICES (Directly after Hero - Zero Ticker, Zero Intermediary) */}
      <section className="section" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 'clamp(2rem, 4.5vw, 3.5rem)', textAlign: 'center' }}>
            <span className="section-eyebrow">Explore Our Services</span>
            <h2 className="section-title">Signature Studio Services</h2>
            <p style={{ maxWidth: '540px', margin: '0.65rem auto 0', color: 'var(--color-taupe)', fontSize: '0.925rem' }}>
              Bespoke lash sets and precision brow enhancements by Sandy. Select a treatment below to view details and book.
            </p>
          </div>

          {/* Mobile 2-Column Side-by-Side Visual Grid (Honey Bee Beautiful Style: Minimal Category Tiles) */}
          <div className="mobile-services-grid">
            {serviceCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/services?category=${encodeURIComponent(cat.categoryParam)}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  color: 'inherit',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border-subtle)',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div style={{ aspectRatio: '1/1', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: cat.imagePosition || 'center center'
                    }}
                  />
                </div>
                <div style={{ padding: '0.75rem 0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-espresso)', lineHeight: 1.25 }}>
                    {cat.name}
                  </span>
                  <span style={{ color: 'var(--color-rose)', fontSize: '0.95rem', flexShrink: 0 }}>→</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop Full Editorial Category Cards (3 columns x 2 rows) */}
          <div
            className="desktop-services-grid"
            style={{
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              marginBottom: '3rem'
            }}
          >
            {serviceCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/services?category=${encodeURIComponent(cat.categoryParam)}`}
                className="editorial-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: cat.imagePosition || 'center center'
                    }}
                  />
                  <span
                    className="badge badge-rose"
                    style={{ position: 'absolute', top: '0.85rem', left: '0.85rem' }}
                  >
                    {cat.badge}
                  </span>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.35rem', margin: 0, color: 'var(--color-espresso)' }}>
                      {cat.name}
                    </h3>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--color-rose)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em'
                      }}
                    >
                      {cat.count} {cat.count === 1 ? 'Option' : 'Options'}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-taupe)',
                      lineHeight: 1.55,
                      marginBottom: '1.25rem',
                      flex: 1
                    }}
                  >
                    {cat.description}
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
                    <span className="btn-link" style={{ fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      Explore {cat.name} <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/services" className="btn btn-secondary" style={{ padding: '0.95rem 2.25rem' }}>
              Explore Our Services
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CPD LASH ACADEMY SPOTLIGHT */}
      <section className="section" style={{ backgroundColor: 'var(--color-surface-subtle)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="container" style={{ maxWidth: '1060px' }}>
          <div
            style={{
              backgroundColor: 'var(--color-noir)',
              color: 'var(--color-noir-text)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center',
              border: '1px solid var(--color-noir-border)',
              boxShadow: 'var(--shadow-modal)'
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
                  color: 'var(--color-noir-text)',
                  fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
                  marginBottom: '1rem',
                  lineHeight: 1.15
                }}
              >
                3-Day Classic & Hybrid Lash Mentorship
              </h2>

              {/* Value Checklist */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.65rem',
                  marginBottom: '2rem',
                  fontSize: '0.8rem',
                  color: 'var(--color-noir-text)'
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
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-noir-text)' }}>
                    £600
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-noir-muted)', display: 'block' }}>
                    Reserve with <strong>£100 deposit</strong>
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
                  style={{ padding: '0.85rem 1.5rem', fontSize: '0.8rem', color: 'var(--color-noir-text)', borderColor: 'rgba(255,255,255,0.4)' }}
                >
                  Reserve Date (£100)
                </Link>
              </div>
            </div>

            <div style={{ height: '100%', minHeight: '380px' }}>
              <img
                src="/settings inspo img.jpg"
                alt="Sandy Beauty Haven Training Studio"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT SANDY */}
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
                  backgroundColor: 'var(--color-surface)',
                  aspectRatio: '3/4',
                  maxHeight: '460px'
                }}
              >
                <img
                  src="/Sandy pfp.webp"
                  alt="Sandy - Founder & Specialist at Sandy Beauty Haven Edinburgh"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 4%' }}
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

      {/* 5. VERIFIED REVIEWS */}
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
                  backgroundColor: 'var(--color-surface)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-subtle)',
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
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-espresso)' }}>{r.name}</div>
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

      {/* 6. STUDIO LOCATION & FINAL BOOKING CTA */}
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
