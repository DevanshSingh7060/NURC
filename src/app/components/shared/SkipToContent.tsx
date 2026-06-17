/**
 * Skip-to-content link for keyboard/screen reader users.
 * Visually hidden until focused via Tab key.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold focus:bg-[var(--nurc-navy)] focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--nurc-teal)]"
    >
      Skip to main content
    </a>
  );
}
