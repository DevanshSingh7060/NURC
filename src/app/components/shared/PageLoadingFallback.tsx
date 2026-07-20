/**
 * Minimal loading state shown during lazy-loaded route transitions.
 */
export function PageLoadingFallback() {
  return (
    <div
      className="flex items-center justify-center min-h-[60vh]"
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-nurc-teal border-t-transparent animate-spin" />
        <span className="text-xs text-muted-foreground font-medium font-heading">Loading...</span>
      </div>
    </div>
  );
}
