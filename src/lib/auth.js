import { cookies } from "next/headers";

export async function getSession() {
  const jar = await cookies();      
  const c = jar.get("session");
  if (!c) return null;
  try { return JSON.parse(c.value); } catch { return null; }
}
