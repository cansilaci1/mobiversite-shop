"use client";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotal, updateQty, removeFromCart, clearCart } from "@/store/cartSlice";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const router = useRouter();
  const sp = useSearchParams(); // Next 15'te bile client'ta normal kullanılabiliyor
  const [placing, setPlacing] = useState(false);
  const [err, setErr] = useState("");

  async function handleCheckout() {
    setPlacing(true); setErr("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items })
      });

      if (res.status === 401) {
        // login yok → login'e yönlendir; dönüşte tekrar /cart açılacak
        const redirect = "/cart?checkout=1";
        router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
        return;
      }
      if (!res.ok) throw new Error("Failed to place order");

      // başarı → sepeti temizle ve profile'a
      dispatch(clearCart());
      router.push("/profile");
    } catch (e) {
      setErr(e.message || "Checkout failed");
    } finally {
      setPlacing(false);
    }
  }

   useEffect(() => {
    const shouldAuto = sp.get("checkout") === "1";
    if (shouldAuto && items.length > 0 && !triedAuto.current && !placing) {
      triedAuto.current = true;
      placeOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp, items.length]);

  if (items.length === 0) {
    return (
      <div className="card">
        <p>Your cart is empty.</p>
        <Link className="btn btn-primary mt-3" href="/products">Go shopping</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      <div className="space-y-3">
        {items.map(it => (
          <div key={it.id} className="card flex items-center justify-between gap-3">
            <div className="font-medium line-clamp-1">{it.title}</div>
            <div className="text-gray-700">${it.price}</div>
            <input
              type="number" min="1" className="border rounded-lg px-2 py-1 w-20"
              value={it.quantity}
              onChange={(e) => dispatch(updateQty({ id: it.id, qty: e.target.value }))}
            />
            <button className="btn" onClick={() => dispatch(removeFromCart(it.id))}>Remove</button>
          </div>
        ))}
      </div>

      <div className="card flex items-center justify-between">
        <div className="text-xl font-semibold">Total: ${total.toFixed(2)}</div>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={handleCheckout} disabled={placing}>
            {placing ? "Placing…" : "Checkout"}
          </button>
        </div>
      </div>

      {err && <p className="text-red-600">{err}</p>}
    </div>
  );
}
