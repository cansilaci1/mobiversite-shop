"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlistIds, remove, clear } from "@/store/wishlistSlice";
import api from "@/lib/axios";
import Link from "next/link";

export default function WishlistPage() {
  const ids = useSelector(selectWishlistIds);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchItems() {
      setLoading(true);
      try {
        // 1) id yoksa boşalt
        if (!ids || ids.length === 0) {
          if (!ignore) setItems([]);
          return;
        }

        // 2) sayılaştır + tekilleştir (1, "1" karışıklığını önle)
        const uniqueIds = [...new Set(ids.map((x) => Number(x)).filter(Number.isFinite))];
        if (uniqueIds.length === 0) {
          if (!ignore) setItems([]);
          return;
        }

        // 3) server'dan çek (json-server normalde id=1&id=2 destekler)
        const qs = uniqueIds.map((id) => `id=${encodeURIComponent(id)}`).join("&");
        const { data } = await api.get(`/products?${qs}`);

        // 4) GÜVENLİK AĞI: server tüm ürünleri dönerse bile client'ta filtrele
        const filtered = Array.isArray(data)
          ? data.filter((p) => uniqueIds.includes(Number(p.id)))
          : [];

        if (!ignore) setItems(filtered);
      } catch (err) {
        console.error("wishlist fetch error:", err);
        if (!ignore) setItems([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchItems();
    return () => { ignore = true; };
  }, [ids]);

  if (loading) return <div className="animate-pulse text-gray-500">Loading wishlist…</div>;

  if (!items || items.length === 0) {
    return (
      <div className="card">
        <p>Your wishlist is empty.</p>
        <Link className="btn btn-primary mt-3" href="/products">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Wishlist</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((p) => (
          <div key={p.id} className="card flex flex-col">
            <Link href={`/products/${p.id}`}>
              <img src={p.image} alt={p.title} className="h-40 w-full object-contain" />
              <h3 className="mt-3 font-semibold line-clamp-2">{p.title}</h3>
            </Link>
            <p className="mt-1 text-gray-700">${p.price}</p>
            <button className="btn mt-3" onClick={() => dispatch(remove(Number(p.id)))}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="card flex items-center justify-between">
        <span className="text-gray-600">{items.length} item(s)</span>
        <button className="btn" onClick={() => dispatch(clear())}>Clear wishlist</button>
      </div>
    </div>
  );
}
