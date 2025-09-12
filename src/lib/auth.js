import { cookies } from "next/headers";


export async function getSession() {
  try {
    const store = await cookies(); // 🔧 önemli: await
    const raw = store.get("session")?.value || "";
    const s = JSON.parse(raw || "{}");
    if (!s?.id) return null;
    return s; // { id, email?, name? }
  } catch {
    return null;
  }
}
