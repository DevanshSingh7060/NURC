import { Link } from 'react-router';
import {
  ArrowRight, BookOpen, Shield, Clock, TrendingUp,
  ChevronRight, Star, Quote, ShieldCheck, HelpCircle
} from 'lucide-react';
import { useReaderMode, SAMPLE_AUTO_ARTICLE } from './ReaderModeContext';
import { ClientMarquee } from './ClientMarquee';
import { useScrollFadeIn } from './useScrollFadeIn';
import { useLeadModal } from '../context/LeadModalContext';

const keyClients = [
  {
    name: 'Mercedes-Benz',
    sector: 'Auto',
    Logo: () => (
      <svg className="h-6 w-auto text-[var(--nurc-navy)] shrink-0" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M50,7.5 L50,50 L13.2,71.2 L50,50 L86.8,71.2 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="50" r="2.5" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'BMW India',
    sector: 'Auto',
    Logo: () => (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#1A1A1A" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="50" cy="50" r="32" fill="#FFFFFF" />
        <path d="M50,18 A32,32 0 0,0 18,50 L50,50 Z" fill="#0066B2" />
        <path d="M50,50 L82,50 A32,32 0 0,0 50,18 Z" fill="#FFFFFF" />
        <path d="M50,50 L50,82 A32,32 0 0,0 82,50 Z" fill="#0066B2" />
        <path d="M18,50 A32,32 0 0,0 50,82 L50,50 Z" fill="#FFFFFF" />
        <text x="31" y="14" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-40 31 14)">B</text>
        <text x="47" y="11" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">M</text>
        <text x="63" y="14" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" transform="rotate(40 63 14)">W</text>
      </svg>
    )
  },
  {
    name: 'Tata Motors',
    sector: 'Auto',
    Logo: () => (
      <svg className="h-5 w-auto shrink-0" viewBox="0 0 150 60">
        <ellipse cx="75" cy="30" rx="42" ry="25" fill="none" stroke="#00529B" strokeWidth="4.5" />
        <path d="M52,18 C65,18 70,36 75,46 C80,36 85,18 98,18 C83,18 80,32 75,41 C70,32 67,18 52,18 Z" fill="#00529B" />
        <text x="75" y="56" fill="#00529B" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1.5">TATA</text>
      </svg>
    )
  },
  {
    name: 'Mahindra',
    sector: 'Auto',
    Logo: () => (
      <svg className="h-5 w-auto shrink-0" viewBox="0 0 150 50">
        <path d="M25,45 L15,10 L30,30 L45,10 L35,45" fill="none" stroke="#E31837" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="56" y="38" fill="#E31837" fontSize="21" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">Mahindra</text>
      </svg>
    )
  },
  {
    name: 'Deutsche Bank',
    sector: 'Banking',
    Logo: () => (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 160 50">
        <rect x="10" y="10" width="30" height="30" fill="none" stroke="#0018A8" strokeWidth="4" />
        <line x1="16" y1="34" x2="34" y2="16" stroke="#0018A8" strokeWidth="4.5" strokeLinecap="round" />
        <text x="52" y="32" fill="#0018A8" fontSize="15" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="0.2">Deutsche Bank</text>
      </svg>
    )
  },
  {
    name: 'HDFC Life',
    sector: 'Banking',
    Logo: () => (
      <svg className="h-6 w-auto shrink-0" viewBox="0 0 160 50">
        <rect x="10" y="8" width="20" height="20" fill="none" stroke="#ED1C24" strokeWidth="3.5" />
        <rect x="20" y="18" width="20" height="20" fill="none" stroke="#0054A6" strokeWidth="3.5" />
        <text x="50" y="26" fill="#000000" fontSize="15" fontWeight="bold" fontFamily="sans-serif">HDFC Life</text>
      </svg>
    )
  }
];

const clientLogos = [
  { name: 'Mercedes-Benz', sector: 'Auto' },
  { name: 'BMW India', sector: 'Auto' },
  { name: 'Volvo', sector: 'Auto' },
  { name: 'Tata Motors', sector: 'Auto' },
  { name: 'Mahindra', sector: 'Auto' },
  { name: 'Bosch India', sector: 'Auto' },
  { name: 'Maruti Suzuki', sector: 'Auto' },
  { name: 'Hyundai India', sector: 'Auto' },
  { name: 'Honda Cars', sector: 'Auto' },
  { name: 'Bajaj Auto', sector: 'Auto' },
  { name: 'Hero MotoCorp', sector: 'Auto' },
  { name: 'TVS Motor', sector: 'Auto' },
  { name: 'Ashok Leyland', sector: 'Auto' },
  { name: 'MG Motor', sector: 'Auto' },
  { name: 'Kia India', sector: 'Auto' },
  { name: 'Volkswagen', sector: 'Auto' },
  { name: 'HDFC Life', sector: 'Banking' },
  { name: 'Deutsche Bank', sector: 'Banking' },
  { name: 'ICICI Bank', sector: 'Banking' },
  { name: 'Kotak Mahindra', sector: 'Banking' },
  { name: 'Axis Bank', sector: 'Banking' },
  { name: 'Crisil', sector: 'Finance' },
  { name: 'SBI Cards', sector: 'Banking' },
  { name: 'Skoda India', sector: 'Auto' },
];

const sectors = [
  {
    title: 'Auto & Mobility',
    description: 'Policy shifts, OEM strategy, EV transitions, component supply chains, and market dynamics.',
    color: '#006D7A',
    slug: 'auto',
    stats: '16 OEMs tracked',
  },
  {
    title: 'Banking & Finance',
    description: 'RBI policy, credit cycles, NBFC landscape, digital banking, and capital market intelligence.',
    color: '#0A2540',
    slug: 'banking',
    stats: '40+ institutions',
  },
  {
    title: 'Infrastructure',
    description: 'NHAI project pipeline, urban development, PPP deal flow, and construction sector dynamics.',
    color: '#3B6E8A',
    slug: 'infrastructure',
    stats: '₹11L Cr tracked',
  },
  {
    title: 'Energy & Power',
    description: 'Renewables capacity, power procurement, coal-to-clean transitions, and tariff intelligence.',
    color: '#5B8A5E',
    slug: 'energy',
    stats: '180 GW pipeline',
  },
  {
    title: 'Healthcare',
    description: 'Hospital group strategy, pharma policy, medical devices, and public health procurement.',
    color: '#7B5C8A',
    slug: 'healthcare',
    stats: '35 groups tracked',
  },
  {
    title: 'FMCG & Retail',
    description: 'D2C disruption, modern trade dynamics, rural penetration, and pricing strategy shifts.',
    color: '#8A6A3B',
    slug: 'fmcg',
    stats: '50+ brands',
  },
];

const values = [
  {
    icon: Shield,
    title: 'Zero-Noise Intelligence',
    description: 'Every brief is curated by domain experts. No filler, no wire rehash — only the 20% of information that drives 80% of decisions.',
  },
  {
    icon: Clock,
    title: 'In Your Inbox by 7 AM',
    description: 'Morning delivery before your first meeting. Weekly deep-dives published every Tuesday. Always on time, always relevant.',
  },
  {
    icon: TrendingUp,
    title: 'Forward-Looking Analysis',
    description: 'We don\'t just report what happened — we decode what it means for your sector, your competitors, and your strategy.',
  },
  {
    icon: BookOpen,
    title: 'Written for C-Suite',
    description: 'No jargon, no padding. Direct, structured, executive-grade intelligence that respects your time and expertise.',
  },
];

const testimonials = [
  {
    quote: 'NURC\'s auto intelligence brief is the first thing I read every Tuesday morning. It\'s saved us from two major misjudgements in the past year alone.',
    name: 'Vikram Malhotra',
    title: 'CFO',
    company: 'Leading German OEM, India Operations',
    initials: 'VM',
  },
  {
    quote: 'The depth of competitor intelligence in the banking digest is remarkable. We\'ve used it to sharpen our product strategy twice this quarter.',
    name: 'Priya Raghunathan',
    title: 'Managing Director',
    company: 'Private Sector Bank, Strategy Division',
    initials: 'PR',
  },
  {
    quote: 'Since 2002, this has been the single most reliable industry intelligence service in India. No other publication comes close for executive-level depth.',
    name: 'Arun Kapoor',
    title: 'CEO',
    company: 'Infrastructure Conglomerate',
    initials: 'AK',
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

export function HomePage() {
  const { openReader } = useReaderMode();
  const { openDemoModal, openCoverageModal } = useLeadModal();
  const valueRef  = useScrollFadeIn();
  const sectorsRef = useScrollFadeIn();
  const sampleRef  = useScrollFadeIn();
  const testiRef   = useScrollFadeIn();

  return (
    <div>
      {/* MARKER-MAKE-KIT-INVOKED */}
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'var(--nurc-navy)', minHeight: '88vh', display: 'flex', alignItems: 'center' }}
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'var(--nurc-gold)' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8" style={{ background: 'var(--nurc-gold)' }} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'var(--nurc-gold)', letterSpacing: '0.15em', fontFamily: 'var(--font-heading)' }}
              >
                Established 2002 · 23 Years of Intelligence
              </span>
            </div>
            <h1
              className="mb-6 text-white"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 58px)',
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Curated Intelligence for{' '}
              <span style={{ color: 'var(--nurc-gold)' }}>India's Industry Leaders</span>
            </h1>
            <p
              className="mb-10 text-white/70"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                lineHeight: 1.8,
                maxWidth: '520px',
              }}
            >
              NURC MediaNext delivers senior-executive intelligence across 15+ sectors — automotive, banking, infrastructure, energy, and more. Trusted by 500+ C-Suite leaders at India's most consequential corporations.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                className="btn-nurc flex items-center gap-2 px-6 py-3.5 rounded-lg text-white font-semibold transition-all hover:opacity-90 border-0 cursor-pointer text-sm"
                style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
              >
                Read Sample Issue
                <ArrowRight size={16} />
              </button>
              <button
                onClick={openDemoModal}
                className="flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold border transition-all hover:bg-white/10 bg-transparent cursor-pointer text-sm"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-heading)' }}
              >
                Schedule B2B Demo
              </button>
            </div>

            {/* Social proof strip */}
            <div className="flex flex-wrap items-center gap-6 mt-12">
              <div className="text-center">
                <div className="font-bold text-white" style={{ fontFamily: 'var(--font-display)', fontSize: '28px' }}>500+</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-0.5">C-Suite Readers</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="font-bold text-white" style={{ fontFamily: 'var(--font-display)', fontSize: '28px' }}>15+</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-0.5">Sectors Covered</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="font-bold text-white" style={{ fontFamily: 'var(--font-display)', fontSize: '28px' }}>23</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-0.5">Years of Trust</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="font-bold text-white" style={{ fontFamily: 'var(--font-display)', fontSize: '28px' }}>52</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-0.5">Issues per Year</div>
              </div>
            </div>
          </div>

          {/* Hero image card */}
          <div className="hidden lg:block relative">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 32px 64px rgba(0,0,0,0.4)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1729551610680-c6ea05b08937?w=700&h=500&fit=crop&auto=format"
                alt="Executive conference room"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,37,64,0.7) 0%, transparent 60%)' }} />
              <div className="absolute bottom-6 left-6 right-6">
                <div
                  className="rounded-xl p-4 backdrop-blur-sm"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--nurc-teal)' }}>
                      <BookOpen size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                        Auto Industry Weekly
                      </div>
                      <div className="text-white/60 text-xs">Latest issue · May 27, 2025</div>
                    </div>
                    <button
                      onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                      className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-80"
                      style={{ background: 'var(--nurc-teal)' }}
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

      {/* Client Marquee — immediately after hero */}
      <ClientMarquee />

      {/* Client Logos Static Grid */}
      <section className="py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'var(--nurc-teal)', letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}
              >
                Trusted By
              </span>
              <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                fontWeight: 700,
                color: 'var(--nurc-navy)',
                lineHeight: 1.2,
              }}
            >
              Trusted by India's Leading Corporations
            </h2>
            <p className="text-muted-foreground mx-auto" style={{ maxWidth: '500px', lineHeight: 1.7, fontSize: '16px' }}>
              From Germany's finest auto brands to India's top financial institutions — the country's most consequential decision-makers rely on NURC.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-center items-center">
            {keyClients.map((client, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-2xl p-5 border transition-all duration-300 bg-white shadow-sm border-gray-100 hover:shadow-md hover:-translate-y-0.5"
                style={{ minHeight: '110px' }}
              >
                <div className="h-10 flex items-center justify-center mb-3">
                  <client.Logo />
                </div>
                <div
                  className="font-bold text-center text-[10px]"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--nurc-navy)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {client.name}
                </div>
                <div
                  className="mt-1 px-2 py-0.5 rounded-full text-center text-[8px] font-bold tracking-widest"
                  style={{
                    background: sectorColors[client.sector] || '#F3F4F6',
                    color: sectorTextColors[client.sector] || '#4B5563',
                  }}
                >
                  {client.sector}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/clients"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-70"
              style={{ color: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
            >
              View all client relationships
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Leading Companies Trust NURC */}
      <section ref={valueRef} className="py-24 bg-white border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--nurc-teal)', letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}>
                Trust & Authority
              </span>
              <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                fontWeight: 700,
                color: 'var(--nurc-navy)',
                lineHeight: 1.25,
              }}
            >
              Why Leading Companies Trust NURC
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-xl" style={{ fontSize: '15px' }}>
              Zero-noise, curated B2B executive intelligence built to drive strategic C-Suite action and corporate growth.
            </p>
          </div>

          {/* 4-Card Trust Pillars Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: '24+ Years of Expertise',
                description: 'Serving India\'s executive boardrooms since 2002. Fusing historical industry datasets with daily tracking feeds.',
              },
              {
                icon: Clock,
                title: 'Daily Human Curation',
                description: 'Compiled entirely by domain specialists. 100% curated, action-focused intelligence with zero noise and zero filler.',
              },
              {
                icon: TrendingUp,
                title: 'Industry-Specific Focus',
                description: 'Deep micro-segment tracking spanning automotive OEMs, banking pipelines, urban infrastructure PPP deals, and renewable tarification.',
              },
              {
                icon: BookOpen,
                title: 'Trusted by Enterprise Teams',
                description: 'Equipped with custom research consultation portals, shared team dashboards, and layout rendering engines for corporate groups.',
              },
            ].map((prop, i) => {
              const Icon = prop.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl p-7 bg-[#F9FAFB] border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(0,109,122,0.08)' }}
                  >
                    <Icon size={18} style={{ color: 'var(--nurc-teal)' }} />
                  </div>
                  <h3
                    className="mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: 'var(--nurc-navy)' }}
                  >
                    {prop.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed animate-none" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    {prop.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry Coverage */}
      <section ref={sectorsRef} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--nurc-teal)', letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}>
                Sectors
              </span>
              <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3.5vw, 36px)',
                fontWeight: 700,
                color: 'var(--nurc-navy)',
                lineHeight: 1.25,
              }}
            >
              Intelligence Across India's Critical Sectors
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector, i) => (
              <Link
                key={i}
                to={`/sector/${sector.slug}`}
                className="group rounded-2xl p-7 bg-card border border-border transition-all duration-200 block"
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="w-2 h-8 rounded-full mb-5"
                  style={{ background: sector.color }}
                />
                <div className="flex items-start justify-between mb-3">
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 700, color: 'var(--nurc-navy)' }}>
                    {sector.title}
                  </h3>
                  <ArrowRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2 mt-0.5"
                    style={{ color: sector.color }}
                  />
                </div>
                <p className="text-muted-foreground mb-4" style={{ fontSize: '14px', lineHeight: 1.7 }}>
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
      <section ref={sampleRef} className="py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: 'var(--nurc-gold)' }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--nurc-teal)', letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}>
                  Sample Issue
                </span>
              </div>
              <h2
                className="mb-5"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(26px, 3.5vw, 38px)',
                  fontWeight: 700,
                  color: 'var(--nurc-navy)',
                  lineHeight: 1.2,
                }}
              >
                See What Your Competitors Are Reading
              </h2>
              <p className="text-muted-foreground mb-8" style={{ fontSize: '16px', lineHeight: 1.8 }}>
                Read a complete sample of our Auto Industry Weekly — the same briefing that lands in the inboxes of CFOs and MDs at India's top automotive corporations every Tuesday morning.
              </p>
              <button
                onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                className="flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 mb-4 cursor-pointer border-0"
                style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
              >
                <BookOpen size={18} />
                Open in Reader Mode
              </button>
              <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                Full-screen distraction-free reading. Adjust font size, theme, and spacing.
              </p>
            </div>

            {/* Newsletter Preview Card */}
            <div
              className="rounded-2xl overflow-hidden border border-border"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
            >
              {/* Card Header */}
              <div className="px-6 py-4 flex items-center justify-between" style={{ background: 'var(--nurc-navy)' }}>
                <div>
                  <div className="text-white font-bold" style={{ fontFamily: 'var(--font-heading)', fontSize: '14px' }}>
                    Auto Industry Weekly
                  </div>
                  <div className="text-white/50 text-xs mt-0.5">Issue #1,247 · May 27, 2025</div>
                </div>
                <button
                  onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-80 cursor-pointer border-0"
                  style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
                >
                  <BookOpen size={13} />
                  Reader Mode
                </button>
              </div>

              {/* Categories */}
              <div className="border-b border-border bg-muted/30 px-6 py-3 flex gap-2 flex-wrap">
                {['Policy Update', 'Industry News', 'Competitor Intel', 'Market Data', 'Editor\'s Note'].map(cat => (
                  <span
                    key={cat}
                    className="px-2.5 py-1 rounded text-xs font-semibold"
                    style={{ background: 'white', color: 'var(--nurc-navy)', border: '1px solid var(--border)' }}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Preview snippets */}
              <div className="divide-y divide-border">
                {[
                  {
                    tag: 'POLICY',
                    tagColor: '#006D7A',
                    title: 'FAME III Extended Through March 2027',
                    preview: 'Ministry extends subsidies for commercial EVs; ₹15,000/kWh for battery procurement...',
                  },
                  {
                    tag: 'INDUSTRY',
                    tagColor: '#0A2540',
                    title: 'Tata Motors Q4 Revenue Up 12.3% YoY',
                    preview: 'JLR performance in North America drives growth; EV division records 340% surge...',
                  },
                  {
                    tag: 'COMPETITOR',
                    tagColor: '#5B6A7B',
                    title: 'Hyundai Breaks Ground on Maharashtra Plant',
                    preview: '₹6,000 crore investment; 200,000 unit capacity targeting mid-premium segment...',
                  },
                ].map((item, i) => (
                  <div key={i} className="px-6 py-4 bg-card">
                    <div className="flex items-start gap-3">
                      <span
                        className="shrink-0 mt-0.5 px-2 py-0.5 rounded text-xs font-bold uppercase"
                        style={{ background: `${item.tagColor}15`, color: item.tagColor, letterSpacing: '0.06em', fontSize: '10px' }}
                      >
                        {item.tag}
                      </span>
                      <div>
                        <div className="font-semibold mb-1" style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', color: 'var(--nurc-navy)' }}>
                          {item.title}
                        </div>
                        <div className="text-muted-foreground" style={{ fontSize: '12px', lineHeight: 1.6 }}>
                          {item.preview}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="px-6 py-4 bg-muted/30 text-center">
                  <button
                    onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                    className="text-sm font-semibold inline-flex items-center gap-1.5 transition-opacity hover:opacity-70 cursor-pointer border-0 bg-transparent"
                    style={{ color: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
                  >
                    Read full issue in Reader Mode
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Statistics */}
      <section className="py-20 bg-white border-t border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--nurc-teal)', letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}>
                B2B Trust Metrics
              </span>
              <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
            </div>
            <h2
              className="text-navy tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 700,
                color: 'var(--nurc-navy)',
                lineHeight: 1.25,
              }}
            >
              Trusted Industry Intelligence Since 2002
            </h2>
            <p className="text-muted-foreground text-xs mt-2 max-w-md mx-auto">
              NURC is the definitive intelligence resource for executive leadership across India's primary sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                stat: '24+',
                label: 'Years of Coverage',
                description: 'Providing comprehensive historical sector datasets.',
                icon: Clock,
              },
              {
                stat: '10+',
                label: 'Industry Sectors',
                description: 'Deep analytical dispatches on key B2B areas.',
                icon: BookOpen,
              },
              {
                stat: 'Daily',
                label: 'Curated Intelligence',
                description: 'Zero automated noise, zero unverified reports.',
                icon: ShieldCheck,
              },
              {
                stat: 'Enterprise',
                label: 'Trusted Platform',
                description: 'Dedicated workspaces for major B2B teams.',
                icon: Star,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="text-center space-y-3 p-4">
                  <div className="w-8 h-8 rounded-lg bg-teal/5 text-teal flex items-center justify-center mx-auto" style={{ color: 'var(--nurc-teal)' }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-navy" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-display)' }}>
                      {item.stat}
                    </div>
                    <div className="text-xs font-bold text-slate-800 mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      {item.label}
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground max-w-[180px] mx-auto leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testiRef} className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--nurc-teal)', letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}>
                Testimonials
              </span>
              <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3.5vw, 36px)',
                fontWeight: 700,
                color: 'var(--nurc-navy)',
                lineHeight: 1.25,
              }}
            >
              What Industry Leaders Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl p-7 bg-card border border-border"
              >
                <Quote size={28} style={{ color: 'var(--nurc-gold)', opacity: 0.6, marginBottom: '16px' }} />
                <p
                  className="mb-6 italic"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '16px',
                    lineHeight: 1.75,
                    color: 'var(--nurc-navy)',
                  }}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold" style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', color: 'var(--nurc-navy)' }}>
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {t.title} · {t.company}
                    </div>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-4">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} size={12} fill="var(--nurc-gold)" style={{ color: 'var(--nurc-gold)' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-24 text-center"
        style={{ background: 'var(--nurc-navy)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--nurc-gold)', letterSpacing: '0.15em', fontFamily: 'var(--font-heading)' }}>
              Join 500+ Leaders
            </span>
            <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
          </div>
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Stay Ahead of Every Development That Matters
          </h2>
          <p className="text-white/60 mb-10" style={{ fontSize: '17px', lineHeight: 1.8 }}>
            Request a complimentary sample issue for your sector. No commitment, no sales call — just exceptional intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={openDemoModal}
              className="px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 border-0 cursor-pointer text-sm"
              style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
            >
              Schedule B2B Demo
            </button>
            <button
              onClick={openCoverageModal}
              className="px-8 py-4 rounded-xl font-semibold border transition-all hover:bg-white/10 bg-transparent cursor-pointer text-sm"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-heading)' }}
            >
              Request Custom Coverage
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
