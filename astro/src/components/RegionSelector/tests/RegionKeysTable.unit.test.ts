import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import RegionKeysTable from "../RegionKeysTable.astro";
import { buildClientRegions } from "@config/regions";

const renderTable = async () => {
  const container = await AstroContainer.create();
  return container.renderToString(RegionKeysTable);
};

const rowsOf = (html: string) =>
  [
    ...html.matchAll(
      /<tr>\s*<td><code>([^<]+)<\/code><\/td>\s*<td>([^<]+)<\/td>/g,
    ),
  ].map(([, key, label]) => ({ key, label }));

describe("RegionKeysTable", () => {
  it("renders one row per allowed region, in selector order", async () => {
    const html = await renderTable();

    expect(rowsOf(html)).toEqual(
      buildClientRegions().map(({ key, label }) => ({ key, label })),
    );
  });

  it("renders Key and Label column headers", async () => {
    const html = await renderTable();

    expect(html).toMatch(/<th>Key<\/th>\s*<th>Label<\/th>/);
  });
});
