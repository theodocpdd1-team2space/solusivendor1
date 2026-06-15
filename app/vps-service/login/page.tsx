import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login Hosting Client",
  description: "Login client Container Hosting SolusiVendor.",
};

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
    registered?: string;
  }>;
};

export default async function VpsLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = params.next || "/vps-service/dashboard";

  return (
    <main className="min-h-screen bg-[#07110f] px-4 py-8 text-white md:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/vps-service" className="text-2xl font-light">
          SOLUSI<span className="font-bold text-[#ff4b3e]">VENDOR</span>
        </Link>
        <Link
          href="/vps-service/register"
          className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold uppercase text-white/70 transition hover:bg-white hover:text-black"
        >
          Register
        </Link>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl grid-cols-1 gap-10 py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#ffb199]">
            Hosting client login
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-6xl">
            Masuk ke portal Container Hosting.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
            Pantau order, status layanan, instruksi pembayaran, domain, dan
            detail project hosting kamu.
          </p>
          {params.registered ? (
            <p className="mt-5 max-w-xl rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
              Akun berhasil dibuat. Silakan login dengan email dan password kamu.
            </p>
          ) : null}
        </div>

        <LoginForm nextPath={nextPath} registerPath="/vps-service/register" />
      </section>
    </main>
  );
}
