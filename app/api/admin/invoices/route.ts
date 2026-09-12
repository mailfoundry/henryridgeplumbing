import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

function isAuthed(request: NextRequest) {
  const cookie = request.cookies.get("hrp_admin")?.value;
  return cookie && cookie === process.env.ADMIN_PASSWORD;
}

export type LineItem = {
  description: string;
  quantity: number;
  unitAmount: number; // pence (e.g. 10000 = £100.00)
};

// GET — list all invoices from Stripe
export async function GET(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    const stripe = getStripe();
    const invoices = await stripe.invoices.list({ limit: 100 });

    const mapped = invoices.data.map((inv) => ({
      id: inv.id,
      number: inv.number,
      status: inv.status,
      customerName: inv.customer_name ?? inv.customer_email ?? "Unknown",
      customerEmail: inv.customer_email,
      amountDue: inv.amount_due, // pence
      amountPaid: inv.amount_paid,
      currency: inv.currency,
      created: inv.created,
      dueDate: inv.due_date,
      hostedInvoiceUrl: inv.hosted_invoice_url,
      invoicePdf: inv.invoice_pdf,
    }));

    return NextResponse.json(mapped);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("Invoices GET error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST — create a new invoice and send it to the customer
export async function POST(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { customerName, customerEmail, lineItems, dueInDays = 14, notes } = body as {
      customerName: string;
      customerEmail: string;
      lineItems: LineItem[];
      dueInDays?: number;
      notes?: string;
    };

    if (!customerName || !customerEmail || !lineItems?.length) {
      return NextResponse.json({ error: "customerName, customerEmail, and at least one lineItem are required" }, { status: 400 });
    }

    const stripe = getStripe();

    // Find or create the customer
    const existing = await stripe.customers.list({ email: customerEmail, limit: 1 });
    let customer = existing.data[0];

    if (!customer) {
      customer = await stripe.customers.create({
        name: customerName,
        email: customerEmail,
      });
    } else if (!customer.name && customerName) {
      // Update name if it's missing
      customer = await stripe.customers.update(customer.id, { name: customerName });
    }

    // Calculate due date
    const dueDate = Math.floor(Date.now() / 1000) + dueInDays * 86400;

    // Create the invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: dueInDays,
      due_date: dueDate,
      footer: notes ?? "Henry Ridge Plumbing — Staffordshire · info@henryridgeplumbing.co.uk · 07306 800847",
      auto_advance: false, // we'll finalize manually
    });

    // Add line items
    await Promise.all(
      lineItems.map((item) =>
        stripe.invoiceItems.create({
          customer: customer.id,
          invoice: invoice.id,
          description: item.description,
          quantity: item.quantity,
          unit_amount: item.unitAmount, // pence
          currency: "gbp",
        })
      )
    );

    // Finalize and send (Stripe emails the customer automatically)
    const finalized = await stripe.invoices.finalizeInvoice(invoice.id);
    const sent = await stripe.invoices.sendInvoice(finalized.id);

    return NextResponse.json({
      id: sent.id,
      number: sent.number,
      status: sent.status,
      hostedInvoiceUrl: sent.hosted_invoice_url,
      invoicePdf: sent.invoice_pdf,
      amountDue: sent.amount_due,
      currency: sent.currency,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Stripe error";
    console.error("Invoices POST error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
