import React from 'react';

export const BookingPolicy: React.FC = () => {
  return (
    <article style={{ lineHeight: 1.7, color: 'var(--color-taupe)' }}>
      <h2 style={{ fontSize: '1.85rem', color: 'var(--color-espresso)', marginBottom: '0.5rem' }}>
        Booking & Deposit Policy
      </h2>
      <p style={{ fontStyle: 'italic', color: 'var(--color-taupe-light)', marginBottom: '2rem' }}>
        Sandy Beauty Haven • Edinburgh, Scotland
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          1. Deposits & Confirmation
        </h3>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li>All appointments require a non-refundable deposit to secure your booking.</li>
          <li>Your deposit is deducted from the total cost of your treatment.</li>
          <li>Appointments are not confirmed until the deposit has been successfully paid online.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          2. Refills & Foreign Work
        </h3>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li>Refills are only accepted on work originally completed by Sandy Beauty Haven unless agreed in advance.</li>
          <li>Lashes applied by another artist will be charged as a full set or a gentle removal + full set.</li>
          <li>Please ensure you book the correct service. Booking an incorrect service may result in cancellation and loss of deposit.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          3. Punctuality & Late Policy
        </h3>
        <p>
          Please arrive on time. We provide a 10-minute grace period. If you are more than 10 minutes late, your booking may be cancelled and your deposit forfeited to protect following clients.
        </p>
      </section>
    </article>
  );
};
