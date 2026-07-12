"use client";

import { useState } from "react";
import { DevNote } from "@/components/DevNote";
import {
  clients,
  documents,
  type Client,
  type DocStatus,
} from "@/lib/mock-data";

const STATUSES: DocStatus[] = [
  "Requested",
  "Received",
  "In Review",
  "Filed",
];

const statusColors: Record<DocStatus, string> = {
  Requested: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Received: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "In Review": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Filed: "bg-brand-500/20 text-brand-400 border-brand-500/30",
};

interface DocumentsPanelProps {
  showToast: (msg: string, type?: "success" | "info" | "warning") => void;
}

export function DocumentsPanel({ showToast }: DocumentsPanelProps) {
  const [docs, setDocs] = useState(documents);
  const [filter, setFilter] = useState<DocStatus | "All">("All");
  const [selectedDoc, setSelectedDoc] = useState<(typeof documents)[0] | null>(
    null
  );
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestClient, setRequestClient] = useState(clients[0].id);
  const [requestName, setRequestName] = useState("");

  const filtered =
    filter === "All" ? docs : docs.filter((d) => d.status === filter);

  const advanceStatus = (id: string) => {
    setDocs((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const idx = STATUSES.indexOf(d.status);
        const next = STATUSES[Math.min(idx + 1, STATUSES.length - 1)];
        return {
          ...d,
          status: next,
          receivedDate: next !== "Requested" ? "Jul 12, 2026" : d.receivedDate,
          daysPending: 0,
        };
      })
    );
    showToast("Document status advanced in pipeline");
    setSelectedDoc(null);
  };

  const sendReminder = (docName: string, clientName: string) => {
    showToast(
      `SMS reminder sent to ${clientName} for "${docName}"`,
      "info"
    );
  };

  const requestDocument = () => {
    const client = clients.find((c) => c.id === requestClient)!;
    const newDoc = {
      id: `d${Date.now()}`,
      clientId: client.id,
      clientName: client.name,
      name: requestName || "New document request",
      status: "Requested" as DocStatus,
      requestedDate: "Jul 12, 2026",
      daysPending: 0,
      category: "General",
    };
    setDocs((prev) => [newDoc, ...prev]);
    setShowRequestModal(false);
    setRequestName("");
    showToast(`Document request sent to ${client.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white">
            Document Tracker
            <DevNote note="Production: Supabase stores document records. Nightly cron (Vercel Cron or Supabase Edge) checks 'Requested' docs older than 3 days and fires Twilio SMS reminders automatically." />
          </h2>
          <p className="text-sm text-slate-400">
            Pipeline: Requested → Received → In Review → Filed
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowRequestModal(true)}
          className="btn-primary text-sm"
        >
          Request document
          <DevNote note="Production: Creates document record in Supabase and sends email via Resend with secure upload link to client portal." />
        </button>
      </div>

      {/* Pipeline summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATUSES.map((status) => {
          const count = docs.filter((d) => d.status === status).length;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`card p-4 text-left transition hover:border-brand-500/40 ${
                filter === status ? "border-brand-500/50" : ""
              }`}
            >
              <div className="text-2xl font-bold text-white">{count}</div>
              <div className="text-xs text-slate-500">{status}</div>
            </button>
          );
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {(["All", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              filter === s
                ? "bg-brand-500/20 text-brand-400"
                : "bg-surface-700 text-slate-400 hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-600 bg-surface-700/50 text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3">Document</th>
              <th className="hidden px-4 py-3 sm:table-cell">Client</th>
              <th className="px-4 py-3">Status</th>
              <th className="hidden px-4 py-3 md:table-cell">Requested</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((doc) => (
              <tr
                key={doc.id}
                className="border-b border-surface-600/50 transition hover:bg-surface-700/30"
              >
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(doc)}
                    className="text-left font-medium text-white hover:text-brand-400"
                  >
                    {doc.name}
                  </button>
                  <div className="text-xs text-slate-500 sm:hidden">
                    {doc.clientName}
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-slate-400 sm:table-cell">
                  {doc.clientName}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${statusColors[doc.status]}`}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
                  {doc.requestedDate}
                  {doc.daysPending > 3 && (
                    <span className="ml-2 text-amber-400">
                      ({doc.daysPending}d overdue)
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {doc.status !== "Filed" && (
                      <button
                        type="button"
                        onClick={() => advanceStatus(doc.id)}
                        className="text-xs text-brand-400 hover:text-brand-300"
                      >
                        Advance
                      </button>
                    )}
                    {doc.status === "Requested" && doc.daysPending >= 3 && (
                      <button
                        type="button"
                        onClick={() =>
                          sendReminder(doc.name, doc.clientName)
                        }
                        className="text-xs text-amber-400 hover:text-amber-300"
                      >
                        SMS
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="card w-full max-w-md animate-fade-in p-6">
            <h3 className="font-display text-lg font-bold text-white">
              {selectedDoc.name}
            </h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Client</dt>
                <dd className="text-white">{selectedDoc.clientName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Category</dt>
                <dd className="text-white">{selectedDoc.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Status</dt>
                <dd>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs ${statusColors[selectedDoc.status]}`}
                  >
                    {selectedDoc.status}
                  </span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Requested</dt>
                <dd className="text-white">{selectedDoc.requestedDate}</dd>
              </div>
              {selectedDoc.receivedDate && (
                <div className="flex justify-between">
                  <dt className="text-slate-500">Received</dt>
                  <dd className="text-white">{selectedDoc.receivedDate}</dd>
                </div>
              )}
            </dl>
            <div className="mt-6 flex gap-3">
              {selectedDoc.status !== "Filed" && (
                <button
                  type="button"
                  onClick={() => advanceStatus(selectedDoc.id)}
                  className="btn-primary flex-1 text-sm"
                >
                  Advance status
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="btn-secondary flex-1 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="card w-full max-w-md animate-fade-in p-6">
            <h3 className="font-display text-lg font-bold text-white">
              Request document
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs text-slate-500">Client</label>
                <select
                  value={requestClient}
                  onChange={(e) => setRequestClient(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500">Document name</label>
                <input
                  type="text"
                  value={requestName}
                  onChange={(e) => setRequestName(e.target.value)}
                  placeholder="e.g. 2025 W-2"
                  className="mt-1 w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white placeholder:text-slate-600"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={requestDocument}
                className="btn-primary flex-1 text-sm"
              >
                Send request
              </button>
              <button
                type="button"
                onClick={() => setShowRequestModal(false)}
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
