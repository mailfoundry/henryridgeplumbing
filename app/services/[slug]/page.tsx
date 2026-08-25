import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getServiceBySlug } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.tagline,
  };
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0A1A2F 0%, #152640 100%)", padding: "70px 16px 60px" }}>
        <div className="max-w-6xl mx-auto">
          <nav style={{ marginBottom: "24px", fontSize: "0.85rem", color: "rgba(255,255,255,0.45)" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <Link href="/services" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Services</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>{service.shortTitle}</span>
          </nav>
          <p className="text-xs font-semibold uppercase mb-3" style={{ color: "#1E63D6", letterSpacing: "0.25em" }}>{service.category}</p>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#FFFFFF", marginBottom: "14px" }}>
            {service.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: "620px", marginBottom: "32px" }}>
            {service.tagline}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/quote" style={{ background: "#1E63D6", color: "#fff", padding: "13px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none" }}>
              Get a Quote
            </Link>
            {service.emergencyAvailable && (
              <a href="tel:+447306800847" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "13px 28px", borderRadius: "8px", fontWeight: 600, textDecoration: "none", background: "rgba(255,255,255,0.05)" }}>
                Emergency: 07306 800847
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: "70px 16px", background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Content */}
          <div className="lg:col-span-2">
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#0A1A2F", marginBottom: "16px" }}>
              About this service
            </h2>
            <p style={{ color: "#4A5A72", fontSize: "1rem", lineHeight: 1.8, marginBottom: "36px" }}>
              {service.description}
            </p>

            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#0A1A2F", marginBottom: "16px" }}>
              What&apos;s included
            </h3>
            <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px", marginBottom: "40px" }}>
              {service.features.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "14px 16px", background: "#F2F4F7", border: "1px solid #D1D9E6", borderRadius: "8px" }}>
                  <div style={{ width: "20px", height: "20px", background: "#1E63D6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 12 12">
                      <polyline points="1.5,6 4.5,9 10.5,3"/>
                    </svg>
                  </div>
                  <span style={{ color: "#0A1A2F", fontSize: "0.88rem", fontWeight: 500 }}>{f}</span>
                </li>
              ))}
            </ul>

            {service.emergencyAvailable && (
              <div style={{ background: "#FFF8F0", border: "1px solid #F0D9B5", borderRadius: "10px", padding: "24px", marginBottom: "32px" }}>
                <p style={{ fontWeight: 700, color: "#0A1A2F", marginBottom: "6px" }}>Emergency call-outs available</p>
                <p style={{ color: "#4A5A72", fontSize: "0.9rem" }}>
                  For urgent situations, call me directly on <a href="tel:+447306800847" style={{ color: "#1E63D6", fontWeight: 600 }}>07306 800847</a>. I&apos;ll be with you as soon as possible.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ background: "#0A1A2F", borderRadius: "12px", padding: "28px", marginBottom: "20px" }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#FFFFFF", marginBottom: "16px" }}>
                Get a free quote
              </h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", marginBottom: "20px", lineHeight: 1.6 }}>
                Describe your job and I&apos;ll get back to you the same day.
              </p>
              <Link href="/quote" style={{ display: "block", background: "#1E63D6", color: "#fff", padding: "13px 20px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", textAlign: "center", marginBottom: "14px" }}>
                Request a Quote
              </Link>
              <a href="tel:+447306800847" style={{ display: "block", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)", padding: "11px 20px", borderRadius: "8px", fontWeight: 600, textDecoration: "none", textAlign: "center", fontSize: "0.9rem" }}>
                Call 07306 800847
              </a>
            </div>

            {/* Areas */}
            <div style={{ background: "#F2F4F7", border: "1px solid #D1D9E6", borderRadius: "12px", padding: "24px" }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#0A1A2F", marginBottom: "12px" }}>
                Service area
              </h3>
              <p style={{ color: "#4A5A72", fontSize: "0.88rem", lineHeight: 1.65 }}>
                Covering Staffordshire and surrounding areas including Lichfield, Cannock, Tamworth, Stafford, Rugeley and more.
              </p>
              <Link href="/#areas" style={{ display: "inline-block", marginTop: "12px", color: "#1E63D6", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                See full coverage →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section style={{ padding: "60px 16px 80px", background: "#F2F4F7" }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#0A1A2F", marginBottom: "24px" }}>
            Other services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} style={{ background: "#FFFFFF", border: "1px solid #D1D9E6", borderRadius: "10px", padding: "22px", textDecoration: "none", display: "block" }}>
                <span style={{ display: "inline-block", background: "#EBF1FC", color: "#1E63D6", fontSize: "0.7rem", fontWeight: 600, padding: "3px 10px", borderRadius: "50px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "10px" }}>
                  {s.category}
                </span>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#0A1A2F", marginBottom: "6px" }}>{s.shortTitle}</h3>
                <p style={{ color: "#4A5A72", fontSize: "0.84rem" }}>{s.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
