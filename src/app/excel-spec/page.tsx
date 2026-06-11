export const metadata = { title: "Excel workbook — Electricity Pricing Tutor" };

const SHEETS = [
  {
    name: "Master_Index",
    desc: "One row per country (and region/province where relevant): status (deep-dive / documented / partial / needs-research), last-updated date, and a link to the country sheet.",
  },
  {
    name: "Inputs",
    desc: "Shared example-depot parameters as named ranges: Depot_E (2,000,000 kWh), Depot_Pmax (1,000 kW), Depot_Months (12). Extra columns for alternative depots.",
  },
  {
    name: "Outputs",
    desc: "Summary table of annual cost per country for the example depot(s), populated once numeric tariff values are entered on each country sheet.",
  },
  {
    name: "Country_[Name]",
    desc: "One sheet per country with sections A–F (see below).",
  },
];

const SECTIONS = [
  ["A", "Classification & assumptions", "Customer class, voltage level, deviations from the standard depot."],
  ["B", "Tariff components", "Table: component | category | legal basis | calculation | region variation | ref."],
  ["C", "Symbolic formulas", "One row per cost component, each as its own formula, then the total annual cost."],
  ["D", "Numeric example", "Cells that reference the Inputs named ranges so the worked example recomputes automatically."],
  ["E", "History / notes", "Major reforms by year."],
  ["F", "References", "Title | organisation | year | URL | accessed-date."],
];

export default function ExcelSpecPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Excel workbook structure</h1>
      <p className="mt-3 text-slate-600">
        The same data model that drives this web app is exported to an Excel workbook so the
        formulas can be filled with numeric tariff values downstream. A generator script
        (<code className="rounded bg-slate-100 px-1 py-0.5 text-sm">scripts/build_excel.py</code>,
        openpyxl) builds it from the country data files.
      </p>

      <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-900">
        Download the generated workbook:{" "}
        <a href="/electricity-pricing-tutor.xlsx" className="font-semibold underline">
          electricity-pricing-tutor.xlsx
        </a>
        {" "}— Master index + Inputs + Outputs + one sheet per documented country.
      </div>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Sheets</h2>
      <div className="mt-3 space-y-3">
        {SHEETS.map((s) => (
          <div key={s.name} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="font-mono text-sm font-semibold text-brand-700">{s.name}</div>
            <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Country sheet sections</h2>
      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <tbody>
            {SECTIONS.map(([id, title, desc]) => (
              <tr key={id} className="border-b border-slate-100 last:border-0">
                <td className="w-10 px-4 py-3 text-center font-semibold text-brand-700">{id}</td>
                <td className="w-48 px-4 py-3 font-medium text-slate-800">{title}</td>
                <td className="px-4 py-3 text-slate-600">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Named ranges & example formulas</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
        <li><code className="rounded bg-slate-100 px-1">Depot_E</code> = Inputs energy (kWh); <code className="rounded bg-slate-100 px-1">Depot_Pmax</code> = peak power (kW); <code className="rounded bg-slate-100 px-1">Depot_Months</code> = 12.</li>
        <li>Germany electricity tax: <code className="rounded bg-slate-100 px-1">=Depot_E*0.0205</code>.</li>
        <li>Sweden effektavgift: <code className="rounded bg-slate-100 px-1">=Depot_Months*54*Depot_Pmax</code>.</li>
        <li>China capacity charge: <code className="rounded bg-slate-100 px-1">=Depot_Pmax*32*Depot_Months</code> (kVA≈kW basis).</li>
        <li>Total annual cost per country = sum of the component rows in section C/D, surfaced to <code className="rounded bg-slate-100 px-1">Outputs</code>.</li>
      </ul>
    </div>
  );
}
