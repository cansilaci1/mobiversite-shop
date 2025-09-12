"use client";
import Link from "next/link";
import Image from "next/image";

export default function SimilarCarousel({ products, title = "Benzer ürünler" }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>

      <div className="relative">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-3 pb-2 snap-x snap-mandatory">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="snap-start min-w-[200px] max-w-[240px] card hover:shadow-lg transition-shadow"
              >
                <div className="h-36 w-full flex items-center justify-center bg-gray-50 rounded-xl">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={240}
                    height={240}
                    className="h-32 w-auto object-contain"
                    sizes="(max-width: 768px) 60vw, 240px"
                  />
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="font-medium leading-tight line-clamp-2">{p.title}</h3>
                  <div className="text-sm text-muted capitalize">{p.category}</div>
                  <div className="text-base font-semibold">${Number(p.price).toFixed(2)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
