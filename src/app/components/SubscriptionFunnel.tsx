import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router';
import { useApp, Subscriber } from '../context/AppContext';
import { NewsletterThemeRenderer } from './NewsletterThemeRenderer';
import { Check, Star, ArrowRight, ArrowLeft, ShieldAlert, Award, Newspaper } from 'lucide-react';

const plans = [
  {
    value: 'Essential' as const,
    name: 'Essential Brief',
    price: '₹12,000 / mo',
    billed: 'billed annually',
    description: 'Perfect for single-sector intelligence tracking.',
    features: ['Choose 1 sector newsletter', 'Daily issues delivered to inbox', 'Comfort Reader Mode access', 'Instant PDF download & print', 'Archive access (2 years)'],
    popular: false,
    color: '#3B6E8A'
  },
  {
    value: 'Executive' as const,
    name: 'Executive Access',
    price: '₹22,400 / mo',
    billed: 'billed annually',
    description: 'Designed for multi-sector corporate leaders.',
    features: ['Choose up to 3 sector newsletters', 'Daily issues delivered to inbox', 'Comfort Reader Mode access', 'Instant PDF download & print', 'Full archive access (all years)', 'Quarterly analyst briefings', 'Team sharing (up to 3 users)'],
    popular: true,
    color: '#006D7A'
  },
  {
    value: 'Enterprise' as const,
    name: 'Enterprise Intelligence',
    price: 'Custom Quote',
    billed: 'tailored for organizations',
    description: 'Full-scale market research and analyst access.',
    features: ['All sector newsletters included', 'Daily issues delivered to inbox', 'Unlimited team sharing licenses', 'Monthly direct analyst consultations', 'Custom research & brief requests', 'Full archive access (since 2002)', 'Dedicated corporate account manager'],
    popular: false,
    color: '#0A2540'
  }
];

const industriesList = [
  'Automotive', 'Banking', 'Finance', 'Insurance',
  'Healthcare', 'Energy', 'Metals', 'Pharma', 'Technology'
];

const themes = [
  {
    value: 'Original' as const,
    label: 'Original NURC',
    tag: 'Traditional Editorial',
    desc: 'Georgia display headings, clean white theme, traditional news hierarchy.',
    bg: '#FAF9F6',
    border: 'var(--nurc-teal)',
    textColor: '#1A1A1A'
  },
  {
    value: 'Executive' as const,
    label: 'Executive Brief',
    tag: 'McKinsey Inspired',
    desc: 'Bold minimal sans-serif, high-contrast, pure white backdrop. Highly professional.',
    bg: '#FFFFFF',
    border: '#0A2540',
    textColor: '#111111'
  },
  {
    value: 'FT' as const,
    label: 'Financial Times',
    tag: 'Business Editorial',
    desc: 'Soft warm peach-beige background, editorial borders, strong serif flow.',
    bg: '#FAF4EB',
    border: '#EADFCB',
    textColor: '#2B2927'
  },
  {
    value: 'Modern' as const,
    label: 'Modern Intelligence',
    tag: 'Morning Brew Style',
    desc: 'Structured cards, rounded blocks, category highlight pills. Highly readable.',
    bg: '#F3F4F6',
    border: 'var(--nurc-gold)',
    textColor: '#2D3748'
  },
  {
    value: 'Corporate' as const,
    label: 'Corporate Digest',
    tag: 'High Information Density',
    desc: 'Monospace, ultra compact, summaries at the top, space-saving grids.',
    bg: '#F8F9FA',
    border: '#DEE2E6',
    textColor: '#212529'
  }
];

const SAMPLE_PREVIEW_ARTICLE = {
  title: 'India Macro Intelligence Briefing',
  subtitle: 'Daily Corporate Briefing · May 30, 2026',
  category: 'Macro Economics',
  date: 'May 30, 2026',
  readTime: '3 min read',
  content: [
    {
      type: 'section' as const,
      heading: 'EXECUTIVE SUMMARY',
      tag: 'Market Dynamics',
      text: `India's corporate margins showed a structural expansion of +120 basis points in Q1 FY26. The improvement was driven by softer commodity input prices, optimized domestic logistics operations, and steady volume gains in core middle-income urban markets.`
    },
    {
      type: 'data' as const,
      heading: 'KEY MARKET METRICS',
      tag: 'Macro Statistics',
      items: [
        'Urban consumption growth: +8.4% YoY',
        'Private investment growth: +11.2% YoY',
        'Core inflation baseline: 4.8% held steady'
      ]
    },
    {
      type: 'quote' as const,
      text: 'The tailwinds supporting domestic earnings remain strong. High-single-digit volume growth will likely sustain across consumer products, financial services, and mobility sectors through Q3.',
      attribution: 'NURC Global Research Board, Macroeconomics Division'
    }
  ]
};

export function SubscriptionFunnel() {
  const { currentUser, updateSubscription, signup } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plan');

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  // Step 1: Selected Plan (pre-selects based on URL query parameter)
  const [selectedPlan, setSelectedPlan] = useState<Subscriber['plan']>(() => {
    if (planParam) {
      const matched = plans.find(p => p.name.toLowerCase().includes(planParam.toLowerCase()) || p.value.toLowerCase() === planParam.toLowerCase());
      if (matched) return matched.value;
    }
    return currentUser?.plan || 'Executive';
  });

  // Step 2: Corporate Info
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [companyName, setCompanyName] = useState(currentUser?.companyName || '');
  const [designation, setDesignation] = useState(currentUser?.designation || '');
  const [companyWebsite, setCompanyWebsite] = useState(currentUser?.companyWebsite || '');

  // Step 3: Industries
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(currentUser?.industries || ['Automotive', 'Banking']);

  // Step 4: Preferred Theme
  const [selectedTheme, setSelectedTheme] = useState<Subscriber['theme']>(currentUser?.theme || 'Original');

  const handleIndustryToggle = (ind: string) => {
    setSelectedIndustries(prev =>
      prev.includes(ind) ? prev.filter(x => x !== ind) : [...prev, ind]
    );
  };

  const nextStep = () => {
    setError('');
    if (step === 2) {
      if (!fullName || !email || !phone || !companyName || !designation) {
        setError('Please complete all required business information fields.');
        return;
      }
    }
    if (step === 3) {
      if (selectedIndustries.length === 0) {
        setError('Please choose at least one industry sector.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(prev => prev - 1);
  };

  const handleComplete = () => {
    // If user is not logged in, register them in database
    if (!currentUser) {
      signup({
        fullName,
        email,
        phone,
        companyName,
        industry: selectedIndustries[0] || 'Technology',
        designation,
        companySize: '50-200',
        industries: selectedIndustries,
        theme: selectedTheme,
        password: 'password123', // Default temporary pass
        companyWebsite
      });
    }

    // Activate the subscription (Daily is forced internally in context)
    updateSubscription(selectedPlan, selectedIndustries, selectedTheme, {
      fullName,
      phone,
      companyName,
      designation,
      companyWebsite
    });

    alert(`Subscription activated successfully! You now have active ${selectedPlan} access.`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F8F9FA] py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        
        {/* Progress Tracker */}
        <div className="mb-10">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
            <span>Step {step} of 4</span>
            <span>
              {step === 1 && 'Choose Plan'}
              {step === 2 && 'Business Details'}
              {step === 3 && 'Industry Coverage'}
              {step === 4 && 'Newsletter Appearance'}
            </span>
          </div>
          <div className="h-1.5 w-full bg-border rounded-full flex overflow-hidden">
            <div className="h-full bg-teal transition-all duration-300" style={{ width: `${(step / 4) * 100}%`, background: 'var(--nurc-teal)' }} />
          </div>
        </div>

        {/* Form Error Panel */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
            <ShieldAlert size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: CHOOSE PLAN */}
        {step === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-navy" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
                Select Your Access License
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                All plans include access to our high-contrast Reader Mode, comprehensive daily archives, and early morning delivery.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-4">
              {plans.map(p => {
                const isSelected = selectedPlan === p.value;
                return (
                  <div
                    key={p.value}
                    onClick={() => setSelectedPlan(p.value)}
                    className="bg-card border rounded-2xl p-6 flex flex-col justify-between relative cursor-pointer transition-all duration-200 select-none"
                    style={{
                      borderColor: isSelected ? 'var(--nurc-teal)' : 'var(--border)',
                      boxShadow: isSelected ? '0 12px 24px rgba(0,109,122,0.08)' : '0 2px 8px rgba(0,0,0,0.02)',
                      transform: isSelected ? 'translateY(-3px)' : 'none'
                    }}
                  >
                    {p.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white bg-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm" style={{ background: 'var(--nurc-gold)' }}>
                        <Star size={10} fill="#fff" />
                        Most Popular
                      </div>
                    )}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg" style={{ color: 'var(--nurc-navy)' }}>{p.name}</h3>
                        {isSelected && <div className="w-5 h-5 rounded-full text-white bg-teal flex items-center justify-center text-xs font-bold" style={{ background: 'var(--nurc-teal)' }}>✓</div>}
                      </div>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{p.description}</p>
                      
                      <div className="mb-6">
                        <span className="text-2xl font-bold" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-display)' }}>{p.price}</span>
                        <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-0.5">{p.billed}</span>
                      </div>

                      <div className="space-y-2 border-t border-border pt-4">
                        {p.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-foreground leading-relaxed">
                            <Check size={12} className="shrink-0 mt-0.5" style={{ color: 'var(--nurc-teal)' }} />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={nextStep}
                className="btn-nurc flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold text-sm transition-all focus:outline-none cursor-pointer"
                style={{ background: 'var(--nurc-navy)' }}
              >
                Continue to Business Details
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: BUSINESS INFORMATION */}
        {step === 2 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-navy" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
                Verify Corporate Profile
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We configure delivery licenses based on verified business details.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 grid md:grid-cols-2 gap-5 shadow-sm">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Devan Sharma"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-4 py-2 border border-border bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Business Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  disabled={!!currentUser}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-border bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all disabled:opacity-60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98109 75257"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-border bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tata Motors"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2 border border-border bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Designation / Role *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Risk Analyst"
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  className="w-full px-4 py-2 border border-border bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Company Website URL</label>
                <input
                  type="url"
                  placeholder="https://company.com"
                  value={companyWebsite}
                  onChange={e => setCompanyWebsite(e.target.value)}
                  className="w-full px-4 py-2 border border-border bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={prevStep}
                className="btn-nurc flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all hover:bg-muted cursor-pointer"
                style={{ borderColor: 'var(--border)', color: 'var(--nurc-navy)' }}
              >
                <ArrowLeft size={14} />
                Back
              </button>
              <button
                onClick={nextStep}
                className="btn-nurc flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold text-sm transition-all focus:outline-none cursor-pointer"
                style={{ background: 'var(--nurc-navy)' }}
              >
                Select Industry Sectors
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SELECT INDUSTRIES */}
        {step === 3 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-navy" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
                Target Sector Intelligence
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose the industry sectors to activate in your daily intelligence feeds.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {industriesList.map(ind => {
                  const selected = selectedIndustries.includes(ind);
                  return (
                    <div
                      key={ind}
                      onClick={() => handleIndustryToggle(ind)}
                      className="border rounded-xl p-5 flex flex-col justify-between h-28 cursor-pointer select-none transition-all"
                      style={{
                        borderColor: selected ? 'var(--nurc-teal)' : 'var(--border)',
                        background: selected ? 'rgba(0,109,122,0.03)' : 'transparent',
                        boxShadow: selected ? '0 4px 12px rgba(0,109,122,0.04)' : 'none'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sector</span>
                        <div
                          className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold"
                          style={{
                            background: selected ? 'var(--nurc-teal)' : 'transparent',
                            borderColor: selected ? 'var(--nurc-teal)' : '#D1D5DB',
                            color: '#fff'
                          }}
                        >
                          {selected ? '✓' : ''}
                        </div>
                      </div>
                      <div className="font-bold text-sm" style={{ color: 'var(--nurc-navy)' }}>{ind}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={prevStep}
                className="btn-nurc flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all hover:bg-muted cursor-pointer"
                style={{ borderColor: 'var(--border)', color: 'var(--nurc-navy)' }}
              >
                <ArrowLeft size={14} />
                Back
              </button>
              <button
                onClick={nextStep}
                className="btn-nurc flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold text-sm transition-all focus:outline-none cursor-pointer"
                style={{ background: 'var(--nurc-navy)' }}
              >
                Choose Newsletter Appearance
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CHOOSE APPEARANCE THEME (Side-by-Side Interactive Preview Screen!) */}
        {step === 4 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-navy" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
                Preferred Presentation Layout
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Select an editorial theme. Swap themes instantly, and compare the live rendering of actual briefing content below.
              </p>
            </div>

            {/* Split layout: Selector on left, Live Rendering on right */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Selector Column (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1">
                  <Newspaper size={13} />
                  Theme Options
                </div>
                {themes.map(t => {
                  const isSelected = selectedTheme === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setSelectedTheme(t.value)}
                      className="w-full bg-white border text-left p-4 rounded-xl flex items-start gap-3 select-none transition-all cursor-pointer shadow-sm hover:bg-muted"
                      style={{
                        borderColor: isSelected ? 'var(--nurc-teal)' : 'var(--border)',
                        background: isSelected ? 'rgba(0,109,122,0.02)' : '#FFFFFF',
                        transform: isSelected ? 'scale(1.01)' : 'none'
                      }}
                    >
                      <div className="mt-1 shrink-0">
                        <div
                          className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px]"
                          style={{
                            background: isSelected ? 'var(--nurc-teal)' : 'transparent',
                            borderColor: isSelected ? 'var(--nurc-teal)' : '#D1D5DB',
                            color: '#fff'
                          }}
                        >
                          {isSelected ? '✓' : ''}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-navy" style={{ color: 'var(--nurc-navy)' }}>{t.label}</span>
                          <span className="text-[8px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide shrink-0">
                            {t.value === 'Original' ? 'Default' : t.tag.split(' ')[0]}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{t.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Preview Viewport (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-border p-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-2 right-3 text-[9px] font-bold text-teal bg-teal-50 px-2 py-0.5 rounded uppercase tracking-wider select-none z-10" style={{ color: 'var(--nurc-teal)' }}>
                  Live Layout Preview
                </div>
                
                {/* Scrollable mini reading pane */}
                <div className="overflow-y-auto max-h-[380px] border border-border/40 rounded-xl" style={{ scrollbarWidth: 'thin' }}>
                  <NewsletterThemeRenderer article={SAMPLE_PREVIEW_ARTICLE} theme={selectedTheme} />
                </div>
              </div>

            </div>

            <div className="flex items-center justify-between pt-6 border-t border-border">
              <button
                onClick={prevStep}
                className="btn-nurc flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all hover:bg-muted cursor-pointer"
                style={{ borderColor: 'var(--border)', color: 'var(--nurc-navy)' }}
              >
                <ArrowLeft size={14} />
                Back
              </button>
              <button
                onClick={handleComplete}
                className="btn-nurc flex items-center gap-2 px-8 py-3 rounded-lg text-white font-semibold text-sm transition-all focus:outline-none cursor-pointer"
                style={{ background: 'var(--nurc-teal)' }}
              >
                Activate Subscription License
                <Award size={15} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
