import { useState } from 'react';
import { Link } from 'react-router';
import { Check, ArrowRight, Star } from 'lucide-react';
import { useLeadModal } from '../context/LeadModalContext';

const plans = [
  {
    name: 'Essential',
    price: { monthly: 12000, annual: 9600 },
    tagline: 'For single-sector intelligence',
    color: '#3B6E8A',
    features: [
      'Choose 1 sector newsletter',
      '52 weekly issues per year',
      'Reader Mode access',
      'PDF download & print',
      'Archive access (2 years)',
      'Email delivery by 7 AM',
    ],
    notIncluded: [
      'Multiple sector access',
      'Team sharing license',
      'Analyst consultation',
    ],
    cta: 'Start with Essential',
    popular: false,
  },
  {
    name: 'Executive',
    price: { monthly: 28000, annual: 22400 },
    tagline: 'For multi-sector leaders',
    color: '#006D7A',
    features: [
      'Choose up to 3 sector newsletters',
      '52 weekly issues per year',
      'Reader Mode access',
      'PDF download & print',
      'Full archive access (all years)',
      'Email delivery by 7 AM',
      'Team sharing (up to 3 users)',
      'Quarterly analyst briefing',
    ],
    notIncluded: [
      'Unlimited sector access',
      'Custom research requests',
    ],
    cta: 'Get Executive Access',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: null, annual: null },
    tagline: 'For corporate intelligence teams',
    color: '#0A2540',
    features: [
      'All sector newsletters',
      '52 weekly issues per year',
      'Reader Mode access',
      'PDF download & print',
      'Full archive access (since 2002)',
      'Email delivery by 7 AM',
      'Unlimited team sharing',
      'Monthly analyst consultation',
      'Custom research requests',
      'Dedicated account manager',
    ],
    notIncluded: [],
    cta: 'Contact for Pricing',
    popular: false,
  },
];

const faqs = [
  {
    q: 'Can I request a sample before subscribing?',
    a: 'Yes — request a complimentary sample issue for any sector using the link above. No registration required.',
  },
  {
    q: 'How are newsletters delivered?',
    a: 'All issues are delivered via email by 7:00 AM on the publication day. You can also access them through our secure online archive.',
  },
  {
    q: 'Can I change my sector selection?',
    a: 'Yes, sector selections can be adjusted at the start of each billing quarter. Contact your account manager for changes.',
  },
  {
    q: 'Is there a corporate or government discount?',
    a: 'Enterprise pricing is available for organisations subscribing for 5 or more users. Contact us for a tailored proposal.',
  },
];

export function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
  const { openDemoModal } = useLeadModal();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 text-center border-b border-border" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--nurc-teal)', letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}>
              Pricing
            </span>
            <div className="h-px w-12" style={{ background: 'var(--nurc-gold)' }} />
          </div>
          <h1
            className="mb-5"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 700, color: 'var(--nurc-navy)', lineHeight: 1.2 }}
          >
            Intelligence That Pays for Itself
          </h1>
          <p className="text-muted-foreground mb-8" style={{ fontSize: '17px', lineHeight: 1.8 }}>
            Every plan includes our Reader Mode, full archive access, and 7 AM delivery. Choose annual billing to save 20%.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center rounded-xl p-1 bg-muted gap-1">
            {(['monthly', 'annual'] as const).map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: billing === b ? '#FFFFFF' : 'transparent',
                  color: billing === b ? 'var(--nurc-navy)' : 'var(--muted-foreground)',
                  fontFamily: 'var(--font-heading)',
                  boxShadow: billing === b ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {b === 'annual' ? 'Annual (Save 20%)' : 'Monthly'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden border transition-all duration-200"
                style={{
                  borderColor: plan.popular ? plan.color : 'var(--border)',
                  boxShadow: plan.popular ? `0 8px 32px ${plan.color}25` : '0 2px 8px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={e => {
                  if (!plan.popular) (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={e => {
                  if (!plan.popular) (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                }}
              >
                {plan.popular && (
                  <div
                    className="text-white text-xs font-bold uppercase tracking-widest text-center py-2"
                    style={{ background: plan.color, letterSpacing: '0.12em', fontFamily: 'var(--font-heading)' }}
                  >
                    Most Popular
                  </div>
                )}
                <div className="p-7 bg-card">
                  <div className="flex items-start justify-between mb-2">
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, color: 'var(--nurc-navy)' }}>
                      {plan.name}
                    </h3>
                    {plan.popular && (
                      <Star size={16} fill="var(--nurc-gold)" style={{ color: 'var(--nurc-gold)' }} />
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.price[billing] ? (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs font-semibold text-muted-foreground mt-2" style={{ fontFamily: 'var(--font-heading)' }}>₹</span>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 700, color: 'var(--nurc-navy)', lineHeight: 1 }}>
                            {(plan.price[billing]! / 1000).toFixed(0)}K
                          </span>
                          <span className="text-muted-foreground text-sm ml-1" style={{ fontFamily: 'var(--font-heading)' }}>
                            / {billing === 'monthly' ? 'mo' : 'mo, billed annually'}
                          </span>
                        </div>
                        {billing === 'annual' && (
                          <p className="text-xs mt-1" style={{ color: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                            Save ₹{((plan.price.monthly! - plan.price.annual!) * 12 / 1000).toFixed(0)}K vs monthly billing
                          </p>
                        )}
                      </>
                    ) : (
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--nurc-navy)', lineHeight: 1 }}>
                          Custom
                        </div>
                        <p className="text-xs mt-1 text-muted-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                          Tailored for your organisation
                        </p>
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/subscribe?plan=${plan.name}`}
                    className="block text-center px-5 py-3 rounded-xl font-semibold text-white mb-6 transition-all hover:opacity-90"
                    style={{ background: plan.color, fontFamily: 'var(--font-heading)' }}
                  >
                    {plan.cta}
                  </Link>

                  <div className="space-y-2.5">
                    {plan.features.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${plan.color}20` }}>
                          <Check size={10} style={{ color: plan.color }} />
                        </div>
                        <span className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--foreground)', lineHeight: 1.5 }}>
                          {f}
                        </span>
                      </div>
                    ))}
                    {plan.notIncluded.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-2.5 opacity-40">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-muted" />
                        <span className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--foreground)', lineHeight: 1.5 }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Risk Reduction & Lead Generation Section */}
      <section className="py-12 bg-muted/30 border-t border-b border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold text-teal uppercase tracking-widest" style={{ color: 'var(--nurc-teal)' }}>Enterprise Risk Mitigation</span>
            <h3 className="text-xl font-bold text-navy mt-1 font-heading" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
              Evaluate NURC Before Making a Commitment
            </h3>
            <p className="text-xs text-muted-foreground mt-1">We offer multiple verification paths to ensure our curated intelligence matches your workflow needs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Action 1: Request Sample */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm text-navy" style={{ color: 'var(--nurc-navy)' }}>1. Review Active Briefings</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Browse our historical index and read guest-unlocked sector briefings to assess our curation depth.
                </p>
              </div>
              <Link
                to="/newsletters"
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-teal hover:underline cursor-pointer"
                style={{ color: 'var(--nurc-teal)' }}
              >
                Browse Sample Briefs
                <ArrowRight size={12} />
              </Link>
            </div>

            {/* Action 2: Schedule Demo */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm text-navy" style={{ color: 'var(--nurc-navy)' }}>2. Book Executive Demo</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Schedule a private 15-minute dashboard walkthrough to see customized workspace configurations.
                </p>
              </div>
              <button
                onClick={openDemoModal}
                className="mt-4 w-fit inline-flex items-center gap-1 text-xs font-bold text-teal hover:underline border-0 bg-transparent cursor-pointer p-0"
                style={{ color: 'var(--nurc-teal)' }}
              >
                Schedule B2B Consultation
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Action 3: Consult Analyst Team */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm text-navy" style={{ color: 'var(--nurc-navy)' }}>3. Talk to Analyst Team</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Send your custom sector requirements directly to our Delhi corporate research headquarters.
                </p>
              </div>
              <a
                href="mailto:contact@nurcmedianext.com"
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-teal hover:underline cursor-pointer"
                style={{ color: 'var(--nurc-teal)' }}
              >
                Email contact@nurcmedianext.com
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 border-t border-border" style={{ background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2
            className="text-center mb-10"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: 'var(--nurc-navy)' }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="pb-6" style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <h3 className="mb-2 font-semibold" style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--nurc-navy)' }}>
                  {faq.q}
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: '15px', lineHeight: 1.75 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-4" style={{ fontSize: '15px' }}>
              Have more questions? We're happy to help.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-70"
              style={{ color: 'var(--nurc-teal)', fontFamily: 'var(--font-heading)' }}
            >
              Contact our team
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
