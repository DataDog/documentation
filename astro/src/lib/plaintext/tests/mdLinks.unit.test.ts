import { describe, it, expect } from "vitest";
import {
  buildPlaintextPage,
  link,
  mdLinkHref,
  nodesFromMd,
  paragraph,
  inline,
} from "../helpers";

const LIVE = "https://docs.datadoghq.com";
const PREVIEW = "https://docs-staging.datadoghq.com/jane/some-branch";

describe("mdLinkHref", () => {
  it("makes a root-relative docs link absolute and points it at .md", () => {
    expect(
      mdLinkHref("/api/latest/authentication/validate-api-key/", LIVE),
    ).toBe(
      "https://docs.datadoghq.com/api/latest/authentication/validate-api-key.md",
    );
  });

  it("keeps the query string and hash", () => {
    expect(mdLinkHref("/api/latest/?code-lang=python", LIVE)).toBe(
      "https://docs.datadoghq.com/api/latest.md?code-lang=python",
    );
    expect(mdLinkHref("/account_management/authn_mapping/#roles", LIVE)).toBe(
      "https://docs.datadoghq.com/account_management/authn_mapping.md#roles",
    );
  });

  it("points absolute docs links at .md without changing their host", () => {
    expect(
      mdLinkHref(
        "https://docs.datadoghq.com/account_management/api-app-keys/",
        PREVIEW,
      ),
    ).toBe("https://docs.datadoghq.com/account_management/api-app-keys.md");
  });

  it("resolves root-relative links against the site origin, since preview hrefs already carry the branch prefix", () => {
    expect(mdLinkHref("/jane/some-branch/api/latest/monitors/", PREVIEW)).toBe(
      "https://docs-staging.datadoghq.com/jane/some-branch/api/latest/monitors.md",
    );
  });

  it("leaves non-docs hosts, file links, existing .md links, and the root alone", () => {
    for (const href of [
      "https://app.datadoghq.com/organization-settings/",
      "https://docs.datadoghq.com/llms.txt",
      "https://docs.datadoghq.com/api/latest.md?code-lang=go",
      "/",
      "#section",
      "mailto:support@datadoghq.com",
    ]) {
      expect(mdLinkHref(href, LIVE)).toBe(href);
    }
  });

  it("is idempotent", () => {
    const once = mdLinkHref("/api/latest/monitors/", LIVE);
    expect(mdLinkHref(once, LIVE)).toBe(once);
  });
});

describe("buildPlaintextPage links", () => {
  const frontmatter = { title: "T", description: "", breadcrumbs: [] };

  it("rewrites built and parsed docs links to .md", () => {
    const md = buildPlaintextPage(
      [
        paragraph([inline([link("/api/latest/monitors/", "Monitors")])]),
        ...nodesFromMd(
          "See the [keys page](https://docs.datadoghq.com/account_management/api-app-keys/).",
        ),
      ],
      frontmatter,
      LIVE,
    );
    expect(md).toContain(
      "[Monitors](https://docs.datadoghq.com/api/latest/monitors.md)",
    );
    expect(md).toContain(
      "[keys page](https://docs.datadoghq.com/account_management/api-app-keys.md)",
    );
    expect(md).toContain("[llms.txt](https://docs.datadoghq.com/llms.txt)");
  });
});
