import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  cloudVpsPackageTypes,
  formatRupiah,
  normalizePackageType,
  vpsAppTypes,
  vpsPackages,
  VPS_SUPPORT_WHATSAPP,
} from "@/lib/vps";
import { submitVpsOrder } from "@/app/vps-service/order/actions";

export const metadata: Metadata = {
  title: "Buat Cloud VPS",
  description: "Order SolusiVendor Cloud VPS dengan pembayaran manual.",
};

export const dynamic = "force-dynamic";

type OrderPageProps = {
  searchParams: Promise<{
    package?: string;
  }>;
};

export default async function VpsOrderPage({ searchParams }: OrderPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/vps-service/login?next=/vps-service/order");
  }

  const params = await searchParams;
  const selectedPackage = normalizePackageType(params.package || "") || "NANO";
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      businessName: true,
      name: true,
      email: true,
      whatsapp: true,
    },
  });

  return (
    <main className="min-h-screen bg-[#050b12] px-4 py-8 text-white md:px-8">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <Link href="/vps-service" className="text-2xl font-light">
          SOLUSI<span className="font-bold text-[#4fd1c5]">VENDOR</span>
        </Link>
        <div className="flex gap-3 text-xs font-bold uppercase tracking-widest text-white/55">
          <Link href="/vps-service/dashboard" className="hover:text-white">
            Panel
          </Link>
          <Link href="/vps-service" className="hover:text-white">
            Cloud VPS
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-6 py-10 lg:grid-cols-[1fr_.78fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#4fd1c5]">
            Create VPS
          </p>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
            Buat VPS Container Pertama
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/65">
            Pilih resource, simpan repo awal, tentukan app port, dan kirim order.
            Setelah pembayaran di-approve, VPS container kamu akan diprovision
            dan muncul di dashboard.
          </p>

          <form action={submitVpsOrder} className="mt-8 rounded-lg border border-white/10 bg-white/[0.055] p-5 md:p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/45">
                VPS package
                <select
                  name="packageType"
                  defaultValue={selectedPackage}
                  required
                  className="mt-2 w-full rounded-md border border-white/10 bg-[#050b12] px-4 py-3 text-base font-normal text-white outline-none"
                >
                  {cloudVpsPackageTypes.map((key) => {
                    const plan = vpsPackages[key];
                    return (
                      <option key={key} value={key}>
                        {plan.name} - {formatRupiah(plan.price)}/bulan
                      </option>
                    );
                  })}
                </select>
              </label>

              <label className="block text-xs font-bold uppercase tracking-widest text-white/45">
                App type
                <select
                  name="appType"
                  defaultValue="NEXTJS"
                  required
                  className="mt-2 w-full rounded-md border border-white/10 bg-[#050b12] px-4 py-3 text-base font-normal text-white outline-none"
                >
                  {vpsAppTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-4 block text-xs font-bold uppercase tracking-widest text-white/45">
              Project name
              <input
                name="projectName"
                type="text"
                defaultValue={user?.businessName || user?.name || ""}
                placeholder="sv-dashboard-client"
                required
                maxLength={120}
                className="mt-2 w-full rounded-md border border-white/10 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none placeholder:text-white/25"
              />
            </label>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/45">
                Repository URL
                <input
                  name="repoUrl"
                  type="url"
                  placeholder="https://github.com/user/project"
                  maxLength={300}
                  className="mt-2 w-full rounded-md border border-white/10 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none placeholder:text-white/25"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-widest text-white/45">
                Branch
                <input
                  name="branch"
                  type="text"
                  defaultValue="main"
                  maxLength={80}
                  className="mt-2 w-full rounded-md border border-white/10 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/45">
                Custom domain opsional
                <input
                  name="customDomain"
                  type="text"
                  placeholder="www.domainkamu.com"
                  maxLength={120}
                  className="mt-2 w-full rounded-md border border-white/10 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none placeholder:text-white/25"
                />
              </label>

              <label className="block text-xs font-bold uppercase tracking-widest text-white/45">
                App port
                <input
                  name="appPort"
                  type="number"
                  defaultValue="3000"
                  min={1024}
                  max={65535}
                  className="mt-2 w-full rounded-md border border-white/10 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none"
                />
              </label>
            </div>

            <label className="mt-4 block text-xs font-bold uppercase tracking-widest text-white/45">
              WhatsApp
              <input
                name="whatsapp"
                type="tel"
                defaultValue={user?.whatsapp || ""}
                placeholder="08xxxxxxxxxx"
                required
                maxLength={40}
                className="mt-2 w-full rounded-md border border-white/10 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none placeholder:text-white/25"
              />
            </label>

            <label className="mt-4 block text-xs font-bold uppercase tracking-widest text-white/45">
              Notes
              <textarea
                name="notes"
                rows={4}
                placeholder="Environment variable, database request, build note, atau instruksi awal."
                maxLength={1000}
                className="mt-2 w-full rounded-md border border-white/10 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none placeholder:text-white/25"
              />
            </label>

            <label className="mt-4 block text-xs font-bold uppercase tracking-widest text-white/45">
              Payment proof text/url optional
              <textarea
                name="paymentProof"
                rows={3}
                placeholder="Link bukti transfer atau keterangan pembayaran. Bisa juga dikirim via WhatsApp."
                maxLength={500}
                className="mt-2 w-full rounded-md border border-white/10 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none placeholder:text-white/25"
              />
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-[#4fd1c5] px-6 py-4 text-sm font-bold uppercase text-black transition hover:bg-white"
            >
              Submit VPS Order
            </button>
          </form>
        </div>

        <aside className="space-y-4">
          <section className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <p className="text-sm font-bold uppercase tracking-widest text-[#4fd1c5]">
              Manual billing
            </p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-white/70">
              <p>Status awal menjadi Waiting Payment jika bukti belum diisi.</p>
              <p>Admin akan approve manual dan mengaktifkan masa VPS default 30 hari.</p>
              <p>Provisioning container tetap dilakukan admin dari command preview, bukan dari web app.</p>
            </div>
            <a
              href={`https://wa.me/${VPS_SUPPORT_WHATSAPP}?text=Halo%20SolusiVendor%2C%20saya%20sudah%20submit%20order%20Cloud%20VPS.`}
              target="_blank"
              className="mt-5 block rounded-md border border-white/15 px-5 py-3 text-center text-xs font-bold uppercase text-white/75 hover:bg-white hover:text-black"
            >
              Kirim bukti via WhatsApp
            </a>
          </section>

          <section className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-5">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-100">
              VPS boundary
            </p>
            <p className="mt-3 text-sm leading-7 text-cyan-50/80">
              Kamu mendapat environment/container sendiri. Root host, Docker
              socket, dan terminal host utama tidak diberikan.
            </p>
          </section>
        </aside>
      </section>
    </main>
  );
}
