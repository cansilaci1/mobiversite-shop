import api from "@/lib/axios";
import Link from "next/link";

export const revalidate = 0; // dev sırasında taze kalsın

export default async function ProductsPage() {
  const { data: products } = await api.get("/products"); // 20+ ürün

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p => (
          <div key={p.id} className="card flex flex-col">
            <Link href={`/products/${p.id}`}>
              <img src={p.image} alt={p.title} className="h-40 w-full object-contain" />
              <h3 className="mt-3 font-semibold line-clamp-2">{p.title}</h3>
            </Link>
            <p className="mt-1 text-gray-700">${p.price}</p>
            {/* Cart/Wishlist butonlarını bir sonraki adımda ekleyeceğiz */}
          </div>
        ))}
      </div>
    </div>
  );
}
