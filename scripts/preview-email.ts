/**
 * Renders the waitlist email to .preview/waitlist-success.html so you can open
 * it in a browser while iterating on the template.
 *
 *   npm run email:preview
 *
 * Browser rendering is a rough guide only - Outlook and Gmail differ. Send a
 * real test to delivered@resend.dev before shipping copy or layout changes.
 */
import { mkdirSync, writeFileSync } from "node:fs";

import { waitlistSuccessHtml } from "../emails/waitlist-success.ts";

const OUT_DIR = ".preview";
const OUT_FILE = `${OUT_DIR}/waitlist-success.html`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, waitlistSuccessHtml({ ticketNumber: 1042 }), "utf8");

console.log(`Wrote ${OUT_FILE}`);
