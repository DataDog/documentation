import { describe, it, expect } from "vitest";
import { BannerParamsSchema } from "./bannerData";

describe("BannerParamsSchema", () => {
  it("keeps hide_on_mobile instead of stripping it", () => {
    const parsed = BannerParamsSchema.parse({
      desktop_message: "Desktop only",
      hide_on_mobile: true,
    });
    expect(parsed.hide_on_mobile).toBe(true);
  });

  it("rejects a non-boolean hide_on_mobile", () => {
    expect(() => BannerParamsSchema.parse({ hide_on_mobile: "yes" })).toThrow();
  });
});
