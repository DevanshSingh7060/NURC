import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Filter } from 'lucide-react';

// Import PNG logos from src/Logo
import mercedesBenzLogo from '../../Logo/Mercedes Benz.png';
import bmwLogo from '../../Logo/BMW.png';
import tataLogo from '../../Logo/Tata.png';
import mahindraLogo from '../../Logo/Mahindra.png';

interface PremiumBrand {
  name: string;
  sector: string;
  logoType: 'image' | 'svg';
  src?: string;
  Logo?: React.ComponentType<any>;
}

const premiumBrands: PremiumBrand[] = [
  {
    name: 'Mercedes-Benz',
    sector: 'Auto',
    logoType: 'image',
    src: mercedesBenzLogo,
  },
  {
    name: 'BMW India',
    sector: 'Auto',
    logoType: 'image',
    src: bmwLogo,
  },
  {
    name: 'Tata Motors',
    sector: 'Auto',
    logoType: 'image',
    src: tataLogo,
  },
  {
    name: 'Mahindra',
    sector: 'Auto',
    logoType: 'image',
    src: mahindraLogo,
  },
  {
    name: 'Deutsche Bank',
    sector: 'Banking',
    logoType: 'svg',
    Logo: () => (
      <svg className="w-auto text-[#0018A8]" style={{ height: '38px' }} viewBox="0 0 160 50" fill="currentColor">
        <rect x="10" y="10" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="4" />
        <line x1="16" y1="34" x2="34" y2="16" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
        <text x="52" y="32" fill="currentColor" fontSize="15" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="0.2">Deutsche Bank</text>
      </svg>
    )
  },
  {
    name: 'HDFC Life',
    sector: 'Banking',
    logoType: 'svg',
    Logo: () => (
      <svg className="w-auto text-[#0054A6]" style={{ height: '38px' }} viewBox="0 0 160 50">
        <rect x="10" y="8" width="20" height="20" fill="none" stroke="#ED1C24" strokeWidth="3.5" />
        <rect x="20" y="18" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <text x="50" y="26" fill="#000000" fontSize="15" fontWeight="bold" fontFamily="sans-serif">HDFC Life</text>
      </svg>
    )
  }
];

const industries = ['All', 'Auto', 'Banking & Finance', 'Insurance', 'Others'];

const clients = [
  { name: 'Mercedes-Benz India', industry: 'Auto', since: '2007', type: 'OEM' },
  { name: 'BMW India', industry: 'Auto', since: '2009', type: 'OEM' },
  { name: 'Volvo Auto India', industry: 'Auto', since: '2011', type: 'OEM' },
  { name: 'Tata Motors', industry: 'Auto', since: '2004', type: 'OEM' },
  { name: 'Mahindra & Mahindra', industry: 'Auto', since: '2005', type: 'OEM' },
  { name: 'Bosch India', industry: 'Auto', since: '2006', type: 'Components' },
  { name: 'Maruti Suzuki', industry: 'Auto', since: '2003', type: 'OEM' },
  { name: 'Hyundai India', industry: 'Auto', since: '2006', type: 'OEM' },
  { name: 'Honda Cars India', industry: 'Auto', since: '2008', type: 'OEM' },
  { name: 'Bajaj Auto', industry: 'Auto', since: '2004', type: 'OEM' },
  { name: 'Hero MotoCorp', industry: 'Auto', since: '2005', type: 'OEM' },
  { name: 'TVS Motor', industry: 'Auto', since: '2007', type: 'OEM' },
  { name: 'Ashok Leyland', industry: 'Auto', since: '2006', type: 'CV OEM' },
  { name: 'MG Motor India', industry: 'Auto', since: '2019', type: 'OEM' },
  { name: 'Kia India', industry: 'Auto', since: '2020', type: 'OEM' },
  { name: 'Volkswagen India', industry: 'Auto', since: '2010', type: 'OEM' },
  { name: 'Skoda India', industry: 'Auto', since: '2010', type: 'OEM' },
  { name: 'HDFC Life', industry: 'Insurance', since: '2010', type: 'Insurance' },
  { name: 'Deutsche Bank India', industry: 'Banking & Finance', since: '2008', type: 'Bank' },
  { name: 'ICICI Bank', industry: 'Banking & Finance', since: '2009', type: 'Bank' },
  { name: 'Kotak Mahindra Bank', industry: 'Banking & Finance', since: '2011', type: 'Bank' },
  { name: 'Axis Bank', industry: 'Banking & Finance', since: '2012', type: 'Bank' },
  { name: 'Crisil', industry: 'Banking & Finance', since: '2007', type: 'Analytics' },
  { name: 'SBI Cards', industry: 'Banking & Finance', since: '2015', type: 'NBFC' },
  { name: 'L&T Finance', industry: 'Banking & Finance', since: '2014', type: 'NBFC' },
  { name: 'HDFC Bank', industry: 'Banking & Finance', since: '2016', type: 'Bank' },
  { name: 'L&T Construction', industry: 'Others', since: '2008', type: 'EPC' },
  { name: 'GMR Group', industry: 'Others', since: '2010', type: 'Conglomerate' },
  { name: 'GVK Power', industry: 'Others', since: '2009', type: 'Power' },
  { name: 'Adani Group', industry: 'Others', since: '2012', type: 'Conglomerate' },
  { name: 'TATA Power', industry: 'Others', since: '2006', type: 'Utility' },
  { name: 'Greenko Energy', industry: 'Others', since: '2015', type: 'Renewable' },
  { name: 'ReNew Power', industry: 'Others', since: '2014', type: 'Renewable' },
  { name: 'Sembcorp India', industry: 'Others', since: '2016', type: 'Utility' },
  { name: 'Motherson Group', industry: 'Others', since: '2007', type: 'Auto Ancillary' },
  { name: 'Sundram Fasteners', industry: 'Others', since: '2009', type: 'Auto Ancillary' },
];

const testimonials = [
  {
    quote: 'We\'ve relied on NURC\'s auto intelligence for 18 years. It\'s part of our weekly executive reporting rhythm.',
    name: 'R. Krishnamurthy',
    title: 'Head of Strategy',
    company: 'Major German OEM, India',
    initials: 'RK',
  },
  {
    quote: 'The depth of banking sector analysis is unmatched. Our management team considers it essential reading.',
    name: 'S. Venkataraman',
    title: 'Chief Risk Officer',
    company: 'Leading Private Bank',
    initials: 'SV',
  },
];

export function ClientsPage() {
  const [activeIndustry, setActiveIndustry] = useState('All');

  const filtered = activeIndustry === 'All'
    ? clients
    : clients.filter(c => c.industry === activeIndustry);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero */}
      <section className="py-20 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--nurc-teal)', letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}>
              Our Clients
            </span>
            <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
          </div>
          <h1
            className="mb-5"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 50px)', fontWeight: 700, color: 'var(--nurc-navy)', lineHeight: 1.15 }}
          >
            Trusted by India’s Leading Corporations
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 text-base md:text-lg" style={{ lineHeight: 1.8, maxWidth: '650px' }}>
            From Germany’s finest auto brands to India’s top financial institutions — the country’s most consequential decision-makers rely on NURC.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { label: 'Corporations', value: '36+' },
              { label: 'Industries', value: '4+' },
              { label: 'Avg. Tenure', value: '11 Yrs' },
              { label: 'C-Suite Readers', value: '500+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--nurc-navy)' }}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Brands Highlight Grid */}
      <section className="py-16 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-center mb-10 text-navy font-bold text-lg"
            style={{
              fontFamily: "Satoshi, 'Geist Sans', var(--font-heading), sans-serif",
              color: 'var(--nurc-navy)',
            }}
          >
            Key Brand Highlights
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {premiumBrands.map((brand, i) => (
              <div
                key={i}
                className="client-card group"
              >
                <div className="h-16 flex items-center justify-center mb-3 w-full">
                  {brand.logoType === 'image' ? (
                    <img
                      src={brand.src}
                      alt={`${brand.name} logo`}
                      className="max-h-[60px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      draggable={false}
                    />
                  ) : (
                    <div className="transition-transform duration-300 group-hover:scale-105 flex items-center justify-center w-full">
                      {brand.Logo && <brand.Logo />}
                    </div>
                  )}
                </div>
                <div
                  className="font-semibold text-center text-xs mb-2"
                  style={{
                    fontFamily: "Satoshi, 'Geist Sans', var(--font-heading), sans-serif",
                    color: 'var(--nurc-navy)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {brand.name}
                </div>
                <div
                  className="px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase"
                  style={{
                    background: 'rgba(0,109,122,0.08)',
                    color: 'var(--nurc-teal)',
                  }}
                >
                  {brand.sector}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Tabs Bar */}
      <section className="py-5 border-b border-border bg-white sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto">
          <Filter size={15} style={{ color: 'var(--nurc-navy)', opacity: 0.5, flexShrink: 0 }} />
          {industries.map(ind => (
            <button
              key={ind}
              onClick={() => setActiveIndustry(ind)}
              className="shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
              style={{
                background: activeIndustry === ind ? 'var(--nurc-navy)' : 'transparent',
                color: activeIndustry === ind ? '#fff' : 'var(--nurc-navy)',
                border: `1px solid ${activeIndustry === ind ? 'var(--nurc-navy)' : 'var(--border)'}`,
                fontFamily: 'var(--font-heading)',
              }}
            >
              {ind}
            </button>
          ))}
        </div>
      </section>

      {/* Text-Only Full Client List */}
      <section className="py-12 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-muted-foreground text-sm mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Showing {filtered.length} of {clients.length} client relationships
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((client, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-xs transition-all duration-200 hover:shadow-sm hover:border-gray-200"
              >
                <span className="font-semibold text-gray-800 text-sm">{client.name}</span>
                <span className="text-xs text-[var(--nurc-teal)] font-semibold shrink-0 ml-2">→ {client.industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-center mb-10"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: 'var(--nurc-navy)' }}
          >
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl p-7 bg-[#F8F9FA] border border-border">
                <p
                  className="italic mb-6"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '17px', lineHeight: 1.75, color: 'var(--nurc-navy)' }}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 animate-none" style={{ background: 'var(--nurc-navy)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, lineHeight: 1.2 }}>
            Join India's Most Trusted Intelligence Network
          </h2>
          <p className="text-white/60 mb-8" style={{ fontSize: '16px', lineHeight: 1.75 }}>
            Request a complimentary sample for your sector and see why India's top executives choose NURC.
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
          >
            View Subscription Plans
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
