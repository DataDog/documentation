/**
 * Tests for the authorization scopes page data. Most cases here use small
 * synthetic specs that isolate one grouping or ordering rule at a time. The last block runs
 * against the frozen fixture spec (wired by `vitest.unit.config.ts`).
 */

import { describe, expect, it } from "vitest";
import type { OpenAPIV3 } from "openapi-types";
import {
  buildScopeGroups,
  getScopeGroupsView,
  toHugoScopeAnchor,
  toScopeAnchor,
  type ScopeGroup,
} from "./scopesBuilder";
import { getCategoriesView, getOperationView } from "./viewsBuilder";

interface SyntheticOperation {
  path: string;
  method?: string;
  tags: string[];
  summary: string;
  /** The operation's `x-displayName`. */
  displayName?: string;
  /** One entry per AuthZ alternative in the `security` block. */
  authZ: string[][];
}

function specWith(
  operations: SyntheticOperation[],
  scopeDescriptions: Record<string, string> = {},
  tagDisplayNames: Record<string, string> = {},
): OpenAPIV3.Document {
  const paths: Record<string, Record<string, unknown>> = {};
  for (const operation of operations) {
    paths[operation.path] ??= {};
    paths[operation.path][operation.method ?? "get"] = {
      tags: operation.tags,
      summary: operation.summary,
      ...(operation.displayName
        ? { "x-displayName": operation.displayName }
        : {}),
      security: operation.authZ.map((scopes) => ({ AuthZ: scopes })),
      responses: {},
    };
  }
  return {
    openapi: "3.0.0",
    info: { title: "synthetic", version: "1" },
    tags: Object.entries(tagDisplayNames).map(([name, displayName]) => ({
      name,
      "x-displayName": displayName,
    })),
    paths,
    components: {
      securitySchemes: {
        AuthZ: {
          type: "oauth2",
          flows: {
            authorizationCode: {
              authorizationUrl: "/oauth2/v1/authorize",
              tokenUrl: "/oauth2/v1/token",
              scopes: scopeDescriptions,
            },
          },
        },
      },
    },
  } as OpenAPIV3.Document;
}

function headingsOf(groups: ScopeGroup[]): string[] {
  return groups.map((group) => group.heading);
}

function scopeNamesByHeading(groups: ScopeGroup[]): Record<string, string[]> {
  return Object.fromEntries(
    groups.map((group) => [
      group.heading,
      group.scopes.map((scope) => scope.name),
    ]),
  );
}

describe("toScopeAnchor", () => {
  it("matches the slug rule endpoint pages link to", () => {
    expect(toScopeAnchor("AWS Integration")).toBe("aws-integration");
    expect(toScopeAnchor("On-Call / Paging")).toBe("on-call-paging");
    expect(toScopeAnchor("CI Visibility GitHub Accounts")).toBe(
      "ci-visibility-github-accounts",
    );
  });

  it("ignores category slug overrides", () => {
    expect(toScopeAnchor("Case Management")).toBe("case-management");
  });
});

describe("toHugoScopeAnchor", () => {
  it("splits camelCase words", () => {
    expect(toHugoScopeAnchor("CI Visibility GitHub Accounts")).toBe(
      "ci-visibility-git-hub-accounts",
    );
    expect(toHugoScopeAnchor("High Availability MultiRegion")).toBe(
      "high-availability-multi-region",
    );
  });

  it("keeps acronym runs together", () => {
    expect(toHugoScopeAnchor("DDSQL")).toBe("ddsql");
    expect(toHugoScopeAnchor("CI Visibility Tests")).toBe(
      "ci-visibility-tests",
    );
  });
});

describe("buildScopeGroups: collection", () => {
  it("files each operation under its first tag only", () => {
    const groups = buildScopeGroups([
      specWith([
        {
          path: "/a",
          tags: ["Alpha", "Beta"],
          summary: "Get alpha",
          authZ: [["alpha_read"]],
        },
      ]),
    ]);
    expect(headingsOf(groups)).toEqual(["Alpha"]);
  });

  it("counts every AuthZ alternative in the security block", () => {
    const groups = buildScopeGroups([
      specWith([
        {
          path: "/share",
          tags: ["Dashboards"],
          summary: "Share a dashboard",
          authZ: [["dashboards_public_share"], ["dashboards_invite_share"]],
        },
      ]),
    ]);
    expect(scopeNamesByHeading(groups)).toEqual({
      Dashboards: ["dashboards_invite_share", "dashboards_public_share"],
    });
  });

  it("skips path keys starting with x-", () => {
    const groups = buildScopeGroups([
      specWith([
        {
          path: "x-hidden",
          tags: ["Hidden"],
          summary: "Hidden",
          authZ: [["hidden_read"]],
        },
      ]),
    ]);
    expect(groups).toEqual([]);
  });

  it("lists endpoints in spec order (v1 then v2, sorted paths, sorted methods), deduped by href", () => {
    const v1 = specWith([
      {
        path: "/b",
        tags: ["Monitors"],
        summary: "Get b",
        authZ: [["monitors_read"]],
      },
      {
        path: "/a",
        method: "post",
        tags: ["Monitors"],
        summary: "Post a",
        authZ: [["monitors_read"]],
      },
      {
        path: "/a",
        method: "get",
        tags: ["Monitors"],
        summary: "Get a",
        authZ: [["monitors_read"]],
      },
    ]);
    const v2 = specWith([
      {
        path: "/a",
        tags: ["Monitors"],
        summary: "Get a",
        authZ: [["monitors_read"]],
      },
      {
        path: "/c",
        tags: ["Monitors"],
        summary: "Get c",
        authZ: [["monitors_read"]],
      },
    ]);
    const [group] = buildScopeGroups([v1, v2]);
    expect(group.scopes[0].endpoints).toEqual([
      { summary: "Get a", href: "/api/latest/monitors/#get-a" },
      { summary: "Post a", href: "/api/latest/monitors/#post-a" },
      { summary: "Get b", href: "/api/latest/monitors/#get-b" },
      { summary: "Get c", href: "/api/latest/monitors/#get-c" },
    ]);
  });

  it("links Case Management endpoints to its tag slug", () => {
    const [group] = buildScopeGroups([
      specWith([
        {
          path: "/cases",
          tags: ["Case Management"],
          summary: "Get a case",
          authZ: [["cases_read"]],
        },
      ]),
    ]);
    expect(group.scopes[0].endpoints).toEqual([
      {
        summary: "Get a case",
        href: "/api/latest/case-management/#get-a-case",
      },
    ]);
  });

  it("labels endpoints with x-displayName but links to the canonical slug", () => {
    const [group] = buildScopeGroups([
      specWith([
        {
          path: "/cases",
          method: "post",
          tags: ["Case Management"],
          summary: "Create a case",
          displayName: "Create a work item",
          authZ: [["cases_write"]],
        },
      ]),
    ]);
    expect(group.scopes[0].endpoints).toEqual([
      {
        summary: "Create a work item",
        href: "/api/latest/case-management/#create-a-case",
      },
    ]);
  });

  it("labels headings with x-displayName but keeps canonical anchors", () => {
    const [group] = buildScopeGroups([
      specWith(
        [
          {
            path: "/cases",
            tags: ["Case Management"],
            summary: "Get a case",
            authZ: [["cases_read"]],
          },
        ],
        {},
        { "Case Management": "Work Management" },
      ),
    ]);
    expect(group.heading).toBe("Work Management");
    expect(group.anchors).toEqual(["case-management"]);
  });

  it("links to the endpoint's operation slug, which drops punctuation", () => {
    const [group] = buildScopeGroups([
      specWith([
        {
          path: "/monitor",
          tags: ["Monitors"],
          summary: "Get a monitor's details",
          authZ: [["monitors_read"]],
        },
      ]),
    ]);
    expect(group.scopes[0].endpoints[0].href).toBe(
      "/api/latest/monitors/#get-a-monitors-details",
    );
  });

  it("takes the description from the spec that last used the scope", () => {
    const v1 = specWith(
      [{ path: "/a", tags: ["A"], summary: "A", authZ: [["shared_read"]] }],
      { shared_read: "v1 description" },
    );
    const v2 = specWith(
      [{ path: "/b", tags: ["A"], summary: "B", authZ: [["shared_read"]] }],
      { shared_read: "v2 description" },
    );
    const [group] = buildScopeGroups([v1, v2]);
    expect(group.scopes[0].description).toBe("v2 description");
  });

  it("falls back to an empty description", () => {
    const [group] = buildScopeGroups([
      specWith([
        { path: "/a", tags: ["A"], summary: "A", authZ: [["undocumented"]] },
      ]),
    ]);
    expect(group.scopes[0].description).toBe("");
  });
});

describe("buildScopeGroups: grouping", () => {
  // w=[A], x=[A,B], y=[B,C], z=[C]. A scope's tags are unioned with those of
  // the scopes it directly overlaps, one hop only, so this yields three
  // groups rather than one transitive group.
  const oneHopSpec = specWith([
    { path: "/a1", tags: ["A"], summary: "A1", authZ: [["w", "x"]] },
    { path: "/b1", tags: ["B"], summary: "B1", authZ: [["x", "y"]] },
    { path: "/c1", tags: ["C"], summary: "C1", authZ: [["y", "z"]] },
  ]);

  it("unions overlapping tags one hop, not transitively", () => {
    expect(scopeNamesByHeading(buildScopeGroups([oneHopSpec]))).toEqual({
      "A, B": ["w", "x", "y"],
      "A, B, C": ["w", "x", "y", "z"],
      "B, C": ["x", "y", "z"],
    });
  });

  it("orders headings bytewise, like Go's map iteration", () => {
    const groups = buildScopeGroups([
      specWith([
        {
          path: "/1",
          tags: ["Agentless Scanning"],
          summary: "1",
          authZ: [["s1"]],
        },
        { path: "/2", tags: ["APM"], summary: "2", authZ: [["s2"]] },
        { path: "/3", tags: ["API Management"], summary: "3", authZ: [["s3"]] },
      ]),
    ]);
    expect(headingsOf(groups)).toEqual([
      "API Management",
      "APM",
      "Agentless Scanning",
    ]);
  });

  it("orders tags within a heading by collation", () => {
    const groups = buildScopeGroups([
      specWith([
        { path: "/1", tags: ["IP Allowlist"], summary: "1", authZ: [["org"]] },
        {
          path: "/2",
          tags: ["Identity Providers"],
          summary: "2",
          authZ: [["org"]],
        },
      ]),
    ]);
    expect(headingsOf(groups)).toEqual(["Identity Providers, IP Allowlist"]);
  });

  it("orders scopes by sorted tag, then scope name, without repeats", () => {
    const groups = buildScopeGroups([
      specWith([
        {
          path: "/b",
          tags: ["B"],
          summary: "B",
          authZ: [["b_scope", "shared"]],
        },
        {
          path: "/a",
          tags: ["A"],
          summary: "A",
          authZ: [["shared", "z_scope"]],
        },
      ]),
    ]);
    expect(scopeNamesByHeading(groups)).toEqual({
      "A, B": ["shared", "z_scope", "b_scope"],
    });
  });
});

describe("buildScopeGroups: anchors", () => {
  it("emits each tag's anchor once, under the first heading that lists it", () => {
    const groups = buildScopeGroups([
      specWith([
        { path: "/a1", tags: ["A"], summary: "A1", authZ: [["w", "x"]] },
        { path: "/b1", tags: ["B"], summary: "B1", authZ: [["x", "y"]] },
        { path: "/c1", tags: ["C"], summary: "C1", authZ: [["y", "z"]] },
      ]),
    ]);
    expect(
      Object.fromEntries(groups.map((group) => [group.heading, group.anchors])),
    ).toEqual({
      "A, B": ["a", "b"],
      "A, B, C": ["c"],
      "B, C": [],
    });
  });

  it("adds the camelCase-split spelling as a second anchor when it differs", () => {
    const groups = buildScopeGroups([
      specWith([
        {
          path: "/gh",
          tags: ["CI Visibility GitHub Accounts"],
          summary: "GH",
          authZ: [["ci_read"]],
        },
        {
          path: "/tests",
          tags: ["CI Visibility Tests"],
          summary: "Tests",
          authZ: [["tests_read"]],
        },
      ]),
    ]);
    expect(groups.map((group) => group.anchors)).toEqual([
      ["ci-visibility-github-accounts", "ci-visibility-git-hub-accounts"],
      ["ci-visibility-tests"],
    ]);
  });
});

describe("getScopeGroupsView (fixture spec)", () => {
  it("matches the snapshot", async () => {
    await expect(
      JSON.stringify(getScopeGroupsView(), null, 2),
    ).toMatchFileSnapshot("__snapshots__/getScopeGroupsView.json");
  });

  it("has an anchor for every endpoint page's scopes link", async () => {
    const anchors = new Set(
      getScopeGroupsView().flatMap((group) => group.anchors),
    );
    let linkedOperationCount = 0;
    for (const category of await getCategoriesView()) {
      for (const operation of category.operations) {
        const view = await getOperationView(category.slug, operation.slug);
        for (const variant of view?.variants ?? []) {
          if (!variant.oauthScopesAnchor) continue;
          linkedOperationCount++;
          expect(
            anchors,
            `${category.slug}/${operation.slug} links to a missing scopes anchor`,
          ).toContain(variant.oauthScopesAnchor);
        }
      }
    }
    expect(linkedOperationCount).toBeGreaterThan(0);
  });
});
