import api from "@/lib/axios";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const revalidate = 0;

export default async function ProductsPage({ searchParams }) {
  const sp = await searchParams;
  const read = (k) => {
    if (typeof sp?.get === "function") return sp.get(k) ?? "";
    const v = sp?.[k];
    return typeof v === "string" ? v : "";
  };

  const qRaw = read("q");
  const cat  = read("cat").trim();
  const sort = read("sort").trim();
  const min  = read("min").trim();     // ← NEW
  const max  = read("max").trim();     // ← NEW

  const q    = qRaw.trim();
  const qLow = q.toLowerCase();

  // 1) Tüm ürünleri çek
  const { data: allProducts } = await api.get("/products");
  let filtered = Array.isArray(allProducts) ? allProducts : [];

  // 2) Kategori
  if (cat) filtered = filtered.filter(p => (p?.category ?? "") === cat);

  // 3) Arama (title + description)
  if (q) {
    filtered = filtered.filter(p => {
      const t = String(p?.title ?? "").toLowerCase();
      const d = String(p?.description ?? "").toLowerCase();
      return t.includes(qLow) || d.includes(qLow);
    });
  }

  // 4) Fiyat aralığı
  const minPrice = Number.parseFloat(min);
  const maxPrice = Number.parseFloat(max);
  if (Number.isFinite(minPrice)) {
    filtered = filtered.filter(p => Number(p.price) >= minPrice);
  }
  if (Number.isFinite(maxPrice)) {
    filtered = filtered.filter(p => Number(p.price) <= maxPrice);
  }

  // 5) Sıralama
  const products = [...filtered];
  if (sort === "price_asc")   products.sort((a,b) => Number(a.price) - Number(b.price));
  if (sort === "price_desc")  products.sort((a,b) => Number(b.price) - Number(a.price));
  if (sort === "title_asc")   products.sort((a,b) => String(a.title).localeCompare(String(b.title)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">
            {q ? `“${q}” için sonuçlar` : "Ürünler"}
          </h1>
          {(q || cat || min || max) && (
            <p className="text-sm text-muted mt-1">{products.length} sonuç</p>
          )}
        </div>

        {/* Filtre/Sıralama Formu (GET/SSR) */}
        <form action="/products" method="GET" className="flex items-center gap-2">
          {/* mevcut filtreleri koru */}
          {q   && <input type="hidden" name="q" value={q} />}
          {cat && <input type="hidden" name="cat" value={cat} />}

          <input
            type="number" step="0.01" min="0" inputMode="decimal"
            name="min" placeholder="Min ₺"
            defaultValue={min} className="input w-28 h-10"
            aria-label="Minimum fiyat"
          />
          <input
            type="number" step="0.01" min="0" inputMode="decimal"
            name="max" placeholder="Max ₺"
            defaultValue={max} className="input w-28 h-10"
            aria-label="Maksimum fiyat"
          />

          <select name="sort" defaultValue={sort || ""} className="input py-2 h-10">
            <option value="">Sırala</option>
            <option value="price_asc">Fiyat: Artan</option>
            <option value="price_desc">Fiyat: Azalan</option>
            <option value="title_asc">İsim: A → Z</option>
          </select>

          <button className="btn btn-outline h-10" type="submit">Uygula</button>

          {(q || cat || sort || min || max) && (
            <Link href="/products" className="text-sm hover:underline text-muted">
              Temizle
            </Link>
          )}
        </form>
      </div>

      {products.length === 0 ? (
        <div className="card">Sonuç bulunamadı.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
