import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, ShieldAlert, CheckCircle2 } from 'lucide-react';

export function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please enter both your business email and password.');
      return;
    }

    const success = login(email, password);
    if (success) {
      setSuccess('Authentication successful. Redirecting to your dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } else {
      setError('Invalid business email or password. Please try again or contact support.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid lg:grid-cols-2 bg-background">
      {/* Left panel - Editorial Quote */}
      <div 
        className="hidden lg:flex flex-col justify-between p-12 text-white relative overflow-hidden"
        style={{ background: 'var(--nurc-navy)' }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#006D7A_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Top Branding */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-white text-navy flex items-center justify-center font-bold text-xs" style={{ color: 'var(--nurc-navy)' }}>N</div>
          <span className="font-bold tracking-wider text-xs uppercase" style={{ letterSpacing: '0.15em' }}>NURC Intelligence Platform</span>
        </div>

        {/* Quote Block */}
        <div className="relative z-10 my-auto max-w-lg space-y-6">
          <div className="h-0.5 w-16" style={{ background: 'var(--nurc-gold)' }} />
          <blockquote className="space-y-4">
            <p className="text-3xl font-normal leading-relaxed italic" style={{ fontFamily: 'var(--font-display)' }}>
              "The ability to filter noise and access highly structured, industry-specific intelligence is no longer an advantage — it is a prerequisite for corporate survival."
            </p>
            <cite className="block text-sm not-italic font-semibold tracking-wider uppercase" style={{ color: 'var(--nurc-gold)', letterSpacing: '0.1em' }}>
              — NURC Research Board, Annual Executive Briefing
            </cite>
          </blockquote>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-muted-foreground flex items-center justify-between border-t border-white/10 pt-6">
          <span>Curated B2B Briefings Since 2002</span>
          <span>Security Certified TLS 1.3</span>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-16 lg:px-24 bg-card">
        <div className="mx-auto w-full max-w-md space-y-8">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground" style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-heading)' }}>
                Subscriber Portal
              </span>
              <div className="h-px w-8 bg-border" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-navy" style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}>
              Access Executive Intelligence
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Welcome back. Enter your corporate credentials to access your active newsletters and archive.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
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

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-semibold" style={{ color: 'var(--nurc-navy)' }}>
                Business Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold" style={{ color: 'var(--nurc-navy)' }}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('For password retrieval, please contact your corporate portal administrator or NURC Support at contact@nurcmedianext.com.')}
                  className="text-xs font-semibold text-teal hover:underline"
                  style={{ color: 'var(--nurc-teal)' }}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-border text-teal focus:ring-teal cursor-pointer"
                style={{ accentColor: 'var(--nurc-teal)' }}
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-muted-foreground select-none cursor-pointer">
                Remember this device for 30 days
              </label>
            </div>

            {/* Action buttons */}
            <button
              type="submit"
              className="btn-nurc w-full h-12 rounded-xl text-white font-semibold text-sm transition-all focus:outline-none flex items-center justify-center animate-none"
              style={{ background: 'var(--nurc-navy)' }}
            >
              Sign In to Briefings
            </button>
          </form>

          {/* Create Account link */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Don't have an intelligence subscription?{' '}
              <Link to="/signup" className="font-semibold text-teal hover:underline" style={{ color: 'var(--nurc-teal)' }}>
                Create Free Account
              </Link>{' '}
              or{' '}
              <Link to="/contact" className="font-semibold text-teal hover:underline" style={{ color: 'var(--nurc-teal)' }}>
                Get In Touch
              </Link>
            </p>
          </div>

          {/* Support footer */}
          <div className="text-center">
            <button
              onClick={() => alert('Support coordinates: Primary Contact: +91-9810975257 | Secondary Contact: +91-9958949710 | Email: contact@nurcmedianext.com')}
              className="text-xs text-muted-foreground hover:text-foreground font-medium underline"
            >
              Contact Platform Support Desk
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
