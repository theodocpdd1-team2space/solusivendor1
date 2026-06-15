import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  databaseStatusLabel,
  domainStatusLabel,
  formatDate,
  maskSecret,
  projectStatusLabel,
  statusBadgeClass,
  vpsAppTypes,
  vpsDatabaseTypes,
  vpsPackages,
  VPS_DNS_TARGET,
  VPS_SUPPORT_WHATSAPP,
} from "@/lib/vps";
import {
  addCustomDomain,
  requestDatabase,
  requestDeploy,
  requestRestart,
  updateProjectSettings,
  updateRepositorySettings,
} from "@/app/vps-service/projects/[id]/actions";

export const metadata: Metadata = {
  title: "Cloud VPS Project Panel",
  description: "Kelola project SolusiVendor Cloud VPS.",
};

export const dynamic = "force-dynamic";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function VpsProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect(`/vps-service/login?next=/vps-service/projects/${id}`);
  }

  const project = await prisma.vpsProject.findFirst({
    where: {
      id,
      client: { userId: session.user.id },
    },
    include: {
      client: true,
      order: true,
      domains: { orderBy: { createdAt: "asc" } },
      repository: true,
      database: true,
      activityLogs: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  if (!project) redirect("/vps-service/projects");

  const plan = vpsPackages[project.packageType];
  const deployAction = requestDeploy.bind(null, project.id);
  const restartAction = requestRestart.bind(null, project.id);
  const repositoryAction = updateRepositorySettings.bind(null, project.id);
  const domainAction = addCustomDomain.bind(null, project.id);
  const databaseAction = requestDatabase.bind(null, project.id);
  const settingsAction = updateProjectSettings.bind(null, project.id);

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
          <Link href="/vps-service/billing" className="hover:text-white">
            Billing
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl py-10">
        <Link href="/vps-service/projects" className="text-sm font-bold uppercase tracking-widest text-white/45 hover:text-white">
          Back to projects
        </Link>

        <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#4fd1c5]">
              Cloud VPS Project
            </p>
            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">{project.name}</h1>
            <p className="mt-2 text-white/50">
              {plan.name} - {project.appType} - aktif sampai {formatDate(project.activeUntil)}
            </p>
          </div>
          <span className={`rounded-full border px-4 py-2 text-xs font-bold uppercase ${statusBadgeClass(project.status)}`}>
            {projectStatusLabel(project.status)}
          </span>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 text-xs font-bold uppercase tracking-widest text-white/60">
          {["overview", "terminal", "repository", "database", "domains", "logs", "settings"].map((tab) => (
            <a key={tab} href={`#${tab}`} className="rounded-md border border-white/10 px-4 py-2 hover:bg-white hover:text-black">
              {tab}
            </a>
          ))}
        </div>

        <section id="overview" className="mt-6 rounded-lg border border-white/10 bg-white/[0.055] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="mt-2 text-sm text-white/55">
                Ringkasan container, domain, port, dan resource limit VPS.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <form action={restartAction}>
                <button type="submit" className="rounded-md border border-white/15 px-4 py-2 text-xs font-bold uppercase text-white/70 hover:bg-white hover:text-black">
                  Request Restart
                </button>
              </form>
              <form action={deployAction}>
                <button type="submit" className="rounded-md bg-[#4fd1c5] px-4 py-2 text-xs font-bold uppercase text-black hover:bg-white">
                  Request Deploy
                </button>
              </form>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-4">
            <Info label="Container" value={project.containerName || "Waiting provisioning"} />
            <Info label="Default subdomain" value={project.defaultSubdomain || "Not ready"} />
            <Info label="Custom domain" value={project.customDomain || "Belum ada"} />
            <Info label="App URL" value={project.appUrl || project.defaultSubdomain || "Not ready"} />
            <Info label="Internal port" value={project.internalPort ? String(project.internalPort) : "Hidden until provisioned"} />
            <Info label="App port" value={String(project.appPort || project.repository?.appPort || 3000)} />
            <Info label="RAM" value={project.memoryLimit || plan.memoryLabel} />
            <Info label="CPU" value={project.cpuLimit || plan.cpuLabel} />
            <Info label="Storage" value={project.storageLimit || plan.storageLabel} />
            <Info label="Apps limit" value={String(plan.appLimit)} />
            <Info label="DB limit" value={String(plan.dbLimit)} />
            <Info label="Domain limit" value={String(plan.domainLimit)} />
          </div>
        </section>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_.95fr]">
          <section id="terminal" className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-5">
            <h2 className="text-2xl font-semibold text-cyan-50">Terminal</h2>
            <p className="mt-3 leading-7 text-cyan-50/75">
              Terminal akan masuk ke container milik kamu. Akses host utama tidak diberikan.
            </p>
            <div className="mt-5 rounded-lg border border-cyan-300/20 bg-black/45 p-4 font-mono text-sm leading-7 text-cyan-100">
              <p>Status: Coming soon / Waiting provisioning</p>
              <p>Target: {project.containerName || `sv-${project.slug}`}</p>
              <p>User scope: container-only</p>
              <p>$ ssh container-session --isolated</p>
            </div>
          </section>

          <section id="repository" className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <h2 className="text-2xl font-semibold">Repository</h2>
            <form action={repositoryAction} className="mt-4 grid gap-4">
              <TextInput label="Repo URL" name="repoUrl" type="url" defaultValue={project.repository?.repoUrl || project.order?.repoUrl || ""} placeholder="https://github.com/user/project" />
              <div className="grid gap-4 md:grid-cols-2">
                <TextInput label="Branch" name="branch" defaultValue={project.repository?.branch || project.order?.branch || "main"} />
                <TextInput label="App port" name="appPort" type="number" defaultValue={String(project.repository?.appPort || project.appPort || project.order?.appPort || 3000)} />
              </div>
              <TextInput label="Install command" name="installCommand" defaultValue={project.repository?.installCommand || ""} placeholder="npm install" />
              <TextInput label="Build command" name="buildCommand" defaultValue={project.repository?.buildCommand || ""} placeholder="npm run build" />
              <TextInput label="Start command" name="startCommand" defaultValue={project.repository?.startCommand || ""} placeholder="npm run start" />
              <button type="submit" className="rounded-md bg-white px-4 py-2 text-xs font-bold uppercase text-black hover:bg-[#4fd1c5]">
                Save Repository Settings
              </button>
            </form>
            <form action={deployAction} className="mt-3">
              <button type="submit" className="rounded-md border border-white/15 px-4 py-2 text-xs font-bold uppercase text-white/70 hover:bg-white hover:text-black">
                Request Deploy
              </button>
            </form>
          </section>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[.95fr_1.05fr]">
          <section id="database" className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <h2 className="text-2xl font-semibold">Database</h2>
            {project.database ? (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <Info label="Type" value={project.database.type} />
                <Info label="Status" value={databaseStatusLabel(project.database.status)} />
                <Info label="Host" value={project.database.host || "Belum diisi admin"} />
                <Info label="Port" value={project.database.port ? String(project.database.port) : "Belum diisi admin"} />
                <Info label="DB name" value={project.database.dbName || "Belum diisi admin"} />
                <Info label="DB user" value={project.database.dbUser || "Belum diisi admin"} />
                <Info label="Password" value={maskSecret(project.database.dbPassword)} />
                <Info label="Connection string" value={maskSecret(project.database.connectionString)} />
              </div>
            ) : (
              <p className="mt-3 text-sm leading-7 text-white/60">
                Belum ada database. Untuk MVP, database dibuat/diaktifkan oleh admin dan credential akan muncul di panel ini.
              </p>
            )}
            <form action={databaseAction} className="mt-5 flex flex-wrap gap-3">
              <select name="databaseType" defaultValue={project.database?.type || "POSTGRES"} className="rounded-md border border-white/10 bg-[#050b12] px-4 py-3 text-sm text-white outline-none">
                {vpsDatabaseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <button type="submit" className="rounded-md bg-[#4fd1c5] px-4 py-3 text-xs font-bold uppercase text-black hover:bg-white">
                Request Database
              </button>
            </form>
          </section>

          <section id="domains" className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <h2 className="text-2xl font-semibold">Domains</h2>
            <div className="mt-4 rounded-md border border-white/10 bg-black/25 p-4 font-mono text-xs leading-6 text-white/75">
              Type: CNAME<br />
              Name: www<br />
              Target: {VPS_DNS_TARGET}
            </div>
            <p className="mt-3 text-sm leading-7 text-white/58">
              Untuk root domain, gunakan Cloudflare CNAME Flattening atau ikuti instruksi admin.
            </p>
            <form action={domainAction} className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input name="hostname" placeholder="www.domainkamu.com" className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25" />
              <button type="submit" className="rounded-md bg-white px-4 py-3 text-xs font-bold uppercase text-black hover:bg-[#4fd1c5]">
                Add Domain
              </button>
            </form>
            <div className="mt-5 space-y-2">
              {project.domains.map((domain) => (
                <div key={domain.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm">
                  <span>{domain.hostname}</span>
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusBadgeClass(domain.status)}`}>
                    {domainStatusLabel(domain.status)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_.95fr]">
          <section id="logs" className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <h2 className="text-2xl font-semibold">Logs</h2>
            <p className="mt-2 text-sm text-white/55">
              MVP menampilkan activity log. Docker log streaming belum diaktifkan.
            </p>
            <div className="mt-4 space-y-2">
              {project.activityLogs.map((log) => (
                <div key={log.id} className="rounded-md border border-white/10 bg-black/20 p-3 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold">{log.type}</p>
                    <p className="text-xs text-white/35">{formatDate(log.createdAt)}</p>
                  </div>
                  <p className="mt-1 text-white/55">{log.message}</p>
                </div>
              ))}
              {!project.activityLogs.length ? (
                <p className="text-sm text-white/45">Belum ada log.</p>
              ) : null}
            </div>
          </section>

          <section id="settings" className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <h2 className="text-2xl font-semibold">Settings</h2>
            <form action={settingsAction} className="mt-4 grid gap-4">
              <TextInput label="Project name" name="name" defaultValue={project.name} />
              <label className="block text-xs font-bold uppercase tracking-widest text-white/45">
                App type
                <select name="appType" defaultValue={project.appType} className="mt-2 w-full rounded-md border border-white/10 bg-[#050b12] px-4 py-3 text-base font-normal text-white outline-none">
                  {vpsAppTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs font-bold uppercase tracking-widest text-white/45">
                Notes
                <textarea name="notes" rows={5} defaultValue={project.notes || ""} className="mt-2 w-full rounded-md border border-white/10 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none" />
              </label>
              <button type="submit" className="rounded-md bg-white px-4 py-3 text-xs font-bold uppercase text-black hover:bg-[#4fd1c5]">
                Save Settings
              </button>
            </form>
            <a
              href={`https://wa.me/${VPS_SUPPORT_WHATSAPP}?text=Halo%20SolusiVendor%2C%20saya%20butuh%20support%20project%20${encodeURIComponent(project.name)}.`}
              target="_blank"
              className="mt-4 block rounded-md border border-white/15 px-4 py-3 text-center text-xs font-bold uppercase text-white/70 hover:bg-white hover:text-black"
            >
              Support WhatsApp
            </a>
          </section>
        </div>
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

function TextInput({
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
        className="mt-2 w-full rounded-md border border-white/10 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none placeholder:text-white/25"
      />
    </label>
  );
}
