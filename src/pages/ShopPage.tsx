import React, { useState, useMemo } from 'react';
import { ShoppingBag, Star, Check, Sparkles, Shield, Heart } from 'lucide-react';
import { PRODUCTS, type ProductItem } from '../data/products';
import { useCart } from '../context/CartContext';

export const ShopPage: React.FC = () => {
  const { addToCart, openCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const [addedAnimation, setAddedAnimation] = useState<{ [id: string]: boolean }>({});

  const categories = ['All', 'Hair & Wigs', 'Press-On Nails', 'Lip Care', 'Lash & Brow Care'];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, Math.min(10, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const handleAdd = (product: ProductItem) => {
    const qty = quantities[product.id] || 1;
    addToCart(product, qty);

    setAddedAnimation((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '90vh', paddingBottom: '6rem' }}>
      {/* Editorial Header */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
        paddingBottom: 'clamp(2rem, 4vw, 3rem)'
      }}>
        <div className="container" style={{ maxWidth: '1100px', textAlign: 'center' }}>
          <span className="section-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            The Beauty Collection
          </span>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            color: 'var(--color-espresso)',
            marginBottom: '0.85rem'
          }}>
            Lash, Hair & Aesthetic Atelier
          </h1>
          <p style={{
            maxWidth: '650px',
            margin: '0 auto clamp(1.5rem, 3vw, 2.25rem)',
            color: 'var(--color-taupe)',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            lineHeight: 1.7
          }}>
            Ethically sourced virgin hair bundles, bespoke salon-grade press-on nails, plumping peptide lip oils, and clinical extension aftercare. Available for worldwide delivery or pickup at our Easter Road studio.
          </p>

          {/* Category Filter Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.65rem',
            flexWrap: 'wrap'
          }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.65rem 1.35rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-espresso)' : 'var(--color-border)',
                    backgroundColor: isActive ? 'var(--color-espresso)' : 'var(--color-surface)',
                    color: isActive ? 'var(--color-ivory)' : 'var(--color-espresso)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Product Grid */}
      <div className="container" style={{ maxWidth: '1140px', paddingTop: 'clamp(2rem, 4vw, 3.5rem)' }}>
        {/* Results Info & Quick Bag Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-taupe)' }}>
            Showing <strong>{filteredProducts.length}</strong> luxury beauty items
          </div>
          <button
            type="button"
            onClick={openCart}
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.825rem', padding: '0.5rem 1rem' }}
          >
            <ShoppingBag size={15} style={{ color: 'var(--color-rose)' }} />
            View Shopping Bag
          </button>
        </div>

        {/* Product Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          {filteredProducts.map((product) => {
            const qty = quantities[product.id] || 1;
            const isAdded = addedAnimation[product.id];

            return (
              <article
                key={product.id}
                className="product-card"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                {/* Product Image */}
                <div style={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden', backgroundColor: 'var(--color-surface-subtle)' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                  />
                  {product.badge && (
                    <span
                      className="badge badge-rose"
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-rose)', fontWeight: 600, marginBottom: '0.35rem' }}>
                    {product.category}
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-espresso)',
                    lineHeight: 1.4,
                    marginBottom: '0.5rem',
                    minHeight: '2.8rem'
                  }}>
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.65rem' }}>
                    <div style={{ display: 'flex', color: '#D97706' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="#D97706" />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                      {product.rating.toFixed(1)}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-taupe)' }}>
                      ({product.reviewCount})
                    </span>
                  </div>

                  <p style={{
                    fontSize: '0.825rem',
                    color: 'var(--color-taupe)',
                    lineHeight: 1.5,
                    marginBottom: '1rem',
                    flex: 1
                  }}>
                    {product.shortDescription}
                  </p>

                  {/* Price & Quantity Selector */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--color-border-subtle)'
                  }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-espresso)' }}>
                      £{product.price.toFixed(2)}
                    </div>

                    {/* Quantity Selector */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-surface-subtle)'
                    }}>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, -1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          color: 'var(--color-espresso)'
                        }}
                      >
                        −
                      </button>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, minWidth: '18px', textAlign: 'center' }}>
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          color: 'var(--color-espresso)'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add To Bag CTA Button */}
                  <button
                    type="button"
                    onClick={() => handleAdd(product)}
                    className={isAdded ? 'btn btn-secondary' : 'btn btn-primary'}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.85rem',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {isAdded ? (
                      <>
                        <Check size={16} style={{ color: 'var(--color-success)' }} />
                        Added to Bag!
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={15} />
                        Add to Bag • £{(product.price * qty).toFixed(2)}
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Quality Promises Banner */}
        <div style={{
          marginTop: 'clamp(3rem, 6vw, 4.5rem)',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-blush-light)', color: 'var(--color-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem' }}>
                <Sparkles size={20} />
              </div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.35rem', color: 'var(--color-espresso)' }}>
                100% Raw Virgin Quality
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', margin: 0, lineHeight: 1.5 }}>
                Cuticle-aligned hair with zero chemical processing. Reusable for 2+ years with proper maintenance.
              </p>
            </div>

            <div>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-blush-light)', color: 'var(--color-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem' }}>
                <Shield size={20} />
              </div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.35rem', color: 'var(--color-espresso)' }}>
                Salon-Grade Acrylic Press-Ons
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', margin: 0, lineHeight: 1.5 }}>
                Custom molded with ultra-tough gel that won’t bend or split. Waterproof up to 3 weeks.
              </p>
            </div>

            <div>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-blush-light)', color: 'var(--color-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem' }}>
                <Heart size={20} />
              </div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.35rem', color: 'var(--color-espresso)' }}>
                Clinical Extension Aftercare
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', margin: 0, lineHeight: 1.5 }}>
                Oil-free lash shampoo and peptide serums that protect adhesive retention and natural lash health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
