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
    <div style={{ backgroundColor: 'var(--color-ivory)', minHeight: '85vh', padding: 'clamp(2.5rem, 5vw, 4.5rem) 1.5rem' }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        <div style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          padding: 'clamp(2rem, 5vw, 3.5rem)',
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
            <CheckCircle2 size={36} />
          </div>

          <span className="badge badge-rose" style={{ marginBottom: '0.75rem', fontSize: '0.75rem' }}>
            Deposit Confirmed
          </span>

          <h1 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
            We Look Forward To Welcoming You!
          </h1>

          <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Your booking reference is <strong style={{ color: 'var(--color-espresso)', letterSpacing: '0.05em' }}>{booking.reference}</strong>.
            A confirmation receipt has been sent to <strong>{booking.client.email}</strong>.
          </p>

          {/* Appointment Schedule & Venue Card */}
          <div style={{
            backgroundColor: 'var(--color-surface-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.5rem',
            textAlign: 'left',
            marginBottom: '1.75rem'
          }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
              Booked Treatments & Schedule
            </h3>

            {/* List all booked services */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
              {servicesList.map((svc, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>{svc.name}</strong>
                    <span style={{ fontSize: '0.775rem', color: 'var(--color-taupe)', marginLeft: '0.5rem' }}>
                      ({svc.duration} mins)
                    </span>
                  </div>
                  <span style={{ fontWeight: 600 }}>£{svc.price}</span>
                </div>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid var(--color-border-subtle)',
              marginBottom: '1rem',
              fontSize: '0.85rem'
            }}>
              <div>
                <span style={{ fontSize: '0.725rem', textTransform: 'uppercase', color: 'var(--color-taupe)', display: 'block' }}>
                  Date & Time
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                  <Calendar size={14} style={{ color: 'var(--color-rose)' }} />
                  {formattedDate}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-taupe)' }}>
                  <Clock size={14} style={{ color: 'var(--color-rose)' }} />
                  {booking.time}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.725rem', textTransform: 'uppercase', color: 'var(--color-taupe)', display: 'block' }}>
                  Practitioner
                </span>
                <strong style={{ fontSize: '0.9rem' }}>{booking.staff}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', paddingTop: '0.85rem', borderTop: '1px solid var(--color-border-subtle)' }}>
              <MapPin size={16} style={{ color: 'var(--color-rose)', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.825rem' }}>
                <strong>Sandy Beauty Haven Studio:</strong> 101 Easter Road, Edinburgh, EH7 5PP
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div style={{
            backgroundColor: 'var(--color-surface-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.25rem',
            textAlign: 'left',
            marginBottom: '1.75rem',
            fontSize: '0.875rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span>Total Service Value:</span>
              <span style={{ fontWeight: 600 }}>£{booking.totalPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', color: 'var(--color-success)' }}>
              <span>Deposit Paid Online (256-bit SSL):</span>
              <span style={{ fontWeight: 600 }}>-£{booking.depositPaid}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
              <span>Remaining Balance Due on Arrival:</span>
              <span>£{booking.remainingBalance}</span>
            </div>
          </div>

          {/* Preparation & Arrival Reminders */}
          <div style={{
            textAlign: 'left',
            borderLeft: '3px solid var(--color-rose)',
            paddingLeft: '1rem',
            marginBottom: '2rem',
            fontSize: '0.825rem',
            color: 'var(--color-taupe)',
            lineHeight: 1.6
          }}>
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-espresso)', marginBottom: '0.25rem' }}>
              Important Reminders:
            </p>
            <p style={{ margin: 0 }}>
              • Please arrive on time with clean, makeup-free lashes (no mascara or oily creams).<br />
              • A 10-minute grace window applies; past 10 minutes, the appointment may be cancelled and deposit forfeited.<br />
              • Rescheduling requires at least <strong>48 hours notice</strong> to transfer your deposit.
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={downloadIcsCalendar}
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 180px' }}
            >
              <Download size={16} />
              Add to Calendar (.ics)
            </button>
            <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 180px' }}>
              <Home size={16} />
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
