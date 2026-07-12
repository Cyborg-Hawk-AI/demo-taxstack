# TaxStack

> Replace TaxDome, DocuSign, and Goldmine with one affordable hub for small tax firms.

## What is TaxStack?

TaxStack is built for **Solo and small-team tax preparers and bookkeepers (1–10 staff) paying $500–$2,000/yr across fragmented tools**. Built directly from the exact complaints in r/Accounting threads — custom fields, reliable e-sig, and scheduling in one tool at a price solo preparers can justify without enterprise contracts

### Core MVP features
- Client portal with built-in e-signature (no DocuSign dependency)
- Appointment scheduling with automated reminders via email/SMS
- Document submission tracker with status pipeline (Requested → Received → In Review → Filed)
- Custom client data fields for tax-specific data points (dependents, prior-year carryovers, entity type flags)
- Automated client onboarding checklist emails triggered on new client creation

**Pricing:** Per-seat SaaS subscription, annual billing discount at $49/month per firm (up to 3 users) or $79/month for up to 10 users; annual = 2 months free

## The research: why this exists

In r/Accounting, a tax and bookkeeping business owner complained that their accounting software was being discontinued and that they were juggling QuickBooks Online, DocuSign, and Goldmine just to run a small practice — paying for three subscriptions and still hitting reliability issues with DocuSign where clients couldn't complete signatures. A second poster in the same community said TaxDome plus spreadsheets still wasn't enough because practice management tools 'don't accommodate tracking of detailed client data points' needed for tax prep, and they were building a custom internal solution just to fill the gap. Existing tools like TaxDome are priced and scoped for larger firms; solo preparers are left overpaying for complexity they don't need or stitching together tools that don't talk to each other.

**Cluster:** Tax Practice Management Fragmentation | **Rubric score:** 112/130 | **Validation:** 8/9 checks passed

**Competitive landscape:** TaxDome ($600+/yr, complex), Canopy (expensive), Practice Ignition (proposal-focused). No sub-$600/yr all-in-one with custom fields and built-in e-sig targeting micro-firms.

**Go-to-market:** Reddit r/Accounting and r/taxpros organic posts + targeted Facebook Groups for tax professionals; cold email to NATP and NAEA member lists

## How this business runs itself (mailbox money)

The goal is passive, low-maintenance recurring revenue: AI is how we build and operate the business, not necessarily what it sells.

Client onboarding: new Stripe subscription triggers a Supabase function that creates the client record and fires a welcome + document-request email sequence via Resend — zero human touch. Document follow-ups: a nightly cron checks for documents in 'Requested' status older than 3 days and sends an automated SMS reminder via Twilio. Appointment reminders: Cal.com webhooks trigger 24-hour and 1-hour SMS reminders automatically. Support: an AI chat widget answers common questions using a trained knowledge base; only escalations (estimated <2/week for a small user base) reach the owner via a shared inbox. Billing and renewals: fully Stripe-managed with automatic dunning emails. Estimated owner time: under 1.5 hours/week.

**Estimated owner time:** ~1.5 hour(s)/week

**MVP estimate:** Next.js + Supabase + Resend (email) + Cal.com embed + DocuSeal (open-source e-sig); 3–4 weeks to working MVP

## Validation checklist (8/9)
- [x] 10+ posts with this pain
- [x] Paying for inferior solution
- [x] Reachable channel
- [x] MVP < 4 weeks
- [x] Price point high enough
- [x] Hair-on-fire problem
- [x] Can pre-sell
- [ ] < 3 competitors
- [x] Low-maintenance ops (mailbox money)

## Source pain points (real posts)

### Existing accounting software doesn't meet expectations, is being discontinued, or is overly complicated and expensive for the features offered.
- **Persona:** Tax and bookkeeping business owner
- **Workaround:** Using multiple tools: QuickBooks Online for bookkeeping, DocuSign for e-signatures, Goldmine for scheduling and client paperwork tracking
- **Frequency:** daily
- **WTP signal:** Currently paying for QuickBooks Online, DocuSign, and Goldmine subscriptions
- **Source:** https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/

### Practice management tools are restrictive and don't accommodate tracking of detailed client data points needed for tax preparation.
- **Persona:** Tax accounting practice owner
- **Workaround:** Using TaxDome plus spreadsheets to manually compile data; building custom solution internally
- **Frequency:** daily
- **WTP signal:** Spending ~$500 annually on software; investing time to build custom solution
- **Source:** https://www.reddit.com/r/Accounting/comments/1udzgd3/anyone_else_feel_like_their_practice_management/

### E-signature solution (DocuSign) has reliability issues with clients being unable to complete signatures.
- **Persona:** Tax and bookkeeping business owner
- **Workaround:** Currently using DocuSign despite frequent client sign-up failures
- **Frequency:** weekly
- **WTP signal:** Paying for DocuSign subscription
- **Source:** https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/

### Meeting scheduling and client paperwork tracking system is frustrating and unreliable.
- **Persona:** Tax and bookkeeping business owner
- **Workaround:** Using Goldmine for both scheduling and client document submission tracking
- **Frequency:** daily
- **WTP signal:** Paying for Goldmine subscription
- **Source:** https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/


## About this program

This demo was auto-built by the **Idea Miner** pipeline: a twice-daily research program that mines Reddit, Hacker News, Stack Exchange, and GitHub for real people describing real pain, scores the opportunities, and automatically ships a working mock of every idea that passes validation (>=8/9 checks, momentum not declining, not previously built). The bar for every idea: low-maintenance recurring revenue that a solo owner can run in a few hours a week.

_Generated by Idea Miner run 2026-07-12-am on 2026-07-12 12:03 UTC_


## Local development

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build (required before deploy)
npm start      # serve production build locally
```

### Project structure

```
app/
  page.tsx          # Landing page (hero, features, pricing)
  demo/page.tsx     # Interactive product mock
  developers/       # Feature documentation for reviewers
  research/         # Research story (mirrors this README)
components/
  demo/             # Demo panels (portal, e-sign, scheduling, etc.)
  DevNote.tsx       # "i" tooltips explaining production behavior
lib/
  mock-data.ts      # All hardcoded sample data for the demo
```

### Pages

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page |
| `/demo` | Fully interactive mock — every control is clickable |
| `/developers` | What's mocked vs. production, integration notes |
| `/research` | Origin story, validation checklist, source links |

### Deploy to Vercel

Push to a Git repo and import in Vercel, or run `npx vercel`. No environment variables, custom server, or rewrites required — the app is zero-config.

```bash
npm run build   # must pass before deploy
```

### Tech stack

- **Next.js 14** (App Router, `app/` directory)
- **Tailwind CSS** (dark professional theme)
- **TypeScript**
- Client-side only in `/demo` — no auth, database, or API keys
