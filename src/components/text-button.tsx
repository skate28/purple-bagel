import { MessageSquare } from "lucide-react";

import { site, textTarget } from "@/content/site";
import { smsHref } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { buttonOnDark, buttonPrimary, buttonSecondary } from "@/components/styles";

type TextButtonProps = {
  variant?: "primary" | "secondary" | "onDark";
  className?: string;
};

export function TextButton({ variant = "primary", className }: TextButtonProps) {
  const href = smsHref(textTarget(), site.preorder.textMessage);
  if (!href) return null;

  const styles =
    variant === "onDark" ? buttonOnDark : variant === "secondary" ? buttonSecondary : buttonPrimary;
  const label = site.preorder.textButtonLabel.trim() || "Text us to pre-order";

  return (
    <a href={href} className={cn(styles, className)}>
      <MessageSquare aria-hidden className="size-4 shrink-0" />
      <span>{label}</span>
    </a>
  );
}
