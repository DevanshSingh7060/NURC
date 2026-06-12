import React, { useState } from 'react';
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [sector, setSector] = useState('Automotive');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setSector('Automotive');
    setMessage('');
  };

  const industrySectors = [
    'Automotive',
    'Banking & Finance',
    'Infrastructure',
    'Energy & Power',
    'Healthcare',
    'FMCG & Retail',
    'Insurance',
    'Technology',
    'Metals & Mining'
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Contact Hero */}
      <section className="py-16 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[var(--nurc-gold)]" style={{ background: 'var(--nurc-gold)' }} />
            <span className="text-xs font-bold uppercase tracking-widest text-[#006D7A]" style={{ letterSpacing: '0.14em', fontFamily: 'var(--font-heading)' }}>
              Corporate Relations Desk
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-navy" style={{ fontFamily: 'var(--font-display)', color: 'var(--nurc-navy)', lineHeight: 1.2 }}>
            Connect with our Intelligence Team
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mt-3">
            For custom research configurations, enterprise licensing inquiries, or direct feedback on our analyst dispatches, reach our Mayur Vihar Delhi offices.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-12 gap-12">
        
        {/* Left Side: Corporate Details (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-navy mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--nurc-navy)' }}>
              Delhi Corporate HQ
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="text-teal shrink-0 mt-1" size={18} style={{ color: 'var(--nurc-teal)' }} />
                <div>
                  <span className="block text-xs font-bold uppercase text-muted-foreground tracking-wider">Corporate Office</span>
                  <span className="block text-sm font-semibold text-navy mt-1 leading-relaxed" style={{ color: 'var(--nurc-navy)' }}>
                    N.U.R.C. MediaNext Private Ltd.<br />
                    9A, Pocket-B, SFS Flats<br />
                    Mayur Vihar Phase-III<br />
                    Delhi - 110096, India
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="text-teal shrink-0 mt-1" size={18} style={{ color: 'var(--nurc-teal)' }} />
                <div>
                  <span className="block text-xs font-bold uppercase text-muted-foreground tracking-wider">Telephone Targets</span>
                  <div className="space-y-1 mt-1">
                    <a href="tel:+919810975257" className="block text-sm font-semibold text-navy hover:underline" style={{ color: 'var(--nurc-navy)' }}>
                      +91-9810975257 (Primary)
                    </a>
                    <a href="tel:+919958949710" className="block text-sm font-semibold text-navy hover:underline" style={{ color: 'var(--nurc-navy)' }}>
                      +91-9958949710 (Secondary)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="text-teal shrink-0 mt-1" size={18} style={{ color: 'var(--nurc-teal)' }} />
                <div>
                  <span className="block text-xs font-bold uppercase text-muted-foreground tracking-wider">Secure Email Dispatches</span>
                  <div className="space-y-1 mt-1">
                    <a href="mailto:contact@nurcmedianext.com" className="block text-sm font-semibold text-teal hover:underline" style={{ color: 'var(--nurc-teal)' }}>
                      contact@nurcmedianext.com
                    </a>
                    <a href="mailto:nurcmnx@gmail.com" className="block text-sm font-semibold text-teal hover:underline text-xs" style={{ color: 'var(--nurc-teal)' }}>
                      nurcmnx@gmail.com
                    </a>
                    <a href="mailto:nurcmedianext@gmail.com" className="block text-sm font-semibold text-teal hover:underline text-xs" style={{ color: 'var(--nurc-teal)' }}>
                      nurcmedianext@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-teal/5 border border-teal-100 rounded-2xl space-y-2.5">
            <h4 className="text-xs font-bold uppercase text-teal tracking-wider" style={{ color: 'var(--nurc-teal)' }}>Analyst Coverage Scope</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We track daily macro developments, OEM pricing sheets, SEBI/RBI circulars, and public-private partnership tender indices to curate highly specialized dispatches.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive B2B Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-border rounded-3xl p-8 shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-navy" style={{ fontFamily: 'var(--font-heading)', color: 'var(--nurc-navy)' }}>
                    Transmit Message
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Messages are routed securely to our Delhi editorial board for review.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Devansh Singh"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-border bg-[#F9FAFB] rounded-xl focus:outline-none focus:ring-1 focus:ring-teal text-xs transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="devansh@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 border border-border bg-[#F9FAFB] rounded-xl focus:outline-none focus:ring-1 focus:ring-teal text-xs transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Corporate Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98109 75257"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 border border-border bg-[#F9FAFB] rounded-xl focus:outline-none focus:ring-1 focus:ring-teal text-xs transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tata Motors"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className="w-full px-4 py-2.5 border border-border bg-[#F9FAFB] rounded-xl focus:outline-none focus:ring-1 focus:ring-teal text-xs transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Target Sector</label>
                  <select
                    value={sector}
                    onChange={e => setSector(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border bg-[#F9FAFB] rounded-xl focus:outline-none focus:ring-1 focus:ring-teal text-xs font-semibold cursor-pointer"
                  >
                    {industrySectors.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Message Body *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about your query or custom intelligence briefing needs..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border bg-[#F9FAFB] rounded-xl focus:outline-none focus:ring-1 focus:ring-teal text-xs resize-none transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[var(--nurc-navy)] hover:opacity-95 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer transition-all border-0"
                    style={{ background: 'var(--nurc-navy)' }}
                  >
                    Transmit Information Securely
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>NDA Encrypted Dispatch Platform</span>
                </div>
              </form>
            ) : (
              <div className="text-center py-10 space-y-6">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-navy text-lg" style={{ color: 'var(--nurc-navy)' }}>Message Transmitted Successfully</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    Thank you, {name}. Your inquiry has been routed to our C-Suite liaison. Our corporate relations desk will contact you at {email} within 2 business hours.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 border border-border text-navy rounded-lg text-xs font-bold hover:bg-muted transition-colors cursor-pointer"
                  style={{ color: 'var(--nurc-navy)' }}
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>

      </section>

    </div>
  );
}
