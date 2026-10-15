import React from 'react';

export const CancellationPolicy: React.FC = () => {
  return (
    <article style={{ lineHeight: 1.7, color: 'var(--color-taupe)' }}>
      <h2 style={{ fontSize: '1.85rem', color: 'var(--color-espresso)', marginBottom: '0.5rem' }}>
        Cancellation & Rescheduling Policy
      </h2>
      <p style={{ fontStyle: 'italic', color: 'var(--color-taupe-light)', marginBottom: '2rem' }}>
        Sandy Beauty Haven • Edinburgh, Scotland
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          1. 48-Hour Notice Requirement
        </h3>
        <p>
          You must give at least <strong>48 hours notice</strong> prior to your scheduled appointment start time to cancel or reschedule your treatment.
        </p>
        <p>
          If you provide at least 48 hours notice, your non-refundable deposit can be transferred to a new appointment date.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          2. Cancellations Within 48 Hours
        </h3>
        <p>
          Cancellations or reschedules made with less than 48 hours notice will forfeit your deposit in full. A new deposit will be required to schedule a future appointment.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          3. Same-Day Cancellations & No-Shows
        </h3>
        <p>
          Same-day cancellations or failure to attend without notice will be charged <strong>100% of the service cost</strong>.
        </p>
        <p>
          Clients with a no-show history will be required to pay in full upfront for any future bookings.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          4. Late Arrivals & 10-Minute Grace Window
        </h3>
        <p>
          Please arrive promptly. If you are more than 10 minutes late, your appointment may be cancelled and your deposit forfeited. If the technician is able to proceed, your treatment time will be shortened accordingly to protect subsequent clients' appointments.
        </p>
      </section>
    </article>
  );
};
