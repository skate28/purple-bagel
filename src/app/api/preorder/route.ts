import { NextResponse } from "next/server";

import { parsePreorder } from "@/lib/preorder";
import { notifyPreorder } from "@/lib/sms";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, mode: "error", message: "Send the pre-order as JSON." },
      { status: 400 },
    );
  }

  const parsed = parsePreorder(payload);
  if (!parsed.ok) {
    return NextResponse.json(
      {
        ok: false,
        mode: "error",
        message: parsed.message,
        fieldErrors: parsed.fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const notice = await notifyPreorder(parsed.data);
    return NextResponse.json(notice, { status: notice.ok ? 200 : 502 });
  } catch (error) {
    console.error("[preorder] Unexpected failure.", error);
    return NextResponse.json(
      {
        ok: false,
        mode: "error",
        message: "Something went wrong. Please text the shop to pre-order.",
      },
      { status: 500 },
    );
  }
}
