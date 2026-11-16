import { describe, it, expect } from "vitest";
import { ASK_AI_ENVS } from "@dd/ask-ai";
import { SITE_ENVS } from "@lib/site/siteEnv";

/**
 * The Ask AI package declares its own environment union because a package under
 * `shared/` cannot import from Astro's source tree. This is the guard on that
 * duplication: the package keys its credentials table by those values, and this
 * site sets `data-env` from `SITE_ENVS`, so a divergence would silently send
 * one environment's traffic to another's backend.
 */
describe("Ask AI environments", () => {
  it("match the site's, element for element", () => {
    expect([...ASK_AI_ENVS]).toEqual([...SITE_ENVS]);
  });
});
