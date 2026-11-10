import type { ServiceItem } from './services';

export interface Specialist {
  id: string; // 'sandy' | 'studio-artist' | 'any'
  name: string;
  shortName: string;
  role: string;
  tier: 'master' | 'senior' | 'any';
  badge: string;
  description: string;
  availableForCategories: Array<'Lash Extensions' | 'Lash Infills' | 'Brows' | 'Makeup' | 'Extras' | 'Training'>;
}

export const SPECIALISTS: Specialist[] = [
  {
    id: 'sandy',
    name: 'Sandy (Founder & Master Artist)',
    shortName: 'Sandy',
    role: 'Founder & Master Lash Artist',
    tier: 'master',
    badge: 'Founder',
    description: 'Personal bespoke lash mapping and brow shaping crafted directly by Sandy.',
    availableForCategories: ['Lash Extensions' , 'Lash Infills' , 'Brows' , 'Makeup' , 'Extras' , 'Training']
  },
  {
    id: 'studio-artist',
    name: 'Senior Studio Artist',
    shortName: 'Studio Artist',
    role: 'Certified Studio Lash & Brow Artist',
    tier: 'senior',
    badge: 'Studio Team',
    description: 'Trained by Sandy. Same clinical hygiene & high-retention techniques at special studio rates.',
    availableForCategories: ['Lash Extensions', 'Lash Infills', 'Brows', 'Makeup', 'Extras']
  },
  {
    id: 'any',
    name: 'Any Available Specialist',
    shortName: 'Any Available',
    role: 'Earliest Available Slot',
    tier: 'any',
    badge: 'Fastest Slot',
    description: 'Auto-assigns to the first available opening between Sandy or a Studio Artist.',
    availableForCategories: ['Lash Extensions', 'Lash Infills', 'Brows', 'Makeup', 'Extras']
  }
];

/**
 * Calculates specialist pricing:
 * - Sandy (Founder): Standard master price (e.g. £55)
 * - Training: Strictly Sandy only (£600)
 * - Studio Artist: Special studio worker dummy price (~20% discount on lashes & brows, e.g. £55 -> £44, £50 -> £40, £65 -> £52, £200 -> £160)
 * - Any Available: Defaults to Studio Artist rate if booking with staff, or Sandy if Sandy is assigned
 */
export function getSpecialistPrice(service: ServiceItem, specialistId: string): number {
  if (specialistId === 'sandy' || specialistId === 'Sandy Beauty' || !specialistId) {
    return service.price;
  }
  if (service.category === 'Training') {
    return service.price; // Training is strictly Sandy only
  }
  // Studio Artist dummy pricing (~20% lower, rounded cleanly)
  if (service.price <= 15) return Math.max(5, service.price - 2); // e.g. £10 -> £8
  if (service.price <= 35) return Math.max(10, service.price - 5); // e.g. £30 -> £25
  if (service.price <= 65) return Math.round((service.price * 0.8) / 2) * 2; // e.g. £55 -> £44, £50 -> £40, £60 -> £48
  return Math.round((service.price * 0.8) / 5) * 5; // e.g. £200 -> £160, £95 -> £75
}

export function getSpecialistDeposit(service: ServiceItem, specialistId: string): number {
  const price = getSpecialistPrice(service, specialistId);
  return Math.min(service.deposit, price);
}

/**
 * Availability simulator for Sandy vs Studio Artist:
 * In a real busy studio, Sandy (the founder) is often fully booked on certain days (e.g. Tuesdays and Thursdays)
 * while the Studio Artist has open slots.
 */
export function isSpecialistAvailableOnDate(specialistId: string, dateString: string): boolean {
  if (!dateString) return true;
  try {
    const [y, m, d] = dateString.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayOfWeek = dateObj.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat

    if (dayOfWeek === 0) return false; // Sunday studio is closed

    // Sandy is fully booked on Tuesdays (2) and Thursdays (4) in this simulation
    if (specialistId === 'sandy' || specialistId === 'Sandy Beauty') {
      return dayOfWeek !== 2 && dayOfWeek !== 4;
    }

    // Studio Artist is available Mon through Sat
    return true;
  } catch {
    return true;
  }
}

/**
 * Available time slots for a given specialist on a date.
 */
export function getSpecialistTimeSlots(specialistId: string, dateString: string): string[] {
  const allSlots = ['09:30 AM', '11:00 AM', '12:30 PM', '02:00 PM', '03:30 PM', '04:45 PM'];

  if (!isSpecialistAvailableOnDate(specialistId, dateString)) {
    return []; // 0 slots if fully booked
  }

  // If Sandy, she has limited high-demand slots on available days
  if (specialistId === 'sandy' || specialistId === 'Sandy Beauty') {
    return ['11:00 AM', '02:00 PM', '03:30 PM'];
  }

  // Studio Artist has full availability
  return allSlots;
}
