import { NextResponse } from "next/server";
import api from "@/lib/axios";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // json-server: /users?email=...&password=...
    const { data: users } = await api.get("/users", { params: { email, password }});
    const user = users?.[0];

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const payload = { id: user.id, email: user.email, name: user.name || "User" };
    const res = NextResponse.json({ ok: true, user: payload });

    res.cookies.set("session", JSON.stringify(payload), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 7 gün
    });

    return res;
  } catch (e) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
