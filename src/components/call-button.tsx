"use client";

import { Phone } from "lucide-react";

import { site } from "@/content/site";
import { useShopStatus } from "@/components/shop-status";
import { phoneLabel, telHref } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { buttonPrimary } from "@/components/styles";

type CallButtonProps = {
  placement?: "header" | "hero" | "bar";
  className?: string;
};

export function CallButton({ placement = "hero", className }: CallButtonProps) {
  const status = useShopStatus();
  const closed = status?.isOpen === false;
  const call = status?.call ?? site.phone;
  const href = telHref(call);
  if (!href) return null;

  const number = phoneLabel(call);
  const openLabel = number ? `Call ${number}` : "Call the shop";
  const label = closed && status?.closedNotice ? status.closedNotice : openLabel;

  return (
    <a
      href={href}
      className={cn(
        buttonPrimary,
        placement === "bar" && "w-full",
        closed && "max-w-xl text-left",
        className,
      )}
    >
      <Phone aria-hidden className="size-4 shrink-0" />
      <span>{label}</span>
    </a>
  );
}
