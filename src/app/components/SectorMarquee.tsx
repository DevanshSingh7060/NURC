import { Link } from 'react-router';

interface Sector {
  title: string;
  color: string;
  slug: string;
}

// Keep in sync with the sector lists in HomePage / ServicesPage / Header
const sectors: Sector[] = [
  { title: 'Automobiles', color: '#006D7A', slug: 'auto' },
  { title: 'Banking', color: '#0A2540', slug: 'banking' },
  { title: 'Insurance', color: '#5B8A5E', slug: 'insurance' },
  { title: 'Mutual Funds', color: '#8A6A3B', slug: 'mutual-funds' },
  { title: 'Infrastructure', color: '#3B6E8A', slug: 'infrastructure' },
  { title: 'Energy', color: '#7B5C8A', slug: 'energy' },
  { title: 'Metals & Minerals', color: '#5B4A7B', slug: 'metals-minerals' },
  { title: 'FMCG', color: '#B85C44', slug: 'fmcg' },
];

function SectorPill({ sector }: { sector: Sector }) {
  return (
    <Link
      to={`/industries/${sector.slug}`}
      className="nurc-sector-pill"
      style={{ fontFamily: 'var(--font-heading)' }}
    >
      <span
        className="nurc-sector-dot"
        style={{ background: sector.color }}
        aria-hidden="true"
      />
      {sector.title}
    </Link>
  );
}

interface Props {
  label?: string;
}

export function SectorMarquee({ label = 'Sectors We Cover' }: Props) {
  // Duplicate so the two groups produce a seamless -50% loop
  const items = [...sectors, ...sectors];

  return (
    <section className="bg-card select-none py-10 border-t border-border" aria-label="Sectors we cover">
      {label && (
        <h3
          className="text-center"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--nurc-teal)',
            marginBottom: '1.5rem',
          }}
        >
          {label}
        </h3>
      )}

      <div className="nurc-sector-marquee-wrap">
        <div className="nurc-sector-marquee-track">
          <div className="nurc-sector-marquee-group">
            {items.map((s, i) => (
              <SectorPill key={`group-1-${i}`} sector={s} />
            ))}
          </div>
          <div className="nurc-sector-marquee-group" aria-hidden="true">
            {items.map((s, i) => (
              <SectorPill key={`group-2-${i}`} sector={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
