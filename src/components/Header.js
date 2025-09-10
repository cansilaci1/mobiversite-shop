"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">Mobiversite</Link>
        <nav className="flex items-center gap-4">
          <Link href="/products">Products</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/cart" className="btn btn-outline">Cart</Link>
        </nav>
      </div>
    </header>
  );
}
