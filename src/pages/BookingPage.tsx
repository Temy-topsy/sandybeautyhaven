import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  CreditCard,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
  Plus,
  Check,
  Trash2,
  ChevronDown,
  ChevronUp,
  ShieldCheck
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { useBooking } from '../context/BookingContext';

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
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_google' | 'klarna'>('card');

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

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      completeBooking();
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

      <div className="container" style={{ maxWidth: '1000px', paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
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
            {/* STEP 4: PAYMENT OPTIONS & SECURE DEPOSIT */}
            {/* ============================================================== */}
            {step === 4 && (
              <div>
                <h2 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>4. Review & Secure Deposit</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', marginBottom: '1.5rem' }}>
                  Your appointment slot is locked immediately upon paying the required online deposit of <strong>£{totalDeposit}</strong>.
                </p>

                {/* Payment Options Selector */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Select Payment Method
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '0.5rem'
                  }}>
                    {[
                      { id: 'card', label: 'Credit / Debit Card' },
                      { id: 'apple_google', label: 'Apple / Google Pay' },
                      { id: 'klarna', label: 'Klarna / ClearPay' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPaymentMethod(opt.id as any)}
                        style={{
                          padding: '0.75rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.775rem',
                          fontWeight: 600,
                          textAlign: 'center',
                          border: '1px solid',
                          borderColor: paymentMethod === opt.id ? 'var(--color-rose)' : 'var(--color-border)',
                          backgroundColor: paymentMethod === opt.id ? 'var(--color-blush-light)' : 'var(--color-surface)',
                          color: 'var(--color-espresso)',
                          cursor: 'pointer'
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleCompletePayment}>
                  {paymentMethod === 'card' && (
                    <div style={{
                      backgroundColor: 'var(--color-surface-subtle)',
                      padding: 'clamp(1rem, 3vw, 1.5rem)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      marginBottom: '1.5rem',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <CreditCard size={16} style={{ color: 'var(--color-rose)' }} />
                          Card Information
                        </span>
                        <span style={{ fontSize: '0.725rem', color: 'var(--color-taupe)' }}>
                          256-Bit SSL Encrypted
                        </span>
                      </div>

                      <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label">Name on Card</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. A. Adeleke"
                          defaultValue={clientDetails.fullName || 'Ayishat Adeleke'}
                          required
                          style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label">Card Number</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="•••• •••• •••• 4242"
                          defaultValue="4242 •••• •••• 4242"
                          required
                          style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                      </div>

                      {/* Expiry & CVC: Flex wrap so on mobile it never overflows */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                        gap: '0.75rem'
                      }}>
                        <div className="form-group">
                          <label className="form-label">MM / YY</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="10/28"
                            defaultValue="10/28"
                            required
                            style={{ width: '100%', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">CVC / CVV</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="123"
                            defaultValue="789"
                            required
                            style={{ width: '100%', boxSizing: 'border-box' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'apple_google' && (
                    <div style={{
                      backgroundColor: 'var(--color-surface-subtle)',
                      padding: '1.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      textAlign: 'center',
                      marginBottom: '1.5rem'
                    }}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe)', marginBottom: '1rem' }}>
                        Instant 1-Touch Checkout using your device's biometric wallet.
                      </p>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '0.9rem', backgroundColor: '#000000', borderColor: '#000000' }}
                      >
                         Pay Deposit £{totalDeposit}
                      </button>
                    </div>
                  )}

                  {paymentMethod === 'klarna' && (
                    <div style={{
                      backgroundColor: 'var(--color-surface-subtle)',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      marginBottom: '1.5rem',
                      fontSize: '0.85rem'
                    }}>
                      <strong style={{ color: 'var(--color-espresso)', display: 'block', marginBottom: '0.4rem' }}>
                        Pay in 3 with Klarna
                      </strong>
                      <p style={{ color: 'var(--color-taupe)', margin: 0, lineHeight: 1.5 }}>
                        Pay your £{totalDeposit} deposit interest-free in 3 instalments of £{(totalDeposit / 3).toFixed(2)}.
                      </p>
                    </div>
                  )}

                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'var(--color-taupe)',
                    marginBottom: '1.5rem',
                    lineHeight: 1.5
                  }}>
                    <Info size={16} style={{ color: 'var(--color-rose)', flexShrink: 0, marginTop: '2px' }} />
                    <span>
                      Deposit due now: <strong>£{totalDeposit}</strong>. Remaining balance of <strong>£{Math.max(0, totalPrice - totalDeposit)}</strong> is paid on appointment day at 101 Easter Road.
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <button type="button" onClick={handlePrevStep} className="btn btn-secondary" style={{ flex: '1 1 120px' }}>
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="btn btn-primary"
                      style={{
                        flex: '2 1 200px',
                        padding: '1rem 1.5rem',
                        fontSize: '0.85rem'
                      }}
                    >
                      {isProcessing ? 'Confirming Appointment...' : `Pay Deposit £${totalDeposit} & Confirm`}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Live Booking Summary Tray / Sidebar */}
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
        </div>
      </div>
    </div>
  );
};
