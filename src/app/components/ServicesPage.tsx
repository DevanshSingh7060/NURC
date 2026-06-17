import { Link } from 'react-router';
import { ArrowRight, BookOpen, Search, Settings, Users, Clock, CheckCircle2 } from 'lucide-react';
import { SEOHead } from './shared/SEOHead';

const services = [
  {
    icon: BookOpen,
    title: 'The N.U.R.C. News Update',
    subtitle: 'Our Core Product',
    description:
      'A daily emailed newsletter that collates industry-specific news stories from credible print and online sources. Every morning, subscribers receive a reader-friendly digest covering developments relevant to their sector, organization, and competition.',
    features: [
      'Delivered to corporate email IDs every morning',
      'Curated from credible print and online publications',
      'Reader-friendly format designed for executive consumption',
      'Covers 7 core industry sectors',
    ],
    color: '#006D7A',
  },
  {
    icon: Search,
    title: 'Searchable Digital Archives',
    subtitle: 'Included Free With Subscription',
    description:
      'All subscribers receive complimentary access to our comprehensive online news archives. The archive spans multiple industry verticals and allows detailed search by newspaper source, industry category, and company name.',
    features: [
      'Free access included with every subscription',
      'Searchable by newspaper, category, and company',
      'Spans multiple industry verticals',
      'Historical data across all covered sectors',
    ],
    color: '#0A2540',
  },
  {
    icon: Settings,
    title: 'Custom Intelligence Updates',
    subtitle: 'Tailored To Your Needs',
    description:
      'If our standard sector-specific updates do not meet your particular content or formatting requirements, we offer fully customized intelligence packages designed around your organization\'s unique needs.',
    features: [
      'Tailored content beyond standard sector coverage',
      'Custom formatting to match your internal workflows',
      'Flexible scope — from single-topic to multi-sector',
      'Dedicated editorial support for configuration',
    ],
    color: '#3B6E8A',
  },
  {
    icon: Users,
    title: 'Corporate-Wide Distribution',
    subtitle: 'No Per-Seat Limits',
    description:
      'There is no limit to the number of employees within a subscribing organization who can receive our updates. Distribute via intranet, direct mailing lists, or any internal communication channel.',
    features: [
      'Unlimited employees per subscribing organization',
      'Distribution via intranet or direct email',
      'No additional per-seat licensing costs',
      'Ideal for large corporate teams and departments',
    ],
    color: '#5B8A5E',
  },
];

const sectors = [
  { name: 'Automobiles', slug: 'auto', color: '#006D7A' },
  { name: 'Banking', slug: 'banking', color: '#0A2540' },
  { name: 'Insurance', slug: 'insurance', color: '#5B8A5E' },
  { name: 'Mutual Funds', slug: 'mutual-funds', color: '#8A6A3B' },
  { name: 'Infrastructure', slug: 'infrastructure', color: '#3B6E8A' },
  { name: 'Energy', slug: 'energy', color: '#7B5C8A' },
  { name: 'Metals & Minerals', slug: 'metals-minerals', color: '#5B4A7B' },
];

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Services | NURC MediaNext — Daily Industry News Intelligence"
        description="N.U.R.C. MediaNext provides daily emailed news intelligence updates, searchable archives, custom reports, and corporate-wide distribution for Fortune 500 and leading Indian companies."
        canonicalUrl="/services"
      />

      {/* Hero */}
      <section className="py-20 border-b border-border" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: 'var(--nurc-gold)' }} />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--nurc-teal)', letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}
            >
              Our Services
            </span>
          </div>
          <h1
            className="mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: 'var(--nurc-navy)',
              lineHeight: 1.15,
              maxWidth: '700px',
            }}
          >
            Daily Curated News Intelligence for Corporate India
          </h1>
          <p
            className="text-muted-foreground mb-8"
            style={{ fontSize: '17px', lineHeight: 1.85, maxWidth: '620px' }}
          >
            For over 24 years, N.U.R.C. MediaNext has provided subscription-based daily news intelligence to Fortune 500 organizations, top MNCs, and growing Indian companies. Our service keeps executives, decision-makers, and corporate communications teams informed about their industry, organization, and competition.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact?intent=trial"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
            >
              Start 15-Day Free Trial
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-border transition-all hover:bg-gray-50"
              style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-10">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card overflow-hidden"
                >
                  <div className="grid lg:grid-cols-5 gap-0">
                    {/* Left panel */}
                    <div
                      className="lg:col-span-2 p-8 flex flex-col justify-center"
                      style={{ background: service.color }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                        <Icon size={22} className="text-white" />
                      </div>
                      <div
                        className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2"
                        style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-heading)' }}
                      >
                        {service.subtitle}
                      </div>
                      <h3
                        className="text-white mb-3"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(20px, 2.5vw, 26px)',
                          fontWeight: 700,
                          lineHeight: 1.25,
                        }}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Right panel */}
                    <div className="lg:col-span-3 p-8">
                      <p
                        className="text-muted-foreground mb-6"
                        style={{ fontSize: '15px', lineHeight: 1.8 }}
                      >
                        {service.description}
                      </p>
                      <div className="space-y-2.5">
                        {service.features.map((feature, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <CheckCircle2
                              size={16}
                              className="shrink-0 mt-0.5"
                              style={{ color: service.color }}
                            />
                            <span
                              className="text-sm"
                              style={{ color: 'var(--nurc-navy)', lineHeight: 1.5 }}
                            >
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sectors Covered */}
      <section className="py-16 border-t border-border" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 3vw, 34px)',
                fontWeight: 700,
                color: 'var(--nurc-navy)',
              }}
            >
              7 Core Industry Sectors
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto" style={{ fontSize: '15px' }}>
              We provide daily news intelligence across these industry verticals. Each sector is covered by specialists with domain experience.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {sectors.map((sector, i) => (
              <Link
                key={i}
                to={`/industries/${sector.slug}`}
                className="rounded-xl p-5 text-center border border-border bg-card hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-3"
                  style={{ background: sector.color }}
                />
                <div
                  className="font-semibold text-sm"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--nurc-navy)' }}
                >
                  {sector.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Free Trial CTA */}
      <section className="py-20" style={{ background: 'var(--nurc-navy)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-bold uppercase tracking-wider mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Clock size={12} />
            15-Day Free Trial
          </div>
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 3.5vw, 38px)',
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Try Our Intelligence Service — No Commitment
          </h2>
          <p className="text-white/60 mb-8" style={{ fontSize: '16px', lineHeight: 1.75 }}>
            Request a 15-day free trial for your organization. Multiple users can evaluate our daily sector-specific updates with absolutely no obligation to subscribe.
          </p>
          <Link
            to="/contact?intent=trial"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
          >
            Request Free Trial
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
