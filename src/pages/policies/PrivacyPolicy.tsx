import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <article style={{ lineHeight: 1.7, color: 'var(--color-taupe)' }}>
      <h2 style={{ fontSize: '1.85rem', color: 'var(--color-espresso)', marginBottom: '1rem' }}>
        Privacy Policy (UK GDPR Compliance)
      </h2>
      <p style={{ fontStyle: 'italic', color: 'var(--color-taupe-light)', marginBottom: '2rem' }}>
        Effective Date: October 2026 • Sandy Beauty Haven, Edinburgh
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          1. Who We Are (Data Controller)
        </h3>
        <p>
          Sandy Beauty Haven is the data controller responsible for your personal data. We are located at <strong>101 Easter Road, Edinburgh, EH7 5PP, Scotland, UK</strong>.
        </p>
        <p>
          If you have any questions regarding your data privacy or rights under the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018, please contact our Data Protection Officer at: <a href="mailto:Lashbysandy9@gmail.com" style={{ textDecoration: 'underline' }}>Lashbysandy9@gmail.com</a>.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          2. Personal Data We Collect
        </h3>
        <p>
          When you use our website, book an appointment, or enrol in lash training, we may collect:
        </p>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>
          <li><strong>Identity Data:</strong> Full name, title.</li>
          <li><strong>Contact Data:</strong> Email address, mobile telephone number, emergency contact if requested.</li>
          <li><strong>Transaction Data:</strong> Details about payments made, deposits, and service history. (We do NOT store full debit/credit card numbers on our servers; card payments are tokenized via PCI-DSS compliant providers).</li>
          <li><strong>Health & Allergy Information:</strong> Relevant contraindications, patch test records, and eye sensitivities to ensure treatment safety.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          3. How We Use Your Data
        </h3>
        <p>We process your data strictly under the following lawful bases:</p>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>
          <li><strong>Performance of a Contract:</strong> To book, coordinate, confirm, and provide your beauty appointments and lash training.</li>
          <li><strong>Legal & Insurance Obligation:</strong> To maintain treatment records and patch test records required by our professional beauty insurance underwriter.</li>
          <li><strong>Legitimate Interests:</strong> To send transactional SMS/email reminders to prevent missed appointments.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          4. Third-Party Service Providers
        </h3>
        <p>We may share your data with trusted processors who assist in operating our online platform:</p>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>
          <li><strong>Booking Systems:</strong> Acuity Scheduling / Squarespace.</li>
          <li><strong>Payment Processors:</strong> Stripe / Square (PCI-DSS compliant).</li>
          <li><strong>Communication Gateways:</strong> Transactional SMS and Email gateways for appointment updates.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          5. Your Statutory Rights
        </h3>
        <p>
          Under UK GDPR, you have the right to request access to your personal information, request correction of inaccurate data, request erasure, object to processing, or lodge a complaint with the UK Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>ico.org.uk</a>.
        </p>
      </section>
    </article>
  );
};
