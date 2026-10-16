import { describe, expect, it } from "vitest";
import { extractHtmlChunks, stripToContent } from "./extractHtml.ts";

function page(mainApi: string): string {
  return `<!doctype html><html><head><title>Validate API key</title>
<script>var x = 1;</script><style>body {}</style></head><body>
<div class="main-nav-wrapper"><nav class="main-nav"><a href="/">Product</a></nav></div>
<div class="container container__content"><div class="row">
<div class="side"><aside class="sidenav sidenav-api"><a>Authentication</a></aside></div>
<div class="col-12 col-lg-9 main-api">${mainApi}</div>
</div></div>
<footer><nav class="footer-nav">Footer links</nav></footer>
</body></html>`;
}

function chunksOf(mainApi: string) {
  return extractHtmlChunks(stripToContent(page(mainApi)));
}

describe("stripToContent", () => {
  it("keeps the title and the content area, and drops the navs and footer", () => {
    const stripped = stripToContent(page("<p>Check the key.</p>"));
    expect(stripped).toContain("<title>Validate API key</title>");
    expect(stripped).toContain("<p>Check the key.</p>");
    expect(stripped).not.toContain("Product");
    expect(stripped).not.toContain("Authentication");
    expect(stripped).not.toContain("Footer links");
    expect(stripped).not.toContain("var x");
  });

  it("drops page chrome inside the content area", () => {
    const stripped = stripToContent(
      page(`<div class="api-toolbar">Docs &gt; API Reference</div>
<div id="page-copy-btn"><span id="page-copy-text">Copy page</span></div>
<picture><img src="x.png"></picture><svg><title>Icon</title></svg>
<p class="expand-all js-expand-all">Expand All</p>
<div class="code-button-wrapper"><button class="btn js-copy-button">Copy</button></div>
<h5><button class="btn btn-link" disabled>Validate API key</button></h5>`),
    );
    expect(stripped).not.toMatch(/Docs &gt;|Copy|Icon|Expand All|<img/);
    expect(stripped).toContain("Validate API key</button>");
  });

  it("uses only the head title, not titles inside icons", () => {
    const stripped = stripToContent(
      page("<p>Body.</p>").replace(
        "<body>",
        "<body><svg><title>White modal up arrow</title></svg>",
      ),
    );
    expect(stripped).toContain("<title>Validate API key</title>");
    expect(stripped).not.toContain("White modal");
  });

  it("throws when the page has no content area", () => {
    expect(() => stripToContent("<html><body><p>x</p></body></html>")).toThrow(
      /main-api/,
    );
  });
});

describe("extractHtmlChunks", () => {
  it("chunks headings and paragraphs with normalized, collapsed text", () => {
    expect(
      chunksOf(`<h3 class="mt-2">Overview</h3>
<p>Check if the API key isn’t
   valid.</p>`),
    ).toEqual([
      { kind: "heading", text: "Overview", context: "" },
      {
        kind: "paragraph",
        text: "Check if the API key isn't valid.",
        context: "",
      },
    ]);
  });

  it("chunks a schema row with its cells", () => {
    const [row] = chunksOf(`<div class="row table-row first-row">
<div class="col-4 column"><p class="key table-cell">errors&nbsp;[<em>required</em>]</p></div>
<div class="col-2 column"><p class="table-cell">[string]</p></div>
<div class="col-6 column"><p class="table-cell">Array of errors.</p></div></div>`);
    expect(row).toEqual({
      kind: "tableRow",
      text: "errors [required] | [string] | Array of errors.",
      cells: ["errors [required]", "[string]", "Array of errors."],
      field: "errors [required]",
      context: "",
    });
  });

  it("separates blocks inside a cell with a space", () => {
    const [row] = chunksOf(`<div class="row table-row">
<div class="col-4 column"><p class="table-cell">type</p></div>
<div class="col-2 column"><p class="table-cell">enum</p></div>
<div class="col-6 column"><p class="table-cell">Allowed enum values: <code>account</code></p><p>default: <code>account</code></p></div></div>`);
    expect(row.cells?.[2]).toBe(
      "Allowed enum values: account default: account",
    );
  });

  it("keeps enum values hidden behind Show more, without the toggle text", () => {
    const [row] = chunksOf(`<div class="row table-row">
<div class="column"><p class="table-cell">aggregation</p></div>
<div class="column"><p class="table-cell">enum</p></div>
<div class="column"><p class="table-cell">Allowed enum values: <code>count,min</code></p><details class="enum-details"><summary class="enum-summary">Show 2 more</summary><code>,max,avg</code></details></div></div>`);
    expect(row.cells?.[2]).toBe("Allowed enum values: count,min ,max,avg");
  });

  it("drops chrome left in an older cache", () => {
    expect(
      extractHtmlChunks(
        '<div class="main-api"><p>Body.</p><p class="expand-all">Expand All</p></div>',
      ).map((chunk) => chunk.text),
    ).toEqual(["Body."]);
  });

  it("gives schema rows their field, prefixed with the parent field when nested", () => {
    const rows =
      chunksOf(`<div class="row hasChildData"><div class="col-12 first-column">
<div class="row table-row"><div class="column"><p class="table-cell">data&nbsp;[<em>required</em>]</p></div><div class="column"><p>object</p></div></div>
<div class="row isNested"><div class="col-12">
<div class="row hasChildData"><div class="col-12 first-column">
<div class="row table-row"><div class="column"><p class="table-cell">attributes</p></div><div class="column"><p>object</p></div></div>
<div class="row isNested"><div class="col-12">
<div class="row table-row"><div class="column"><p class="table-cell">name [required]</p></div><div class="column"><p>string</p></div></div>
</div></div></div></div>
<div class="row table-row"><div class="column"><p class="table-cell">id</p></div><div class="column"><p>string</p></div></div>
</div></div></div></div>`);
    expect(rows.map((row) => row.field)).toEqual([
      "data [required]",
      "data.attributes",
      "attributes.name [required]",
      "data.id",
    ]);
  });

  it("skips schema table headers", () => {
    expect(
      chunksOf(`<div class="row table-header">
<div class="col-4 column"><p class="font-semibold">Field</p></div></div>`),
    ).toEqual([]);
  });

  it("chunks HTML table rows", () => {
    expect(
      chunksOf(
        "<table><tr><th>Name</th><th>Type</th></tr><tr><td>id</td><td>string</td></tr></table>",
      ).map((chunk) => chunk.text),
    ).toEqual(["Name | Type", "id | string"]);
  });

  it("chunks each endpoint region as its own chunk", () => {
    expect(
      chunksOf(
        `<p class="api-url-info"><span class="api-method">GET</span>&nbsp;<span class="api-url-pattern d-none" data-region="ap1">https://api.ap1.datadoghq.com/api/v1/validate</span><span class="api-url-pattern d-none" data-region="us">https://api.datadoghq.com/api/v1/validate</span></p>`,
      ),
    ).toEqual([
      {
        kind: "endpoint",
        text: "GET https://api.ap1.datadoghq.com/api/v1/validate",
        context: "ap1",
      },
      {
        kind: "endpoint",
        text: "GET https://api.datadoghq.com/api/v1/validate",
        context: "us",
      },
    ]);
  });

  it("keeps only the us region inside code, like Hugo's .md", () => {
    const [code] = chunksOf(
      `<pre class="chroma"><code><span class="s1">"<span class="d-none" data-region="us">datadoghq.com</span><span class="d-none" data-region="eu">datadoghq.eu</span>"</span> python3 "example.py"</code></pre>`,
    );
    expect(code).toEqual({
      kind: "code",
      text: '"datadoghq.com" python3 "example.py"',
      context: "",
    });
  });

  it("breaks code lines at <br>", () => {
    const [code] = chunksOf(
      '<pre><code><span class="c1"># Curl command</span><br><span class="n">curl</span> -X GET</code></pre>',
    );
    expect(code.text).toBe("# Curl command curl -X GET");
  });

  it("leaves badges out of headings, since the outline diff compares them", () => {
    const [heading] = chunksOf(
      '<h2 id="get-tag-filters"><a href="/x/">Get all AWS tag filters <span class="fs-4">→</span></a>\n<span class="badge bg-warning">deprecated</span></h2>',
    );
    expect(heading.text).toBe("Get all AWS tag filters →");
  });

  it("chunks tab labels separately from content", () => {
    expect(
      chunksOf(`<ul class="nav nav-tabs code-lang-list-container">
<li class="nav-item"><a class="nav-link" href="?code-lang=curl#">Curl</a></li>
<li class="nav-item"><a class="nav-link" href="?code-lang=python#">Python</a></li></ul>`),
    ).toEqual([
      { kind: "tab", text: "Curl", context: "" },
      { kind: "tab", text: "Python", context: "" },
    ]);
  });

  it("chunks a list item without its nested list, which is chunked on its own", () => {
    expect(
      chunksOf(
        "<ul><li><p>Outer item</p><ul><li>Inner item</li></ul></li></ul>",
      ),
    ).toEqual([
      { kind: "listItem", text: "Outer item", context: "" },
      { kind: "listItem", text: "Inner item", context: "" },
    ]);
  });

  it("chunks loose text and inline elements between blocks as a paragraph", () => {
    expect(
      chunksOf(
        "<div><ul><li>Item.</li></ul>This endpoint requires <code>monitors_write</code>:<li>monitors_write</li></div>",
      ),
    ).toEqual([
      { kind: "listItem", text: "Item.", context: "" },
      {
        kind: "paragraph",
        text: "This endpoint requires monitors_write:",
        context: "",
        loose: true,
      },
      { kind: "listItem", text: "monitors_write", context: "" },
    ]);
  });

  it("records the enclosing tab panes and code language as context", () => {
    const chunks =
      chunksOf(`<div class="tab-pane active" id="validate-api-key-v1">
<div class="tab-pane" id="Validate-403-v1"><div class="tab-pane" id="Validate-403-model"><p>Error response object.</p></div></div>
<div class="code-snippet-wrapper js-code-block" data-code-lang-block="python"><h4>Instructions</h4></div></div>`);
    expect(chunks.map((chunk) => chunk.context)).toEqual([
      "validate-api-key-v1 > Validate-403-v1 > Validate-403-model",
      "validate-api-key-v1 > python",
    ]);
  });
});
