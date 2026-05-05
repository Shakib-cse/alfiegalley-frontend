import { NextRequest, NextResponse } from "next/server";
import { MailtrapClient } from "mailtrap";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, description, message } = await request.json();
    const bodyText = description || message;

    if (!bodyText) {
      return NextResponse.json(
        { error: "Missing required fields: description" },
        { status: 400 },
      );
    }

    const apiKey = process.env.MAILTRAP_API_KEY;
    const senderAddr = process.env.CONTACT_SENDER_ADDRESS;
    const toAddress = process.env.CONTACT_RECIPIENT_EMAIL;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Mailtrap API key is not configured" },
        { status: 500 },
      );
    }

    if (!senderAddr) {
      return NextResponse.json(
        { error: "Sender address (CONTACT_SENDER_ADDRESS) is not configured" },
        { status: 500 },
      );
    }

    if (!toAddress) {
      return NextResponse.json(
        { error: "Recipient address not configured" },
        { status: 500 },
      );
    }

    const client = new MailtrapClient({ token: apiKey });

    await client.send({
      from: {
        name: process.env.CONTACT_SENDER_NAME || "Alfie Galley",
        email: senderAddr,
      },
      to: [{ email: toAddress }],
      subject: subject || "New contact message from website",
      text: `A user wants to get in touch with us.\n\n---\n\nName: ${name || "(anonymous)"}\nEmail: ${email || "(not provided)"}\nSubject: ${subject || "(no subject)"}\n\nMessage:\n${bodyText}`,
      reply_to: email ? { email } : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
