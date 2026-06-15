"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type OrderButtonProps = {
  productType: "template" | "hosting";
  productId: string;
  children: React.ReactNode;
  className?: string;
};

export function OrderButton({
  productType,
  productId,
  children,
  className,
}: OrderButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function createOrder() {
    setLoading(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType,
          productId,
          customerName: "Guest Vendor",
          customerEmail: "guest@solusivendor.local",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Gagal membuat order.");
      }

      router.push(`/checkout/${result.order.id}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal membuat order.");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={createOrder}
      disabled={loading}
      className={className}
    >
      {loading ? "Membuat order..." : children}
    </button>
  );
}
