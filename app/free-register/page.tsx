"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

const vendorTypes = [
  "Sound System",
  "Wedding Organizer",
  "Lighting",
  "Live Streaming",
  "Decoration",
  "Documentation",
  "Videotron",
  "Event Organizer",
  "Rental Alat Event",
  "Lainnya",
];

const goals = [
  "Punya website gratis dulu",
  "Beli template 99rb",
  "Mau terima beres",
  "Mau konsultasi dulu",
];

type FormData = {
  ownerName: string;
  businessName: string;
  whatsapp: string;
  city: string;
  vendorType: string;
  instagram: string;
  currentProblem: string;
  goal: string;
  packageInterest: string;
  notes: string;
};

const initialForm: FormData = {
  ownerName: "",
  businessName: "",
  whatsapp: "",
  city: "",
  vendorType: "",
  instagram: "",
  currentProblem: "",
  goal: "",
  packageInterest: "Free Vendor Hoki",
  notes: "",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function FreeRegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const totalSteps = 4;

  const progress = useMemo(() => {
    return Math.round((step / totalSteps) * 100);
  }, [step]);

  const updateForm = (key: keyof FormData, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const canGoNext = () => {
    if (step === 1) {
      return form.ownerName && form.businessName && form.whatsapp;
    }

    if (step === 2) {
      return form.city && form.vendorType;
    }

    if (step === 3) {
      return form.goal;
    }

    return true;
  };

  const submitForm = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/free-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Gagal mengirim data.");
      }

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan. Coba lagi sebentar."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const waText = encodeURIComponent(
      `Halo SolusiVendor, saya sudah daftar Free Vendor Hoki.\n\nNama: ${form.ownerName}\nVendor: ${form.businessName}\nKota: ${form.city}\nJenis Vendor: ${form.vendorType}`
    );

    return (
      <main className="min-h-screen bg-[#050505] px-4 py-8 text-white md:px-8">
        <div className="pointer-events-none fixed inset-0 opacity-[0.055] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:72px_72px]" />

        <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl items-center justify-center">
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 text-center backdrop-blur-2xl md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
              Registration received
            </p>

            <h1 className="mt-6 text-5xl font-light leading-[0.95] tracking-[-0.07em] md:text-8xl">
              Data kamu sudah masuk.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-7 text-white/50 md:text-lg">
              Tim SolusiVendor akan cek data vendor kamu. Supaya lebih cepat,
              klik tombol WhatsApp di bawah dan kirim konfirmasi.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={`https://wa.me/6281234567890?text=${waText}`}
                target="_blank"
                className="rounded-full bg-[#ff2f1f] px-8 py-4 text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
              >
                Konfirmasi via WhatsApp
              </a>

              <Link
                href="/"
                className="rounded-full border border-white/15 px-8 py-4 text-sm font-bold uppercase text-white transition hover:bg-white hover:text-black"
              >
                Kembali ke homepage
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white md:px-8">
      <div className="pointer-events-none fixed inset-0 opacity-[0.055] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none fixed right-0 top-0 h-[38rem] w-[38rem] rounded-full bg-[#ff2f1f]/15 blur-[120px]" />

      <nav className="relative z-10 mx-auto flex max-w-[92rem] items-center justify-between">
        <Link href="/" className="text-2xl font-light tracking-[-0.06em] md:text-3xl">
          SOLUSI<span className="font-bold text-[#ff2f1f]">VENDOR</span>
        </Link>

        <Link
          href="/"
          className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold uppercase text-white/70 transition hover:bg-white hover:text-black"
        >
          Back home
        </Link>
      </nav>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] grid-cols-1 gap-10 py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">
            Free vendor registration
          </p>

          <h1 className="mt-6 text-6xl font-light leading-[0.9] tracking-[-0.08em] md:text-[8rem]">
            Daftar Free Vendor Hoki.
          </h1>

          <p className="mt-8 max-w-xl text-xl font-light leading-9 text-white/45">
            Isi data vendor kamu. Kami cek dulu, lalu bantu arahkan apakah cocok
            ambil slot gratis, template 99rb, atau paket terima beres.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              ["01", "Isi data"],
              ["02", "Kami review"],
              ["03", "Website mulai"],
            ].map(([no, text]) => (
              <div
                key={no}
                className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl"
              >
                <p className="text-3xl font-light tracking-[-0.07em] text-[#ff2f1f]">
                  {no}
                </p>
                <p className="mt-2 text-xs font-light text-white/45">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl md:p-7">
          <div className="mb-7">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/35">
                Step {step} of {totalSteps}
              </p>
              <p className="text-xs font-bold text-[#ff2f1f]">{progress}%</p>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#ff2f1f] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="min-h-[30rem] rounded-[1.5rem] border border-white/10 bg-black/35 p-6 md:p-8">
            {step === 1 && (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                  Owner identity
                </p>

                <h2 className="mt-4 text-4xl font-light tracking-[-0.06em]">
                  Data dasar owner.
                </h2>

                <div className="mt-8 space-y-5">
                  <Input
                    label="Nama owner"
                    placeholder="Contoh: Theo"
                    value={form.ownerName}
                    onChange={(value) => updateForm("ownerName", value)}
                  />

                  <Input
                    label="Nama vendor"
                    placeholder="Contoh: Colorize Visual"
                    value={form.businessName}
                    onChange={(value) => updateForm("businessName", value)}
                  />

                  <Input
                    label="Nomor WhatsApp"
                    placeholder="Contoh: 6281234567890"
                    value={form.whatsapp}
                    onChange={(value) => updateForm("whatsapp", value)}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                  Vendor profile
                </p>

                <h2 className="mt-4 text-4xl font-light tracking-[-0.06em]">
                  Vendor kamu bergerak di bidang apa?
                </h2>

                <div className="mt-8 space-y-5">
                  <Input
                    label="Kota / Area layanan"
                    placeholder="Contoh: Surabaya, Sidoarjo, Gresik"
                    value={form.city}
                    onChange={(value) => updateForm("city", value)}
                  />

                  <div>
                    <label className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-white/35">
                      Jenis vendor
                    </label>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {vendorTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => updateForm("vendorType", type)}
                          className={cn(
                            "rounded-2xl border px-4 py-3 text-left text-sm font-light transition",
                            form.vendorType === type
                              ? "border-[#ff2f1f] bg-[#ff2f1f] text-white"
                              : "border-white/10 bg-white/[0.04] text-white/55 hover:bg-white/10"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Input
                    label="Instagram / portfolio link"
                    placeholder="Contoh: @namavendor / link Google Drive"
                    value={form.instagram}
                    onChange={(value) => updateForm("instagram", value)}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                  Growth goal
                </p>

                <h2 className="mt-4 text-4xl font-light tracking-[-0.06em]">
                  Kamu butuh yang mana?
                </h2>

                <div className="mt-8 space-y-5">
                  <div>
                    <label className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-white/35">
                      Tujuan utama
                    </label>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {goals.map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => updateForm("goal", goal)}
                          className={cn(
                            "rounded-2xl border px-4 py-4 text-left text-sm font-light transition",
                            form.goal === goal
                              ? "border-[#ff2f1f] bg-[#ff2f1f] text-white"
                              : "border-white/10 bg-white/[0.04] text-white/55 hover:bg-white/10"
                          )}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Textarea
                    label="Masalah vendor kamu sekarang"
                    placeholder="Contoh: portfolio masih tercecer, cuma kirim PDF, belum punya website, client sering tanya harga..."
                    value={form.currentProblem}
                    onChange={(value) => updateForm("currentProblem", value)}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ff2f1f]">
                  Final check
                </p>

                <h2 className="mt-4 text-4xl font-light tracking-[-0.06em]">
                  Review data kamu.
                </h2>

                <div className="mt-8 space-y-3">
                  <Review label="Owner" value={form.ownerName} />
                  <Review label="Vendor" value={form.businessName} />
                  <Review label="WhatsApp" value={form.whatsapp} />
                  <Review label="Kota" value={form.city} />
                  <Review label="Jenis vendor" value={form.vendorType} />
                  <Review label="Tujuan" value={form.goal} />
                </div>

                <div className="mt-6">
                  <Textarea
                    label="Catatan tambahan"
                    placeholder="Contoh: saya mau website simple dulu, warna hitam gold, ada pricelist dan portfolio..."
                    value={form.notes}
                    onChange={(value) => updateForm("notes", value)}
                  />
                </div>

                {error && (
                  <p className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setStep((current) => Math.max(1, current - 1))}
              disabled={step === 1 || loading}
              className="rounded-full border border-white/15 px-7 py-4 text-sm font-bold uppercase text-white transition disabled:cursor-not-allowed disabled:opacity-30 hover:bg-white hover:text-black"
            >
              Back
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep((current) => current + 1)}
                disabled={!canGoNext()}
                className="rounded-full bg-[#ff2f1f] px-7 py-4 text-sm font-bold uppercase text-white transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white hover:text-black"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={submitForm}
                disabled={loading}
                className="rounded-full bg-[#ff2f1f] px-7 py-4 text-sm font-bold uppercase text-white transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white hover:text-black"
              >
                {loading ? "Submitting..." : "Submit Registration"}
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-white/35">
        {label}
      </label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4 text-base font-light text-white outline-none transition placeholder:text-white/25 focus:border-[#ff2f1f] focus:bg-white/[0.07]"
      />
    </div>
  );
}

function Textarea({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-white/35">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={5}
        className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4 text-base font-light text-white outline-none transition placeholder:text-white/25 focus:border-[#ff2f1f] focus:bg-white/[0.07]"
      />
    </div>
  );
}

function Review({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
        {label}
      </p>
      <p className="text-right text-sm font-light text-white/80">
        {value || "-"}
      </p>
    </div>
  );
}