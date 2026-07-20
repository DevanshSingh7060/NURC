import { useRouteError, isRouteErrorResponse } from 'react-router';
import { ErrorFallback } from './ErrorFallback';

/**
 * Route-level error element for react-router. Renders the branded ErrorFallback
 * when a route component throws during render (the generic 500/error surface).
 */
export function RouteErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorFallback
        title={`${error.status} ${error.statusText}`}
        description="We couldn't load this page. Please try again or return to the homepage."
      />
    );
  }

  return <ErrorFallback error={error} />;
}
