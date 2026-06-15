"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm({
  nextPath,
  registerPath = "/register",
}: {
  nextPath: string;
  registerPath?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email atau password tidak valid.");
      setLoading(false);
      return;
    }

    const session = await getSession();
    const safeNext = nextPath.startsWith("/") ? nextPath : "/dashboard";
    const target =
      safeNext.startsWith("/admin") && session?.user.role !== "ADMIN"
        ? "/dashboard"
        : safeNext || "/dashboard";

    router.push(target);
    router.refresh();
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-6 md:p-8"
    >
      <label className="block text-xs font-bold uppercase tracking-[0.22em] text-white/40">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="owner@vendor.com"
          required
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-base font-normal text-white outline-none placeholder:text-white/25"
        />
      </label>
      <label className="mt-5 block text-xs font-bold uppercase tracking-[0.22em] text-white/40">
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="********"
          required
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-base font-normal text-white outline-none placeholder:text-white/25"
        />
      </label>

      {error ? (
        <p className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm leading-6 text-red-100">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 flex w-full justify-center rounded-full bg-[#ff2f1f] px-7 py-4 text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Memproses..." : "Login"}
      </button>

      <div className="mt-5 flex flex-col items-center gap-2 text-center text-sm leading-6 text-white/40">
        <p>
          Belum punya akun?{" "}
          <Link href={registerPath} className="text-[#ff2f1f]">
            Daftar sekarang
          </Link>
        </p>
        <span className="text-white/30">Lupa password? Hubungi admin SolusiVendor.</span>
      </div>
    </form>
  );
}
