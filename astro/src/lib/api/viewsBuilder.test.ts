/**
 * Snapshot tests covering a curated set of audit categories and operations
 * (defined in `tests/fixtures/api/auditCases.ts`). Each snapshot is preceded
 * by a Zod parse check so a shape regression surfaces as a schema error
 * (with field path) rather than just a snapshot diff.
 *
 * These tests run against the frozen 8-category fixture in
 * `tests/fixtures/api/` (wired by `vitest.unit.config.ts`). Comprehensive
 * shape validation across the *live* spec lives in
 * `tests/integration/viewsBuilder.full-spec.test.ts`.
 *
 * Snapshots are written to `__snapshots__/*.json` via `toMatchFileSnapshot`
 * so each one is human-readable on its own. To regenerate after an
 * intentional change, run `yarn test -u`.
 */

import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
  getCategoriesView,
  getCategoryStubsView,
  getCategoryViewBySlug,
  getOperationView,
} from "./viewsBuilder";
import {
  ApiCategorySchema,
  ApiCategoryStubSchema,
  ApiOperationViewSchema,
} from "./schemas/views";
import {
  CATEGORY_AUDIT_CASES,
  FIXTURE_ONLY_CATEGORY_AUDIT_CASES,
  ENDPOINT_AUDIT_CASES,
} from "../../../tests/fixtures/api/auditCases";

// The frozen fixture also covers categories retired from the live spec
// (e.g. screenboards); the integration test skips those, the unit layer keeps them.
const ALL_CATEGORY_AUDIT_CASES = [
  ...CATEGORY_AUDIT_CASES,
  ...FIXTURE_ONLY_CATEGORY_AUDIT_CASES,
];

describe("viewsBuilder snapshots", () => {
  describe("getCategoriesView", () => {
    it("returns the full category list for the default locale", async () => {
      const result = await getCategoriesView();
      z.array(ApiCategorySchema).parse(result);
      await expect(JSON.stringify(result, null, 2)).toMatchFileSnapshot(
        "./__snapshots__/getCategoriesView/en.json",
      );
    });
  });

  describe("getCategoryStubsView", () => {
    it("returns the same categories as getCategoriesView, minus operations", async () => {
      const stubs = await getCategoryStubsView();
      z.array(ApiCategoryStubSchema).parse(stubs);

      const full = await getCategoriesView();
      expect(stubs.length).toBe(full.length);
      for (let i = 0; i < stubs.length; i++) {
        expect(stubs[i]).not.toHaveProperty("operations");
        expect(stubs[i].slug).toBe(full[i].slug);
        expect(stubs[i].name).toBe(full[i].name);
        expect(stubs[i].description).toBe(full[i].description);
      }
    });
  });

  describe("getCategoryViewBySlug", () => {
    for (const { slug, label } of ALL_CATEGORY_AUDIT_CASES) {
      it(`${slug} (${label})`, async () => {
        const result = await getCategoryViewBySlug(slug);
        ApiCategorySchema.parse(result);
        await expect(JSON.stringify(result, null, 2)).toMatchFileSnapshot(
          `./__snapshots__/getCategoryViewBySlug/${slug}.json`,
        );
      });
    }
  });

  describe("getOperationView", () => {
    for (const { catSlug, opSlug, label } of ENDPOINT_AUDIT_CASES) {
      it(`${catSlug}/${opSlug} (${label})`, async () => {
        const result = await getOperationView(catSlug, opSlug);
        ApiOperationViewSchema.parse(result);
        await expect(JSON.stringify(result, null, 2)).toMatchFileSnapshot(
          `./__snapshots__/getOperationView/${catSlug}.${opSlug}.json`,
        );
      });
    }
  });
});

describe("viewsBuilder x-displayName labels", () => {
  it("labels a category without changing its slug", async () => {
    const category = await getCategoryViewBySlug("authentication");
    expect(category?.name).toBe("API Keys");
    expect(category?.slug).toBe("authentication");
  });

  it("applies a v1-only operation label to every variant", async () => {
    const view = await getOperationView(
      "aws-integration",
      "list-all-aws-integrations",
    );
    expect(view?.slug).toBe("list-all-aws-integrations");
    expect(view?.summary).toBe("List all AWS accounts");
    expect(view?.variants.map((variant) => variant.version)).toEqual([
      "v2",
      "v1",
    ]);
    for (const variant of view?.variants ?? []) {
      expect(variant.summary).toBe("List all AWS accounts");
      expect(variant.slug).toBe("list-all-aws-integrations");
      expect(variant.operationId).toBe("ListAWSAccounts");
    }
  });

  it("prefers the v2 label when versions disagree", async () => {
    const view = await getOperationView(
      "aws-integration",
      "create-an-aws-integration",
    );
    expect(view?.summary).toBe("Connect an AWS account");
    for (const variant of view?.variants ?? []) {
      expect(variant.summary).toBe("Connect an AWS account");
    }
  });

  it("labels the category's operation stub with a canonical slug", async () => {
    const category = await getCategoryViewBySlug("aws-integration");
    const stub = category?.operations.find(
      (operation) => operation.operationId === "ListAWSAccounts",
    );
    expect(stub?.summary).toBe("List all AWS accounts");
    expect(stub?.slug).toBe("list-all-aws-integrations");
  });

  it("relabels code example captions that contain the canonical summary", async () => {
    const view = await getOperationView(
      "aws-integration",
      "create-an-aws-integration",
    );
    const v2 = view?.variants.find((variant) => variant.version === "v2");
    const descriptionsByLanguage = Object.fromEntries(
      (v2?.codeExamples ?? []).map((set) => [
        set.language,
        set.entries.map((entry) => entry.description),
      ]),
    );
    expect(descriptionsByLanguage.curl).toEqual(["Connect an AWS account"]);
    expect(descriptionsByLanguage.go).toEqual(
      expect.arrayContaining([
        'Connect an AWS account returns "AWS Account object" response',
        'Create an AWS account returns "AWS Account object" response',
      ]),
    );
  });
});

describe("viewsBuilder code example titles", () => {
  // Hugo titles an example with the operation summary when it has no
  // CodeExamples.json description (or, for curl, no request file).
  it("falls back to the summary for untitled SDK and curl examples", async () => {
    const view = await getOperationView(
      "usage-metering",
      "get-hourly-usage-for-lambda",
    );
    const descriptions = (view?.variants[0].codeExamples ?? []).flatMap((set) =>
      set.entries.map((entry) => entry.description),
    );
    expect(descriptions.length).toBeGreaterThan(1);
    for (const description of descriptions) {
      expect(description).toBe("Get hourly usage for Lambda");
    }
  });
});

describe("viewsBuilder curl examples", () => {
  // Decision A: one curl per request file, each sending its own file.
  it("builds one titled curl per request file, in every region", async () => {
    const view = await getOperationView("monitors", "create-a-monitor");
    const curlEntries =
      view?.variants[0].codeExamples.find((set) => set.language === "curl")
        ?.entries ?? [];

    expect(curlEntries.map((entry) => entry.description)).toEqual([
      'Create a Cost Monitor returns "OK" response',
      'Create a RUM formula and functions monitor returns "OK" response',
    ]);
    const monitorTypes = ["cost alert", "rum alert"];
    curlEntries.forEach((entry, index) => {
      const regionCodes = Object.values(entry.regionVariants ?? {}).map(
        (variant) => variant.code,
      );
      expect(regionCodes.length).toBeGreaterThan(0);
      for (const code of [entry.code, ...regionCodes]) {
        expect(code).toContain(`"type": "${monitorTypes[index]}"`);
      }
    });
  });
});
