import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { SEOHead } from './shared/SEOHead';
import { SectorMarquee } from './SectorMarquee';
import { contactSchema, type ContactInput } from '../lib/validation';
import { api, ApiError } from '../lib/apiClient';

const industrySectors = [
  'Automotive',
  'Banking & Finance',
  'Infrastructure',
  'Energy & Power',
  'Healthcare',
  'FMCG & Retail',
  'Insurance',
  'Technology',
  'Metals & Mining',
];

const inputClass =
  'w-full px-4 py-2.5 border border-border bg-[#F9FAFB] rounded-xl focus:outline-none focus:ring-1 focus:ring-teal text-xs transition-all';
const labelClass = 'block text-[10px] font-bold uppercase tracking-wider text-muted-foreground';
const errorClass = 'text-[11px] font-semibold text-red-600 mt-1';

export function ContactPage() {
  const [submittedInfo, setSubmittedInfo] = useState<{ name: string; email: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      sector: 'Automotive',
      message: '',
    },
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      await api.submitContact(data);
      setSubmittedInfo({ name: data.name, email: data.email });
      reset();
      toast.success('Message sent. Our corporate relations desk will be in touch shortly.');
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : 'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SEOHead
        title="Contact Us | NURC MediaNext"
        description="Connect with NURC MediaNext's intelligence team for enterprise licensing, custom research, or consultation. Delhi corporate office: +91-9810975257."
        canonicalUrl="/contact"
      />

      {/* Contact Hero */}
      <section className="py-16 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-nurc-gold" />
            <span className="text-xs font-bold uppercase text-[#006D7A] tracking-[0.14em] font-heading">
              Corporate Relations Desk
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight font-display text-nurc-navy leading-[1.2]">
            Connect with our Intelligence Team
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mt-3">
            For custom research configurations, enterprise licensing inquiries, or direct feedback
            on our analyst dispatches, reach our Mayur Vihar Delhi offices.
          </p>
        </div>
      </section>

      <SectorMarquee />

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-12 gap-12">
        {/* Left Side: Corporate Details (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4 font-heading text-nurc-navy">
              Delhi Corporate HQ
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="shrink-0 mt-1 text-nurc-teal" size={18} />
                <div>
                  <span className="block text-xs font-bold uppercase text-muted-foreground tracking-wider">
                    Corporate Office
                  </span>
                  <span className="block text-sm font-semibold mt-1 leading-relaxed text-nurc-navy">
                    NURC MediaNext Private Ltd.
                    <br />
                    9A, Pocket-B, SFS Flats
                    <br />
                    Mayur Vihar Phase-III
                    <br />
                    Delhi - 110096, India
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="shrink-0 mt-1 text-nurc-teal" size={18} />
                <div>
                  <span className="block text-xs font-bold uppercase text-muted-foreground tracking-wider">
                    Telephone Targets
                  </span>
                  <div className="space-y-1 mt-1">
                    <a
                      href="tel:+919810975257"
                      className="block text-sm font-semibold hover:underline text-nurc-navy"
                    >
                      +91-9810975257 (Primary)
                    </a>
                    <a
                      href="tel:+919958949710"
                      className="block text-sm font-semibold hover:underline text-nurc-navy"
                    >
                      +91-9958949710 (Secondary)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="shrink-0 mt-1 text-nurc-teal" size={18} />
                <div>
                  <span className="block text-xs font-bold uppercase text-muted-foreground tracking-wider">
                    Secure Email Dispatches
                  </span>
                  <div className="space-y-1 mt-1">
                    <a
                      href="mailto:contact@nurcmedianext.com"
                      className="block text-sm font-semibold hover:underline text-nurc-teal"
                    >
                      contact@nurcmedianext.com
                    </a>
                    <a
                      href="mailto:nurcmnx@gmail.com"
                      className="block text-sm font-semibold hover:underline text-xs text-nurc-teal"
                    >
                      nurcmnx@gmail.com
                    </a>
                    <a
                      href="mailto:nurcmedianext@gmail.com"
                      className="block text-sm font-semibold hover:underline text-xs text-nurc-teal"
                    >
                      nurcmedianext@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-teal/5 border border-teal-100 rounded-2xl space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A5560]">
              Analyst Coverage Scope
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We track daily macro developments, OEM pricing sheets, SEBI/RBI circulars, and
              public-private partnership tender indices to curate highly specialized dispatches.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive B2B Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-border rounded-3xl p-8 shadow-sm">
            {!submittedInfo ? (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold font-heading text-nurc-navy">
                    Transmit Message
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Messages are routed securely to our Delhi editorial board for review.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className={labelClass}>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Devansh Singh"
                      aria-required
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={inputClass}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className={errorClass}>
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className={labelClass}>
                      Corporate Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="devansh@company.com"
                      aria-required
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={inputClass}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className={errorClass}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-phone" className={labelClass}>
                      Corporate Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="e.g. +91 98109 75257"
                      aria-required
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                      className={inputClass}
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p id="contact-phone-error" className={errorClass}>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="contact-company" className={labelClass}>
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      autoComplete="organization"
                      placeholder="e.g. Tata Motors"
                      aria-required
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? 'contact-company-error' : undefined}
                      className={inputClass}
                      {...register('company')}
                    />
                    {errors.company && (
                      <p id="contact-company-error" className={errorClass}>
                        {errors.company.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-sector" className={labelClass}>
                    Target Sector
                  </label>
                  <select
                    id="contact-sector"
                    className="w-full px-4 py-2.5 border border-border bg-[#F9FAFB] rounded-xl focus:outline-none focus:ring-1 focus:ring-teal text-xs font-semibold cursor-pointer"
                    {...register('sector')}
                  >
                    {industrySectors.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-message" className={labelClass}>
                    Message Body <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Provide details about your query or custom intelligence briefing needs..."
                    aria-required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className="w-full px-4 py-2.5 border border-border bg-[#F9FAFB] rounded-xl focus:outline-none focus:ring-1 focus:ring-teal text-xs resize-none transition-all"
                    {...register('message')}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className={errorClass}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-nurc-navy hover:opacity-95 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer transition-all border-0 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                    {isSubmitting ? 'Transmitting…' : 'Transmit Information Securely'}
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
                  <h4 className="font-bold text-lg text-nurc-navy">
                    Message Transmitted Successfully
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    Thank you, {submittedInfo.name}. Your inquiry has been routed to our C-Suite
                    liaison. Our corporate relations desk will contact you at {submittedInfo.email}{' '}
                    within 2 business hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmittedInfo(null)}
                  className="px-6 py-2 border border-border rounded-lg text-xs font-bold hover:bg-muted transition-colors cursor-pointer text-nurc-navy"
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
