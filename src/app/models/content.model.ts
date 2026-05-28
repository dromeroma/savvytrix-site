export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Benefit {
  text: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface ProductTab {
  id: string;
  label: string;
  description: string;
  asset: string;
  assetSize: string;
}

export interface InnovationCard {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  business: string;
  city: string;
  logo?: string;
  logoScale?: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  annualPrice?: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}
