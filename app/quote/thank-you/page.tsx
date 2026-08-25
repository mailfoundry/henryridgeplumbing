import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quote Request Received",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <section style={{ minHeight: "70vh", background: "#F2F4F7", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 16px" }}>
      <div style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "16px", padding: "56px 40px", maxWidth: "560px", width: "100%", textAlign: "center" }}>
        {/* Tick */}
        <div style={{ width: "64px", height: "64px", background: "#EBF5F0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <svg width="30" height="30" fill="none" stroke="#22C55E" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="20,6 9,17 4,12"/>
          </svg>
        </div>

        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#0A1A2F", marginBottom: "12px" }}>
          Quote request received
        </h1>
        <p style={{ color: "#4A5A72", fontSize: "1rem", lineHeight: 1.75, marginBottom: "32px" }}>
          Thanks for getting in touch. Henry has received your request and will contact you the same day to discuss your job and arrange a quote.
        </p>
        <p style={{ color: "#4A5A72", fontSize: "0.9rem", marginBottom: "32px" }}>
          You should also receive a confirmation email shortly. If you need anything urgently, call Henry directly on{" "}
          <a href="tel:+447306800847" style={{ color: "#1E63D6", fontWeight: 600 }}>07306 800847</a>.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" style={{ background: "#1E63D6", color: "#fff", padding: "12px 24px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}>
            Back to home
          </Link>
          <Link href="/services" style={{ background: "#F2F4F7", color: "#0A1A2F", border: "1px solid #D1D9E6", padding: "12px 24px", borderRadius: "8px", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem" }}>
            View services
          </Link>
        </div>
      </div>
    </section>
  );
}
