import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const ownerName = String(body.ownerName || "").trim();
    const businessName = String(body.businessName || "").trim();
    const whatsapp = String(body.whatsapp || "").trim();
    const city = String(body.city || "").trim();
    const vendorType = String(body.vendorType || "").trim();
    const goal = String(body.goal || "").trim();

    if (!ownerName || !businessName || !whatsapp || !city || !vendorType || !goal) {
      return NextResponse.json(
        { message: "Data wajib belum lengkap." },
        { status: 400 }
      );
    }

    const pool = getPool();

    const result = await pool.query(
      `
      INSERT INTO free_registrations (
        owner_name,
        business_name,
        whatsapp,
        city,
        vendor_type,
        instagram,
        current_problem,
        goal,
        package_interest,
        notes,
        source,
        status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id
      `,
      [
        ownerName,
        businessName,
        whatsapp,
        city,
        vendorType,
        body.instagram ? String(body.instagram).trim() : null,
        body.currentProblem ? String(body.currentProblem).trim() : null,
        goal,
        body.packageInterest
          ? String(body.packageInterest).trim()
          : "Free Vendor Hoki",
        body.notes ? String(body.notes).trim() : null,
        "solusivendor.com/free-register",
        "NEW",
      ]
    );

    return NextResponse.json({
      message: "Registration submitted successfully.",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("FREE_REGISTER_ERROR", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan server.",
      },
      { status: 500 }
    );
  }
}