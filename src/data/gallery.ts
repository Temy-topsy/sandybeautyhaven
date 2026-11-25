export interface GalleryItem {
  id: string;
  title: string;
  category: 'Lashes' | 'Brows' | 'Studio' | 'Makeup';
  image: string;
  description: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Precision Editorial Lash Mapping',
    category: 'Lashes',
    image: '/appointments/bespoke-lashes-luxury.webp',
    description: 'Bespoke lash extension artistry tailored to compliment natural eye contour and lash density.'
  },
  {
    id: 'gal-2',
    title: 'Textured Fluffy Hybrid Set',
    category: 'Lashes',
    image: '/appointments/hybrid-lashes-luxury.webp',
    description: 'A seamless mixture of classic singles and handmade volume fans for an effortless, dimensional finish.'
  },
  {
    id: 'gal-3',
    title: 'Wispy Kardashian Strip-Lash Look',
    category: 'Lashes',
    image: '/appointments/wispy-lashes-luxury.webp',
    description: 'Alternating spike lengths and volume fans delivering a textured, Kim K flutter.'
  },
  {
    id: 'gal-4',
    title: 'Authentic Client Lashes & Brow Transformations',
    category: 'Brows',
    image: '/client-results.webp',
    description: 'Real client results straight from the studio chair: Radiant skin, flawless lashes, and precision sculpted brows.'
  },
  {
    id: 'gal-makeup-1',
    title: 'Radiant Soft Glam Makeup Artistry',
    category: 'Makeup',
    image: '/appointments/soft-glam-makeup.webp',
    description: 'Fresh, luminous skin tint with soft neutral blending, groomed brows, and effortless elegance.'
  },
  {
    id: 'gal-makeup-2',
    title: 'Full Glamour & Occasion Artistry',
    category: 'Makeup',
    image: '/appointments/full-glam-makeup.webp',
    description: 'Full-coverage luxury contour, defined eyes, high-impact flutter lashes, and a velvety glow.'
  },
  {
    id: 'gal-5',
    title: 'Combo Brows Microblading & Microshading',
    category: 'Brows',
    image: '/appointments/combo-brows-luxury.webp',
    description: 'Crisp front hair strokes blended with soft powdered shading lasting 2 to 3 years.'
  },
  {
    id: 'gal-6',
    title: 'Refined Brow Touch-Up & Shape',
    category: 'Brows',
    image: '/appointments/ombre-powder-brows-luxury.webp',
    description: 'Annual color boost and razor sculpting to keep brows crisp, symmetrical, and fresh.'
  },
  {
    id: 'gal-7',
    title: 'Sandy Beauty Haven Studio Interior',
    category: 'Studio',
    image: '/settings inspo img.jpg',
    description: 'Our luxury studio interior at 101 Easter Road with warm lighting, arched mirrors, and plush seating.'
  },
  {
    id: 'gal-8',
    title: '101 Easter Road Studio Storefront',
    category: 'Studio',
    image: '/settings inspo img2.jpg',
    description: 'Welcome to Sandy Beauty Haven in the heart of Edinburgh — Lashes, Hair, Beauty & Training.'
  }
];
