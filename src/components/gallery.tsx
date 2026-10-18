import Image from "next/image";

import { LogoBadge } from "@/components/logo-badge";
import type { Photo, PhotoCategory } from "@/content/types";
import { logoPhotos, photoDimensions, usablePhotos } from "@/lib/photos";

const CATEGORY_ORDER: PhotoCategory[] = ["storefront", "interior", "menu-board", "drinks"];

const CATEGORY_LABEL: Record<PhotoCategory, string> = {
  storefront: "Storefront",
  interior: "Interior",
  "menu-board": "Menu board",
  logo: "Logo",
  drinks: "Drinks",
};

/** Fixed card widths. Storefront files are ~600px, so they stay small. */
function cardClass(photo: Photo): string {
  const { width, height } = photoDimensions(photo);
  if (photo.category === "storefront") return "w-40 sm:w-56";
  if (height > width) return "w-36 sm:w-48";
  return "w-44 sm:w-60";
}

function cardSizes(photo: Photo): string {
  if (photo.category === "storefront") return "224px";
  const { width, height } = photoDimensions(photo);
  if (height > width) return "192px";
  return "240px";
}

export function Gallery() {
  const photos = usablePhotos();
  const logos = logoPhotos();
  const frames = photos.filter((photo) => photo.category !== "logo");
  if (frames.length === 0 && logos.length === 0) return null;

  const groups = new Map<PhotoCategory, Photo[]>();
  for (const photo of frames) {
    const current = groups.get(photo.category) ?? [];
    current.push(photo);
    groups.set(photo.category, current);
  }

  const categories = [
    ...CATEGORY_ORDER.filter((category) => groups.has(category)),
    ...[...groups.keys()].filter(
      (category) => category !== "logo" && !CATEGORY_ORDER.includes(category),
    ),
  ];

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="bg-lilac">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <h2 id="gallery-heading" className="font-heading text-4xl tracking-tight md:text-5xl">
          The shop
        </h2>
        {logos.length > 0 && (
          <div className="mt-8">
            <h3 className="font-heading text-2xl">{CATEGORY_LABEL.logo}</h3>
            <ul className="mt-4 flex flex-wrap gap-4">
              {logos.map((photo, index) => (
                <li key={`${photo.src}-${index}`}>
                  <LogoBadge photo={photo} />
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-10 grid gap-12">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="font-heading text-2xl">{CATEGORY_LABEL[category] ?? category}</h3>
              <ul className="mt-4 flex flex-wrap gap-4">
                {(groups.get(category) ?? []).map((photo, index) => {
                  const { width, height } = photoDimensions(photo);
                  return (
                    <li
                      key={`${photo.src}-${index}`}
                      className={`overflow-hidden rounded-3xl bg-paper ${cardClass(photo)}`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={width}
                        height={height}
                        sizes={cardSizes(photo)}
                        className="h-auto w-full"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
