"use client";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";

export default function StickyAddBar({ product }) {
  if (!product) return null;
  return (
    <div className="fixed md:hidden bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t z-40">
      <div className="container py-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-xs text-muted">Toplam</div>
          <div className="text-lg font-bold">${Number(product.price).toFixed(2)}</div>
        </div>
        <div className="flex gap-2">
          <WishlistButton productId={product.id} />
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
