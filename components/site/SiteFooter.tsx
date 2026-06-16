"use client";

import Link from "next/link";
import { SiteButton } from "@/components/site/Button";
import { SiteContainer } from "@/components/site/SiteContainer";

const whatsappConsult =
  "https://wa.me/62895345902896?text=Halo%20SolusiVendor%2C%20saya%20mau%20konsultasi%20go%20digital.";

const productLinks = [
  ["SolusiVendor Web", "/#web"],
  ["Templates", "/buytemplate"],
  ["SolusiVendor Cloud", "/#cloud"],
  ["DriveOne", "/driveone"],
  ["Custom System", "/#pricing"],
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] py-12 text-white">
      <SiteContainer>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.7fr_.7fr]">
          <div>
            <Link href="/" className="text-2xl font-semibold tracking-[-0.04em]">
              Solusi<span className="text-[var(--primary)]">Vendor</span>
            </Link>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/58">
              SolusiVendor membantu brand, vendor, UMKM, dan bisnis kecil go
              digital lewat website, template, hosting, cloud, dan custom
              system.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/42">
              DriveOne adalah produk storage by SolusiVendor.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/35">
              Products
            </p>
            <div className="mt-4 grid gap-3">
              {productLinks.map(([label, href]) => (
                <Link key={label} href={href} className="text-sm text-white/58 transition hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/35">
              Support
            </p>
            <div className="mt-4 grid gap-3 text-sm text-white/58">
              <a href="mailto:hello@solusivendor.com" className="transition hover:text-white">
                hello@solusivendor.com
              </a>
              <SiteButton href={whatsappConsult} className="mt-2 w-fit">
                WhatsApp CTA
              </SiteButton>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SolusiVendor. All rights reserved.</p>
          <p>Tech solution untuk brand yang ingin go digital.</p>
        </div>
      </SiteContainer>
    </footer>
  );
}
