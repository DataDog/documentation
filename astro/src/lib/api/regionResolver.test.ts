import { describe, it, expect } from "vitest";
import {
  getDefaultRegions,
  getRegions,
  buildApiUrl,
  buildApiUrlFromServers,
} from "@lib/api/regionResolver";

describe("getDefaultRegions", () => {
  it("gives every region a key, label and site domain", () => {
    for (const region of getDefaultRegions()) {
      expect(region.key, `key ${region.key}`).toMatch(/^[a-z][a-z0-9]*$/);
      expect(region.label.length, `label on ${region.key}`).toBeGreaterThan(0);
      expect(region.site, `site on ${region.key}`).toMatch(
        /^[a-z0-9.-]+\.[a-z]+$/,
      );
    }
  });

  // Membership only. `getDefaultRegions` is a projection of
  // `getAllowedRegions` and does no sorting of its own, so asserting order
  // here would compare the list against itself — weight ordering is covered in
  // `config/regions.test.ts`, where the sort happens.
  //
  // Sorted on both sides so this fails for a missing or added region, not for
  // a reordering it does not control.
  it("exposes every region in shared/regions.yaml", () => {
    // Update when a data center is added.
    expect(
      getDefaultRegions()
        .map((r) => r.key)
        .sort(),
    ).toEqual(["ap1", "ap2", "eu", "gov", "gov2", "uk1", "us", "us3", "us5"]);
  });
});

describe("getRegions", () => {
  it("filters by the spec server enum", () => {
    const spec = {
      servers: [
        {
          url: "https://{subdomain}.{site}",
          variables: {
            site: {
              default: "datadoghq.com",
              enum: ["datadoghq.com", "datadoghq.eu"],
            },
            subdomain: { default: "api" },
          },
        },
      ],
    };
    const regions = getRegions(spec);
    expect(regions.map((r) => r.key)).toEqual(["us", "eu"]);
  });

  it("prefers per-operation servers when present", () => {
    const spec = {
      servers: [
        {
          url: "https://{subdomain}.{site}",
          variables: {
            site: {
              default: "datadoghq.com",
              enum: ["datadoghq.com", "datadoghq.eu"],
            },
          },
        },
      ],
    };
    const operation = {
      servers: [
        {
          url: "https://{subdomain}.{site}",
          variables: {
            site: { default: "datadoghq.com", enum: ["datadoghq.com"] },
          },
        },
      ],
    };
    const regions = getRegions(spec, operation);
    expect(regions.map((r) => r.key)).toEqual(["us"]);
  });

  it("returns all allowed regions when no server enum is defined", () => {
    const regions = getRegions({});
    expect(regions.length).toBeGreaterThan(1);
  });

  // Pass 2 — the enum lists fully-qualified per-region hosts rather than bare
  // site domains. Five live operations do this. Before the fallback existed,
  // the intersection was empty and these rendered no regions at all.
  describe("fully-qualified host enums (exact_domains fallback)", () => {
    const oncallServers = [
      {
        url: "https://{site}",
        variables: {
          site: {
            default: "navy.oncall.datadoghq.com",
            enum: [
              "lava.oncall.datadoghq.com",
              "saffron.oncall.datadoghq.com",
              "navy.oncall.datadoghq.com",
              "coral.oncall.datadoghq.com",
              "teal.oncall.datadoghq.com",
              "beige.oncall.datadoghq.eu",
              "scarlet.oncall.datadoghq.com",
            ],
          },
        },
      },
    ];

    it("resolves on-call hosts to every region, in weight order", () => {
      // Every region has an on-call host, so the result is the full list in
      // its canonical order — compared against the source rather than respelled.
      const regions = getRegions({}, { servers: oncallServers });
      expect(regions.map((r) => r.key)).toEqual(
        getDefaultRegions().map((r) => r.key),
      );
    });

    it("keeps every region sharing one host", () => {
      // us, gov and gov2 all list navy.oncall.datadoghq.com. Matching by
      // building a host-to-region map would keep only the last of the three.
      const regions = getRegions(
        {},
        {
          servers: [
            {
              url: "https://{site}",
              variables: {
                site: {
                  default: "navy.oncall.datadoghq.com",
                  enum: ["navy.oncall.datadoghq.com"],
                },
              },
            },
          ],
        },
      );
      expect(regions.map((r) => r.key)).toEqual(["us", "gov", "gov2"]);
    });

    it("resolves browser-intake hosts, omitting regions with none", () => {
      const regions = getRegions(
        {},
        {
          servers: [
            {
              url: "https://{site}",
              variables: {
                site: {
                  default: "browser-intake-datadoghq.com",
                  enum: [
                    "browser-intake-datadoghq.com",
                    "browser-intake-us3-datadoghq.com",
                    "browser-intake-us5-datadoghq.com",
                    "browser-intake-ap1-datadoghq.com",
                    "browser-intake-ap2-datadoghq.com",
                    "browser-intake-datadoghq.eu",
                  ],
                },
              },
            },
          ],
        },
      );
      // uk1 has a browser-intake host defined but the spec enum omits it;
      // gov and gov2 have none at all.
      expect(regions.map((r) => r.key)).toEqual([
        "us",
        "us3",
        "us5",
        "eu",
        "ap1",
        "ap2",
      ]);
    });

    it("does not run the fallback when a bare domain already matched", () => {
      // A mixed enum must resolve by domain only. Falling through would add
      // regions the Hugo site does not show for the operation.
      const regions = getRegions(
        {},
        {
          servers: [
            {
              url: "https://{subdomain}.{site}",
              variables: {
                site: {
                  default: "datadoghq.com",
                  enum: ["datadoghq.com", "navy.oncall.datadoghq.com"],
                },
                subdomain: { default: "api" },
              },
            },
          ],
        },
      );
      expect(regions.map((r) => r.key)).toEqual(["us"]);
    });

    it("returns no regions for an enum matching neither pass", () => {
      const regions = getRegions(
        {},
        {
          servers: [
            {
              url: "https://{site}",
              variables: {
                site: { default: "nope.example", enum: ["nope.example"] },
              },
            },
          ],
        },
      );
      expect(regions).toEqual([]);
    });

    it("builds the endpoint URL from the fully-qualified host", () => {
      // These templates carry no {subdomain}, so the host is used verbatim.
      expect(
        buildApiUrlFromServers(
          oncallServers,
          "beige.oncall.datadoghq.eu",
          "/api/v2/on-call/pages",
        ),
      ).toBe("https://beige.oncall.datadoghq.eu/api/v2/on-call/pages");
    });
  });
});

describe("buildApiUrl", () => {
  it("constructs a URL with default subdomain", () => {
    expect(buildApiUrl("datadoghq.com", "/api/v1/dashboard")).toBe(
      "https://api.datadoghq.com/api/v1/dashboard",
    );
  });

  it("constructs a URL with custom subdomain", () => {
    expect(buildApiUrl("datadoghq.eu", "/api/v2/logs", "logs")).toBe(
      "https://logs.datadoghq.eu/api/v2/logs",
    );
  });
});

describe("buildApiUrlFromServers", () => {
  it("resolves {subdomain} and {site} from a server template", () => {
    const servers = [
      {
        url: "https://{subdomain}.{site}",
        variables: {
          subdomain: { default: "api" },
          site: { default: "datadoghq.com" },
        },
      },
    ];
    expect(
      buildApiUrlFromServers(servers, "datadoghq.eu", "/api/v1/users"),
    ).toBe("https://api.datadoghq.eu/api/v1/users");
  });

  it("falls back to api.<site><path> when servers are missing", () => {
    expect(
      buildApiUrlFromServers(undefined, "datadoghq.com", "/api/v1/foo"),
    ).toBe("https://api.datadoghq.com/api/v1/foo");
  });
});
