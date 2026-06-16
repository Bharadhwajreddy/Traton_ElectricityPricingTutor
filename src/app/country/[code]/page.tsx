import { notFound } from "next/navigation";
import Link from "next/link";
import { COUNTRIES, getCountry } from "@/data/countries";
import { StatusBadge } from "@/components/StatusBadge";
import { ComponentTable } from "@/components/ComponentTable";
import { FormulaBlock } from "@/components/FormulaBlock";
import { ReferenceList } from "@/components/ReferenceList";
import { Glossary } from "@/components/Glossary";
import { OperatorsSection } from "@/components/OperatorsSection";
import { CostStackChart } from "@/components/CostStackChart";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ code: c.code }));
}

export function generateMetadata({ params }: { params: { code: string } }) {
  const c = getCountry(params.code);
  return { title: c ? `${c.name} — Electricity Pricing Tutor` : "Country" };
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section id={id} className="scroll-mt-20">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <div className="mt-3">{children}</div>
      </section>
    </Reveal>
  );
}

export default function CountryPage({ params }: { params: { code: string } }) {
  const country = getCountry(params.code);
  if (!country) notFound();

  const depot = country.exampleDepot;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/" className="text-sm text-brand-600 hover:underline">
        ← All countries
      </Link>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-4xl">{country.flag ?? "🏳️"}</span>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{country.name}</h1>
          <div className="mt-1 flex items-center gap-3 text-sm text-slate-500">
            <StatusBadge status={country.status} />
            <span>Updated {country.lastUpdated}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-slate-600">{country.summary}</p>

      {country.status === "needs-research" ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6">
          <h2 className="font-semibold text-slate-800">Insufficient authoritative data — not yet modelled</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
            {(country.gaps ?? []).map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          <Glossary defaultOpen />

          {country.classification && (
            <Section id="classification" title="A · Customer classification">
              <p className="text-slate-600">{country.classification}</p>
              {country.assumptions && country.assumptions.length > 0 && (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <div className="text-sm font-semibold text-amber-800">Assumptions</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-900">
                    {country.assumptions.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
              {depot && (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <DepotStat label="Contracted power" value={`${depot.contractedPowerKW / 1000} MW`} />
                  <DepotStat label="Annual energy" value={`${depot.annualEnergyKWh / 1_000_000} GWh`} />
                  <DepotStat label="Utilisation" value={`${depot.utilisationHours.toLocaleString()} h/yr`} />
                  <DepotStat label="Connection" value={depot.voltageLevel} />
                </div>
              )}
            </Section>
          )}

          {country.operators && (
            <Section id="operators" title="B · Who runs the grid & market">
              <OperatorsSection operators={country.operators} />
            </Section>
          )}

          {country.components && country.components.length > 0 && (
            <Section id="components" title="C · Tariff components">
              <ComponentTable components={country.components} references={country.references} />
            </Section>
          )}

          {(country.formulas?.length || country.costStack) && (
            <Section id="formulas" title="D · Annual cost — how it adds up">
              {country.formulaIntro && (
                <p className="mb-4 text-slate-600">{country.formulaIntro}</p>
              )}
              {country.costStack && (
                <div className="mb-5">
                  <CostStackChart stack={country.costStack} />
                </div>
              )}
              {country.formulas && country.formulas.length > 0 && (
                <FormulaBlock formulas={country.formulas} total={country.totalFormula} />
              )}
            </Section>
          )}

          {country.v2g && (
            <Section id="v2g" title="E · V2G / feed-in / export rules">
              <p className="whitespace-pre-line text-slate-600">{country.v2g}</p>
            </Section>
          )}

          {country.history && country.history.length > 0 && (
            <Section id="history" title="F · Notable reforms">
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                {country.history.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </Section>
          )}

          {country.gaps && country.gaps.length > 0 && (
            <Section id="gaps" title="Open issues & unknowns">
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                {country.gaps.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </Section>
          )}

          {country.references && country.references.length > 0 && (
            <Section id="references" title="G · References">
              <ReferenceList references={country.references} />
            </Section>
          )}
        </div>
      )}
    </div>
  );
}

function DepotStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-slate-800">{value}</div>
    </div>
  );
}
