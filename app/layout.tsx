import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Henry Ridge Plumbing | Staffordshire Plumber, Bathrooms & Tiling",
    template: "%s | Henry Ridge Plumbing",
  },
  description:
    "Local, reliable plumber serving Staffordshire and surrounding areas. Plumbing, bathroom installations and tiling. Emergency call-outs available. Call 07306 800847.",
  metadataBase: new URL("https://henryridgeplumbing.co.uk"),
  openGraph: {
    siteName: "Henry Ridge Plumbing",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* LocalBusiness schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Plumber",
              "name": "Henry Ridge Plumbing",
              "telephone": "+447306800847",
              "email": "info@henryridgeplumbing.co.uk",
              "url": "https://henryridgeplumbing.co.uk",
              "areaServed": ["Staffordshire", "Lichfield", "Cannock", "Tamworth", "Stafford", "Rugeley"],
              "description": "Local plumber offering plumbing, bathroom installation and tiling across Staffordshire.",
              "priceRange": "££",
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
