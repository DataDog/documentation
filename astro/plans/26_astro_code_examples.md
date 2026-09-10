# Astro owns API code examples

## Prompt

Astro's `/api` docs are not yet independent of Hugo. One of the remaining couplings
is the SDK code examples. Break it: Astro should produce these examples itself,
rather than reading artifacts that a Hugo Makefile step put on disk.

## Approach

A port of Hugo's `EXAMPLES_template` into a TypeScript script Astro owns and runs
itself. The mechanism, end to end:

1. **Read the SDK pins.** Stream the public `latest-data-sources.tar.gz`, stop at
   `./data/sdk_versions.json`, and return the six pinned tags. All S3/tar knowledge is
   confined to one module.
2. **Resolve a ref per repo.** On `master`, the pinned tag. On any other branch, try a
   same-named branch in the SDK repo first and fall back to the tag — Hugo's behavior,
   preserved.
3. **Clone the six `datadog-api-client-*` repos**, blobless and sparse-checked-out to
   `examples/` only. This is the one deliberate divergence from Hugo, which does six
   full `--depth 1` clones.
4. **Transform to the layout the loader expects.** Rename `.py` → `.pybeta` and
   `.rb` → `.rbbeta`; split flat Rust filenames into nested paths on their first two
   underscores; copy `examples/v*`.
5. **Stage into `astro/api-code-examples/`**, gitignored. Plus the 148 legacy `.py`/`.rb`
   files that are *committed* in Hugo rather than generated, read out of the git index so
   the step cannot see Hugo build output.
6. **Point the loader at the staged tree** via a new alias, leaving `CodeExamples.json`
   pointed at Hugo, since that file is committed spec-repo automation output and not a
   build artifact.
7. **Decouple the tests.** Freeze a small fixture of example files so unit tests stop
   reading live SDK output, and warn rather than fail when the staged tree is absent so
   `dev` runs on a clean checkout.

Astro never invokes Hugo's build. What remains is a read of Hugo's *repo* — two
committed JSON files and the 148 legacy examples — which survives until the `/api`
cutover.

## Background: how this worked in Hugo

Curl was already Astro's. [`src/lib/api/curlBuilder.ts`](../src/lib/api/curlBuilder.ts)
synthesizes the curl snippet from the OpenAPI spec, and
[`operationBuilder.ts`](../src/lib/api/operationBuilder.ts) calls it. No Hugo
involvement.

Every other language came out of Hugo's tree:

- [`src/lib/api/codeExampleLoader.ts`](../src/lib/api/codeExampleLoader.ts) globbed
  `@hugo-site/content/en/api/v*/*/*.{go,java,py,pybeta,rb,rbbeta,rs,ts}` and imported
  `@hugo-site/data/api/v{1,2}/CodeExamples.json`.
- `@hugo-site` resolves to `../hugo` (`astro.config.mjs:185`, `tsconfig.json:8`).

Those two inputs have *different* provenance, which is what scopes this plan.

### The source files are build artifacts

`hugo/Makefile:204+` defines `EXAMPLES_template` and `all-examples`. For each of the six
`datadog-api-client-{go,java,python,ruby,typescript,rust}` repos it:

- reads a pinned tag from `hugo/_vendor/data/sdk_versions.json` (itself downloaded
  from `websites-sources` via the `websites_sources_data` target);
- `git clone --depth 1 --branch <tag>` into `hugo/examples/<repo>` — except on a
  non-`master` branch, where it *first* tries a same-named branch in the SDK repo
  and falls back to the tag;
- renames `.py` → `.pybeta` and `.rb` → `.rbbeta`;
- rewrites flat Rust filenames (`a_b_c.rs`) into nested paths via `sed`;
- `cp -Rn examples/v*` into `hugo/content/en/api/`.

Those copied files are **gitignored** (`hugo/.gitignore:17-22`). A clean checkout has
no SDK examples until Hugo's make step has run, and nothing in `astro/package.json`
triggered it — it was a silent external prerequisite.

### `CodeExamples.json` is not a build artifact

It lives in `hugo/data/api/v{1,2}/` and is committed, updated by spec-repo automation
("Regenerate client from commit X of spec repo"). It maps
`operationId` → `[{group, suffix, description}]`, which is how the loader knows which
suffixed filenames to look for. A *path* dependency on `hugo/`, not a *build-step* one.

### `sdk_versions.json` decides only which git tag to clone

Findings from investigating it, recorded because they were not cheap to establish:

- It ships inside `latest-data-sources.tar.gz`, which `hugo/Makefile:152-158` downloads
  from S3 and extracts to `hugo/_vendor/` (one of ~25 JSON files there, the other 24
  irrelevant to API docs). `hugo/Makefile:212` greps a tag out of it; that is its only
  consumer in either repo.
- **Nothing in `websites-sources` produces it.** Its `data/` is gitignored and
  `rm -rf`'d by clean; every other file there has an explicit Makefile target
  (`Makefile:80-185`) and appears in `DATA_SOURCES` (`Makefile:255-274`) —
  `sdk_versions.json` has neither. A case-insensitive `grep -rni sdk` over the whole
  repo returns one unrelated hit. The tarball is packed by `.gitlab-ci.yml:110-122`,
  which tars `./assets ./content ./data` wholesale, so whatever is in `data/` at that
  moment ships. Grepping every Datadog repo checked out locally for `sdk_versions`
  returns only `hugo/Makefile`.
- **So its producer is unidentified.** Plausibly the CI image
  (`registry.ddbuild.io/ci/websites/websites-sources`) or a job in a repo not available
  locally. Not worth guessing at; noted so nobody re-runs the search.
- **It is live and current.** Production's tarball was rebuilt the day this was checked
  and still contained the file.
- **Its contents equal each client's latest GitHub release.** All six matched exactly,
  published within two days of each other, so it functions as a latest-release tracker
  and turns over roughly weekly. One snapshot only — this does not prove a client is
  never deliberately held back.
- Tag formats differ per repo (`v2.65.0`, `datadog-api-client-2.60.0`, bare `2.60.0`,
  `0.36.0`), so any replacement needs a per-repo lookup, not a version formula.
- The download is **public and unauthenticated**: Hugo's
  `get_websites_sources_data.py` uses a bare `requests.get`, and a credential-free
  `curl | tar -xzO ./data/sdk_versions.json` against the production object returns the
  six pins. 8.4 MB gzipped, ~90 MB extracted.

## Constraints

- **`astro/` may not edit Hugo.** Per `astro/CLAUDE.md`, this work must not change
  `hugo/Makefile`'s content/build targets. Hugo keeps its own examples step until
  the `/api` cutover; expect the two to coexist and duplicate work for a while.
- **No deploy code.** Nothing under `astro/` may touch AWS, S3 names, CloudFront, or
  credentials. A fetch script that clones public GitHub repos is fine; anything that
  reaches into Datadog cloud infrastructure is not, and belongs in
  `DataDog/documentation-ci`.
- **Public repo.** Vendoring hundreds of generated SDK example files into `astro/`
  would be a visible, reviewable, and large addition.
- **Dev server must run without the fetch.** `astro/CLAUDE.md` requires a
  `mocked-dependencies/` placeholder for any external resource that isn't plumbed in.
- **Unit tests read fixtures, not live data.** `vitest.unit.config.ts` redirects
  `@hugo-site/data/api` to `tests/fixtures/api/`. Whatever replaces the Hugo path
  needs the same treatment.

## Decisions

Grouped by area. Later sections reference these as **D1**–**D15**.

### Scope

#### D1 — "Generate" means fetch and stage, not synthesize

Port the Makefile's clone-and-copy: same six repos, same pinned tags, Astro-owned
script writing to an Astro-owned directory. Obvious improvements and Astro-idiomatic
shaping are welcome, but the bones must stay recognizable as the same process.

Rejected: **Astro synthesizes the snippets** from the OpenAPI spec the way
`curlBuilder` does. The SDK examples are not mechanical translations of the spec —
they are generated inside each client repo by that repo's own templates, against that
repo's idioms and type names, and compile-checked there. Curl works because it is a
thin shell over the HTTP request; there is no equivalent thin mapping to
`v1.DashboardsApiCreateDashboardRequest`. Reproducing six language generators in Astro
is a large, permanently-drifting commitment. Also rejected: consuming a distributed
artifact (npm package or similar), which does not exist.

#### D2 — `CodeExamples.json` keeps importing from `hugo/data/`

`codeExampleLoader.ts:13-14` stays as-is. The file is committed and maintained by
spec-repo automation, not produced by the Makefile, so it is not part of the build-step
coupling this plan removes. Leaving it alone keeps it always present on a fresh clone
with no network and needs no sync story.

**Scope consequence, stated plainly: this plan decouples the build step, not the data.**
An `@hugo-site` import remains in the code-example path, the loader reads from two trees
(staged sources under `astro/api-code-examples/`, index under `hugo/data/`), the Vitest
redirect in `vitest.unit.config.ts:25-32` keeps its Hugo-shaped paths, and the D12
fixture has to straddle both trees.

Rejected: copying it during the fetch (consolidates the coupling but adds a copy step
for a non-artifact); vendoring a committed copy (silent drift — automation updates only
Hugo's copy, so newly staged examples would be absent from the index and never render,
with nothing erroring); asking spec automation to write both (cleanest end state, but
blocks on another team).

#### D3 — Hugo's `/api` keeps rendering from its own tree during the overlap

This plan writes nothing into `hugo/`. But "completely untouched" is not literally
true: D11 has Astro **reading** `hugo/content/en/api/` for the 148 committed legacy
files, so Hugo remains a read dependency that outlives cutover unless those files move
into `astro/`. That is the one loose end cutover does not close by itself.

**The separation rests on a single mechanism worth naming, because everything else
follows from it:** `hugo/.gitignore:17-23` ignores exactly
`content/en/api/**/*.{go,java,pybeta,rbbeta,ts,rs}` and not `.py`/`.rb`. That one list
is what makes fresh SDK output disposable and the 148 legacy files permanent, and it is
why `make clean` (`git clean -Xf ./content`) can wipe the staged tree without touching
them.

**Two copies on disk during overlap: accepted, and smaller than it sounds.** Measured:
`hugo/content/en/api/` holds 13,544 example files at 56 MB, and
`astro/api-code-examples/` holds the same 13,544 at ~55 MB. The dominant disk cost is
not the staged output but the clones — Hugo's six full `--depth 1` trees are **900 MB**,
and D10's blobless + sparse clones mean Astro does not repeat that. So the overlap adds
~56 MB of duplicated output, not a second 900 MB.

#### D4 — The two copies can diverge only in a narrow window

A footnote, not a design constraint. D8 keeps branch-matching, so each fetch
independently tries a same-named branch in each SDK repo before the pinned tag
(`hugo/Makefile:211-220`, where `BRANCH` is the *documentation* repo's own branch from
`Makefile:25`). Both fetches compute the same `BRANCH` from the same checkout and read
the same `sdk_versions.json`, so they resolve **identically** on the common path — and
tags do not move, so a `master` build cannot diverge at all.

Divergence requires the *SDK-side* branch to change between the Hugo job's fetch and the
Astro job's: created, deleted, or advanced (`--depth 1 --branch <name>` takes the tip,
so an advancing branch is the likeliest). The jobs run minutes apart and this only
affects the coordinated-preview workflow. Consequence if it happens: both sites render
fine, they just show different code — noticeable only when someone compares Hugo `/api`
against Astro `/api` on a preview branch, which is what the overlap is for. Accepted
without mitigation; recorded so the symptom is diagnosable rather than mysterious.

#### D5 — No other Hugo process needs porting

Checked because it would have widened scope. `hugo/Makefile:243`
(`cp -Rn examples/$(1)/examples/v* ./content/en/api`) is the only thing that reads the
six clones. Grepping `hugo/local`, `hugo/layouts`, `hugo/config`, `hugo/package.json`,
`Makefile`, and `Makefile.config` for `datadog-api-client` returns hits only inside the
`EXAMPLES_template` block (`Makefile:27`, `222-260`); `EXAMPLES_DIR` at `Makefile:26`
is defined and never referenced anywhere — dead.

Of the other six steps in Hugo's `dependencies` chain (`Makefile:147`), only
`build-api-derefs` (`Makefile:95` → `assets/scripts/build-api-derefs.js`) touches API
docs, and Astro deliberately does not port it: `src/lib/api/refResolver.ts` resolves
`$ref`s at render time instead, as its own comments note. `update_pre_build`'s
`pull_config.yaml` has no `api` entries. So porting `all-examples` leaves no API-docs
process unported.

### The fetch

#### D6 — Stage into a gitignored, non-hidden `astro/api-code-examples/`

Mirrors Hugo's model: the fetch script writes the staged tree there, `astro/.gitignore`
excludes it, nothing enters git. Not hidden — `.astro/` is the only hidden generated dir
here, while `dist/`, `node_modules/`, and `test-results/` are not, and a hidden path both
hurts discoverability and risks being skipped by `import.meta.glob`'s dotfile handling.

Not committed: 13,544 files / ~55 MB of generated code would churn on every SDK bump in
a public repo that has already hit pack-size trouble.

**The `astro/.gitignore` line is an explicit implementation step**, listed first in Step 1.
It did not exist, and without it the first `yarn fetch:examples` puts 13,544 untracked
files in `git status`. One line, but the kind of one line that gets missed precisely
because every other decision assumes it.

#### D7 — Trigger it as an explicit script chained into `dev` and `build`

A Node script (`astro/scripts/fetchApiCodeExamples.ts`) exposed as `yarn fetch:examples`
and chained the same way `build:ask-ai` already is, since Yarn Berry ignores arbitrary
`pre*` hooks. It no-ops when the staged tree is present and current, so repeat runs are
cheap and chaining it into `dev` does not cost a minute on every restart.

Chosen over an Astro integration hook (hides a multi-minute network step inside the
build, awkward to run or skip alone) and a lazy Vite plugin (furthest from Hugo's shape,
and conflicts with the eager `import.meta.glob` the loader uses). Keeping it a standalone
step is also what makes it recognizably the same process as the Makefile target.

#### D8 — Write it in TypeScript, run directly by Node

Verified against this project's pinned Node 24.19: `node scripts/foo.ts` executes with
no flag, no warning, and no `tsx`/`ts-node` dependency. Two constraints follow.

1. **Erasable syntax only.** Node strips types rather than compiling, so no `enum`, no
   constructor parameter properties, no `namespace`, and type-only imports must use
   `import type`.
2. This diverges from the sole existing precedent, `scripts/verifyDist.mjs`, which stays
   plain JS. Converting it is unrelated scope.

`scripts/` is already covered by typechecking: `astro/tsconfigs/base.json` sets
`"include": ["${configDir}/.astro/types.d.ts", "${configDir}/**/*"]` and
`astro/tsconfig.json` does not override it, so `astro check` (wired as `yarn typecheck`,
`package.json:21`) already walks `scripts/` — and already typechecks `verifyDist.mjs` as
JS, via `allowJs: true`. Two further findings from that file:

- **`allowImportingTsExtensions: true` is already on**, which matters because Node's
  type-stripping *requires* the literal extension in relative imports
  (`from "./lib/websitesSourcesData.ts"`) where TypeScript rejects it by default. Recorded
  so a later reader does not "fix" the extension off and break the script at runtime while
  `yarn typecheck` stays green.
- **`verbatimModuleSyntax: true` already enforces the `import type` half of constraint 1**
  mechanically, but nothing enforced the other half — `enum`, `namespace`, and constructor
  parameter properties all typecheck and then fail under Node. TypeScript here is 5.9.3, so
  Step 1 adds `"erasableSyntaxOnly": true` and the whole constraint becomes a typecheck
  error instead of a runtime one.

#### D9 — Port the branch-matching behavior as-is

On `master`, clone the pinned tag. On any other branch, try a same-named branch in each
SDK repo first and fall back to the tag. This preserves the coordinated-preview workflow
(a spec-repo PR can be previewed against unreleased client code) and keeps the process
recognizably Hugo's.

Accepted cost: up to six failed clone attempts on an ordinary branch, since branch names
rarely match across repos. The fetch script must make that failure quiet and expected — a
failed branch clone is the normal path, not an error worth surfacing.

Rejected: tag-only (deterministic but drops coordinated previews) and an opt-in override
flag (same capability, lower cost, but diverges from Hugo's automatic behavior).

#### D10 — Read the pins from the same tarball Hugo does, behind one isolated module

Astro's fetch streams `latest-data-sources.tar.gz` over public HTTPS and pulls out just
`./data/sdk_versions.json` — the most direct port, and it cannot drift from Hugo.

**All of it is confined to `scripts/lib/websitesSourcesData.ts`**: the bucket name, the
path/prefix variable, the URL builder, the fetch, the tar-member extraction, and the
parse. `fetchApiCodeExamples.ts` imports one function that returns typed pins and knows
nothing about S3 or tar.

On the `astro/CLAUDE.md` "no S3 bucket names or key prefixes" rule: the confidentiality
reading does not apply, because `dd-websites-sources` and the `staging` default are
**already committed in this public repo** at
`hugo/local/bin/py/build/get_websites_sources_data.py:16-17`. The rule sits under "No
deploy code" and targets deploy mechanics — AWS CLI/SDK, CloudFront, IAM, credentials —
none of which this touches; it is an unauthenticated GET, verified working with no
credentials. Step 1 records the carve-out in `astro/CLAUDE.md` so the next reader does
not re-derive it.

Rejected: a committed pin file (reproducible and offline, but least faithful and drifts
from Hugo); resolving latest GitHub releases (never stale, but non-reproducible builds);
preferring `hugo/_vendor` when present (build inputs would then depend on whether an
unrelated make target had run).

**Tar extraction uses `tar`, promoted to a direct `devDependency`.** `tar@7.5.22` is
already in `node_modules`, but only **transitively** — so this means an explicit entry in
`astro/package.json`, not relying on hoisting, which is unreliable under Yarn PnP and
would break silently when an unrelated dependency drops it. Chosen over the
zero-dependency route (Node 24.19 has `DecompressionStream("gzip")`, and walking tar's
512-byte headers to one member is roughly 40 lines) because hand-rolling a tar parser to
avoid a single well-maintained, ubiquitous devDependency trades a one-line manifest change
for a piece of bespoke binary-format code that someone has to understand later. Either
route reads only the 8.4 MB gz stream and stops at the member's offset, so the ~90 MB
extracted tree is never materialized; the choice is about maintenance, not cost.

#### D11 — Clone blobless and sparse

Clone each repo with `--filter=blob:none --sparse` at the resolved ref, then
`git sparse-checkout set examples`, so only the blobs we actually copy are fetched rather
than the full ~900 MB of six trees (go 163M, java 178M, python 130M, ruby 139M, rust 157M,
typescript 135M). This is the one deliberate divergence from `hugo/Makefile:216-219`'s
plain `--depth 1 --branch <tag>`, and it is self-contained inside our fetch script — the
process shape (resolve ref → clone → rewrite filenames → copy `examples/v*`) is unchanged.
Requires a partial-clone-capable server; github.com supports `blob:none`.

**Caching was investigated and is not implementable given D10:** GitLab resolves
`cache:key:files` before a job's script runs (documented at
`documentation-ci/ci-templates/base.yml:77`), and D10 fetches the pins at runtime, so
there is no committed file to key a cache on. A cache would require reversing D10. Nothing
caches these clones today either — the only CI caches are Hugo modules, yarn, and pip
(`base.yml:212-250`), and production deliberately runs `make clean-examples` first
(`production.yml:24`).

#### D12 — Port the filename transforms, including the legacy `.py`/`.rb` staging

Fresh SDK output is staged as `.pybeta`/`.rbbeta`, the 148 committed legacy `.py`/`.rb`
files come along too, and `codeExampleLoader.ts:70-71` keeps its four-extension precedence
chain untouched.

**Why the rename exists — not what it looks like.** It is not a Hugo rendering workaround.
`hugo/config/_default/params.yaml:12-35` declares `py` as "python-legacy" and `pybeta` as
"python" — two distinct languages — and the rename (belt-and-braced by `cp -Rn`) exists so
freshly cloned SDK output lands *beside* the legacy files committed under
`hugo/content/en/api/` rather than over them. Astro already collapses that pair into one
Python entry with `.pybeta` preferred, so the rename's only value here is keeping the
legacy files reachable.

**Measured: that is worth 8 files out of 148.** 65 of 67 `.py` and 75 of 81 `.rb` have a
modern sibling that wins today and would win identically without the rename. The
legacy-only set is `MuteMonitor` (`.py`+`.rb`), `UnmuteMonitor` (`.py`+`.rb`),
`CreateSlackIntegration`, `DeleteSlackIntegration`, `GetSlackIntegration` (`.rb`), and
`GetUsageTrace` (`.rb`, and no longer in `data/api/v1/full_spec.yaml`). No current SDK
clone has an example for any of those operations.

Rejected: dropping the rename and the 8 files (simplest loader, but five live operations
would render fewer language tabs in Astro than in Hugo); dropping the rename and vendoring
the 8 into Astro as committed content (parity at ~8 KB, but Astro would then own
hand-maintained API content); dropping the rename and globbing the 8 out of Hugo (parity
with no vendoring, but the loader would read example sources from two trees with
cross-tree precedence, and the D13 fixture would have to straddle both).

**The Rust flat-to-nested rewrite is not optional.** The `sed` at `hugo/Makefile:240-242`
is a genuine format conversion, not a Hugo workaround: `datadog-api-client-rust` stores its
examples flat (`examples/v1_aws-integration_CreateAWSAccount.rs`), while go, java, python,
ruby and typescript all ship the nested `examples/v1/<category>/` layout the copy step
expects. Astro needs the same conversion or it stages no Rust at all. Semantics to
preserve: the two `sed` expressions replace the **2nd** underscore and then the **1st**,
i.e. split on the first two underscores only — which is why suffixed names like
`v1_usage-metering_GetUsageNetworkHosts_1249907835.rs` survive with their trailing
underscore intact. Category slugs use hyphens, never underscores, so two splits is always
right. In the fetch script this is a few lines of JS, not a shell rewrite. Also worth
carrying over: the copy is scoped to `examples/v*`, which is what excludes
`examples/datadog/` (go, python) and `examples/tsconfig.json` (typescript).

**Where the 148 legacy files come from.** They are committed **only** in
`hugo/content/en/api/`, and no SDK clone produces them, so the fetch script copies them
from Hugo into `astro/api-code-examples/` as one more staging step. That keeps the loader
reading exactly one tree and the D13 fixture single-tree. The alternative — a second
`import.meta.glob` pointed at `@hugo-site/content/` — is a deeper coupling than D2's and
would split example sourcing across two trees with cross-tree precedence. Either way this
is a read of Hugo, not a change to it, so it stays inside the `astro/CLAUDE.md` boundary.

**This does not reintroduce a dependency on Hugo's build — it depends on Hugo's *repo*,
and that is mechanically enforced.** `hugo/.gitignore:17-23` ignores
`content/en/api/**/*.{go,java,pybeta,rbbeta,ts,rs}` and deliberately **not** `.py`/`.rb`,
which is exactly why these 148 are tracked; they are present after a bare `git clone` with
no network and no `make` ever run, and `make clean` (`git clean -Xf ./content`,
ignored-only) cannot remove them. **Source them with
`git ls-files 'content/en/api/v*/*/*.py' 'content/en/api/v*/*/*.rb'`, not a filesystem
glob.** `git ls-files` reads the index rather than the working tree, so it returns the same
148 on a machine where Hugo *has* been built and structurally cannot pick up build output;
a filesystem glob would return whatever Hugo happens to have staged.

### Tests and dev

#### D13 — Freeze the example sources as a test fixture

Add `tests/fixtures/api/examples/` holding the 48 files the seven `getOperationView`
snapshots actually embed, and point the unit suite at it.

**This closes a hole that predates this plan:** `vitest.unit.config.ts:15-43` redirects
only the two `full_spec.yaml` and two `CodeExamples.json`; the `import.meta.glob` at
`codeExampleLoader.ts:17-20` was never redirected, so unit tests read the live
`hugo/content/en/api/` tree. Almost all of that tree is gitignored build output
(`hugo/.gitignore:17-23` covers `.go`, `.java`, `.pybeta`, `.rbbeta`, `.ts`, `.rs`; only 67
legacy `.py` and 81 `.rb` files are tracked, against ~2,232 of each ignored extension on a
built machine). The snapshots embed Go, Java, TypeScript and Rust, so on a fresh clone all
seven fail as opaque diffs rather than as "you have not run the build." D1 does not remove
that coupling, it relocates it — from Hugo's build to `yarn fetch:examples` — and drops the
fresh-clone floor from a couple of languages to zero, so the glob has to be repointed
either way.

**Mechanism is cheaper than the redirect already in the repo:** the glob resolves through
an alias today, so give `astro/api-code-examples/` its own alias next to `@hugo-site` in
`astro.config.mjs:185` and have `vitest.unit.config.ts` repoint that one alias — one line
per config, no `resolveId` interception and no double-slash workaround
(`vitest.unit.config.ts:37-39`).

**Maintenance cost, measured not estimated:** `git log -- tests/fixtures/api` is a single
commit (its creation) despite 14 upstream `CodeExamples.json` regenerations in the last 12
months, because only two things force an edit — adding an `ENDPOINT_AUDIT_CASES` entry (7
since creation, never changed) or adding a suffix to the fixture index, which is a hand
edit already. Upstream drift is not a blind spot: `vitest.integration.config.ts`
deliberately omits the plugin and `tests/integration/viewsBuilder.full-spec.test.ts` runs
the same `auditCases.ts` against the live spec.

Rejected: leaving the coupling (headless suite then needs a network fetch first); keeping
the test glob pointed at `hugo/content/` after production moves off it (preserves snapshots
byte-for-byte but tests a path production no longer uses).

#### D14 — Each fixture file carries a provenance banner

Each of the 48 files starts with a note in its own language's comment syntax (`//` for Go,
Java, TypeScript, Rust; `#` for Python, Ruby):

```
NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
```

The audience is someone reading a surprising snapshot diff, so the banner names what the
file *is*. Two knock-ons: the snapshots have to be regenerated because the banner is part
of the asserted `code` strings, and the fixture files differ from their upstream originals
by exactly one leading line, which still satisfies the "diffs cleanly against upstream"
intent at `.prettierignore:21-23`.

**There are two snapshot sets, not one.** `tests/headless/api-html-snapshots.test.ts`
embeds the example bodies in full-page HTML and needs the same `-u` as the
`getOperationView` set. Easy to miss.

#### D15 — `yarn dev` just fetches, with a `--best-effort` flag

`dev` and `dev:proxied` run `yarn fetch:examples --best-effort`, which is an ordinary fetch
that warns and exits 0 on failure instead of exiting 1. No `build:*` script passes the
flag, so no build can ship API pages with missing SDK tabs. The flag exists so an
unreachable network does not stop someone working on an unrelated part of the site. A bad
flag stays fatal under `--best-effort`: that is a mistake in the invocation, not a condition
of the world.

**Two warnings, not one, because the situations differ.** If a stamped tree survived the
failure, say which branch it was staged for and that `--force` refreshes it. If there is no
whole tree, say plainly that API pages will render **without SDK code examples** — calling
that "stale" would be a lie, and an unexplained example-less page reads as a bug. The
network call (`readSdkPins`) happens *before* the staged tree is cleared, so an offline run
leaves an existing tree intact and the first message is the common one.

**This replaced a rejected design worth recording.** The original plan was to prompt on a
missing tree — fetch now, or read `tests/fixtures/api/examples/` in place for that run
without writing anything. It was dropped because the prompt was the only thing making that
substitution acceptable, and a prompt that fires on every `yarn dev` until a real fetch
happens is friction on the common path, not just the offline one. Consequences of dropping
it: the fixture is a test input and nothing else, so `astro/CLAUDE.md` needs only the D10
carve-out; and offline dev now shows no examples at all, where the prompt would have shown
genuine ones for the seven audited operations — which is why the warning names that outcome
explicitly.

**A prompt would also have hung the browser suite.** `playwright.config.ts:15` invokes
`yarn dev` in a non-TTY with a 60s timeout. With the prompt gone, `dev` and `build` differ
only in `--best-effort` and neither reads a TTY. The investigation also produced a fact
worth keeping: **no browser test depends on real SDK example content.** The
`ApiCodeExample`/`ApiEndpoint` tests drive a `/dd_e2e/` page with hardcoded
`CodeExampleSet[]` props, and the tests against real API pages assert only on nav, i18n,
version tabs and button chrome. That is why a `dev` whose fetch failed can still serve the
browser suite.

Also rejected: copying fixtures into the staged dir; a separate sample set under
`mocked-dependencies/`; and hard-failing `dev`, which `--best-effort` exists to avoid.

## Dependencies

Everything outside `astro/` this mechanism relies on, and how each is reached.

**Fetched over the network, at fetch time**

| Dependency | Access |
| --- | --- |
| `DataDog/datadog-api-client-go` | Public GitHub clone by `scripts/fetchApiCodeExamples.ts`: `--filter=blob:none --sparse`, then `git sparse-checkout set examples`. Ref per D9 — pinned tag on `master`, else same-named branch with tag fallback. |
| `DataDog/datadog-api-client-java` | Same. |
| `DataDog/datadog-api-client-python` | Same. `examples/datadog/` is excluded by the `examples/v*` copy scope. |
| `DataDog/datadog-api-client-ruby` | Same. |
| `DataDog/datadog-api-client-typescript` | Same. `examples/tsconfig.json` excluded by the same scope. |
| `DataDog/datadog-api-client-rust` | Same, plus the flat-filename → nested-path transform (D12). |
| `latest-data-sources.tar.gz` (`websites-sources` data, S3) | Streamed over unauthenticated HTTPS by `scripts/lib/websitesSourcesData.ts` and piped through `tar`, stopping at the single member `./data/sdk_versions.json`. 8.4 MB gzipped; the ~90 MB tree is never extracted. This is the one carve-out from the no-cloud-strings rule (D10), and the only file that knows the URL. |

**Read off disk from `hugo/`, at build time**

| Dependency | Access |
| --- | --- |
| `hugo/data/api/v1/CodeExamples.json`, `.../v2/CodeExamples.json` | Static import through the `@hugo-site` alias, unchanged by this plan (D2). Committed, maintained by spec-repo automation — a path dependency, not a build artifact. |
| `hugo/content/en/api/v*/*/*.py`, `*.rb` (148 files) | Copied by the fetch script, enumerated with `git ls-files` run against `hugo/` (D12). Reading the git *index* rather than the working tree is what makes this immune to Hugo's build state. |
| `hugo/.gitignore:17-23` | Not read by anything — but load-bearing. It ignores the six generated extensions and deliberately not `.py`/`.rb`, which is the sole reason those 148 files are tracked and permanent. If that list changes, the previous row breaks. |

**Tooling**

| Dependency | Access |
| --- | --- |
| `git` CLI | Shelled out to by the fetch script. Needs partial-clone and sparse-checkout support (2.25+; 2.50.1 locally, and the CI image is well past it). |
| `tar` (npm) | Direct `devDependency` added in Step 1 (D10), imported only by `scripts/lib/websitesSourcesData.ts`. |
| Node 24 | Already required by `astro/package.json`'s `pretest` guard. Type-stripping is what lets these be `.ts` files with no build step. |
| `DataDog/documentation-ci` | Not a dependency of the code — the CI job that invokes the fetch lives there, per `CI handoff` below, because this repo holds no deploy logic. |

## Shape

```
scripts/
  fetchApiCodeExamples.ts        # driver: resolve → clone → transform → stage
  lib/
    websitesSourcesData.ts       # ALL S3/tar knowledge lives here, and nowhere else
api-code-examples/               # gitignored staging target; the build's only input
  v1/<category>/<Operation>.<ext>
  v2/<category>/<Operation>.<ext>
tests/fixtures/api/examples/     # 48 frozen files, banner-prefixed (192 KB, not the
                                 # ~40 KB estimated — real examples run longer)
tests/integration/
  exampleBaseline.scaffold.test.ts   # throwaway (Step 2), deleted in Step 8
  example-baseline.json              # throwaway, deliberately not gitignored
```

The driver should read as the Makefile target does, because that was the point of D1:
resolve pins → clone six repos → rename → nest Rust → copy `examples/v*` → stage the
legacy files.

## Steps

### Step 1 — The wiring everything else assumes

Small, and worth doing first so nothing downstream is written against a missing premise.

- `astro/.gitignore`: add `api-code-examples/` (D6).
- `astro/tsconfig.json`: add `"erasableSyntaxOnly": true` (D8). This makes the
  Node-can't-run-`enum` constraint a typecheck failure instead of a runtime one, before
  any of the new TypeScript exists to violate it.
- `astro/package.json`: add `tar` as a direct `devDependency` (D10).
- `astro/CLAUDE.md`: record the carve-out for the public-S3 read (D10). It is a deviation
  from a rule that file states plainly, so an unexplained deviation reads as a mistake to
  the next person.

### Step 2 — Capture the throwaway baseline

Scaffolding, not a deliverable. It answers one question — *did repointing the loader
change what any page renders?* — and it is deleted in Step 8.

**Why it is needed, given Step 8 already diffs the two trees.** A tree diff verifies Step 4
and nothing else. Step 6 rewrites both the glob pattern and `FILE_KEY_RE`
(`codeExampleLoader.ts:22`), and those parse *path shape*:
`/content/en/api/v1/monitors/X.go` becomes `/api-code-examples/v1/monitors/X.go`. Get that
regex wrong and every staged file can be byte-perfect, the tree diff still clean, and the
loader silently return zero examples for every operation. Nothing else here catches that at
scale — the seven `getOperationView` snapshots cover 7 operations out of ~2,200, and from
Step 5 onward they read a frozen fixture and no longer touch the staged tree at all.

**Capture it before any code changes**, while the loader still reads Hugo's tree.

- `tests/integration/exampleBaseline.scaffold.test.ts`, run under
  `vitest.integration.config.ts` — which deliberately omits the fixture redirect, so it
  sees what the loader really resolves. A test rather than a bare script because
  `import.meta.glob` needs Vite.
- Walk every category and operation (`getCategoriesView`, as
  `tests/integration/viewsBuilder.full-spec.test.ts` already does), call
  `getCodeExamplesForOperation`, and write `operationId → language → sha256(code)` to
  `tests/integration/example-baseline.json`. Hashes, not code: a few hundred KB for the
  whole API, against 924 KB for a *single* HTML snapshot.
- **Do not gitignore either file.** The scaffold sitting visibly untracked in `git status`
  is the reminder to delete it, and it keeps Step 8's clean-tree check honest.

### Step 3 — `scripts/lib/websitesSourcesData.ts`

One exported function returning the six typed pins. Streams `latest-data-sources.tar.gz`
over unauthenticated HTTPS, pipes through `tar`, stops at `./data/sdk_versions.json`,
parses, returns. Validate with Zod, matching the loader's existing habit — a
silently-missing pin should fail loudly rather than fall through to a branch clone that
also fails.

Everything about S3 and tar is confined here (D10). The driver imports one function and
knows nothing about either. Tag formats differ per repo (`v2.65.0`,
`datadog-api-client-2.60.0`, bare `2.60.0`, `0.36.0`), so the return type is a per-repo
lookup, never a formula.

### Step 4 — `scripts/fetchApiCodeExamples.ts`

Per repo, in order:

1. **Resolve the ref** (D9). On `master`, the pinned tag. Otherwise try a same-named
   branch, fall back to the tag. Up to six failed branch clones on an ordinary branch is
   the *normal* path — keep that quiet, or every developer sees six scary errors on every
   fetch.
2. **Clone** `--filter=blob:none --sparse`, then `git sparse-checkout set examples` (D11).
   The one deliberate divergence from Hugo, and self-contained.
3. **Rename** `.py` → `.pybeta`, `.rb` → `.rbbeta` (D12).
4. **Nest Rust** (D12). Split the flat name on its **first two underscores only** —
   `v1_aws-integration_CreateAWSAccount.rs` → `v1/aws-integration/CreateAWSAccount.rs`.
   Two splits, never a global replace: that is what preserves suffixed names like
   `v1_usage-metering_GetUsageNetworkHosts_1249907835.rs`.
5. **Copy `examples/v*`** into `api-code-examples/`. The `v*` scope is load-bearing — it is
   what excludes `examples/datadog/` (go, python) and `examples/tsconfig.json`
   (typescript).

Then once, after the six: **stage the 148 legacy files** (D12) with
`git ls-files 'content/en/api/v*/*/*.py' 'content/en/api/v*/*/*.rb'` against `hugo/`,
copying without clobbering. `git ls-files` rather than a filesystem glob is the whole point
— it reads the index, so it returns the same 148 whether or not Hugo has been built, and
cannot pick up Hugo's build output.

The script no-ops when the staged tree is present and current (D7).

Also give it two flags: `--best-effort` (D15) and `--pins <path>`, which reads a local
`sdk_versions.json` instead of the network. `--pins` is needed for Step 8's diffs and is
worth keeping afterward — it makes the fetch deterministic and offline-capable.

### Step 5 — Close the fixture hole (red)

Per `astro/CLAUDE.md`, write this before Step 6 and watch it fail. It is the one place here
where red-to-green is genuinely available: the seven `getOperationView` snapshots pass
today by reading live Hugo build output, so a correct fixture makes them fail loudly the
moment the glob moves.

- Freeze the 48 files the snapshots actually embed into `tests/fixtures/api/examples/`,
  each with the D14 provenance banner in its own comment syntax.
- Repoint the new alias in `vitest.unit.config.ts` — one line, no `resolveId` interception
  and no double-slash workaround (contrast `:37-39`).
- Regenerate both snapshot sets (`yarn test -u`), since the banner is now part of the
  asserted `code` strings (D14).
- Leave `vitest.integration.config.ts` alone. It deliberately omits the redirect, which is
  what keeps upstream drift visible.

This fixes a hole that predates the plan: the glob was never redirected, so unit tests have
always read the live tree. D1 does not create that problem; it lowers the fresh-clone floor
to zero and so forces the fix.

### Step 6 — Repoint the loader (green)

Add an alias for `api-code-examples/` beside `@hugo-site` in `astro.config.mjs:185` and
`tsconfig.json`, then change the one glob at `codeExampleLoader.ts:17-20` to use it.
`FILE_KEY_RE` (`:22`) must change with it — it currently matches
`/content/en/api/(v1|v2)/…`, which the new tree does not contain.

Nothing else in the loader moves. `LANGUAGES` keeps its four-extension precedence
(`:70-71`) untouched, per D12. The two `CodeExamples.json` imports (`:13-14`) stay pointed
at Hugo, per D2.

### Step 7 — Chain the fetch into the scripts

Chain `yarn fetch:examples --best-effort` into `dev` and `dev:proxied`; every `build:*`
script gets the plain fetch (D15).

Also here, since both describe designs that were dropped: fix the `FILE_KEY_RE` doc comment
in `codeExampleLoader.ts`, which claimed `yarn dev` repoints the alias at the fixture, and
replace any `astro/CLAUDE.md` fixture-as-mock language with a short note that the examples
fixture is a test input only and how it is redirected.

### Step 8 — Verify, then discard the scaffold

- `yarn typecheck` — also confirms Step 1's `erasableSyntaxOnly` holds for the new scripts.
- `yarn test:headless-ai src/lib/api` while iterating; full `yarn test-ai` before done.
- Delete `api-code-examples/`, run `yarn fetch:examples`, confirm 13,544 files / ~55 MB and
  that `git status` shows nothing but the Step 2 scaffold.

**Pin both sides first.** Each diff below is only meaningful if the staged tree and Hugo's
on-disk tree came from the same SDK refs. Hugo's came from
`hugo/_vendor/data/sdk_versions.json` (go `v2.65.0`, java `datadog-api-client-2.60.0`,
python `2.60.0`, ruby `v2.59.1`, typescript `v1.63.0`). The live tarball tracks latest
releases, so by implementation time it will have moved and an unpinned run folds genuine
upstream churn into the diff. Use Step 4's `--pins` flag.

**Then the two diffs.**

1. **Tree diff** — `api-code-examples/` against Hugo's `content/en/api/v*`, byte-for-byte
   across all 13,544 files. Verifies Step 4. Expect empty.
2. **Baseline diff** — re-run the Step 2 scaffold and compare against
   `example-baseline.json`. Verifies Step 6 across every operation rather than the seven
   snapshotted ones. Expect empty.

**One expected false positive, in diff 1 only.** An incrementally built Hugo tree can hold
files from older SDK tags, because Hugo copies with `cp -Rn` and never removes; the fresh
staged tree will not have them. So paths present in Hugo but absent after are
suspect-but-possibly-stale, while paths present *after* but absent in Hugo are
unambiguously a bug. Running `make clean` on the Hugo side before diffing removes the
ambiguity — `git clean -Xf ./content` clears exactly the generated extensions and leaves
the 148 tracked legacy files alone.

**Look at the legacy pages by hand anyway.** Diff 2 does cover them — the baseline is
captured against a Hugo tree that has all 148 files, so a failed legacy staging shows up as
`MuteMonitor` losing its Python and Ruby entries. But these are the pages that regress
*quietly*, by rendering fewer language tabs, so spend the minute. D12's five renderable
legacy-only operations — `MuteMonitor`, `UnmuteMonitor`, `CreateSlackIntegration`,
`DeleteSlackIntegration`, `GetSlackIntegration` — should each show one. (`GetUsageTrace` is
the sixth in that set but has no page; it left `data/api/v1/full_spec.yaml`.)

**Discard the scaffold.** Delete `exampleBaseline.scaffold.test.ts` and
`example-baseline.json`. A clean `git status` is the last check, and it means something here
precisely because nothing was gitignored to make it pass.

Recommend the production build to the user as the final step rather than running it.

## Verification results

Both diffs came back empty.

- Fresh fetch with `--pins hugo/_vendor/data/sdk_versions.json`: 13,544 files, 56 MB, 13
  seconds. Per-repo counts 2,232 each except ruby at 2,236, plus the 148 legacy files.
- Diff 1: path sets identical at 13,544 each once restricted to the eight example
  extensions, and 0 of 13,544 files differ byte-for-byte. **The expected false positive did
  not appear** — this Hugo tree held no files from older tags, so `git clean -Xf` was not
  needed and Hugo's tree was left untouched.
- Diff 2: zero drift across 1,633 operations / 9,770 language sets.
- The five legacy-only pages each render their legacy tabs and nothing more: `MuteMonitor`
  and `UnmuteMonitor` show `Curl, Python, Ruby`; the three Slack operations show
  `Curl, Ruby`. Checked against served HTML, resolving each `<pre>` to its tab via
  `aria-controls`, not just against the baseline hashes.
- One thing the plan did not anticipate: the *category* page renders no code examples at
  all, only the per-operation page does. That is pre-existing behavior, unrelated to this
  work, but it is why a hand-check has to go to `/api/latest/<category>/<operation>/`.

## CI handoff

No `documentation-ci` commits are part of this work — there is no Astro CI job there to
amend yet (`grep -ri astro` across that repo returns only prose in
`DYNAMIC-PIPELINES-FINDINGS.md` and spike comments). This section is the artifact to hand
to the CI engineer, not a task list for us.

**What a job that runs this feature needs.**

- Outbound HTTPS to `github.com` (six `git clone`s) and to the public `websites-sources`
  data-sources object on S3 (one unauthenticated `GET`, ~8.4 MB, streamed).
- **No credentials.** Not the AWS CLI, not an SDK, not a role. The S3 read is anonymous and
  was verified working with none; the clones are public repos over HTTPS.
- `yarn fetch:examples` must run before `astro build`. It is chained into the `dev` and
  `build` scripts, so a job that runs `yarn build` gets it without extra steps; a job that
  wants it as a separate, separately-timed stage can call `yarn fetch:examples` directly.
- Cost: six blobless sparse clones per build, duplicated with the Hugo job until cutover.
  Not cacheable — see D11.

## What this does not do

- **Does not decouple the data, only the build step** (D2). `CodeExamples.json` is still
  imported from `hugo/data/`, and D12 adds a read of `hugo/content/`. Both are committed
  content, so neither requires Hugo's build — but `astro/` is not Hugo-free after this.
- **Does not touch `documentation-ci`** (see `CI handoff`).
- **Does not change Hugo** (D3). Hugo keeps its own `all-examples`, and both trees exist
  until cutover — at which point Hugo's target and its single consumer (`Makefile:243`) can
  be deleted outright, per D5. Moving the 148 legacy files into `astro/` is the loose end
  cutover does not close by itself.
