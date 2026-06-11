import { STANDARD_DEPOT } from "@/data/depot";

export const metadata = { title: "Methodology — Electricity Pricing Tutor" };

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Methodology</h1>
      <p className="mt-3 text-slate-600">
        This project maps and explains exactly how grid-connected truck depots are charged for
        electricity today — at the level of detailed components, formulas, and official references.
        It is a data and explanation tool, not a cost optimiser or simulator.
      </p>

      <Block title="Standard example depot">
        <p>One example depot is used consistently across countries so the same logic is visible everywhere:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Contracted power: {STANDARD_DEPOT.contractedPowerKW / 1000} MW</li>
          <li>Annual consumption: {STANDARD_DEPOT.annualEnergyKWh / 1_000_000} GWh/year</li>
          <li>Connection: medium voltage (or the closest industrial/commercial equivalent)</li>
          <li>
            Utilisation time = E / P_max = {STANDARD_DEPOT.utilisationHours.toLocaleString()} full-load
            hours/year
          </li>
        </ul>
        <p className="mt-2">
          Where a country&apos;s tariff structure requires different assumptions (e.g. depots almost
          always at high voltage), the example depot is adjusted for that country only, and the new
          assumptions are documented explicitly on its page.
        </p>
      </Block>

      <Block title="Country prioritisation">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Germany, Sweden, China (deep dive first).</li>
          <li>Remaining major European markets (France, Netherlands, Italy, Spain, UK, …).</li>
          <li>All remaining European countries.</li>
        </ol>
      </Block>

      <Block title="Sourcing rules">
        <ul className="list-disc space-y-1 pl-5">
          <li>Only official or clearly authoritative sources: regulators, TSOs/DSOs, ministries, ENTSO-E, ACER, NDRC/NEA.</li>
          <li>Every structural rule and numeric example has at least one cited source.</li>
          <li>
            No invented or interpolated values. Where a rule exists but is not quantifiable, it is
            documented and flagged <em>&ldquo;not modelled&rdquo;</em> rather than guessed.
          </li>
          <li>
            Where a country cannot be reliably documented in this run, it is marked
            <em> &ldquo;needs research&rdquo;</em> and left unmodelled.
          </li>
        </ul>
      </Block>

      <Block title="What each country page contains">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>A · Classification</strong> — how a depot is treated in tariff terms, with explicit assumptions.</li>
          <li><strong>B · Tariff components</strong> — every component with category, legal basis, calculation and regional variation.</li>
          <li><strong>C · Formulas</strong> — symbolic annual-cost formulas, component by component, plus the total.</li>
          <li><strong>D · V2G / export</strong> — feed-in and vehicle-to-grid rules, or an explicit data-gap note.</li>
          <li><strong>E · Reforms</strong> and <strong>F · References</strong>.</li>
        </ul>
      </Block>

      <Block title="Disclaimer">
        <p>
          Tariff law changes frequently and DSO/province price sheets reset on their own schedules
          (monthly in China, annually in Germany/Sweden). Figures here are summaries for education —
          always verify against the cited primary documents before relying on them.
        </p>
      </Block>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="prose-tight mt-2 space-y-2 text-slate-600">{children}</div>
    </section>
  );
}
