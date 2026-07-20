/**
 * ⚠️ MOCK BACKEND — NOT A REAL SERVER.
 *
 * This module fakes network calls so the frontend's submit/loading/success/error
 * states are real and exercised end-to-end, even though nothing is persisted.
 * It is used automatically whenever `VITE_API_BASE_URL` is unset.
 *
 * Testing aid: any email starting with `error@` makes the call reject, so error
 * UI can be verified manually. Everything else succeeds after a short delay.
 */
import { ApiError } from './apiClient';
import type { ContactInput, LeadInput, SignupInput } from './validation';
import type { ContactResponse, LeadResponse, SignupResponse } from './apiClient';

const LATENCY_MS = 700;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldFail(email?: string): boolean {
  return !!email && email.toLowerCase().startsWith('error@');
}

function randomId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export const mockApi = {
  async submitContact(data: ContactInput): Promise<ContactResponse> {
    await delay(LATENCY_MS);
    if (shouldFail(data.email)) {
      throw new ApiError('We could not send your message right now. Please try again.', 502);
    }
    return { ticketId: randomId('NURC') };
  },

  async submitLead(data: LeadInput): Promise<LeadResponse> {
    await delay(LATENCY_MS);
    if (shouldFail(data.email)) {
      throw new ApiError('We could not submit your request right now. Please try again.', 502);
    }
    return { id: randomId('lead') };
  },

  async requestPasswordReset(email: string): Promise<void> {
    await delay(LATENCY_MS);
    if (shouldFail(email)) {
      throw new ApiError('We could not process the reset request. Please try again.', 502);
    }
    // Intentionally returns success even for unknown emails (avoids account enumeration).
  },

  async registerSubscriber(data: SignupInput): Promise<SignupResponse> {
    await delay(LATENCY_MS);
    if (shouldFail(data.email)) {
      throw new ApiError('We could not create your account right now. Please try again.', 502);
    }
    return { ok: true };
  },
};
