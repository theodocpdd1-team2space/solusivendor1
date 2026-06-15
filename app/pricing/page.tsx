import type { Metadata } from "next";
import Link from "next/link";
import { OrderButton } from "@/components/OrderButton";
import { formatRupiah, hostingPackages, templates } from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Harga template website, jasa website vendor, dan paket managed hosting SolusiVendor untuk vendor lokal dan UMKM.",
  alternates: {
    canonical: "https://solusivendor.com/pricing",
  },
};

export default function PricingPage() {
  const paidTemplates = templates.filter((template) => template.price > 0);

  return (
    <main className="min-h-screen bg-[#f4f0e8] text-black">
      <section className="px-4 py-8 md:px-8">
        <nav className="mx-auto flex max-w-[92rem] flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-light tracking-[-0.06em]">
            SOLUSI<span className="font-bold text-[#ff2f1f]">VENDOR</span>
          </Link>
          <div className="flex gap-3 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
            <Link href="/templates" className="hover:text-black">Templates</Link>
            <Link href="/vps-service" className="hover:text-black">VPS Service</Link>
            <Link href="/login" className="hover:text-black">Login</Link>
          </div>
        </nav>
      </section>

      <section className="px-4 pb-24 pt-16 md:px-8 md:pb-32">
        <div className="mx-auto max-w-[92rem]">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
            Pricing preview
          </p>
          <h1 className="mt-6 max-w-5xl text-6xl font-light leading-[0.88] tracking-[-0.08em] md:text-[8.5rem]">
            Mulai dari template, naik ke hosting.
          </h1>

          <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <article className="rounded-[1.5rem] border border-black/10 bg-white/70 p-7">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/35">
                Template
              </p>
              <h2 className="mt-4 text-4xl font-light tracking-[-0.06em]">
                Website Template
              </h2>
              <p className="mt-4 text-sm leading-7 text-black/55">
                Cocok untuk vendor yang mau edit sendiri dan mulai cepat.
              </p>
              <p className="mt-8 text-4xl font-light tracking-[-0.06em]">
                {formatRupiah(Math.min(...paidTemplates.map((item) => item.price)))}
              </p>
              <Link
                href="/templates"
                className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-xs font-bold uppercase text-white"
              >
                Browse Templates
              </Link>
            </article>

            {hostingPackages.slice(0, 2).map((plan) => (
              <article
                key={plan.id}
                className="rounded-[1.5rem] border border-black/10 bg-white/70 p-7"
              >
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff2f1f]">
                  Hosting
                </p>
                <h2 className="mt-4 text-4xl font-light tracking-[-0.06em]">
                  {plan.name}
                </h2>
                <p className="mt-4 min-h-20 text-sm leading-7 text-black/55">
                  {plan.description}
                </p>
                <p className="mt-8 text-4xl font-light tracking-[-0.06em]">
                  {formatRupiah(plan.monthlyPrice)}
                  <span className="block text-sm text-black/45">per bulan</span>
                </p>
                <OrderButton
                  productType="hosting"
                  productId={plan.id}
                  className="mt-8 rounded-full bg-[#ff2f1f] px-6 py-3 text-xs font-bold uppercase text-white"
                >
                  Order Package
                </OrderButton>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
