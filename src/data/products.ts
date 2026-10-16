export interface ProductItem {
  id: string;
  name: string;
  category: 'Hair & Wigs' | 'Press-On Nails' | 'Lip Care' | 'Lash & Brow Care';
  price: number;
  image: string;
  shortDescription: string;
  description: string;
  badge?: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  features: string[];
}

export const PRODUCTS: ProductItem[] = [
  {
    id: 'hair-body-wave',
    name: 'Raw Virgin Body Wave Bundles (Set of 3)',
    category: 'Hair & Wigs',
    price: 145.00,
    image: '/products/hair-bundles.jpg',
    shortDescription: '100% Raw virgin human hair with natural bounce and full cuticle alignment.',
    description: 'Our signature raw virgin body wave hair bundles are ethically sourced and unprocessed. Cuticles run in the same direction, providing silky movement, zero matting, and minimal shedding. Holds curls effortlessly and bleaches cleanly to #613 platinum blonde.',
    badge: 'Bestseller',
    inStock: true,
    rating: 4.9,
    reviewCount: 42,
    features: [
      '100% Unprocessed Virgin Human Hair',
      'Double wefted for zero shedding',
      'Bleaches cleanly to 613 blonde',
      'Can be heat styled up to 230°C'
    ]
  },
  {
    id: 'hair-hd-frontal',
    name: '13x6 HD Swiss Invisible Lace Frontal',
    category: 'Hair & Wigs',
    price: 85.00,
    image: '/products/hair-bundles.jpg',
    shortDescription: 'Ultra-thin HD Swiss lace with pre-plucked natural hairline and micro-knots.',
    description: 'Designed for the most natural melt imaginable. The true HD Swiss lace disappears into all skin tones upon application. Comes pre-customized with micro bleached knots and baby hairs for a flawless install.',
    badge: 'Luxury HD',
    inStock: true,
    rating: 4.9,
    reviewCount: 28,
    features: [
      'Real HD Swiss invisible lace',
      'Pre-plucked natural gradient hairline',
      'Bleached micro-knots for scalp illusion',
      'Free parting 13x6 deep ear-to-ear space'
    ]
  },
  {
    id: 'nails-french-almond',
    name: 'Glazed French Almond Sculpted Press-Ons',
    category: 'Press-On Nails',
    price: 28.00,
    image: '/products/press-on-nails.jpg',
    shortDescription: 'Salon-grade reusable glazed almond nails with classic milky French tips.',
    description: 'Skip the 2-hour salon chair. Hand-sculpted reusable press-on nails featuring a soft milky French ombre with glazed chrome sheen. Created with high-durability acrylic gel that lasts up to 3 weeks with glue, or reusable with adhesive tabs.',
    badge: 'Popular',
    inStock: true,
    rating: 5.0,
    reviewCount: 64,
    features: [
      '24 Custom-fit nails in 12 sizes',
      'Salon-sculpted gel durability (no bending)',
      'Includes glue, 24 adhesive tabs, buffer & cuticle stick',
      'Reusable up to 5+ times'
    ]
  },
  {
    id: 'nails-chrome-square',
    name: 'Minimalist Nude Chrome Square Set',
    category: 'Press-On Nails',
    price: 26.00,
    image: '/products/press-on-nails.jpg',
    shortDescription: 'Clean girl aesthetic short square nails in champagne pearl chrome.',
    description: 'The ultimate everyday chic set. Subtle neutral nude base with an ethereal champagne mirror chrome reflection. Comfortable length designed for seamless typing, work, and everyday luxury.',
    badge: 'Clean Aesthetic',
    inStock: true,
    rating: 4.8,
    reviewCount: 31,
    features: [
      'Short square functional shape',
      'High-gloss UV topcoat scratch-resistant',
      'Waterproof & chip-proof for 14+ days',
      'Instant 5-minute home application'
    ]
  },
  {
    id: 'lip-haven-glaze',
    name: 'Haven Glaze Peptide Plumping Lip Oil',
    category: 'Lip Care',
    price: 16.00,
    image: '/products/lip-gloss.jpg',
    shortDescription: 'High-shine crystal peptide lip oil enriched with Rosehip and Jojoba.',
    description: 'Get the glossy glass-lip look without any stickiness. Packed with tri-peptides that visibly smooth lip lines and plump moisture barriers. Infused with cold-pressed rosehip seed oil and vitamin E with a delicious natural vanilla aroma.',
    badge: 'Sandy Favorite',
    inStock: true,
    rating: 5.0,
    reviewCount: 89,
    features: [
      'Non-sticky glass cushion texture',
      'Tri-peptide complex for fuller appearance',
      'Infused with organic Jojoba & Rosehip oil',
      'Oversized plush doe-foot applicator'
    ]
  },
  {
    id: 'lip-rose-tint',
    name: 'Velvet Rose Hydrating Lip Shimmer',
    category: 'Lip Care',
    price: 15.00,
    image: '/products/lip-gloss.jpg',
    shortDescription: 'Warm golden rose lip glaze with light-reflecting diamond pearls.',
    description: 'A luminous wash of rose gold shimmer that enhances your natural lip tone. Melts upon contact to nourish chapped lips while leaving a reflective diamond finish that catches the light from every angle.',
    badge: 'Limited Edition',
    inStock: true,
    rating: 4.9,
    reviewCount: 23,
    features: [
      'Micro-fine light-reflecting pearls',
      '100% Vegan & cruelty-free formula',
      'Hydrates for up to 8 hours',
      'Wear alone or layered over lip liner'
    ]
  },
  {
    id: 'lash-cleanser-kit',
    name: 'Foaming Lash Cleanser + Gold Brush Kit',
    category: 'Lash & Brow Care',
    price: 18.00,
    image: '/products/lash-cleanser.jpg',
    shortDescription: 'Oil-free lash extension shampoo to maintain fluffy lashes & 4+ week retention.',
    description: 'The essential aftercare product recommended by lash artists. Gentle, pH-balanced foaming shampoo cleanses natural oils, makeup residue, and dust from lash extensions without breaking the adhesive bond. Increases lash retention by up to 40%.',
    badge: 'Essential',
    inStock: true,
    rating: 5.0,
    reviewCount: 112,
    features: [
      '100% Oil-free & tear-free formula',
      'Safe for all extension types (Classic to Mega Volume)',
      'Includes gold soft micro-fiber cleansing brush',
      'Prolongs retention and prevents blepharitis'
    ]
  },
  {
    id: 'lash-growth-serum',
    name: 'Sandy Peptide Brow & Lash Retention Serum',
    category: 'Lash & Brow Care',
    price: 28.00,
    image: '/products/lash-cleanser.jpg',
    shortDescription: 'Prostaglandin-free botanical peptide serum for strong, resilient natural lashes.',
    description: 'Strengthen natural lashes to support full volume extension sets. Formulated with myristoyl pentapeptide-17, biotin, and hyaluronic acid. Strengthens root follicles, reduces lash shedding during fills, and thickens sparse brow tails in 4 to 6 weeks.',
    badge: 'Top Rated',
    inStock: true,
    rating: 4.9,
    reviewCount: 47,
    features: [
      'Prostaglandin-free (no eye discoloration)',
      '100% Safe with lash extensions',
      'Noticeable density in 28 days',
      'Precision fine-point brush applicator'
    ]
  }
];
