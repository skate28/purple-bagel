import { site } from "@/content/site";
import type { SiteContent } from "@/content/types";

export function mapQuery(content: SiteContent = site): string | null {
  if (content.geo.latitude != null && content.geo.longitude != null) {
    return `${content.geo.latitude},${content.geo.longitude}`;
  }
  const full = content.address.full.trim();
  return full || null;
}

export function directionsHref(content: SiteContent = site): string | null {
  const query = mapQuery(content);
  if (!query) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapEmbedSrc(content: SiteContent = site): string | null {
  const query = mapQuery(content);
  if (!query) return null;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
}
