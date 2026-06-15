import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      businessName: true,
      email: true,
      whatsapp: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">Admin</p>
      <h1 className="mt-4 text-5xl font-light tracking-[-0.07em]">Users</h1>
      <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
        <table className="w-full min-w-[42rem] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.18em] text-white/35">
            <tr>{["Vendor", "Email", "WhatsApp", "Role", "Status", "Created"].map((header) => <th key={header} className="pb-4 font-bold">{header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-4 text-white/70">{user.businessName || user.name || "-"}</td>
                <td className="py-4 text-white/70">{user.email}</td>
                <td className="py-4 text-white/70">{user.whatsapp || "-"}</td>
                <td className="py-4 text-white/70">{user.role}</td>
                <td className="py-4 uppercase text-[#ff2f1f]">{user.status}</td>
                <td className="py-4 text-white/70">{user.createdAt.toISOString().slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
