import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Smartphone,
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
    staff: 'Sandy Beauty',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '11:00 AM',
    client: {
      fullName: 'Valued Client',
      email: 'client@example.com',
      phone: '+44 07733777956',
      notes: '',
      agreeToPolicies: true,
      smsReminders: true
    },
    totalPrice: 60,
    depositPaid: 15,
    remainingBalance: 45,
    bookedAt: new Date().toISOString()
  };

  const formattedDate = new Date(booking.date + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const downloadIcsCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sandy Beauty Haven//Appointment//EN
BEGIN:VEVENT
SUMMARY:${booking.service.name} - Sandy Beauty Haven
DESCRIPTION:Appointment for ${booking.service.name} with ${booking.staff}. Ref: ${booking.reference}. Location: 101 Easter Road, Edinburgh.
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
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          boxShadow: 'var(--shadow-card)',
          textAlign: 'center'
        }}>
          {/* Success Check Icon */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <CheckCircle2 size={36} />
          </div>

          <span className="badge badge-rose" style={{ marginBottom: '0.75rem' }}>
            Confirmed Appointment
          </span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '0.5rem' }}>
            We look forward to seeing you, {booking.client.fullName}!
          </h1>
          <p style={{ color: 'var(--color-taupe)', marginBottom: '1.75rem' }}>
            Your booking reference is <strong style={{ color: 'var(--color-espresso)' }}>{booking.reference}</strong>.
          </p>

          {/* Automated Notification Confirmation Alerts */}
          <div style={{
            backgroundColor: 'var(--color-surface-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '1rem',
            textAlign: 'left',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            fontSize: '0.85rem',
            color: 'var(--color-taupe)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
              <span>Confirmation receipt sent to: <strong>{booking.client.email}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Smartphone size={16} style={{ color: 'var(--color-rose)', flexShrink: 0 }} />
              <span>SMS confirmation and 24h reminder sent to: <strong>{booking.client.phone}</strong></span>
            </div>
          </div>

          {/* Appointment Specs Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.5rem',
            textAlign: 'left',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
              Appointment Schedule & Venue
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-taupe)', display: 'block' }}>
                  Service
                </span>
                <strong style={{ fontSize: '1rem' }}>{booking.service.name}</strong>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-taupe)' }}>
                  {booking.service.duration} mins with {booking.staff}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-taupe)', display: 'block' }}>
                  Date & Time
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.95rem', fontWeight: 600 }}>
                  <Calendar size={14} style={{ color: 'var(--color-rose)' }} />
                  {formattedDate}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--color-taupe)' }}>
                  <Clock size={14} style={{ color: 'var(--color-rose)' }} />
                  {booking.time}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', paddingTop: '1rem', borderTop: '1px solid var(--color-border-subtle)' }}>
              <MapPin size={18} style={{ color: 'var(--color-rose)', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.85rem' }}>
                <strong>Sandy Beauty Haven Studio:</strong><br />
                101 Easter Road, Edinburgh, EH7 5PP, Scotland
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div style={{
            backgroundColor: 'var(--color-surface-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.25rem',
            textAlign: 'left',
            marginBottom: '2rem',
            fontSize: '0.875rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span>Total Service Price:</span>
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

          {/* Preparation & Arrival Notes */}
          <div style={{
            textAlign: 'left',
            borderLeft: '3px solid var(--color-rose)',
            paddingLeft: '1rem',
            marginBottom: '2.5rem',
            fontSize: '0.85rem',
            color: 'var(--color-taupe)',
            lineHeight: 1.6
          }}>
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-espresso)', marginBottom: '0.25rem' }}>
              Important Arrival Reminders:
            </p>
            <p style={{ margin: 0 }}>
              • Please arrive with clean, makeup-free lashes (no mascara or oily creams).<br />
              • Remove contact lenses prior to service or bring your lens case.<br />
              • A 10-minute grace period is provided; a £10 late fee applies after 10 minutes.<br />
              • Reschedules require 24 hours notice to transfer your deposit.
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={downloadIcsCalendar}
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Download size={16} />
              Add to Calendar (.ics)
            </button>
            <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Home size={16} />
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
