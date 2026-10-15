import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, Phone } from 'lucide-react';
import { FAQS } from '../data/faqs';

export const FaqPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<{ [key: string]: boolean }>({ 'faq-1': true, 'faq-5': true });

  const categories = ['All', 'Booking', 'Deposits & Payments', 'Cancellations', 'Lash Preparation & Care', 'Training'];

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '85vh', paddingBottom: '6rem' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--color-surface-subtle)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: 'clamp(3.5rem, 5vw, 5rem)',
        paddingBottom: 'clamp(2.5rem, 4vw, 3.5rem)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <span className="section-eyebrow">Help & Guidance</span>
            <h1 style={{ marginBottom: '1rem' }}>Frequently Asked Questions</h1>
            <p className="lead" style={{ margin: 0 }}>
              Find quick answers regarding our booking rules, non-refundable deposits, preparation guidelines, and CPD training details.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '880px', paddingTop: '3rem' }}>
        {/* Search & Categories Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {/* Search bar */}
          <div style={{ position: 'relative' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-taupe)'
              }}
            />
            <input
              type="text"
              placeholder="Search questions (e.g. deposit, contacts, cancellation, training)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.75rem', backgroundColor: 'var(--color-surface)' }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'none'
          }}>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.55rem 1.15rem',
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

        {/* FAQs List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '4rem' }}>
          {filteredFaqs.length === 0 ? (
            <div style={{
              padding: '3rem',
              textAlign: 'center',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)'
            }}>
              <p style={{ margin: 0, color: 'var(--color-taupe)' }}>
                No questions found matching "{searchQuery}".
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div
                  key={faq.id}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--color-espresso)'
                    }}
                  >
                    <span>{faq.question}</span>
                    <span style={{ color: 'var(--color-taupe)', marginLeft: '1rem', flexShrink: 0 }}>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 1.5rem 1.25rem',
                      color: 'var(--color-taupe)',
                      fontSize: '0.925rem',
                      lineHeight: 1.65,
                      borderTop: '1px solid var(--color-border-subtle)',
                      paddingTop: '1rem'
                    }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <span className="badge" style={{ fontSize: '0.65rem' }}>
                          {faq.category}
                        </span>
                      </div>
                      <p style={{ margin: 0 }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions prompt */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '2.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Still have questions?</h3>
          <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            We're happy to answer any questions about suitability, eye sensitivities, or after-hours availability.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-secondary">
              Send a Message
            </Link>
            <a href="tel:+447733777956" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Phone size={14} />
              Call +44 07733777956
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
