import { HoursNote } from "@/components/hours-note";
import { Reveal } from "@/components/reveal";
import { buttonPrimary } from "@/components/styles";
import { site } from "@/content/site";
import { telHref } from "@/lib/contact";
import { scheduleRows } from "@/lib/hours";
import { directionsHref, mapEmbedSrc } from "@/lib/maps";
import { cn } from "@/lib/cn";

export function Visit() {
  const directions = directionsHref();
  const embed = mapEmbedSrc();
  const phoneHref = telHref(site.phone);
  const address = site.address.full.trim();

  return (
    <section id="visit" aria-labelledby="visit-heading" className="bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Find us</p>
          <h2 id="visit-heading" className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">
            Visit
          </h2>
          <dl className="mt-8 grid gap-5 text-lg">
            {address && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Address</dt>
                <dd className="mt-1">{address}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Hours</dt>
              <dd className="mt-1">
                <HoursNote showSummary={false} />
                {scheduleRows(site.hours).length > 0 ? (
                  <ul className="mt-3 grid gap-1 text-base">
                    {scheduleRows(site.hours).map((row) => (
                      <li key={row.label} className="flex justify-between gap-6">
                        <span className="font-semibold">{row.label}</span>
                        <span>{row.value}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <HoursNote />
                )}
              </dd>
            </div>
            {phoneHref && site.phone.display.trim() && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Phone</dt>
                <dd className="mt-1">
                  <a href={phoneHref} className="underline decoration-brand/40 underline-offset-4">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
            )}
          </dl>
          {directions && (
            <a href={directions} className={cn(buttonPrimary, "mt-8")} target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </a>
          )}
        </Reveal>
        {embed && (
          <Reveal delay={0.08}>
            <iframe
              title={`Map of ${site.name} at ${address || "the shop"}`}
              src={embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full rounded-[2rem] border border-ink/10 bg-paper md:h-[28rem]"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
