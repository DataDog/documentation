import { describe, it, expect } from "vitest";
// @ts-ignore — plain CommonJS module, no types
import hugoConfigDocs from "@hugo-site/assets/scripts/config/config-docs.js";
import { SITE_ENVS } from "@lib/site/siteEnv";
import { getTypesenseConfig } from "./typesense";

describe("getTypesenseConfig", () => {
  it("queries the live cluster only from the live site", () => {
    const live = getTypesenseConfig("live");
    expect(getTypesenseConfig("preview").host).not.toBe(live.host);
    expect(getTypesenseConfig("development").host).not.toBe(live.host);
  });
});

describe("parity with upstream config-docs.js", () => {
  // The connection table is a copy, so drift is the failure mode: upstream
  // rotates a key or moves a cluster and this site keeps querying the old one.
  // Delete this test when config-docs.js goes away.
  const upstream = hugoConfigDocs as Record<
    string,
    {
      typesense: {
        host: string;
        public_key: string;
        docsIndex: string;
        partnersIndex: string;
      };
    }
  >;

  it.each(SITE_ENVS)("matches upstream %s", (env) => {
    const config = getTypesenseConfig(env);
    const expected = upstream[env].typesense;
    expect(config.host).toBe(expected.host);
    expect(config.publicKey).toBe(expected.public_key);
    expect(config.docsIndex).toBe(expected.docsIndex);
    expect(config.partnersIndex).toBe(expected.partnersIndex);
  });
});
