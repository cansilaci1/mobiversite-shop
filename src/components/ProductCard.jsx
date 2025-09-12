"use client";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";
import RatingStars from "@/components/RatingStars";

export default function ProductCard({ product }) {
  const p = product;
  const discount = p.fakeDiscount ?? 0; // istersen API'den gelmiyorsa uydurma
  const oldPrice = discount ? (p.price * (100 + discount)) / 100 : null;

  return (
    <div className="group card relative flex flex-col overflow-hidden">
      {/* wishlist kalbi */}
      <div className="absolute left-2 top-2 z-10">
        <WishlistButton productId={p.id} className="btn btn-ghost px-2 py-1" />
      </div>

      {/* resim */}
      <Link href={`/products/${p.id}`} className="block">
        <img src={p.image} alt={p.title} className="h-48 w-full object-contain transition group-hover:scale-[1.02]" />
      </Link>

      {/* içerik */}
      <div className="mt-3 flex-1 flex flex-col">
        <Link href={`/products/${p.id}`}>
          <h3 className="font-medium line-clamp-2">{p.title}</h3>
        </Link>
        <div className="mt-1 flex items-center justify-between">
          <span className="chip">{p.category}</span>
          <RatingStars value={p.rating?.rate || 4.5} count={p.rating?.count || 120} />
        </div>

        <div className="mt-2">
          {oldPrice && (
            <div className="text-sm text-muted line-through">${oldPrice.toFixed(2)}</div>
          )}
          <div className="text-lg font-semibold">${Number(p.price).toFixed(2)}</div>
          {discount ? <span className="badge badge-orange mt-1">-%{discount}</span> : null}
        </div>
      </div>

      {/* hızlı aksiyon */}
      <div className="mt-3">
        <AddToCartButton product={p} />
      </div>
    </div>
  );
}
