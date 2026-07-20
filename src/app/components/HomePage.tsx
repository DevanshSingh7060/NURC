import { useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  BookOpen,
  Shield,
  Clock,
  TrendingUp,
  ChevronRight,
  Star,
  Quote,
  ShieldCheck,
  HelpCircle,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { useReaderMode, SAMPLE_AUTO_ARTICLE } from './ReaderModeContext';
import { ClientMarquee } from './ClientMarquee';
import { useScrollFadeIn } from './useScrollFadeIn';
import { useLeadModal } from '../context/LeadModalContext';
import { SEOHead } from './shared/SEOHead';

import mercedesBenzLogo from '../../Logo/Mercedes Benz.png';
import bmwLogo from '../../Logo/BMW.png';
import tataLogo from '../../Logo/Tata.png';
import deutscheBankLogo from '../../Logo/Deutsche Bank.png';

const sectors = [
  {
    title: 'Automobiles',
    description:
      'Policy shifts, OEM strategy, EV transitions, component supply chains, and market dynamics.',
    color: '#006D7A',
    slug: 'auto',
    stats: 'Daily coverage',
  },
  {
    title: 'Banking',
    description:
      'RBI policy, credit cycles, NBFC landscape, digital banking, and capital market intelligence.',
    color: '#0A2540',
    slug: 'banking',
    stats: 'Daily coverage',
  },
  {
    title: 'Insurance',
    description:
      'Regulatory shifts, premium growth trends, health/life sector dynamics, and distribution strategies.',
    color: '#5B8A5E',
    slug: 'insurance',
    stats: 'Daily coverage',
  },
  {
    title: 'Mutual Funds',
    description:
      'AUM trends, regulatory updates, fund performance analysis, and retail inflow tracking.',
    color: '#8A6A3B',
    slug: 'mutual-funds',
    stats: 'Daily coverage',
  },
  {
    title: 'Infrastructure',
    description:
      'NHAI project pipeline, urban development, PPP deal flow, and construction sector dynamics.',
    color: '#3B6E8A',
    slug: 'infrastructure',
    stats: 'Daily coverage',
  },
  {
    title: 'Energy',
    description:
      'Renewables capacity, power procurement, coal-to-clean transitions, and tariff intelligence.',
    color: '#7B5C8A',
    slug: 'energy',
    stats: 'Daily coverage',
  },
  {
    title: 'Metals & Minerals',
    description:
      'Global pricing trends, domestic mining policy, steel capacity utilization, and raw material supply.',
    color: '#5B4A7B',
    slug: 'metals-minerals',
    stats: 'Daily coverage',
  },
  {
    title: 'FMCG',
    description:
      'D2C disruption, modern trade dynamics, rural distribution, pricing strategy, and consumer demand trends.',
    color: '#B85C44',
    slug: 'fmcg',
    stats: 'Daily coverage',
  },
];

const values = [
  {
    icon: Shield,
    title: 'Zero-Noise Intelligence',
    description:
      'Every brief is curated by domain experts. No filler, no wire rehash — only the 20% of information that drives 80% of decisions.',
  },
  {
    icon: Clock,
    title: 'In Your Inbox by 7 AM',
    description:
      'Morning delivery before your first meeting. Weekly deep-dives published every Tuesday. Always on time, always relevant.',
  },
  {
    icon: TrendingUp,
    title: 'Forward-Looking Analysis',
    description:
      "We don't just report what happened — we decode what it means for your sector, your competitors, and your strategy.",
  },
  {
    icon: BookOpen,
    title: 'Written for C-Suite',
    description:
      'No jargon, no padding. Direct, structured, executive-grade intelligence that respects your time and expertise.',
  },
];

const testimonials = [
  {
    quote:
      "NURC's Morning and Afternoon Newsletters stands out for its accuracy, comprehensiveness, and high consistency. The team tracks industry news accurately, which remains valuable source of information for automotive industry updates.",
    name: 'Shekhar Das Chowdhury',
    title: 'Head, Corporate Communications',
    company: 'Mercedes-Benz India',
    logo: mercedesBenzLogo,
  },
  {
    quote:
      "For us, staying informed with credible, timely, and relevant industry intelligence is an essential part of our communications and business updates. NURC MediaNext's Daily Newsletter has consistently been a dependable source of curated news, concisely presented and links, helping us keep pace with important developments.\n\nWhat sets the newsletter apart is the comprehensive coverage, combined with the ease of access, enables our team to quickly identify key trends, track industry movements, and stay connected with the evolving media landscape—all without having to sift through multiple sources.\n\nWe sincerely appreciate the professionalism, consistency, and commitment demonstrated by the NURC MediaNext team in delivering this service every day. We wish the entire team continued success and look forward to many more years of this excellent partnership.",
    name: 'Ajit Srinivasan',
    title: 'Deputy General Manager, Corporate Communications & PR',
    company: 'Isuzu India',
    logo: null,
  },
  {
    quote:
      'NURC MediaNext has been a valuable news update partner for BMW Group India, providing timely, relevant and well-curated automotive and industry updates. Their daily newsletter and Synoptic Auto Update offer a crisp, easy-to-consume view of key developments, helping our teams stay informed in a fast-moving media and business environment. We appreciate their consistency, responsiveness and understanding of our information needs, and value NURC as a dependable source for structured news intelligence.',
    name: 'Satchit Gayakwad',
    title: 'Marketing, Network Performance and Customer Support Communication',
    company: 'Press and Corporate Affairs',
    logo: null,
  },
];

const sectorColors: Record<string, string> = {
  Auto: '#E8F4F5',
  Banking: '#E8EEF4',
  Finance: '#F0EDF5',
};
const sectorTextColors: Record<string, string> = {
  Auto: '#006D7A',
  Banking: '#0A2540',
  Finance: '#5B4A7B',
};

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = t.quote.split('\n\n');
  // Long testimonials get collapsed into a compact preview with a "Read more" toggle.
  const isLong = t.quote.length > 300;

  return (
    <div className="rounded-xl p-6 bg-card border border-border">
      <Quote size={28} className="text-nurc-gold opacity-60 mb-4" />
      <div className="italic space-y-3 font-body text-[15px] leading-[1.75] text-nurc-navy">
        {!isLong || expanded ? (
          paragraphs.map((para, pi) => <p key={pi}>"{para}"</p>)
        ) : (
          <p className="line-clamp-4">"{paragraphs[0]}"</p>
        )}
      </div>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70 cursor-pointer bg-transparent border-0 p-0 text-nurc-teal font-heading"
          aria-expanded={expanded}
        >
          {expanded ? 'Read less' : 'Read more'}
          <ChevronDown
            size={14}
            className="transition-transform duration-200"
            style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
          />
        </button>
      )}

      <div className="flex items-center gap-3 mt-6">
        {t.logo ? (
          <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-border flex items-center justify-center p-1.5 shrink-0">
            <img
              src={t.logo}
              alt={`${t.company} logo`}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 bg-nurc-navy">
            {t.name
              .split(' ')
              .map((w) => w[0])
              .slice(0, 2)
              .join('')}
          </div>
        )}
        <div>
          <div className="font-semibold font-heading text-[14px] text-nurc-navy">{t.name}</div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {t.title} · {t.company}
          </div>
        </div>
      </div>
      <div className="flex gap-0.5 mt-4">
        {[...Array(5)].map((_, si) => (
          <Star key={si} size={12} fill="var(--nurc-gold)" className="text-nurc-gold" />
        ))}
      </div>
    </div>
  );
}

export function HomePage() {
  const { openReader } = useReaderMode();
  const { openDemoModal, openCoverageModal } = useLeadModal();
  const valueRef = useScrollFadeIn();
  const sectorsRef = useScrollFadeIn();
  const sampleRef = useScrollFadeIn();
  const testiRef = useScrollFadeIn();

  return (
    <div>
      {/* MARKER-MAKE-KIT-INVOKED */}
      <SEOHead
        title="India's Trusted Media Monitoring & Industry Intelligence Platform"
        description="Delivering curated industry news, media monitoring, market intelligence, and decision-ready insights to organizations across multiple sectors. Trusted by 500+ C-Suite executives since 2000."
        canonicalUrl="/"
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-nurc-navy min-h-[88vh] flex items-center">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-nurc-gold" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-nurc-gold" />
              <span className="text-xs font-bold uppercase text-nurc-gold tracking-[0.15em] font-heading">
                Established 2000 · 26 years of B2B Intelligence
              </span>
            </div>
            <h1 className="mb-6 text-white font-heading text-[clamp(36px,5vw,54px)] font-bold leading-[1.15] tracking-[-0.02em]">
              Daily Curated Information That Powers India’s Leading Corporations
            </h1>
            <p className="mb-10 text-white/70 font-body text-[17px] leading-[1.8] max-w-[520px]">
              For 26 years, Fortune have relied on the credible information provided by NURC News
              Updates -- the advertisement-free news collation service delivered daily to inboxes at
              the start of the day.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="btn-nurc h-12 flex items-center gap-2 px-6 rounded-xl text-white font-semibold transition-all hover:opacity-90 cursor-pointer text-sm animate-none bg-nurc-teal font-heading no-underline"
              >
                Request Demo
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                className="h-12 flex items-center gap-2 px-6 rounded-xl font-semibold border transition-all hover:bg-white/10 bg-transparent cursor-pointer text-sm text-white border-[rgba(255,255,255,0.3)] font-heading"
              >
                Request Sample
              </button>
            </div>

            {/* Social proof strip */}
            <div className="flex flex-wrap items-center gap-6 mt-12">
              <div className="text-center">
                <div className="font-bold text-white font-display text-[28px]">Mon - Sat</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-0.5">
                  Email Delivery
                </div>
              </div>
              {/* <div className="h-8 w-px bg-white/10" /> */}
              {/* <div className="text-center">
                <div className="font-bold text-white font-display text-[28px]">7</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-0.5">Sectors Covered</div>
              </div> */}
              {/* <div className="h-8 w-px bg-white/10" /> */}
              {/* <div className="text-center">
                <div className="font-bold text-white font-display text-[28px]">24</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-0.5">Years of Trust</div>
              </div> */}
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="font-bold text-white font-display text-[28px]">15 Days</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-0.5">
                  Free Trial
                </div>
              </div>
            </div>
          </div>

          {/* Hero image card */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.4)]">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&h=500&fit=crop&auto=format"
                alt="Corporate skyscrapers representing India's leading corporations served by NURC intelligence"
                className="w-full h-[420px] object-cover"
                width={700}
                height={500}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(10,37,64,0.7) 0%, transparent 60%)',
                }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div
                  className="rounded-xl p-6 backdrop-blur-sm bg-[rgba(255,255,255,0.1)]"
                  style={{
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-nurc-teal">
                      <BookOpen size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold font-heading">
                        Auto Industry Weekly
                      </div>
                      <div className="text-white/60 text-xs">Latest issue · May 27, 2025</div>
                    </div>
                    <button
                      onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                      className="ml-auto text-xs font-semibold h-12 flex items-center justify-center px-6 rounded-xl text-white transition-opacity hover:opacity-80 border-0 cursor-pointer bg-nurc-teal"
                    >
                      Read Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What NURC Does Section (New) */}
      <section className="py-16 bg-[#F9FAFB] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-[clamp(26px,3.5vw,38px)] font-bold text-nurc-navy leading-[1.25]">
              The NURC News Update
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-[15px]">
              is a subscription-based, daily news information service tailored for corporate
              executives, decision-makers, PR and communication teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Daily News Updates',
                description:
                  'We collate industry-specific news stories from credible print and online sources and email them directly to your corporate inbox every morning.',
                icon: BookOpen,
              },
              {
                title: 'Searchable Archives',
                description:
                  'Subscribers get free access to our comprehensive online archives, fully searchable by newspaper, category, and company.',
                icon: Star,
              },
              {
                title: 'Corporate Distribution',
                description:
                  'There is no limit to the number of employees within your organization who can receive our updates via intranet or direct mailing.',
                icon: Shield,
              },
              {
                title: 'Custom Intelligence',
                description:
                  'If our standard sector coverage does not meet your specific requirements, we can create tailored, customized updates for your organization.',
                icon: Settings,
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--nurc-teal)]/10 text-[var(--nurc-teal)] flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-[var(--nurc-navy)] mb-2 font-heading text-[16px]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Client Marquee — immediately after hero */}
      <ClientMarquee />

      {/* Why Leading Companies Trust NURC */}
      <section ref={valueRef} className="py-12 lg:py-20 bg-white border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-nurc-gold" />
              <span className="text-xs font-bold uppercase text-nurc-teal tracking-[0.14em] font-heading">
                Trust & Authority
              </span>
              <div className="h-px w-12 bg-nurc-gold" />
            </div>
            <h2 className="font-heading text-[clamp(26px,3.5vw,38px)] font-bold text-nurc-navy leading-[1.25]">
              Why Leading Companies Trust NURC
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-[15px]">
              Zero-noise, curated B2B executive intelligence built to drive strategic action and
              corporate growth.
            </p>
          </div>

          {/* 4-Card Trust Pillars Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: 'Consistently Punctual',
                description:
                  'Industry-specific news collated from credible print and online sources, delivered every single morning to your corporate ID.',
              },
              {
                icon: TrendingUp,
                title: 'Fortune 500 Trust',
                description:
                  'For over 26 years, our esteemed clients—ranging from top MNCs to growing Indian companies—have trusted our service.',
              },
              {
                icon: Settings,
                title: 'Customized Coverage',
                description:
                  "Beyond our standard sectors, we offer tailored news intelligence updates designed for your organization's unique requirements.",
              },
              {
                icon: ShieldCheck,
                title: 'Corporate-Wide Access',
                description:
                  'Subscribe once and distribute freely. We place no limits on the number of employees who can receive updates via intranet or email.',
              },
            ].map((prop, i) => {
              const Icon = prop.icon;
              return (
                <div
                  key={i}
                  className="rounded-xl p-6 bg-[#F9FAFB] border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-[rgba(0,109,122,0.08)]">
                    <Icon size={18} className="text-nurc-teal" />
                  </div>
                  <h3 className="mb-2 font-bold font-heading text-[15px] text-nurc-navy">
                    {prop.title}
                  </h3>
                  <p className="text-muted-foreground animate-none text-[13px] leading-[1.65]">
                    {prop.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry Coverage */}
      <section ref={sectorsRef} className="py-12 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-nurc-gold" />
              <span className="text-xs font-bold uppercase text-nurc-teal tracking-[0.14em] font-heading">
                Sectors
              </span>
              <div className="h-px w-12 bg-nurc-gold" />
            </div>
            <h2 className="font-heading text-[clamp(26px,3.5vw,36px)] font-bold text-nurc-navy leading-[1.25]">
              Intelligence Across India's Critical Sectors
            </h2>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-x-visible md:pb-0 max-md:[mask-image:linear-gradient(to_right,#000_85%,transparent)]">
            {sectors.map((sector, i) => (
              <Link
                key={i}
                to={`/industries/${sector.slug}`}
                className="group rounded-xl p-5 bg-card border border-border transition-all duration-200 block min-w-[260px] md:min-w-0 shrink-0 md:shrink hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-[3px]"
              >
                <div className="w-1.5 h-6 rounded-full mb-3" style={{ background: sector.color }} />
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading text-[16px] font-bold text-nurc-navy">
                    {sector.title}
                  </h3>
                  <ArrowRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2 mt-0.5"
                    style={{ color: sector.color }}
                  />
                </div>
                <p className="text-muted-foreground mb-3 text-[13px] leading-[1.6]">
                  {sector.description}
                </p>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: `${sector.color}15`, color: sector.color }}
                >
                  {sector.stats}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Preview */}
      <section ref={sampleRef} className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side Content Block */}
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-nurc-gold" />
                <span className="text-xs font-bold uppercase text-nurc-teal tracking-[0.14em] font-heading">
                  Sample Issue
                </span>
              </div>
              <h2 className="font-heading text-[clamp(24px,3.5vw,40px)] font-bold text-nurc-navy leading-[1.2] max-w-[480px]">
                See What Your Competitors Are Reading
              </h2>
              <p className="text-[clamp(16px,1.8vw,18px)] leading-[1.7] max-w-[500px] text-[#4B5563]">
                Read a complete sample of our Auto Industry Weekly — the same briefing that lands in
                the inboxes of CFOs and MDs at India's top automotive corporations every Tuesday
                morning.
              </p>
              <button
                onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                className="flex items-center gap-2 font-semibold text-white transition-all hover:opacity-90 cursor-pointer border-0 bg-nurc-teal font-heading h-12 pl-6 pr-6 rounded-xl"
              >
                <BookOpen size={18} />
                Open in Reader Mode
              </button>
            </div>

            {/* Right Side Newsletter Preview Card (Email Mockup) */}
            <div className="rounded-xl overflow-hidden border border-border bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              {/* Premium Email Mockup Header with 24px Padding */}
              <div className="bg-[#FAF9F6] border-b border-border p-6 text-left space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-nurc-teal font-heading">
                    Corporate Dispatch
                  </span>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </div>
                <div className="space-y-3 font-sans">
                  <div className="grid grid-cols-3 items-center pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-500 text-[14px]">Sender</span>
                    <span className="col-span-2 text-right font-semibold text-nurc-navy text-[15px]">
                      NURC MediaNext Intelligence Desk
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-500 text-[14px]">Recipient</span>
                    <span className="col-span-2 text-right font-semibold text-nurc-navy text-[15px]">
                      Corporate Subscriber
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-500 text-[14px]">Published</span>
                    <span className="col-span-2 text-right font-semibold text-nurc-navy text-[15px]">
                      12 June 2026
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <span className="font-medium text-gray-500 text-[14px]">Industry</span>
                    <span className="col-span-2 text-right font-semibold text-nurc-navy text-[15px]">
                      Automotive Intelligence Weekly
                    </span>
                  </div>
                </div>
              </div>

              {/* Refined Rounded Category Pills */}
              <div className="border-b border-border bg-[#F9FAFB] px-6 py-4 flex gap-2 flex-wrap items-center">
                {[
                  'Policy Update',
                  'Industry News',
                  'Competitor Intel',
                  'Market Data',
                  "Editor's Note",
                ].map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 rounded-full font-semibold tracking-wide bg-white text-nurc-teal text-[11px]"
                    style={{
                      border: '1px solid #E5E7EB',
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Clean Dividers and Headline List */}
              <div className="divide-y divide-gray-100">
                {[
                  {
                    tag: 'POLICY',
                    tagColor: '#006D7A',
                    title: 'FAME III Extended Through March 2027',
                    preview:
                      'Ministry extends subsidies for commercial EVs; ₹15,000/kWh for battery procurement...',
                  },
                  {
                    tag: 'INDUSTRY',
                    tagColor: '#0A2540',
                    title: 'Tata Motors Q4 Revenue Up 12.3% YoY',
                    preview:
                      'JLR performance in North America drives growth; EV division records 340% surge...',
                  },
                  {
                    tag: 'COMPETITOR',
                    tagColor: '#5B6A7B',
                    title: 'Hyundai Breaks Ground on Maharashtra Plant',
                    preview:
                      '₹6,000 crore investment; 200,000 unit capacity targeting mid-premium segment...',
                  },
                ].map((item, i) => (
                  <div key={i} className="px-6 py-5 bg-white text-left space-y-2">
                    <span
                      className="px-2.5 py-0.5 rounded font-bold uppercase tracking-wider animate-none text-[12px]"
                      style={{
                        background: `${item.tagColor}10`,
                        color: item.tagColor,
                      }}
                    >
                      {item.tag}
                    </span>
                    <h4 className="font-bold font-heading text-[18px] text-nurc-navy leading-[1.3]">
                      {item.title}
                    </h4>
                    <p className="leading-relaxed font-medium text-[14px] text-[#4B5563]">
                      {item.preview}
                    </p>
                  </div>
                ))}

                {/* Bottom CTA Button */}
                <div className="px-6 py-5 bg-[#FAF9F6] text-center border-t border-border">
                  <button
                    onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                    className="w-full flex items-center justify-center gap-2 font-bold text-white transition-all hover:opacity-95 cursor-pointer border-0 shadow-sm bg-nurc-teal font-heading h-12 rounded-xl"
                  >
                    <BookOpen size={16} />
                    Open in Reader Mode
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Trial Section (New) */}
      <section className="py-20 bg-nurc-navy">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-bold uppercase tracking-wider mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            No Commitment Required
          </div> */}
          <h2 className="text-white mb-6 font-display text-[clamp(28px,4vw,42px)] font-bold leading-[1.2]">
            Experience The NURC News Update
          </h2>
          <p className="text-white/70 mb-10 text-lg mx-auto max-w-[600px] leading-[1.7]">
            Sign up for a 15-day free trial. Allow multiple users from your organization to evaluate
            our daily sector-specific intelligence updates with absolutely no obligation to
            subscribe.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact?intent=trial"
              className="px-8 py-4 bg-[var(--nurc-teal)] hover:bg-[var(--nurc-teal)]/90 text-white rounded-xl font-bold text-lg transition-all font-heading"
            >
              Start Your 15-Day Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testiRef} className="py-12 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-nurc-gold" />
              <span className="text-xs font-bold uppercase text-nurc-teal tracking-[0.14em] font-heading">
                Testimonials
              </span>
              <div className="h-px w-12 bg-nurc-gold" />
            </div>
            <h2 className="font-heading text-[clamp(26px,3.5vw,36px)] font-bold text-nurc-navy leading-[1.25]">
              What Industry Leaders Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
