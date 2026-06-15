import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

const adminLinks = [
  ["Overview", "/admin"],
  ["Orders", "/admin/orders"],
  ["Users", "/admin/users"],
  ["Templates", "/admin/templates"],
  ["Hosting Packages", "/admin/packages"],
  ["Services", "/admin/services"],
  ["Invoices", "/admin/invoices"],
  ["VPS Orders", "/admin/vps-orders"],
  ["VPS Users", "/admin/vps-users"],
  ["VPS Projects", "/admin/vps-projects"],
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?next=/admin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[18rem_1fr]">
        <aside className="border-b border-white/10 bg-white/[0.035] p-5 lg:border-b-0 lg:border-r">
          <Link href="/" className="text-2xl font-light tracking-[-0.06em]">
            SOLUSI<span className="font-bold text-[#ff2f1f]">VENDOR</span>
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.24em] text-white/35">
            Admin console
          </p>
          <nav className="mt-8 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {adminLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="whitespace-nowrap rounded-full border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white/55 transition hover:border-[#ff2f1f]/50 hover:text-white lg:rounded-2xl"
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="min-w-0 p-4 md:p-8">{children}</section>
      </div>
    </main>
  );
}
