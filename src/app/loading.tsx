export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-8 bg-stone-100 rounded w-48 mb-3" />
      <div className="h-4 bg-stone-100 rounded w-72 mb-8" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex flex-col space-y-3">
            <div className="aspect-[3/4] bg-stone-100 rounded-sm w-full" />
            <div className="h-3.5 bg-stone-100 rounded w-3/4" />
            <div className="h-3 bg-stone-100 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
