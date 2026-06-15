import { demoOrders, getHostingPackageById, getTemplateById } from "@/lib/platform-data";
import type { Order } from "@/lib/platform-types";

type CreateOrderInput = {
  productType: Order["productType"];
  productId: string;
  customerName?: string;
  customerEmail?: string;
};

const globalForOrders = globalThis as typeof globalThis & {
  __solusiVendorOrders?: Map<string, Order>;
};

const orderStore =
  globalForOrders.__solusiVendorOrders ??
  new Map(demoOrders.map((order) => [order.id, order]));

globalForOrders.__solusiVendorOrders = orderStore;

export function listOrders() {
  return Array.from(orderStore.values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
}

export function getOrderById(id: string) {
  return orderStore.get(id);
}

export function createOrder(input: CreateOrderInput) {
  const product =
    input.productType === "template"
      ? getTemplateById(input.productId)
      : getHostingPackageById(input.productId);

  if (!product) {
    throw new Error("Produk tidak ditemukan.");
  }

  const amount =
    input.productType === "template"
      ? getTemplateById(input.productId)?.price
      : getHostingPackageById(input.productId)?.monthlyPrice;

  if (typeof amount !== "number") {
    throw new Error("Harga produk tidak valid.");
  }

  const order: Order = {
    id: `ORD-SV-${Date.now()}`,
    userName: input.customerName || "Guest Vendor",
    customerEmail: input.customerEmail || "guest@solusivendor.local",
    productType: input.productType,
    productId: input.productId,
    productName: product.name,
    amount,
    status: amount === 0 ? "active" : "pending",
    createdAt: new Date().toISOString(),
  };

  orderStore.set(order.id, order);

  return order;
}

export function updateOrderStatus(id: string, status: Order["status"]) {
  const order = orderStore.get(id);

  if (!order) return undefined;

  const updated = { ...order, status };
  orderStore.set(id, updated);

  return updated;
}
