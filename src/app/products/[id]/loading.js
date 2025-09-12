export default function Loading() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="card animate-pulse flex items-center justify-center">
        <div className="h-[420px] w-full bg-gray-100 rounded-xl" />
      </div>
      <div className="space-y-4 animate-pulse">
        <div className="h-6 w-40 bg-gray-200 rounded" />
        <div className="h-8 w-3/4 bg-gray-200 rounded" />
        <div className="h-6 w-24 bg-gray-200 rounded" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="flex gap-3 pt-2">
          <div className="h-10 w-32 bg-gray-200 rounded-xl" />
          <div className="h-10 w-32 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
