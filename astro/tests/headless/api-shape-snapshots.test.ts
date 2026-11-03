import { describe, it, expect, beforeAll } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
// @ts-ignore — Preact renderer is registered for SSR of islands in headless tests.
import preactRenderer from "@astrojs/preact/server.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { APIRoute } from "astro";

import OperationPage from "../../src/pages/[...lang]/api/latest/[category]/[operation].astro";
import { GET as operationGET } from "../../src/pages/[...lang]/api/latest/[category]/[operation].md";
import { normalizeSnapshotHtml } from "../lib/normalizeSnapshotHtml";
import {
  extractApiFragment,
  extractPlaintextFragment,
} from "../lib/apiFragment";
import {
  SHAPE_CASES,
  SHAPE_CASES_CATEGORY,
  type ShapeCase,
} from "../fixtures/api-shapes/shapeCases";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_DIR = path.join(__dirname, "api-shape-snapshots");
const SITE = new URL("https://docs.datadoghq.com");

/** A fragment this large usually means the case's operation wasn't trimmed. */
const FRAGMENT_WARN_BYTES = 50 * 1024;

/**
 * Spec-shape fragment snapshots. Each case renders one trimmed operation from
 * the fixture's `Rendering Shapes` tag and snapshots only the part of the page
 * that shows its rendering class, in HTML and in the plaintext twin. See
 * tests/fixtures/api-shapes/shapeClasses.ts for what each class guards.
 */
describe("API spec-shape fragment snapshots", () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
    container.addServerRenderer({
      renderer: preactRenderer,
      name: "@astrojs/preact",
    });
  });

  it("has at most one case per class", () => {
    const classIds = SHAPE_CASES.map((shapeCase) => shapeCase.classId);
    expect(classIds).toEqual([...new Set(classIds)]);
  });

  for (const shapeCase of SHAPE_CASES) {
    it(`${shapeCase.classId} (${shapeCase.operation}) matches the HTML snapshot`, async () => {
      const html = await container.renderToString(OperationPage, {
        params: {
          category: caseCategory(shapeCase),
          operation: shapeCase.operation,
        },
        request: new Request(new URL(operationUrlPath(shapeCase), SITE)),
      });
      const fragment = await normalizeSnapshotHtml(
        provenanceComment(shapeCase) +
          extractApiFragment(html, shapeCase.fragment),
      );
      warnIfLarge(shapeCase, fragment);
      await expect(fragment).toMatchFileSnapshot(
        path.join(SNAPSHOT_DIR, `${shapeCase.classId}.html`),
      );
    }, 60_000);

    it(`${shapeCase.classId} (${shapeCase.operation}) matches the plaintext snapshot`, async () => {
      const markdown = await renderPlaintext(shapeCase);
      const fragment = `${provenanceComment(shapeCase)}\n\n${extractPlaintextFragment(markdown, shapeCase.fragment)}\n`;
      await expect(fragment).toMatchFileSnapshot(
        path.join(SNAPSHOT_DIR, `${shapeCase.classId}.md`),
      );
    }, 60_000);
  }
});

function caseCategory(shapeCase: ShapeCase): string {
  return shapeCase.category ?? SHAPE_CASES_CATEGORY;
}

function operationUrlPath(shapeCase: ShapeCase): string {
  return `/api/latest/${caseCategory(shapeCase)}/${shapeCase.operation}/`;
}

/** Names the case's operation at the top of each snapshot, so a diff points at its source. */
function provenanceComment(shapeCase: ShapeCase): string {
  return `<!-- ${shapeCase.classId}: ${operationUrlPath(shapeCase)} -->`;
}

function warnIfLarge(shapeCase: ShapeCase, fragment: string): void {
  const bytes = Buffer.byteLength(fragment);
  if (bytes > FRAGMENT_WARN_BYTES)
    console.warn(
      `Shape fragment ${shapeCase.classId} is ${Math.round(bytes / 1024)} KB. Trim ${shapeCase.operation} in the fixture.`,
    );
}

/** Calls the `.md` route the way the build does for an English page. */
async function renderPlaintext(shapeCase: ShapeCase): Promise<string> {
  const context = {
    params: {
      lang: undefined,
      category: caseCategory(shapeCase),
      operation: shapeCase.operation,
    },
    url: new URL(operationUrlPath(shapeCase).replace(/\/$/, ".md"), SITE),
    site: SITE,
  } as unknown as Parameters<APIRoute>[0];
  const response = (await (operationGET as APIRoute)(context)) as Response;
  expect(response.status).toBe(200);
  return response.text();
}
