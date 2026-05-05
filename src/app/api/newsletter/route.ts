import { NextRequest, NextResponse } from "next/server";
import { MailtrapClient } from "mailtrap";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Missing required field: email" },
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
        { error: "Sender address is not configured" },
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
      subject: "New newsletter subscription",
      text: `A user requested to subscribe to the newsletter:\n\nEmail: ${email}\nTime: ${new Date().toISOString()}`,
      reply_to: email ? { email } : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/newsletter error:", err);
    //const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Failed to send subscription" },
      { status: 500 },
    );
  }
}
