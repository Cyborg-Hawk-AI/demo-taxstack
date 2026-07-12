import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TaxStack Developer Docs — Feature reference",
  description:
    "Developer-facing documentation for every TaxStack demo feature: what's mocked, what's real in production, and integration notes.",
};

const features = [
  {
    name: "Practice Dashboard",
    location: "Demo → Dashboard (sidebar)",
    description:
      "Overview of active clients, pending documents, weekly appointments, and onboarding count. Revenue bar chart and document pipeline visualization.",
    tryIt: [
      "Click any KPI card to navigate to the related section",
      "Click pipeline bars to jump to Documents with filter",
      "Click client names in roster to open Client Portal",
    ],
    mocked:
      "All counts, revenue figures, and activity feed are hardcoded in lib/mock-data.ts. Chart heights are computed client-side.",
    production:
      "Supabase aggregates: COUNT clients by status, GROUP documents by pipeline stage. Revenue from Stripe Billing API. Activity from audit log table updated by webhooks.",
  },
  {
    name: "Client Portal",
    location: "Demo → Client Portal",
    description:
      "Preparer and client views of a secure portal showing profile, documents, upload capability, and messaging.",
    tryIt: [
      "Toggle 'View as: Client' to simulate client experience",
      "Select different clients via name tabs",
      "Upload a document (client view) — enter filename and click Upload",
      "Send message from preparer view",
    ],
    mocked:
      "Magic-link auth, file storage, and email notifications are simulated with toasts. No actual file upload.",
    production:
      "Per-firm subdomain (e.g. chentax.taxstack.app). Magic-link auth via Supabase Auth. Documents in Supabase Storage. Messages in messages table with Resend email notifications.",
  },
  {
    name: "E-Signature",
    location: "Demo → E-Signature",
    description:
      "Built-in signing flow replacing DocuSign. Preparer sends requests; clients sign in-browser with typed name.",
    tryIt: [
      "Click 'Send for signature' to create a new request",
      "Click 'Preview sign' on pending docs to open client signing UI",
      "Type full legal name and click 'Sign document'",
    ],
    mocked:
      "PDF rendering, cryptographic signature, and audit trail are not implemented. Status changes are local React state.",
    production:
      "DocuSeal (open-source) or custom PDF signing. Documents stored in Supabase Storage. Signature events logged with IP, timestamp, and document hash. Email via Resend with signing link.",
  },
  {
    name: "Appointment Scheduling",
    location: "Demo → Scheduling",
    description:
      "Booking management with calendar/list views and automated SMS/email reminders at 24h and 1h before appointments.",
    tryIt: [
      "Toggle between List and Calendar view",
      "Book a new appointment via modal",
      "Click appointment rows for details; confirm pending appointments",
      "Click '+24h' or '+1h' to simulate reminder sends",
    ],
    mocked:
      "Cal.com integration, actual SMS via Twilio, and webhook triggers are simulated with toasts.",
    production:
      "Cal.com embed for client self-booking. Webhooks on BOOKING_CREATED → Supabase function schedules Twilio SMS at T-24h and T-1h. Resend email as fallback. Two-way sync with preparer calendar.",
  },
  {
    name: "Document Tracker",
    location: "Demo → Documents",
    description:
      "Status pipeline: Requested → Received → In Review → Filed. Automated SMS for docs in 'Requested' status older than 3 days.",
    tryIt: [
      "Click pipeline summary cards to filter by status",
      "Use filter tabs (All, Requested, etc.)",
      "Click 'Advance' to move documents through pipeline",
      "Click 'SMS' on overdue requested docs",
      "Request new documents via modal",
    ],
    mocked:
      "Nightly cron job and Twilio SMS are simulated. Document dates and overdue calculations use static mock data.",
    production:
      "documents table in Supabase with status enum. Vercel Cron (or Supabase pg_cron) nightly: SELECT WHERE status='Requested' AND created_at < NOW() - INTERVAL '3 days' → Twilio SMS. Status changes trigger Resend email to preparer.",
  },
  {
    name: "Custom Tax Fields",
    location: "Demo → Tax Fields",
    description:
      "Firm-level field templates and per-client tax-specific data: dependents, carryovers, entity type, QBI, FBAR flags.",
    tryIt: [
      "Add new firm field templates",
      "Toggle Required/Optional on fields",
      "Select clients and edit their tax field values",
      "Save changes to update client record",
    ],
    mocked:
      "Field schema and values stored in component state only. No persistence or validation rules.",
    production:
      "field_templates table (firm_id, name, type, required). clients.custom_fields JSONB column. Replaces spreadsheets that TaxDome users maintain alongside their PM tool.",
  },
  {
    name: "Onboarding Automation",
    location: "Demo → Onboarding",
    description:
      "Automated 4-email welcome sequence triggered when a new client is created. Tracks sent/opened/clicked status.",
    tryIt: [
      "Click '+ New client' to trigger welcome sequence",
      "Filter emails by client",
      "Click email subjects to preview content",
      "Resend individual emails",
    ],
    mocked:
      "Stripe webhook trigger and Resend email delivery are simulated. Email tracking uses local state.",
    production:
      "Stripe checkout.session.completed webhook → Supabase Edge Function creates client → queues 4 Resend emails (Day 0, 1, 2, 5). Resend webhooks update open/click status. Also creates initial document requests.",
  },
  {
    name: "AI Support Chat",
    location: "Demo → 'AI Support' button (top bar)",
    description:
      "Chat widget answering common questions. Escalations route to firm owner shared inbox.",
    tryIt: [
      "Click 'AI Support' to open chat widget",
      "Ask about signing, scheduling, or uploads",
      "Send messages and receive contextual responses",
    ],
    mocked:
      "Keyword-matched canned responses. No LLM or knowledge base.",
    production:
      "OpenAI API with RAG over help docs. Escalation flag when confidence < threshold → creates ticket in shared inbox (e.g. Plain.com). Estimated <2 escalations/week for small user base.",
  },
];

const stack = [
  { layer: "Frontend", tech: "Next.js 14 App Router on Vercel", note: "Zero-config deploy, no env vars in demo" },
  { layer: "Database", tech: "Supabase (Postgres)", note: "Clients, documents, messages, custom fields" },
  { layer: "Auth", tech: "Supabase Auth magic links", note: "Client portal access, preparer email/password" },
  { layer: "Email", tech: "Resend", note: "Onboarding sequences, reminders, notifications" },
  { layer: "SMS", tech: "Twilio", note: "Document overdue + appointment reminders" },
  { layer: "Scheduling", tech: "Cal.com", note: "Embed + webhooks for reminder triggers" },
  { layer: "E-Signature", tech: "DocuSeal", note: "Open-source, self-hosted or cloud" },
  { layer: "Billing", tech: "Stripe", note: "Subscriptions, annual discount, dunning" },
  { layer: "Cron", tech: "Vercel Cron / Supabase Edge", note: "Nightly document follow-up job" },
];

export default function DevelopersPage() {
  return (
    <div className="border-t border-surface-600">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs text-brand-400">
            Developer reference
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold text-white">
            Feature documentation
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Every interactive element in the{" "}
            <Link href="/demo" className="text-brand-400 hover:text-brand-300">
              /demo
            </Link>{" "}
            page is documented here: what it does, where to click, what&apos;s
            mocked vs. production, and intended integrations.
          </p>
        </div>

        {/* Stack overview */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white">
            Production stack (MVP estimate: 3–4 weeks)
          </h2>
          <div className="mt-6 card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-600 bg-surface-700/50 text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Layer</th>
                  <th className="px-4 py-3">Technology</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {stack.map((row) => (
                  <tr
                    key={row.layer}
                    className="border-b border-surface-600/50"
                  >
                    <td className="px-4 py-3 font-medium text-white">
                      {row.layer}
                    </td>
                    <td className="px-4 py-3 text-brand-400">{row.tech}</td>
                    <td className="hidden px-4 py-3 text-slate-400 sm:table-cell">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* DEV NOTE explanation */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white">
            DEV NOTE tooltips
          </h2>
          <p className="mt-4 text-slate-400">
            Throughout the demo, small{" "}
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-500/20 text-[10px] font-bold text-brand-400 ring-1 ring-brand-500/40">
              i
            </span>{" "}
            icons appear beside major controls. Click them for inline
            explanations of production behavior and integration points.
          </p>
        </section>

        {/* Feature docs */}
        <section className="space-y-10">
          <h2 className="font-display text-2xl font-bold text-white">
            Feature-by-feature guide
          </h2>
          {features.map((feature, i) => (
            <article key={feature.name} className="card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/20 text-sm font-bold text-brand-400">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-1 text-sm text-brand-400">
                    {feature.location}
                  </p>
                  <p className="mt-3 text-slate-400">{feature.description}</p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-surface-700/50 p-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        How to try it
                      </h4>
                      <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
                        {feature.tryIt.map((step) => (
                          <li key={step} className="flex gap-2">
                            <span className="text-brand-500">→</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg bg-surface-700/50 p-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-500/80">
                        Mocked in demo
                      </h4>
                      <p className="mt-2 text-sm text-slate-400">
                        {feature.mocked}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-brand-500/20 bg-brand-500/5 p-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-400">
                      Production implementation
                    </h4>
                    <p className="mt-2 text-sm text-slate-300">
                      {feature.production}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Data flow */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-white">
            Key automation flows
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                title: "New client onboarding",
                flow: "Stripe subscription → Supabase function → client record + Resend email sequence (4 emails over 5 days) + initial document requests",
              },
              {
                title: "Document follow-up",
                flow: "Nightly cron → query docs in 'Requested' > 3 days → Twilio SMS to client → update last_reminder_at",
              },
              {
                title: "Appointment reminders",
                flow: "Cal.com webhook (booking created) → schedule Twilio SMS at T-24h and T-1h → Resend email fallback",
              },
              {
                title: "Billing",
                flow: "Stripe manages subscriptions, annual discount, failed payment dunning — zero owner involvement",
              },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 font-mono text-xs leading-relaxed text-slate-400">
                  {item.flow}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link href="/demo" className="btn-primary">
            Launch interactive demo
          </Link>
        </div>
      </div>
    </div>
  );
}
