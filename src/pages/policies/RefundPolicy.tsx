import React from 'react';

export const RefundPolicy: React.FC = () => {
  return (
    <article style={{ lineHeight: 1.7, color: 'var(--color-taupe)' }}>
      <h2 style={{ fontSize: '1.85rem', color: 'var(--color-espresso)', marginBottom: '1rem' }}>
        Refund Policy & Consumer Standards
      </h2>
      <p style={{ fontStyle: 'italic', color: 'var(--color-taupe-light)', marginBottom: '2rem' }}>
        Last updated: October 2026 • Sandy Beauty Haven, Edinburgh • UK Consumer Rights Act 2015
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          1. Completed Beauty Services
        </h3>
        <p>
          Due to the personalized, time-intensive nature of aesthetic treatments and custom lash/brow applications, <strong>completed services are strictly non-refundable</strong>.
        </p>
        <p>
          We pride ourselves on 100% customer satisfaction. If you experience any unexpected premature lash shedding (more than 40% loss within the first 48 hours following proper aftercare) or have a concern regarding brow symmetry, please notify Sandy within <strong>48 hours of your appointment</strong>. We will gladly inspect your work and provide a complimentary 30-minute adjustment session.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          2. Deposits & Advance Payments
        </h3>
        <p>
          Booking deposits compensate for reserved practitioner time, setup, and sterilization. In accordance with UK consumer law, deposits are non-refundable when an appointment is cancelled by the consumer with less than 24 hours notice or in the case of a no-show.
        </p>
        <p>
          Where an appointment is cancelled by Sandy Beauty Haven, all advance deposits are 100% refunded to the original payment method.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          3. Training Course Fees
        </h3>
        <p>
          The £100 course deposit for the 3-Day Beginner Lash Course secures your training dates and immediately authorizes the preparation and ordering of your luxury professional starter kit.
        </p>
        <p>
          If you need to change your training dates, at least <strong>7 days advance notice</strong> is required to transfer your deposit to a subsequent training intake. Course fees once training has commenced are non-refundable.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          4. How Refunds Are Processed
        </h3>
        <p>
          Approved refunds are processed via our electronic payment processor (Stripe / Acuity) directly to the original card used. Please allow 3 to 5 business days for bank clearance.
        </p>
      </section>
    </article>
  );
};
