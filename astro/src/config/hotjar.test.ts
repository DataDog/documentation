import { describe, it, expect } from "vitest";
import { getHotjarSiteId } from "./hotjar";

describe("getHotjarSiteId", () => {
  it("has no site ID in development, so Hotjar never fires locally", () => {
    expect(getHotjarSiteId("development")).toBeUndefined();
  });

  it("matches the IDs in hugo/config/{live,preview}/params.yaml", () => {
    expect(getHotjarSiteId("live")).toBe(1021060);
    expect(getHotjarSiteId("preview")).toBe(1022108);
  });
});
