"use client";

import { useCallback, useState } from "react";

export interface ToastMessage {
  id: number;
  message: string;
  type: "success" | "info" | "warning";
}

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastMessage["type"] = "success") => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, dismissToast };
}

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
}) {
  if (toasts.length === 0) return null;

  const colors = {
    success: "border-brand-500/50 bg-brand-500/10 text-brand-300",
    info: "border-blue-500/50 bg-blue-500/10 text-blue-300",
    warning: "border-amber-500/50 bg-amber-500/10 text-amber-300",
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-slide-in flex items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-card ${colors[toast.type]}`}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-white"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
