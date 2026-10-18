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
    "Purple Bagel is Springfield's first dedicated bagel shop, at 1703 N Main St, Jacksonville, FL 32206. Big New York–sourced bagels, house-made schmears, bagel sandwiches and espresso. Mon–Fri 7 AM–1 PM, Sat–Sun 7 AM–4 PM. Call (904) 574-8002.",
  // Soft opening late Jan 2026 (Jacksonville Business Journal, Feb 4 2026).
  // TODO(Leads): exact grand-opening date if the owner wants it shown.
  opened: "early 2026",

  address: {
    street: "1703 N Main St",
    neighborhood: "Springfield",
    city: "Jacksonville",
    region: "FL",
    country: "US",
    full: "1703 N Main St, Jacksonville, FL 32206",
  },
  // TODO(Leads): confirm 1703 is the official number. FB "About" and Visit Jacksonville
  // say 1704 and Apple Maps/Yelp say 1705. The shop's own IG bio and graphics use 1703.

  // From Google (via Exa) 30.344558,-81.653885 and Apple Maps 30.3445775,-81.6538018,
  // which agree to within about 10 m.
  geo: {
    latitude: 30.344558,
    longitude: -81.653885,
  },

  phone: {
    display: "(904) 574-8002",
    tel: "tel:+19045748002",
    e164: "+19045748002",
  },

  // Dedicated after-hours assistant number. Null = shop line above.
  // TODO(Leads): set once an after-hours AI answering line is live.
  afterHoursPhone: null,

  // Dedicated pre-order SMS number. Null = shop line above.
  // TODO(Leads): confirm the shop line can receive texts. FB labels it "Mobile",
  // but that isn't confirmed. Otherwise set a dedicated SMS number.
  textNumber: null,

  // TODO(Leads): when an after-hours assistant is live, change this to mention it.
  closedNotice:
    "We're closed right now. Open Mon–Fri 7 AM–1 PM and Sat–Sun 7 AM–4 PM.",

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
    // TODO(Leads): holiday closures / special hours.
  },

  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/purplebageljax/",
    },
    {
      // facebook.com/113381091593648 redirects to this canonical page URL.
      label: "Facebook",
      href: "https://www.facebook.com/people/Purple-BAGEL/100087928637866/",
    },
  ],

  // Google rating as of 2026-10-18 (via Exa place data).
  rating: {
    value: 4.9,
    count: 88,
  },

  // Real quotes only, verbatim ("…" marks a trim), names as the platform shows them.
  // Parts that name staff were left out.
  // TODO(Leads): get the owner's OK before publishing reviews.
  testimonials: [
    {
      quote:
        "I love this place! Their bagels are so good and their schmears are super tasty! A great way to start your day!",
      author: "Alison Blitch",
      sourceLabel: "Google review (shared on Purple Bagel's Facebook)",
      sourceUrl: "https://www.facebook.com/photo/?fbid=1002114739396138",
    },
    {
      quote:
        "So excited to have Purple Bagel in the neighborhood as another breakfast option… The bacon, egg and cheese bagel sandwich was my favorite. Great flavor and perfectly cooked bacon. Such friendly staff.",
      author: "Ashley Plummer",
      sourceLabel: "Google review (shared on Purple Bagel's Facebook)",
      sourceUrl: "https://www.facebook.com/photo/?fbid=1002114739396138",
    },
    {
      quote:
        "We love the vibe and charisma of Purple Bagel! The service is great and the food is amazing.",
      author: "Stacy Taylor",
      sourceLabel: "Google review (shared on Purple Bagel's Facebook)",
      sourceUrl: "https://www.facebook.com/photo/?fbid=1002114739396138",
    },
    {
      quote:
        "Ingredients were fresh and service was great. My bagel was absolutely delicious and I will definitely visit again the next time I am in the area.",
      author: "david Smith",
      sourceLabel: "Google review (shared on Purple Bagel's Facebook)",
      sourceUrl: "https://www.facebook.com/photo/?fbid=1002114739396138",
    },
    {
      quote:
        "Purple bagel has great coffee and bagels! Fun art. Warm service and is leaving a historical mark as Springfields first bagel shop on Main Street!",
      author: "Betina L.",
      sourceLabel: "Yelp review",
      sourceUrl: "https://www.yelp.com/biz/purple-bagel-jacksonville",
    },
    {
      quote:
        "Great choices of fresh bagels and spreads. Coffee was excellent too! Easy parking made it a quick stop!",
      author: "Jeffrey L.",
      sourceLabel: "Yelp review",
      sourceUrl: "https://www.yelp.com/biz/purple-bagel-jacksonville",
    },
    {
      quote:
        "Very nice staff! The bagels were good and fresh! The dining area was clean and well put together!",
      author: "Aaron S.",
      sourceLabel: "Yelp review",
      sourceUrl: "https://www.yelp.com/biz/purple-bagel-jacksonville",
    },
    {
      quote:
        "Bagels are fresh and the schmears are tasty and filling. Friendly staff welcomed me in.",
      author: "Carol Ann",
      sourceLabel: "Facebook recommendation",
      sourceUrl: "https://www.facebook.com/people/Purple-BAGEL/100087928637866/?sk=reviews",
    },
    {
      quote:
        "My favorite is the toasted everything bagel with bacon, egg and cheddar. Quick, easy and so good. Great spot in Historic Springfield.",
      author: "Lenny Migliaccio",
      sourceLabel: "Facebook recommendation",
      sourceUrl:
        "https://www.facebook.com/lenny.migliaccio/posts/pfbid0LQwPAdC3yeXsREkHoeq6SmX3uixWLjxjLTkVTiQfyvk4ZUbVJZx2vaD8VqThtumfl",
    },
    {
      quote: "The blueberry bagel with blueberry jam was DELICIOUS 🥰",
      author: "Desie RaeAnn",
      sourceLabel: "Facebook recommendation",
      sourceUrl:
        "https://www.facebook.com/DeztineeBumP/posts/pfbid02tCBig2i3ZmNKrns7eFYA3NyeDmTWSDbaK69WhWm2JXZF6WQfb2LhtdpETDP69cAql",
    },
  ],

  // Verified answers only.
  // TODO(Leads): owner-only FAQs to add once answered: how to place a pre-order
  // (call/text/lead time), larger catering orders, delivery/online ordering, parking
  // (Apple Maps says "validated", unconfirmed), dogs (Apple Maps says "Pets Welcome",
  // unconfirmed), gluten-free/allergy policy, payment methods.
  faq: [
    {
      question: "Where is Purple Bagel?",
      answer:
        "1703 N Main St, Jacksonville, FL 32206, in Historic Springfield, right next door to our sister restaurant, Tulua Bistro.",
    },
    {
      question: "What are your hours?",
      answer: "Monday–Friday 7 AM–1 PM, and Saturday–Sunday 7 AM–4 PM.",
    },
    {
      question: "What's your phone number?",
      answer: "Call us at (904) 574-8002.",
    },
    {
      question: "How much is a bagel?",
      answer:
        "Bagels are $2.30 and schmears are $1.90 on our in-store menu board. Prices may change.",
    },
    {
      question: "What bagel flavors do you have?",
      answer:
        "Plain, Onion, Poppy, Sesame, Asiago, Everything, Blueberry, Wheat, Cinnamon Raisin and Sun-Dried Tomato. Check the board in store for today's lineup.",
    },
    {
      question: "Do you make your own cream cheese?",
      answer:
        "Yes. Our cream cheese spreads are made from scratch with fresh ingredients: plain, jalapeño, veggie, dill, everything, cinnamon, lox, strawberry, blueberry, chive, pineapple and more.",
    },
    {
      // TODO(Leads): confirm the owner is happy to publish the supplier detail.
      question: "Where do your bagels come from?",
      answer:
        "Our bagels are larger than average and come from a New York City supplier.",
    },
    {
      question: "Can I get bagels by the dozen?",
      answer:
        "Yes. Any half dozen with your choice of house-made schmear is $15, and any dozen with schmear is $22. They're great for the office or a special event.",
    },
    {
      question: "What bagel sandwiches do you make?",
      answer:
        "Favorites include the BEC (bacon, two eggs and American cheese on your choice of bagel), the Lox (smoked salmon, capers, tomato and plain schmear on an everything bagel), the BLT, the Loaded Lox, chicken salad and the Loaded Tuna.",
    },
    {
      question: "Do you serve coffee?",
      answer:
        "Yes: fresh coffee, espresso, lattes, cappuccinos, matcha, chai and iced coffee, including our caramel and mocha lattes. We also carry juices, energy drinks and electrolyte drinks.",
    },
    {
      question: "Is there seating?",
      answer:
        "Yes. There's indoor seating surrounded by our murals, plus patio tables out front on Main Street.",
    },
    {
      question: "Where can I follow you?",
      answer: "Instagram @purplebageljax and Facebook (Purple BAGEL).",
    },
  ],

  menuNote:
    "Prices are from our in-store menu board and may change. Ask at the counter for today's flavors.",

  // Prices come only from the in-store chalkboards (Yelp photo about Feb 1 2026 + newer
  // Apple Maps photo) and the shop's Facebook graphics. No delivery-app prices exist.
  // TODO(Leads): have the owner confirm every price and the current flavor list.
  menu: [
    {
      id: "bagels",
      name: "Bagels",
      description: "Larger-than-average bagels, $2.30 each.",
      items: [
        { id: "bagel-plain", name: "Plain", price: 2.3 },
        { id: "bagel-onion", name: "Onion", price: 2.3 },
        { id: "bagel-poppy", name: "Poppy", price: 2.3 },
        { id: "bagel-sesame", name: "Sesame", price: 2.3 },
        { id: "bagel-asiago", name: "Asiago", price: 2.3 },
        { id: "bagel-everything", name: "Everything", price: 2.3 },
        { id: "bagel-blueberry", name: "Blueberry", price: 2.3 },
        { id: "bagel-wheat", name: "Wheat", price: 2.3 },
        // The opening board said "Cinnamon"; the newer board says "Cinnamon Raisin".
        { id: "bagel-cinnamon-raisin", name: "Cinnamon Raisin", price: 2.3 },
        { id: "bagel-sun-dried-tomato", name: "Sun-Dried Tomato", price: 2.3 },
        // TODO(Leads): French Toast was on the opening board only. Add it back if it's still offered.
      ],
    },
    {
      id: "schmears",
      name: "House-Made Schmears",
      description: "Cream cheese spreads made from scratch, $1.90.",
      items: [
        { id: "schmear-plain", name: "Plain", price: 1.9 },
        { id: "schmear-jalapeno", name: "Jalapeño", description: "Made with fresh jalapeños.", price: 1.9 },
        { id: "schmear-veggie", name: "Veggie", price: 1.9 },
        { id: "schmear-dill", name: "Dill", price: 1.9 },
        { id: "schmear-everything", name: "Everything", price: 1.9 },
        { id: "schmear-cinnamon", name: "Cinnamon", price: 1.9 },
        { id: "schmear-lox", name: "Lox", price: 1.9 },
        { id: "schmear-strawberry", name: "Strawberry", price: 1.9 },
        { id: "schmear-blueberry", name: "Blueberry", price: 1.9 },
        { id: "schmear-chive", name: "Chive", price: 1.9 },
        { id: "schmear-pineapple", name: "Pineapple", price: 1.9 },
        // TODO(Leads): Nutella is on the newer board under Schmears. Confirm it's sold
        // as a spread at $1.90; it isn't one of the house-made cream cheeses.
        { id: "spread-nutella", name: "Nutella", price: 1.9 },
      ],
    },
    {
      id: "toppings",
      name: "Premium Toppings",
      description: "Add to any bagel.",
      items: [
        { id: "topping-cheese", name: "Cheese", price: 1.0 },
        { id: "topping-onion", name: "Onion", price: 1.5 },
        { id: "topping-avocado", name: "Avocado", price: 2.0 },
        { id: "topping-egg", name: "Egg", price: 2.0 },
        { id: "topping-spring-mix", name: "Spring Mix", price: 1.0 },
        { id: "topping-chicken-salad", name: "Chicken Salad", price: 3.75 },
        { id: "topping-tuna-salad", name: "Tuna Salad", price: 4.25 },
        // TODO(Leads): the board reads "2-3.00" for bacon and sausage. Confirm the exact prices.
        { id: "topping-bacon", name: "Bacon" },
        { id: "topping-sausage", name: "Sausage" },
      ],
    },
    {
      id: "sandwiches",
      name: "Bagel Sandwiches",
      items: [
        {
          id: "sandwich-bec",
          name: "BEC",
          description: "Bacon, two eggs and American cheese on your choice of bagel.",
          price: 9.25,
        },
        {
          id: "sandwich-lox",
          name: "Lox Bagel",
          description:
            "Smoked salmon, capers, tomato and plain schmear on an everything bagel. Cucumber and dill can be added.",
          price: 13,
        },
        {
          id: "sandwich-blt",
          name: "BLT",
          description: "Your choice of bagel with bacon, spring mix and tomato.",
          price: 8.75,
        },
        // TODO(Leads): prices for the items below aren't public (FB graphics only).
        {
          id: "sandwich-loaded-lox",
          name: "Loaded Lox",
          description: "Premium lox, cream cheese, fresh veggies and all the fixings.",
        },
        {
          id: "sandwich-chicken-salad",
          name: "Chicken Salad Bagel",
          description: "Chicken salad on your choice of bagel.",
        },
        {
          id: "sandwich-loaded-tuna",
          name: "Loaded Tuna",
          description: "Tuna salad with tomato, onion and lettuce.",
        },
        // TODO(Leads): "Loaded Bacon Egg & Cheese" and the "Tuna Bagel Combo" (with chips + drink)
        // appear in FB graphics. Confirm whether they're separate menu items and their prices.
      ],
    },
    {
      id: "coffee",
      name: "Coffee & Drinks",
      // TODO(Leads): drink prices and sizes aren't public.
      items: [
        { id: "drink-coffee", name: "Fresh Coffee" },
        { id: "drink-espresso", name: "Espresso" },
        { id: "drink-iced-coffee", name: "Iced Coffee" },
        { id: "drink-latte", name: "Latte" },
        { id: "drink-caramel-latte", name: "Caramel Latte" },
        { id: "drink-mocha-latte", name: "Mocha Latte" },
        { id: "drink-brown-sugar-cinnamon", name: "Brown Sugar Cinnamon Iced Latte" },
        { id: "drink-cappuccino", name: "Cappuccino" },
        { id: "drink-matcha", name: "Matcha" },
        { id: "drink-chai", name: "Chai" },
        { id: "drink-juice", name: "Juices" },
        { id: "drink-energy", name: "Energy Drinks" },
        { id: "drink-electrolyte", name: "Electrolyte Drinks" },
      ],
    },
  ],

  // Real photos only (see images/MANIFEST.md). No promo renders.
  // TODO(Leads): get the owner's OK for the Yelp/Facebook photos and plan a real food photo shoot.
  photos: [
    {
      src: "/images/interior-counter.jpg",
      alt: "Purple Bagel's blue mosaic-tile counter, with the big painted bagel logo and chalkboard menus behind it",
      category: "interior",
      width: 750,
      height: 1000,
      hero: true,
    },
    {
      src: "/images/storefront.jpg",
      alt: "Purple Bagel storefront on North Main Street with a Now Open banner, purple window decals and patio tables",
      category: "storefront",
      width: 600,
      height: 800,
    },
    {
      src: "/images/storefront-patio.jpg",
      alt: "Patio tables and a purple planter outside Purple Bagel",
      category: "storefront",
      width: 750,
      height: 1000,
    },
    {
      src: "/images/entrance-door.jpg",
      alt: "Glass entrance door with the round Purple Bagel logo",
      category: "storefront",
      width: 750,
      height: 1000,
    },
    {
      src: "/images/interior-mural.jpg",
      alt: "Large painted portrait mural inside Purple Bagel under a plum ceiling",
      category: "interior",
      width: 750,
      height: 1000,
    },
    {
      src: "/images/interior-seating.jpg",
      alt: "Window-side corner with a teal and purple wall mural and a potted plant",
      category: "interior",
      width: 750,
      height: 1000,
    },
    {
      src: "/images/interior-prep-area.jpg",
      alt: "Prep area with purple-framed chalkboards and a pastry case",
      category: "interior",
      width: 750,
      height: 1000,
    },
    {
      src: "/images/fresh-fruit.jpg",
      alt: "Basket of fresh fruit on the counter",
      category: "interior",
      width: 750,
      height: 1000,
    },
    {
      src: "/images/menu-board-1.jpg",
      alt: "Hand-chalked menu board listing bagel flavors, schmears and premium toppings",
      category: "menu-board",
      width: 1080,
      height: 1920,
    },
    {
      src: "/images/menu-board-featured.jpg",
      alt: "Featured Items chalkboard listing the Lox, BEC and BLT",
      category: "menu-board",
      width: 750,
      height: 1000,
    },
    {
      src: "/images/latte-1.jpg",
      alt: "Iced latte topped with whipped cream and caramel and mocha drizzle",
      category: "drinks",
      width: 1080,
      height: 1920,
    },
    {
      src: "/images/latte-2.jpg",
      alt: "Iced latte with whipped cream and chocolate drizzle",
      category: "drinks",
      width: 1080,
      height: 1920,
    },
    {
      src: "/images/latte-3.jpg",
      alt: "Iced latte on the Purple Bagel counter",
      category: "drinks",
      width: 750,
      height: 1000,
    },
    {
      src: "/images/logo.jpg",
      alt: "Purple Bagel logo: a sesame bagel inside a purple ring reading Purple Bagel, Springfield / Jax",
      category: "logo",
      width: 360,
      height: 360,
    },
    // TODO(Leads): get a vector/transparent logo from the owner (logo.jpg is 360px on white).
  ],
  heroImage: "/images/interior-counter.jpg",

  // From the shop's Facebook "Bulk Specials" graphic (Jun 24 2026): includes your choice of house-made schmear.
  // TODO(Leads): confirm still current, how many schmear tubs come with each, and lead time.
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
      "Purple Bagel opened on North Main Street in early 2026 as Historic Springfield's first dedicated bagel shop. We're right next door to our sister restaurant, Tulua Bistro.",
      "Our bagels are larger than average and come from a New York City supplier, and our cream cheese spreads are made from scratch with fresh ingredients. Pair them with a BEC, a lox bagel, or one of our tuna and chicken salad bagels, plus an espresso, latte, matcha or chai from the bar.",
      "Inside you'll find painted murals and plenty of purple. Outside there are patio tables on Main Street. Planning a meeting or a celebration? Grab a half dozen or a dozen with schmear.",
      // TODO(Leads): founding story (who started it, why purple), only what the owner wants published.
    ],
  },

  preorder: {
    heading: "Bulk pre-orders",
    intro:
      "Ordering bagels for a group? Choose half dozens and dozens, then tell us the pickup day and any flavors or notes. Text the shop, or send the form.",
    textButtonLabel: "Text us to pre-order",
    textMessage: "Hi Purple Bagel, I'd like to pre-order bagels.",
    // TODO(Leads): confirm how far ahead (and how much minimum notice) the shop accepts orders.
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
