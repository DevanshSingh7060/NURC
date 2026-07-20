import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

/**
 * Shows a fixed banner when the browser goes offline, and removes it when the
 * connection returns. Uses the navigator online/offline events.
 */
export function OfflineBanner() {
  const [offline, setOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false,
  );

  useEffect(() => {
    const goOnline = () => setOffline(false);
    const goOffline = () => setOffline(true);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-0 inset-x-0 z-[60] flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#B85C44]"
    >
      <WifiOff size={14} />
      You're offline — some features may be unavailable until your connection returns.
    </div>
  );
}
