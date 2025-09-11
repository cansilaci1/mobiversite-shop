import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const s = getSession();
  return NextResponse.json({ user: s || null });
}
