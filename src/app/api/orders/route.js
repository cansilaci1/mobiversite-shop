import api from "@/lib/axios";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    const { items = [] } = await req.json();
    const safeItems = Array.isArray(items) ? items : [];
    const total = safeItems.reduce((sum, it) => sum + Number(it.price) * Number(it.quantity ?? it.qty ?? 1), 0);

    const order = {
      userId: session.id,
      date: new Date().toISOString(),
      items: safeItems.map(it => ({
        id: it.id, title: it.title, price: Number(it.price), quantity: Number(it.quantity ?? it.qty ?? 1)
      })),
      total: Number(total.toFixed(2)),
      status: "paid",
    };

    // json-server'a gönder
    const { data: created } = await api.post("/orders", order);

    return NextResponse.json({ order: created }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "failed_to_create" }, { status: 500 });
  }
}
