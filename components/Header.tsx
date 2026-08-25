"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: "#D1D9E6" }}>
      {/* Top bar */}
      <div style={{ background: "#0A1A2F", padding: "6px 0" }}>
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
          <span>Serving Staffordshire &amp; surrounding areas</span>
          <div className="flex gap-5">
            <a href="mailto:info@henryridgeplumbing.co.uk" style={{ color: "rgba(255,255,255,0.75)" }} className="hover:text-white transition-colors">
              info@henryridgeplumbing.co.uk
            </a>
            <a href="tel:+447306800847" style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }} className="hover:text-white transition-colors">
              07306 800847
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none shrink-0">
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.45rem", color: "#0A1A2F", letterSpacing: "0.03em", textTransform: "uppercase" }}>
            Henry Ridge
          </span>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#1E63D6", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            — Plumbing —
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium" style={{ color: "#0A1A2F" }}>
          <Link href="/services" className="hover:text-hrp-blue transition-colors" style={{ color: "#0A1A2F" }}>Services</Link>
          <Link href="/about" className="hover:text-hrp-blue transition-colors" style={{ color: "#0A1A2F" }}>About</Link>
          <Link href="/gallery" className="hover:text-hrp-blue transition-colors" style={{ color: "#0A1A2F" }}>Gallery</Link>
          <Link href="/contact" className="hover:text-hrp-blue transition-colors" style={{ color: "#0A1A2F" }}>Contact</Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+447306800847"
            className="text-sm font-semibold transition-colors"
            style={{ color: "#1E63D6" }}
          >
            07306 800847
          </a>
          <Link
            href="/quote"
            className="text-sm font-semibold text-white px-5 py-2.5 rounded-md transition-colors"
            style={{ background: "#1E63D6" }}
            onMouseOver={e => (e.currentTarget.style.background = "#1550B8")}
            onMouseOut={e => (e.currentTarget.style.background = "#1E63D6")}
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1"
          style={{ color: "#0A1A2F" }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-4 text-sm font-medium" style={{ borderColor: "#D1D9E6", background: "#fff" }}>
          {[["Services", "/services"], ["About", "/about"], ["Gallery", "/gallery"], ["Contact", "/contact"]].map(([label, href]) => (
            <Link key={href} href={href} style={{ color: "#0A1A2F" }} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link href="/quote" className="text-center text-white font-semibold py-3 rounded-md" style={{ background: "#1E63D6" }} onClick={() => setOpen(false)}>
            Get a Free Quote
          </Link>
          <a href="tel:+447306800847" className="text-center font-semibold py-3 rounded-md border" style={{ color: "#1E63D6", borderColor: "#1E63D6" }}>
            Call 07306 800847
          </a>
        </div>
      )}
    </header>
  );
}
