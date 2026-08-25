import type { Metadata } from "next";
import Link from "next/link";
import { AREAS } from "@/lib/services";

export const metadata: Metadata = {
  title: "About",
  description: "Henry Ridge — local Staffordshire plumber offering plumbing, bathroom fitting and tiling.",
};

export default function AboutPage() {
  return (
    <>
      <section style={{ background: "#0A1A2F", padding: "70px 16px 60px" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>About Henry</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#FFFFFF", marginBottom: "14px" }}>
            A plumber you can actually rely on
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", maxWidth: "560px", lineHeight: 1.7 }}>
            Based in Staffordshire, I work to a standard I&apos;d be happy with in my own home — every time, no exceptions.
          </p>
        </div>
      </section>

      <section style={{ padding: "70px 16px", background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Photo of Henry */}
          <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #D1D9E6" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gallery/10.jpg" alt="Henry Ridge — plumber, bathroom fitter and tiler based in Staffordshire" style={{ width: "100%", display: "block", objectFit: "cover" }} />
          </div>

          {/* Bio */}
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#0A1A2F", marginBottom: "6px" }}>Henry Ridge</h2>
            <p style={{ color: "#1E63D6", fontWeight: 600, fontSize: "0.95rem", marginBottom: "24px" }}>Plumber · Bathroom Fitter · Tiler</p>

            <p style={{ color: "#4A5A72", fontSize: "1rem", lineHeight: 1.8, marginBottom: "18px" }}>
              I&apos;m a fully qualified plumber based in Staffordshire. I specialise in plumbing, bathroom installations and tiling, and bring a straightforward, no-nonsense approach to every job — from replacing a leaking tap to fitting a complete bathroom from scratch.
            </p>
            <p style={{ color: "#4A5A72", fontSize: "1rem", lineHeight: 1.8, marginBottom: "18px" }}>
              When you book with me, you get me. No subcontractors, no third parties on your doorstep. I take the time to understand what you need, give you an honest quote, and deliver work that lasts.
            </p>
            <p style={{ color: "#4A5A72", fontSize: "1rem", lineHeight: 1.8, marginBottom: "32px" }}>
              I cover Staffordshire and the surrounding area, offering emergency call-outs for burst pipes and major leaks as well as planned work for bathroom transformations and general plumbing repairs.
            </p>

            {/* Values */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                ["Honest pricing", "You&apos;ll get a clear quote upfront — no surprise additions once work is underway."],
                ["Tidy working", "I leave your home as I find it — mess cleared, tools packed away."],
                ["Local knowledge", "Covering Staffordshire means quick response times and no inflated travel charges."],
                ["Fully insured", "Public liability insurance in place for your complete peace of mind."],
              ].map(([title, body]) => (
                <div key={title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1E63D6", marginTop: "9px", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontWeight: 700, color: "#0A1A2F", fontSize: "0.95rem", marginBottom: "3px" }} dangerouslySetInnerHTML={{ __html: title }} />
                    <p style={{ color: "#4A5A72", fontSize: "0.88rem", lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: body }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section style={{ padding: "70px 16px", background: "#F2F4F7" }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#0A1A2F", marginBottom: "10px" }}>
            Areas covered
          </h2>
          <p style={{ color: "#4A5A72", marginBottom: "28px", fontSize: "0.95rem" }}>
            Covering Stoke-on-Trent and the surrounding area. Not sure if I cover you? Just call.
          </p>
          <div className="flex flex-wrap gap-3">
            {AREAS.map((area) => (
              <span key={area} style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "50px", padding: "8px 18px", fontSize: "0.88rem", fontWeight: 500, color: "#0A1A2F" }}>
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#1E63D6", padding: "70px 16px", textAlign: "center" }}>
        <div className="max-w-xl mx-auto">
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "2.2rem", color: "#FFFFFF", marginBottom: "12px" }}>
            Ready to get started?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: "28px" }}>
            Get a free, no-obligation quote — I&apos;ll get back to you the same day.
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
