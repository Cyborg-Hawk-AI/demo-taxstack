"use client";

import { useState } from "react";
import Link from "next/link";
import { ToastContainer, useToast } from "@/components/demo/Toast";
import { DashboardPanel } from "@/components/demo/DashboardPanel";
import { PortalPanel } from "@/components/demo/PortalPanel";
import { SignaturePanel } from "@/components/demo/SignaturePanel";
import { SchedulingPanel } from "@/components/demo/SchedulingPanel";
import { DocumentsPanel } from "@/components/demo/DocumentsPanel";
import { CustomFieldsPanel } from "@/components/demo/CustomFieldsPanel";
import { OnboardingPanel } from "@/components/demo/OnboardingPanel";
import { DevNote } from "@/components/DevNote";

const SECTIONS = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "portal", label: "Client Portal", icon: "👤" },
  { id: "signatures", label: "E-Signature", icon: "✍️" },
  { id: "scheduling", label: "Scheduling", icon: "📅" },
  { id: "documents", label: "Documents", icon: "📄" },
  { id: "fields", label: "Tax Fields", icon: "📋" },
  { id: "onboarding", label: "Onboarding", icon: "✉️" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export function DemoApp() {
  const [activeSection, setActiveSection] = useState<SectionId>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "bot" | "user"; text: string }[]
  >([
    {
      role: "bot",
      text: "Hi! I'm TaxStack's AI assistant. Ask me about document uploads, scheduling, or e-signatures.",
    },
  ]);
  const { toasts, showToast, dismissToast } = useToast();

  const navigate = (section: string) => {
    setActiveSection(section as SectionId);
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    setTimeout(() => {
      const responses: Record<string, string> = {
        default:
          "You can upload documents through your client portal. Click 'Documents' in the sidebar to track status. Need human help? I'll escalate to the firm owner.",
        sign: "E-signatures work in-browser — no DocuSign account needed. Go to E-Signature to send or sign documents.",
        schedule:
          "Book appointments via the Scheduling tab. You'll get SMS reminders 24 hours and 1 hour before.",
        upload:
          "Switch to Client view in the Portal tab to simulate uploading. Files go directly to your preparer.",
      };
      const key = userMsg.toLowerCase().includes("sign")
        ? "sign"
        : userMsg.toLowerCase().includes("schedule") || userMsg.toLowerCase().includes("appointment")
          ? "schedule"
          : userMsg.toLowerCase().includes("upload")
            ? "upload"
            : "default";
      setChatMessages((prev) => [
        ...prev,
        { role: "bot", text: responses[key] },
      ]);
    }, 600);
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] bg-surface-900">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-56" : "w-16"
        } shrink-0 border-r border-surface-600 bg-surface-800 transition-all`}
      >
        <div className="flex items-center justify-between border-b border-surface-600 p-4">
          {sidebarOpen && (
            <div>
              <div className="font-display text-sm font-bold text-white">
                Chen Tax Services
              </div>
              <div className="text-[10px] text-slate-500">TaxStack demo</div>
            </div>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded p-1 text-slate-400 hover:bg-surface-700 hover:text-white"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>
        <nav className="p-2">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => {
                setActiveSection(section.id);
                showToast(`Opened ${section.label}`, "info");
              }}
              className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                activeSection === section.id
                  ? "bg-brand-500/20 text-brand-400"
                  : "text-slate-400 hover:bg-surface-700 hover:text-white"
              }`}
            >
              <span>{section.icon}</span>
              {sidebarOpen && <span>{section.label}</span>}
            </button>
          ))}
        </nav>
        {sidebarOpen && (
          <div className="border-t border-surface-600 p-4">
            <Link
              href="/developers"
              className="text-xs text-slate-500 hover:text-brand-400"
            >
              Developer docs →
            </Link>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-surface-600 bg-surface-800/50 px-6 py-3">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-lg font-bold text-white">
              {SECTIONS.find((s) => s.id === activeSection)?.label}
            </h1>
            <span className="rounded-full bg-brand-500/20 px-2 py-0.5 text-[10px] font-medium text-brand-400">
              DEMO
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => showToast("Notifications refreshed", "info")}
              className="relative rounded-lg p-2 text-slate-400 hover:bg-surface-700 hover:text-white"
            >
              🔔
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-amber-500" />
            </button>
            <button
              type="button"
              onClick={() => setShowChat(!showChat)}
              className="btn-secondary text-xs py-1.5"
            >
              AI Support
              <DevNote note="Production: OpenAI-powered chat widget trained on help docs. Escalations (<2/week) route to shared inbox. Handles 95%+ of support without owner involvement." />
            </button>
            <div className="flex items-center gap-2 rounded-lg bg-surface-700 px-3 py-1.5">
              <div className="h-6 w-6 rounded-full bg-brand-500/30 text-center text-xs leading-6 text-brand-400">
                JC
              </div>
              <span className="hidden text-sm text-slate-300 sm:inline">
                Jamie Chen
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {activeSection === "dashboard" && (
            <DashboardPanel showToast={showToast} onNavigate={navigate} />
          )}
          {activeSection === "portal" && <PortalPanel showToast={showToast} />}
          {activeSection === "signatures" && (
            <SignaturePanel showToast={showToast} />
          )}
          {activeSection === "scheduling" && (
            <SchedulingPanel showToast={showToast} />
          )}
          {activeSection === "documents" && (
            <DocumentsPanel showToast={showToast} />
          )}
          {activeSection === "fields" && (
            <CustomFieldsPanel showToast={showToast} />
          )}
          {activeSection === "onboarding" && (
            <OnboardingPanel showToast={showToast} />
          )}
        </div>
      </div>

      {/* AI Chat widget */}
      {showChat && (
        <div className="fixed bottom-4 left-4 z-50 w-80 animate-fade-in">
          <div className="card flex max-h-96 flex-col overflow-hidden shadow-glow">
            <div className="flex items-center justify-between border-b border-surface-600 px-4 py-3">
              <span className="text-sm font-semibold text-white">
                TaxStack AI Support
              </span>
              <button
                type="button"
                onClick={() => setShowChat(false)}
                className="text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`rounded-lg px-3 py-2 text-xs ${
                    msg.role === "bot"
                      ? "bg-surface-700 text-slate-300"
                      : "ml-8 bg-brand-500/20 text-brand-300"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="border-t border-surface-600 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendChat()}
                  placeholder="Ask a question..."
                  className="flex-1 rounded-lg border border-surface-500 bg-surface-700 px-3 py-1.5 text-xs text-white placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={sendChat}
                  className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-400"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
