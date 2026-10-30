import { NextResponse } from "next/server";
import { parseContactBody } from "@/lib/contact-validation";
import { sendContactEmails, isEmailConfigured } from "@/lib/mailer";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    if (!isEmailConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is not configured yet. Please try again later or email directly.",
        },
        { status: 503 },
      );
    }

    const ip = getClientIp(request);
    const rate = checkRateLimit(`contact:${ip}`);

    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many requests. Please try again in ${rate.retryAfterSec} seconds.`,
        },
        {
          status: 429,
          headers: rate.retryAfterSec
            ? { "Retry-After": String(rate.retryAfterSec) }
            : undefined,
        },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 },
      );
    }

    const parsed = parseContactBody(body);
    if (!parsed.ok) {
      return NextResponse.json(
        { success: false, error: parsed.error },
        { status: 400 },
      );
    }

    await sendContactEmails(parsed.data);

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to send your message right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}
