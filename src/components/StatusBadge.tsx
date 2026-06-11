import type { DocStatus } from "@/data/types";

const MAP: Record<DocStatus, { label: string; cls: string }> = {
  "deep-dive": { label: "Deep dive", cls: "bg-emerald-100 text-emerald-800 ring-emerald-600/20" },
  documented: { label: "Documented", cls: "bg-blue-100 text-blue-800 ring-blue-600/20" },
  partial: { label: "Partial", cls: "bg-amber-100 text-amber-800 ring-amber-600/20" },
  "needs-research": { label: "Needs research", cls: "bg-slate-100 text-slate-600 ring-slate-500/20" },
};

export function StatusBadge({ status }: { status: DocStatus }) {
  const m = MAP[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${m.cls}`}
    >
      {m.label}
    </span>
  );
}
