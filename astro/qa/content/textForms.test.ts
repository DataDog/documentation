import { describe, expect, it } from "vitest";
import {
  locationKeyOf,
  type ContentUnit,
  type UnitLocation,
} from "./extractUnits.ts";
import { applyTextForms } from "./textForms.ts";

const model: UnitLocation = {
  version: "v1",
  section: "response",
  responseCode: "200",
  panel: "model",
};

function row(text: string, location: UnitLocation = model): ContentUnit {
  return {
    kind: "tableRow",
    location,
    locationKey: locationKeyOf(location),
    text,
    field: text.split(" | ")[0],
  };
}

describe("applyTextForms", () => {
  it("rewrites Hugo's enum list into Astro's form", () => {
    const { hugoUnits } = applyTextForms(
      [row("type | enum | Type. Allowed enum values: asc,desc")],
      [],
    );
    expect(hugoUnits[0].text).toBe(
      "type | enum | Type. Allowed values: asc, desc.",
    );
  });

  it("moves Hugo's deprecated prefix to Astro's trailing marker", () => {
    const { hugoUnits } = applyTextForms(
      [row("is_read_only | boolean | DEPRECATED: Whether it is read-only.")],
      [],
    );
    expect(hugoUnits[0].text).toBe(
      "is_read_only | boolean | Whether it is read-only. Deprecated.",
    );
  });

  it("drops the space in Hugo's array-of-oneOf type", () => {
    const { hugoUnits } = applyTextForms(
      [row("requests | [ <oneOf>] | Requests.")],
      [],
    );
    expect(hugoUnits[0].text).toBe("requests | [<oneOf>] | Requests.");
  });

  it("keeps the raw text so findings can still quote the source", () => {
    const { hugoUnits } = applyTextForms(
      [row("type | enum | Type. Allowed enum values: asc,desc")],
      [],
    );
    expect(hugoUnits[0].sourceText).toBe(
      "type | enum | Type. Allowed enum values: asc,desc",
    );
  });

  it("leaves Astro units and already-matching Hugo units alone", () => {
    const astro = [row("type | enum | Type. Allowed values: asc, desc.")];
    const hugo = [row("id | string | ID.")];
    const result = applyTextForms(hugo, astro);
    expect(result.astroUnits).toEqual(astro);
    expect(result.hugoUnits).toEqual(hugo);
    expect(result.findings).toEqual([]);
  });

  it("names each form it applied, once per page, with its locations", () => {
    const response403 = { ...model, responseCode: "403" };
    const { findings } = applyTextForms(
      [
        row("a | enum | A. Allowed enum values: x,y"),
        row("b | enum | B. Allowed enum values: z", response403),
        row("c | boolean | DEPRECATED: C."),
      ],
      [],
    );
    expect(findings).toEqual([
      {
        kind: "structure",
        mapping: "enum-values-form",
        locationKeys: ["v1/response/200/model", "v1/response/403/model"],
        hugoElements: ["Allowed enum values: x,y"],
        astroElements: ["Allowed values: x, y."],
      },
      {
        kind: "structure",
        mapping: "deprecated-marker-form",
        locationKeys: ["v1/response/200/model"],
        hugoElements: ["DEPRECATED: C."],
        astroElements: ["C. Deprecated."],
      },
    ]);
  });
});
