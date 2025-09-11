export default function NotFound() {
  return (
    <div className="min-h-[50vh] grid place-items-center">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold">404</h1>
        <p className="text-gray-600">This page could not be found.</p>
        <div className="flex gap-2 justify-center">
          <a href="/" className="btn">Home</a>
          <a href="/products" className="btn btn-primary">Browse Products</a>
        </div>
      </div>
    </div>
  );
}
