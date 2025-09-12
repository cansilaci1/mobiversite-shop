export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="card animate-pulse">
        <div className="h-7 w-40 bg-gray-200 rounded" />
        <div className="mt-2 h-4 w-64 bg-gray-200 rounded" />
        <div className="mt-3 h-5 w-48 bg-gray-200 rounded" />
        <div className="mt-4 flex gap-2">
          <div className="h-10 w-36 bg-gray-200 rounded-xl" />
          <div className="h-10 w-44 bg-gray-200 rounded-xl" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
