import Link from "next/link";

const features = [
  {
    title: "Client portal + e-signature",
    description:
      "Built-in signing flow — no DocuSign dependency. Clients sign engagement letters and Form 8879 in-browser.",
    icon: "✍️",
  },
  {
    title: "Smart scheduling",
    description:
      "Cal.com-style booking with automated 24-hour and 1-hour SMS/email reminders via webhooks.",
    icon: "📅",
  },
  {
    title: "Document pipeline",
    description:
      "Track every document from Requested → Received → In Review → Filed. Auto SMS after 3 days overdue.",
    icon: "📄",
  },
  {
    title: "Tax-specific fields",
    description:
      "Dependents, carryovers, entity flags, QBI eligibility — not generic CRM fields.",
    icon: "📊",
  },
  {
    title: "Onboarding automation",
    description:
      "New client triggers welcome + document checklist email sequence. Zero manual follow-up.",
    icon: "✉️",
  },
  {
    title: "One affordable bill",
    description:
      "Replace TaxDome, DocuSign, and Goldmine. Under $600/yr for solo firms.",
    icon: "💰",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/30 via-surface-900 to-surface-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-400">
              <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
              Built from r/Accounting pain points
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              One hub for{" "}
              <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                small tax firms
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              Replace TaxDome, DocuSign, and Goldmine with TaxStack — client
              portal, e-signatures, scheduling, and document tracking in one
              affordable tool for solo and small-team preparers.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/demo" className="btn-primary px-8 py-3 text-base">
                Explore live demo
              </Link>
              <Link href="/research" className="btn-secondary px-8 py-3 text-base">
                See the research
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              From $49/mo · No enterprise contracts · 8/9 validation checks passed
            </p>
          </div>

          {/* Stats bar */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Tools replaced", value: "3 → 1" },
              { label: "Owner time", value: "~1.5 hrs/wk" },
              { label: "Starting at", value: "$49/mo" },
              { label: "MVP timeline", value: "3–4 weeks" },
            ].map((stat) => (
              <div key={stat.label} className="card p-4 text-center">
                <div className="font-display text-2xl font-bold text-brand-400">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-surface-600 bg-surface-800/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-heading">Everything your practice needs</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Core MVP features designed for tax preparers paying $500–$2,000/yr
              across fragmented tools.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card group p-6 transition hover:border-brand-500/40 hover:shadow-glow"
              >
                <div className="text-3xl">{feature.icon}</div>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof / pain */}
      <section className="border-t border-surface-600 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="card overflow-hidden lg:flex">
            <div className="flex-1 p-8 lg:p-12">
              <h2 className="section-heading text-2xl sm:text-3xl">
                &ldquo;I&apos;m juggling QBO, DocuSign, and Goldmine just to run
                a small practice.&rdquo;
              </h2>
              <p className="mt-4 text-slate-400">
                Real complaint from r/Accounting. TaxStack was built directly from
                threads where solo preparers described paying for three
                subscriptions and still hitting DocuSign reliability issues.
              </p>
              <Link
                href="/research"
                className="mt-6 inline-flex text-sm font-medium text-brand-400 hover:text-brand-300"
              >
                Read the full research →
              </Link>
            </div>
            <div className="border-t border-surface-600 bg-surface-700/50 p-8 lg:w-80 lg:border-l lg:border-t-0">
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-slate-500">Cluster score</div>
                  <div className="font-display text-2xl font-bold text-white">
                    112/130
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Validation</div>
                  <div className="font-display text-2xl font-bold text-brand-400">
                    8/9 checks
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Competitors</div>
                  <div className="text-white">TaxDome, Canopy, Practice Ignition</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-surface-600 bg-surface-800/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-heading">Simple, firm-friendly pricing</h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Per-seat SaaS with annual billing discount. No per-signature fees.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="card p-8">
              <h3 className="font-display text-xl font-bold text-white">Solo</h3>
              <p className="mt-1 text-sm text-slate-500">Up to 3 users</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-white">$49</span>
                <span className="text-slate-500">/month</span>
              </div>
              <p className="mt-2 text-sm text-brand-400">
                $490/yr with annual billing (2 months free)
              </p>
              <ul className="mt-8 space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="text-brand-500">✓</span> Client portal + e-sign
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-500">✓</span> Document pipeline
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-500">✓</span> Scheduling + reminders
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-500">✓</span> Custom tax fields
                </li>
              </ul>
              <Link href="/demo" className="btn-secondary mt-8 w-full">
                Try demo
              </Link>
            </div>
            <div className="card relative border-brand-500/50 p-8 shadow-glow">
              <div className="absolute -top-3 right-6 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                Popular
              </div>
              <h3 className="font-display text-xl font-bold text-white">Team</h3>
              <p className="mt-1 text-sm text-slate-500">Up to 10 users</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-white">$79</span>
                <span className="text-slate-500">/month</span>
              </div>
              <p className="mt-2 text-sm text-brand-400">
                $790/yr with annual billing (2 months free)
              </p>
              <ul className="mt-8 space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="text-brand-500">✓</span> Everything in Solo
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-500">✓</span> Multi-preparer assignment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-500">✓</span> Team activity dashboard
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-500">✓</span> Priority support
                </li>
              </ul>
              <Link href="/demo" className="btn-primary mt-8 w-full">
                Try demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-surface-600 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="section-heading">See TaxStack in action</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Fully interactive demo with realistic client data. Every button works —
            no backend required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/demo" className="btn-primary px-8 py-3 text-base">
              Launch interactive demo
            </Link>
            <Link href="/developers" className="btn-secondary px-8 py-3 text-base">
              Developer documentation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
