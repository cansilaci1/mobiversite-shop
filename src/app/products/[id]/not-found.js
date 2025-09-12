import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="card text-center">
      <h2 className="text-xl font-bold">Product not found</h2>
      <p className="text-gray-600">The product you’re looking for doesn’t exist.</p>
      <Link href="/products" className="btn btn-primary mt-3">Back to Products</Link>
    </div>
  );
}
