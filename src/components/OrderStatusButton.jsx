"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ToastProvider";

export default function OrderStatusButton({
  orderId,
  to = "paid",
  children = "Ödendi olarak işaretle",
  className = "",
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { show } = (typeof useToast === "function" ? useToast() : { show: () => {} });

  async function onClick() {
    if (loading) return;

    // String olarak doğrula (boş olmasın)
    const id = String(orderId ?? "").trim();
    if (!id) {
      show("Geçersiz sipariş numarası", { variant: "error" });
      return;
    }

    setLoading(true);
    try {
      // Query’ye de ekliyoruz; server fallback’i bunu okuyabilir
      const url = `/api/orders/${encodeURIComponent(id)}?id=${encodeURIComponent(id)}`;

      const res = await fetch(url, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: to }),
      });

      if (res.status === 401) {
        const redirect =
          typeof window !== "undefined"
            ? window.location.pathname + window.location.search
            : `/order-success?orderId=${encodeURIComponent(id)}`;
        window.location.href = `/login?redirect=${encodeURIComponent(redirect)}`;
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.error || res.statusText || "İşlem başarısız";
        show(`${msg}`, { variant: "error" });
        return;
      }

      show("Sipariş güncellendi", { variant: "success" });
      router.refresh();
    } catch {
      show("İşlem başarısız", { variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className={`btn btn-outline ${className}`}
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? "Kaydediliyor…" : children}
    </button>
  );
}
