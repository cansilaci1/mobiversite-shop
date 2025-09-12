import api from "@/lib/axios";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import OrderStatusButton from "@/components/OrderStatusButton";

export const revalidate = 0;

export default async function ProfilePage() {
  const session = await getSession(); // 🔧 await
  if (!session) return redirect(`/login?redirect=${encodeURIComponent("/profile")}`);

  let orders = [];
  try {
    const { data } = await api.get("/orders", {
      params: { userId: session.id, _sort: "date", _order: "desc" },
    });
    orders = Array.isArray(data) ? data : [];
  } catch {
    return (
      <div className="card">
        <h1 className="text-xl font-bold">Profile</h1>
        <p className="text-red-600">Orders could not be loaded.</p>
      </div>
    );
  }

  const displayName = session.name || session.email || "User";
  const displayEmail = session.email || "-";

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold">Hello, {displayName}</h1>
        <p className="text-gray-600">Email: {displayEmail}</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Order history</h2>

        {orders.length === 0 ? (
          <div className="card">No orders yet.</div>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Order #{o.id}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(o.date).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })} • {o.status}
                    </div>
                  </div>
                  <div className="text-lg font-semibold">
                    ${Number(o.total).toFixed(2)}
                  </div>
                </div>

                <div className="mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {o.items?.map((it) => (
                    <div key={it.id} className="border rounded-lg px-3 py-2">
                      <div className="font-medium line-clamp-1">{it.title}</div>
                      <div className="text-sm text-gray-600">
                        {Number(it.quantity)} × ${Number(it.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {o.status !== "paid" && (
                  <div className="mt-3">
                    <OrderStatusButton orderId={o.id} to="paid">
                      Ödendi olarak işaretle
                    </OrderStatusButton>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
