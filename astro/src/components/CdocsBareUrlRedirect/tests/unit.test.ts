import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import CdocsBareUrlRedirect from "../CdocsBareUrlRedirect.astro";
import { PREFERENCES_STORAGE_KEY } from "@lib/cdocs/preferences";

const PAGE_URL =
  "https://docs.example.com/dd_e2e/cdocs/custom_instrumentation/";

async function renderScript(traitIds: string[]): Promise<string> {
  const container = await AstroContainer.create();
  const html = await container.renderToString(CdocsBareUrlRedirect, {
    props: { traitIds },
  });
  return html.match(/<script>([\s\S]*)<\/script>/)![1];
}

/** Storage holding the given values, in Hugo's format. */
function storageWith(valsByTraitId: Record<string, string>) {
  const stored = Object.fromEntries(
    Object.entries(valsByTraitId).map(([traitId, value]) => [
      traitId,
      { value, timestamp: 1 },
    ]),
  );
  return storageWithJson(JSON.stringify(stored));
}

function storageWithJson(json: string | null): Pick<Storage, "getItem"> {
  return {
    getItem: (key) => (key === PREFERENCES_STORAGE_KEY ? json : null),
  };
}

/**
 * Run the script against a page at `href`, and return where it redirected to,
 * or `null`.
 */
async function runScript(p: {
  href: string;
  traitIds?: string[];
  readyState?: DocumentReadyState;
  storage: Pick<Storage, "getItem">;
}): Promise<string | null> {
  const script = await renderScript(p.traitIds ?? ["api_type", "prog_lang"]);
  let redirectedTo: string | null = null;
  const location = {
    href: p.href,
    replace: (url: string) => (redirectedTo = url),
  };
  const document = { readyState: p.readyState ?? "loading" };
  new Function("document", "location", "localStorage", script)(
    document,
    location,
    p.storage,
  );
  return redirectedTo;
}

describe("CdocsBareUrlRedirect", () => {
  it("adds the stored preferences the page accepts, in alphabetical order", async () => {
    const storage = storageWith({ prog_lang: "python", api_type: "dd_api" });

    expect(await runScript({ href: PAGE_URL, storage })).toBe(
      `${PAGE_URL}?api_type=dd_api&prog_lang=python`,
    );
  });

  it("only adds missing params, and keeps the others", async () => {
    const storage = storageWith({ prog_lang: "python", api_type: "dd_api" });

    expect(
      await runScript({
        href: `${PAGE_URL}?prog_lang=go&utm=x#setup`,
        storage,
      }),
    ).toBe(`${PAGE_URL}?api_type=dd_api&prog_lang=go&utm=x#setup`);
  });

  it("skips preferences for traits the page doesn't accept", async () => {
    const storage = storageWith({ prog_lang: "python", os: "windows" });

    expect(await runScript({ href: PAGE_URL, storage })).toBe(
      `${PAGE_URL}?prog_lang=python`,
    );
  });

  it("does nothing when the URL wouldn't change", async () => {
    const storage = storageWith({ prog_lang: "python", os: "windows" });

    expect(
      await runScript({
        href: `${PAGE_URL}?api_type=otel_api&prog_lang=go`,
        storage,
      }),
    ).toBeNull();
  });

  it("does nothing without stored preferences", async () => {
    const storage = storageWithJson(null);

    expect(await runScript({ href: PAGE_URL, storage })).toBeNull();
  });

  it("does nothing when storage is blocked", async () => {
    const storage = {
      getItem: () => {
        throw new Error("SecurityError");
      },
    };

    expect(await runScript({ href: PAGE_URL, storage })).toBeNull();
  });

  it("ignores stored entries that aren't in Hugo's format", async () => {
    const storage = storageWithJson(
      JSON.stringify({ prog_lang: "python", api_type: { value: "" } }),
    );

    expect(await runScript({ href: PAGE_URL, storage })).toBeNull();
  });

  it("does nothing after the page has loaded, as on a view-transition swap", async () => {
    const storage = storageWith({ prog_lang: "python" });

    expect(
      await runScript({ href: PAGE_URL, readyState: "complete", storage }),
    ).toBeNull();
  });
});
