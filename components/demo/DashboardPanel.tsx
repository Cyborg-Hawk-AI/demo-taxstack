"use client";

import { DevNote } from "@/components/DevNote";
import {
  clients,
  documents,
  activities,
  pipelineStats,
  monthlyRevenue,
  appointments,
} from "@/lib/mock-data";

interface DashboardPanelProps {
  showToast: (msg: string, type?: "success" | "info" | "warning") => void;
  onNavigate: (section: string) => void;
}

export function DashboardPanel({ showToast, onNavigate }: DashboardPanelProps) {
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.amount));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-white">
          Practice Dashboard
          <DevNote note="Production: Real-time aggregates from Supabase. Revenue from Stripe subscription data. Pipeline counts from documents table." />
        </h2>
        <p className="text-sm text-slate-400">
          Chen Tax Services · Tax season 2025
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "Active clients",
            value: clients.filter((c) => c.status === "Active").length,
            action: () => onNavigate("portal"),
          },
          {
            label: "Docs pending",
            value: pipelineStats.requested + pipelineStats.received,
            action: () => onNavigate("documents"),
          },
          {
            label: "Appointments this week",
            value: appointments.length,
            action: () => onNavigate("scheduling"),
          },
          {
            label: "Onboarding",
            value: clients.filter((c) => c.status === "Onboarding").length,
            action: () => onNavigate("onboarding"),
          },
        ].map((kpi) => (
          <button
            key={kpi.label}
            type="button"
            onClick={() => {
              kpi.action();
              showToast(`Navigated to ${kpi.label.toLowerCase()}`, "info");
            }}
            className="card p-4 text-left transition hover:border-brand-500/40"
          >
            <div className="text-2xl font-bold text-white">{kpi.value}</div>
            <div className="text-xs text-slate-500">{kpi.label}</div>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue chart */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-white">
            Monthly revenue
            <DevNote note="Production: Pulled from Stripe billing API. Shows firm revenue, not client tax data." />
          </h3>
          <div className="mt-6 flex items-end gap-2 h-40">
            {monthlyRevenue.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-brand-500/60 transition hover:bg-brand-500"
                  style={{ height: `${(m.amount / maxRevenue) * 100}%` }}
                  title={`$${m.amount.toLocaleString()}`}
                />
                <span className="text-[10px] text-slate-500">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-white">
            Document pipeline
            <DevNote note="Production: Live counts from documents table grouped by status. Click to filter in Documents view." />
          </h3>
          <div className="mt-4 space-y-3">
            {(
              [
                ["Requested", pipelineStats.requested, "bg-amber-500"],
                ["Received", pipelineStats.received, "bg-blue-500"],
                ["In Review", pipelineStats.inReview, "bg-purple-500"],
                ["Filed", pipelineStats.filed, "bg-brand-500"],
              ] as const
            ).map(([label, count, color]) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  onNavigate("documents");
                  showToast(`Filtering by ${label}`, "info");
                }}
                className="flex w-full items-center gap-3"
              >
                <div className="w-20 text-xs text-slate-400">{label}</div>
                <div className="flex-1 rounded-full bg-surface-600 h-2">
                  <div
                    className={`h-2 rounded-full ${color}`}
                    style={{
                      width: `${(count / documents.length) * 100}%`,
                      minWidth: count > 0 ? "8px" : "0",
                    }}
                  />
                </div>
                <div className="w-6 text-right text-sm text-white">{count}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity + clients */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-white">Recent activity</h3>
          <div className="mt-4 space-y-3">
            {activities.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <div className="text-slate-300">{act.message}</div>
                  <div className="text-xs text-slate-500">{act.client}</div>
                </div>
                <span className="text-xs text-slate-600">{act.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold text-white">Client roster</h3>
          <div className="mt-4 space-y-2">
            {clients.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onNavigate("portal");
                  showToast(`Viewing ${c.name}'s portal`, "info");
                }}
                className="flex w-full items-center justify-between rounded-lg border border-surface-600 bg-surface-700/30 px-3 py-2 text-left transition hover:border-brand-500/30"
              >
                <div>
                  <div className="text-sm font-medium text-white">{c.name}</div>
                  <div className="text-xs text-slate-500">{c.entityType}</div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    c.status === "Active"
                      ? "bg-brand-500/20 text-brand-400"
                      : c.status === "Onboarding"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-slate-500/20 text-slate-400"
                  }`}
                >
                  {c.status}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
