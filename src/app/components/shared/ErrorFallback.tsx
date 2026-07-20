import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  /** Optional error, shown (message only) in dev for debugging. */
  error?: unknown;
  /** Optional in-app reset (e.g. React ErrorBoundary retry). */
  onReset?: () => void;
  title?: string;
  description?: string;
}

/**
 * Branded full-screen error surface. Used by the root ErrorBoundary and by the
 * router's route-level error element — i.e. this is the generic 500/runtime-error
 * page, distinct from the static 404 (NotFoundPage).
 */
export function ErrorFallback({ error, onReset, title, description }: Props) {
  const message = error instanceof Error ? error.message : undefined;
  const isDev = import.meta.env.DEV;

  return (
    <div
      role="alert"
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20"
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-[#B85C44]/10">
        <AlertTriangle size={30} className="text-[#B85C44]" />
      </div>
      <h1 className="mb-3 font-display text-[28px] font-bold text-nurc-navy">
        {title ?? 'Something went wrong'}
      </h1>
      <p className="text-muted-foreground mb-8 text-base max-w-[420px] leading-[1.75]">
        {description ??
          'An unexpected error occurred while loading this page. You can try again, or head back to the homepage.'}
      </p>

      {isDev && message && (
        <pre className="mb-8 max-w-lg overflow-auto rounded-lg bg-muted p-3 text-left text-xs text-red-700">
          {message}
        </pre>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => (onReset ? onReset() : window.location.reload())}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 bg-nurc-teal font-heading"
        >
          <RefreshCw size={15} />
          Try Again
        </button>
        <a
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all hover:bg-muted border-border text-nurc-navy no-underline"
        >
          <Home size={15} />
          Back to Homepage
        </a>
      </div>
    </div>
  );
}
