import { Skeleton } from '../ui/skeleton';

/**
 * Skeleton loading state shown while a lazy-loaded route chunk is being fetched
 * (route-level code-splitting). Approximates a typical page shell — a heading
 * band plus a responsive card grid — so the transition reads as content loading
 * rather than a bare spinner.
 */
export function PageLoadingFallback() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16" role="status" aria-label="Loading page">
      {/* Heading band */}
      <div className="space-y-3 mb-10">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-2/3 max-w-xl" />
        <Skeleton className="h-4 w-1/2 max-w-md" />
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border p-5 space-y-4">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  );
}
