# Electricity Pricing Tutor — Truck Depots (Europe & China)

An educational web app that explains **exactly how grid-connected truck depots are charged for
electricity** — country by country, at the level of detailed tariff components, symbolic formulas,
and official references.

It is a **data and explanation tool**, not a cost optimiser or simulator. Every structural rule and
numeric example is tied to an official or high-credibility source (regulators, TSOs/DSOs,
ministries, NDRC/NEA). Where a rule cannot be tied to a reliable source it is marked
*"insufficient authoritative data; not modelled"* rather than guessed.

## Status (this run)

| Tier | Countries |
|------|-----------|
| **Deep dive** (fully documented + cited) | 🇩🇪 Germany · 🇸🇪 Sweden · 🇨🇳 China |
| **Needs research** (scaffolded, in scope) | All other European countries |

The standard example depot used consistently across countries: **1 MW contracted power, 2 GWh/year,
medium-voltage connection** (≈ 2,000 full-load hours/year), adjusted per country only where
documented.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- Data-driven: one typed `Country` object per country in `src/data/countries/`
- The same data model is exported to an **Excel workbook** via `scripts/build_excel.py` (openpyxl)
- Deploys to **Vercel** as a standard Next.js project

## Project layout

```
src/
  app/                     # routes: home, /country/[code], /methodology, /excel-spec
  components/              # CountryCard, ComponentTable, FormulaBlock, ReferenceList, ...
  data/
    types.ts               # the Country / TariffComponent / CostFormula schema
    depot.ts               # the standard example depot
    countries/             # germany.ts, sweden.ts, china.ts + _stubs.ts + index.ts
scripts/
  build_excel.py           # generates public/electricity-pricing-tutor.xlsx
public/
  electricity-pricing-tutor.xlsx
```

## Develop

```bash
npm install
npm run dev            # http://localhost:3000
python3 scripts/build_excel.py   # regenerate the Excel workbook
```

## Adding / completing a country

1. Create `src/data/countries/<name>.ts` exporting a `Country` that conforms to `src/data/types.ts`.
2. Populate sections A–F (classification, components, formulas, V2G, history, references).
3. Register it in `src/data/countries/index.ts` (and remove the matching stub from `_stubs.ts`).
4. Re-run `scripts/build_excel.py` to refresh the workbook.

## Disclaimer

Tariff law changes frequently and DSO/province price sheets reset on their own schedules (monthly in
China, annually in Germany/Sweden). Figures here are summaries for education — always verify against
the cited primary documents before relying on them.
