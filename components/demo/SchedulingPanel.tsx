"use client";

import { useState } from "react";
import { DevNote } from "@/components/DevNote";
import { appointments, clients } from "@/lib/mock-data";

interface SchedulingPanelProps {
  showToast: (msg: string, type?: "success" | "info" | "warning") => void;
}

export function SchedulingPanel({ showToast }: SchedulingPanelProps) {
  const [appts, setAppts] = useState(appointments);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookClient, setBookClient] = useState(clients[0].id);
  const [bookDate, setBookDate] = useState("Jul 19, 2026");
  const [bookTime, setBookTime] = useState("10:00 AM");
  const [bookType, setBookType] = useState("Tax review");
  const [selectedAppt, setSelectedAppt] = useState<(typeof appointments)[0] | null>(null);

  const sendReminder = (appt: (typeof appointments)[0], type: string) => {
    setAppts((prev) =>
      prev.map((a) =>
        a.id === appt.id
          ? { ...a, remindersSent: [...a.remindersSent, type] }
          : a
      )
    );
    showToast(`${type} reminder sent to ${appt.clientName}`, "info");
  };

  const confirmAppt = (id: string) => {
    setAppts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "Confirmed" as const } : a
      )
    );
    showToast("Appointment confirmed");
    setSelectedAppt(null);
  };

  const bookAppointment = () => {
    const client = clients.find((c) => c.id === bookClient)!;
    const newAppt = {
      id: `a${Date.now()}`,
      clientName: client.name,
      clientEmail: client.email,
      date: bookDate,
      time: bookTime,
      type: bookType,
      status: "Confirmed" as const,
      remindersSent: [],
      preparer: "Jamie Chen",
    };
    setAppts((prev) => [...prev, newAppt].sort((a, b) => a.date.localeCompare(b.date)));
    setShowBookModal(false);
    showToast(`Appointment booked for ${client.name} on ${bookDate}`);
  };

  const weekDays = ["Mon 14", "Tue 15", "Wed 16", "Thu 17", "Fri 18"];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white">
            Appointment Scheduling
            <DevNote note="Production: Cal.com embed for booking. Webhooks trigger 24-hour and 1-hour SMS reminders via Twilio automatically. Email reminders via Resend as fallback." />
          </h2>
          <p className="text-sm text-slate-400">
            Bookings with automated email/SMS reminders
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setView(view === "list" ? "calendar" : "list")}
            className="btn-secondary text-sm"
          >
            {view === "list" ? "Calendar view" : "List view"}
          </button>
          <button
            type="button"
            onClick={() => setShowBookModal(true)}
            className="btn-primary text-sm"
          >
            Book appointment
            <DevNote note="Production: Creates Cal.com booking, syncs to Supabase, schedules reminder jobs." />
          </button>
        </div>
      </div>

      {view === "calendar" ? (
        <div className="card p-5">
          <div className="grid grid-cols-5 gap-2">
            {weekDays.map((day) => {
              const dayAppts = appts.filter((a) => a.date.includes(day.split(" ")[1]));
              return (
                <div key={day} className="min-h-[120px] rounded-lg border border-surface-600 bg-surface-700/30 p-2">
                  <div className="text-xs font-semibold text-slate-400">{day}</div>
                  {dayAppts.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setSelectedAppt(a)}
                      className="mt-1 block w-full rounded bg-brand-500/20 px-1.5 py-1 text-left text-[10px] text-brand-300 hover:bg-brand-500/30"
                    >
                      {a.time} {a.clientName.split(" ")[0]}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-600 bg-surface-700/50 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Date & Time</th>
                <th className="hidden px-4 py-3 sm:table-cell">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Reminders</th>
              </tr>
            </thead>
            <tbody>
              {appts.map((appt) => (
                <tr
                  key={appt.id}
                  className="border-b border-surface-600/50 transition hover:bg-surface-700/30"
                >
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setSelectedAppt(appt)}
                      className="font-medium text-white hover:text-brand-400"
                    >
                      {appt.clientName}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {appt.date} · {appt.time}
                  </td>
                  <td className="hidden px-4 py-3 text-slate-400 sm:table-cell">
                    {appt.type}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        appt.status === "Confirmed"
                          ? "bg-brand-500/20 text-brand-400"
                          : appt.status === "Pending"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-slate-500/20 text-slate-400"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {appt.remindersSent.map((r) => (
                        <span
                          key={r}
                          className="rounded bg-surface-600 px-1.5 py-0.5 text-[10px] text-slate-400"
                        >
                          {r}
                        </span>
                      ))}
                      {!appt.remindersSent.includes("24h SMS") && (
                        <button
                          type="button"
                          onClick={() => sendReminder(appt, "24h SMS")}
                          className="text-[10px] text-brand-400 hover:text-brand-300"
                        >
                          +24h
                        </button>
                      )}
                      {!appt.remindersSent.includes("1h SMS") && (
                        <button
                          type="button"
                          onClick={() => sendReminder(appt, "1h SMS")}
                          className="text-[10px] text-brand-400 hover:text-brand-300"
                        >
                          +1h
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="card w-full max-w-md animate-fade-in p-6">
            <h3 className="font-display text-lg font-bold text-white">
              {selectedAppt.clientName}
            </h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">When</dt>
                <dd className="text-white">
                  {selectedAppt.date} at {selectedAppt.time}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Type</dt>
                <dd className="text-white">{selectedAppt.type}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Preparer</dt>
                <dd className="text-white">{selectedAppt.preparer}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Email</dt>
                <dd className="text-white">{selectedAppt.clientEmail}</dd>
              </div>
            </dl>
            <div className="mt-6 flex gap-3">
              {selectedAppt.status === "Pending" && (
                <button
                  type="button"
                  onClick={() => confirmAppt(selectedAppt.id)}
                  className="btn-primary flex-1 text-sm"
                >
                  Confirm
                </button>
              )}
              <button
                type="button"
                onClick={() => sendReminder(selectedAppt, "24h email")}
                className="btn-secondary flex-1 text-sm"
              >
                Send reminder
              </button>
              <button
                type="button"
                onClick={() => setSelectedAppt(null)}
                className="btn-secondary text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="card w-full max-w-md animate-fade-in p-6">
            <h3 className="font-display text-lg font-bold text-white">
              Book appointment
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs text-slate-500">Client</label>
                <select
                  value={bookClient}
                  onChange={(e) => setBookClient(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500">Date</label>
                  <select
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white"
                  >
                    <option>Jul 19, 2026</option>
                    <option>Jul 20, 2026</option>
                    <option>Jul 21, 2026</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-500">Time</label>
                  <select
                    value={bookTime}
                    onChange={(e) => setBookTime(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white"
                  >
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>2:00 PM</option>
                    <option>3:30 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500">Appointment type</label>
                <select
                  value={bookType}
                  onChange={(e) => setBookType(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-surface-500 bg-surface-700 px-3 py-2 text-sm text-white"
                >
                  <option>Tax review</option>
                  <option>Onboarding intake</option>
                  <option>Quarterly check-in</option>
                  <option>Document review</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={bookAppointment}
                className="btn-primary flex-1 text-sm"
              >
                Book
              </button>
              <button
                type="button"
                onClick={() => setShowBookModal(false)}
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
