import { prisma } from "@/lib/prisma";

export const VPS_DNS_TARGET = "connect.solusivendor.com";
export const VPS_SUPPORT_WHATSAPP = "62895345902896";

export const vpsPackages = {
  NANO: {
    name: "Nano Container VPS",
    price: 99000,
    memory: "512m",
    memoryLabel: "512MB RAM",
    cpus: "0.5",
    cpuLabel: "0.5 CPU",
    storage: "5g",
    storageLabel: "5GB storage",
    appLimit: 1,
    dbLimit: 1,
    domainLimit: 1,
    features: [
      "512MB RAM",
      "0.5 CPU",
      "5GB storage",
      "1 app",
      "1 database",
      "1 custom domain",
      "Web terminal",
      "Manual billing",
    ],
  },
  MICRO: {
    name: "Micro Container VPS",
    price: 199000,
    memory: "1g",
    memoryLabel: "1GB RAM",
    cpus: "1",
    cpuLabel: "1 CPU",
    storage: "10g",
    storageLabel: "10GB storage",
    appLimit: 2,
    dbLimit: 2,
    domainLimit: 3,
    features: [
      "1GB RAM",
      "1 CPU",
      "10GB storage",
      "2 apps",
      "2 databases",
      "3 custom domains",
      "Web terminal",
      "Logs viewer",
      "Deploy request",
    ],
  },
  STARTUP: {
    name: "Startup Container VPS",
    price: 399000,
    memory: "2g",
    memoryLabel: "2GB RAM",
    cpus: "2",
    cpuLabel: "2 CPU",
    storage: "20g",
    storageLabel: "20GB storage",
    appLimit: 5,
    dbLimit: 3,
    domainLimit: 5,
    features: [
      "2GB RAM",
      "2 CPU",
      "20GB storage",
      "5 apps",
      "3 databases",
      "5 custom domains",
      "Priority support",
      "Backup basic",
    ],
  },
  STARTER: {
    name: "Nano Container VPS",
    price: 99000,
    memory: "512m",
    memoryLabel: "512MB RAM",
    cpus: "0.5",
    cpuLabel: "0.5 CPU",
    storage: "5g",
    storageLabel: "5GB storage",
    appLimit: 1,
    dbLimit: 1,
    domainLimit: 1,
    features: ["Legacy Starter mapped to Nano Container VPS"],
    legacy: true,
  },
  PRO: {
    name: "Micro Container VPS",
    price: 199000,
    memory: "1g",
    memoryLabel: "1GB RAM",
    cpus: "1",
    cpuLabel: "1 CPU",
    storage: "10g",
    storageLabel: "10GB storage",
    appLimit: 2,
    dbLimit: 2,
    domainLimit: 3,
    features: ["Legacy Pro mapped to Micro Container VPS"],
    legacy: true,
  },
  BUSINESS: {
    name: "Startup Container VPS",
    price: 399000,
    memory: "2g",
    memoryLabel: "2GB RAM",
    cpus: "2",
    cpuLabel: "2 CPU",
    storage: "20g",
    storageLabel: "20GB storage",
    appLimit: 5,
    dbLimit: 3,
    domainLimit: 5,
    features: ["Legacy Business mapped to Startup Container VPS"],
    legacy: true,
  },
} as const;

export const cloudVpsPackageTypes = ["NANO", "MICRO", "STARTUP"] as const;
export const vpsPackageTypes = Object.keys(vpsPackages) as VpsPackageType[];
export const vpsAppTypes = ["STATIC", "NODE", "NEXTJS", "LARAVEL", "OTHER"] as const;
export const vpsOrderStatuses = [
  "DRAFT",
  "WAITING_PAYMENT",
  "WAITING_APPROVAL",
  "APPROVED",
  "REJECTED",
  "CANCELLED",
] as const;
export const vpsProjectStatuses = [
  "PENDING_SETUP",
  "PROVISIONING",
  "ONLINE",
  "ERROR",
  "SUSPENDED",
  "EXPIRED",
] as const;
export const vpsClientStatuses = [
  "PENDING_PAYMENT",
  "WAITING_APPROVAL",
  "ACTIVE",
  "SUSPENDED",
  "EXPIRED",
] as const;
export const vpsDomainStatuses = ["PENDING_DNS", "VERIFIED", "ACTIVE", "ERROR"] as const;
export const vpsDatabaseTypes = ["POSTGRES", "MYSQL"] as const;
export const vpsDatabaseStatuses = [
  "REQUESTED",
  "PROVISIONING",
  "ACTIVE",
  "ERROR",
  "DISABLED",
] as const;

export type VpsPackageType = keyof typeof vpsPackages;
export type CloudVpsPackageType = (typeof cloudVpsPackageTypes)[number];
export type VpsAppType = (typeof vpsAppTypes)[number];
export type VpsOrderStatus = (typeof vpsOrderStatuses)[number];
export type VpsProjectStatus = (typeof vpsProjectStatuses)[number];
export type VpsClientStatus = (typeof vpsClientStatuses)[number];
export type VpsDomainStatus = (typeof vpsDomainStatuses)[number];
export type VpsDatabaseType = (typeof vpsDatabaseTypes)[number];
export type VpsDatabaseStatus = (typeof vpsDatabaseStatuses)[number];

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value?: Date | string | null) {
  if (!value) return "Belum ditentukan";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function toDateInput(value?: Date | null) {
  if (!value) return "";
  return value.toISOString().slice(0, 10);
}

export function normalizePackageType(value: FormDataEntryValue | string | null) {
  const packageType = String(value || "").toUpperCase();
  return vpsPackageTypes.includes(packageType as VpsPackageType)
    ? (packageType as VpsPackageType)
    : null;
}

export function normalizeAppType(value: FormDataEntryValue | string | null) {
  const appType = String(value || "").toUpperCase();
  return vpsAppTypes.includes(appType as VpsAppType)
    ? (appType as VpsAppType)
    : null;
}

export function normalizeOrderStatus(value: FormDataEntryValue | string | null) {
  const status = String(value || "").toUpperCase();
  return vpsOrderStatuses.includes(status as VpsOrderStatus)
    ? (status as VpsOrderStatus)
    : null;
}

export function normalizeProjectStatus(value: FormDataEntryValue | string | null) {
  const status = String(value || "").toUpperCase();
  return vpsProjectStatuses.includes(status as VpsProjectStatus)
    ? (status as VpsProjectStatus)
    : null;
}

export function normalizeClientStatus(value: FormDataEntryValue | string | null) {
  const status = String(value || "").toUpperCase();
  return vpsClientStatuses.includes(status as VpsClientStatus)
    ? (status as VpsClientStatus)
    : null;
}

export function normalizeDomainStatus(value: FormDataEntryValue | string | null) {
  const status = String(value || "").toUpperCase();
  return vpsDomainStatuses.includes(status as VpsDomainStatus)
    ? (status as VpsDomainStatus)
    : null;
}

export function normalizeDatabaseType(value: FormDataEntryValue | string | null) {
  const type = String(value || "").toUpperCase();
  return vpsDatabaseTypes.includes(type as VpsDatabaseType)
    ? (type as VpsDatabaseType)
    : null;
}

export function normalizeDatabaseStatus(value: FormDataEntryValue | string | null) {
  const status = String(value || "").toUpperCase();
  return vpsDatabaseStatuses.includes(status as VpsDatabaseStatus)
    ? (status as VpsDatabaseStatus)
    : null;
}

export function cleanText(value: FormDataEntryValue | null, maxLength = 500) {
  return String(value || "").trim().slice(0, maxLength);
}

export function cleanOptionalText(value: FormDataEntryValue | null, maxLength = 500) {
  const text = cleanText(value, maxLength);
  return text.length ? text : null;
}

export function normalizeBranch(value: FormDataEntryValue | null) {
  const branch = cleanText(value, 80).replace(/[^a-zA-Z0-9._/-]/g, "");
  return branch || "main";
}

export function normalizeAppPort(value: FormDataEntryValue | string | null, fallback = 3000) {
  const port = Number(String(value || "").trim());
  if (!Number.isInteger(port) || port < 1024 || port > 65535) return fallback;
  return port;
}

export function normalizeInternalPort(value: FormDataEntryValue | string | null, fallback = 4101) {
  const port = Number(String(value || "").trim());
  if (!Number.isInteger(port) || port < 1024 || port > 65535) return fallback;
  return port;
}

export function normalizeDomain(value: FormDataEntryValue | null) {
  const domain = cleanText(value, 160).toLowerCase();
  if (!domain) return null;
  const isValid =
    /^(?=.{1,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(
      domain
    );
  return isValid ? domain : null;
}

export function normalizeRepoUrl(value: FormDataEntryValue | null) {
  const repoUrl = cleanText(value, 300);
  if (!repoUrl) return null;

  try {
    const url = new URL(repoUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function maskSecret(value?: string | null) {
  if (!value) return "Belum diisi";
  return "••••••••••••";
}

export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  return slug || "project";
}

export async function createUniqueProjectSlug(projectName: string) {
  const baseSlug = slugify(projectName);
  let slug = baseSlug;
  let counter = 2;

  while (await prisma.vpsProject.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
}

export function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

export function clientStatusLabel(status: string) {
  const labels: Record<string, string> = {
    PENDING_PAYMENT: "Pending Payment",
    WAITING_APPROVAL: "Waiting Approval",
    ACTIVE: "Active",
    SUSPENDED: "Suspended",
    EXPIRED: "Expired",
  };

  return labels[status] || status;
}

export function orderStatusLabel(status: string) {
  const labels: Record<string, string> = {
    DRAFT: "Draft",
    WAITING_PAYMENT: "Waiting Payment",
    WAITING_APPROVAL: "Waiting Approval",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    CANCELLED: "Cancelled",
  };

  return labels[status] || status;
}

export function projectStatusLabel(status: string) {
  const labels: Record<string, string> = {
    PENDING_SETUP: "Pending Setup",
    PROVISIONING: "Provisioning",
    ONLINE: "Online",
    ERROR: "Error",
    SUSPENDED: "Suspended",
    EXPIRED: "Expired",
  };

  return labels[status] || status;
}

export function domainStatusLabel(status: string) {
  const labels: Record<string, string> = {
    PENDING_DNS: "Pending DNS",
    VERIFIED: "Verified",
    ACTIVE: "Active",
    ERROR: "Error",
  };

  return labels[status] || status;
}

export function databaseStatusLabel(status: string) {
  const labels: Record<string, string> = {
    REQUESTED: "Requested",
    PROVISIONING: "Provisioning",
    ACTIVE: "Active",
    ERROR: "Error",
    DISABLED: "Disabled",
  };

  return labels[status] || status;
}

export function statusBadgeClass(status: string) {
  if (["ACTIVE", "APPROVED", "ONLINE", "VERIFIED"].includes(status)) {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-100";
  }

  if (["ERROR", "REJECTED", "SUSPENDED", "EXPIRED", "CANCELLED", "DISABLED"].includes(status)) {
    return "border-red-400/30 bg-red-400/10 text-red-100";
  }

  return "border-amber-300/30 bg-amber-300/10 text-amber-100";
}

type ProvisioningProject = {
  slug: string;
  containerName: string | null;
  internalPort: number | null;
  appPort?: number | null;
  packageType: VpsPackageType | string;
  customDomain: string | null;
  defaultSubdomain: string | null;
  memoryLimit?: string | null;
  cpuLimit?: string | null;
  storageLimit?: string | null;
  database?: { type: VpsDatabaseType | string } | null;
};

export function buildProvisioningCommand(project: ProvisioningProject) {
  const packageConfig =
    vpsPackages[project.packageType as VpsPackageType] || vpsPackages.NANO;
  const containerName = project.containerName || `sv-${project.slug}`;
  const internalPort = project.internalPort || 4101;
  const appPort = project.appPort || 3000;
  const memory = project.memoryLimit || packageConfig.memory;
  const cpus = project.cpuLimit || packageConfig.cpus;
  const storage = project.storageLimit || packageConfig.storage;
  const dbType = String(project.database?.type || "postgres").toLowerCase();

  return [
    "/var/solusivendor/hosting/scripts/create-vps.sh \\",
    `  --client ${project.slug} \\`,
    `  --project ${project.slug} \\`,
    `  --container ${containerName} \\`,
    `  --port ${internalPort} \\`,
    `  --app-port ${appPort} \\`,
    `  --memory ${memory} \\`,
    `  --cpus ${cpus} \\`,
    `  --storage ${storage} \\`,
    `  --db ${dbType}`,
  ].join("\n");
}
