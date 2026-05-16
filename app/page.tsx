"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const whatsappTemplate =
  "https://wa.me/62895345902896?text=Halo%20SolusiVendor%2C%20saya%20mau%20beli%20template%20website%2099rb.";

const whatsappService =
  "https://wa.me/62895345902896?text=Halo%20SolusiVendor%2C%20saya%20mau%20konsultasi%20buat%20website%20vendor%20terima%20beres.";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Template", href: "#templates" },
  { label: "Pricing", href: "#pricing" },
  { label: "Server", href: "#server" },
  { label: "FAQ", href: "#faq" },
];

const vendors = [
  "SOUND SYSTEM",
  "WEDDING ORGANIZER",
  "LIGHTING",
  "LIVE STREAMING",
  "DECORATION",
  "MULTIMEDIA",
  "VIDEOTRON",
  "EVENT RENTAL",
];

const stats = [
  ["100+", "template options"],
  ["24/7", "website online"],
  ["1 LINK", "profile, portfolio, pricing"],
  ["700", "perak per hari"],
];

const projectSlides = [
  {
    title: "ARISTA Production",
    category: "Sound System",
    location: "Gresik",
    url: "aristaproduction.com",
    previewUrl: "https://aristaproduction.com",
    desc: "Website company profile untuk vendor sound system, LED videotron, lighting, custom audio cable, dan event production. Dibuat dengan tampilan premium, CTA WhatsApp, portfolio, layanan, dan struktur landing page yang siap jualan.",
  },
  // {
  //   title: "Colorize Visual",
  //   category: "Live Streaming",
  //   location: "Surabaya",
  //   url: "colorizevisual.com",
  //   previewUrl: "https://colorizevisual.com",
  //   desc: "Landing page untuk vendor live streaming dengan layanan multi-camera, Zoom, YouTube, Instagram, TikTok, portfolio event, pricelist, FAQ, dan CTA WhatsApp.",
  // },
  // {
  //   title: "Wedding Vendor Portfolio",
  //   category: "Wedding Organizer",
  //   location: "Surabaya",
  //   url: "wedding.namavendor.com",
  //   previewUrl: "https://solusivendor.com/templates/template2/",
  //   desc: "Website elegan untuk menampilkan paket wedding, gallery dekorasi, workflow konsultasi, testimoni, dan tombol inquiry agar calon client lebih mudah percaya.",
  // },
  // {
  //   title: "Sound System Pricelist",
  //   category: "Sound System",
  //   location: "East Java",
  //   url: "sound.namavendor.com",
  //   previewUrl: "https://solusivendor.com/templates/template1/",
  //   desc: "Halaman vendor sound system dengan katalog paket, portfolio event, detail layanan, pricelist, dan CTA WhatsApp yang jelas.",
  // },
];

const templatePreview = [
  {
    no: "01",
    title: "Sound System",
    desc: "Tampilkan paket sound, mixer, speaker, mic, portfolio event, dan tombol tanya harga.",
  },
  {
    no: "02",
    title: "Wedding Organizer",
    desc: "Tampilkan paket wedding, gallery dekorasi, testimoni, dan workflow konsultasi.",
  },
  {
    no: "03",
    title: "Lighting & Stage",
    desc: "Tampilkan katalog lighting, stage, rigging, visual event, dan paket rental.",
  },
  {
    no: "04",
    title: "Live Streaming",
    desc: "Tampilkan layanan Zoom, YouTube, TikTok, Instagram Live, multi-camera, dan dokumentasi.",
  },
];

const offers = [
  {
    label: "01 / DIY TEMPLATE",
    title: "Beli Template",
    price: "Rp99rb",
    desc: "Untuk vendor yang mau mulai cepat, murah, dan siap edit sendiri.",
    href: "/buytemplate",
    cta: "Browse Templates",
    items: [
      "100+ pilihan template vendor",
      "Bisa edit teks, foto, warna, dan kontak",
      "Cocok untuk portfolio dan pricelist",
      "File template siap pakai",
      "Bisa upgrade ke terima beres",
    ],
  },
  {
    label: "02 / DONE FOR YOU",
    title: "Terima Beres",
    price: "Start Rp149rb",
    desc: "Untuk vendor yang mau website langsung online tanpa ribet teknis.",
    href: "#pricing",
    cta: "See Packages",
    dark: true,
    items: [
      "Dibantu desain dan susun konten",
      "Setup domain, hosting, dan SSL",
      "CTA WhatsApp siap pakai",
      "Portfolio dan pricelist rapi",
      "Maintenance teknis dasar",
    ],
  },
];

const glassFeatures = [
  {
    title: "Portfolio premium",
    desc: "Foto event tampil besar, rapi, dan mudah dipercaya calon client.",
  },
  {
    title: "Pricelist hidup",
    desc: "Harga, paket, dan layanan bisa ditampilkan lebih meyakinkan dari PDF biasa.",
  },
  {
    title: "CTA WhatsApp",
    desc: "Calon client langsung diarahkan ke chat tanpa bingung cari kontak.",
  },
  {
    title: "Google-ready",
    desc: "Vendor punya identitas resmi yang bisa dibagikan, dicari, dan diingat.",
  },
  {
    title: "Fast loading",
    desc: "Asset dikompres, gambar/video dioptimasi, dan halaman dibuat ringan.",
  },
  {
    title: "Safe & guarantee",
    desc: "SSL, domain, hosting, dan maintenance teknis dasar kami bantu urus.",
  },
];

const process = [
  {
    step: "01",
    title: "Pilih cara mulai",
    desc: "Ambil template 99rb untuk edit sendiri, atau pilih paket terima beres kalau ingin kami yang susun sampai online.",
  },
  {
    step: "02",
    title: "Masukkan identitas vendor",
    desc: "Logo, nama vendor, layanan, portfolio, pricelist, lokasi, kontak WhatsApp, dan style visual.",
  },
  {
    step: "03",
    title: "Website dibuat siap jualan",
    desc: "Kami susun halaman agar enak dibaca, mobile-friendly, dan CTA-nya jelas untuk calon client.",
  },
  {
    step: "04",
    title: "Online dan siap dibagikan",
    desc: "Domain, hosting, SSL, dan link final disiapkan agar bisa langsung dipasang di bio dan dikirim ke calon client.",
  },
];

const pricing = [
  {
    badge: "PROMO",
    name: "Vendor Hoki",
    price: "Gratis",
    desc: "Untuk 2 vendor tercepat setiap bulan.",
    yearly: "Rp299rb/tahun berikutnya",
    cta: "Klaim Promo",
    href: "/free-register",
    items: [
      "1 landing page",
      "Domain .my.id 1 tahun",
      "SSL aktif",
      "Tombol WhatsApp",
      "Responsive basic",
    ],
  },
  {
    badge: "STARTER",
    name: "Vendor Pemula",
    price: "Rp149rb",
    desc: "Website sederhana untuk mulai tampil profesional.",
    yearly: "Rp299rb/tahun berikutnya",
    cta: "Ambil Paket",
    href: whatsappService,
    items: [
      "1 premium landing page",
      "Domain .my.id / .biz.id",
      "Hosting dan SSL",
      "Mobile responsive",
      "CTA WhatsApp",
    ],
  },
  {
    badge: "RECOMMENDED",
    name: "Vendor Keren",
    price: "Rp800rb",
    desc: "Untuk vendor yang mau terlihat serius dengan domain .com.",
    yearly: "Rp299rb/tahun berikutnya",
    cta: "Pilih Paket Ini",
    href: whatsappService,
    highlight: true,
    items: [
      "Website sampai 5 halaman",
      "Domain .com 1 tahun",
      "SEO basic",
      "Portfolio section",
      "Maintenance teknis dasar",
    ],
  },
  {
    badge: "PRO",
    name: "Vendor Serius",
    price: "Rp1,5jt",
    desc: "Untuk vendor yang butuh konten fleksibel dan bisa update.",
    yearly: "Rp299rb/tahun berikutnya",
    cta: "Pilih Pro",
    href: whatsappService,
    items: [
      "Unlimited page basic",
      "Admin CMS sederhana",
      "Domain .com 1 tahun",
      "Portfolio dan katalog dinamis",
      "Priority support",
    ],
  },
];

const comparisons = [
  ["Kirim PDF manual", "Satu link resmi"],
  ["Portfolio tercecer di chat", "Gallery rapi di website"],
  ["Pricelist cepat basi", "Halaman harga mudah update"],
  ["Client tanya hal sama", "FAQ menjawab otomatis"],
  ["Terlihat seperti vendor kecil", "Lebih siap untuk client besar"],
];

const businessTypes = [
  "UMKM",
  "Cafe & Resto",
  "Toko Online",
  "Rental",
  "Kursus",
  "Company Profile",
  "Personal Brand",
  "Agency",
  "Komunitas",
  "Gereja / Ministry",
  "Event Organizer",
  "Jasa Lokal",
];

const customWebServices = [
  {
    title: "Landing Pages",
    desc: "Halaman promosi untuk produk, jasa, campaign, event, atau iklan yang butuh konversi cepat.",
  },
  {
    title: "Sales System",
    desc: "Bantu susun alur penawaran, katalog, pricelist, CTA WhatsApp, dan halaman yang memudahkan calon customer membeli.",
  },
  {
    title: "Admin Panel",
    desc: "Untuk update konten, portfolio, produk, artikel, katalog, atau data tertentu tanpa edit code manual.",
  },
  {
    title: "HR & Internal Tools",
    desc: "Bisa custom untuk kebutuhan absensi, data karyawan, form internal, dashboard, atau workflow sederhana.",
  },
];

const handledByUs = [
  "Server",
  "SSL",
  "Hosting",
  "Domain",
  "SEO basic",
  "Admin panel",
  "Copywriting",
  "Struktur halaman",
  "CTA WhatsApp",
  "Mobile responsive",
];

const serverPlans = [
  {
    name: "Micro",
    price: "10rb",
    normalCompare: "±25rb",
    saving: "Hemat ±15rb/bulan",
    storage: "10GB",
    traffic: "Unlimited",
    domain: "1 website",
    email: "Optional",
    ssl: "Included",
    speed: "Same speed",
    desc: "Cocok untuk company profile, landing page, portfolio, pricelist, dan halaman promosi ringan.",
  },
  {
    name: "Grow",
    price: "25rb",
    normalCompare: "±60rb",
    saving: "Hemat ±35rb/bulan",
    storage: "25GB",
    traffic: "Unlimited",
    domain: "3 website",
    email: "Optional",
    ssl: "Included",
    speed: "Same speed",
    desc: "Untuk bisnis yang punya lebih banyak gambar, portfolio, katalog, dan beberapa halaman aktif.",
  },
  {
    name: "Scale",
    price: "Custom",
    normalCompare: "Mulai ±160rb",
    saving: "Custom sesuai kebutuhan",
    storage: "Custom",
    traffic: "Unlimited",
    domain: "Custom",
    email: "Optional",
    ssl: "Included",
    speed: "Same speed",
    desc: "Butuh storage besar, banyak video, file download, atau sistem khusus? Kami sesuaikan dengan kebutuhan.",
  },
];

const serverBenefits = [
  "Unlimited traffic",
  "Speed sama untuk semua paket",
  "SSL included",
  "Support domain custom",
  "Cocok untuk website bisnis",
  "Bisa upgrade storage",
  "Bisa untuk landing page",
  "Bisa untuk portfolio",
  "Bisa untuk company profile",
];

const whyCheap = [
  {
    title: "Reusable vendor system",
    desc: "Kami tidak mulai dari nol setiap project. Struktur website vendor sudah disiapkan agar pengerjaan lebih cepat.",
  },
  {
    title: "Template library",
    desc: "Banyak section sudah tersedia: hero, portfolio, pricelist, FAQ, CTA WhatsApp, katalog, dan trust section.",
  },
  {
    title: "Server dan setup lebih efisien",
    desc: "Domain, hosting, SSL, dan setup teknis dibuat dengan alur yang rapi sehingga biaya bisa ditekan.",
  },
  {
    title: "Fokus ke omset, bukan tagihan",
    desc: "Website dibuat untuk bantu client percaya dan chat lebih cepat, bukan membebani vendor dengan biaya bulanan yang berat.",
  },
];

const faqs = [
  {
    q: "Apakah SolusiVendor cuma untuk vendor event?",
    a: "Tidak. Awalnya SolusiVendor fokus ke vendor event, tapi kami juga bisa bantu UMKM, cafe, toko online, jasa lokal, company profile, personal brand, komunitas, sampai kebutuhan custom web sederhana.",
  },
  {
    q: "Selain vendor event, bisa buat website apa saja?",
    a: "Bisa untuk landing page produk, company profile, katalog layanan, pricelist online, website portfolio, halaman campaign, form registrasi, katalog produk, website komunitas, sampai sistem custom seperti HR, sales, atau admin panel sederhana.",
  },
  {
    q: "Pakai template kah kak?",
    a: "Untuk jasa pembuatan website terima beres, tidak kami buat asal pakai template yang sama. Kami susun design dan struktur sesuai identitas bisnis kamu. Prinsipnya authentic: satu design untuk satu vendor atau satu bisnis.",
  },
  {
    q: "Kalau beli template, bedanya apa?",
    a: "Template cocok untuk yang ingin hemat dan edit sendiri. Jasa terima beres cocok untuk yang ingin kami bantu susun sampai online, termasuk konten, tampilan, domain, hosting, SSL, dan setup teknis.",
  },
  {
    q: "Bisa revisi?",
    a: "Bisa kak. Kami bantu revisi sesuai scope paket sampai website terasa cocok untuk bisnismu. Tujuannya bukan sekadar online, tapi kamu puas dan percaya diri saat membagikan link website ke calon client.",
  },
  {
    q: "Apa saja yang diurus kalau pakai jasa pembuatan website?",
    a: "Kami bantu urus struktur halaman, copywriting dasar, layout, domain, hosting, SSL, SEO basic, CTA WhatsApp, optimasi mobile, dan jika paket mendukung bisa ditambah admin panel.",
  },
  {
    q: "Kenapa biaya server bisa murah?",
    a: "Karena kami menggunakan sistem server sendiri dan workflow yang efisien. Paket server mulai 10 ribu per bulan sudah dapat 10GB storage, unlimited traffic, SSL, dan cocok untuk website bisnis ringan.",
  },
  {
    q: "Apakah server murah berarti murahan?",
    a: "Tidak. Kami murah karena sistemnya efisien, bukan karena kualitasnya asal-asalan. Semua paket tetap dapat speed yang sama, unlimited traffic, SSL, dan bisa upgrade storage kalau kebutuhan website makin besar.",
  },
  {
    q: "Kalau butuh storage lebih besar bisa?",
    a: "Bisa. Untuk website dengan banyak foto, video, file download, atau sistem khusus, storage bisa custom. Tinggal hubungi kami, nanti kami sesuaikan dengan kebutuhan bisnis kamu.",
  },
  {
    q: "Stop berpikir website itu mahal, maksudnya gimana?",
    a: "Website tidak harus langsung mahal. Dengan biaya mulai sekitar 700 perak per hari, website kamu bisa online di internet, punya domain, hosting, SSL, dan link resmi yang bisa dibagikan ke calon customer.",
  },
  {
    q: "Apakah website bisa dicari di Google?",
    a: "Bisa dibantu struktur dasarnya, seperti domain resmi, meta title, description, heading, dan halaman yang jelas. Untuk kompetisi kata kunci besar, tetap butuh optimasi SEO lanjutan.",
  },
  {
    q: "Video di website bikin lag tidak?",
    a: "Tidak harus. Video bisa dibuat ringan dengan kompresi, format MP4/WebM, lazy loading, ukuran file terkontrol, dan fallback poster. Kami bantu optimasi agar tetap terlihat premium tanpa mengorbankan speed.",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function LoadingScreen({ done }: { done: boolean }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[999] flex items-center justify-center bg-[#ff2f1f] transition-all duration-1000 ease-[cubic-bezier(.76,0,.24,1)]",
        done ? "pointer-events-none -translate-y-full opacity-0" : "opacity-100"
      )}
    >
      <h1 className="text-center text-5xl font-light tracking-[-0.08em] text-black md:text-8xl">
        SOLUSI<span className="font-bold">VENDOR</span>
      </h1>
    </div>
  );
}

export default function HomePage() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState(0);

  const marquee = useMemo(() => [...vendors, ...vendors, ...vendors], []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoadingDone(true);
      setMounted(true);
    }, 950);

    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const slider = window.setInterval(() => {
      setActiveProject((current) => (current + 1) % projectSlides.length);
    }, 4500);

    return () => window.clearInterval(slider);
  }, []);

  return (
    <>
      <LoadingScreen done={loadingDone} />

      <main className="min-h-screen overflow-hidden bg-[#050505] text-[#f4f0e8] selection:bg-[#ff2f1f] selection:text-white">
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.055] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:72px_72px]" />

        <a
          href={whatsappService}
          target="_blank"
          aria-label="Chat WhatsApp"
          className="fixed bottom-5 right-5 z-[70] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-2xl font-bold text-black shadow-[0_18px_50px_rgba(37,211,102,.35)] transition hover:scale-105 md:bottom-8 md:right-8"
        >
          WA
        </a>

        <nav
          className={cn(
            "fixed left-0 top-0 z-50 w-full border-b border-white/10 transition-all delay-300 duration-700",
            loadingDone ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0",
            scrolled ? "bg-[#050505]/80 backdrop-blur-2xl" : "bg-[#050505]/35 backdrop-blur-md"
          )}
        >
          <div className="mx-auto flex max-w-[92rem] items-center justify-between px-4 py-5 md:px-8">
            <a href="#" className="text-2xl font-light tracking-[-0.06em] md:text-3xl">
              SOLUSI<span className="font-bold text-[#ff2f1f]">VENDOR</span>
            </a>

            <div className="flex items-center justify-end gap-3">
              <div className="hidden items-center gap-8 lg:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-bold uppercase tracking-[-0.02em] text-white/45 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="hidden items-center gap-2 text-xs font-bold uppercase text-white/45 xl:flex">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Available for project
              </div>

              <a
                href={whatsappService}
                target="_blank"
                className="hidden rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold uppercase tracking-[-0.01em] text-white transition hover:border-[#ff2f1f] hover:bg-[#ff2f1f] md:inline-flex"
              >
                Let's talk
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition hover:bg-white hover:text-black"
                aria-label="Open menu"
              >
                <span className="relative h-3 w-5">
                  <span className="absolute left-0 top-0 h-px w-5 bg-current" />
                  <span className="absolute bottom-0 left-0 h-px w-5 bg-current" />
                </span>
              </button>
            </div>
          </div>
        </nav>

        <div
          className={cn(
            "fixed inset-0 z-[80] bg-[#050505]/96 backdrop-blur-2xl transition duration-500",
            menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <div className="flex h-full">
            <div className="hidden flex-1 border-r border-white/10 p-8 lg:block">
              <p className="text-[18vw] font-light leading-none tracking-[-0.08em] text-white/10">
                MENU
              </p>
            </div>

            <div className="w-full max-w-2xl p-6 md:p-10">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff2f1f]">
                  Navigation
                </p>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-2xl text-white transition hover:bg-white hover:text-black"
                >
                  ×
                </button>
              </div>

              <div className="mt-14 divide-y divide-white/10">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between py-7"
                  >
                    <span className="text-6xl font-light uppercase tracking-[-0.07em] text-white transition group-hover:text-[#ff2f1f] md:text-8xl">
                      {item.label}
                    </span>
                    <span className="text-2xl text-white/30 transition group-hover:translate-x-2 group-hover:text-[#ff2f1f]">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* HERO FULL VIDEO */}
        <section className="relative z-10 min-h-screen overflow-hidden bg-[#050505]">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />

          <div className="absolute inset-0 bg-black/48" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/38 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/70" />

          <div
            className={cn(
              "relative z-10 mx-auto flex min-h-screen max-w-[92rem] flex-col justify-end px-4 pb-10 pt-32 transition-all duration-1000 md:px-8 md:pb-14",
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            <div className="mb-auto pt-10">
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#ff2f1f]">
                Digital system for event vendors
              </p>

              <h1 className="mt-6 max-w-7xl text-[22vw] font-light leading-[0.78] tracking-[-0.095em] text-white sm:text-[18vw] md:text-[14vw] lg:text-[11rem]">
                Website premium untuk vendor event.
              </h1>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="max-w-xl text-lg font-light leading-8 text-white/55 md:text-xl">
                  Portfolio, pricelist, katalog, domain, hosting, SSL, dan tombol
                  WhatsApp dalam satu link resmi yang siap dibagikan ke calon client.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#offer"
                    className="rounded-full bg-[#ff2f1f] px-7 py-4 text-center text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
                  >
                    Pilih cara mulai
                  </a>

                  <Link
                    href="/buytemplate"
                    className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-center text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
                  >
                    Buy template 99rb
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 border-y border-white/10 md:grid-cols-4">
                {stats.map(([value, label]) => (
                  <div
                    key={value}
                    className="border-b border-white/10 p-5 last:border-b-0 sm:border-r sm:last:border-r-0 md:border-b-0 md:p-6"
                  >
                    <p className="text-5xl font-light leading-none tracking-[-0.08em] md:text-7xl">
                      {value}
                    </p>
                    <p className="mt-3 max-w-40 text-sm font-light leading-5 text-white/40">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* OWNER INTRO */}
        <section className="relative z-10 overflow-hidden bg-[#f4f0e8] px-4 py-24 text-black md:px-8 md:py-32">
          <div className="pointer-events-none absolute right-[-10rem] top-10 h-[36rem] w-[36rem] rounded-full bg-[#ff2f1f]/10 blur-[110px]" />

          <div className="relative mx-auto grid max-w-[92rem] grid-cols-1 gap-12 lg:grid-cols-[1fr_.85fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-black/35">
                Halo owner vendor
              </p>

              <h2 className="mt-6 max-w-5xl text-5xl font-light leading-[1.02] tracking-[-0.07em] text-black md:text-8xl">
                Kamu klik link ini karena mau vendor kamu{" "}
                <span className="italic text-[#ff2f1f]">lebih bertumbuh</span>,
                kan?
              </h2>

              <p className="mt-8 max-w-2xl text-xl font-light leading-9 text-black/55">
                Begitu juga visi kami. Kami ingin bantu vendor event terlihat lebih
                profesional di mata client, lebih gampang dipercaya, dan lebih mudah
                dihubungi ketika calon client sedang membandingkan beberapa vendor.
              </p>
            </div>

            <div className="relative">
              <div className="rotate-1 rounded-[2rem] border border-black/10 bg-white/70 p-5 shadow-2xl backdrop-blur-xl transition hover:rotate-0 md:p-6">
                <div className="rounded-[1.5rem] border border-black/10 bg-[#f7f7f3] p-4">
                  <div className="flex items-center gap-2 border-b border-black/10 pb-4">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                    <div className="ml-3 flex-1 rounded-full bg-white px-4 py-2 text-sm font-light text-black/45">
                      google.com/search?q=namavendormu.com
                    </div>
                  </div>

                  <div className="py-8">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/30">
                      Google Search
                    </p>

                    <div className="mt-5 rounded-2xl border border-black/10 bg-white p-5">
                      <p className="text-sm text-[#1a0dab]">
                        https://namavendormu.com
                      </p>
                      <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em]">
                        Nama Vendor Mu | Vendor Event Profesional
                      </h3>
                      <p className="mt-3 text-sm font-light leading-6 text-black/55">
                        Portfolio, pricelist, katalog layanan, dokumentasi event,
                        dan kontak WhatsApp resmi.
                      </p>
                    </div>

                    <div className="mt-4 rounded-2xl border border-black/10 bg-black p-5 text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                        Sudah bisa dicari?
                      </p>
                      <p className="mt-3 text-3xl font-light tracking-[-0.06em]">
                        Client lebih percaya saat vendor punya link resmi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-4 rounded-2xl border border-black/10 bg-[#ff2f1f] px-5 py-4 text-black shadow-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em]">
                  Result
                </p>
                <p className="mt-1 text-xl font-light">Lebih siap tampil profesional</p>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="relative z-10 overflow-hidden border-y border-white/10 bg-[#ff2f1f] py-5 text-black">
          <div className="flex w-max animate-[marquee_32s_linear_infinite] items-center gap-10 whitespace-nowrap pr-10">
            {marquee.map((item, index) => (
              <React.Fragment key={`${item}-${index}`}>
                <span className="text-5xl font-light uppercase leading-none tracking-[-0.07em] md:text-8xl">
                  {item}
                </span>
                <span className="text-5xl font-light md:text-8xl">/</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* SAFE GUARANTEE FAST */}
        <section className="relative z-10 overflow-hidden bg-[#050505] px-4 py-24 text-white md:px-8 md:py-32">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-[#ff2f1f]/15 blur-[130px]" />

          <div className="relative mx-auto max-w-[92rem]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                  Safe. Guarantee. Fast.
                </p>
                <h2 className="mt-5 max-w-4xl text-6xl font-light leading-[0.9] tracking-[-0.08em] md:text-[8rem]">
                  Fokus pada omset, bukan tagihan.
                </h2>
              </div>

              <p className="max-w-xl text-xl font-light leading-8 text-white/45">
                Website harus bantu vendor terlihat profesional, bukan membuat owner
                pusing bayar teknis setiap bulan. Karena itu sistem dibuat aman,
                cepat, dan biaya tahunannya ringan.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                {
                  title: "Safe",
                  desc: "SSL aktif, domain resmi, dan struktur website dibuat lebih aman untuk dibagikan ke calon client.",
                },
                {
                  title: "Guarantee",
                  desc: "Maintenance teknis dasar kami bantu agar website tetap aktif dan tidak dibiarkan error.",
                },
                {
                  title: "Fast",
                  desc: "Gambar, video, dan asset dioptimasi supaya tampilan tetap premium tanpa membuat website terasa berat.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#ff2f1f]/40 hover:bg-white/[0.075] hover:shadow-[0_30px_90px_rgba(255,47,31,.12)] md:p-9"
                >
                  <div className="mb-16 h-14 w-14 rounded-2xl border border-white/10 bg-white/[0.06] transition group-hover:rotate-6 group-hover:bg-[#ff2f1f]" />
                  <h3 className="text-5xl font-light tracking-[-0.07em]">{item.title}</h3>
                  <p className="mt-5 text-base font-light leading-7 text-white/45">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
<section
  id="work"
  className="relative z-10 bg-[#f4f0e8] px-4 py-24 text-black md:px-8 md:py-32"
>
  <div className="mx-auto max-w-[92rem]">
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_.75fr] lg:items-end">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-black/40">
          Our latest project
        </p>

        <h2 className="mt-5 text-7xl font-light leading-[0.78] tracking-[-0.085em] md:text-[9rem]">
          Website mockup that sells.
        </h2>
      </div>

      <p className="max-w-xl text-xl font-light leading-8 text-black/55">
        Kami tidak cuma bikin halaman online. Kami bantu vendor tampil seperti
        brand serius: ada domain, layanan jelas, portfolio, paket harga, FAQ,
        dan CTA WhatsApp yang siap dikirim ke calon client.
      </p>
    </div>

    <div className="mt-16">
      <div className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-black p-3 shadow-2xl md:rounded-[3rem] md:p-5">
        {/* Browser top bar */}
        <div className="flex items-center gap-3 rounded-t-[1.5rem] border-b border-white/10 bg-[#101010] px-4 py-4 md:rounded-t-[2.2rem] md:px-6">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>

          <div className="ml-2 flex min-w-0 flex-1 items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2">
            <span className="truncate text-xs font-medium text-white/45 md:text-sm">
              https://{projectSlides[activeProject].url}
            </span>
          </div>

          <div className="hidden rounded-full border border-white/10 px-4 py-2 md:block">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">
              Live Preview
            </p>
          </div>
        </div>

        {/* Mockup area */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-b-[1.5rem] bg-[#080808] md:aspect-[16/8.5] md:rounded-b-[2.2rem]">
          {projectSlides.map((slide, index) => (
          <div
            key={slide.title}
            className={cn(
              "absolute inset-0 bg-white transition-all duration-1000 ease-in-out",
              activeProject === index
                ? "scale-100 opacity-100"
                : "pointer-events-none scale-105 opacity-0"
            )}
          >
            <iframe
              src={slide.previewUrl}
              title={slide.title}
              className="pointer-events-none h-full w-full border-0"
              loading={index === 0 ? "eager" : "lazy"}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/0 via-transparent to-black/75" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/0" />
          </div>
        ))}

          {/* Top badges */}
          <div className="absolute left-5 top-5 z-20 flex flex-wrap items-center gap-2 md:left-8 md:top-8">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 backdrop-blur-xl">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff2f1f]" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                Web Project
              </span>
            </div>

            <div className="rounded-full border border-white/15 bg-black/35 px-4 py-2 backdrop-blur-xl">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                {projectSlides[activeProject].category}
              </span>
            </div>
          </div>

          {/* Desktop info panel */}
          <div className="absolute right-0 top-0 z-20 hidden h-full w-[48%] items-center p-10 md:flex xl:p-14">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff2f1f]">
                Latest Project / {String(activeProject + 1).padStart(2, "0")}
              </p>

              <h3 className="mt-5 text-5xl font-light leading-[0.85] tracking-[-0.07em] text-white lg:text-7xl xl:text-8xl">
                {projectSlides[activeProject].title}
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                  {projectSlides[activeProject].location}
                </span>
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                  {projectSlides[activeProject].url}
                </span>
              </div>

              <p className="mt-6 text-base font-light leading-7 text-white/55 lg:text-lg">
                {projectSlides[activeProject].desc}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#pricing"
                  className="rounded-full bg-[#ff2f1f] px-7 py-4 text-center text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
                >
                  Buat seperti ini
                </a>

                <a
                  href={whatsappService}
                  target="_blank"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-center text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
                >
                  Konsultasi
                </a>

                <a
                  href={projectSlides[activeProject].previewUrl}
                  target="_blank"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-center text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
                >
                  Open Website
                </a>
              </div>
            </div>
          </div>

          {/* Mobile info panel */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:hidden">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/55 p-5 backdrop-blur-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff2f1f]">
                Latest Project / {String(activeProject + 1).padStart(2, "0")}
              </p>

              <h3 className="mt-3 text-4xl font-light leading-[0.9] tracking-[-0.07em] text-white">
                {projectSlides[activeProject].title}
              </h3>

              <p className="mt-3 text-sm font-light leading-6 text-white/55">
                {projectSlides[activeProject].desc}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-5 left-5 z-30 hidden items-center gap-3 md:bottom-8 md:left-8 md:flex">
            {projectSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setActiveProject(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  activeProject === index
                    ? "w-12 bg-[#ff2f1f]"
                    : "w-2.5 bg-white/35 hover:bg-white"
                )}
                aria-label={`Show ${slide.title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project list under mockup */}
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-4">
        {projectSlides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setActiveProject(index)}
            className={cn(
              "rounded-[1.25rem] border p-4 text-left transition",
              activeProject === index
                ? "border-black bg-black text-white"
                : "border-black/10 bg-white/60 text-black hover:bg-white"
            )}
          >
            <p
              className={cn(
                "text-xs font-bold uppercase tracking-[0.2em]",
                activeProject === index ? "text-[#ff2f1f]" : "text-black/35"
              )}
            >
              {slide.category}
            </p>
            <h4 className="mt-3 text-lg font-bold tracking-[-0.04em]">
              {slide.title}
            </h4>
            <p
              className={cn(
                "mt-2 text-sm font-light",
                activeProject === index ? "text-white/45" : "text-black/45"
              )}
            >
              {slide.location}
            </p>
          </button>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* SERVER SPEED / FULLSCREEN VIDEO */}
<section className="relative z-10 min-h-screen overflow-hidden bg-black text-white">
  <video
    className="absolute inset-0 h-full w-full object-cover"
    src="/videos/optimization.mp4"
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
  />

  <div className="absolute inset-0 bg-black/45" />
  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/35 to-black/30" />
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/45" />

  <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:72px_72px]" />

  <div className="relative z-10 mx-auto flex min-h-screen max-w-[92rem] flex-col justify-between px-4 py-24 md:px-8 md:py-28">
    <div>
      <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/35 px-5 py-3 backdrop-blur-xl">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#25D366]" />
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/65">
          Server speed showcase
        </p>
      </div>

      <h2 className="mt-8 max-w-6xl text-[16vw] font-light leading-[0.82] tracking-[-0.095em] text-white md:text-[10vw] lg:text-[9rem]">
        Website cepat.
        <span className="block italic text-white/70">
          Video tetap jalan.
        </span>
      </h2>

      <p className="mt-8 max-w-2xl text-lg font-light leading-8 text-white/60 md:text-2xl md:leading-10">
        Kami optimasi video, asset, domain, SSL, dan server supaya website
        tetap terasa ringan walaupun tampilannya premium. Cocok untuk vendor,
        UMKM, portfolio, landing page, dan website bisnis yang butuh tampil
        serius di internet.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href="#server"
          className="rounded-full bg-[#ff2f1f] px-8 py-4 text-center text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
        >
          Lihat server plan
        </a>

        <a
          href={whatsappService}
          target="_blank"
          className="rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-center text-sm font-bold uppercase text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
        >
          Konsultasi speed
        </a>
      </div>
    </div>

    <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
      {[
        ["10GB", "storage mulai 10rb"],
        ["Unlimited", "traffic bulanan"],
        ["SSL", "aktif & aman"],
        ["Fast", "server ringan"],
      ].map(([value, label]) => (
        <div
          key={value}
          className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.08] md:p-7"
        >
          <p className="text-4xl font-light leading-none tracking-[-0.07em] md:text-6xl">
            {value}
          </p>
          <p className="mt-3 text-sm font-light leading-5 text-white/45">
            {label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* SCALE UP */}
        <section className="relative z-10 overflow-hidden bg-[#050505] px-4 py-24 text-white md:px-8 md:py-32">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:70px_70px]" />
          <div className="pointer-events-none absolute right-[-15%] top-0 h-[44rem] w-[44rem] rounded-full bg-white/10 blur-[90px]" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-full bg-[radial-gradient(circle_at_78%_20%,rgba(255,255,255,.18),transparent_24rem)]" />

          <div className="relative mx-auto max-w-[92rem]">
            <div className="inline-flex rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 backdrop-blur-xl">
              <span className="text-sm font-light tracking-[0.12em] text-white/75">
                Scale Up Bisnis
              </span>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_.7fr] lg:items-center">
              <div>
                <h2 className="max-w-5xl text-5xl font-light leading-[1.02] tracking-[-0.06em] text-white md:text-8xl">
                  Naikkan kepercayaan visitor dan skalakan bisnis lebih cepat.
                </h2>

                <p className="mt-8 max-w-xl text-xl font-light leading-9 text-white/45">
                  Website yang rapi membuat calon client lebih cepat paham, lebih
                  percaya, dan lebih mudah memutuskan untuk chat.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl md:p-6">
                <div className="rounded-[1.5rem] bg-white p-5 text-black">
                  <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/35">
                      Visitor Trust
                    </p>
                    <p className="text-xs font-bold text-[#ff2f1f]">+90%</p>
                  </div>

                  <div className="py-10">
                    <p className="text-7xl font-light tracking-[-0.08em]">
                      258k
                    </p>
                    <p className="mt-2 text-sm font-light text-black/45">
                      simulated page views after better presentation
                    </p>
                  </div>

                  <div className="h-32 overflow-hidden rounded-2xl bg-black p-4">
                    <div className="h-full rounded-t-full border-l-4 border-t-4 border-white/80" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                ["More trust", "Client melihat vendor lebih siap dan profesional."],
                ["More clarity", "Paket, portfolio, dan kontak tidak tercecer lagi."],
                ["More leads", "CTA WhatsApp dibuat jelas dan mudah diklik."],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl transition hover:-translate-y-2 hover:bg-white/[0.07]"
                >
                  <h3 className="text-3xl font-light tracking-[-0.06em]">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm font-light leading-7 text-white/45">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* TEMPLATES */}
        <section id="templates" className="relative z-10 bg-[#050505] px-4 py-24 md:px-8 md:py-32">
          <div className="pointer-events-none absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-[#ff2f1f]/18 blur-[120px]" />

          <div className="relative mx-auto max-w-[92rem]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                  Template marketplace
                </p>
                <h2 className="mt-5 text-7xl font-light leading-[0.78] tracking-[-0.085em] md:text-[9rem]">
                  100+ looks. One vendor system.
                </h2>
              </div>

              <div>
                <p className="max-w-xl text-3xl font-light leading-[1.05] tracking-[-0.05em] text-white/85 md:text-5xl">
                  Pilih style yang cocok, lalu gunakan untuk portfolio, pricelist,
                  katalog, dan WhatsApp CTA.
                </p>
                <p className="mt-6 max-w-xl text-base font-light leading-7 text-white/45">
                  Template SolusiVendor dibuat khusus untuk kebutuhan vendor event.
                  Bukan template random yang harus dipaksa cocok.
                </p>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {templatePreview.map((item) => (
                <Link
                  key={item.no}
                  href="/buytemplate"
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#ff2f1f]/50 hover:bg-white/[0.07]"
                >
                  <div className="relative h-72 overflow-hidden rounded-[1.4rem] bg-black p-5">
                    <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:32px_32px]" />
                    <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#ff2f1f]/30 blur-[60px] transition group-hover:bg-[#ff2f1f]/50" />

                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/35">
                          SV / {item.no}
                        </p>
                        <div className="h-10 w-10 rounded-full border border-white/15" />
                      </div>

                      <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                          {item.title}
                        </p>
                        <h3 className="text-5xl font-light leading-[0.82] tracking-[-0.08em] text-white">
                          TEMPLATE
                          <span className="block">{item.no}</span>
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 pt-5">
                    <h3 className="text-2xl font-bold tracking-[-0.04em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm font-light leading-6 text-white/45">
                      {item.desc}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                        View collection
                      </span>
                      <span className="text-2xl text-[#ff2f1f] transition group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/buytemplate"
                className="rounded-full bg-[#ff2f1f] px-8 py-4 text-center text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
              >
                Browse 100+ templates
              </Link>
              <a
                href={whatsappTemplate}
                target="_blank"
                className="rounded-full border border-white/15 px-8 py-4 text-center text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
              >
                Buy template 99rb
              </a>
            </div>
          </div>
        </section>

        {/* OFFER */}
        <section id="offer" className="relative z-10 bg-[#050505] px-4 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-[92rem]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                  Choose your path
                </p>
                <h2 className="mt-5 text-7xl font-light leading-[0.78] tracking-[-0.085em] md:text-[9rem]">
                  DIY or done for you.
                </h2>
              </div>

              <p className="max-w-xl text-xl font-light leading-8 text-white/45">
                Mulai dari template murah yang bisa diedit sendiri, atau serahkan
                semuanya ke kami sampai website siap online.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {offers.map((offer) => (
                <div
                  key={offer.title}
                  className={cn(
                    "group relative overflow-hidden rounded-[2rem] border p-7 transition duration-500 hover:-translate-y-1 md:p-10",
                    offer.dark
                      ? "border-[#ff2f1f]/40 bg-[#ff2f1f] text-black"
                      : "border-white/10 bg-white/[0.045] text-white backdrop-blur-xl"
                  )}
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p
                        className={cn(
                          "text-xs font-bold uppercase tracking-[0.25em]",
                          offer.dark ? "text-black/55" : "text-white/35"
                        )}
                      >
                        {offer.label}
                      </p>
                      <h3 className="mt-5 text-6xl font-light leading-none tracking-[-0.08em] md:text-7xl">
                        {offer.title}
                      </h3>
                    </div>

                    <p className="max-w-36 text-right text-3xl font-light tracking-[-0.05em]">
                      {offer.price}
                    </p>
                  </div>

                  <p
                    className={cn(
                      "mt-6 max-w-xl text-base font-light leading-7",
                      offer.dark ? "text-black/65" : "text-white/48"
                    )}
                  >
                    {offer.desc}
                  </p>

                  <div
                    className={cn(
                      "my-8 h-px",
                      offer.dark ? "bg-black/15" : "bg-white/10"
                    )}
                  />

                  <ul className="space-y-4">
                    {offer.items.map((item) => (
                      <li
                        key={item}
                        className={cn(
                          "flex gap-3 text-sm font-light leading-6",
                          offer.dark ? "text-black/70" : "text-white/62"
                        )}
                      >
                        <span>/</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {offer.href.startsWith("/") ? (
                    <Link
                      href={offer.href}
                      className={cn(
                        "mt-10 inline-flex rounded-full px-6 py-3 text-sm font-bold uppercase transition",
                        offer.dark
                          ? "bg-black text-white hover:bg-white hover:text-black"
                          : "bg-white text-black hover:bg-[#ff2f1f] hover:text-white"
                      )}
                    >
                      {offer.cta}
                    </Link>
                  ) : (
                    <a
                      href={offer.href}
                      className={cn(
                        "mt-10 inline-flex rounded-full px-6 py-3 text-sm font-bold uppercase transition",
                        offer.dark
                          ? "bg-black text-white hover:bg-white hover:text-black"
                          : "bg-white text-black hover:bg-[#ff2f1f] hover:text-white"
                      )}
                    >
                      {offer.cta}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GLASS FEATURES */}
        <section className="relative z-10 overflow-hidden bg-[#050505] px-4 py-24 text-white md:px-8 md:py-32">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[#ff2f1f]/15 blur-[130px]" />

          <div className="relative mx-auto max-w-[92rem]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                  Vendor website system
                </p>

                <h2 className="mt-5 text-7xl font-light leading-[0.78] tracking-[-0.085em] md:text-[8rem]">
                  Not just a page.
                </h2>

                <p className="mt-8 max-w-md text-lg font-light leading-8 text-white/45">
                  Section dibuat tidak sekadar informatif, tapi terasa premium:
                  glass, hover 3D, dan tetap minimal.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {glassFeatures.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:rotate-[0.35deg] hover:border-[#ff2f1f]/35 hover:bg-white/[0.075] hover:shadow-[0_30px_100px_rgba(255,47,31,.12)]"
                  >
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#ff2f1f]/10 blur-[50px] transition group-hover:bg-[#ff2f1f]/20" />

                    <div className="relative">
                      <div className="mb-12 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/30">
                          Feature
                        </span>
                        <span className="text-sm font-bold text-[#ff2f1f]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="text-3xl font-light tracking-[-0.06em]">
                        {feature.title}
                      </h3>

                      <p className="mt-4 text-sm font-light leading-7 text-white/45">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI */}
        <section
          id="ai-online"
          className="relative z-10 overflow-hidden bg-[#050505] px-4 py-24 text-[#f4f0e8] md:px-8 md:py-32"
        >
          <div className="pointer-events-none absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-[#ff2f1f]/20 blur-[120px]" />

          <div className="mx-auto max-w-[92rem]">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
                  AI boleh. Kreativitas boleh. Ribet teknis jangan.
                </p>

                <h2 className="mt-5 text-7xl font-light leading-[0.78] tracking-[-0.085em] md:text-[8.8rem]">
                  You create.
                  <span className="block italic text-[#ff2f1f]">
                    We make it online.
                  </span>
                </h2>
              </div>

              <div>
                <p className="max-w-xl text-3xl font-light leading-[1.05] tracking-[-0.05em] text-white/85 md:text-5xl">
                  Kamu boleh pakai AI. Kamu boleh pakai kreativitasmu. Kami bantu
                  jadikan website yang benar-benar online.
                </p>

                <p className="mt-6 max-w-xl text-base font-light leading-7 text-white/45">
                  Banyak orang bisa bikin desain pakai AI. Tapi tidak semua bisa
                  menyambungkan domain, hosting, SSL, responsive layout, WhatsApp
                  CTA, dan memastikan website bisa diakses calon client dengan lancar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="relative z-10 bg-[#050505] px-4 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-[92rem]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                  Launch process
                </p>
                <h2 className="mt-5 text-7xl font-light leading-[0.78] tracking-[-0.085em] md:text-[9rem]">
                  From idea to live.
                </h2>
              </div>

              <p className="max-w-xl text-xl font-light leading-8 text-white/45">
                Alurnya dibuat cepat dan jelas. Cocok untuk vendor yang tidak mau
                bolak-balik bahas teknis terlalu lama.
              </p>
            </div>

            <div className="mt-16 divide-y divide-white/10 border-y border-white/10">
              {process.map((item) => (
                <div
                  key={item.step}
                  className="grid grid-cols-1 gap-5 py-8 md:grid-cols-[.25fr_.75fr_1fr] md:items-center"
                >
                  <p className="text-5xl font-light tracking-[-0.08em] text-[#ff2f1f] md:text-7xl">
                    {item.step}
                  </p>
                  <h3 className="text-3xl font-bold tracking-[-0.05em] text-white md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="text-base font-light leading-7 text-white/45">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BEFORE AFTER */}
        <section className="relative z-10 bg-[#f4f0e8] px-4 py-24 text-black md:px-8 md:py-32">
          <div className="mx-auto max-w-[92rem]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-black/40">
                  Before vs after
                </p>
                <h2 className="mt-5 text-7xl font-light leading-[0.78] tracking-[-0.085em] md:text-[8.5rem]">
                  Stop looking small.
                </h2>
                <p className="mt-8 max-w-md text-lg font-light leading-8 text-black/55">
                  Bukan berarti vendor kecil tidak bisa terlihat premium. Yang
                  dibutuhkan adalah presentasi digital yang lebih rapi.
                </p>
              </div>

              <div className="rounded-[2rem] border border-black/10 bg-white/65 p-5 backdrop-blur-xl md:p-8">
                <div className="grid grid-cols-2 gap-3 border-b border-black/10 pb-5 text-xs font-bold uppercase tracking-[0.25em] text-black/35">
                  <p>Sebelum</p>
                  <p>Sesudah</p>
                </div>

                <div className="divide-y divide-black/10">
                  {comparisons.map(([before, after]) => (
                    <div key={before} className="grid grid-cols-2 gap-5 py-6">
                      <p className="text-base font-light text-black/45 line-through">
                        {before}
                      </p>
                      <p className="text-base font-bold text-black">{after}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.5rem] bg-black p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                    Result
                  </p>
                  <h3 className="mt-4 text-4xl font-bold leading-none tracking-[-0.06em]">
                    Calon client lebih cepat paham, lebih percaya, dan lebih mudah chat.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHEAP */}
        <section
          id="why-cheaper"
          className="relative z-10 bg-[#f4f0e8] px-4 py-24 text-black md:px-8 md:py-32"
        >
          <div className="mx-auto max-w-[92rem]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-black/40">
                  Why affordable
                </p>
                <h2 className="mt-5 text-7xl font-light leading-[0.78] tracking-[-0.085em] md:text-[9rem]">
                  Cheaper doesn't mean weak.
                </h2>
              </div>

              <div className="space-y-4">
                {whyCheap.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-black/10 bg-white/55 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white"
                  >
                    <div className="flex gap-5">
                      <span className="text-5xl font-light leading-none tracking-[-0.07em] text-[#ff2f1f]">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-2xl font-bold tracking-[-0.04em]">
                          {item.title}
                        </h3>
                        <p className="mt-3 font-light leading-7 text-black/55">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="rounded-[1.5rem] bg-black p-7 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#ff2f1f]">
                    Simple reason
                  </p>
                  <h3 className="mt-4 text-4xl font-light leading-none tracking-[-0.06em]">
                    Client bayar untuk hasil, bukan biaya operasional yang membengkak.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NOT ONLY EVENT VENDOR */}
<section className="relative z-10 overflow-hidden bg-[#f4f0e8] px-4 py-24 text-black md:px-8 md:py-32">
  <div className="pointer-events-none absolute left-[-12rem] top-10 h-[38rem] w-[38rem] rounded-full bg-[#ff2f1f]/10 blur-[120px]" />

  <div className="relative mx-auto max-w-[92rem]">
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-end">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-black/35">
          Cuma bisa vendor event?
        </p>

        <h2 className="mt-5 max-w-5xl text-6xl font-light leading-[0.88] tracking-[-0.085em] md:text-[8.5rem]">
          Tenang, UMKM juga bisa digital.
        </h2>
      </div>

      <div>
        <p className="max-w-2xl text-2xl font-light leading-[1.25] tracking-[-0.04em] text-black/65 md:text-4xl">
          SolusiVendor memang lahir dari dunia vendor event, tapi sistem kami
          bisa dipakai untuk banyak jenis usaha.
        </p>

        <p className="mt-6 max-w-xl text-base font-light leading-8 text-black/50 md:text-lg">
          Mau landing page, company profile, sales page, katalog layanan,
          admin panel, sampai custom web sederhana? Kami bisa bantu usaha kamu
          terlihat lebih rapi, dipercaya, dan siap menerima customer.
        </p>
      </div>
    </div>

    <div className="mt-14 flex flex-wrap gap-3">
      {businessTypes.map((item) => (
        <span
          key={item}
          className="rounded-full border border-black/10 bg-white/65 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black/55 backdrop-blur-xl"
        >
          {item}
        </span>
      ))}
    </div>

    <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {customWebServices.map((item, index) => (
        <div
          key={item.title}
          className="rounded-[2rem] border border-black/10 bg-white/70 p-7 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/35">
              Bisa custom
            </p>
            <p className="text-sm font-black text-[#ff2f1f]">
              {String(index + 1).padStart(2, "0")}
            </p>
          </div>

          <h3 className="mt-14 text-3xl font-semibold leading-none tracking-[-0.055em]">
            {item.title}
          </h3>

          <p className="mt-4 text-sm font-light leading-7 text-black/55">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* WE HANDLE EVERYTHING */}
<section className="relative z-10 overflow-hidden bg-[#050505] px-4 py-24 text-white md:px-8 md:py-32">
  <div className="pointer-events-none absolute right-[-8rem] top-0 h-[38rem] w-[38rem] rounded-full bg-[#ff2f1f]/18 blur-[130px]" />

  <div className="relative mx-auto max-w-[92rem]">
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
          Pakai jasa pembuatan website
        </p>

        <h2 className="mt-5 max-w-5xl text-6xl font-light leading-[0.88] tracking-[-0.085em] md:text-[8.5rem]">
          Kamu fokus bisnis, teknis kami urus.
        </h2>

        <p className="mt-8 max-w-2xl text-xl font-light leading-9 text-white/45">
          Dari konsep halaman sampai website online, kami bantu susun agar
          bisnismu punya link resmi yang enak dilihat, mudah dipahami, dan
          siap dibagikan ke calon customer.
        </p>
      </div>

      <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl md:p-8">
        <div className="rounded-[2rem] bg-white p-6 text-black md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/35">
            Included setup
          </p>

          <h3 className="mt-5 max-w-2xl text-4xl font-light leading-[0.95] tracking-[-0.06em] md:text-6xl">
            Website bukan cuma tampilan. Ada sistem teknis di belakangnya.
          </h3>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {handledByUs.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-black/10 bg-[#f4f0e8] px-4 py-4 text-sm font-bold text-black/65"
              >
                <span className="mr-2 text-[#ff2f1f]">/</span>
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-black p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
              Authentic design
            </p>
            <p className="mt-3 text-3xl font-light leading-none tracking-[-0.06em]">
              Bukan asal pakai template yang sama untuk semua bisnis.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* PRICING */}
        <section
          id="pricing"
          className="relative z-10 bg-[#f4f0e8] px-4 py-24 text-black md:px-8 md:py-32"
        >
          <div className="mx-auto max-w-[92rem]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-black/40">
                  Pricing
                </p>
                <h2 className="mt-5 text-7xl font-light leading-[0.78] tracking-[-0.085em] md:text-[9rem]">
                  Pick your level.
                </h2>
              </div>

              <p className="max-w-xl text-xl font-light leading-8 text-black/55">
                Paket terima beres untuk vendor, UMKM, dan bisnis yang ingin website langsung
                online tanpa ribet teknis. Biaya tahunan mulai sekitar 700 perak per hari agar
                website tetap hidup di internet.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {pricing.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "flex min-h-[570px] flex-col rounded-[1.7rem] border p-6 transition hover:-translate-y-1",
                    plan.highlight
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white/55 text-black backdrop-blur-xl hover:bg-white"
                  )}
                >
                  <p
                    className={cn(
                      "text-xs font-bold uppercase tracking-[0.24em]",
                      plan.highlight ? "text-[#ff2f1f]" : "text-black/35"
                    )}
                  >
                    {plan.badge}
                  </p>

                  <h3 className="mt-5 text-2xl font-bold tracking-[-0.04em]">
                    {plan.name}
                  </h3>

                  <p
                    className={cn(
                      "mt-3 min-h-14 text-sm font-light leading-6",
                      plan.highlight ? "text-white/45" : "text-black/45"
                    )}
                  >
                    {plan.desc}
                  </p>

                  <p className="mt-8 text-6xl font-light leading-none tracking-[-0.08em]">
                    {plan.price}
                  </p>

                  <div
                    className={cn(
                      "my-7 h-px",
                      plan.highlight ? "bg-white/10" : "bg-black/10"
                    )}
                  />

                  <ul className="flex-1 space-y-3">
                    {plan.items.map((item) => (
                      <li
                        key={item}
                        className={cn(
                          "flex gap-3 text-sm font-light leading-6",
                          plan.highlight ? "text-white/65" : "text-black/60"
                        )}
                      >
                        <span className={plan.highlight ? "text-[#ff2f1f]" : "text-black"}>
                          /
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={cn(
                      "mt-7 rounded-2xl border px-4 py-3",
                      plan.highlight
                        ? "border-white/10 bg-white/[0.05]"
                        : "border-black/10 bg-white/60"
                    )}
                  >
                    <p
                      className={cn(
                        "text-xs font-light",
                        plan.highlight ? "text-white/35" : "text-black/35"
                      )}
                    >
                      Perpanjangan
                    </p>
                    <p className="mt-1 text-sm font-bold">{plan.yearly}</p>
                  </div>

                  <a
                    href={plan.href}
                    target="_blank"
                    className={cn(
                      "mt-5 rounded-full px-5 py-3 text-center text-sm font-bold uppercase transition",
                      plan.highlight
                        ? "bg-[#ff2f1f] text-white hover:bg-white hover:text-black"
                        : "bg-black text-white hover:bg-[#ff2f1f]"
                    )}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVER PRICING */}
<section
  id="server"
  className="relative z-10 overflow-hidden bg-[#050505] px-4 py-24 text-white md:px-8 md:py-32"
>
  <div className="pointer-events-none absolute left-1/2 top-0 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[#ff2f1f]/15 blur-[130px]" />

  <div className="relative mx-auto max-w-[92rem]">
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
          Biaya sewa server
        </p>

        <h2 className="mt-5 max-w-5xl text-6xl font-light leading-[0.88] tracking-[-0.085em] md:text-[8.5rem]">
          Server murah, bukan murahan.
        </h2>
      </div>

      <p className="max-w-2xl text-xl font-light leading-8 text-white/45">
        Stop berpikir website harus mahal. Mulai sekitar 700 perak per hari,
        website kamu bisa online dengan hosting, SSL, unlimited traffic, dan
        storage yang cukup untuk kebutuhan bisnis.
      </p>
    </div>

    <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
      {serverPlans.map((plan, index) => (
        <div
          key={plan.name}
          className={cn(
            "rounded-[2rem] border p-7 backdrop-blur-xl transition hover:-translate-y-1 md:p-9",
            index === 0
              ? "border-[#ff2f1f]/40 bg-[#ff2f1f] text-black shadow-[0_40px_100px_rgba(255,47,31,.18)]"
              : "border-white/10 bg-white/[0.045] text-white hover:border-[#ff2f1f]/35"
          )}
        >
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-[0.25em]",
              index === 0 ? "text-black/55" : "text-[#ff2f1f]"
            )}
          >
            Server Plan
          </p>

          <div className="mt-6 flex items-start justify-between gap-5">
            <h3 className="text-4xl font-light tracking-[-0.06em]">
              {plan.name}
            </h3>

            <div
              className={cn(
                "rounded-full border px-4 py-2 text-right",
                index === 0
                  ? "border-black/10 bg-black/[0.06]"
                  : "border-white/10 bg-white/[0.04]"
              )}
            >
              <p
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.18em]",
                  index === 0 ? "text-black/45" : "text-white/35"
                )}
              >
                Compare
              </p>
              <p className="mt-1 text-xs font-bold">
                {plan.saving}
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-end gap-2">
            <p className="text-7xl font-light leading-none tracking-[-0.08em]">
              {plan.price}
            </p>
            {plan.price !== "Custom" && (
              <p
                className={cn(
                  "pb-2 text-xl font-light",
                  index === 0 ? "text-black/45" : "text-white/35"
                )}
              >
                / bulan
              </p>
            )}
          </div>

          <p
            className={cn(
              "mt-2 text-sm font-light line-through",
              index === 0 ? "text-black/35" : "text-white/25"
            )}
          >
            Provider lain sekitar {plan.normalCompare} / bulan
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            {[
              ["Storage", plan.storage],
              ["Traffic", plan.traffic],
              ["Domain", plan.domain],
              ["SSL", plan.ssl],
              ["Email", plan.email],
              ["Speed", plan.speed],
            ].map(([label, value]) => (
              <div
                key={label}
                className={cn(
                  "rounded-[1.25rem] border p-4",
                  index === 0
                    ? "border-black/10 bg-black/[0.06]"
                    : "border-white/10 bg-white/[0.04]"
                )}
              >
                <p
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-[0.2em]",
                    index === 0 ? "text-black/40" : "text-white/30"
                  )}
                >
                  {label}
                </p>
                <p className="mt-2 text-xl font-light tracking-[-0.04em]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <p
            className={cn(
              "mt-6 text-sm font-light leading-7",
              index === 0 ? "text-black/65" : "text-white/45"
            )}
          >
            {plan.desc}
          </p>
        </div>
      ))}
    </div>

    <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl md:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
            Semua paket server
          </p>
          <h3 className="mt-4 text-4xl font-light leading-none tracking-[-0.06em] md:text-6xl">
            Traffic unlimited. SSL included. Speed sama.
          </h3>
          <p className="mt-5 max-w-xl text-sm font-light leading-7 text-white/45">
            Kami fokus ke kebutuhan website bisnis: cepat diakses, storage cukup,
            domain bisa custom, dan biaya bulanan ringan. Fitur yang tidak relevan
            untuk website sederhana tidak kami jadikan gimmick.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {serverBenefits.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-light text-white/60"
            >
              <span className="mr-2 text-[#ff2f1f]">/</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_.75fr]">
        <div className="rounded-[1.5rem] bg-white p-6 text-black md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/35">
            Dibanding provider lain
          </p>
          <p className="mt-3 max-w-4xl text-3xl font-light leading-[1.05] tracking-[-0.05em] md:text-5xl">
            Mulai 10 ribu sudah dapat 10GB storage, unlimited traffic, SSL, dan
            speed yang sama untuk semua paket.
          </p>
          <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-black/55">
            Referensi provider lain bisa mulai sekitar 25rb, 60rb, sampai 160rb
            per bulan tergantung paket. Di SolusiVendor, kami bikin biaya lebih
            ringan supaya bisnis kecil bisa online dulu tanpa takut tagihan server.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-black p-6 text-white md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
            Butuh lebih besar?
          </p>
          <h3 className="mt-4 text-4xl font-light leading-none tracking-[-0.06em]">
            Storage bisa custom.
          </h3>
          <p className="mt-5 text-sm font-light leading-7 text-white/45">
            Untuk foto banyak, video, katalog besar, file download, atau sistem
            custom, kapasitas bisa dinaikkan sesuai kebutuhan.
          </p>
          <a
            href={whatsappService}
            target="_blank"
            className="mt-7 inline-flex rounded-full bg-[#ff2f1f] px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
          >
            Tanya custom server
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* FAQ */}
        <section id="faq" className="relative z-10 bg-[#f4f0e8] px-4 py-24 text-black md:px-8 md:py-32">
          <div className="mx-auto max-w-5xl">
            <p className="text-center text-sm font-bold uppercase tracking-[0.25em] text-black/40">
              FAQ
            </p>
            <h2 className="mt-5 text-center text-7xl font-light leading-[0.8] tracking-[-0.08em] md:text-9xl">
              Questions?
            </h2>

            <div className="mt-14 divide-y divide-black/10 border-y border-black/10">
              {faqs.map((faq, index) => (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="text-xl font-bold tracking-[-0.04em]">
                      {faq.q}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-xl transition group-hover:border-black group-hover:bg-black group-hover:text-white">
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  {openFaq === index && (
                    <p className="max-w-3xl pb-7 text-base font-light leading-8 text-black/55">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER RUNNING TEXT */}
        <footer className="relative z-10 overflow-hidden bg-[#050505] py-14 text-[#f4f0e8]">
          <div className="border-y border-white/10 py-8">
            <div className="flex w-max animate-[footerMarquee_26s_linear_infinite] items-center gap-10 whitespace-nowrap pr-10">
              {Array.from({ length: 8 }).map((_, index) => (
                <React.Fragment key={index}>
                  <span className="text-[18vw] font-light leading-none tracking-[-0.1em] text-white md:text-[10rem]">
                    SOLUSI<span className="font-bold text-[#ff2f1f]">VENDOR</span>
                  </span>
                  <span className="text-[18vw] font-light leading-none text-white/20 md:text-[10rem]">
                    /
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="mx-auto grid max-w-[92rem] gap-10 px-4 py-12 md:grid-cols-[1.2fr_.7fr_.7fr_.7fr] md:px-8">
            <div>
              <p className="text-4xl font-light tracking-[-0.07em]">
                SOLUSI<span className="font-bold text-[#ff2f1f]">VENDOR</span>
              </p>

              <p className="mt-5 max-w-sm text-sm font-light leading-7 text-white/40">
                Template dan website terima beres untuk vendor event yang ingin
                terlihat lebih profesional, lebih kredibel, dan siap menerima calon client.
              </p>
            </div>

            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-white/30">
                Explore
              </p>
              <div className="space-y-3 text-sm font-light text-white/55">
                <a href="#work" className="block hover:text-white">
                  Work
                </a>
                <a href="#offer" className="block hover:text-white">
                  Offer
                </a>
                <a href="#pricing" className="block hover:text-white">
                  Pricing
                </a>
                <a href="#faq" className="block hover:text-white">
                  FAQ
                </a>
              </div>
            </div>

            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-white/30">
                Product
              </p>
              <div className="space-y-3 text-sm font-light text-white/55">
                <Link href="/buytemplate" className="block hover:text-white">
                  Buy Template
                </Link>
                <a href="#pricing" className="block hover:text-white">
                  Terima Beres
                </a>
                <a href="#templates" className="block hover:text-white">
                  Template Library
                </a>
              </div>
            </div>

            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-white/30">
                Contact
              </p>
              <div className="space-y-3 text-sm font-light text-white/55">
                <a href={whatsappService} target="_blank" className="block hover:text-white">
                  WhatsApp
                </a>
                <a href="#" className="block hover:text-white">
                  Instagram
                </a>
                <a href="#" className="block hover:text-white">
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="mx-auto flex max-w-[92rem] flex-col justify-between gap-4 border-t border-white/10 px-4 pt-7 text-sm font-light text-white/35 md:flex-row md:px-8">
            <p>© 2026 SolusiVendor by vjmrtim. All Rights Reserved.</p>
            <p>Website premium untuk vendor event.</p>
          </div>
        </footer>

        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }

          body {
            overflow-x: hidden;
            background: #050505;
            font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          }

          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }

          @keyframes footerMarquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </main>
    </>
  );
}