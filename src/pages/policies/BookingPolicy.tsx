import React from 'react';

export const BookingPolicy: React.FC = () => {
  return (
    <article style={{ lineHeight: 1.7, color: 'var(--color-taupe)' }}>
      <h2 style={{ fontSize: '1.85rem', color: 'var(--color-espresso)', marginBottom: '1rem' }}>
        Booking & Deposit Policy
      </h2>
      <p style={{ fontStyle: 'italic', color: 'var(--color-taupe-light)', marginBottom: '2rem' }}>
        Last updated: October 2026 • Sandy Beauty Haven, Edinburgh
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          1. Online Booking & Deposit Requirements
        </h3>
        <p>
          To maintain an orderly schedule and respect dedicated appointment slots, all appointments at Sandy Beauty Haven require a non-refundable deposit at the time of booking:
        </p>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>
          <li><strong>Lash Extension Services & Infills:</strong> £15 non-refundable deposit.</li>
          <li><strong>Semi-Permanent Brow Services:</strong> £50 non-refundable deposit.</li>
          <li><strong>CPD 3-Day Beginner Lash Training:</strong> £100 non-refundable deposit.</li>
          <li><strong>Extras & Removals:</strong> Full payment of £15 at time of booking.</li>
        </ul>
        <p>
          Deposits are credited toward your total appointment fee. The remaining balance is payable on the day of your service via card or bank transfer at our studio (101 Easter Road, Edinburgh).
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          2. Advance Notice & Rush Fees
        </h3>
        <p>
          We encourage clients to book at least 3 days in advance. Last-minute squeeze-in requests or after-hours appointments may be accommodated subject to practitioner availability for an additional £15 fee (please text <strong>+44 07733777956</strong> to inquire).
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          3. Punctuality & Late Arrival Policy
        </h3>
        <p>
          Appointments are timed precisely to allow full application time without compromising subsequent clients:
        </p>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>
          <li><strong>10-Minute Grace Period:</strong> You are granted a 10-minute courtesy window.</li>
          <li><strong>Late Fee:</strong> Arrivals after 10 minutes will incur a mandatory £10 late fee.</li>
          <li><strong>Cancellations past 20 Minutes:</strong> If you are more than 20 minutes late, your appointment will be cancelled, your deposit forfeited, and you will need to reschedule a new appointment.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          4. Foreign Lash Infills
        </h3>
        <p>
          We strictly do not infill extensions completed by another technician ("foreign fills"). Differences in isolation quality, adhesives, and lash weights can jeopardize natural lash health. If you currently have extensions from another salon, please book a <strong>Lash Removal (£15)</strong> together with a full fresh set.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          5. Studio Etiquette & Guests
        </h3>
        <p>
          To ensure a calm, hygienic, and relaxing atmosphere for all clients and practitioners, children and additional guests are not permitted in the treatment area during appointments.
        </p>
      </section>

      <div style={{
        marginTop: '2.5rem',
        padding: '1.5rem',
        backgroundColor: 'var(--color-surface-subtle)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)'
      }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-espresso)', marginBottom: '0.5rem' }}>
          Questions about booking?
        </h4>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Reach out to our team at <a href="mailto:Lashbysandy9@gmail.com" style={{ textDecoration: 'underline' }}>Lashbysandy9@gmail.com</a> or call <a href="tel:+447733777956">+44 07733777956</a>.
        </p>
      </div>
    </article>
  );
};
