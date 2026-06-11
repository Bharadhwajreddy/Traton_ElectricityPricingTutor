// ---------------------------------------------------------------------------
// Shared data model for the Electricity Pricing Tutor.
// Every country page is rendered from a `Country` object that conforms to this
// schema. The same schema is the contract for the Excel workbook export.
// ---------------------------------------------------------------------------

export type DocStatus =
  | "deep-dive" //   fully documented, priority country (DE / SE / CN)
  | "documented" // structurally documented with sources
  | "partial" //     some components documented, gaps remain
  | "needs-research"; // insufficient authoritative data; scaffolded only

export type ComponentCategory =
  | "energy" //        wholesale / supplier energy price
  | "grid-power" //    capacity / demand based network charge (€/kW, SEK/kW, 元/kVA)
  | "grid-energy" //   volumetric network charge (€/kWh)
  | "fixed" //         fixed periodic charge
  | "tax" //           electricity tax, VAT
  | "levy" //          statutory levy / fund
  | "surcharge" //     renewable / CHP / system surcharges
  | "concession" //    concession / right-of-way fee
  | "metering"; //     metering & metering-point operation

export interface Reference {
  id: number;
  title: string;
  org: string;
  year: string;
  url: string;
  accessed: string; // ISO-ish, e.g. "2026-06"
}

export interface TariffComponent {
  name: string; // local name + English in parentheses
  category: ComponentCategory;
  basis: string; // legal / regulatory basis (law, ordinance, tariff sheet)
  calculation: string; // how it is computed: unit, base, thresholds, time structure
  variesByRegion?: string; // how it varies by DSO / province / region, if it does
  modelled: boolean; // false => exists but quantitative impact not modelled
  refIds?: number[]; // indices into the country's references
}

export interface CostFormula {
  label: string; // e.g. "Energy charge"
  symbolic: string; // e.g. "E x energy_rate"
  note?: string; // clarifications, period aggregation, unknowns
}

export interface ExampleDepot {
  contractedPowerKW: number;
  annualEnergyKWh: number;
  voltageLevel: string;
  utilisationHours: number; // E / P_max
  notes?: string;
}

export interface Country {
  code: string; // ISO-3166 alpha-2 (lowercase), or "cn"
  name: string;
  region: "europe" | "asia";
  status: DocStatus;
  lastUpdated: string; // ISO date
  flag?: string; // emoji
  summary: string; // one/two line overview

  // Populated sections (omit for needs-research stubs)
  classification?: string; // how a truck depot is classified in tariff terms
  assumptions?: string[]; // explicit assumptions (esp. deviations from std depot)
  exampleDepot?: ExampleDepot; // per-country depot (may differ from std)
  components?: TariffComponent[];
  formulas?: CostFormula[];
  totalFormula?: CostFormula; // total annual cost line
  v2g?: string; // V2G / feed-in / export rules (or insufficient-data note)
  history?: string[]; // notable reforms by year
  references?: Reference[];
  gaps?: string[]; // open issues / unknowns for this country
}
