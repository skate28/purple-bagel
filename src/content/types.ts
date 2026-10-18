/**
 * Content shapes for Purple Bagel.
 * All editable values live in `site.ts`. Components should tolerate empty fields.
 */

export type PhoneNumber = {
  /** Shown to people, e.g. "(904) 574-8002". */
  display: string;
  /** `tel:` href, e.g. "tel:+19045748002". */
  tel: string;
  /** E.164, e.g. "+19045748002". Also used for `sms:` links. */
  e164: string;
};

export type Weekday = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type DayHours = {
  /** 24-hour "HH:MM", or null when that edge is still unknown. */
  openTime: string | null;
  closeTime: string | null;
  /** True closes the shop for the whole day. */
  closed?: boolean;
};

export type Hours = {
  /** IANA zone used to decide open vs closed. */
  timezone: string;
  /** Short public line. The per-day schedule below is what open/closed uses. */
  summary: string;
  /**
   * Fallback window for a weekday missing from `byDay`.
   * Null means that day is unknown — the site does not assume a close time.
   */
  openTime: string | null;
  closeTime: string | null;
  /** Per-day hours. This is the schedule open/closed reads. */
  byDay?: Partial<Record<Weekday, DayHours>>;
};

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  /**
   * Leave unset until a real price is confirmed.
   * The menu never invents a price when this is missing.
   */
  price?: number;
  /** Seeded stand-in copy. Hidden once real items replace it. */
  placeholder?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  /** Shown when the category has no real items, e.g. "Menu coming soon". */
  description?: string;
  items: MenuItem[];
};

export type PhotoCategory = "storefront" | "interior" | "menu-board" | "logo" | "drinks";

export type Photo = {
  /** Public path under `/images`, e.g. "/images/storefront.jpg". */
  src: string;
  alt: string;
  category: PhotoCategory;
  width?: number;
  height?: number;
  /**
   * Homepage hero. Prefer a portrait (interior-counter.jpg is 750×1000).
   * The hero is a side column, not a full-bleed banner.
   */
  hero?: boolean;
  /**
   * Optional public path used for the hero when `hero` is set.
   * Falls back to `src`.
   */
  heroImage?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  quote: string;
  /** Optional display name. Do not invent a staff or owner name. */
  author?: string;
  /** Visible link text, e.g. "Google review". */
  sourceLabel: string;
  /** Reviews must link here. Testimonials without a URL are not shown. */
  sourceUrl: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type BulkSpecial = {
  id: string;
  /** "Half dozen", "Dozen", … */
  label: string;
  /** Dozen-equivalents. 0.5 is a half dozen, 1 is a dozen. */
  dozens: number;
  price: number;
};

export type Palette = {
  /** Bagel Purple. Primary text and buttons. */
  ink: string;
  /** Bagel Purple. Primary fills. */
  brand: string;
  /** Royal Violet. */
  brandDeep: string;
  /** Frame Violet. */
  brandBright: string;
  /** Lavender Mist. */
  lilac: string;
  /** Cream Cheese. Page background. */
  cream: string;
  creamDeep: string;
  /** Toasted Sesame. */
  sesame: string;
  /** Cream Cheese. Cards. */
  paper: string;
  salt: string;
  /** Sign Orange. Accent only — do not use for body text. */
  accent: string;
};

export type Rating = {
  value: number;
  count: number;
};

export type SiteContent = {
  name: string;
  tagline: string;
  /** Used for the meta description and Bakery JSON-LD. */
  description: string;
  /** Free-text opening, e.g. "early 2026". Empty hides the line. */
  opened: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    region: string;
    country: string;
    /** Single line used for maps and the footer. */
    full: string;
  };
  /** Null coordinates keep the map on the street address. Do not guess. */
  geo: {
    latitude: number | null;
    longitude: number | null;
  };
  phone: PhoneNumber;
  /**
   * Optional after-hours / assistant number.
   * Null uses the shop line. Fill this in later to swap the number
   * without touching components.
   */
  afterHoursPhone: PhoneNumber | null;
  /**
   * Optional number for "Text us" links.
   * Null uses the shop line.
   */
  textNumber: PhoneNumber | null;
  /** Shown on the call button outside that day's open window. */
  closedNotice: string;
  hours: Hours;
  socials: SocialLink[];
  /** Aggregate score only. Quotes belong in `testimonials`. */
  rating: Rating | null;
  /** Confirmed quotes only. The section hides while this is empty. */
  testimonials: Testimonial[];
  /** The FAQ section and FAQPage JSON-LD hide while this is empty. */
  faq: FaqItem[];
  menuNote: string;
  menu: MenuCategory[];
  /** Priced bulk bundles for the pre-order form. Empty hides the selector. */
  bulkSpecials: BulkSpecial[];
  photos: Photo[];
  /**
   * Public path for the homepage hero portrait, e.g. "/images/interior-counter.jpg".
   * When set, this wins over a photo `hero` flag. Omit it to use that flag,
   * or leave both unset to keep the illustrated mark.
   */
  heroImage?: string;
  palette: Palette;
  about: {
    heading: string;
    paragraphs: string[];
  };
  preorder: {
    heading: string;
    intro: string;
    textButtonLabel: string;
    /** Body of the `sms:` link. */
    textMessage: string;
    /** How far ahead a pickup date may be. */
    maxDaysAhead: number;
  };
};
