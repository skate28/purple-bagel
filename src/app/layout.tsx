import type { Metadata, Viewport } from "next";
import { DM_Sans, Montserrat, Oswald, Pacifico } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { MobileBar } from "@/components/mobile-bar";
import { focusRing } from "@/components/styles";
import { site } from "@/content/site";
import type { Palette } from "@/content/types";
import { cn } from "@/lib/cn";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const heading = Montserrat({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-montserrat",
  display: "swap",
});

const script = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

function paletteStyle(palette: Palette): CSSProperties {
  return {
    "--pb-ink": palette.ink,
    "--pb-brand": palette.brand,
    "--pb-brand-deep": palette.brandDeep,
    "--pb-brand-bright": palette.brandBright,
    "--pb-lilac": palette.lilac,
    "--pb-cream": palette.cream,
    "--pb-cream-deep": palette.creamDeep,
    "--pb-sesame": palette.sesame,
    "--pb-paper": palette.paper,
    "--pb-salt": palette.salt,
    "--pb-accent": palette.accent,
  } as CSSProperties;
}

const title = `${site.name} | Springfield, Jacksonville`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: site.palette.brandDeep,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(display.variable, heading.variable, script.variable, sans.variable, "h-full")}
      style={paletteStyle(site.palette)}
    >
      <body className="min-h-full bg-cream font-sans text-ink antialiased">
        <a
          href="#content"
          className={cn(
            "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-3",
            focusRing,
          )}
        >
          Skip to content
        </a>
        <div aria-hidden className="flex h-1.5 bg-brand">
          <div className="h-full w-1/3 bg-sesame" />
          <div className="h-full w-6 bg-accent" />
        </div>
        <Header />
        {children}
        <MobileBar />
        <Footer />
        <JsonLd />
      </body>
    </html>
  );
}
