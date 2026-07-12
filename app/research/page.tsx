import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TaxStack Research — How we found this idea",
  description:
    "The research behind TaxStack: real pain points from r/Accounting, validation results, and competitive landscape.",
};

const painPoints = [
  {
    problem:
      "Existing accounting software doesn't meet expectations, is being discontinued, or is overly complicated and expensive for the features offered.",
    persona: "Tax and bookkeeping business owner",
    workaround:
      "Using multiple tools: QuickBooks Online for bookkeeping, DocuSign for e-signatures, Goldmine for scheduling and client paperwork tracking",
    frequency: "daily",
    wtp: "Currently paying for QuickBooks Online, DocuSign, and Goldmine subscriptions",
    url: "https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/",
  },
  {
    problem:
      "Practice management tools are restrictive and don't accommodate tracking of detailed client data points needed for tax preparation.",
    persona: "Tax accounting practice owner",
    workaround:
      "Using TaxDome plus spreadsheets to manually compile data; building custom solution internally",
    frequency: "daily",
    wtp: "Spending ~$500 annually on software; investing time to build custom solution",
    url: "https://www.reddit.com/r/Accounting/comments/1udzgd3/anyone_else_feel_like_their_practice_management/",
  },
  {
    problem:
      "E-signature solution (DocuSign) has reliability issues with clients being unable to complete signatures.",
    persona: "Tax and bookkeeping business owner",
    workaround:
      "Currently using DocuSign despite frequent client sign-up failures",
    frequency: "weekly",
    wtp: "Paying for DocuSign subscription",
    url: "https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/",
  },
  {
    problem:
      "Meeting scheduling and client paperwork tracking system is frustrating and unreliable.",
    persona: "Tax and bookkeeping business owner",
    workaround:
      "Using Goldmine for both scheduling and client document submission tracking",
    frequency: "daily",
    wtp: "Paying for Goldmine subscription",
    url: "https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/",
  },
];

const checklist = [
  { label: "10+ posts with this pain", passed: true },
  { label: "Paying for inferior solution", passed: true },
  { label: "Reachable channel", passed: true },
  { label: "MVP < 4 weeks", passed: true },
  { label: "Price point high enough", passed: true },
  { label: "Hair-on-fire problem", passed: true },
  { label: "Can pre-sell", passed: true },
  { label: "< 3 competitors", passed: false },
  { label: "Low-maintenance ops (mailbox money)", passed: true },
];

export default function ResearchPage() {
  const passedCount = checklist.filter((c) => c.passed).length;

  return (
    <div className="border-t border-surface-600">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs text-brand-400">
            Idea Miner research · 8/9 validation checks
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold text-white">
            How we found TaxStack
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Replace TaxDome, DocuSign, and Goldmine with one affordable hub for
            small tax firms.
          </p>
        </div>

        {/* What is TaxStack */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white">
            What is TaxStack?
          </h2>
          <p className="mt-4 leading-relaxed text-slate-400">
            TaxStack is built for{" "}
            <strong className="text-slate-300">
              solo and small-team tax preparers and bookkeepers (1–10 staff)
            </strong>{" "}
            paying $500–$2,000/yr across fragmented tools. Built directly from
            the exact complaints in r/Accounting threads — custom fields,
            reliable e-sig, and scheduling in one tool at a price solo preparers
            can justify without enterprise contracts.
          </p>
          <div className="mt-6 card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Core MVP features
            </h3>
            <ul className="mt-4 space-y-2 text-slate-300">
              <li className="flex gap-2">
                <span className="text-brand-500">✓</span>
                Client portal with built-in e-signature (no DocuSign dependency)
              </li>
              <li className="flex gap-2">
                <span className="text-brand-500">✓</span>
                Appointment scheduling with automated reminders via email/SMS
              </li>
              <li className="flex gap-2">
                <span className="text-brand-500">✓</span>
                Document submission tracker with status pipeline (Requested →
                Received → In Review → Filed)
              </li>
              <li className="flex gap-2">
                <span className="text-brand-500">✓</span>
                Custom client data fields for tax-specific data points
              </li>
              <li className="flex gap-2">
                <span className="text-brand-500">✓</span>
                Automated client onboarding checklist emails on new client
                creation
              </li>
            </ul>
            <p className="mt-4 text-sm text-brand-400">
              Pricing: $49/mo (up to 3 users) or $79/mo (up to 10 users); annual
              = 2 months free
            </p>
          </div>
        </section>

        {/* Origin story */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white">
            The research: why this exists
          </h2>
          <div className="mt-6 card p-6">
            <p className="leading-relaxed text-slate-300">
              In r/Accounting, a tax and bookkeeping business owner complained
              that their accounting software was being discontinued and that they
              were juggling QuickBooks Online, DocuSign, and Goldmine just to run
              a small practice — paying for three subscriptions and still
              hitting reliability issues with DocuSign where clients couldn&apos;t
              complete signatures. A second poster in the same community said
              TaxDome plus spreadsheets still wasn&apos;t enough because practice
              management tools &ldquo;don&apos;t accommodate tracking of detailed
              client data points&rdquo; needed for tax prep, and they were
              building a custom internal solution just to fill the gap. Existing
              tools like TaxDome are priced and scoped for larger firms; solo
              preparers are left overpaying for complexity they don&apos;t need or
              stitching together tools that don&apos;t talk to each other.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-surface-700/50 p-4">
                <div className="text-xs text-slate-500">Cluster</div>
                <div className="mt-1 font-semibold text-white">
                  Tax Practice Management Fragmentation
                </div>
              </div>
              <div className="rounded-lg bg-surface-700/50 p-4">
                <div className="text-xs text-slate-500">Rubric score</div>
                <div className="mt-1 font-display text-2xl font-bold text-brand-400">
                  112/130
                </div>
              </div>
              <div className="rounded-lg bg-surface-700/50 p-4">
                <div className="text-xs text-slate-500">Validation</div>
                <div className="mt-1 font-display text-2xl font-bold text-white">
                  {passedCount}/9 checks
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competitive landscape */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white">
            Competitive landscape
          </h2>
          <p className="mt-4 text-slate-400">
            TaxDome ($600+/yr, complex), Canopy (expensive), Practice Ignition
            (proposal-focused). No sub-$600/yr all-in-one with custom fields and
            built-in e-sig targeting micro-firms.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            <strong className="text-slate-400">Go-to-market:</strong> Reddit
            r/Accounting and r/taxpros organic posts + targeted Facebook Groups
            for tax professionals; cold email to NATP and NAEA member lists
          </p>
        </section>

        {/* Automation */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white">
            How this business runs itself
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Mailbox money — passive, low-maintenance recurring revenue
          </p>
          <div className="mt-6 card p-6">
            <p className="leading-relaxed text-slate-300">
              Client onboarding: new Stripe subscription triggers a Supabase
              function that creates the client record and fires a welcome +
              document-request email sequence via Resend — zero human touch.
              Document follow-ups: a nightly cron checks for documents in
              &lsquo;Requested&rsquo; status older than 3 days and sends an
              automated SMS reminder via Twilio. Appointment reminders: Cal.com
              webhooks trigger 24-hour and 1-hour SMS reminders automatically.
              Support: an AI chat widget answers common questions using a trained
              knowledge base; only escalations (estimated &lt;2/week for a small
              user base) reach the owner via a shared inbox. Billing and renewals:
              fully Stripe-managed with automatic dunning emails.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              <div>
                <div className="text-xs text-slate-500">Estimated owner time</div>
                <div className="font-display text-2xl font-bold text-brand-400">
                  ~1.5 hrs/week
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">MVP estimate</div>
                <div className="text-white">
                  Next.js + Supabase + Resend + Cal.com + DocuSeal
                </div>
                <div className="text-sm text-slate-500">3–4 weeks to working MVP</div>
              </div>
            </div>
          </div>
        </section>

        {/* Validation checklist */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white">
            Validation checklist ({passedCount}/9)
          </h2>
          <div className="mt-6 card p-6">
            <ul className="space-y-3">
              {checklist.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded text-xs font-bold ${
                      item.passed
                        ? "bg-brand-500/20 text-brand-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {item.passed ? "✓" : "✗"}
                  </span>
                  <span
                    className={
                      item.passed ? "text-slate-300" : "text-slate-500"
                    }
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pain points */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white">
            Source pain points (real posts)
          </h2>
          <div className="mt-6 space-y-6">
            {painPoints.map((pp, i) => (
              <article key={i} className="card p-6">
                <h3 className="font-semibold text-white">{pp.problem}</h3>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-slate-500">Persona</dt>
                    <dd className="text-slate-300">{pp.persona}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Frequency</dt>
                    <dd className="text-slate-300">{pp.frequency}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-slate-500">Workaround</dt>
                    <dd className="text-slate-300">{pp.workaround}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-slate-500">WTP signal</dt>
                    <dd className="text-slate-300">{pp.wtp}</dd>
                  </div>
                </dl>
                <a
                  href={pp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm text-brand-400 hover:text-brand-300"
                >
                  View source on Reddit →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* About Idea Miner */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-white">
            About this program
          </h2>
          <p className="mt-4 leading-relaxed text-slate-400">
            This demo was auto-built by the{" "}
            <strong className="text-slate-300">Idea Miner</strong> pipeline: a
            twice-daily research program that mines Reddit, Hacker News, Stack
            Exchange, and GitHub for real people describing real pain, scores the
            opportunities, and automatically ships a working mock of every idea
            that passes validation (&gt;=8/9 checks, momentum not declining, not
            previously built). The bar for every idea: low-maintenance recurring
            revenue that a solo owner can run in a few hours a week.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Generated by Idea Miner run 2026-07-12-am on 2026-07-12 12:03 UTC
          </p>
        </section>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/demo" className="btn-primary">
            Try the interactive demo
          </Link>
          <Link href="/developers" className="btn-secondary">
            Developer documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
