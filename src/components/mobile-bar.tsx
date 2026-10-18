"use client";

import { CallButton } from "@/components/call-button";
import { TextButton } from "@/components/text-button";
import { useShopStatus } from "@/components/shop-status";

export function MobileBar() {
  const status = useShopStatus();
  const closed = status?.isOpen === false && Boolean(status.closedNotice);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 backdrop-blur md:hidden">
      {closed && (
        <p className="px-4 pt-3 text-center text-xs font-medium leading-snug text-ink">
          {status?.closedNotice}
        </p>
      )}
      <div className="grid grid-cols-2 gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <CallButton placement="bar" />
        <TextButton className="w-full px-3" />
      </div>
    </div>
  );
}
