"use client";

import { useEffect, useState } from "react";

import { getShopStatus, type ShopStatus } from "@/lib/hours";

/** Status is computed after mount so a static page does not freeze the clock. */
export function useShopStatus(): ShopStatus | null {
  const [status, setStatus] = useState<ShopStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getShopStatus(new Date()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return status;
}
