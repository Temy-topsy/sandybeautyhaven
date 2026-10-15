export interface ServiceItem {
  id: number;
  slug: string;
  name: string;
  category: 'Lash Extensions' | 'Lash Infills' | 'Brows' | 'Makeup' | 'Extras' | 'Training';
  categoryRaw: string;
  price: number;
  duration: number; // minutes
  deposit: number;
  description: string;
  image: string;
  features: string[];
  preparation: string[];
  aftercare: string[];
  suitableFor: string;
  popular?: boolean;
}

export const SERVICES: ServiceItem[] = [
  // BROWS
  {
    id: 69886073,
    slug: 'eyebrow-shaping',
    name: 'Eyebrow Shaping',
    category: 'Brows',
    categoryRaw: 'BROW ',
    price: 10,
    duration: 15,
    deposit: 10,
    description: 'Professional eyebrow shaping using the African razor technique to create clean, defined brows that complement your face shape. Perfect for maintaining a neat, natural look.',
    image: '/appointments/brow-touchup.jpg',
    features: ['African razor precision technique', 'Sharp, clean brow lines', 'Customized to facial bone structure', 'Quick 15-minute refresh'],
    preparation: [
      'Avoid tweezing or trimming brows for at least 1-2 weeks before your visit.',
      'Arrive with a clean, makeup-free brow area if possible.'
    ],
    aftercare: [
      'Avoid touching or applying heavy creams immediately afterwards.',
      'Maintain shape every 2-3 weeks.'
    ],
    suitableFor: 'Anyone wanting clean, sculpted natural eyebrows without waxing irritation.'
  },
  {
    id: 79312195,
    slug: 'ombre-brows',
    name: 'Ombré Powder Brows',
    category: 'Brows',
    categoryRaw: 'BROW ',
    price: 200,
    duration: 150,
    deposit: 50,
    popular: true,
    description: 'Our signature Ombré Brow technique creates a soft, powdered gradient look, similar to a perfectly filled-in brow with makeup. Lighter at the bulb and gently darkening towards the tail, enhancing your natural shape with flawless definition.',
    image: '/appointments/combo-brows.jpg',
    features: [
      'Long-lasting results for 2–3 years',
      'Wake up with perfect, ready-to-go brows daily',
      'Ideal for all skin types (oily, dry, sensitive)',
      'Custom color matching and facial mapping',
      'Minimal discomfort and gentle application'
    ],
    preparation: [
      'Do not consume alcohol or caffeine 24 hours prior to appointment.',
      'Avoid blood-thinning medications like aspirin or ibuprofen 48 hours prior.',
      'Avoid intense sun exposure, chemical peels, and botox for 2 weeks prior.',
      'Do not wax or tint brows 3 days before treatment.'
    ],
    aftercare: [
      'Keep brows dry for 7-10 days following treatment.',
      'Apply recommended healing balm with a clean cotton swab.',
      'Do not pick, scratch, or peel any healing crusts.',
      'Avoid heavy sweating, saunas, and makeup on the brow area during healing.'
    ],
    suitableFor: 'Clients wanting long-lasting, makeup-free brows with soft ombré powdered density.'
  },
  {
    id: 79312246,
    slug: 'combo-brows',
    name: 'Combo Brows (Microblading + Shading)',
    category: 'Brows',
    categoryRaw: 'BROW ',
    price: 200,
    duration: 150,
    deposit: 50,
    popular: true,
    description: 'Our Combo Brows combine delicate microbladed hair-like strokes in the front with soft powder shading through the body and tail. Creates realistic texture paired with structured definition for a polished finish.',
    image: '/appointments/combo-brows.jpg',
    features: [
      'Realistic front hair strokes + defined shaded tail',
      'Long-lasting results for 2–3 years',
      'Custom mapped to your unique brow symmetry',
      'Suitable for normal, combination, and dry skin types'
    ],
    preparation: [
      'Avoid caffeine, alcohol, and aspirin 24-48 hours before your session.',
      'Discontinue retinol and exfoliating acids 2 weeks prior.',
      'Arrive relaxed for a thorough pre-mapping consultation.'
    ],
    aftercare: [
      'Follow Sandy’s dry-healing protocol for the first 7-10 days.',
      'Gently blot lymph fluid as instructed with sterile wipes.',
      'Avoid submerging face in water, steam rooms, and direct sunlight.'
    ],
    suitableFor: 'Clients with sparse brow hair who desire both natural realistic strokes and powdered fullness.'
  },
  {
    id: 79312587,
    slug: 'brow-touch-up',
    name: 'Brow Touch-Up (Annual / Maintenance)',
    category: 'Brows',
    categoryRaw: 'BROW ',
    price: 95,
    duration: 120,
    deposit: 50,
    description: 'Refresh your brows with a touch-up to maintain their rich color and sharp shape. For existing semi-permanent brow clients originally done at Sandy Beauty Haven (£95). Note: previous work from other artists requires an assessment (£110 total).',
    image: '/appointments/brow-touchup.jpg',
    features: [
      'Re-saturates faded pigment and restores sharpness',
      'Adjusts warmth and undertone as your hair evolves',
      'Refines border definition'
    ],
    preparation: [
      'Ensure initial brow work has fully settled (minimum 6-8 weeks after first session).',
      'Avoid sun tanning, caffeine, and alcohol prior to session.'
    ],
    aftercare: [
      'Standard 7-day brow healing protocol applies.',
      'Keep hydrated and apply aftercare balm sparingly.'
    ],
    suitableFor: 'Returning clients needing annual or bi-annual color boost and definition touch-up.'
  },

  // LASH EXTENSION SERVICE
  {
    id: 96650607,
    slug: 'express-lashes',
    name: 'Express Lashes',
    category: 'Lash Extensions',
    categoryRaw: 'LASH EXTENSION SERVICE ',
    price: 30,
    duration: 30,
    deposit: 15,
    description: 'Perfect for busy clients who want gorgeous lashes in 30 minutes or less. Ideal for last-minute appointments, holidays, special occasions, date nights, or a quick beauty refresh. Enjoy a lightweight lash look lasting 7–10 days with proper care.',
    image: '/lashes inspo img.jpg',
    features: [
      'Completed in only 30 minutes',
      'Lasts 7–10 days with proper care',
      'Lightweight and comfortable wear',
      'Ideal for weekend getaways and events'
    ],
    preparation: [
      'Arrive with clean, makeup-free eyes and lashes (no mascara, eyeliner, or concealer).',
      'Shower beforehand as lashes should stay dry for 24 hours.'
    ],
    aftercare: [
      'Keep dry for the first 24 hours.',
      'Brush daily with a clean spoolie.',
      'Avoid oil-based cleansers and rubbing eyes.'
    ],
    suitableFor: 'Busy individuals who need an immediate, affordable lash transformation for an upcoming event.'
  },
  {
    id: 62410950,
    slug: 'classic-lashes',
    name: 'Classic Lash Extensions',
    category: 'Lash Extensions',
    categoryRaw: 'LASH EXTENSION SERVICE ',
    price: 55,
    duration: 90,
    deposit: 15,
    popular: true,
    description: 'A single individual eyelash extension applied one-to-one to each natural lash. Enhances your lash line with timeless elegance, natural length, and delicate curl tailored to your eye shape.',
    image: '/lashes inspo img.jpg',
    features: [
      '1:1 individual lash placement',
      'Natural, clean, mascara-effect finish',
      'Tailored lengths and curls (C, CC, D curl)',
      'Zero damage to healthy natural lashes'
    ],
    preparation: [
      'Arrive completely free of eye makeup.',
      'Remove contact lenses or bring a lens case.',
      'Avoid caffeine to prevent fluttery eyelids.'
    ],
    aftercare: [
      'Do not get lashes wet for 24 hours.',
      'Cleanse lashes daily using lash shampoo.',
      'Schedule infills every 2–3 weeks to maintain fullness.'
    ],
    suitableFor: 'Clients who love a natural, understated look for everyday work and lifestyle.'
  },
  {
    id: 64390017,
    slug: 'mega-classic',
    name: 'Mega Classic Lashes',
    category: 'Lash Extensions',
    categoryRaw: 'LASH EXTENSION SERVICE ',
    price: 55,
    duration: 90,
    deposit: 15,
    description: 'A darker, denser take on the classic technique using ultra-fine flat lashes that wrap around the natural lash to give the appearance of a thicker, bolder single-lash line without extra weight.',
    image: '/lashes inspo img.jpg',
    features: [
      'Deep black pigment line',
      'Flat lash technology for enhanced bonding surface',
      'Full coverage on 100% of viable natural lashes',
      'Lightweight feel with dark eyeliner effect'
    ],
    preparation: [
      'Arrive with freshly cleaned, oil-free lashes.',
      'Refrain from caffeine 2 hours prior.'
    ],
    aftercare: [
      'Keep dry for 24 hours.',
      'Avoid sleeping on your face.',
      'Infill recommended within 2 to 3 weeks.'
    ],
    suitableFor: 'Clients wanting the clean separation of classics with a more noticeable, darker lash line.'
  },
  {
    id: 62413581,
    slug: 'hybrid-lash-extensions',
    name: 'Hybrid Lash Extensions',
    category: 'Lash Extensions',
    categoryRaw: 'LASH EXTENSION SERVICE ',
    price: 60,
    duration: 115,
    deposit: 15,
    popular: true,
    description: 'A harmonious blend of classic individual extensions and handmade volume fans. Creates a textured, fluffy, multidimensional lash look that gives both definition and soft volume. Our most requested set!',
    image: '/appointments/hybrid-lashes.jpg',
    features: [
      '50% classic individual lashes + 50% volume fans',
      'Textured, fluffy, dimensional appearance',
      'Fills gaps in sparse lash lines seamlessly',
      'Customized lengths from 9mm to 16mm+'
    ],
    preparation: [
      'Remove contact lenses prior to service.',
      'Wash face and eye area thoroughly with oil-free cleanser.'
    ],
    aftercare: [
      'Keep dry for 24 hours.',
      'Gently wash daily with foaming lash cleanser.',
      'Brush through only when completely dry.'
    ],
    suitableFor: 'The ideal middle ground for clients who find classics too light and volume too dramatic.'
  },
  {
    id: 62413492,
    slug: 'light-volume-lashes',
    name: 'Light Volume Lashes (Light Russian)',
    category: 'Lash Extensions',
    categoryRaw: 'LASH EXTENSION SERVICE ',
    price: 65,
    duration: 120,
    deposit: 15,
    description: 'Crafted using lightweight 2D-3D handmade volume fans. Offers noticeable fullness, soft featheriness, and a delicate fluff while keeping the overall aesthetic soft, sophisticated, and lightweight.',
    image: '/appointments/hybrid-lashes.jpg',
    features: [
      'Handcrafted 2D–3D fans',
      'Soft cashmere-like touch',
      'Uniform density without feeling heavy',
      'Protects delicate natural lashes'
    ],
    preparation: [
      'No eye makeup or waterproof products.',
      'Avoid caffeine 2 hours prior to avoid fluttering.'
    ],
    aftercare: [
      'Wash gently with lash-safe cleanser.',
      'Schedule infill every 2.5 to 3 weeks.'
    ],
    suitableFor: 'Clients who desire soft, fluffy lashes with more fullness than a hybrid set.'
  },
  {
    id: 62413539,
    slug: 'mega-volume-russian',
    name: 'Mega Volume / Russian Lashes',
    category: 'Lash Extensions',
    categoryRaw: 'LASH EXTENSION SERVICE ',
    price: 85,
    duration: 150,
    deposit: 15,
    popular: true,
    description: 'For clients who love bold, pitch-black, glamorous lashes with maximum density. Handcrafted multi-lash fans (5D-8D) create a dense, fluffy, seamless lash line that turns heads. Fully customized to your eye shape.',
    image: '/public/lashes inspo img.jpg',
    features: [
      'High density 5D–8D handmade fans',
      'Dramatic dark eyeliner effect',
      'Maximum fluffiness and intense volume',
      'Even weight distribution using ultra-fine 0.03mm fibres'
    ],
    preparation: [
      'Arrive with squeaky-clean lashes.',
      'Be prepared to relax for 2.5 hours in our ergonomic studio lounger.'
    ],
    aftercare: [
      'Daily lash hygiene with specialized lash wash is essential.',
      'Never pick, pull, or attempt to remove at home.'
    ],
    suitableFor: 'Glamour lovers who want maximum fullness, drama, and intense eye definition.'
  },
  {
    id: 62977546,
    slug: 'wispy-lash-set',
    name: 'Wispy Lash Set (Strip Lash & Spikey Look)',
    category: 'Lash Extensions',
    categoryRaw: 'LASH EXTENSION SERVICE ',
    price: 70,
    duration: 150,
    deposit: 15,
    popular: true,
    description: 'The iconic Kim Kardashian / strip-lash aesthetic! Features alternating closed volume spikes and shorter fluffy volume fans to create a textured, staggered, and fluttery look that replicates your favorite strip lash style.',
    image: '/appointments/wispy-set.png',
    features: [
      'Staggered spike mapping for iconic textured drama',
      'Replicates luxury strip lashes with 24/7 durability',
      'Kim K / Wet-look influenced artistry',
      'Lash lengths customized to client bone structure'
    ],
    preparation: [
      'Arrive without contact lenses.',
      'Bring reference images of your desired spike intensity.'
    ],
    aftercare: [
      'Brush gently with spoolie to maintain spike structure.',
      'Wash daily with oil-free foaming lash wash.'
    ],
    suitableFor: 'Trendsetters and glam lovers who crave textured spikes, wet looks, and strip-lash drama.'
  },
  {
    id: 70829047,
    slug: 'customized-lash-set',
    name: 'Customized Bespoke Lash Set',
    category: 'Lash Extensions',
    categoryRaw: 'LASH EXTENSION SERVICE ',
    price: 90,
    duration: 180,
    deposit: 15,
    description: 'Completely tailored to your vision. Choose your desired length (including 16mm+), styling maps (Cat eye, Doll eye, Squirrel, Anime, Fox eye), mixed curls, or colored lash accents. Includes full consultation.',
    image: '/lashes inspo img.jpg',
    features: [
      '100% bespoke mapping and design',
      'Lengths up to 16mm–20mm accommodated',
      'Advanced lash artistry (Fox eye, Anime, Wet look, Color)',
      'Includes deep lash bath and collagen eye pads'
    ],
    preparation: [
      'Bring inspiration photos or describe your exact vision.',
      'Arrive with fresh, clean eyes.'
    ],
    aftercare: [
      'Strict adherence to lash hygiene and brushing protocol.',
      'Infills required at 2–3 weeks.'
    ],
    suitableFor: 'Clients wanting an extraordinary, artistic set with specific styling, extra length, or creative mapping.'
  },

  // LASH INFILLS
  {
    id: 62596080,
    slug: 'classic-infills',
    name: 'Classic Lash Infills',
    category: 'Lash Infills',
    categoryRaw: 'LASH INFILLS',
    price: 38,
    duration: 60,
    deposit: 15,
    description: 'Maintenance infill for Classic lash sets originally completed at Sandy Beauty Haven. Removes outgrown lashes and places fresh extensions on new growth to restore initial fullness.',
    image: '/lashes inspo img.jpg',
    features: [
      'Restores set to 100% fullness',
      'Removes overgrown extensions safely',
      'Fast 60-minute appointment',
      'Requires at least 40–50% remaining lashes'
    ],
    preparation: [
      'Must have at least 40% of original lash set intact.',
      'Please note: We do NOT fill over other artists’ work (no foreign fills).'
    ],
    aftercare: ['Resume daily cleaning after 24 hours.'],
    suitableFor: 'Returning clients 2–3 weeks after a full Classic set.'
  },
  {
    id: 62932142,
    slug: 'hybrid-infill',
    name: 'Hybrid Lash Infill',
    category: 'Lash Infills',
    categoryRaw: 'LASH INFILLS',
    price: 42,
    duration: 60,
    deposit: 15,
    description: 'Maintenance infill for our signature Hybrid sets. Replaces shed fans and single lashes, cleans up outgrown attachments, and restores lush fluffiness.',
    image: '/appointments/hybrid-lashes.jpg',
    features: [
      'Refills both volume fans and classic single lashes',
      'Keeps texture balanced and fluffy',
      'Completed in 60 minutes'
    ],
    preparation: ['Arrive with clean, oil-free lash extensions.'],
    aftercare: ['Continue gentle cleansing and spoolie brushing.'],
    suitableFor: 'Existing Hybrid lash clients within 2 to 3 weeks of their previous appointment.'
  },
  {
    id: 62932199,
    slug: 'volume-infill',
    name: 'Volume Lash Infill',
    category: 'Lash Infills',
    categoryRaw: 'LASH INFILLS',
    price: 48,
    duration: 90,
    deposit: 15,
    description: 'Restores volume and light Russian sets to total density. 90 minutes of dedicated hand-fanning and placement across all mature natural lash growth.',
    image: '/lashes inspo img.jpg',
    features: [
      'Comprehensive 90-minute fill',
      'Handcrafted fans applied to fresh growth',
      'Safe removal of twisted or outgrown extensions'
    ],
    preparation: ['Must have 40%+ lashes remaining. Arrive with clean lashes.'],
    aftercare: ['Regular daily washing with lash foam.'],
    suitableFor: 'Volume lash clients needing deep restoration and fullness.'
  },
  {
    id: 62932373,
    slug: 'mega-russian-infill',
    name: 'Mega Russian Lash Infill',
    category: 'Lash Infills',
    categoryRaw: 'LASH INFILLS',
    price: 50,
    duration: 90,
    deposit: 15,
    description: 'Infill for Mega Volume and Wispy sets. Rebuilds dense fan layers and replaces spike accents so your dramatic look stays completely unbroken.',
    image: '/appointments/wispy-set.png',
    features: [
      'Restores ultra-dark lash line',
      'Re-fans 5D-8D density',
      'Maintains clean symmetry across both eyes'
    ],
    preparation: ['Clean lashes thoroughly before arriving. No foreign fills.'],
    aftercare: ['Brush daily and sleep on back or silk pillowcase.'],
    suitableFor: 'Mega Russian and Wispy lash clients.'
  },

  // EXTRAS
  {
    id: 76359957,
    slug: 'lash-removal',
    name: 'Professional Lash Removal',
    category: 'Extras',
    categoryRaw: 'EXTRAS ',
    price: 15,
    duration: 30,
    deposit: 15,
    description: 'Safe, pain-free removal of eyelash extensions using a medical-grade cream dissolver. Breaks down adhesive bonds smoothly without pulling or damaging natural lashes.',
    image: '/lashes inspo img.jpg',
    features: [
      'Gentle, non-stinging formulation',
      'Protects natural lash follicles',
      'Includes soothing lash bath afterwards',
      'Suitable for lashes done anywhere'
    ],
    preparation: ['Arrive without mascara or makeup.'],
    aftercare: ['Apply nourishing lash serum or castor oil to encourage natural growth.'],
    suitableFor: 'Anyone needing a safe removal of existing extensions before taking a lash break or getting a fresh set.'
  },

  // MAKEUP SERVICES (Bukky)
  {
    id: 95986858,
    slug: 'soft-glam-makeup',
    name: 'Soft Glam Makeup (with Bukky)',
    category: 'Makeup',
    categoryRaw: 'MAKEUP SERVICES',
    price: 60,
    duration: 70,
    deposit: 20,
    popular: true,
    description: 'A soft, radiant makeup look that enhances your natural bone structure and glow. Perfect for birthdays, brunches, graduations, family dinners, and modern daytime glamour. Includes complimentary strip lashes if desired.',
    image: '/public/settings inspo img2.jpg',
    features: [
      'Flawless skin tint or radiant foundation',
      'Soft neutral eye blending & subtle contour',
      'Complimentary strip lashes included',
      'Long-wearing 12-hour makeup prep'
    ],
    preparation: [
      'Arrive with a cleansed, moisturized face.',
      'Wear a button-down shirt so you can change easily without disturbing makeup.'
    ],
    aftercare: ['Use makeup setting spray and blotting papers if attending long events.'],
    suitableFor: 'Clients wanting effortless elegance, photo-ready skin, and luminous beauty.'
  },
  {
    id: 95989069,
    slug: 'full-glam-makeup',
    name: 'Full Glam Makeup (with Bukky)',
    category: 'Makeup',
    categoryRaw: 'MAKEUP SERVICES',
    price: 80,
    duration: 120,
    deposit: 25,
    description: 'A show-stopping, full-coverage glam with sculpted cheekbones, defined dramatic eyes (cut crease, smokey, or winged), highlight, and an immaculate long-lasting finish. Perfect for weddings, red carpets, milestones, and parties.',
    image: '/public/settings inspo img.jpg',
    features: [
      'Full coverage waterproof sculpting',
      'Detailed eye artistry (smokey, shimmer, or winged)',
      'Complimentary premium 3D luxury strip lashes',
      'Sweat-proof, tear-resistant finish'
    ],
    preparation: [
      'Exfoliate gently the night before for super-smooth canvas.',
      'Wear a loose or zip-up top.'
    ],
    aftercare: ['Touch up lip color with your personal lipstick throughout the night.'],
    suitableFor: 'Brides, birthday queens, gala attendees, and photo-heavy evening events.'
  },

  // LASH TRAINING
  {
    id: 96654561,
    slug: 'beginner-lash-course',
    name: 'CPD-Accredited 3-Day Beginner Lash Course',
    category: 'Training',
    categoryRaw: 'LASH TRAINING ',
    price: 600,
    duration: 360, // Full day intensive
    deposit: 100,
    popular: true,
    description: 'Kickstart your beauty career with Sandy’s comprehensive 3-Day One-to-One Lash Course in Edinburgh. Designed for complete beginners, you will master lash theory, hygiene & contraindications, consultation, classic lash application, mapping, isolation, infills, removals, pricing, and business scaling. Includes luxury starter kit, manual, live model practice, CPD certificate, and lifetime ongoing mentorship.',
    image: '/Sandy pfp.png',
    features: [
      '1-on-1 private mentorship directly with Sandy',
      'Fully CPD-Accredited professional certificate',
      'Full professional starter kit included (value £150+)',
      'Live model practice under direct guidance',
      'Comprehensive manual covering business setup, social media & client retention',
      'Lifetime WhatsApp support and technique feedback'
    ],
    preparation: [
      'No prior beauty qualifications required.',
      'A deposit of £100 reserves your scheduled training dates.',
      'We supply all equipment, mannequin heads, and practical supplies.'
    ],
    aftercare: [
      'Submit your initial case studies for final CPD certification seal.',
      'Access ongoing mentorship calls.'
    ],
    suitableFor: 'Aspiring lash artists, beauty students, or beauty therapists wishing to launch a lucrative lash career.'
  }
];

export const CATEGORIES = [
  'All Services',
  'Lash Extensions',
  'Lash Infills',
  'Brows',
  'Makeup',
  'Extras',
  'Training'
] as const;
