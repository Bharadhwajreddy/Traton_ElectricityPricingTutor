import { GLOSSARY_GROUPS } from "@/data/glossary";

export function Glossary({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-xl border border-brand-200 bg-brand-50/40"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 font-medium text-brand-900">
        <span>📖 New to electricity tariffs? Plain-English key terms</span>
        <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs text-brand-700 transition group-open:hidden">
          click to expand
        </span>
        <span className="hidden text-brand-400 group-open:inline">▴ hide</span>
      </summary>
      <div className="border-t border-brand-100 px-4 py-4">
        <p className="mb-4 text-sm text-slate-500">
          Every charge below is just a line item that adds up to the total bill. Use this as a
          fallback whenever a local-language term appears in the summaries or tables.
        </p>
        <div className="space-y-5">
          {GLOSSARY_GROUPS.map((grp) => (
            <div key={grp.heading}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
                {grp.heading}
              </h3>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {grp.terms.map((g) => (
                  <div key={g.term}>
                    <dt className="text-sm font-semibold text-slate-800">{g.term}</dt>
                    <dd className="text-sm text-slate-600">{g.plain}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}
