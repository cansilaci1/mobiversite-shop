"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function SimilarCarousel({ products, title = "Benzer ürünler" }) {
  const scrollerRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function updateEdges() {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setAtStart(scrollLeft <= 2);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
  }

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    const on = () => updateEdges();
    el.addEventListener("scroll", on, { passive: true });
    const ro = new ResizeObserver(on);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", on); ro.disconnect(); };
  }, []);

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="space-y-3 relative">
      <h2 className="text-xl font-semibold">{title}</h2>

      <div className="relative">
        {/* gradyan kenarlar */}
        {!atStart && <div className="edge-fade-left" aria-hidden="true" />}
        {!atEnd && <div className="edge-fade-right" aria-hidden="true" />}

        {/* oklar */}
        <button
          className={`carousel-btn left-2 ${atStart ? "opacity-0 pointer-events-none" : ""}`}
          onClick={() => scrollBy(-1)}
          aria-label="Sola kaydır"
        >‹</button>
        <button
          className={`carousel-btn right-2 ${atEnd ? "opacity-0 pointer-events-none" : ""}`}
          onClick={() => scrollBy(1)}
          aria-label="Sağa kaydır"
        >›</button>

        <div ref={scrollerRef} className="overflow-x-auto no-scrollbar scroll-smooth">
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
