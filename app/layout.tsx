import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import { SITE } from "@/lib/site";
import { Providers } from "@/components/providers";
import { EmergencyBar } from "@/components/emergency-bar";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { EmergencyDialog } from "@/components/emergency-dialog";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "24/7 commercial restoration, mitigation, and reconstruction across Southern California. IICRC certified. Insurance approved. On-site in 60 minutes or less.",
  keywords: [
    "commercial restoration",
    "water damage",
    "fire damage",
    "mold remediation",
    "storm response",
    "biohazard cleanup",
    "reconstruction",
    "Los Angeles",
    "Southern California",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "24/7 commercial restoration & reconstruction. 60-minute on-site response across Southern California.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: "24/7 commercial restoration & reconstruction in Southern California.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0F1C",
  width: "device-width",
  initialScale: 1,
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.zip,
    addressCountry: "US",
  },
  openingHours: "Mo-Su 00:00-24:00",
  areaServed: SITE.region,
  foundingDate: String(SITE.founded),
  priceRange: "$$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Script
          id="ld-localbusiness"
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Providers>
          <EmergencyBar />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <EmergencyDialog />
        </Providers>
      </body>
    </html>
  );
}
