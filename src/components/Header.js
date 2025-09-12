"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/store/cartSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function SearchBox() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();
    const qs = q.trim();
    router.push(qs ? `/products?q=${encodeURIComponent(qs)}` : "/products");
  }

  return (
    <form onSubmit={onSubmit} className="flex-1 max-w-2xl hidden md:flex">
      <input
        className="input rounded-r-none"
        placeholder="Ürün, kategori ara (örn. 't-shirt')"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="btn btn-primary rounded-l-none" type="submit">Ara</button>
    </form>
  );
}

function CategoryBar() {
  const cats = ["Elektronik", "Moda", "Ev & Yaşam", "Kozmetik", "Spor", "Anne & Bebek", "Süpermarket", "Ayakkabı"];
  return (
    <div className="border-t bg-white">
      <div className="container">
        <div className="flex gap-4 overflow-x-auto py-2 no-scrollbar">
          {cats.map((c) => (
            <Link key={c} href={`/products?cat=${encodeURIComponent(c)}`} className="chip whitespace-nowrap">
              {c}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const count = useSelector(selectCartCount);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        const { user } = await res.json();
        if (!ignore) setUser(user);
      } catch {}
    })();
    return () => { ignore = true; };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="container py-3 flex items-center gap-3">
        <Link href="/" className="text-2xl font-extrabold text-brand">mobiversite</Link>

        <SearchBox />

        <nav className="ml-auto flex items-center gap-3">
          <Link href="/wishlist" className="btn btn-ghost hidden sm:inline-flex">Favoriler</Link>
          {user ? (
            <form action="/api/logout" method="post">
              <button className="btn btn-ghost" type="submit">Çıkış</button>
            </form>
          ) : (
            <Link href="/login" className="btn btn-ghost">Giriş</Link>
          )}
          <Link href="/cart" className="relative btn btn-outline">
            Sepet
            <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full text-xs flex items-center justify-center bg-brand text-white">
              {count}
            </span>
          </Link>
        </nav>
      </div>
      <CategoryBar />
    </header>
  );
}
