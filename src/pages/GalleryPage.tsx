import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, X, Calendar } from 'lucide-react';
import { GALLERY_ITEMS, type GalleryItem } from '../data/gallery';

export const GalleryPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filterOptions = ['All', 'Lashes', 'Brows', 'Studio'];

  const filteredItems = selectedFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedFilter);

  return (
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '85vh', paddingBottom: '6rem' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--color-surface-subtle)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: 'clamp(3rem, 5vw, 4.5rem)',
        paddingBottom: 'clamp(2.5rem, 4vw, 3.5rem)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <span className="section-eyebrow">Visual Portfolio</span>
            <h1 style={{ marginBottom: '1rem' }}>Authentic Work & Studio</h1>
            <p className="lead" style={{ margin: 0 }}>
              Unedited artistry from our salon chair at 101 Easter Road, Edinburgh. Real clients, real lash mapping, and semi-permanent brow results.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Category Filters */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2.5rem',
          flexWrap: 'wrap'
        }}>
          {filterOptions.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--color-espresso)' : 'var(--color-border)',
                  backgroundColor: isSelected ? 'var(--color-espresso)' : 'var(--color-surface)',
                  color: isSelected ? 'var(--color-ivory)' : 'var(--color-espresso)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="editorial-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveItem(item)}
            >
              <div style={{ height: '340px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform var(--transition-slow)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <span
                  className="badge badge-rose"
                  style={{ position: 'absolute', top: '1rem', left: '1rem' }}
                >
                  {item.category}
                </span>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(36, 29, 28, 0.35)',
                  opacity: 0,
                  transition: 'opacity var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                >
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: 'var(--color-espresso)',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>
                    <Eye size={15} />
                    View Close-Up
                  </span>
                </div>
              </div>

              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--color-taupe)', margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Booking Prompt */}
        <div style={{
          marginTop: '4rem',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '2.5rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>Inspired by our work?</h2>
          <p style={{ color: 'var(--color-taupe)', marginBottom: '1.5rem', maxWidth: '540px', margin: '0 auto 1.5rem' }}>
            Bring your reference screenshots to your appointment. Sandy will consult with you to adapt the look to your unique facial features.
          </p>
          <Link to="/schedule" className="btn btn-primary">
            <Calendar size={16} />
            Book an Appointment
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(20, 15, 14, 0.85)',
            backdropFilter: 'blur(5px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setActiveItem(null)}
        >
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              maxWidth: '720px',
              width: '100%',
              boxShadow: 'var(--shadow-modal)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              aria-label="Close image modal"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            <img
              src={activeItem.image}
              alt={activeItem.title}
              style={{ width: '100%', maxHeight: '65vh', objectFit: 'cover' }}
            />

            <div style={{ padding: '1.5rem' }}>
              <span className="badge badge-rose" style={{ marginBottom: '0.5rem' }}>
                {activeItem.category}
              </span>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{activeItem.title}</h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                {activeItem.description}
              </p>
              <Link to="/schedule" className="btn btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}>
                <Calendar size={14} />
                Book This Treatment
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
