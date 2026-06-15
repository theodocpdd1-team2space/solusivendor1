import { demoOrders, formatRupiah } from "@/lib/platform-data";

export default function AdminOrdersPage() {
  return (
    <AdminTable
      title="Orders"
      headers={["ID", "User", "Type", "Product", "Amount", "Status", "Created"]}
      rows={demoOrders.map((order) => [
        order.id,
        order.userName,
        order.productType,
        order.productName,
        formatRupiah(order.amount),
        order.status,
        order.createdAt,
      ])}
    />
  );
}

function AdminTable({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">Admin</p>
      <h1 className="mt-4 text-5xl font-light tracking-[-0.07em]">{title}</h1>
      <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
        <table className="w-full min-w-[54rem] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.18em] text-white/35">
            <tr>{headers.map((header) => <th key={header} className="pb-4 font-bold">{header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => (
              <tr key={row.join("-")}>{row.map((cell) => <td key={cell} className="py-4 text-white/70">{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
