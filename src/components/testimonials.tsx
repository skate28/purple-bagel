import { site } from "@/content/site";
import { focusRing } from "@/components/styles";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const items = site.testimonials.filter(
    (item) => item.quote.trim() && item.sourceLabel.trim() && item.sourceUrl.trim(),
  );
  if (items.length === 0) return null;

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="bg-lilac">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <h2 id="testimonials-heading" className="font-heading text-4xl tracking-tight md:text-5xl">
          What people say
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <li key={`${item.sourceUrl}-${item.quote}`} className="rounded-3xl border border-ink/10 bg-paper p-6">
              <blockquote>
                <p className="text-lg leading-relaxed">{item.quote}</p>
              </blockquote>
              <p className="mt-4 text-sm font-semibold">
                {item.author?.trim() && <span>{item.author.trim()} · </span>}
                <a
                  href={item.sourceUrl}
                  className={cn("text-brand underline decoration-brand/40 underline-offset-4", focusRing)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.sourceLabel}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
