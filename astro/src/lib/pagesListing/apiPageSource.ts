/**
 * The API plaintext page source.
 *
 * Root pages are the landing page and the three static special pages. Sections
 * are the API categories: each section holds its category overview page plus one
 * page per operation, and becomes its own detail `llms.txt`.
 *
 * Metadata only — no bodies. Each page's plaintext is produced by its own `.md`
 * route during the build and hashed from disk afterwards, so this source cannot
 * drift from what is served. API docs carry no privacy concept, so `isPrivate` is
 * always `false`; content sources added later read `private` from frontmatter.
 */

import type {
  PlaintextPage,
  PlaintextPageSource,
  PlaintextSection,
} from "./types";
import { getCategoriesView, getOperationView } from "@lib/api/viewsBuilder";
import type { ApiCategory, ApiOperationStub } from "@lib/api/schemas/views";

/**
 * `pages.json` and `llms.txt` list the English pages only, even though the `.md`
 * routes are emitted for every locale: the translations are the same pages, and
 * machine consumers index one canonical copy.
 */
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

const landingPage: PlaintextPage = {
  urlPath: "/api/latest.md",
  metadata: {
    title: API_REFERENCE,
    description: "Reference documentation for the Datadog HTTP API.",
    breadcrumbs: [...DOCS_CRUMB],
    isPrivate: false,
  },
};

const staticSpecialPages: PlaintextPage[] = [
  {
    slug: "using-the-api",
    title: "Using the API",
    description:
      "How to use the Datadog HTTP API to access the platform programmatically.",
  },
  {
    slug: "scopes",
    title: "Authorization Scopes",
    description: "Authorization scopes for OAuth clients.",
  },
  {
    slug: "rate-limits",
    title: "Rate Limits",
    description: "API rate limit policy, headers, and usage metrics.",
  },
].map(({ slug, title, description }) => ({
  urlPath: `/api/latest/${slug}.md`,
  metadata: {
    title,
    description,
    breadcrumbs: [...API_CRUMBS],
    isPrivate: false,
  },
}));

function categoryPage(category: ApiCategory): PlaintextPage {
  return {
    urlPath: `/api/latest/${category.slug}.md`,
    metadata: {
      title: category.name,
      description: firstLine(category.description ?? ""),
      breadcrumbs: [...API_CRUMBS],
      isPrivate: false,
    },
  };
}

/**
 * The stub carries the operation's summary but not its description, so the full
 * view is loaded for that. A missing view means there is no `.md` route to point
 * at, so the page is skipped.
 */
async function operationPage(
  category: ApiCategory,
  operation: ApiOperationStub,
): Promise<PlaintextPage | null> {
  const view = await getOperationView(category.slug, operation.slug, LANG);
  if (!view) return null;

  return {
    urlPath: `/api/latest/${category.slug}/${operation.slug}.md`,
    metadata: {
      title: view.summary,
      description: firstLine(view.variants[0]?.description ?? ""),
      breadcrumbs: [...API_CRUMBS, category.name],
      isPrivate: false,
    },
  };
}

async function listRootPages(): Promise<PlaintextPage[]> {
  return [landingPage, ...staticSpecialPages];
}

async function listSections(): Promise<PlaintextSection[]> {
  const categories = await getCategoriesView(LANG);

  const sections: PlaintextSection[] = [];
  for (const category of categories) {
    const pages: PlaintextPage[] = [categoryPage(category)];
    for (const operation of category.operations) {
      const page = await operationPage(category, operation);
      if (page) pages.push(page);
    }
    sections.push({
      title: category.name,
      llmsTxtPath: `/api/latest/${category.slug}/llms.txt`,
      pages,
    });
  }

  return sections;
}

export const apiPageSource: PlaintextPageSource = {
  title: API_REFERENCE,
  listRootPages,
  listSections,
};
