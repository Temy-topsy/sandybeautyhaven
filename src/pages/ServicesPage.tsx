import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Clock,
  Search,
  Calendar,
  Shield,
  BookOpen,
  X,
  Check
} from 'lucide-react';
import { SERVICES, CATEGORIES, type ServiceItem } from '../data/services';
import { useBooking } from '../context/BookingContext';

type SortOption = 'hierarchy' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc' | 'name-asc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'hierarchy', label: 'Recommended (Lashes First)' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'duration-asc', label: 'Duration: Shortest First' },
  { value: 'duration-desc', label: 'Duration: Longest First' },
  { value: 'name-asc', label: 'Name: A to Z' }
];

const CATEGORY_PRIORITY: Record<ServiceItem['category'], number> = {
  'Lash Extensions': 1,
  'Lash Infills': 2,
  'Brows': 3,
  'Hair': 4,
  'Makeup': 5,
  'Extras': 6,
  'Training': 7
};

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSelectedService } = useBooking();

  const initialCat = searchParams.get('category');
  const validInitialCat = initialCat && (CATEGORIES as readonly string[]).includes(initialCat) ? initialCat : 'All Services';

  const [selectedCategory, setSelectedCategory] = useState<string>(validInitialCat);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('hierarchy');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 40);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && (CATEGORIES as readonly string[]).includes(cat)) {
      setSelectedCategory(cat);
    } else if (!cat) {
      setSelectedCategory('All Services');
    }
  }, [searchParams]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All Services') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredServices = useMemo(() => {
    const filtered = SERVICES.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All Services' ||
        (selectedCategory === 'Lashes'
          ? service.category === 'Lash Extensions' || service.category === 'Lash Infills'
          : service.category === selectedCategory);
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'duration-asc':
          return a.duration - b.duration;
        case 'duration-desc':
          return b.duration - a.duration;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'hierarchy':
        default: {
          const prioDiff = (CATEGORY_PRIORITY[a.category] ?? 99) - (CATEGORY_PRIORITY[b.category] ?? 99);
          if (prioDiff !== 0) return prioDiff;
          return 0;
        }
      }
    });
  }, [selectedCategory, searchQuery, sortBy]);

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
            <h1 style={{ marginBottom: '1rem' }}>Services & Pricing</h1>
            <p className="lead" style={{ margin: 0, color: 'var(--color-taupe)' }}>
              Lashes, brows, and certified 1-on-1 training at 101 Easter Road, Edinburgh.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'clamp(3rem, 5vw, 4.5rem)' }}>
        {/* Minimal Sticky Bar: Active Category + Minimal Circular Filter & Search Buttons */}
        <div style={{
          position: 'sticky',
          top: 'var(--header-height)',
          zIndex: 40,
          backgroundColor: 'var(--color-ivory)',
          paddingTop: '0.75rem',
          paddingBottom: '0.85rem',
          marginBottom: '2.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          borderBottom: '1px solid rgba(232, 224, 215, 0.75)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0, flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-espresso)'
              }}>
                {selectedCategory}
              </span>
              {selectedCategory !== 'All Services' && (
                <button
                  type="button"
                  onClick={() => handleCategorySelect('All Services')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '9999px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-taupe)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <span>Clear</span>
                  <X size={11} />
                </button>
              )}
            </div>

            {/* Minimal Circular Action Buttons (Filter/Sort & Search) */}
            <div ref={sortMenuRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <button
                type="button"
                aria-label="Filter and sort services"
                aria-expanded={isSortOpen}
                onClick={() => {
                  setIsSortOpen((prev) => !prev);
                }}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '9999px',
                  border: '1px solid',
                  borderColor: selectedCategory !== 'All Services' || sortBy !== 'hierarchy' || isSortOpen ? 'var(--color-espresso)' : 'var(--color-border-subtle)',
                  backgroundColor: selectedCategory !== 'All Services' || sortBy !== 'hierarchy' || isSortOpen ? 'var(--color-espresso)' : '#EFECE8',
                  color: selectedCategory !== 'All Services' || sortBy !== 'hierarchy' || isSortOpen ? 'var(--color-ivory)' : 'var(--color-espresso)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <line x1="2.5" y1="4.5" x2="13.5" y2="4.5" />
                  <line x1="4.5" y1="8" x2="11.5" y2="8" />
                  <line x1="6.5" y1="11.5" x2="9.5" y2="11.5" />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Search services"
                aria-expanded={isSearchOpen}
                onClick={() => {
                  setIsSearchOpen((prev) => !prev);
                  setIsSortOpen(false);
                }}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '9999px',
                  border: '1px solid',
                  borderColor: isSearchOpen || searchQuery ? 'var(--color-espresso)' : 'var(--color-border-subtle)',
                  backgroundColor: isSearchOpen || searchQuery ? 'var(--color-espresso)' : '#EFECE8',
                  color: isSearchOpen || searchQuery ? 'var(--color-ivory)' : 'var(--color-espresso)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Search size={16} />
              </button>

              {/* Minimal Filter & Sort Popover Menu */}
              {isSortOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.5rem)',
                    right: 0,
                    width: '260px',
                    maxHeight: '75vh',
                    overflowY: 'auto',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-editorial)',
                    padding: '0.5rem',
                    zIndex: 60
                  }}
                >
                  <div style={{
                    padding: '0.35rem 0.6rem',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--color-taupe)'
                  }}>
                    Category
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', marginBottom: '0.5rem' }}>
                    {CATEGORIES.map((cat) => {
                      const active = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            handleCategorySelect(cat);
                            setIsSortOpen(false);
                          }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.5rem',
                            padding: '0.48rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            border: 'none',
                            backgroundColor: active ? 'var(--color-surface-subtle)' : 'transparent',
                            color: 'var(--color-espresso)',
                            fontSize: '0.82rem',
                            fontWeight: active ? 600 : 400,
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          <span>{cat}</span>
                          {active && <Check size={14} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />}
                        </button>
                      );
                    })}
                  </div>

                  <div style={{
                    borderTop: '1px solid var(--color-border-subtle)',
                    padding: '0.55rem 0.6rem 0.3rem',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--color-taupe)'
                  }}>
                    Sort Treatments
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    {SORT_OPTIONS.map((option) => {
                      const active = sortBy === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setSortBy(option.value);
                            setIsSortOpen(false);
                          }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.5rem',
                            padding: '0.48rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            border: 'none',
                            backgroundColor: active ? 'var(--color-surface-subtle)' : 'transparent',
                            color: 'var(--color-espresso)',
                            fontSize: '0.82rem',
                            fontWeight: active ? 600 : 400,
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          <span>{option.label}</span>
                          {active && <Check size={14} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Expandable Minimal Search Input */}
          {(isSearchOpen || searchQuery.length > 0) && (
            <div style={{ position: 'relative', width: '100%' }}>
              <Search
                size={15}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-taupe)'
                }}
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search services (e.g. Hybrid, Ombré, Training)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{
                  paddingLeft: '2.6rem',
                  paddingRight: '2.5rem',
                  paddingTop: '0.6rem',
                  paddingBottom: '0.6rem',
                  fontSize: '0.875rem',
                  backgroundColor: 'var(--color-surface)'
                }}
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                style={{
                  position: 'absolute',
                  right: '0.65rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-taupe)',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={15} />
              </button>
            </div>
          )}
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
                        objectPosition: service.imagePosition || 'center center',
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
                        color: '#FFFFFF',
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
                        fontWeight: 700,
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
