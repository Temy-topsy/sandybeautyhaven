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
    image: '/lashes inspo img.jpg',
    description: 'Bespoke lash extension artistry tailored to compliment natural eye contour and lash density.'
  },
  {
    id: 'gal-2',
    title: 'Textured Fluffy Hybrid Set',
    category: 'Lashes',
    image: '/appointments/hybrid-lashes.jpg',
    description: 'A seamless mixture of classic singles and handmade volume fans for an effortless, dimensional finish.'
  },
  {
    id: 'gal-3',
    title: 'Wispy Kardashian Strip-Lash Look',
    category: 'Lashes',
    image: '/appointments/wispy-set.png',
    description: 'Alternating spike lengths and volume fans delivering a textured, Kim K flutter.'
  },
  {
    id: 'gal-4',
    title: 'Authentic Client Lashes & Brow Transformations',
    category: 'Brows',
    image: '/client-results.jpg',
    description: 'Real client results straight from the studio chair: Ombré powder shading and precision lash work.'
  },
  {
    id: 'gal-5',
    title: 'Combo Brows Microblading & Microshading',
    category: 'Brows',
    image: '/appointments/combo-brows.jpg',
    description: 'Crisp front hair strokes blended with soft powdered shading lasting 2 to 3 years.'
  },
  {
    id: 'gal-6',
    title: 'Refined Brow Touch-Up & Shape',
    category: 'Brows',
    image: '/appointments/brow-touchup.jpg',
    description: 'Annual color boost and razor sculpting to keep brows crisp, symmetrical, and fresh.'
  },
  {
    id: 'gal-7',
    title: 'Serene Sanctuary at 101 Easter Road',
    category: 'Studio',
    image: '/inspo design img.jpg',
    description: 'Our calm, editorial salon environment designed with warm alabaster tones and natural light.'
  },
  {
    id: 'gal-8',
    title: 'Minimalist Consultation & Styling Station',
    category: 'Studio',
    image: '/settings inspo img.jpg',
    description: 'Ergonomic treatment suites, arched brass mirrors, and pristine hygiene standards.'
  },
  {
    id: 'gal-9',
    title: 'Warm Alabaster Beauty Suite',
    category: 'Studio',
    image: '/settings inspo img2.jpg',
    description: 'Designed for deep relaxation during your lash naps and semi-permanent brow sessions.'
  }
];
