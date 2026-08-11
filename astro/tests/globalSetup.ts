import { request } from "@playwright/test";

// Astro 7's dev server compiles routes on demand, and the very first request
// pays a large one-time cost (Vite dependency optimization + initial module
// graph build) that can exceed a single test's 30s timeout — which is what
// tips the first `page.goto` in the suite over the edge. Warming a few heavy
// routes here, outside any timed test, absorbs that spike so per-test timeouts
// stay meaningful. Best-effort: never fail the run if warmup can't complete.
const baseURL =
  process.env.USE_DEV_SERVER === "true"
    ? "http://localhost:4321"
    : "http://localhost:4322";

const warmupRoutes = [
  "/dd_e2e/",
  "/dd_e2e/components/alert",
  "/api/latest/",
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function globalSetup() {
  const ctx = await request.newContext({ baseURL });
  try {
    // Wait for the server (Playwright may start it around the same time as this
    // hook), then warm each route so its first compile happens now.
    const deadline = Date.now() + 120_000;
    for (const route of warmupRoutes) {
      while (Date.now() < deadline) {
        let status: number;
        try {
          status = (await ctx.get(route, { timeout: 90_000 })).status();
        } catch {
          // No response at all: the server isn't listening yet — retry shortly.
          await sleep(1000);
          continue;
        }
        // Any HTTP response means the server is up and the route has compiled,
        // so stop either way. Retrying a 404 would just burn the whole deadline
        // on a route that does not exist, starving the routes that do.
        if (status !== 200) {
          console.warn(`[warmup] ${route} returned ${status} — stale route?`);
        }
        break;
      }
    }
  } catch {
    // Warmup is an optimization, not a gate — swallow any failure.
  } finally {
    await ctx.dispose();
  }
}
