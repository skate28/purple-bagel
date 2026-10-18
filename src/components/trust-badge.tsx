import { Star } from "lucide-react";

import { site } from "@/content/site";

export function TrustBadge() {
  const rating = site.rating;
  if (!rating || !Number.isFinite(rating.value) || !Number.isFinite(rating.count) || rating.count <= 0) {
    return null;
  }

  const noun = rating.count === 1 ? "review" : "reviews";
  const label = `${rating.value} stars from ${rating.count} ${noun}`;

  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm text-ink">
      <Star aria-hidden className="size-4 fill-accent text-accent" />
      <span>{label}</span>
    </p>
  );
}
