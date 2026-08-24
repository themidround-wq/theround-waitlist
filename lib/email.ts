import { Resend } from "resend";

import {
  WAITLIST_SUCCESS_SUBJECT,
  waitlistSuccessHtml,
  waitlistSuccessText,
} from "@/emails/waitlist-success";

let client: Resend | null = null;

function getResendClient() {
  if (!client) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error("Missing RESEND_API_KEY environment variable.");
    }

    client = new Resend(apiKey);
  }

  return client;
}

type SendWaitlistEmailArgs = {
  to: string;
  /** Waitlist row id, used as the idempotency key so a retry cannot double-send. */
  waitlistId: number;
  ticketNumber: number;
};

/**
 * Sends the waitlist confirmation. Never throws: signup already succeeded by
 * the time this runs, so a mail failure is logged and swallowed rather than
 * surfaced to the user.
 */
export async function sendWaitlistEmail({
  to,
  waitlistId,
  ticketNumber,
}: SendWaitlistEmailArgs) {
  const from = process.env.RESEND_FROM;

  if (!from) {
    console.error("[email] Missing RESEND_FROM, skipping waitlist email.");
    return;
  }

  if (from.includes("resend.dev")) {
    console.warn(
      "[email] WARNING: Sending via resend.dev test domain. Emails sent to external recipient domains will land in Spam or be rejected until a custom domain is verified in Resend."
    );
  }

  const siteUrl =
    process.env.EMAIL_ASSET_ORIGIN ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://gettheround.com";
  const unsubscribeUrl =
    process.env.RESEND_UNSUBSCRIBE_URL ?? `${siteUrl}/unsubscribe`;
  const companyAddress = process.env.COMPANY_ADDRESS;

  try {
    // The SDK reports API failures in `error` rather than throwing; the
    // try/catch is only for network-level failures.
    const { data, error } = await getResendClient().emails.send(
      {
        from,
        to,
        replyTo: process.env.RESEND_REPLY_TO || undefined,
        subject: WAITLIST_SUCCESS_SUBJECT,
        html: waitlistSuccessHtml({
          ticketNumber,
          unsubscribeUrl,
          companyAddress,
        }),
        text: waitlistSuccessText({
          ticketNumber,
          unsubscribeUrl,
          companyAddress,
        }),
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      },
      { idempotencyKey: `waitlist-success-${waitlistId}` }
    );

    if (error) {
      console.error("[email] Waitlist email failed:", error);
      return;
    }

    console.log(`[email] Waitlist email sent to ${to} (id: ${data?.id})`);
  } catch (cause) {
    console.error("[email] Waitlist email threw:", cause);
  }
}
