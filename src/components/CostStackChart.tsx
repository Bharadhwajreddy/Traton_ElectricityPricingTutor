"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { CostStack, ComponentCategory } from "@/data/types";

const CAT_COLOR: Record<ComponentCategory, string> = {
  energy: "#6366f1", // indigo
  "grid-power": "#06b6d4", // cyan
  "grid-energy": "#14b8a6", // teal
  fixed: "#94a3b8", // slate
  tax: "#f43f5e", // rose
  levy: "#f59e0b", // amber
  surcharge: "#f97316", // orange
  concession: "#d946ef", // fuchsia
  metering: "#84cc16", // lime
};

function fmt(n: number, currency: string) {
  return new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 0,
  }).format(n) + " " + currency;
}

export function CostStackChart({ stack }: { stack: CostStack }) {
  const [hover, setHover] = useState<number | null>(null);

  // Weight each slice: prefer known amount, else use share, else a small default.
  const weights = stack.slices.map((s) =>
    s.amount != null ? s.amount : s.share != null ? s.share : 0.05,
  );
  const total = weights.reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-slate-800">Anatomy of the annual bill</h3>
        <span className="text-xs text-slate-400">{stack.basis}</span>
      </div>

      {/* Stacked proportion bar */}
      <div className="mb-4 flex h-7 w-full overflow-hidden rounded-md ring-1 ring-slate-200">
        {stack.slices.map((s, i) => (
          <motion.div
            key={i}
            initial={{ width: 0 }}
            whileInView={{ width: `${(weights[i] / total) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            style={{ backgroundColor: CAT_COLOR[s.category], opacity: hover === null || hover === i ? 1 : 0.4 }}
            className="h-full cursor-default transition-opacity"
            title={s.label}
          />
        ))}
      </div>

      {/* Rows */}
      <ul className="space-y-2">
        {stack.slices.map((s, i) => (
          <li
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className={`flex items-center gap-3 rounded-md px-2 py-1 text-sm transition ${
              hover === i ? "bg-slate-50" : ""
            }`}
          >
            <span
              className="h-3 w-3 flex-none rounded-sm"
              style={{ backgroundColor: CAT_COLOR[s.category] }}
            />
            <span className="flex-1 text-slate-700">
              {s.label}
              {s.note && <span className="ml-1 text-xs text-slate-400">· {s.note}</span>}
            </span>
            <span className="flex-none font-mono text-xs text-slate-500">
              {s.amount != null ? fmt(s.amount, stack.currency) : "market-dependent"}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-slate-400">
        Bar widths are proportional to the modelled / illustrative amounts; market- and DSO-specific
        items are shown at an indicative width. Hover to highlight a component.
      </p>
    </div>
  );
}
