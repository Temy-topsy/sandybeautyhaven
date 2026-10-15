PRODUCT REQUIREMENTS DOCUMENT

Sandy's Beauty Website

Project: Beauty, Booking & Training Website
Location: Edinburgh, Scotland, United Kingdom
Primary market: United Kingdom
Primary objective: Convert website visitors into paying clients and training students.
Frontend: React, TypeScript, Vite
Design direction: Premium, feminine, editorial, minimalist
Business model: Beauty services, appointment bookings, and professional training.

Working assumption: Lash by Sandyy is the existing business identity. The final public-facing brand name, domain, logo, and branding must be confirmed before launch.


---

1. Product Vision

Build a premium digital storefront for Sandy's beauty business that combines the visual quality of an established beauty brand with the usability of a modern booking platform.

The website must communicate three things almost immediately:

1. Quality: The business provides professional beauty services with a strong reputation for results.


2. Trust: Potential clients can inspect real work, genuine reviews, transparent prices, and clear policies before committing.


3. Convenience: Visitors can book and pay online without needing to call, send a WhatsApp message, or wait for a response.



The website should also present Sandy's CPD-certified, one-to-one lash training as a distinct offering for aspiring lash artists.

Core conversion goals

Priority	Goal	Desired outcome

P0	Service bookings	Visitors become confirmed clients.
P0	Secure payments	Clients pay the required deposit or full amount.
P0	Appointment notifications	Sandy and the client receive the appropriate email and SMS notifications.
P1	Training enquiries and bookings	Aspiring lash artists discover and book training.
P1	Local SEO	Potential clients find the business through relevant Edinburgh searches.
P1	Trust and credibility	Genuine reviews and real portfolio images reduce booking hesitation.
P2	Returning customers	Existing clients can easily find services and book again.


The website should prioritise completed bookings over superficial engagement metrics.


---

2. Target Audience

Audience A: Beauty clients

People in Edinburgh and surrounding areas looking for professional lash, brow, hair, or other beauty services.

Their concerns:

Will the results look good?

Is the artist experienced?

How much does the service cost?

Where is the business located?

Can I find an appointment that fits my schedule?

What happens if I need to cancel?

Is my deposit refundable?


Website response: Real portfolio images, visible pricing, reviews, available appointments, location information, and transparent policies.

Audience B: Returning clients

Clients who already know Sandy and want to book another appointment quickly.

Website response: Easy access to the service menu and booking calendar, without forcing them through lengthy introductory content.

Audience C: Aspiring lash artists

People interested in learning professional lash techniques through one-to-one training.

Their concerns:

What will I learn?

Is the training certified?

Is it suitable for beginners?

How long does it take?

What is included?

How much does it cost?

What support will I receive?


Website response: A dedicated training page explaining the course, learning outcomes, certification details, pricing, and booking process.

Important: We must confirm exactly what Sandy's CPD certification covers before making claims about qualifications, accreditation, or certification awarded to students.


---

3. Brand & Visual Direction

The design concept: Editorial Beauty

The website should feel like an independent luxury beauty brand rather than a generic salon template.

Think sophisticated beauty editorial, contemporary fashion photography, elegant typography, and a calm interface.

These images are visual references for the creative direction, not assets to copy directly into the finished website.

Proposed colour palette

Colour	Hex	Usage

Warm ivory	#FAF7F2	Primary background
Soft blush	#EAD8D5	Secondary surfaces and subtle accents
Deep espresso	#29211F	Primary text
Muted rose	#A87578	Selected accents
White	#FFFFFF	Cards, forms, and clean sections


These are initial design recommendations, not confirmed brand colours.

Typography

Use a deliberate pairing of:

Display font: An elegant editorial serif, such as Cormorant Garamond.

Interface font: A clean sans-serif, such as DM Sans.


The serif should establish personality. The sans-serif should handle navigation, prices, buttons, forms, and supporting text.

Avoid using decorative typography everywhere.

Design rules

1. Use generous whitespace and strong visual hierarchy.


2. Use authentic, high-quality images of Sandy's actual work.


3. Keep navigation compact and predictable.


4. Make booking buttons easy to find without making every section look like an advertisement.


5. Use restrained transitions and subtle interactions.


6. Ensure the website looks exceptional on mobile.


7. Use consistent spacing, typography, buttons, and image treatments.


8. Avoid excessive gradients, glassmorphism, floating decorative elements, and unnecessary animations.


9. Do not invent testimonials, ratings, client numbers, or business achievements.


10. Avoid generic AI-generated beauty imagery that misrepresents the actual services.



The photographs should carry the emotional weight of the design. The interface should get out of their way.


---

4. Website Architecture

The website will contain the following pages.

Route	Page	Purpose

/	Home	Introduce the brand and convert visitors.
/services	Services	Browse all available beauty services.
/services/:slug	Service details	Review a service's price, duration, description, and requirements.
/book	Booking	Select a service, date, and available time.
/schedule	Schedule	Display available appointment dates and times.
/checkout	Checkout	Review the booking and complete payment.
/booking-confirmed	Confirmation	Display the booking reference and appointment details.
/training	Training	Promote and sell one-to-one lash training.
/gallery	Gallery	Showcase authentic beauty work.
/reviews	Reviews	Display genuine customer feedback.
/about	About	Tell Sandy's story and establish credibility.
/contact	Contact	Display contact details, location, and enquiries.
/faq	FAQs	Answer common booking and service questions.
/policies/booking	Booking policy	Explain appointment requirements.
/policies/cancellation	Cancellation policy	Explain cancellations and rescheduling.
/policies/refunds	Refund policy	Explain applicable refund terms.
/policies/privacy	Privacy policy	Explain how personal data is processed.
/policies/terms	Terms and conditions	Set out the website's applicable terms.
/policies/cookies	Cookie policy	Explain cookie usage where applicable.


Navigation

Keep the main navigation compact:

Home | Services | Training | Gallery | About

Right side:

Book an Appointment

On mobile, use a simple menu with a clearly visible booking action.

The footer should provide contact information, opening hours, location, policies, social links, and secondary navigation.

Do not force every page into the main navigation.


---

5. Homepage Requirements

The homepage is the most important sales page.

Its job is to communicate value, establish trust, present the services, and move visitors towards booking.

Section 1: Header

Requirements:

Business logo or wordmark.

Main navigation.

Primary booking button.

Responsive mobile menu.

Accessible keyboard navigation.

Header styling that works with the hero photography.


Keep the header compact.

Do not fill it with announcement bars, multiple CTA buttons, and unnecessary labels.

Section 2: Hero

The hero should immediately communicate what Sandy offers and where she operates.

Suggested headline:

Beauty that feels like you, only elevated.

Supporting copy:

Professional lash, brow, hair and beauty services in Edinburgh, tailored to your style, your features and the look you want to achieve.

Primary CTA: Explore Services

Secondary CTA: Book an Appointment

Use one strong, authentic beauty photograph with a considered crop and excellent mobile positioning.

A short editorial introduction to Sandy's work may sit below the headline if the composition supports it.

Do not place a lengthy paragraph over the hero image.

Conversion requirements

Within the first screen, visitors should understand:

What the business offers.

Where it is located.

How to explore services.

How to book.


Avoid rotating carousels in the hero. One excellent image is preferable to several competing images.

Section 3: Trust indicators

Present verified trust signals, such as:

Genuine Google review rating.

Number of verified reviews, if confirmed.

Relevant professional qualifications.

Authentic before-and-after results, where appropriate and consented to.


Example layout:

Client reviews | Professional standards | Personalised treatments

Do not invent numerical claims or imply that all services are certified if that is not accurate.

Section 4: Featured services

Show a small, curated selection of the most commercially important services.

Each service card should contain:

Service photograph.

Service name.

Short description.

Starting price or exact price.

Appointment duration, where confirmed.

A clear booking action.


Example:

Classic Lash Extensions

A refined lash look designed to complement your natural features.

From £[confirmed price]

Duration: [confirmed duration]

View Service

The prices and descriptions above must be populated from Sandy's verified service information. Do not treat the example as an actual price list.

Use a restrained grid, not a huge wall of cards.

Include a clear route to the complete service catalogue.

Section 5: The signature experience

A short section explaining what makes the experience distinctive.

Potential themes:

Personalised service.

Attention to detail.

Professional standards.

Comfort and care.

Consistent results.


Use claims that Sandy can substantiate.

Pair the copy with a genuine image of her work or treatment space.

Section 6: Before-and-after gallery

Display selected work with consistent image dimensions and a considered layout.

Requirements:

Optimised image delivery.

Responsive grid.

Optional lightbox.

Accessible image descriptions.

Appropriate consent for identifiable clients.

No misleading edits to before-and-after comparisons.


The gallery should demonstrate capability, not merely decorate the page.

Section 7: Customer reviews

Show selected genuine testimonials.

Each testimonial may include:

Customer's first name or approved display name.

Review text.

Review source.

Date, where available and appropriate.


Provide a link to the original Google reviews where possible.

Do not manufacture reviews or present invented testimonials as customer feedback.

Section 8: Training promotion

Give the one-to-one lash training offer its own visual treatment.

Suggested headline:

Your next chapter in beauty starts here.

Supporting copy:

Explore personalised lash training designed to help aspiring lash artists develop their technique, confidence and professional skills.

CTA: Explore Training

The dedicated training page will contain the full course information.

Section 9: Booking call to action

A clear closing section.

Suggested headline:

Your next appointment starts here.

Supporting copy should explain that clients can browse services and select a suitable appointment online.

CTA: Book Your Appointment

Section 10: FAQs

Include five or six high-value questions on the homepage, with a link to the complete FAQ page.

Prioritise questions about:

Booking.

Deposits and payments.

Cancellations.

Appointment preparation.

Location.

Rescheduling.


Only publish answers once Sandy has confirmed the relevant policies.

Section 11: Footer

Include:

Business name.

Edinburgh location.

Confirmed contact details.

Opening hours.

Social media links.

Service links.

Booking link.

Training link.

Policy pages.

Copyright information.



---

6. Services Catalogue and Shopping Experience

This is where the project becomes more than a traditional landing page.

The services section should work like a lightweight e-commerce storefront, adapted for appointment-based services.

However, there is an important UX decision to make.

A client should not be encouraged to add unrelated treatments to a cart if those treatments require incompatible appointment durations or schedules.

The cart must understand appointment availability.

Service categories

The initial categories are:

1. Lash services.


2. Brow services.


3. Hair services.


4. Other beauty services.


5. Lash training.



The final categories depend on the confirmed service menu.

Service catalogue

Visitors should be able to:

Browse categories.

View service photographs.

Search services by name.

Filter by category.

See prices.

See appointment durations.

Read descriptions.

Review relevant requirements.

Select a service.


Individual service details

Each service should contain structured information:

Field	Description

Name	Public-facing service name
Slug	SEO-friendly URL
Category	Lash, brow, hair, or other
Description	Clear explanation of the service
Price	Exact or starting price
Duration	Expected appointment duration
Deposit	Required deposit, if applicable
Image	Approved service image
Preparation	Instructions before attending
Aftercare	Instructions after treatment, where relevant
Requirements	Age restrictions or other applicable conditions
Availability	Bookable dates and times
Active status	Whether the service is currently offered


Add-to-cart behaviour

When a client selects a service:

1. The service is added to the booking selection.


2. The client can continue browsing or proceed to scheduling.


3. The booking flow checks the appointment requirements.


4. The client selects an available time.


5. The system calculates the applicable amount.


6. The client proceeds to checkout.



Multiple services

The system should support multiple services where operationally possible.

For example, a client may wish to book a brow service and a lash treatment in one visit.

The booking system must verify:

Combined appointment duration.

Staff availability.

Any required gap between services.

Whether the services can be performed consecutively.

Whether the selected time slot can accommodate the full booking.


If the scheduling provider cannot support this workflow reliably, the initial release should allow clients to book one appointment at a time.

That is better than accepting bookings the business cannot fulfil.


---

7. Booking System

This is a core product feature.

The system must support real availability, prevent conflicting bookings, send notifications, and provide clear confirmation.

Recommended approach

Use a dedicated appointment-booking platform integrated into the React website.

Potential providers include:

Fresha

Acuity Scheduling

SimplyBook.me

Calendly


Official websites: [Fresha](https://www.fresha.com?utm_source=chatgpt.com), [Acuity Scheduling](https://acuityscheduling.com?utm_source=chatgpt.com), [SimplyBook.me](https://simplybook.me?utm_source=chatgpt.com), and [Calendly](https://calendly.com?utm_source=chatgpt.com).

My recommendation is to evaluate Fresha and Acuity first, with SimplyBook.me as another strong candidate. Calendly is worth considering, particularly for training consultations, but it should not automatically be the choice for a beauty business with a service catalogue, deposits, and potentially multiple treatments per visit.

Before selecting a provider, confirm its current UK pricing, SMS charges, payment capabilities, branding restrictions, and integration options.

Booking flow

Step 1: Choose a service

The client selects the treatment or training session.

Step 2: Select the appointment date

Display an interactive calendar showing actual available dates.

Step 3: Select an available time

Only offer slots that satisfy the provider's availability and booking rules.

Step 4: Enter client details

Required fields:

Full name.

Email address.

Mobile phone number.

Selected service.

Selected appointment.

Additional information, if necessary.


Avoid collecting unnecessary personal information.

Step 5: Review the booking

Display:

Service.

Date.

Time.

Duration.

Price.

Deposit or full payment amount.

Remaining balance, if applicable.

Relevant policy links.


Step 6: Payment

Collect the required deposit or full payment through the configured payment provider.

Step 7: Confirmation

Display a clear confirmation page and send the relevant notifications.

Availability management

The booking system must support:

Weekly opening hours.

Exceptions to normal opening hours.

Holidays and days off.

Appointment duration.

Preparation and cleanup buffers.

Minimum notice periods.

Booking cut-off times.

Cancellation and rescheduling rules.

Prevention of double bookings.


Dedicated schedule page

The /schedule route should display the available appointment dates and times.

This must be a real scheduling interface connected to the booking provider, not a static calendar with invented availability.

A calendar should be easy to navigate on mobile.

Show unavailable dates as disabled rather than allowing clients to select them and fail later.

Opening and closing times

Display the confirmed opening hours in the footer and contact page.

The schedule should automatically respect those hours.

For example, if Sandy confirms that appointments are available from 10:00 to 18:00 on a particular day, the system should offer eligible appointments within those hours, subject to treatment duration and availability.

Do not assume that these example times represent her actual schedule.

Store appointment times in a way that correctly handles the Europe/London time zone, including daylight-saving changes.


---

8. Email and SMS Notifications

This is a mandatory requirement.

Appointment notifications must go through email and SMS, not WhatsApp.

Client notifications

After a successful booking, the client should receive:

Email confirmation

Business name.

Booking reference.

Service.

Appointment date and time.

Location.

Payment summary.

Cancellation or rescheduling instructions.

Contact information.


SMS confirmation

Short confirmation message.

Appointment date and time.

Business name.

Booking reference or relevant appointment link.


Additional notifications may include:

Appointment reminders.

Rescheduling confirmations.

Cancellation confirmations.

Payment receipts or payment-status updates, where supported.


Business notifications

Sandy should receive an email and SMS when a new appointment is successfully booked.

Notifications should also be sent when an appointment is cancelled or rescheduled.

Suggested reminder schedule

Subject to the booking provider's capabilities:

Immediate confirmation after booking.

Reminder 24 hours before the appointment.

Optional reminder 2 hours before the appointment.


The reminder schedule should be configurable.

Important technical distinction

Email and SMS delivery are not the same as simply opening an email application or composing a text message.

The website needs an integration that actually sends the notifications.

Potential providers include:

Twilio for SMS.

Resend for transactional email.


Official websites: [Twilio](https://www.twilio.com?utm_source=chatgpt.com) and [Resend](https://resend.com?utm_source=chatgpt.com).

However, if the selected booking provider already includes reliable email and SMS notifications, use those features first. Avoid paying for and maintaining duplicate notification infrastructure unnecessarily.

If a custom SMS integration is needed, verify UK sender requirements, message pricing, delivery reporting, and whether a suitable UK sender configuration is available.

Marketing texts must be treated separately from transactional appointment notifications. Obtain the appropriate permission before sending promotional messages.


---

9. Secure Payment and Checkout

The website should use a reputable payment provider rather than collecting or storing card details directly.

Recommended options

Option A: Stripe

Stripe is a strong candidate for a custom React website.

Official website: [Stripe](https://stripe.com/gb?utm_source=chatgpt.com).

Potential advantages:

Hosted checkout.

Support for major payment cards.

Support for Apple Pay and Google Pay where eligible.

Deposit or full-payment workflows.

Refund management.

Payment status tracking.

Integration with a custom booking system.


Option B: Square

Square is another option worth evaluating.

Official website: [Square UK](https://squareup.com/gb/en?utm_source=chatgpt.com).

Its suitability depends on the booking workflow, the business's eligibility, and the current features available to UK merchants.

Option C: Booking-platform payments

If Fresha, Acuity, or another selected platform supports the required payment flow, using its integrated payment capabilities may be the simplest solution.

Compare the actual costs and limitations before choosing.

Recommended checkout flow

1. Client selects a service.


2. Client selects an available appointment.


3. The booking is held temporarily, where supported.


4. Client reviews the order and applicable policies.


5. Client pays the required deposit or full amount.


6. The payment provider confirms the transaction.


7. The booking becomes confirmed.


8. Email and SMS notifications are triggered.


9. The client sees a confirmation page.



Payment security requirements

Never store raw card numbers or security codes.

Use hosted checkout or an appropriately secured payment integration.

Keep secret API keys on the server.

Verify payment status server-side.

Verify webhook signatures.

Make payment processing idempotent to avoid duplicate charges.

Prevent clients from changing prices or deposits through browser requests.

Handle abandoned payments and failed transactions.

Reconcile payment and booking status.

Do not mark an appointment as paid based solely on a client-side success page.


Deposit handling

Sandy must confirm whether clients pay:

A fixed deposit.

A percentage deposit.

The full amount.

A deposit for some services and full payment for others.


The system must support the agreed arrangement.

The amount charged must be clear before the client confirms payment.

Also distinguish a non-refundable deposit policy from a blanket statement that customers have no right to a refund. Consumer rights in the UK may affect what terms are enforceable.


---

10. Reviews and Social Proof

Create a dedicated reviews page.

The purpose is to help prospective clients evaluate the business before booking.

Requirements

Display authentic reviews.

Attribute reviews to the correct source.

Use approved customer photographs only.

Provide a link to the original review where possible.

Make reviews readable on mobile.

Allow the business to add approved testimonials without editing the code unnecessarily.


If automated Google review integration is unavailable or too costly, begin with a manually maintained selection of genuine reviews.

Do not scrape reviews in ways that violate platform terms.

Review collection

After an appointment, the business may send a review request.

The message should:

Thank the client.

Provide a direct review link.

Avoid offering incentives for positive reviews.

Avoid asking only satisfied clients to leave reviews.


SEO consideration

Use structured data only where eligible and accurate.

Do not assume that adding review markup will make star ratings appear in Google search results.


---

11. Opening Hours, Location and Contact

The website must make it easy for a prospective client to determine whether the business is accessible and when appointments are available.

Contact page

Include:

Confirmed business name.

Edinburgh, Scotland, United Kingdom.

Full public business address, once confirmed.

Business phone number.

Business email address.

Social media profiles.

Opening hours.

Directions or a map.

Booking CTA.


The currently supplied location reference is Edinburgh, Scotland, EH7 5PP.

This is not sufficient to assume a precise street address. Confirm the actual address before publishing directions or an embedded map.

Opening hours

Show a clear weekly schedule.

Example structure:

Day	Opening hours

Monday	Confirm with Sandy
Tuesday	Confirm with Sandy
Wednesday	Confirm with Sandy
Thursday	Confirm with Sandy
Friday	Confirm with Sandy
Saturday	Confirm with Sandy
Sunday	Confirm with Sandy


The website should distinguish between:

General business hours.

Actual bookable appointment times.

Temporary closures.

Fully booked days.


If the business operates by appointment only, state that clearly.

Do not show an always-open business status merely because the website accepts bookings online.


---

12. FAQs

Create a dedicated FAQ page with categories and accessible expandable answers.

Booking

How do I book an appointment?

Can I book more than one service?

Can I choose a specific appointment time?

Will I receive a booking confirmation?

Can I reschedule my appointment?


Payments

Do I need to pay a deposit?

Which payment methods are accepted?

When is the remaining balance due?

What happens if my payment fails?


Cancellations

What is the cancellation policy?

Are deposits refundable?

What happens if I arrive late?

What happens if Sandy needs to reschedule?


Services

How do I choose the right lash service?

Do I need to prepare before my appointment?

Are patch tests required for certain treatments?

What aftercare should I follow?


Training

Who can enrol in lash training?

What does the training include?

Is the course CPD-certified?

Will I receive a certificate?

How do I reserve a training date?


Answers must reflect the actual services and business policies.

Do not make up patch-test requirements, certification arrangements, or cancellation terms.


---

13. Policies and Legal Requirements

This section is essential.

The website should contain clear, accessible policy pages written specifically for the business.

It must not rely on generic text that has not been checked against the actual booking and payment arrangements.

Required policies

13.1 Booking policy

Explain:

How appointments are booked.

Whether deposits are required.

When a booking becomes confirmed.

Whether clients must arrive on time.

Any appointment preparation requirements.

Any relevant age restrictions.

Whether guests are permitted.

Whether patch tests are required for particular services.


13.2 Cancellation and rescheduling policy

Explain:

The required notice period.

How to cancel.

How to reschedule.

What happens to the deposit.

Any late-cancellation charges.

What happens if a client does not attend.

What happens if the business cancels.


The actual notice period and charges must be confirmed by Sandy.

13.3 Refund policy

Explain:

Refund eligibility.

How refunds are requested.

How deposits are treated.

What happens when a service has already been provided.

How refunds are processed.

Any relevant exceptions.


Do not simply state that all deposits are non-refundable under every circumstance. Terms must comply with applicable consumer law.

13.4 Privacy policy

Explain:

What personal information is collected.

Why it is collected.

How bookings and payments are processed.

Which booking, payment, email, and SMS providers receive relevant data.

How long information is retained.

Who can access it.

Applicable data-subject rights.

How users can contact the business about their information.


13.5 Terms and conditions

Cover the appropriate terms for using the website and purchasing services.

13.6 Cookie policy

Explain the use of cookies and similar technologies where applicable.

Where non-essential cookies require consent, implement an appropriate consent mechanism rather than merely publishing a policy.

UK-specific compliance

The implementation should be reviewed against applicable requirements, including:

UK GDPR and the Data Protection Act 2018.

Applicable PECR requirements for electronic communications and cookies.

Consumer Rights Act 2015.

Consumer Contracts Regulations where applicable.

Applicable payment and consumer-protection requirements.


The precise requirements depend on how the service is sold, the booking contract, and the technologies used.

A published privacy policy does not, by itself, make the website compliant. The actual data handling, consent, retention, and security practices must match the policy.


---

14. Strong SEO Strategy

SEO must be incorporated into the website architecture and content from the beginning.

The goal is not simply to add keywords to the homepage. It is to create useful, locally relevant pages that match what potential customers are searching for.

14.1 Local SEO

The primary location is Edinburgh, Scotland, United Kingdom.

Potential search themes include:

Lash extensions Edinburgh.

Eyelash extensions Edinburgh.

Lash artist Edinburgh.

Lash technician Edinburgh.

Brow services Edinburgh.

Beauty treatments Edinburgh.

One-to-one lash training Edinburgh.

Lash training Scotland.


These are keyword targets to validate, not claims about search volume or guaranteed ranking opportunities.

We should also identify nearby areas that Sandy genuinely serves before targeting them.

Do not create dozens of thin location pages for places the business does not meaningfully serve.

14.2 Dedicated service pages

Every commercially important service should have a descriptive, indexable page.

Example routes:

/services/classic-lash-extensions

/services/hybrid-lash-extensions

/services/brow-lamination

/training/one-to-one-lash-training

The final URLs depend on Sandy's actual service catalogue.

Each page should contain:

Unique title tag.

Unique meta description.

One clear H1.

Descriptive service content.

Price and duration.

Genuine photographs.

Relevant FAQs.

Booking CTA.

Internal links to related services.

Appropriate structured data where eligible.


Avoid generating near-identical pages that differ only by a keyword.

14.3 Technical SEO

Implement:

Server-rendered or statically pre-rendered HTML for public pages.

Crawlable navigation and internal links.

XML sitemap.

Correct robots.txt.

Canonical URLs.

Descriptive page titles and meta descriptions.

Clean URL structures.

Open Graph metadata.

Image alt text.

Responsive layouts.

Optimised images.

HTTPS.

Custom 404 page.

Redirects when URLs change.

Search Console verification.

Google Analytics or another suitable analytics platform, subject to applicable privacy requirements.


Important React decision

Since this project starts with React, I would use React with Vite for the frontend only if we also have a credible way to make public pages discoverable through reliable prerendering or rendering infrastructure.

For a website that depends heavily on local SEO, plain client-rendered React should not be the default without considering its indexing and metadata limitations.

If the project is not yet locked to Vite, I would seriously consider Next.js with React and TypeScript instead. It supports server rendering and static generation while retaining React as the development framework.

That is a technical decision worth making before building all the pages.

14.4 Structured data

Where applicable, implement accurate structured data for:

The business.

Local business information.

Individual services.

Breadcrumb navigation.

Eligible course information.

Eligible product offerings.


Use the most appropriate schema type for the actual business.

Do not add fabricated aggregate ratings or misleading business information.

14.5 Google Business Profile

Verify or claim the appropriate business profile, where eligible.

Ensure the public business name, contact details, website, and address or service area are consistent.

Encourage genuine reviews without manipulating them.

14.6 SEO content strategy

Potential future articles:

How to Choose the Right Lash Extensions.

Classic vs Hybrid Lash Extensions.

How to Prepare for a Lash Appointment.

How to Maintain Lash Extensions.

What to Expect From One-to-One Lash Training.

Becoming a Lash Artist in Scotland.


These should only be published when they provide genuine value and accurately reflect Sandy's expertise.

Avoid mass-producing generic AI articles.

14.7 SEO acceptance criteria

Before launch:

All important public pages have unique metadata.

No unintended noindex directives remain.

The sitemap contains the correct canonical URLs.

Important images are optimised.

Internal links work.

Structured data validates.

Search Console is configured.

The business's location and contact details are accurate.

Booking and checkout pages are indexed or excluded intentionally according to their purpose.


No one can guarantee a first-page Google ranking. The objective is to establish the strongest technical and content foundation possible and measure actual performance after launch.


---

15. Technical Architecture

Recommended stack

Layer	Recommendation	Purpose

Frontend	React + TypeScript	User interface
Framework	Next.js, if SEO is a major priority	Rendering and routing
Styling	Tailwind CSS or well-structured CSS	Consistent responsive design
UI components	Custom components	Bespoke visual identity
Animation	Framer Motion, used selectively	Subtle interactions
Booking	Selected third-party provider	Availability and appointments
Payments	Stripe or supported booking-provider payments	Secure checkout
Email	Booking provider or transactional email service	Notifications
SMS	Booking provider or SMS gateway	Appointment messages
Hosting	Suitable managed hosting	Deployment
Analytics	Privacy-conscious analytics configuration	Conversion measurement
Search	Google Search Console	SEO monitoring


The stack is not final until the booking and payment integrations are evaluated.

Core architectural principle

The website should own the visual experience, while established services handle the operationally sensitive parts where practical.

For example:

React owns the service catalogue and presentation.

The booking provider owns appointment availability and conflict prevention.

The payment provider processes payments.

A trusted notification service delivers messages if the booking provider does not already do so.


This avoids rebuilding mature infrastructure unnecessarily.

What we should build ourselves

Bespoke homepage.

Service discovery interface.

Service detail pages.

Gallery.

Training page.

Reviews page.

Contact and FAQ pages.

Policy presentation.

Custom booking integration or branded booking experience where supported.

Checkout presentation and confirmation pages.

SEO architecture.

Responsive navigation.

Analytics instrumentation.


What we should not casually reinvent

Card processing.

Secure payment storage.

Appointment conflict prevention.

Payment webhook verification.

SMS infrastructure.

Transactional email delivery.



---

16. Suggested Project Structure

If we proceed with Next.js and React:

src/
├── app/
│   ├── page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── book/
│   │   └── page.tsx
│   ├── schedule/
│   │   └── page.tsx
│   ├── checkout/
│   │   └── page.tsx
│   ├── booking-confirmed/
│   │   └── page.tsx
│   ├── training/
│   │   └── page.tsx
│   ├── gallery/
│   │   └── page.tsx
│   ├── reviews/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   └── policies/
│       ├── booking/
│       ├── cancellation/
│       ├── refunds/
│       ├── privacy/
│       ├── terms/
│       └── cookies/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── services/
│   ├── booking/
│   ├── checkout/
│   ├── gallery/
│   ├── reviews/
│   ├── forms/
│   └── ui/
├── lib/
│   ├── booking/
│   ├── payments/
│   ├── notifications/
│   ├── seo/
│   └── validation/
├── data/
│   └── services.ts
└── styles/

This is an illustrative structure. The actual implementation will depend on the selected framework and integrations.

Sensitive operations must run server-side, not inside publicly exposed frontend code.


---

17. Performance, Accessibility and Mobile UX

A beauty website can be visually impressive and still lose customers if it loads slowly or makes booking difficult.

Performance requirements

Responsive image sizes.

Modern image formats where supported.

Lazy-load below-the-fold imagery.

Avoid unnecessary third-party scripts.

Minimise layout shifts.

Optimise fonts.

Keep animation lightweight.

Avoid loading the entire booking platform before it is needed.


Accessibility requirements

Proper semantic HTML.

Keyboard-accessible navigation.

Visible focus states.

Accessible form labels.

Clear error messages.

Sufficient colour contrast.

Accessible calendar controls.

Reduced-motion support.

Meaningful alt text.


Mobile requirements

The mobile experience must be designed deliberately, not treated as a compressed desktop layout.

A user should be able to:

1. Discover the business.


2. Browse services.


3. See the price.


4. Choose a date.


5. Enter their details.


6. Pay.


7. Receive confirmation.



All without struggling with tiny controls, horizontal scrolling, or unnecessary redirects.

A restrained mobile booking CTA may remain accessible while browsing, provided it does not obscure content.


---

18. Analytics and Conversion Tracking

We need to know whether the website is generating actual business.

Track these events where technically possible:

Event	What it tells us

view_service	A visitor views a service.
select_service	A visitor selects a service.
begin_booking	A visitor starts booking.
select_appointment	A visitor selects a time slot.
begin_checkout	A visitor reaches payment.
payment_success	A payment is confirmed.
booking_confirmed	A booking is confirmed.
training_cta_click	A visitor shows interest in training.
contact_click	A visitor attempts to contact the business.


Where supported, record the service category and booking source without exposing sensitive personal information.

Core performance indicators

Website visitors from organic search.

Service-page engagement.

Booking initiation rate.

Booking completion rate.

Checkout abandonment.

Confirmed appointments.

Training enquiries and bookings.

Revenue attributed to the website, where measurable.


The main conversion metric should be confirmed bookings divided by eligible booking-start sessions, alongside overall booking volume and revenue.

Do not optimise for clicks alone.


---

19. Development Phases

The project should be built in a sequence that reduces risk.

Phase 1: Discovery and technical decisions

Confirm brand identity.

Finalise services and prices.

Confirm opening hours.

Confirm policies.

Select booking provider.

Select payment provider.

Confirm notification requirements.

Confirm available photographs and reviews.

Decide on React framework and hosting.


Deliverable: Approved requirements and integration plan.

Phase 2: Design system and homepage

Establish typography.

Establish colours.

Define spacing and responsive rules.

Build the navigation and footer.

Build the homepage.

Build reusable service cards and CTA components.


Deliverable: A polished, responsive visual foundation.

Phase 3: Service catalogue and content pages

Services.

Service details.

Gallery.

Reviews.

Training.

About.

Contact.

FAQs.

Policies.


Deliverable: Complete public-facing website.

Phase 4: Booking integration

Calendar.

Availability.

Appointment selection.

Client details.

Booking confirmation.

Cancellation and rescheduling integration.


Deliverable: Working appointment flow.

Phase 5: Payments and notifications

Payment checkout.

Deposit configuration.

Payment verification.

Email confirmations.

SMS confirmations.

Reminder scheduling.

Failed-payment handling.


Deliverable: End-to-end transactional flow.

Phase 6: SEO and performance

Metadata.

Sitemap.

Structured data.

Search Console.

Image optimisation.

Performance testing.

Accessibility review.


Deliverable: Launch-ready website.

Phase 7: Testing and launch

Test:

Mobile and desktop.

All service pages.

All booking routes.

Payment success and failure.

Double-booking prevention.

Email delivery.

SMS delivery.

Cancellation and rescheduling.

Policy links.

Search engine visibility.

Error states.


Deliverable: Production deployment.


---

20. Acceptance Criteria

The project is not complete simply because the pages look good.

It must satisfy the following requirements.

Design

[ ] Premium, coherent visual identity.

[ ] Responsive layouts.

[ ] No broken images.

[ ] No placeholder content.

[ ] No invented reviews or business claims.

[ ] No unnecessary UI elements.

[ ] Accessible interactive components.


Services

[ ] All approved services are displayed.

[ ] Prices are accurate.

[ ] Appointment durations are accurate.

[ ] Each important service has a dedicated page.

[ ] Service selection works on mobile.


Booking

[ ] Only valid available appointment slots can be selected.

[ ] Double bookings are prevented.

[ ] The booking flow respects opening hours and scheduling rules.

[ ] Clients receive booking confirmations.

[ ] Sandy receives booking notifications.

[ ] SMS and email work in production.

[ ] Cancellation and rescheduling behave as configured.


Payments

[ ] Checkout uses the selected secure payment provider.

[ ] The payable amount is correct.

[ ] Payment status is verified server-side.

[ ] Failed payments are handled.

[ ] Duplicate payment processing is prevented.

[ ] Refunds can be managed through the configured process.


SEO

[ ] Public pages have appropriate metadata.

[ ] Sitemap and robots directives are correct.

[ ] Important pages are crawlable.

[ ] Structured data is valid where used.

[ ] Location and contact details are accurate.

[ ] Analytics and Search Console are configured appropriately.


Compliance

[ ] Privacy policy is accurate.

[ ] Booking and cancellation policies are published.

[ ] Refund terms have been reviewed.

[ ] Cookie consent is implemented where required.

[ ] Customer photographs have appropriate permission.

[ ] Marketing consent is separate from necessary transactional communications.



---

21. Outstanding Information

We do not need to wait for Sandy to write a perfect business document before beginning development.

However, some details are essential before the relevant features can go live.

Information needed	Priority	Can development begin without it?

Final brand name	High	Yes, with a temporary internal name
Logo and brand colours	Medium	Yes, using the proposed design direction
Full service list	High	Yes, with sample development data
Service prices	High	Yes, but not for live sales
Appointment durations	High	Yes, but not for live scheduling
Opening hours	High	Yes, but not for live scheduling
Business address	High	Yes, but not for publishing directions
Business phone and email	High	Yes, but not for production notifications
Booking provider	High	Design can begin before selection
Payment provider	High	Design can begin before selection
Deposit rules	High	Checkout can be prototyped without them
Cancellation and refund policies	High	Pages can be built, but terms must be confirmed
Training details and pricing	High	Page design can begin
Portfolio images	High	Layout can be developed with temporary assets
Genuine reviews	Medium	Layout can be developed without testimonials
Privacy and cookie details	High	Drafting can begin, but the actual implementation must be known


What I would ask Sandy for next

Keep it simple. She has already received a detailed information request, so do not send another massive questionnaire.

Ask her to confirm these five things first:

1. Services and prices: Is the existing service list still accurate? What needs to be added or removed?


2. Opening hours: Which days and times can clients book?


3. Bookings and deposits: Does she want deposits or full payment, and what are her cancellation rules?


4. Contact details: What phone number, email address, and public business address should appear on the website?


5. Photos and branding: Which real service photos, logo files, and customer reviews can we use?



The remaining details can be collected as development progresses.


---

22. Final Product Direction

Here is the version I would build.

A bespoke, editorial beauty website with a premium homepage, a searchable service catalogue, individual service pages, a dedicated training page, authentic portfolio photography, genuine reviews, a real appointment calendar, secure checkout, automated email and SMS notifications, clear policies, and a serious local SEO foundation.

The experience should be visually distinctive but operationally straightforward.

One important boundary: do not attempt to build the entire custom booking engine, payment system, SMS infrastructure, and email delivery system from scratch just because the frontend is custom. The value is in the complete customer experience, not in reinventing infrastructure that already works.

The highest-risk technical decision is the booking integration. Get that right early, because it affects service selection, scheduling, payment, notifications, and cancellation handling.

The highest-risk commercial decision is the service catalogue. If the prices, durations, and policies are inaccurate, even a beautiful website will create booking problems.

And the highest-impact design decision is to use Sandy's real work as the centrepiece. In the beauty industry, authentic results are more persuasive than decorative effects.

That is the standard this project should meet.

# 23. STRICT DESIGN QUALITY STANDARD: NO AI SLOP

## 23.1 Design Philosophy

Sandy Beauty Haven must feel like a professionally art-directed, premium beauty brand designed by an experienced human designer, not a website generated from a generic AI template.

The design must be **minimalist, feminine, sophisticated, editorial, warm, elegant, and conversion-focused**.

Every element must have a clear purpose. Every colour, font, image, animation, section, and interaction must contribute to the brand, user experience, or conversion goal.

The website must feel expensive through its composition, typography, photography, spacing, and attention to detail, not through excessive visual effects.

**The standard is quiet luxury, not loud luxury. Restraint, not decoration. Craft, not gimmicks.**

## 23.2 Absolutely Prohibited Design Patterns

### A. Neon, Glows and Unnecessary Effects

Strictly prohibit:

- Neon colours, neon borders, and glowing buttons.
- Blue, purple, cyan, or pink-purple gradient backgrounds commonly associated with generic AI-generated SaaS websites.
- Glowing cards, glowing text, luminous borders, and artificial light effects.
- Excessive gradients, gradient text, and gradient overlays without a genuine photographic or design purpose.
- Glassmorphism, frosted-glass cards, and translucent floating panels.
- Fake shadows, excessive drop shadows, and exaggerated depth effects.
- Overuse of blur, backdrop filters, and decorative light orbs.
- Unnecessary decorative circles, blobs, abstract shapes, and floating geometric elements.
- Artificial 3D objects or glossy effects that do not belong in a premium beauty brand.

The approved visual direction should favour warm ivory, sophisticated neutrals, espresso, muted blush, restrained rose accents, and other carefully selected colours consistent with the final brand identity.

### B. Generic AI Interface Patterns

Do not generate or use:

- Tiny eyebrow labels above every heading, such as "PREMIUM EXPERIENCE", "YOUR BEAUTY JOURNEY", "OUR PHILOSOPHY", or similar filler.
- Small uppercase text used excessively to manufacture a luxury aesthetic.
- Decorative dots, flashing dots, pulsing circles, fake live indicators, beeping elements, or fake online-status indicators.
- Random floating badges, pills, counters, and labels.
- Fake notification popups, fake booking alerts, fake visitor counters, or fabricated urgency indicators.
- Unnecessary icons beside every heading or paragraph.
- Repeated rounded cards containing every piece of content.
- The same three-card layout repeated across the entire website.
- Excessive pill-shaped buttons, oversized rounded containers, and nested card layouts.
- Arbitrary floating buttons or decorative interface elements that compete with booking actions.
- Fake statistics, fabricated testimonials, invented client numbers, or unverified trust badges.
- Repeated "Learn More", "Discover More", and "Explore More" buttons without a clear user benefit.
- Generic AI-generated marketing language, including empty claims such as "where beauty meets perfection", "elevate your beauty journey", and "unlock your true potential".

Every heading should communicate something meaningful. Not every section needs a label above its heading. Not every paragraph needs an icon. Not every content block needs a card.

### C. Typography and Fonts

Typography must feel intentional, editorial, refined, and highly readable.

Prohibit:

- Generic futuristic, sci-fi, cyberpunk, or technology-style fonts.
- Excessively geometric fonts that make the brand feel like a software dashboard.
- Unnecessary font mixing or using several unrelated typefaces.
- Excessively thin text that becomes difficult to read.
- Oversized headings that consume the entire mobile viewport without communicating sufficient value.
- Excessive letter spacing, particularly on body text.
- Artificially condensed typography.
- Decorative script fonts used for long passages or essential interface information.
- Italic serif text used on nearly every heading.
- Excessive bold text throughout the page.
- Inconsistent font sizes, line heights, and font weights.
- Tiny body text used to squeeze too much information into a layout.

Use a carefully chosen editorial serif for selected display headings and a clean, highly readable sans-serif for body text, navigation, buttons, forms, pricing, and functional information.

Limit the primary type system to two font families unless there is a strong, deliberate art-direction reason to introduce another.

Use a consistent type scale and responsive typography. The result must remain elegant and readable on small screens.

### D. Colour Discipline

Colour must reinforce the beauty brand, not imitate a generic technology product.

- Establish a defined colour palette and reusable design tokens.
- Use warm, sophisticated, low-noise backgrounds.
- Reserve accent colours for intentional emphasis.
- Maintain sufficient contrast and readability.
- Use consistent colours for primary actions, secondary actions, borders, and supporting surfaces.
- Avoid introducing new colours simply to make individual sections look different.
- Avoid alternating random background colours between every section.
- Never use colour as the only way to communicate status or errors.

Blue and purple must not be introduced as default interface accents. They should only appear if the final brand identity specifically requires them and they serve a genuine design purpose.

### E. Animations and Interactions

Animations must be subtle, purposeful, and almost invisible when they are not needed.

Strictly prohibit:

- Flashing, blinking, pulsing, or beeping decorative elements.
- Infinite animations with no functional purpose.
- Floating or bouncing elements designed merely to attract attention.
- Scroll-triggered animations on every section.
- Excessive parallax effects.
- Text that constantly moves, rotates, or changes.
- Overly elaborate page transitions.
- Buttons that glow or bounce continuously.
- Animations that delay access to content or booking.
- Custom cursors that interfere with usability.
- Fake loading indicators or simulated activity.

Appropriate interactions include restrained hover states, subtle image transitions, smooth navigation where useful, and clear feedback when a user selects a service, submits a form, or completes a booking.

Respect the user's reduced-motion preference. No animation should compromise accessibility, performance, or the booking flow.

### F. Layout and Composition

The website must not resemble a generic landing-page template.

Avoid:

- Repeating the same centred heading and three-card grid in every section.
- Excessively symmetrical layouts without regard for the photography or content.
- Giant empty spaces that serve no visual purpose.
- Cramped sections with too many competing elements.
- Unnecessary dividers between every component.
- Excessive rounded corners.
- Card-based layouts for content that would look better as editorial text, a clean list, or a photographic composition.
- Full-screen sections that unnecessarily delay access to services.
- Huge hero sections that push the booking action and service information too far down the page.
- Excessive use of centred text when left alignment would improve readability.
- Unnecessarily long pages filled with repetitive marketing copy.

Use a considered mix of editorial layouts, asymmetric image-and-text compositions, clean service grids, generous whitespace, strong typography, and carefully selected full-width photography.

Each section should have its own compositional purpose while remaining consistent with the overall design system.

### G. Photography and Beauty Imagery

Authentic photography is a central part of the brand.

- Prioritise Sandy's real work, real treatments, and approved brand photography.
- Use consistent image quality, colour treatment, cropping, and aspect ratios.
- Avoid generic stock photographs wherever authentic business imagery is available.
- Do not use AI-generated faces or beauty results that could misrepresent the actual services.
- Do not fabricate before-and-after photographs.
- Avoid excessive image overlays, filters, artificial skin smoothing, and heavily edited beauty imagery.
- Do not stretch, distort, or awkwardly crop faces, eyes, lashes, brows, or hair.
- Use image placeholders only during development, and replace them before launch.
- Do not publish broken image links, random unsplash URLs, or arbitrary images selected merely to fill empty space.

The photography should feel editorial, intimate, clean, feminine, and professionally art-directed.

### H. Content and Microcopy

All website copy must sound natural, specific, professional, and credible.

Prohibit:

- Generic AI filler.
- Repetitive descriptions that communicate the same thing in different words.
- Excessive exclamation marks.
- Fake urgency and artificial scarcity.
- Unsubstantiated claims of being the best, number one, award-winning, or industry-leading.
- Fabricated reviews, certifications, qualifications, and statistics.
- Overly dramatic descriptions of ordinary services.
- Unnecessary paragraphs that make simple actions feel complicated.
- Placeholder text left in production.
- Repetitive CTA labels throughout the entire website.

Use concise copy that answers the customer's actual questions: what the service is, what it costs, how long it takes, what to expect, and how to book.

## 23.3 Responsive Design: Mobile First, Without Exception

The website must be designed for mobile screens first, then progressively enhanced for tablets and desktop computers.

Do not design a desktop website and attempt to shrink it to fit mobile.

### Mobile: Primary Design Target

Design and test for narrow screens from the beginning.

Requirements:

- No horizontal overflow.
- No clipped headings, images, or buttons.
- No tiny navigation links or touch targets.
- No overcrowded hero sections.
- No oversized typography that forces awkward line breaks.
- No multi-column layouts that become cramped.
- No booking calendars that require horizontal scrolling.
- No inaccessible dropdowns or hover-only interactions.
- No obstructive popups.
- No sticky elements that cover essential content.
- No unnecessarily long forms.
- No checkout steps that are difficult to complete with one hand.

Use responsive image crops, comfortable spacing, readable typography, full-width controls where appropriate, and simple navigation.

The primary booking action must remain easy to find without overwhelming the page.

### Tablet: Deliberately Adapted

Tablet layouts must have their own considered behaviour.

Requirements:

- Adapt service grids to available width.
- Maintain balanced image-to-text proportions.
- Avoid stretching mobile layouts across the screen.
- Avoid displaying desktop navigation when it becomes cramped.
- Ensure booking calendars and forms remain comfortable to use.
- Maintain consistent spacing and typography.
- Support both portrait and landscape orientations.

### Desktop: Refined and Spacious

Desktop should use available space intelligently without making the website feel empty or oversized.

Requirements:

- Establish a sensible maximum content width.
- Use balanced multi-column compositions where appropriate.
- Maintain readable paragraph widths.
- Preserve visual hierarchy across large displays.
- Ensure navigation and booking actions are clearly accessible.
- Use high-quality imagery with appropriate resolutions.
- Avoid excessively wide text blocks and stretched service cards.

Use responsive breakpoints based on content requirements rather than blindly relying on a single device size.

Test at minimum 320px, 375px, 390px, 430px, 768px, 1024px, 1280px, and 1440px viewport widths, along with representative real devices.

## 23.4 Design System and Implementation Rules

Before building the full website, establish a consistent design system.

Define reusable tokens for:

- Colours.
- Typography.
- Font weights.
- Spacing.
- Content widths.
- Breakpoints.
- Borders.
- Shadows.
- Border radii.
- Buttons.
- Form fields.
- Focus states.
- Animation durations.
- Image ratios.

Build reusable components only where they improve consistency and maintainability. Do not force every section into the same component structure merely for the sake of reuse.

Avoid unnecessary dependencies, oversized component libraries, and complicated abstractions that do not improve the product.

Use semantic HTML, accessible interactions, and production-quality React and TypeScript.

The interface must never rely on decorative styling to disguise weak information architecture or incomplete functionality.

## 23.5 Mandatory Design Review Before Completion

Before declaring any page complete, inspect it at mobile, tablet, and desktop sizes.

Ask:

1. Does this look like a bespoke beauty brand or a generic AI-generated website?
2. Is every element necessary?
3. Are the typography and colours sophisticated and consistent?
4. Does the layout feel intentional rather than assembled from a template?
5. Are there unnecessary labels, decorative dots, gradients, glows, pills, cards, or animations?
6. Is the photography authentic, appropriate, and well composed?
7. Can a visitor understand the service and take the next step without confusion?
8. Does the mobile layout feel designed rather than compressed?
9. Are all buttons, forms, booking actions, and links functional?
10. Does the page feel premium because of its quality, rather than because it uses effects associated with luxury?

If a component adds noise rather than value, remove it.

If a section looks like a default AI-generated landing page, redesign it instead of accepting it.

If a visual effect is not necessary, leave it out.

**Final acceptance standard: Every page must feel deliberate, polished, restrained, responsive, accessible, and unmistakably appropriate for a premium beauty business. No generic AI slop, no unnecessary visual noise, and no compromise on mobile usability.**