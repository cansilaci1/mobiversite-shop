import api from "@/lib/axios";
import { getSession } from "@/lib/auth";

export const revalidate = 0;

export default async function ProfilePage() {
  // middleware zaten koruyor ama yine de güvenli davranalım
  const session = getSession();
  if (!session) {
    return (
      <div className="card">
        <h1 className="text-xl font-bold">Unauthorized</h1>
        <p>Please login to view your profile.</p>
      </div>
    );
  }

  // yalnızca kullanıcının siparişleri
  const { data: orders } = await api.get("/orders", {
    params: { userId: session.id, _sort: "date", _order: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold">Hello, {session.name || session.email}</h1>
        <p className="text-gray-600">Email: {session.email}</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Order history</h2>

        {(!orders || orders.length === 0) ? (
          <div className="card">No orders yet.</div>
        ) : (
          <div className="space-y-3">
            {orders.map(o => (
              <div key={o.id} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Order #{o.id}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(o.date).toLocaleString()} • {o.status}
                    </div>
                  </div>
                  <div className="text-lg font-semibold">${Number(o.total).toFixed(2)}</div>
                </div>

                <div className="mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {o.items?.map(it => (
                    <div key={it.id} className="border rounded-lg px-3 py-2">
                      <div className="font-medium line-clamp-1">{it.title}</div>
                      <div className="text-sm text-gray-600">
                        {it.quantity} × ${it.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
