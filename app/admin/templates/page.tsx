import { formatRupiah, templates } from "@/lib/platform-data";

export default function AdminTemplatesPage() {
  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff2f1f]">Admin</p>
      <h1 className="mt-4 text-5xl font-light tracking-[-0.07em]">Templates</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {templates.map((template) => (
          <article key={template.id} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">{template.category}</p>
            <h2 className="mt-4 text-3xl font-light tracking-[-0.05em]">{template.name}</h2>
            <p className="mt-4 text-sm leading-7 text-white/45">{template.description}</p>
            <div className="mt-5 flex justify-between gap-4 text-sm">
              <span>{formatRupiah(template.price)}</span>
              <span className="uppercase text-[#ff2f1f]">{template.status}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
