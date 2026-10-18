import { site } from "@/content/site";
import type { Photo } from "@/content/types";

const PORTRAIT = { width: 750, height: 1000 };

/** Photos with a path and alt text. Incomplete entries stay hidden. */
export function usablePhotos(photos: Photo[] = site.photos): Photo[] {
  return photos.filter((photo) => photo.src.trim() && photo.alt.trim());
}

export function photoDimensions(photo: Pick<Photo, "width" | "height" | "category" | "hero">): {
  width: number;
  height: number;
} {
  if (photo.width && photo.width > 0 && photo.height && photo.height > 0) {
    return { width: photo.width, height: photo.height };
  }
  if (photo.category === "logo") {
    return { width: photo.width && photo.width > 0 ? photo.width : 360, height: 360 };
  }
  if (photo.category === "storefront") {
    return {
      width: photo.width && photo.width > 0 ? photo.width : 600,
      height: photo.height && photo.height > 0 ? photo.height : 400,
    };
  }
  if (photo.hero || photo.category === "interior") return PORTRAIT;
  return {
    width: photo.width && photo.width > 0 ? photo.width : 800,
    height: photo.height && photo.height > 0 ? photo.height : 600,
  };
}

function withHeroSrc(photo: Photo, src: string): Photo {
  const size = photoDimensions({ ...photo, hero: true });
  return { ...photo, src, hero: true, width: size.width, height: size.height };
}

/**
 * Portrait for the homepage side column.
 * `site.heroImage` wins, then the first photo with `hero: true`
 * (using that photo's `heroImage` path when set).
 */
export function heroPhoto(
  photos: Photo[] = site.photos,
  heroImage: string | undefined = site.heroImage,
): Photo | null {
  const explicit = heroImage?.trim();
  if (explicit) {
    const match = photos.find(
      (photo) => photo.src.trim() === explicit || photo.heroImage?.trim() === explicit,
    );
    if (match) return withHeroSrc(match, explicit);
    return {
      src: explicit,
      alt: site.name.trim() || "Shop photo",
      category: "interior",
      width: PORTRAIT.width,
      height: PORTRAIT.height,
      hero: true,
    };
  }

  const flagged = photos.find((photo) => photo.hero && (photo.heroImage?.trim() || photo.src.trim()));
  if (!flagged) return null;
  const src = flagged.heroImage?.trim() || flagged.src.trim();
  const alt = flagged.alt.trim() || site.name.trim() || "Shop photo";
  return withHeroSrc({ ...flagged, alt }, src);
}

export function logoPhotos(photos: Photo[] = site.photos): Photo[] {
  return usablePhotos(photos).filter((photo) => photo.category === "logo");
}
