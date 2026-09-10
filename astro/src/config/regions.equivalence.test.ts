/**
 * One-shot equivalence check: `shared/regions.yaml` must agree with the Hugo
 * files it was generated from.
 *
 * While both sites run, the region data lives in two places on purpose — the
 * Hugo phase of this work mounts the shared file as Hugo data and deletes the
 * copies. Until then this test is the guard that the copy stayed faithful.
 *
 * Delete this file when Hugo starts reading `shared/regions.yaml` directly.
 * At that point there is only one copy and there is nothing to compare.
 *
 * The three exceptions in KNOWN_FILLS are gaps in `regions.config.js` that
 * the shared file fills, because the schema requires every key for every
 * region. See the comment on each.
 */
import { parse as parseYaml } from "yaml";
import { describe, expect, it } from "vitest";
import regionsConfig from "@hugo-site/assets/scripts/config/regions.config.js";
import PARAMS_YAML_RAW from "@hugo-site/config/_default/params.yaml?raw";
import REGIONS_YAML_RAW from "@shared/regions.yaml?raw";

interface SharedRegion {
  key: string;
  label: string;
  weight: number;
  domain: string;
  exact_domains: string[];
  values: Record<string, string>;
}

interface HugoAllowedRegion {
  name: string;
  value: string;
  weight: number;
  domain: string;
  exact_domains?: string[];
}

/**
 * Values absent from `regions.config.js` that the shared file supplies.
 *
 * US3 has no TCP endpoint at all — `tcp_endpoint.us3` says so — so the ports
 * use the same not-supported wording every other unsupported region uses.
 * `goose_mcp_install_deeplink` has no US2-FED deeplink, matching US1-FED.
 */
const KNOWN_FILLS: Record<string, string> = {
  "us3.tcp_endpoint_port": "The US3 TCP endpoint port is not supported.",
  "us3.tcp_endpoint_port_ssl": "The US3 TCP endpoint port is not supported.",
  "gov2.goose_mcp_install_deeplink": "N/A",
};

const shared = parseYaml(REGIONS_YAML_RAW) as { regions: SharedRegion[] };
const hugoParams = parseYaml(PARAMS_YAML_RAW) as {
  allowedRegions: HugoAllowedRegion[];
};
const rc = regionsConfig as Record<string, unknown>;
const valueKeys = Object.keys(rc).filter((k) => k !== "allowedRegions");

describe("shared/regions.yaml matches the Hugo sources", () => {
  it("has the same regions as params.yaml, in the same order", () => {
    // Both are weight-sorted, so index comparison is meaningful.
    const sharedByWeight = [...shared.regions].sort(
      (a, b) => a.weight - b.weight,
    );
    const hugoByWeight = [...hugoParams.allowedRegions].sort(
      (a, b) => a.weight - b.weight,
    );

    expect(sharedByWeight.map((r) => r.key)).toEqual(
      hugoByWeight.map((r) => r.value),
    );
  });

  it("carries the same identity fields as params.yaml", () => {
    const hugoByKey = new Map(
      hugoParams.allowedRegions.map((r) => [r.value, r]),
    );

    for (const region of shared.regions) {
      const hugo = hugoByKey.get(region.key);
      expect(
        hugo,
        `region ${region.key} missing from params.yaml`,
      ).toBeDefined();
      expect({
        label: region.label,
        weight: region.weight,
        domain: region.domain,
        exactDomains: region.exact_domains,
      }).toEqual({
        label: hugo!.name,
        weight: hugo!.weight,
        domain: hugo!.domain,
        exactDomains: hugo!.exact_domains ?? [],
      });
    }
  });

  it("reproduces every value in regions.config.js exactly", () => {
    const sharedByKey = new Map(shared.regions.map((r) => [r.key, r]));
    const mismatches: string[] = [];

    for (const valueKey of valueKeys) {
      const perRegion = rc[valueKey] as Record<string, string>;
      for (const [regionKey, want] of Object.entries(perRegion)) {
        const got = sharedByKey.get(regionKey)?.values[valueKey];
        if (got !== want) {
          mismatches.push(
            `${regionKey}.${valueKey}: ${JSON.stringify(got)} != ${JSON.stringify(want)}`,
          );
        }
      }
    }

    expect(mismatches).toEqual([]);
  });

  it("adds no values beyond the documented fills", () => {
    const extras: string[] = [];

    for (const region of shared.regions) {
      for (const valueKey of Object.keys(region.values)) {
        const perRegion = rc[valueKey] as Record<string, string> | undefined;
        if (perRegion === undefined) {
          extras.push(
            `${region.key}.${valueKey} (key absent from regions.config.js)`,
          );
          continue;
        }
        if (!(region.key in perRegion)) {
          const id = `${region.key}.${valueKey}`;
          if (KNOWN_FILLS[id] === undefined) {
            extras.push(id);
          } else {
            expect(region.values[valueKey], `fill ${id}`).toBe(KNOWN_FILLS[id]);
          }
        }
      }
    }

    expect(extras).toEqual([]);
  });

  it("defines every value key for every region", () => {
    const gaps: string[] = [];
    for (const region of shared.regions) {
      for (const valueKey of valueKeys) {
        if (!(valueKey in region.values))
          gaps.push(`${region.key}.${valueKey}`);
      }
    }
    expect(gaps).toEqual([]);
  });

  it("keeps leading zeros on values that look numeric", () => {
    // "065115117704" parses as a number and loses its zero if left unquoted
    // in YAML. This is the specific bug the generated file had to avoid.
    const gov = shared.regions.find((r) => r.key === "gov");
    expect(gov?.values.aws_customer_access_govcloud_id).toBe("065115117704");
  });

  it("keeps every value a string, ports included", () => {
    const nonStrings: string[] = [];
    for (const region of shared.regions) {
      for (const [valueKey, value] of Object.entries(region.values)) {
        if (typeof value !== "string") {
          nonStrings.push(`${region.key}.${valueKey} is ${typeof value}`);
        }
      }
    }
    expect(nonStrings).toEqual([]);
  });
});
