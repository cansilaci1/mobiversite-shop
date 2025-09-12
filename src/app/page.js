import api from "@/lib/axios";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export const revalidate = 0;

export default async function Home() {
  const { data: products } = await api.get("/products?_limit=8");

  return (
    <div className="space-y-10">
      <section className="card relative overflow-hidden bg-gradient-to-br from-white to-brand/5">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Trendy alışveriş deneyimi
          </h1>
          <p className="mt-3 text-muted">
            Hızlı, modern ve responsive arayüz. Sepet, favoriler ve sipariş akışıyla tam demo.
          </p>
          <div className="mt-5 flex gap-3">
            <Link href="/products" className="btn btn-primary">Ürünlere Git</Link>
            <Link href="/login" className="btn btn-outline">Giriş Yap</Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Öne Çıkanlar</h2>
          <Link href="/products" className="text-sm hover:underline">Tüm ürünler →</Link>
        </div>
        <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
