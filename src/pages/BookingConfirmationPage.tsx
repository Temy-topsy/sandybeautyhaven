import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Download,
  Home
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const BookingConfirmationPage: React.FC = () => {
  const { confirmedBooking } = useBooking();

  // Fallback data if user navigated directly
  const booking = confirmedBooking || {
    reference: 'SBH-2026-8941',
    service: {
      name: 'Hybrid Lash Extensions',
      category: 'Lash Extensions',
      price: 60,
      duration: 115,
      deposit: 15,
      image: '/appointments/hybrid-lashes.jpg'
    },
    services: [
      {
        name: 'Hybrid Lash Extensions',
        category: 'Lash Extensions',
        price: 60,
        duration: 115,
        deposit: 15,
        image: '/appointments/hybrid-lashes.jpg'
      }
    ],
    staff: 'Sandy Beauty',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '11:00 AM',
    client: {
      fullName: 'Valued Client',
      email: 'client@example.com',
      phone: '+44 07733777956',
      notes: '',
      agreeToPolicies: true,
      marketingConsent: 'yes',
      smsReminders: true
    },
    totalPrice: 60,
    depositPaid: 15,
    remainingBalance: 45,
    totalDuration: 115,
    paymentChoice: 'deposit' as const,
    tip: 0,
    bookedAt: new Date().toISOString()
  };

  const servicesList = booking.services && booking.services.length > 0 ? booking.services : [booking.service];

  const formattedDate = new Date(booking.date + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const downloadIcsCalendar = () => {
    const serviceNames = servicesList.map((s) => s.name).join(' + ');
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sandy Beauty Haven//Appointment//EN
BEGIN:VEVENT
SUMMARY:${serviceNames} - Sandy Beauty Haven
DESCRIPTION:Appointment for ${serviceNames} with ${booking.staff}. Ref: ${booking.reference}. Location: 101 Easter Road, Edinburgh.
LOCATION:101 Easter Road, Edinburgh, EH7 5PP
DTSTART:${booking.date.replace(/-/g, '')}T100000Z
DTEND:${booking.date.replace(/-/g, '')}T120000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SandyBeautyHaven-${booking.reference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '85vh', padding: 'clamp(3rem, 6vw, 5rem) 1.25rem' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        <div style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          padding: 'clamp(2rem, 6vw, 3.5rem)',
          boxShadow: 'var(--shadow-card)',
          textAlign: 'center'
        }}>
          {/* Success Checkmark Badge */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-blush-light)',
            color: 'var(--color-rose)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            border: '2px solid var(--color-rose)'
          }}>
            <CheckCircle2 size={34} />
          </div>

          <span className="badge badge-rose" style={{ marginBottom: '1rem', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
            {booking.paymentChoice === 'full' ? 'PAID IN FULL CONFIRMED' : 'DEPOSIT CONFIRMED'}
          </span>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.9rem, 4.5vw, 2.6rem)',
            color: 'var(--color-espresso)',
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            We Look Forward To Welcoming You!
          </h1>

          <div style={{
            color: 'var(--color-taupe)',
            fontSize: '0.925rem',
            marginBottom: '2.5rem',
            lineHeight: 1.7,
            wordBreak: 'break-word',
            overflowWrap: 'anywhere'
          }}>
            Your booking reference is <strong style={{ color: 'var(--color-espresso)', letterSpacing: '0.05em' }}>{booking.reference}</strong>.
            <div style={{ marginTop: '0.35rem' }}>
              A confirmation receipt has been sent to{' '}
              <strong style={{ color: 'var(--color-espresso)', wordBreak: 'break-all' }}>
                {booking.client.email}
              </strong>.
            </div>
          </div>

          {/* Appointment Schedule & Venue Card */}
          <div style={{
            backgroundColor: 'var(--color-surface-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: 'clamp(1.25rem, 4vw, 1.75rem)',
            textAlign: 'left',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--color-espresso)',
              marginBottom: '1.25rem',
              borderBottom: '1px solid var(--color-border)',
              paddingBottom: '0.65rem'
            }}>
              Booked Treatments & Schedule
            </h3>

            {/* List all booked services - Guaranteed collision-free */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              {servicesList.map((svc, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1.25rem',
                    paddingBottom: i < servicesList.length - 1 ? '0.85rem' : '0',
                    borderBottom: i < servicesList.length - 1 ? '1px solid var(--color-border-subtle)' : 'none'
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: 600,
                      fontSize: '0.925rem',
                      color: 'var(--color-espresso)',
                      lineHeight: 1.45,
                      wordBreak: 'break-word'
                    }}>
                      {svc.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-taupe)', marginTop: '0.2rem' }}>
                      ({svc.duration} mins)
                    </div>
                  </div>
                  <div style={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--color-espresso)',
                    flexShrink: 0,
                    textAlign: 'right'
                  }}>
                    £{svc.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-border-subtle)',
              marginBottom: '1rem',
              fontSize: '0.85rem'
            }}>
              <div>
                <span style={{ fontSize: '0.725rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-taupe)', display: 'block', marginBottom: '0.35rem' }}>
                  Date & Time
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                  <Calendar size={15} style={{ color: 'var(--color-rose)' }} />
                  {formattedDate}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--color-taupe)', marginTop: '0.25rem' }}>
                  <Clock size={15} style={{ color: 'var(--color-rose)' }} />
                  {booking.time}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.725rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-taupe)', display: 'block', marginBottom: '0.35rem' }}>
                  Practitioner
                </span>
                <strong style={{ fontSize: '0.925rem', color: 'var(--color-espresso)' }}>
                  {booking.staff}
                </strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', paddingTop: '1rem', borderTop: '1px solid var(--color-border-subtle)' }}>
              <MapPin size={16} style={{ color: 'var(--color-rose)', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.825rem', color: 'var(--color-taupe)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--color-espresso)' }}>Sandy Beauty Haven Studio:</strong> 101 Easter Road, Edinburgh, EH7 5PP
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div style={{
            backgroundColor: 'var(--color-surface-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.25rem 1.5rem',
            textAlign: 'left',
            marginBottom: '2rem',
            fontSize: '0.875rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <span>Total Service Value:</span>
              <span style={{ fontWeight: 600, color: 'var(--color-espresso)' }}>£{booking.totalPrice.toFixed(2)}</span>
            </div>
            {booking.tip && booking.tip > 0 ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', color: 'var(--color-taupe)' }}>
                <span>Tip Included:</span>
                <span style={{ fontWeight: 600 }}>+£{booking.tip.toFixed(2)}</span>
              </div>
            ) : null}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', color: 'var(--color-success)' }}>
              <span>{booking.paymentChoice === 'full' ? 'Paid in Full Online (256-bit SSL):' : 'Deposit Paid Online (256-bit SSL):'}</span>
              <span style={{ fontWeight: 600 }}>-£{booking.depositPaid.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '0.65rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--color-espresso)'
            }}>
              <span>Remaining Balance Due on Arrival:</span>
              <span>{booking.remainingBalance <= 0 ? '£0.00 (Fully Settled)' : `£${booking.remainingBalance.toFixed(2)}`}</span>
            </div>
          </div>

          {/* Preparation & Arrival Reminders */}
          <div style={{
            textAlign: 'left',
            borderLeft: '3px solid var(--color-rose)',
            backgroundColor: 'var(--color-surface-subtle)',
            padding: '1rem 1.25rem',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            marginBottom: '2.5rem',
            fontSize: '0.825rem',
            color: 'var(--color-taupe)',
            lineHeight: 1.6
          }}>
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-espresso)', marginBottom: '0.35rem' }}>
              Important Reminders:
            </p>
            <p style={{ margin: 0 }}>
              • Arrive on time with clean, makeup-free lashes (no oils or mascara).<br />
              • A 10-minute grace window applies; after 10 minutes, appointments may be cancelled.<br />
              • Rescheduling requires at least <strong>48 hours notice</strong> to transfer deposits.
            </p>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={downloadIcsCalendar}
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 180px' }}
            >
              <Download size={15} />
              Add to Calendar (.ics)
            </button>
            <Link
              to="/shop"
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 180px' }}
            >
              Shop Hair & Beauty
            </Link>
            <Link
              to="/"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 180px' }}
            >
              <Home size={15} />
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
