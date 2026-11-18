// Catch-all `.md` endpoint: the plaintext twin of the `[...slug].astro` route.
// Serves a plaintext version of every `content/en` page. Cdocs (pages with
// `content_filters`) resolve their filters — URL param > default, via
// the shared `resolveCdocRender` — and render through the cdocs plaintext
// pipeline; every other page renders through the component plaintext twins.
// Either way the frontmatter title is prepended as an H1, mirroring the HTML
// page. A path with no matching entry 404s.
//
// It lives under `[...lang]/` only to keep Astro's route comparator honest.
// A `.md` filename suffix attaches a literal part to the route's first
// segment, which the comparator rewards over a purely dynamic one, so at the
// root this route out-ranked every `/api/**.md` route and swallowed the whole
// statically rendered API tree in dev. Nesting it makes the first segment tie
// with the `/api` routes' `[...lang]`, so the comparator goes on to compare
// specificity and the literal `api` segment wins. `staticApiGuard`'s shadow
// guard pins that ordering. Translated content is not served here yet: the
// captured locale is used to 404, not to pick a collection.
//
// Filters resolve from the URL only, the same way as the HTML page, so a `.md`
// URL with the same query as an HTML URL gets the same variant. Below the
// title, a Cdoc lists its other variants, since the plaintext holds only one.
//
// Plaintext has no JavaScript to add stored preferences to links, so the
// server adds the request's params instead: a link to a Cdocs page gets the
// params it doesn't already have, where the page offers their values.
export const prerender = false;

import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { resolveUnprefixedSlug } from "@lib/i18n/locale";
import { resolveCdocRender } from "@lib/cdocs/resolveCdocRender";
import {
  buildFilterOptionLinks,
  getCdocsLinkTargets,
} from "@lib/cdocs/cdocsPages";
import { addOfferedParamsToHref } from "@lib/cdocs/preferenceLinks";
import { renderCdocPlaintext } from "@lib/cdocs/plaintext/renderCdocPlaintext";
import { formatVariantList } from "@lib/cdocs/plaintext/variantList";
import { makeBundledPartialResolver } from "@lib/cdocs/plaintext/loadPartial";
import { renderMdocWithTwins } from "@lib/plaintext/twinTransform";
import { siteSupportNoteNodes } from "@lib/plaintext/siteSupportNote";
import { buildMarkdocStr } from "@lib/plaintext/helpers";

const resolvePartial = makeBundledPartialResolver();

/**
 * Splice a block in directly below the leading H1. Falls back to prepending if
 * the text does not start with a heading.
 *
 * This is one place the plaintext twin deliberately diverges from the HTML
 * page. There the banner sits *above* the title, because it is a page-level
 * alert in the content column. In Markdown the title is the document's first
 * line, so a note above it would read as preamble detached from the page;
 * below the H1 is the conventional spot for a lede admonition.
 */
function insertAfterTitle(text: string, block: string): string {
  if (!block) {
    return text;
  }
  const afterHeading = text.indexOf("\n\n");
  if (!text.startsWith("# ") || afterHeading === -1) {
    return `${block}${text}`;
  }
  const head = text.slice(0, afterHeading + 2);
  return `${head}${block}${text.slice(afterHeading + 2)}`;
}

export const GET: APIRoute = async ({ params, url, site }) => {
  // Two adjacent rest params are ambiguous, so the leading path segment is
  // captured as `lang` whether or not it is a locale; `resolveUnprefixedSlug`
  // puts it back and 404s a real locale prefix. The result is the path without
  // the `.md` extension, which is exactly an `en` entry id.
  const slug = resolveUnprefixedSlug(params.lang, params.slug);
  if (slug === undefined) {
    return new Response(null, { status: 404 });
  }

  // dd_e2e/* are test pages; hidden in the live build like the HTML route.
  if (slug.startsWith("dd_e2e/") && __CI_ENV__ === "live") {
    return new Response(null, { status: 404 });
  }

  const entry = await getEntry("en", slug);
  if (!entry) {
    return new Response(null, { status: 404 });
  }

  // The glob content loader exposes the raw `.mdoc` body (frontmatter stripped),
  // so no disk read — or path-traversal guard — is needed: `getEntry` already
  // scoped the lookup to the collection, and this works in the bundled server.
  const body = entry.body ?? "";
  const {
    title,
    content_filters: contentFilters,
    site_support_id: siteSupportId,
  } = entry.data;

  // Prepended to whichever pipeline runs below. This route serves `content/en`
  // only, so the locale is always `en`.
  const siteSupportNote = buildMarkdocStr(
    siteSupportNoteNodes(
      url.pathname.replace(/\.md$/, ""),
      "en",
      siteSupportId,
    ),
  ).trim();
  const notePrefix = siteSupportNote ? `${siteSupportNote}\n\n` : "";

  let text: string;
  if (contentFilters) {
    // Cdoc: resolve filters and render through the cdocs plaintext pipeline,
    // which prepends the title itself.
    const { valsByTraitId } = resolveCdocRender({
      contentFilters,
      searchParams: url.searchParams,
    });
    const bareUrl = `/${slug}/`;
    const variantList = formatVariantList(
      buildFilterOptionLinks({ bareUrl, contentFilters, valsByTraitId }),
    );

    const linkTargetsById = await getCdocsLinkTargets();
    const requestParams = Object.fromEntries(url.searchParams);
    // Relative links resolve against the HTML page, where they were authored.
    const pageUrl = new URL(bareUrl, url).href;

    // `renderCdocPlaintext` prepends the title itself, so the note and the
    // variant list are spliced in after that H1 rather than ahead of it.
    const rendered = renderCdocPlaintext({
      body,
      variables: valsByTraitId,
      title,
      resolvePartial,
      rewriteHref: (href) => {
        // An in-page link stays in the page, so it keeps its plain href.
        if (href.startsWith("#") || href.startsWith("?")) return href;
        return (
          addOfferedParamsToHref({
            href,
            pageUrl,
            linkTargetsById,
            params: requestParams,
          }) ?? href
        );
      },
    });
    text = insertAfterTitle(
      rendered,
      notePrefix + (variantList ? `${variantList}\n` : ""),
    );
  } else {
    // Non-cdoc: render component plaintext twins and prepend the title as an H1
    // to mirror the HTML page.
    text = `# ${title}\n\n${notePrefix}${renderMdocWithTwins(body, { site })}`;
  }

  return new Response(text, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
