import Link from "next/link";

export default function NotFound() {
  const cats = ["electronics", "jewelery", "men's clothing", "women's clothing"];

  return (
    <div className="min-h-[60vh] flex items-center">
      <div className="container">
        <div className="card max-w-3xl mx-auto text-center space-y-5">
          <div className="flex items-center justify-center">
            <div className="h-14 w-14 rounded-2xl bg-brand/10 text-brand grid place-items-center text-2xl">🧭</div>
          </div>

          <h1 className="text-3xl font-extrabold">Aradığın sayfayı bulamadık</h1>
          <p className="text-muted">
            Bağlantı yanlış olabilir ya da sayfa taşınmış olabilir. Aşağıdan aratma yapabilir
            ya da kategorilere göz atabilirsin.
          </p>

          {/* Arama kutusu (GET -> /products?q=) */}
          <form action="/products" method="GET" className="mx-auto max-w-xl flex">
            <input
              type="search"
              name="q"
              className="input rounded-r-none"
              placeholder="Ürün ara (örn. 't-shirt')"
              aria-label="Ürün ara"
            />
            <button className="btn btn-primary rounded-l-none" type="submit">Ara</button>
          </form>

          {/* Kategori kısayolları */}
          <div className="flex flex-wrap gap-2 justify-center">
            {cats.map((c) => (
              <Link key={c} href={`/products?cat=${encodeURIComponent(c)}`} className="chip capitalize">
                {c}
              </Link>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <Link href="/products" className="btn btn-primary">Ürünleri Keşfet</Link>
            <Link href="/" className="btn btn-outline">Ana sayfa</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
