import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  CreditCard,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  Trash2,
  ChevronDown,
  ChevronUp,
  ShieldCheck
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { useBooking } from '../context/BookingContext';

// Crisp SVG Card Brand Badges matching Acuity
const VisaIcon: React.FC = () => (
  <svg width="34" height="20" viewBox="0 0 36 22" fill="none" style={{ borderRadius: '2px', border: '1px solid #E5E7EB', flexShrink: 0 }}>
    <rect width="36" height="22" rx="2" fill="#FFFFFF" />
    <text x="18" y="15" fill="#1434CB" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif" fontStyle="italic">VISA</text>
  </svg>
);

const AmexIcon: React.FC = () => (
  <svg width="34" height="20" viewBox="0 0 36 22" fill="none" style={{ borderRadius: '2px', border: '1px solid #E5E7EB', flexShrink: 0 }}>
    <rect width="36" height="22" rx="2" fill="#006FCF" />
    <text x="18" y="14" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">AMEX</text>
  </svg>
);

const DiscoverIcon: React.FC = () => (
  <svg width="34" height="20" viewBox="0 0 36 22" fill="none" style={{ borderRadius: '2px', border: '1px solid #E5E7EB', flexShrink: 0 }}>
    <rect width="36" height="22" rx="2" fill="#FFFFFF" />
    <rect x="2" y="2" width="32" height="18" rx="2" fill="#FF6000" />
    <text x="18" y="14" fill="#FFFFFF" fontSize="7" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">DISCOVER</text>
  </svg>
);

const MastercardIcon: React.FC = () => (
  <svg width="34" height="20" viewBox="0 0 36 22" fill="none" style={{ borderRadius: '2px', border: '1px solid #E5E7EB', flexShrink: 0 }}>
    <rect width="36" height="22" rx="2" fill="#FFFFFF" />
    <circle cx="14" cy="11" r="6" fill="#EB001B" />
    <circle cx="22" cy="11" r="6" fill="#F79E1B" fillOpacity="0.85" />
  </svg>
);

const COUNTRIES = [
  'Nigeria',
  'United Kingdom',
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

// Helper to format date & time identically to Acuity (e.g. October 16th, 2026 at 10:00 AM BST)
const formatAcuityDateTime = (dateStr: string, timeStr: string) => {
  if (!dateStr) return 'October 16th, 2026 at 10:00 AM BST';
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const nth = (num: number) => {
      if (num > 3 && num < 21) return 'th';
      switch (num % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    return `${month} ${day}${nth(day)}, ${y} at ${timeStr || '10:00 AM'} BST`;
  } catch {
    return `${dateStr} at ${timeStr} BST`;
  }
};

export const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedServices,
    removeService,
    toggleService,
    isServiceSelected,
    totalPrice,
    totalDeposit,
    totalDuration,
    selectedStaff,
    setSelectedStaff,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    clientDetails,
    setClientDetails,
    completeBooking
  } = useBooking();

  const [step, setStep] = useState<number>(1);
  const [bookingCategory, setBookingCategory] = useState<string>('All');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Step 4 State matching Acuity Scheduling exactly
  const [paymentChoice, setPaymentChoice] = useState<'full' | 'deposit'>('full');
  const [activeTipOption, setActiveTipOption] = useState<number | 'custom'>(18);
  const [customTipInput, setCustomTipInput] = useState<string>('');
  const [showCouponInput, setShowCouponInput] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>('');

  const [cardFirstName, setCardFirstName] = useState<string>('Sanusi');
  const [cardLastName, setCardLastName] = useState<string>('Odunayo');
  const [cardSubMethod, setCardSubMethod] = useState<'card' | 'gpay'>('card');
  const [cardNumber, setCardNumber] = useState<string>('1234 1234 1234 1234');
  const [cardExpiry, setCardExpiry] = useState<string>('MM / YY');
  const [cardCvc, setCardCvc] = useState<string>('CVC');
  const [cardCountry, setCardCountry] = useState<string>('Nigeria');

  // Synchronize cardholder name when client details update
  useEffect(() => {
    if (clientDetails.fullName.trim()) {
      const parts = clientDetails.fullName.trim().split(' ');
      setCardFirstName(parts[0] || '');
      setCardLastName(parts.slice(1).join(' ') || '');
    }
  }, [clientDetails.fullName]);

  // Available staff members
  const staffMembers = [
    { id: 'Sandy Beauty', name: 'Sandy (Lashes & Brows)', role: 'Master Lash & Brow Artist' },
    { id: 'Makeup with Bukky', name: 'Bukky (Makeup)', role: 'Pro Makeup Artist' },
    { id: 'Any available', name: 'Any Available Artist', role: 'First available slot' }
  ];

  // Calendar calculations
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate date slots for current month
  const calendarDays = useMemo(() => {
    const days: Array<{ dayNumber: number; dateString: string; isSunday: boolean; isPast: boolean } | null> = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month, d);
      const isSunday = dateObj.getDay() === 0;
      const isPast = dateObj < today;
      const monthStr = String(month + 1).padStart(2, '0');
      const dayStr = String(d).padStart(2, '0');
      const dateString = `${year}-${monthStr}-${dayStr}`;

      days.push({
        dayNumber: d,
        dateString,
        isSunday,
        isPast
      });
    }

    return days;
  }, [year, month, firstDayOfMonth, daysInMonth]);

  // Available Time Slots based on opening hours (9am - 5pm)
  const timeSlots = useMemo(() => {
    return [
      '09:30 AM',
      '11:00 AM',
      '12:30 PM',
      '02:00 PM',
      '03:30 PM',
      '04:45 PM'
    ];
  }, []);

  // Category filter
  const bookingCategories = ['All', 'Lashes', 'Brows', 'Makeup', 'Training'];

  const displayedServices = useMemo(() => {
    if (bookingCategory === 'All') return SERVICES;
    if (bookingCategory === 'Lashes') return SERVICES.filter((s) => s.category.includes('Lash'));
    if (bookingCategory === 'Brows') return SERVICES.filter((s) => s.category.includes('Brow'));
    if (bookingCategory === 'Makeup') return SERVICES.filter((s) => s.category.includes('Makeup'));
    if (bookingCategory === 'Training') return SERVICES.filter((s) => s.category.includes('Academy') || s.category.includes('Training'));
    return SERVICES;
  }, [bookingCategory]);

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
  };

  const handleNextStep = () => {
    if (step === 1 && selectedServices.length === 0) {
      alert('Please select at least one treatment to continue.');
      return;
    }
    if (step === 2 && !selectedDate) {
      alert('Please select an appointment date.');
      return;
    }
    if (step === 3) {
      const errors: { [key: string]: string } = {};
      if (!clientDetails.fullName.trim()) errors.fullName = 'Please enter your full name.';
      if (!clientDetails.email.trim() || !clientDetails.email.includes('@')) errors.email = 'Valid email is required for booking confirmations.';
      if (!clientDetails.phone.trim() || clientDetails.phone.replace(/\D/g, '').length < 7) {
        errors.phone = 'Please enter a valid contact phone number.';
      }
      if (!clientDetails.agreeToPolicies) {
        errors.agreeToPolicies = 'You must agree to the Terms & Conditions and 48-hour cancellation policy.';
      }

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors({});
    }
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  // Financial computations matching Acuity breakdown
  const subtotalAfterDiscount = Math.max(0, totalPrice - couponDiscount);

  const tipAmount = useMemo(() => {
    if (activeTipOption === 0) return 0;
    if (activeTipOption === 15) return subtotalAfterDiscount * 0.15;
    if (activeTipOption === 18) return subtotalAfterDiscount * 0.18;
    if (activeTipOption === 20) return subtotalAfterDiscount * 0.20;
    if (activeTipOption === 'custom') {
      const val = parseFloat(customTipInput);
      return isNaN(val) || val < 0 ? 0 : val;
    }
    return 0;
  }, [activeTipOption, customTipInput, subtotalAfterDiscount]);

  const orderTotal = subtotalAfterDiscount + tipAmount;
  const depositBase = Math.min(totalDeposit, subtotalAfterDiscount);
  const remainingLaterDisplay = Math.max(0, subtotalAfterDiscount - depositBase);
  const depositNowDisplay = depositBase;

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    if (code === 'WELCOME10' || code === 'SANDY10') {
      setCouponDiscount(10);
    } else if (code === 'LASH20') {
      setCouponDiscount(20);
    } else {
      setCouponError('Invalid or expired coupon code.');
    }
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const amountPaid = paymentChoice === 'full'
        ? orderTotal
        : (depositNowDisplay + (paymentChoice === 'deposit' ? tipAmount : 0));
      const remainingBalance = paymentChoice === 'full'
        ? 0
        : remainingLaterDisplay;

      completeBooking({
        paymentChoice,
        amountPaid,
        remainingBalance,
        tip: tipAmount
      });

      setIsProcessing(false);
      navigate('/booking-confirmed');
    }, 1200);
  };

  const stepLabels = ['Select Treatments', 'Date & Time', 'Your Details', 'Payment'];

  return (
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '85vh', paddingBottom: '5rem' }}>
      {/* Top Header */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: 'clamp(2rem, 4vw, 3rem)',
        paddingBottom: 'clamp(1.5rem, 3vw, 2.5rem)'
      }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <span className="section-eyebrow">Online Booking</span>
              <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', margin: 0 }}>
                Schedule Your Appointment
              </h1>
            </div>

            {/* Selected items quick badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--color-surface-subtle)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              fontSize: '0.85rem'
            }}>
              <span style={{ fontWeight: 600 }}>{selectedServices.length} Treatment{selectedServices.length !== 1 ? 's' : ''}</span>
              <span>•</span>
              <span style={{ color: 'var(--color-rose)', fontWeight: 600 }}>Total: £{totalPrice}</span>
            </div>
          </div>

          {/* Stepper: Responsive on Desktop and Mobile */}
          <div style={{ marginTop: '1.5rem' }}>
            {/* Desktop Stepper */}
            <div
              className="desktop-nav"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              {[
                { num: 1, label: '1. Treatments' },
                { num: 2, label: '2. Date & Time' },
                { num: 3, label: '3. Your Details' },
                { num: 4, label: '4. Payment' }
              ].map((s) => {
                const isCompleted = step > s.num;
                const isCurrent = step === s.num;
                return (
                  <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      backgroundColor: isCompleted ? 'var(--color-rose)' : isCurrent ? 'var(--color-espresso)' : 'var(--color-surface)',
                      color: isCompleted || isCurrent ? 'var(--color-ivory)' : 'var(--color-taupe)',
                      border: '1px solid',
                      borderColor: isCompleted ? 'var(--color-rose)' : isCurrent ? 'var(--color-espresso)' : 'var(--color-border)'
                    }}>
                      {isCompleted ? <Check size={14} /> : s.num}
                    </div>
                    <span style={{
                      fontSize: '0.825rem',
                      fontWeight: isCurrent ? 600 : 500,
                      color: isCurrent ? 'var(--color-espresso)' : 'var(--color-taupe)'
                    }}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Mobile Progress Bar (Sleek, uncluttered) */}
            <div style={{ display: 'none' }} className="mobile-stepper">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <span>Step {step} of 4</span>
                <span style={{ color: 'var(--color-rose)' }}>{stepLabels[step - 1]}</span>
              </div>
              <div style={{ height: '4px', backgroundColor: 'var(--color-border)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  width: `${(step / 4) * 100}%`,
                  height: '100%',
                  backgroundColor: 'var(--color-rose)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: step === 4 ? '560px' : '1000px', paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)', transition: 'max-width 0.3s ease' }}>
        <div style={{
          display: step === 4 ? 'block' : 'grid',
          gridTemplateColumns: step === 4 ? 'none' : 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(1.5rem, 3.5vw, 2.5rem)',
          alignItems: 'start'
        }}>
          {/* Main Step Content Column */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'clamp(1.25rem, 3.5vw, 2.25rem)',
            boxShadow: 'var(--shadow-subtle)',
            minWidth: 0,
            width: '100%'
          }}>

            {/* ============================================================== */}
            {/* STEP 1: MULTI-SERVICE SELECTION (Add-to-Cart Style) */}
            {/* ============================================================== */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>1. Choose Your Treatments</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', marginBottom: '1.5rem' }}>
                  Select one or multiple services. You can add extra services (e.g. Lashes + Brows + Touch-Up) in a single booking.
                </p>

                {/* Selected Treatments Cart Tray */}
                <div style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem',
                  marginBottom: '1.75rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                      Selected Services ({selectedServices.length}):
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-taupe)' }}>
                      Est. Duration: {totalDuration} mins
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {selectedServices.map((svc) => (
                      <div
                        key={svc.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: '#FFFFFF',
                          padding: '0.5rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--color-border-subtle)',
                          fontSize: '0.85rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                          <CheckCircle2 size={15} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                          <span style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {svc.name}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-taupe)' }}>
                            ({svc.duration}m)
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                          <span style={{ fontWeight: 600 }}>£{svc.price}</span>
                          {selectedServices.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeService(svc.id)}
                              aria-label={`Remove ${svc.name}`}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-error)',
                                cursor: 'pointer',
                                padding: '2px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practitioner Selection */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Select Practitioner
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem' }}>
                    {staffMembers.map((staff) => (
                      <button
                        key={staff.id}
                        type="button"
                        onClick={() => setSelectedStaff(staff.id)}
                        style={{
                          padding: '0.75rem 0.85rem',
                          textAlign: 'left',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid',
                          borderColor: selectedStaff === staff.id ? 'var(--color-rose)' : 'var(--color-border)',
                          backgroundColor: selectedStaff === staff.id ? 'var(--color-blush-light)' : 'var(--color-surface)',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: '0.825rem', color: 'var(--color-espresso)' }}>
                          {staff.name}
                        </div>
                        <div style={{ fontSize: '0.725rem', color: 'var(--color-taupe)' }}>
                          {staff.role}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div style={{
                  display: 'flex',
                  gap: '0.45rem',
                  overflowX: 'auto',
                  paddingBottom: '0.5rem',
                  marginBottom: '1rem',
                  scrollbarWidth: 'none'
                }}>
                  {bookingCategories.map((cat) => {
                    const isSelected = bookingCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setBookingCategory(cat)}
                        style={{
                          padding: '0.4rem 0.95rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
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

                {/* Available Treatments List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '460px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                  {displayedServices.map((s) => {
                    const isSelected = isServiceSelected(s.id);
                    return (
                      <div
                        key={s.id}
                        onClick={() => toggleService(s)}
                        style={{
                          padding: '0.85rem 1rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid',
                          borderColor: isSelected ? 'var(--color-rose)' : 'var(--color-border)',
                          backgroundColor: isSelected ? 'var(--color-blush-light)' : 'var(--color-surface)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '0.75rem',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{s.name}</span>
                            <span className="badge" style={{ fontSize: '0.65rem' }}>{s.category}</span>
                          </div>
                          <div style={{ fontSize: '0.775rem', color: 'var(--color-taupe)', display: 'flex', gap: '0.6rem' }}>
                            <span>{s.duration} mins</span>
                            <span>•</span>
                            <span>Deposit: £{s.deposit}</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
                          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600 }}>
                            £{s.price}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleService(s);
                            }}
                            style={{
                              padding: '0.4rem 0.75rem',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid',
                              borderColor: isSelected ? 'var(--color-rose)' : 'var(--color-espresso)',
                              backgroundColor: isSelected ? 'var(--color-rose)' : '#FFFFFF',
                              color: isSelected ? '#FFFFFF' : 'var(--color-espresso)',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem'
                            }}
                          >
                            {isSelected ? (
                              <>
                                <Check size={12} />
                                Added
                              </>
                            ) : (
                              <>
                                <Plus size={12} />
                                Add
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn btn-primary"
                    style={{ width: 'clamp(200px, 100%, 260px)' }}
                  >
                    Next: Date & Time ({selectedServices.length}) →
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* STEP 2: DATE & TIME */}
            {/* ============================================================== */}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>2. Select Date & Time</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', marginBottom: '1.5rem' }}>
                  Operating hours: Monday to Saturday, 9:00 AM – 5:00 PM. Sundays are closed.
                </p>

                {/* Month Navigator */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                    style={{
                      background: 'none',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <h3 style={{ fontSize: '1.05rem', margin: 0 }}>
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h3>

                  <button
                    type="button"
                    onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                    style={{
                      background: 'none',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Calendar Days Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gap: '0.35rem',
                  textAlign: 'center',
                  marginBottom: '2rem'
                }}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-taupe)', padding: '0.35rem 0' }}>
                      {d}
                    </div>
                  ))}

                  {calendarDays.map((cd, index) => {
                    if (!cd) {
                      return <div key={`empty-${index}`} style={{ height: '42px' }} />;
                    }

                    const isDisabled = cd.isSunday || cd.isPast;
                    const isSelected = selectedDate === cd.dateString;

                    return (
                      <button
                        key={cd.dateString}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => handleDateSelect(cd.dateString)}
                        style={{
                          height: '42px',
                          minHeight: '42px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.875rem',
                          fontWeight: isSelected ? 600 : 400,
                          backgroundColor: isSelected
                            ? 'var(--color-espresso)'
                            : isDisabled
                            ? 'transparent'
                            : 'var(--color-surface-subtle)',
                          color: isSelected
                            ? 'var(--color-ivory)'
                            : isDisabled
                            ? '#C5BBB5'
                            : 'var(--color-espresso)',
                          border: isSelected
                            ? '1px solid var(--color-espresso)'
                            : '1px solid var(--color-border-subtle)',
                          cursor: isDisabled ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {cd.dayNumber}
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots Grid */}
                <div>
                  <h4 style={{ fontSize: '0.925rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={16} style={{ color: 'var(--color-rose)' }} />
                    Available Slots for {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(95px, 1fr))', gap: '0.5rem' }}>
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          style={{
                            padding: '0.7rem 0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.8rem',
                            fontWeight: isSelected ? 600 : 500,
                            textAlign: 'center',
                            border: '1px solid',
                            borderColor: isSelected ? 'var(--color-rose)' : 'var(--color-border)',
                            backgroundColor: isSelected ? 'var(--color-rose)' : 'var(--color-surface)',
                            color: isSelected ? '#FFFFFF' : 'var(--color-espresso)',
                            cursor: 'pointer',
                            transition: 'all var(--transition-fast)'
                          }}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step Action Buttons */}
                <div style={{
                  marginTop: '2.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <button type="button" onClick={handlePrevStep} className="btn btn-secondary" style={{ flex: '1 1 120px' }}>
                    ← Back
                  </button>
                  <button type="button" onClick={handleNextStep} className="btn btn-primary" style={{ flex: '2 1 200px' }}>
                    Next: Your Details →
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* STEP 3: YOUR INFORMATION & MARKETING CONSENT */}
            {/* ============================================================== */}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>3. Your Information</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', marginBottom: '1.5rem' }}>
                  Please provide your contact details for appointment reminders and confirmation receipts.
                </p>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Ayishat Adeleke"
                    value={clientDetails.fullName}
                    onChange={(e) => setClientDetails({ ...clientDetails, fullName: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                  {formErrors.fullName && <span className="form-error">{formErrors.fullName}</span>}
                </div>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="e.g. name@example.com"
                    value={clientDetails.email}
                    onChange={(e) => setClientDetails({ ...clientDetails, email: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                  {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                </div>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    className="form-input"
                    placeholder="e.g. 07733777956 or +44 7..."
                    value={clientDetails.phone}
                    onChange={(e) => setClientDetails({ ...clientDetails, phone: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                  {formErrors.phone && <span className="form-error">{formErrors.phone}</span>}
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" htmlFor="notes">Notes / Style Preferences (Optional)</label>
                  <textarea
                    id="notes"
                    className="form-textarea"
                    rows={3}
                    placeholder="e.g. Natural cat-eye mapping, length 12-14mm, or sensitive eyes"
                    value={clientDetails.notes}
                    onChange={(e) => setClientDetails({ ...clientDetails, notes: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>

                {/* EXACT USER-REQUESTED: Marketing Consent Form */}
                <div style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.25rem',
                  border: '1px solid var(--color-border)',
                  marginBottom: '1.5rem'
                }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.4rem', color: 'var(--color-espresso)' }}>
                    Marketing Consent Form
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', marginBottom: '1rem', lineHeight: 1.5 }}>
                    By selecting “Yes”, you agree to receive marketing emails from Sandy Beauty Haven. You can unsubscribe at any time.
                  </p>

                  <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-espresso)' }}>
                    Do you want to receive offers, updates, and promotions from Sandy Beauty Haven?
                  </div>

                  <div style={{ display: 'flex', gap: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                      <input
                        type="radio"
                        name="marketingConsent"
                        checked={clientDetails.marketingConsent === 'yes'}
                        onChange={() => setClientDetails({ ...clientDetails, marketingConsent: 'yes' })}
                      />
                      <span>Yes</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                      <input
                        type="radio"
                        name="marketingConsent"
                        checked={clientDetails.marketingConsent === 'no'}
                        onChange={() => setClientDetails({ ...clientDetails, marketingConsent: 'no' })}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                {/* Terms & Conditions Agreement */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.85rem'
                }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={clientDetails.agreeToPolicies}
                      onChange={(e) => setClientDetails({ ...clientDetails, agreeToPolicies: e.target.checked })}
                      style={{ marginTop: '3px', flexShrink: 0 }}
                    />
                    <span style={{ lineHeight: 1.5 }}>
                      I have read, understood, and agree to the <strong>Terms & Conditions</strong>, including the non-refundable deposit and <strong>48-hour cancellation policy</strong>. *
                    </span>
                  </label>
                  {formErrors.agreeToPolicies && <span className="form-error">{formErrors.agreeToPolicies}</span>}

                  {/* Toggle to read 11 Terms right here */}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(!showTermsModal)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-rose)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: 0,
                      alignSelf: 'flex-start'
                    }}
                  >
                    {showTermsModal ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {showTermsModal ? 'Hide Terms & Conditions' : 'View the 11 Terms & Conditions'}
                  </button>

                  {/* Expandable Terms Box */}
                  {showTermsModal && (
                    <div style={{
                      backgroundColor: 'var(--color-surface-subtle)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1rem',
                      maxHeight: '260px',
                      overflowY: 'auto',
                      fontSize: '0.8rem',
                      lineHeight: 1.6,
                      color: 'var(--color-taupe)'
                    }}>
                      <strong style={{ color: 'var(--color-espresso)', display: 'block', marginBottom: '0.5rem' }}>
                        SANDY BEAUTY HAVEN – TERMS & CONDITIONS
                      </strong>
                      <p><strong>1. Appointments & Deposits:</strong> Non-refundable deposit deducted from total cost. Not confirmed until deposit paid.</p>
                      <p><strong>2. Cancellations & Rescheduling:</strong> At least 48 hours notice required. Under 48 hours forfeits deposit. Same-day cancellation / no-show charged 100%.</p>
                      <p><strong>3. Late Arrivals:</strong> 10-minute grace window. After 10 mins, appointment may be cancelled and deposit forfeited.</p>
                      <p><strong>4. No-Shows:</strong> Required to pay in full upfront for any future bookings.</p>
                      <p><strong>5. Refills & Foreign Work:</strong> Refills only on Sandy Beauty Haven work. Foreign sets charged as removal + full set.</p>
                      <p><strong>6. Refund Policy:</strong> No refunds. Complimentary fixes assessed if reported within 48h and booked within 3 days.</p>
                      <p><strong>7. Patch Tests & Allergies:</strong> Client responsibility to disclose allergies/eye conditions.</p>
                      <p><strong>8. Aftercare & Responsibility:</strong> Proper aftercare must be followed. Not responsible for retention affected by oils, hormones, medication, rubbing.</p>
                      <p><strong>9. Children, Guests & Phones:</strong> No extra guests or children allowed unless agreed beforehand.</p>
                      <p><strong>10. Right to Refuse Service:</strong> Inappropriate behavior, unsafe contraindications, or repeated no-shows.</p>
                      <p><strong>11. Agreement:</strong> By booking, you confirm you have read and agreed to all policies above.</p>
                    </div>
                  )}
                </div>

                {/* Step Action Buttons */}
                <div style={{
                  marginTop: '2.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <button type="button" onClick={handlePrevStep} className="btn btn-secondary" style={{ flex: '1 1 120px' }}>
                    ← Back
                  </button>
                  <button type="button" onClick={handleNextStep} className="btn btn-primary" style={{ flex: '2 1 200px' }}>
                    Next: Review & Payment →
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* STEP 4: ACUITY PAYMENT & ORDER SUMMARY EXPERIENCE */}
            {/* ============================================================== */}
            {step === 4 && (
              <div>
                {/* Brand Logo & Title (as seen in Acuity screenshot) */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <img
                    src="/sandy logo.png"
                    alt="Sandy Beauty Haven"
                    style={{
                      width: '84px',
                      height: '84px',
                      objectFit: 'contain',
                      margin: '0 auto 0.65rem',
                      display: 'block'
                    }}
                  />
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#111827',
                    fontWeight: 600
                  }}>
                    SANDY BEAUTY HAVEN
                  </div>
                </div>

                <form onSubmit={handleCompletePayment}>
                  {/* Section 1: Payment information Card */}
                  <div style={{ marginBottom: '1.75rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem' }}>
                      Payment information
                    </h3>

                    <div style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '4px',
                      padding: 'clamp(1rem, 3.5vw, 1.25rem)',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                    }}>
                      {/* Top Row: Credit or debit card + Card Logos */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.25rem',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1F2937' }}>
                          Credit or debit card
                        </span>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                          <VisaIcon />
                          <AmexIcon />
                          <DiscoverIcon />
                          <MastercardIcon />
                        </div>
                      </div>

                      {/* First name */}
                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                          First name *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardFirstName}
                          onChange={(e) => setCardFirstName(e.target.value)}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '0.75rem 0.85rem',
                            border: '1px solid #D1D5DB',
                            borderRadius: '4px',
                            backgroundColor: '#F9FAFB',
                            fontSize: '0.9rem',
                            color: '#111827',
                            outline: 'none'
                          }}
                        />
                      </div>

                      {/* Last name */}
                      <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                          Last name *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardLastName}
                          onChange={(e) => setCardLastName(e.target.value)}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '0.75rem 0.85rem',
                            border: '1px solid #D1D5DB',
                            borderRadius: '4px',
                            backgroundColor: '#F9FAFB',
                            fontSize: '0.9rem',
                            color: '#111827',
                            outline: 'none'
                          }}
                        />
                      </div>

                      {/* Card details */}
                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#374151', marginBottom: '0.45rem' }}>
                          Card details *
                        </label>

                        {/* Segmented method toggle: Card / Google Pay */}
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
                          <button
                            type="button"
                            onClick={() => setCardSubMethod('card')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.45rem',
                              padding: '0.65rem 1.1rem',
                              borderRadius: '4px',
                              border: '1px solid #D1D5DB',
                              backgroundColor: cardSubMethod === 'card' ? '#E5E7EB' : '#FFFFFF',
                              color: '#111827',
                              fontWeight: 600,
                              fontSize: '0.825rem',
                              cursor: 'pointer'
                            }}
                          >
                            <CreditCard size={14} />
                            Card
                          </button>
                          <button
                            type="button"
                            onClick={() => setCardSubMethod('gpay')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.45rem',
                              padding: '0.65rem 1.1rem',
                              borderRadius: '4px',
                              border: '1px solid #D1D5DB',
                              backgroundColor: cardSubMethod === 'gpay' ? '#E5E7EB' : '#FFFFFF',
                              color: '#111827',
                              fontWeight: 600,
                              fontSize: '0.825rem',
                              cursor: 'pointer'
                            }}
                          >
                            <span style={{ fontWeight: 800, color: '#4285F4' }}>G</span>
                            <span>Pay</span>
                            <span style={{ color: '#6B7280', fontWeight: 500 }}>Google Pay</span>
                          </button>
                        </div>

                        {cardSubMethod === 'card' ? (
                          <>
                            {/* Card number input with brand icon */}
                            <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                              <input
                                type="text"
                                required
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="1234 1234 1234 1234"
                                style={{
                                  width: '100%',
                                  boxSizing: 'border-box',
                                  padding: '0.75rem 3.5rem 0.75rem 0.85rem',
                                  border: '1px solid #D1D5DB',
                                  borderRadius: '4px',
                                  backgroundColor: '#FFFFFF',
                                  fontSize: '0.9rem',
                                  color: '#111827',
                                  outline: 'none'
                                }}
                              />
                              <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                                <DiscoverIcon />
                              </div>
                            </div>

                            {/* Expiry & CVC row */}
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr',
                              gap: '0.75rem',
                              marginBottom: '0.75rem'
                            }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.775rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                                  Expiration date
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={cardExpiry}
                                  onChange={(e) => setCardExpiry(e.target.value)}
                                  placeholder="MM / YY"
                                  style={{
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    padding: '0.75rem 0.85rem',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '4px',
                                    backgroundColor: '#FFFFFF',
                                    fontSize: '0.9rem',
                                    color: '#111827',
                                    outline: 'none'
                                  }}
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.775rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                                  Security code
                                </label>
                                <div style={{ position: 'relative' }}>
                                  <input
                                    type="text"
                                    required
                                    value={cardCvc}
                                    onChange={(e) => setCardCvc(e.target.value)}
                                    placeholder="CVC"
                                    style={{
                                      width: '100%',
                                      boxSizing: 'border-box',
                                      padding: '0.75rem 2.5rem 0.75rem 0.85rem',
                                      border: '1px solid #D1D5DB',
                                      borderRadius: '4px',
                                      backgroundColor: '#FFFFFF',
                                      fontSize: '0.9rem',
                                      color: '#111827',
                                      outline: 'none'
                                    }}
                                  />
                                  <CreditCard size={15} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                                </div>
                              </div>
                            </div>

                            {/* Country dropdown */}
                            <div>
                              <label style={{ display: 'block', fontSize: '0.775rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                                Country
                              </label>
                              <select
                                value={cardCountry}
                                onChange={(e) => setCardCountry(e.target.value)}
                                style={{
                                  width: '100%',
                                  boxSizing: 'border-box',
                                  padding: '0.75rem 0.85rem',
                                  border: '1px solid #D1D5DB',
                                  borderRadius: '4px',
                                  backgroundColor: '#FFFFFF',
                                  fontSize: '0.9rem',
                                  color: '#111827',
                                  outline: 'none',
                                  cursor: 'pointer'
                                }}
                              >
                                {COUNTRIES.map((c) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                            </div>
                          </>
                        ) : (
                          <div style={{
                            padding: '1.25rem',
                            backgroundColor: '#F9FAFB',
                            borderRadius: '4px',
                            border: '1px dashed #D1D5DB',
                            textAlign: 'center',
                            fontSize: '0.85rem',
                            color: '#4B5563'
                          }}>
                            Google Pay biometric authentication will be prompted when you click <strong>Pay & Confirm</strong>.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Choose what to pay (Exact match of Acuity screenshot) */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem' }}>
                      Choose what to pay
                    </h3>

                    <div style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      {/* Option 1: Pay Full */}
                      <label
                        onClick={() => setPaymentChoice('full')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.85rem',
                          padding: '1.15rem 1rem',
                          cursor: 'pointer',
                          backgroundColor: paymentChoice === 'full' ? '#FAF5F7' : '#FFFFFF',
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: paymentChoice === 'full' ? '6px solid #4B5563' : '2px solid #D1D5DB',
                          backgroundColor: '#FFFFFF',
                          flexShrink: 0
                        }} />
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>
                          Pay £{orderTotal.toFixed(2)} now
                        </span>
                      </label>

                      <div style={{ height: '1px', backgroundColor: '#E5E7EB' }} />

                      {/* Option 2: Pay Deposit */}
                      <label
                        onClick={() => setPaymentChoice('deposit')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.85rem',
                          padding: '1.15rem 1rem',
                          cursor: 'pointer',
                          backgroundColor: paymentChoice === 'deposit' ? '#FAF5F7' : '#FFFFFF',
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: paymentChoice === 'deposit' ? '6px solid #4B5563' : '2px solid #D1D5DB',
                          backgroundColor: '#FFFFFF',
                          flexShrink: 0
                        }} />
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#374151' }}>
                          Pay £{depositNowDisplay.toFixed(2)} now, £{remainingLaterDisplay.toFixed(2)} later
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Section 3: Order summary (Exact match of Acuity screenshot) */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', marginBottom: '0.85rem' }}>
                      Order summary
                    </h3>

                    {/* Service Line Items */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      {selectedServices.map((svc) => (
                        <div key={svc.id} style={{ marginBottom: '0.85rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827' }}>
                              {svc.name}
                            </span>
                            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827' }}>
                              £{svc.price.toFixed(2)}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '0.2rem' }}>
                            {formatAcuityDateTime(selectedDate, selectedTime)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ height: '1px', backgroundColor: '#E5E7EB', marginBottom: '1.25rem' }} />

                    {/* Package, gift, or coupon code */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <button
                        type="button"
                        onClick={() => setShowCouponInput(!showCouponInput)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#374151' }}>
                          Package, gift, or coupon code
                        </span>
                        <span style={{ fontSize: '1.2rem', color: '#374151', fontWeight: 600 }}>
                          {showCouponInput ? '−' : '+'}
                        </span>
                      </button>

                      {showCouponInput && (
                        <div style={{ marginTop: '0.75rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                              type="text"
                              placeholder="e.g. WELCOME10"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              style={{
                                flex: 1,
                                padding: '0.65rem 0.85rem',
                                border: '1px solid #D1D5DB',
                                borderRadius: '4px',
                                fontSize: '0.85rem'
                              }}
                            />
                            <button
                              type="button"
                              onClick={handleApplyCoupon}
                              style={{
                                padding: '0.65rem 1.15rem',
                                backgroundColor: '#374151',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              Apply
                            </button>
                          </div>
                          {couponError && (
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-error)', marginTop: '0.35rem' }}>
                              {couponError}
                            </p>
                          )}
                          {couponDiscount > 0 && (
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-success)', marginTop: '0.35rem', fontWeight: 600 }}>
                              ✓ Code applied! £{couponDiscount.toFixed(2)} discount deducted.
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div style={{ height: '1px', backgroundColor: '#E5E7EB', marginBottom: '1.25rem' }} />

                    {/* Subtotal & Tip */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>
                        <span>Subtotal</span>
                        <span>£{subtotalAfterDiscount.toFixed(2)}</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>
                        <span>Tip</span>
                        <span>£{tipAmount.toFixed(2)}</span>
                      </div>

                      {/* Tip Buttons Row */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '0.35rem',
                        marginTop: '0.25rem'
                      }}>
                        {[
                          { id: 0, label: '0%' },
                          { id: 15, label: '15%' },
                          { id: 18, label: '18%' },
                          { id: 20, label: '20%' },
                          { id: 'custom', label: 'CUSTOM' }
                        ].map((tipOpt) => {
                          const isActive = activeTipOption === tipOpt.id;
                          return (
                            <button
                              key={tipOpt.label}
                              type="button"
                              onClick={() => {
                                setActiveTipOption(tipOpt.id as any);
                                if (tipOpt.id !== 'custom') setCustomTipInput('');
                              }}
                              style={{
                                padding: '0.7rem 0.2rem',
                                borderRadius: '4px',
                                border: isActive ? '1px solid #D85A87' : '1px solid #E5E7EB',
                                backgroundColor: isActive ? '#D85A87' : '#FFFFFF',
                                color: isActive ? '#FFFFFF' : '#374151',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {tipOpt.label}
                            </button>
                          );
                        })}
                      </div>

                      {activeTipOption === 'custom' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>£</span>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            placeholder="Custom tip amount"
                            value={customTipInput}
                            onChange={(e) => setCustomTipInput(e.target.value)}
                            style={{
                              padding: '0.5rem 0.75rem',
                              borderRadius: '4px',
                              border: '1px solid #D1D5DB',
                              fontSize: '0.85rem',
                              width: '140px'
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div style={{ height: '1px', backgroundColor: '#E5E7EB', marginBottom: '1.25rem' }} />

                    {/* Total */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginBottom: '1.75rem' }}>
                      <span>Total</span>
                      <span>£{orderTotal.toFixed(2)}</span>
                    </div>

                    {/* PAY & CONFIRM Button (Acuity Hot Pink) */}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      style={{
                        width: '100%',
                        padding: '1.15rem 1rem',
                        backgroundColor: '#D85A87',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 14px rgba(216, 90, 135, 0.32)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isProcessing ? 'Processing Payment...' : 'PAY & CONFIRM'}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#6B7280',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
                        ← Edit appointment details
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Live Booking Summary Tray / Sidebar (Shown on Steps 1, 2, 3 only) */}
          {step !== 4 && (
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'clamp(1.25rem, 3vw, 1.75rem)',
              boxShadow: 'var(--shadow-subtle)',
              position: 'sticky',
              top: '90px',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <h3 style={{
                fontSize: '1.15rem',
                marginBottom: '1rem',
                borderBottom: '1px solid var(--color-border)',
                paddingBottom: '0.65rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>Booking Summary</span>
                <span className="badge badge-rose">{selectedServices.length} items</span>
              </h3>

              {/* Selected Services in Cart */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                {selectedServices.map((svc) => (
                  <div key={svc.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <img
                      src={svc.image}
                      alt={svc.name}
                      style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ margin: 0, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {svc.name}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-taupe)' }}>
                        {svc.duration} mins • £{svc.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Date, Time, Staff */}
              <div style={{
                padding: '0.85rem',
                backgroundColor: 'var(--color-surface-subtle)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.25rem',
                fontSize: '0.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CalendarIcon size={14} style={{ color: 'var(--color-rose)' }} />
                  <span>
                    <strong>Date:</strong> {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={14} style={{ color: 'var(--color-rose)' }} />
                  <span>
                    <strong>Time:</strong> {selectedTime} ({totalDuration} mins total)
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={14} style={{ color: 'var(--color-rose)' }} />
                  <span>
                    <strong>Artist:</strong> {selectedStaff}
                  </span>
                </div>
              </div>

              {/* Location */}
              <div style={{ fontSize: '0.775rem', color: 'var(--color-taupe)', marginBottom: '1.25rem' }}>
                <strong>Studio Location:</strong> 101 Easter Road, Edinburgh, EH7 5PP
              </div>

              {/* Financial Breakdown */}
              <div style={{
                borderTop: '1px solid var(--color-border)',
                paddingTop: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.45rem',
                fontSize: '0.85rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total Treatment Value:</span>
                  <span style={{ fontWeight: 600 }}>£{totalPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-rose)', fontWeight: 600 }}>
                  <span>Deposit Due Online:</span>
                  <span>£{totalDeposit}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-taupe)' }}>
                  <span>Remaining on Arrival:</span>
                  <span>£{Math.max(0, totalPrice - totalDeposit)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
