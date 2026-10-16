export const prerender = true;
/** Plaintext twin of `[...page].astro`. The API root has never had one. */

import type { APIRoute, GetStaticPaths } from "astro";
import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { getCollection, getEntry } from "astro:content";
import { LOCALES, parseLangParam, type Locale } from "@lib/i18n/locale";
import { buildPlaintextPage, parse } from "@lib/plaintext/helpers";
import { siteSupportNoteNodes } from "@lib/plaintext/siteSupportNote";
import { API_CONTENT_DIR, isApiSubPage } from "@lib/api/overviewPages";
import { apiBreadcrumbs } from "@lib/api/pageMeta";
import { getScopeGroupsView } from "@lib/api/scopesBuilder";
import { apiScopesTableNodes } from "@components/ApiScopesTable/plaintext/ApiScopesTable";

/**
 * Swap each `{% api-scopes /%}` for its twin. Other tags pass through as
 * authored; this route has never run the full twin transform.
 */
function withScopesTables(
  nodes: MarkdocNode[],
  lang: Locale,
  site: URL | undefined,
): MarkdocNode[] {
  return nodes.flatMap((node) =>
    node.type === "tag" && node.tag === "api-scopes"
      ? apiScopesTableNodes(getScopeGroupsView(), { lang, site })
      : [node],
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection("en", (entry) => isApiSubPage(entry.id));
  const paths: ReturnType<GetStaticPaths> = [];
  for (const lang of LOCALES) {
    for (const entry of entries) {
      paths.push({
        params: {
          lang: lang === "en" ? undefined : lang,
          page: entry.id.slice(`${API_CONTENT_DIR}/`.length),
        },
      });
    }
  }
  return paths;
};

export const GET: APIRoute = async ({ params, url, site }) => {
  const lang = parseLangParam(params.lang);
  if (!lang) {
    return new Response(null, { status: 404 });
  }

  const pageSlug = params.page;
  if (!pageSlug) {
    return new Response(null, { status: 404 });
  }

  const entry = await getEntry("en", `${API_CONTENT_DIR}/${pageSlug}`);
  if (!entry) {
    return new Response(null, { status: 404 });
  }

  const body = buildPlaintextPage(
    [
      ...siteSupportNoteNodes(url.pathname, lang, entry.data.site_support_id),
      ...withScopesTables(parse(entry.body ?? "").children, lang, site),
    ],
    {
      title: entry.data.title,
      description: entry.data.description ?? "",
      breadcrumbs: apiBreadcrumbs(lang, entry.data.title),
    },
    site,
  );

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
