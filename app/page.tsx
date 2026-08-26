import Link from "next/link";
import { services, AREAS } from "@/lib/services";

export default function HomePage() {
  const emergency = services.find((s) => s.slug === "emergency-repairs")!;
  const featured = services.filter((s) => s.slug !== "emergency-repairs").slice(0, 5);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, #0A1A2F 0%, #152640 60%, #1B3060 100%)", padding: "90px 16px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <div>
              <p className="text-xs font-semibold uppercase mb-5" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>
                Reliable · Professional · Local
              </p>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem, 6vw, 4rem)", color: "#FFFFFF", lineHeight: 1.05, marginBottom: "20px", letterSpacing: "-0.01em" }}>
                Staffordshire Plumber, Bathroom Fitter &amp; Tiler
              </h1>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "36px", maxWidth: "520px" }}>
                Professional plumbing, bathroom installations and tiling across Staffordshire. Evenings and weekends, honest pricing, and work you can be proud of.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote" className="font-semibold text-white px-8 py-4 rounded-md transition-colors text-base text-center" style={{ background: "#1E63D6" }}>
                  Get a Free Quote
                </Link>
                <a href="tel:+447306800847" className="font-semibold px-8 py-4 rounded-md border-2 transition-colors text-base text-center" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.05)" }}>
                  Call 07306 800847
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 mt-10 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                {[
                  { label: "Evenings & Weekends", sub: "Available after hours" },
                  { label: "Fair Pricing", sub: "No hidden costs" },
                  { label: "Local", sub: "Staffordshire based" },
                ].map(({ label, sub }) => (
                  <div key={label}>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#C0C5CC" }}>{label}</p>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem" }}>{sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — emergency card */}
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "16px", padding: "36px" }}>
              <p className="text-xs font-semibold uppercase mb-3" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em" }}>
                Direct Line
              </p>
              <a href="tel:+447306800847" style={{ display: "block", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "2.4rem", color: "#1E63D6", textDecoration: "none", letterSpacing: "-0.01em", marginBottom: "4px" }}>
                07306 800847
              </a>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", marginBottom: "28px" }}>
                Call me directly — no call centres, no waiting
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
                {[
                  { dot: "#4ADE80", text: "Available evenings &amp; weekends" },
                  { dot: "#1E63D6", text: "Burst pipes &amp; urgent repairs covered" },
                  { dot: "#1E63D6", text: "Staffordshire &amp; surrounding areas" },
                ].map(({ dot, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: dot, flexShrink: 0 }} />
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }} dangerouslySetInnerHTML={{ __html: text }} />
                  </div>
                ))}
              </div>

              <Link href="/quote" className="block text-center font-semibold text-white py-3.5 rounded-md transition-colors" style={{ background: "#1E63D6" }}>
                Request a Quote Online →
              </Link>

              <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-around", textAlign: "center" }}>
                {[["Plumbing", ""], ["Bathrooms", ""], ["Tiling", ""]].map(([label]) => (
                  <div key={label}>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#fff", fontSize: "1rem", letterSpacing: "0.05em" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services overview ─────────────────────────────────────────── */}
      <section style={{ padding: "90px 16px", background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>What I do</p>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0A1A2F", marginBottom: "14px" }}>
              Plumbing, bathrooms and tiling across Staffordshire
            </h2>
            <p style={{ color: "#4A5A72", maxWidth: "580px", fontSize: "1.05rem", lineHeight: 1.7 }}>
              From emergency repairs to full bathroom transformations — all work carried out to a high standard, on time, and without the drama.
            </p>
          </div>

          {/* Emergency card — full width */}
          <div style={{ background: "linear-gradient(135deg, #0A1A2F 0%, #152640 100%)", borderRadius: "12px", padding: "36px", marginBottom: "20px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
            <div>
              <p className="text-xs font-semibold uppercase mb-2" style={{ color: "#1E63D6", letterSpacing: "0.2em" }}>Emergency</p>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "#FFFFFF", marginBottom: "8px" }}>
                Emergency Leak &amp; Pipe Repair
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", maxWidth: "500px" }}>
                Burst pipe? Water where it shouldn&apos;t be? Call Henry directly for fast emergency response across Staffordshire.
              </p>
            </div>
            <a href="tel:+447306800847" style={{ background: "#1E63D6", color: "#fff", padding: "14px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "1.1rem", flexShrink: 0, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em" }}>
              Call Now: 07306 800847
            </a>
          </div>

          {/* Other services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.filter(s => s.slug !== "emergency-repairs").map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block"
                style={{ background: "#F2F4F7", border: "1px solid #D1D9E6", borderRadius: "12px", padding: "28px", textDecoration: "none", transition: "box-shadow 0.2s, border-color 0.2s" }}
              >
                <div style={{ width: "44px", height: "44px", background: "#EBF1FC", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  <svg width="22" height="22" fill="none" stroke="#1E63D6" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d={service.icon} />
                  </svg>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ background: "#EBF1FC", color: "#1E63D6", fontSize: "0.72rem", fontWeight: 600, padding: "4px 10px", borderRadius: "50px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {service.category}
                  </span>
                  <svg style={{ color: "#C0C5CC", transition: "color 0.2s" }} className="w-5 h-5 group-hover:text-hrp-blue" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#0A1A2F", marginBottom: "8px" }}>
                  {service.shortTitle}
                </h3>
                <p style={{ color: "#4A5A72", fontSize: "0.88rem", lineHeight: 1.65 }}>
                  {service.tagline}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" style={{ color: "#1E63D6", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}>
              View all services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bathroom showcase — Task #109 ─────────────────────────────── */}
      <section style={{ background: "#0A1A2F", padding: "90px 16px" }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-12">
            <div>
              <p className="text-xs font-semibold uppercase mb-4" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>Bathroom Installations</p>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#FFFFFF", lineHeight: 1.05, letterSpacing: "-0.01em" }}>
                One tradesman.<br />Start to finish.
              </h2>
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.75 }}>
                When you book me for a bathroom, you get me — from the strip-out to the final fixture. No subcontractors on your doorstep. No corners cut. Just a properly fitted bathroom, done right.
              </p>
            </div>
          </div>

          {/* Photo grid — large left + 2×2 right */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto auto", gap: "10px", marginBottom: "40px" }}>
            {/* Large left — spans 2 rows */}
            <div style={{ gridColumn: "1", gridRow: "1 / span 2", borderRadius: "10px", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gallery/35.jpg" alt="Completed bathroom by Henry Ridge Plumbing" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            {/* Top-right pair */}
            <div style={{ gridColumn: "2", gridRow: "1", borderRadius: "10px", overflow: "hidden", aspectRatio: "4/3" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gallery/34.jpg" alt="Completed bathroom by Henry Ridge Plumbing" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ gridColumn: "3", gridRow: "1", borderRadius: "10px", overflow: "hidden", aspectRatio: "4/3" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gallery/33.jpg" alt="Completed bathroom by Henry Ridge Plumbing" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            {/* Bottom-right pair */}
            <div style={{ gridColumn: "2", gridRow: "2", borderRadius: "10px", overflow: "hidden", aspectRatio: "4/3" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gallery/32.jpg" alt="Completed bathroom by Henry Ridge Plumbing" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ gridColumn: "3", gridRow: "2", borderRadius: "10px", overflow: "hidden", aspectRatio: "4/3" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gallery/31.jpg" alt="Completed bathroom by Henry Ridge Plumbing" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>

          {/* What's included */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              ["Strip-out", "Old suite, tiles, and boarding removed cleanly — full blank canvas."],
              ["Waterproof boarding", "Moisture-resistant substrate fitted throughout before a single tile goes on."],
              ["Plumbing & waste", "All pipework and waste connections laid to a proper standard."],
              ["Tiling & fitting", "Suite, screen, fixtures and tiling — all finished by one pair of hands."],
            ].map(([title, body]) => (
              <div key={title} style={{ borderTop: "2px solid #1E63D6", paddingTop: "16px" }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#FFFFFF", marginBottom: "8px" }}>{title}</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/gallery"
              style={{ display: "inline-block", background: "#1E63D6", color: "#fff", padding: "14px 30px", borderRadius: "8px", fontWeight: 700, textDecoration: "none" }}
            >
              See the full transformation →
            </Link>
            <Link
              href="/services/bathroom-installation"
              style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}
            >
              Bathroom installation service
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why choose Henry ─────────────────────────────────────────── */}
      <section style={{ padding: "90px 16px", background: "#F2F4F7" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>Why choose us</p>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0A1A2F", marginBottom: "16px" }}>
                A plumber who actually turns up
              </h2>
              <p style={{ color: "#4A5A72", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "32px" }}>
                I&apos;m a one-man operation — which means when you call, you speak to me. When I arrive, it&apos;s me doing the work. No subcontractors, no surprises.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  ["Fully qualified plumber", "Trained to the highest standard"],
                  ["Local to Staffordshire", "No travel time markups — quick to reach you"],
                  ["Honest, upfront quotes", "You'll know the price before work starts"],
                  ["Tidy, respectful worker", "Your home is treated with care"],
                  ["Public liability insured", "Full cover for your peace of mind"],
                ].map(([title, sub]) => (
                  <div key={title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div style={{ width: "24px", height: "24px", background: "#1E63D6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <svg width="12" height="12" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 14 14">
                        <polyline points="2,7 5,10 12,3"/>
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, color: "#0A1A2F", fontSize: "0.95rem", marginBottom: "2px" }}>{title}</p>
                      <p style={{ color: "#4A5A72", fontSize: "0.85rem" }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "16px", padding: "40px", textAlign: "center" }}>
              {/* Photo of Henry */}
              <div style={{ borderRadius: "12px", overflow: "hidden", marginBottom: "24px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/gallery/10.jpg" alt="Henry Ridge — plumber, bathroom fitter and tiler based in Staffordshire" style={{ width: "100%", display: "block", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#0A1A2F", marginBottom: "6px" }}>Henry Ridge</h3>
              <p style={{ color: "#1E63D6", fontSize: "0.88rem", fontWeight: 600, marginBottom: "14px" }}>Plumber · Bathroom Fitter · Tiler</p>
              <p style={{ color: "#4A5A72", fontSize: "0.9rem", lineHeight: 1.7 }}>
                Based in Staffordshire, I take pride in doing a proper job — no shortcuts, no mess left behind, and no inflated quotes.
              </p>
              <Link href="/about" style={{ display: "inline-block", marginTop: "20px", color: "#1E63D6", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Read more about me →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Areas covered ─────────────────────────────────────────────── */}
      <section style={{ padding: "70px 16px", background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div>
              <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>Coverage</p>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "2.2rem", color: "#0A1A2F", marginBottom: "14px" }}>
                Areas I cover
              </h2>
              <p style={{ color: "#4A5A72", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "20px" }}>
                Based in Staffordshire — covering the local area and surrounding towns. Not sure if I cover you? Just call.
              </p>
              <a href="tel:+447306800847" style={{ display: "inline-block", background: "#0A1A2F", color: "#fff", padding: "12px 24px", borderRadius: "8px", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem" }}>
                Check availability
              </a>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AREAS.map((area) => (
                <span key={area} style={{ background: "#F2F4F7", border: "1px solid #D1D9E6", borderRadius: "8px", padding: "10px 14px", fontSize: "0.85rem", fontWeight: 500, color: "#0A1A2F", textAlign: "center", display: "block" }}>
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote CTA ─────────────────────────────────────────────────── */}
      <section style={{ background: "#1E63D6", padding: "80px 16px", textAlign: "center" }}>
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#FFFFFF", marginBottom: "14px" }}>
            Need a plumber in Staffordshire?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", marginBottom: "36px" }}>
            Get a free, no-obligation quote. I&apos;ll get back to you the same day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="text-center" style={{ background: "#FFFFFF", color: "#0A1A2F", padding: "14px 32px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "1rem" }}>
              Request a Quote
            </Link>
            <a href="tel:+447306800847" className="text-center" style={{ border: "2px solid rgba(255,255,255,0.4)", color: "#fff", padding: "14px 32px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "1rem", background: "rgba(255,255,255,0.08)" }}>
              Call 07306 800847
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
