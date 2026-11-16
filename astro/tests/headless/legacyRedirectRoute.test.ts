import { describe, it, expect, beforeAll } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import LegacyRedirectPage from "../../src/pages/[...lang]/api/[...legacyPath].astro";

const BASE_URL = "http://localhost:4321";

let container: Awaited<ReturnType<typeof AstroContainer.create>>;

beforeAll(async () => {
  container = await AstroContainer.create();
});

describe("legacy redirect route", () => {
  // Astro's static redirect stub waits 2 seconds before following a 302 and
  // 0 seconds for anything else, so a 302 leaves the "Redirecting from..."
  // message on screen.
  it("redirects permanently, so the static stub follows immediately", async () => {
    const response = await container.renderToResponse(LegacyRedirectPage, {
      params: { legacyPath: "screenboards" },
      props: { to: "/api/latest/dashboards/" },
      request: new Request(`${BASE_URL}/api/screenboards/`),
    });

    expect(response.status).toBe(301);
    expect(response.headers.get("Location")).toBe("/api/latest/dashboards/");
  });
});
