import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export function About() {
  const paragraphs = site.about.paragraphs.map((paragraph) => paragraph.trim()).filter(Boolean);
  const facts = [
    site.opened.trim() ? ["Opened", site.opened.trim()] : null,
    site.address.full.trim() ? ["Address", site.address.full.trim()] : null,
    site.hours.summary.trim() ? ["Hours", site.hours.summary.trim()] : null,
    site.phone.display.trim() ? ["Phone", site.phone.display.trim()] : null,
  ].filter((fact): fact is [string, string] => fact !== null);

  if (!site.about.heading.trim() && paragraphs.length === 0 && facts.length === 0) {
    return null;
  }

  return (
    <section id="about" aria-labelledby="about-heading" className="bg-brand text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1.3fr_0.7fr] md:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sesame">The shop</p>
          <h2 id="about-heading" className="mt-3 font-heading text-4xl tracking-tight text-balance md:text-5xl">
            {site.about.heading.trim() || site.name}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-paper/90">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        {facts.length > 0 && (
          <Reveal delay={0.08}>
            <dl className="grid gap-5 rounded-3xl bg-paper/10 p-6">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-sesame">{label}</dt>
                  <dd className="mt-1 text-lg">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </section>
  );
}
