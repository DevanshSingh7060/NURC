import { useParams, Link } from 'react-router';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useReaderMode, SAMPLE_AUTO_ARTICLE, SAMPLE_BANKING_ARTICLE } from './ReaderModeContext';
import { SEOHead } from './shared/SEOHead';

const sectorData: Record<
  string,
  {
    title: string;
    subtitle?: string;
    description: string;
    color: string;
    image: string;
    imageOpacity?: number;
    overlayGradient?: string;
    stats: { label: string; value: string }[];
    benefits: string[];
    article: typeof SAMPLE_AUTO_ARTICLE;
  }
> = {
  auto: {
    title: 'Auto & Mobility',
    description:
      "NURC's automotive & mobility covers the full value chain — from government policy and OEM strategy to dealer economics and used car markets. Trusted by CFOs and strategy heads at Mercedes-Benz, Tata Motors, Bosch India, and 30+ auto sector leaders.",
    color: '#006D7A',
    image:
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1600&h=600&fit=crop&auto=format',
    imageOpacity: 0.6,
    overlayGradient: 'linear-gradient(to right, #006D7Acc 0%, #006D7A80 55%, #006D7A33 100%)',
    stats: [
      { label: 'OEMs Tracked', value: '16+' },
      { label: 'Policy Sources', value: '40+' },
      { label: 'Issues per Year', value: '52' },
      { label: 'Subscribers', value: '180+' },
    ],
    benefits: [
      'Weekly EV policy and FAME subsidy tracking',
      'OEM quarterly results analysis and outlook',
      'Competitor product and market strategy intelligence',
      'Component supply chain disruption alerts',
      'Used car market and financing trends',
      'Dealer viability and margin intelligence',
    ],
    article: SAMPLE_AUTO_ARTICLE,
  },
  banking: {
    title: 'Banking & Finance Intelligence',
    subtitle: 'Weekly · 40+ Institutions · RBI to Boardroom',
    description:
      'Comprehensive intelligence for senior executives at banks, NBFCs, and financial services firms. From RBI policy decisions and credit cycle analysis to digital banking competition and capital market dynamics.',
    color: '#0A2540',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=500&fit=crop&auto=format',
    stats: [
      { label: 'Institutions Tracked', value: '40+' },
      { label: 'RBI Sources', value: 'Daily' },
      { label: 'Issues per Year', value: '52' },
      { label: 'Subscribers', value: '120+' },
    ],
    benefits: [
      'RBI policy meeting analysis and forward guidance',
      'NPA cycle and credit quality tracking',
      'Digital banking and fintech competitive landscape',
      'Capital market fundraising and deal intelligence',
      'Priority sector lending compliance updates',
      'NBFC regulatory framework monitoring',
    ],
    article: SAMPLE_BANKING_ARTICLE,
  },
  infrastructure: {
    title: 'Infrastructure Intelligence',
    subtitle: 'Weekly · ₹11L Crore Pipeline · NHAI to PPP',
    description:
      "Tracking India's infrastructure mega-programmes — NHAI highway pipeline, urban transport, smart cities, ports, and PPP deal flow. Essential intelligence for infrastructure companies, lenders, and government affairs teams.",
    color: '#3B6E8A',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=500&fit=crop&auto=format',
    stats: [
      { label: 'Projects Tracked', value: '1,200+' },
      { label: 'Pipeline Value', value: '₹11L Cr' },
      { label: 'Issues per Year', value: '52' },
      { label: 'Subscribers', value: '85+' },
    ],
    benefits: [
      'NHAI project awards and pipeline tracking',
      'PPP concession agreement analysis',
      'State infrastructure budget intelligence',
      'Real estate and urban development trends',
      'Toll revenue and traffic data',
      'Construction sector capacity and pricing',
    ],
    article: SAMPLE_AUTO_ARTICLE,
  },
  energy: {
    title: 'Energy & Power Intelligence',
    subtitle: 'Weekly · 180 GW Pipeline · Coal to Clean',
    description:
      "From renewable capacity additions and power procurement to coal plant retirement timelines and green hydrogen policy. Strategic intelligence for energy companies, utilities, and investors in India's energy transition.",
    color: '#5B8A5E',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=500&fit=crop&auto=format',
    stats: [
      { label: 'GW Pipeline', value: '180+' },
      { label: 'States Covered', value: '28' },
      { label: 'Issues per Year', value: '52' },
      { label: 'Subscribers', value: '95+' },
    ],
    benefits: [
      'Renewable capacity auction and award tracking',
      'Power purchase agreement analysis',
      'Coal plant retirement and transition timelines',
      'Green hydrogen PLI and policy intelligence',
      'Energy storage procurement updates',
      'Electricity tariff order analysis',
    ],
    article: SAMPLE_AUTO_ARTICLE,
  },
  healthcare: {
    title: 'Healthcare Intelligence',
    subtitle: 'Bi-weekly · 35 Groups · Pharma to Policy',
    description:
      'Strategic intelligence for hospital group executives, pharma companies, medical device firms, and healthcare investors in India. CDSCO regulatory updates, PM-JAY intelligence, and sector M&A tracking.',
    color: '#7B5C8A',
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&h=500&fit=crop&auto=format',
    stats: [
      { label: 'Hospital Groups', value: '35+' },
      { label: 'States Monitored', value: '28' },
      { label: 'Issues per Year', value: '26' },
      { label: 'Subscribers', value: '60+' },
    ],
    benefits: [
      'CDSCO medical device regulatory updates',
      'Hospital group M&A and capacity expansion',
      'PM-JAY empanelment and tariff revisions',
      'Pharma policy and pricing intelligence',
      'Clinical trial regulatory framework',
      'Medical insurance market dynamics',
    ],
    article: SAMPLE_AUTO_ARTICLE,
  },
  fmcg: {
    title: 'FMCG & Retail Intelligence',
    subtitle: 'Weekly · 50+ Brands · D2C to Kirana',
    description:
      "Intelligence on India's fast-moving consumer goods and retail landscape — D2C disruption, modern trade dynamics, rural distribution, pricing strategies, and regulatory developments.",
    color: '#B85C44',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=500&fit=crop&auto=format',
    stats: [
      { label: 'Brands Tracked', value: '50+' },
      { label: 'Retail Formats', value: '8' },
      { label: 'Issues per Year', value: '52' },
      { label: 'Subscribers', value: '75+' },
    ],
    benefits: [
      'D2C and quick commerce competitive intelligence',
      'Rural distribution and penetration analytics',
      'Modern trade and e-commerce dynamics',
      'Raw material and packaging cost tracking',
      'Consumer sentiment and volume trend analysis',
      'GST and FSSAI regulatory intelligence',
    ],
    article: SAMPLE_AUTO_ARTICLE,
  },
};

export function SectorPage() {
  const { slug } = useParams<{ slug: string }>();
  const { openReader } = useReaderMode();
  const sector = sectorData[slug || 'auto'] || sectorData.auto;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${sector.title} | NURC MediaNext`}
        description={sector.description}
        canonicalUrl={`/industries/${slug || 'auto'}`}
      />
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: sector.color }}>
        <div className="absolute inset-0">
          <img
            src={sector.image}
            alt={`${sector.title} background`}
            className="w-full h-full object-cover"
            style={{ opacity: sector.imageOpacity ?? 0.2 }}
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                sector.overlayGradient ??
                `linear-gradient(to right, ${sector.color} 40%, ${sector.color}80 100%)`,
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          {sector.subtitle && (
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-white/40" />
              <span className="text-xs font-bold uppercase text-white/70 tracking-[0.14em] font-heading">
                {sector.subtitle}
              </span>
            </div>
          )}
          <h1 className="text-white mb-5 font-display text-[clamp(28px,4vw,48px)] font-bold leading-[1.2] max-w-[700px]">
            {sector.title}
          </h1>
          <p className="text-white/80 mb-10 text-[17px] leading-[1.8] max-w-[580px]">
            {sector.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => openReader(sector.article)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white transition-all hover:opacity-90 font-heading"
              style={{ color: sector.color }}
            >
              <BookOpen size={16} />
              Read Latest Issue
            </button>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-white/30 text-white transition-all hover:bg-white/10 animate-none font-heading"
            >
              Request Demo
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sector.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="font-bold mb-1 font-display text-[32px]"
                  style={{ color: sector.color }}
                >
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm font-heading">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="mb-8 font-display text-[clamp(22px,3vw,32px)] font-bold text-nurc-navy leading-[1.3]">
              What's Inside Every Issue
            </h2>
            <div className="space-y-4">
              {sector.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${sector.color}20` }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: sector.color }}
                    />
                  </div>
                  <span className="text-[15px] leading-[1.65] text-foreground font-body">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="mb-6 font-display text-[clamp(22px,3vw,32px)] font-bold text-nurc-navy leading-[1.3]">
              Recent Issues
            </h2>
            {[
              {
                title: 'Latest Issue',
                date: 'May 27, 2025',
                summary: sector.article.content[0].text?.slice(0, 120) + '...',
              },
              {
                title: 'Previous Issue',
                date: 'May 20, 2025',
                summary: sector.article.content[1]?.text?.slice(0, 120) + '...',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-5 bg-card border border-border transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold font-heading text-[14px] text-nurc-navy">
                    {sector.article.title} — {item.title}
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 ml-4">{item.date}</span>
                </div>
                <p className="text-muted-foreground mb-4 text-[13px] leading-[1.65]">
                  {item.summary}
                </p>
                <button
                  onClick={() => openReader(sector.article)}
                  className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70 font-heading"
                  style={{ color: sector.color }}
                >
                  <BookOpen size={13} />
                  Open in Reader Mode
                </button>
              </div>
            ))}

            <Link
              to="/newsletters"
              className="flex items-center gap-2 text-sm font-semibold mt-4 transition-opacity hover:opacity-70 font-heading"
              style={{ color: sector.color }}
            >
              View full archive
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-nurc-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white mb-4 font-display text-[clamp(24px,3.5vw,36px)] font-bold leading-[1.2]">
            Start with a Free Sample Issue
          </h2>
          <p className="text-white/60 mb-8 text-[16px] leading-[1.75]">
            No commitment required. Experience the depth and quality of our {sector.title} before
            subscribing.
          </p>
          <button
            onClick={() => openReader(sector.article)}
            className="px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 font-heading"
            style={{ background: sector.color }}
          >
            Read Sample Issue Now
          </button>
        </div>
      </section>
    </div>
  );
}
