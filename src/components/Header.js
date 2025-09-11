"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/store/cartSlice";
import { useEffect, useState } from "react";

export default function Header() {
  const count = useSelector(selectCartCount);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="container py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">Mobiversite</Link>

        <nav className="hidden md:flex items-center gap-5">
          <Link href="/products" className="hover:underline">Products</Link>
          <Link href="/wishlist" className="hover:underline">Wishlist</Link>
          <Link href="/profile" className="hover:underline">Profile</Link>

          <Link href="/cart" className="relative btn btn-outline">
            Cart
            <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full text-xs flex items-center justify-center bg-black text-white">
              {count}
            </span>
          </Link>

          {user ? (
            <form action="/api/logout" method="post">
              <button className="btn" type="submit">Logout</button>
            </form>
          ) : (
            <Link href="/login" className="btn">Login</Link>
          )}
        </nav>

        <button className="md:hidden btn btn-outline px-3 py-2" onClick={() => setOpen(!open)} aria-expanded={open}>
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white/95">
          <div className="container py-3 flex flex-col gap-3">
            <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
            <Link href="/wishlist" onClick={() => setOpen(false)}>Wishlist</Link>
            <Link href="/profile" onClick={() => setOpen(false)}>Profile</Link>
            <Link href="/cart" onClick={() => setOpen(false)} className="btn btn-outline w-fit">
              Cart ({count})
            </Link>
            {user ? (
              <form action="/api/logout" method="post">
                <button className="btn w-fit" type="submit" onClick={() => setOpen(false)}>Logout</button>
              </form>
            ) : (
              <Link href="/login" className="btn w-fit" onClick={() => setOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
