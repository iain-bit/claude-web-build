import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FOUNDERS,
  LEGAL_NAME,
  POSITIONING_STATEMENT,
  SITE_NAME,
  SITE_URL,
  SOCIALS,
  TAGLINE,
} from "@/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AI, Data & Data Centre Recruitment Sydney | Lumiq Talent",
  description:
    "Sydney-based specialist recruiter for AI, data, engineering and data centre talent. Human Judgement. Machine Speed.",
  applicationName: SITE_NAME,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_AU",
  },
};

/**
 * Tells Google and AI assistants who Lumiq Talent is: the site's name
 * (shown above search results instead of the bare domain), what kind of
 * business it is, where it's based, who founded it, and its social profiles.
 */
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: ["LumiqTalent", "lumiqtalent.com"],
    url: `${SITE_URL}/`,
    publisher: { "@id": `${SITE_URL}/#org` },
  },
  {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "@id": `${SITE_URL}/#org`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/lumiq-logo-green.png`,
    image: `${SITE_URL}/lumiq-logo-green.png`,
    slogan: TAGLINE,
    description: POSITIONING_STATEMENT,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    areaServed: { "@type": "Country", name: "Australia" },
    knowsAbout: [
      "AI and machine learning recruitment",
      "Data and analytics recruitment",
      "Data centre and infrastructure recruitment",
      "Software engineering recruitment",
    ],
    founder: FOUNDERS.map((f) => ({
      "@type": "Person",
      name: f.fullName,
      jobTitle: "Co-Founder",
      ...(f.sameAs.length ? { sameAs: f.sameAs } : {}),
    })),
    sameAs: Object.values(SOCIALS).filter(Boolean),
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
