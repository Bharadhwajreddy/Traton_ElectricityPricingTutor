import type { Country } from "../types";

export const sweden: Country = {
  code: "se",
  name: "Sweden",
  region: "europe",
  status: "deep-dive",
  lastUpdated: "2026-06-11",
  flag: "🇸🇪",
  summary:
    "A truck depot of about 1 MW is far too big for a simple household-style connection, so it buys electricity in three separate streams. (1) Energy — the electricity itself, bought at the live wholesale market price, which in Sweden differs by region (four price zones, SE1 in the north to SE4 in the south). (2) Grid — a regulated fee paid to the local wires company (the DSO, Distribution System Operator) for delivering the power: a fixed monthly fee, a “power charge” based on your highest kW draw (effektavgift), and a per-kWh delivery charge that is higher on winter weekdays (överföring). (3) Tax — an energy tax (energiskatt) of 36.0 öre per kWh (öre = 1/100 of a Swedish krona) plus 25% VAT, which a VAT-registered business claims back so it is not a real cost.",

  classification:
    "At ~1 MW a Swedish connection is too large for a fuse-based (säkringsabonnemang) low-voltage contract; it sits on a power-based subscription (effektabonnemang) at högspänning (high voltage, typically 10–20 kV local distribution). In Vattenfall Eldistribution's catalogue this is the N4 (högspänning) class. Sweden has four bidding zones SE1 (north) – SE4 (south); day-ahead spot prices differ materially by zone (south typically dearer), and since October 2025 the market clears in 15-minute intervals. The depot's energy cost depends on which SE-zone it sits in.",
  assumptions: [
    "Standard depot (1 MW, 2 GWh/yr) modelled at högspänning / Vattenfall N4 2026; other DSOs (Ellevio, E.ON) differ — confirm against the actual connecting DSO's price sheet.",
    "The 1 MW depot is unaffected by the March 2026 reversion to fuse-based pricing, which applied only to small (≤63 A) customers.",
    "Energy (spot) cost is zone- and contract-dependent and is NOT modelled as a single authoritative figure.",
    "An energy split of 30% höglasttid / 70% låglasttid is assumed only to illustrate the seasonal grid formula.",
  ],
  operators: {
    tso: [{ name: "Svenska kraftnät", note: "National transmission grid + system operator for all of Sweden" }],
    tsoNote:
      "Sweden has a single national TSO, but the country is divided into four day-ahead price zones (SE1 north → SE4 south) because of internal grid bottlenecks, so the energy price differs by zone.",
    dso: "≈ 170 distribution system operators (regional + municipal). The three largest cover most customers; your depot's grid fee depends on the local DSO.",
    dsoExamples: ["Ellevio", "E.ON Energidistribution", "Vattenfall Eldistribution", "Göteborg Energi Nät"],
    marketOperator:
      "Day-ahead clearing is run by Nord Pool (the main Nordic NEMO; EPEX SPOT also operates), inside European Single Day-Ahead Coupling (SDAC) using the EUPHEMIA algorithm. Svenska kraftnät provides the cross-zonal capacities.",
    priceZones: "Four zones: SE1, SE2, SE3, SE4 (north to south).",
    refIds: [11, 12],
  },
  exampleDepot: {
    contractedPowerKW: 1000,
    annualEnergyKWh: 2_000_000,
    voltageLevel: "Högspänning (HV, ~10–20 kV), Vattenfall N4",
    utilisationHours: 2000,
  },

  flows: [
    {
      title: "Connection / subscription type",
      input: "~1 MW connection",
      question: "Is the main fuse ≤ 63 A, or a larger high-voltage connection?",
      branches: [
        { test: "≤ 63 A", result: "Fuse-based säkringsabonnemang (reverted to fuse pricing for small customers in June 2026)." },
        { test: "> 63 A / ~1 MW", result: "Power-based effektabonnemang at high voltage (Vattenfall N4).", active: true },
      ],
      outcome: "A ~1 MW depot is an effektabonnemang HV customer — unaffected by the 2026 small-customer reversion.",
      refIds: [1, 7],
    },
    {
      title: "Grid delivery rate (överföring) — time & season",
      question: "Is consumption in höglasttid (winter weekdays 06:00–22:00, Jan–Mar & Nov–Dec)?",
      branches: [
        { test: "Yes (höglast)", result: "Higher delivery rate: 61.2 öre/kWh (Vattenfall N4 2026)." },
        { test: "No (låglast)", result: "Lower delivery rate: 24.4 öre/kWh." },
      ],
      outcome: "Mixed in practice; winter-weekday energy costs ~2.5× more to deliver → shift load to låglast.",
      refIds: [1],
    },
    {
      title: "Industrial energy-tax reduction (energiskatt)",
      question: "Is the electricity used directly in a manufacturing process (tillverkningsprocessen)?",
      branches: [
        { test: "Yes (industri)", result: "Reduced rate 0.6 öre/kWh." },
        { test: "No (logistics/depot)", result: "Full rate 36.0 öre/kWh.", active: true },
      ],
      outcome: "A truck depot is transport/logistics → pays the full 36.0 öre/kWh.",
      refIds: [2],
    },
  ],
  components: [
    {
      name: "Spotpris / elhandelspris (energy price)",
      category: "energy",
      basis: "Competitive market; Nord Pool day-ahead, SE1–SE4 zones",
      calculation:
        "öre/kWh, 15-min/hourly spot price for the depot's SE-zone (or a fixed-price contract); pass-through of wholesale price.",
      variesByRegion: "Set by chosen supplier & SE-zone, not the DSO",
      modelled: false,
      refIds: [3, 4],
    },
    {
      name: "Påslag (supplier markup)",
      category: "energy",
      basis: "Commercial contract terms",
      calculation: "Small öre/kWh adder (sometimes + a monthly fee) on top of spot.",
      variesByRegion: "Negotiated; varies by supplier",
      modelled: false,
    },
    {
      name: "Fast avgift (fixed grid fee)",
      category: "fixed",
      basis: "Ellagen (1997:857); Ei revenue-cap regulation (intäktsram)",
      calculation: "Fixed SEK/month. Vattenfall N4 2026: 560 kr/month → 6,720 SEK/yr.",
      variesByRegion: "Varies by DSO",
      modelled: true,
      refIds: [1, 10],
    },
    {
      name: "Effektavgift (power / demand charge)",
      category: "grid-power",
      basis: "Ellagen; Ei regulation (effektavgift requirement withdrawn Mar 2026 for small customers, retained for HV)",
      calculation:
        "SEK/kW per month on measured monthly peak power. Vattenfall N4 2026: 54 kr/kW·month → 12 × 54 × 1000 = 648,000 SEK/yr. Dominates the grid bill.",
      variesByRegion: "Varies; some DSOs split into seasonal höglast vs base",
      modelled: true,
      refIds: [1],
    },
    {
      name: "Höglasteffektavgift (winter-peak power charge)",
      category: "grid-power",
      basis: "Ellagen; Ei regulation",
      calculation:
        "Extra SEK/kW on peak power during höglasttid (winter peak hours). Vattenfall N4 2026: 0 kr/kW (the winter premium is instead carried by överföring). Other DSOs charge a non-zero höglast power fee.",
      variesByRegion: "Structure differs by DSO",
      modelled: true,
      refIds: [1],
    },
    {
      name: "Överföringsavgift (energy transmission charge)",
      category: "grid-energy",
      basis: "Ellagen; Ei regulation",
      calculation:
        "öre/kWh on transmitted energy, time/season differentiated. Vattenfall N4 2026: höglasttid 61.2 öre/kWh; låglasttid 24.4 öre/kWh. Höglasttid = weekdays 06:00–22:00 in Jan/Feb/Mar/Nov/Dec.",
      variesByRegion: "Varies by DSO and zone",
      modelled: true,
      refIds: [1],
    },
    {
      name: "Energiskatt (energy tax on electricity)",
      category: "tax",
      basis: "Lag (1994:1776) om skatt på energi",
      calculation:
        "2026: 36.0 öre/kWh excl. VAT (down from 43.9). Collected by the grid owner. → 2,000,000 × 0.360 = 720,000 SEK/yr. A −9.6 öre reduction exists only for certain northern municipalities (households/service sector).",
      variesByRegion: "National rate; regional reduction by municipality",
      modelled: true,
      refIds: [5],
    },
    {
      name: "Industrinedsättning (industrial reduction) — NOT applicable to a depot",
      category: "tax",
      basis: "Lag (1994:1776), industri-el rules (refund type 793)",
      calculation:
        "Electricity used directly in an industrial manufacturing process is taxed at 0.6 öre/kWh. A truck depot is transport/logistics, not 'tillverkningsprocessen i industriell verksamhet', so it does NOT qualify — the depot pays the full 36.0 öre/kWh.",
      variesByRegion: "National rule",
      modelled: true,
      refIds: [2],
    },
    {
      name: "Moms / VAT",
      category: "tax",
      basis: "Mervärdesskattelagen",
      calculation:
        "25% on (energy + grid + energiskatt). Recoverable as input VAT for a VAT-registered business.",
      variesByRegion: "National",
      modelled: true,
    },
    {
      name: "Elcertifikatsavgift (electricity-certificate fee)",
      category: "surcharge",
      basis: "Lag (2003:113) om elcertifikat",
      calculation:
        "Quota-obligation cost passed through by the supplier in öre/kWh; quota declining toward system end (2035, possibly earlier). Small and shrinking; elintensiv industri (threshold raised to 1,200 MWh) can register for deduction.",
      variesByRegion: "Supplier pass-through",
      modelled: false,
      refIds: [8],
    },
  ],

  formulaIntro:
    "Three independent streams add up to the bill: (1) energy — the electricity itself at the market (spot) price for your SE-zone; (2) grid — a regulated fee to the local DSO, split into a fixed monthly fee, a per-kW 'power charge' on your monthly peak (effektavgift), and a per-kWh delivery charge that is higher on winter weekdays (överföring); (3) tax — energy tax plus VAT. For this depot the power charge alone (≈ 648,000 SEK/yr at Vattenfall N4) is the single largest grid item, so flattening the monthly peak is the main cost lever. Add the streams for the pre-VAT total, then × 1.25 for VAT (which a business reclaims).",
  formulas: [
    { label: "Energy (spot + påslag)", symbolic: "C_energy = E × p_spot", note: "p_spot is SE-zone- and contract-dependent; not modelled as a fixed value." },
    { label: "Grid · fixed", symbolic: "C_fast = 12 × 560 = 6,720 SEK" },
    { label: "Grid · power", symbolic: "C_effekt = 12 × eff × P_max = 12 × 54 × 1000 = 648,000 SEK" },
    { label: "Grid · winter-peak power", symbolic: "C_höglast = 12 × höglast_eff × P_max = 0 (Vattenfall N4)" },
    { label: "Grid · energy", symbolic: "C_överf = E_hög × 0.612 + E_låg × 0.244  [SEK]", note: "E_hög/E_låg = höglasttid/låglasttid energy split. Illustrative 30/70 → 367,200 + 341,600." },
    { label: "Energy tax", symbolic: "C_skatt = E × 0.360 = 720,000 SEK" },
    { label: "Elcertifikat", symbolic: "C_elcert = E × p_elcert ≈ 0", note: "Phasing out; negligible." },
  ],
  totalFormula: {
    label: "Total annual cost",
    symbolic:
      "Subtotal_excl_VAT = C_energy + C_fast + C_effekt + C_höglast + C_överf + C_skatt + C_elcert ;  Total_incl_VAT = 1.25 × Subtotal_excl_VAT",
    note: "VAT recoverable if VAT-registered. Grid subtotal alone ≈ 1.36 MSEK/yr; energy stream is zone-dependent on top.",
  },

  costStack: {
    currency: "SEK",
    basis: "Vattenfall N4 grid + energiskatt are 2026 values; energy is zone/market-dependent (illustrative).",
    slices: [
      { label: "Energy (electricity itself)", category: "energy", amount: 1000000, note: "illustrative ~0.50 SEK/kWh; zone-dependent" },
      { label: "Energy tax (energiskatt)", category: "tax", amount: 720000 },
      { label: "Grid – delivery (överföring)", category: "grid-energy", amount: 708800 },
      { label: "Grid – power (effektavgift)", category: "grid-power", amount: 648000 },
      { label: "Grid – fixed fee", category: "fixed", amount: 6720 },
    ],
  },
  v2g:
    "If the depot exports (bidirectional V2G chargers, on-site solar/battery) it becomes a production/inmatning customer. Vattenfall Eldistribution 2026 company inmatning structure: e.g. mätavgift 270 kr/month (LV), effektersättning höglast ~70 kr/kW·month, energiersättning (nätnytta) ~5.9 öre/kWh for injected energy; exact figures differ by voltage and DSO. The market value of exported energy is sold separately to a supplier at ~spot.\n\nTax credit (skattereduktion för mikroproduktion, the '60-öringen', 60 öre/kWh capped at 30,000 kWh): a 1 MW depot does NOT qualify — its connection far exceeds the ≤100 A limit, AND the credit was abolished from 1 January 2026.\n\nThere is no dedicated official Swedish V2G tariff/tax regime as of mid-2026; a V2G depot is treated under existing producer/inmatning rules. Beyond that: insufficient authoritative data; not modelled.",

  history: [
    "Oct 2025: Nord Pool day-ahead market moved to 15-minute clearing (96 points/day).",
    "1 Jan 2026: energiskatt cut to 36.0 öre/kWh (from 43.9); micro-production 60-öre tax credit abolished.",
    "Mar 2026: government removed the requirement that all DSOs use an effektavgift; Ei to propose a new grid-charge model by April 2027. Small (≤63 A) customers (e.g. Ellevio) reverted to fuse-based pricing from 1 June 2026 — large HV/effekt customers unaffected.",
    "Elcertifikat system scheduled to end by 2035 (possibly earlier); elintensiv-industri exemption threshold raised to 1,200 MWh.",
  ],

  gaps: [
    "Spot energy price is zone- (SE1–SE4) and contract-dependent — no single authoritative öre/kWh figure modelled.",
    "All grid numbers are Vattenfall Eldistribution N4 2026; Ellevio, E.ON Energidistribution etc. differ and are not separately modelled.",
    "Dedicated V2G tariff/tax treatment not documented in official sources.",
  ],

  references: [
    { id: 1, title: "Priser & avtalsvillkor företag / Effektabonnemang 2026 (N4 högspänning prislista)", org: "Vattenfall Eldistribution", year: "2026", url: "https://www.vattenfalleldistribution.se/foretag/abonnemang-och-avgifter/avtal-och-elnatsavgift/", accessed: "2026-06" },
    { id: 2, title: "Energiskatter (industri-el, avdrag/återbetalning typ 793, 0.6 öre/kWh)", org: "Skatteverket", year: "2026", url: "https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/energiskatter.4.18e1b10334ebe8bc8000843.html", accessed: "2026-06" },
    { id: 3, title: "Bidding areas (SE1–SE4) / Day-ahead market", org: "Nord Pool", year: "2026", url: "https://www.nordpoolgroup.com/en/the-power-market/Bidding-areas/", accessed: "2026-06" },
    { id: 4, title: "Day-ahead prices (SE1–SE4 spot data)", org: "Nord Pool", year: "2026", url: "https://data.nordpoolgroup.com/", accessed: "2026-06" },
    { id: 5, title: "Skatt på el (2026 rate 36.0 öre/kWh; northern reduction)", org: "Skatteverket", year: "2026", url: "https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/energiskatter/skattpael.4.15532c7b1442f256bae5e4c.html", accessed: "2026-06" },
    { id: 6, title: "Mikroproduktion av förnybar el — näringsfastighet (skattereduktion, ≤100 A, abolished 2026-01-01)", org: "Skatteverket", year: "2026", url: "https://www.skatteverket.se/foretag/skatterochavdrag/fastighet/mikroproduktionavfornybarelnaringsfastighet.4.309a41aa1672ad0c837b4e8.html", accessed: "2026-06" },
    { id: 7, title: "Nya elnätspriser / prismodell utan effektavgift (2026 reversion ≤63 A)", org: "Ellevio", year: "2026", url: "https://www.ellevio.se/abonnemang/prismodell-utan-effektavgift/", accessed: "2026-06" },
    { id: 8, title: "Elcertifikatsystemet (kvotnivåer, stoppregel 2035, elintensiv industri)", org: "Energimyndigheten", year: "2026", url: "https://www.energimyndigheten.se/energisystem-och-analys/styrmedel-for-elproduktion/elcertifikatsystemet/", accessed: "2026-06" },
    { id: 9, title: "Ersättning och avgifter för elproduktion — företag 2026 (inmatning, nätnytta)", org: "Vattenfall Eldistribution", year: "2026", url: "https://www.vattenfalleldistribution.se/foretag/abonnemang-och-avgifter/avtal-och-elnatsavgift/elproduktionsersattning-och-avgifter/", accessed: "2026-06" },
    { id: 10, title: "Nätavgifter – elnät (regulated grid tariff statistics)", org: "Energimarknadsinspektionen (Ei)", year: "2026", url: "https://ei.se/om-oss/statistik-och-oppna-data/natavgifter---elnat", accessed: "2026-06" },
    { id: 11, title: "Svenska kraftnät — Sweden's transmission system operator", org: "Svenska kraftnät", year: "2026", url: "https://www.svk.se/en/", accessed: "2026-06" },
    { id: 12, title: "Single Day-Ahead Coupling / NEMOs (Nord Pool, EUPHEMIA)", org: "NEMO Committee", year: "2026", url: "https://www.nemo-committee.eu/sdac", accessed: "2026-06" },
  ],
};
