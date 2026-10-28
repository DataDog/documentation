import { describe, it, expect } from "vitest";
import schema from "../../markdoc.schema.mjs";

describe("img tag schema validate()", () => {
  const validate = schema.tags.img.validate;

  it("errors when widthPercent is combined with width", () => {
    const errors = validate({ attributes: { widthPercent: 40, width: "22" } });
    expect(errors).toHaveLength(1);
    expect(errors[0].level).toBe("error");
  });

  it("errors when widthPercent is combined with height", () => {
    const errors = validate({ attributes: { widthPercent: 40, height: "22" } });
    expect(errors).toHaveLength(1);
    expect(errors[0].level).toBe("error");
  });

  it("errors when widthPercent is combined with both width and height", () => {
    const errors = validate({
      attributes: { widthPercent: 40, width: "22", height: "22" },
    });
    expect(errors).toHaveLength(1);
  });

  it("allows widthPercent alone", () => {
    const errors = validate({ attributes: { widthPercent: 40 } });
    expect(errors).toHaveLength(0);
  });

  it("allows width/height alone", () => {
    const errors = validate({ attributes: { width: "22", height: "22" } });
    expect(errors).toHaveLength(0);
  });

  it("allows none of the three sizing attributes", () => {
    const errors = validate({ attributes: {} });
    expect(errors).toHaveLength(0);
  });

  it("errors when video is combined with caption", () => {
    const errors = validate({
      attributes: { video: true, caption: "A caption" },
    });
    expect(errors).toHaveLength(1);
    expect(errors[0].level).toBe("error");
  });

  it("allows video without caption", () => {
    const errors = validate({ attributes: { video: true } });
    expect(errors).toHaveLength(0);
  });

  it("allows caption without video", () => {
    const errors = validate({ attributes: { caption: "A caption" } });
    expect(errors).toHaveLength(0);
  });
});
