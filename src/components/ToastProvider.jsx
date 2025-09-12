"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ToastCtx = createContext({ show: () => {} });
export const useToast = () => useContext(ToastCtx);

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  function show(message, opts = {}) {
    const id = Math.random().toString(36).slice(2);
    const t = { id, message, variant: opts.variant || "default", timeout: opts.timeout ?? 2000 };
    setToasts((arr) => [...arr, t]);
    setTimeout(() => setToasts((arr) => arr.filter((x) => x.id !== id)), t.timeout);
  }
  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded-xl shadow bg-white border ${
              t.variant === "success" ? "border-green-300" : t.variant === "error" ? "border-red-300" : "border-gray-200"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
