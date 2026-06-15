"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  cleanOptionalText,
  cleanText,
  normalizeAppPort,
  normalizeAppType,
  normalizeBranch,
  normalizeDomain,
  normalizePackageType,
  normalizeRepoUrl,
  vpsPackages,
} from "@/lib/vps";

export async function submitVpsOrder(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    redirect("/vps-service/login?next=/vps-service/order");
  }

  const packageType = normalizePackageType(formData.get("packageType"));
  const appType = normalizeAppType(formData.get("appType"));
  const projectName = cleanText(formData.get("projectName"), 120);
  const whatsapp = cleanText(formData.get("whatsapp"), 40);
  const customDomain = normalizeDomain(formData.get("customDomain"));
  const repoUrl = normalizeRepoUrl(formData.get("repoUrl"));
  const branch = normalizeBranch(formData.get("branch"));
  const appPort = normalizeAppPort(formData.get("appPort"), 3000);
  const notes = cleanOptionalText(formData.get("notes"), 1000);
  const paymentProof = cleanOptionalText(formData.get("paymentProof"), 500);

  if (!packageType || !appType || !projectName || !whatsapp) {
    throw new Error("Paket, tipe app, nama project, dan WhatsApp wajib diisi.");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      businessName: true,
      email: true,
      whatsapp: true,
    },
  });

  if (!user) {
    redirect("/vps-service/login?next=/vps-service/order");
  }

  const orderStatus = paymentProof ? "WAITING_APPROVAL" : "WAITING_PAYMENT";
  const clientStatus = paymentProof ? "WAITING_APPROVAL" : "PENDING_PAYMENT";

  const client = await prisma.vpsClient.upsert({
    where: { userId: user.id },
    update: {
      name: user.businessName || user.name || session.user.name || projectName,
      email: user.email,
      whatsapp,
      status: clientStatus,
    },
    create: {
      userId: user.id,
      name: user.businessName || user.name || session.user.name || projectName,
      email: user.email,
      whatsapp,
      status: clientStatus,
    },
  });

  const order = await prisma.vpsOrder.create({
    data: {
      clientId: client.id,
      packageType,
      projectName,
      appType,
      customDomain,
      repoUrl,
      branch,
      appPort,
      notes,
      paymentProof,
      status: orderStatus,
      amount: vpsPackages[packageType].price,
      activityLogs: {
        create: {
          clientId: client.id,
          type: "ORDER_CREATED",
          message: paymentProof
            ? "Order dibuat dengan bukti pembayaran. Menunggu approval admin."
            : "Order dibuat. Menunggu pembayaran manual.",
        },
      },
    },
    select: { id: true },
  });

  revalidatePath("/vps-service/dashboard");
  revalidatePath("/admin/vps-orders");
  redirect(`/vps-service/dashboard?order=${order.id}`);
}
