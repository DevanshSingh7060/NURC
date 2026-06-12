import { Link } from 'react-router';
import {
  ArrowRight, BookOpen, Shield, Clock, TrendingUp,
  ChevronRight, Star, Quote, ShieldCheck, HelpCircle, Settings
} from 'lucide-react';
import { useReaderMode, SAMPLE_AUTO_ARTICLE } from './ReaderModeContext';
import { ClientMarquee } from './ClientMarquee';
import { useScrollFadeIn } from './useScrollFadeIn';
import { useLeadModal } from '../context/LeadModalContext';

import mercedesBenzLogo from '../../Logo/Mercedes Benz.png';
import bmwLogo from '../../Logo/BMW.png';
import tataLogo from '../../Logo/Tata.png';
import deutscheBankLogo from '../../Logo/Deutsche Bank.png';




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
    logo: mercedesBenzLogo,
  },
  {
    quote: 'The depth of competitor intelligence in the banking digest is remarkable. We\'ve used it to sharpen our product strategy twice this quarter.',
    name: 'Priya Raghunathan',
    title: 'Managing Director',
    company: 'Private Sector Bank, Strategy Division',
    logo: deutscheBankLogo,
  },
  {
    quote: 'Since 2002, this has been the single most reliable industry intelligence service in India. No other publication comes close for executive-level depth.',
    name: 'Arun Kapoor',
    title: 'CEO',
    company: 'Infrastructure Conglomerate',
    logo: tataLogo,
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
                Established 2002 · 24 Years of B2B Intelligence
              </span>
            </div>
            <h1
              className="mb-6 text-white"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(36px, 5vw, 54px)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              Daily Curated Intelligence That Powers India’s Leading Corporations
            </h1>
            <p
              className="mb-10 text-white/70"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                lineHeight: 1.8,
                maxWidth: '520px',
              }}
            >
              For 24+ years, consequential corporate leaders have relied on our ad-free, high-comfort intelligence briefings delivered straight to their inboxes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="btn-nurc h-12 flex items-center gap-2 px-6 rounded-xl text-white font-semibold transition-all hover:opacity-90 cursor-pointer text-sm animate-none"
                style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)', textDecoration: 'none' }}
              >
                Request Demo
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                className="h-12 flex items-center gap-2 px-6 rounded-xl font-semibold border transition-all hover:bg-white/10 bg-transparent cursor-pointer text-sm"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-heading)' }}
              >
                Request Sample
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
              className="relative rounded-xl overflow-hidden"
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
                  className="rounded-xl p-6 backdrop-blur-sm"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--nurc-teal)' }}>
                      <BookOpen size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                        Auto Industry Weekly
                      </div>
                      <div className="text-white/60 text-xs">Latest issue · May 27, 2025</div>
                    </div>
                    <button
                      onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                      className="ml-auto text-xs font-semibold h-12 flex items-center justify-center px-6 rounded-xl text-white transition-opacity hover:opacity-80 border-0 cursor-pointer"
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

      {/* Compact Stats Row */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E7EB] py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--nurc-teal)] text-xl" style={{ fontFamily: "var(--font-heading)" }}>24+</span>
            <span className="text-sm text-gray-600 font-medium" style={{ fontFamily: 'var(--font-body)' }}>Years of Trust</span>
          </div>
          <div className="hidden md:block h-6 w-px bg-[#E5E7EB]" />
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--nurc-teal)] text-xl" style={{ fontFamily: "var(--font-heading)" }}>Daily</span>
            <span className="text-sm text-gray-600 font-medium" style={{ fontFamily: 'var(--font-body)' }}>Delivery</span>
          </div>
          <div className="hidden md:block h-6 w-px bg-[#E5E7EB]" />
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--nurc-teal)] text-xl" style={{ fontFamily: "var(--font-heading)" }}>500+</span>
            <span className="text-sm text-gray-600 font-medium" style={{ fontFamily: 'var(--font-body)' }}>Executives Served</span>
          </div>
        </div>
      </div>

      {/* Why Leading Companies Trust NURC */}
      <section ref={valueRef} className="py-12 lg:py-20 bg-white border-t border-b border-border">
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
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                fontWeight: 700,
                color: 'var(--nurc-navy)',
                lineHeight: 1.25,
              }}
            >
              Why Leading Companies Trust NURC
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-xl" style={{ fontSize: '15px' }}>
              Zero-noise, curated B2B executive intelligence built to drive strategic action and corporate growth.
            </p>
          </div>

          {/* 4-Card Trust Pillars Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: 'Time Saved',
                description: 'Get the essential 20% of industry news that drives 80% of business decisions. Zero noise, zero fluff.',
              },
              {
                icon: TrendingUp,
                title: 'Competitive Edge',
                description: 'Stay ahead of competitor moves, policy shifts, and market opportunities before they land on general news sites.',
              },
              {
                icon: Settings,
                title: 'Customized',
                description: 'Tailor your dashboard to track only the industries, companies, and updates relevant to your corporate focus.',
              },
              {
                icon: ShieldCheck,
                title: 'Ad-Free',
                description: 'Experience a premium, ad-free, distraction-free interface built purely for corporate reading and strategic analysis.',
              },
            ].map((prop, i) => {
              const Icon = prop.icon;
              return (
                <div
                  key={i}
                  className="rounded-xl p-6 bg-[#F9FAFB] border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
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
                  <p className="text-muted-foreground leading-relaxed animate-none" style={{ fontSize: '13px', lineHeight: '1.65' }}>
                    {prop.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry Coverage */}
      <section ref={sectorsRef} className="py-12 lg:py-20 bg-background">
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
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(26px, 3.5vw, 36px)',
                fontWeight: 700,
                color: 'var(--nurc-navy)',
                lineHeight: 1.25,
              }}
            >
              Intelligence Across India's Critical Sectors
            </h2>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible md:pb-0">
            {sectors.map((sector, i) => (
              <Link
                key={i}
                to={`/sector/${sector.slug}`}
                className="group rounded-xl p-6 bg-card border border-border transition-all duration-200 block min-w-[290px] md:min-w-0 shrink-0 md:shrink"
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
      <section ref={sampleRef} className="py-12 lg:py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side Content Block */}
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="h-px w-8" style={{ background: 'var(--nurc-gold)' }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--nurc-teal)', letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}>
                  Sample Issue
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(24px, 3.5vw, 40px)',
                  fontWeight: 700,
                  color: 'var(--nurc-navy)',
                  lineHeight: 1.2,
                  maxWidth: '480px',
                }}
              >
                See What Your Competitors Are Reading
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: 'clamp(16px, 1.8vw, 18px)', lineHeight: 1.7, maxWidth: '500px', color: '#4B5563' }}>
                Read a complete sample of our Auto Industry Weekly — the same briefing that lands in the inboxes of CFOs and MDs at India's top automotive corporations every Tuesday morning.
              </p>
              <button
                onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                className="flex items-center gap-2 font-semibold text-white transition-all hover:opacity-90 cursor-pointer border-0"
                style={{
                  background: 'var(--nurc-teal)',
                  fontFamily: 'var(--font-heading)',
                  height: '48px',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                  borderRadius: '12px',
                }}
              >
                <BookOpen size={18} />
                Open in Reader Mode
              </button>
            </div>

            {/* Right Side Newsletter Preview Card (Email Mockup) */}
            <div
              className="rounded-xl overflow-hidden border border-border bg-white"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
            >
              {/* Premium Email Mockup Header with 24px Padding */}
              <div className="bg-[#FAF9F6] border-b border-border p-6 text-left space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}>Corporate Dispatch</span>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </div>
                <div className="space-y-3 font-sans">
                  <div className="grid grid-cols-3 items-center pb-2 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500" style={{ fontSize: '14px' }}>Sender</span>
                    <span className="col-span-2 text-right font-semibold" style={{ color: 'var(--nurc-navy)', fontSize: '15px', fontWeight: 600 }}>NURC MediaNext Intelligence Desk</span>
                  </div>
                  <div className="grid grid-cols-3 items-center pb-2 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500" style={{ fontSize: '14px' }}>Recipient</span>
                    <span className="col-span-2 text-right font-semibold" style={{ color: 'var(--nurc-navy)', fontSize: '15px', fontWeight: 600 }}>Corporate Subscriber</span>
                  </div>
                  <div className="grid grid-cols-3 items-center pb-2 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500" style={{ fontSize: '14px' }}>Published</span>
                    <span className="col-span-2 text-right font-semibold" style={{ color: 'var(--nurc-navy)', fontSize: '15px', fontWeight: 600 }}>12 June 2026</span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <span className="text-xs font-medium text-gray-500" style={{ fontSize: '14px' }}>Industry</span>
                    <span className="col-span-2 text-right font-semibold" style={{ color: 'var(--nurc-navy)', fontSize: '15px', fontWeight: 600 }}>Automotive Intelligence Weekly</span>
                  </div>
                </div>
              </div>

              {/* Refined Rounded Category Pills */}
              <div className="border-b border-border bg-[#F9FAFB] px-6 py-4 flex gap-2 flex-wrap items-center">
                {['Policy Update', 'Industry News', 'Competitor Intel', 'Market Data', 'Editor\'s Note'].map(cat => (
                  <span
                    key={cat}
                    className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                    style={{ background: 'white', color: 'var(--nurc-teal)', border: '1px solid #E5E7EB', fontSize: '11px' }}
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
                  <div key={i} className="px-6 py-5 bg-white text-left space-y-2">
                    <span
                      className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider animate-none"
                      style={{ background: `${item.tagColor}10`, color: item.tagColor, fontSize: '12px' }}
                    >
                      {item.tag}
                    </span>
                    <h4 className="font-bold" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--nurc-navy)', lineHeight: '1.3' }}>
                      {item.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed font-medium" style={{ fontSize: '14px', color: '#4B5563' }}>
                      {item.preview}
                    </p>
                  </div>
                ))}

                {/* Bottom CTA Button */}
                <div className="px-6 py-5 bg-[#FAF9F6] text-center border-t border-border">
                  <button
                    onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
                    className="w-full flex items-center justify-center gap-2 font-bold text-white transition-all hover:opacity-95 cursor-pointer border-0 shadow-sm"
                    style={{
                      background: 'var(--nurc-teal)',
                      fontFamily: 'var(--font-heading)',
                      height: '48px',
                      borderRadius: '12px',
                    }}
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

      {/* Trust Statistics */}
      <section className="py-12 lg:py-20 bg-white border-t border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--nurc-teal)', letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}>
                B2B Trust Metrics
              </span>
              <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(24px, 3.5vw, 40px)',
                fontWeight: 700,
                color: 'var(--nurc-navy)',
                lineHeight: 1.2,
              }}
            >
              Trusted Industry Intelligence Since 2002
            </h2>
            <p className="text-muted-foreground mt-3 max-w-[500px] mx-auto" style={{ fontSize: 'clamp(16px, 1.8vw, 18px)', color: '#4B5563', lineHeight: '1.6' }}>
              NURC is the definitive intelligence resource for executive leadership across India's primary sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
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
                <div key={idx} className="text-center p-4 space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-teal/5 text-teal flex items-center justify-center mx-auto mb-1.5" style={{ color: 'var(--nurc-teal)' }}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className="font-bold tracking-tight text-navy" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 700, lineHeight: '1.1' }}>
                      {item.stat}
                    </div>
                    <div className="font-semibold text-navy mt-1" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, color: 'var(--nurc-navy)' }}>
                      {item.label}
                    </div>
                  </div>
                  <p className="text-muted-foreground max-w-[240px] mx-auto animate-none" style={{ fontSize: '16px', lineHeight: '1.6', color: '#4B5563', fontFamily: 'var(--font-body)' }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testiRef} className="py-12 lg:py-20 bg-background">
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
                fontFamily: 'var(--font-heading)',
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
                className="rounded-xl p-6 bg-card border border-border"
              >
                <Quote size={28} style={{ color: 'var(--nurc-gold)', opacity: 0.6, marginBottom: '16px' }} />
                <p
                  className="mb-6 italic"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    lineHeight: 1.75,
                    color: 'var(--nurc-navy)',
                  }}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-border flex items-center justify-center p-1.5 shrink-0">
                    <img 
                      src={t.logo} 
                      alt={`${t.company} logo`} 
                      className="w-full h-full object-contain"
                    />
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
        className="py-12 lg:py-20 text-center"
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
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Stay Ahead of Every Development That Matters
          </h2>
          <p className="text-white/60 mb-10" style={{ fontSize: '17px', lineHeight: 1.8 }}>
            Request a complimentary sample issue for your sector or start a free trial license. No commitment, no sales call.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="h-12 flex items-center justify-center px-8 rounded-xl font-semibold text-white transition-all hover:opacity-90 cursor-pointer text-sm animate-none"
              style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)', textDecoration: 'none' }}
            >
              Request Demo
            </Link>
            <button
              onClick={() => openReader(SAMPLE_AUTO_ARTICLE)}
              className="h-12 flex items-center justify-center px-8 rounded-xl font-semibold border transition-all hover:bg-white/10 bg-transparent cursor-pointer text-sm"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-heading)' }}
            >
              Request Sample
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
