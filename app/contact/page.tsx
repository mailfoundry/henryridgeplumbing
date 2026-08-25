import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Henry Ridge Plumbing — call 07306 800847 or request a free quote online.",
};

export default function ContactPage() {
  return (
    <>
      <section style={{ background: "#0A1A2F", padding: "70px 16px 60px" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>Get in touch</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#FFFFFF", marginBottom: "14px" }}>
            Contact
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", maxWidth: "520px", lineHeight: 1.7 }}>
            Call me directly or fill in the quote form — I&apos;ll get back to you the same day.
          </p>
        </div>
      </section>

      <section style={{ padding: "70px 16px 80px", background: "#F2F4F7" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Call */}
          <div style={{ background: "#0A1A2F", borderRadius: "14px", padding: "36px" }}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px" }}>Phone</p>
            <a href="tel:+447306800847" style={{ display: "block", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "2.2rem", color: "#1E63D6", textDecoration: "none", marginBottom: "8px" }}>
              07306 800847
            </a>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.65 }}>
              Call me directly — no call centres, no waiting. For emergencies, always call rather than emailing.
            </p>
          </div>

          {/* Email */}
          <div style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "14px", padding: "36px" }}>
            <p style={{ color: "#4A5A72", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px" }}>Email</p>
            <a href="mailto:info@henryridgeplumbing.co.uk" style={{ display: "block", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#1E63D6", textDecoration: "none", marginBottom: "8px", wordBreak: "break-all" }}>
              info@henryridgeplumbing.co.uk
            </a>
            <p style={{ color: "#4A5A72", fontSize: "0.9rem", lineHeight: 1.65 }}>
              For non-urgent enquiries. I aim to respond the same day.
            </p>
          </div>

          {/* Quote form CTA */}
          <div className="md:col-span-2" style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "14px", padding: "36px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
            <div>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#0A1A2F", marginBottom: "8px" }}>
                Want a free quote?
              </h2>
              <p style={{ color: "#4A5A72", fontSize: "0.95rem" }}>
                Fill in the online form and I&apos;ll get back to you with a price — no obligation.
              </p>
            </div>
            <Link href="/quote" style={{ background: "#1E63D6", color: "#fff", padding: "14px 32px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "1rem", flexShrink: 0 }}>
              Request a Quote →
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
