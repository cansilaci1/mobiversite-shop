import api from "@/lib/axios";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";

export const revalidate = 0;

export default async function ProductDetailPage({ params }) {
  // 🔧 Next 15: params async -> önce await et
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isFinite(productId)) return notFound();

  try {
    const { data: product } = await api.get(`/products/${productId}`);
    if (!product?.id) return notFound();

    return (
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.category}</p>
          <p className="text-2xl font-semibold">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>

          <div className="flex gap-3 pt-2">
            <AddToCartButton product={product} />
            <WishlistButton productId={product.id} />
          </div>
        </div>
      </div>
    );
  } catch {
    return notFound();
  }
}
  