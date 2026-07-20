/**
 * Typed API client.
 *
 * IMPORTANT: This project currently has NO backend. When `VITE_API_BASE_URL` is
 * unset (the default), every method below resolves against the clearly-marked
 * MOCK implementation in `mock.ts` — it simulates latency and success/failure
 * but persists nothing to a server.
 *
 * When a real backend exists, set `VITE_API_BASE_URL` and the same typed methods
 * transparently switch to real HTTP calls via `httpRequest`. Swapping in the
 * backend is a config change, not a rewrite — callers never change.
 */
import type { ContactInput, LeadInput, SignupInput } from './validation';
import { mockApi } from './mock';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USE_MOCK = !BASE_URL;
const DEFAULT_TIMEOUT_MS = 12_000;

/** Consistent error shape surfaced to the UI for every failed request. */
export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 0) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  timeoutMs?: number;
  signal?: AbortSignal;
}

/** Real HTTP path (used only when VITE_API_BASE_URL is configured). */
async function httpRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, timeoutMs = DEFAULT_TIMEOUT_MS, signal } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  if (signal) signal.addEventListener('abort', () => controller.abort(), { once: true });

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body != null ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (!res.ok) {
      let message = `Request failed (${res.status})`;
      try {
        const data = await res.json();
        if (data?.message) message = data.message;
      } catch {
        /* non-JSON error body — keep default message */
      }
      throw new ApiError(message, res.status);
    }

    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError('The request timed out. Please try again.', 408);
    }
    throw new ApiError('Network error. Please check your connection and try again.', 0);
  } finally {
    clearTimeout(timeout);
  }
}

export interface ContactResponse {
  ticketId: string;
}
export interface LeadResponse {
  id: string;
}
export interface SignupResponse {
  ok: true;
}

/**
 * The public API surface. Each method is typed and returns a Promise; the UI
 * awaits it and renders loading/success/error accordingly.
 */
export const api = {
  submitContact(data: ContactInput): Promise<ContactResponse> {
    return USE_MOCK
      ? mockApi.submitContact(data)
      : httpRequest('/contact', { method: 'POST', body: data });
  },
  submitLead(data: LeadInput): Promise<LeadResponse> {
    return USE_MOCK
      ? mockApi.submitLead(data)
      : httpRequest('/leads', { method: 'POST', body: data });
  },
  requestPasswordReset(email: string): Promise<void> {
    return USE_MOCK
      ? mockApi.requestPasswordReset(email)
      : httpRequest('/auth/forgot-password', { method: 'POST', body: { email } });
  },
  registerSubscriber(data: SignupInput): Promise<SignupResponse> {
    return USE_MOCK
      ? mockApi.registerSubscriber(data)
      : httpRequest('/auth/signup', { method: 'POST', body: data });
  },
};
