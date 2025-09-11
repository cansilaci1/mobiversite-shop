import api from "@/lib/axios";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  // featured için ilk 8 ürünü çekelim
  const { data: products } = await api.get("/products?_limit=8");

  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="card relative overflow-hidden">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Alışverişe hazır mısın?
          </h1>
          <p className="mt-3 text-gray-600">
            Modern, hızlı ve sade bir e-ticaret deneyimi. Sepet, wishlist, login ve sipariş akışıyla tam bir demo.
          </p>
          <div className="mt-5 flex gap-3">
            <Link href="/products" className="btn btn-primary">Ürünlere Git</Link>
            <Link href="/login" className="btn">Giriş Yap</Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Öne çıkanlar</h2>
          <Link href="/products" className="text-sm hover:underline">Tüm ürünler →</Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p.id} className="card hover:shadow-lg transition-shadow flex flex-col">
              <Link href={`/products/${p.id}`}>
                <img src={p.image} alt={p.title} className="h-40 w-full object-contain" />
                <h3 className="mt-3 font-semibold line-clamp-2">{p.title}</h3>
              </Link>
              <span className="mt-1 inline-block text-xs bg-gray-100 border rounded-full px-2 py-1">{p.category}</span>
              <p className="mt-2 text-gray-800 text-lg font-semibold">${p.price}</p>
              <div className="mt-auto pt-3">
                <Link className="btn btn-outline" href={`/products/${p.id}`}>İncele</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
