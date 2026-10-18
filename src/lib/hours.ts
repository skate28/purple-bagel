import { callTarget, site } from "@/content/site";
import type { DayHours, Hours, PhoneNumber, SiteContent, Weekday } from "@/content/types";

const WEEKDAYS: Record<string, Weekday> = {
  Sun: "sun",
  Mon: "mon",
  Tue: "tue",
  Wed: "wed",
  Thu: "thu",
  Fri: "fri",
  Sat: "sat",
};

const DAY_ORDER: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const DAY_LABEL: Record<Weekday, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

export type ShopStatus = {
  /** Null when that day's hours are too incomplete to decide. */
  isOpen: boolean | null;
  summary: string;
  closedNotice: string;
  call: PhoneNumber;
  /** Today's window from the schedule, e.g. "7 AM–1 PM". */
  todayWindow: string | null;
};

export type ScheduleRow = {
  label: string;
  value: string;
};

function parseMinutes(value: string | null | undefined): number | null {
  if (!value) return null;
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;
  return hour * 60 + minute;
}

export function formatClock(value: string): string {
  const minutes = parseMinutes(value);
  if (minutes == null) return value;
  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour = hour24 % 12 || 12;
  if (minute === 0) return `${hour} ${suffix}`;
  return `${hour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function formatWindow(openTime: string, closeTime: string): string {
  return `${formatClock(openTime)}–${formatClock(closeTime)}`;
}

/** Hours for one weekday. A listed day does not inherit the default close. */
export function dayHours(hours: Hours, weekday: Weekday | null): DayHours | null {
  if (!weekday) return null;
  const listed = hours.byDay?.[weekday];
  if (listed) return listed;
  if (hours.openTime && hours.closeTime) {
    return { openTime: hours.openTime, closeTime: hours.closeTime };
  }
  return null;
}

function windowLabel(day: DayHours | null): string | null {
  if (!day || day.closed || !day.openTime || !day.closeTime) return null;
  return formatWindow(day.openTime, day.closeTime);
}

function zonedParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value;

  let hour = Number(read("hour"));
  const minute = Number(read("minute"));
  if (hour === 24) hour = 0;

  return {
    minutes: hour * 60 + minute,
    weekday: WEEKDAYS[read("weekday") ?? ""] ?? null,
  };
}

/**
 * Open/closed in the shop timezone, using that day's open and close from
 * `site.hours`. There is no fixed close hour in this function.
 */
export function getShopStatus(now = new Date(), content: SiteContent = site): ShopStatus {
  const hours = content.hours;
  const summary = hours.summary.trim() || "Hours coming soon";
  const timeZone = hours.timezone.trim() || "America/New_York";
  let isOpen: boolean | null = null;
  let todayWindow: string | null = null;

  try {
    const zoned = zonedParts(now, timeZone);
    const day = dayHours(hours, zoned.weekday);
    todayWindow = windowLabel(day);

    if (day?.closed) {
      isOpen = false;
    } else {
      const openMinutes = parseMinutes(day?.openTime);
      const closeMinutes = parseMinutes(day?.closeTime);
      if (openMinutes == null || closeMinutes == null) {
        isOpen = null;
      } else if (closeMinutes > openMinutes) {
        isOpen = zoned.minutes >= openMinutes && zoned.minutes < closeMinutes;
      } else {
        isOpen = zoned.minutes >= openMinutes || zoned.minutes < closeMinutes;
      }
    }
  } catch {
    isOpen = null;
  }

  return {
    isOpen,
    summary,
    closedNotice: content.closedNotice.trim(),
    call: callTarget(content, isOpen === false),
    todayWindow,
  };
}

/** Group consecutive days that share a window. Reads only `hours`. */
export function scheduleRows(hours: Hours): ScheduleRow[] {
  const groups: { days: Weekday[]; signature: string }[] = [];

  for (const weekday of DAY_ORDER) {
    const day = dayHours(hours, weekday);
    const signature = day?.closed
      ? "closed"
      : day?.openTime && day.closeTime
        ? `${day.openTime}|${day.closeTime}`
        : "unknown";
    const previous = groups[groups.length - 1];
    if (previous && previous.signature === signature) previous.days.push(weekday);
    else groups.push({ days: [weekday], signature });
  }

  return groups
    .filter((group) => group.signature !== "unknown")
    .map((group) => {
      const first = DAY_LABEL[group.days[0]];
      const last = DAY_LABEL[group.days[group.days.length - 1]];
      const label = group.days.length === 1 ? first : `${first}–${last}`;
      const value =
        group.signature === "closed"
          ? "Closed"
          : formatWindow(...(group.signature.split("|") as [string, string]));
      return { label, value };
    });
}

export function todayInTimeZone(timeZone: string, now = new Date()): string {
  const zone = timeZone.trim() || "America/New_York";
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);
  } catch {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);
  }
}

export function addIsoDays(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
