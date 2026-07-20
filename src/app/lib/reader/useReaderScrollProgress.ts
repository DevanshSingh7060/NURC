import { useEffect, useRef, useState, type DependencyList } from 'react';
import { safeStorage } from '../safeStorage';

export interface ScrollMetrics {
  el: Element | null;
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

/**
 * A scrollable "source" the reader may track. Components pass their own sources
 * in priority order so each keeps its exact scroll architecture (ReaderMode
 * scrolls an inner container; ReaderPage scrolls the page/wrapper).
 */
export interface ScrollSource {
  getEl: () => Element | null;
  getMetrics: () => ScrollMetrics;
}

interface Options {
  sources: ScrollSource[];
  /** localStorage key for scroll position (null = don't persist). */
  posKey: string | null;
  /** localStorage key for scroll percentage (null = don't persist). */
  pctKey: string | null;
  /** Optional restore callback invoked with the saved scrollTop on mount. */
  onRestore?: (savedTop: number) => void;
  /** When false the tracking effect is inactive (e.g. a closed overlay). */
  enabled?: boolean;
  /** Effect dependencies that should re-attach tracking (layout/content changes). */
  deps: DependencyList;
}

/**
 * Shared reading-progress engine for ReaderMode and ReaderPage. Encapsulates the
 * rAF-throttled scroll measurement, multi-container active-target selection,
 * percentage calculation, localStorage persistence, resize/ResizeObserver
 * re-measurement, and listener cleanup that were previously duplicated (~80 lines
 * each) across the two components.
 */
export function useReaderScrollProgress({
  sources,
  posKey,
  pctKey,
  onRestore,
  enabled = true,
  deps,
}: Options): number {
  const [progress, setProgress] = useState(0);

  // Keep latest values without forcing the effect to re-run on every render.
  const sourcesRef = useRef(sources);
  sourcesRef.current = sources;
  const onRestoreRef = useRef(onRestore);
  onRestoreRef.current = onRestore;

  useEffect(() => {
    if (!enabled) return;
    let frameId = 0;

    const compute = (e?: Event) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        let scrollTarget: EventTarget | null = e?.target ?? null;
        if (scrollTarget === document) {
          scrollTarget = document.documentElement || document.body;
        }

        const srcs = sourcesRef.current;
        const metrics = srcs.map((s) => s.getMetrics());

        let active: ScrollMetrics | null = null;
        if (scrollTarget) {
          const idx = srcs.findIndex((s) => s.getEl() === scrollTarget);
          if (idx >= 0) {
            active = metrics[idx];
          } else {
            const t = scrollTarget as HTMLElement;
            active = {
              el: t,
              scrollTop: t.scrollTop || 0,
              scrollHeight: t.scrollHeight || 0,
              clientHeight: t.clientHeight || 0,
            };
          }
        }

        if (!active || active.scrollHeight <= active.clientHeight) {
          active = metrics[0] ?? { el: null, scrollTop: 0, scrollHeight: 0, clientHeight: 0 };
          for (const m of metrics) {
            if (m.scrollHeight > m.clientHeight && m.scrollTop > 0) {
              active = m;
              break;
            }
          }
          if (active.scrollTop === 0) {
            const scrollable = metrics.filter((m) => m.scrollHeight > m.clientHeight + 10);
            if (scrollable.length > 0) active = scrollable[0];
          }
        }

        const scrollableHeight = active.scrollHeight - active.clientHeight;
        const pct =
          scrollableHeight <= 0
            ? 100
            : Math.abs(scrollableHeight - active.scrollTop) < 10
              ? 100
              : (active.scrollTop / scrollableHeight) * 100;
        const rounded = Math.min(100, Math.max(0, pct));

        setProgress(rounded);
        if (posKey) safeStorage.setItem(posKey, active.scrollTop.toString());
        if (pctKey) safeStorage.setItem(pctKey, rounded.toString());
      });
    };

    const els = sourcesRef.current.map((s) => s.getEl()).filter((el): el is Element => el != null);

    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute, { passive: true });
    document.addEventListener('scroll', compute, { passive: true });
    document.body?.addEventListener('scroll', compute, { passive: true });
    els.forEach((el) => el.addEventListener('scroll', compute, { passive: true }));

    // Optional one-time restore of saved position.
    if (posKey && onRestoreRef.current) {
      const saved = safeStorage.getItem(posKey);
      if (saved) onRestoreRef.current(parseFloat(saved));
    }

    compute();
    const t1 = setTimeout(compute, 100);
    const t2 = setTimeout(compute, 300);
    const t3 = setTimeout(compute, 600);

    const resizeObserver = new ResizeObserver(() => compute());
    if (document.body) resizeObserver.observe(document.body);
    els.forEach((el) => resizeObserver.observe(el));

    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
      document.removeEventListener('scroll', compute);
      document.body?.removeEventListener('scroll', compute);
      els.forEach((el) => el.removeEventListener('scroll', compute));
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return progress;
}
