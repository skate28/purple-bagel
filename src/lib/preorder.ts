import { z } from "zod";

import { site } from "@/content/site";
import { addIsoDays, todayInTimeZone } from "@/lib/hours";
import { formatUsd } from "@/lib/money";

const phonePattern = /^(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

function isRealIsoDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

const lineSchema = z.object({
  id: z.string().trim().min(1),
  quantity: z.coerce
    .number()
    .int("Use a whole number.")
    .min(0, "Quantity can't be negative.")
    .max(200, "For a very large order, call the shop."),
});

export const preorderSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80, "Use a shorter name."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone number.")
    .max(30, "That phone number is too long.")
    .refine((value) => phonePattern.test(value), "Enter a phone number we can call or text."),
  pickupDate: z.string().trim(),
  lines: z.array(lineSchema).default([]),
  notes: z
    .string()
    .trim()
    .max(1000, "Keep notes under 1000 characters.")
    .optional()
    .default(""),
});

export type PreorderLine = {
  id: string;
  label: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type PreorderInput = {
  name: string;
  phone: string;
  pickupDate: string;
  notes: string;
  lines: PreorderLine[];
  total: number;
};

export type ParsedPreorder =
  | { ok: true; data: PreorderInput }
  | { ok: false; message: string; fieldErrors: Record<string, string> };

function roundMoney(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/** Validates against today's date and prices the lines from `site.bulkSpecials`. */
export function parsePreorder(input: unknown): ParsedPreorder {
  const parsed = preorderSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Check the form and try again.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  const timeZone = site.hours.timezone || "America/New_York";
  const today = todayInTimeZone(timeZone);
  const fieldErrors: Record<string, string> = {};

  if (!isRealIsoDate(parsed.data.pickupDate)) {
    fieldErrors.pickupDate = "Choose a pickup date.";
  } else if (parsed.data.pickupDate < today) {
    fieldErrors.pickupDate = "Pickup date must be today or later.";
  } else {
    const maxDays = site.preorder.maxDaysAhead > 0 ? site.preorder.maxDaysAhead : 120;
    const latest = addIsoDays(today, maxDays);
    if (parsed.data.pickupDate > latest) {
      fieldErrors.pickupDate = `Choose a pickup date within ${maxDays} days.`;
    }
  }

  const lines: PreorderLine[] = [];
  if (site.bulkSpecials.length === 0) {
    fieldErrors.lines = "Bulk specials are not listed yet. Text the shop to pre-order.";
  } else {
    for (const line of parsed.data.lines) {
      if (line.quantity === 0) continue;
      const special = site.bulkSpecials.find((item) => item.id === line.id);
      if (!special || !Number.isFinite(special.price)) {
        fieldErrors.lines = "Choose a listed half dozen or dozen.";
        break;
      }
      lines.push({
        id: special.id,
        label: special.label,
        quantity: line.quantity,
        unitPrice: special.price,
        lineTotal: roundMoney(special.price * line.quantity),
      });
    }
    if (!fieldErrors.lines && lines.length === 0) {
      fieldErrors.lines = "Add at least a half dozen or a dozen.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Check the form and try again.",
      fieldErrors,
    };
  }

  return {
    ok: true,
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      pickupDate: parsed.data.pickupDate,
      notes: parsed.data.notes,
      lines,
      total: roundMoney(lines.reduce((sum, line) => sum + line.lineTotal, 0)),
    },
  };
}

export function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

export function formatPreorderMessage(input: PreorderInput): string {
  const notes = input.notes.trim();
  const lines = input.lines.map(
    (line) =>
      `${line.label} × ${line.quantity} @ ${formatUsd(line.unitPrice)} = ${formatUsd(line.lineTotal)}`,
  );
  return [
    "Purple Bagel bulk pre-order",
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Pickup: ${input.pickupDate}`,
    ...lines,
    `Estimated total: ${formatUsd(input.total)}`,
    `Notes: ${notes || "(none)"}`,
  ].join("\n");
}
