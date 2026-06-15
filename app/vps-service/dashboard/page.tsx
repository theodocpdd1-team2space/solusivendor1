import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  clientStatusLabel,
  formatDate,
  formatRupiah,
  orderStatusLabel,
  projectStatusLabel,
  statusBadgeClass,
  vpsPackages,
  VPS_SUPPORT_WHATSAPP,
} from "@/lib/vps";

export const metadata: Metadata = {
  title: "Cloud VPS Panel",
  description: "Panel client SolusiVendor Cloud VPS.",
};

export const dynamic = "force-dynamic";

export default async function VpsDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/vps-service/login?next=/vps-service/dashboard");
  }

  const client = await prisma.vpsClient.findUnique({
    where: { userId: session.user.id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
      },
      projects: {
        orderBy: { createdAt: "desc" },
        include: {
          domains: { orderBy: { createdAt: "asc" } },
          repository: true,
          database: true,
        },
      },
      activityLogs: {
        orderBy: { createdAt: "desc" },
        take: 8,
      },
    },
  });

  const primaryOrder = client?.orders[0];
  const primaryProject = client?.projects[0];
  const activePackage = primaryProject?.packageType || primaryOrder?.packageType;
  const packageConfig = activePackage ? vpsPackages[activePackage] : null;
  const activeUntil = primaryProject?.activeUntil || primaryOrder?.activeUntil;

  return (
    <main className="min-h-screen bg-[#050b12] text-white">
      <header className="border-b border-white/10 px-4 py-5 md:px-8">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link href="/vps-service" className="text-2xl font-light">
            SOLUSI<span className="font-bold text-[#4fd1c5]">VENDOR</span>
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/55">
            <Link href="/vps-service/projects" className="hover:text-white">
              Projects
            </Link>
            <Link href="/vps-service/billing" className="hover:text-white">
              Billing
            </Link>
            <Link href="/vps-service/order" className="hover:text-white">
              Create VPS
            </Link>
            <LogoutButton />
          </div>
        </nav>
      </header>

      <section className="px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-widest text-[#4fd1c5]">
            SolusiVendor Cloud VPS Panel
          </p>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
            Control panel VPS container
          </h1>
          <p className="mt-3 text-white/55">{session.user.email}</p>

          {!client ? (
            <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.055] p-8 text-center">
              <p className="text-2xl font-semibold">Belum ada VPS aktif</p>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-white/60">
                Buat VPS container pertama untuk mulai mengelola repo, database,
                domain, logs, dan billing dari panel SolusiVendor.
              </p>
              <Link
                href="/vps-service/order"
                className="mt-6 inline-flex rounded-md bg-[#4fd1c5] px-6 py-3 text-xs font-bold uppercase text-black hover:bg-white"
              >
                Buat VPS Container Pertama
              </Link>
            </section>
          ) : (
            <>
              <div className="mt-8 grid gap-4 md:grid-cols-4">
                <MetricCard title="VPS status" value={clientStatusLabel(client.status)} status={client.status} />
                <MetricCard title="Active plan" value={packageConfig?.name || "Belum aktif"} />
                <MetricCard title="Active until" value={formatDate(activeUntil)} />
                <MetricCard title="Billing" value={primaryOrder ? orderStatusLabel(primaryOrder.status) : "No order"} status={primaryOrder?.status} />
              </div>

              {packageConfig ? (
                <section className="mt-5 rounded-lg border border-white/10 bg-white/[0.045] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-semibold">Resource Limits</h2>
                      <p className="mt-1 text-sm text-white/50">
                        Limit paket aktif untuk VPS container kamu.
                      </p>
                    </div>
                    <Link
                      href="/vps-service/billing"
                      className="rounded-md border border-white/15 px-4 py-2 text-xs font-bold uppercase text-white/70 hover:bg-white hover:text-black"
                    >
                      View Billing
                    </Link>
                  </div>
                  <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
                    <Resource label="RAM" value={packageConfig.memoryLabel} />
                    <Resource label="CPU" value={packageConfig.cpuLabel} />
                    <Resource label="Storage" value={packageConfig.storageLabel} />
                    <Resource label="Apps" value={`${packageConfig.appLimit} app`} />
                    <Resource label="Databases" value={`${packageConfig.dbLimit} DB`} />
                    <Resource label="Domains" value={`${packageConfig.domainLimit} domain`} />
                  </div>
                </section>
              ) : null}

              <div className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
                <section className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-semibold">VPS Projects</h2>
                      <p className="mt-1 text-sm text-white/50">
                        Container, repository, database, domain, dan runtime status.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link href="/vps-service/order" className="rounded-md border border-white/15 px-4 py-2 text-xs font-bold uppercase text-white/70 hover:bg-white hover:text-black">
                        Create Project
                      </Link>
                      <Link href="/vps-service/projects" className="rounded-md bg-[#4fd1c5] px-4 py-2 text-xs font-bold uppercase text-black hover:bg-white">
                        Open Projects
                      </Link>
                    </div>
                  </div>

                  {client.projects.length ? (
                    <div className="mt-5 grid gap-4">
                      {client.projects.map((project) => (
                        <article key={project.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="text-xl font-semibold">{project.name}</p>
                              <p className="mt-1 text-sm text-white/50">
                                {vpsPackages[project.packageType].name} - {project.appType}
                              </p>
                            </div>
                            <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusBadgeClass(project.status)}`}>
                              {projectStatusLabel(project.status)}
                            </span>
                          </div>

                          <div className="mt-4 grid gap-3 md:grid-cols-3">
                            <InfoLine label="Container" value={project.containerName || "Waiting provisioning"} />
                            <InfoLine label="App URL" value={project.appUrl || project.defaultSubdomain || "Not ready"} />
                            <InfoLine label="App port" value={String(project.appPort || project.repository?.appPort || 3000)} />
                            <InfoLine label="Repository" value={project.repository?.repoUrl || "Belum diatur"} />
                            <InfoLine label="Database" value={project.database?.status || "Not requested"} />
                            <InfoLine label="Domains" value={`${project.domains.length}/${vpsPackages[project.packageType].domainLimit}`} />
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <Link href={`/vps-service/projects/${project.id}`} className="rounded-md bg-white px-4 py-2 text-xs font-bold uppercase text-black hover:bg-[#4fd1c5]">
                              Manage VPS
                            </Link>
                            <Link href={`/vps-service/projects/${project.id}#repository`} className="rounded-md border border-white/15 px-4 py-2 text-xs font-bold uppercase text-white/65 hover:bg-white hover:text-black">
                              Request Deploy
                            </Link>
                            <Link href={`/vps-service/projects/${project.id}#terminal`} className="rounded-md border border-white/15 px-4 py-2 text-xs font-bold uppercase text-white/65 hover:bg-white hover:text-black">
                              Open Terminal
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-5 rounded-lg border border-white/10 bg-black/20 p-5">
                      <p className="font-semibold">Belum ada VPS aktif</p>
                      <p className="mt-2 text-sm leading-6 text-white/55">
                        Setelah order di-approve, project VPS akan muncul di sini.
                      </p>
                      <Link href="/vps-service/order" className="mt-4 inline-flex rounded-md bg-[#4fd1c5] px-4 py-2 text-xs font-bold uppercase text-black">
                        Buat VPS Container Pertama
                      </Link>
                    </div>
                  )}
                </section>

                <aside className="space-y-5">
                  <section className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
                    <h2 className="text-2xl font-semibold">Quick Actions</h2>
                    <div className="mt-4 grid gap-2">
                      <Link href="/vps-service/order" className="rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75 hover:bg-white hover:text-black">
                        Create Project
                      </Link>
                      <Link href={primaryProject ? `/vps-service/projects/${primaryProject.id}#domains` : "/vps-service/projects"} className="rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75 hover:bg-white hover:text-black">
                        Add Domain
                      </Link>
                      <Link href={primaryProject ? `/vps-service/projects/${primaryProject.id}#terminal` : "/vps-service/projects"} className="rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75 hover:bg-white hover:text-black">
                        Open Terminal
                      </Link>
                      <Link href={primaryProject ? `/vps-service/projects/${primaryProject.id}#repository` : "/vps-service/projects"} className="rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75 hover:bg-white hover:text-black">
                        Request Deploy
                      </Link>
                      <Link href="/vps-service/billing" className="rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75 hover:bg-white hover:text-black">
                        View Billing
                      </Link>
                    </div>
                  </section>

                  <section className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
                    <h2 className="text-2xl font-semibold">Billing & Payment</h2>
                    {client.orders.length ? (
                      <div className="mt-4 space-y-3">
                        {client.orders.slice(0, 3).map((order) => (
                          <div key={order.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="font-semibold">{order.projectName}</p>
                                <p className="mt-1 text-sm text-white/50">
                                  {vpsPackages[order.packageType].name} - {formatRupiah(order.amount)}
                                </p>
                              </div>
                              <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusBadgeClass(order.status)}`}>
                                {orderStatusLabel(order.status)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm leading-6 text-white/55">Belum ada invoice/order.</p>
                    )}
                  </section>

                  <section className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-5">
                    <h2 className="text-2xl font-semibold text-cyan-50">Support</h2>
                    <p className="mt-3 text-sm leading-7 text-cyan-50/80">
                      VPS ini self-service bertahap. Admin tetap bantu provisioning,
                      pembayaran, dan issue container.
                    </p>
                    <a
                      href={`https://wa.me/${VPS_SUPPORT_WHATSAPP}?text=Halo%20SolusiVendor%2C%20saya%20mau%20cek%20status%20Cloud%20VPS.`}
                      target="_blank"
                      className="mt-5 block rounded-md bg-white px-5 py-3 text-center text-xs font-bold uppercase text-black"
                    >
                      Support WhatsApp
                    </a>
                  </section>
                </aside>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function MetricCard({
  title,
  value,
  status,
}: {
  title: string;
  value: string;
  status?: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-white/40">{title}</p>
      <p className="mt-4 text-2xl font-semibold">{value}</p>
      {status ? (
        <span className={`mt-4 inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusBadgeClass(status)}`}>
          {status}
        </span>
      ) : null}
    </div>
  );
}

function Resource({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-white/35">{label}</p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs font-bold uppercase tracking-widest text-white/35">{label}</p>
      <p className="mt-2 break-words text-sm text-white/75">{value}</p>
    </div>
  );
}
