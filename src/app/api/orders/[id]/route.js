import { NextResponse } from "next/server";
import api from "@/lib/axios";
import { getSession } from "@/lib/auth";

function j(body, status = 200) {
  return NextResponse.json(body, { status });
}

// params yoksa URL query’den id çek; sayı zorlaması yok → string de olur
function getOrderId(req, params) {
  const raw =
    params?.id ??
    params?.orderId ??
    params?.slug ??
    params?.order ??
    new URL(req.url).searchParams.get("id");

  if (raw == null) return null;
  const id = String(raw).trim();
  return id.length ? id : null;
}

function prepareAllowed(existing, sessionId, body) {
  const allowed = {};
  if (typeof body?.status === "string") allowed.status = body.status;

  // sahiplik: userId yoksa ilk güncellemede claim et, farklıysa yasak
  if (existing.userId == null) {
    allowed.userId = sessionId;
  } else if (String(existing.userId) !== String(sessionId)) {
    allowed.__forbidden = true;
  }
  return allowed;
}

export async function PATCH(req, ctx) {
  const params = await ctx?.params; // Next 15
  const orderId = getOrderId(req, params);
  if (!orderId) return j({ error: "bad_request", detail: "invalid id param" }, 400);

  const session = await getSession();
  if (!session?.id) return j({ error: "unauthorized" }, 401);

  let body = {};
  try { body = await req.json(); } catch { return j({ error: "invalid_json" }, 400); }

  try {
    const { data: existing } = await api.get(`/orders/${encodeURIComponent(orderId)}`);
    if (!existing?.id) return j({ error: "not_found" }, 404);

    const allowed = prepareAllowed(existing, session.id, body);
    if (allowed.__forbidden) return j({ error: "forbidden" }, 403);
    delete allowed.__forbidden;

    if (Object.keys(allowed).length === 0) {
      return j({ error: "no_allowed_fields" }, 400);
    }

    const { data: updated } = await api.patch(
      `/orders/${encodeURIComponent(orderId)}`,
      allowed
    );
    return j({ order: updated }, 200);
  } catch (e) {
    return j({ error: "update_failed", detail: String(e?.message || e) }, 500);
  }
}

export async function PUT(req, ctx) {
  const params = await ctx?.params;
  const orderId = getOrderId(req, params);
  if (!orderId) return j({ error: "bad_request", detail: "invalid id param" }, 400);

  const session = await getSession();
  if (!session?.id) return j({ error: "unauthorized" }, 401);

  let body = {};
  try { body = await req.json(); } catch { return j({ error: "invalid_json" }, 400); }

  try {
    const { data: existing } = await api.get(`/orders/${encodeURIComponent(orderId)}`);
    if (!existing?.id) return j({ error: "not_found" }, 404);

    const allowed = prepareAllowed(existing, session.id, body);
    if (allowed.__forbidden) return j({ error: "forbidden" }, 403);
    delete allowed.__forbidden;

    const nextOrder = { ...existing, ...allowed };
    const { data: updated } = await api.put(
      `/orders/${encodeURIComponent(orderId)}`,
      nextOrder
    );
    return j({ order: updated }, 200);
  } catch (e) {
    return j({ error: "update_failed", detail: String(e?.message || e) }, 500);
  }
}
