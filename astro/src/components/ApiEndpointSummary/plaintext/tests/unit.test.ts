import { describe, it, expect } from "vitest";
import { apiEndpointSummaryNodes } from "../ApiEndpointSummary";
import { buildMarkdocStr } from "@lib/plaintext/helpers";

const baseStub = {
  operationId: "GetDashboard",
  summary: "Get a dashboard",
  slug: "get-a-dashboard",
  menuOrder: 1,
  versions: ["v1" as const],
  method: "GET",
  deprecated: false,
  unstable: false,
  regionUrls: {
    us: "https://api.datadoghq.com/api/v1/dashboard/{dashboard_id}",
    eu: "https://api.datadoghq.eu/api/v1/dashboard/{dashboard_id}",
  },
};

const href = "/api/latest/dashboards/get-a-dashboard/";

function render(stub = baseStub): string {
  return buildMarkdocStr(apiEndpointSummaryNodes(stub, href));
}

describe("apiEndpointSummaryNodes", () => {
  it("renders a heading linking to the endpoint page", () => {
    const md = render();
    expect(md).toContain(
      "## [Get a dashboard](/api/latest/dashboards/get-a-dashboard/)",
    );
  });

  it("renders a region URL table with a row per supported region", () => {
    const md = render();
    expect(md).toContain("Datadog site");
    expect(md).toContain("API endpoint");
    expect(md).toMatch(
      /app\.datadoghq\.com.*\*\*GET\*\* https:\/\/api\.datadoghq\.com\/api\/v1\/dashboard\/\{dashboard_id\}/,
    );
    expect(md).toMatch(
      /app\.datadoghq\.eu.*\*\*GET\*\* https:\/\/api\.datadoghq\.eu\/api\/v1\/dashboard\/\{dashboard_id\}/,
    );
  });

  it("notes deprecation in the heading", () => {
    const md = render({ ...baseStub, deprecated: true });
    expect(md.toLowerCase()).toContain("deprecated");
  });

  it("notes preview status in the heading", () => {
    const md = render({ ...baseStub, unstable: true });
    expect(md.toLowerCase()).toContain("preview");
  });
});
