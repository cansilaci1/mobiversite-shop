import api from "@/lib/axios";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const revalidate = 0;

export default async function ProductsPage({ searchParams }) {
  const sp = await searchParams;
  const q = sp.q || "";
  const cat = sp.cat || "";

  const params = new URLSearchParams();
  if (q) params.set("title_like", q);
  if (cat) params.set("category", cat);

  const query = params.toString();
  const url = query ? `/products?${query}` : "/products";

  const { data: products } = await api.get(url);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ürünler</h1>
        {(q || cat) && (
          <Link href="/products" className="text-sm hover:underline text-muted">Filtreleri temizle</Link>
        )}
      </div>

      {products.length === 0 ? (
        <div className="card">Sonuç bulunamadı.</div>
      ) : (
        <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
