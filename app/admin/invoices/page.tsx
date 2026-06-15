import { demoInvoices, formatRupiah } from "@/lib/platform-data";

export default function AdminInvoicesPage() {
  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">Admin</p>
      <h1 className="mt-4 text-5xl font-light tracking-[-0.07em]">Invoices</h1>
      <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
        <table className="w-full min-w-[42rem] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.18em] text-white/35">
            <tr>{["ID", "Order", "Amount", "Status", "Due Date"].map((header) => <th key={header} className="pb-4 font-bold">{header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {demoInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="py-4 text-white/70">{invoice.id}</td>
                <td className="py-4 text-white/70">{invoice.orderId}</td>
                <td className="py-4 text-white/70">{formatRupiah(invoice.amount)}</td>
                <td className="py-4 uppercase text-[#ff2f1f]">{invoice.status}</td>
                <td className="py-4 text-white/70">{invoice.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
