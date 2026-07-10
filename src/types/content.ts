import type { Locale } from "@/lib/i18n";

export type LocalizedString = Record<Locale, string>;

export type Availability =
  | "available"
  | "limited"
  | "on-request"
  | "fully-booked";

export type PriceMode =
  | { kind: "on-request" }
  | { kind: "from"; amount: string }
  | { kind: "exact"; amount: string };

export type ImageAsset = {
  src: string;
  alt: LocalizedString;
  width?: number;
  height?: number;
  isPlaceholder?: boolean;
};

export type NavItem = {
  href: string;
  label: LocalizedString;
};

export type ProofStat = {
  value: LocalizedString;
  label: LocalizedString;
  needsValidation: boolean;
};

export type ProgrammeCardData = {
  id: string;
  title: LocalizedString;
  copy: LocalizedString;
  cta: LocalizedString;
  href: string;
  image: ImageAsset;
};

export type CarSpecification = {
  label: LocalizedString;
  value: LocalizedString;
  validationRequired?: boolean;
};

export type ServiceItem = {
  title: LocalizedString;
  copy: LocalizedString;
  icon: string;
};

export type ProcessStep = {
  step: string;
  title: LocalizedString;
  copy: LocalizedString;
};

export type CircuitAvailability = {
  id: string;
  circuit: string;
  country: LocalizedString;
  date: string;
  programme: LocalizedString;
  image: ImageAsset;
  availability: Availability;
  seats: string;
  href: string;
  isDemo: boolean;
};

export type TimelineItem = {
  year?: string;
  title: LocalizedString;
  copy: LocalizedString;
  provisional: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: LocalizedString;
  publicRole: LocalizedString;
  nationality?: LocalizedString;
  biography: LocalizedString;
  achievements: LocalizedString[];
  languages: string[];
  image: ImageAsset;
  social?: string;
  quote?: LocalizedString;
  needsValidation?: boolean;
};

export type Testimonial = {
  name: string;
  initials: string;
  country: LocalizedString;
  previousExperience: LocalizedString;
  programme: LocalizedString;
  quote: LocalizedString;
  portrait?: ImageAsset;
  isVerified: boolean;
};

export type PrivateTestFormat = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  idealDriver: LocalizedString;
  duration: LocalizedString;
  trackTime: LocalizedString;
  coaching: LocalizedString;
  dataReview: LocalizedString;
  equipment: LocalizedString;
  price: PriceMode;
  cta: LocalizedString;
};

export type FAQItem = {
  question: LocalizedString;
  answer: LocalizedString;
};

export type RaceSeat = {
  id: string;
  event: string;
  circuit: string;
  country: LocalizedString;
  dates: string;
  raceFormat: string;
  category: string;
  carNumber: string;
  drivers: string;
  estimatedDrivingTime: LocalizedString;
  requiredExperience: LocalizedString;
  licenceRequirements: LocalizedString;
  includedServices: LocalizedString[];
  optionalExtras: LocalizedString[];
  availability: Availability;
  price: PriceMode;
  isDemo: boolean;
};

export type CalendarEvent = {
  id: string;
  date: string;
  circuit: string;
  country: LocalizedString;
  type: "private-testing" | "race-weekend";
  image: ImageAsset;
  availability: Availability;
  cta: LocalizedString;
  href: string;
  isDemo: boolean;
};

export type RaceResult = {
  id: string;
  year: string;
  event: string;
  circuit: string;
  drivers: string[];
  championship: string;
  category: string;
  overallPosition: string;
  classPosition: string;
  carNumber: string;
  image: ImageAsset;
  sourceUrl?: string;
  verified: boolean;
  featured: boolean;
};
