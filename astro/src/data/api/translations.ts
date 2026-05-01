/**
 * Per-locale overlays for the API spec.
 *
 * Mirrors the Hugo translation JSON format so the same files feed both sites
 * during the cutover:
 *   - `translate_tags.{lang}.json`    keyed by tag slug (e.g. `dashboards`)
 *   - `translate_actions.{lang}.json` keyed by operation ID (e.g. `ListAPIKeys`)
 *
 * Missing files and missing keys silently fall through to English. Translation
 * coverage is owned upstream — this site does not warn on gaps.
 */

import type { Locale } from '../../lib/i18n/locale';

export interface TagTranslation {
  name?: string;
  description?: string;
}

export interface ActionTranslation {
  summary?: string;
  description?: string;
  request_description?: string;
  request_schema_description?: string;
}

type TagOverlay = Record<string, TagTranslation>;
type ActionOverlay = Record<string, ActionTranslation>;

type ApiVersion = 'v1' | 'v2';

// Glob `*.json` rather than `??.json` because Vite's `import.meta.glob` does
// not always honor the single-char-class pattern. We filter to the
// `{lang}.json` shape via regex below, which also rejects locale-less files
// like `translate_tags.json` (the upstream English source).
const tagModules: Record<string, TagOverlay> = import.meta.glob<TagOverlay>(
  '../../mocked_dependencies/hugo_site/data/api/v*/translate_tags.*.json',
  { eager: true, import: 'default' },
);

const actionModules: Record<string, ActionOverlay> = import.meta.glob<ActionOverlay>(
  '../../mocked_dependencies/hugo_site/data/api/v*/translate_actions.*.json',
  { eager: true, import: 'default' },
);

const TAG_OVERLAY_RE = /\/(v1|v2)\/translate_tags\.([a-z]{2})\.json$/;
const ACTION_OVERLAY_RE = /\/(v1|v2)\/translate_actions\.([a-z]{2})\.json$/;

interface OverlayBundle {
  tags: TagOverlay;
  actions: ActionOverlay;
}

const EMPTY_BUNDLE: OverlayBundle = Object.freeze({
  tags: Object.freeze({}) as TagOverlay,
  actions: Object.freeze({}) as ActionOverlay,
});

const cache = new Map<string, OverlayBundle>();

function bundleKey(version: ApiVersion, lang: Locale): string {
  return `${version}:${lang}`;
}

/**
 * Resolve the overlay bundle for one (version, locale) pair. English returns
 * an empty bundle (the spec is the source of truth). Missing JSON files for
 * a locale also return an empty bundle — by design.
 */
export function getOverlay(version: ApiVersion, lang: Locale): OverlayBundle {
  if (lang === 'en') {
    return EMPTY_BUNDLE;
  }

  const cached = cache.get(bundleKey(version, lang));
  if (cached) {
    return cached;
  }

  let tags: TagOverlay = {};
  let actions: ActionOverlay = {};

  for (const [path, mod] of Object.entries(tagModules)) {
    const match = TAG_OVERLAY_RE.exec(path);
    if (match && match[1] === version && match[2] === lang) {
      tags = mod;
      break;
    }
  }

  for (const [path, mod] of Object.entries(actionModules)) {
    const match = ACTION_OVERLAY_RE.exec(path);
    if (match && match[1] === version && match[2] === lang) {
      actions = mod;
      break;
    }
  }

  const bundle: OverlayBundle = { tags, actions };
  cache.set(bundleKey(version, lang), bundle);
  return bundle;
}

/** Translate a tag name + description, falling back to the spec values. */
export function translateTag(
  overlay: OverlayBundle,
  tagSlug: string,
  fallback: { name: string; description?: string },
): { name: string; description?: string } {
  const entry = overlay.tags[tagSlug];
  if (!entry) {
    return fallback;
  }
  return {
    name: entry.name ?? fallback.name,
    description: entry.description ?? fallback.description,
  };
}

/** Translate operation-level fields, falling back to the spec values. */
export function translateAction(
  overlay: OverlayBundle,
  operationId: string,
): ActionTranslation {
  return overlay.actions[operationId] ?? {};
}
