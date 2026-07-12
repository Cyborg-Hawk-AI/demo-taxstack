"use client";

import { useState } from "react";
import { DevNote } from "@/components/DevNote";
import {
  clients,
  customFieldTemplates,
  entityOptions,
  type Client,
} from "@/lib/mock-data";

interface CustomFieldsPanelProps {
  showToast: (msg: string, type?: "success" | "info" | "warning") => void;
}

export function CustomFieldsPanel({ showToast }: CustomFieldsPanelProps) {
  const [clientList, setClientList] = useState(clients);
  const [selectedClient, setSelectedClient] = useState<Client>(clients[0]);
  const [fields, setFields] = useState(customFieldTemplates);
  const [showAddField, setShowAddField] = useState(false);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState("Text");
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    dependents: selectedClient.dependents,
    priorYearCarryover: selectedClient.priorYearCarryover,
    entityType: selectedClient.entityType,
    qbiEligible: true,
    fbar: false,
  });

  const selectClient = (client: Client) => {
    setSelectedClient(client);
    setEditForm({
      dependents: client.dependents,
      priorYearCarryover: client.priorYearCarryover,
      entityType: client.entityType,
      qbiEligible: client.entityType.includes("Corp") || client.entityType === "Schedule C",
      fbar: false,
    });
    setEditMode(false);
  };

  const saveClientFields = () => {
    setClientList((prev) =>
      prev.map((c) =>
        c.id === selectedClient.id
          ? {
              ...c,
              dependents: editForm.dependents,
              priorYearCarryover: editForm.priorYearCarryover,
              entityType: editForm.entityType,
            }
          : c
      )
    );
    setSelectedClient((prev) => ({
      ...prev,
      dependents: editForm.dependents,
      priorYearCarryover: editForm.priorYearCarryover,
      entityType: editForm.entityType,
    }));
    setEditMode(false);
    showToast(`Tax fields updated for ${selectedClient.name}`);
  };

  const addField = () => {
    if (!newFieldName.trim()) return;
    setFields((prev) => [
      ...prev,
      {
        id: `f${Date.now()}`,
        name: newFieldName,
        type: newFieldType,
        required: false,
      },
    ]);
    setShowAddField(false);
    setNewFieldName("");
    showToast(`Custom field "${newFieldName}" added to firm template`);
  };

  const toggleRequired = (id: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, required: !f.required } : f))
    );
    showToast("Field requirement toggled", "info");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-white">
          Custom Tax Fields
          <DevNote note="Production: JSONB column in Supabase clients table with firm-level field schema. TaxDome and generic CRMs lack these tax-specific data points — this is a key differentiator from the research." />
        </h2>
        <p className="text-sm text-slate-400">
          Dependents, carryovers, entity flags — built for tax prep, not generic CRM
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Field templates */}
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Firm field templates
              <DevNote note="Production: Firm admin configures schema once; applies to all clients. Supports Number, Currency, Select, Boolean types." />
            </h3>
            <button
              type="button"
              onClick={() => setShowAddField(true)}
              className="text-xs text-brand-400 hover:text-brand-300"
            >
              + Add field
            </button>
          </div>
          <div className="mt-4 space-y-2">
            {fields.map((field) => (
              <div
                key={field.id}
                className="flex items-center justify-between rounded-lg border border-surface-600 bg-surface-700/50 px-3 py-2"
              >
                <div>
                  <div className="text-sm text-white">{field.name}</div>
                  <div className="text-xs text-slate-500">{field.type}</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleRequired(field.id)}
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    field.required
                      ? "bg-brand-500/20 text-brand-400"
                      : "bg-surface-600 text-slate-500"
                  }`}
                >
                  {field.required ? "Required" : "Optional"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Client data */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-white">
            Client data
            <DevNote note="Production: Per-client values stored in custom_fields JSONB. Exported with return prep data. Replaces spreadsheets TaxDome users currently maintain." />
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {clientList.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => selectClient(c)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  selectedClient.id === c.id
                    ? "bg-brand-500/20 text-brand-400"
                    : "bg-surface-700 text-slate-400 hover:text-white"
                }`}
              >
                {c.name.split(" ")[0]}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {editMode ? (
              <>
                <div>
                  <label className="text-xs text-slate-500">Entity type</label>
                  <select
                    value={editForm.entityType}
                    onChange={(e) =>
                      setEditForm({ ...editForm, entityType: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white"
                  >
                    {entityOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-500">Dependents</label>
                  <input
                    type="number"
                    value={editForm.dependents}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        dependents: parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500">
                    Prior-year carryover ($)
                  </label>
                  <input
                    type="number"
                    value={editForm.priorYearCarryover}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        priorYearCarryover: parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-slate-400">
                    <input
                      type="checkbox"
                      checked={editForm.qbiEligible}
                      onChange={(e) =>
                        setEditForm({ ...editForm, qbiEligible: e.target.checked })
                      }
                      className="rounded"
                    />
                    QBI eligible
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-400">
                    <input
                      type="checkbox"
                      checked={editForm.fbar}
                      onChange={(e) =>
                        setEditForm({ ...editForm, fbar: e.target.checked })
                      }
                      className="rounded"
                    />
                    FBAR required
                  </label>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={saveClientFields}
                    className="btn-primary flex-1 text-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="btn-secondary flex-1 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Entity type</dt>
                    <dd className="text-white">{selectedClient.entityType}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Dependents</dt>
                    <dd className="text-white">{selectedClient.dependents}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Prior-year carryover</dt>
                    <dd className="text-white">
                      ${selectedClient.priorYearCarryover.toLocaleString()}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Revenue</dt>
                    <dd className="text-white">
                      ${selectedClient.revenue.toLocaleString()}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Assigned to</dt>
                    <dd className="text-white">{selectedClient.assignedTo}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="btn-secondary w-full text-sm"
                >
                  Edit tax fields
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showAddField && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="card w-full max-w-sm animate-fade-in p-6">
            <h3 className="font-display text-lg font-bold text-white">
              Add custom field
            </h3>
            <div className="mt-4 space-y-4">
              <input
                type="text"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="Field name"
                className="w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white"
              />
              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value)}
                className="w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white"
              >
                <option>Text</option>
                <option>Number</option>
                <option>Currency</option>
                <option>Boolean</option>
                <option>Select</option>
              </select>
            </div>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={addField} className="btn-primary flex-1 text-sm">
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAddField(false)}
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
