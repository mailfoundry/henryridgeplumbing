"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: "#D1D9E6" }}>
      {/* Top bar with ticker */}
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track { animation: ticker 32s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>
      <div style={{ background: "#0A1A2F", padding: "10px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          {/* Scrolling towns */}
          <div style={{ flex: 1, overflow: "hidden", position: "relative", minWidth: 0 }}>
            <div className="ticker-track" style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}>
              {[...Array(2)].map((_, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 0 }}>
                  {[
                    "Stoke-on-Trent","Werrington","Bucknall","Milton","Longton",
                    "Kidsgrove","Newcastle-under-Lyme","Biddulph","Hanley","Fenton",
                    "Trentham","Blurton","Meir","Stafford","Stone","Uttoxeter","Penkridge",
                  ].map((town) => (
                    <span key={town} style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.72rem", letterSpacing: "0.08em", padding: "0 14px" }}>
                      {town} <span style={{ color: "#1E63D6", margin: "0 2px" }}>✦</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          {/* Contact — static right side */}
          <div className="flex gap-5 shrink-0 pr-4" style={{ fontSize: "0.72rem" }}>
            <a href="mailto:info@henryridgeplumbing.co.uk" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", whiteSpace: "nowrap" }}>
              info@henryridgeplumbing.co.uk
            </a>
            <a href="tel:+447306800847" style={{ color: "rgba(255,255,255,0.95)", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
              07306 800847
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/henry-ridge-plumbing-horizontal.svg"
            alt="Henry Ridge Plumbing"
            width={200}
            height={52}
            className="h-12 w-auto"
            priority
          />
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
