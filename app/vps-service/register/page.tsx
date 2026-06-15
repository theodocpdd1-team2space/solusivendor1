import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Register Hosting Client",
  description: "Buat akun client Container Hosting SolusiVendor.",
};

export default function VpsRegisterPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] px-4 py-8 text-black md:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/vps-service" className="text-2xl font-light">
          SOLUSI<span className="font-bold text-[#ff4b3e]">VENDOR</span>
        </Link>
        <Link
          href="/vps-service/login"
          className="rounded-full border border-black/15 px-5 py-2.5 text-xs font-bold uppercase text-black/70 transition hover:bg-black hover:text-white"
        >
          Login
        </Link>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl grid-cols-1 gap-10 py-16 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#b22a20]">
            Register hosting
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-6xl">
            Buat akun untuk sewa Container Hosting.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-black/60">
            Setelah daftar, kamu bisa submit order, melihat instruksi pembayaran
            manual, dan memantau proses approval admin.
          </p>
        </div>

        <RegisterForm nextPath="/vps-service/dashboard" />
      </section>
    </main>
  );
}
