"use client";

import { motion } from "framer-motion";
import type { DecisionFlow } from "@/data/types";

function Connector() {
  return <div className="mx-auto h-5 w-px bg-slate-300" />;
}

export function DecisionFlowChart({ flow }: { flow: DecisionFlow }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="rounded-xl border border-slate-200 bg-white p-4"
    >
      <h3 className="text-sm font-semibold text-slate-800">{flow.title}</h3>

      <div className="mt-3 flex flex-col items-center text-center">
        {flow.input && (
          <>
            <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-600">
              {flow.input}
            </div>
            <Connector />
          </>
        )}

        {/* Decision node */}
        <div className="relative rounded-lg border-2 border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-900">
          <span className="mr-1">◆</span>
          {flow.question}
        </div>
        <Connector />

        {/* Branches */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {flow.branches.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.08 }}
              className={`flex flex-col rounded-lg border p-3 text-left ${
                b.active
                  ? "border-emerald-400 bg-emerald-50 ring-2 ring-emerald-200"
                  : "border-slate-200 bg-white opacity-80"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`rounded px-2 py-0.5 font-mono text-xs ${
                    b.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {b.test}
                </span>
                {b.active && (
                  <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                    this depot
                  </span>
                )}
              </div>
              <div className="mt-2 text-slate-400">↓</div>
              <p className="text-sm text-slate-700">{b.result}</p>
            </motion.div>
          ))}
        </div>

        {flow.outcome && (
          <>
            <Connector />
            <div className="w-full rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm text-brand-900">
              <span className="font-semibold">→ For the example depot: </span>
              {flow.outcome}
            </div>
          </>
        )}
      </div>

      {flow.refIds && flow.refIds.length > 0 && (
        <p className="mt-3 text-xs text-slate-400">Source: [{flow.refIds.join(", ")}]</p>
      )}
    </motion.div>
  );
}
