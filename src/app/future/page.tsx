import { FUTURE_INTRO, FUTURE_TOPICS, FUTURE_REFERENCES, type FutureTopic } from "@/data/future";
import { ReferenceList } from "@/components/ReferenceList";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: "Future in Europe — Electricity Pricing Tutor" };

const STATUS: Record<FutureTopic["status"], { label: string; cls: string }> = {
  live: { label: "● Live now", cls: "bg-emerald-100 text-emerald-800 ring-emerald-600/20" },
  "rolling-out": { label: "◐ Rolling out", cls: "bg-amber-100 text-amber-800 ring-amber-600/20" },
  evolving: { label: "◌ Evolving", cls: "bg-blue-100 text-blue-800 ring-blue-600/20" },
};

export default function FuturePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6">
        <h1 className="text-2xl font-bold text-slate-900">Future in Europe — market coupling</h1>
        <p className="mt-3 text-slate-600">{FUTURE_INTRO}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {Object.values(STATUS).map((s) => (
            <span key={s.label} className={`rounded-full px-2.5 py-0.5 font-medium ring-1 ring-inset ${s.cls}`}>
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {FUTURE_TOPICS.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.04}>
            <section id={t.id} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-slate-900">{t.title}</h2>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS[t.status].cls}`}>
                  {STATUS[t.status].label}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-brand-700">{t.oneLiner}</p>
              <p className="mt-3 text-slate-600">{t.plain}</p>
              <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Why it matters for a depot
                </span>
                <p className="mt-1 text-sm text-slate-600">{t.depotRelevance}</p>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Sources: [{t.refIds.join(", ")}]
              </p>
            </section>
          </Reveal>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900">References</h2>
        <div className="mt-3">
          <ReferenceList references={FUTURE_REFERENCES} />
        </div>
      </section>
    </div>
  );
}
