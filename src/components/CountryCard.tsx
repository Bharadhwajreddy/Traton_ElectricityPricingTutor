import Link from "next/link";
import type { Country } from "@/data/types";
import { StatusBadge } from "./StatusBadge";

export function CountryCard({ country }: { country: Country }) {
  const interactive = country.status !== "needs-research";
  const inner = (
    <div
      className={`group flex h-full flex-col rounded-xl border bg-white p-4 transition ${
        interactive
          ? "border-slate-200 hover:border-brand-500 hover:shadow-md"
          : "border-dashed border-slate-200 opacity-80"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{country.flag ?? "🏳️"}</span>
          <span className="font-semibold text-slate-900">{country.name}</span>
        </div>
        <StatusBadge status={country.status} />
      </div>
      <p className="mt-2 line-clamp-3 text-sm text-slate-500">{country.summary}</p>
      {interactive && (
        <span className="mt-3 text-sm font-medium text-brand-600 group-hover:underline">
          View tariff breakdown →
        </span>
      )}
    </div>
  );

  if (!interactive) return inner;
  return <Link href={`/country/${country.code}`}>{inner}</Link>;
}
