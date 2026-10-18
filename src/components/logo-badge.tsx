import Image from "next/image";

import type { Photo } from "@/content/types";
import { photoDimensions } from "@/lib/photos";
import { cn } from "@/lib/cn";

type LogoBadgeProps = {
  photo: Photo;
  /** Hide from assistive tech when the shop name is already next to the badge. */
  decorative?: boolean;
  className?: string;
};

/** The logo file is a small JPG on white. Keep it badge-sized. */
export function LogoBadge({ photo, decorative = false, className }: LogoBadgeProps) {
  const { width, height } = photoDimensions(photo);

  return (
    <span
      aria-hidden={decorative ? true : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden bg-white shadow-[inset_0_0_0_1px_rgba(45,22,82,0.12)]",
        className ?? "size-16 rounded-2xl p-1.5",
      )}
    >
      <Image
        src={photo.src}
        alt={decorative ? "" : photo.alt}
        width={width}
        height={height}
        sizes="96px"
        className="max-h-full max-w-full object-contain"
      />
    </span>
  );
}
