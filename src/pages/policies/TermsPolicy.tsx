import React from 'react';

export const TermsPolicy: React.FC = () => {
  return (
    <article style={{ lineHeight: 1.7, color: 'var(--color-taupe)' }}>
      <h2 style={{ fontSize: '1.85rem', color: 'var(--color-espresso)', marginBottom: '0.5rem' }}>
        Terms & Conditions
      </h2>
      <p style={{ fontStyle: 'italic', color: 'var(--color-taupe-light)', marginBottom: '2rem' }}>
        Sandy Beauty Haven • Edinburgh, Scotland
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          1. Appointments & Deposits
        </h3>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li>All appointments require a non-refundable deposit to secure your booking.</li>
          <li>Your deposit is deducted from the total cost of your treatment.</li>
          <li>Appointments are not confirmed until the deposit has been paid.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          2. Cancellations & Rescheduling
        </h3>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li>You must give at least 48 hours’ notice to cancel or reschedule your appointment.</li>
          <li>Cancellations or reschedules made within 48 hours will forfeit your deposit.</li>
          <li>Same-day cancellations or failure to attend will be charged 100% of the service cost.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          3. Late Arrivals
        </h3>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li>Please arrive on time to your appointment.</li>
          <li>If you are more than 10 minutes late, your appointment may be cancelled and your deposit forfeited.</li>
          <li>If I am able to proceed, your treatment time may be shortened to avoid affecting the next client.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          4. No-Shows
        </h3>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li>Failure to attend your appointment without notice is considered a no-show.</li>
          <li>No-shows will be required to pay in full upfront for any future bookings.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          5. Refills & Foreign Work
        </h3>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li>Refills are only accepted on work done by Sandy Beauty Haven unless otherwise agreed.</li>
          <li>Lashes done by another technician will be charged as a full set or removal + full set.</li>
          <li>You must book the correct service. If you book the wrong one, your appointment may be cancelled and deposit lost.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          6. Refund Policy
        </h3>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li>No refunds are offered on any services.</li>
          <li>If you are unhappy, please contact us within 48 hours and we will assess if a complimentary fix is appropriate.</li>
          <li>Fixes are at the technician’s discretion and must be booked within 3 days.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          7. Patch Tests & Allergies
        </h3>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li>It is your responsibility to inform us of any allergies, sensitivities, medical conditions, or eye conditions before your appointment.</li>
          <li>Patch tests are recommended for new clients or those with sensitive skin.</li>
          <li>Sandy Beauty Haven will not be held responsible for reactions where the client has failed to disclose relevant information.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          8. Aftercare & Responsibility
        </h3>
        <p style={{ marginBottom: '0.5rem' }}>
          Proper aftercare instructions will be given and must be followed. We are not responsible for poor retention or issues caused by:
        </p>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <li>Oily skin</li>
          <li>Hormones</li>
          <li>Medication</li>
          <li>Sleeping habits</li>
          <li>Not following aftercare</li>
          <li>Picking or rubbing lashes</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          9. Children, Guests & Phones
        </h3>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li>No extra guests or children are allowed unless agreed beforehand.</li>
          <li>Please keep phone use minimal during your treatment.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          10. Right to Refuse Service
        </h3>
        <p style={{ marginBottom: '0.5rem' }}>Sandy Beauty Haven reserves the right to refuse service to anyone who:</p>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <li>Is rude, aggressive, or inappropriate</li>
          <li>Has contraindications making treatment unsafe</li>
          <li>Repeatedly cancels, reschedules, or no-shows</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
          11. Agreement
        </h3>
        <p style={{ marginBottom: '0.5rem' }}>By booking an appointment with Sandy Beauty Haven, you confirm that:</p>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <li>You have read and understood these Terms & Conditions</li>
          <li>You agree to all policies stated above</li>
        </ul>
      </section>
    </article>
  );
};
