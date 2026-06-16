import type { Metadata } from "next";
import Link from "next/link";
import { OrderButton } from "@/components/OrderButton";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import {
  formatRupiah,
  templateCategories,
  templates,
} from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "Template Website Vendor",
  description:
    "Marketplace template website untuk vendor wedding, sound system, live streaming, event organizer, photography, komunitas, dan bisnis lokal.",
  alternates: {
    canonical: "https://solusivendor.com/templates",
  },
};

export default function TemplatesPage() {
  return (
    <div className="site-page">
      <SiteNavbar />
      <main>
      <section className="relative overflow-hidden px-4 pb-16 pt-20 md:px-8 md:pb-24 md:pt-28">
        <div className="relative mx-auto max-w-[92rem]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow">
                Template marketplace
              </p>
              <h1 className="display-title mt-6">
                Pilih website vendor yang siap jualan.
              </h1>
            </div>
            <p className="max-w-2xl text-xl leading-9 text-muted">
              Template SolusiVendor dibuat untuk vendor lokal: sound system,
              wedding, live streaming, dokumentasi, EO, komunitas, dan UMKM.
              Pakai dummy catalog dulu, siap dihubungkan ke database dan checkout.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {["All", ...templateCategories].map((category) => (
              <span
                key={category}
                className="rounded-full border border-white/10 bg-white/[0.045] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white/55"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto grid max-w-[92rem] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <article
              key={template.id}
              className="card overflow-hidden p-4"
            >
              <div className="relative flex aspect-[16/10] items-end overflow-hidden rounded-[1rem] bg-black p-5">
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff2f1f]">
                    {template.category}
                  </p>
                  <h2 className="mt-3 text-4xl font-light leading-none tracking-[-0.06em]">
                    {template.name}
                  </h2>
                </div>
              </div>

              <div className="p-2 pt-6">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
                      {template.price === 0 ? "free" : "paid"}
                    </p>
                    <p className="mt-2 text-2xl font-light tracking-[-0.04em]">
                      {formatRupiah(template.price)}
                    </p>
                  </div>
                  <span className="rounded-full border border-green-400/25 bg-green-400/10 px-3 py-1 text-xs font-bold uppercase text-green-200">
                    {template.status}
                  </span>
                </div>

                <p className="mt-5 min-h-20 text-sm font-light leading-7 text-white/48">
                  {template.description}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/templates/${template.slug}`}
                    className="rounded-full border border-white/15 px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-white hover:text-black"
                  >
                    Preview
                  </Link>
                  <OrderButton
                    productType="template"
                    productId={template.id}
                    className="rounded-full bg-[#ff2f1f] px-5 py-3 text-xs font-bold uppercase text-white transition hover:bg-white hover:text-black"
                  >
                    Buy Template
                  </OrderButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      </main>
      <SiteFooter />
    </div>
  );
}
