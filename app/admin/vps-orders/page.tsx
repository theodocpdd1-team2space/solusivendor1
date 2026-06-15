import Link from "next/link";
import type { ReactNode } from "react";
import { prisma } from "@/lib/prisma";
import {
  formatDate,
  formatRupiah,
  normalizeOrderStatus,
  orderStatusLabel,
  statusBadgeClass,
  vpsOrderStatuses,
  vpsPackages,
} from "@/lib/vps";

export const dynamic = "force-dynamic";

type VpsOrdersPageProps = {
  searchParams: Promise<{
    status?: string;
  }>;
};

export default async function AdminVpsOrdersPage({ searchParams }: VpsOrdersPageProps) {
  const params = await searchParams;
  const selectedStatus = normalizeOrderStatus(params.status || "");
  const orders = await prisma.vpsOrder.findMany({
    where: selectedStatus ? { status: selectedStatus } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      client: true,
      projects: {
        select: { id: true, status: true, defaultSubdomain: true },
      },
    },
  });

  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-widest text-[#ff4b3e]">
        Container hosting
      </p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold">VPS Orders</h1>
          <p className="mt-2 text-white/50">Manual payment and approval queue.</p>
        </div>
        <Link
          href="/admin/vps-projects"
          className="rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase text-white/70 hover:bg-white hover:text-black"
        >
          VPS Projects
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterLink href="/admin/vps-orders" active={!selectedStatus}>
          Semua
        </FilterLink>
        {vpsOrderStatuses.map((status) => (
          <FilterLink
            key={status}
            href={`/admin/vps-orders?status=${status}`}
            active={selectedStatus === status}
          >
            {orderStatusLabel(status)}
          </FilterLink>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.045] p-4">
        <table className="w-full min-w-[62rem] text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-white/35">
            <tr>
              <th className="pb-4">Client</th>
              <th className="pb-4">Project</th>
              <th className="pb-4">Package</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Active until</th>
              <th className="pb-4">Created</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-4">
                  <p className="font-semibold">{order.client.name}</p>
                  <p className="mt-1 text-white/45">{order.client.email}</p>
                </td>
                <td className="py-4">
                  <p>{order.projectName}</p>
                  <p className="mt-1 text-white/45">{order.customDomain || order.projects[0]?.defaultSubdomain || "No domain"}</p>
                </td>
                <td className="py-4">{vpsPackages[order.packageType].name}</td>
                <td className="py-4">{formatRupiah(order.amount)}</td>
                <td className="py-4">
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusBadgeClass(order.status)}`}>
                    {orderStatusLabel(order.status)}
                  </span>
                </td>
                <td className="py-4 text-white/60">{formatDate(order.activeUntil)}</td>
                <td className="py-4 text-white/60">{formatDate(order.createdAt)}</td>
                <td className="py-4">
                  <Link
                    href={`/admin/vps-orders/${order.id}`}
                    className="rounded-full bg-[#ff4b3e] px-4 py-2 text-xs font-bold uppercase text-white hover:bg-white hover:text-black"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
            {!orders.length ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-white/45">
                  Belum ada order VPS untuk filter ini.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-4 py-2 text-xs font-bold uppercase ${
        active
          ? "border-[#ff4b3e] bg-[#ff4b3e] text-white"
          : "border-white/10 text-white/55 hover:border-white/30 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
