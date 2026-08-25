import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "@/lib/db";
import { sendQuoteNotificationToHenry, sendQuoteConfirmationToCustomer } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, address, message } = body;

    // Basic validation
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Persist to DB
    const quote = await db.quoteRequest.create({
      data: { name, email, phone, service, address: address || null, message },
    });

    // Send emails — fire and forget is fine but we await both so errors are caught
    const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin`;
    await Promise.allSettled([
      sendQuoteNotificationToHenry({ name, email, phone, service, address, message, adminUrl }),
      sendQuoteConfirmationToCustomer({ name, email, service }),
    ]);

    return NextResponse.json({ success: true, id: quote.id });
  } catch (err) {
    console.error("Quote submission error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
