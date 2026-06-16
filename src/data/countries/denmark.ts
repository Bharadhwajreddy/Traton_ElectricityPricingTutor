import type { Country } from "../types";

export const denmark: Country = {
  code: "dk",
  name: "Denmark",
  region: "europe",
  status: "deep-dive",
  lastUpdated: "2026-06-15",
  flag: "🇩🇰",
  summary:
    "A ~1 MW depot buys electricity in three streams. (1) Energy — the electricity itself at the market (spot) price for its bidding zone (DK1 west or DK2 east). (2) Grid — a regulated delivery fee in two layers: the national TSO Energinet (a combined system + grid tariff, 11.5 øre/kWh in 2026) plus the local DSO's time-of-day tariff (Radius “Tariffmodel 3.0”, with low/high/peak periods that are dearer in winter). (3) Tax — the electricity tax (elafgift), cut to the EU minimum (~1 øre/kWh incl. VAT) for 2026–2027, plus 25% VAT that a business reclaims. The old PSO levy is gone (phased out by end-2022).",

  classification:
    "A ~1 MW site is connected at medium/high voltage (10–60 kV) and billed as a large business (C-customer, or B-level if connected higher) under the DSO's tariff schedule. The day-ahead energy price comes from Nord Pool inside European Single Day-Ahead Coupling (SDAC) and differs between the two Danish bidding zones, DK1 (Jutland/Funen, west) and DK2 (Zealand, east). Energinet is the TSO and also runs balancing, settlement and the central metering hub (DataHub).",
  assumptions: [
    "Standard depot (1 MW, 2 GWh/yr) modelled at MV with a Radius (Tariffmodel 3.0) DSO tariff; other DSOs (N1, Cerius, TREFOR, Dinel) differ — confirm against the connecting DSO.",
    "Energy (spot) price is DK1/DK2- and contract-dependent — not modelled as a single value.",
    "Exact C-customer DSO øre/kWh rates vary by period and season; the low/high/peak structure is shown, with the published Radius price sheet as the authoritative source.",
    "elafgift modelled at the 2026 EU-minimum general rate; a VAT-registered business in any case recovers most electricity tax via godtgørelse (refund) on process electricity.",
  ],
  exampleDepot: {
    contractedPowerKW: 1000,
    annualEnergyKWh: 2_000_000,
    voltageLevel: "MV/HV (10–60 kV), DSO C/B customer",
    utilisationHours: 2000,
  },

  operators: {
    tso: [{ name: "Energinet", note: "National TSO + balancing, settlement & DataHub (metering hub)" }],
    tsoNote:
      "Denmark has one TSO, Energinet (state-owned), covering both bidding zones. It runs the grid, the balancing market and the central DataHub through which all consumption is settled. Two bidding zones, DK1 (west) and DK2 (east), are not synchronously connected to each other.",
    dso: "≈ 40 distribution system operators (down from many more after mergers). A handful cover most customers; your depot's local-grid bill depends on which one owns the wires.",
    dsoExamples: ["Radius", "N1", "Cerius", "TREFOR El-net", "Dinel"],
    marketOperator:
      "Day-ahead clearing is run by Nord Pool inside European Single Day-Ahead Coupling (SDAC) using the EUPHEMIA algorithm; Energinet provides cross-zonal capacity and does balancing/settlement.",
    priceZones: "Two zones: DK1 (Jutland & Funen, west) and DK2 (Zealand, east).",
    refIds: [7, 8],
  },

  components: [
    {
      name: "Spotpris (energy price)",
      category: "energy",
      basis: "Competitive market; Nord Pool day-ahead, DK1/DK2",
      calculation: "øre/kWh, hourly/15-min spot for the depot's zone (or a fixed contract); supplier markup on top.",
      variesByRegion: "Set by supplier & zone (DK1/DK2)",
      modelled: false,
      refIds: [1, 7],
    },
    {
      name: "Energinet systemtarif (system tariff)",
      category: "grid-energy",
      basis: "Energinet tariff regulation; Forsyningstilsynet oversight",
      calculation: "2026: 7.2 øre/kWh (national, all consumers) → part of the 11.5 øre/kWh combined Energinet tariff.",
      variesByRegion: "National (same everywhere)",
      modelled: true,
      refIds: [2],
    },
    {
      name: "Energinet nettarif (transmission grid tariff)",
      category: "grid-energy",
      basis: "Energinet tariff regulation",
      calculation: "2026: 4.3 øre/kWh national (down ~15% from 2025). Large consumers with limited grid access can instead pay a reduced transmission nettarif of 19,729 kr/MW/yr (2026). Plus a system subscription of 187 kr/metering point/yr.",
      variesByRegion: "National",
      modelled: true,
      refIds: [2],
    },
    {
      name: "DSO nettarif (local distribution tariff)",
      category: "grid-energy",
      basis: "DSO tariff (e.g. Radius Tariffmodel 3.0); Forsyningstilsynet revenue cap",
      calculation:
        "Time-of-day øre/kWh in three periods — lavlast 00–06, højlast 06–17 & 21–24, spidslast 17–21 — with winter rates highest. C-customer rates are lower than the LV average; see the DSO price sheet for exact øre values.",
      variesByRegion: "Varies by DSO; period structure broadly similar",
      modelled: false,
      refIds: [3, 5],
    },
    {
      name: "Elafgift (electricity tax)",
      category: "tax",
      basis: "Lov om afgift af elektricitet; administered by Skattestyrelsen",
      calculation:
        "Cut to the EU minimum for 2026–2027 (~0.8 øre/kWh ex-VAT, ≈1 øre/kWh incl. VAT). A VAT-registered business in any case recovers most electricity tax via godtgørelse on process electricity.",
      variesByRegion: "National",
      modelled: true,
      refIds: [2, 4],
    },
    {
      name: "PSO-tarif (public service obligation)",
      category: "levy",
      basis: "Former Elforsyningsloven PSO scheme",
      calculation: "Abolished — phased out and fully gone by end-2022 (renewables now funded via the state budget). 2026 value: 0.",
      variesByRegion: "N/A",
      modelled: true,
      refIds: [6],
    },
    {
      name: "Moms / VAT",
      category: "tax",
      basis: "Momsloven",
      calculation: "25% on the sum of energy + grid + elafgift. Recoverable as input VAT for a VAT-registered business.",
      variesByRegion: "National",
      modelled: true,
    },
  ],

  formulaIntro:
    "The bill stacks in three streams: energy, grid (in two layers — the national Energinet tariff plus the local DSO tariff), and tax. The Danish twist is that the grid delivery fee is split between the TSO (Energinet, a flat national rate) and the DSO (a time-of-day rate, dearest 17:00–21:00 in winter), so shifting charging out of the winter evening peak lowers the DSO part. elafgift is tiny in 2026 (EU minimum) and VAT is reclaimed, so the real cost is essentially energy + grid.",
  formulas: [
    { label: "Energy (spot + markup)", symbolic: "C_energy = E × p_spot", note: "DK1 or DK2 zone; market/contract-dependent — not modelled to a value." },
    { label: "Energinet (system + transmission)", symbolic: "C_energinet = E × 0.115 + 187 kr", note: "0.072 system + 0.043 net = 0.115 DKK/kWh → 230,000 DKK + subscription. Large limited-access sites: 19,729 kr/MW/yr instead of the volumetric net part." },
    { label: "DSO grid (Tariffmodel 3.0)", symbolic: "C_dso = Σ_period (E_period × rate_period)", note: "period ∈ {lav, høj, spids}; winter rates higher. DSO price sheet governs." },
    { label: "Electricity tax", symbolic: "C_elafgift = E × 0.008 ≈ 16,000 DKK", note: "2026 EU minimum; business recovers most via godtgørelse." },
    { label: "PSO", symbolic: "C_PSO = 0", note: "Abolished end-2022." },
  ],
  totalFormula: {
    label: "Total annual cost",
    symbolic: "C_pre-VAT = C_energy + C_energinet + C_dso + C_elafgift ;  C_incl-VAT = 1.25 × C_pre-VAT",
    note: "VAT (25%) recoverable by a business. Energinet tariff ≈ 230,000 DKK/yr is exact for 2026; energy & DSO grid dominate and are zone/DSO-specific.",
  },
  costStack: {
    currency: "DKK",
    basis: "Energinet 2026 tariff exact (11.5 øre/kWh); DSO grid & energy indicative; elafgift at 2026 EU minimum.",
    slices: [
      { label: "Energy (electricity itself)", category: "energy", amount: 1100000, note: "illustrative ~0.55 DKK/kWh; DK1/DK2-dependent" },
      { label: "DSO grid (Tariffmodel 3.0)", category: "grid-energy", amount: 400000, note: "illustrative; DSO-specific" },
      { label: "Energinet system + transmission", category: "grid-energy", amount: 230000 },
      { label: "Electricity tax (elafgift)", category: "tax", amount: 16000, note: "2026 EU minimum" },
    ],
  },

  v2g:
    "A depot that exports (V2G chargers, on-site solar/battery) becomes a producer/feed-in customer under Energinet and its DSO; exported energy is sold to a supplier at ~spot, and Energinet's flexibility/balancing markets can pay for demand response. Denmark has been an early V2G testbed (e.g. the Parker project), but there is no dedicated official V2G tariff as of mid-2026 — feed-in is handled under existing producer rules. Beyond that: insufficient authoritative data; not modelled.",

  history: [
    "2016 political agreement: PSO levy phased out, finishing end-2022 (renewables moved to the state budget).",
    "2022: PSO-tarif fully abolished.",
    "30 Sep 2025: Danish zones move to 15-minute day-ahead products with the rest of SDAC.",
    "2026: Energinet consumer tariff cut to 11.5 øre/kWh (4.3 net + 7.2 system, −15% vs 2025); elafgift cut to the EU minimum for 2026–2027.",
  ],

  gaps: [
    "Spot energy price is DK1/DK2- and contract-dependent — no single authoritative øre/kWh modelled.",
    "Exact C-customer DSO øre/kWh per period/season taken from the Radius price sheet, not asserted here; other DSOs differ.",
    "Dedicated V2G tariff/tax treatment not documented in official sources.",
  ],

  references: [
    { id: 1, title: "Aktuelle tariffer (current tariffs)", org: "Energinet", year: "2026", url: "https://energinet.dk/el/elmarkedet/tariffer/aktuelle-tariffer/", accessed: "2026-06" },
    { id: 2, title: "Energinets tarifudmelding for 2026 (11.5 øre/kWh = 4.3 net + 7.2 system; 187 kr subscription; 19,729 kr/MW)", org: "Energinet / Klima-, Energi- og Forsyningsministeriet", year: "2026", url: "https://www.ft.dk/samling/20241/almdel/KEF/bilag/385/3063337/index.htm", accessed: "2026-06" },
    { id: 3, title: "Priser for alle kundetyper (C-kunde, Tariffmodel 3.0)", org: "Radius Elnet", year: "2026", url: "https://radiuselnet.dk/priser/alle/", accessed: "2026-06" },
    { id: 4, title: "Elafgift / godtgørelse af elafgift for erhverv", org: "Skattestyrelsen (skat.dk)", year: "2026", url: "https://skat.dk/erhverv/punktafgifter/afgifter-paa-energi/elafgift", accessed: "2026-06" },
    { id: 5, title: "Tarifmodel 3.0 (lavlast/højlast/spidslast periods)", org: "Green Power Denmark / DSOs", year: "2026", url: "https://greenpowerdenmark.dk/", accessed: "2026-06" },
    { id: 6, title: "PSO-afgiften udfases (PSO levy phase-out, ended 2022)", org: "Energistyrelsen (Danish Energy Agency)", year: "2022", url: "https://ens.dk/", accessed: "2026-06" },
    { id: 7, title: "Bidding zones DK1/DK2 — day-ahead market", org: "Nord Pool", year: "2026", url: "https://www.nordpoolgroup.com/en/the-power-market/Bidding-areas/", accessed: "2026-06" },
    { id: 8, title: "Single Day-Ahead Coupling / NEMOs (EUPHEMIA)", org: "NEMO Committee", year: "2026", url: "https://www.nemo-committee.eu/sdac", accessed: "2026-06" },
  ],
};
