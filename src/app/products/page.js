import api from "@/lib/axios";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const revalidate = 0;

export default async function ProductsPage({ searchParams }) {
  const sp = await searchParams;

  // Next 15: URLSearchParams olabilir -> .get() ile, değilse prop'tan oku
  const read = (k) => {
    if (typeof sp?.get === "function") return sp.get(k) ?? "";
    const v = sp?.[k];
    return typeof v === "string" ? v : "";
  };

  const qRaw  = read("q");
  const cat   = read("cat").trim();
  const q     = qRaw.trim();
  const qLow  = q.toLowerCase();

  // 1) Tüm ürünleri JSON server'dan al
  const { data: allProducts } = await api.get("/products");

  // 2) Kategori filtresi (tam eşleşme)
  let filtered = Array.isArray(allProducts) ? allProducts : [];
  if (cat) {
    filtered = filtered.filter(p => (p?.category ?? "") === cat);
  }

  // 3) Arama filtresi (title + description, case-insensitive)
  if (q) {
    filtered = filtered.filter(p => {
      const t = String(p?.title ?? "").toLowerCase();
      const d = String(p?.description ?? "").toLowerCase();
      return t.includes(qLow) || d.includes(qLow);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {q ? `“${q}” için sonuçlar` : "Ürünler"}
        </h1>
        {(q || cat) && (
          <Link href="/products" className="text-sm hover:underline text-muted">
            Filtreleri temizle
          </Link>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="card">Sonuç bulunamadı.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
