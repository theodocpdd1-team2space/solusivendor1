import type { Metadata } from "next";
import Link from "next/link";
import {
  cloudVpsPackageTypes,
  formatRupiah,
  vpsPackages,
  VPS_SUPPORT_WHATSAPP,
} from "@/lib/vps";

export const metadata: Metadata = {
  title: "SolusiVendor Cloud VPS",
  description:
    "Private container VPS untuk deploy website, database, dan web app kecil dengan domain sendiri.",
  alternates: {
    canonical: "https://solusivendor.com/vps-service",
  },
};

const features = [
  ["Private Container", "Environment terisolasi untuk app, repo, dan service kamu."],
  ["Web Terminal", "Terminal container sendiri. Tidak ada akses root host utama."],
  ["Git Pull / Deploy", "Simpan repo, branch, command build, dan request deploy."],
  ["Database Sendiri", "Database diprovision admin dan credential tampil di panel."],
  ["Custom Domain", "Hubungkan domain sendiri lewat CNAME ke SolusiVendor."],
  ["Auto Restart", "Container disiapkan dengan restart policy untuk app kecil."],
  ["Logs", "Activity log dan placeholder logs viewer untuk proses deploy."],
  ["Manual Billing", "Pembayaran manual dulu, masa aktif tetap terlihat jelas."],
];

const useCases = [
  "Next.js App",
  "Node.js API",
  "Laravel/PHP later",
  "Landing Page",
  "Internal Dashboard",
  "UMKM SaaS kecil",
  "Portfolio Developer",
];

const steps = [
  "Register",
  "Choose VPS package",
  "Manual payment",
  "Admin approval",
  "VPS container provisioned",
  "Manage repo/database/domain from panel",
];

const faqs = [
  [
    "Apakah ini VPS beneran?",
    "Ini adalah VPS berbasis private container. Kamu mendapatkan environment terisolasi, terminal, database, repo, dan domain sendiri, tetapi tidak mendapat akses root ke host utama.",
  ],
  [
    "Apakah saya bisa pakai domain sendiri?",
    "Bisa. Kamu bisa arahkan CNAME domain kamu ke connect.solusivendor.com, lalu domain akan diarahkan ke container kamu.",
  ],
  [
    "Bisa deploy Next.js?",
    "Bisa. Kamu bisa menyimpan repo URL, branch, install command, build command, start command, dan app port.",
  ],
  [
    "Bisa punya database sendiri?",
    "Bisa. Untuk MVP, database dibuat/diaktifkan oleh admin dan credential akan muncul di panel kamu.",
  ],
  [
    "Bisa terminal?",
    "Terminal container akan tersedia di panel. Terminal hanya masuk ke container milik kamu, bukan host utama.",
  ],
  [
    "Apakah saya dapat root server?",
    "Tidak untuk host utama. Kamu hanya mendapat environment/container milik kamu sendiri.",
  ],
];

export default function VpsServicePage() {
  return (
    <main className="min-h-screen bg-[#050b12] text-white">
      <header className="border-b border-white/10 px-4 py-5 md:px-8">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-light">
            SOLUSI<span className="font-bold text-[#4fd1c5]">VENDOR</span>
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/60">
            <Link href="/vps-service/dashboard" className="hover:text-white">
              Panel
            </Link>
            <Link href="/vps-service/projects" className="hover:text-white">
              Projects
            </Link>
            <Link href="/vps-service/login" className="hover:text-white">
              Login
            </Link>
            <Link
              href="/vps-service/order"
              className="rounded-md bg-[#4fd1c5] px-5 py-2.5 text-black hover:bg-white"
            >
              Mulai Buat VPS
            </Link>
          </div>
        </nav>
      </header>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#4fd1c5]">
              SolusiVendor Cloud VPS
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
              VPS Container untuk Website & Web App Kecil
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
              Deploy project, kelola database, pull repo, dan hubungkan domain
              sendiri dari satu panel.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/vps-service/order"
                className="rounded-md bg-[#4fd1c5] px-7 py-4 text-center text-sm font-bold uppercase text-black transition hover:bg-white"
              >
                Mulai Buat VPS
              </Link>
              <a
                href="#paket"
                className="rounded-md border border-white/20 px-7 py-4 text-center text-sm font-bold uppercase text-white/85 transition hover:border-white hover:bg-white hover:text-black"
              >
                Lihat Paket
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-white/12 bg-white/[0.055] p-5 shadow-2xl shadow-cyan-950/40">
            <div className="rounded-lg border border-cyan-300/20 bg-[#071827] p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-cyan-200">
                    Private container VPS
                  </p>
                  <p className="mt-2 text-2xl font-semibold">workspace-umkm-01</p>
                </div>
                <span className="rounded-md border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs font-bold uppercase text-emerald-100">
                  Isolated
                </span>
              </div>
              <div className="mt-6 grid gap-3">
                {[
                  ["Runtime", "Node.js / Next.js"],
                  ["Repo", "github.com/client/app"],
                  ["Database", "Postgres requested"],
                  ["Domain", "www.client.id"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm"
                  >
                    <span className="text-white/45">{label}</span>
                    <span className="text-right font-mono text-cyan-100">{value}</span>
                  </div>
                ))}
              </div>
              <pre className="mt-5 overflow-x-auto rounded-md border border-white/10 bg-black/40 p-4 text-xs leading-6 text-cyan-100">
                {`$ git pull origin main\n$ npm run build\n$ npm run start -- --port 3000`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-[#4fd1c5]">
              Cloud VPS Features
            </p>
            <h2 className="mt-3 text-4xl font-semibold">
              Private workspace untuk deploy, database, domain, dan logs.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map(([title, copy]) => (
              <article key={title} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-widest text-[#4fd1c5]">
            Use cases
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {useCases.map((item) => (
              <span key={item} className="rounded-md border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-white/75">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="paket" className="px-4 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-[#4fd1c5]">
              Pricing
            </p>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
              Resource-based Container VPS.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {cloudVpsPackageTypes.map((key) => {
              const plan = vpsPackages[key];
              return (
                <article
                  key={key}
                  className={`rounded-lg border p-6 ${
                    key === "MICRO"
                      ? "border-[#4fd1c5] bg-[#4fd1c5] text-black"
                      : "border-white/10 bg-white/[0.055] text-white"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60">
                    {key === "MICRO" ? "Recommended" : "Private VPS"}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold">{plan.name}</h3>
                  <p className="mt-3 text-2xl font-semibold">
                    {formatRupiah(plan.price)}
                    <span className="text-sm font-medium opacity-60">/bulan</span>
                  </p>
                  <ul className="mt-6 space-y-3 text-sm leading-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span aria-hidden="true">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/vps-service/order?package=${key}`}
                    className={`mt-7 block rounded-md px-5 py-3 text-center text-xs font-bold uppercase ${
                      key === "MICRO"
                        ? "bg-black text-white hover:bg-white hover:text-black"
                        : "bg-white text-black hover:bg-[#4fd1c5]"
                    }`}
                  >
                    Pilih VPS
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#eef6f4] px-4 py-16 text-black md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-widest text-[#087568]">
            How it works
          </p>
          <h2 className="mt-3 text-4xl font-semibold">Mulai manual, panelnya tetap VPS-ready.</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step} className="rounded-lg border border-black/10 bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-black/40">
                  Step {index + 1}
                </p>
                <p className="mt-3 text-xl font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#4fd1c5]">
              FAQ
            </p>
            <h2 className="mt-3 text-4xl font-semibold">Cloud VPS berbasis container, jelas batasnya.</h2>
          </div>
          <div className="grid gap-3">
            {faqs.map(([question, answer]) => (
              <details key={question} className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
                <summary className="cursor-pointer text-lg font-semibold">{question}</summary>
                <p className="mt-3 leading-7 text-white/65">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-7xl rounded-lg border border-white/10 bg-white/[0.06] p-8 md:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-[#4fd1c5]">
            SolusiVendor Cloud VPS
          </p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-3xl text-4xl font-semibold md:text-5xl">
              Private container VPS untuk project kecil yang butuh repo, database, terminal, dan domain sendiri.
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/vps-service/order"
                className="rounded-md bg-[#4fd1c5] px-7 py-4 text-center text-sm font-bold uppercase text-black hover:bg-white"
              >
                Mulai Buat VPS
              </Link>
              <a
                href={`https://wa.me/${VPS_SUPPORT_WHATSAPP}?text=Halo%20SolusiVendor%2C%20saya%20mau%20konsultasi%20Cloud%20VPS.`}
                target="_blank"
                className="rounded-md border border-white/15 px-7 py-4 text-center text-sm font-bold uppercase text-white/75 hover:bg-white hover:text-black"
              >
                Konsultasi
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
