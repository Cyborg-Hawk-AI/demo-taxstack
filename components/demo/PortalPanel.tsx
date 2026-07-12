"use client";

import { useState } from "react";
import { DevNote } from "@/components/DevNote";
import { clients, documents, activities } from "@/lib/mock-data";

interface PortalPanelProps {
  showToast: (msg: string, type?: "success" | "info" | "warning") => void;
}

export function PortalPanel({ showToast }: PortalPanelProps) {
  const [portalClient, setPortalClient] = useState(clients[0]);
  const [viewAs, setViewAs] = useState<"preparer" | "client">("preparer");
  const [uploadFile, setUploadFile] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");

  const clientDocs = documents.filter((d) => d.clientId === portalClient.id);

  const handleUpload = () => {
    if (!uploadFile.trim()) {
      showToast("Enter a file name to simulate upload", "warning");
      return;
    }
    showToast(`"${uploadFile}" uploaded to ${portalClient.name}'s portal`);
    setUploadFile("");
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    showToast(`Message sent to ${portalClient.name}`);
    setShowMessageModal(false);
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white">
            Client Portal
            <DevNote note="Production: Magic-link auth per client (no passwords). Branded portal subdomain per firm. Clients see only their documents, appointments, and messages." />
          </h2>
          <p className="text-sm text-slate-400">
            Secure client-facing hub — documents, messages, appointments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setViewAs(viewAs === "preparer" ? "client" : "preparer");
              showToast(
                `Switched to ${viewAs === "preparer" ? "client" : "preparer"} view`,
                "info"
              );
            }}
            className="btn-secondary text-sm"
          >
            View as: {viewAs === "preparer" ? "Preparer" : "Client"}
            <DevNote note="Production: Preparer can preview client portal. Client accesses via email magic link." />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {clients.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setPortalClient(c)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              portalClient.id === c.id
                ? "bg-brand-500/20 text-brand-400"
                : "bg-surface-700 text-slate-400 hover:text-white"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Client profile card */}
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/20 text-lg font-bold text-brand-400">
              {portalClient.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-white">{portalClient.name}</div>
              <div className="text-xs text-slate-500">{portalClient.company}</div>
            </div>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Email</dt>
              <dd className="text-slate-300">{portalClient.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Status</dt>
              <dd>
                <span className="rounded-full bg-brand-500/20 px-2 py-0.5 text-xs text-brand-400">
                  {portalClient.status}
                </span>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Preparer</dt>
              <dd className="text-slate-300">{portalClient.assignedTo}</dd>
            </div>
          </dl>
          {viewAs === "preparer" && (
            <button
              type="button"
              onClick={() => setShowMessageModal(true)}
              className="btn-secondary mt-4 w-full text-sm"
            >
              Send message
              <DevNote note="Production: In-app messaging with email notification via Resend. Thread stored in Supabase." />
            </button>
          )}
        </div>

        {/* Documents for client */}
        <div className="card p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-white">
            {viewAs === "client" ? "Your documents" : "Client documents"}
          </h3>
          <div className="mt-4 space-y-2">
            {clientDocs.length > 0 ? (
              clientDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-lg border border-surface-600 bg-surface-700/50 px-3 py-2"
                >
                  <div>
                    <div className="text-sm text-white">{doc.name}</div>
                    <div className="text-xs text-slate-500">{doc.category}</div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      doc.status === "Filed"
                        ? "bg-brand-500/20 text-brand-400"
                        : doc.status === "Requested"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No documents yet for this client.</p>
            )}
          </div>

          {viewAs === "client" && (
            <div className="mt-4 border-t border-surface-600 pt-4">
              <label className="text-xs text-slate-500">Upload document</label>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={uploadFile}
                  onChange={(e) => setUploadFile(e.target.value)}
                  placeholder="e.g. 2025_W2.pdf"
                  className="flex-1 rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={handleUpload}
                  className="btn-primary text-sm"
                >
                  Upload
                  <DevNote note="Production: Direct upload to Supabase Storage with virus scan. Updates document status to 'Received' and notifies preparer." />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activity feed */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-white">Recent activity</h3>
        <div className="mt-4 space-y-3">
          {activities.slice(0, 4).map((act) => (
            <div key={act.id} className="flex items-start gap-3 text-sm">
              <div
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                  act.type === "signature"
                    ? "bg-purple-500/20 text-purple-400"
                    : act.type === "document"
                      ? "bg-blue-500/20 text-blue-400"
                      : act.type === "email"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-brand-500/20 text-brand-400"
                }`}
              >
                {act.type === "signature"
                  ? "✍"
                  : act.type === "document"
                    ? "📄"
                    : act.type === "email"
                      ? "✉"
                      : "📅"}
              </div>
              <div>
                <div className="text-slate-300">{act.message}</div>
                <div className="text-xs text-slate-500">
                  {act.client} · {act.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="card w-full max-w-md animate-fade-in p-6">
            <h3 className="font-display text-lg font-bold text-white">
              Message {portalClient.name}
            </h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Type your message..."
              className="mt-4 w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white placeholder:text-slate-600"
            />
            <div className="mt-4 flex gap-3">
              <button type="button" onClick={sendMessage} className="btn-primary flex-1 text-sm">
                Send
              </button>
              <button
                type="button"
                onClick={() => setShowMessageModal(false)}
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
