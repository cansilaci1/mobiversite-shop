import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import api from "@/lib/axios";

export async function GET() {
  const session = await getSession(); // 🔧 await
  if (!session) return NextResponse.json({ user: null });

  let { id, email, name } = session;

  if (!email || !name) {
    try {
      const { data: user } = await api.get(`/users/${id}`);
      email = email || user?.email || "";
      name  = name  || user?.name  || user?.username || "";
    } catch {}
  }

  return NextResponse.json({ user: { id, email, name } });
}
