/**
 * localStorage wrapper that never throws. Handles Safari private mode, disabled
 * storage, and QuotaExceededError by degrading gracefully instead of crashing
 * the app. Reads fall back to null; writes return false on failure.
 */
export const safeStorage = {
  getItem(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem(key: string, value: string): boolean {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },

  removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* no-op: storage unavailable */
    }
  },
};
