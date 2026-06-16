"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteButton } from "@/components/site/Button";
import { SiteContainer } from "@/components/site/SiteContainer";

const whatsappConsult =
  "https://wa.me/62895345902896?text=Halo%20SolusiVendor%2C%20saya%20mau%20konsultasi%20go%20digital.";

const navItems = [
  { label: "Web", href: "/#web" },
  { label: "Templates", href: "/buytemplate" },
  { label: "Cloud", href: "/#cloud" },
  { label: "DriveOne", href: "/driveone" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(5,5,5,0.82)] backdrop-blur-xl">
      <SiteContainer>
        <nav className="flex min-h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-baseline gap-3">
            <span className="text-xl font-semibold tracking-[-0.04em] text-white">
              Solusi<span className="text-[var(--primary)]">Vendor</span>
            </span>
            <span className="hidden rounded-full border border-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42 sm:inline-flex">
              Tech Platform
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/62 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/login" className="text-sm font-medium text-white/55 transition hover:text-white">
              Login
            </Link>
            <SiteButton href={whatsappConsult} className="min-h-10 px-4 py-2 text-sm">
              Konsultasi
            </SiteButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <span className="text-lg leading-none">{open ? "×" : "≡"}</span>
          </button>
        </nav>

        {open ? (
          <div className="border-t border-white/10 py-4 lg:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-3 text-sm font-medium text-white/72 hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/12 px-4 py-3 text-center text-sm font-semibold text-white/72"
                >
                  Login
                </Link>
                <a
                  href={whatsappConsult}
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-[var(--primary)] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Konsultasi
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </SiteContainer>
    </header>
  );
}
