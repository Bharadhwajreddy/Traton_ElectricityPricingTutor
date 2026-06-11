// ---------------------------------------------------------------------------
// Plain-English glossary. Every term that a newcomer (no energy-tariff
// background) might trip over is defined once here and surfaced on the
// country pages, so the jargon in the summaries AND the tables always has a
// plain-language fallback definition.
// ---------------------------------------------------------------------------

export interface GlossaryTerm {
  term: string;
  plain: string;
}

export interface GlossaryGroup {
  heading: string;
  terms: GlossaryTerm[];
}

export const GLOSSARY_GROUPS: GlossaryGroup[] = [
  {
    heading: "The basics",
    terms: [
      {
        term: "Tariff",
        plain:
          "The rate plan for electricity — the full set of charges that make up the bill. (Nothing to do with import duties.)",
      },
      {
        term: "Tariff component",
        plain: "One separate line item on the bill. The total bill is the sum of all components.",
      },
      {
        term: "kW vs kWh",
        plain:
          "kW is power — the rate of use at an instant. kWh is energy — power × time. A 1,000 kW load running 2,000 hours uses 2,000,000 kWh (2 GWh).",
      },
      {
        term: "kVA vs kW",
        plain:
          "kVA is 'apparent power' (what the transformer must be sized for); kW is the 'real power' actually doing work. They differ by the power factor (~0.9), which is why ~1 MW ≈ ~1,000 kVA here.",
      },
      {
        term: "Full-load hours (utilisation)",
        plain:
          "Annual energy ÷ peak power = how many hours per year you would run if always at full power. Our depot: 2,000,000 kWh ÷ 1,000 kW = 2,000 h.",
      },
      {
        term: "Medium voltage",
        plain:
          "The voltage band (~10–20 kV) used for larger sites — bigger than a household (low voltage), smaller than the transmission backbone (high voltage).",
      },
    ],
  },
  {
    heading: "Kinds of charge",
    terms: [
      {
        term: "Energy charge (per kWh)",
        plain:
          "A fee for each unit of electricity actually consumed. Local names: Arbeitspreis (DE); elhandelspris (SE); 电度电价 (CN).",
      },
      {
        term: "Capacity / demand charge (per kW or kVA)",
        plain:
          "A fee based on the highest power you draw or reserve — regardless of total energy — to pay for wires/transformers sized to your peak. Local names: Leistungspreis (DE); effektavgift (SE); 基本电费 / 容量电价 (CN).",
      },
      { term: "Fixed charge", plain: "A flat amount per month or year, the same no matter how much you use." },
      {
        term: "Time-of-use (ToU)",
        plain:
          "The per-kWh price changes with the time of day: dearer at peak hours, cheaper in off-peak / overnight 'valley' hours.",
      },
      {
        term: "Grid / network charge",
        plain:
          "A regulated fee for using the wires to deliver electricity (separate from the cost of the electricity itself). Local name: Netzentgelte (DE); överföring covers the per-kWh part (SE).",
      },
      {
        term: "Levy / surcharge",
        plain:
          "An add-on set by law that funds a policy goal (renewables, offshore-wind grid links, combined heat-and-power, etc.).",
      },
      {
        term: "Concession fee",
        plain:
          "A fee paid to the municipality for the right to run cables through public ground. Local name: Konzessionsabgabe (DE).",
      },
    ],
  },
  {
    heading: "Market & players",
    terms: [
      {
        term: "Spot price",
        plain:
          "The live wholesale market price of electricity, set each hour/day on an exchange. In the Nordics that exchange is Nord Pool.",
      },
      {
        term: "Bidding / price zone",
        plain:
          "A region with its own market price because of grid bottlenecks. Sweden has four: SE1 (north) to SE4 (south).",
      },
      {
        term: "Catalogue tariff",
        plain:
          "An old fixed government price list for electricity. China abolished it for businesses in 2021, moving them to market pricing.",
      },
      {
        term: "Agent-purchase (代理购电)",
        plain:
          "In China, a service where the grid buys power on the market on behalf of users who don't trade directly; the price is republished monthly.",
      },
      { term: "DSO — Distribution System Operator", plain: "The company that owns/runs the local wires delivering power to your site." },
      { term: "TSO — Transmission System Operator", plain: "The company running the high-voltage backbone grid between regions (e.g. Svenska kraftnät, SE)." },
      {
        term: "VAT (recoverable)",
        plain:
          "Value-added sales tax. A VAT-registered business claims it back, so it is not a real cost — only the pre-VAT total matters.",
      },
    ],
  },
  {
    heading: "Germany-specific (the surcharges & tax)",
    terms: [
      { term: "RLM", plain: "A meter that continuously records a big customer's power (¼-hour load profile), unlike a simple household meter." },
      { term: "Sondervertragskunde", plain: "A 'special-contract' (large industrial) customer class." },
      { term: "Stromsteuer", plain: "Germany's electricity tax (2.05 ct/kWh standard)." },
      { term: "KWKG-Umlage", plain: "A national surcharge funding combined heat-and-power (CHP) plants." },
      { term: "§19 StromNEV-Umlage", plain: "A national surcharge that spreads the cost of discounts given to certain large grid users." },
      { term: "Offshore-Netzumlage", plain: "A national surcharge funding the grid connections of offshore wind farms." },
      { term: "EEG-Umlage", plain: "The former renewable-energy surcharge — abolished in 2022 (now paid from the federal budget)." },
      { term: "Vorsteuer", plain: "Input VAT — the VAT a business pays and then reclaims." },
    ],
  },
  {
    heading: "Sweden / China table terms",
    terms: [
      { term: "påslag (SE)", plain: "The supplier's small per-kWh markup added on top of the spot price." },
      { term: "elcertifikat (SE)", plain: "A renewable-support certificate cost passed through by the supplier — small and being phased out by 2035." },
      { term: "energiskatt (SE)", plain: "Sweden's energy tax on electricity (36.0 öre/kWh in 2026)." },
      { term: "öre/kWh, ct/kWh, 元/kWh", plain: "Price per kWh in local small units. öre = 1/100 Swedish krona; ct = euro cent; 元 = Chinese yuan (RMB)." },
      { term: "上网环节线损 / line-loss (CN)", plain: "A per-kWh charge covering electricity lost as heat while travelling through the grid." },
      { term: "系统运行费 / system-operation cost (CN)", plain: "A per-kWh charge bundling reserve plants, pumped-storage, ancillary services, etc." },
      { term: "力调电费 / power-factor charge (CN)", plain: "A reward or penalty depending on whether your power factor beats the 0.9 standard." },
    ],
  },
];

// Flat list (kept for any consumer that wants every term in one array).
export const GLOSSARY: GlossaryTerm[] = GLOSSARY_GROUPS.flatMap((g) => g.terms);
