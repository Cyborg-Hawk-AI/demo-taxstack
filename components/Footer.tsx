import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-surface-600 bg-surface-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-xs font-bold text-white">
                TS
              </div>
              <span className="font-display text-lg font-bold text-white">
                TaxStack
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              One affordable hub for solo and small-team tax firms. Built from
              real pain points in r/Accounting.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Product
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/demo"
                  className="text-slate-400 transition hover:text-brand-400"
                >
                  Live Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="text-slate-400 transition hover:text-brand-400"
                >
                  Developer Docs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Research
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/research"
                  className="text-slate-400 transition hover:text-brand-400"
                >
                  How we found this idea
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-surface-600 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} TaxStack demo · Built by Idea Miner
        </div>
      </div>
    </footer>
  );
}
