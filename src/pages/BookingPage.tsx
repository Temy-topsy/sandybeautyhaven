import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  Trash2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import { StripePaymentWrapper } from '../components/booking/StripePaymentForm';

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
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    clientDetails,
    setClientDetails,
    completeBooking
  } = useBooking();

  const { showToast } = useToast();

  const [step, setStep] = useState<number>(1);
  const [bookingCategory, setBookingCategory] = useState<string>('All');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleToggleService = (s: (typeof SERVICES)[0]) => {
    const alreadySelected = isServiceSelected(s.id);
    toggleService(s);
    if (alreadySelected) {
      showToast(`Removed "${s.name}" from appointment cart`);
    } else {
      showToast(`Added "${s.name}" to appointment cart`);
    }
  };

  // Step 4 State matching Acuity Scheduling exactly
  const [paymentChoice, setPaymentChoice] = useState<'full' | 'deposit'>('full');
  const [activeTipOption, setActiveTipOption] = useState<number | 'custom'>(18);
  const [customTipInput, setCustomTipInput] = useState<string>('');
  const [showCouponInput, setShowCouponInput] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>('');

  // Calendar calculations
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Live available dates from Acuity Scheduling
  const [liveAvailableDates, setLiveAvailableDates] = useState<string[] | null>(null);

  const monthParam = useMemo(() => {
    const mStr = String(month + 1).padStart(2, '0');
    return `${year}-${mStr}`;
  }, [year, month]);

  useEffect(() => {
    let isCancelled = false;
    const fetchDates = async () => {
      try {
        const appointmentTypeId = selectedServices[0]?.id || 69886073;
        const res = await fetch(`/api/acuity?action=dates&month=${monthParam}&appointmentTypeID=${appointmentTypeId}`);
        if (res.ok) {
          const data = await res.json();
          if (!isCancelled && data.dates && Array.isArray(data.dates)) {
            const dateStrings = data.dates.map((d: any) => d.date);
            setLiveAvailableDates(dateStrings);
            if (data.source) setAvailabilitySource(data.source);
            // If currently selected date is not in the live available dates, auto-select first available
            if (dateStrings.length > 0 && (!selectedDate || !dateStrings.includes(selectedDate))) {
              setSelectedDate(dateStrings[0]);
            }
            return;
          }
        }
      } catch (err) {
        console.warn('Could not fetch Acuity dates', err);
      }
    };
    fetchDates();
    return () => {
      isCancelled = true;
    };
  }, [monthParam, selectedServices, selectedDate, setSelectedDate]);

  // Generate date slots for current month
  const calendarDays = useMemo(() => {
    const days: Array<{ dayNumber: number; dateString: string; isSunday: boolean; isPast: boolean; isAvailable: boolean } | null> = [];

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
      const isAvailable = liveAvailableDates
        ? liveAvailableDates.includes(dateString)
        : (!isSunday && !isPast);

      days.push({
        dayNumber: d,
        dateString,
        isSunday,
        isPast,
        isAvailable
      });
    }

    return days;
  }, [year, month, firstDayOfMonth, daysInMonth, liveAvailableDates]);

  // Dynamic available appointment slots from Acuity Scheduling
  const [dynamicTimes, setDynamicTimes] = useState<string[]>([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState<boolean>(false);
  const [availabilitySource, setAvailabilitySource] = useState<'acuity-live' | 'studio-calendar'>('studio-calendar');

  const defaultTimes = useMemo(() => [
    '09:30 AM',
    '11:00 AM',
    '12:30 PM',
    '02:00 PM',
    '03:30 PM',
    '04:45 PM'
  ], []);

  useEffect(() => {
    let isCancelled = false;
    const fetchSlots = async () => {
      if (!selectedDate) return;
      setIsLoadingTimes(true);
      try {
        const appointmentTypeId = selectedServices[0]?.id || 69886073;
        const res = await fetch(`/api/acuity?action=times&date=${selectedDate}&appointmentTypeID=${appointmentTypeId}`);
        if (res.ok) {
          const data = await res.json();
          if (!isCancelled && data.times && Array.isArray(data.times) && data.times.length > 0) {
            setDynamicTimes(data.times.map((t: any) => t.label || t.time));
            if (data.source) setAvailabilitySource(data.source);
            return;
          }
        }
      } catch (err) {
        console.warn('Could not fetch Acuity slots, using studio calendar slots', err);
      } finally {
        if (!isCancelled) setIsLoadingTimes(false);
      }
      if (!isCancelled) {
        setDynamicTimes(defaultTimes);
      }
    };

    fetchSlots();
    return () => {
      isCancelled = true;
    };
  }, [selectedDate, selectedServices, defaultTimes]);

  const timeSlots = dynamicTimes.length > 0 ? dynamicTimes : defaultTimes;

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

  // Stripe Payment State & Intent Generation
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  const amountToCharge = paymentChoice === 'full'
    ? orderTotal
    : (depositNowDisplay + (paymentChoice === 'deposit' ? tipAmount : 0));

  useEffect(() => {
    if (step !== 4) return;

    let isMounted = true;
    setStripeLoading(true);
    setStripeError(null);

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amountToCharge,
        currency: 'gbp',
        bookingDetails: {
          serviceName: selectedServices.map((s) => s.name).join(', '),
          date: selectedDate || '',
          time: selectedTime || '',
          paymentChoice,
          depositAmount: depositNowDisplay,
          remainingBalance: remainingLaterDisplay,
        },
        customer: {
          fullName: clientDetails.fullName,
          email: clientDetails.email,
          phone: clientDetails.phone,
        },
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to initialize payment session');
        }
        if (isMounted) {
          setClientSecret(data.clientSecret);
          setStripeLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Stripe init error:', err);
          setStripeError(err.message);
          setStripeLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [step, paymentChoice, tipAmount, orderTotal, depositNowDisplay, remainingLaterDisplay]);

  const handleStripeSuccess = (paymentIntentId: string) => {
    setIsProcessing(true);
    const amountPaid = amountToCharge;
    const remainingBalance = paymentChoice === 'full' ? 0 : remainingLaterDisplay;

    const confirmed = completeBooking({
      paymentChoice,
      amountPaid,
      remainingBalance,
      tip: tipAmount,
      paymentIntentId,
    });

    // Send automated email confirmation via Resend
    fetch('/api/send-booking-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reference: confirmed?.reference || `SBH-${Date.now()}`,
        serviceName: selectedServices.map((s) => s.name).join(', '),
        date: selectedDate || '',
        time: selectedTime || '',
        clientName: clientDetails.fullName,
        clientEmail: clientDetails.email,
        clientPhone: clientDetails.phone,
        totalPrice: orderTotal,
        amountPaid,
        remainingBalance,
        paymentChoice,
        tip: tipAmount,
        notes: clientDetails.notes,
      }),
    }).catch((err) => {
      console.error('Email confirmation trigger error:', err);
    });

    // Helper to format 12-hour AM/PM time into ISO format for Acuity Scheduling
    const formatAcuityDateTime = (dateStr: string, timeStr: string) => {
      if (!dateStr) return '';
      const match = (timeStr || '').match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
      if (!match) return `${dateStr}T11:00:00`;
      let hour = parseInt(match[1], 10);
      const minutes = match[2];
      const ampm = (match[3] || '').toUpperCase();
      if (ampm === 'PM' && hour < 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;
      const hourStr = String(hour).padStart(2, '0');
      return `${dateStr}T${hourStr}:${minutes}:00`;
    };

    // Synchronize confirmed booking directly to Acuity Scheduling calendar
    fetch('/api/acuity?action=book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appointmentTypeID: selectedServices[0]?.id || 69886073,
        datetime: formatAcuityDateTime(selectedDate, selectedTime),
        firstName: clientDetails.fullName.split(' ')[0] || 'Client',
        lastName: clientDetails.fullName.split(' ').slice(1).join(' ') || '',
        email: clientDetails.email,
        phone: clientDetails.phone,
        notes: clientDetails.notes,
        reference: confirmed?.reference || `SBH-${Date.now()}`,
        totalPrice: orderTotal,
        depositPaid: amountPaid,
        remainingBalance: remainingBalance
      })
    }).catch((err) => {
      console.warn('Acuity calendar sync error:', err);
    });

    setIsProcessing(false);
    navigate('/booking-confirmed');
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
              <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', margin: 0 }}>
                Schedule Your Appointment
              </h1>
            </div>

            {/* Selected items quick badge with smooth bounce */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              backgroundColor: 'var(--color-surface-subtle)',
              padding: '0.65rem 1.15rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              fontSize: '0.85rem',
              boxShadow: 'var(--shadow-subtle)',
              transition: 'all var(--transition-fast)'
            }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <ShoppingBag size={18} style={{ color: 'var(--color-rose)' }} />
                {selectedServices.length > 0 && (
                  <span
                    className="cart-bounce"
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-8px',
                      backgroundColor: 'var(--color-rose)',
                      color: '#FFFFFF',
                      borderRadius: '50%',
                      width: '16px',
                      height: '16px',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1
                    }}
                  >
                    {selectedServices.length}
                  </span>
                )}
              </div>
              <span style={{ fontWeight: 600, color: 'var(--color-espresso)' }}>
                {selectedServices.length} Treatment{selectedServices.length !== 1 ? 's' : ''} in Cart
              </span>
              <span style={{ color: 'var(--color-taupe)' }}>•</span>
              <span style={{ color: 'var(--color-rose)', fontWeight: 700 }}>Total: £{totalPrice}</span>
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
                      color: isCompleted ? '#FFFFFF' : isCurrent ? 'var(--color-ivory)' : 'var(--color-taupe)',
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

      <div className="container" style={{ maxWidth: step === 4 ? '560px' : step === 1 ? '780px' : '1000px', paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)', transition: 'max-width 0.3s ease' }}>
        <div style={{
          display: step === 4 || step === 1 ? 'block' : 'grid',
          gridTemplateColumns: step === 4 || step === 1 ? 'none' : 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
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
            {/* STEP 1: STREAMLINED SELECTION & ADD-ONS */}
            {/* ============================================================== */}
            {step === 1 && (
              <div>
                {selectedServices.length > 0 ? (
                  <>
                    {/* Top: Selected Treatments */}
                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                        <div>
                          <h2 style={{ fontSize: '1.25rem', margin: '0.2rem 0 0 0' }}>Confirm Your Selection</h2>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                        {selectedServices.map((svc) => (
                          <div
                            key={svc.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '1rem 1.15rem',
                              backgroundColor: 'var(--color-blush-light)',
                              border: '1.5px solid var(--color-rose)',
                              borderRadius: 'var(--radius-sm)',
                              gap: '1rem'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0 }}>
                              <img
                                src={svc.image}
                                alt={svc.name}
                                style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }}
                              />
                              <div style={{ minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                                  <span style={{ fontWeight: 700, fontSize: '0.975rem', color: 'var(--color-espresso)' }}>{svc.name}</span>
                                  <span className="badge" style={{ fontSize: '0.675rem' }}>{svc.category}</span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                  <span>{svc.duration} mins</span>
                                  <span>•</span>
                                  <span>Deposit: £{svc.deposit}</span>
                                </div>
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
                              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                                £{svc.price}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  removeService(svc.id);
                                  showToast(`Removed "${svc.name}"`);
                                }}
                                title="Remove treatment"
                                style={{
                                  background: 'none',
                                  border: '1px solid var(--color-border)',
                                  borderRadius: 'var(--radius-sm)',
                                  padding: '0.4rem',
                                  cursor: 'pointer',
                                  color: 'var(--color-taupe)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'all var(--transition-fast)'
                                }}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Integrated Booking Action & Summary Box */}
                      <div style={{
                        backgroundColor: 'var(--color-surface-subtle)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.15rem'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                          <div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', display: 'block' }}>Estimated Total:</span>
                            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-espresso)' }}>
                              £{totalPrice}
                            </span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', display: 'block' }}>Deposit Due Today:</span>
                            <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-rose)' }}>
                              £{totalDeposit}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="btn btn-primary"
                          style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', letterSpacing: '0.04em' }}
                        >
                          Next: Choose Date & Time ({selectedServices.length}) →
                        </button>
                      </div>
                    </div>

                    {/* Bottom Section: Add Extra Services (Optional) */}
                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.75rem' }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.15rem', margin: '0 0 0.25rem 0' }}>Add Extra Treatments (Optional)</h3>
                      </div>

                      {/* Category Tabs */}
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
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
                                padding: '0.4rem 0.85rem',
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

                      {/* Additional Services List (Compact Add-on Cards) */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '380px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                        {displayedServices
                          .filter((s) => !isServiceSelected(s.id))
                          .map((s) => (
                            <div
                              key={s.id}
                              style={{
                                padding: '0.85rem 1rem',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--color-border)',
                                backgroundColor: 'var(--color-surface)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '0.75rem'
                              }}
                            >
                              <div style={{ minWidth: 0, flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                                  <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-espresso)' }}>{s.name}</span>
                                  <span className="badge" style={{ fontSize: '0.65rem' }}>{s.category}</span>
                                </div>
                                <div style={{ fontSize: '0.775rem', color: 'var(--color-taupe)' }}>
                                  {s.duration} mins • Deposit: £{s.deposit}
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                                  £{s.price}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleToggleService(s)}
                                  style={{
                                    padding: '0.4rem 0.75rem',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--color-espresso)',
                                    backgroundColor: 'var(--color-surface)',
                                    color: 'var(--color-espresso)',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    transition: 'all var(--transition-fast)'
                                  }}
                                >
                                  <Plus size={13} />
                                  Add
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Zero selection state */}
                    <h2 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>1. Choose Your Treatment</h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', marginBottom: '1.5rem' }}>
                      Select a service below to schedule your appointment at Sandy Beauty Haven.
                    </p>

                    {/* Category Tabs */}
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      overflowX: 'auto',
                      paddingBottom: '0.5rem',
                      marginBottom: '1.25rem',
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
                              padding: '0.45rem 1rem',
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

                    {/* Services List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '520px', overflowY: 'auto', paddingRight: '0.35rem' }}>
                      {displayedServices.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => handleToggleService(s)}
                          style={{
                            padding: '1.05rem 1.25rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            backgroundColor: 'var(--color-surface)',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '1rem',
                            transition: 'all var(--transition-fast)'
                          }}
                        >
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                              <span style={{ fontWeight: 600, fontSize: '0.925rem', color: 'var(--color-espresso)' }}>{s.name}</span>
                              <span className="badge" style={{ fontSize: '0.675rem' }}>{s.category}</span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                              <span>{s.duration} mins</span>
                              <span>•</span>
                              <span>Deposit: £{s.deposit}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                                £{s.price}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleService(s);
                              }}
                              className="btn btn-primary"
                              style={{ padding: '0.45rem 0.95rem', fontSize: '0.75rem' }}
                            >
                              Select Treatment
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ============================================================== */}
            {/* STEP 2: DATE & TIME */}
            {/* ============================================================== */}
            {step === 2 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.35rem', margin: '0 0 0.35rem 0' }}>2. Select Date & Time</h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', margin: 0 }}>
                      Operating hours: Monday to Saturday, 9:00 AM – 5:00 PM. Sundays closed.
                    </p>
                  </div>
                </div>

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
                  marginBottom: '1.75rem'
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

                    const isDisabled = cd.isPast || !cd.isAvailable;
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
                          fontSize: '0.85rem',
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.925rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={16} style={{ color: 'var(--color-rose)' }} />
                      Available Slots for {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </h4>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.725rem',
                      color: 'var(--color-taupe)',
                      backgroundColor: 'var(--color-surface)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--color-border)'
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#2E7D32',
                        display: 'inline-block'
                      }} />
                      {isLoadingTimes ? 'Syncing calendar...' : availabilitySource === 'acuity-live' ? 'Acuity Calendar Synced' : 'Live Studio Availability'}
                    </span>
                  </div>

                  {timeSlots.length === 0 ? (
                    <div style={{
                      padding: '1.5rem',
                      textAlign: 'center',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      color: 'var(--color-taupe)'
                    }}>
                      No slots available on this date. Please select another date on the calendar.
                    </div>
                  ) : (
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
                    <span style={{ lineHeight: 1.5, fontWeight: 600, color: 'var(--color-espresso)' }}>
                      I have read and agree to the terms above *
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
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-espresso)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.4rem' }}>
                          SANDY BEAUTY HAVEN – TERMS & CONDITIONS
                        </div>

                        <div>
                          <strong style={{ color: 'var(--color-espresso)' }}>1. Appointments & Deposits</strong>
                          <ul style={{ margin: '0.35rem 0 0 1.25rem', padding: 0 }}>
                            <li>All appointments require a non-refundable deposit to secure your booking.</li>
                            <li>Your deposit is deducted from the total cost of your treatment.</li>
                            <li>Appointments are not confirmed until the deposit has been paid.</li>
                          </ul>
                        </div>

                        <div>
                          <strong style={{ color: 'var(--color-espresso)' }}>2. Cancellations & Rescheduling</strong>
                          <ul style={{ margin: '0.35rem 0 0 1.25rem', padding: 0 }}>
                            <li>You must give at least 48 hours’ notice to cancel or reschedule your appointment.</li>
                            <li>Cancellations or reschedules made within 48 hours will forfeit your deposit.</li>
                            <li>Same-day cancellations or failure to attend will be charged 100% of the service cost.</li>
                          </ul>
                        </div>

                        <div>
                          <strong style={{ color: 'var(--color-espresso)' }}>3. Late Arrivals</strong>
                          <ul style={{ margin: '0.35rem 0 0 1.25rem', padding: 0 }}>
                            <li>Please arrive on time to your appointment.</li>
                            <li>If you are more than 10 minutes late, your appointment may be cancelled and your deposit forfeited.</li>
                            <li>If I am able to proceed, your treatment time may be shortened to avoid affecting the next client.</li>
                          </ul>
                        </div>

                        <div>
                          <strong style={{ color: 'var(--color-espresso)' }}>4. No-Shows</strong>
                          <ul style={{ margin: '0.35rem 0 0 1.25rem', padding: 0 }}>
                            <li>Failure to attend your appointment without notice is considered a no-show.</li>
                            <li>No-shows will be required to pay in full upfront for any future bookings.</li>
                          </ul>
                        </div>

                        <div>
                          <strong style={{ color: 'var(--color-espresso)' }}>5. Refills & Foreign Work</strong>
                          <ul style={{ margin: '0.35rem 0 0 1.25rem', padding: 0 }}>
                            <li>Refills are only accepted on work done by Sandy Beauty Haven unless otherwise agreed.</li>
                            <li>Lashes done by another technician will be charged as a full set or removal + full set.</li>
                            <li>You must book the correct service. If you book the wrong one, your appointment may be cancelled and deposit lost.</li>
                          </ul>
                        </div>

                        <div>
                          <strong style={{ color: 'var(--color-espresso)' }}>6. Refund Policy</strong>
                          <ul style={{ margin: '0.35rem 0 0 1.25rem', padding: 0 }}>
                            <li>No refunds are offered on any services.</li>
                            <li>If you are unhappy, please contact us within 48 hours and we will assess if a complimentary fix is appropriate.</li>
                            <li>Fixes are at the technician’s discretion and must be booked within 3 days.</li>
                          </ul>
                        </div>

                        <div>
                          <strong style={{ color: 'var(--color-espresso)' }}>7. Patch Tests & Allergies</strong>
                          <ul style={{ margin: '0.35rem 0 0 1.25rem', padding: 0 }}>
                            <li>It is your responsibility to inform us of any allergies, sensitivities, medical conditions, or eye conditions before your appointment.</li>
                            <li>Patch tests are recommended for new clients or those with sensitive skin.</li>
                            <li>Sandy Beauty Haven will not be held responsible for reactions where the client has failed to disclose relevant information.</li>
                          </ul>
                        </div>

                        <div>
                          <strong style={{ color: 'var(--color-espresso)' }}>8. Aftercare & Responsibility</strong>
                          <p style={{ margin: '0.35rem 0 0.25rem 0' }}>Proper aftercare instructions will be given and must be followed. We are not responsible for poor retention or issues caused by:</p>
                          <ul style={{ margin: '0 0 0 1.25rem', padding: 0 }}>
                            <li>Oily skin</li>
                            <li>Hormones</li>
                            <li>Medication</li>
                            <li>Sleeping habits</li>
                            <li>Not following aftercare</li>
                            <li>Picking or rubbing lashes</li>
                          </ul>
                        </div>

                        <div>
                          <strong style={{ color: 'var(--color-espresso)' }}>9. Children, Guests & Phones</strong>
                          <ul style={{ margin: '0.35rem 0 0 1.25rem', padding: 0 }}>
                            <li>No extra guests or children are allowed unless agreed beforehand.</li>
                            <li>Please keep phone use minimal during your treatment.</li>
                          </ul>
                        </div>

                        <div>
                          <strong style={{ color: 'var(--color-espresso)' }}>10. Right to Refuse Service</strong>
                          <p style={{ margin: '0.35rem 0 0.25rem 0' }}>Sandy Beauty Haven reserves the right to refuse service to anyone who:</p>
                          <ul style={{ margin: '0 0 0 1.25rem', padding: 0 }}>
                            <li>Is rude, aggressive, or inappropriate</li>
                            <li>Has contraindications making treatment unsafe</li>
                            <li>Repeatedly cancels, reschedules, or no-shows</li>
                          </ul>
                        </div>

                        <div>
                          <strong style={{ color: 'var(--color-espresso)' }}>11. Agreement</strong>
                          <p style={{ margin: '0.35rem 0 0.25rem 0' }}>By booking an appointment with Sandy Beauty Haven, you confirm that:</p>
                          <ul style={{ margin: '0 0 0 1.25rem', padding: 0 }}>
                            <li>You have read and understood these Terms & Conditions</li>
                            <li>You agree to all policies stated above</li>
                          </ul>
                        </div>
                      </div>
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
            {/* STEP 4: PAYMENT & ORDER SUMMARY */}
            {/* ============================================================== */}
            {step === 4 && (
              <div>
                {/* Brand Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <img
                    src="/sandy logo.png"
                    alt="Sandy Beauty Haven"
                    style={{
                      width: '76px',
                      height: '76px',
                      objectFit: 'contain',
                      margin: '0 auto',
                      display: 'block'
                    }}
                  />
                </div>

                <div>
                  {/* Section 1: Choose what to pay */}
                  <div style={{ marginBottom: '2.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h3 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.35rem',
                        color: 'var(--color-espresso)',
                        margin: 0,
                        fontWeight: 600
                      }}>
                        Choose What To Pay
                      </h3>
                      <span style={{ fontSize: '0.725rem', color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                        Tap Option to Select
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem'
                    }}>
                      {/* Option 1: Pay Full */}
                      <div
                        role="button"
                        tabIndex={0}
                        aria-pressed={paymentChoice === 'full'}
                        onClick={() => setPaymentChoice('full')}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setPaymentChoice('full');
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          padding: '1.25rem 1.25rem',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          border: paymentChoice === 'full' ? '2px solid var(--color-rose)' : '1px solid var(--color-border)',
                          backgroundColor: paymentChoice === 'full' ? 'var(--color-blush-light)' : 'var(--color-surface)',
                          boxShadow: paymentChoice === 'full' ? '0 4px 16px rgba(163, 111, 114, 0.16)' : 'none',
                          transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                          userSelect: 'none'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          {/* Tactile Radio Ring */}
                          <div style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            border: paymentChoice === 'full' ? '2px solid var(--color-rose)' : '2px solid var(--color-taupe-light)',
                            backgroundColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}>
                            {paymentChoice === 'full' && (
                              <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--color-rose)',
                                animation: 'toastSlideUp 0.18s ease'
                              }} />
                            )}
                          </div>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '0.975rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                                Pay in full now
                              </span>
                              <span style={{
                                fontSize: '0.675rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                                padding: '0.2rem 0.55rem',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: paymentChoice === 'full' ? 'var(--color-rose)' : 'var(--color-surface-subtle)',
                                color: paymentChoice === 'full' ? '#FFFFFF' : 'var(--color-taupe)',
                                transition: 'all 0.18s ease'
                              }}>
                                Zero Balance Later
                              </span>
                            </div>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: 'var(--color-taupe)', lineHeight: 1.4 }}>
                              Pay total amount today. Nothing left to pay at your appointment.
                            </p>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <span style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            color: paymentChoice === 'full' ? 'var(--color-rose)' : 'var(--color-espresso)'
                          }}>
                            £{orderTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Option 2: Pay Deposit */}
                      <div
                        role="button"
                        tabIndex={0}
                        aria-pressed={paymentChoice === 'deposit'}
                        onClick={() => setPaymentChoice('deposit')}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setPaymentChoice('deposit');
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          padding: '1.25rem 1.25rem',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          border: paymentChoice === 'deposit' ? '2px solid var(--color-rose)' : '1px solid var(--color-border)',
                          backgroundColor: paymentChoice === 'deposit' ? 'var(--color-blush-light)' : 'var(--color-surface)',
                          boxShadow: paymentChoice === 'deposit' ? '0 4px 16px rgba(163, 111, 114, 0.16)' : 'none',
                          transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                          userSelect: 'none'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          {/* Tactile Radio Ring */}
                          <div style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            border: paymentChoice === 'deposit' ? '2px solid var(--color-rose)' : '2px solid var(--color-taupe-light)',
                            backgroundColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}>
                            {paymentChoice === 'deposit' && (
                              <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--color-rose)',
                                animation: 'toastSlideUp 0.18s ease'
                              }} />
                            )}
                          </div>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '0.975rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                                Pay deposit now
                              </span>
                              <span style={{
                                fontSize: '0.675rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                                padding: '0.2rem 0.55rem',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: paymentChoice === 'deposit' ? 'var(--color-rose)' : 'var(--color-surface-subtle)',
                                color: paymentChoice === 'deposit' ? '#FFFFFF' : 'var(--color-taupe)',
                                transition: 'all 0.18s ease'
                              }}>
                                Secure Date
                              </span>
                            </div>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: 'var(--color-taupe)', lineHeight: 1.4 }}>
                              Pay £{depositNowDisplay.toFixed(2)} deposit today • £{remainingLaterDisplay.toFixed(2)} balance due at appointment.
                            </p>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <span style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            color: paymentChoice === 'deposit' ? 'var(--color-rose)' : 'var(--color-espresso)'
                          }}>
                            £{depositNowDisplay.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Order summary */}
                  <div style={{ marginBottom: '2.25rem' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.35rem',
                      color: 'var(--color-espresso)',
                      marginBottom: '1rem',
                      fontWeight: 600
                    }}>
                      Order Summary
                    </h3>

                    {/* Service Line Items */}
                    <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {selectedServices.map((svc) => (
                        <div key={svc.id} style={{
                          paddingBottom: '0.75rem',
                          borderBottom: '1px solid var(--color-border-subtle)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <span style={{ fontWeight: 600, fontSize: '0.925rem', color: 'var(--color-espresso)', display: 'block', lineHeight: 1.4 }}>
                                {svc.name}
                              </span>
                              <div style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', marginTop: '0.25rem' }}>
                                {formatAcuityDateTime(selectedDate, selectedTime)}
                              </div>
                            </div>
                            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-espresso)', flexShrink: 0 }}>
                              £{svc.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Package, gift, or coupon code */}
                    <div style={{ marginBottom: '1.5rem' }}>
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
                        <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-espresso)' }}>
                          Have a coupon or gift code?
                        </span>
                        <span style={{ fontSize: '1.2rem', color: 'var(--color-rose)', fontWeight: 600 }}>
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
                                padding: '0.7rem 0.85rem',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.85rem',
                                backgroundColor: 'var(--color-surface)',
                                color: 'var(--color-espresso)'
                              }}
                            />
                            <button
                              type="button"
                              onClick={handleApplyCoupon}
                              className="btn btn-secondary"
                              style={{ padding: '0.7rem 1.25rem', fontSize: '0.825rem' }}
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

                    <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: '1.5rem' }} />

                    {/* Subtotal & Tip */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.925rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                        <span>Subtotal</span>
                        <span>£{subtotalAfterDiscount.toFixed(2)}</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.925rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                        <span>Tip (Optional)</span>
                        <span>£{tipAmount.toFixed(2)}</span>
                      </div>

                      {/* Tip Buttons Row */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '0.45rem',
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
                                padding: '0.75rem 0.25rem',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid',
                                borderColor: isActive ? 'var(--color-espresso)' : 'var(--color-border)',
                                backgroundColor: isActive ? 'var(--color-espresso)' : 'var(--color-surface)',
                                color: isActive ? 'var(--color-ivory)' : 'var(--color-espresso)',
                                fontWeight: 600,
                                fontSize: '0.825rem',
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'all var(--transition-fast)'
                              }}
                            >
                              {tipOpt.label}
                            </button>
                          );
                        })}
                      </div>

                      {activeTipOption === 'custom' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-espresso)' }}>£</span>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            placeholder="Custom tip amount"
                            value={customTipInput}
                            onChange={(e) => setCustomTipInput(e.target.value)}
                            style={{
                              padding: '0.55rem 0.75rem',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--color-border)',
                              fontSize: '0.85rem',
                              width: '140px',
                              backgroundColor: 'var(--color-surface)',
                              color: 'var(--color-espresso)'
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: '1.5rem' }} />

                    {/* Total Breakdown */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--color-espresso)',
                      marginBottom: '0.65rem'
                    }}>
                      <span>Total Due Today</span>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-rose)' }}>
                        £{paymentChoice === 'full' ? orderTotal.toFixed(2) : (depositNowDisplay + (paymentChoice === 'deposit' ? tipAmount : 0)).toFixed(2)}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.85rem',
                      color: 'var(--color-taupe)',
                      marginBottom: '1.75rem',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'var(--color-surface-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border-subtle)'
                    }}>
                      <span>{paymentChoice === 'full' ? 'Remaining at Appointment:' : 'Remaining Balance (Due in Studio):'}</span>
                      <span style={{ fontWeight: 700, color: paymentChoice === 'full' ? 'var(--color-success)' : 'var(--color-espresso)' }}>
                        {paymentChoice === 'full' ? '£0.00 (Fully Settled)' : `£${remainingLaterDisplay.toFixed(2)}`}
                      </span>
                    </div>

                    {/* Section 4: Secure Stripe Interactive Payment Details */}
                    <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h3 style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.35rem',
                          color: 'var(--color-espresso)',
                          margin: 0,
                          fontWeight: 600
                        }}>
                          Payment Details
                        </h3>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                          <VisaIcon />
                          <MastercardIcon />
                          <AmexIcon />
                          <DiscoverIcon />
                        </div>
                      </div>

                      <div style={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        padding: 'clamp(1.25rem, 4vw, 1.75rem)',
                        boxShadow: 'var(--shadow-subtle)'
                      }}>
                        {stripeLoading && (
                          <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--color-taupe)' }}>
                            <div
                              style={{
                                width: '28px',
                                height: '28px',
                                border: '2px solid var(--color-border)',
                                borderTopColor: 'var(--color-rose)',
                                borderRadius: '50%',
                                margin: '0 auto 1rem auto',
                                animation: 'spin 0.75s linear infinite'
                              }}
                            />
                            <p style={{ fontSize: '0.875rem' }}>Initializing secure Stripe checkout...</p>
                          </div>
                        )}

                        {stripeError && (
                          <div style={{
                            padding: '1.25rem',
                            backgroundColor: 'var(--color-error-bg)',
                            border: '1px solid rgba(163, 55, 55, 0.2)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--color-error)',
                            fontSize: '0.85rem',
                            textAlign: 'center'
                          }}>
                            <p style={{ marginBottom: '0.75rem' }}>{stripeError}</p>
                            <button
                              type="button"
                              onClick={() => {
                                setStripeError(null);
                                setStripeLoading(true);
                              }}
                              className="btn btn-secondary"
                              style={{ fontSize: '0.75rem', padding: '0.4rem 0.85rem' }}
                            >
                              Retry Connection
                            </button>
                          </div>
                        )}

                        {!stripeLoading && clientSecret && (
                          <StripePaymentWrapper
                            clientSecret={clientSecret}
                            amount={amountToCharge}
                            paymentChoice={paymentChoice}
                            isProcessing={isProcessing}
                            onSuccess={handleStripeSuccess}
                            onError={(msg) => setStripeError(msg)}
                          />
                        )}
                      </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-taupe)',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
                        ← Edit appointment details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Booking Summary Tray / Sidebar (Shown on Steps 1, 2, 3 only) */}
          {step !== 4 && step !== 1 && (
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
