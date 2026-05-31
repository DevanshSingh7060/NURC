import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Filter } from 'lucide-react';
import { ClientMarquee } from './ClientMarquee';

const industries = ['All', 'Automotive', 'Banking & Finance', 'Infrastructure', 'Energy', 'Manufacturing'];

const clients = [
  { name: 'Mercedes-Benz India', industry: 'Automotive', since: '2007', type: 'OEM' },
  { name: 'BMW India', industry: 'Automotive', since: '2009', type: 'OEM' },
  { name: 'Volvo Auto India', industry: 'Automotive', since: '2011', type: 'OEM' },
  { name: 'Tata Motors', industry: 'Automotive', since: '2004', type: 'OEM' },
  { name: 'Mahindra & Mahindra', industry: 'Automotive', since: '2005', type: 'OEM' },
  { name: 'Bosch India', industry: 'Manufacturing', since: '2006', type: 'Components' },
  { name: 'Maruti Suzuki', industry: 'Automotive', since: '2003', type: 'OEM' },
  { name: 'Hyundai India', industry: 'Automotive', since: '2006', type: 'OEM' },
  { name: 'Honda Cars India', industry: 'Automotive', since: '2008', type: 'OEM' },
  { name: 'Bajaj Auto', industry: 'Automotive', since: '2004', type: 'OEM' },
  { name: 'Hero MotoCorp', industry: 'Automotive', since: '2005', type: 'OEM' },
  { name: 'TVS Motor', industry: 'Automotive', since: '2007', type: 'OEM' },
  { name: 'Ashok Leyland', industry: 'Automotive', since: '2006', type: 'CV OEM' },
  { name: 'MG Motor India', industry: 'Automotive', since: '2019', type: 'OEM' },
  { name: 'Kia India', industry: 'Automotive', since: '2020', type: 'OEM' },
  { name: 'Volkswagen India', industry: 'Automotive', since: '2010', type: 'OEM' },
  { name: 'Skoda India', industry: 'Automotive', since: '2010', type: 'OEM' },
  { name: 'HDFC Life', industry: 'Banking & Finance', since: '2010', type: 'Insurance' },
  { name: 'Deutsche Bank India', industry: 'Banking & Finance', since: '2008', type: 'Bank' },
  { name: 'ICICI Bank', industry: 'Banking & Finance', since: '2009', type: 'Bank' },
  { name: 'Kotak Mahindra Bank', industry: 'Banking & Finance', since: '2011', type: 'Bank' },
  { name: 'Axis Bank', industry: 'Banking & Finance', since: '2012', type: 'Bank' },
  { name: 'Crisil', industry: 'Banking & Finance', since: '2007', type: 'Analytics' },
  { name: 'SBI Cards', industry: 'Banking & Finance', since: '2015', type: 'NBFC' },
  { name: 'L&T Finance', industry: 'Banking & Finance', since: '2014', type: 'NBFC' },
  { name: 'HDFC Bank', industry: 'Banking & Finance', since: '2016', type: 'Bank' },
  { name: 'L&T Construction', industry: 'Infrastructure', since: '2008', type: 'EPC' },
  { name: 'GMR Group', industry: 'Infrastructure', since: '2010', type: 'Conglomerate' },
  { name: 'GVK Power', industry: 'Infrastructure', since: '2009', type: 'Power' },
  { name: 'Adani Group', industry: 'Infrastructure', since: '2012', type: 'Conglomerate' },
  { name: 'TATA Power', industry: 'Energy', since: '2006', type: 'Utility' },
  { name: 'Greenko Energy', industry: 'Energy', since: '2015', type: 'Renewable' },
  { name: 'ReNew Power', industry: 'Energy', since: '2014', type: 'Renewable' },
  { name: 'Sembcorp India', industry: 'Energy', since: '2016', type: 'Utility' },
  { name: 'Motherson Group', industry: 'Manufacturing', since: '2007', type: 'Auto Ancillary' },
  { name: 'Sundram Fasteners', industry: 'Manufacturing', since: '2009', type: 'Auto Ancillary' },
];

const industryColors: Record<string, { bg: string; text: string }> = {
  Automotive: { bg: '#E8F4F5', text: '#006D7A' },
  'Banking & Finance': { bg: '#E8EEF4', text: '#0A2540' },
  Infrastructure: { bg: '#EAF0F4', text: '#3B6E8A' },
  Energy: { bg: '#EAF2EB', text: '#5B8A5E' },
  Manufacturing: { bg: '#F2EEE8', text: '#8A6A3B' },
};

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
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border" style={{ background: '#FFFFFF' }}>
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
            Trusted by India's Most Consequential Corporations
          </h1>
          <p className="text-muted-foreground mx-auto mb-8" style={{ fontSize: '17px', lineHeight: 1.8, maxWidth: '600px' }}>
            From Germany's finest automotive brands to India's largest financial institutions — 36+ of India's most respected corporations trust NURC for sector intelligence.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { label: 'Corporations', value: '36+' },
              { label: 'Industries', value: '5+' },
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

      {/* Marquee — reinforces trust signals */}
      <ClientMarquee label="" compact={true} />

      {/* Filter */}
      <section className="py-5 border-b border-border bg-card sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto">
          <Filter size={15} style={{ color: 'var(--nurc-navy)', opacity: 0.5, flexShrink: 0 }} />
          {industries.map(ind => (
            <button
              key={ind}
              onClick={() => setActiveIndustry(ind)}
              className="shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
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

      {/* Client Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-muted-foreground text-sm mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Showing {filtered.length} of {clients.length} client relationships
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((client, i) => {
              const colors = industryColors[client.industry] || { bg: '#F3F4F6', text: '#4B5563' };
              return (
                <div
                  key={i}
                  className="rounded-xl bg-card border border-border p-4 flex flex-col justify-between transition-all duration-200"
                  style={{ minHeight: '110px' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.10)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    className="font-bold leading-tight mb-2"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', color: 'var(--nurc-navy)' }}
                  >
                    {client.name}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-center"
                      style={{ fontSize: '9px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: colors.bg, color: colors.text }}
                    >
                      {client.type}
                    </span>
                    <span className="text-xs text-muted-foreground" style={{ fontSize: '10px' }}>
                      Client since {client.since}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 border-t border-border" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-center mb-10"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: 'var(--nurc-navy)' }}
          >
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl p-7 bg-background border border-border">
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
      <section className="py-16" style={{ background: 'var(--nurc-navy)' }}>
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
