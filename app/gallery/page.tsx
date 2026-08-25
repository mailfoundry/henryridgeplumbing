import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery — Bathroom Installations & Tiling",
  description: "Photos of Henry Ridge's completed bathroom installations and tiling work across Staffordshire — including a full dark slate and bronze bathroom transformation.",
};

// Finished bathroom — the completed result
const afterPhotos = [
  "after-2104.jpg", "after-2105.jpg", "after-2106.jpg", "after-2107.jpg",
  "after-2108.jpg", "after-2109.jpg", "after-2110.jpg", "after-2111.jpg",
  "after-2112.jpg", "after-2113.jpg", "after-2114.jpg", "after-2115.jpg",
  "after-2116.jpg", "after-2117.jpg", "after-2057.jpg", "after-2069.jpg",
  "after-2070.jpg", "after-2075.jpg", "after-2076.jpg", "after-2077.jpg",
  "after-2078.jpg", "after-2079.jpg", "after-2080.jpg", "after-2081.jpg",
];

// Construction — before and during
const duringPhotos = [
  "during-1976.jpg", "during-1977.jpg", "during-1978.jpg", "during-1979.jpg",
  "during-1982.jpg", "during-1983.jpg", "during-1984.jpg", "during-1985.jpg",
  "during-1986.jpg", "during-1993.jpg", "during-1994.jpg", "during-1995.jpg",
  "during-1996.jpg", "during-1997.jpg",
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "#0A1A2F", padding: "70px 16px 60px" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>Our Work</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#FFFFFF", marginBottom: "14px" }}>
            Gallery
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", maxWidth: "560px", lineHeight: 1.7 }}>
            One bathroom, start to finish — stripped out, plumbed, tiled, and fitted by Henry. Dark slate tiles, brushed bronze fixtures, and a result the client loves.
          </p>
        </div>
      </section>

      {/* Finished result */}
      <section style={{ padding: "70px 16px 80px", background: "#0A1A2F" }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ marginBottom: "40px" }}>
            <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>Completed</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#FFFFFF", marginBottom: "10px" }}>
              The finished bathroom
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem" }}>
              Dark slate-effect tiles · Brushed bronze fixtures · Fluted glass shower screen · Built-in illuminated niche
            </p>
          </div>

          <div
            style={{
              columns: "2 260px",
              columnGap: "12px",
            }}
          >
            {afterPhotos.map((photo) => (
              <div
                key={photo}
                style={{
                  breakInside: "avoid",
                  marginBottom: "12px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/gallery/${photo}`}
                  alt="Completed bathroom installation by Henry Ridge Plumbing"
                  loading="lazy"
                  style={{ width: "100%", display: "block", borderRadius: "8px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction journey */}
      <section style={{ padding: "70px 16px 80px", background: "#F2F4F7" }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ marginBottom: "40px" }}>
            <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>The journey</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#0A1A2F", marginBottom: "10px" }}>
              Before & during
            </h2>
            <p style={{ color: "#4A5A72", fontSize: "0.95rem", maxWidth: "520px" }}>
              Every Henry Ridge bathroom starts with a complete strip-out. New waterproof boarding, all new pipework — done properly from the substrate up.
            </p>
          </div>

          <div
            style={{
              columns: "2 240px",
              columnGap: "12px",
            }}
          >
            {duringPhotos.map((photo) => (
              <div
                key={photo}
                style={{
                  breakInside: "avoid",
                  marginBottom: "12px",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/gallery/${photo}`}
                  alt="Bathroom installation in progress by Henry Ridge Plumbing"
                  loading="lazy"
                  style={{ width: "100%", display: "block", borderRadius: "8px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

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
