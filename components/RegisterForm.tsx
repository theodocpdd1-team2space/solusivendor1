"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function RegisterForm({ nextPath = "/dashboard" }: { nextPath?: string }) {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, email, whatsapp, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Gagal membuat akun.");
      }

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        router.push("/login?registered=1");
        return;
      }

      router.push(nextPath.startsWith("/") ? nextPath : "/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal membuat akun.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[1.5rem] border border-black/10 bg-white/70 p-6 md:p-8"
    >
      <label className="block text-xs font-bold uppercase tracking-[0.22em] text-black/40">
        Nama vendor
        <input
          type="text"
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
          placeholder="Arista Production"
          required
          className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-base font-normal text-black outline-none placeholder:text-black/25"
        />
      </label>

      <label className="mt-5 block text-xs font-bold uppercase tracking-[0.22em] text-black/40">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="owner@vendor.com"
          required
          className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-base font-normal text-black outline-none placeholder:text-black/25"
        />
      </label>

      <label className="mt-5 block text-xs font-bold uppercase tracking-[0.22em] text-black/40">
        WhatsApp
        <input
          type="tel"
          value={whatsapp}
          onChange={(event) => setWhatsapp(event.target.value)}
          placeholder="08xxxxxxxxxx"
          className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-base font-normal text-black outline-none placeholder:text-black/25"
        />
      </label>

      <label className="mt-5 block text-xs font-bold uppercase tracking-[0.22em] text-black/40">
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Minimal 8 karakter"
          minLength={8}
          required
          className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-base font-normal text-black outline-none placeholder:text-black/25"
        />
      </label>

      {error ? (
        <p className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 flex w-full justify-center rounded-full bg-[#ff2f1f] px-7 py-4 text-sm font-bold uppercase text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Membuat akun..." : "Buat Akun"}
      </button>
    </form>
  );
}
