"use client";
import { useState } from "react";

export default function MarkPaidButton({ orderId, className = "" }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function markPaid() {
    setLoading(true); setErr("");
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: "paid" })
      });
      if (!res.ok) throw new Error("Update failed");
      // Basit yaklaşım: sayfayı yenile
      window.location.reload();
    } catch (e) {
      setErr(e.message || "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={className}>
      <button className="btn" onClick={markPaid} disabled={loading}>
        {loading ? "Updating…" : "Mark as Paid"}
      </button>
      {err && <p className="text-sm text-red-600 mt-1">{err}</p>}
    </div>
  );
}
