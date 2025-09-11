import { NextResponse } from "next/server";
import api from "@/lib/axios";
import { getSession } from "@/lib/auth";

// Siparişleri listele (sadece giriş yapan kullanıcının)
export async function GET() {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { data } = await api.get("/orders", {
      params: { userId: session.id, _sort: "date", _order: "desc" }
    });
    return NextResponse.json({ orders: data });
  } catch (e) {
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
  }
}

// Yeni sipariş oluştur
export async function POST(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { items = [] } = await req.json();
    const total = items.reduce(
      (s, it) => s + (Number(it.price) || 0) * (Number(it.quantity) || 0),
      0
    );

    const order = {
      date: new Date().toISOString(),
      items,
      total: Number(total.toFixed(2)),
      status: "created",
      userId: session.id
    };

    const { data } = await api.post("/orders", order);
    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
