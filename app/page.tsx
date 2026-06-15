import type { Metadata } from "next";
import Link from "next/link";

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
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "SolusiVendor",
    title: "SolusiVendor | Tech Solution untuk Website, Template, Hosting & Cloud",
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
    title: "SolusiVendor | Tech Solution untuk Website, Template, Hosting & Cloud",
    description:
      "Dari website pertama sampai cloud pertama untuk brand, vendor, UMKM, dan bisnis kecil.",
    images: ["/og-solusivendor.jpg"],
  },
};

const navItems = [
  { label: "Web", href: "#web" },
  { label: "Templates", href: "/buytemplate" },
  { label: "Cloud", href: "/vps-service" },
  { label: "DriveOne", href: "/driveone" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const heroBadges = [
  "Website",
  "Templates",
  "Cloud",
  "Custom System",
  "DriveOne by SolusiVendor",
];

const products = [
  {
    eyebrow: "Web",
    title: "SolusiVendor Web",
    description:
      "Landing page, company profile, portfolio, pricelist, dan custom web untuk brand yang ingin tampil profesional.",
    cta: "Buat Website",
    href: whatsappWeb,
  },
  {
    eyebrow: "Marketplace",
    title: "SolusiVendor Templates",
    description:
      "Template HTML premium mulai 99rb untuk yang mau hemat, edit sendiri, dan online lebih cepat.",
    cta: "Lihat Template",
    href: "/buytemplate",
  },
  {
    eyebrow: "Cloud",
    title: "SolusiVendor Cloud",
    description:
      "Hosting, managed container, VPS hemat, domain, SSL, deployment, dan server setup untuk website atau app bisnis.",
    cta: "Lihat Cloud",
    href: "/vps-service",
  },
  {
    eyebrow: "Product by SolusiVendor",
    title: "DriveOne",
    description:
      "Storage dan file hosting untuk asset, katalog, file download, portfolio, backup ringan, dan client sharing.",
    cta: "Lihat DriveOne",
    href: "/driveone",
    accent: true,
  },
  {
    eyebrow: "Custom",
    title: "Custom System",
    description:
      "Admin panel, HR, sales system, form registrasi, dashboard, dan internal tools untuk operasional bisnis.",
    cta: "Konsultasi Custom",
    href: whatsappCustom,
  },
];

const driveOneUseCases = [
  "Asset bisnis",
  "Foto/video portfolio",
  "Katalog produk",
  "File download",
  "Materi client",
  "Backup ringan",
  "Client sharing",
  "Digital product delivery",
];

const cloudPoints = [
  "Static hosting mulai 10rb/bulan",
  "Managed app hosting mulai 49rb/bulan",
  "Managed container VPS mulai 149rb/bulan",
  "SSL included",
  "Custom domain support",
  "Environment/container sendiri",
  "Admin-assisted provisioning untuk MVP",
  "No root host access untuk keamanan",
];

const infraCards = [
  ["99%", "target uptime"],
  ["1 project", "1 environment/container"],
  ["24/7", "uptime monitoring"],
  ["SSL", "included"],
  ["Firewall", "protected gateway"],
  ["Auto-restart", "service recovery"],
  ["Backup", "config & database backup"],
  ["Cloudflare", "protected routing"],
];

const pricing = [
  {
    name: "Template DIY",
    price: "99rb",
    description: "Untuk yang mau edit sendiri.",
    href: "/buytemplate",
    cta: "Lihat Template",
  },
  {
    name: "Website Terima Beres",
    price: "149rb",
    description: "Untuk brand/vendor/UMKM yang mau langsung online.",
    href: whatsappWeb,
    cta: "Mulai Website",
    highlight: true,
  },
  {
    name: "Static Hosting",
    price: "10rb/bulan",
    description: "Untuk HTML/CSS/JS, landing page, portfolio, dan company profile ringan.",
    href: "/vps-service",
    cta: "Lihat Hosting",
  },
  {
    name: "Managed App Hosting",
    price: "mulai 49rb/bulan",
    description: "Untuk Next.js, Node.js, Laravel, dan app kecil.",
    href: "/vps-service",
    cta: "Lihat Cloud",
  },
  {
    name: "Managed Container VPS",
    price: "mulai 149rb/bulan",
    description: "Environment/container sendiri untuk project yang butuh resource lebih serius.",
    href: "/vps-service",
    cta: "Lihat VPS",
  },
  {
    name: "DriveOne Storage",
    price: "link ke DriveOne",
    description: "Storage dan file hosting dikelola di DriveOne, product by SolusiVendor.",
    href: "/driveone",
    cta: "Lihat DriveOne",
  },
  {
    name: "Custom System",
    price: "Custom",
    description: "Admin panel, HR, sales system, dashboard, dan sistem internal.",
    href: whatsappCustom,
    cta: "Konsultasi",
  },
];

const faqs = [
  [
    "Apakah SolusiVendor cuma untuk vendor event?",
    "Tidak. SolusiVendor bisa untuk brand, vendor, UMKM, jasa lokal, company profile, personal brand, komunitas, hingga bisnis yang butuh sistem custom.",
  ],
  [
    "Apa saja produk SolusiVendor?",
    "SolusiVendor punya Web, Templates, Cloud, dan Custom System. Untuk storage dan file hosting, kami arahkan ke DriveOne, produk storage by SolusiVendor.",
  ],
  [
    "Apa itu DriveOne?",
    "DriveOne adalah produk storage dan file hosting by SolusiVendor untuk menyimpan asset, katalog, portfolio, file download, materi client, dan backup ringan.",
  ],
  [
    "Kenapa storage dipisah ke DriveOne?",
    "Agar SolusiVendor tetap fokus sebagai platform tech, website, hosting, cloud, dan custom system. Sedangkan storage dikelola lebih serius sebagai produk sendiri lewat DriveOne.",
  ],
  [
    "Apa bedanya SolusiVendor Web dan Templates?",
    "Templates cocok untuk yang mau hemat dan edit sendiri. SolusiVendor Web cocok untuk yang ingin dibantu sampai website siap online.",
  ],
  [
    "Apa itu SolusiVendor Cloud?",
    "SolusiVendor Cloud adalah layanan hosting, managed container, dan VPS hemat untuk website atau app bisnis.",
  ],
  [
    "Apakah saya dapat root VPS?",
    "Untuk paket managed container, client mendapatkan environment/container sendiri, bukan akses root ke host utama. Ini dibuat agar lebih aman dan stabil.",
  ],
  [
    "Bisa untuk UMKM?",
    "Bisa. SolusiVendor dibuat untuk brand, vendor, UMKM, dan bisnis kecil yang ingin go digital.",
  ],
  [
    "Bisa kalau sudah punya domain?",
    "Bisa. Kami bantu arahkan DNS dari domain yang sudah kamu punya.",
  ],
  [
    "Bisa bantu domain dari Rumahweb/Cloudflare/provider lain?",
    "Bisa. Selama kamu punya akses DNS, kami bisa bantu arahkan domain ke website atau hosting kamu.",
  ],
  [
    "Kenapa harganya bisa murah?",
    "Karena sistem dibuat efisien, banyak workflow disederhanakan, dan fokus ke kebutuhan nyata bisnis kecil.",
  ],
  [
    "Apakah murah berarti murahan?",
    "Tidak. Kami tetap menyiapkan SSL, struktur website, hosting, monitoring, dan setup teknis dengan serius.",
  ],
  [
    "Bisa custom web?",
    "Bisa. Kami bisa bantu admin panel, sales system, HR sederhana, form registrasi, dashboard, dan sistem internal sesuai kebutuhan.",
  ],
  [
    "Bisa upgrade ke cloud/container?",
    "Bisa. Website sederhana bisa naik ke hosting, lalu ke managed app hosting atau container jika kebutuhan makin besar.",
  ],
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f0e8]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 px-4 py-4 backdrop-blur md:px-8">
        <nav className="mx-auto flex max-w-[92rem] flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-light tracking-[-0.06em]">
            SOLUSI<span className="font-bold text-[#ff2f1f]">VENDOR</span>
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-white/55">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-full border border-white/15 px-4 py-2 hover:bg-white hover:text-black"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
              SolusiVendor Tech Platform
            </p>
            <h1 className="mt-6 max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.07em] md:text-8xl">
              Tech solution untuk brand yang ingin go digital.
            </h1>
            <p className="mt-8 max-w-3xl text-lg font-light leading-8 text-white/62 md:text-xl md:leading-9">
              SolusiVendor membantu brand, vendor, UMKM, dan bisnis kecil punya
              website, template, hosting, managed cloud, dan sistem digital yang
              siap dipakai untuk bertumbuh.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {heroBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/60"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappWeb}
                className="rounded-full bg-[#ff2f1f] px-7 py-4 text-center text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
              >
                Mulai Website 149rb
              </a>
              <Link
                href="/vps-service"
                className="rounded-full border border-white/15 px-7 py-4 text-center text-sm font-bold uppercase text-white/80 transition hover:bg-white hover:text-black"
              >
                Lihat SolusiVendor Cloud
              </Link>
              <Link
                href="/driveone"
                className="rounded-full border border-cyan-300/25 px-7 py-4 text-center text-sm font-bold uppercase text-cyan-100 transition hover:bg-cyan-100 hover:text-black"
              >
                Lihat DriveOne
              </Link>
            </div>
          </div>

          <div className="rounded-[1rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/40">
            <div className="rounded-[.75rem] border border-white/10 bg-black/35 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/35">
                    Ecosystem
                  </p>
                  <p className="mt-3 text-3xl font-light tracking-[-0.04em]">
                    Dari website pertama sampai cloud pertama.
                  </p>
                </div>
                <span className="rounded-full bg-[#ff2f1f] px-3 py-1 text-xs font-bold uppercase text-white">
                  Go digital
                </span>
              </div>
              <div className="mt-6 grid gap-3">
                {["Web", "Templates", "Cloud", "Custom System"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-[.75rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm"
                  >
                    <span className="font-bold">{item}</span>
                    <span className="text-white/45">SolusiVendor</span>
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-[.75rem] border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm">
                  <span className="font-bold text-cyan-50">DriveOne</span>
                  <span className="text-cyan-50/60">Product by SolusiVendor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="web" className="border-y border-white/10 bg-white/[0.025] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[92rem]">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
              Product ecosystem
            </p>
            <h2 className="mt-4 text-4xl font-light tracking-[-0.06em] md:text-6xl">
              Satu ekosistem untuk brand yang ingin online.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/55">
              Mulai dari website, template, hosting, cloud, sampai sistem custom.
              Storage dikelola melalui DriveOne, produk storage by SolusiVendor.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {products.map((product) => (
              <article
                key={product.title}
                className={`rounded-[1rem] border p-5 ${
                  product.accent
                    ? "border-cyan-300/25 bg-cyan-300/10"
                    : "border-white/10 bg-white/[0.045]"
                }`}
              >
                <p className={`text-xs font-bold uppercase tracking-[0.2em] ${product.accent ? "text-cyan-100/70" : "text-white/35"}`}>
                  {product.eyebrow}
                </p>
                <h3 className="mt-4 text-2xl font-light tracking-[-0.04em]">
                  {product.title}
                </h3>
                <p className="mt-4 min-h-32 text-sm leading-7 text-white/58">
                  {product.description}
                </p>
                <Link
                  href={product.href}
                  className="mt-5 inline-flex rounded-full border border-current/15 px-4 py-2 text-xs font-bold uppercase text-white/75 hover:bg-white hover:text-black"
                >
                  {product.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[92rem] gap-8 rounded-[1rem] border border-cyan-300/20 bg-cyan-300/10 p-6 md:p-10 lg:grid-cols-[.95fr_1.05fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-100">
              DriveOne by SolusiVendor
            </p>
            <h2 className="mt-4 text-4xl font-light tracking-[-0.06em] md:text-6xl">
              File bisnis jangan tercecer di chat.
            </h2>
            <p className="mt-6 text-lg leading-8 text-cyan-50/75">
              Kenali DriveOne, produk storage by SolusiVendor untuk menyimpan,
              membagikan, dan mengelola file bisnis secara lebih rapi.
            </p>
            <p className="mt-5 leading-8 text-cyan-50/62">
              DriveOne dibuat untuk brand, vendor, kreator, agency, dan tim yang
              butuh tempat rapi untuk asset bisnis, foto/video portfolio,
              katalog produk, file download, materi client, dan backup ringan.
            </p>
            <Link
              href="/driveone"
              className="mt-7 inline-flex rounded-full bg-cyan-100 px-6 py-3 text-xs font-bold uppercase text-black hover:bg-white"
            >
              Lihat DriveOne
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {driveOneUseCases.map((item) => (
              <div key={item} className="rounded-[.75rem] border border-cyan-300/20 bg-black/20 p-4 text-cyan-50/85">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cloud" className="border-y border-white/10 bg-[#f4f0e8] px-4 py-16 text-black md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
              SolusiVendor Cloud
            </p>
            <h2 className="mt-4 text-4xl font-light tracking-[-0.06em] md:text-6xl">
              Hosting dan managed cloud untuk bisnis yang mulai serius.
            </h2>
            <p className="mt-6 text-lg leading-8 text-black/62">
              Jalankan website static, Next.js, Node.js, Laravel, atau app custom
              di environment/container sendiri tanpa perlu pusing setup server
              dari nol.
            </p>
            <div className="mt-6 rounded-[.75rem] border border-black/10 bg-white p-5 text-sm leading-7 text-black/62">
              Untuk keamanan, client mendapatkan environment/container sendiri.
              Akses root host, Docker socket, dan terminal utama server tidak
              diberikan.
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {cloudPoints.map((point) => (
              <div key={point} className="rounded-[.75rem] border border-black/10 bg-white p-4 text-sm font-medium">
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[92rem]">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
              Infrastructure
            </p>
            <h2 className="mt-4 text-4xl font-light tracking-[-0.06em] md:text-6xl">
              Serius dari dasar.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/55">
              SolusiVendor Cloud dibangun dengan gateway, container isolation,
              monitoring, auto-restart, firewall, dan backup configuration agar
              website client tetap online dan aman.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {infraCards.map(([metric, label]) => (
              <div key={`${metric}-${label}`} className="rounded-[1rem] border border-white/10 bg-white/[0.045] p-5">
                <p className="text-4xl font-light tracking-[-0.05em]">{metric}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.14em] text-white/40">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-[.75rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-white/55">
            Hardware dapat terus di-upgrade, tapi arsitektur dibuat scalable
            sejak awal.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[92rem]">
          <h2 className="max-w-4xl text-4xl font-light tracking-[-0.06em] md:text-6xl">
            Provider besar kasih fitur. SolusiVendor bantu sampai bisa dipakai.
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <ComparisonCard
              title="Provider hosting umum"
              items={[
                "User setup sendiri",
                "Harus paham DNS, SSL, cPanel",
                "Upload file sendiri",
                "Kalau bingung cari tutorial sendiri",
                "Banyak fitur, tapi belum tentu dipakai",
              ]}
            />
            <ComparisonCard
              title="SolusiVendor"
              highlight
              items={[
                "Dibantu sampai online",
                "Domain, SSL, hosting diarahkan",
                "Cocok untuk brand, vendor, dan UMKM",
                "Website mulai 149rb",
                "Hosting mulai 10rb/bulan",
                "Cloud dan container bisa dibantu setup",
                "Fokus ke hasil: website bisa dipakai jualan",
              ]}
            />
          </div>
        </div>
      </section>

      <section id="pricing" className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[92rem]">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
            Pricing ladder
          </p>
          <h2 className="mt-4 max-w-4xl text-4xl font-light tracking-[-0.06em] md:text-6xl">
            Mulai kecil, naik kelas saat kebutuhan makin serius.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pricing.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-[1rem] border p-5 ${
                  plan.highlight
                    ? "border-[#ff2f1f] bg-[#ff2f1f] text-black"
                    : "border-white/10 bg-white/[0.045] text-white"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-55">
                  {plan.name}
                </p>
                <p className="mt-4 text-3xl font-light tracking-[-0.05em]">
                  {plan.price}
                </p>
                <p className="mt-4 min-h-20 text-sm leading-7 opacity-65">
                  {plan.description}
                </p>
                <Link
                  href={plan.href}
                  className={`mt-5 inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase ${
                    plan.highlight
                      ? "bg-black text-white hover:bg-white hover:text-black"
                      : "border border-white/15 text-white/75 hover:bg-white hover:text-black"
                  }`}
                >
                  {plan.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-white/10 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[92rem] gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl font-light tracking-[-0.06em] md:text-6xl">
              Pertanyaan sebelum mulai go digital.
            </h2>
          </div>
          <div className="grid gap-3">
            {faqs.map(([question, answer]) => (
              <details key={question} className="rounded-[.75rem] border border-white/10 bg-white/[0.045] p-5">
                <summary className="cursor-pointer text-lg font-medium">
                  {question}
                </summary>
                <p className="mt-3 leading-7 text-white/58">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-[92rem] rounded-[1rem] border border-white/10 bg-white/[0.055] p-8 md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
            Ready?
          </p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-4xl text-4xl font-light tracking-[-0.06em] md:text-6xl">
              Dari website pertama sampai cloud pertama.
            </h2>
            <a
              href={whatsappWeb}
              className="rounded-full bg-[#ff2f1f] px-7 py-4 text-center text-sm font-bold uppercase text-white hover:bg-white hover:text-black"
            >
              Mulai Website 149rb
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ComparisonCard({
  title,
  items,
  highlight,
}: {
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <article
      className={`rounded-[1rem] border p-6 ${
        highlight
          ? "border-[#ff2f1f]/60 bg-[#ff2f1f] text-black"
          : "border-white/10 bg-white/[0.045]"
      }`}
    >
      <h3 className="text-2xl font-light tracking-[-0.04em]">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 opacity-75">
            <span aria-hidden="true">/</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
