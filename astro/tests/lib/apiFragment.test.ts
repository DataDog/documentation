import { describe, it, expect, beforeAll } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of islands in headless tests.
import preactRenderer from "@astrojs/preact/server.js";
import {
  extractApiFragment,
  extractPlaintextFragment,
  type ApiSection,
} from "./apiFragment";

import OperationPage from "../../src/pages/[...lang]/api/latest/[category]/[operation].astro";

/** A schema row plus the nested rows that follow it, as ApiSchemaTable renders them. */
function row(name: string, children = ""): string {
  const childBlock = children
    ? `<div class="schema-table__children">${children}</div>`
    : "";
  return `<div class="schema-table__row" data-field-name="${name}">${name}</div>${childBlock}`;
}

/** One operation's `.api-endpoint`, with every section the extractor knows. */
function endpoint(operationId: string): string {
  return [
    `<section class="api-endpoint" data-operation-id="${operationId}">`,
    `<div class="alert">Unstable ${operationId}</div>`,
    `<div class="api-endpoint__url-line"><code data-region="us">us host</code></div>`,
    `<h3 class="api-endpoint__overview-heading">Overview</h3>`,
    `<p>Description of ${operationId}.</p>`,
    `<div class="api-endpoint__permissions">perm</div>`,
    `<div class="api-endpoint__section" data-api-section="arguments">${row("page[size]")}</div>`,
    `<div class="api-endpoint__section" data-api-section="request">${row("data", row("id"))}${row("meta")}</div>`,
    `<div class="api-response">`,
    `<div class="api-response__panel api-response__panel--200">${row("data")}</div>`,
    `<div class="api-response__panel api-response__panel--404">not found</div>`,
    `</div>`,
    `<div class="api-code-example">`,
    `<button data-sync-key="curl" aria-controls="${operationId}-panel-0">Curl</button>`,
    `<button data-sync-key="go" aria-controls="${operationId}-panel-1">Go</button>`,
    `<div id="${operationId}-panel-0"><div data-region="us">curl us</div><div data-region="eu">curl eu</div></div>`,
    `<div id="${operationId}-panel-1">go code</div>`,
    `</div>`,
    `</section>`,
  ].join("");
}

function page(...versions: Array<"v1" | "v2">): string {
  const panels = versions.map(
    (version) =>
      `<div id="op-${version}" role="tabpanel">${endpoint(`Op${version}`)}</div>`,
  );
  const tabs = versions.map(
    (version) =>
      `<button role="tab" aria-controls="op-${version}">${version} (latest)</button>`,
  );
  return `<html><body><main><h1 class="api-page-header__title">Title</h1>${tabs.join("")}${panels.join("")}</main></body></html>`;
}

describe("extractApiFragment", () => {
  it("returns the overview: alerts, description, permissions, but no other section", () => {
    const fragment = extractApiFragment(page("v2"), { sections: ["overview"] });
    expect(fragment).toContain("Unstable Opv2");
    expect(fragment).toContain("<p>Description of Opv2.</p>");
    expect(fragment).toContain("api-endpoint__permissions");
    for (const excluded of ["url-line", "data-api-section", "api-response"])
      expect(fragment).not.toContain(excluded);
  });

  it("returns the requested sections in the given order", () => {
    const fragment = extractApiFragment(page("v2"), {
      sections: ["request", "arguments"],
    });
    expect(fragment.indexOf('data-api-section="request"')).toBeLessThan(
      fragment.indexOf('data-api-section="arguments"'),
    );
  });

  it("keeps only the us region of the curl example", () => {
    const fragment = extractApiFragment(page("v2"), { sections: ["curl"] });
    expect(fragment).toContain("curl us");
    expect(fragment).not.toContain("curl eu");
    expect(fragment).not.toContain("go code");
  });

  it("returns the page title and the endpoint's version tab for heading", () => {
    const fragment = extractApiFragment(page("v1", "v2"), {
      sections: ["heading"],
      version: "v1",
    });
    expect(fragment).toContain(">Title</h1>");
    expect(fragment).toContain("v1 (latest)");
    expect(fragment).not.toContain("v2 (latest)");
  });

  it("returns the code example's language tabs, without their panels", () => {
    const fragment = extractApiFragment(page("v2"), {
      sections: ["code-tabs"],
    });
    expect(fragment).toContain('data-sync-key="curl"');
    expect(fragment).toContain('data-sync-key="go"');
    expect(fragment).not.toContain("curl us");
    expect(fragment).not.toContain("go code");
  });

  it("narrows a schema section to one field and its nested rows", () => {
    const fragment = extractApiFragment(page("v2"), {
      sections: ["request"],
      field: "data",
    });
    expect(fragment).toContain('data-field-name="id"');
    expect(fragment).not.toContain('data-field-name="meta"');
  });

  it("narrows the response to one status code", () => {
    const fragment = extractApiFragment(page("v2"), {
      sections: ["response"],
      responseCode: "404",
    });
    expect(fragment).toContain("not found");
    expect(fragment).not.toContain("api-response__panel--200");
  });

  it("picks the endpoint for the given version on a multi-version page", () => {
    const fragment = extractApiFragment(page("v1", "v2"), {
      sections: ["overview"],
      version: "v1",
    });
    expect(fragment).toContain("Description of Opv1.");
    expect(fragment).not.toContain("Opv2");
  });

  it("throws when the page has several versions and none is given", () => {
    expect(() =>
      extractApiFragment(page("v1", "v2"), { sections: ["overview"] }),
    ).toThrow(/version/);
  });

  it("throws when a section, field or status code is missing", () => {
    const html = page("v2");
    expect(() =>
      extractApiFragment(
        html.replace(
          /<div class="api-code-example">.*<\/section>/,
          "</section>",
        ),
        {
          sections: ["curl"],
        },
      ),
    ).toThrow(/curl/);
    expect(() =>
      extractApiFragment(html, { sections: ["request"], field: "nope" }),
    ).toThrow(/nope/);
    expect(() =>
      extractApiFragment(html, { sections: ["response"], responseCode: "500" }),
    ).toThrow(/500/);
  });
  it("throws when a section listed as absent renders", () => {
    const html = page("v2");
    expect(() =>
      extractApiFragment(html, { sections: ["curl"], absent: ["arguments"] }),
    ).toThrow(/arguments/);
    const withoutArguments = html.replace(
      /<div class="api-endpoint__section" data-api-section="arguments">.*?<\/div><\/div>/,
      "",
    );
    expect(
      extractApiFragment(withoutArguments, {
        sections: ["curl"],
        absent: ["arguments"],
      }),
    ).toContain("curl us");
  });
});

/** One variant of a plaintext operation page, with every section the extractor knows. */
function plaintextVariant(version: "v1" | "v2"): string {
  return [
    `## ${version} (latest)`,
    "",
    '{% alert level="warning" %}',
    `Unstable ${version}`,
    "{% /alert %}",
    "",
    "| Datadog site | API endpoint |",
    "| --- | --- |",
    `| app.datadoghq.com | GET https://api.datadoghq.com/api/${version}/x |`,
    "",
    "### Overview",
    "",
    `Description of ${version}.`,
    "",
    "```bash",
    "### Response",
    "```",
    "",
    "### Arguments",
    "",
    "| Field | Type | Description |",
    "| --- | --- | --- |",
    "| page[size] | int64 | Size. |",
    "",
    "### Request",
    "",
    "| Parent field | Field | Type | Description |",
    "| --- | --- | --- | --- |",
    "| | data [*required*] | object | Data. |",
    "| data | id | string | ID. |",
    "| id | deep | string | Deep. |",
    "| | meta | object | Meta. |",
    "| | tags | object | Tags. |",
    "| additionalProperties | <any-key> | string | Tag. |",
    "| | last | string | Last. |",
    "",
    "### Response",
    "",
    "{% tabs %}",
    '{% tab label="200" %}',
    "OK",
    "{% tabs %}",
    '{% tab label="Model" %}',
    "model",
    "{% /tab %}",
    "{% /tabs %}",
    "{% /tab %}",
    "",
    '{% tab label="404" %}',
    "Not Found",
    "{% /tab %}",
    "{% /tabs %}",
    "",
    "### Code Example",
    "",
    "{% tabs %}",
    '{% tab label="Curl" %}',
    "```bash",
    "# Set your Datadog site",
    `curl https://api.datadoghq.com/api/${version}/x`,
    "```",
    "{% /tab %}",
    "",
    '{% tab label="Go" %}',
    "go code",
    "{% /tab %}",
    "{% /tabs %}",
    "",
  ].join("\n");
}

function plaintextPage(...versions: Array<"v1" | "v2">): string {
  return [
    "---",
    "title: X",
    "---",
    "",
    "# X",
    "",
    ...versions.map(plaintextVariant),
  ].join("\n");
}

describe("extractPlaintextFragment", () => {
  it("returns the overview with the status alert, but not the region table", () => {
    const fragment = extractPlaintextFragment(plaintextPage("v2"), {
      sections: ["overview"],
    });
    expect(fragment).toContain("Unstable v2");
    expect(fragment).toContain("Description of v2.");
    expect(fragment).not.toContain("Datadog site");
  });

  it("ignores section headings inside code fences", () => {
    const fragment = extractPlaintextFragment(plaintextPage("v2"), {
      sections: ["overview"],
    });
    expect(fragment).toContain("```bash\n### Response\n```");
    expect(fragment).not.toContain("### Arguments");
  });

  it("returns the region table for endpoint-url", () => {
    const fragment = extractPlaintextFragment(plaintextPage("v2"), {
      sections: ["endpoint-url"],
    });
    expect(fragment).toContain("| Datadog site | API endpoint |");
    expect(fragment).not.toContain("Unstable");
  });

  it("returns the requested sections in the given order", () => {
    const fragment = extractPlaintextFragment(plaintextPage("v2"), {
      sections: ["request", "arguments"],
    });
    expect(fragment.indexOf("### Request")).toBeLessThan(
      fragment.indexOf("### Arguments"),
    );
  });

  it("returns only the curl tab", () => {
    const fragment = extractPlaintextFragment(plaintextPage("v2"), {
      sections: ["curl"],
    });
    expect(fragment).toContain("curl https://api.datadoghq.com/api/v2/x");
    expect(fragment).not.toContain("go code");
  });

  it("returns the page title and the variant heading for heading", () => {
    const fragment = extractPlaintextFragment(plaintextPage("v1", "v2"), {
      sections: ["heading"],
      version: "v2",
    });
    expect(fragment).toBe("# X\n\n## v2 (latest)");
  });

  it("returns the code example's tab labels", () => {
    const fragment = extractPlaintextFragment(plaintextPage("v2"), {
      sections: ["code-tabs"],
    });
    expect(fragment).toBe('{% tab label="Curl" %}\n{% tab label="Go" %}');
  });

  it("narrows a schema table to one field and its nested rows", () => {
    const fragment = extractPlaintextFragment(plaintextPage("v2"), {
      sections: ["request"],
      field: "data",
    });
    expect(fragment).toContain("| Parent field | Field | Type | Description |");
    expect(fragment).toContain("| id | deep | string | Deep. |");
    expect(fragment).not.toContain("meta");
  });

  it("keeps a map's <any-key> row, whose parent cell reads additionalProperties", () => {
    const fragment = extractPlaintextFragment(plaintextPage("v2"), {
      sections: ["request"],
      field: "tags",
    });
    expect(fragment).toContain(
      "| additionalProperties | <any-key> | string | Tag. |",
    );
    expect(fragment).not.toContain("last");
  });

  it("narrows the response to one status code, keeping nested tabs whole", () => {
    const html = plaintextPage("v2");
    expect(
      extractPlaintextFragment(html, {
        sections: ["response"],
        responseCode: "404",
      }),
    ).toBe('{% tab label="404" %}\nNot Found\n{% /tab %}');
    expect(
      extractPlaintextFragment(html, {
        sections: ["response"],
        responseCode: "200",
      }),
    ).toContain("model\n{% /tab %}\n{% /tabs %}\n{% /tab %}");
  });

  it("picks the variant for the given version, and requires one on a multi-version page", () => {
    const md = plaintextPage("v2", "v1");
    expect(
      extractPlaintextFragment(md, { sections: ["overview"], version: "v1" }),
    ).toContain("Description of v1.");
    expect(() =>
      extractPlaintextFragment(md, { sections: ["overview"] }),
    ).toThrow(/version/);
  });

  it("throws when a section, field or status code is missing", () => {
    const md = plaintextPage("v2");
    expect(() =>
      extractPlaintextFragment(md.replace("### Arguments", "### Nope"), {
        sections: ["arguments"],
      }),
    ).toThrow(/arguments/);
    expect(() =>
      extractPlaintextFragment(md, { sections: ["request"], field: "nope" }),
    ).toThrow(/nope/);
    expect(() =>
      extractPlaintextFragment(md, {
        sections: ["response"],
        responseCode: "500",
      }),
    ).toThrow(/500/);
  });

  it("throws when a section listed as absent is present", () => {
    const md = plaintextPage("v2");
    expect(() =>
      extractPlaintextFragment(md, {
        sections: ["curl"],
        absent: ["arguments"],
      }),
    ).toThrow(/arguments/);
    expect(
      extractPlaintextFragment(md.replace("### Arguments", "### Nope"), {
        sections: ["curl"],
        absent: ["arguments"],
      }),
    ).toContain("curl https://api.datadoghq.com/api/v2/x");
  });
});

describe("extractApiFragment on rendered pages", () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
    container.addServerRenderer({
      renderer: preactRenderer,
      name: "@astrojs/preact",
    });
  });

  async function renderOperation(category: string, operation: string) {
    return container.renderToString(OperationPage, {
      params: { category, operation },
      request: new Request(
        `http://localhost:4321/api/latest/${category}/${operation}/`,
      ),
    });
  }

  it.each<[string, string, ApiSection[]]>([
    [
      "usage-metering",
      "get-hourly-usage-for-lambda",
      ["overview", "endpoint-url", "arguments", "response", "curl"],
    ],
    ["incidents", "create-an-incident", ["request"]],
  ])("finds every section on %s/%s", async (category, operation, sections) => {
    const html = await renderOperation(category, operation);
    for (const section of sections)
      expect(
        extractApiFragment(html, { sections: [section] }),
        section,
      ).not.toBe("");
  });
});
