import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">⚡</span>
          <span>
            Electricity Pricing Tutor
            <span className="ml-2 hidden text-xs font-normal text-slate-400 sm:inline">
              truck depots · Europe &amp; China
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <Link href="/" className="hover:text-brand-600">
            Countries
          </Link>
          <Link href="/methodology" className="hover:text-brand-600">
            Methodology
          </Link>
          <Link href="/excel-spec" className="hover:text-brand-600">
            Excel
          </Link>
        </nav>
      </div>
    </header>
  );
}
