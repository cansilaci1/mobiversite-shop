import api from "@/lib/axios";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export const revalidate = 0; // dev sırasında cache tutma

export default async function ProductDetailPage({ params }) {
  const id = params.id;

  let product;
  try {
    const { data } = await api.get(`/products/${id}`);
    product = data;
  } catch (e) {
    // ürün yoksa 404
    return notFound();
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="card flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-80 object-contain"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.category}</p>
        <p className="text-2xl font-semibold">${product.price}</p>
        <p className="text-gray-700">{product.description}</p>

        {/* Bir sonraki adımda CartContext’i ekleyip bu butonu aktif edeceğiz */}
    <div className="flex gap-3 pt-2">
      <AddToCartButton product={product} />
      <button className="btn btn-outline opacity-50 cursor-not-allowed" disabled>
        Wishlist (soon)
      </button>
    </div>
      </div>
    </div>
  );
}
