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

// One labelled slice of the "anatomy of the bill" animated stack.
export interface CostSlice {
  label: string; // e.g. "Grid – power (effektavgift)"
  category: ComponentCategory;
  amount?: number; // known annual amount in the country's currency, if modelled
  share?: number; // 0..1 relative share for the bar when amounts are partial
  note?: string; // e.g. "market-dependent — illustrative"
}

export interface CostStack {
  currency: string; // "EUR", "SEK", "CNY", "DKK"
  basis: string; // what the numbers represent (regulated part, illustrative total, …)
  slices: CostSlice[];
}

// Who operates the grid and the market in a country.
export interface OperatorEntry {
  name: string;
  note?: string; // control area / role / coverage
}
export interface Operators {
  tso: OperatorEntry[]; // transmission system operator(s)
  tsoNote?: string; // e.g. control-zone map explanation
  dso: string; // DSO landscape (count + examples), plain text
  dsoExamples?: string[];
  marketOperator: string; // who clears the day-ahead market (NEMO / exchange)
  priceZones?: string; // bidding/price zones
  refIds?: number[];
}

// ---- Decision flowcharts (if/else logic that sets the charge) -------------
export interface FlowBranch {
  test: string; // the condition, e.g. "< 2,500 h/year"
  result: string; // what that branch leads to
  active?: boolean; // true = the branch the standard depot lands in
}
export interface DecisionFlow {
  title: string; // e.g. "Grid-charge band (§17 StromNEV)"
  input?: string; // a computed value feeding the decision, e.g. "t_B = E/P_max = 2,000 h"
  question: string; // the decision node text
  branches: FlowBranch[];
  outcome?: string; // resolved result for the standard depot
  refIds?: number[];
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
  operators?: Operators; // TSO(s), DSOs, market-clearing operator
  exampleDepot?: ExampleDepot; // per-country depot (may differ from std)
  flows?: DecisionFlow[]; // if/else decision logic that determines the charges
  components?: TariffComponent[];
  formulaIntro?: string; // plain-English explanation of how the cost adds up
  formulas?: CostFormula[];
  totalFormula?: CostFormula; // total annual cost line
  costStack?: CostStack; // data for the animated "anatomy of the bill"
  v2g?: string; // V2G / feed-in / export rules (or insufficient-data note)
  history?: string[]; // notable reforms by year
  references?: Reference[];
  gaps?: string[]; // open issues / unknowns for this country
}
