import { cookies } from "next/headers";

export function getSession() {
  const c = cookies().get("session");
  if (!c) return null;
  try { return JSON.parse(c.value); } catch { return null; }
}
