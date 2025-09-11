import { NextResponse } from "next/server";
import api from "@/lib/axios";
import { getSession } from "@/lib/auth";

export async function PATCH(req, { params }) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  // Güvenlik: sadece kendine ait order'ı güncelleyebilsin (json-server'da filtrelemeden önce mevcut owner'ı kontrol edelim)
  try {
    const { data: existing } = await api.get(`/orders/${id}`);
    if (!existing || existing.userId !== session.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { data } = await api.patch(`/orders/${id}`, body);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
