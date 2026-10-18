import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";
import { formatUsd } from "@/lib/money";

export function MenuSection() {
  const categories = site.menu.filter((category) => category.name.trim());
  if (categories.length === 0 && !site.menuNote.trim()) return null;

  return (
    <section id="menu" aria-labelledby="menu-heading" className="bg-lilac">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">The board</p>
          <h2 id="menu-heading" className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">
            Menu
          </h2>
          {site.menuNote.trim() && (
            <p className="mt-4 max-w-2xl text-lg text-ink">{site.menuNote}</p>
          )}
        </Reveal>
        {categories.length > 0 && (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {categories.map((category) => {
              const items = category.items.filter((item) => item.name.trim());
              const realItems = items.filter((item) => !item.placeholder);
              const visibleItems = realItems.length > 0 ? realItems : items;
              const comingSoon = visibleItems.length === 0;
              return (
                <li key={category.id} className="rounded-3xl border border-ink/10 bg-paper p-6">
                  <h3 className="font-heading text-3xl tracking-tight">{category.name}</h3>
                  {comingSoon ? (
                    <p className="mt-4 text-ink">{category.description?.trim() || "Menu coming soon"}</p>
                  ) : (
                    <ul className="mt-4 divide-y divide-ink/10">
                      {visibleItems.map((item) => (
                        <li key={item.id} className="flex items-start justify-between gap-4 py-3">
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            {item.description?.trim() && (
                              <p className="mt-1 text-sm text-ink">{item.description}</p>
                            )}
                          </div>
                          {typeof item.price === "number" && Number.isFinite(item.price) && (
                            <p className="shrink-0 font-semibold tabular-nums">{formatUsd(item.price)}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
