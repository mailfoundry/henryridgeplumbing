"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Quote = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string | null;
  message: string;
  status: string;
  createdAt: string;
};

type Invoice = {
  id: string;
  number: string | null;
  status: string | null;
  customerName: string;
  customerEmail: string | null;
  amountDue: number;
  amountPaid: number;
  currency: string;
  created: number;
  hostedInvoiceUrl: string | null;
  invoicePdf: string | null;
};

type LineItem = { description: string; quantity: number; unitAmount: string };

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: "New", color: "#1E63D6" },
  contacted: { label: "Contacted", color: "#D97706" },
  quoted: { label: "Quoted", color: "#7C3AED" },
  completed: { label: "Completed", color: "#059669" },
};

const INVOICE_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: "Draft", color: "#6B7280" },
  open: { label: "Sent", color: "#1E63D6" },
  paid: { label: "Paid", color: "#059669" },
  void: { label: "Void", color: "#9CA3AF" },
  uncollectible: { label: "Uncollectible", color: "#C53030" },
};

const emptyLine = (): LineItem => ({ description: "", quantity: 1, unitAmount: "" });

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(pence: number, currency = "gbp") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(pence / 100);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");

  // Tab state
  const [tab, setTab] = useState<"quotes" | "invoices">("quotes");

  // Quotes state
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quotesLoading, setQuotesLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);

  // Invoices state
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [invoicesLoading, setInvoicesLoading] = useState(false);
  const [invoiceError, setInvoiceError] = useState("");

  // Invoice form state
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDays, setFormDays] = useState("0");
  const [formNotes, setFormNotes] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([emptyLine()]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // ── Auth ──────────────────────────────────────────────────────────────────

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      loadQuotes();
    } else {
      setPwError("Incorrect password");
    }
  }

  // ── Quotes ────────────────────────────────────────────────────────────────

  async function loadQuotes() {
    setQuotesLoading(true);
    const res = await fetch("/api/admin/quotes");
    if (res.ok) setQuotes(await res.json());
    setQuotesLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    await fetch(`/api/admin/quotes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
    setUpdating(null);
  }

  // ── Invoices ──────────────────────────────────────────────────────────────

  const loadInvoices = useCallback(async () => {
    setInvoicesLoading(true);
    setInvoiceError("");
    const res = await fetch("/api/admin/invoices");
    if (res.ok) {
      setInvoices(await res.json());
    } else {
      const data = await res.json().catch(() => ({}));
      setInvoiceError(data.error ?? "Failed to load invoices");
    }
    setInvoicesLoading(false);
  }, []);

  useEffect(() => {
    if (authed && tab === "invoices" && invoices.length === 0) {
      loadInvoices();
    }
  }, [authed, tab, invoices.length, loadInvoices]);

  function resetForm() {
    setFormName("");
    setFormEmail("");
    setFormDays("14");
    setFormNotes("");
    setLineItems([emptyLine()]);
    setFormError("");
    setFormSuccess("");
  }

  function addLine() {
    setLineItems((prev) => [...prev, emptyLine()]);
  }

  function removeLine(i: number) {
    setLineItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateLine(i: number, field: keyof LineItem, value: string | number) {
    setLineItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)));
  }

  function lineTotal(item: LineItem) {
    const amt = parseFloat(item.unitAmount) || 0;
    return item.quantity * amt;
  }

  function invoiceTotal() {
    return lineItems.reduce((sum, item) => sum + lineTotal(item), 0);
  }

  async function submitInvoice(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!formName.trim() || !formEmail.trim()) {
      setFormError("Customer name and email are required.");
      return;
    }
    if (lineItems.some((l) => !l.description.trim() || !l.unitAmount)) {
      setFormError("All line items need a description and amount.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formName.trim(),
          customerEmail: formEmail.trim(),
          dueInDays: parseInt(formDays, 10) || 14,
          notes: formNotes.trim() || undefined,
          lineItems: lineItems.map((l) => ({
            description: l.description.trim(),
            quantity: Number(l.quantity),
            unitAmount: Math.round(parseFloat(l.unitAmount) * 100), // £ → pence
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error ?? "Failed to create invoice");
      } else {
        setFormSuccess(`Invoice ${data.number ?? ""} sent to ${formEmail} ✓`);
        resetForm();
        setShowForm(false);
        loadInvoices();
      }
    } catch {
      setFormError("Network error — please try again");
    }
    setSubmitting(false);
  }

  const filtered = filter === "all" ? quotes : quotes.filter((q) => q.status === filter);

  // ── Login screen ──────────────────────────────────────────────────────────

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#F2F4F7", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "14px", padding: "48px 40px", maxWidth: "420px", width: "100%", textAlign: "center" }}>
          <div style={{ marginBottom: "24px" }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#0A1A2F", textTransform: "uppercase" }}>Henry Ridge</span>
            <br />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1E63D6", letterSpacing: "0.15em", textTransform: "uppercase" }}>Admin</span>
          </div>
          <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ padding: "13px 16px", border: "1px solid #D1D9E6", borderRadius: "8px", fontSize: "1rem", outline: "none" }}
            />
            {pwError && <p style={{ color: "#C53030", fontSize: "0.85rem" }}>{pwError}</p>}
            <button
              type="submit"
              style={{ background: "#1E63D6", color: "#fff", padding: "13px", borderRadius: "8px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.95rem" }}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Authenticated ─────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: "#F2F4F7" }}>
      {/* Header */}
      <div style={{ background: "#0A1A2F", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Henry Ridge — Admin
        </span>
        <button
          onClick={() => { setAuthed(false); setQuotes([]); setInvoices([]); }}
          style={{ color: "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem" }}
        >
          Sign out
        </button>
      </div>

      {/* Tab bar */}
      <div style={{ background: "#FFFFFF", borderBottom: "1px solid #D1D9E6", padding: "0 24px", display: "flex", gap: "0" }}>
        {(["quotes", "invoices"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "14px 20px",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: tab === t ? 700 : 400,
              color: tab === t ? "#1E63D6" : "#4A5A72",
              borderBottom: tab === t ? "2px solid #1E63D6" : "2px solid transparent",
              textTransform: "capitalize",
              marginBottom: "-1px",
            }}
          >
            {t === "quotes" ? "Quote Requests" : "Invoices"}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 16px" }}>

        {/* ══ QUOTES TAB ══════════════════════════════════════════════════════ */}
        {tab === "quotes" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {["all", "new", "contacted", "completed"].map((s) => {
                const count = s === "all" ? quotes.length : quotes.filter((q) => q.status === s).length;
                const st = STATUS_LABELS[s] ?? { label: "All", color: "#0A1A2F" };
                return (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    style={{ background: filter === s ? "#0A1A2F" : "#FFFFFF", border: `1px solid ${filter === s ? "#0A1A2F" : "#D1D9E6"}`, borderRadius: "10px", padding: "18px 16px", textAlign: "left", cursor: "pointer" }}
                  >
                    <p style={{ fontSize: "1.8rem", fontWeight: 800, color: filter === s ? "#FFFFFF" : "#0A1A2F", fontFamily: "'Barlow Condensed', sans-serif" }}>{count}</p>
                    <p style={{ fontSize: "0.78rem", color: filter === s ? "rgba(255,255,255,0.6)" : "#4A5A72", textTransform: "capitalize" }}>{s === "all" ? "Total enquiries" : s}</p>
                  </button>
                );
              })}
            </div>

            {/* Table */}
            <div style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "12px", overflow: "hidden" }}>
              {quotesLoading ? (
                <div style={{ padding: "60px", textAlign: "center", color: "#4A5A72" }}>Loading…</div>
              ) : filtered.length === 0 ? (
                <div style={{ padding: "60px", textAlign: "center", color: "#4A5A72" }}>No quote requests yet.</div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#F2F4F7", borderBottom: "1px solid #D1D9E6" }}>
                        {["Date", "Name", "Service", "Contact", "Status", "Actions"].map((h) => (
                          <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#4A5A72", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((q) => {
                        const st = STATUS_LABELS[q.status] ?? STATUS_LABELS.new;
                        const date = new Date(q.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
                        return (
                          <tr key={q.id} style={{ borderBottom: "1px solid #F2F4F7" }}>
                            <td style={{ padding: "14px 16px", fontSize: "0.85rem", color: "#4A5A72", whiteSpace: "nowrap" }}>{date}</td>
                            <td style={{ padding: "14px 16px" }}>
                              <p style={{ fontWeight: 600, color: "#0A1A2F", fontSize: "0.9rem" }}>{q.name}</p>
                              {q.address && <p style={{ color: "#4A5A72", fontSize: "0.8rem" }}>{q.address}</p>}
                            </td>
                            <td style={{ padding: "14px 16px", fontSize: "0.88rem", color: "#0A1A2F" }}>{q.service}</td>
                            <td style={{ padding: "14px 16px" }}>
                              <a href={`tel:${q.phone}`} style={{ display: "block", color: "#1E63D6", fontSize: "0.85rem", textDecoration: "none", fontWeight: 600 }}>{q.phone}</a>
                              <a href={`mailto:${q.email}`} style={{ display: "block", color: "#4A5A72", fontSize: "0.8rem", textDecoration: "none" }}>{q.email}</a>
                            </td>
                            <td style={{ padding: "14px 16px" }}>
                              <span style={{ background: `${st.color}18`, color: st.color, padding: "4px 10px", borderRadius: "50px", fontSize: "0.78rem", fontWeight: 700 }}>
                                {st.label}
                              </span>
                            </td>
                            <td style={{ padding: "14px 16px" }}>
                              <select
                                value={q.status}
                                disabled={updating === q.id}
                                onChange={(e) => updateStatus(q.id, e.target.value)}
                                style={{ border: "1px solid #D1D9E6", borderRadius: "6px", padding: "6px 10px", fontSize: "0.82rem", color: "#0A1A2F", cursor: "pointer" }}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="quoted">Quoted</option>
                                <option value="completed">Completed</option>
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Message previews */}
            {filtered.length > 0 && (
              <div style={{ marginTop: "32px", display: "grid", gap: "12px" }}>
                {filtered.map((q) => (
                  <details key={`msg-${q.id}`} style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "10px" }}>
                    <summary style={{ padding: "14px 18px", cursor: "pointer", fontWeight: 600, color: "#0A1A2F", fontSize: "0.9rem" }}>
                      {q.name} — {q.service}
                    </summary>
                    <div style={{ padding: "14px 18px 18px", borderTop: "1px solid #F2F4F7" }}>
                      <p style={{ color: "#4A5A72", fontSize: "0.9rem", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{q.message}</p>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </>
        )}

        {/* ══ INVOICES TAB ════════════════════════════════════════════════════ */}
        {tab === "invoices" && (
          <>
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <h2 style={{ margin: 0, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#0A1A2F", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                Invoices
              </h2>
              <button
                onClick={() => { setShowForm((v) => !v); setFormError(""); setFormSuccess(""); }}
                style={{ background: "#1E63D6", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}
              >
                {showForm ? "Cancel" : "+ New Invoice"}
              </button>
            </div>

            {/* Success banner */}
            {formSuccess && (
              <div style={{ background: "#D1FAE5", border: "1px solid #6EE7B7", borderRadius: "8px", padding: "14px 18px", marginBottom: "20px", color: "#065F46", fontWeight: 600, fontSize: "0.9rem" }}>
                {formSuccess}
              </div>
            )}

            {/* ── Invoice form ─────────────────────────────────────────────── */}
            {showForm && (
              <div style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "12px", padding: "28px", marginBottom: "28px" }}>
                <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: "1rem", color: "#0A1A2F" }}>Create Invoice</h3>
                <style>{mobileStyles}</style>
                <form onSubmit={submitInvoice} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Customer details */}
                  <div className="inv-customer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={labelStyle}>Customer Name</label>
                      <input
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. David Atkinson"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Customer Email</label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="customer@example.com"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Line items */}
                  <div>
                    <label style={labelStyle}>Line Items</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {lineItems.map((item, i) => (
                        <div key={i} className="inv-line-grid" style={{ display: "grid", gridTemplateColumns: "1fr 80px 110px 36px", gap: "8px", alignItems: "center" }}>
                          <input
                            value={item.description}
                            onChange={(e) => updateLine(i, "description", e.target.value)}
                            placeholder="Description of work"
                            style={inputStyle}
                          />
                          <div className="inv-line-right" style={{ display: "contents" }}>
                            <input
                              className="inv-line-qty"
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(e) => updateLine(i, "quantity", e.target.value)}
                              placeholder="Qty"
                              style={{ ...inputStyle, textAlign: "center" }}
                            />
                            <div style={{ position: "relative" }}>
                              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#4A5A72", fontSize: "0.9rem", pointerEvents: "none" }}>£</span>
                              <input
                                className="inv-line-amount"
                                type="number"
                                min={0}
                                step="0.01"
                                value={item.unitAmount}
                                onChange={(e) => updateLine(i, "unitAmount", e.target.value)}
                                placeholder="0.00"
                                style={{ ...inputStyle, paddingLeft: "28px" }}
                              />
                            </div>
                            <button
                              className="inv-line-remove"
                              type="button"
                              onClick={() => removeLine(i)}
                              disabled={lineItems.length === 1}
                              style={{ background: "none", border: "1px solid #D1D9E6", borderRadius: "6px", color: "#C53030", cursor: lineItems.length === 1 ? "default" : "pointer", fontSize: "1rem", width: "36px", height: "36px", opacity: lineItems.length === 1 ? 0.3 : 1 }}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={addLine}
                      style={{ marginTop: "8px", background: "none", border: "1px dashed #D1D9E6", borderRadius: "6px", padding: "8px 14px", color: "#4A5A72", fontSize: "0.85rem", cursor: "pointer", width: "100%" }}
                    >
                      + Add line item
                    </button>

                    {/* Total */}
                    <div style={{ marginTop: "12px", textAlign: "right", fontSize: "0.95rem", color: "#0A1A2F" }}>
                      <span style={{ color: "#4A5A72" }}>Total: </span>
                      <strong>£{invoiceTotal().toFixed(2)}</strong>
                    </div>
                  </div>

                  {/* Due days + Notes */}
                  <div className="inv-meta-grid" style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "12px" }}>
                    <div>
                      <label style={labelStyle}>Payment due (days — 0 = now)</label>
                      <input
                        type="number"
                        min={0}
                        max={90}
                        value={formDays}
                        onChange={(e) => setFormDays(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Notes / footer (optional)</label>
                      <input
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        placeholder="Leave blank to use default Henry Ridge footer"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {formError && (
                    <p style={{ color: "#C53030", fontSize: "0.85rem", margin: 0 }}>{formError}</p>
                  )}

                  {/* Submit */}
                  <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      onClick={() => { setShowForm(false); resetForm(); }}
                      style={{ padding: "11px 20px", border: "1px solid #D1D9E6", borderRadius: "8px", background: "#FFFFFF", color: "#4A5A72", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{ padding: "11px 24px", background: submitting ? "#6B9FE4" : "#1E63D6", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: submitting ? "default" : "pointer", fontSize: "0.9rem" }}
                    >
                      {submitting ? "Sending…" : "Send Invoice"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── Invoice list ─────────────────────────────────────────────── */}
            {invoiceError && (
              <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px", padding: "14px 18px", marginBottom: "20px", color: "#C53030", fontSize: "0.9rem" }}>
                {invoiceError}
                {invoiceError.includes("STRIPE_SECRET_KEY") && (
                  <span> — Add <code>STRIPE_SECRET_KEY</code> to your Railway environment variables.</span>
                )}
              </div>
            )}

            <div style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "12px", overflow: "hidden" }}>
              {invoicesLoading ? (
                <div style={{ padding: "60px", textAlign: "center", color: "#4A5A72" }}>Loading invoices…</div>
              ) : invoices.length === 0 && !invoiceError ? (
                <div style={{ padding: "60px", textAlign: "center", color: "#4A5A72" }}>
                  No invoices yet. Create your first one above.
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#F2F4F7", borderBottom: "1px solid #D1D9E6" }}>
                        {["Date", "Invoice #", "Customer", "Amount", "Status", "Actions"].map((h) => (
                          <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#4A5A72", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((inv) => {
                        const ist = INVOICE_STATUS_LABELS[inv.status ?? ""] ?? { label: inv.status ?? "Unknown", color: "#6B7280" };
                        const date = new Date(inv.created * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
                        return (
                          <tr key={inv.id} style={{ borderBottom: "1px solid #F2F4F7" }}>
                            <td style={{ padding: "14px 16px", fontSize: "0.85rem", color: "#4A5A72", whiteSpace: "nowrap" }}>{date}</td>
                            <td style={{ padding: "14px 16px", fontSize: "0.85rem", color: "#0A1A2F", fontWeight: 600, whiteSpace: "nowrap" }}>{inv.number ?? "—"}</td>
                            <td style={{ padding: "14px 16px" }}>
                              <p style={{ fontWeight: 600, color: "#0A1A2F", fontSize: "0.9rem", margin: 0 }}>{inv.customerName}</p>
                              {inv.customerEmail && <p style={{ color: "#4A5A72", fontSize: "0.8rem", margin: 0 }}>{inv.customerEmail}</p>}
                            </td>
                            <td style={{ padding: "14px 16px", fontSize: "0.9rem", fontWeight: 600, color: "#0A1A2F", whiteSpace: "nowrap" }}>
                              {fmt(inv.amountDue, inv.currency)}
                            </td>
                            <td style={{ padding: "14px 16px" }}>
                              <span style={{ background: `${ist.color}18`, color: ist.color, padding: "4px 10px", borderRadius: "50px", fontSize: "0.78rem", fontWeight: 700 }}>
                                {ist.label}
                              </span>
                            </td>
                            <td style={{ padding: "14px 16px" }}>
                              <div style={{ display: "flex", gap: "8px", flexWrap: "nowrap" }}>
                                {inv.hostedInvoiceUrl && (
                                  <a
                                    href={inv.hostedInvoiceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontSize: "0.82rem", color: "#1E63D6", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}
                                  >
                                    View ↗
                                  </a>
                                )}
                                {inv.invoicePdf && (
                                  <a
                                    href={inv.invoicePdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontSize: "0.82rem", color: "#4A5A72", textDecoration: "none", whiteSpace: "nowrap" }}
                                  >
                                    PDF ↗
                                  </a>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Refresh button */}
            {!invoicesLoading && (
              <div style={{ marginTop: "16px", textAlign: "right" }}>
                <button
                  onClick={loadInvoices}
                  style={{ background: "none", border: "1px solid #D1D9E6", borderRadius: "6px", padding: "8px 14px", color: "#4A5A72", fontSize: "0.82rem", cursor: "pointer" }}
                >
                  Refresh
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Mobile styles (injected once) ───────────────────────────────────────────

const mobileStyles = `
  @media (max-width: 600px) {
    .inv-customer-grid { grid-template-columns: 1fr !important; }
    .inv-meta-grid     { grid-template-columns: 1fr !important; }
    .inv-line-grid     { grid-template-columns: 1fr !important; gap: 6px !important; }
    .inv-line-grid .inv-line-right { display: grid; grid-template-columns: 1fr 80px 36px; gap: 6px; }
    .inv-line-qty,
    .inv-line-amount   { display: block; }
    .inv-line-remove   { align-self: center; }
  }
`;

// ─── Style helpers ────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #D1D9E6",
  borderRadius: "7px",
  fontSize: "0.9rem",
  color: "#0A1A2F",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.78rem",
  fontWeight: 600,
  color: "#4A5A72",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: "6px",
};
