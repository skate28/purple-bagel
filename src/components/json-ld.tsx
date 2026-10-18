import { site } from "@/content/site";
import { heroPhoto } from "@/lib/photos";
import { getSiteUrl } from "@/lib/site-url";

const DAY_URLS = [
  ["sun", "https://schema.org/Sunday"],
  ["mon", "https://schema.org/Monday"],
  ["tue", "https://schema.org/Tuesday"],
  ["wed", "https://schema.org/Wednesday"],
  ["thu", "https://schema.org/Thursday"],
  ["fri", "https://schema.org/Friday"],
  ["sat", "https://schema.org/Saturday"],
] as const;

function openingHours() {
  const { hours } = site;
  const specs = DAY_URLS.flatMap(([key, dayOfWeek]) => {
    const day = hours.byDay?.[key];
    if (day?.closed) return [];
    const opens = day?.openTime ?? (day ? null : hours.openTime);
    const closes = day?.closeTime ?? (day ? null : hours.closeTime);
    if (!opens || !closes) return [];
    return [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        opens,
        closes,
      },
    ];
  });

  return specs.length > 0 ? specs : undefined;
}

function faqPage() {
  const items = site.faq.filter((item) => item.question.trim() && item.answer.trim());
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function JsonLd() {
  const url = getSiteUrl();
  const sameAs = site.socials.map((social) => social.href.trim()).filter(Boolean);
  const hours = openingHours();
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Bakery", "LocalBusiness"],
    name: site.name,
    url,
    description: site.description,
    servesCuisine: "Bagels",
  };

  const hero = heroPhoto();
  if (hero) data.image = `${url}${hero.src.startsWith("/") ? hero.src : `/${hero.src}`}`;
  if (site.phone.e164.trim()) data.telephone = site.phone.e164.trim();
  if (site.address.street.trim()) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    };
  }
  if (sameAs.length > 0) data.sameAs = sameAs;
  if (site.rating && site.rating.count > 0) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    };
  }
  const testimonials = site.testimonials.filter(
    (item) => item.quote.trim() && item.sourceUrl.trim(),
  );
  if (testimonials.length > 0) {
    data.review = testimonials.map((item) => ({
      "@type": "Review",
      reviewBody: item.quote,
      url: item.sourceUrl,
      author: item.author?.trim()
        ? { "@type": "Person", name: item.author.trim() }
        : undefined,
    }));
  }
  if (site.geo.latitude != null && site.geo.longitude != null) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    };
  }
  if (hours) data.openingHoursSpecification = hours;
  const faq = faqPage();
  const blocks = faq ? [data, faq] : [data];

  return (
    <>
      {blocks.map((block) => (
        <script
          key={String(block["@type"])}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
