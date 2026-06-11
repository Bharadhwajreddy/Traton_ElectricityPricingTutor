import type { TariffComponent, ComponentCategory, Reference } from "@/data/types";

const CAT_LABEL: Record<ComponentCategory, string> = {
  energy: "Energy",
  "grid-power": "Grid · power",
  "grid-energy": "Grid · energy",
  fixed: "Fixed",
  tax: "Tax",
  levy: "Levy",
  surcharge: "Surcharge",
  concession: "Concession",
  metering: "Metering",
};

const CAT_CLS: Record<ComponentCategory, string> = {
  energy: "bg-indigo-50 text-indigo-700",
  "grid-power": "bg-cyan-50 text-cyan-700",
  "grid-energy": "bg-teal-50 text-teal-700",
  fixed: "bg-slate-100 text-slate-600",
  tax: "bg-rose-50 text-rose-700",
  levy: "bg-amber-50 text-amber-700",
  surcharge: "bg-orange-50 text-orange-700",
  concession: "bg-fuchsia-50 text-fuchsia-700",
  metering: "bg-lime-50 text-lime-700",
};

export function ComponentTable({
  components,
  references,
}: {
  components: TariffComponent[];
  references?: Reference[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3 font-semibold">Component</th>
            <th className="px-4 py-3 font-semibold">Category</th>
            <th className="px-4 py-3 font-semibold">Legal / regulatory basis</th>
            <th className="px-4 py-3 font-semibold">How it is calculated</th>
            <th className="px-4 py-3 font-semibold">Region variation</th>
          </tr>
        </thead>
        <tbody>
          {components.map((c, i) => (
            <tr key={i} className="border-b border-slate-100 align-top last:border-0">
              <td className="px-4 py-3">
                <div className="font-medium text-slate-800">{c.name}</div>
                {!c.modelled && (
                  <span className="mt-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium uppercase text-slate-500">
                    not modelled
                  </span>
                )}
                {c.refIds && c.refIds.length > 0 && (
                  <span className="ml-1 text-xs text-slate-400">
                    [{c.refIds.join(", ")}]
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${CAT_CLS[c.category]}`}>
                  {CAT_LABEL[c.category]}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600">{c.basis}</td>
              <td className="px-4 py-3 text-slate-600">{c.calculation}</td>
              <td className="px-4 py-3 text-slate-500">{c.variesByRegion ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
