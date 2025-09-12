import api from "@/lib/axios";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";
import SimilarCarousel from "@/components/SimilarCarousel";
import StickyAddBar from "@/components/StickyAddBar";

export const revalidate = 0;

export default async function ProductDetailPage({ params }) {
  // Next 15: params async olabilir → await et
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isFinite(productId)) return notFound();

  // 1) Ürünü çek
  let product;
  try {
    const { data } = await api.get(`/products/${productId}`);
    product = data;
    if (!product?.id) return notFound();
  } catch {
    return notFound();
  }

  // 2) Benzer ürünleri çek (aynı kategori, kendisini hariç tut)
  let similar = [];
  try {
    const { data } = await api.get("/products", { params: { category: product.category } });
    similar = (Array.isArray(data) ? data : []).filter(p => p.id !== product.id).slice(0, 12);
  } catch {
    similar = [];
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {/* SOL: Görsel */}
        <div className="card flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={600}
            className="max-h-[420px] w-auto object-contain"
            sizes="(max-width:768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* SAĞ: Bilgi + Aksiyonlar */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="chip capitalize">{product.category}</span>
            <span className="badge badge-orange">Ücretsiz kargo</span>
            <span className="badge">Hızlı teslimat</span>
          </div>

          <h1 className="text-2xl font-bold leading-tight">{product.title}</h1>

          <div className="text-3xl font-semibold">${Number(product.price).toFixed(2)}</div>

          <p className="text-gray-700">{product.description}</p>

          <div className="flex gap-3 pt-2">
            <AddToCartButton product={product} />
            <WishlistButton productId={product.id} />
          </div>
        </div>
      </div>

      {/* Benzer ürünler */}
      {similar.length > 0 && (
        <div className="mt-10">
          <SimilarCarousel products={similar} title="Benzer ürünler" />
        </div>
      )}

      {/* Mobil sticky bar */}
      <StickyAddBar product={product} />
    </>
  );
}
