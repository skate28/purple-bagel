"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { TextButton } from "@/components/text-button";
import { fieldClass, focusRing } from "@/components/styles";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { todayInTimeZone } from "@/lib/hours";
import { formatUsd } from "@/lib/money";
import { parsePreorder, type PreorderInput } from "@/lib/preorder";

type FormState = {
  name: string;
  phone: string;
  pickupDate: string;
  notes: string;
};

const EMPTY: FormState = {
  name: "",
  phone: "",
  pickupDate: "",
  notes: "",
};

type SubmitResult = {
  ok: boolean;
  mode?: "sent" | "logged" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
};

export function PreorderForm() {
  const formId = useId();
  const specials = site.bulkSpecials.filter(
    (special) => special.id.trim() && special.label.trim() && Number.isFinite(special.price),
  );
  const [values, setValues] = useState<FormState>(EMPTY);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [pending, setPending] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = dateRef.current;
    if (!input) return;
    input.min = todayInTimeZone(site.hours.timezone || "America/New_York");
  }, []);

  function update(field: keyof FormState, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function quantityFor(id: string) {
    return quantities[id] ?? 0;
  }

  function setQuantity(id: string, next: number) {
    const quantity = Math.max(0, Math.min(200, next));
    setQuantities((current) => ({ ...current, [id]: quantity }));
  }

  const total = specials.reduce(
    (sum, special) => sum + quantityFor(special.id) * special.price,
    0,
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    const payload = {
      name: values.name,
      phone: values.phone,
      pickupDate: values.pickupDate,
      notes: values.notes,
      lines: specials.map((special) => ({
        id: special.id,
        quantity: quantityFor(special.id),
      })),
    };
    const parsed = parsePreorder(payload);
    if (!parsed.ok) {
      setFieldErrors(parsed.fieldErrors);
      setResult({ ok: false, mode: "error", message: parsed.message, fieldErrors: parsed.fieldErrors });
      return;
    }

    setFieldErrors({});
    setPending(true);
    try {
      const response = await fetch("/api/preorder", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data satisfies PreorderInput),
      });
      const body = (await response.json()) as SubmitResult;
      setResult(body);
      if (body.fieldErrors) setFieldErrors(body.fieldErrors);
      if (body.ok) {
        setValues(EMPTY);
        setQuantities({});
      }
    } catch {
      setResult({
        ok: false,
        mode: "error",
        message: "The form could not be sent. Please text the shop to pre-order.",
      });
    } finally {
      setPending(false);
    }
  }

  function errorId(field: string) {
    return fieldErrors[field] ? `${formId}-${field}-error` : undefined;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      {specials.length === 0 ? (
        <p>Bulk specials are coming soon. Text the shop and we can still take the order.</p>
      ) : (
        <fieldset className="grid gap-3">
          <legend className="text-sm font-semibold">How many</legend>
          <ul className="grid gap-3">
            {specials.map((special) => {
              const quantity = quantityFor(special.id);
              return (
                <li
                  key={special.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-paper px-4 py-3"
                >
                  <div>
                    <p className="font-heading text-lg">{special.label}</p>
                    <p className="text-sm">{formatUsd(special.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className={cn(
                        "inline-flex size-11 items-center justify-center rounded-full border border-ink/15 bg-cream disabled:opacity-40",
                        focusRing,
                      )}
                      aria-label={`Remove one ${special.label}`}
                      disabled={quantity === 0}
                      onClick={() => setQuantity(special.id, quantity - 1)}
                    >
                      <Minus aria-hidden className="size-4" />
                    </button>
                    <span className="min-w-8 text-center font-heading text-2xl tabular-nums" aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      className={cn(
                        "inline-flex size-11 items-center justify-center rounded-full border border-ink/15 bg-cream",
                        focusRing,
                      )}
                      aria-label={`Add one ${special.label}`}
                      onClick={() => setQuantity(special.id, quantity + 1)}
                    >
                      <Plus aria-hidden className="size-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="flex items-baseline justify-between gap-4 text-sm" aria-live="polite">
            <span className="font-semibold">Estimated total</span>
            <span className="font-heading text-3xl tabular-nums">{formatUsd(total)}</span>
          </p>
          {fieldErrors.lines && (
            <p id={`${formId}-lines-error`} className="text-sm font-medium text-brand-deep">
              {fieldErrors.lines}
            </p>
          )}
        </fieldset>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold" htmlFor={`${formId}-name`}>
          Name
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={errorId("name")}
            className={fieldClass}
          />
          {fieldErrors.name && (
            <span id={`${formId}-name-error`} className="font-medium text-brand-deep">
              {fieldErrors.name}
            </span>
          )}
        </label>
        <label className="grid gap-2 text-sm font-semibold" htmlFor={`${formId}-phone`}>
          Phone
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={errorId("phone")}
            className={fieldClass}
          />
          {fieldErrors.phone && (
            <span id={`${formId}-phone-error`} className="font-medium text-brand-deep">
              {fieldErrors.phone}
            </span>
          )}
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold" htmlFor={`${formId}-date`}>
        Pickup date
        <input
          id={`${formId}-date`}
          ref={dateRef}
          name="pickupDate"
          type="date"
          required
          value={values.pickupDate}
          onChange={(event) => update("pickupDate", event.target.value)}
          aria-invalid={Boolean(fieldErrors.pickupDate)}
          aria-describedby={errorId("pickupDate")}
          className={fieldClass}
        />
        {fieldErrors.pickupDate && (
          <span id={`${formId}-date-error`} className="font-medium text-brand-deep">
            {fieldErrors.pickupDate}
          </span>
        )}
      </label>
      <label className="grid gap-2 text-sm font-semibold" htmlFor={`${formId}-notes`}>
        Flavors and notes
        <textarea
          id={`${formId}-notes`}
          name="notes"
          rows={4}
          maxLength={1000}
          value={values.notes}
          onChange={(event) => update("notes", event.target.value)}
          aria-invalid={Boolean(fieldErrors.notes)}
          aria-describedby={errorId("notes") ?? `${formId}-notes-hint`}
          placeholder="Flavors, dietary notes, or pickup details"
          className={cn(fieldClass, "min-h-28 py-3")}
        />
        <span id={`${formId}-notes-hint`} className="font-normal text-ink/80">
          Optional. Tell us what you want in the order.
        </span>
        {fieldErrors.notes && (
          <span id={`${formId}-notes-error`} className="font-medium text-brand-deep">
            {fieldErrors.notes}
          </span>
        )}
      </label>

      <button
        type="submit"
        disabled={pending || specials.length === 0}
        className={cn(
          "inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-70",
          focusRing,
        )}
      >
        {pending ? "Sending…" : "Send pre-order"}
      </button>

      <noscript>
        <p className="text-sm">
          This form needs JavaScript. Use the text button and the shop will get your pre-order directly.
        </p>
      </noscript>

      {result && (
        <div
          role={result.ok ? "status" : "alert"}
          className={cn(
            "rounded-2xl p-4 text-sm leading-relaxed",
            result.ok ? "bg-lilac text-ink" : "bg-cream-deep text-ink",
          )}
        >
          <p>{result.message}</p>
          {result.mode !== "sent" && (
            <div className="mt-3">
              <TextButton />
            </div>
          )}
        </div>
      )}
    </form>
  );
}
