import { PreorderForm } from "@/components/preorder-form";
import { Reveal } from "@/components/reveal";
import { TextButton } from "@/components/text-button";
import { site } from "@/content/site";

export function PreorderSection() {
  const heading = site.preorder.heading.trim() || "Bulk pre-orders";

  return (
    <section id="preorder" aria-labelledby="preorder-heading" className="bg-brand text-paper">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sesame">For groups</p>
          <h2 id="preorder-heading" className="mt-3 font-heading text-4xl tracking-tight text-balance md:text-5xl">
            {heading}
          </h2>
          {site.preorder.intro.trim() && (
            <p className="mt-5 text-lg leading-relaxed text-paper/90">{site.preorder.intro}</p>
          )}
          <div className="mt-8">
            <TextButton variant="onDark" />
          </div>
        </Reveal>
        <Reveal delay={0.08} className="rounded-[2rem] bg-cream p-5 text-ink sm:p-8">
          <PreorderForm />
        </Reveal>
      </div>
    </section>
  );
}
