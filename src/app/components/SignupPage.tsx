import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useApp } from '../context/AppContext';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { SEOHead } from './shared/SEOHead';

const industriesList = [
  'Automotive', 'Banking', 'Finance', 'Insurance',
  'Energy', 'Metals', 'Healthcare', 'Pharmaceuticals',
  'Technology', 'Manufacturing', 'Infrastructure', 'Custom Industry'
];



export function SignupPage() {
  const { signup } = useApp();
  const navigate = useNavigate();

  // Personal Info State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Company Info State
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('Technology');
  const [designation, setDesignation] = useState('');
  const [companySize, setCompanySize] = useState('50-200');

  // Preferences State
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  // Passwords & Agreement
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleIndustryToggle = (ind: string) => {
    setSelectedIndustries(prev =>
      prev.includes(ind) ? prev.filter(x => x !== ind) : [...prev, ind]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validations
    if (!fullName || !email || !phone || !companyName || !designation || !password) {
      setError('Please complete all required fields in the signup form.');
      return;
    }

    if (selectedIndustries.length === 0) {
      setError('Please choose at least one industry sector preference.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your entry.');
      return;
    }

    if (!agreeTerms) {
      setError('You must accept the Terms of Service to create a professional account.');
      return;
    }

    // Call Context action
    signup({
      fullName,
      email,
      phone,
      companyName,
      industry,
      designation,
      companySize,
      industries: selectedIndustries,
      theme: 'Original',
      password
    });

    setSuccess('Account created successfully! Preparing your corporate briefing dashboard...');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <SEOHead
        title="Sign Up | NURC MediaNext"
        description="Create your NURC MediaNext account to access curated industry intelligence across automotive, banking, infrastructure, and more."
        canonicalUrl="/signup"
        noindex={true}
      />
      <div className="max-w-3xl mx-auto">
        
        {/* Brand Banner */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded text-white flex items-center justify-center font-bold text-xs" style={{ background: 'var(--nurc-navy)' }}>N</div>
            <span className="font-bold tracking-wider text-xs uppercase" style={{ color: 'var(--nurc-teal)', letterSpacing: '0.15em' }}>NURC Intelligence Network</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-navy" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
            Register as a Subscriber
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
            Set up your credentials, select your target industries, choose your preferred briefing theme, and access premium daily intelligence.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-8 space-y-8">
          
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
              <ShieldAlert size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3 text-green-800 text-sm">
              <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* Section 1: Personal Info */}
          <div>
            <h3 className="text-lg font-bold pb-2 border-b border-border flex items-center gap-2" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
              <span className="w-5 h-5 rounded-full bg-navy text-white text-xs flex items-center justify-center" style={{ background: 'var(--nurc-navy)' }}>1</span>
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-5 mt-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.05em' }}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Devansh Sharma"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full h-12 px-4 border border-border bg-input-background rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.05em' }}>
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-12 px-4 border border-border bg-input-background rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.05em' }}>
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98109 75257"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full h-12 px-4 border border-border bg-input-background rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Company Info */}
          <div>
            <h3 className="text-lg font-bold pb-2 border-b border-border flex items-center gap-2" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
              <span className="w-5 h-5 rounded-full bg-navy text-white text-xs flex items-center justify-center" style={{ background: 'var(--nurc-navy)' }}>2</span>
              Company Details
            </h3>
            <div className="grid md:grid-cols-2 gap-5 mt-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.05em' }}>
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tata Motors"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full h-12 px-4 border border-border bg-input-background rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.05em' }}>
                  Industry Sector <span className="text-red-500">*</span>
                </label>
                <select
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  className="w-full h-12 px-4 border border-border bg-card rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all cursor-pointer"
                >
                  {industriesList.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.05em' }}>
                  Designation / Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Industry Analyst"
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  className="w-full h-12 px-4 border border-border bg-input-background rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.05em' }}>
                  Company Size
                </label>
                <select
                  value={companySize}
                  onChange={e => setCompanySize(e.target.value)}
                  className="w-full h-12 px-4 border border-border bg-card rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all cursor-pointer"
                >
                  <option value="1-10">1 - 10 employees</option>
                  <option value="10-50">10 - 50 employees</option>
                  <option value="50-200">50 - 200 employees</option>
                  <option value="200-500">200 - 500 employees</option>
                  <option value="500-1000">500 - 1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Preferences */}
          <div>
            <h3 className="text-lg font-bold pb-2 border-b border-border flex items-center gap-2" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
              <span className="w-5 h-5 rounded-full bg-navy text-white text-xs flex items-center justify-center" style={{ background: 'var(--nurc-navy)' }}>3</span>
              Newsletter Intelligence Settings
            </h3>
            
            {/* Industry Preferences */}
            <div className="mt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2" style={{ letterSpacing: '0.05em' }}>
                Select Targeted Sector Preferences (Choose at least one) <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {industriesList.map(ind => {
                  const selected = selectedIndustries.includes(ind);
                  return (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => handleIndustryToggle(ind)}
                      className="h-12 px-4 text-xs font-semibold rounded-xl text-left transition-all border shrink-0 cursor-pointer flex items-center justify-between"
                      style={{
                        background: selected ? 'var(--nurc-navy)' : 'transparent',
                        color: selected ? '#fff' : 'var(--nurc-navy)',
                        borderColor: selected ? 'var(--nurc-navy)' : 'var(--border)'
                      }}
                    >
                      <span>{ind}</span>
                      {selected && <span className="text-[10px] text-white">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>


          </div>

          {/* Section 4: Passwords */}
          <div>
            <h3 className="text-lg font-bold pb-2 border-b border-border flex items-center gap-2" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
              <span className="w-5 h-5 rounded-full bg-navy text-white text-xs flex items-center justify-center" style={{ background: 'var(--nurc-navy)' }}>4</span>
              Security & Credentials
            </h3>
            <div className="grid md:grid-cols-2 gap-5 mt-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.05em' }}>
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-12 px-4 border border-border bg-input-background rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.05em' }}>
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full h-12 px-4 border border-border bg-input-background rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all"
                />
              </div>
            </div>
          </div>

          {/* Agreements */}
          <div className="pt-4 border-t border-border space-y-4">
            <div className="flex items-start">
              <input
                id="agree"
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={e => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 rounded border-border text-teal focus:ring-teal mt-0.5 cursor-pointer"
                style={{ accentColor: 'var(--nurc-teal)' }}
              />
              <label htmlFor="agree" className="ml-2 block text-xs text-muted-foreground cursor-pointer select-none leading-relaxed">
                I agree to the <span className="underline font-semibold" style={{ color: 'var(--nurc-navy)' }}>Terms & Conditions</span> and consent to receive daily or weekly sector analysis reports from NURC MediaNext in my business inbox.
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                className="btn-nurc flex-1 h-12 rounded-xl text-white font-semibold text-sm transition-all focus:outline-none cursor-pointer flex items-center justify-center animate-none"
                style={{ background: 'var(--nurc-navy)' }}
              >
                Create Subscriber Account
              </button>
              <Link
                to="/login"
                className="btn-nurc text-center h-12 px-6 rounded-xl text-sm font-semibold border transition-all hover:bg-muted flex items-center justify-center animate-none"
                style={{ borderColor: 'var(--border)', color: 'var(--nurc-navy)', textDecoration: 'none' }}
              >
                Login Instead
              </Link>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
