import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Accessibility behaviours for a modal dialog:
 * - locks body scroll while open
 * - moves focus into the dialog on open
 * - traps Tab / Shift+Tab within the dialog
 * - closes on Escape
 * - restores focus to the previously-focused element (the trigger) on close
 *
 * Attach the returned ref to the dialog container element.
 */
export function useDialogA11y<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!open) return;

    const container = containerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Lock background scroll.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const getFocusable = (): HTMLElement[] =>
      container
        ? Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (el) => el.offsetParent !== null || el === document.activeElement,
          )
        : [];

    // Move focus into the dialog.
    const focusables = getFocusable();
    (focusables[0] ?? container)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !container?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.body.style.overflow = prevOverflow;
      // Restore focus to the trigger element.
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return containerRef;
}
