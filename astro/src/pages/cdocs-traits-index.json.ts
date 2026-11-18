export const prerender = true;
/**
 * `cdocs-traits-index.json`: the Cdocs traits list, as a build-time sidecar.
 *
 * The `cdocsTraitsList` integration moves it to a content-hashed path under
 * `_astro/` after the build, so it never appears at this path in a real
 * deploy. In `astro dev`, the server links here directly. It's excluded from
 * the sitemap.
 */

import type { APIRoute } from "astro";
import { getCdocsTraitsListJson } from "@lib/cdocs/cdocsPages";

export const GET: APIRoute = async () => {
  return new Response(await getCdocsTraitsListJson(), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
