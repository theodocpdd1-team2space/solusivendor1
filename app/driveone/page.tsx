import type { Metadata } from "next";
import Link from "next/link";

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
    <main className="min-h-screen bg-[#041012] text-white">
      <header className="border-b border-cyan-300/15 px-4 py-5 md:px-8">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-light tracking-[-0.06em]">
            DRIVE<span className="font-bold text-cyan-200">ONE</span>
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-cyan-50/60">
            <Link href="/" className="hover:text-white">
              SolusiVendor
            </Link>
            <Link href="/vps-service" className="hover:text-white">
              Cloud
            </Link>
            <a
              href={whatsappDriveOne}
              className="rounded-full border border-cyan-200/25 px-4 py-2 hover:bg-cyan-100 hover:text-black"
            >
              Contact
            </a>
          </div>
        </nav>
      </header>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">
              Product by SolusiVendor
            </p>
            <h1 className="mt-6 text-5xl font-light leading-tight tracking-[-0.07em] md:text-8xl">
              DriveOne
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cyan-50/70 md:text-xl">
              Storage dan file hosting untuk menyimpan, membagikan, dan
              mengelola file bisnis secara lebih rapi.
            </p>
            <p className="mt-5 max-w-2xl leading-8 text-cyan-50/55">
              DriveOne sedang disiapkan sebagai produk terpisah by SolusiVendor
              untuk asset bisnis, katalog produk, portfolio, file download,
              materi client, dan backup ringan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappDriveOne}
                className="rounded-full bg-cyan-100 px-7 py-4 text-center text-sm font-bold uppercase text-black hover:bg-white"
              >
                Konsultasi DriveOne
              </a>
              <Link
                href="/"
                className="rounded-full border border-cyan-200/20 px-7 py-4 text-center text-sm font-bold uppercase text-cyan-50/75 hover:bg-white hover:text-black"
              >
                Kembali ke SolusiVendor
              </Link>
            </div>
          </div>

          <div className="rounded-[1rem] border border-cyan-300/20 bg-cyan-300/10 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-100/70">
              Coming soon
            </p>
            <h2 className="mt-4 text-3xl font-light tracking-[-0.04em]">
              File bisnis jangan tercecer di chat.
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {useCases.map((item) => (
                <div key={item} className="rounded-[.75rem] border border-cyan-300/20 bg-black/20 p-4 text-sm text-cyan-50/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
