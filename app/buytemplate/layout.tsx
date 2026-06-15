import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beli Template Website 99rb untuk Vendor dan UMKM",
  description:
    "Beli template website premium 99rb untuk vendor event, UMKM, portfolio, pricelist, landing page, dan CTA WhatsApp. Bisa edit sendiri dan upgrade ke hosting murah.",
  alternates: {
    canonical: "https://solusivendor.com/buytemplate",
  },
  openGraph: {
    title: "Beli Template Website 99rb | SolusiVendor",
    description:
      "Template website premium untuk vendor dan UMKM. Mulai 99rb, bisa edit sendiri, cocok untuk portfolio, pricelist, landing page, dan WhatsApp CTA.",
    url: "https://solusivendor.com/buytemplate",
    images: [
      {
        url: "/og-solusivendor.jpg",
        width: 1200,
        height: 630,
        alt: "Beli Template Website SolusiVendor",
      },
    ],
  },
};

export default function BuyTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
