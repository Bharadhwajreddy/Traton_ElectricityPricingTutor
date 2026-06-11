import type { CostFormula } from "@/data/types";

export function FormulaBlock({ formulas, total }: { formulas?: CostFormula[]; total?: CostFormula }) {
  if (!formulas || formulas.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <tbody>
          {formulas.map((f, i) => (
            <tr key={i} className="border-b border-slate-100 last:border-0">
              <td className="w-1/3 px-4 py-3 align-top font-medium text-slate-700">{f.label}</td>
              <td className="px-4 py-3 align-top">
                <code className="formula whitespace-pre-wrap break-words rounded bg-slate-50 px-1.5 py-0.5">
                  {f.symbolic}
                </code>
                {f.note && <p className="mt-1 text-xs text-slate-500">{f.note}</p>}
              </td>
            </tr>
          ))}
          {total && (
            <tr className="bg-brand-50">
              <td className="px-4 py-3 align-top font-semibold text-brand-900">{total.label}</td>
              <td className="px-4 py-3 align-top">
                <code className="formula whitespace-pre-wrap break-words font-semibold text-brand-900">
                  {total.symbolic}
                </code>
                {total.note && <p className="mt-1 text-xs text-brand-700">{total.note}</p>}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
