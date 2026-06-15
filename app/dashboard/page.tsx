import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { LogoutButton } from "@/components/LogoutButton";
import { authOptions } from "@/lib/auth";
import {
  demoInvoices,
  demoOrders,
  demoServices,
  formatRupiah,
  hostingPackages,
  templates,
} from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard user SolusiVendor untuk layanan, template, order, invoice, dan akun.",
};

export const dynamic = "force-dynamic";

const purchasedTemplates = templates.slice(0, 2);
const activeServices = demoServices;

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const displayName =
    user?.businessName || user?.name || user?.email || "Vendor SolusiVendor";

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="border-b border-white/10 px-4 py-5 md:px-8">
        <nav className="mx-auto flex max-w-[92rem] flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-light tracking-[-0.06em]">
            SOLUSI<span className="font-bold text-[#ff2f1f]">VENDOR</span>
          </Link>
          <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.14em] text-white/50">
            <Link href="/templates" className="hover:text-white">Templates</Link>
            <Link href="/vps-service" className="hover:text-white">VPS Service</Link>
            <Link href="/admin" className="hover:text-white">Admin</Link>
            <LogoutButton />
          </div>
        </nav>
      </section>

      <section className="px-4 py-10 md:px-8">
        <div className="mx-auto max-w-[92rem]">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
            Vendor dashboard
          </p>
          <h1 className="mt-4 text-5xl font-light tracking-[-0.07em] md:text-7xl">
            Selamat datang, {displayName}.
          </h1>
          <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.14em] text-white/45">
            <span className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2">
              {user?.email}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2">
              Role: {user?.role}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2">
              Status: {user?.status || "ACTIVE"}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              ["My Services", String(activeServices.length)],
              ["My Templates", String(purchasedTemplates.length)],
              ["Orders", String(demoOrders.length)],
              ["Invoices", String(demoInvoices.length)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/35">{label}</p>
                <p className="mt-5 text-5xl font-light tracking-[-0.06em]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/templates" className="rounded-full bg-[#ff2f1f] px-6 py-3 text-center text-xs font-bold uppercase">
              Browse templates
            </Link>
            <Link href="/vps-service" className="rounded-full border border-white/15 px-6 py-3 text-center text-xs font-bold uppercase text-white/70">
              Order VPS service
            </Link>
            <a href="https://wa.me/62895345902896" target="_blank" className="rounded-full border border-white/15 px-6 py-3 text-center text-xs font-bold uppercase text-white/70">
              Contact support
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 xl:grid-cols-[1.1fr_.9fr]">
            <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
              <h2 className="text-2xl font-light tracking-[-0.04em]">My Services</h2>
              <div className="mt-5 space-y-3">
                {activeServices.map((service) => {
                  const plan = hostingPackages.find((item) => item.id === service.packageId);
                  return (
                    <div key={service.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-bold">{plan?.name || service.packageId}</p>
                          <p className="mt-1 text-sm text-white/45">{service.domain || "Domain belum diisi"}</p>
                        </div>
                        <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-bold uppercase text-green-200">
                          {service.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
              <h2 className="text-2xl font-light tracking-[-0.04em]">My Templates</h2>
              <div className="mt-5 space-y-3">
                {purchasedTemplates.map((template) => (
                  <Link key={template.id} href={`/templates/${template.slug}`} className="block rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="font-bold">{template.name}</p>
                    <p className="mt-1 text-sm text-white/45">{template.category}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
            <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
              <h2 className="text-2xl font-light tracking-[-0.04em]">Orders</h2>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[36rem] text-left text-sm">
                  <tbody className="divide-y divide-white/10">
                    {demoOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="py-4 text-white/45">{order.id}</td>
                        <td className="py-4">{order.productName}</td>
                        <td className="py-4">{formatRupiah(order.amount)}</td>
                        <td className="py-4 uppercase text-[#ff2f1f]">{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
              <h2 className="text-2xl font-light tracking-[-0.04em]">Invoices & Account</h2>
              <div className="mt-5 space-y-3">
                {demoInvoices.map((invoice) => (
                  <div key={invoice.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex justify-between gap-4">
                      <p>{invoice.id}</p>
                      <p>{formatRupiah(invoice.amount)}</p>
                    </div>
                    <p className="mt-2 text-sm uppercase text-white/45">{invoice.status} - due {invoice.dueDate}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
