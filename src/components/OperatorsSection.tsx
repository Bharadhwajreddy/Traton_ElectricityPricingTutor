import type { Operators } from "@/data/types";

function Card({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div className="mt-2 text-sm text-slate-600">{children}</div>
    </div>
  );
}

export function OperatorsSection({ operators }: { operators: Operators }) {
  return (
    <div className="space-y-4">
      {/* TSO "map" — tiles, one per transmission control area */}
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Transmission System Operator{operators.tso.length > 1 ? "s" : ""} (high-voltage backbone)
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {operators.tso.map((t, i) => (
            <div
              key={i}
              className="rounded-lg border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-3"
            >
              <div className="text-sm font-semibold text-cyan-900">{t.name}</div>
              {t.note && <div className="mt-0.5 text-xs text-slate-500">{t.note}</div>}
            </div>
          ))}
        </div>
        {operators.tsoNote && (
          <p className="mt-2 text-xs text-slate-500">{operators.tsoNote}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card icon="🔌" title="Distribution (DSOs)">
          <p>{operators.dso}</p>
          {operators.dsoExamples && operators.dsoExamples.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {operators.dsoExamples.map((d) => (
                <span
                  key={d}
                  className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                >
                  {d}
                </span>
              ))}
            </div>
          )}
        </Card>
        <Card icon="⚖️" title="Market clearing">
          <p>{operators.marketOperator}</p>
        </Card>
        <Card icon="🗺️" title="Price / bidding zones">
          <p>{operators.priceZones ?? "—"}</p>
        </Card>
      </div>
    </div>
  );
}
