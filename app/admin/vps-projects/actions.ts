"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  cleanOptionalText,
  cleanText,
  normalizeAppPort,
  normalizeAppType,
  normalizeBranch,
  normalizeDatabaseStatus,
  normalizeDatabaseType,
  normalizeDomainStatus,
  normalizeInternalPort,
  normalizePackageType,
  normalizeProjectStatus,
  normalizeRepoUrl,
  vpsPackages,
  VPS_DNS_TARGET,
} from "@/lib/vps";

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?next=/admin/vps-projects");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }
}

async function upsertProjectDomain({
  projectId,
  hostname,
  type,
  status,
  dnsTarget,
}: {
  projectId: string;
  hostname: string;
  type: "DEFAULT" | "CUSTOM";
  status: "PENDING_DNS" | "VERIFIED" | "ACTIVE" | "ERROR";
  dnsTarget: string;
}) {
  const existingDomain = await prisma.vpsDomain.findFirst({
    where: { projectId, type },
    select: { id: true },
  });

  if (existingDomain) {
    await prisma.vpsDomain.update({
      where: { id: existingDomain.id },
      data: { hostname, status, dnsTarget },
    });
    return;
  }

  await prisma.vpsDomain.create({
    data: { projectId, hostname, type, status, dnsTarget },
  });
}

export async function updateVpsProject(projectId: string, formData: FormData) {
  await requireAdmin();

  const packageType = normalizePackageType(formData.get("packageType"));
  const appType = normalizeAppType(formData.get("appType"));
  const status = normalizeProjectStatus(formData.get("status"));
  const name = cleanText(formData.get("name"), 120);
  const containerName = cleanOptionalText(formData.get("containerName"), 120);
  const defaultSubdomain = cleanOptionalText(formData.get("defaultSubdomain"), 160);
  const customDomain = cleanOptionalText(formData.get("customDomain"), 160);
  const dnsTarget = cleanOptionalText(formData.get("dnsTarget"), 160) || VPS_DNS_TARGET;
  const internalPort = normalizeInternalPort(formData.get("internalPort"), 4101);
  const appPort = normalizeAppPort(formData.get("appPort"), 3000);
  const memoryLimit = cleanOptionalText(formData.get("memoryLimit"), 40);
  const cpuLimit = cleanOptionalText(formData.get("cpuLimit"), 40);
  const storageLimit = cleanOptionalText(formData.get("storageLimit"), 40);
  const appUrl = cleanOptionalText(formData.get("appUrl"), 200);
  const activeUntilInput = cleanOptionalText(formData.get("activeUntil"), 20);
  const activeUntil = activeUntilInput
    ? new Date(`${activeUntilInput}T23:59:59.000`)
    : null;
  const notes = cleanOptionalText(formData.get("notes"), 1000);
  const customDomainStatus =
    normalizeDomainStatus(formData.get("customDomainStatus")) || "PENDING_DNS";
  const repoUrl = normalizeRepoUrl(formData.get("repoUrl"));
  const branch = normalizeBranch(formData.get("branch"));
  const installCommand = cleanOptionalText(formData.get("installCommand"), 240);
  const buildCommand = cleanOptionalText(formData.get("buildCommand"), 240);
  const startCommand = cleanOptionalText(formData.get("startCommand"), 240);
  const databaseType = normalizeDatabaseType(formData.get("databaseType"));
  const databaseStatus = normalizeDatabaseStatus(formData.get("databaseStatus"));
  const dbHost = cleanOptionalText(formData.get("dbHost"), 160);
  const dbPortValue = Number(cleanText(formData.get("dbPort"), 8));
  const dbPort = Number.isInteger(dbPortValue) && dbPortValue > 0 ? dbPortValue : null;
  const dbName = cleanOptionalText(formData.get("dbName"), 120);
  const dbUser = cleanOptionalText(formData.get("dbUser"), 120);
  const dbPassword = cleanOptionalText(formData.get("dbPassword"), 240);
  const connectionString = cleanOptionalText(formData.get("connectionString"), 500);

  if (!packageType || !appType || !status || !name) {
    throw new Error("Data project tidak valid.");
  }

  const project = await prisma.vpsProject.update({
    where: { id: projectId },
    data: {
      name,
      packageType,
      appType,
      status,
      containerName,
      internalPort,
      appPort,
      memoryLimit: memoryLimit || vpsPackages[packageType].memory,
      cpuLimit: cpuLimit || vpsPackages[packageType].cpus,
      storageLimit: storageLimit || vpsPackages[packageType].storage,
      appUrl,
      defaultSubdomain,
      customDomain,
      dnsTarget,
      activeUntil:
        activeUntil && !Number.isNaN(activeUntil.getTime()) ? activeUntil : null,
      notes,
    },
  });

  await prisma.vpsRepository.upsert({
    where: { projectId },
    update: {
      repoUrl,
      branch,
      installCommand,
      buildCommand,
      startCommand,
      appPort,
    },
    create: {
      projectId,
      repoUrl,
      branch,
      installCommand,
      buildCommand,
      startCommand,
      appPort,
    },
  });

  if (databaseType || databaseStatus || dbHost || dbName || dbUser || dbPassword || connectionString) {
    await prisma.vpsDatabase.upsert({
      where: { projectId },
      update: {
        type: databaseType || "POSTGRES",
        status: databaseStatus || "REQUESTED",
        host: dbHost,
        port: dbPort,
        dbName,
        dbUser,
        dbPassword,
        connectionString,
      },
      create: {
        projectId,
        type: databaseType || "POSTGRES",
        status: databaseStatus || "REQUESTED",
        host: dbHost,
        port: dbPort,
        dbName,
        dbUser,
        dbPassword,
        connectionString,
      },
    });
  }

  if (defaultSubdomain) {
    await upsertProjectDomain({
      projectId,
      hostname: defaultSubdomain,
      type: "DEFAULT",
      status: "ACTIVE",
      dnsTarget,
    });
  }

  if (customDomain) {
    await upsertProjectDomain({
      projectId,
      hostname: customDomain,
      type: "CUSTOM",
      status: customDomainStatus,
      dnsTarget,
    });
  }

  await prisma.vpsActivityLog.create({
    data: {
      projectId,
      clientId: project.clientId,
      orderId: project.orderId,
      type: "PROJECT_UPDATED",
      message: "Metadata project diperbarui admin.",
    },
  });

  revalidatePath("/admin/vps-projects");
  revalidatePath(`/admin/vps-projects/${projectId}`);
  revalidatePath("/vps-service/dashboard");
}

export async function addVpsProjectLog(projectId: string, formData: FormData) {
  await requireAdmin();

  const type = cleanText(formData.get("type"), 80) || "ADMIN_NOTE";
  const message = cleanText(formData.get("message"), 1000);

  if (!message) {
    throw new Error("Log message wajib diisi.");
  }

  const project = await prisma.vpsProject.findUnique({
    where: { id: projectId },
    select: { clientId: true, orderId: true },
  });

  if (!project) {
    throw new Error("Project tidak ditemukan.");
  }

  await prisma.vpsActivityLog.create({
    data: {
      projectId,
      clientId: project.clientId,
      orderId: project.orderId,
      type,
      message,
    },
  });

  revalidatePath(`/admin/vps-projects/${projectId}`);
  revalidatePath(`/vps-service/projects/${projectId}`);
}
