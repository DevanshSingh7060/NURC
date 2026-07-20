/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Dev/demo-only seed password for the default subscriber. Unset in production. */
  readonly VITE_DEV_SEED_PASSWORD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
