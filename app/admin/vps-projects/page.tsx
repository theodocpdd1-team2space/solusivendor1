import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  formatDate,
  projectStatusLabel,
  statusBadgeClass,
  vpsPackages,
} from "@/lib/vps";

export const dynamic = "force-dynamic";

export default async function AdminVpsProjectsPage() {
  const projects = await prisma.vpsProject.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: true,
      order: {
        select: { id: true, status: true },
      },
      domains: {
        orderBy: { type: "asc" },
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
          <h1 className="text-4xl font-semibold">VPS Projects</h1>
          <p className="mt-2 text-white/50">Deployment metadata and manual provisioning queue.</p>
        </div>
        <Link
          href="/admin/vps-orders"
          className="rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase text-white/70 hover:bg-white hover:text-black"
        >
          VPS Orders
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.045] p-4">
        <table className="w-full min-w-[68rem] text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-white/35">
            <tr>
              <th className="pb-4">Project</th>
              <th className="pb-4">Client</th>
              <th className="pb-4">Package</th>
              <th className="pb-4">Container</th>
              <th className="pb-4">Domains</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Active until</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="py-4">
                  <p className="font-semibold">{project.name}</p>
                  <p className="mt-1 text-white/45">{project.slug}</p>
                </td>
                <td className="py-4">
                  <p>{project.client.name}</p>
                  <p className="mt-1 text-white/45">{project.client.email}</p>
                </td>
                <td className="py-4">
                  {vpsPackages[project.packageType].name}
                  <p className="mt-1 text-white/45">{project.appType}</p>
                </td>
                <td className="py-4">
                  <p>{project.containerName || "Belum diisi"}</p>
                  <p className="mt-1 text-white/45">
                    {project.internalPort ? `localhost:${project.internalPort}` : "No port"}
                  </p>
                </td>
                <td className="py-4">
                  <p>{project.defaultSubdomain || "No subdomain"}</p>
                  <p className="mt-1 text-white/45">{project.customDomain || "No custom domain"}</p>
                </td>
                <td className="py-4">
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusBadgeClass(project.status)}`}>
                    {projectStatusLabel(project.status)}
                  </span>
                </td>
                <td className="py-4 text-white/60">{formatDate(project.activeUntil)}</td>
                <td className="py-4">
                  <Link
                    href={`/admin/vps-projects/${project.id}`}
                    className="rounded-full bg-[#ff4b3e] px-4 py-2 text-xs font-bold uppercase text-white hover:bg-white hover:text-black"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
            {!projects.length ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-white/45">
                  Belum ada project VPS. Approve order untuk membuat project.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
