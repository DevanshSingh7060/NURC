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
      <div
        className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
        style={{ background: 'rgba(184,92,68,0.1)' }}
      >
        <AlertTriangle size={30} style={{ color: '#B85C44' }} />
      </div>
      <h1
        className="mb-3"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--nurc-navy)',
        }}
      >
        {title ?? 'Something went wrong'}
      </h1>
      <p
        className="text-muted-foreground mb-8"
        style={{ fontSize: '16px', maxWidth: '420px', lineHeight: 1.75 }}
      >
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
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
          style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
        >
          <RefreshCw size={15} />
          Try Again
        </button>
        <a
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all hover:bg-muted"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--nurc-navy)',
            textDecoration: 'none',
          }}
        >
          <Home size={15} />
          Back to Homepage
        </a>
      </div>
    </div>
  );
}
