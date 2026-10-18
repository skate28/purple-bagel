"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { BagelMark } from "@/components/bagel-mark";
import { CallButton } from "@/components/call-button";
import { HoursNote } from "@/components/hours-note";
import { TrustBadge } from "@/components/trust-badge";
import { buttonSecondary } from "@/components/styles";
import { site } from "@/content/site";
import type { Photo } from "@/content/types";
import { cn } from "@/lib/cn";
import { directionsHref } from "@/lib/maps";
import { heroPhoto, photoDimensions } from "@/lib/photos";

export function Hero() {
  const shouldReduce = useReducedMotion();
  const directions = directionsHref();
  const hero = heroPhoto();
  const name = site.name.trim() || "Bagel shop";
  const place = [site.address.neighborhood, site.address.city].filter((part) => part.trim());
  if (site.opened.trim()) place.push(`Opened ${site.opened.trim()}`);

  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-8 size-[22rem] rounded-full bg-brand/15 md:size-[36rem]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] md:py-24">
        <div>
          {place.length > 0 && (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              {place.join(" · ")}
            </p>
          )}
          <motion.h1
            className="mt-3 max-w-4xl font-display text-[clamp(4.5rem,13vw,8.75rem)] uppercase leading-[0.82] tracking-tight text-ink"
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduce ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {name}
          </motion.h1>
          {site.tagline.trim() && (
            <p className="mt-5 max-w-xl font-script text-3xl leading-tight text-brand md:text-5xl">
              {site.tagline}
            </p>
          )}
          <div className="mt-6 flex flex-col items-start gap-3">
            <TrustBadge />
            <HoursNote className="text-sm font-medium text-ink" />
          </div>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            <CallButton placement="hero" />
            {directions && (
              <a
                href={directions}
                className={buttonSecondary}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin aria-hidden className="size-4 shrink-0" />
                Directions
              </a>
            )}
          </div>
        </div>
        <motion.div
          className={cn("mx-auto w-full", hero ? "max-w-[16rem] sm:max-w-[20rem] md:max-w-[22rem]" : "max-w-md")}
          initial={shouldReduce ? false : { opacity: 0, scale: 0.96, rotate: hero ? 0 : -8 }}
          animate={{ opacity: 1, scale: 1, rotate: hero ? 0 : -3 }}
          transition={shouldReduce ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero ? (
            <HeroPortrait photo={hero} />
          ) : (
            <BagelMark className="w-full drop-shadow-[0_18px_0_var(--pb-brand-deep)]" />
          )}
        </motion.div>
      </div>
    </section>
  );
}

function HeroPortrait({ photo }: { photo: Photo }) {
  const { width, height } = photoDimensions(photo);

  return (
    <div className="overflow-hidden rounded-[2rem] bg-paper shadow-[0_18px_0_var(--pb-brand-deep)]">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={width}
        height={height}
        priority
        sizes="(min-width: 768px) 22rem, 20rem"
        className="aspect-[3/4] h-auto w-full object-cover"
      />
    </div>
  );
}
