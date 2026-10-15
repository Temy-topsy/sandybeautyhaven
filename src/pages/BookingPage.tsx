import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  CreditCard,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { useBooking } from '../context/BookingContext';

export const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedService,
    setSelectedService,
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
    
    // Fill padding for starting weekday (Monday-first or Sunday-first)
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
    if (step === 1 && !selectedService) {
      alert('Please select a service to proceed.');
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
      if (!clientDetails.phone.trim() || clientDetails.phone.length < 10) errors.phone = 'Valid UK phone number required for SMS reminders.';
      if (!clientDetails.agreeToPolicies) errors.agreeToPolicies = 'You must agree to the booking and deposit policies.';

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors({});
    }
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
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

  const currentService = selectedService || SERVICES[0];

  return (
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '85vh', paddingBottom: '5rem' }}>
      {/* Top Header */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: '2.5rem',
        paddingBottom: '2rem'
      }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-eyebrow">Online Appointment Scheduling</span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', margin: 0 }}>
                Book Your Experience
              </h1>
            </div>

            {/* Official Acuity External Reference */}
            <a
              href="https://lashbysandyy.as.me/schedule/37ba4acd"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                color: 'var(--color-taupe)',
                backgroundColor: 'var(--color-surface-subtle)',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)'
              }}
            >
              Open Live Acuity Portal
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Stepper Progress */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '2rem',
            position: 'relative'
          }}>
            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Date & Time' },
              { num: 3, label: 'Your Details' },
              { num: 4, label: 'Payment' }
            ].map((s) => {
              const isCompleted = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    backgroundColor: isCompleted ? 'var(--color-rose)' : isCurrent ? 'var(--color-espresso)' : 'var(--color-surface)',
                    color: isCompleted || isCurrent ? 'var(--color-ivory)' : 'var(--color-taupe)',
                    border: '1px solid',
                    borderColor: isCompleted ? 'var(--color-rose)' : isCurrent ? 'var(--color-espresso)' : 'var(--color-border)',
                    marginBottom: '0.35rem'
                  }}>
                    {isCompleted ? <CheckCircle2 size={16} /> : s.num}
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: isCurrent ? 600 : 500,
                    color: isCurrent ? 'var(--color-espresso)' : 'var(--color-taupe)'
                  }}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '980px', paddingTop: 'clamp(2rem, 4vw, 3.5rem)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(1.75rem, 4vw, 2.75rem)',
          alignItems: 'start'
        }}>
          {/* Main Step Content */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'clamp(1.5rem, 4vw, 2.75rem)',
            boxShadow: 'var(--shadow-subtle)'
          }}>

            {/* STEP 1: SERVICE SELECTION */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>1. Select Your Treatment</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', marginBottom: '1.5rem' }}>
                  Choose from our verified beauty services. Prices and deposit requirements are listed for each treatment.
                </p>

                {/* Staff Selection */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Select Practitioner
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                    {staffMembers.map((staff) => (
                      <button
                        key={staff.id}
                        type="button"
                        onClick={() => setSelectedStaff(staff.id)}
                        style={{
                          padding: '0.85rem 1rem',
                          textAlign: 'left',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid',
                          borderColor: selectedStaff === staff.id ? 'var(--color-rose)' : 'var(--color-border)',
                          backgroundColor: selectedStaff === staff.id ? 'var(--color-blush-light)' : 'var(--color-surface)',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-espresso)' }}>
                          {staff.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-taupe)' }}>
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

                {/* Services List Accordion/Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '460px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                  {displayedServices.map((s) => {
                    const isSelected = selectedService?.id === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedService(s)}
                        style={{
                          padding: '1rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid',
                          borderColor: isSelected ? 'var(--color-rose)' : 'var(--color-border)',
                          backgroundColor: isSelected ? 'var(--color-blush-light)' : 'var(--color-surface)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '1rem',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{s.name}</span>
                            <span className="badge" style={{ fontSize: '0.65rem' }}>{s.category}</span>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', display: 'flex', gap: '0.75rem' }}>
                            <span>{s.duration} mins</span>
                            <span>•</span>
                            <span>Deposit: £{s.deposit}</span>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>
                            £{s.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={handleNextStep} className="btn btn-primary">
                    Next: Choose Date & Time →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME SELECTION */}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>2. Select Date & Time</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', marginBottom: '1.5rem' }}>
                  Appointments are available Monday to Saturday, 9:00 AM – 5:00 PM. Sundays are closed.
                </p>

                {/* Month Selector */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.25rem',
                  padding: '0.5rem 0'
                }}>
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                    style={{
                      background: 'none',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.4rem',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h3>

                  <button
                    type="button"
                    onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                    style={{
                      background: 'none',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.4rem',
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
                      return <div key={`empty-${index}`} style={{ height: '38px' }} />;
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

                {/* Time Slots */}
                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={16} style={{ color: 'var(--color-rose)' }} />
                    Available Slots for {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.65rem' }}>
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          style={{
                            padding: '0.65rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.825rem',
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

                <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button type="button" onClick={handlePrevStep} className="btn btn-secondary">
                    ← Back
                  </button>
                  <button type="button" onClick={handleNextStep} className="btn btn-primary">
                    Next: Your Details →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CLIENT DETAILS FORM */}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>3. Your Information</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', marginBottom: '1.5rem' }}>
                  We need your contact information to send automated email and SMS booking confirmations and reminders.
                </p>

                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Ayishat Adeleke"
                    value={clientDetails.fullName}
                    onChange={(e) => setClientDetails({ ...clientDetails, fullName: e.target.value })}
                  />
                  {formErrors.fullName && <span className="form-error">{formErrors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="e.g. name@example.com"
                    value={clientDetails.email}
                    onChange={(e) => setClientDetails({ ...clientDetails, email: e.target.value })}
                  />
                  {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Mobile Phone (UK) *</label>
                  <input
                    id="phone"
                    type="tel"
                    className="form-input"
                    placeholder="e.g. 07733777956 or +44 7..."
                    value={clientDetails.phone}
                    onChange={(e) => setClientDetails({ ...clientDetails, phone: e.target.value })}
                  />
                  {formErrors.phone && <span className="form-error">{formErrors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="notes">Notes / Style Preferences (Optional)</label>
                  <textarea
                    id="notes"
                    className="form-textarea"
                    rows={3}
                    placeholder="e.g. Looking for natural cat eye style, length 12-14mm, or sensitive eyes"
                    value={clientDetails.notes}
                    onChange={(e) => setClientDetails({ ...clientDetails, notes: e.target.value })}
                  />
                </div>

                {/* Policy Agreement Checkbox */}
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={clientDetails.smsReminders}
                      onChange={(e) => setClientDetails({ ...clientDetails, smsReminders: e.target.checked })}
                      style={{ marginTop: '3px' }}
                    />
                    <span>Receive appointment reminder and calendar update via SMS.</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={clientDetails.agreeToPolicies}
                      onChange={(e) => setClientDetails({ ...clientDetails, agreeToPolicies: e.target.checked })}
                      style={{ marginTop: '3px' }}
                    />
                    <span>
                      I understand that the deposit is non-refundable, that 24 hours notice is required to reschedule, and that late arrival after 10 mins incurs a £10 fee. *
                    </span>
                  </label>
                  {formErrors.agreeToPolicies && <span className="form-error">{formErrors.agreeToPolicies}</span>}
                </div>

                <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button type="button" onClick={handlePrevStep} className="btn btn-secondary">
                    ← Back
                  </button>
                  <button type="button" onClick={handleNextStep} className="btn btn-primary">
                    Next: Review & Payment →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & PAYMENT */}
            {step === 4 && (
              <div>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>4. Review & Secure Deposit</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-taupe)', marginBottom: '1.5rem' }}>
                  Your appointment slot will be confirmed upon paying the required deposit of £{currentService.deposit}.
                </p>

                {/* Realistic Payment Interface */}
                <form onSubmit={handleCompletePayment}>
                  <div style={{
                    backgroundColor: 'var(--color-surface-subtle)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CreditCard size={16} style={{ color: 'var(--color-rose)' }} />
                        Card Details (Encrypted via Stripe / Acuity)
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-taupe)' }}>
                        256-Bit SSL Secured
                      </span>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Card Number</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="•••• •••• •••• 4242"
                        defaultValue="4242 •••• •••• 4242"
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div className="form-group">
                        <label className="form-label">MM / YY</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="12/28"
                          defaultValue="10/28"
                          required
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
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'var(--color-taupe)',
                    marginBottom: '1.5rem'
                  }}>
                    <Info size={16} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                    <span>
                      Deposit due now: <strong>£{currentService.deposit}</strong>. Remaining balance of <strong>£{currentService.price - currentService.deposit}</strong> is paid on appointment day at 101 Easter Road.
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                    <button type="button" onClick={handlePrevStep} className="btn btn-secondary">
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="btn btn-primary"
                      style={{ padding: '0.95rem 2rem' }}
                    >
                      {isProcessing ? 'Confirming Appointment...' : `Pay Deposit £${currentService.deposit} & Confirm`}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Live Booking Summary Sidebar */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-subtle)',
            position: 'sticky',
            top: '100px'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
              Booking Summary
            </h3>

            {/* Service Item */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
              <img
                src={currentService.image}
                alt={currentService.name}
                style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem' }}>{currentService.name}</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-taupe)' }}>
                  {currentService.duration} mins • {selectedStaff}
                </p>
                <span className="badge badge-rose" style={{ marginTop: '0.25rem', fontSize: '0.65rem' }}>
                  {currentService.category}
                </span>
              </div>
            </div>

            {/* Date & Time */}
            <div style={{
              padding: '0.85rem',
              backgroundColor: 'var(--color-surface-subtle)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.25rem',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <CalendarIcon size={14} style={{ color: 'var(--color-rose)' }} />
                <span>
                  <strong>Date:</strong> {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={14} style={{ color: 'var(--color-rose)' }} />
                <span>
                  <strong>Time:</strong> {selectedTime}
                </span>
              </div>
            </div>

            {/* Location */}
            <div style={{ fontSize: '0.825rem', color: 'var(--color-taupe)', marginBottom: '1.25rem' }}>
              <strong>Location:</strong><br />
              Sandy Beauty Haven<br />
              101 Easter Road, Edinburgh, EH7 5PP
            </div>

            {/* Financial Breakdown */}
            <div style={{
              borderTop: '1px solid var(--color-border)',
              paddingTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.875rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Treatment Price:</span>
                <span style={{ fontWeight: 600 }}>£{currentService.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-rose)', fontWeight: 600 }}>
                <span>Deposit Due Online:</span>
                <span>£{currentService.deposit}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-taupe)' }}>
                <span>Remaining on Arrival:</span>
                <span>£{currentService.price - currentService.deposit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
