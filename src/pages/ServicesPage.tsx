import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Search,
  Calendar,
  Shield,
  BookOpen
} from 'lucide-react';
import { SERVICES, CATEGORIES, type ServiceItem } from '../data/services';
import { useBooking } from '../context/BookingContext';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedService } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Services');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
    navigate('/schedule');
  };

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
              const targetDetailUrl = isTraining ? '/training' : `/services/${service.slug}`;

              return (
                <div key={service.id} className="editorial-card">
                  {/* Card Image */}
                  <Link
                    to={targetDetailUrl}
                    style={{
                      height: '240px',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'block'
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
                  </Link>

                  {/* Card Body */}
                  <div style={{ padding: 'clamp(1.5rem, 3vw, 2rem)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.3rem', margin: 0 }}>
                        <Link to={targetDetailUrl} style={{ color: 'inherit' }}>
                          {service.name}
                        </Link>
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
                          <Link
                            to="/training"
                            className="btn-link"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              fontWeight: 600,
                              color: 'var(--color-rose)'
                            }}
                          >
                            <BookOpen size={14} />
                            Course Details
                          </Link>
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
    </div>
  );
};
