import { Link } from 'react-router';
import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react';

const timeline = [
  {
    year: '2002',
    title: 'Founded in Mumbai',
    description: 'NURC was established with a single newsletter covering the Indian automotive sector, serving 12 subscribers at launch.',
  },
  {
    year: '2005',
    title: 'Banking & Finance Launch',
    description: 'Expanded into banking and financial services intelligence, responding to growing demand from our automotive client base.',
  },
  {
    year: '2008',
    title: 'Pan-India Coverage',
    description: 'Opened offices in New Delhi and Bengaluru. Extended sector coverage to include infrastructure and energy.',
  },
  {
    year: '2012',
    title: '200 Subscriber Milestone',
    description: 'Crossed 200 corporate subscribers. Introduced quarterly analyst briefings for Executive-tier subscribers.',
  },
  {
    year: '2015',
    title: 'Digital Transformation',
    description: 'Launched digital archive access and PDF downloads. Began building the online reader experience.',
  },
  {
    year: '2018',
    title: 'Healthcare & FMCG Added',
    description: 'Expanded into healthcare and FMCG sectors. Editorial team grew to 35 domain specialists.',
  },
  {
    year: '2020',
    title: 'COVID Intelligence Response',
    description: 'Launched daily crisis briefings during COVID-19. Subscribers increased 42% as organisations sought real-time intelligence.',
  },
  {
    year: '2023',
    title: 'Reader Mode Launch',
    description: 'Introduced our signature Reader Mode — distraction-free, adjustable reading experience for busy executives.',
  },
  {
    year: '2025',
    title: '500+ C-Suite Readers',
    description: 'Celebrating 23 years of uninterrupted intelligence. Trusted by 500+ C-Suite executives across 36 leading corporations.',
  },
];

const team = [
  {
    name: 'Deepak Nair',
    title: 'Founder & Editor-in-Chief',
    bio: 'Former automotive journalist at Business Standard. 30+ years in business intelligence. Established NURC in 2002.',
    initials: 'DN',
  },
  {
    name: 'Meera Krishnan',
    title: 'Managing Director',
    bio: 'MBA from IIM Ahmedabad. 18 years in executive media. Oversees editorial strategy and client relationships.',
    initials: 'MK',
  },
  {
    name: 'Rajesh Pillai',
    title: 'Chief Research Officer',
    bio: 'Former CRISIL analyst. Expert in Indian financial markets and banking sector intelligence.',
    initials: 'RP',
  },
  {
    name: 'Sunita Malhotra',
    title: 'Head of Auto Intelligence',
    bio: 'Ex-SIAM researcher. Deep expertise in OEM strategy, EV policy, and automotive supply chains.',
    initials: 'SM',
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: 'var(--nurc-gold)' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--nurc-teal)', letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}>
                About Us
              </span>
            </div>
            <h1
              className="mb-6"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--nurc-navy)', lineHeight: 1.15 }}
            >
              23 Years of Curated Intelligence for India's Industry Leaders
            </h1>
            <p className="text-muted-foreground mb-6" style={{ fontSize: '17px', lineHeight: 1.85 }}>
              NURC MediaNext was founded in Mumbai in 2002 with a simple conviction: India's senior corporate executives deserved a better quality of sector intelligence. Not wire-service rewrites, not opinion masquerading as analysis — but deeply researched, expertly curated, and impeccably timed intelligence that could sharpen decisions and narrow blind spots.
            </p>
            <p className="text-muted-foreground mb-8" style={{ fontSize: '17px', lineHeight: 1.85 }}>
              Twenty-three years later, that conviction is unchanged. Our editorial team of 40+ domain specialists covers 15+ sectors, serving 500+ C-Suite readers at India's most consequential corporations — from German luxury OEMs to India's largest private banks.
            </p>
            <Link
              to="/newsletters"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
            >
              Read a Sample Issue
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=700&h=500&fit=crop&auto=format"
              alt="NURC editorial team"
              className="rounded-2xl w-full object-cover"
              style={{ height: '400px' }}
            />
            <div
              className="absolute -bottom-4 -left-4 rounded-2xl px-6 py-4 bg-card border border-border"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            >
              <div className="font-bold" style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--nurc-navy)' }}>
                40+
              </div>
              <div className="text-muted-foreground text-xs mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                Domain Specialists
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: 'var(--nurc-navy)' }}>
              Our Editorial Principles
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Zero Noise',
                description: 'Every sentence in every brief must earn its place. If a piece of information doesn\'t change the picture, it doesn\'t get published.',
              },
              {
                title: 'Primary Source Priority',
                description: 'We read government gazettes, regulatory filings, earnings transcripts, and court judgements — not secondary press summaries.',
              },
              {
                title: 'Forward-Looking',
                description: 'We analyse what developments mean for your sector, your competitors, and your decisions — not just what happened.',
              },
              {
                title: 'Domain Expertise',
                description: 'Our automotive writers have worked in the automotive industry. Our banking analysts have worked in banking. We hire expertise.',
              },
              {
                title: 'Independence',
                description: 'No advertising. No sponsored content. No vendor relationships that could colour our analysis. Our only obligation is to our subscribers.',
              },
              {
                title: 'Punctuality',
                description: '23 years. 52 issues per year per sector. Delivered by 7 AM on publication day. We have never missed a deadline.',
              },
            ].map((principle, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 bg-card border border-border"
              >
                <div className="w-1 h-6 rounded-full mb-4" style={{ background: 'var(--nurc-gold)' }} />
                <h3 className="mb-2 font-bold" style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--nurc-navy)' }}>
                  {principle.title}
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: 1.75 }}>
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 border-t border-border" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: 'var(--nurc-navy)' }}>
              Our Journey Since 2002
            </h2>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5"
              style={{ background: 'var(--nurc-gold)', opacity: 0.3 }}
            />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 items-start relative">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border-2"
                    style={{
                      background: i === timeline.length - 1 ? 'var(--nurc-navy)' : '#FFFFFF',
                      borderColor: 'var(--nurc-gold)',
                    }}
                  >
                    <span
                      className="font-bold"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '10px',
                        color: i === timeline.length - 1 ? 'var(--nurc-gold)' : 'var(--nurc-navy)',
                      }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <div className="pt-2 pb-2">
                    <h3 className="font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--nurc-navy)' }}>
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: 1.7 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: 'var(--nurc-navy)' }}>
              Leadership Team
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="rounded-2xl p-6 bg-card border border-border text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 text-white font-bold"
                  style={{ background: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)', fontSize: '18px' }}
                >
                  {member.initials}
                </div>
                <h3 className="font-bold mb-0.5" style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: 'var(--nurc-navy)' }}>
                  {member.name}
                </h3>
                <div className="text-xs font-semibold mb-3" style={{ color: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}>
                  {member.title}
                </div>
                <p className="text-muted-foreground" style={{ fontSize: '13px', lineHeight: 1.65 }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices + Contact */}
      <section className="py-20 border-t border-border" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
              Contact Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontSize: '15px' }}>
              Have questions about our intelligence briefings, enterprise licensing, or subscriptions? Connect with us directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Corporate Office Card */}
            <div className="rounded-2xl p-8 border border-border bg-slate-50/30 flex flex-col justify-between hover:shadow-sm transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(10, 37, 64, 0.05)', color: 'var(--nurc-teal)' }}>
                  <MapPin size={20} />
                </div>
                <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--nurc-navy)' }}>
                  Corporate Office
                </h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line" style={{ fontSize: '14px' }}>
                  {`N.U.R.C. MediaNext Private Ltd.

9A, Pocket-B
SFS Flats
Mayur Vihar Phase-III
Delhi - 110096
India`}
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="rounded-2xl p-8 border border-border bg-slate-50/30 flex flex-col justify-between hover:shadow-sm transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(10, 37, 64, 0.05)', color: 'var(--nurc-teal)' }}>
                  <Mail size={20} />
                </div>
                <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--nurc-navy)' }}>
                  Email Addresses
                </h3>
                <div className="space-y-3">
                  <a href="mailto:contact@nurcmedianext.com" className="block text-sm font-medium hover:underline break-all" style={{ color: 'var(--nurc-teal)' }}>
                    contact@nurcmedianext.com
                  </a>
                  <a href="mailto:nurcmnx@gmail.com" className="block text-sm font-medium hover:underline break-all" style={{ color: 'var(--nurc-teal)' }}>
                    nurcmnx@gmail.com
                  </a>
                  <a href="mailto:nurcmedianext@gmail.com" className="block text-sm font-medium hover:underline break-all" style={{ color: 'var(--nurc-teal)' }}>
                    nurcmedianext@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="rounded-2xl p-8 border border-border bg-slate-50/30 flex flex-col justify-between hover:shadow-sm transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(10, 37, 64, 0.05)', color: 'var(--nurc-teal)' }}>
                  <Phone size={20} />
                </div>
                <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--nurc-navy)' }}>
                  Phone Numbers
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Primary Contact
                    </span>
                    <a href="tel:+919810975257" className="block text-lg font-bold hover:underline" style={{ color: 'var(--nurc-navy)' }}>
                      +91-9810975257
                    </a>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Secondary Contact
                    </span>
                    <a href="tel:+919958949710" className="block text-lg font-bold hover:underline" style={{ color: 'var(--nurc-navy)' }}>
                      +91-9958949710
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link
              to="/contact"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 shadow-sm"
              style={{ background: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
            >
              Schedule Consultation
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
