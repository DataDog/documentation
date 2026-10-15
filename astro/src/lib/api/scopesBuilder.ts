/**
 * Builds the data for the authorization scopes page (`/api/latest/scopes/`).
 *
 * This is a port of Hugo's `api-scopes` shortcode
 * (`hugo/layouts/shortcodes/api-scopes.html`). Its grouping and ordering
 * rules are quirky, but the headings must match the live page, so they are
 * reproduced as-is rather than tidied up:
 *
 *   - Go templates range over maps in sorted key order, so paths, methods,
 *     scope names, and group headings are all visited sorted (bytewise).
 *   - A scope's group is its own tags plus the tags of every scope it shares
 *     a tag with. That is one hop, not a transitive closure, so a tag can
 *     appear under several headings.
 *   - Tags within a heading are sorted with Hugo's `sort`, which collates
 *     rather than comparing bytes ("Identity Providers" before "IP Allowlist").
 *
 * Two deliberate departures from Hugo:
 *
 *   - Hugo emits a tag's anchor under every heading that lists it, producing
 *     duplicate IDs. Here each anchor appears once, under the first such
 *     heading, which is the one browsers resolve to anyway.
 *   - Endpoint links use Astro's routes, including category slug overrides,
 *     and each link is listed once even when v1 and v2 both use the scope.
 *
 * Reads these OpenAPI keys from each spec:
 *
 *   - `paths.{path}.{method}.tags` (first tag only)
 *   - `paths.{path}.{method}.summary`
 *   - `paths.{path}.{method}.security` (every AuthZ alternative)
 *   - `components.securitySchemes.AuthZ.flows.authorizationCode.scopes`
 */

import type { OpenAPIV3 } from "openapi-types";
import { API_VERSIONS, getOpenApiDocument } from "./specParser";
import { toCategorySlug, toOperationSlug, toSlug } from "./categorySlug";

export interface ScopeEndpoint {
  summary: string;
  /** Unlocalized, e.g. `/api/latest/monitors/#get-all-monitors`. */
  href: string;
}

export interface ScopeRow {
  name: string;
  description: string;
  endpoints: ScopeEndpoint[];
}

export interface ScopeGroup {
  /** The group's tags, sorted and comma-joined, e.g. "Downtimes, Monitors". */
  heading: string;
  /** Tag anchors (and Hugo-spelling aliases) that belong under this heading. */
  anchors: string[];
  scopes: ScopeRow[];
}

/** One scope as collected from the specs, before grouping. */
interface CollectedScope {
  tags: string[];
  description: string;
  endpoints: ScopeEndpoint[];
}

const OAUTH_SCHEME_NAME = "AuthZ";

/** Hugo's `sort` collates strings; `en` collation matches its output. */
const tagCollator = new Intl.Collator("en");

let scopeGroupsCache: ScopeGroup[] | undefined;

/**
 * The scope groups for the live (or, in unit tests, fixture) specs, in page
 * order. Memoized for the build.
 */
export function getScopeGroupsView(): ScopeGroup[] {
  scopeGroupsCache ??= buildScopeGroups(
    API_VERSIONS.map((version) => getOpenApiDocument(version)),
  );
  return scopeGroupsCache;
}

/**
 * The anchor for a tag's section of the scopes page. Endpoint pages link to
 * `/api/latest/scopes/#<anchor>`, so both sides must use this function.
 */
export function toScopeAnchor(tag: string): string {
  return toSlug(tag);
}

/**
 * The anchor Hugo gives a tag (`humanize | lower`, spaces to hyphens).
 * `humanize` splits camelCase words, so "GitHub" becomes "git-hub". Only
 * that split is ported, which is the only way the two rules differ for the
 * tags in the spec.
 */
export function toHugoScopeAnchor(tag: string): string {
  return toSlug(tag.replace(/([a-z])([A-Z])/g, "$1 $2"));
}

/** Specs are passed in v1, v2 order, the order Hugo walks them. */
export function buildScopeGroups(specs: OpenAPIV3.Document[]): ScopeGroup[] {
  const scopesByName = collectScopesFromSpecs(specs);
  const tagGroups = groupTagsByOverlappingScopes(scopesByName);
  return buildGroupsWithAnchors(tagGroups, scopesByName);
}

function collectScopesFromSpecs(
  specs: OpenAPIV3.Document[],
): Map<string, CollectedScope> {
  const scopesByName = new Map<string, CollectedScope>();

  for (const spec of specs) {
    const scopeDescriptions = getScopeDescriptions(spec);

    for (const pathKey of sortedKeys(spec.paths ?? {})) {
      if (pathKey.startsWith("x-")) continue;
      const pathItem = spec.paths[pathKey] as Record<string, unknown>;

      for (const method of sortedKeys(pathItem)) {
        const operation = pathItem[method] as OpenAPIV3.OperationObject;
        const tag = operation?.tags?.[0];
        if (!tag) continue;

        const summary = operation.summary ?? "";
        const endpoint: ScopeEndpoint = {
          summary,
          href: `/api/latest/${toCategorySlug(tag)}/#${toOperationSlug(summary)}`,
        };

        for (const scopeName of collectAuthZScopes(operation)) {
          const scope = scopesByName.get(scopeName) ?? {
            tags: [],
            description: "",
            endpoints: [],
          };
          if (!scope.tags.includes(tag)) scope.tags.push(tag);
          if (!scope.endpoints.some((known) => known.href === endpoint.href)) {
            scope.endpoints.push(endpoint);
          }
          // Hugo overwrites the description on every visit, so the spec that
          // last used the scope wins, even when it has no description.
          scope.description = scopeDescriptions[scopeName] ?? "";
          scopesByName.set(scopeName, scope);
        }
      }
    }
  }

  return scopesByName;
}

function getScopeDescriptions(
  spec: OpenAPIV3.Document,
): Record<string, string> {
  const scheme = spec.components?.securitySchemes?.[OAUTH_SCHEME_NAME] as
    OpenAPIV3.OAuth2SecurityScheme | undefined;
  return scheme?.flows?.authorizationCode?.scopes ?? {};
}

/** Every scope in every AuthZ alternative of the operation's `security`. */
function collectAuthZScopes(operation: OpenAPIV3.OperationObject): string[] {
  return (operation.security ?? []).flatMap(
    (requirement) => requirement[OAUTH_SCHEME_NAME] ?? [],
  );
}

/**
 * For each scope, the sorted union of its tags with those of every scope it
 * overlaps, keyed by the comma-joined heading. Scopes with the same tag set
 * produce the same heading, so they collapse into one entry.
 */
function groupTagsByOverlappingScopes(
  scopesByName: Map<string, CollectedScope>,
): Map<string, string[]> {
  const scopes = sortedKeys(Object.fromEntries(scopesByName)).map((name) =>
    scopesByName.get(name)!,
  );
  const tagsByHeading = new Map<string, string[]>();

  for (const scope of scopes) {
    let groupTags: string[] = [];
    for (const otherScope of scopes) {
      if (
        haveCommonTag(scope.tags, otherScope.tags) &&
        !haveSameTagsInOrder(scope.tags, otherScope.tags)
      ) {
        groupTags = unique([...groupTags, ...scope.tags, ...otherScope.tags]);
      }
    }
    if (groupTags.length === 0) groupTags = unique(scope.tags);
    groupTags.sort(tagCollator.compare);

    tagsByHeading.set(groupTags.join(", "), groupTags);
  }

  return tagsByHeading;
}

function buildGroupsWithAnchors(
  tagsByHeading: Map<string, string[]>,
  scopesByName: Map<string, CollectedScope>,
): ScopeGroup[] {
  const scopeNamesByTag = groupScopeNamesByTag(scopesByName);
  const anchoredTags = new Set<string>();

  return sortedKeys(Object.fromEntries(tagsByHeading)).map((heading) => {
    const tags = tagsByHeading.get(heading)!;
    const scopeNames = unique(
      tags.flatMap((tag) => scopeNamesByTag.get(tag) ?? []),
    );
    const newTags = tags.filter((tag) => !anchoredTags.has(tag));
    newTags.forEach((tag) => anchoredTags.add(tag));

    return {
      heading,
      anchors: newTags.flatMap(anchorsForTag),
      scopes: scopeNames.map((name) => {
        const scope = scopesByName.get(name)!;
        return {
          name,
          description: scope.description,
          endpoints: scope.endpoints,
        };
      }),
    };
  });
}

/** Scope names per tag, in sorted scope-name order. */
function groupScopeNamesByTag(
  scopesByName: Map<string, CollectedScope>,
): Map<string, string[]> {
  const scopeNamesByTag = new Map<string, string[]>();
  for (const name of sortedKeys(Object.fromEntries(scopesByName))) {
    for (const tag of scopesByName.get(name)!.tags) {
      scopeNamesByTag.set(tag, [...(scopeNamesByTag.get(tag) ?? []), name]);
    }
  }
  return scopeNamesByTag;
}

function anchorsForTag(tag: string): string[] {
  return unique([toScopeAnchor(tag), toHugoScopeAnchor(tag)]);
}

/** Keys in bytewise order, matching Go's sorted map iteration. */
function sortedKeys(record: object): string[] {
  return Object.keys(record).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

function haveCommonTag(tags: string[], otherTags: string[]): boolean {
  return tags.some((tag) => otherTags.includes(tag));
}

/** Hugo compares the tag slices with `ne`, which is order-sensitive. */
function haveSameTagsInOrder(tags: string[], otherTags: string[]): boolean {
  return (
    tags.length === otherTags.length &&
    tags.every((tag, index) => tag === otherTags[index])
  );
}

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}
