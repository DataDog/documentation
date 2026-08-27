import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  getDocsNavTree,
  findActiveSectionIdentifier,
  findActivePageIdentifier,
  type DocsNavNode,
} from "./docsNavMenu";

const ORIGINAL_ENV = { ...process.env };

function resetEnv() {
  for (const key of Object.keys(process.env)) {
    delete process.env[key];
  }
  Object.assign(process.env, ORIGINAL_ENV);
}

function findByIdentifier(
  nodes: DocsNavNode[],
  identifier: string,
): DocsNavNode | undefined {
  for (const node of nodes) {
    if (node.identifier === identifier) {
      return node;
    }
    const found = findByIdentifier(node.children, identifier);
    if (found) {
      return found;
    }
  }
  return undefined;
}

describe("getDocsNavTree", () => {
  const tree = getDocsNavTree();

  it("returns top-level section headings from main.en.yaml", () => {
    const topIdentifiers = tree.map((n) => n.identifier);
    expect(topIdentifiers).toContain("essentials_heading");
    // Headings have no URL of their own — they only toggle.
    const essentials = tree.find((n) => n.identifier === "essentials_heading");
    expect(essentials?.href).toBeNull();
    expect(essentials?.label).toBe("Essentials");
  });

  it("nests children under their parent (Getting Started under Essentials)", () => {
    const essentials = findByIdentifier(tree, "essentials_heading");
    const gettingStarted = essentials?.children.find(
      (n) => n.identifier === "getting_started",
    );
    expect(gettingStarted).toBeDefined();
    expect(gettingStarted?.href).toBe("/getting_started/");
  });

  it("builds the full multi-level hierarchy (level 3+ nesting)", () => {
    const containers = findByIdentifier(tree, "getting_started_containers");
    expect(containers).toBeDefined();
    const autodiscovery = containers?.children.find(
      (n) => n.identifier === "getting_started_containers_autodiscovery",
    );
    expect(autodiscovery).toBeDefined();
  });

  it("sorts siblings by weight ascending", () => {
    const gettingStarted = findByIdentifier(tree, "getting_started");
    const weightOrderedLabels =
      gettingStarted?.children.map((n) => n.label) ?? [];
    // In main.en.yaml, Agent (weight 1) precedes API (weight 2).
    expect(weightOrderedLabels.indexOf("Agent")).toBeLessThan(
      weightOrderedLabels.indexOf("API"),
    );
  });
});

describe("findActiveSectionIdentifier", () => {
  const tree = getDocsNavTree();

  it("opens the section whose descendant link is a prefix of the current page", () => {
    // /api/ (the API nav item) lives under Getting Started → Essentials, so a
    // deep API page like the action-connection reference opens Essentials.
    expect(
      findActiveSectionIdentifier(tree, "/api/latest/action-connection/"),
    ).toBe("essentials_heading");
  });

  it("matches an exact leaf URL to its top-level section", () => {
    // getting_started/agent/ lives under Essentials.
    expect(findActiveSectionIdentifier(tree, "/getting_started/agent/")).toBe(
      "essentials_heading",
    );
  });

  it("attributes a page to the correct non-Essentials section", () => {
    // infrastructure/hostmap/ lives directly under Infrastructure.
    expect(findActiveSectionIdentifier(tree, "/infrastructure/hostmap/")).toBe(
      "infrastructure_heading",
    );
  });

  it("prefers the longest (most specific) prefix match", () => {
    // Both /getting_started/ and the deeper /getting_started/agent/ are
    // prefixes here, but they share the same Essentials ancestor; the result
    // is still Essentials and never a shorter, unrelated match.
    expect(findActiveSectionIdentifier(tree, "/getting_started/agent/")).toBe(
      "essentials_heading",
    );
  });

  it("ignores trailing-slash differences", () => {
    expect(
      findActiveSectionIdentifier(tree, "/api/latest/action-connection"),
    ).toBe("essentials_heading");
  });

  it("returns null for the docs home (no section owns the root)", () => {
    expect(findActiveSectionIdentifier(tree, "/")).toBeNull();
  });

  it("returns null when no nav item matches the current page", () => {
    expect(
      findActiveSectionIdentifier(tree, "/this/path/matches/nothing/"),
    ).toBeNull();
  });

  it("matches localized (non-English) pages against localized nav hrefs", () => {
    const jaTree = getDocsNavTree("ja");
    expect(
      findActiveSectionIdentifier(jaTree, "/ja/api/latest/action-connection/"),
    ).toBe("essentials_heading");
  });
});

describe("getDocsNavTree hrefs stay prefix-free under a preview branch", () => {
  beforeEach(resetEnv);
  afterEach(resetEnv);

  // Regression test for Finding 7: MobileNavSection concatenates these hrefs
  // onto HUGO_ORIGIN, which already carries the branch prefix. If hrefs from
  // this module ever picked up the branch prefix themselves, that
  // concatenation would double it.
  it("never emits the branch segment, so callers that prepend HUGO_ORIGIN see it exactly once", () => {
    process.env.CI_ENVIRONMENT_NAME = "preview";
    process.env.CI_COMMIT_REF_NAME = "devin.ford/my-cool-thing";

    const tree = getDocsNavTree();
    const hugoOrigin = "https://docs-staging.datadoghq.com/devin.ford/my-cool-thing";

    function assertPrefixedOnce(node: DocsNavNode) {
      if (node.href) {
        expect(node.href.startsWith("/devin.ford/my-cool-thing")).toBe(false);
        const composed = `${hugoOrigin}${node.href}`;
        expect(composed.match(/devin\.ford\/my-cool-thing/g)?.length).toBe(1);
      }
      for (const child of node.children) {
        assertPrefixedOnce(child);
      }
    }

    for (const section of tree) {
      assertPrefixedOnce(section);
    }
  });
});
