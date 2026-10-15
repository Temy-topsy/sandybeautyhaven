export interface ReviewItem {
  id: string;
  name: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Ayishat A.',
    service: 'Hybrid Lash Extensions',
    rating: 5,
    date: 'October 2026',
    comment: 'I got my lashes done here yesterday for the first time and I absolutely love how comfortable sandy made me feel throughout the whole process, my lashes also came out gorgeous and flattering. Hoping it last ❤️',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Maggie H.',
    service: 'Volume / Russian Lashes',
    rating: 5,
    date: 'September 2026',
    comment: 'Always go back to Sandy’s lashes, she is so good at her craft and the lashes always last so long 💕 so flattering as well!',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Sophia L.',
    service: 'Classic Lash Extensions',
    rating: 5,
    date: 'August 2026',
    comment: 'I can’t stop staring at my lashes—they’re perfect! I wake up feeling beautiful every day without needing any mascara or makeup.',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Oghene A.',
    service: 'Ombré Powder Brows',
    rating: 5,
    date: 'September 2026',
    comment: 'As a returning customer, she gives amazing customer service! And I always leave feeling different, refreshed, and confident.',
    verified: true
  },
  {
    id: 'rev-5',
    name: 'Chloe M.',
    service: 'Wispy Lash Set',
    rating: 5,
    date: 'July 2026',
    comment: 'The wispy set is everything. Sandy mapped out the spikes perfectly to suit my eye shape. The studio space on Easter Road is so calm and pristine.',
    verified: true
  },
  {
    id: 'rev-6',
    name: 'Fatima K.',
    service: 'Combo Brows & Brow Touch-Up',
    rating: 5,
    date: 'June 2026',
    comment: 'My brows used to take me 20 minutes every morning to fill in with pencil. The combo brow session gave me soft strokes with realistic density that look completely natural.',
    verified: true
  },
  {
    id: 'rev-7',
    name: 'Sarah D.',
    service: 'CPD 3-Day Beginner Lash Course',
    rating: 5,
    date: 'May 2026',
    comment: 'Taking Sandy’s 1-on-1 lash training was the best investment I made this year. She was patient, thorough, gave practical tips on isolation and lash glue control, and gave me the confidence to take on my first paying clients.',
    verified: true
  },
  {
    id: 'rev-8',
    name: 'Jessica T.',
    service: 'Soft Glam Makeup (with Bukky)',
    rating: 5,
    date: 'August 2026',
    comment: 'Booked Bukky for my graduation makeup and the skin finish was luminous, glowing, and stayed flawless for over 12 hours through tears and celebrations!',
    verified: true
  }
];
