import type { Reference } from "@/data/types";

export function ReferenceList({ references }: { references?: Reference[] }) {
  if (!references || references.length === 0) return null;
  return (
    <ol className="space-y-2 text-sm">
      {references.map((r) => (
        <li key={r.id} className="flex gap-2">
          <span className="font-mono text-slate-400">[{r.id}]</span>
          <span className="text-slate-600">
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-600 hover:underline"
            >
              {r.title}
            </a>
            {" — "}
            {r.org}, {r.year}.{" "}
            <span className="text-slate-400">(accessed {r.accessed})</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
