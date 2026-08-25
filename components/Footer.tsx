import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/services";

export default function Footer() {
  return (
    <footer style={{ background: "#0A1A2F", color: "rgba(255,255,255,0.65)" }}>
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/henry-ridge-plumbing-primary-stacked.svg"
                alt="Henry Ridge Plumbing"
                width={160}
                height={80}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
              Reliable. Professional. Local.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              Plumbing, bathroom installation and tiling across Staffordshire and surrounding areas.
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:+447306800847" className="flex items-center gap-3 text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.75)" }}>
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.62 3.48 2 2 0 013.64 1.27h3a2 2 0 012 1.72c.13.96.36 1.9.72 2.81a2 2 0 01-.45 2.11L7.91 8.91a16 16 0 006.18 6.18l1-1a2 2 0 012.11-.45c.91.36 1.85.59 2.81.72A2 2 0 0122 16.92z"/>
                </svg>
                07306 800847
              </a>
              <a href="mailto:info@henryridgeplumbing.co.uk" className="flex items-center gap-3 text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.75)" }}>
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                info@henryridgeplumbing.co.uk
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold uppercase mb-5" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em" }}>Services</p>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase mb-5" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em" }}>Company</p>
            <ul className="flex flex-col gap-3">
              {[["About", "/about"], ["Gallery", "/gallery"], ["Contact", "/contact"], ["Get a Quote", "/quote"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs" style={{ color: "rgba(255,255,255,0.35)", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px" }}>
          <span>© {new Date().getFullYear()} Henry Ridge Plumbing. All rights reserved.</span>
          <span>Staffordshire &amp; surrounding areas</span>
        </div>
      </div>
    </footer>
  );
}
