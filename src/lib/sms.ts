import { textTarget } from "@/content/site";
import { phoneLabel } from "@/lib/contact";
import { formatPreorderMessage, type PreorderInput } from "@/lib/preorder";

export type PreorderNotice = {
  ok: boolean;
  mode: "sent" | "logged" | "error";
  message: string;
};

/**
 * Sends a shop alert for a bulk pre-order.
 *
 * SMS_PROVIDER:
 * - unset, or missing credentials: log the request and tell the customer
 *   to also text the shop line (the form still succeeds)
 * - "log": same logged success, even when other vars are present
 * - "bland": POST https://api.bland.ai/v1/sms/send
 */
export async function notifyPreorder(input: PreorderInput): Promise<PreorderNotice> {
  const body = formatPreorderMessage(input);
  const provider = process.env.SMS_PROVIDER?.trim().toLowerCase() ?? "";

  if (!provider || provider === "log") {
    return loggedNotice(body, provider || "unset");
  }

  if (provider === "bland") {
    return sendViaBland(body);
  }

  console.error("[preorder] Unknown SMS_PROVIDER. Logging instead of sending.", {
    provider,
  });
  return loggedNotice(body, provider);
}

function customerTextLine(): string {
  return phoneLabel(textTarget()) || "the shop line";
}

function loggedNotice(body: string, provider: string): PreorderNotice {
  const line = customerTextLine();
  console.info("[preorder] SMS was not sent. Logged pre-order instead.", {
    provider,
    hasNotifyTo: Boolean(process.env.PREORDER_NOTIFY_TO),
    hasFrom: Boolean(process.env.PREORDER_SMS_FROM),
    hasBlandKey: Boolean(process.env.BLAND_API_KEY),
    preorder: body,
  });

  return {
    ok: true,
    mode: "logged",
    message: `We got your pre-order. Please also text the shop at ${line} so it reaches the counter.`,
  };
}

async function sendViaBland(body: string): Promise<PreorderNotice> {
  const apiKey = process.env.BLAND_API_KEY?.trim();
  const to = process.env.PREORDER_NOTIFY_TO?.trim();
  const from = process.env.PREORDER_SMS_FROM?.trim();

  if (!apiKey || !to || !from) {
    return loggedNotice(body, "bland");
  }

  try {
    const response = await fetch("https://api.bland.ai/v1/sms/send", {
      method: "POST",
      headers: {
        authorization: apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user_number: to,
        agent_number: from,
        agent_message: body,
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[preorder] Bland SMS failed.", response.status, detail.slice(0, 500));
      return {
        ok: false,
        mode: "error",
        message: `We couldn't text the shop automatically. Please text ${customerTextLine()} to pre-order.`,
      };
    }

    return {
      ok: true,
      mode: "sent",
      message: "Your pre-order was sent to the shop.",
    };
  } catch (error) {
    console.error("[preorder] Bland SMS request failed.", error);
    return {
      ok: false,
      mode: "error",
      message: `We couldn't text the shop automatically. Please text ${customerTextLine()} to pre-order.`,
    };
  }
}
