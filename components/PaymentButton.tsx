"use client";

import { useState } from "react";

export function PaymentButton({ orderId }: { orderId: string }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function pay() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/payments/midtrans/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Gagal menyiapkan pembayaran.");
      }

      if (result.redirectUrl?.startsWith("http")) {
        window.location.href = result.redirectUrl;
        return;
      }

      setMessage(
        result.message ||
          "Transaksi placeholder dibuat. Midtrans Snap siap disambungkan."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Gagal menyiapkan pembayaran."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={pay}
        disabled={loading}
        className="w-full rounded-full bg-[#ff2f1f] px-7 py-4 text-sm font-bold uppercase text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Menyiapkan Midtrans..." : "Pay with Midtrans"}
      </button>
      {message ? (
        <p className="mt-4 rounded-2xl border border-black/10 bg-black/[0.04] p-4 text-sm leading-6 text-black/60">
          {message}
        </p>
      ) : null}
    </div>
  );
}
