"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/store/cartSlice";
import { useEffect, useState } from "react";
import useMounted from "@/hooks/useMounted";

/* ---------- Arama Kutusu ---------- */
function SearchBox() {
  return (
    <form action="/products" method="GET" className="flex-1 max-w-2xl hidden md:flex">
      <input
        type="search"
        name="q"
        className="input rounded-r-none"
        placeholder="Ürün, kategori ara (örn. 't-shirt')"
        aria-label="Ürün ara"
      />
      <button className="btn btn-primary rounded-l-none" type="submit">
        Ara
      </button>
    </form>
  );
}

/* ---------- Kategori Barı ---------- */
function CategoryBar() {
  const cats = ["electronics", "jewelery", "men's clothing", "women's clothing"];
  return (
    <div className="border-t bg-white">
      <div className="container">
        <div className="flex gap-4 overflow-x-auto py-2 no-scrollbar">
          {cats.map((c) => (
            <Link
              key={c}
              href={`/products?cat=${encodeURIComponent(c)}`}
              className="chip whitespace-nowrap capitalize"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ======================== HEADER ======================== */
export default function Header() {
  const count = useSelector(selectCartCount);
  const [user, setUser] = useState(null);
  const mounted = useMounted(); // <- Hydration fix: rozet sayısını mount sonrası göster

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        const data = await res.json();
        if (!ignore) setUser(data?.user || null);
      } catch {
        if (!ignore) setUser(null);
      }
    })();
    return () => { ignore = true; };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="container py-3 flex items-center gap-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-brand">
          mobiversite
        </Link>

        {/* Arama */}
        <SearchBox />

        {/* Sağ Menü */}
        <nav className="ml-auto flex items-center gap-3">
          <Link href="/wishlist" className="btn btn-ghost hidden sm:inline-flex">
            Favoriler
          </Link>

          {user ? (
            <>
              <Link href="/profile" className="btn btn-ghost">Profil</Link>
              <form action="/api/logout" method="post">
                <button className="btn btn-ghost" type="submit">Çıkış</button>
              </form>
            </>
          ) : (
            <Link href="/login" className="btn btn-ghost">Giriş</Link>
          )}

          {/* Sepet + Rozet */}
          <Link href="/cart" className="relative btn btn-outline">
            Sepet
            <span
              className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full text-xs flex items-center justify-center bg-brand text-white"
              suppressHydrationWarning
              aria-live="polite"
            >
              {mounted ? count : 0}
            </span>
          </Link>
        </nav>
      </div>

      {/* Kategori şeridi */}
      <CategoryBar />
    </header>
  );
}
