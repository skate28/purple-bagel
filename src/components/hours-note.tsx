"use client";

import { site } from "@/content/site";
import { useShopStatus } from "@/components/shop-status";

export function HoursNote({
  className,
  showSummary = true,
}: {
  className?: string;
  showSummary?: boolean;
}) {
  const status = useShopStatus();
  const summary = site.hours.summary.trim();

  let line = showSummary ? summary || "Hours coming soon" : "";
  if (status?.isOpen === true) {
    line = status.todayWindow ? `Open now · Today ${status.todayWindow}` : "Open now";
  } else if (status?.isOpen === false && status.closedNotice) {
    line = status.closedNotice;
  } else if (status?.isOpen === null) {
    line = summary || "Hours coming soon";
  }

  if (!line) return null;
  return <p className={className}>{line}</p>;
}
