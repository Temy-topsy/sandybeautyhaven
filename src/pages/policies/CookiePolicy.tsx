import React from 'react';

export const CookiePolicy: React.FC = () => {
  return (
    <article style={{ lineHeight: 1.7, color: 'var(--color-taupe)' }}>
      <h2 style={{ fontSize: '1.85rem', color: 'var(--color-espresso)', marginBottom: '1rem' }}>
        Cookie Policy & Electronic Communications (PECR)
      </h2>
      <p style={{ fontStyle: 'italic', color: 'var(--color-taupe-light)', marginBottom: '2rem' }}>
        Effective: October 2026 • Sandy Beauty Haven, Edinburgh
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          1. What Are Cookies?
        </h3>
        <p>
          Cookies are small text files placed on your device by websites you visit. They are widely used to ensure websites function efficiently, preserve shopping or booking session state, and provide anonymous performance analytics.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          2. Categories of Cookies We Use
        </h3>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>
          <li>
            <strong>Strictly Essential Cookies:</strong> Necessary for you to navigate our website and use features such as scheduling appointments, maintaining selected dates, and completing secure checkout. Without these cookies, services you have requested cannot be provided.
          </li>
          <li>
            <strong>Performance & Analytics Cookies:</strong> Collect anonymous data on how visitors move around our site (e.g. popular treatment pages, load speeds). These help us improve usability without identifying individuals.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
          3. Managing Your Cookie Preferences
        </h3>
        <p>
          You can adjust your cookie settings at any time using our on-screen cookie preferences prompt, or by configuring your web browser to reject cookies. Please note that disabling essential cookies may impact your ability to book appointments online.
        </p>
      </section>
    </article>
  );
};
