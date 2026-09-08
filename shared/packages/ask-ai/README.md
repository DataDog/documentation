# `@dd/ask-ai`

The Ask AI widget: the floating button, the conversational panel, and everything
inside it. Shared by the Hugo documentation site and the Astro one, so that both
run the same code rather than two copies of it.

Nothing here is published. Both hosts reference the package by path, so the
`@dd/` scope is a private placeholder and the name matters only for readability
in their dependency lists.

## What the hosts own, and what this package owns

The package owns the markup, the styles, and all of the behavior. A host mounts
it and supplies its own entry-point UI:

```ts
import { mountAskAi } from "@dd/ask-ai";

const askAi = mountAskAi({
  getIsDatadogUser: () => Promise.resolve(true),
});

// Wire a host's own button, searchbar row, or hero to the handle:
askAi.ask("How do I install the Agent?", { source: "search_suggestion" });
```

`mountAskAi` is idempotent — a second call returns the widget the first one
mounted rather than a second one. That is what lets several independent host
entry points each mount defensively without coordinating.

Three capabilities are read from the environment rather than imported, and each
has a defined absent-case:

| Capability | Where it comes from | When it is absent |
| --- | --- | --- |
| RUM / Logs | `window.DD_RUM`, `window.DD_LOGS` | Telemetry silently does nothing, with no console noise |
| Feature flag | `config.isEnabled` | Treated as enabled |
| Datadog-user status | `config.getIsDatadogUser` | The `is_datadog_user` tag is omitted, not sent as `false` |

The environment (`development` / `preview` / `live`) is read from `data-env` on
`<html>`, which both hosts already set, and keys the package's own `apiUrl` /
`apiKey` table.

## Commands

| Command | What it does |
| --- | --- |
| `yarn build` | esbuild → `dist/ask-ai.js`, then `tsc` → `dist/*.d.ts` |
| `yarn typecheck` | Type-checks the source and the tests |
| `yarn test` | Unit tests, `happy-dom` |

`dist/` is not committed. Each host's own `dev` and `build` scripts run this
package's build first, so a fresh clone → install → build works with nothing
generated in git.

## The bundle is self-contained

esbuild bundles `marked`, `marked-highlight`, and `highlight.js` into
`dist/ask-ai.js`, along with the stylesheet as a string, so the artifact has no
external imports at all.

That is why hosts reference the package as `link:` rather than `portal:`. There
is nothing for a host to resolve into its own dependency tree, and `link:` keeps
each host's `marked` version independent of this package's — Astro is on 18 and
Hugo on 17, and neither has to move for the other.

## Editing this package requires a dev-server restart

There is deliberately no watch build. A host's dev script builds `dist/` once at
startup, and esbuild's output is not in Vite's watch graph the way source files
are, so a change made mid-session does not hot-reload.

**Restart the host's dev server after editing package source.** The alternative
is a second long-running process every developer has to remember to start, which
is a worse trade for a package that is edited rarely and is scheduled for
deletion when Hugo goes away.

## Node and Yarn

Node 20, not 24. Hugo's floor is `>= 20.11.0` and Astro's is `>= 24.0.0`; the
build runs from inside both toolchains, so it targets the lower bound. Yarn is
`4.10.3` in all three projects, committed under `.yarn/releases`, so the version
split is only Node.
