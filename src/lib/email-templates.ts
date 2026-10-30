import { escapeHtml } from "@/lib/sanitize";
import type { ContactPayload } from "@/lib/contact-validation";

function layout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;color:#f2efe8;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0a0a0a;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#141414;border:1px solid #2a2a2a;border-radius:8px;">
          <tr>
            <td style="padding:28px 24px;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;border-top:1px solid #2a2a2a;font-size:12px;color:#8a8780;">
              Jaswinder Singh · Frontend Developer Portfolio
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function visitorThankYouEmail(name: string): { subject: string; html: string } {
  const safeName = escapeHtml(name);

  const body = `
    <h1 style="margin:0 0 16px;font-size:24px;color:#c8ff00;">Thank You for Contacting Me!</h1>
    <p style="margin:0 0 12px;line-height:1.6;font-size:15px;">Hi ${safeName},</p>
    <p style="margin:0 0 12px;line-height:1.6;font-size:15px;">
      Thank you for reaching out through my portfolio!
    </p>
    <p style="margin:0 0 12px;line-height:1.6;font-size:15px;">
      I have successfully received your message and appreciate your interest.
    </p>
    <p style="margin:0 0 20px;line-height:1.6;font-size:15px;">
      I will review your enquiry and get back to you as soon as possible.
    </p>
    <p style="margin:0;line-height:1.6;font-size:15px;">
      Best regards,<br />
      <strong>Jaswinder Singh</strong><br />
      Frontend Developer
    </p>
  `;

  return {
    subject: "Thank You for Contacting Me!",
    html: layout("Thank You for Contacting Me!", body),
  };
}

export function ownerNotificationEmail(data: ContactPayload): {
  subject: string;
  html: string;
} {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message).replace(/\n/g, "<br />");

  const body = `
    <h1 style="margin:0 0 16px;font-size:22px;color:#c8ff00;">New Portfolio Enquiry</h1>
    <p style="margin:0 0 20px;line-height:1.6;font-size:15px;">Hello Jaswinder,</p>
    <p style="margin:0 0 20px;line-height:1.6;font-size:15px;">
      You have received a new enquiry through your portfolio website.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #2a2a2a;border-radius:6px;">
      <tr>
        <td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;font-size:13px;color:#8a8780;">Name</td>
        <td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;font-size:14px;">${name}</td>
      </tr>
      <tr>
        <td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;font-size:13px;color:#8a8780;">Email</td>
        <td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;font-size:14px;">
          <a href="mailto:${email}" style="color:#c8ff00;text-decoration:none;">${email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;font-size:13px;color:#8a8780;">Subject</td>
        <td style="padding:12px 14px;border-bottom:1px solid #2a2a2a;font-size:14px;">${subject}</td>
      </tr>
      <tr>
        <td style="padding:12px 14px;font-size:13px;color:#8a8780;vertical-align:top;">Message</td>
        <td style="padding:12px 14px;font-size:14px;line-height:1.6;">${message}</td>
      </tr>
    </table>
  `;

  return {
    subject: `New Portfolio Enquiry - ${data.subject}`,
    html: layout("New Portfolio Enquiry", body),
  };
}
