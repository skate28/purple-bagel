import Link from "next/link";

import { site, textTarget } from "@/content/site";
import { smsHref, telHref } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { focusRing } from "@/components/styles";

export function Footer() {
  const phoneHref = telHref(site.phone);
  const textHref = smsHref(textTarget(), site.preorder.textMessage);
  const socials = site.socials.filter((social) => social.href.trim() && social.label.trim());

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-4xl uppercase tracking-wide">{site.name}</p>
          {site.address.full.trim() && <p className="mt-3 text-paper/85">{site.address.full}</p>}
          {phoneHref && site.phone.display.trim() && (
            <a href={phoneHref} className={cn("mt-3 inline-block underline underline-offset-4", focusRing)}>
              {site.phone.display}
            </a>
          )}
        </div>
        <nav aria-label="Footer" className="grid content-start gap-2 text-sm font-semibold">
          <Link href="/#menu" className={cn("w-fit rounded-full", focusRing)}>
            Menu
          </Link>
          <Link href="/#visit" className={cn("w-fit rounded-full", focusRing)}>
            Visit
          </Link>
          <Link href="/preorder" className={cn("w-fit rounded-full", focusRing)}>
            Pre-order
          </Link>
          {textHref && (
            <a href={textHref} className={cn("w-fit rounded-full", focusRing)}>
              {site.preorder.textButtonLabel.trim() || "Text us to pre-order"}
            </a>
          )}
        </nav>
        <div className="grid content-start gap-3 text-sm">
          {site.hours.summary.trim() && <p>{site.hours.summary}</p>}
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              className={cn("w-fit underline underline-offset-4", focusRing)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-paper/15 px-5 py-6 pb-36 md:pb-6">
        <p className="text-center text-sm">
          <a
            href="https://nicklopacki.com"
            className={cn("underline underline-offset-4", focusRing)}
          >
            Built by nicklopacki.com
          </a>
        </p>
      </div>
    </footer>
  );
}
