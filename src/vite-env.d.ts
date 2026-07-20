/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Dev/demo-only seed password for the default subscriber. Unset in production. */
  readonly VITE_DEV_SEED_PASSWORD?: string;
  /** Base URL for the real backend API. When unset, the app uses the mock client. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
