import { describe, it, expect } from "vitest";
import { getHotjarSiteId } from "./hotjar";

describe("getHotjarSiteId", () => {
  it("has no site ID in development, so Hotjar never fires locally", () => {
    expect(getHotjarSiteId("development")).toBeUndefined();
  });

  it("uses a separate Hotjar site for live and preview", () => {
    expect(getHotjarSiteId("live")).toBe(1021060);
    expect(getHotjarSiteId("preview")).toBe(1022108);
  });
});
