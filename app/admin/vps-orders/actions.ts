"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  addDays,
  cleanOptionalText,
  cleanText,
  createUniqueProjectSlug,
  normalizeAppPort,
  normalizeAppType,
  normalizeBranch,
  normalizeDatabaseType,
  normalizeDomain,
  normalizeInternalPort,
  normalizeOrderStatus,
  normalizePackageType,
  normalizeProjectStatus,
  normalizeRepoUrl,
  vpsPackages,
  VPS_DNS_TARGET,
} from "@/lib/vps";

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?next=/admin/vps-orders");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }
}

function parseActiveUntil(value: string | null, durationDays: number) {
  if (value) {
    const parsedDate = new Date(`${value}T23:59:59.000`);
    if (!Number.isNaN(parsedDate.getTime())) return parsedDate;
  }

  return addDays(new Date(), durationDays || 30);
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

export async function approveVpsOrder(orderId: string, formData: FormData) {
  await requireAdmin();

  const order = await prisma.vpsOrder.findUnique({
    where: { id: orderId },
    include: {
      client: true,
      projects: true,
    },
  });

  if (!order) {
    throw new Error("Order tidak ditemukan.");
  }

  const packageType = normalizePackageType(formData.get("packageType")) || order.packageType;
  const appType = normalizeAppType(formData.get("appType")) || order.appType;
  const durationDays = Number(cleanText(formData.get("durationDays"), 4)) || 30;
  const activeUntil = parseActiveUntil(
    cleanOptionalText(formData.get("activeUntil"), 20),
    durationDays
  );
  const activeFrom = new Date();
  const existingProject = order.projects[0] || null;
  const slug = existingProject?.slug || (await createUniqueProjectSlug(order.projectName));
  const defaultSubdomain =
    cleanOptionalText(formData.get("defaultSubdomain"), 160) ||
    `${slug}.${VPS_DNS_TARGET}`;
  const customDomain =
    normalizeDomain(formData.get("customDomain")) || order.customDomain;
  const dnsTarget = cleanOptionalText(formData.get("dnsTarget"), 160) || VPS_DNS_TARGET;
  const containerName =
    cleanOptionalText(formData.get("containerName"), 120) || `sv-${slug}`;
  const internalPort = normalizeInternalPort(formData.get("internalPort"), 4101);
  const appPort = normalizeAppPort(formData.get("appPort"), order.appPort || 3000);
  const repoUrl = normalizeRepoUrl(formData.get("repoUrl")) || order.repoUrl;
  const branch = normalizeBranch(formData.get("branch")) || order.branch || "main";
  const installCommand = cleanOptionalText(formData.get("installCommand"), 240);
  const buildCommand = cleanOptionalText(formData.get("buildCommand"), 240);
  const startCommand = cleanOptionalText(formData.get("startCommand"), 240);
  const memoryLimit = cleanOptionalText(formData.get("memoryLimit"), 40) || vpsPackages[packageType].memory;
  const cpuLimit = cleanOptionalText(formData.get("cpuLimit"), 40) || vpsPackages[packageType].cpus;
  const storageLimit = cleanOptionalText(formData.get("storageLimit"), 40) || vpsPackages[packageType].storage;
  const appUrl = cleanOptionalText(formData.get("appUrl"), 200) || defaultSubdomain;
  const databaseType = normalizeDatabaseType(formData.get("databaseType"));
  const projectStatus =
    normalizeProjectStatus(formData.get("projectStatus")) || "PENDING_SETUP";
  const adminNotes = cleanOptionalText(formData.get("notes"), 1000) || order.notes;

  await prisma.vpsOrder.update({
    where: { id: order.id },
    data: {
      packageType,
      appType,
      branch,
      appPort,
      repoUrl,
      amount: vpsPackages[packageType].price,
      status: "APPROVED",
      activeFrom,
      activeUntil,
      approvedAt: activeFrom,
      notes: adminNotes,
    },
  });

  await prisma.vpsClient.update({
    where: { id: order.clientId },
    data: { status: "ACTIVE" },
  });

  const project = existingProject
    ? await prisma.vpsProject.update({
        where: { id: existingProject.id },
        data: {
          packageType,
          appType,
          status: projectStatus,
          containerName,
          internalPort,
          appPort,
          memoryLimit,
          cpuLimit,
          storageLimit,
          appUrl,
          defaultSubdomain,
          customDomain,
          dnsTarget,
          activeUntil,
          notes: adminNotes,
        },
      })
    : await prisma.vpsProject.create({
        data: {
          clientId: order.clientId,
          orderId: order.id,
          name: order.projectName,
          slug,
          packageType,
          appType,
          status: projectStatus,
          containerName,
          internalPort,
          appPort,
          memoryLimit,
          cpuLimit,
          storageLimit,
          appUrl,
          defaultSubdomain,
          customDomain,
          dnsTarget,
          activeUntil,
          notes: adminNotes,
        },
      });

  await prisma.vpsRepository.upsert({
    where: { projectId: project.id },
    update: {
      repoUrl,
      branch,
      installCommand,
      buildCommand,
      startCommand,
      appPort,
    },
    create: {
      projectId: project.id,
      repoUrl,
      branch,
      installCommand,
      buildCommand,
      startCommand,
      appPort,
    },
  });

  if (databaseType) {
    await prisma.vpsDatabase.upsert({
      where: { projectId: project.id },
      update: {
        type: databaseType,
        status: "REQUESTED",
      },
      create: {
        projectId: project.id,
        type: databaseType,
        status: "REQUESTED",
      },
    });
  }

  await upsertProjectDomain({
    projectId: project.id,
    hostname: defaultSubdomain,
    type: "DEFAULT",
    status: "ACTIVE",
    dnsTarget,
  });

  if (customDomain) {
    await upsertProjectDomain({
      projectId: project.id,
      hostname: customDomain,
      type: "CUSTOM",
      status: "PENDING_DNS",
      dnsTarget,
    });
  }

  await prisma.vpsActivityLog.create({
    data: {
      projectId: project.id,
      clientId: order.clientId,
      orderId: order.id,
      type: "ORDER_APPROVED",
      message: "Order disetujui admin dan metadata project dibuat/diperbarui.",
    },
  });

  revalidatePath("/admin/vps-orders");
  revalidatePath(`/admin/vps-orders/${order.id}`);
  revalidatePath("/admin/vps-projects");
  revalidatePath("/vps-service/dashboard");
}

export async function rejectVpsOrder(orderId: string) {
  await requireAdmin();

  const order = await prisma.vpsOrder.update({
    where: { id: orderId },
    data: { status: "REJECTED" },
    select: { id: true, clientId: true },
  });

  await prisma.vpsActivityLog.create({
    data: {
      clientId: order.clientId,
      orderId: order.id,
      type: "ORDER_REJECTED",
      message: "Order ditolak admin.",
    },
  });

  revalidatePath("/admin/vps-orders");
  revalidatePath(`/admin/vps-orders/${order.id}`);
  revalidatePath("/vps-service/dashboard");
}

export async function updateVpsOrder(orderId: string, formData: FormData) {
  await requireAdmin();

  const packageType = normalizePackageType(formData.get("packageType"));
  const appType = normalizeAppType(formData.get("appType"));
  const status = normalizeOrderStatus(formData.get("status"));
  const activeUntilInput = cleanOptionalText(formData.get("activeUntil"), 20);
  const activeUntil = activeUntilInput
    ? parseActiveUntil(activeUntilInput, 30)
    : undefined;
  const notes = cleanOptionalText(formData.get("notes"), 1000);
  const paymentProof = cleanOptionalText(formData.get("paymentProof"), 500);
  const repoUrl = normalizeRepoUrl(formData.get("repoUrl"));
  const branch = normalizeBranch(formData.get("branch"));
  const appPort = normalizeAppPort(formData.get("appPort"), 3000);

  if (!packageType || !appType || !status) {
    throw new Error("Data order tidak valid.");
  }

  await prisma.vpsOrder.update({
    where: { id: orderId },
    data: {
      packageType,
      appType,
      status,
      amount: vpsPackages[packageType].price,
      activeUntil,
      repoUrl,
      branch,
      appPort,
      notes,
      paymentProof,
    },
  });

  revalidatePath("/admin/vps-orders");
  revalidatePath(`/admin/vps-orders/${orderId}`);
  revalidatePath("/vps-service/dashboard");
}
