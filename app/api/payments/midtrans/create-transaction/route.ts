import { NextResponse } from "next/server";
import { createMidtransTransaction } from "@/lib/midtrans";
import { getOrderById } from "@/lib/orders";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderId = String(body.orderId || "");

    if (!orderId) {
      return NextResponse.json(
        { message: "Order ID wajib diisi." },
        { status: 400 }
      );
    }

    const order = getOrderById(orderId);

    if (!order) {
      return NextResponse.json(
        { message: "Order tidak ditemukan." },
        { status: 404 }
      );
    }

    const transaction = await createMidtransTransaction(order, {
      firstName: order.userName,
      email: order.customerEmail || "guest@solusivendor.local",
    });

    return NextResponse.json({
      order,
      token: transaction.token,
      redirectUrl: transaction.redirectUrl,
      mode: transaction.mode,
      message: transaction.message,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Gagal membuat transaksi Midtrans.",
      },
      { status: 500 }
    );
  }
}
