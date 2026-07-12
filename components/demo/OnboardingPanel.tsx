"use client";

import { useState } from "react";
import { DevNote } from "@/components/DevNote";
import { onboardingEmails } from "@/lib/mock-data";

interface OnboardingPanelProps {
  showToast: (msg: string, type?: "success" | "info" | "warning") => void;
}

const EMAIL_SEQUENCE = [
  { step: 1, subject: "Welcome to Chen Tax Services — let's get started", delay: "Immediate" },
  { step: 2, subject: "Your document checklist for 2025 filing", delay: "Day 1" },
  { step: 3, subject: "Schedule your onboarding call", delay: "Day 2" },
  { step: 4, subject: "Reminder: documents still needed", delay: "Day 5" },
];

export function OnboardingPanel({ showToast }: OnboardingPanelProps) {
  const [emails, setEmails] = useState(onboardingEmails);
  const [showNewClient, setShowNewClient] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [selectedEmail, setSelectedEmail] = useState<(typeof onboardingEmails)[0] | null>(null);
  const [filterClient, setFilterClient] = useState("All");

  const filteredEmails =
    filterClient === "All"
      ? emails
      : emails.filter((e) => e.clientName === filterClient);

  const uniqueClients = Array.from(new Set(emails.map((e) => e.clientName)));

  const createClient = () => {
    if (!newName.trim() || !newEmail.trim()) {
      showToast("Please fill in name and email", "warning");
      return;
    }
    const newEmails = EMAIL_SEQUENCE.slice(0, 3).map((seq, i) => ({
      id: `e${Date.now()}-${i}`,
      clientName: newName,
      step: seq.step,
      subject: seq.subject,
      status: i === 0 ? ("Sent" as const) : ("Scheduled" as const),
      sentAt: i === 0 ? "Just now" : `Scheduled: ${seq.delay}`,
    }));
    setEmails((prev) => [...newEmails, ...prev]);
    setShowNewClient(false);
    setNewName("");
    setNewEmail("");
    showToast(
      `New client "${newName}" created — welcome email sequence triggered via Resend`
    );
  };

  const resendEmail = (email: (typeof onboardingEmails)[0]) => {
    setEmails((prev) =>
      prev.map((e) =>
        e.id === email.id ? { ...e, status: "Sent" as const, sentAt: "Just now" } : e
      )
    );
    showToast(`Email resent to ${email.clientName}`, "info");
    setSelectedEmail(null);
  };

  const statusColor = (status: string) => {
    const colors: Record<string, string> = {
      Sent: "text-slate-400",
      Scheduled: "text-amber-400",
      Opened: "text-blue-400",
      Clicked: "text-brand-400",
    };
    return colors[status] || "text-slate-400";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white">
            Client Onboarding Automation
            <DevNote note="Production: Stripe subscription webhook → Supabase Edge Function creates client record → Resend fires 4-email sequence over 5 days. Zero human touch." />
          </h2>
          <p className="text-sm text-slate-400">
            Automated checklist emails triggered on new client creation
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowNewClient(true)}
          className="btn-primary text-sm"
        >
          + New client
          <DevNote note="Production: Mirrors Stripe checkout completion. Creates client, assigns preparer, queues email sequence, requests initial documents." />
        </button>
      </div>

      {/* Sequence preview */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-white">
          Email sequence template
          <DevNote note="Production: Templates stored in Resend. Open/click tracking via Resend webhooks updates status in Supabase." />
        </h3>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          {EMAIL_SEQUENCE.map((seq, i) => (
            <div key={seq.step} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 text-xs font-bold text-brand-400">
                {seq.step}
              </div>
              <div className="text-xs">
                <div className="text-white">{seq.subject.slice(0, 30)}…</div>
                <div className="text-slate-500">{seq.delay}</div>
              </div>
              {i < EMAIL_SEQUENCE.length - 1 && (
                <span className="hidden text-slate-600 sm:inline">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilterClient("All")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
            filterClient === "All"
              ? "bg-brand-500/20 text-brand-400"
              : "bg-surface-700 text-slate-400"
          }`}
        >
          All clients
        </button>
        {uniqueClients.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setFilterClient(name)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
              filterClient === name
                ? "bg-brand-500/20 text-brand-400"
                : "bg-surface-700 text-slate-400"
            }`}
          >
            {name.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Email log */}
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-600 bg-surface-700/50 text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Step</th>
              <th className="hidden px-4 py-3 sm:table-cell">Subject</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Sent</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmails.map((email) => (
              <tr
                key={email.id}
                className="border-b border-surface-600/50 transition hover:bg-surface-700/30"
              >
                <td className="px-4 py-3 font-medium text-white">
                  {email.clientName}
                </td>
                <td className="px-4 py-3 text-slate-400">#{email.step}</td>
                <td className="hidden px-4 py-3 text-slate-400 sm:table-cell">
                  <button
                    type="button"
                    onClick={() => setSelectedEmail(email)}
                    className="hover:text-brand-400"
                  >
                    {email.subject}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium ${statusColor(email.status)}`}>
                    {email.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {email.sentAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="card w-full max-w-lg animate-fade-in p-6">
            <h3 className="font-display text-lg font-bold text-white">
              Email preview
            </h3>
            <div className="mt-4 rounded-lg border border-surface-600 bg-surface-700/50 p-4 text-sm">
              <div className="text-xs text-slate-500">To: {selectedEmail.clientName}</div>
              <div className="mt-2 font-medium text-white">{selectedEmail.subject}</div>
              <p className="mt-3 leading-relaxed text-slate-400">
                Hi {selectedEmail.clientName.split(" ")[0]}, welcome to Chen Tax
                Services! We&apos;re excited to work with you this tax season.
                Please review the attached document checklist and upload your
                documents through your secure client portal.
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => resendEmail(selectedEmail)}
                className="btn-primary flex-1 text-sm"
              >
                Resend
              </button>
              <button
                type="button"
                onClick={() => setSelectedEmail(null)}
                className="btn-secondary flex-1 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="card w-full max-w-md animate-fade-in p-6">
            <h3 className="font-display text-lg font-bold text-white">
              Create new client
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Triggers automated onboarding email sequence
            </p>
            <div className="mt-4 space-y-4">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Client name"
                className="w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white placeholder:text-slate-600"
              />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white placeholder:text-slate-600"
              />
            </div>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={createClient} className="btn-primary flex-1 text-sm">
                Create & send welcome
              </button>
              <button
                type="button"
                onClick={() => setShowNewClient(false)}
                className="btn-secondary flex-1 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
