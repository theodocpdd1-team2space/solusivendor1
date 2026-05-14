"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

const whatsappTemplate =
  "https://wa.me/6281234567890?text=Halo%20SolusiVendor%2C%20saya%20mau%20beli%20template%20website%2099rb.";

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
    desc: `Template website ${type.toLowerCase()} siap pakai untuk portfolio, pricelist, dan tombol WhatsApp.`,
  };
});

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
    <main className="min-h-screen overflow-hidden bg-[#080806] text-[#f4f0e8] selection:bg-[#ff3b1f] selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_70%_0%,rgba(255,59,31,.18),transparent_34rem),radial-gradient(circle_at_10%_20%,rgba(255,255,255,.07),transparent_28rem)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:72px_72px]" />

      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#080806]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[92rem] items-center justify-between px-4 py-5 md:px-8">
          <Link href="/" className="font-display text-3xl tracking-[-0.06em]">
            SOLUSI<span className="text-[#ff3b1f]">VENDOR</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/#work"
              className="text-xs font-bold uppercase tracking-[0.18em] text-white/45 transition hover:text-white"
            >
              Work
            </Link>
            <Link
              href="/#pricing"
              className="text-xs font-bold uppercase tracking-[0.18em] text-white/45 transition hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/buytemplate"
              className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff3b1f]"
            >
              Templates
            </Link>
          </div>

          <a
            href={whatsappTemplate}
            target="_blank"
            className="rounded-full bg-[#ff3b1f] px-5 py-3 text-xs font-bold uppercase text-white transition hover:bg-white hover:text-black"
          >
            Buy 99rb
          </a>
        </div>
      </nav>

      <section className="relative z-10 px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <p className="mb-6 text-sm font-bold uppercase tracking-[0.32em] text-[#ff3b1f]">
                50 template website vendor
              </p>

              <h1 className="font-display text-[21vw] leading-[0.76] tracking-[-0.09em] text-[#f4f0e8] md:text-[15vw] lg:text-[11rem]">
                BUY
                <span className="block">TEMPLATE.</span>
              </h1>
            </div>

            <div className="pb-2 lg:pb-8">
              <p className="max-w-xl text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-white/85 md:text-5xl">
                Website vendor siap pakai. Tinggal pilih, edit, lalu online.
              </p>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
                Cocok untuk vendor event yang mau mulai cepat: portfolio,
                pricelist, katalog layanan, kontak, dan tombol WhatsApp dalam
                satu halaman profesional.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#template-list"
                  className="rounded-full bg-[#ff3b1f] px-7 py-4 text-center text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
                >
                  Lihat 50 Template
                </a>
                <a
                  href={whatsappTemplate}
                  target="_blank"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-center text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
                >
                  Beli Template 99rb
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 border-y border-white/10 md:grid-cols-4">
            {[
              ["50", "template options"],
              ["99rb", "sekali beli"],
              ["DIY", "edit sendiri"],
              ["Upgrade", "bisa terima beres"],
            ].map(([value, label]) => (
              <div
                key={value}
                className="border-r border-white/10 p-5 last:border-r-0 md:p-8"
              >
                <p className="font-display text-6xl leading-none tracking-[-0.07em] md:text-8xl">
                  {value}
                </p>
                <p className="mt-3 max-w-40 text-sm leading-5 text-white/40">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden border-y border-white/10 bg-[#ff3b1f] py-5 text-black">
        <div className="flex w-max animate-[marquee_34s_linear_infinite] items-center gap-10 whitespace-nowrap pr-10">
          {[...templateTypes, ...templateTypes, ...templateTypes].map(
            (item, index) => (
              <React.Fragment key={`${item}-${index}`}>
                <span className="font-display text-5xl uppercase leading-none tracking-[-0.07em] md:text-8xl">
                  {item}
                </span>
                <span className="font-display text-5xl md:text-8xl">/</span>
              </React.Fragment>
            )
          )}
        </div>
      </section>

      <section
        id="template-list"
        className="relative z-10 bg-[#f4f0e8] px-4 py-20 text-black md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-[92rem]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-black/40">
                Portfolio template
              </p>
              <h2 className="mt-5 font-display text-7xl leading-[0.78] tracking-[-0.085em] md:text-[8.5rem]">
                PICK YOUR LOOK.
              </h2>
            </div>

            <p className="max-w-xl text-xl font-medium leading-8 text-black/55">
              Ini masih placeholder list. Nanti Theo tinggal isi HTML/CSS untuk
              masing-masing `/template1` sampai `/template50`.
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
                    : "border-black/10 bg-white/60 text-black/55 hover:bg-white hover:text-black"
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
                className="group overflow-hidden rounded-[1.6rem] border border-black/10 bg-white/65 p-4 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-2xl"
              >
                <div className="relative overflow-hidden rounded-[1.2rem] bg-black">
                  <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:32px_32px]" />

                  <div
                    className={cn(
                      "relative h-72 p-5 transition duration-500 group-hover:scale-[1.03]",
                      template.id % 5 === 0 &&
                        "bg-[radial-gradient(circle_at_70%_20%,rgba(255,59,31,.55),transparent_12rem)]",
                      template.id % 5 === 1 &&
                        "bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,.28),transparent_12rem)]",
                      template.id % 5 === 2 &&
                        "bg-[radial-gradient(circle_at_80%_0%,rgba(251,191,36,.55),transparent_12rem)]",
                      template.id % 5 === 3 &&
                        "bg-[linear-gradient(135deg,rgba(255,59,31,.42),transparent_45%)]",
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
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ff3b1f]">
                        {template.type}
                      </p>
                      <h3 className="font-display text-5xl leading-[0.82] tracking-[-0.08em] text-white">
                        TEMPLATE
                        <span className="block">{template.id}</span>
                      </h3>

                      <div className="mt-5 h-2 w-28 rounded-full bg-[#ff3b1f]" />
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
                      99rb
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-black/50">
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

          <div className="mt-16 rounded-[2rem] bg-black p-7 text-white md:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff3b1f]">
                  Sudah pilih template?
                </p>
                <h3 className="mt-4 max-w-3xl text-4xl font-bold leading-none tracking-[-0.06em] md:text-6xl">
                  Beli template 99rb, atau upgrade jadi terima beres.
                </h3>
              </div>

              <a
                href={whatsappTemplate}
                target="_blank"
                className="rounded-full bg-[#ff3b1f] px-8 py-4 text-center text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
              >
                Chat beli template
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-[#080806] px-4 py-14 text-[#f4f0e8] md:px-8">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.3fr_.7fr_.7fr]">
            <div>
              <p className="font-display text-4xl tracking-[-0.07em]">
                SOLUSI<span className="text-[#ff3b1f]">VENDOR</span>
              </p>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/45">
                Template dan website terima beres untuk vendor event yang ingin
                terlihat lebih profesional dan siap menerima calon client.
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
            <p>50 template website vendor event.</p>
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