import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  formatDate,
  formatRupiah,
  orderStatusLabel,
  statusBadgeClass,
  vpsPackages,
  VPS_SUPPORT_WHATSAPP,
} from "@/lib/vps";

export const metadata: Metadata = {
  title: "Cloud VPS Billing",
  description: "Billing manual dan masa aktif SolusiVendor Cloud VPS.",
};

export const dynamic = "force-dynamic";

export default async function VpsBillingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/vps-service/login?next=/vps-service/billing");
  }

  const client = await prisma.vpsClient.findUnique({
    where: { userId: session.user.id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          projects: {
            select: { id: true, name: true, activeUntil: true, status: true },
          },
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#050b12] px-4 py-8 text-white md:px-8">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <Link href="/vps-service/dashboard" className="text-2xl font-light">
          SOLUSI<span className="font-bold text-[#4fd1c5]">VENDOR</span>
        </Link>
        <div className="flex gap-3 text-xs font-bold uppercase tracking-widest text-white/55">
          <Link href="/vps-service/projects" className="hover:text-white">
            Projects
          </Link>
          <Link href="/vps-service/order" className="hover:text-white">
            Create VPS
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl py-10">
        <p className="text-sm font-bold uppercase tracking-widest text-[#4fd1c5]">
          Billing
        </p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Manual billing & active period</h1>
        <p className="mt-3 max-w-2xl leading-7 text-white/60">
          Payment gateway belum aktif. Pembayaran dilakukan manual, approval
          dilakukan admin, dan masa aktif VPS muncul di sini.
        </p>

        <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
          <section className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <h2 className="text-2xl font-semibold">Orders</h2>
            <div className="mt-5 space-y-3">
              {client?.orders.map((order) => (
                <article key={order.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{order.projectName}</p>
                      <p className="mt-1 text-sm text-white/50">
                        {vpsPackages[order.packageType].name} - {formatRupiah(order.amount)}
                      </p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusBadgeClass(order.status)}`}>
                      {orderStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <Info label="Active from" value={formatDate(order.activeFrom)} />
                    <Info label="Active until" value={formatDate(order.activeUntil)} />
                    <Info label="Approved at" value={formatDate(order.approvedAt)} />
                  </div>
                </article>
              ))}
              {!client?.orders.length ? (
                <p className="rounded-lg border border-white/10 bg-black/20 p-5 text-white/45">
                  Belum ada order VPS.
                </p>
              ) : null}
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-lg border border-amber-300/25 bg-amber-300/10 p-5">
              <h2 className="text-2xl font-semibold text-amber-50">Payment Instruction</h2>
              <p className="mt-3 text-sm leading-7 text-amber-50/80">
                Transfer manual sesuai instruksi admin, lalu kirim bukti
                pembayaran via WhatsApp. Status akan diubah admin setelah dicek.
              </p>
              <a
                href={`https://wa.me/${VPS_SUPPORT_WHATSAPP}?text=Halo%20SolusiVendor%2C%20saya%20mau%20kirim%20bukti%20pembayaran%20Cloud%20VPS.`}
                target="_blank"
                className="mt-5 block rounded-md bg-white px-5 py-3 text-center text-xs font-bold uppercase text-black"
              >
                Kirim Bukti Pembayaran
              </a>
            </section>

            <section className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
              <h2 className="text-2xl font-semibold">Billing Boundary</h2>
              <p className="mt-3 text-sm leading-7 text-white/60">
                Payment gateway, auto-renewal, dan auto-suspend belum aktif di MVP.
                Admin masih mengelola approval dan masa aktif secara manual.
              </p>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs font-bold uppercase tracking-widest text-white/35">{label}</p>
      <p className="mt-2 text-sm text-white/75">{value}</p>
    </div>
  );
}
