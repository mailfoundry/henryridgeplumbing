"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50" style={{ background: "#0A1A2F", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
      {/* Top bar with ticker */}
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track { animation: ticker 32s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>
      <div style={{ background: "#0A1A2F", overflow: "hidden" }}>
        {/* Mobile top bar — phone only */}
        <div className="md:hidden flex items-center justify-between px-4" style={{ padding: "8px 16px" }}>
          <a href="tel:+447306800847" style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>
            📞 07306 800847
          </a>
          <a href="mailto:info@henryridgeplumbing.co.uk" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", textDecoration: "none" }}>
            info@henryridgeplumbing.co.uk
          </a>
        </div>
        {/* Desktop top bar — ticker + contacts */}
        <div className="hidden md:flex items-center justify-between gap-4" style={{ padding: "10px 0" }}>
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
          {/* Contact */}
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
            src="/hr-logo.png"
            alt="Henry Ridge Plumbing"
            width={100}
            height={100}
            className="h-20 w-20"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link href="/services" className="transition-colors" style={{ color: "rgba(255,255,255,0.8)" }}>Services</Link>
          <Link href="/about" className="transition-colors" style={{ color: "rgba(255,255,255,0.8)" }}>About</Link>
          <Link href="/gallery" className="transition-colors" style={{ color: "rgba(255,255,255,0.8)" }}>Gallery</Link>
          <Link href="/contact" className="transition-colors" style={{ color: "rgba(255,255,255,0.8)" }}>Contact</Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+447306800847"
            className="text-sm font-semibold transition-colors"
            style={{ color: "rgba(255,255,255,0.9)" }}
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
          style={{ color: "#FFFFFF" }}
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
          <div style={{ borderTop: "1px solid #F2F4F7", paddingTop: "12px" }}>
            <Link href="/admin" style={{ color: "#4A5A72", fontSize: "0.82rem" }} onClick={() => setOpen(false)}>
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
