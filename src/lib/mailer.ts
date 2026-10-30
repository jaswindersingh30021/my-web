import nodemailer from "nodemailer";
import type { ContactPayload } from "@/lib/contact-validation";
import {
  ownerNotificationEmail,
  visitorThankYouEmail,
} from "@/lib/email-templates";

function getMailConfig() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!user || !pass || !contactEmail) {
    return null;
  }

  return { user, pass, contactEmail };
}

function createTransporter(user: string, pass: string) {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendContactEmails(data: ContactPayload): Promise<void> {
  const config = getMailConfig();
  if (!config) {
    throw new Error("EMAIL_CONFIG_MISSING");
  }

  const transporter = createTransporter(config.user, config.pass);
  const visitorMail = visitorThankYouEmail(data.name);
  const ownerMail = ownerNotificationEmail(data);

  await transporter.sendMail({
    from: `"Jaswinder Singh" <${config.user}>`,
    to: data.email,
    subject: visitorMail.subject,
    html: visitorMail.html,
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${config.user}>`,
    to: config.contactEmail,
    replyTo: data.email,
    subject: ownerMail.subject,
    html: ownerMail.html,
  });
}

export function isEmailConfigured(): boolean {
  return getMailConfig() !== null;
}
