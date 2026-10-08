import { describe, expect, it } from "vitest";
import { parse as parseYaml } from "yaml";
import { heading, paragraphFromText } from "./helpers";
import { buildPlaintextPage } from "./preamble";

const SITE = "https://docs.datadoghq.com";
const CRUMBS = [
  { label: "Docs", href: "/" },
  { label: "API", href: "/api/latest/" },
  { label: "Get a metric" },
];

function frontmatterOf(text: string): unknown {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!match) throw new Error(`no frontmatter in:\n${text}`);
  return parseYaml(match[1]);
}

describe("buildPlaintextPage", () => {
  it("opens with frontmatter holding title, description, and joined crumbs", () => {
    const text = buildPlaintextPage([heading(1, "Get a metric")], {
      title: "Get a metric",
      description: "Gets a metric.",
      breadcrumbs: CRUMBS,
      site: SITE,
    });
    expect(frontmatterOf(text)).toEqual({
      title: "Get a metric",
      description: "Gets a metric.",
      breadcrumbs: "Docs > API > Get a metric",
    });
  });

  it("puts the llms.txt banner between the frontmatter and the body", () => {
    const text = buildPlaintextPage([heading(1, "Get a metric")], {
      title: "Get a metric",
      description: "Gets a metric.",
      breadcrumbs: CRUMBS,
      site: SITE,
    });
    expect(text).toMatch(
      /\n---\n\n> For the complete documentation index, see \[llms\.txt\]\(https:\/\/docs\.datadoghq\.com\/llms\.txt\)\.\n\n# Get a metric\n$/,
    );
  });

  it("points the banner at the site's own root, base path included", () => {
    const text = buildPlaintextPage([paragraphFromText("body")], {
      title: "T",
      description: "D",
      breadcrumbs: CRUMBS,
      site: "https://docs-staging.datadoghq.com/me/branch",
    });
    expect(text).toContain(
      "(https://docs-staging.datadoghq.com/me/branch/llms.txt)",
    );
  });

  it("omits an empty description", () => {
    const text = buildPlaintextPage([paragraphFromText("body")], {
      title: "T",
      description: "",
      breadcrumbs: CRUMBS,
      site: SITE,
    });
    expect(frontmatterOf(text)).not.toHaveProperty("description");
  });

  it("quotes values YAML would otherwise misread", () => {
    const title = "Status: OK # not a comment";
    const text = buildPlaintextPage([paragraphFromText("body")], {
      title,
      description: "D",
      breadcrumbs: CRUMBS,
      site: SITE,
    });
    expect(frontmatterOf(text)).toMatchObject({ title });
  });

  it("throws without a site rather than emitting a relative link", () => {
    expect(() =>
      buildPlaintextPage([paragraphFromText("body")], {
        title: "T",
        description: "D",
        breadcrumbs: CRUMBS,
        site: undefined,
      }),
    ).toThrow(/`site` must be set/);
  });
});
