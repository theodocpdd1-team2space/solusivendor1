import { demoServices, hostingPackages } from "@/lib/platform-data";

export default function AdminServicesPage() {
  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">Admin</p>
      <h1 className="mt-4 text-5xl font-light tracking-[-0.07em]">Services</h1>
      <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
        <table className="w-full min-w-[48rem] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.18em] text-white/35">
            <tr>
              {["ID", "Package", "Domain", "Panel", "Terminal", "Status", "Next Billing"].map((header) => (
                <th key={header} className="pb-4 font-bold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {demoServices.map((service) => {
              const plan = hostingPackages.find((item) => item.id === service.packageId);
              return (
                <tr key={service.id}>
                  <td className="py-4 text-white/70">{service.id}</td>
                  <td className="py-4 text-white/70">{plan?.name || service.packageId}</td>
                  <td className="py-4 text-white/70">{service.domain || "-"}</td>
                  <td className="py-4 text-white/70">{service.panelType}</td>
                  <td className="py-4 text-white/70">{service.hasTerminalAccess ? "yes" : "no"}</td>
                  <td className="py-4 uppercase text-[#ff2f1f]">{service.status}</td>
                  <td className="py-4 text-white/70">{service.nextBillingDate || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
