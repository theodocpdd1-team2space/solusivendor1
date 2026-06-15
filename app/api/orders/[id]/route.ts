import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/orders";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = getOrderById(id);

  if (!order) {
    return NextResponse.json(
      { message: "Order tidak ditemukan." },
      { status: 404 }
    );
  }

  return NextResponse.json({ order });
}
