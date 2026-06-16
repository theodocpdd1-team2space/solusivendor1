import type { Metadata } from "next";
import { SiteButton } from "@/components/site/Button";
import { Section } from "@/components/site/Section";
import { SiteContainer } from "@/components/site/SiteContainer";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNavbar } from "@/components/site/SiteNavbar";

const siteUrl = "https://solusivendor.com";
const whatsappWeb =
  "https://wa.me/62895345902896?text=Halo%20SolusiVendor%2C%20saya%20mau%20mulai%20website%20149rb.";
const whatsappCustom =
  "https://wa.me/62895345902896?text=Halo%20SolusiVendor%2C%20saya%20mau%20konsultasi%20custom%20system.";

export const metadata: Metadata = {
  title: "SolusiVendor | Tech Solution untuk Website, Template, Hosting & Cloud",
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
  alternates: { canonical: siteUrl },
};

const products = [
  {
    label: "Web",
    title: "SolusiVendor Web",
    description:
      "Landing page, company profile, portfolio, pricelist, dan custom web untuk brand yang ingin tampil profesional.",
    href: whatsappWeb,
    cta: "Buat Website",
  },
  {
    label: "Templates",
    title: "SolusiVendor Templates",
    description:
      "Template HTML premium mulai 99rb untuk yang mau hemat, edit sendiri, dan online lebih cepat.",
    href: "/buytemplate",
    cta: "Lihat Template",
  },
  {
    label: "Cloud",
    title: "SolusiVendor Cloud",
    description:
      "Hosting, managed container, VPS hemat, domain, SSL, deployment, dan server setup untuk website atau app bisnis.",
    href: "/vps-service",
    cta: "Lihat Cloud",
  },
  {
    label: "Product by SolusiVendor",
    title: "DriveOne",
    description:
      "Storage dan file hosting untuk asset, katalog, file download, portfolio, backup ringan, dan client sharing.",
    href: "/driveone",
    cta: "Lihat DriveOne",
    drive: true,
  },
  {
    label: "Custom",
    title: "Custom System",
    description:
      "Admin panel, HR, sales system, form registrasi, dashboard, dan internal tools untuk operasional bisnis.",
    href: whatsappCustom,
    cta: "Konsultasi Custom",
  },
];

const cloudItems = [
  ["Static Hosting", "mulai 10rb/bulan", "HTML/CSS/JS, landing page, portfolio, company profile ringan."],
  ["Managed App Hosting", "mulai 49rb/bulan", "Next.js, Node.js, Laravel, dan app kecil dengan setup dibantu."],
  ["Managed Container VPS", "mulai 149rb/bulan", "Environment/container sendiri untuk project yang butuh resource lebih serius."],
];

const infra = [
  ["99%", "target uptime"],
  ["1 project", "1 environment"],
  ["24/7", "monitoring"],
  ["SSL", "included"],
  ["Firewall", "gateway"],
  ["Auto-restart", "recovery"],
  ["Backup", "config & database"],
  ["Cloudflare", "protected routing"],
];

const pricing = [
  ["Template DIY", "99rb", "Untuk yang mau edit sendiri.", "/buytemplate"],
  ["Website Terima Beres", "149rb", "Untuk brand/vendor/UMKM yang mau langsung online.", whatsappWeb],
  ["Static Hosting", "10rb/bulan", "Untuk HTML/CSS/JS, landing page, portfolio, dan company profile ringan.", "/vps-service"],
  ["Managed App Hosting", "mulai 49rb/bulan", "Untuk Next.js, Node.js, Laravel, dan app kecil.", "/vps-service"],
  ["Managed Container VPS", "mulai 149rb/bulan", "Environment/container sendiri untuk project yang butuh resource lebih serius.", "/vps-service"],
  ["DriveOne Storage", "DriveOne", "Storage dan file hosting dikelola di DriveOne, product by SolusiVendor.", "/driveone"],
  ["Custom System", "Custom", "Admin panel, HR, sales system, dashboard, dan sistem internal.", whatsappCustom],
];

const faqs = [
  ["Apakah SolusiVendor cuma untuk vendor event?", "Tidak. SolusiVendor bisa untuk brand, vendor, UMKM, jasa lokal, company profile, personal brand, komunitas, hingga bisnis yang butuh sistem custom."],
  ["Apa saja produk SolusiVendor?", "SolusiVendor punya Web, Templates, Cloud, dan Custom System. Untuk storage dan file hosting, kami arahkan ke DriveOne, produk storage by SolusiVendor."],
  ["Apa itu DriveOne?", "DriveOne adalah produk storage dan file hosting by SolusiVendor untuk menyimpan asset, katalog, portfolio, file download, materi client, dan backup ringan."],
  ["Kenapa storage dipisah ke DriveOne?", "Agar SolusiVendor tetap fokus sebagai platform tech, website, hosting, cloud, dan custom system. Sedangkan storage dikelola lebih serius sebagai produk sendiri lewat DriveOne."],
  ["Apa bedanya SolusiVendor Web dan Templates?", "Templates cocok untuk yang mau hemat dan edit sendiri. SolusiVendor Web cocok untuk yang ingin dibantu sampai website siap online."],
  ["Apa itu SolusiVendor Cloud?", "SolusiVendor Cloud adalah layanan hosting, managed container, dan VPS hemat untuk website atau app bisnis."],
  ["Apakah saya dapat root VPS?", "Untuk paket managed container, client mendapatkan environment/container sendiri, bukan akses root ke host utama. Ini dibuat agar lebih aman dan stabil."],
  ["Bisa untuk UMKM?", "Bisa. SolusiVendor dibuat untuk brand, vendor, UMKM, dan bisnis kecil yang ingin go digital."],
  ["Bisa kalau sudah punya domain?", "Bisa. Kami bantu arahkan DNS dari domain yang sudah kamu punya."],
  ["Bisa bantu domain dari provider lain?", "Bisa. Selama kamu punya akses DNS, kami bisa bantu arahkan domain ke website atau hosting kamu."],
  ["Kenapa harganya bisa murah?", "Karena sistem dibuat efisien, banyak workflow disederhanakan, dan fokus ke kebutuhan nyata bisnis kecil."],
  ["Apakah murah berarti murahan?", "Tidak. Kami tetap menyiapkan SSL, struktur website, hosting, monitoring, dan setup teknis dengan serius."],
  ["Bisa custom web?", "Bisa. Kami bisa bantu admin panel, sales system, HR sederhana, form registrasi, dashboard, dan sistem internal sesuai kebutuhan."],
  ["Bisa upgrade ke cloud/container?", "Bisa. Website sederhana bisa naik ke hosting, lalu ke managed app hosting atau container jika kebutuhan makin besar."],
];

export default function HomePage() {
  return (
    <div className="site-page">
      <SiteNavbar />
      <main>
        <section className="section-pad">
          <SiteContainer>
            <div className="grid gap-12 lg:grid-cols-[1.06fr_.94fr] lg:items-center">
              <div>
                <p className="eyebrow">SolusiVendor Tech Platform</p>
                <h1 className="display-title mt-5">
                  Tech solution untuk brand yang ingin go digital.
                </h1>
                <p className="mt-7 max-w-3xl text-xl leading-9 text-muted">
                  SolusiVendor membantu brand, vendor, UMKM, dan bisnis kecil
                  membangun website, template, hosting, managed cloud, dan
                  sistem digital yang siap dipakai untuk bertumbuh.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {["Web", "Templates", "Cloud", "DriveOne", "Custom System"].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/64">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <SiteButton href={whatsappWeb}>Mulai Website 149rb</SiteButton>
                  <SiteButton href="/vps-service" variant="secondary">Lihat Cloud</SiteButton>
                </div>
              </div>

              <div className="surface p-4">
                <div className="rounded-[20px] border border-white/10 bg-black/30 p-5">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <p className="text-sm font-semibold text-white">brand-workspace</p>
                      <p className="text-sm text-white/48">website → hosting → cloud</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                      Ready
                    </span>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {[
                      ["Web", "Company profile + WhatsApp CTA"],
                      ["Template", "HTML premium mulai 99rb"],
                      ["Cloud", "SSL, domain, container"],
                      ["DriveOne", "File hosting by SolusiVendor"],
                    ].map(([key, value]) => (
                      <div key={key} className="grid grid-cols-[7rem_1fr] gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm">
                        <span className="font-semibold text-white">{key}</span>
                        <span className="text-white/56">{value}</span>
                      </div>
                    ))}
                  </div>
                  <pre className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-[#080808] p-4 text-sm leading-7 text-white/62">
{`$ deploy website
✓ domain connected
✓ ssl active
✓ monitoring enabled`}
                  </pre>
                </div>
              </div>
            </div>
          </SiteContainer>
        </section>

        <Section
          id="web"
          eyebrow="Product ecosystem"
          title="Satu ekosistem untuk brand yang ingin online."
          description="Mulai dari website, template, hosting, cloud, sampai sistem custom. Storage dikelola melalui DriveOne, produk storage by SolusiVendor."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {products.map((product) => (
              <article key={product.title} className={`card p-5 ${product.drive ? "border-cyan-200/20 bg-cyan-200/10" : ""}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${product.drive ? "text-cyan-100/72" : "text-white/38"}`}>
                  {product.label}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">{product.title}</h3>
                <p className="mt-4 min-h-32 text-sm leading-7 text-white/58">{product.description}</p>
                <SiteButton href={product.href} variant="ghost" className="mt-5 px-0">
                  {product.cta}
                </SiteButton>
              </article>
            ))}
          </div>
        </Section>

        <Section
          title="Website yang siap dipakai jualan."
          description="SolusiVendor Web membantu brand, vendor, dan UMKM punya landing page, company profile, portfolio, pricelist, dan custom web dengan domain, SSL, dan CTA yang jelas."
          tone="light"
        >
          <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
            <div className="rounded-[var(--radius)] border border-black/10 bg-white p-6">
              <p className="eyebrow">SolusiVendor Web</p>
              <p className="mt-5 text-5xl font-heading font-semibold tracking-[-0.05em]">
                mulai 149rb
              </p>
              <p className="mt-4 text-black/62">
                Untuk yang ingin dibantu sampai website siap online.
              </p>
              <SiteButton href={whatsappWeb} className="mt-6">Mulai Website</SiteButton>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Landing page", "Company profile", "Portfolio", "Pricelist", "Custom web", "CTA WhatsApp"].map((item) => (
                <div key={item} className="rounded-3xl border border-black/10 bg-white p-5 text-lg font-semibold">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section
          eyebrow="Templates"
          title="Template HTML premium mulai 99rb."
          description="Untuk yang mau hemat, edit sendiri, dan online lebih cepat tanpa mulai dari halaman kosong."
        >
          <div className="flex flex-col gap-5 rounded-[var(--radius)] border border-white/10 bg-white/[0.035] p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-3xl font-heading font-semibold tracking-[-0.04em]">
                SolusiVendor Templates
              </h3>
              <p className="mt-3 max-w-2xl text-white/58">
                Template untuk portfolio, pricelist, layanan, testimoni, FAQ,
                dan tombol WhatsApp.
              </p>
            </div>
            <SiteButton href="/buytemplate" variant="secondary">Lihat Template</SiteButton>
          </div>
        </Section>

        <Section
          id="cloud"
          eyebrow="SolusiVendor Cloud"
          title="Hosting dan managed cloud untuk bisnis yang mulai serius."
          description="Jalankan website static, Next.js, Node.js, Laravel, atau app custom di environment/container sendiri tanpa perlu pusing setup server dari nol."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {cloudItems.map(([name, price, description]) => (
              <article key={name} className="card p-6">
                <p className="text-sm font-semibold text-[var(--primary)]">{name}</p>
                <h3 className="mt-4 text-3xl font-heading font-semibold tracking-[-0.04em]">{price}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-sm leading-7 text-white/62">
            Untuk keamanan, client mendapatkan environment/container sendiri.
            Akses root host, Docker socket, dan terminal utama server tidak
            diberikan.
          </p>
        </Section>

        <Section
          eyebrow="Infrastructure"
          title="Serius dari dasar."
          description="SolusiVendor Cloud dibangun dengan gateway, container isolation, monitoring, auto-restart, firewall, dan backup configuration agar website client tetap online dan aman."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {infra.map(([metric, label]) => (
              <div key={`${metric}-${label}`} className="card p-5">
                <p className="text-3xl font-heading font-semibold tracking-[-0.04em]">{metric}</p>
                <p className="mt-2 text-sm text-white/48">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-white/52">
            Hardware dapat terus di-upgrade, tapi arsitektur dibuat scalable sejak awal.
          </p>
        </Section>

        <Section
          eyebrow="DriveOne"
          title="File bisnis jangan tercecer di chat."
          description="Kenali DriveOne, produk storage by SolusiVendor untuk menyimpan, membagikan, dan mengelola file bisnis secara lebih rapi."
        >
          <div className="grid gap-6 rounded-[var(--radius)] border border-cyan-200/20 bg-cyan-200/10 p-6 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <h3 className="text-3xl font-heading font-semibold tracking-[-0.04em]">
                DriveOne by SolusiVendor
              </h3>
              <p className="mt-4 text-cyan-50/68">
                Untuk asset bisnis, foto/video portfolio, katalog produk, file
                download, materi client, backup ringan, client sharing, dan
                digital product delivery.
              </p>
              <SiteButton href="/driveone" variant="secondary" className="mt-6 border-cyan-100/20 text-cyan-50">
                Lihat DriveOne
              </SiteButton>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Asset bisnis", "Foto/video portfolio", "Katalog produk", "File download", "Materi client", "Backup ringan"].map((item) => (
                <div key={item} className="rounded-2xl border border-cyan-100/15 bg-black/18 p-4 text-sm text-cyan-50/78">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="pricing" eyebrow="Pricing" title="Mulai kecil, naik kelas saat kebutuhan makin serius.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pricing.map(([name, price, description, href], index) => (
              <article key={name} className={`card p-5 ${index === 1 ? "border-[var(--primary)] bg-[var(--primary)] text-white" : ""}`}>
                <p className="text-sm font-semibold text-white/62">{name}</p>
                <h3 className="mt-4 text-3xl font-heading font-semibold tracking-[-0.04em]">{price}</h3>
                <p className="mt-4 min-h-20 text-sm leading-7 opacity-70">{description}</p>
                <SiteButton href={href} variant={index === 1 ? "secondary" : "ghost"} className="mt-4 px-0">
                  Detail
                </SiteButton>
              </article>
            ))}
          </div>
        </Section>

        <Section id="faq" eyebrow="FAQ" title="Pertanyaan sebelum mulai go digital.">
          <div className="grid gap-3 lg:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <details key={question} className="card p-5">
                <summary className="cursor-pointer font-heading text-lg font-semibold tracking-[-0.02em]">
                  {question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-white/58">{answer}</p>
              </details>
            ))}
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
