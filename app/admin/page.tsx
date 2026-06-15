import type { Metadata } from "next";
import {
  demoInvoices,
  demoOrders,
  demoServices,
  demoUsers,
  formatRupiah,
  hostingPackages,
  templates,
} from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard foundation SolusiVendor.",
};

export default function AdminPage() {
  const stats = [
    ["Orders", demoOrders.length],
    ["Users", demoUsers.length],
    ["Templates", templates.length],
    ["Packages", hostingPackages.length],
    ["Services", demoServices.length],
    ["Invoices", demoInvoices.length],
  ];

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
        Admin dashboard
      </p>
      <h1 className="mt-4 text-5xl font-light tracking-[-0.07em] md:text-7xl">
        Kelola platform vendor.
      </h1>

      <div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-6">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">{label}</p>
            <p className="mt-5 text-4xl font-light tracking-[-0.06em]">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
          <h2 className="text-2xl font-light tracking-[-0.04em]">Recent Orders</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[38rem] text-left text-sm">
              <tbody className="divide-y divide-white/10">
                {demoOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-4 text-white/45">{order.id}</td>
                    <td className="py-4">{order.userName}</td>
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
          <h2 className="text-2xl font-light tracking-[-0.04em]">Payment Status</h2>
          <div className="mt-5 space-y-3">
            {demoInvoices.map((invoice) => (
              <div key={invoice.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap justify-between gap-3">
                  <p>{invoice.id}</p>
                  <p>{formatRupiah(invoice.amount)}</p>
                  <p className="uppercase text-[#ff2f1f]">{invoice.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
