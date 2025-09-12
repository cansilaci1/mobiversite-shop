"use client";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";

export default function ProductCard({ product }) {
  const { id, title, image, price, category } = product;

  return (
    <div className="card group relative overflow-hidden">
      {/* Görsel + metin */}
      <Link href={`/products/${id}`} className="block">
        <div className="h-48 w-full flex items-center justify-center bg-gray-50 rounded-xl">
          <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            className="h-44 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        <div className="mt-3 space-y-1">
          {category && <span className="chip capitalize">{category}</span>}
          <h3 className="font-semibold leading-tight line-clamp-2">{title}</h3>
          <div className="text-lg font-bold">${Number(price).toFixed(2)}</div>
        </div>
      </Link>

      {/* Wishlist butonu (köşede) */}
      <div className="absolute top-2 right-2">
        <WishlistButton productId={id} />
      </div>

      {/* Sepete hızlı ekle */}
      <div className="mt-3">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
