import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://solusivendor.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "SolusiVendor | Tech Solution untuk Website, Template, Hosting & Cloud",
    template: "%s | SolusiVendor",
  },
  description:
    "SolusiVendor membantu brand, vendor, UMKM, dan bisnis kecil go digital lewat pembuatan website, template website, hosting, managed cloud, VPS hemat, dan custom web system. Storage tersedia melalui DriveOne, product by SolusiVendor.",
  keywords: [
    "jasa website UMKM",
    "jasa website vendor",
    "template website murah",
    "hosting murah UMKM",
    "managed container hosting",
    "VPS hemat Indonesia",
    "jasa landing page",
    "custom web UMKM",
    "SolusiVendor Cloud",
    "DriveOne storage",
    "file hosting Indonesia",
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
      "SolusiVendor | Tech Solution untuk Website, Template, Hosting & Cloud",
    description:
      "Tech solution untuk brand, vendor, UMKM, dan bisnis kecil yang ingin go digital lewat website, templates, hosting, managed cloud, VPS hemat, dan custom system.",
    images: [
      {
        url: "/og-solusivendor.jpg",
        width: 1200,
        height: 630,
        alt: "SolusiVendor - Tech Solution untuk Brand yang Ingin Go Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "SolusiVendor | Tech Solution untuk Website, Template, Hosting & Cloud",
    description:
      "Dari website pertama sampai cloud pertama untuk brand, vendor, UMKM, dan bisnis kecil.",
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
    "@type": "Organization",
    name: "SolusiVendor",
    url: siteUrl,
    logo: `${siteUrl}/solusivendorlogo.png`,
    image: `${siteUrl}/og-solusivendor.jpg`,
    description:
      "Tech solution untuk brand yang ingin go digital melalui website, templates, hosting, managed cloud, VPS hemat, dan custom web system.",
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    sameAs: ["https://solusivendor.com"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "SolusiVendor Product Ecosystem",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Website service",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Website Terima Beres",
              price: "149000",
              priceCurrency: "IDR",
              url: siteUrl,
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Hosting service",
          itemListElement: [
            {
              "@type": "Offer",
              name: "SolusiVendor Cloud",
              price: "10000",
              priceCurrency: "IDR",
              url: `${siteUrl}/vps-service`,
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Cloud/technology service",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Managed Container VPS",
              price: "149000",
              priceCurrency: "IDR",
              url: `${siteUrl}/vps-service`,
            },
          ],
        },
      ],
    },
    isRelatedTo: {
      "@type": "Product",
      name: "DriveOne",
      description:
        "DriveOne adalah produk storage dan file hosting by SolusiVendor.",
      url: `${siteUrl}/driveone`,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Template Website",
        price: "99000",
        priceCurrency: "IDR",
        url: `${siteUrl}/buytemplate`,
      },
      {
        "@type": "Offer",
        name: "SolusiVendor Cloud",
        price: "10000",
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
