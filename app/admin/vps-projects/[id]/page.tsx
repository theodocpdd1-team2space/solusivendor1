import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { prisma } from "@/lib/prisma";
import {
  buildProvisioningCommand,
  domainStatusLabel,
  formatDate,
  projectStatusLabel,
  statusBadgeClass,
  vpsAppTypes,
  vpsDomainStatuses,
  vpsPackages,
  vpsProjectStatuses,
  VPS_DNS_TARGET,
} from "@/lib/vps";
import {
  addVpsProjectLog,
  updateVpsProject,
} from "@/app/admin/vps-projects/actions";

export const dynamic = "force-dynamic";

type AdminVpsProjectDetailProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminVpsProjectDetailPage({
  params,
}: AdminVpsProjectDetailProps) {
  const { id } = await params;
  const project = await prisma.vpsProject.findUnique({
    where: { id },
    include: {
      client: true,
      order: true,
      domains: {
        orderBy: { type: "asc" },
      },
      repository: true,
      database: true,
      activityLogs: {
        orderBy: { createdAt: "desc" },
        take: 12,
      },
    },
  });

  if (!project) notFound();

  const updateAction = updateVpsProject.bind(null, project.id);
  const addLogAction = addVpsProjectLog.bind(null, project.id);
  const customDomainStatus =
    project.domains.find((domain) => domain.type === "CUSTOM")?.status || "PENDING_DNS";
  const internalUrl = project.internalPort
    ? `http://localhost:${project.internalPort}`
    : "http://localhost:4101";

  return (
    <section>
      <Link href="/admin/vps-projects" className="text-sm font-bold uppercase tracking-widest text-white/45 hover:text-white">
        Back to VPS Projects
      </Link>
      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#ff4b3e]">
            Project detail
          </p>
          <h1 className="mt-3 text-4xl font-semibold">{project.name}</h1>
          <p className="mt-2 text-white/50">
            {project.client.name} - {project.client.email} - {project.client.whatsapp}
          </p>
        </div>
        <span className={`rounded-full border px-4 py-2 text-xs font-bold uppercase ${statusBadgeClass(project.status)}`}>
          {projectStatusLabel(project.status)}
        </span>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.05fr_.95fr]">
        <form action={updateAction} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <h2 className="text-2xl font-semibold">Update Project Metadata</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <TextField label="Project name" name="name" defaultValue={project.name} />
            <SelectField label="Deployment status" name="status" defaultValue={project.status}>
              {vpsProjectStatuses.map((status) => (
                <option key={status} value={status}>
                  {projectStatusLabel(status)}
                </option>
              ))}
            </SelectField>
            <SelectField label="Package" name="packageType" defaultValue={project.packageType}>
              {Object.entries(vpsPackages).map(([key, plan]) => (
                <option key={key} value={key}>
                  {plan.name}
                </option>
              ))}
            </SelectField>
            <SelectField label="App type" name="appType" defaultValue={project.appType}>
              {vpsAppTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </SelectField>
            <TextField label="Container name" name="containerName" defaultValue={project.containerName || ""} placeholder={`sv-${project.slug}`} />
            <TextField label="Internal port" name="internalPort" type="number" defaultValue={project.internalPort ? String(project.internalPort) : ""} placeholder="4101" />
            <TextField label="App port" name="appPort" type="number" defaultValue={String(project.appPort || project.repository?.appPort || 3000)} placeholder="3000" />
            <TextField label="Memory limit" name="memoryLimit" defaultValue={project.memoryLimit || vpsPackages[project.packageType].memory} />
            <TextField label="CPU limit" name="cpuLimit" defaultValue={project.cpuLimit || vpsPackages[project.packageType].cpus} />
            <TextField label="Storage limit" name="storageLimit" defaultValue={project.storageLimit || vpsPackages[project.packageType].storage} />
            <TextField label="App URL" name="appUrl" defaultValue={project.appUrl || ""} placeholder="https://app.domain.com" />
            <TextField label="Default subdomain" name="defaultSubdomain" defaultValue={project.defaultSubdomain || ""} placeholder={`${project.slug}.${VPS_DNS_TARGET}`} />
            <TextField label="Custom domain" name="customDomain" defaultValue={project.customDomain || ""} placeholder="www.domainkamu.com" />
            <TextField label="DNS target" name="dnsTarget" defaultValue={project.dnsTarget || VPS_DNS_TARGET} />
            <SelectField label="Custom domain status" name="customDomainStatus" defaultValue={customDomainStatus}>
              {vpsDomainStatuses.map((status) => (
                <option key={status} value={status}>
                  {domainStatusLabel(status)}
                </option>
              ))}
            </SelectField>
            <TextField label="Active until" name="activeUntil" type="date" defaultValue={dateInput(project.activeUntil)} />
          </div>
          <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-4">
            <h3 className="text-lg font-semibold">Repository Metadata</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <TextField label="Repo URL" name="repoUrl" type="url" defaultValue={project.repository?.repoUrl || project.order?.repoUrl || ""} />
              <TextField label="Branch" name="branch" defaultValue={project.repository?.branch || project.order?.branch || "main"} />
              <TextField label="Install command" name="installCommand" defaultValue={project.repository?.installCommand || ""} />
              <TextField label="Build command" name="buildCommand" defaultValue={project.repository?.buildCommand || ""} />
              <TextField label="Start command" name="startCommand" defaultValue={project.repository?.startCommand || ""} />
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-4">
            <h3 className="text-lg font-semibold">Database Credentials</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <SelectField label="Database type" name="databaseType" defaultValue={project.database?.type || "POSTGRES"}>
                <option value="POSTGRES">POSTGRES</option>
                <option value="MYSQL">MYSQL</option>
              </SelectField>
              <SelectField label="Database status" name="databaseStatus" defaultValue={project.database?.status || "REQUESTED"}>
                <option value="REQUESTED">Requested</option>
                <option value="PROVISIONING">Provisioning</option>
                <option value="ACTIVE">Active</option>
                <option value="ERROR">Error</option>
                <option value="DISABLED">Disabled</option>
              </SelectField>
              <TextField label="DB host" name="dbHost" defaultValue={project.database?.host || ""} />
              <TextField label="DB port" name="dbPort" type="number" defaultValue={project.database?.port ? String(project.database.port) : ""} />
              <TextField label="DB name" name="dbName" defaultValue={project.database?.dbName || ""} />
              <TextField label="DB user" name="dbUser" defaultValue={project.database?.dbUser || ""} />
              <TextField label="DB password" name="dbPassword" defaultValue={project.database?.dbPassword || ""} />
              <TextField label="Connection string" name="connectionString" defaultValue={project.database?.connectionString || ""} />
            </div>
          </div>
          <label className="mt-4 block text-xs font-bold uppercase tracking-widest text-white/45">
            Notes
            <textarea
              name="notes"
              rows={5}
              defaultValue={project.notes || ""}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none"
            />
          </label>
          <button
            type="submit"
            className="mt-5 rounded-full bg-[#ff4b3e] px-5 py-3 text-xs font-bold uppercase text-white hover:bg-white hover:text-black"
          >
            Save Project
          </button>
        </form>

        <aside className="space-y-5">
          <section className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-5">
            <h2 className="text-2xl font-semibold text-emerald-50">Provisioning Guide</h2>
            <p className="mt-2 text-sm leading-6 text-emerald-50/75">
              Jalankan manual di server. Web app tidak mengeksekusi Docker command.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg border border-emerald-300/20 bg-black/35 p-4 text-xs leading-6 text-emerald-50">
              {buildProvisioningCommand(project)}
            </pre>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <h2 className="text-2xl font-semibold">Route Targets</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <Info label="Internal app URL" value={internalUrl} />
              <Info label="Nginx/Cloudflare route target" value={project.dnsTarget || VPS_DNS_TARGET} />
              <Info
                label="Domain mapping"
                value={`${project.customDomain || "clientdomain.com"} -> ${project.dnsTarget || VPS_DNS_TARGET}`}
              />
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <h2 className="text-2xl font-semibold">DNS Instructions</h2>
            <div className="mt-4 rounded-lg border border-white/10 bg-black/25 p-4 font-mono text-xs leading-6 text-white/75">
              Type: CNAME<br />
              Name: www<br />
              Target: {VPS_DNS_TARGET}
            </div>
            <p className="mt-4 text-sm leading-7 text-white/60">
              Untuk root domain seperti domain.com, gunakan Cloudflare CNAME
              Flattening atau arahkan DNS sesuai instruksi admin.
            </p>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <h2 className="text-2xl font-semibold">Domains</h2>
            <div className="mt-4 space-y-2">
              {project.domains.map((domain) => (
                <div key={domain.id} className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold">{domain.hostname}</p>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusBadgeClass(domain.status)}`}>
                      {domainStatusLabel(domain.status)}
                    </span>
                  </div>
                  <p className="mt-2 text-white/45">{domain.type} - {domain.dnsTarget}</p>
                </div>
              ))}
              {!project.domains.length ? (
                <p className="text-sm text-white/45">Belum ada domain record.</p>
              ) : null}
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <h2 className="text-2xl font-semibold">Activity</h2>
            <form action={addLogAction} className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4">
              <div className="grid gap-3 md:grid-cols-[.45fr_1fr]">
                <input
                  name="type"
                  defaultValue="ADMIN_NOTE"
                  className="rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none"
                />
                <input
                  name="message"
                  placeholder="Catatan operasional untuk client/project"
                  className="rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25"
                />
              </div>
              <button type="submit" className="mt-3 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase text-black hover:bg-[#ff4b3e] hover:text-white">
                Add Activity Log
              </button>
            </form>
            <div className="mt-4 space-y-2">
              {project.activityLogs.map((log) => (
                <div key={log.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                  <p className="font-semibold">{log.type}</p>
                  <p className="mt-1 text-white/55">{log.message}</p>
                  <p className="mt-1 text-xs text-white/35">{formatDate(log.createdAt)}</p>
                </div>
              ))}
              {!project.activityLogs.length ? (
                <p className="text-sm text-white/45">Belum ada activity log.</p>
              ) : null}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}

function dateInput(value?: Date | null) {
  if (!value) return "";
  return value.toISOString().slice(0, 10);
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
      <p className="text-xs font-bold uppercase tracking-widest text-white/35">{label}</p>
      <p className="mt-2 break-words text-white/75">{value}</p>
    </div>
  );
}

function TextField({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-xs font-bold uppercase tracking-widest text-white/45">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none placeholder:text-white/25"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  children,
}: {
  label: string;
  name: string;
  defaultValue: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-xs font-bold uppercase tracking-widest text-white/45">
      {label}
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-lg border border-white/10 bg-[#07110f] px-4 py-3 text-base font-normal text-white outline-none"
      >
        {children}
      </select>
    </label>
  );
}
