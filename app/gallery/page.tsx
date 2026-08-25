import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery — Bathroom Installations & Tiling",
  description: "Photos of Henry Ridge's completed bathroom installations and tiling work across Staffordshire.",
};

// Add photo filenames here when ready — e.g. "1.jpg", "2.jpg", "3.jpg" ...
// Lowest number = start of project, highest = finished result
const photos: string[] = Array.from({ length: 35 }, (_, i) => `${i + 1}.jpeg`);

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "#0A1A2F", padding: "70px 16px 60px" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>Our Work</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#FFFFFF", marginBottom: "14px" }}>
            One bathroom. Start to finish.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", maxWidth: "560px", lineHeight: 1.7 }}>
            Strip-out through to the finished suite — all work by Henry. Dark slate tiles, brushed bronze fixtures, fluted glass screen, and a built-in illuminated niche.
          </p>
        </div>
      </section>

      {photos.length === 0 ? (
        /* Placeholder while photos are being added */
        <section style={{ padding: "80px 16px", background: "#0A1A2F", textAlign: "center" }}>
          <div className="max-w-6xl mx-auto">
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>Photos coming shortly</p>
          </div>
        </section>
      ) : (
        /* Photo grid */
        <section style={{ padding: "60px 16px 80px", background: "#0A1A2F" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {photos.map((photo) => (
                <div key={photo} style={{ overflow: "hidden", borderRadius: "6px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/gallery/${photo}`}
                    alt="Bathroom installation by Henry Ridge Plumbing, Staffordshire"
                    loading="lazy"
                    style={{ width: "100%", display: "block" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ background: "#1E63D6", padding: "70px 16px", textAlign: "center" }}>
        <div className="max-w-xl mx-auto">
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "2.2rem", color: "#FFFFFF", marginBottom: "12px" }}>
            Want a bathroom like this?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: "28px" }}>
            Get a free, no-obligation quote — Henry will get back to you the same day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/quote" style={{ background: "#FFFFFF", color: "#0A1A2F", padding: "14px 30px", borderRadius: "8px", fontWeight: 700, textDecoration: "none" }}>
              Request a Quote
            </Link>
            <a href="tel:+447306800847" style={{ border: "2px solid rgba(255,255,255,0.4)", color: "#fff", padding: "14px 30px", borderRadius: "8px", fontWeight: 700, textDecoration: "none" }}>
              Call 07306 800847
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
