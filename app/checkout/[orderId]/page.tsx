import type { Metadata } from "next";
import Link from "next/link";
import { PaymentButton } from "@/components/PaymentButton";
import { formatRupiah } from "@/lib/platform-data";
import { getOrderById } from "@/lib/orders";

type CheckoutProps = {
  params: Promise<{ orderId: string }>;
};

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout order SolusiVendor dengan persiapan pembayaran Midtrans.",
};

export default async function CheckoutPage({ params }: CheckoutProps) {
  const { orderId } = await params;
  const order = getOrderById(orderId);

  return (
    <main className="min-h-screen bg-[#f4f0e8] px-4 py-8 text-black md:px-8">
      <nav className="mx-auto flex max-w-[92rem] items-center justify-between">
        <Link href="/" className="text-2xl font-light tracking-[-0.06em]">
          SOLUSI<span className="font-bold text-[#ff2f1f]">VENDOR</span>
        </Link>
        <Link href="/dashboard" className="rounded-full border border-black/15 px-5 py-2.5 text-xs font-bold uppercase text-black/70">
          Dashboard
        </Link>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] grid-cols-1 gap-10 py-16 lg:grid-cols-[1fr_.8fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
            Checkout
          </p>
          <h1 className="mt-6 text-6xl font-light leading-[0.88] tracking-[-0.08em] md:text-[8rem]">
            Review order sebelum bayar.
          </h1>
          <p className="mt-8 max-w-xl text-xl font-light leading-9 text-black/55">
            Pembayaran disiapkan untuk Midtrans. Jika key belum tersedia, tombol
            akan mengembalikan response placeholder yang aman untuk development.
          </p>
        </div>

        <aside className="rounded-[1.5rem] border border-black/10 bg-white/75 p-6 md:p-8">
          {order ? (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/35">
                Order summary
              </p>
              <h2 className="mt-4 text-4xl font-light tracking-[-0.06em]">
                {order.productName}
              </h2>
              <div className="mt-6 space-y-3 text-sm text-black/60">
                <div className="flex justify-between gap-4">
                  <span>Order ID</span>
                  <span className="font-bold text-black">{order.id}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Customer</span>
                  <span className="font-bold text-black">{order.userName}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Status</span>
                  <span className="font-bold uppercase text-[#ff2f1f]">{order.status}</span>
                </div>
              </div>
              <div className="my-7 h-px bg-black/10" />
              <div className="flex items-end justify-between gap-4">
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-black/35">
                  Total
                </span>
                <span className="text-4xl font-light tracking-[-0.06em]">
                  {formatRupiah(order.amount)}
                </span>
              </div>
              <div className="mt-8">
                <PaymentButton orderId={order.id} />
              </div>
            </>
          ) : (
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff2f1f]">
                Order not found
              </p>
              <h2 className="mt-4 text-4xl font-light tracking-[-0.06em]">
                Order belum ada di mock store.
              </h2>
              <p className="mt-5 text-sm leading-7 text-black/55">
                Buat order dari halaman template atau VPS dulu agar checkout
                punya data summary.
              </p>
              <Link href="/templates" className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-xs font-bold uppercase text-white">
                Browse templates
              </Link>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
