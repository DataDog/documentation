import { describe, it, expect } from "vitest";
import { getCdocsLinkTargets } from "./linkTargets";

describe("getCdocsLinkTargets", () => {
  it("checks values against each cdocs page's own options", async () => {
    const target = (await getCdocsLinkTargets()).get(
      "dd_e2e/cdocs/custom_instrumentation",
    );

    expect(target?.traitIds).toEqual(["prog_lang", "api_type"]);
    expect(target?.showsValues({ prog_lang: "python" })).toBe(true);
    expect(target?.showsValues({ prog_lang: "cobol" })).toBe(false);
  });
});
