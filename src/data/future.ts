import type { Reference } from "./types";

export interface FutureTopic {
  id: string;
  title: string;
  status: "live" | "rolling-out" | "evolving";
  oneLiner: string;
  plain: string; // plain-English explanation
  depotRelevance: string; // why a depot / V2G operator should care
  refIds: number[];
}

export const FUTURE_INTRO =
  "Many things taught as “future ideas” for the European power market are now LIVE. The single coupled day-ahead auction (SDAC) and its EUPHEMIA algorithm run every day; the big 2025 change was moving day-ahead pricing to 15-minute resolution. Here is what is actually implemented as of mid-2026, what is still rolling out, and what a depot doing smart / V2G charging should be ready for.";

export const FUTURE_TOPICS: FutureTopic[] = [
  {
    id: "sdac",
    title: "SDAC — Single Day-Ahead Coupling",
    status: "live",
    oneLiner: "One coupled day-ahead auction across most of Europe — already operational.",
    plain:
      "SDAC is the mechanism that joins national day-ahead markets into one. At 12:00 CET every day, all coupled bidding zones are cleared together so that power flows from cheaper to more expensive zones up to the available cross-border capacity, maximising total economic welfare and converging prices. It is not a future plan — it has been operational for years and keeps expanding to new borders (e.g. the Core region).",
    depotRelevance:
      "Your day-ahead energy price is an output of this single auction, not a purely national number. Cheaper neighbouring zones can pull your zone's price down when interconnectors aren't congested.",
    refIds: [1, 2],
  },
  {
    id: "euphemia",
    title: "EUPHEMIA — the price-coupling algorithm",
    status: "live",
    oneLiner: "The single algorithm that clears all coupled day-ahead markets at once.",
    plain:
      "EUPHEMIA (Pan-European Hybrid Electricity Market Integration Algorithm) is the actual optimisation that SDAC runs. It takes every order book and the cross-zonal capacities and solves one big welfare-maximisation problem, producing the prices and the scheduled flows for all coupled zones simultaneously. It is operated jointly by the NEMOs (power exchanges such as EPEX SPOT, Nord Pool, OMIE, GME, EXAA, OTE…).",
    depotRelevance:
      "The single hourly/quarter-hourly price you pay is whatever EUPHEMIA sets for your zone — there is no separate national price formation on top of it.",
    refIds: [2],
  },
  {
    id: "fifteen-min",
    title: "15-minute Market Time Unit (the big 2025 change)",
    status: "live",
    oneLiner: "Day-ahead prices went from hourly to 15-minute resolution on 30 Sep 2025.",
    plain:
      "The headline recent reform: on trading day 30 September 2025 (delivery day 1 October 2025), SDAC switched the day-ahead auction from 60-minute to 15-minute products in all bidding zones simultaneously (Ireland temporarily stayed on 30-minute). So there are now 96 prices per day instead of 24. The change was repeatedly rescheduled (an 11 June 2025 date was postponed) before going live in September.",
    depotRelevance:
      "This is directly relevant to smart and V2G charging: sub-hourly prices reward shifting load into cheap 15-minute windows and discharging into expensive ones much more precisely than hourly prices did.",
    refIds: [3, 4],
  },
  {
    id: "sidc",
    title: "SIDC & Intraday Auctions (IDA1/2/3)",
    status: "rolling-out",
    oneLiner: "Continuous cross-border intraday trading plus three daily intraday auctions.",
    plain:
      "SIDC (Single Intraday Coupling) is the day-ahead market's intraday sibling: a single European intraday market with continuous trading right up to close to delivery. On top of continuous trading, three intraday auctions were introduced — IDA1 (gate closure D-1 15:00), IDA2 (D-1 22:00) and IDA3 (D 10:00) — and intraday moved to 15-minute products in waves through 2024–2025.",
    depotRelevance:
      "If a depot's plans change during the day (a truck arrives late), intraday lets it re-balance its position close to real time instead of being stuck with its day-ahead schedule.",
    refIds: [5, 6],
  },
  {
    id: "flow-based",
    title: "Flow-Based Market Coupling (Core & Nordic)",
    status: "rolling-out",
    oneLiner: "A smarter way to share cross-border capacity — live in Core, arriving in the Nordics.",
    plain:
      "Older coupling allocated fixed transfer limits between each pair of zones (NTC). Flow-based market coupling instead models the physical grid (how a trade actually loads many lines at once), which usually frees up more usable cross-border capacity. The Core region (much of continental Europe incl. Germany) went live with flow-based day-ahead in June 2022; Nordic flow-based day-ahead and intraday capacity calculation have been rolling out since 2024–2025.",
    depotRelevance:
      "Flow-based generally means more efficient cross-border trade and better price convergence — but it can also change how often, and how sharply, your zone's price separates from its neighbours.",
    refIds: [2, 7],
  },
  {
    id: "system-price",
    title: "Nord Pool “System Price” — now mainly a reference",
    status: "evolving",
    oneLiner: "An unconstrained Nordic reference price whose physical role is shrinking.",
    plain:
      "The Nordic System Price is a single price computed as if there were no grid bottlenecks inside the Nordics — an 'unconstrained' clearing of all Nordic order books. You don't actually pay it; the price you pay is your area (zone) price. The System Price survives mainly as a financial reference for hedging contracts (EPADs are the difference between an area price and the System Price). Its role is being reworked: a new calculation methodology took effect 30 September 2025 (alongside 15-min MTU), and the Nordic power-futures contracts migrated from Nasdaq to Euronext clearing in March 2026. Nordic flow-based coupling further weakens the link between the System Price and actual area prices.",
    depotRelevance:
      "Don't budget against the System Price — budget against your bidding-zone price (SE3, DK1, etc.). The System Price matters only if you hedge with EPAD/futures contracts.",
    refIds: [8, 9],
  },
  {
    id: "be-ready",
    title: "What to be ready for",
    status: "evolving",
    oneLiner: "Everything is going sub-hourly and closer to real time.",
    plain:
      "The clear direction of travel: 15-minute granularity across day-ahead, intraday and imbalance settlement; flow-based capacity everywhere; and balancing platforms (PICASSO for automatic and MARI for manual frequency restoration reserves) integrating balancing across borders. The common thread is finer time resolution and stronger price signals for flexibility.",
    depotRelevance:
      "A depot that can move charging in 15-minute steps — and especially one that can discharge (V2G) — is increasingly able to monetise these sharper, more frequent price signals across day-ahead, intraday and balancing.",
    refIds: [2, 5],
  },
];

export const FUTURE_REFERENCES: Reference[] = [
  { id: 1, title: "Single Day-ahead Coupling (SDAC) — implementation", org: "ENTSO-E", year: "2026", url: "https://www.entsoe.eu/network_codes/cacm/implementation/sdac/", accessed: "2026-06" },
  { id: 2, title: "Single Day-Ahead Coupling & EUPHEMIA (NEMOs)", org: "NEMO Committee", year: "2026", url: "https://www.nemo-committee.eu/sdac", accessed: "2026-06" },
  { id: 3, title: "Market Coupling Steering Committee confirms go-live of 15-Minute MTU in SDAC on 30 September 2025 (delivery 1 October 2025)", org: "NEMO Committee / EPEX SPOT", year: "2025", url: "https://www.epexspot.com/en/news/market-coupling-steering-committee-confirms-go-live-15-minute-mtu-sdac-trading-day-30", accessed: "2026-06" },
  { id: 4, title: "Successful Implementation of 15-Minute Market Time Unit (MTU) in SDAC", org: "EPEX SPOT", year: "2025", url: "https://www.epexspot.com/en/news/successful-implementation-15-minute-market-time-unit-mtu-sdac", accessed: "2026-06" },
  { id: 5, title: "Single Intraday Coupling (SIDC) — implementation", org: "ENTSO-E", year: "2026", url: "https://www.entsoe.eu/network_codes/cacm/implementation/sidc/", accessed: "2026-06" },
  { id: 6, title: "Intraday Auctions on SIDC (IDA1/IDA2/IDA3)", org: "ENTSO-E", year: "2026", url: "https://www.entsoe.eu/network_codes/cacm/implementation/ida/", accessed: "2026-06" },
  { id: 7, title: "Intraday Flow-Based Capacity Calculation (Nordic)", org: "Nordic RCC", year: "2026", url: "https://nordic-rcc.net/flow-based/intraday-flow-based/", accessed: "2026-06" },
  { id: 8, title: "Benchmark Regulation — the Nordic System Price; methodology effective 30 September 2025", org: "Nord Pool", year: "2025", url: "https://www.nordpoolgroup.com/en/the-power-market/benchmark-regulation--the-nordic-system-price/", accessed: "2026-06" },
  { id: 9, title: "Impact of Nordic Flow-Based on the Nordic System Price", org: "Nord Pool", year: "2026", url: "https://www.nordpoolgroup.com/en/trading/nordic-flow-based-day-ahead-market-coupling/impact-of-nordic-flow-based-on-the-nordic-system-price/", accessed: "2026-06" },
];
