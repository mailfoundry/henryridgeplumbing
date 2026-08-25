import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery",
  description: "View Henry Ridge Plumbing's recent work — bathrooms, plumbing and tiling across Staffordshire.",
};

// Placeholder categories — replace with real photo imports once Henry supplies images
const placeholders = [
  { label: "Bathroom Installation", count: 4 },
  { label: "Tiling", count: 3 },
  { label: "Plumbing", count: 3 },
  { label: "Bathroom Installation", count: 2 },
  { label: "Tiling", count: 2 },
  { label: "Plumbing", count: 2 },
];

export default function GalleryPage() {
  return (
    <>
      <section style={{ background: "#0A1A2F", padding: "70px 16px 60px" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>Work</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#FFFFFF", marginBottom: "14px" }}>
            Gallery
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", maxWidth: "520px", lineHeight: 1.7 }}>
            A selection of recent projects — bathroom installations, tiling and plumbing work across Staffordshire.
          </p>
        </div>
      </section>

      <section style={{ padding: "70px 16px 80px", background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">

          {/* Coming soon notice */}
          <div style={{ background: "#F2F4F7", border: "1px dashed #C0C5CC", borderRadius: "12px", padding: "40px", textAlign: "center", marginBottom: "40px" }}>
            <svg width="48" height="48" fill="none" stroke="#C0C5CC" strokeWidth={1.3} viewBox="0 0 24 24" style={{ margin: "0 auto 16px" }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.6rem", color: "#0A1A2F", marginBottom: "8px" }}>
              Photos coming soon
            </h2>
            <p style={{ color: "#4A5A72", fontSize: "0.95rem", maxWidth: "440px", margin: "0 auto" }}>
              Henry is busy on the tools — photos of recent bathroom installations, tiling and plumbing work will be added here shortly.
            </p>
          </div>

          {/* Placeholder grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                style={{ aspectRatio: "4/3", background: "#F2F4F7", border: "1px solid #D1D9E6", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg width="32" height="32" fill="none" stroke="#C0C5CC" strokeWidth={1.2} viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21,15 16,10 5,21"/>
                </svg>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: "60px", textAlign: "center" }}>
            <p style={{ color: "#4A5A72", marginBottom: "20px", fontSize: "0.95rem" }}>
              Want to see the quality of Henry&apos;s work in person? Get in touch.
            </p>
            <Link href="/quote" style={{ display: "inline-block", background: "#1E63D6", color: "#fff", padding: "14px 30px", borderRadius: "8px", fontWeight: 700, textDecoration: "none" }}>
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
