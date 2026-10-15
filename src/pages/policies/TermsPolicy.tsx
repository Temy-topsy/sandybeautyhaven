import React from 'react';

export const TermsPolicy: React.FC = () => {
  return (
    <article style={{ lineHeight: 1.7, color: 'var(--color-taupe)' }}>
      <h2 style={{ fontSize: '1.85rem', color: 'var(--color-espresso)', marginBottom: '1rem' }}>
        Terms and Conditions
      </h2>
      <p style={{ fontStyle: 'italic', color: 'var(--color-taupe-light)', marginBottom: '2rem' }}>
        Effective: October 2026 • Sandy Beauty Haven, Edinburgh
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          1. Agreement to Terms
        </h3>
        <p>
          By accessing and using this website, scheduling an appointment, or paying a booking deposit with Sandy Beauty Haven, you agree to be bound by these Terms and Conditions and our associated Booking and Cancellation policies.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          2. Age Restrictions & Medical Suitability
        </h3>
        <p>
          Clients must be at least 16 years of age for lash extension services and at least 18 years of age for semi-permanent brow procedures (Ombré / Combo brows).
        </p>
        <p>
          It is the client's sole responsibility to disclose all known eye conditions, allergies to cyanoacrylate or pigment, pregnancy, or recent eye surgery prior to treatment. We reserve the right to refuse service if an active contraindication is present.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          3. Intellectual Property
        </h3>
        <p>
          All content, photography, graphics, logos, and training curricula published on this website are the intellectual property of Sandy Beauty Haven and may not be reproduced without written consent.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          4. Governing Law
        </h3>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of Scotland, United Kingdom, and subject to the exclusive jurisdiction of the Scottish courts.
        </p>
      </section>
    </article>
  );
};
