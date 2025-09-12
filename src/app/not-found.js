import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function NotFound() {
  return (
    <div className="min-h-[50vh] grid place-items-center">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold">404</h1>
        <p className="text-gray-600">This page could not be found.</p>
        <div className="flex gap-2 justify-center">
          <Link href="/" className="btn">Home</Link>
          <Link href="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    </div>
  );
}
