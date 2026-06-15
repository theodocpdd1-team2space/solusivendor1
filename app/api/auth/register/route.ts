import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const businessName = String(
      body.businessName || body.vendorName || body.name || ""
    ).trim();
    const email = String(body.email || "").trim().toLowerCase();
    const whatsapp = body.whatsapp ? String(body.whatsapp).trim() : null;
    const password = String(body.password || "");

    if (!businessName) {
      return NextResponse.json(
        { message: "Nama vendor wajib diisi." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { message: "Email wajib diisi." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password minimal 8 karakter." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar." },
        { status: 409 }
      );
    }

    const passwordHash = await hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name: businessName,
        businessName,
        email,
        whatsapp,
        passwordHash,
        role: "USER",
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        businessName: true,
        email: true,
        whatsapp: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ ok: true, user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Gagal membuat akun.",
      },
      { status: 500 }
    );
  }
}
