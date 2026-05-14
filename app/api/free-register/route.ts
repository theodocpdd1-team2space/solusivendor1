import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

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

    const { data, error } = await supabaseAdmin
      .from("free_registrations")
      .insert({
        owner_name: ownerName,
        business_name: businessName,
        whatsapp,
        city,
        vendor_type: vendorType,
        instagram: body.instagram ? String(body.instagram).trim() : null,
        current_problem: body.currentProblem
          ? String(body.currentProblem).trim()
          : null,
        goal,
        package_interest: body.packageInterest
          ? String(body.packageInterest).trim()
          : "Free Vendor Hoki",
        notes: body.notes ? String(body.notes).trim() : null,
        source: "solusivendor.com/free-register",
        status: "NEW",
      })
      .select("id")
      .single();

    if (error) {
      console.error("SUPABASE_INSERT_ERROR", error);

      return NextResponse.json(
        { message: "Gagal menyimpan data registrasi." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Registration submitted successfully.",
      id: data.id,
    });
  } catch (error) {
    console.error("FREE_REGISTER_ERROR", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}