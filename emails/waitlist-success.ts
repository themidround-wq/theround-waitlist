/**
 * Waitlist confirmation email.
 *
 * Hand-written table layout with inline styles on every element: Gmail,
 * Outlook.com and Yahoo strip <style> blocks, so the <style> tag below is
 * progressive enhancement only (mobile breakpoints) and never load-bearing.
 *
 * This module is the single source of truth for the template.
 * Preview it in a browser with `npm run email:preview`.
 */

type WaitlistSuccessProps = {
  ticketNumber: number;
  unsubscribeUrl?: string;
  companyAddress?: string;
};

const INK = "#14271a";
const MUTED = "#5b6358";
const RULE = "#d8d6c9";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/theround" },
  { label: "TikTok", href: "https://tiktok.com/@theround" },
  { label: "LinkedIn", href: "https://linkedin.com/company/theround" },
];

/**
 * Absolute origin for email assets. Images in email must be publicly reachable
 * over HTTPS - relative paths and data: URIs do not render (Gmail and Outlook
 * strip data: URIs outright), so this cannot point at localhost.
 */
const SITE_URL = process.env.EMAIL_ASSET_ORIGIN ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://gettheround.com";

/**
 * Served from public/Logo-on-whitebg.png. Source is 480x136; displayed at 120
 * wide so it stays crisp on retina. Width and height are set as attributes as
 * well as inline styles so clients that block images by default still reserve
 * the right space instead of collapsing the layout.
 */
const LOGO = {
  src: `${SITE_URL}/Logo-on-whitebg.png`,
  width: 120,
  height: 34,
  alt: "The Round",
};

export const WAITLIST_SUCCESS_SUBJECT = "Your seat is held.";

/**
 * Plain-text alternative. Always sent alongside the HTML: it improves
 * deliverability and is the fallback for text-only clients.
 */
export function waitlistSuccessText({
  ticketNumber,
  unsubscribeUrl = `${SITE_URL}/unsubscribe`,
  companyAddress = process.env.COMPANY_ADDRESS,
}: WaitlistSuccessProps) {
  const lines = [
    "Your seat is held.",
    "",
    `Ticket no. #${ticketNumber}`,
    "",
    "You signed up because you want to show up better in the moments that matter most.",
    "",
    "Something good is coming. It's worth the wait.",
    "",
    "We'll reach out when it's time. No noise - just a quiet invitation.",
    "",
    "In the meantime, follow along for updates:",
    ...SOCIALS.map((s) => `  ${s.label}: ${s.href}`),
    "",
    "The Round - Practice with purpose.",
  ];

  if (companyAddress) {
    lines.push("", companyAddress);
  }
  if (unsubscribeUrl) {
    lines.push("", `To unsubscribe or manage preferences: ${unsubscribeUrl}`);
  }

  return lines.join("\n");
}

export function waitlistSuccessHtml({
  ticketNumber,
  unsubscribeUrl = `${SITE_URL}/unsubscribe`,
  companyAddress = process.env.COMPANY_ADDRESS,
}: WaitlistSuccessProps) {
  const socialCells = SOCIALS.map(
    (s, i) => `
                  <td style="font-family: 'Segoe UI', Arial, sans-serif; font-weight: 600; font-size:16px; ${
                    i < SOCIALS.length - 1 ? "padding-right:24px;" : ""
                  }">
                    <a href="${s.href}" style="color:${INK}; text-decoration:underline;">${s.label}</a>
                  </td>`
  ).join("");

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${WAITLIST_SUCCESS_SUBJECT}</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<style>
  table { border-collapse: collapse; }
  td, h1 { font-family: Arial, sans-serif; }
</style>
<![endif]-->
<style>
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; background-color: #ffffff; }

  /* Progressive enhancement only - every element also carries an inline
     fallback so clients that strip <style> (Gmail, Outlook.com, Yahoo)
     still render correctly. */
  @media screen and (max-width: 600px) {
    .container { width: 100% !important; }
    .px-mobile { padding-left: 24px !important; padding-right: 24px !important; }
    .heading { font-size: 40px !important; line-height: 1.15 !important; }
    .body-text { font-size: 18px !important; line-height: 1.5 !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#ffffff;">
  <!-- Spam-safe hidden preheader with non-breaking whitespace padding -->
  <div style="display:none; font-size:1px; color:#ffffff; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; mso-hide:all;">
    Your seat on The Round waitlist is confirmed &mdash; ticket no. #${ticketNumber}. We'll be in touch when it's time.
    &#847; &zwnj; &nbsp; &#847; &zwnj; &nbsp; &#847; &zwnj; &nbsp; &#847; &zwnj; &nbsp; &#847; &zwnj; &nbsp; &#847; &zwnj; &nbsp; &#847; &zwnj; &nbsp; &#847; &zwnj; &nbsp;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="background-color:#ffffff;">
    <tr>
      <td align="center" style="padding: 48px 20px;">

        <!--[if mso]>
        <table role="presentation" width="560" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td>
        <![endif]-->
        <table role="presentation" class="container" width="560" cellpadding="0" cellspacing="0" border="0" style="width:560px; max-width:560px;">

          <!-- Logo. Linked to the site, as most readers expect of an email
               masthead. alt text carries the brand when images are blocked. -->
          <tr>
            <td class="px-mobile" style="padding-bottom: 40px; line-height:0; font-size:0;">
              <a href="${SITE_URL}" style="text-decoration:none; border:0;"><img src="${LOGO.src}" alt="${LOGO.alt}" width="${LOGO.width}" height="${LOGO.height}" style="display:block; width:${LOGO.width}px; height:${LOGO.height}px; border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic;" /></a>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td class="px-mobile heading" style="padding-bottom: 32px; font-family: 'Poppins', 'Segoe UI', Arial, sans-serif; font-weight: 700; color: ${INK};">
              <h1 style="margin:0; font-size:52px; line-height:1.1; font-family: 'Poppins', 'Segoe UI', Arial, sans-serif; font-weight: 700; color: ${INK};">${WAITLIST_SUCCESS_SUBJECT}</h1>
            </td>
          </tr>

          <!-- Ticket number, mirroring the number shown in SuccessModal -->
          <tr>
            <td class="px-mobile" style="padding-bottom: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid ${RULE}; border-radius: 12px;">
                <tr>
                  <td style="padding: 14px 8px 14px 20px; font-family: 'Segoe UI', Arial, sans-serif; font-weight: 600; letter-spacing: 1.5px; color: ${MUTED}; font-size:11px; text-transform:uppercase;">
                    Ticket no.
                  </td>
                  <td style="padding: 14px 20px 14px 0; font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size:22px; color: ${INK};">
                    #${ticketNumber}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body copy -->
          <tr>
            <td class="px-mobile body-text" style="font-family: 'Segoe UI', Arial, sans-serif; font-weight: 400; font-size:20px; line-height:1.6; color: ${INK}; padding-bottom:24px;">
              You signed up because you want to show up better in the moments that matter most.
            </td>
          </tr>
          <tr>
            <td class="px-mobile body-text" style="font-family: 'Segoe UI', Arial, sans-serif; font-weight: 400; font-size:20px; line-height:1.6; color: ${INK}; padding-bottom:24px;">
              Something good is coming. It's worth the wait.
            </td>
          </tr>
          <tr>
            <td class="px-mobile body-text" style="font-family: 'Segoe UI', Arial, sans-serif; font-weight: 400; font-size:20px; line-height:1.6; color: ${INK}; padding-bottom:48px;">
              We'll reach out when it's time. No noise&mdash;just a quiet invitation.
            </td>
          </tr>

          <!-- Follow along -->
          <tr>
            <td class="px-mobile" style="font-family: 'Segoe UI', Arial, sans-serif; font-weight: 400; font-size:16px; line-height:1.5; color: ${MUTED}; padding-bottom:16px;">
              In the meantime, follow along for updates.
            </td>
          </tr>
          <tr>
            <td class="px-mobile" style="padding-bottom: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>${socialCells}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td class="px-mobile" style="padding-bottom: 24px;">
              <div style="border-top: 1px solid ${RULE}; font-size:1px; line-height:1px;">&nbsp;</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="px-mobile" style="padding-bottom: 48px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family: 'Segoe UI', Arial, sans-serif; font-weight: 600; letter-spacing: 1.5px; color: ${MUTED}; font-size:13px; text-transform:uppercase;">
                    The Round
                  </td>
                  <td align="right" style="font-family: 'Segoe UI', Arial, sans-serif; font-weight: 600; letter-spacing: 1.5px; color: ${MUTED}; font-size:13px; text-transform:uppercase;">
                    Practice with purpose.
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 16px; font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: ${MUTED};">
                    ${companyAddress ? `${companyAddress}<br />` : ""}
                    Received this by mistake or want to opt out? <a href="${unsubscribeUrl}" style="color: ${MUTED}; text-decoration: underline;">Unsubscribe</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!--[if mso]>
        </td></tr></table>
        <![endif]-->

      </td>
    </tr>
  </table>
</body>
</html>`;
}
