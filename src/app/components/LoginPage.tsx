import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router';
import { useApp } from '../context/AppContext';
import {
  Eye,
  EyeOff,
  ShieldAlert,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  MailCheck,
} from 'lucide-react';
import { SEOHead } from './shared/SEOHead';
import {
  loginSchema,
  type LoginInput,
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from '../lib/validation';
import { api, ApiError } from '../lib/apiClient';

const fieldClass =
  'w-full h-12 px-4 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all';
const errorClass = 'text-xs font-semibold text-red-600 mt-1';

export function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  const [resetSentTo, setResetSentTo] = useState<string | null>(null);

  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const forgotForm = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onLogin = async (data: LoginInput) => {
    setAuthError('');
    setAuthSuccess('');
    const ok = login(data.email, data.password);
    if (ok) {
      setAuthSuccess('Authentication successful. Redirecting to your dashboard…');
      setTimeout(() => navigate('/dashboard'), 1200);
    } else {
      setAuthError('Invalid business email or password. Please try again or contact support.');
    }
  };

  const onForgot = async (data: ForgotPasswordInput) => {
    try {
      await api.requestPasswordReset(data.email);
      setResetSentTo(data.email);
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : 'Could not send reset instructions. Try again.',
      );
    }
  };

  const showSupport = () =>
    toast.info(
      'Support: +91-9810975257 (primary) · +91-9958949710 (secondary) · contact@nurcmedianext.com',
      { duration: 8000 },
    );

  const backToLogin = () => {
    setMode('login');
    setResetSentTo(null);
    forgotForm.reset();
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid lg:grid-cols-2 bg-background">
      <SEOHead
        title="Login | NURC MediaNext"
        description="Access your NURC MediaNext dashboard for curated industry intelligence, newsletter archive, and personalized sector coverage."
        canonicalUrl="/login"
        noindex={true}
      />
      {/* Left panel - Editorial Quote */}
      <div className="hidden lg:flex flex-col justify-between p-12 text-white relative overflow-hidden bg-nurc-navy">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#006D7A_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-white text-nurc-navy flex items-center justify-center font-bold text-xs">
            N
          </div>
          <span className="font-bold text-xs uppercase tracking-[0.15em]">
            NURC Intelligence Platform
          </span>
        </div>

        <div className="relative z-10 my-auto max-w-lg space-y-6">
          <div className="h-0.5 w-16 bg-nurc-gold" />
          <blockquote className="space-y-4">
            <p className="text-3xl font-normal leading-relaxed italic font-display">
              "The ability to filter noise and access highly structured, industry-specific
              intelligence is no longer an advantage — it is a prerequisite for corporate survival."
            </p>
            <cite className="block text-sm not-italic font-semibold uppercase text-nurc-gold tracking-[0.1em]">
              — NURC Research Board, Annual Executive Briefing
            </cite>
          </blockquote>
        </div>

        <div className="relative z-10 text-xs text-muted-foreground flex items-center justify-between border-t border-white/10 pt-6">
          <span>Curated B2B Briefings Since 2000</span>
          <span>Security Certified TLS 1.3</span>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-16 lg:px-24 bg-card">
        <div className="mx-auto w-full max-w-md space-y-8">
          {mode === 'login' ? (
            <>
              {/* Header */}
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <span className="text-xs font-bold uppercase text-muted-foreground tracking-[0.12em] font-heading">
                    Subscriber Portal
                  </span>
                  <div className="h-px w-8 bg-border" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-nurc-navy font-heading">
                  Access Executive Intelligence
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Welcome back. Enter your corporate credentials to access your active newsletters
                  and archive.
                </p>
              </div>

              {/* Login Form */}
              <form className="space-y-5" onSubmit={loginForm.handleSubmit(onLogin)} noValidate>
                {authError && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
                    <ShieldAlert size={18} className="shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}
                {authSuccess && (
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3 text-green-800 text-sm">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                    <span>{authSuccess}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label
                    htmlFor="login-email"
                    className="block text-sm font-semibold text-nurc-navy"
                  >
                    Business Email Address
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@company.com"
                    aria-required
                    aria-invalid={!!loginForm.formState.errors.email}
                    aria-describedby={
                      loginForm.formState.errors.email ? 'login-email-error' : undefined
                    }
                    className={fieldClass}
                    {...loginForm.register('email')}
                  />
                  {loginForm.formState.errors.email && (
                    <p id="login-email-error" className={errorClass}>
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="login-password"
                      className="block text-sm font-semibold text-nurc-navy"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-xs font-semibold hover:underline text-nurc-teal"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      aria-required
                      aria-invalid={!!loginForm.formState.errors.password}
                      aria-describedby={
                        loginForm.formState.errors.password ? 'login-password-error' : undefined
                      }
                      className={`${fieldClass} pr-10`}
                      {...loginForm.register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p id="login-password-error" className={errorClass}>
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-teal focus:ring-teal cursor-pointer accent-nurc-teal"
                    {...loginForm.register('rememberMe')}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-xs text-muted-foreground select-none cursor-pointer"
                  >
                    Remember this device for 30 days
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loginForm.formState.isSubmitting}
                  className="btn-nurc w-full h-12 rounded-xl text-white font-semibold text-sm transition-all focus:outline-none flex items-center justify-center gap-2 animate-none disabled:opacity-60 disabled:cursor-not-allowed bg-nurc-navy"
                >
                  {loginForm.formState.isSubmitting && (
                    <Loader2 size={16} className="animate-spin" />
                  )}
                  {loginForm.formState.isSubmitting ? 'Signing in…' : 'Sign In to Briefings'}
                </button>
              </form>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Don't have an intelligence subscription?{' '}
                  <Link to="/signup" className="font-semibold hover:underline text-nurc-teal">
                    Create Free Account
                  </Link>{' '}
                  or{' '}
                  <Link to="/contact" className="font-semibold hover:underline text-nurc-teal">
                    Get In Touch
                  </Link>
                </p>
              </div>

              <div className="text-center">
                <button
                  onClick={showSupport}
                  className="text-xs text-muted-foreground hover:text-foreground font-medium underline"
                >
                  Contact Platform Support Desk
                </button>
              </div>
            </>
          ) : (
            /* Forgot Password flow */
            <>
              <button
                type="button"
                onClick={backToLogin}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft size={14} /> Back to sign in
              </button>

              {resetSentTo ? (
                <div className="space-y-5 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <MailCheck size={28} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-nurc-navy font-heading">
                      Check your inbox
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      If an account exists for <span className="font-semibold">{resetSentTo}</span>,
                      we've sent password reset instructions. The link expires in 30 minutes.
                    </p>
                  </div>
                  <button
                    onClick={backToLogin}
                    className="btn-nurc w-full h-12 rounded-xl text-white font-semibold text-sm animate-none bg-nurc-navy"
                  >
                    Return to Sign In
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-nurc-navy font-heading">
                      Reset your password
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Enter your business email and we'll send you a secure link to reset your
                      password.
                    </p>
                  </div>
                  <form
                    className="space-y-5"
                    onSubmit={forgotForm.handleSubmit(onForgot)}
                    noValidate
                  >
                    <div className="space-y-1.5">
                      <label
                        htmlFor="forgot-email"
                        className="block text-sm font-semibold text-nurc-navy"
                      >
                        Business Email Address
                      </label>
                      <input
                        id="forgot-email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="you@company.com"
                        aria-invalid={!!forgotForm.formState.errors.email}
                        aria-describedby={
                          forgotForm.formState.errors.email ? 'forgot-email-error' : undefined
                        }
                        className={fieldClass}
                        {...forgotForm.register('email')}
                      />
                      {forgotForm.formState.errors.email && (
                        <p id="forgot-email-error" className={errorClass}>
                          {forgotForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={forgotForm.formState.isSubmitting}
                      className="btn-nurc w-full h-12 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 animate-none disabled:opacity-60 disabled:cursor-not-allowed bg-nurc-navy"
                    >
                      {forgotForm.formState.isSubmitting && (
                        <Loader2 size={16} className="animate-spin" />
                      )}
                      {forgotForm.formState.isSubmitting ? 'Sending…' : 'Send Reset Instructions'}
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
