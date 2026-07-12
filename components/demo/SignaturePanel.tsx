"use client";

import { useState } from "react";
import { DevNote } from "@/components/DevNote";
import { signatureRequests, clients } from "@/lib/mock-data";

interface SignaturePanelProps {
  showToast: (msg: string, type?: "success" | "info" | "warning") => void;
}

export function SignaturePanel({ showToast }: SignaturePanelProps) {
  const [requests, setRequests] = useState(signatureRequests);
  const [signingDoc, setSigningDoc] = useState<(typeof signatureRequests)[0] | null>(null);
  const [signatureText, setSignatureText] = useState("");
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendClient, setSendClient] = useState(clients[0].id);
  const [sendDocName, setSendDocName] = useState("Engagement Letter 2026");

  const completeSign = () => {
    if (!signingDoc || !signatureText.trim()) {
      showToast("Please type your full name to sign", "warning");
      return;
    }
    setRequests((prev) =>
      prev.map((r) =>
        r.id === signingDoc.id
          ? { ...r, status: "Signed" as const, signedDate: "Jul 12, 2026" }
          : r
      )
    );
    showToast(`${signingDoc.document} signed successfully`);
    setSigningDoc(null);
    setSignatureText("");
  };

  const sendForSignature = () => {
    const client = clients.find((c) => c.id === sendClient)!;
    const newReq = {
      id: `s${Date.now()}`,
      clientName: client.name,
      document: sendDocName,
      status: "Pending" as const,
      sentDate: "Jul 12, 2026",
    };
    setRequests((prev) => [newReq, ...prev]);
    setShowSendModal(false);
    showToast(`Signature request sent to ${client.email}`);
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Pending: "bg-amber-500/20 text-amber-400",
      Viewed: "bg-blue-500/20 text-blue-400",
      Signed: "bg-brand-500/20 text-brand-400",
    };
    return colors[status] || "";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white">
            E-Signature
            <DevNote note="Production: DocuSeal (open-source) or custom signing flow. PDF stored in Supabase Storage; signature events logged with timestamp and IP. No DocuSign API dependency." />
          </h2>
          <p className="text-sm text-slate-400">
            Built-in signing — engagement letters, Form 8879, and more
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowSendModal(true)}
          className="btn-primary text-sm"
        >
          Send for signature
          <DevNote note="Production: Generates signing link, emails client via Resend, tracks view/sign events in real time." />
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Preparer view */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-400">
            Preparer dashboard
          </h3>
          <div className="mt-4 space-y-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between rounded-lg border border-surface-600 bg-surface-700/50 p-3"
              >
                <div>
                  <div className="font-medium text-white">{req.document}</div>
                  <div className="text-xs text-slate-500">{req.clientName}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge(req.status)}`}
                  >
                    {req.status}
                  </span>
                  {(req.status === "Pending" || req.status === "Viewed") && (
                    <button
                      type="button"
                      onClick={() => {
                        setSigningDoc(req);
                        showToast("Switched to client signing view", "info");
                      }}
                      className="text-xs text-brand-400 hover:text-brand-300"
                    >
                      Preview sign
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client portal preview */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-400">
            Client portal preview
            <DevNote note="Production: Clients access via magic link (no password). Mobile-friendly signing UI with audit trail." />
          </h3>
          {signingDoc ? (
            <div className="mt-4 animate-fade-in">
              <div className="rounded-lg border border-surface-500 bg-white p-4 text-slate-900">
                <div className="text-xs font-semibold uppercase text-slate-500">
                  {signingDoc.document}
                </div>
                <p className="mt-3 text-sm leading-relaxed">
                  I, the undersigned, authorize Chen Tax Services to prepare
                  and file my 2025 federal and state tax returns. I confirm
                  all information provided is accurate to the best of my
                  knowledge.
                </p>
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <label className="text-xs text-slate-500">
                    Type your full legal name to sign
                  </label>
                  <input
                    type="text"
                    value={signatureText}
                    onChange={(e) => setSignatureText(e.target.value)}
                    placeholder="Full legal name"
                    className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={completeSign}
                    className="mt-3 w-full rounded-lg bg-emerald-600 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                  >
                    Sign document
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSigningDoc(null)}
                className="mt-3 text-xs text-slate-500 hover:text-white"
              >
                ← Back to list
              </button>
            </div>
          ) : (
            <div className="mt-8 text-center text-sm text-slate-500">
              Click &ldquo;Preview sign&rdquo; on a pending document to simulate
              the client signing experience.
            </div>
          )}
        </div>
      </div>

      {showSendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="card w-full max-w-md animate-fade-in p-6">
            <h3 className="font-display text-lg font-bold text-white">
              Send for signature
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs text-slate-500">Client</label>
                <select
                  value={sendClient}
                  onChange={(e) => setSendClient(e.target.value)}
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
                <label className="text-xs text-slate-500">Document</label>
                <select
                  value={sendDocName}
                  onChange={(e) => setSendDocName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white"
                >
                  <option>Engagement Letter 2026</option>
                  <option>IRS Form 8879 Authorization</option>
                  <option>Corporate Engagement Agreement</option>
                  <option>Power of Attorney (Form 2848)</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={sendForSignature}
                className="btn-primary flex-1 text-sm"
              >
                Send
              </button>
              <button
                type="button"
                onClick={() => setShowSendModal(false)}
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
