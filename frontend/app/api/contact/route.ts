import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Contact form handler.
 *
 * Wire this up to your email provider of choice. A few easy options:
 *   - Resend (https://resend.com) — uncomment the block below and set RESEND_API_KEY
 *   - Postmark / SendGrid — same idea, swap the SDK
 *   - Plain SMTP via nodemailer
 *
 * For now this validates input and logs the message server-side, then returns OK.
 */
export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.includes("@") ||
      message.trim().length < 5
    ) {
      return NextResponse.json(
        { error: "Please fill out all fields with valid values." },
        { status: 400 }
      );
    }

    // ---- Example: Resend integration (uncomment after `npm i resend`) ----
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY!);
    // await resend.emails.send({
    //   from: "site@yourdomain.com",
    //   to: "sebastian@example.com",
    //   replyTo: email,
    //   subject: `New message from ${name}`,
    //   text: message,
    // });

    console.log("[contact] new message", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown error" },
      { status: 500 }
    );
  }
}
