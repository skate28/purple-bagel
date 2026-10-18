import { site } from "@/content/site";

export function Faq() {
  const items = site.faq.filter((item) => item.question.trim() && item.answer.trim());
  if (items.length === 0) return null;

  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-cream">
      <div className="mx-auto max-w-3xl px-5 py-20">
        <h2 id="faq-heading" className="font-heading text-4xl tracking-tight md:text-5xl">
          Questions
        </h2>
        <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {items.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="cursor-pointer list-none font-heading text-lg outline-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.question}
                  <span aria-hidden className="text-brand-bright group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
