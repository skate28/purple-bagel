import type { PhoneNumber } from "@/content/types";

export function telHref(number: PhoneNumber): string | null {
  if (number.tel.trim()) return number.tel.trim();
  if (number.e164.trim()) return `tel:${number.e164.trim()}`;
  return null;
}

export function smsHref(number: PhoneNumber, body: string): string | null {
  const raw = (number.e164 || number.tel.replace(/^tel:/i, "")).trim();
  if (!raw) return null;
  const normalized = raw.replace(/^sms:/i, "");
  const message = body.trim();
  return message
    ? `sms:${normalized}?body=${encodeURIComponent(message)}`
    : `sms:${normalized}`;
}

export function phoneLabel(number: PhoneNumber): string {
  return number.display.trim() || number.e164.trim() || number.tel.trim();
}
