export const focusRing =
  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand";

export const buttonBase = `inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-semibold leading-snug transition-colors ${focusRing}`;

export const buttonPrimary = `${buttonBase} bg-brand text-paper hover:bg-brand-deep`;

export const buttonSecondary = `${buttonBase} bg-paper text-ink shadow-[inset_0_0_0_1.5px_var(--pb-ink)] hover:bg-ink hover:text-paper`;

export const buttonOnDark = `${buttonBase} bg-paper text-brand-deep hover:bg-sesame hover:text-ink`;

export const fieldClass = `min-h-12 w-full rounded-2xl border border-ink/15 bg-paper px-4 text-base text-ink outline-none ${focusRing}`;
