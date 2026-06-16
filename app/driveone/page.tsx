import type { Metadata } from "next";
import { SiteButton } from "@/components/site/Button";
import { Section } from "@/components/site/Section";
import { SiteContainer } from "@/components/site/SiteContainer";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNavbar } from "@/components/site/SiteNavbar";

const whatsappDriveOne =
  "https://wa.me/62895345902896?text=Halo%20SolusiVendor%2C%20saya%20mau%20tanya%20DriveOne.";

export const metadata: Metadata = {
  title: "DriveOne by SolusiVendor",
  description:
    "DriveOne adalah produk storage dan file hosting by SolusiVendor untuk asset bisnis, katalog, portfolio, file download, materi client, dan backup ringan.",
};

const useCases = [
  "Asset bisnis",
  "Foto/video portfolio",
  "Katalog produk",
  "File download",
  "Materi client",
  "Backup ringan",
  "Client sharing",
  "Digital product delivery",
];

export default function DriveOnePage() {
  return (
    <div className="site-page">
      <SiteNavbar />
      <main>
        <section className="section-pad">
          <SiteContainer>
            <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
              <div>
                <p className="eyebrow text-cyan-200">Product by SolusiVendor</p>
                <h1 className="display-title mt-5">DriveOne by SolusiVendor</h1>
                <p className="mt-7 max-w-2xl text-xl leading-9 text-muted">
                  Storage dan file hosting untuk asset, portfolio, katalog, file
                  download, dan client sharing.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <SiteButton href={whatsappDriveOne}>Early Access via WhatsApp</SiteButton>
                  <SiteButton href="/" variant="secondary">Back to SolusiVendor</SiteButton>
                </div>
              </div>

              <div className="surface border-cyan-200/20 bg-cyan-200/10 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100/72">
                  Coming soon
                </p>
                <h2 className="mt-4 text-4xl font-heading font-semibold tracking-[-0.04em]">
                  File bisnis jangan tercecer di chat.
                </h2>
                <p className="mt-5 leading-8 text-cyan-50/68">
                  DriveOne sedang disiapkan sebagai produk terpisah by
                  SolusiVendor untuk menyimpan, membagikan, dan mengelola file
                  bisnis secara lebih rapi.
                </p>
              </div>
            </div>
          </SiteContainer>
        </section>

        <Section
          eyebrow="Use cases"
          title="Dibuat untuk file bisnis yang perlu rapi."
          description="DriveOne cocok untuk brand, vendor, kreator, agency, dan tim kecil yang sering mengirim asset atau materi client."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((item) => (
              <div key={item} className="card p-5 text-white/72">
                {item}
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.035] p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="eyebrow">Early access</p>
                <h2 className="section-title mt-3">Mau pakai DriveOne lebih awal?</h2>
              </div>
              <SiteButton href={whatsappDriveOne}>Konsultasi DriveOne</SiteButton>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
