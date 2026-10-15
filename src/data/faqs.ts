export interface FaqItem {
  id: string;
  category: 'Booking' | 'Deposits & Payments' | 'Cancellations' | 'Lash Preparation & Care' | 'Training';
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  // BOOKING
  {
    id: 'faq-1',
    category: 'Booking',
    question: 'How do I book an appointment?',
    answer: 'You can book directly through our online schedule on this website! Select your preferred treatment, choose an available date and time slot, enter your contact information, and pay the required deposit securely online. You will receive an instant booking confirmation via email and SMS.'
  },
  {
    id: 'faq-2',
    category: 'Booking',
    question: 'How far in advance should I book?',
    answer: 'We recommend scheduling your appointment at least 3 days in advance to secure your preferred slot and avoid last-minute rush fees.'
  },
  {
    id: 'faq-3',
    category: 'Booking',
    question: 'Do you offer after-hours or squeeze-in appointments?',
    answer: 'Yes! If you do not see a slot available that fits your calendar, text us directly at +44 07733777956 to inquire about an after-hours or squeeze-in slot (subject to availability for an additional £15 fee). Please include your desired date, time, and service.'
  },
  {
    id: 'faq-4',
    category: 'Booking',
    question: 'Can I book multiple treatments in one visit?',
    answer: 'Yes, you can combine complementary services such as Eyebrow Shaping or Brow Touch-Up along with your Lash Set or Infill, provided the combined appointment time fits our opening hours.'
  },

  // DEPOSITS & PAYMENTS
  {
    id: 'faq-5',
    category: 'Deposits & Payments',
    question: 'Do I need to pay a deposit?',
    answer: 'Yes. All lash extension appointments require a non-refundable £15 deposit to confirm your booking. Semi-permanent brow services require a £50 deposit. The 3-day lash training requires a £100 deposit. The remaining balance is paid on the day of your appointment.'
  },
  {
    id: 'faq-6',
    category: 'Deposits & Payments',
    question: 'What payment methods do you accept?',
    answer: 'Online deposits are processed securely via major credit/debit cards (Visa, Mastercard, American Express), Apple Pay, and Google Pay. Remaining balances in the studio can be paid via card or bank transfer.'
  },
  {
    id: 'faq-7',
    category: 'Deposits & Payments',
    question: 'Is my deposit refundable if I cancel?',
    answer: 'Deposits are strictly non-refundable. However, your deposit is transferable to a new date as long as you reschedule at least 24 hours in advance via your confirmation email.'
  },

  // CANCELLATIONS
  {
    id: 'faq-8',
    category: 'Cancellations',
    question: 'What is your cancellation and rescheduling policy?',
    answer: 'Please provide at least 24 hours notice to cancel or reschedule your appointment. Same-day cancellations or reschedules (less than 24 hours notice) will result in a 50% service charge. No-call / no-shows will result in a 100% service charge, and a new deposit will be required to book again.'
  },
  {
    id: 'faq-9',
    category: 'Cancellations',
    question: 'What happens if I arrive late to my appointment?',
    answer: 'We provide a 10-minute grace period. If you arrive after the 10-minute grace period, a £10 late fee applies. If you are more than 20 minutes late, your appointment will be cancelled to avoid delaying subsequent clients, and deposit will be forfeited.'
  },

  // PREPARATION & CARE
  {
    id: 'faq-10',
    category: 'Lash Preparation & Care',
    question: 'How should I prepare for my lash appointment?',
    answer: 'Please arrive with clean, makeup-free eyes and lashes—no mascara, eyeliner, or eyeshadow. Avoid using oil-based cleansers or moisturizers around your eyes for 24 hours prior. Try to avoid caffeine right before your visit to prevent fluttery eyelids. If you wear contact lenses, please remove them before your appointment or bring a case and solution.'
  },
  {
    id: 'faq-11',
    category: 'Lash Preparation & Care',
    question: 'How long do lash extensions last?',
    answer: 'Lash extensions typically last 2 to 3 weeks with proper aftercare before requiring an infill. Natural lashes shed continuously, so regular infills every 2–3 weeks keep your set looking full and fresh.'
  },
  {
    id: 'faq-12',
    category: 'Lash Preparation & Care',
    question: 'Do you fill in lashes done by other lash technicians (foreign fills)?',
    answer: 'No, we do not perform foreign fills over work done by other artists. Due to variations in adhesive, lash weight, and isolation technique, we recommend booking a Lash Removal (£15) followed by a fresh full set.'
  },
  {
    id: 'faq-13',
    category: 'Lash Preparation & Care',
    question: 'Can I wear makeup with lash extensions?',
    answer: 'You can wear face makeup, but avoid oil-based products, waterproof eyeliner, and mascara on or near the extensions, as oils dissolve the medical-grade adhesive bond.'
  },

  // TRAINING
  {
    id: 'faq-14',
    category: 'Training',
    question: 'Who is the 3-Day Beginner Lash Course suitable for?',
    answer: 'Our course is tailored specifically for complete beginners with zero previous beauty experience, as well as beauty therapists looking to add lash extensions to their service menu.'
  },
  {
    id: 'faq-15',
    category: 'Training',
    question: 'Is the course certified?',
    answer: 'Yes! The course is fully CPD-Accredited. Upon successful completion and case study review, you will receive an accredited certificate enabling you to obtain professional beauty insurance and take paying clients immediately.'
  },
  {
    id: 'faq-16',
    category: 'Training',
    question: 'What is included in the £600 course fee?',
    answer: 'The course includes 3 intensive days of 1-on-1 private tuition with Sandy, a comprehensive printed training manual, a full luxury professional starter kit (worth £150+), live model practice under supervision, your CPD certificate, and lifetime ongoing mentorship support.'
  }
];
