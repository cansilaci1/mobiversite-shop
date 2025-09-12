export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-48 bg-gray-100 rounded-xl animate-pulse" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-48 bg-gray-100 rounded-xl" />
            <div className="mt-3 h-4 bg-gray-200 rounded w-3/4" />
            <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
            <div className="mt-3 h-10 bg-gray-100 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
