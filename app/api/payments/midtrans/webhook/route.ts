import { NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/orders";
import type { OrderStatus } from "@/lib/platform-types";

export const runtime = "nodejs";

const statusMap: Record<string, OrderStatus> = {
  settlement: "paid",
  capture: "paid",
  pending: "pending",
  expire: "expired",
  cancel: "cancelled",
  deny: "cancelled",
};

export async function POST(request: Request) {
  const notification = await request.json();
  const orderId = String(notification.order_id || "");
  const transactionStatus = String(notification.transaction_status || "pending");

  if (orderId) {
    updateOrderStatus(orderId, statusMap[transactionStatus] || "pending");
  }

  return NextResponse.json({
    ok: true,
    message:
      "Webhook diterima. Validasi signature dan update database permanen disiapkan untuk fase produksi.",
  });
}
