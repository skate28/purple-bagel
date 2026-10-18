"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BagelMark } from "@/components/bagel-mark";
import { CallButton } from "@/components/call-button";
import { LogoBadge } from "@/components/logo-badge";
import { site } from "@/content/site";
import { logoPhotos } from "@/lib/photos";
import { cn } from "@/lib/cn";
import { focusRing } from "@/components/styles";

const LINKS = [
  { href: "/#menu", label: "Menu" },
  { href: "/#about", label: "About" },
  { href: "/#visit", label: "Visit" },
  { href: "/preorder", label: "Pre-order" },
];

export function Header() {
  const pathname = usePathname();
  const name = site.name.trim() || "Bagel shop";
  const logo = logoPhotos()[0];

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-3 px-5 py-3">
        <Link
          href="/"
          className={cn("mr-auto inline-flex items-center gap-2 font-heading text-lg tracking-tight", focusRing)}
        >
          <BagelMark className="size-9 shrink-0" />
          <span>{name}</span>
          {logo && <LogoBadge photo={logo} decorative className="size-9 rounded-full p-0.5" />}
        </Link>
        <nav aria-label="Primary" className="order-3 flex w-full gap-4 text-sm font-semibold md:order-none md:w-auto">
          {LINKS.map((link) => {
            const current = link.href === "/preorder" && pathname === "/preorder";
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "rounded-full px-1 py-2 underline-offset-4 hover:underline",
                  current && "underline",
                  focusRing,
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <CallButton placement="header" />
      </div>
    </header>
  );
}
