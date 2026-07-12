import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-600/80 bg-surface-900/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">
            TS
          </div>
          <span className="font-display text-xl font-bold text-white">
            TaxStack
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-400 md:flex">
          <Link href="/#features" className="transition hover:text-white">
            Features
          </Link>
          <Link href="/#pricing" className="transition hover:text-white">
            Pricing
          </Link>
          <Link href="/demo" className="transition hover:text-white">
            Live Demo
          </Link>
          <Link href="/developers" className="transition hover:text-white">
            Developers
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/demo"
            className="btn-primary hidden text-sm sm:inline-flex"
          >
            Try the demo
          </Link>
        </div>
      </div>
    </header>
  );
}
