import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Truck,
  MapPin
} from 'lucide-react';
import { useCart, type CartItem } from '../../context/CartContext';

// Crisp SVG Card Brand Badges
const VisaIcon: React.FC = () => (
  <svg width="32" height="19" viewBox="0 0 36 22" fill="none" style={{ borderRadius: '2px', border: '1px solid var(--color-border)', flexShrink: 0 }}>
    <rect width="36" height="22" rx="2" fill="#FFFFFF" />
    <text x="18" y="15" fill="#1434CB" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif" fontStyle="italic">VISA</text>
  </svg>
);

const AmexIcon: React.FC = () => (
  <svg width="32" height="19" viewBox="0 0 36 22" fill="none" style={{ borderRadius: '2px', border: '1px solid var(--color-border)', flexShrink: 0 }}>
    <rect width="36" height="22" rx="2" fill="#006FCF" />
    <text x="18" y="14" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">AMEX</text>
  </svg>
);

const MastercardIcon: React.FC = () => (
  <svg width="32" height="19" viewBox="0 0 36 22" fill="none" style={{ borderRadius: '2px', border: '1px solid var(--color-border)', flexShrink: 0 }}>
    <rect width="36" height="22" rx="2" fill="#FFFFFF" />
    <circle cx="14" cy="11" r="6" fill="#EB001B" />
    <circle cx="22" cy="11" r="6" fill="#F79E1B" fillOpacity="0.85" />
  </svg>
);

const COUNTRIES = [
  'United Kingdom',
  'Nigeria',
  'United States',
  'Canada',
  'Ireland',
  'Ghana',
  'Kenya',
  'South Africa',
  'Germany',
  'France',
  'Other'
];

type DrawerStep = 'bag' | 'details' | 'payment' | 'success';

export const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, cartTotal, totalItemCount, clearCart } = useCart();

  const [step, setStep] = useState<DrawerStep>('bag');
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('delivery');

  // Customer & Shipping Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Payment Details
  const [cardFirstName, setCardFirstName] = useState('');
  const [cardLastName, setCardLastName] = useState('');
  const [cardNumber, setCardNumber] = useState('1234 1234 1234 1234');
  const [cardExpiry, setCardExpiry] = useState('MM / YY');
  const [cardCvc, setCardCvc] = useState('CVC');
  const [cardCountry, setCardCountry] = useState('United Kingdom');
  const [cardSubMethod, setCardSubMethod] = useState<'card' | 'gpay'>('card');
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Completed Order Snapshot for Confirmation Display
  const [confirmedOrder, setConfirmedOrder] = useState<{
    reference: string;
    items: CartItem[];
    customer: { fullName: string; email: string; phone: string; address?: string; city?: string; postcode?: string };
    total: number;
    deliveryFee: number;
    deliveryMethod: 'pickup' | 'delivery';
  } | null>(null);

  // Auto-sync cardholder name when customer full name changes
  useEffect(() => {
    if (fullName.trim()) {
      const parts = fullName.trim().split(' ');
      setCardFirstName(parts[0] || '');
      setCardLastName(parts.slice(1).join(' ') || '');
    }
  }, [fullName]);

  // Delivery fee logic: Free UK delivery on orders £60+, or £3.99 flat. Pickup is always free.
  const deliveryFee = deliveryMethod === 'pickup' ? 0 : cartTotal >= 60 ? 0 : 3.99;
  const grandTotal = Math.max(0, cartTotal + deliveryFee - couponDiscount);

  if (!isCartOpen) return null;

  const validateDetails = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!email.trim() || !email.includes('@')) errs.email = 'Please provide a valid email address';
    if (!phone.trim()) errs.phone = 'Please provide your contact phone number';

    if (deliveryMethod === 'delivery') {
      if (!address.trim()) errs.address = 'Street address is required for dispatch';
      if (!city.trim()) errs.city = 'City is required';
      if (!postcode.trim()) errs.postcode = 'Postcode is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetails()) {
      setStep('payment');
    }
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'SANDY10' || code === 'WELCOME10') {
      const disc = Math.round(cartTotal * 0.1 * 100) / 100;
      setCouponDiscount(disc);
      setCouponError('');
    } else if (code) {
      setCouponError('Invalid promo code. Try WELCOME10 for 10% off.');
      setCouponDiscount(0);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const refNum = Math.floor(1000 + Math.random() * 9000);
    const orderRef = `SBH-ORD-2026-${refNum}`;

    setTimeout(() => {
      setConfirmedOrder({
        reference: orderRef,
        items: [...cartItems],
        customer: {
          fullName,
          email,
          phone,
          address: deliveryMethod === 'delivery' ? address : undefined,
          city: deliveryMethod === 'delivery' ? city : undefined,
          postcode: deliveryMethod === 'delivery' ? postcode : undefined
        },
        total: grandTotal,
        deliveryFee,
        deliveryMethod
      });

      setIsProcessing(false);
      clearCart();
      setStep('success');
    }, 1200);
  };

  const handleCloseAndReset = () => {
    setStep('bag');
    closeCart();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(34, 27, 26, 0.45)',
      backdropFilter: 'blur(4px)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Click outside backdrop to close */}
      <div style={{ flex: 1 }} onClick={handleCloseAndReset} />

      {/* Drawer Panel */}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: 'var(--color-surface)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-modal)',
        position: 'relative',
        animation: 'slideInRight 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Header with Title and Stepper */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: step !== 'success' && step !== 'bag' ? '0.85rem' : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShoppingBag size={20} style={{ color: 'var(--color-rose)' }} />
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--color-espresso)' }}>
                {step === 'bag' && 'Your Beauty Bag'}
                {step === 'details' && 'Delivery & Information'}
                {step === 'payment' && 'Payment & Checkout'}
                {step === 'success' && 'Order Confirmed'}
              </h3>
              {step === 'bag' && (
                <span className="badge badge-rose" style={{ fontSize: '0.725rem', padding: '0.15rem 0.55rem' }}>
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleCloseAndReset}
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
                justifyContent: 'center',
                transition: 'color var(--transition-fast)'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Checkout Progress Stepper (Shown during checkout) */}
          {step !== 'success' && cartItems.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '0.65rem',
              borderTop: '1px solid var(--color-border-subtle)',
              fontSize: '0.75rem',
              color: 'var(--color-taupe)'
            }}>
              <span style={{ fontWeight: step === 'bag' ? 700 : 500, color: step === 'bag' ? 'var(--color-espresso)' : 'inherit' }}>
                1. Review Bag
              </span>
              <span>→</span>
              <span style={{ fontWeight: step === 'details' ? 700 : 500, color: step === 'details' ? 'var(--color-espresso)' : 'inherit' }}>
                2. Information
              </span>
              <span>→</span>
              <span style={{ fontWeight: step === 'payment' ? 700 : 500, color: step === 'payment' ? 'var(--color-espresso)' : 'inherit' }}>
                3. Payment
              </span>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* STEP 1: REVIEW BEAUTY BAG */}
        {/* ============================================================== */}
        {step === 'bag' && (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-surface-subtle)',
                    color: 'var(--color-taupe)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem'
                  }}>
                    <ShoppingBag size={28} />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--color-espresso)' }}>
                    Your beauty bag is empty
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe)', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Explore our salon-grade virgin hair bundles, reusable press-on nails, plumping lip glazes, and lash care products.
                  </p>
                  <Link
                    to="/shop"
                    onClick={handleCloseAndReset}
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
                          width: '72px',
                          height: '72px',
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
                          fontSize: '0.925rem',
                          color: 'var(--color-espresso)',
                          marginTop: '0.35rem'
                        }}>
                          £{(product.price * quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
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
                            aria-label="Decrease quantity"
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: '0.4rem 0.55rem',
                              cursor: 'pointer',
                              color: 'var(--color-espresso)',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '22px', textAlign: 'center' }}>
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            aria-label="Increase quantity"
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: '0.4rem 0.55rem',
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
                          aria-label={`Remove ${product.name}`}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-taupe)',
                            cursor: 'pointer',
                            padding: '0.35rem',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Delivery / Collection Toggle Preview */}
                  <div style={{
                    backgroundColor: 'var(--color-surface-subtle)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1rem',
                    marginTop: '0.5rem'
                  }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-espresso)', display: 'block', marginBottom: '0.5rem' }}>
                      Delivery Method:
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('delivery')}
                        style={{
                          padding: '0.65rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid',
                          borderColor: deliveryMethod === 'delivery' ? 'var(--color-espresso)' : 'var(--color-border)',
                          backgroundColor: deliveryMethod === 'delivery' ? 'var(--color-blush-light)' : 'var(--color-surface)',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-espresso)' }}>
                          <Truck size={14} style={{ color: 'var(--color-rose)' }} />
                          UK Tracked
                        </div>
                        <div style={{ fontSize: '0.725rem', color: 'var(--color-taupe)', marginTop: '0.2rem' }}>
                          {cartTotal >= 60 ? 'FREE (Over £60)' : '£3.99 flat rate'}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('pickup')}
                        style={{
                          padding: '0.65rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid',
                          borderColor: deliveryMethod === 'pickup' ? 'var(--color-espresso)' : 'var(--color-border)',
                          backgroundColor: deliveryMethod === 'pickup' ? 'var(--color-blush-light)' : 'var(--color-surface)',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-espresso)' }}>
                          <MapPin size={14} style={{ color: 'var(--color-rose)' }} />
                          Studio Pickup
                        </div>
                        <div style={{ fontSize: '0.725rem', color: 'var(--color-taupe)', marginTop: '0.2rem' }}>
                          Free in Edinburgh
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 1 Footer */}
            {cartItems.length > 0 && (
              <div style={{
                padding: '1.25rem 1.5rem',
                borderTop: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface-subtle)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.85rem', color: 'var(--color-taupe)' }}>
                  <span>Subtotal:</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-espresso)' }}>£{cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--color-taupe)' }}>
                  <span>Delivery ({deliveryMethod === 'pickup' ? 'Easter Rd Pickup' : 'UK Royal Mail'}):</span>
                  <span style={{ fontWeight: 600, color: deliveryFee === 0 ? 'var(--color-success)' : 'var(--color-espresso)' }}>
                    {deliveryFee === 0 ? 'FREE' : `£${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '1.25rem',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--color-espresso)',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '0.65rem'
                }}>
                  <span>Total:</span>
                  <span style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)' }}>£{grandTotal.toFixed(2)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    fontSize: '0.925rem',
                    fontWeight: 600,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Continue to Delivery & Info <ArrowRight size={15} />
                </button>
              </div>
            )}
          </>
        )}

        {/* ============================================================== */}
        {/* STEP 2: CUSTOMER & DELIVERY INFORMATION */}
        {/* ============================================================== */}
        {step === 'details' && (
          <form onSubmit={handleProceedToPayment} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--color-espresso)', margin: '0 0 0.35rem' }}>
                  Delivery & Contact
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--color-taupe)', margin: 0, lineHeight: 1.5 }}>
                  Enter your details for order confirmation receipts and tracking dispatch.
                </p>
              </div>

              {/* Delivery method selector */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.8rem' }}>
                  Fulfillment Option *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid',
                      borderColor: deliveryMethod === 'delivery' ? 'var(--color-espresso)' : 'var(--color-border)',
                      backgroundColor: deliveryMethod === 'delivery' ? 'var(--color-blush-light)' : 'var(--color-surface)',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.825rem', color: 'var(--color-espresso)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Truck size={14} style={{ color: 'var(--color-rose)' }} />
                      UK Delivery
                    </div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--color-taupe)', marginTop: '0.2rem' }}>
                      Royal Mail Tracked
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid',
                      borderColor: deliveryMethod === 'pickup' ? 'var(--color-espresso)' : 'var(--color-border)',
                      backgroundColor: deliveryMethod === 'pickup' ? 'var(--color-blush-light)' : 'var(--color-surface)',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.825rem', color: 'var(--color-espresso)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={14} style={{ color: 'var(--color-rose)' }} />
                      Studio Pickup
                    </div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--color-taupe)', marginTop: '0.2rem' }}>
                      101 Easter Rd, Edinburgh
                    </div>
                  </button>
                </div>
              </div>

              {/* Personal Info Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label className="form-label" style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayishat Adeleke"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-input"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                  {errors.fullName && <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>{errors.fullName}</span>}
                </div>

                <div>
                  <label className="form-label" style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                  {errors.email && <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>{errors.email}</span>}
                </div>

                <div>
                  <label className="form-label" style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 07733777956 or +44..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                  {errors.phone && <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>{errors.phone}</span>}
                </div>
              </div>

              {/* Shipping Address (if delivery selected) */}
              {deliveryMethod === 'delivery' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                    Shipping Address (UK)
                  </span>

                  <div>
                    <label className="form-label" style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 3, 24 Royal Terrace"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', boxSizing: 'border-box' }}
                    />
                    {errors.address && <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>{errors.address}</span>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label className="form-label" style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                        City / Town *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Edinburgh"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="form-input"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                      />
                      {errors.city && <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>{errors.city}</span>}
                    </div>

                    <div>
                      <label className="form-label" style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                        Postcode *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. EH7 5PP"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        className="form-input"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                      />
                      {errors.postcode && <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>{errors.postcode}</span>}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-blush-light)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  marginBottom: '1.5rem',
                  fontSize: '0.8rem',
                  color: 'var(--color-taupe)',
                  lineHeight: 1.5
                }}>
                  <strong style={{ color: 'var(--color-espresso)', display: 'block', marginBottom: '0.25rem' }}>
                    Studio Collection Notice:
                  </strong>
                  Collect directly from Sandy Beauty Haven Studio, 101 Easter Road, Edinburgh, EH7 5PP. We will notify you via email and phone when your package is ready for pickup.
                </div>
              )}

              {/* Order Notes */}
              <div>
                <label className="form-label" style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                  Order Notes / Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Lace customization preference, or leave with concierge"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="form-textarea"
                  style={{ width: '100%', boxSizing: 'border-box', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Step 2 Actions */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface-subtle)',
              display: 'flex',
              gap: '0.75rem'
            }}>
              <button
                type="button"
                onClick={() => setStep('bag')}
                className="btn btn-secondary"
                style={{ flex: '1 1 110px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: '2 1 180px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}
              >
                Proceed to Payment <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}

        {/* ============================================================== */}
        {/* STEP 3: PAYMENT PROCEDURE */}
        {/* ============================================================== */}
        {step === 'payment' && (
          <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--color-espresso)', margin: '0 0 0.35rem' }}>
                  Payment Procedure
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--color-taupe)', margin: 0, lineHeight: 1.5 }}>
                  256-bit SSL encrypted checkout for Sandy Beauty Haven.
                </p>
              </div>

              {/* Order Recap Pill */}
              <div style={{
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem',
                marginBottom: '1.5rem',
                fontSize: '0.85rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span>Delivering To:</span>
                  <strong style={{ color: 'var(--color-espresso)' }}>
                    {deliveryMethod === 'pickup' ? 'Studio Pickup (101 Easter Rd)' : `${fullName} (${city || 'UK'})`}
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span>Items ({totalItemCount}):</span>
                  <span>£{cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span>Delivery Fee:</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `£${deliveryFee.toFixed(2)}`}</span>
                </div>
                {couponDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', color: 'var(--color-success)' }}>
                    <span>Coupon Discount:</span>
                    <span>-£{couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '0.5rem',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: 'var(--color-espresso)'
                }}>
                  <span>Total Due:</span>
                  <span>£{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Toggle */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label className="form-label" style={{ fontSize: '0.8rem', margin: 0 }}>
                    Select Payment Method *
                  </label>
                  <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                    <VisaIcon />
                    <MastercardIcon />
                    <AmexIcon />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <button
                    type="button"
                    onClick={() => setCardSubMethod('card')}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      padding: '0.7rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid',
                      borderColor: cardSubMethod === 'card' ? 'var(--color-espresso)' : 'var(--color-border)',
                      backgroundColor: cardSubMethod === 'card' ? 'var(--color-surface-warm)' : 'var(--color-surface)',
                      color: 'var(--color-espresso)',
                      fontWeight: 600,
                      fontSize: '0.825rem',
                      cursor: 'pointer'
                    }}
                  >
                    <CreditCard size={14} style={{ color: 'var(--color-rose)' }} />
                    Credit / Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setCardSubMethod('gpay')}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      padding: '0.7rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid',
                      borderColor: cardSubMethod === 'gpay' ? 'var(--color-espresso)' : 'var(--color-border)',
                      backgroundColor: cardSubMethod === 'gpay' ? 'var(--color-surface-warm)' : 'var(--color-surface)',
                      color: 'var(--color-espresso)',
                      fontWeight: 600,
                      fontSize: '0.825rem',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontWeight: 800, color: '#4285F4' }}>G</span>Pay (Google Pay)
                  </button>
                </div>

                {cardSubMethod === 'card' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                      <div>
                        <label className="form-label" style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardFirstName}
                          onChange={(e) => setCardFirstName(e.target.value)}
                          className="form-input"
                          style={{ width: '100%', boxSizing: 'border-box', fontSize: '0.85rem', padding: '0.65rem 0.75rem' }}
                        />
                      </div>
                      <div>
                        <label className="form-label" style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardLastName}
                          onChange={(e) => setCardLastName(e.target.value)}
                          className="form-input"
                          style={{ width: '100%', boxSizing: 'border-box', fontSize: '0.85rem', padding: '0.65rem 0.75rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label" style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                        Card Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 1234 1234 1234"
                        className="form-input"
                        style={{ width: '100%', boxSizing: 'border-box', fontSize: '0.85rem', padding: '0.65rem 0.75rem' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                      <div>
                        <label className="form-label" style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                          Expiry *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM / YY"
                          className="form-input"
                          style={{ width: '100%', boxSizing: 'border-box', fontSize: '0.85rem', padding: '0.65rem 0.75rem' }}
                        />
                      </div>
                      <div>
                        <label className="form-label" style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                          CVC / CVV *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="CVC"
                          className="form-input"
                          style={{ width: '100%', boxSizing: 'border-box', fontSize: '0.85rem', padding: '0.65rem 0.75rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label" style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                        Billing Country
                      </label>
                      <select
                        value={cardCountry}
                        onChange={(e) => setCardCountry(e.target.value)}
                        className="form-select"
                        style={{ width: '100%', boxSizing: 'border-box', fontSize: '0.85rem', padding: '0.65rem 0.75rem' }}
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    padding: '1.25rem',
                    backgroundColor: 'var(--color-surface-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px dashed var(--color-border)',
                    textAlign: 'center',
                    fontSize: '0.825rem',
                    color: 'var(--color-taupe)'
                  }}>
                    Google Pay biometric prompt will appear upon clicking <strong>Pay & Place Order</strong>.
                  </div>
                )}
              </div>

              {/* Promo Code Accordion */}
              <div style={{ marginBottom: '1.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-subtle)' }}>
                <button
                  type="button"
                  onClick={() => setShowCoupon(!showCoupon)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--color-espresso)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <span>Have a promo code?</span>
                  <span style={{ color: 'var(--color-rose)' }}>{showCoupon ? '−' : '+'}</span>
                </button>

                {showCoupon && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="form-input"
                      style={{ flex: 1, fontSize: '0.8rem', padding: '0.55rem 0.75rem' }}
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="btn btn-secondary"
                      style={{ padding: '0.55rem 0.95rem', fontSize: '0.775rem' }}
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && <p style={{ fontSize: '0.75rem', color: 'var(--color-error)', margin: '0.35rem 0 0' }}>{couponError}</p>}
                {couponDiscount > 0 && <p style={{ fontSize: '0.75rem', color: 'var(--color-success)', margin: '0.35rem 0 0', fontWeight: 600 }}>✓ Code applied! £{couponDiscount.toFixed(2)} deducted.</p>}
              </div>
            </div>

            {/* Step 3 Actions */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <button
                type="submit"
                disabled={isProcessing}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '1.1rem 1.25rem',
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  cursor: isProcessing ? 'not-allowed' : 'pointer'
                }}
              >
                {isProcessing ? 'Authorising Payment...' : `Pay £${grandTotal.toFixed(2)} & Place Order`}
              </button>

              <button
                type="button"
                onClick={() => setStep('details')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-taupe)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  textDecoration: 'underline'
                }}
              >
                ← Edit Delivery & Contact Details
              </button>
            </div>
          </form>
        )}

        {/* ============================================================== */}
        {/* STEP 4: ORDER CONFIRMED SCREEN */}
        {/* ============================================================== */}
        {step === 'success' && confirmedOrder && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 1.5rem', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-blush-light)',
              color: 'var(--color-rose)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              border: '2px solid var(--color-rose)'
            }}>
              <CheckCircle2 size={34} />
            </div>

            <span className="badge badge-rose" style={{ marginBottom: '0.75rem', fontSize: '0.725rem' }}>
              ORDER #{confirmedOrder.reference}
            </span>

            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', marginBottom: '0.5rem', color: 'var(--color-espresso)' }}>
              Order Received!
            </h4>

            <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe)', lineHeight: 1.6, marginBottom: '1.5rem', wordBreak: 'break-word' }}>
              Thank you, <strong>{confirmedOrder.customer.fullName}</strong>! Your order has been placed with Sandy Beauty Haven.
            </p>

            {/* Direct Contact Notice */}
            <div style={{
              backgroundColor: 'var(--color-blush-light)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.15rem 1.25rem',
              textAlign: 'left',
              marginBottom: '1.75rem',
              fontSize: '0.85rem',
              color: 'var(--color-espresso)',
              lineHeight: 1.65
            }}>
              <strong style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--color-espresso)', fontSize: '0.9rem' }}>
                Direct Contact Notice:
              </strong>
              You will be contacted directly via email at <strong style={{ wordBreak: 'break-all' }}>{confirmedOrder.customer.email}</strong> and by phone at <strong>{confirmedOrder.customer.phone}</strong> to confirm your order and coordinate your {confirmedOrder.deliveryMethod === 'pickup' ? 'studio collection at 101 Easter Road' : 'delivery dispatch'}.
            </div>

            {/* Order Summary Recap Card */}
            <div style={{
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.15rem 1.25rem',
              textAlign: 'left',
              marginBottom: '1.75rem',
              fontSize: '0.85rem'
            }}>
              <div style={{ fontWeight: 600, color: 'var(--color-espresso)', marginBottom: '0.65rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.45rem' }}>
                Items Purchased:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '0.85rem' }}>
                {confirmedOrder.items.map(({ product, quantity }) => (
                  <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-espresso)' }}>
                      {product.name} × {quantity}
                    </span>
                    <strong style={{ color: 'var(--color-espresso)' }}>
                      £{(product.price * quantity).toFixed(2)}
                    </strong>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.65rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', color: 'var(--color-taupe)' }}>
                  <span>Fulfillment:</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-espresso)' }}>
                    {confirmedOrder.deliveryMethod === 'pickup' ? 'Studio Pickup (Edinburgh)' : 'Royal Mail UK Tracked'}
                  </span>
                </div>
                {confirmedOrder.customer.address && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', color: 'var(--color-taupe)' }}>
                    <span>Shipping Address:</span>
                    <span style={{ textAlign: 'right', color: 'var(--color-espresso)' }}>
                      {confirmedOrder.customer.address}, {confirmedOrder.customer.city} {confirmedOrder.customer.postcode}
                    </span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.45rem', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-espresso)' }}>
                  <span>Total Paid (SSL):</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem' }}>
                    £{confirmedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseAndReset}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.95rem' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
