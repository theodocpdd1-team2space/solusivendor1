import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Buat akun SolusiVendor untuk membeli template, hosting, dan mengelola layanan.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#f4f0e8] px-4 py-8 text-black md:px-8">
      <nav className="mx-auto flex max-w-[92rem] items-center justify-between">
        <Link href="/" className="text-2xl font-light tracking-[-0.06em]">
          SOLUSI<span className="font-bold text-[#ff2f1f]">VENDOR</span>
        </Link>
        <Link
          href="/login"
          className="rounded-full border border-black/15 px-5 py-2.5 text-xs font-bold uppercase text-black/70 transition hover:bg-black hover:text-white"
        >
          Login
        </Link>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] grid-cols-1 gap-10 py-16 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
            Register
          </p>
          <h1 className="mt-6 text-6xl font-light leading-[0.88] tracking-[-0.08em] md:text-[8rem]">
            Buat akun untuk mulai order.
          </h1>
          <p className="mt-8 max-w-xl text-xl font-light leading-9 text-black/55">
            Buat akun vendor untuk mulai order template, hosting, dan layanan
            digital.
          </p>
        </div>

        <RegisterForm />
      </section>
    </main>
  );
}
