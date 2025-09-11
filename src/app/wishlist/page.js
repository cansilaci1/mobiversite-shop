"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlistIds, remove, clear } from "@/store/wishListSlice";
import api from "@/lib/axios";
import Link from "next/link";

export default function WishlistPage() {
  const ids = useSelector(selectWishlistIds);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ids değişince ürünleri json-server'dan çek
  useEffect(() => {
    let ignore = false;
    const fetchItems = async () => {
      setLoading(true);
      try {
        if (ids.length === 0) {
          setItems([]);
        } else {
          const params = new URLSearchParams();
          ids.forEach(id => params.append("id", id));
          const { data } = await api.get(`/products?${params.toString()}`);
          if (!ignore) setItems(data);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchItems();
    return () => { ignore = true; };
  }, [ids]);

  if (loading) return <div className="animate-pulse text-gray-500">Loading wishlist…</div>;

  if (items.length === 0) {
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
        {items.map(p => (
          <div key={p.id} className="card flex flex-col">
            <Link href={`/products/${p.id}`}>
              <img src={p.image} alt={p.title} className="h-40 w-full object-contain" />
              <h3 className="mt-3 font-semibold line-clamp-2">{p.title}</h3>
            </Link>
            <p className="mt-1 text-gray-700">${p.price}</p>
            <button className="btn mt-3" onClick={() => dispatch(remove(p.id))}>
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
