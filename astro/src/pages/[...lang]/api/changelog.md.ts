export const prerender = true;
/**
 * Plaintext rendering of the API changelog: the whole, unpaginated changelog,
 * grouped by date. Every paginated and filtered HTML changelog page points its
 * copy button here.
 */

import type { APIRoute, GetStaticPaths } from "astro";
import {
  CHANGELOG_INTRO,
  CHANGELOG_TITLE,
  getChangelogView,
  renderChangelogMarkdown,
} from "@lib/api/changelog";
import { apiBreadcrumbs } from "@lib/api/pageMeta";
import { LOCALES, parseLangParam } from "@lib/i18n/locale";
import { buildPlaintextPage } from "@lib/plaintext/helpers";

export const getStaticPaths: GetStaticPaths = () => {
  return LOCALES.map((lang) => ({
    params: { lang: lang === "en" ? undefined : lang },
  }));
};

export const GET: APIRoute = async ({ params, site }) => {
  const lang = parseLangParam(params.lang);
  if (!lang) {
    return new Response(null, { status: 404 });
  }

  const entries = await getChangelogView(lang);
  const body = buildPlaintextPage(
    renderChangelogMarkdown(entries),
    {
      title: CHANGELOG_TITLE,
      description: CHANGELOG_INTRO,
      breadcrumbs: apiBreadcrumbs(lang, CHANGELOG_TITLE),
    },
    site,
  );

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
