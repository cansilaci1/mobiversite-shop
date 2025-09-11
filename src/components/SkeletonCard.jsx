export default function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="h-40 w-full bg-gray-200 rounded-xl" />
      <div className="mt-3 h-4 w-3/4 bg-gray-200 rounded" />
      <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded" />
      <div className="mt-4 h-9 w-28 bg-gray-200 rounded-lg" />
    </div>
  );
}
