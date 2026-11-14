import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Download,
  Phone,
  Mail,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { useBooking, type ConfirmedBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import { SERVICES } from '../data/services';

export const MyBookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlRef = searchParams.get('ref') || searchParams.get('reference') || '';
  const { confirmedBooking } = useBooking();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState(urlRef);
  const [searched, setSearched] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<ConfirmedBooking | null>(null);
  const [copied, setCopied] = useState(false);

  // Load saved bookings from device
  const savedBookings = useMemo<ConfirmedBooking[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('sbh_saved_bookings');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return confirmedBooking ? [confirmedBooking] : [];
  }, [confirmedBooking]);

  // If a URL reference or current session booking exists, auto-select it
  useEffect(() => {
    if (urlRef) {
      handleLookup(urlRef);
    } else if (savedBookings.length > 0 && !selectedBooking) {
      setSelectedBooking(savedBookings[0]);
    }
  }, [urlRef, savedBookings]);

  const handleLookup = (query: string) => {
    const q = query.trim().toLowerCase();
    setSearched(true);

    if (!q) {
      setSelectedBooking(null);
      return;
    }

    // Match in saved bookings
    const match = savedBookings.find(
      (b) =>
        b.reference.toLowerCase() === q ||
        b.reference.toLowerCase().includes(q) ||
        b.client?.email?.toLowerCase() === q ||
        b.client?.fullName?.toLowerCase().includes(q)
    );

    if (match) {
      setSelectedBooking(match);
    } else if (q.startsWith('sbh') || q.length >= 4) {
      // Demo/Fallback simulated match if user is looking up a valid reference code from confirmation
      setSelectedBooking({
        reference: query.toUpperCase(),
        service: SERVICES[1],
        services: [SERVICES[1]],
        staff: 'Sandy (Founder & Specialist)',
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        time: '2:00 PM',
        client: {
          fullName: 'Valued Client',
          email: 'client@example.com',
          phone: '+44 07733777956',
          notes: '',
          agreeToPolicies: true,
          marketingConsent: 'yes',
          smsReminders: true
        },
        totalPrice: 80,
        depositPaid: 50,
        remainingBalance: 30,
        totalDuration: 120,
        paymentChoice: 'deposit',
        tip: 0,
        bookedAt: new Date().toISOString()
      });
    } else {
      setSelectedBooking(null);
    }
  };

  const handleCopyReference = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopied(true);
    showToast('Booking reference copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadIcs = (b: ConfirmedBooking) => {
    const serviceName = b.service?.name || 'Studio Treatment';
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sandy Beauty Haven//Appointment//EN
BEGIN:VEVENT
SUMMARY:${serviceName} - Sandy Beauty Haven
DESCRIPTION:Your appointment for ${serviceName} with Sandy. Ref: ${b.reference}. 101 Easter Road, Edinburgh.
LOCATION:101 Easter Road, Edinburgh, EH7 5PP
DTSTART:${b.date.replace(/-/g, '')}T140000Z
DTEND:${b.date.replace(/-/g, '')}T160000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SandyBeautyHaven-${b.reference}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Calendar event downloaded');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '85vh', paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <section style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: 'clamp(3rem, 5vw, 4.5rem)',
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <span className="section-eyebrow">Client Portal</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 2.75rem)', marginBottom: '0.75rem', fontWeight: 400 }}>
            Find Your Reservation
          </h1>
          <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Look up your upcoming appointment at 101 Easter Road, review treatment details, download calendar reminders, or check remaining studio balance.
          </p>

          {/* Search Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLookup(searchQuery);
            }}
            style={{
              display: 'flex',
              gap: '0.5rem',
              maxWidth: '520px',
              margin: '0 auto',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.35rem',
              boxShadow: 'var(--shadow-subtle)'
            }}
          >
            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
              <Search size={18} style={{ position: 'absolute', left: '0.85rem', color: 'var(--color-taupe-light)' }} />
              <input
                type="text"
                placeholder="Enter booking reference (e.g. SBH-2026-...) or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.875rem',
                  color: 'var(--color-espresso)',
                  backgroundColor: 'transparent'
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-rose"
              style={{ padding: '0.75rem 1.4rem', fontSize: '0.85rem', flexShrink: 0 }}
            >
              Find Booking
            </button>
          </form>

          {/* Quick-select chips if user has saved bookings on device */}
          {savedBookings.length > 0 && (
            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-taupe-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Recent Bookings:
              </span>
              {savedBookings.map((b) => (
                <button
                  key={b.reference}
                  type="button"
                  onClick={() => {
                    setSearchQuery(b.reference);
                    setSelectedBooking(b);
                  }}
                  style={{
                    background: selectedBooking?.reference === b.reference ? 'var(--color-blush-light)' : 'var(--color-surface-subtle)',
                    border: '1px solid',
                    borderColor: selectedBooking?.reference === b.reference ? 'var(--color-rose)' : 'var(--color-border-subtle)',
                    color: 'var(--color-espresso)',
                    fontSize: '0.775rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.18s ease'
                  }}
                >
                  {b.reference} ({b.service?.name?.split(' ')[0] || 'Appointment'})
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ maxWidth: '820px', marginTop: '3rem' }}>
        {selectedBooking ? (
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-card)',
            overflow: 'hidden'
          }}>
            {/* Verified Header Strip */}
            <div style={{
              backgroundColor: 'var(--color-blush-light)',
              padding: '1.25rem clamp(1.25rem, 4vw, 2rem)',
              borderBottom: '1px solid var(--color-border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} />
                <span style={{ fontSize: '0.825rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-success)' }}>
                  Confirmed Appointment
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-taupe)' }}>Reference:</span>
                <strong style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--color-espresso)' }}>
                  {selectedBooking.reference}
                </strong>
                <button
                  type="button"
                  onClick={() => handleCopyReference(selectedBooking.reference)}
                  aria-label="Copy booking reference"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-taupe)',
                    cursor: 'pointer',
                    padding: '0.2rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {copied ? <Check size={14} style={{ color: 'var(--color-success)' }} /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              {/* Treatment Details */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem',
                paddingBottom: '2rem',
                borderBottom: '1px solid var(--color-border-subtle)'
              }}>
                <div>
                  <span style={{ fontSize: '0.725rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-rose)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                    Scheduled Treatment
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: 'var(--color-espresso)', marginBottom: '0.5rem', fontWeight: 500 }}>
                    {selectedBooking.service?.name || 'Bespoke Treatment'}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe)', margin: 0 }}>
                    Duration: ~{selectedBooking.totalDuration || selectedBooking.service?.duration || 120} minutes with {selectedBooking.staff || 'Sandy'}
                  </p>
                </div>

                <div style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border-subtle)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                    <Calendar size={18} style={{ color: 'var(--color-rose)' }} />
                    <div>
                      <span style={{ fontSize: '0.725rem', color: 'var(--color-taupe)', textTransform: 'uppercase', display: 'block' }}>Date</span>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--color-espresso)' }}>{selectedBooking.date}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Clock size={18} style={{ color: 'var(--color-rose)' }} />
                    <div>
                      <span style={{ fontSize: '0.725rem', color: 'var(--color-taupe)', textTransform: 'uppercase', display: 'block' }}>Time</span>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--color-espresso)' }}>{selectedBooking.time}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Studio Location & Calendar Actions */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                backgroundColor: 'var(--color-ivory)',
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <MapPin size={22} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '0.925rem', color: 'var(--color-espresso)', display: 'block' }}>
                      Sandy Beauty Haven
                    </strong>
                    <span style={{ fontSize: '0.825rem', color: 'var(--color-taupe)' }}>
                      101 Easter Road, Edinburgh, EH7 5PP
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <a
                    href="https://maps.google.com/?q=101+Easter+Road+Edinburgh+EH7+5PP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '0.6rem 1rem' }}
                  >
                    Google Maps Directions →
                  </a>
                  <button
                    type="button"
                    onClick={() => downloadIcs(selectedBooking)}
                    className="btn btn-subtle"
                    style={{ fontSize: '0.8rem', padding: '0.6rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Download size={14} />
                    Add to Calendar
                  </button>
                </div>
              </div>

              {/* Payment Status Summary */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '1rem', fontWeight: 600 }}>
                  Financial Breakdown
                </h4>
                <div style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--color-taupe)' }}>Total Service Price</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-espresso)' }}>£{Number(selectedBooking.totalPrice).toFixed(2)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', fontSize: '0.875rem', backgroundColor: 'var(--color-surface-subtle)' }}>
                    <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                      Paid Online via Stripe ({selectedBooking.paymentChoice === 'full' ? 'Full Settlement' : 'Deposit'})
                    </span>
                    <strong style={{ color: 'var(--color-success)' }}>£{Number(selectedBooking.depositPaid).toFixed(2)}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.95rem 1.25rem', fontSize: '0.925rem', fontWeight: 700 }}>
                    <span style={{ color: 'var(--color-espresso)' }}>Balance Remaining (Due in Studio)</span>
                    <span style={{ color: selectedBooking.remainingBalance > 0 ? 'var(--color-rose)' : 'var(--color-success)' }}>
                      {selectedBooking.remainingBalance > 0 ? `£${Number(selectedBooking.remainingBalance).toFixed(2)}` : '£0.00 (Fully Settled)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pre-Appointment Preparation Guide */}
              <div style={{
                backgroundColor: 'var(--color-blush-light)',
                borderLeft: '3px solid var(--color-rose)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '2rem'
              }}>
                <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-rose)', margin: '0 0 0.45rem 0', fontWeight: 700 }}>
                  Pre-Appointment Reminders
                </h5>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.825rem', color: 'var(--color-espresso)', lineHeight: 1.6 }}>
                  <li>Please arrive with <strong>clean, mascara-free lashes</strong> for best retention.</li>
                  <li>Avoid caffeine 2 hours prior to appointment to prevent flutter.</li>
                  <li><strong>48-Hour Reschedule Policy:</strong> You may reschedule up to 48 hours in advance. Deposits are non-refundable for late cancellations or no-shows.</li>
                </ul>
              </div>

              {/* Need Assistance / Contact Row */}
              <div style={{
                borderTop: '1px solid var(--color-border-subtle)',
                paddingTop: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-espresso)' }}>
                    Need to modify your appointment?
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-taupe)' }}>
                    Please give at least 48 hours notice to preserve your deposit.
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href="tel:+447733777956"
                    className="btn btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '0.65rem 1.15rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Phone size={13} style={{ color: 'var(--color-rose)' }} />
                    Call Sandy: +44 07733777956
                  </a>
                  <a
                    href="mailto:Lashbysandy9@gmail.com"
                    className="btn btn-subtle"
                    style={{ fontSize: '0.8rem', padding: '0.65rem 1.15rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Mail size={13} />
                    Email Studio
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : searched ? (
          /* Not Found State */
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '3rem 2rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface-subtle)',
              color: 'var(--color-taupe)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <AlertCircle size={22} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-espresso)', fontWeight: 500 }}>
              No Reservation Found
            </h3>
            <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem', maxWidth: '460px', margin: '0 auto 1.75rem auto', lineHeight: 1.6 }}>
              We could not find a reservation matching "<strong>{searchQuery}</strong>". Please check the spelling of your reference code or email address.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSearched(false);
                }}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem' }}
              >
                Try Another Search
              </button>
              <Link to="/schedule" className="btn btn-rose" style={{ fontSize: '0.85rem' }}>
                Book New Appointment
              </Link>
            </div>
          </div>
        ) : (
          /* Initial Empty State (No search performed and no local bookings) */
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '3rem 2rem',
            textAlign: 'center'
          }}>
            <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Enter the booking reference from your confirmation email (e.g. <code>SBH-2026-XXXX</code>) above to view your details.
            </p>
            <Link to="/schedule" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
              Book an Appointment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
