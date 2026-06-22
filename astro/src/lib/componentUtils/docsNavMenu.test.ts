import { describe, it, expect } from "vitest";
import { getDocsNavTree, type DocsNavNode } from "./docsNavMenu";

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
