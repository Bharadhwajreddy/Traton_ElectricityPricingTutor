import type { ExampleDepot } from "./types";

// ---------------------------------------------------------------------------
// Standard example depot, applied consistently across all countries unless a
// country's tariff structure requires a documented deviation (recorded in that
// country's `assumptions`).
// ---------------------------------------------------------------------------
export const STANDARD_DEPOT: ExampleDepot = {
  contractedPowerKW: 1000, // 1 MW contracted / peak power
  annualEnergyKWh: 2_000_000, // 2 GWh / year
  voltageLevel: "Medium voltage (industrial/commercial equivalent)",
  utilisationHours: 2000, // E / P_max = 2,000,000 / 1000 = 2000 h/year
  notes:
    "1 MW contracted power, 2 GWh/year, connected at medium voltage. " +
    "Utilisation time = 2,000,000 kWh / 1,000 kW = 2,000 full-load hours/year.",
};
