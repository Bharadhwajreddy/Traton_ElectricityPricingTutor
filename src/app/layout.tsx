import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Electricity Pricing Tutor — Truck Depots",
  description:
    "How grid-connected truck depots are charged for electricity across Europe and China: tariff components, formulas, and official references.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">
            <p>
              Educational reference only. Tariff structures are summarised from official
              regulator / TSO / DSO sources; always verify against the primary documents before
              relying on figures. Last build: 2026-06-11.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
