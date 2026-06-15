import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://solusivendor.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "SolusiVendor | Jasa Website Vendor, UMKM, Landing Page & Template Website",
    template: "%s | SolusiVendor",
  },
  description:
    "SolusiVendor membantu vendor event, UMKM, dan bisnis lokal punya website profesional mulai dari template 99rb, terima beres 149rb, hosting murah, domain, SSL, SEO basic, dan CTA WhatsApp.",
  keywords: [
    "jasa website vendor",
    "jasa website UMKM",
    "jasa website Surabaya",
    "jasa landing page",
    "template website murah",
    "website vendor event",
    "website sound system",
    "website wedding organizer",
    "website live streaming",
    "hosting murah UMKM",
    "SolusiVendor",
  ],
  authors: [{ name: "SolusiVendor by vjmrtim" }],
  creator: "SolusiVendor",
  publisher: "SolusiVendor",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "SolusiVendor",
    title:
      "SolusiVendor | Jasa Website Vendor, UMKM, Landing Page & Template Website",
    description:
      "Website profesional untuk vendor event, UMKM, dan bisnis lokal. Template 99rb, terima beres 149rb, hosting murah, domain, SSL, SEO basic, dan CTA WhatsApp.",
    images: [
      {
        url: "/og-solusivendor.jpg",
        width: 1200,
        height: 630,
        alt: "SolusiVendor - Jasa Website Vendor dan UMKM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "SolusiVendor | Jasa Website Vendor, UMKM, Landing Page & Template Website",
    description:
      "Template website 99rb, terima beres 149rb, hosting murah, domain, SSL, SEO basic, dan CTA WhatsApp untuk vendor dan UMKM.",
    images: ["/og-solusivendor.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SolusiVendor",
    url: siteUrl,
    logo: `${siteUrl}/solusivendorlogo.png`,
    image: `${siteUrl}/og-solusivendor.jpg`,
    description:
      "Jasa pembuatan website untuk vendor event, UMKM, landing page, template website, hosting murah, domain, SSL, dan SEO basic.",
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surabaya",
      addressRegion: "Jawa Timur",
      addressCountry: "ID",
    },
    sameAs: ["https://solusivendor.com"],
    offers: [
      {
        "@type": "Offer",
        name: "Template Website",
        price: "99000",
        priceCurrency: "IDR",
        url: `${siteUrl}/templates`,
      },
      {
        "@type": "Offer",
        name: "Managed Hosting Vendor",
        price: "49000",
        priceCurrency: "IDR",
        url: `${siteUrl}/vps-service`,
      },
      {
        "@type": "Offer",
        name: "Website Terima Beres",
        price: "149000",
        priceCurrency: "IDR",
        url: siteUrl,
      },
    ],
  };

  return (
    <html lang="id">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
