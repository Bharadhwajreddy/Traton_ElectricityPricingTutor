import type { Country } from "../types";

// ---------------------------------------------------------------------------
// Scaffolded countries: in scope (geographic Europe) but NOT yet populated with
// authoritative, cited tariff data. Per the project rules these are marked
// "needs-research" rather than filled with guessed values.
// ---------------------------------------------------------------------------

interface StubSeed {
  code: string;
  name: string;
  flag: string;
}

const EUROPE_STUBS: StubSeed[] = [
  { code: "fr", name: "France", flag: "🇫🇷" },
  { code: "nl", name: "Netherlands", flag: "🇳🇱" },
  { code: "it", name: "Italy", flag: "🇮🇹" },
  { code: "es", name: "Spain", flag: "🇪🇸" },
  { code: "gb", name: "United Kingdom", flag: "🇬🇧" },
  { code: "pl", name: "Poland", flag: "🇵🇱" },
  { code: "be", name: "Belgium", flag: "🇧🇪" },
  { code: "at", name: "Austria", flag: "🇦🇹" },
  { code: "ch", name: "Switzerland", flag: "🇨🇭" },
  { code: "dk", name: "Denmark", flag: "🇩🇰" },
  { code: "no", name: "Norway", flag: "🇳🇴" },
  { code: "fi", name: "Finland", flag: "🇫🇮" },
  { code: "pt", name: "Portugal", flag: "🇵🇹" },
  { code: "ie", name: "Ireland", flag: "🇮🇪" },
  { code: "cz", name: "Czechia", flag: "🇨🇿" },
  { code: "sk", name: "Slovakia", flag: "🇸🇰" },
  { code: "hu", name: "Hungary", flag: "🇭🇺" },
  { code: "ro", name: "Romania", flag: "🇷🇴" },
  { code: "bg", name: "Bulgaria", flag: "🇧🇬" },
  { code: "gr", name: "Greece", flag: "🇬🇷" },
  { code: "hr", name: "Croatia", flag: "🇭🇷" },
  { code: "si", name: "Slovenia", flag: "🇸🇮" },
  { code: "ee", name: "Estonia", flag: "🇪🇪" },
  { code: "lv", name: "Latvia", flag: "🇱🇻" },
  { code: "lt", name: "Lithuania", flag: "🇱🇹" },
  { code: "lu", name: "Luxembourg", flag: "🇱🇺" },
  { code: "is", name: "Iceland", flag: "🇮🇸" },
  { code: "rs", name: "Serbia", flag: "🇷🇸" },
  { code: "ua", name: "Ukraine", flag: "🇺🇦" },
  { code: "mt", name: "Malta", flag: "🇲🇹" },
  { code: "cy", name: "Cyprus", flag: "🇨🇾" },
  { code: "al", name: "Albania", flag: "🇦🇱" },
  { code: "ba", name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { code: "mk", name: "North Macedonia", flag: "🇲🇰" },
  { code: "me", name: "Montenegro", flag: "🇲🇪" },
  { code: "xk", name: "Kosovo", flag: "🇽🇰" },
  { code: "md", name: "Moldova", flag: "🇲🇩" },
];

export const STUB_COUNTRIES: Country[] = EUROPE_STUBS.map((s) => ({
  code: s.code,
  name: s.name,
  region: "europe",
  status: "needs-research",
  lastUpdated: "2026-06-11",
  flag: s.flag,
  summary:
    "Insufficient authoritative data collected in this run — scaffolded for manual research.",
  gaps: [
    "National regulator / TSO / DSO tariff sheets not yet retrieved and verified.",
    "Truck-depot customer classification (voltage level, customer class) not yet confirmed.",
    "Tariff components, formulas and V2G/export rules pending authoritative sourcing.",
  ],
}));
