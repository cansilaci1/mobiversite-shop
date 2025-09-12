import api from "@/lib/axios";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import OrderStatusButton from "@/components/OrderStatusButton";

export const revalidate = 0;

export default async function OrderSuccessPage({ searchParams }) {
  const sp = await searchParams;
  const orderId = typeof sp?.get === "function" ? sp.get("orderId") : sp?.orderId;
  if (!orderId) return redirect("/profile");

  const session = await getSession(); // 🔧 await
  if (!session) return redirect(`/login?redirect=${encodeURIComponent(`/order-success?orderId=${orderId}`)}`);

  try {
    const { data: order } = await api.get(`/orders/${orderId}`);
    if (!order?.id) return notFound();
    if (String(order.userId) !== String(session.id)) return redirect("/profile");

    const when = new Date(order.date);

    return (
      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {order.status === "paid" ? "Siparişin alındı! 🎉" : "Ödeme işleniyor…"}
            </h1>
            <span className={`badge ${order.status === "paid" ? "badge-orange" : ""}`}>
              {order.status}
            </span>
          </div>

          <p className="text-muted mt-1">
            Sipariş no <span className="font-medium">#{order.id}</span> •{" "}
            {when.toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}
          </p>

          <p className="mt-3">
            Toplam tutar: <span className="font-semibold">${Number(order.total).toFixed(2)}</span>
          </p>

          {order.status !== "paid" && (
            <div className="mt-4">
              <OrderStatusButton orderId={order.id} to="paid">
                Ödemeyi tamamla (demo)
              </OrderStatusButton>
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <Link className="btn btn-primary" href="/profile">Siparişlerim</Link>
            <Link className="btn btn-outline" href="/products">Alışverişe devam et</Link>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Ürünler</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {order.items?.map((it) => (
              <div key={it.id} className="card">
                <div className="font-medium line-clamp-2">{it.title}</div>
                <div className="text-sm text-muted">
                  {it.quantity} × ${Number(it.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch {
    return notFound();
  }
}
