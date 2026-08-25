import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Plumbing, bathroom installation and tiling services across Staffordshire. Emergency call-outs available.",
};

export default function ServicesPage() {
  const emergency = services.find((s) => s.slug === "emergency-repairs")!;
  const rest = services.filter((s) => s.slug !== "emergency-repairs");

  return (
    <>
      {/* Page header */}
      <section style={{ background: "#0A1A2F", padding: "60px 16px 50px" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>What I do</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.2rem)", color: "#FFFFFF", marginBottom: "14px" }}>
            Services
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "560px", fontSize: "1.05rem", lineHeight: 1.7 }}>
            I offer professional plumbing, bathroom fitting and tiling — to a high standard, no subcontractors, no nonsense.
          </p>
        </div>
      </section>

      <section style={{ padding: "60px 16px", background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">

          {/* Emergency — full width highlight */}
          <div style={{ background: "linear-gradient(135deg, #0A1A2F 0%, #152640 100%)", borderRadius: "14px", padding: "40px", marginBottom: "28px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
            <div>
              <p className="text-xs font-semibold uppercase mb-2" style={{ color: "#1E63D6", letterSpacing: "0.2em" }}>Emergency</p>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#FFFFFF", marginBottom: "10px" }}>
                {emergency.title}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", maxWidth: "520px", lineHeight: 1.65 }}>
                {emergency.tagline}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}>
              <a href="tel:+447306800847" style={{ background: "#1E63D6", color: "#fff", padding: "14px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "1.05rem", fontFamily: "'Barlow Condensed', sans-serif", textAlign: "center" }}>
                Call Now: 07306 800847
              </a>
              <Link href={`/services/${emergency.slug}`} style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.75)", padding: "11px 28px", borderRadius: "8px", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem", textAlign: "center" }}>
                Learn more →
              </Link>
            </div>
          </div>

          {/* Other services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                style={{ background: "#F2F4F7", border: "1px solid #D1D9E6", borderRadius: "12px", padding: "32px", textDecoration: "none", display: "block" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ background: "#EBF1FC", color: "#1E63D6", fontSize: "0.72rem", fontWeight: 600, padding: "4px 10px", borderRadius: "50px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {service.category}
                  </span>
                  <svg width="20" height="20" fill="none" stroke="#C0C5CC" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#0A1A2F", marginBottom: "10px" }}>
                  {service.title}
                </h2>
                <p style={{ color: "#4A5A72", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "20px" }}>
                  {service.tagline}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {service.features.slice(0, 3).map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.85rem", color: "#4A5A72" }}>
                      <svg style={{ flexShrink: 0, marginTop: "2px" }} width="14" height="14" fill="none" stroke="#1E63D6" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 14 14">
                        <polyline points="2,7 5,10 12,3"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>

          {/* Quote CTA */}
          <div style={{ marginTop: "60px", background: "#F2F4F7", border: "1px solid #D1D9E6", borderRadius: "12px", padding: "40px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#0A1A2F", marginBottom: "10px" }}>
              Not sure which service you need?
            </h2>
            <p style={{ color: "#4A5A72", marginBottom: "24px", fontSize: "0.95rem" }}>
              Describe your problem and I&apos;ll get back to you with the best approach.
            </p>
            <Link href="/quote" style={{ display: "inline-block", background: "#1E63D6", color: "#fff", padding: "14px 32px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "1rem" }}>
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
