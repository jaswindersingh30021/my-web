import { normalizeWhitespace, stripControlChars } from "@/lib/sanitize";

export const CONTACT_LIMITS = {
  nameMax: 100,
  emailMax: 254,
  subjectMax: 200,
  messageMax: 5000,
} as const;

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactBody(
  body: unknown,
): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;

  const name = normalizeWhitespace(
    stripControlChars(String(raw.name ?? "")),
  );
  const email = normalizeWhitespace(
    stripControlChars(String(raw.email ?? "")),
  ).toLowerCase();
  const subject = normalizeWhitespace(
    stripControlChars(String(raw.subject ?? "")),
  );
  const message = stripControlChars(String(raw.message ?? "")).trim();

  if (!name) return { ok: false, error: "Name is required." };
  if (!email) return { ok: false, error: "Email is required." };
  if (!subject) return { ok: false, error: "Subject is required." };
  if (!message) return { ok: false, error: "Message is required." };

  if (name.length > CONTACT_LIMITS.nameMax) {
    return { ok: false, error: "Name is too long." };
  }
  if (email.length > CONTACT_LIMITS.emailMax) {
    return { ok: false, error: "Email is too long." };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (subject.length > CONTACT_LIMITS.subjectMax) {
    return { ok: false, error: "Subject is too long." };
  }
  if (message.length > CONTACT_LIMITS.messageMax) {
    return { ok: false, error: "Message is too long." };
  }

  return { ok: true, data: { name, email, subject, message } };
}
