import React from 'react';

export const CancellationPolicy: React.FC = () => {
  return (
    <article style={{ lineHeight: 1.7, color: 'var(--color-taupe)' }}>
      <h2 style={{ fontSize: '1.85rem', color: 'var(--color-espresso)', marginBottom: '1rem' }}>
        Cancellation & Rescheduling Policy
      </h2>
      <p style={{ fontStyle: 'italic', color: 'var(--color-taupe-light)', marginBottom: '2rem' }}>
        Last updated: October 2026 • Sandy Beauty Haven, Edinburgh
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          1. Notice Window & Deposit Transferability
        </h3>
        <p>
          We require at least <strong>24 hours notice</strong> prior to your scheduled start time if you need to cancel or reschedule your appointment.
        </p>
        <p>
          If you give at least 24 hours notice, your initial deposit will be <strong>fully transferable</strong> to a new appointment date within 30 days. You may reschedule directly via the link in your confirmation email or by texting us at +44 07733777956.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          2. Same-Day Cancellations (Under 24 Hours)
        </h3>
        <p>
          Cancellations or rescheduling requests made within 24 hours of your appointment time will result in a <strong>50% service charge</strong> of the total scheduled service price.
        </p>
        <p>
          Your initial deposit will be forfeited, and a fresh deposit will be required to re-book.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          3. No-Call / No-Show Policy
        </h3>
        <p>
          Failing to show up for your appointment without prior communication impacts our practitioners and leaves an unfilled slot that could have served another client.
        </p>
        <p>
          All no-call / no-shows will result in a <strong>100% service fee charge</strong> of the full appointment cost. Clients with unpaid no-show fees will be blocked from future online booking until the balance is settled.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          4. Practitioner Cancellations
        </h3>
        <p>
          In the very rare circumstance that Sandy or Bukky needs to cancel or reschedule your appointment due to sudden illness, unforeseen studio maintenance, or an emergency:
        </p>
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li>You will be contacted immediately with the choice of rescheduling to priority VIP slots.</li>
          <li>If an agreeable time cannot be found, your full deposit will be refunded to your original payment card immediately.</li>
        </ul>
      </section>
    </article>
  );
};
