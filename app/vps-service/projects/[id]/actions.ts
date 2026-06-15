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
  normalizeDatabaseType,
  normalizeDomain,
  normalizeRepoUrl,
  VPS_DNS_TARGET,
} from "@/lib/vps";

async function requireOwnedProject(projectId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect(`/vps-service/login?next=/vps-service/projects/${projectId}`);
  }

  const project = await prisma.vpsProject.findFirst({
    where: {
      id: projectId,
      client: { userId: session.user.id },
    },
    select: {
      id: true,
      clientId: true,
      orderId: true,
      name: true,
      appPort: true,
    },
  });

  if (!project) {
    redirect("/vps-service/projects");
  }

  return project;
}

export async function updateRepositorySettings(projectId: string, formData: FormData) {
  const project = await requireOwnedProject(projectId);
  const repoUrl = normalizeRepoUrl(formData.get("repoUrl"));
  const branch = normalizeBranch(formData.get("branch"));
  const installCommand = cleanOptionalText(formData.get("installCommand"), 240);
  const buildCommand = cleanOptionalText(formData.get("buildCommand"), 240);
  const startCommand = cleanOptionalText(formData.get("startCommand"), 240);
  const appPort = normalizeAppPort(formData.get("appPort"), project.appPort || 3000);

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

  await prisma.vpsProject.update({
    where: { id: projectId },
    data: { appPort },
  });

  await prisma.vpsActivityLog.create({
    data: {
      projectId,
      clientId: project.clientId,
      orderId: project.orderId,
      type: "REPOSITORY_UPDATED",
      message: "Repository settings diperbarui client.",
    },
  });

  revalidatePath(`/vps-service/projects/${projectId}`);
}

export async function requestDeploy(projectId: string) {
  const project = await requireOwnedProject(projectId);

  await prisma.vpsActivityLog.create({
    data: {
      projectId,
      clientId: project.clientId,
      orderId: project.orderId,
      type: "DEPLOY_REQUESTED",
      message: "Client meminta deploy dari repository settings.",
    },
  });

  revalidatePath(`/vps-service/projects/${projectId}`);
  revalidatePath("/admin/vps-projects");
}

export async function requestRestart(projectId: string) {
  const project = await requireOwnedProject(projectId);

  await prisma.vpsActivityLog.create({
    data: {
      projectId,
      clientId: project.clientId,
      orderId: project.orderId,
      type: "RESTART_REQUESTED",
      message: "Client meminta restart container. Belum dieksekusi otomatis.",
    },
  });

  revalidatePath(`/vps-service/projects/${projectId}`);
  revalidatePath("/admin/vps-projects");
}

export async function addCustomDomain(projectId: string, formData: FormData) {
  const project = await requireOwnedProject(projectId);
  const hostname = normalizeDomain(formData.get("hostname"));

  if (!hostname) {
    throw new Error("Domain tidak valid.");
  }

  await prisma.vpsDomain.create({
    data: {
      projectId,
      hostname,
      type: "CUSTOM",
      status: "PENDING_DNS",
      dnsTarget: VPS_DNS_TARGET,
    },
  });

  await prisma.vpsProject.update({
    where: { id: projectId },
    data: { customDomain: hostname, dnsTarget: VPS_DNS_TARGET },
  });

  await prisma.vpsActivityLog.create({
    data: {
      projectId,
      clientId: project.clientId,
      orderId: project.orderId,
      type: "DOMAIN_ADDED",
      message: `Client menambahkan domain ${hostname}.`,
    },
  });

  revalidatePath(`/vps-service/projects/${projectId}`);
}

export async function requestDatabase(projectId: string, formData: FormData) {
  const project = await requireOwnedProject(projectId);
  const type = normalizeDatabaseType(formData.get("databaseType")) || "POSTGRES";

  await prisma.vpsDatabase.upsert({
    where: { projectId },
    update: {
      type,
      status: "REQUESTED",
    },
    create: {
      projectId,
      type,
      status: "REQUESTED",
    },
  });

  await prisma.vpsActivityLog.create({
    data: {
      projectId,
      clientId: project.clientId,
      orderId: project.orderId,
      type: "DATABASE_REQUESTED",
      message: `Client meminta database ${type}.`,
    },
  });

  revalidatePath(`/vps-service/projects/${projectId}`);
  revalidatePath("/admin/vps-projects");
}

export async function updateProjectSettings(projectId: string, formData: FormData) {
  const project = await requireOwnedProject(projectId);
  const name = cleanText(formData.get("name"), 120);
  const notes = cleanOptionalText(formData.get("notes"), 1000);
  const appType = normalizeAppType(formData.get("appType"));

  if (!name || !appType) {
    throw new Error("Nama project dan app type wajib valid.");
  }

  await prisma.vpsProject.update({
    where: { id: projectId },
    data: {
      name,
      notes,
      appType,
    },
  });

  await prisma.vpsActivityLog.create({
    data: {
      projectId,
      clientId: project.clientId,
      orderId: project.orderId,
      type: "PROJECT_SETTINGS_UPDATED",
      message: "Client memperbarui settings project.",
    },
  });

  revalidatePath(`/vps-service/projects/${projectId}`);
}
