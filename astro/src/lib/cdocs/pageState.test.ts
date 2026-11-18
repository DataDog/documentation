// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import {
  CDOCS_PAGE_STATE_ID,
  readCdocsPageState,
  serializeCdocsPageState,
  type CdocsPageState,
} from "./pageState";

const state: CdocsPageState = {
  valsByTraitId: { prog_lang: "python", api_type: "dd_api" },
  traitsListUrl: "/_astro/cdocs-traits.abc123.json",
  pathPrefix: "",
};

function renderStateTag(json: string) {
  document.body.innerHTML = `<script type="application/json" id="${CDOCS_PAGE_STATE_ID}">${json}</script>`;
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("Cdocs page state", () => {
  it("round-trips through the HTML", () => {
    renderStateTag(serializeCdocsPageState(state));

    expect(readCdocsPageState(document)).toEqual(state);
  });

  it("can't close the script tag it's rendered in", () => {
    const json = serializeCdocsPageState({
      ...state,
      valsByTraitId: { os: "</script><script>alert(1)</script>" },
    });

    expect(json).not.toContain("<");
    expect(JSON.parse(json).valsByTraitId.os).toBe(
      "</script><script>alert(1)</script>",
    );
  });

  it("reads nothing from a page without it", () => {
    expect(readCdocsPageState(document)).toBeNull();
  });

  it("reads nothing from a malformed tag", () => {
    renderStateTag("not json");
    expect(readCdocsPageState(document)).toBeNull();
  });
});
