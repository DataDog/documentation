import { describe, expect, it } from "vitest";
import { parse as parseYaml } from "yaml";
import { FIXTURE_SDK_VERSIONS } from "../../../tests/fixtures/api/sdkVersions";
import {
  buildMarkdocStr,
  buildPlaintextPage,
  heading,
  paragraphFromText,
  parse,
  tableMd,
} from "./helpers";

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
    const text = buildPlaintextPage(
      [heading(1, "Get a metric")],
      {
        title: "Get a metric",
        description: "Gets a metric.",
        breadcrumbs: CRUMBS,
      },
      SITE,
    );
    expect(frontmatterOf(text)).toEqual({
      title: "Get a metric",
      description: "Gets a metric.",
      breadcrumbs: "Docs > API > Get a metric",
    });
  });

  it("puts the llms.txt banner between the frontmatter and the body", () => {
    const text = buildPlaintextPage(
      [heading(1, "Get a metric")],
      {
        title: "Get a metric",
        description: "Gets a metric.",
        breadcrumbs: CRUMBS,
      },
      SITE,
    );
    expect(text).toMatch(
      /\n---\n\n> For the complete documentation index, see \[llms\.txt\]\(https:\/\/docs\.datadoghq\.com\/llms\.txt\)\.\n\n# Get a metric\n$/,
    );
  });

  it("points the banner at the site's own root, base path included", () => {
    const text = buildPlaintextPage(
      [paragraphFromText("body")],
      {
        title: "T",
        description: "D",
        breadcrumbs: CRUMBS,
      },
      "https://docs-staging.datadoghq.com/me/branch",
    );
    expect(text).toContain(
      "(https://docs-staging.datadoghq.com/me/branch/llms.txt)",
    );
  });

  it("omits an empty description", () => {
    const text = buildPlaintextPage(
      [paragraphFromText("body")],
      {
        title: "T",
        description: "",
        breadcrumbs: CRUMBS,
      },
      SITE,
    );
    expect(frontmatterOf(text)).not.toHaveProperty("description");
  });

  it("quotes values YAML would otherwise misread", () => {
    const title = "Status: OK # not a comment";
    const text = buildPlaintextPage(
      [paragraphFromText("body")],
      {
        title,
        description: "D",
        breadcrumbs: CRUMBS,
      },
      SITE,
    );
    expect(frontmatterOf(text)).toMatchObject({ title });
  });

  it("throws without a site rather than emitting a relative link", () => {
    expect(() =>
      buildPlaintextPage(
        [paragraphFromText("body")],
        {
          title: "T",
          description: "D",
          breadcrumbs: CRUMBS,
        },
        undefined,
      ),
    ).toThrow(/`site` must be set/);
  });
});

describe("tableMd", () => {
  it("keeps a cell with line breaks on one row", () => {
    const table = tableMd(
      ["Name", "Description"],
      [
        [
          "aws_account_id",
          "Filter by account.\n  If not provided, all accounts are returned.",
        ],
        ["other", "First paragraph.\n\nSecond paragraph."],
      ],
    );
    const bodyRows = buildMarkdocStr([table])
      .split("\n")
      .filter((line) => line.startsWith("|") && !line.startsWith("| Name"))
      .filter((line) => !/^\|[\s|-]+\|$/.test(line));

    expect(bodyRows).toHaveLength(2);
    expect(bodyRows[0]).toContain(
      "Filter by account. If not provided, all accounts are returned.",
    );
    expect(bodyRows[1]).toContain("First paragraph. Second paragraph.");
  });
});

describe("buildMarkdocStr", () => {
  it("resolves SDK versions in code fences, so no .md route has to", () => {
    // Every API route and the twin pipeline build their text through here.
    const nodes = parse(
      "```xml\n<version>{% $sdkVersions.datadog-api-client-java %}</version>\n```\n",
    ).children;

    const output = buildMarkdocStr(nodes);

    expect(output).toContain(
      `<version>${FIXTURE_SDK_VERSIONS["datadog-api-client-java"]}</version>`,
    );
    expect(output).not.toContain("$sdkVersions");
  });

  it("doesn't change the nodes it's given", () => {
    const source =
      "```xml\n<version>{% $sdkVersions.datadog-api-client-java %}</version>\n```\n";
    const nodes = parse(source).children;
    const before = JSON.stringify(nodes);

    buildMarkdocStr(nodes);

    expect(JSON.stringify(nodes)).toBe(before);
  });
});
