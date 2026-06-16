import type { Metadata } from "next";
import { SiteButton } from "@/components/site/Button";
import { Section } from "@/components/site/Section";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNavbar } from "@/components/site/SiteNavbar";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Harga SolusiVendor untuk website, template, hosting, managed cloud, DriveOne, dan custom system.",
  alternates: {
    canonical: "https://solusivendor.com/pricing",
  },
};

const whatsappWeb =
  "https://wa.me/62895345902896?text=Halo%20SolusiVendor%2C%20saya%20mau%20mulai%20website%20149rb.";
const whatsappCustom =
  "https://wa.me/62895345902896?text=Halo%20SolusiVendor%2C%20saya%20mau%20konsultasi%20custom%20system.";

const plans = [
  ["Template DIY", "99rb", "Untuk yang mau edit sendiri.", "/buytemplate"],
  ["Website Terima Beres", "149rb", "Untuk brand/vendor/UMKM yang mau langsung online.", whatsappWeb],
  ["Static Hosting", "10rb/bulan", "Untuk HTML/CSS/JS dan landing page ringan.", "/vps-service"],
  ["Managed App Hosting", "mulai 49rb/bulan", "Untuk Next.js, Node.js, Laravel, dan app kecil.", "/vps-service"],
  ["Managed Container VPS", "mulai 149rb/bulan", "Environment/container sendiri untuk project lebih serius.", "/vps-service"],
  ["DriveOne Storage", "DriveOne", "Storage dan file hosting dikelola di DriveOne.", "/driveone"],
  ["Custom System", "Custom", "Admin panel, HR, sales system, dashboard, dan internal tools.", whatsappCustom],
];

export default function PricingPage() {
  return (
    <div className="site-page">
      <SiteNavbar />
      <main>
        <Section
          eyebrow="Pricing"
          title="Mulai kecil, naik kelas saat kebutuhan makin serius."
          description="Pilih jalur yang paling masuk akal untuk brand kamu: template, website terima beres, hosting, cloud, DriveOne, atau custom system."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {plans.map(([name, price, description, href], index) => (
              <article key={name} className={`card p-5 ${index === 1 ? "border-[var(--primary)] bg-[var(--primary)] text-white" : ""}`}>
                <p className="text-sm font-semibold text-white/62">{name}</p>
                <h2 className="mt-4 text-3xl font-heading font-semibold tracking-[-0.04em]">{price}</h2>
                <p className="mt-4 min-h-20 text-sm leading-7 opacity-70">{description}</p>
                <SiteButton href={href} variant={index === 1 ? "secondary" : "ghost"} className="mt-4 px-0">
                  Detail
                </SiteButton>
              </article>
            ))}
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
