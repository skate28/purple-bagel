# Purple Bagel

Website for Purple Bagel, a bagel shop at 1703 N Main St in Springfield, Jacksonville, FL.

Next.js (App Router), TypeScript, and Tailwind CSS. It deploys on Vercel with no extra adapter.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Where things live

```
src/content/site.ts          All editable content (the only file to edit for copy)
src/content/types.ts         Types for that content
src/content/types.ts         Types for that content
src/app/page.tsx             Home: hero, about, menu, gallery, pre-order, visit
src/app/preorder/page.tsx    Bulk pre-order page
src/app/api/preorder/route.ts  Form endpoint
src/lib/sms.ts               SMS provider (Bland, or a log fallback)
src/lib/hours.ts             Open/closed in America/New_York
public/images/               Real shop photos (empty until you add them)
```

Components read `site.ts`. Empty menu, empty photos, empty testimonials, and an empty FAQ are all safe: those sections hide, and menu prices render only when an item has a real `price`.

## Edit the shop

Open `src/content/site.ts`.

- **Hours.** `hours.byDay` is the schedule, in `America/New_York`. Weekdays are 7:00–13:00 and Saturday–Sunday are 7:00–16:00. `hours.summary` is the short public line. Open/closed reads that day’s open and close. It does not assume a single closing time. Leave a day’s times null if they are unknown.
- **After-hours number.** `afterHoursPhone` is `null`, so outside the day’s window the call button uses the shop line, (904) 574-8002. Set `afterHoursPhone` to a `{ display, tel, e164 }` object when a dedicated assistant number exists.
- **Text-us number.** `textNumber` is `null`, so “Text us to pre-order” uses the same shop line. Set `textNumber` later to swap it. No component changes.
- **Menu.** Categories Bagels, Schmears, Sandwiches, and Coffee are placeholders (`Menu coming soon`). Add items when they are confirmed. Omit `price` until the price is real — the site will not invent one.
- **Bulk specials.** `bulkSpecials` prices the pre-order form. The seed is a half dozen at $15 and a dozen at $22. The form totals whatever quantities the customer picks.
- **Photos.** Do not add stock or AI images of the food or the shop. Save real files in `public/images/`, then append to `photos` with a category (`storefront`, `interior`, `menu-board`, `logo`, or `drinks`):

  ```ts
  photos: [
    {
      src: "/images/interior-counter.jpg",
      alt: "The counter at Purple Bagel",
      category: "interior",
      width: 750,
      height: 1000,
      hero: true,
    },
    {
      src: "/images/storefront.jpg",
      alt: "Purple Bagel storefront",
      category: "storefront",
      width: 600,
      height: 400,
    },
    {
      src: "/images/logo.jpg",
      alt: "Purple Bagel logo",
      category: "logo",
      width: 360,
      height: 360,
    },
  ],
  ```

  The gallery stays hidden while `photos` is empty, then groups by category. A portrait with `hero: true` (or `heroImage: "/images/interior-counter.jpg"`) sits in the homepage side column. Storefront shots stay in small cards. The logo JPG sits in a small white badge; the name and illustrated bagel stay the wordmark.
- **Testimonials and FAQ.** Leave `testimonials` and `faq` empty until the words are real. Do not draft quotes, and do not name owners or staff. A testimonial needs `sourceLabel` and `sourceUrl`; the card links to that source. FAQ entries add an FAQ section and FAQPage structured data.
- **Palette.** `palette` is applied as CSS variables (Bagel Purple, Royal Violet, Frame Violet, Toasted Sesame, Sign Orange, Lavender Mist, Cream Cheese). Fallbacks live in `src/app/globals.css`. Sign Orange is an accent only.

## Pre-orders

The home page and `/preorder` share a form: name, phone, pickup date, half-dozen and dozen quantities from `bulkSpecials` (with an estimated total), and flavors/notes. A **Text us to pre-order** button opens an `sms:` link to the configured text number (the shop line for now).

`POST /api/preorder` checks the body with Zod and calls `src/lib/sms.ts`.

| Variable | Purpose |
| --- | --- |
| `SMS_PROVIDER` | `bland` to send through [Bland SMS](https://docs.bland.ai/api-v1/post/sms-send), `log` to log only, or blank |
| `PREORDER_NOTIFY_TO` | E.164 number that receives the shop alert |
| `PREORDER_SMS_FROM` | E.164 Bland agent number the alert is sent from |
| `BLAND_API_KEY` | Bland API key, only for `SMS_PROVIDER=bland` |
| `NEXT_PUBLIC_SITE_URL` | Optional canonical origin. On Vercel, the deployment host is used when this is blank |
| `ALLOW_INDEXING` | Set to `true` to allow search indexing. Any other value, including blank, blocks it. Read at build time, so redeploy after changing it |

If the provider or its credentials are missing, the API **does not crash**. It logs the pre-order and returns success telling the customer to also text the shop line. Copy `.env.example` to `.env.local` when you are ready to send for real.

## After close

Inside the day’s window in `hours.byDay`, the call button shows the shop phone. Outside that window it switches to “We're closed — call or text, our assistant can take your pre-order” and still dials the shop line until `afterHoursPhone` is set. The clock is `America/New_York`, including daylight saving. Monday–Friday that window is 7 AM–1 PM. Saturday and Sunday it is 7 AM–4 PM.

## SEO

Search indexing is off until the shop owner approves. `ALLOW_INDEXING` must be the exact string `true`. While it is not:

- `robots.txt` disallows every path.
- The root metadata robots tag is `noindex, nofollow`.
- Every route sends `X-Robots-Tag: noindex, nofollow`.

Set `ALLOW_INDEXING=true` and redeploy to restore the public robots file (allow `/`, disallow `/api/`, and publish the sitemap) and indexable metadata. The header is omitted in that case.

Metadata, Open Graph, and Twitter images are generated from `site.ts`. `src/app/sitemap.ts`, `src/app/robots.ts`, and `src/app/icon.svg` (a purple bagel) ship with the app. Bakery / LocalBusiness JSON-LD includes opening hours for each day that has both an open and a close. FAQPage JSON-LD is added only when `faq` has entries.

Type is Montserrat (headings, weight 800), Oswald (condensed headlines), Pacifico (the tagline), and DM Sans (body).
