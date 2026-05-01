/**
 * Typesense connection details, mirrored from Hugo's
 * `assets/scripts/config/config-docs.js`. The Astro site reads from the same
 * cluster so docs/api/partners search results stay in sync with the Hugo site.
 *
 * The public_key here is read-only and safe to ship to the browser — same
 * convention Hugo uses.
 */

export interface TypesenseEnv {
  host: string;
  publicKey: string;
  docsIndex: string;
  partnersIndex: string;
}

const live: TypesenseEnv = {
  host: 'gk6e3zbyuntvc5dap',
  publicKey: 'bDUaL3uKrCG0033PDb6Vbi8n46mKGaMG',
  docsIndex: 'docs_alias',
  partnersIndex: 'docs_partners_alias',
};

const preview: TypesenseEnv = {
  host: 'dnm1k9zrpctsvjowp',
  publicKey: 'O2QyrgpWb3eKxVCmGVNrORNcSo3pOZJu',
  docsIndex: 'docs_alias',
  partnersIndex: 'docs_partners_alias',
};

export function getTypesenseConfig(): TypesenseEnv {
  if (import.meta.env.PROD) return live;
  return preview;
}
