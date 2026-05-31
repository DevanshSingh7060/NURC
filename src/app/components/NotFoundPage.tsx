import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20">
      <div
        className="text-8xl font-bold mb-4"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--nurc-gold)', opacity: 0.4 }}
      >
        404
      </div>
      <h1
        className="mb-4"
        style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--nurc-navy)' }}
      >
        Page Not Found
      </h1>
      <p className="text-muted-foreground mb-8" style={{ fontSize: '16px', maxWidth: '360px', lineHeight: 1.75 }}>
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
        style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
      >
        <ArrowLeft size={15} />
        Back to Homepage
      </Link>
    </div>
  );
}
