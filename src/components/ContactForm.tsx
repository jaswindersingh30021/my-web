"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_LIMITS } from "@/lib/contact-validation";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (feedback) setFeedback(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.success) {
        setFeedback({
          type: "error",
          text: data.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setForm(initialState);
      setFeedback({
        type: "success",
        text: data.message ?? "Message sent! Check your inbox for confirmation.",
      });
    } catch {
      setFeedback({
        type: "error",
        text: "Network error. Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent";

  const labelClass =
    "mb-2 block font-display text-[10px] uppercase tracking-[0.22em] text-muted";

  return (
    <form
      onSubmit={handleSubmit}
      className="panel-glass mt-10 p-5 sm:p-6"
      noValidate
    >
      <p className="mb-5 font-display text-[10px] uppercase tracking-[0.25em] text-accent">
        Send a message
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={CONTACT_LIMITS.nameMax}
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={inputClass}
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={CONTACT_LIMITS.emailMax}
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={inputClass}
            disabled={submitting}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          maxLength={CONTACT_LIMITS.subjectMax}
          value={form.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          className={inputClass}
          disabled={submitting}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={CONTACT_LIMITS.messageMax}
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={`${inputClass} resize-y min-h-[120px]`}
          disabled={submitting}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className="min-h-11 border border-accent bg-accent px-8 py-4 font-display text-xs uppercase tracking-[0.2em] text-background transition-colors hover:bg-transparent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
          data-cursor="hover"
        >
          {submitting ? "Sending..." : "Send message"}
        </button>

        {feedback && (
          <p
            role="status"
            aria-live="polite"
            className={`text-sm ${
              feedback.type === "success" ? "text-accent" : "text-red-400"
            }`}
          >
            {feedback.text}
          </p>
        )}
      </div>
    </form>
  );
}
