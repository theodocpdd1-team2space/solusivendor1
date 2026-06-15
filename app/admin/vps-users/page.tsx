import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  clientStatusLabel,
  formatDate,
  projectStatusLabel,
  statusBadgeClass,
  vpsPackages,
} from "@/lib/vps";

export const dynamic = "force-dynamic";

export default async function AdminVpsUsersPage() {
  const clients = await prisma.vpsClient.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { role: true, status: true },
      },
      orders: {
        orderBy: { createdAt: "desc" },
        take: 3,
      },
      projects: {
        orderBy: { createdAt: "desc" },
        take: 3,
      },
      _count: {
        select: {
          orders: true,
          projects: true,
        },
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
          <h1 className="text-4xl font-semibold">VPS Users</h1>
          <p className="mt-2 text-white/50">Client profiles connected to hosting orders.</p>
        </div>
        <Link
          href="/admin/vps-orders"
          className="rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase text-white/70 hover:bg-white hover:text-black"
        >
          VPS Orders
        </Link>
      </div>

      <div className="mt-6 grid gap-4">
        {clients.map((client) => (
          <article key={client.id} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-2xl font-semibold">{client.name}</p>
                <p className="mt-1 text-sm text-white/50">
                  {client.email} - {client.whatsapp}
                </p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusBadgeClass(client.status)}`}>
                {clientStatusLabel(client.status)}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Info label="Orders" value={String(client._count.orders)} />
              <Info label="Projects" value={String(client._count.projects)} />
              <Info label="Created" value={formatDate(client.createdAt)} />
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <section className="rounded-lg border border-white/10 bg-black/20 p-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white/40">Latest orders</h2>
                <div className="mt-3 space-y-2">
                  {client.orders.map((order) => (
                    <Link
                      key={order.id}
                      href={`/admin/vps-orders/${order.id}`}
                      className="block rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm hover:border-white/25"
                    >
                      <p className="font-semibold">{order.projectName}</p>
                      <p className="mt-1 text-white/45">
                        {vpsPackages[order.packageType].name} - {order.status}
                      </p>
                    </Link>
                  ))}
                  {!client.orders.length ? (
                    <p className="text-sm text-white/45">Belum ada order.</p>
                  ) : null}
                </div>
              </section>

              <section className="rounded-lg border border-white/10 bg-black/20 p-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white/40">Projects</h2>
                <div className="mt-3 space-y-2">
                  {client.projects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/admin/vps-projects/${project.id}`}
                      className="block rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm hover:border-white/25"
                    >
                      <p className="font-semibold">{project.name}</p>
                      <p className="mt-1 text-white/45">
                        {project.defaultSubdomain || "No subdomain"} - {projectStatusLabel(project.status)}
                      </p>
                    </Link>
                  ))}
                  {!client.projects.length ? (
                    <p className="text-sm text-white/45">Belum ada project.</p>
                  ) : null}
                </div>
              </section>
            </div>
          </article>
        ))}

        {!clients.length ? (
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-8 text-center text-white/45">
            Belum ada VPS client.
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-white/35">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
