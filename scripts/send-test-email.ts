/**
 * One-off: sends the waitlist email to Resend's simulator sink.
 *   node --env-file=.env --experimental-strip-types scripts/send-test-email.ts [recipient]
 * Defaults to delivered@resend.dev (no real inbox involved).
 */
import { Resend } from "resend";

import {
  WAITLIST_SUCCESS_SUBJECT,
  waitlistSuccessHtml,
  waitlistSuccessText,
} from "../emails/waitlist-success.ts";

const to = process.argv[2] ?? "delivered@resend.dev";
const from = process.env.RESEND_FROM!;
const ticketNumber = 1042;

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from,
  to,
  subject: WAITLIST_SUCCESS_SUBJECT,
  html: waitlistSuccessHtml({ ticketNumber }),
  text: waitlistSuccessText({ ticketNumber }),
});

if (error) {
  console.error("FAILED:", JSON.stringify(error, null, 2));
  process.exit(1);
}
console.log(`SENT to ${to} from ${from} -> id ${data?.id}`);
