import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderButton } from "@/components/OrderButton";
import { formatRupiah, getTemplateBySlug, templates } from "@/lib/platform-data";

type TemplateDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({
  params,
}: TemplateDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    return { title: "Template tidak ditemukan" };
  }

  return {
    title: template.name,
    description: template.description,
    alternates: {
      canonical: `https://solusivendor.com/templates/${template.slug}`,
    },
  };
}

export default async function TemplateDetailPage({ params }: TemplateDetailProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) notFound();

  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f0e8]">
      <section className="px-4 py-8 md:px-8">
        <nav className="mx-auto flex max-w-[92rem] items-center justify-between">
          <Link href="/" className="text-2xl font-light tracking-[-0.06em]">
            SOLUSI<span className="font-bold text-[#ff2f1f]">VENDOR</span>
          </Link>
          <Link
            href="/templates"
            className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold uppercase text-white/70 transition hover:bg-white hover:text-black"
          >
            Back to templates
          </Link>
        </nav>
      </section>

      <section className="px-4 pb-24 pt-10 md:px-8 md:pb-32">
        <div className="mx-auto grid max-w-[92rem] grid-cols-1 gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4">
            <div className="relative flex min-h-[32rem] items-end overflow-hidden rounded-[1rem] bg-black p-7 md:p-10">
              <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:44px_44px]" />
              <div className="absolute right-[-6rem] top-[-4rem] h-[24rem] w-[24rem] rounded-full bg-[#ff2f1f]/35 blur-[90px]" />
              <div className="relative max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
                  Big preview
                </p>
                <h1 className="mt-5 text-6xl font-light leading-[0.86] tracking-[-0.08em] md:text-[8rem]">
                  {template.name}
                </h1>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-8">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#ff2f1f]">
              {template.category}
            </p>
            <h2 className="mt-4 text-5xl font-light leading-none tracking-[-0.07em]">
              {formatRupiah(template.price)}
            </h2>
            <p className="mt-6 text-base font-light leading-8 text-white/50">
              {template.description}
            </p>

            <div className="mt-8 rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                Features
              </p>
              <ul className="mt-5 space-y-4">
                {template.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-white/65">
                    <span className="text-[#ff2f1f]">/</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <OrderButton
              productType="template"
              productId={template.id}
              className="mt-8 w-full rounded-full bg-[#ff2f1f] px-7 py-4 text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
            >
              Buy Template
            </OrderButton>
          </aside>
        </div>
      </section>
    </main>
  );
}
