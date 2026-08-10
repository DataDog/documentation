/**
 * The API plaintext page source.
 *
 * Enumerates every English API `.md` page — the landing page, the three static
 * special pages, each category page, and each operation page — and provides the
 * metadata plus a `buildBody` that reuses the same shared builders the `.md`
 * routes serve. API docs carry no privacy concept, so `isPrivate` is always
 * `false`; content sources added later read `private` from frontmatter.
 */

import type { PlaintextPage, PlaintextPageSource } from "./types";
import type { PageMetadata } from "./schema";
import { getCategoriesView, getOperationView } from "@lib/api/viewsBuilder";
import type { ApiCategory, ApiOperationStub } from "@lib/api/schemas/views";
import {
  apiLandingBody,
  apiCategoryBody,
  apiOperationBody,
  usingTheApiBody,
  scopesBody,
  rateLimitsBody,
} from "@lib/plaintext/pages/apiPageBodies";

const LANG = "en" as const;

const API_REFERENCE = "API Reference";
const DOCS_CRUMB = ["Docs"];
const API_CRUMBS = ["Docs", API_REFERENCE];

/** First non-empty line of a (possibly multi-line markdown) string, trimmed. */
function firstLine(text: string): string {
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed) return trimmed;
  }
  return "";
}

function landingPage(categories: ApiCategory[]): PlaintextPage {
  return {
    urlPath: "/api/latest.md",
    metadata: {
      title: API_REFERENCE,
      description: "Reference documentation for the Datadog HTTP API.",
      breadcrumbs: [...DOCS_CRUMB],
      isPrivate: false,
    },
    buildBody: async () => apiLandingBody(categories, LANG),
  };
}

function staticSpecialPages(): PlaintextPage[] {
  const specials: Array<{
    slug: string;
    title: string;
    description: string;
    body: string;
  }> = [
    {
      slug: "using-the-api",
      title: "Using the API",
      description:
        "How to use the Datadog HTTP API to access the platform programmatically.",
      body: usingTheApiBody,
    },
    {
      slug: "scopes",
      title: "Authorization Scopes",
      description: "Authorization scopes for OAuth clients.",
      body: scopesBody,
    },
    {
      slug: "rate-limits",
      title: "Rate Limits",
      description: "API rate limit policy, headers, and usage metrics.",
      body: rateLimitsBody,
    },
  ];

  return specials.map(({ slug, title, description, body }) => ({
    urlPath: `/api/latest/${slug}.md`,
    metadata: {
      title,
      description,
      breadcrumbs: [...API_CRUMBS],
      isPrivate: false,
    },
    buildBody: async () => body,
  }));
}

function categoryPage(category: ApiCategory): PlaintextPage {
  return {
    urlPath: `/api/latest/${category.slug}.md`,
    metadata: {
      title: category.name,
      description: firstLine(category.description ?? ""),
      breadcrumbs: [...API_CRUMBS],
      isPrivate: false,
    },
    buildBody: async () => apiCategoryBody(category, LANG),
  };
}

async function operationPage(
  category: ApiCategory,
  operation: ApiOperationStub,
): Promise<PlaintextPage | null> {
  const view = await getOperationView(category.slug, operation.slug, LANG);
  if (!view) return null;

  const metadata: PageMetadata = {
    title: view.summary,
    description: firstLine(view.variants[0]?.description ?? ""),
    breadcrumbs: [...API_CRUMBS, category.name],
    isPrivate: false,
  };

  return {
    urlPath: `/api/latest/${category.slug}/${operation.slug}.md`,
    metadata,
    buildBody: async () => apiOperationBody(view),
  };
}

async function listApiPages(): Promise<PlaintextPage[]> {
  const categories = await getCategoriesView(LANG);

  const pages: PlaintextPage[] = [
    landingPage(categories),
    ...staticSpecialPages(),
  ];

  for (const category of categories) {
    pages.push(categoryPage(category));
    for (const operation of category.operations) {
      const page = await operationPage(category, operation);
      if (page) pages.push(page);
    }
  }

  return pages;
}

export const apiPageSource: PlaintextPageSource = {
  listPages: listApiPages,
};
