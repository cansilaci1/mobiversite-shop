import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  );
}
