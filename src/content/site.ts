import type { PhoneNumber, SiteContent } from "@/content/types";

/**
 * Purple Bagel — the only editable content file.
 *
 * Change business info, hours, menu, photos, testimonials, FAQ, and palette hints here.
 * Components read this module and hide anything that is still empty.
 *
 * Photos: put files in `public/images/`, then add them to `photos`.
 * The gallery stays hidden while `photos` is empty.
 * Do not drop in stock or AI-generated pictures of food or the shop.
 *
 * The best hero is a portrait (`interior-counter.jpg`, 750×1000). Mark it
 * with `hero: true`, or set `heroImage` to its public path. Storefront
 * shots are about 600px wide and render as small cards. The logo JPG is
 * about 360px on white and renders as a small badge; the wordmark stays
 * the name plus the illustrated bagel.
 *
 * Menu: the categories below are placeholders. Replace `items` when the
 * real menu is confirmed, and leave `price` off until that price is real.
 * Bulk pre-order prices live in `bulkSpecials`, separate from the menu.
 *
 * Photos need a `category`: storefront, interior, menu-board, logo, or drinks.
 * FAQ (`faq`) and testimonials hide until you add entries.
 * A testimonial must include `sourceLabel` and `sourceUrl`.
 *
 * Phone numbers: `afterHoursPhone` and `textNumber` are optional.
 * While they are null, after-hours calls and pre-order texts use the shop
 * line (`phone`, +19045748002). Set either field later to point that
 * button at a dedicated assistant number — no component changes.
 */

export const site: SiteContent = {
  name: "Purple Bagel",
  tagline: "Everything's Better in Purple.",
  description:
    "Purple Bagel is a bagel shop at 1703 N Main St in Springfield, Jacksonville, FL. Mon–Fri 7 AM–1 PM, Sat–Sun 7 AM–4 PM. Rated 4.9 stars from 88 reviews. Call (904) 574-8002.",
  opened: "early 2026",

  address: {
    street: "1703 N Main St",
    neighborhood: "Springfield",
    city: "Jacksonville",
    region: "FL",
    country: "US",
    full: "1703 N Main St, Springfield, Jacksonville, FL",
  },

  geo: {
    latitude: null,
    longitude: null,
  },

  phone: {
    display: "(904) 574-8002",
    tel: "tel:+19045748002",
    e164: "+19045748002",
  },

  // Dedicated after-hours assistant number. Null = shop line above.
  afterHoursPhone: null,

  // Dedicated pre-order SMS number. Null = shop line above.
  textNumber: null,

  closedNotice:
    "We're closed — call or text, our assistant can take your pre-order",

  hours: {
    timezone: "America/New_York",
    summary: "Mon–Fri 7 AM–1 PM, Sat–Sun 7 AM–4 PM",
    // No single default window. Open/closed reads `byDay` only.
    openTime: null,
    closeTime: null,
    byDay: {
      mon: { openTime: "07:00", closeTime: "13:00" },
      tue: { openTime: "07:00", closeTime: "13:00" },
      wed: { openTime: "07:00", closeTime: "13:00" },
      thu: { openTime: "07:00", closeTime: "13:00" },
      fri: { openTime: "07:00", closeTime: "13:00" },
      sat: { openTime: "07:00", closeTime: "16:00" },
      sun: { openTime: "07:00", closeTime: "16:00" },
    },
  },

  socials: [
    {
      label: "Facebook",
      href: "https://facebook.com/113381091593648",
    },
  ],

  rating: {
    value: 4.9,
    count: 88,
  },

  // Confirmed quotes only. Each one needs a source URL. Leave empty — do not invent any.
  testimonials: [],

  // Question and answer pairs. Leave empty until the shop writes them.
  faq: [],

  menuNote:
    "Menu coming soon. Items and prices will show up here once they are confirmed.",

  menu: [
    {
      id: "bagels",
      name: "Bagels",
      description: "Menu coming soon",
      items: [],
    },
    {
      id: "schmears",
      name: "Schmears",
      description: "Menu coming soon",
      items: [],
    },
    {
      id: "sandwiches",
      name: "Sandwiches",
      description: "Menu coming soon",
      items: [],
    },
    {
      id: "coffee",
      name: "Coffee",
      description: "Menu coming soon",
      items: [],
    },
  ],

  // Real photos only. Empty on purpose until the shop provides them.
  // Portrait hero: hero: true, or heroImage: "/images/interior-counter.jpg" (750×1000).
  photos: [],

  bulkSpecials: [
    { id: "half-dozen", label: "Half dozen", dozens: 0.5, price: 15 },
    { id: "dozen", label: "Dozen", dozens: 1, price: 22 },
  ],

  palette: {
    ink: "#2D1652",
    brand: "#2D1652",
    brandDeep: "#3F2470",
    brandBright: "#4A4CB0",
    lilac: "#F1EAF7",
    cream: "#FFFDF8",
    creamDeep: "#F1EAF7",
    sesame: "#D08A50",
    paper: "#FFFDF8",
    salt: "#F1EAF7",
    accent: "#F28A1E",
  },

  about: {
    heading: "On North Main, in Springfield",
    paragraphs: [
      "Purple Bagel is a neighborhood bagel shop at 1703 N Main St in Springfield, Jacksonville, Florida. The shop opened in early 2026.",
      "Springfield is the neighborhood around the shop, along North Main Street in Jacksonville. Hours are Monday–Friday 7 AM–1 PM and Saturday–Sunday 7 AM–4 PM.",
      "Bagels, schmears, sandwiches, and coffee will be listed on this page once the menu is confirmed. Until then, call the shop and ask what is available today.",
    ],
  },

  preorder: {
    heading: "Bulk pre-orders",
    intro:
      "Ordering bagels for a group? Choose half dozens and dozens, then tell us the pickup day and any flavors or notes. Text the shop, or send the form.",
    textButtonLabel: "Text us to pre-order",
    textMessage: "Hi Purple Bagel, I'd like to pre-order bagels.",
    maxDaysAhead: 120,
  },
};

/** Text-us number. Falls back to the shop line while `textNumber` is unset. */
export function textTarget(content: SiteContent = site): PhoneNumber {
  if (content.textNumber?.e164 || content.textNumber?.tel) {
    return content.textNumber;
  }
  return content.phone;
}

/**
 * Call number. Open hours always use the shop line.
 * After close, `afterHoursPhone` wins when it is set; otherwise the shop line.
 */
export function callTarget(content: SiteContent, isClosed: boolean): PhoneNumber {
  if (
    isClosed &&
    (content.afterHoursPhone?.e164 || content.afterHoursPhone?.tel)
  ) {
    return content.afterHoursPhone;
  }
  return content.phone;
}
