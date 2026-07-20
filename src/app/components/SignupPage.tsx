import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router';
import { useApp } from '../context/AppContext';
import { Loader2 } from 'lucide-react';
import { SEOHead } from './shared/SEOHead';
import { signupSchema, type SignupInput, getPasswordStrength } from '../lib/validation';
import { api, ApiError } from '../lib/apiClient';

const industriesList = [
  'Automotive',
  'Banking',
  'Finance',
  'Insurance',
  'Energy',
  'Metals',
  'Healthcare',
  'Pharmaceuticals',
  'Technology',
  'Manufacturing',
  'Infrastructure',
  'Custom Industry',
];

const inputClass =
  'w-full h-12 px-4 border border-border bg-input-background rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all';
const labelClass = 'block text-xs font-bold uppercase tracking-wider text-muted-foreground';
const errorClass = 'text-[11px] font-semibold text-red-600 mt-1';

export function SignupPage() {
  const { signup } = useApp();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      industry: 'Technology',
      designation: '',
      companySize: '50-200',
      industries: [],
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  const selectedIndustries = watch('industries');
  const passwordValue = watch('password');
  const strength = getPasswordStrength(passwordValue);

  const toggleIndustry = (ind: string) => {
    const next = selectedIndustries.includes(ind)
      ? selectedIndustries.filter((x) => x !== ind)
      : [...selectedIndustries, ind];
    setValue('industries', next, { shouldValidate: true });
  };

  const onSubmit = async (data: SignupInput) => {
    try {
      await api.registerSubscriber(data);
      signup({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        industry: data.industry,
        designation: data.designation,
        companySize: data.companySize,
        industries: data.industries,
        theme: 'Original',
        password: data.password,
      });
      toast.success('Account created. Preparing your corporate briefing dashboard…');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : 'Could not create your account. Please try again.',
      );
    }
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
            <div
              className="w-6 h-6 rounded text-white flex items-center justify-center font-bold text-xs"
              style={{ background: 'var(--nurc-navy)' }}
            >
              N
            </div>
            <span
              className="font-bold tracking-wider text-xs uppercase"
              style={{ color: 'var(--nurc-teal)', letterSpacing: '0.15em' }}
            >
              NURC Intelligence Network
            </span>
          </div>
          <h1
            className="text-3xl font-bold tracking-tight text-navy"
            style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}
          >
            Register as a Subscriber
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
            Set up your credentials, select your target industries, choose your preferred briefing
            theme, and access premium daily intelligence.
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-8 space-y-8"
        >
          {/* Section 1: Personal Info */}
          <div>
            <h3
              className="text-lg font-bold pb-2 border-b border-border flex items-center gap-2"
              style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}
            >
              <span
                className="w-5 h-5 rounded-full bg-navy text-white text-xs flex items-center justify-center"
                style={{ background: 'var(--nurc-navy)' }}
              >
                1
              </span>
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-5 mt-4">
              <div className="space-y-1.5">
                <label htmlFor="su-fullName" className={labelClass}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="su-fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Devansh Sharma"
                  aria-required
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'su-fullName-error' : undefined}
                  className={inputClass}
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <p id="su-fullName-error" className={errorClass}>
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="su-email" className={labelClass}>
                  Business Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="su-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@company.com"
                  aria-required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'su-email-error' : undefined}
                  className={inputClass}
                  {...register('email')}
                />
                {errors.email && (
                  <p id="su-email-error" className={errorClass}>
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label htmlFor="su-phone" className={labelClass}>
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="su-phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="e.g. +91 98109 75257"
                  aria-required
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'su-phone-error' : undefined}
                  className={inputClass}
                  {...register('phone')}
                />
                {errors.phone && (
                  <p id="su-phone-error" className={errorClass}>
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Company Info */}
          <div>
            <h3
              className="text-lg font-bold pb-2 border-b border-border flex items-center gap-2"
              style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}
            >
              <span
                className="w-5 h-5 rounded-full bg-navy text-white text-xs flex items-center justify-center"
                style={{ background: 'var(--nurc-navy)' }}
              >
                2
              </span>
              Company Details
            </h3>
            <div className="grid md:grid-cols-2 gap-5 mt-4">
              <div className="space-y-1.5">
                <label htmlFor="su-companyName" className={labelClass}>
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="su-companyName"
                  type="text"
                  autoComplete="organization"
                  placeholder="e.g. Tata Motors"
                  aria-required
                  aria-invalid={!!errors.companyName}
                  aria-describedby={errors.companyName ? 'su-companyName-error' : undefined}
                  className={inputClass}
                  {...register('companyName')}
                />
                {errors.companyName && (
                  <p id="su-companyName-error" className={errorClass}>
                    {errors.companyName.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="su-industry" className={labelClass}>
                  Industry Sector <span className="text-red-500">*</span>
                </label>
                <select
                  id="su-industry"
                  className="w-full h-12 px-4 border border-border bg-card rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all cursor-pointer"
                  {...register('industry')}
                >
                  {industriesList.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="su-designation" className={labelClass}>
                  Designation / Role <span className="text-red-500">*</span>
                </label>
                <input
                  id="su-designation"
                  type="text"
                  autoComplete="organization-title"
                  placeholder="e.g. Industry Analyst"
                  aria-required
                  aria-invalid={!!errors.designation}
                  aria-describedby={errors.designation ? 'su-designation-error' : undefined}
                  className={inputClass}
                  {...register('designation')}
                />
                {errors.designation && (
                  <p id="su-designation-error" className={errorClass}>
                    {errors.designation.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="su-companySize" className={labelClass}>
                  Company Size
                </label>
                <select
                  id="su-companySize"
                  className="w-full h-12 px-4 border border-border bg-card rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-all cursor-pointer"
                  {...register('companySize')}
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
            <h3
              className="text-lg font-bold pb-2 border-b border-border flex items-center gap-2"
              style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}
            >
              <span
                className="w-5 h-5 rounded-full bg-navy text-white text-xs flex items-center justify-center"
                style={{ background: 'var(--nurc-navy)' }}
              >
                3
              </span>
              Newsletter Intelligence Settings
            </h3>

            <div className="mt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Select Targeted Sector Preferences (Choose at least one){' '}
                <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {industriesList.map((ind) => {
                  const selected = selectedIndustries.includes(ind);
                  return (
                    <button
                      key={ind}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleIndustry(ind)}
                      className="h-12 px-4 text-xs font-semibold rounded-xl text-left transition-all border shrink-0 cursor-pointer flex items-center justify-between"
                      style={{
                        background: selected ? 'var(--nurc-navy)' : 'transparent',
                        color: selected ? '#fff' : 'var(--nurc-navy)',
                        borderColor: selected ? 'var(--nurc-navy)' : 'var(--border)',
                      }}
                    >
                      <span>{ind}</span>
                      {selected && <span className="text-[10px] text-white">✓</span>}
                    </button>
                  );
                })}
              </div>
              {errors.industries && (
                <p id="su-industries-error" className={errorClass}>
                  {errors.industries.message}
                </p>
              )}
            </div>
          </div>

          {/* Section 4: Passwords */}
          <div>
            <h3
              className="text-lg font-bold pb-2 border-b border-border flex items-center gap-2"
              style={{ color: 'var(--nurc-navy)', fontFamily: 'var(--font-heading)' }}
            >
              <span
                className="w-5 h-5 rounded-full bg-navy text-white text-xs flex items-center justify-center"
                style={{ background: 'var(--nurc-navy)' }}
              >
                4
              </span>
              Security &amp; Credentials
            </h3>
            <div className="grid md:grid-cols-2 gap-5 mt-4">
              <div className="space-y-1.5">
                <label htmlFor="su-password" className={labelClass}>
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="su-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  aria-required
                  aria-invalid={!!errors.password}
                  aria-describedby="su-password-strength su-password-error"
                  className={inputClass}
                  {...register('password')}
                />
                {/* Strength meter */}
                <div id="su-password-strength" className="pt-1">
                  <div className="flex gap-1" aria-hidden="true">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i <= strength.score ? strength.color : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] mt-1 text-muted-foreground">
                    Password strength: <span className="font-semibold">{strength.label}</span>
                    <span className="block text-[10px] text-muted-foreground/80">
                      Use 8+ characters with upper &amp; lower case and a number.
                    </span>
                  </p>
                </div>
                {errors.password && (
                  <p id="su-password-error" className={errorClass}>
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="su-confirmPassword" className={labelClass}>
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="su-confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  aria-required
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? 'su-confirmPassword-error' : undefined}
                  className={inputClass}
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p id="su-confirmPassword-error" className={errorClass}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Agreements */}
          <div className="pt-4 border-t border-border space-y-4">
            <div className="flex items-start">
              <input
                id="agree"
                type="checkbox"
                aria-invalid={!!errors.agreeTerms}
                aria-describedby={errors.agreeTerms ? 'su-agree-error' : undefined}
                className="h-4 w-4 rounded border-border text-teal focus:ring-teal mt-0.5 cursor-pointer"
                style={{ accentColor: 'var(--nurc-teal)' }}
                {...register('agreeTerms')}
              />
              <label
                htmlFor="agree"
                className="ml-2 block text-xs text-muted-foreground cursor-pointer select-none leading-relaxed"
              >
                I agree to the{' '}
                <span className="underline font-semibold" style={{ color: 'var(--nurc-navy)' }}>
                  Terms &amp; Conditions
                </span>{' '}
                and consent to receive daily or weekly sector analysis reports from NURC MediaNext
                in my business inbox.
              </label>
            </div>
            {errors.agreeTerms && (
              <p id="su-agree-error" className={errorClass}>
                {errors.agreeTerms.message}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-nurc flex-1 h-12 rounded-xl text-white font-semibold text-sm transition-all focus:outline-none cursor-pointer flex items-center justify-center gap-2 animate-none disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'var(--nurc-navy)' }}
              >
                {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                {isSubmitting ? 'Creating account…' : 'Create Subscriber Account'}
              </button>
              <Link
                to="/login"
                className="btn-nurc text-center h-12 px-6 rounded-xl text-sm font-semibold border transition-all hover:bg-muted flex items-center justify-center animate-none"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--nurc-navy)',
                  textDecoration: 'none',
                }}
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
