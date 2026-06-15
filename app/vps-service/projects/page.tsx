import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  databaseStatusLabel,
  formatDate,
  projectStatusLabel,
  statusBadgeClass,
  vpsPackages,
} from "@/lib/vps";

export const metadata: Metadata = {
  title: "Cloud VPS Projects",
  description: "Daftar project SolusiVendor Cloud VPS.",
};

export const dynamic = "force-dynamic";

export default async function VpsProjectsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/vps-service/login?next=/vps-service/projects");
  }

  const projects = await prisma.vpsProject.findMany({
    where: { client: { userId: session.user.id } },
    orderBy: { createdAt: "desc" },
    include: {
      domains: true,
      repository: true,
      database: true,
    },
  });

  return (
    <main className="min-h-screen bg-[#050b12] px-4 py-8 text-white md:px-8">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <Link href="/vps-service" className="text-2xl font-light">
          SOLUSI<span className="font-bold text-[#4fd1c5]">VENDOR</span>
        </Link>
        <div className="flex gap-3 text-xs font-bold uppercase tracking-widest text-white/55">
          <Link href="/vps-service/dashboard" className="hover:text-white">
            Panel
          </Link>
          <Link href="/vps-service/order" className="hover:text-white">
            Create VPS
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl py-10">
        <p className="text-sm font-bold uppercase tracking-widest text-[#4fd1c5]">
          VPS Projects
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold md:text-5xl">Private container environments</h1>
            <p className="mt-3 text-white/55">
              Kelola repo, database, domain, terminal placeholder, logs, dan billing.
            </p>
          </div>
          <Link
            href="/vps-service/order"
            className="rounded-md bg-[#4fd1c5] px-5 py-3 text-xs font-bold uppercase text-black hover:bg-white"
          >
            Buat VPS
          </Link>
        </div>

        {projects.length ? (
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/vps-service/projects/${project.id}`}
                className="rounded-lg border border-white/10 bg-white/[0.055] p-5 transition hover:border-[#4fd1c5]/60"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-2xl font-semibold">{project.name}</p>
                    <p className="mt-1 text-sm text-white/50">
                      {vpsPackages[project.packageType].name} - {project.appType}
                    </p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusBadgeClass(project.status)}`}>
                    {projectStatusLabel(project.status)}
                  </span>
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  <Info label="Container" value={project.containerName || "Waiting provisioning"} />
                  <Info label="Default URL" value={project.appUrl || project.defaultSubdomain || "Not ready"} />
                  <Info label="Repo" value={project.repository?.repoUrl || "Not configured"} />
                  <Info label="Database" value={project.database ? databaseStatusLabel(project.database.status) : "Not requested"} />
                  <Info label="Domains" value={String(project.domains.length)} />
                  <Info label="Active until" value={formatDate(project.activeUntil)} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.055] p-8 text-center">
            <p className="text-2xl font-semibold">Belum ada VPS aktif</p>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-white/60">
              Setelah order di-approve, environment VPS kamu akan muncul di sini.
            </p>
            <Link
              href="/vps-service/order"
              className="mt-6 inline-flex rounded-md bg-[#4fd1c5] px-6 py-3 text-xs font-bold uppercase text-black hover:bg-white"
            >
              Buat VPS Container Pertama
            </Link>
          </section>
        )}
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/20 p-3">
      <p className="text-xs font-bold uppercase tracking-widest text-white/35">{label}</p>
      <p className="mt-2 break-words text-sm text-white/75">{value}</p>
    </div>
  );
}
