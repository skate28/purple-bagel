import Link from "next/link";

import { buttonPrimary } from "@/components/styles";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <main id="content" className="bg-cream">
      <div className="mx-auto max-w-xl px-5 py-24">
        <h1 className="font-heading text-5xl tracking-tight">That page is not on the board.</h1>
        <p className="mt-4 text-lg">The link may be old. The menu, hours, and pre-order form are on the home page.</p>
        <Link href="/" className={`${buttonPrimary} mt-8`}>
          Back to {site.name}
        </Link>
      </div>
    </main>
  );
}
