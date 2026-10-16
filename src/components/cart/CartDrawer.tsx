import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, cartTotal, totalItemCount, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(true);
      clearCart();
    }, 1500);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(34, 27, 26, 0.45)',
      backdropFilter: 'blur(3px)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Click outside to close */}
      <div style={{ flex: 1 }} onClick={closeCart} />

      {/* Drawer Panel */}
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: 'var(--color-surface)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-modal)',
        position: 'relative',
        animation: 'slideInRight 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} style={{ color: 'var(--color-rose)' }} />
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--color-espresso)' }}>
              Your Beauty Bag
            </h3>
            <span className="badge badge-rose" style={{ fontSize: '0.75rem', padding: '0.15rem 0.55rem' }}>
              {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-taupe)',
              cursor: 'pointer',
              padding: '0.35rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {orderSuccess ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-blush-light)',
                color: 'var(--color-rose)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}>
                <CheckCircle2 size={32} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-espresso)' }}>
                Order Placed Successfully!
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', lineHeight: 1.6, marginBottom: '2rem' }}>
                Thank you for your order with Sandy Beauty Haven. We have sent an email receipt and tracking dispatch details.
              </p>
              <button
                type="button"
                onClick={() => {
                  setOrderSuccess(false);
                  closeCart();
                }}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-surface-subtle)',
                color: 'var(--color-taupe)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <ShoppingBag size={26} />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-espresso)' }}>
                Your bag is empty
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Discover our curated collection of virgin hair bundles, press-on nails, plumping lip glazes, and lash aftercare kits.
              </p>
              <Link
                to="/shop"
                onClick={closeCart}
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: '100%', justifyContent: 'center' }}
              >
                Explore Products <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover',
                      border: '1px solid var(--color-border)'
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h5 style={{
                      margin: 0,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--color-espresso)',
                      lineHeight: 1.35,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {product.name}
                    </h5>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-taupe)', marginTop: '0.2rem' }}>
                      {product.category}
                    </div>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: 'var(--color-espresso)',
                      marginTop: '0.35rem'
                    }}>
                      £{(product.price * quantity).toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-surface-subtle)'
                    }}>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '0.35rem 0.5rem',
                          cursor: 'pointer',
                          color: 'var(--color-espresso)',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '0.35rem 0.5rem',
                          cursor: 'pointer',
                          color: 'var(--color-espresso)',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      aria-label="Remove item"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-taupe)',
                        cursor: 'pointer',
                        padding: '0.35rem'
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout */}
        {cartItems.length > 0 && !orderSuccess && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface-subtle)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.4rem',
              fontSize: '0.85rem',
              color: 'var(--color-taupe)'
            }}>
              <span>Delivery & Studio Pickup:</span>
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Free in Edinburgh / £3.99 UK</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '1.25rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--color-espresso)'
            }}>
              <span>Estimated Total:</span>
              <span style={{ fontSize: '1.25rem' }}>£{cartTotal.toFixed(2)}</span>
            </div>

            <button
              type="button"
              disabled={isCheckingOut}
              onClick={handleCheckout}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.95rem 1.25rem',
                fontSize: '0.925rem',
                fontWeight: 600,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {isCheckingOut ? 'Processing Order...' : `Proceed to Checkout (£${cartTotal.toFixed(2)})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
