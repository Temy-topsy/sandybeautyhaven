declare module 'lucide-react' {
  import type { FC, SVGProps } from 'react';

  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    className?: string;
  }

  export type LucideIcon = FC<LucideProps>;

  export const Calendar: LucideIcon;
  export const Clock: LucideIcon;
  export const MapPin: LucideIcon;
  export const Phone: LucideIcon;
  export const Mail: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Star: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Check: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const User: LucideIcon;
  export const CreditCard: LucideIcon;
  export const Heart: LucideIcon;
  export const Award: LucideIcon;
  export const Info: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const MessageSquarePlus: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const BookOpen: LucideIcon;
  export const Users: LucideIcon;
  export const PackageCheck: LucideIcon;
  export const Search: LucideIcon;
  export const Filter: LucideIcon;
  export const Share2: LucideIcon;
  export const Sparkle: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const FileText: LucideIcon;
  export const Shield: LucideIcon;
  export const Download: LucideIcon;
  export const Home: LucideIcon;
  export const Send: LucideIcon;
  export const Eye: LucideIcon;
  export const Smartphone: LucideIcon;
  export const Trash2: LucideIcon;
  export const Plus: LucideIcon;
  export const Minus: LucideIcon;
  export const ShoppingBag: LucideIcon;
  export const ShoppingCart: LucideIcon;
  export const ShoppingBasket: LucideIcon;
}
