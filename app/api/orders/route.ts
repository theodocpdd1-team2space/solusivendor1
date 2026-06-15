import { NextResponse } from "next/server";
import { createOrder, listOrders } from "@/lib/orders";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ orders: listOrders() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const productType = String(body.productType || "");
    const productId = String(body.productId || "");

    if (productType !== "template" && productType !== "hosting") {
      return NextResponse.json(
        { message: "Tipe produk tidak valid." },
        { status: 400 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID wajib diisi." },
        { status: 400 }
      );
    }

    const order = createOrder({
      productType,
      productId,
      customerName: body.customerName ? String(body.customerName) : undefined,
      customerEmail: body.customerEmail ? String(body.customerEmail) : undefined,
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Gagal membuat order.",
      },
      { status: 500 }
    );
  }
}
