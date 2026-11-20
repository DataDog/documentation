// Values copied from `hugo/assets/scripts/config/config-docs.js`
// (`getConfig(env).docsAi`), which owns them while Hugo runs its own widget.
// TODO: make this file the sole owner at the Hugo cutover.

/**
 * The package's own environment union rather than Astro's `SiteEnv`: a package
 * under `shared/` that also builds inside Hugo cannot import from Astro's
 * source tree. `astro/src/lib/askAi/envParity.test.ts` asserts the two stay
 * element-for-element equal.
 */
export const ASK_AI_ENVS = ["development", "preview", "live"] as const;

export type AskAiEnv = (typeof ASK_AI_ENVS)[number];

export interface DocsAiCredentials {
  apiUrl: string;
  apiKey: string;
}

/**
 * `apiKey` is a `ddpub_`-prefixed *publishable* key, already committed in this
 * public repository and in Hugo's `config-docs.js`. It is scoped to the docs-AI
 * endpoint and is meant to ship to the browser — not a leaked secret.
 */
const CREDENTIALS_BY_ENV: Record<AskAiEnv, DocsAiCredentials> = {
  live: {
    apiUrl: "https://app.datadoghq.com/api/unstable/docs-ai",
    apiKey: "ddpub_docsai_nkbIDfPWw4pKuRlLef8aDs2onVqdimFI",
  },
  preview: {
    apiUrl: "https://dd.datad0g.com/api/unstable/docs-ai",
    apiKey: "ddpub_docsai_qvrDfIbODspTDsb2Y9Co7h3QlB4kMJYb",
  },
  // Development shares preview's backend; there is no local docs-AI service.
  development: {
    apiUrl: "https://dd.datad0g.com/api/unstable/docs-ai",
    apiKey: "ddpub_docsai_qvrDfIbODspTDsb2Y9Co7h3QlB4kMJYb",
  },
};

const DEFAULT_ENV: AskAiEnv = "development";

function isAskAiEnv(value: string | undefined): value is AskAiEnv {
  return ASK_AI_ENVS.includes(value as AskAiEnv);
}

/**
 * Reads `data-env` off `<html>`, which both hosts set. An unrecognized or
 * missing value falls back to development rather than throwing — the widget
 * degrading to the staging backend beats a page that errors on load.
 */
export function resolveEnv(explicit?: AskAiEnv): AskAiEnv {
  if (explicit) return explicit;
  const fromDocument = document.documentElement.dataset["env"];
  return isAskAiEnv(fromDocument) ? fromDocument : DEFAULT_ENV;
}

export function getCredentials(env: AskAiEnv): DocsAiCredentials {
  return CREDENTIALS_BY_ENV[env];
}
