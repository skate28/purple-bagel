import type { Metadata } from "next";
import Link from "next/link";

import { PreorderForm } from "@/components/preorder-form";
import { focusRing } from "@/components/styles";
import { TextButton } from "@/components/text-button";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const description = `Request a bulk bagel pickup from ${site.name} at ${site.address.full}.`;

export const metadata: Metadata = {
  title: "Pre-order bulk bagels",
  description,
  alternates: { canonical: "/preorder" },
  openGraph: {
    title: `Pre-order bulk bagels | ${site.name}`,
    description,
    url: "/preorder",
  },
};

export default function PreorderPage() {
  const heading = site.preorder.heading.trim() || "Bulk pre-orders";

  return (
    <main id="content" className="bg-cream">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <Link
          href="/"
          className={cn("text-sm font-semibold text-brand underline-offset-4 hover:underline", focusRing)}
        >
          {site.name}
        </Link>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-tight text-balance md:text-6xl">{heading}</h1>
        {site.preorder.intro.trim() && (
          <p className="mt-4 text-lg leading-relaxed">{site.preorder.intro}</p>
        )}
        <div className="mt-8">
          <TextButton />
        </div>
        <div className="mt-8 rounded-[2rem] border border-ink/10 bg-paper p-5 sm:p-8">
          <PreorderForm />
        </div>
      </div>
    </main>
  );
}
