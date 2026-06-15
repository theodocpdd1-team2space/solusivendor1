import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { prisma } from "@/lib/prisma";
import {
  buildProvisioningCommand,
  domainStatusLabel,
  formatDate,
  formatRupiah,
  orderStatusLabel,
  projectStatusLabel,
  statusBadgeClass,
  vpsAppTypes,
  vpsOrderStatuses,
  vpsPackages,
  vpsProjectStatuses,
  VPS_DNS_TARGET,
} from "@/lib/vps";
import {
  approveVpsOrder,
  rejectVpsOrder,
  updateVpsOrder,
} from "@/app/admin/vps-orders/actions";

export const dynamic = "force-dynamic";

type AdminVpsOrderDetailProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminVpsOrderDetailPage({
  params,
}: AdminVpsOrderDetailProps) {
  const { id } = await params;
  const order = await prisma.vpsOrder.findUnique({
    where: { id },
    include: {
      client: true,
      projects: {
        include: {
          domains: true,
          repository: true,
          database: true,
        },
      },
      activityLogs: {
        orderBy: { createdAt: "desc" },
        take: 12,
      },
    },
  });

  if (!order) notFound();

  const project = order.projects[0] || null;
  const defaultSubdomain =
    project?.defaultSubdomain ||
    `${order.projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}.${VPS_DNS_TARGET}`;
  const approveAction = approveVpsOrder.bind(null, order.id);
  const rejectAction = rejectVpsOrder.bind(null, order.id);
  const updateAction = updateVpsOrder.bind(null, order.id);

  return (
    <section>
      <Link href="/admin/vps-orders" className="text-sm font-bold uppercase tracking-widest text-white/45 hover:text-white">
        Back to VPS Orders
      </Link>
      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#ff4b3e]">
            Order detail
          </p>
          <h1 className="mt-3 text-4xl font-semibold">{order.projectName}</h1>
          <p className="mt-2 text-white/50">
            {order.client.name} - {order.client.email} - {order.client.whatsapp}
          </p>
        </div>
        <span className={`rounded-full border px-4 py-2 text-xs font-bold uppercase ${statusBadgeClass(order.status)}`}>
          {orderStatusLabel(order.status)}
        </span>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
        <aside className="space-y-5">
          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <h2 className="text-2xl font-semibold">Order Summary</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <Info label="Package" value={vpsPackages[order.packageType].name} />
              <Info label="Amount" value={formatRupiah(order.amount)} />
              <Info label="App type" value={order.appType} />
              <Info label="Custom domain" value={order.customDomain || "Belum diisi"} />
              <Info label="Repository" value={order.repoUrl || "Belum diisi"} />
              <Info label="Branch" value={order.branch || "main"} />
              <Info label="App port" value={String(order.appPort || 3000)} />
              <Info label="Active from" value={formatDate(order.activeFrom)} />
              <Info label="Active until" value={formatDate(order.activeUntil)} />
              <Info label="Created" value={formatDate(order.createdAt)} />
            </div>
            {order.paymentProof ? (
              <div className="mt-4 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-50">
                <p className="font-semibold">Payment proof</p>
                <p className="mt-2 break-words">{order.paymentProof}</p>
              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-amber-300/25 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">
                Bukti pembayaran belum diisi. Minta client kirim via WhatsApp.
              </div>
            )}
          </section>

          <form action={rejectAction} className="rounded-lg border border-red-400/20 bg-red-400/10 p-5">
            <h2 className="text-2xl font-semibold text-red-50">Reject Order</h2>
            <p className="mt-2 text-sm leading-6 text-red-50/75">
              Menandai order sebagai rejected. Tidak ada container yang dibuat.
            </p>
            <button
              type="submit"
              className="mt-4 rounded-full bg-red-500 px-5 py-3 text-xs font-bold uppercase text-white hover:bg-white hover:text-black"
            >
              Reject Order
            </button>
          </form>
        </aside>

        <div className="space-y-5">
          <form action={updateAction} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <h2 className="text-2xl font-semibold">Update Order</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <SelectField label="Package" name="packageType" defaultValue={order.packageType}>
                {Object.entries(vpsPackages).map(([key, plan]) => (
                  <option key={key} value={key}>
                    {plan.name}
                  </option>
                ))}
              </SelectField>
              <SelectField label="App type" name="appType" defaultValue={order.appType}>
                {vpsAppTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </SelectField>
              <SelectField label="Status" name="status" defaultValue={order.status}>
                {vpsOrderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {orderStatusLabel(status)}
                  </option>
                ))}
              </SelectField>
              <TextField label="Active until" name="activeUntil" type="date" defaultValue={dateInput(order.activeUntil)} />
              <TextField label="Repo URL" name="repoUrl" type="url" defaultValue={order.repoUrl || ""} />
              <TextField label="Branch" name="branch" defaultValue={order.branch || "main"} />
              <TextField label="App port" name="appPort" type="number" defaultValue={String(order.appPort || 3000)} />
            </div>
            <label className="mt-4 block text-xs font-bold uppercase tracking-widest text-white/45">
              Payment proof
              <textarea
                name="paymentProof"
                rows={3}
                defaultValue={order.paymentProof || ""}
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none"
              />
            </label>
            <label className="mt-4 block text-xs font-bold uppercase tracking-widest text-white/45">
              Notes
              <textarea
                name="notes"
                rows={4}
                defaultValue={order.notes || ""}
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none"
              />
            </label>
            <button type="submit" className="mt-5 rounded-full bg-white px-5 py-3 text-xs font-bold uppercase text-black hover:bg-[#ff4b3e] hover:text-white">
              Save Order
            </button>
          </form>

          <form action={approveAction} className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-5">
            <h2 className="text-2xl font-semibold text-emerald-50">Approve & Prepare Project</h2>
            <p className="mt-2 text-sm leading-6 text-emerald-50/75">
              Approval mengaktifkan subscription, membuat project metadata, dan
              menyiapkan instruksi provisioning manual.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <SelectField label="Package" name="packageType" defaultValue={order.packageType}>
                {Object.entries(vpsPackages).map(([key, plan]) => (
                  <option key={key} value={key}>
                    {plan.name}
                  </option>
                ))}
              </SelectField>
              <SelectField label="App type" name="appType" defaultValue={order.appType}>
                {vpsAppTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </SelectField>
              <TextField label="Duration days" name="durationDays" type="number" defaultValue="30" />
              <TextField label="Active until" name="activeUntil" type="date" defaultValue={dateInput(order.activeUntil)} />
              <TextField label="Container name" name="containerName" defaultValue={project?.containerName || ""} placeholder="sv-client-slug" />
              <TextField label="Internal port" name="internalPort" type="number" defaultValue={project?.internalPort ? String(project.internalPort) : "4101"} />
              <TextField label="App port" name="appPort" type="number" defaultValue={String(project?.appPort || order.appPort || 3000)} />
              <TextField label="Memory limit" name="memoryLimit" defaultValue={project?.memoryLimit || vpsPackages[order.packageType].memory} />
              <TextField label="CPU limit" name="cpuLimit" defaultValue={project?.cpuLimit || vpsPackages[order.packageType].cpus} />
              <TextField label="Storage limit" name="storageLimit" defaultValue={project?.storageLimit || vpsPackages[order.packageType].storage} />
              <TextField label="App URL" name="appUrl" defaultValue={project?.appUrl || ""} />
              <TextField label="Default subdomain" name="defaultSubdomain" defaultValue={defaultSubdomain} />
              <TextField label="Custom domain" name="customDomain" defaultValue={project?.customDomain || order.customDomain || ""} />
              <TextField label="DNS target" name="dnsTarget" defaultValue={project?.dnsTarget || VPS_DNS_TARGET} />
              <TextField label="Repo URL" name="repoUrl" type="url" defaultValue={project?.repository?.repoUrl || order.repoUrl || ""} />
              <TextField label="Branch" name="branch" defaultValue={project?.repository?.branch || order.branch || "main"} />
              <TextField label="Install command" name="installCommand" defaultValue={project?.repository?.installCommand || ""} />
              <TextField label="Build command" name="buildCommand" defaultValue={project?.repository?.buildCommand || ""} />
              <TextField label="Start command" name="startCommand" defaultValue={project?.repository?.startCommand || ""} />
              <SelectField label="Database type" name="databaseType" defaultValue={project?.database?.type || "POSTGRES"}>
                <option value="">No database</option>
                <option value="POSTGRES">POSTGRES</option>
                <option value="MYSQL">MYSQL</option>
              </SelectField>
              <SelectField label="Deployment status" name="projectStatus" defaultValue={project?.status || "PENDING_SETUP"}>
                {vpsProjectStatuses.map((status) => (
                  <option key={status} value={status}>
                    {projectStatusLabel(status)}
                  </option>
                ))}
              </SelectField>
            </div>
            <label className="mt-4 block text-xs font-bold uppercase tracking-widest text-emerald-50/70">
              Admin notes
              <textarea
                name="notes"
                rows={4}
                defaultValue={project?.notes || order.notes || ""}
                className="mt-2 w-full rounded-lg border border-emerald-300/20 bg-black/25 px-4 py-3 text-base font-normal text-white outline-none"
              />
            </label>
            <button type="submit" className="mt-5 rounded-full bg-emerald-300 px-5 py-3 text-xs font-bold uppercase text-black hover:bg-white">
              Approve Order
            </button>
          </form>

          {project ? (
            <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold">Project Metadata</h2>
                  <p className="mt-1 text-white/50">{project.defaultSubdomain || "No subdomain"}</p>
                </div>
                <Link
                  href={`/admin/vps-projects/${project.id}`}
                  className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase text-white/70 hover:bg-white hover:text-black"
                >
                  Edit Project
                </Link>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-lg border border-white/10 bg-black/35 p-4 text-xs leading-6 text-white/75">
                {buildProvisioningCommand(project)}
              </pre>
              <div className="mt-4 space-y-2">
                {project.domains.map((domain) => (
                  <div key={domain.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm">
                    <span>{domain.hostname}</span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusBadgeClass(domain.status)}`}>
                      {domainStatusLabel(domain.status)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
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
