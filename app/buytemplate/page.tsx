"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

const whatsappTemplate =
  "https://wa.me/6281234567890?text=Halo%20SolusiVendor%2C%20saya%20mau%20beli%20template%20website%20promo%2079rb.";

const whatsappHosting =
  "https://wa.me/6281234567890?text=Halo%20SolusiVendor%2C%20saya%20mau%20pakai%20jasa%20hosting%20website%20vendor%20mulai%2049rb.";

const categories = [
  "All",
  "Sound System",
  "Wedding",
  "Lighting",
  "Live Streaming",
  "Decoration",
  "Multimedia",
  "Rental",
];

const templateTypes = [
  "Sound System",
  "Wedding",
  "Lighting",
  "Live Streaming",
  "Decoration",
  "Multimedia",
  "Rental",
  "Event Organizer",
];

const templates = Array.from({ length: 50 }, (_, index) => {
  const number = index + 1;
  const type = templateTypes[index % templateTypes.length];

  return {
    id: number,
    title: `Template ${number}`,
    href: `/template${number}`,
    type,
    style:
      index % 5 === 0
        ? "Dark Premium"
        : index % 5 === 1
        ? "Clean Minimal"
        : index % 5 === 2
        ? "Luxury Gold"
        : index % 5 === 3
        ? "Bold Editorial"
        : "Modern Glass",
    desc: `Template ${type.toLowerCase()} untuk portfolio, pricelist, layanan, testimoni, FAQ, dan tombol WhatsApp.`,
  };
});

const valuePoints = [
  {
    no: "01",
    title: "Template premium, bukan layout kosong",
    desc: "Struktur sudah diarahkan untuk kebutuhan vendor: hero, layanan, portfolio, pricelist, testimoni, FAQ, dan tombol WhatsApp. Jadi kamu tidak mulai dari halaman putih kosong.",
  },
  {
    no: "02",
    title: "Bisa kamu edit sendiri unlimited",
    desc: "Ganti teks, foto, harga, warna, section, portfolio, dan halaman sesuai kebutuhan vendor kamu. Tidak harus bayar developer setiap revisi kecil.",
  },
  {
    no: "03",
    title: "Tidak cuma 1 page",
    desc: "Kamu bisa buat halaman sebanyak mungkin: halaman layanan, paket harga, gallery event, detail portfolio, promo seasonal, sampai landing page khusus iklan.",
  },
  {
    no: "04",
    title: "Portfolio bisa dibuat sebanyak mungkin",
    desc: "Tampilkan dokumentasi event sebanyak yang kamu punya agar calon client lebih cepat percaya sebelum menghubungi WhatsApp.",
  },
  {
    no: "05",
    title: "Dapat panduan edit dan connect domain",
    desc: "Kami beri arahan dasar supaya kamu paham cara mengganti konten, menyusun file, dan menghubungkan website ke domain sendiri.",
  },
  {
    no: "06",
    title: "Bisa naik level ke hosting dan bantuan online",
    desc: "Kalau setelah edit kamu bingung upload, domain, SSL, atau hosting, kami bisa bantu sampai website online.",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function BuyTemplatePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates = useMemo(() => {
    if (activeCategory === "All") return templates;
    return templates.filter((template) => template.type === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#080806] text-[#f4f0e8] selection:bg-[#ff2f1f] selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_0%,rgba(255,47,31,.18),transparent_34rem),radial-gradient(circle_at_10%_20%,rgba(255,255,255,.07),transparent_28rem)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:72px_72px]" />

      <a
        href={whatsappTemplate}
        target="_blank"
        className="fixed bottom-5 right-5 z-[70] flex h-16 w-16 items-center justify-center rounded-full bg-[#21c45a] text-lg font-black text-black shadow-[0_20px_60px_rgba(33,196,90,.35)] transition hover:scale-105 md:bottom-8 md:right-8"
      >
        WA
      </a>

      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#080806]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[92rem] items-center justify-between px-4 py-4 md:px-8 md:py-5">
          <Link
            href="/"
            className="text-2xl font-light tracking-[-0.06em] md:text-3xl"
          >
            SOLUSI<span className="font-bold text-[#ff2f1f]">VENDOR</span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {[
              ["Home", "/"],
              ["Work", "/#work"],
              ["Pricing", "/#pricing"],
              ["Template", "/buytemplate"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  "text-xs font-bold uppercase tracking-[0.18em] transition",
                  label === "Template"
                    ? "text-[#ff2f1f]"
                    : "text-white/45 hover:text-white"
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          <a
            href={whatsappTemplate}
            target="_blank"
            className="rounded-full bg-[#ff2f1f] px-4 py-3 text-xs font-bold uppercase text-white transition hover:bg-white hover:text-black md:px-5"
          >
            Buy Now
          </a>
        </div>
      </nav>

      <section className="relative z-10 px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-[#ff2f1f]" />
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/55">
                  Promo 3 orang pertama: 79rb
                </p>
              </div>

              <h1 className="text-[18vw] font-light leading-[0.82] tracking-[-0.09em] text-[#f4f0e8] md:text-[13vw] lg:text-[9.5rem]">
                BUY
                <span className="block">TEMPLATE.</span>
              </h1>
            </div>

            <div className="pb-2 lg:pb-8">
              <p className="max-w-xl text-3xl font-light leading-[1.05] tracking-[-0.06em] text-white/90 md:text-5xl">
                Buat website vendor sendiri, tanpa mulai dari nol.
              </p>

              <p className="mt-6 max-w-lg text-base font-light leading-7 text-white/45 md:text-lg">
                Pilih template premium, edit sesuai brand kamu, isi portfolio
                sebanyak mungkin, lalu online-kan dengan domain sendiri. Cocok
                untuk vendor event yang mau terlihat lebih profesional tanpa
                biaya besar.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#template-list"
                  className="rounded-full bg-[#ff2f1f] px-7 py-4 text-center text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
                >
                  Lihat Template
                </a>
                <a
                  href={whatsappTemplate}
                  target="_blank"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-center text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
                >
                  Beli Promo 79rb
                </a>
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 border-y border-white/10 md:mt-16 md:grid-cols-4">
            {[
              ["100++", "template premium"],
              ["500rb", "worth value"],
              ["99rb", "harga normal"],
              ["79rb", "promo 3 orang"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border-b border-r border-white/10 p-5 last:border-r-0 md:border-b-0 md:p-8"
              >
                <p className="text-5xl font-light leading-none tracking-[-0.07em] md:text-8xl">
                  {value}
                </p>
                <p className="mt-3 max-w-40 text-sm font-light leading-5 text-white/40">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden border-y border-white/10 bg-[#ff2f1f] py-4 text-black md:py-5">
        <div className="flex w-max animate-[marquee_34s_linear_infinite] items-center gap-8 whitespace-nowrap pr-8 md:gap-10 md:pr-10">
          {[...templateTypes, ...templateTypes, ...templateTypes].map(
            (item, index) => (
              <React.Fragment key={`${item}-${index}`}>
                <span className="text-4xl font-light uppercase leading-none tracking-[-0.07em] md:text-8xl">
                  {item}
                </span>
                <span className="text-4xl font-light md:text-8xl">/</span>
              </React.Fragment>
            )
          )}
        </div>
      </section>

      <section className="relative z-10 bg-[#f4f0e8] px-4 py-20 text-black md:px-8 md:py-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-black/35">
                Bukan cuma file template
              </p>

              <h2 className="mt-5 text-6xl font-light leading-[0.84] tracking-[-0.085em] md:text-[8.5rem]">
                Kamu beli sistem mulai.
              </h2>

              <p className="mt-7 max-w-xl text-lg font-light leading-8 text-black/55">
                Banyak vendor stuck bukan karena jasanya jelek, tapi karena
                tampilannya belum rapi saat calon client mencari portfolio,
                pricelist, dan bukti kerja. Template SolusiVendor dibuat supaya
                kamu bisa mulai tampil profesional tanpa harus bayar website
                mahal dari nol.
              </p>
            </div>

            <div className="space-y-4">
              {valuePoints.map((item) => (
                <div
                  key={item.no}
                  className="group rounded-[1.75rem] border border-black/10 bg-white/70 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl md:p-8"
                >
                  <div className="flex items-start justify-between gap-5">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-black/35">
                      Value
                    </p>
                    <p className="text-sm font-black text-[#ff2f1f]">
                      {item.no}
                    </p>
                  </div>

                  <h3 className="mt-8 text-3xl font-semibold leading-none tracking-[-0.055em] md:text-4xl">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-2xl text-base font-light leading-8 text-black/55">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#f4f0e8] px-4 pb-20 text-black md:px-8 md:pb-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="rounded-[2.5rem] bg-black p-8 text-white shadow-[0_40px_120px_rgba(0,0,0,.18)] md:p-14 lg:p-20">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
              Mindset utama
            </p>

            <h2 className="mt-8 max-w-6xl text-5xl font-light leading-[0.95] tracking-[-0.075em] md:text-7xl lg:text-8xl">
              Kamu bisa bikin website vendor sendiri, lalu kami bantu online-kan
              kalau kamu butuh.
            </h2>

            <p className="mt-8 max-w-4xl text-lg font-light leading-9 text-white/45 md:text-xl">
              Cocok untuk vendor yang mau hemat, mau belajar, tapi tetap ingin
              hasil yang terlihat serius di mata client. Mulai dari template,
              lanjut ke hosting, lalu scale up ketika bisnis kamu sudah makin
              siap.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#f4f0e8] px-4 pb-20 text-black md:px-8 md:pb-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/60 p-5 backdrop-blur-xl md:p-8">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="rounded-[1.5rem] bg-black p-7 text-white md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                  Tanpa website
                </p>
                <h3 className="mt-6 text-4xl font-light leading-none tracking-[-0.06em]">
                  Portfolio tercecer.
                </h3>
                <p className="mt-5 text-sm font-light leading-7 text-white/45">
                  Foto ada di galeri HP, pricelist dikirim manual, dan calon
                  client harus tanya ulang hal yang sama berkali-kali.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-black/10 bg-[#f4f0e8] p-7 md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/35">
                  Dengan template
                </p>
                <h3 className="mt-6 text-4xl font-light leading-none tracking-[-0.06em]">
                  Semua jadi satu link.
                </h3>
                <p className="mt-5 text-sm font-light leading-7 text-black/55">
                  Portfolio, pricelist, layanan, FAQ, dan tombol WhatsApp tampil
                  rapi dalam satu website resmi vendor kamu.
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-[#ff2f1f] p-7 text-black md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/55">
                  Result
                </p>
                <h3 className="mt-6 text-4xl font-semibold leading-none tracking-[-0.06em]">
                  Lebih siap closing.
                </h3>
                <p className="mt-5 text-sm font-medium leading-7 text-black/65">
                  Client lebih cepat paham, lebih mudah percaya, dan lebih
                  gampang klik WhatsApp karena semua informasi sudah tersusun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="template-list"
        className="relative z-10 bg-[#f4f0e8] px-4 pb-20 text-black md:px-8 md:pb-28"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-black/40">
                Portfolio template
              </p>
              <h2 className="mt-5 text-6xl font-light leading-[0.82] tracking-[-0.08em] md:text-[8.5rem]">
                PICK YOUR LOOK.
              </h2>
            </div>

            <p className="max-w-xl text-xl font-light leading-8 text-black/55">
              Klik template untuk preview. Nanti kamu bisa isi sendiri HTML/CSS,
              portfolio, foto event, paket harga, FAQ, dan tombol WhatsApp.
            </p>
          </div>

          <div className="mt-10 flex gap-2 overflow-x-auto pb-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "shrink-0 rounded-full border px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] transition",
                  activeCategory === category
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-white/70 text-black/55 hover:bg-white hover:text-black"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredTemplates.map((template) => (
              <Link
                key={template.id}
                href={template.href}
                className="group overflow-hidden rounded-[1.6rem] border border-black/10 bg-white/70 p-4 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-2xl"
              >
                <div className="relative overflow-hidden rounded-[1.2rem] bg-black">
                  <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:32px_32px]" />

                  <div
                    className={cn(
                      "relative h-64 p-5 transition duration-500 group-hover:scale-[1.03] md:h-72",
                      template.id % 5 === 0 &&
                        "bg-[radial-gradient(circle_at_70%_20%,rgba(255,47,31,.55),transparent_12rem)]",
                      template.id % 5 === 1 &&
                        "bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,.28),transparent_12rem)]",
                      template.id % 5 === 2 &&
                        "bg-[radial-gradient(circle_at_80%_0%,rgba(251,191,36,.55),transparent_12rem)]",
                      template.id % 5 === 3 &&
                        "bg-[linear-gradient(135deg,rgba(255,47,31,.42),transparent_45%)]",
                      template.id % 5 === 4 &&
                        "bg-[radial-gradient(circle_at_50%_0%,rgba(80,120,255,.35),transparent_12rem)]"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                        SV / {String(template.id).padStart(2, "0")}
                      </p>
                      <div className="h-9 w-9 rounded-full border border-white/15" />
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                        {template.type}
                      </p>
                      <h3 className="text-5xl font-light leading-[0.82] tracking-[-0.08em] text-white">
                        TEMPLATE
                        <span className="block">{template.id}</span>
                      </h3>

                      <div className="mt-5 h-2 w-28 rounded-full bg-[#ff2f1f]" />
                      <div className="mt-3 h-2 w-44 rounded-full bg-white/15" />
                      <div className="mt-2 h-2 w-32 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>

                <div className="p-2 pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/35">
                        {template.style}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em]">
                        {template.title}
                      </h3>
                    </div>

                    <span className="rounded-full bg-black px-3 py-1.5 text-xs font-bold text-white">
                      79rb
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-light leading-6 text-black/50">
                    {template.desc}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">
                      View template
                    </span>
                    <span className="text-2xl transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#080806] px-4 py-20 text-white md:px-8 md:py-28">
        <div className="pointer-events-none absolute right-0 top-0 h-[36rem] w-[36rem] rounded-full bg-[#ff2f1f]/15 blur-[120px]" />

        <div className="relative mx-auto max-w-[92rem]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
                Offer utama
              </p>
              <h2 className="mt-5 text-6xl font-light leading-[0.84] tracking-[-0.085em] md:text-[8.5rem]">
                Beli template. Edit sendiri.
              </h2>
            </div>

            <p className="max-w-2xl text-xl font-light leading-8 text-white/45">
              Untuk vendor yang mau punya website cepat tanpa mulai dari nol.
              Kamu dapat file template premium, bisa edit sebanyak mungkin, dan
              bisa upgrade ke hosting kalau sudah siap online.
            </p>
          </div>

          <div className="mt-14 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl md:p-10 lg:p-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
              <div>
                <div className="mb-8 inline-flex rounded-full border border-white/10 px-4 py-2">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/35">
                    3 slot pertama
                  </p>
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                  Template file
                </p>

                <div className="mt-8">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/25 line-through">
                    Worth value 500rb
                  </p>
                  <p className="mt-3 text-sm font-bold uppercase tracking-[0.22em] text-white/35 line-through">
                    Harga normal 99rb
                  </p>
                  <h3 className="mt-4 text-8xl font-light leading-none tracking-[-0.09em] text-white md:text-[9rem]">
                    79rb
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="max-w-3xl text-4xl font-light leading-[0.95] tracking-[-0.06em] md:text-6xl">
                  Dapat template premium yang bisa kamu pakai untuk membangun
                  website vendor sendiri.
                </h3>

                <p className="mt-6 max-w-2xl text-base font-light leading-8 text-white/45">
                  Cocok untuk vendor yang mau belajar, mau hemat, dan ingin
                  punya tampilan profesional tanpa langsung bayar jasa website
                  dari nol.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    "100++ pilihan template premium",
                    "Bebas edit dan tambah halaman",
                    "Bisa tampilkan portfolio sebanyak mungkin",
                    "Bisa buat halaman pricelist sendiri",
                    "Panduan edit template",
                    "Tutorial connect domain",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-light text-white/60"
                    >
                      <span className="mr-3 text-[#ff2f1f]">/</span>
                      {item}
                    </div>
                  ))}
                </div>

                <a
                  href={whatsappTemplate}
                  target="_blank"
                  className="mt-8 inline-flex rounded-full bg-[#ff2f1f] px-7 py-4 text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
                >
                  Ambil promo 79rb
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#080806] px-4 pb-20 text-white md:px-8 md:pb-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid grid-cols-1 gap-10 rounded-[2.5rem] border border-[#ff2f1f]/25 bg-white/[0.045] p-6 backdrop-blur-xl md:p-10 lg:grid-cols-[.9fr_1.1fr] lg:p-14">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
                Hosting diskon seumur hidup
              </p>

              <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-end">
                <h2 className="text-[5.5rem] font-light leading-none tracking-[-0.085em] sm:text-8xl md:text-[8rem] lg:text-[9rem]">
                  10rb
                </h2>

                <span className="text-2xl font-light leading-none tracking-[-0.04em] text-white/35 sm:pb-4 md:text-4xl">
                  / bulan
                </span>
              </div>

              <p className="mt-7 max-w-xl text-base font-light leading-8 text-white/45 md:text-lg">
                Beli template di SolusiVendor dan dapat diskon hosting seumur
                hidup. Pakai server kami untuk bantu website vendor kamu tetap
                online, ringan, dan siap dipakai untuk grow bisnis.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["10GB", "space website"],
                ["Unlimited", "bandwidth bulanan"],
                ["SSL", "support keamanan"],
                ["Server", "kami bantu kelola"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 md:p-7"
                >
                  <p className="text-4xl font-light tracking-[-0.07em] md:text-5xl">
                    {value}
                  </p>
                  <p className="mt-2 text-sm font-light leading-6 text-white/35">
                    {label}
                  </p>
                </div>
              ))}

              <div className="col-span-2 rounded-[1.5rem] bg-[#ff2f1f] p-6 text-black md:p-8">
                <h3 className="text-3xl font-light tracking-[-0.06em] md:text-5xl">
                  Hosting murah untuk vendor yang mau fokus grow bisnis.
                </h3>
                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-black/65">
                  Cocok untuk website portfolio, landing page, pricelist,
                  halaman layanan, dan halaman promosi vendor event.
                </p>

                <a
                  href={whatsappHosting}
                  target="_blank"
                  className="mt-7 inline-flex rounded-full bg-black px-7 py-4 text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
                >
                  Tanya hosting
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#080806] px-4 pb-20 text-white md:px-8 md:pb-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="overflow-hidden rounded-[2.5rem] bg-[#ff2f1f] p-6 text-black shadow-[0_40px_120px_rgba(255,47,31,.25)] md:p-10 lg:p-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-black/55">
                  Jasa hosting file
                </p>

                <h2 className="mt-6 text-7xl font-light leading-none tracking-[-0.085em] md:text-[9rem]">
                  Start 49rb
                </h2>
              </div>

              <div>
                <h3 className="max-w-3xl text-4xl font-light leading-[0.95] tracking-[-0.06em] md:text-6xl">
                  Sudah ikuti tutorial tapi masih pusing? Kami bantu sampai
                  online.
                </h3>

                <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-black/65">
                  Kirim file web kamu ke kami. Kami bantu upload, setting
                  hosting, hubungkan domain, dan cek sampai website bisa
                  diakses.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    "Upload file website",
                    "Bantu arahkan domain",
                    "Setup hosting dasar",
                    "Cek tampilan website",
                    "Cocok sampai 3 pages",
                    "Bisa lanjut upgrade",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-black/10 bg-black/[0.06] px-4 py-4 text-sm font-medium text-black/70"
                    >
                      <span className="mr-3">/</span>
                      {item}
                    </div>
                  ))}
                </div>

                <a
                  href={whatsappHosting}
                  target="_blank"
                  className="mt-8 inline-flex rounded-full bg-black px-7 py-4 text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
                >
                  Bantu online-kan
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#080806] px-4 pb-20 text-white md:px-8 md:pb-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl md:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                  Go digital now
                </p>
                <h3 className="mt-4 max-w-4xl text-4xl font-light leading-[0.95] tracking-[-0.06em] md:text-7xl">
                  Bukan waktunya portfolio vendor cuma numpuk di chat.
                </h3>
                <p className="mt-5 max-w-2xl text-base font-light leading-8 text-white/45">
                  Mulai dari template, naik ke hosting, lalu scale ke website
                  yang lebih serius. Kami mau jadi solusi digital untuk vendor
                  kamu.
                </p>
              </div>

              <a
                href={whatsappTemplate}
                target="_blank"
                className="rounded-full bg-white px-8 py-4 text-center text-sm font-bold uppercase text-black transition hover:bg-[#ff2f1f] hover:text-white"
              >
                Buy now
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 overflow-hidden bg-[#050505] px-4 py-14 text-[#f4f0e8] md:px-8">
        <div className="mb-10 flex w-max animate-[marquee_36s_linear_infinite] items-center gap-8 whitespace-nowrap text-white/10">
          {[...Array(4)].map((_, index) => (
            <React.Fragment key={index}>
              <span className="text-[18vw] font-light leading-none tracking-[-0.09em]">
                SOLUSIVENDOR
              </span>
              <span className="text-[18vw] font-light leading-none tracking-[-0.09em]">
                /
              </span>
            </React.Fragment>
          ))}
        </div>

        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.3fr_.7fr_.7fr]">
            <div>
              <p className="text-4xl font-light tracking-[-0.07em]">
                SOLUSI<span className="font-bold text-[#ff2f1f]">VENDOR</span>
              </p>
              <p className="mt-5 max-w-md text-sm font-light leading-7 text-white/45">
                Template, hosting murah, dan solusi website untuk vendor event
                yang ingin tampil lebih profesional.
              </p>
            </div>

            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/30">
                Pages
              </p>
              <div className="space-y-3 text-sm text-white/55">
                <Link href="/">Home</Link>
                <br />
                <Link href="/buytemplate">Buy Template</Link>
                <br />
                <Link href="/#pricing">Pricing</Link>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/30">
                Contact
              </p>
              <div className="space-y-3 text-sm text-white/55">
                <a href={whatsappTemplate} target="_blank">
                  WhatsApp
                </a>
                <br />
                <a href="#">Instagram</a>
                <br />
                <a href="#">Email</a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-4 text-sm text-white/35 md:flex-row">
            <p>© 2026 SolusiVendor by vjmrtim.</p>
            <p>Go digital now.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        body {
          overflow-x: hidden;
          background: #080806;
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </main>
  );
}
