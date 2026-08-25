"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SERVICE_OPTIONS = [
  "Emergency Leak / Pipe Repair",
  "Bathroom Installation",
  "Tiling",
  "Taps, Toilets & Showers",
  "Drainage & Blockages",
  "Radiator Fitting",
  "Outdoor Taps",
  "Other",
];

export default function QuotePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      router.push("/quote/thank-you");
    } catch {
      setError("Something went wrong — please try again or call 07306 800847 directly.");
      setSubmitting(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    border: "1px solid #D1D9E6",
    borderRadius: "8px",
    fontSize: "0.95rem",
    color: "#0A1A2F",
    background: "#FFFFFF",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    fontWeight: 600,
    color: "#0A1A2F",
    fontSize: "0.88rem",
    marginBottom: "6px",
  };

  return (
    <>
      <section style={{ background: "#0A1A2F", padding: "70px 16px 60px" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>Free quote</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#FFFFFF", marginBottom: "14px" }}>
            Request a Quote
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", maxWidth: "520px", lineHeight: 1.7 }}>
            Fill in the form below and Henry will get back to you the same day. No obligation, no pressure.
          </p>
        </div>
      </section>

      <section style={{ padding: "60px 16px 80px", background: "#F2F4F7" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Form */}
          <div className="lg:col-span-2">
            <div style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "14px", padding: "40px" }}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle} htmlFor="name">Full name <span style={{ color: "#E53E3E" }}>*</span></label>
                    <input id="name" name="name" type="text" required style={inputStyle} placeholder="Your full name" />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="phone">Phone number <span style={{ color: "#E53E3E" }}>*</span></label>
                    <input id="phone" name="phone" type="tel" required style={inputStyle} placeholder="07xxx xxxxxx" />
                  </div>
                </div>

                <div>
                  <label style={labelStyle} htmlFor="email">Email address <span style={{ color: "#E53E3E" }}>*</span></label>
                  <input id="email" name="email" type="email" required style={inputStyle} placeholder="you@example.com" />
                </div>

                <div>
                  <label style={labelStyle} htmlFor="service">Service required <span style={{ color: "#E53E3E" }}>*</span></label>
                  <select id="service" name="service" required style={inputStyle}>
                    <option value="">Select a service…</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle} htmlFor="address">Property address <span style={{ color: "#4A5A72", fontWeight: 400, fontSize: "0.82rem" }}>(optional)</span></label>
                  <input id="address" name="address" type="text" style={inputStyle} placeholder="Street, town, postcode" />
                </div>

                <div>
                  <label style={labelStyle} htmlFor="message">Describe the job <span style={{ color: "#E53E3E" }}>*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical" }}
                    placeholder="Tell Henry what you need done — the more detail the better…"
                  />
                </div>

                {error && (
                  <p style={{ color: "#C53030", background: "#FFF5F5", border: "1px solid #FEB2B2", borderRadius: "8px", padding: "12px 16px", fontSize: "0.9rem" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  style={{ background: submitting ? "#93AEDD" : "#1E63D6", color: "#fff", padding: "15px 32px", borderRadius: "8px", fontWeight: 700, fontSize: "1rem", border: "none", cursor: submitting ? "not-allowed" : "pointer", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em" }}
                >
                  {submitting ? "Sending…" : "Send Quote Request"}
                </button>

                <p style={{ color: "#4A5A72", fontSize: "0.82rem", textAlign: "center" }}>
                  By submitting this form you agree to Henry contacting you about your enquiry.
                </p>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ background: "#0A1A2F", borderRadius: "12px", padding: "28px" }}>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: "14px" }}>Prefer to call?</p>
              <a href="tel:+447306800847" style={{ display: "block", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "#1E63D6", textDecoration: "none", marginBottom: "6px" }}>
                07306 800847
              </a>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                Call Henry directly — no call centres, no waiting. He&apos;ll answer as soon as he can.
              </p>
            </div>

            <div style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "12px", padding: "24px" }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#0A1A2F", marginBottom: "14px" }}>
                What happens next?
              </h3>
              {[
                ["1", "Henry reviews your request"],
                ["2", "He contacts you the same day"],
                ["3", "You get a clear, fair quote"],
                ["4", "Work is booked at your convenience"],
              ].map(([n, label]) => (
                <div key={n} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ width: "24px", height: "24px", background: "#1E63D6", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>
                    {n}
                  </div>
                  <p style={{ color: "#4A5A72", fontSize: "0.88rem", paddingTop: "3px" }}>{label}</p>
                </div>
              ))}
            </div>

            <div style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "12px", padding: "24px" }}>
              <p style={{ fontWeight: 700, color: "#0A1A2F", marginBottom: "8px", fontSize: "0.95rem" }}>Need a plumber urgently?</p>
              <p style={{ color: "#4A5A72", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "14px" }}>
                For emergency call-outs — burst pipes, major leaks — call directly rather than filling in the form.
              </p>
              <a href="tel:+447306800847" style={{ display: "block", textAlign: "center", background: "#0A1A2F", color: "#fff", padding: "12px 20px", borderRadius: "8px", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem" }}>
                Emergency: 07306 800847
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
