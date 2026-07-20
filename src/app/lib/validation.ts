import { z } from 'zod';

/* ---- shared field primitives ---- */
const name = z.string().trim().min(2, 'Please enter your full name.').max(100);
const email = z.string().trim().min(1, 'Email is required.').email('Enter a valid email address.');
const phone = z
  .string()
  .trim()
  .min(7, 'Enter a valid phone number.')
  .max(20, 'Enter a valid phone number.')
  .regex(/^[+()\-\s\d]+$/, 'Only digits, spaces and + ( ) - are allowed.');
const company = z.string().trim().min(2, 'Company name is required.').max(120);

/** Password complexity rule (FRM-004): 8+ chars, upper, lower, and a number. */
export const passwordSchema = z
  .string()
  .min(8, 'At least 8 characters.')
  .regex(/[a-z]/, 'Add a lowercase letter.')
  .regex(/[A-Z]/, 'Add an uppercase letter.')
  .regex(/[0-9]/, 'Add a number.');

/* ---- Contact ---- */
export const contactSchema = z.object({
  name,
  email,
  phone,
  company,
  sector: z.string().min(1, 'Select a sector.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please provide at least 10 characters.')
    .max(2000, 'Message is too long.'),
});
export type ContactInput = z.infer<typeof contactSchema>;

/* ---- Lead modal (demo / coverage) ---- */
export const leadSchema = z
  .object({
    name,
    email,
    phone,
    company,
    sector: z.string().min(1, 'Select a sector.'),
    modalType: z.enum(['demo', 'coverage']),
    customBriefRequirements: z.string().trim().max(2000).optional(),
  })
  .superRefine((val, ctx) => {
    if (val.modalType === 'coverage') {
      const len = val.customBriefRequirements?.trim().length ?? 0;
      if (len < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['customBriefRequirements'],
          message: 'Please describe the coverage you need (at least 10 characters).',
        });
      }
    }
  });
export type LeadInput = z.infer<typeof leadSchema>;

/* ---- Login ---- */
export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required.'),
  rememberMe: z.boolean().optional(),
});
export type LoginInput = z.infer<typeof loginSchema>;

/* ---- Forgot password ---- */
export const forgotPasswordSchema = z.object({ email });
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

/* ---- Signup ---- */
export const signupSchema = z
  .object({
    fullName: name,
    email,
    phone,
    companyName: company,
    industry: z.string().min(1, 'Select an industry.'),
    designation: z.string().trim().min(2, 'Designation is required.').max(120),
    companySize: z.string().min(1, 'Select a company size.'),
    industries: z.array(z.string()).min(1, 'Choose at least one sector.'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
    agreeTerms: z.boolean().refine((v) => v === true, 'You must accept the Terms to continue.'),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  });
export type SignupInput = z.infer<typeof signupSchema>;

/* ---- Password strength (for the Signup indicator) ---- */
export interface PasswordStrength {
  /** 0 (empty) .. 4 (strong) */
  score: number;
  label: string;
  /** tailwind bg color token for the meter fill */
  color: string;
}

export function getPasswordStrength(pw: string): PasswordStrength {
  if (!pw) return { score: 0, label: 'Enter a password', color: 'bg-gray-200' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 12 && score < 4) score = Math.min(4, score + 1);

  const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['bg-red-500', 'bg-red-500', 'bg-amber-500', 'bg-lime-500', 'bg-emerald-600'];
  return { score, label: labels[score], color: colors[score] };
}
