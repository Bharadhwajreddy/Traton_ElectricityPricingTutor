import type { Country } from "../types";
import { germany } from "./germany";
import { sweden } from "./sweden";
import { china } from "./china";
import { denmark } from "./denmark";
import { STUB_COUNTRIES } from "./_stubs";

// Priority deep-dive countries first, then scaffolded stubs (alphabetical).
export const COUNTRIES: Country[] = [
  germany,
  sweden,
  denmark,
  china,
  ...STUB_COUNTRIES.sort((a, b) => a.name.localeCompare(b.name)),
];

export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code.toLowerCase());
}

export function allCountryCodes(): string[] {
  return COUNTRIES.map((c) => c.code);
}

const STATUS_RANK: Record<Country["status"], number> = {
  "deep-dive": 0,
  documented: 1,
  partial: 2,
  "needs-research": 3,
};

export function countriesByStatus(): Country[] {
  return [...COUNTRIES].sort(
    (a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status] || a.name.localeCompare(b.name),
  );
}
