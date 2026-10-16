import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Search,
  Calendar,
  Shield,
  Award,
  CheckCircle2,
  Sparkles,
  Users,
  MessageCircle,
  PackageCheck,
  X,
  BookOpen,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { SERVICES, CATEGORIES, type ServiceItem } from '../data/services';
import { useBooking } from '../context/BookingContext';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedService } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Services');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [trainingDetailsOpen, setTrainingDetailsOpen] = useState<boolean>(false);

  // Lock body scroll when the full details modal is open
  useEffect(() => {
    if (trainingDetailsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [trainingDetailsOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTrainingDetailsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All Services' || service.category === selectedCategory;
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleBook = (service: ServiceItem) => {
    setSelectedService(service);
    setTrainingDetailsOpen(false);
    navigate('/schedule');
  };

  const trainingService = SERVICES.find(
    (s) => s.category === 'Training' || s.slug === 'beginner-lash-course'
  ) || SERVICES[SERVICES.length - 1];

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
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '85vh', paddingBottom: '7rem' }}>
      {/* Page Header */}
      <div style={{
        backgroundColor: 'var(--color-surface-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
        paddingTop: 'clamp(3.5rem, 6vw, 5.5rem)',
        paddingBottom: 'clamp(2.5rem, 5vw, 4rem)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '600px' }}>
            <span className="section-eyebrow">Treatment Menu</span>
            <h1 style={{ marginBottom: '1rem' }}>Services & Pricing</h1>
            <p className="lead" style={{ margin: 0, color: 'var(--color-taupe)' }}>
              Lashes, brows, and certified 1-on-1 training at 101 Easter Road, Edinburgh.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'clamp(3rem, 5vw, 4.5rem)' }}>
        {/* Filter and Search Bar */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
          marginBottom: '3.5rem'
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative', maxWidth: '440px' }}>
            <Search
              size={17}
              style={{
                position: 'absolute',
                left: '1.15rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-taupe)'
              }}
            />
            <input
              type="text"
              placeholder="Search services (e.g. Hybrid, Ombré, Training)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '3rem',
                backgroundColor: 'var(--color-surface)'
              }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.65rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'none'
          }}>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.65rem 1.35rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--color-espresso)' : 'var(--color-border)',
                    backgroundColor: isSelected ? 'var(--color-espresso)' : 'var(--color-surface)',
                    color: isSelected ? 'var(--color-ivory)' : 'var(--color-espresso)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          fontSize: '0.85rem',
          color: 'var(--color-taupe)'
        }}>
          <span>{filteredServices.length} {filteredServices.length === 1 ? 'treatment' : 'treatments'}</span>
          <span style={{ fontSize: '0.8rem' }}>
            Non-refundable deposit secures booking
          </span>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-md)'
          }}>
            <p style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>
              No treatments found matching "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => { setSelectedCategory('All Services'); setSearchQuery(''); }}
              className="btn btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)'
          }}>
            {filteredServices.map((service) => {
              const isTraining = service.category === 'Training' || service.slug.includes('lash-course');

              return (
                <div key={service.id} className="editorial-card">
                  {/* Card Image */}
                  <div
                    style={{
                      height: '240px',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: isTraining ? 'pointer' : 'default'
                    }}
                    onClick={() => {
                      if (isTraining) setTrainingDetailsOpen(true);
                    }}
                  >
                    <img
                      src={service.image}
                      alt={service.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                    />
                    <span
                      className="badge badge-rose"
                      style={{ position: 'absolute', top: '1rem', left: '1rem' }}
                    >
                      {isTraining ? 'Academy Training' : service.category}
                    </span>
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        backgroundColor: 'rgba(34, 27, 26, 0.85)',
                        color: 'var(--color-ivory)',
                        padding: '0.3rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Clock size={12} />
                      {isTraining ? '3 Days (18h)' : `${service.duration} mins`}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: 'clamp(1.5rem, 3vw, 2rem)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.3rem', margin: 0 }}>
                        {isTraining ? (
                          <button
                            type="button"
                            onClick={() => setTrainingDetailsOpen(true)}
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              fontFamily: 'inherit',
                              fontSize: 'inherit',
                              fontWeight: 'inherit',
                              color: 'inherit',
                              textAlign: 'left',
                              cursor: 'pointer'
                            }}
                          >
                            {service.name}
                          </button>
                        ) : (
                          <Link to={`/services/${service.slug}`} style={{ color: 'inherit' }}>
                            {service.name}
                          </Link>
                        )}
                      </h3>
                      <span style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: 'var(--color-espresso)'
                      }}>
                        £{service.price}
                      </span>
                    </div>

                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-taupe)',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      flex: 1
                    }}>
                      {isTraining
                        ? '1-on-1 private tuition with Sandy in Edinburgh. Master theory, classic isolation, live model sets & business launch.'
                        : (service.features[0] || (service.description ? service.description.slice(0, 95) + '...' : ''))}
                    </p>

                    <div style={{
                      fontSize: '0.775rem',
                      color: 'var(--color-taupe)',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}>
                      <Shield size={13} style={{ color: 'var(--color-rose)' }} />
                      <span>Deposit: £{service.deposit} {isTraining ? '(reserves training dates)' : ''}</span>
                    </div>

                    <div style={{
                      paddingTop: '1.25rem',
                      borderTop: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem'
                    }}>
                      {isTraining ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setTrainingDetailsOpen(true)}
                            className="btn-link"
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              fontWeight: 600,
                              color: 'var(--color-rose)'
                            }}
                          >
                            <BookOpen size={14} />
                            Course Details
                          </button>
                          <button
                            type="button"
                            onClick={() => handleBook(service)}
                            className="btn btn-primary"
                            style={{ padding: '0.75rem 1.4rem', fontSize: '0.75rem' }}
                          >
                            <Calendar size={13} />
                            Book Course
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to={`/services/${service.slug}`}
                            className="btn-link"
                          >
                            Details
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleBook(service)}
                            className="btn btn-primary"
                            style={{ padding: '0.75rem 1.4rem', fontSize: '0.75rem' }}
                          >
                            <Calendar size={13} />
                            Book
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FULL TRAINING DETAILS MODAL (Opens when tapped, matching the Lash Training Page) */}
      {trainingDetailsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Lash Training Course Details"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(34, 27, 26, 0.72)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1rem, 3vw, 2.5rem)',
            overflowY: 'auto'
          }}
          onClick={() => setTrainingDetailsOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--color-ivory)',
              borderRadius: 'var(--radius-md)',
              maxWidth: '920px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-modal)',
              border: '1px solid var(--color-border)',
              position: 'relative',
              animation: 'fadeIn 0.25s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              backgroundColor: 'rgba(250, 247, 242, 0.96)',
              backdropFilter: 'blur(8px)',
              padding: '1rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--color-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-rose" style={{ fontSize: '0.725rem' }}>
                  <Award size={13} style={{ marginRight: '0.25rem' }} />
                  CPD-Accredited Academy
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-taupe)' }}>
                  Edinburgh Studio • 1-on-1 Mentorship
                </span>
              </div>
              <button
                type="button"
                onClick={() => setTrainingDetailsOpen(false)}
                aria-label="Close training details"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.4rem',
                  cursor: 'pointer',
                  color: 'var(--color-espresso)',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '50%'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Hero Section */}
            <div style={{
              backgroundColor: 'var(--color-espresso)',
              color: 'var(--color-ivory)',
              padding: 'clamp(2rem, 4vw, 3rem)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2.5rem',
                alignItems: 'center'
              }}>
                <div>
                  <h2 style={{
                    color: 'var(--color-ivory)',
                    fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                    lineHeight: 1.15,
                    marginBottom: '1rem'
                  }}>
                    Master the Art of Lashes with 1-on-1 Mentorship.
                  </h2>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#D5CDC7',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    Our intensive 3-Day Beginner Lash Course in Edinburgh takes you from complete novice to a confident, certified lash artist capable of taking paying clients immediately.
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    flexWrap: 'wrap',
                    marginBottom: '1.5rem'
                  }}>
                    <button
                      type="button"
                      onClick={() => handleBook(trainingService)}
                      className="btn btn-rose"
                      style={{ padding: '0.85rem 1.75rem', fontSize: '0.85rem' }}
                    >
                      <Calendar size={15} />
                      Reserve Course (£100 Deposit)
                    </button>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--color-ivory)' }}>
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
                    gap: '1.25rem',
                    fontSize: '0.785rem',
                    color: '#ECE5DF',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Users size={14} style={{ color: 'var(--color-blush)' }} />
                      Strictly 1-on-1 Private Tuition
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Shield size={14} style={{ color: 'var(--color-blush)' }} />
                      Insurable UK CPD Accreditation
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.15)',
                    maxWidth: '320px',
                    margin: '0 auto',
                    boxShadow: 'var(--shadow-card)'
                  }}>
                    <img
                      src="/Sandy pfp.png"
                      alt="Sandy - Certified Lash Educator Edinburgh"
                      style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Pillars */}
            <div style={{
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              backgroundColor: 'var(--color-surface-subtle)',
              borderBottom: '1px solid var(--color-border)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem'
              }}>
                <div style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <div style={{ color: 'var(--color-rose)', marginBottom: '0.5rem' }}>
                    <Award size={20} />
                  </div>
                  <h4 style={{ fontSize: '1rem', margin: '0 0 0.35rem 0' }}>CPD Certified</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', margin: 0, lineHeight: 1.5 }}>
                    Internationally recognized qualification allowing you to secure beauty therapist insurance and trade discounts.
                  </p>
                </div>

                <div style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <div style={{ color: 'var(--color-rose)', marginBottom: '0.5rem' }}>
                    <PackageCheck size={20} />
                  </div>
                  <h4 style={{ fontSize: '1rem', margin: '0 0 0.35rem 0' }}>Pro Starter Kit</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', margin: 0, lineHeight: 1.5 }}>
                    Packed with medical adhesives, hand-calibrated tweezers, and lashes to service your first 20 clients.
                  </p>
                </div>

                <div style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <div style={{ color: 'var(--color-rose)', marginBottom: '0.5rem' }}>
                    <MessageCircle size={20} />
                  </div>
                  <h4 style={{ fontSize: '1rem', margin: '0 0 0.35rem 0' }}>Lifetime Mentorship</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', margin: 0, lineHeight: 1.5 }}>
                    Direct WhatsApp access to Sandy for ongoing technique critiques, troubleshooting, and advice.
                  </p>
                </div>
              </div>
            </div>

            {/* 3-Day Course Breakdown */}
            <div style={{ padding: 'clamp(1.75rem, 4vw, 2.75rem)', borderBottom: '1px solid var(--color-border)' }}>
              <span className="section-eyebrow" style={{ display: 'block', marginBottom: '0.4rem' }}>
                Comprehensive Syllabus
              </span>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                The 3-Day Course Breakdown
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {courseCurriculum.map((day, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1.25rem 1.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-rose" style={{ fontSize: '0.725rem' }}>
                        {day.day}
                      </span>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--color-espresso)' }}>
                        {day.title}
                      </strong>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '0.5rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid var(--color-border-subtle)'
                    }}>
                      {day.topics.map((topic, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.8rem' }}>
                          <CheckCircle2 size={14} style={{ color: 'var(--color-rose)', flexShrink: 0, marginTop: '2px' }} />
                          <span style={{ color: 'var(--color-espresso)' }}>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Starter Kit Showcase */}
            <div style={{
              padding: 'clamp(1.75rem, 4vw, 2.75rem)',
              backgroundColor: 'var(--color-surface-warm)',
              borderBottom: '1px solid var(--color-border)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                alignItems: 'center'
              }}>
                <div>
                  <span className="section-eyebrow" style={{ display: 'block', marginBottom: '0.4rem' }}>
                    Everything You Need To Start
                  </span>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
                    The Luxury Pro Kit (Value £150+)
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    We do not supply cheap sample trays. You receive the exact high-performance products and tools Sandy uses daily in her Edinburgh studio.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
                    {kitItems.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-espresso)' }}>
                        <Sparkles size={13} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-subtle)'
                  }}>
                    <img
                      src="/settings inspo img.jpg"
                      alt="Sandy Beauty Haven Kit and Training Workspace"
                      style={{ width: '100%', maxHeight: '320px', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiries & Direct Contacts */}
            <div style={{ padding: 'clamp(1.5rem, 3vw, 2.25rem)', textAlign: 'center', backgroundColor: 'var(--color-surface)' }}>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                Questions about course dates or finance?
              </h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-taupe)', maxWidth: '580px', margin: '0 auto 1.25rem auto' }}>
                We host one student at a time to ensure complete focus. Contact Sandy directly to coordinate upcoming flexible training dates around your work schedule.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href="tel:+447733777956"
                  className="btn btn-secondary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}
                >
                  <Phone size={13} />
                  Call: +44 07733777956
                </a>
                <a
                  href="mailto:Lashbysandy9@gmail.com"
                  className="btn btn-subtle"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}
                >
                  <Mail size={13} />
                  Email Sandy
                </a>
                <Link
                  to="/training"
                  className="btn btn-subtle"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}
                  onClick={() => setTrainingDetailsOpen(false)}
                >
                  <ExternalLink size={13} />
                  Full Training Page
                </Link>
              </div>
            </div>

            {/* Modal Bottom Fixed Actions */}
            <div style={{
              position: 'sticky',
              bottom: 0,
              zIndex: 10,
              backgroundColor: 'rgba(250, 247, 242, 0.96)',
              backdropFilter: 'blur(8px)',
              padding: '1rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--color-border)',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <button
                type="button"
                onClick={() => setTrainingDetailsOpen(false)}
                className="btn btn-secondary"
                style={{ padding: '0.75rem 1.4rem', fontSize: '0.8rem' }}
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => handleBook(trainingService)}
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.75rem', fontSize: '0.825rem' }}
              >
                <Calendar size={14} />
                Enroll Now • £100 Deposit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
