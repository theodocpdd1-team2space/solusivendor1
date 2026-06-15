import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login user SolusiVendor untuk melihat template, hosting, order, dan invoice.",
};

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
    registered?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = params.next || "/dashboard";

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white md:px-8">
      <nav className="mx-auto flex max-w-[92rem] items-center justify-between">
        <Link href="/" className="text-2xl font-light tracking-[-0.06em]">
          SOLUSI<span className="font-bold text-[#ff2f1f]">VENDOR</span>
        </Link>
        <Link
          href="/register"
          className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold uppercase text-white/70 transition hover:bg-white hover:text-black"
        >
          Register
        </Link>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] grid-cols-1 gap-10 py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
            User login
          </p>
          <h1 className="mt-6 text-6xl font-light leading-[0.88] tracking-[-0.08em] md:text-[8rem]">
            Masuk ke workspace vendor.
          </h1>
          <p className="mt-8 max-w-xl text-xl font-light leading-9 text-white/45">
            Masuk ke dashboard SolusiVendor.
          </p>
          {params.registered ? (
            <p className="mt-5 max-w-xl rounded-2xl border border-green-400/20 bg-green-400/10 p-4 text-sm leading-6 text-green-100">
              Akun berhasil dibuat. Silakan login dengan email dan password kamu.
            </p>
          ) : null}
        </div>

        <LoginForm nextPath={nextPath} />
      </section>
    </main>
  );
}
