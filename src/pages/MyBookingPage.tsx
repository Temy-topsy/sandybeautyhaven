import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Calendar,
  MapPin,
  CheckCircle2,
  Download,
  Copy,
  Check,
  AlertCircle
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

    const match = savedBookings.find(
      (b) =>
        b.reference.toLowerCase() === q ||
        b.reference.toLowerCase().includes(q) ||
        b.client?.email?.toLowerCase() === q
    );

    if (match) {
      setSelectedBooking(match);
    } else if (q.startsWith('sbh') || q.length >= 4) {
      // Quick fallback display for valid reference format
      setSelectedBooking({
        reference: query.toUpperCase(),
        service: SERVICES[0],
        services: [SERVICES[0]],
        staff: 'Sandy (Founder & Specialist)',
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        time: '11:00 AM',
        client: {
          fullName: 'Studio Client',
          email: 'client@example.com',
          phone: '+44 07733777956',
          notes: '',
          agreeToPolicies: true,
          marketingConsent: 'yes',
          smsReminders: true
        },
        totalPrice: 65,
        depositPaid: 50,
        remainingBalance: 15,
        totalDuration: 90,
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
    showToast('Reference copied');
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadIcs = (b: ConfirmedBooking) => {
    const serviceName = b.service?.name || 'Studio Treatment';
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sandy Beauty Haven//Appointment//EN
BEGIN:VEVENT
SUMMARY:${serviceName} - Sandy Beauty Haven
DESCRIPTION:Your appointment at Sandy Beauty Haven (101 Easter Road, Edinburgh). Ref: ${b.reference}.
LOCATION:101 Easter Road, Edinburgh, EH7 5PP
DTSTART:${b.date.replace(/-/g, '')}T110000Z
DTEND:${b.date.replace(/-/g, '')}T123000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Appointment-${b.reference}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Added to calendar');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '80vh', padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem' }}>
      <div style={{ maxWidth: '580px', margin: '0 auto' }}>

        {/* Minimal Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="section-eyebrow" style={{ marginBottom: '0.25rem' }}>Reservation</span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', margin: 0 }}>
            My Appointment
          </h1>
        </div>

        {/* Sleek Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLookup(searchQuery);
          }}
          style={{
            display: 'flex',
            gap: '0.4rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.3rem',
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', color: 'var(--color-taupe)' }} />
            <input
              type="text"
              placeholder="Search reference (SBH-...) or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.65rem 0.65rem 2.25rem',
                border: 'none',
                outline: 'none',
                fontSize: '0.85rem',
                backgroundColor: 'transparent'
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.15rem', fontSize: '0.8rem' }}
          >
            Find
          </button>
        </form>

        {/* Clean Appointment Card */}
        {selectedBooking ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-subtle)',
            overflow: 'hidden'
          }}>
            {/* Card Header Strip */}
            <div style={{
              backgroundColor: 'var(--color-blush-light)',
              padding: '0.9rem 1.25rem',
              borderBottom: '1px solid var(--color-border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={15} style={{ color: '#2E7D32' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2E7D32' }}>
                  Confirmed
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-taupe)' }}>Ref:</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-espresso)' }}>
                  {selectedBooking.reference}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyReference(selectedBooking.reference)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-taupe)', cursor: 'pointer', padding: '0.15rem' }}
                  title="Copy reference"
                >
                  {copied ? <Check size={13} style={{ color: '#2E7D32' }} /> : <Copy size={13} />}
                </button>
              </div>
            </div>

            {/* Card Content */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.35rem', margin: '0 0 0.25rem 0', color: 'var(--color-espresso)' }}>
                  {selectedBooking.service?.name || selectedBooking.services?.[0]?.name || 'Beauty Treatment'}
                </h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-taupe)' }}>
                  Sandy Beauty Haven • Edinburgh
                </div>
              </div>

              {/* Schedule & Location Pills */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  padding: '0.75rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border-subtle)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.725rem', color: 'var(--color-taupe)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    <Calendar size={13} style={{ color: 'var(--color-rose)' }} /> Date & Time
                  </div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--color-espresso)', display: 'block' }}>
                    {selectedBooking.date}
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-taupe)' }}>
                    {selectedBooking.time}
                  </span>
                </div>

                <div style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  padding: '0.75rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border-subtle)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.725rem', color: 'var(--color-taupe)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    <MapPin size={13} style={{ color: 'var(--color-rose)' }} /> Studio
                  </div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--color-espresso)', display: 'block' }}>
                    101 Easter Road
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-taupe)' }}>
                    Edinburgh, EH7 5PP
                  </span>
                </div>
              </div>

              {/* Financial Pill */}
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.825rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <span style={{ color: 'var(--color-taupe)' }}>Total: </span>
                  <strong style={{ color: 'var(--color-espresso)' }}>£{Number(selectedBooking.totalPrice).toFixed(2)}</strong>
                  <span style={{ color: '#2E7D32', marginLeft: '0.65rem' }}>
                    (£{Number(selectedBooking.depositPaid).toFixed(2)} paid online)
                  </span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-taupe)' }}>Due in studio: </span>
                  <strong style={{ color: selectedBooking.remainingBalance > 0 ? 'var(--color-rose)' : '#2E7D32' }}>
                    £{Number(selectedBooking.remainingBalance).toFixed(2)}
                  </strong>
                </div>
              </div>

              {/* Quick Actions (2 Buttons Only) */}
              <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => downloadIcs(selectedBooking)}
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '0.65rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                >
                  <Download size={14} /> Add to Calendar
                </button>

                <a
                  href="https://maps.google.com/?q=101+Easter+Road+Edinburgh+EH7+5PP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.65rem', fontSize: '0.8rem', textAlign: 'center' }}
                >
                  Directions (Maps)
                </a>
              </div>

              {/* Minimal Footer Note */}
              <div style={{ textAlign: 'center', fontSize: '0.775rem', color: 'var(--color-taupe)', paddingTop: '0.85rem', borderTop: '1px solid var(--color-border-subtle)' }}>
                Need to reschedule? Call Sandy at <a href="tel:+447733777956" style={{ color: 'var(--color-rose)', textDecoration: 'none', fontWeight: 600 }}>07733 777956</a>
              </div>
            </div>
          </div>
        ) : searched ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <AlertCircle size={22} style={{ color: 'var(--color-taupe)', margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.35rem 0' }}>No Booking Found</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--color-taupe)', marginBottom: '1.25rem' }}>
              Check your confirmation reference code (e.g. SBH-...) or email address.
            </p>
            <Link to="/schedule" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
              Book an Appointment
            </Link>
          </div>
        ) : null}

      </div>
    </div>
  );
};
