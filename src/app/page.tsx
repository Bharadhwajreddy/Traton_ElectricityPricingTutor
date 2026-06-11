import { COUNTRIES, countriesByStatus } from "@/data/countries";
import { CountryCard } from "@/components/CountryCard";
import { STANDARD_DEPOT } from "@/data/depot";
import { Glossary } from "@/components/Glossary";

export default function Home() {
  const ordered = countriesByStatus();
  const deepDive = ordered.filter((c) => c.status === "deep-dive" || c.status === "documented");
  const rest = ordered.filter((c) => c.status === "partial" || c.status === "needs-research");
  const counts = {
    total: COUNTRIES.length,
    documented: COUNTRIES.filter((c) => c.status === "deep-dive" || c.status === "documented").length,
    needs: COUNTRIES.filter((c) => c.status === "needs-research").length,
  };

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How is a truck depot charged for electricity?
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            A country-by-country breakdown of every charge that adds up to a truck depot&apos;s
            electricity bill — the price of the electricity itself, the fees for delivering it over
            the wires, and the taxes and surcharges on top — across Europe and China, each item with
            its formula and official source.
          </p>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            New to this? A <em>tariff</em> is simply the rate plan for electricity, and each{" "}
            <em>component</em> is one line item on the bill. Every country page opens with a
            plain-English summary and a “key terms” panel.
          </p>

          <div className="mt-6 grid max-w-2xl grid-cols-3 gap-3 text-sm">
            <Stat label="Countries in scope" value={counts.total} />
            <Stat label="Documented" value={counts.documented} accent />
            <Stat label="Awaiting research" value={counts.needs} muted />
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 sm:max-w-2xl">
            <div className="font-semibold text-slate-800">Standard example depot</div>
            <div className="mt-1">
              {STANDARD_DEPOT.contractedPowerKW / 1000} MW contracted power ·{" "}
              {STANDARD_DEPOT.annualEnergyKWh / 1_000_000} GWh/year ·{" "}
              {STANDARD_DEPOT.voltageLevel.toLowerCase()} · ≈{" "}
              {STANDARD_DEPOT.utilisationHours.toLocaleString()} full-load hours/year. Applied
              consistently across countries unless a documented deviation is noted.
            </div>
          </div>

          <div className="mt-6 sm:max-w-2xl">
            <Glossary />
          </div>
        </div>
      </section>

      {/* Priority countries */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-lg font-semibold text-slate-900">Documented countries</h2>
        <p className="mt-1 text-sm text-slate-500">
          Deep-dive priority markets with cited tariff components, formulas and V2G rules.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deepDive.map((c) => (
            <CountryCard key={c.code} country={c} />
          ))}
        </div>
      </section>

      {/* Remaining */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-lg font-semibold text-slate-900">In scope · awaiting research</h2>
        <p className="mt-1 text-sm text-slate-500">
          Scaffolded countries. Per the project rules, these are left unmodelled rather than
          populated with unverified figures.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((c) => (
            <CountryCard key={c.code} country={c} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, accent, muted }: { label: string; value: number; accent?: boolean; muted?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        accent ? "border-emerald-200 bg-emerald-50" : muted ? "border-slate-200 bg-slate-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className={`text-2xl font-bold ${accent ? "text-emerald-700" : "text-slate-900"}`}>{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
