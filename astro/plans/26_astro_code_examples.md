# Astro owns API code examples

## Prompt

Astro's `/api` docs are not yet independent of Hugo. One of the remaining couplings
is the SDK code examples. Break it: Astro should produce these examples itself,
rather than reading artifacts that a Hugo Makefile step put on disk.

## Summarized approach

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
   reading live SDK output, and fall back to that fixture when the staged tree is absent
   so `dev` runs on a clean checkout.

Astro never invokes Hugo's build. What remains is a read of Hugo's *repo* — two
committed JSON files and the 148 legacy examples — which survives until the `/api`
cutover.

## Dependencies

Everything outside `astro/` this mechanism relies on, and how each is reached.

**Fetched over the network, at fetch time**

| Dependency | Access |
| --- | --- |
| `DataDog/datadog-api-client-go` | Public GitHub clone by `scripts/fetchApiCodeExamples.ts`: `--filter=blob:none --sparse`, then `git sparse-checkout set examples`. Ref per Q5 — pinned tag on `master`, else same-named branch with tag fallback. |
| `DataDog/datadog-api-client-java` | Same. |
| `DataDog/datadog-api-client-python` | Same. `examples/datadog/` is excluded by the `examples/v*` copy scope. |
| `DataDog/datadog-api-client-ruby` | Same. |
| `DataDog/datadog-api-client-typescript` | Same. `examples/tsconfig.json` excluded by the same scope. |
| `DataDog/datadog-api-client-rust` | Same, plus the flat-filename → nested-path transform (Q9a). |
| `latest-data-sources.tar.gz` (`websites-sources` data, S3) | Streamed over unauthenticated HTTPS by `scripts/lib/websitesSourcesData.ts` and piped through `tar`, stopping at the single member `./data/sdk_versions.json`. 8.4 MB gzipped; the ~90 MB tree is never extracted. This is the one carve-out from the no-cloud-strings rule (Q6), and the only file that knows the URL. |

**Read off disk from `hugo/`, at build time**

| Dependency | Access |
| --- | --- |
| `hugo/data/api/v1/CodeExamples.json`, `.../v2/CodeExamples.json` | Static import through the `@hugo-site` alias, unchanged by this plan (Q4). Committed, maintained by spec-repo automation — a path dependency, not a build artifact. |
| `hugo/content/en/api/v*/*/*.py`, `*.rb` (148 files) | Copied by the fetch script, enumerated with `git ls-files` run against `hugo/` (Q9b). Reading the git *index* rather than the working tree is what makes this immune to Hugo's build state. |
| `hugo/.gitignore:17-23` | Not read by anything — but load-bearing. It ignores the six generated extensions and deliberately not `.py`/`.rb`, which is the sole reason those 148 files are tracked and permanent. If that list changes, the previous row breaks. |

**Tooling**

| Dependency | Access |
| --- | --- |
| `git` CLI | Shelled out to by the fetch script. Needs partial-clone and sparse-checkout support (2.25+; 2.50.1 locally, and the CI image is well past it). |
| `tar` (npm) | Direct `devDependency` added in Step 0 (Q6a), imported only by `scripts/lib/websitesSourcesData.ts`. |
| Node 24 | Already required by `astro/package.json`'s `pretest` guard. Type-stripping is what lets these be `.ts` files with no build step. |
| `DataDog/documentation-ci` | Not a dependency of the code — the CI job that invokes the fetch lives there, per `Handoff` below, because this repo holds no deploy logic. |

## Background: how this works today

Curl is already Astro's. [`src/lib/api/curlBuilder.ts`](../src/lib/api/curlBuilder.ts)
synthesizes the curl snippet from the OpenAPI spec, and
[`operationBuilder.ts`](../src/lib/api/operationBuilder.ts) calls it. No Hugo
involvement.

Every other language comes out of Hugo's tree:

- [`src/lib/api/codeExampleLoader.ts`](../src/lib/api/codeExampleLoader.ts) globs
  `@hugo-site/content/en/api/v*/*/*.{go,java,py,pybeta,rb,rbbeta,rs,ts}` and imports
  `@hugo-site/data/api/v{1,2}/CodeExamples.json`.
- `@hugo-site` resolves to `../hugo` (`astro.config.mjs:185`, `tsconfig.json:8`).

Those two inputs have *different* provenance, which matters for scoping:

**1. The source files are build artifacts.** `hugo/Makefile:204+` defines
`EXAMPLES_template` and `all-examples`. For each of the six
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
no SDK examples until Hugo's make step has run. Nothing in `astro/package.json`
triggers it — it is a silent external prerequisite.

**2. `CodeExamples.json` is not a build artifact.** It lives in `hugo/data/api/v{1,2}/`
and is committed. It is updated by spec-repo automation ("Regenerate client from
commit X of spec repo"). It maps `operationId` → `[{group, suffix, description}]`,
which is how the loader knows which suffixed filenames to look for. This is a
*path* dependency on `hugo/`, not a *build-step* dependency.

**3. `sdk_versions.json` decides only which git tag to clone.** Findings from
investigating it (recorded here because they were not cheap to establish):

- It ships inside `latest-data-sources.tar.gz`, which
  `hugo/Makefile:152-158` downloads from S3 and extracts to `hugo/_vendor/`
  (one of ~25 JSON files there, the other 24 irrelevant to API docs).
  `hugo/Makefile:212` greps a tag out of it; that is its only consumer in
  either repo.
- **Nothing in `websites-sources` produces it.** Its `data/` is gitignored and
  `rm -rf`'d by clean; every other file there has an explicit Makefile target
  (`Makefile:80-185`) and appears in `DATA_SOURCES` (`Makefile:255-274`) —
  `sdk_versions.json` has neither. A case-insensitive `grep -rni sdk` over the
  whole repo returns one unrelated hit. The tarball is packed by
  `.gitlab-ci.yml:110-122`, which tars `./assets ./content ./data` wholesale,
  so whatever is in `data/` at that moment ships. Grepping every Datadog repo
  checked out locally for `sdk_versions` returns only `hugo/Makefile`.
- **So its producer is unidentified.** Plausibly the CI image
  (`registry.ddbuild.io/ci/websites/websites-sources`) or a job in a repo not
  available locally. Not worth guessing at; noted so nobody re-runs the search.
- **It is live and current.** Production's tarball was rebuilt the day this was
  checked and still contained the file.
- **Its contents equal each client's latest GitHub release.** All six matched
  exactly, published within two days of each other, so it functions as a
  latest-release tracker and turns over roughly weekly. One snapshot only —
  this does not prove a client is never deliberately held back.
- Tag formats differ per repo (`v2.65.0`, `datadog-api-client-2.60.0`, bare
  `2.60.0`, `0.36.0`), so any replacement needs a per-repo lookup, not a
  version formula.
- The download is **public and unauthenticated**: Hugo's
  `get_websites_sources_data.py` uses a bare `requests.get`, and a
  credential-free `curl | tar -xzO ./data/sdk_versions.json` against the
  production object returns the six pins. 8.4 MB gzipped, ~90 MB extracted.

## Constraints to respect

- **`astro/` may not edit Hugo.** Per `astro/CLAUDE.md`, this work must not change
  `hugo/Makefile`'s content/build targets. Hugo keeps its own examples step until
  the `/api` cutover; expect the two to coexist and duplicate work for a while.
- **No deploy code.** Nothing under `astro/` may touch AWS, S3 names, CloudFront, or
  credentials. A fetch script that clones public GitHub repos is fine; anything that
  reaches into Datadog cloud infrastructure is not, and belongs in
  `DataDog/documentation-ci`.
- **Public repo.** Vendoring hundreds of generated SDK example files into `astro/`
  is a visible, reviewable, and large addition. Weigh that.
- **Dev server must run without the fetch.** `astro/CLAUDE.md` requires a
  `mocked-dependencies/` placeholder for any external resource that isn't plumbed in.
- **Unit tests read fixtures, not live data.** `vitest.unit.config.ts` redirects
  `@hugo-site/data/api` to `tests/fixtures/api/`. Whatever replaces the Hugo path
  needs the same treatment.

## Open questions

Answer these one at a time. Record each answer in the `Decisions` table below as it is
settled; do not start `Claude's plan` until they are all resolved.

**Status — all questions answered.** Q1 through Q10, plus the sub-questions raised
during discussion (Q3a, Q6a, Q7a, Q7b, Q8a, Q8b, Q8c, Q9a, Q9b, Q10a, Q10b). The
questions are left in place below for context; their outcomes are in `Decisions`,
and `Claude's plan` is written. Three items are deliberately left for implementation
rather than decided here — they are listed at the top of the plan.

### Q1 — What does "generate" mean here? (blocking; everything else depends on it) — ANSWERED

Three readings, very different in size:

- **(a) Astro fetches and stages.** Port the clone-and-copy logic out of the Makefile
  into an Astro-owned script. Same inputs, same outputs, new owner. Astro stops
  reading `hugo/content/`. This is *vendoring*, not generation — the examples are
  still authored by codegen in the SDK repos.
- **(b) Astro synthesizes.** Emit Go/Java/Python/Ruby/TypeScript/Rust snippets from
  the OpenAPI spec directly, the way `curlBuilder` does for curl. No SDK repos in
  the loop at all.
- **(c) Astro consumes a package.** Get the examples from a distributed artifact
  (npm package, `websites-sources`, or similar) instead of six git clones.

**Note before answering (b):** the SDK examples are not mechanical translations of
the spec. They are generated inside each client repo by that repo's own templates,
against that repo's idioms and type names, and are compile-checked there. `curlBuilder`
works because curl is a thin shell over the HTTP request; there is no equivalent thin
mapping to `v1.DashboardsApiCreateDashboardRequest`. Reproducing six language
generators in Astro is a large, permanently-drifting commitment. Which of a/b/c?

### Q2 — Where do fetched examples land, and are they committed? — ANSWERED

Gitignored working directory under `astro/` (matching Hugo's model), or committed
into the repo so builds are hermetic and reviewers see diffs? Roughly how many files
and megabytes are we talking about — worth measuring before deciding.

### Q3 — What triggers the fetch? — ANSWERED

A `prebuild`-style script in `package.json`, an Astro integration hook, or a Vite
plugin resolving lazily? Note Yarn Berry ignores arbitrary `pre*` hooks — the repo
already works around this for `build:ask-ai` by chaining explicitly.

### Q4 — Does `CodeExamples.json` move too? — ANSWERED

It is committed, not generated, so Astro could keep importing it from `hugo/data/`
indefinitely. But that leaves an `@hugo-site` import in the code-example path, so
this plan would not fully "decouple" anything. Options: keep the Hugo import; copy it
into `astro/` as vendored data (needs a sync story, since spec automation only
updates Hugo's copy); or ask the spec-repo automation to write both.

### Q5 — Keep the branch-matching behavior? — ANSWERED

The Makefile tries `<current-branch>` in each SDK repo before the pinned tag, so a
coordinated spec-repo PR can preview against unreleased client code. Does Astro need
that, or is pinned-tag-only acceptable?

### Q6 — Where do pinned SDK versions come from? — ANSWERED

`sdk_versions.json` currently arrives via `websites-sources` into `hugo/_vendor/`.
Astro reading that path is the same coupling in a new place. Alternatives: pin
versions in a file under `astro/`, or fetch `websites-sources` independently.

### Q7 — CI cost, and who pays it? — ANSWERED

Six shallow clones per build, duplicated between the Hugo job and the Astro job until
cutover. Acceptable, or does this need caching / a shared artifact? Does the Astro CI
job in `documentation-ci` need changes, and is that in scope for this plan?

### Q8 — Mock and fixture strategy — ANSWERED

What does `mocked-dependencies/` hold so `yarn dev` works on a fresh clone with no
network — a handful of representative examples, or empty? And do
`tests/fixtures/api/` and the `getOperationView` snapshots need to change?

### Q9 — Port the filename quirks, or fix them? — ANSWERED

`.py`→`.pybeta`, `.rb`→`.rbbeta`, and the Rust flat-to-nested `sed` rewrite exist to
work around Hugo's content pipeline (Hugo would otherwise try to render or ignore
those files). Astro has no such constraint. Reproduce them for parity, or drop them
and simplify `codeExampleLoader.ts`'s extension list?

### Q10 — Is Hugo's `/api` still a consumer? — ANSWERED

Until cutover, Hugo renders `/api` from the same staged files. Confirm this plan
leaves Hugo's path completely untouched, and that we accept two independent copies of
the same examples on disk during the overlap.

## Decisions

| Question | Decision |
| --- | --- |
| Q1 — What "generate" means | **(a) Astro fetches and stages.** Close to a straight port of the Makefile's clone-and-copy: same six repos, same pinned tags, Astro-owned script writing to an Astro-owned directory. Obvious improvements and Astro-idiomatic shaping are welcome, but the bones must stay recognizable as the same process. Not (b) — Astro will not synthesize SDK code. |
| Q2 — Staging location | **Gitignored, non-hidden `astro/api-code-examples/`.** Mirrors Hugo's model: Astro's fetch script writes the staged tree there, `astro/.gitignore` excludes it, nothing enters git. Not hidden — `.astro/` is the only hidden generated dir here, while `dist/`, `node_modules/`, and `test-results/` are not, and a hidden path both hurts discoverability and risks being skipped by `import.meta.glob`'s dotfile handling. Not committed: 13,544 files / ~55 MB of generated code would churn on every SDK bump in a public repo that has already hit pack-size trouble. Whether to shrink the ~900 MB of clones with sparse checkout is deferred to Q7. |
| Q3 — Fetch trigger | **Explicit script, chained into the `dev`/`build` scripts.** A Node script (`astro/scripts/fetchApiCodeExamples.ts`) exposed as `yarn fetch:examples` and chained the same way `build:ask-ai` already is, since Yarn Berry ignores arbitrary `pre*` hooks. It no-ops when the staged tree is present and current, so repeat runs are cheap. Chosen over an Astro integration hook (hides a multi-minute network step inside the build, awkward to run or skip alone) and a lazy Vite plugin (furthest from Hugo's shape, and conflicts with the eager `import.meta.glob` the loader uses). Keeping it a standalone step is also what makes it recognizably the same process as the Makefile target. |
| Q3a — Script language | **TypeScript, run directly by Node.** Verified against this project's pinned Node 24.19: `node scripts/foo.ts` executes with no flag, no warning, and no `tsx`/`ts-node` dependency. Two constraints follow. (1) *Erasable syntax only* — Node strips types rather than compiling, so no `enum`, no constructor parameter properties, no `namespace`, and type-only imports must use `import type`. (2) This diverges from the sole existing precedent, `scripts/verifyDist.mjs`, which stays plain JS; converting it is unrelated scope. **The open confirmation is now closed: `scripts/` is already covered.** `astro/tsconfigs/base.json` sets `"include": ["${configDir}/.astro/types.d.ts", "${configDir}/**/*"]` and `astro/tsconfig.json` does not override it, so `astro check` (wired as `yarn typecheck`, `package.json:21`) already walks `scripts/` — and already typechecks `verifyDist.mjs` as JS, via `allowJs: true`. Two further findings from that file. **`allowImportingTsExtensions: true` is already on**, which matters because Node's type-stripping *requires* the literal extension in relative imports (`from "./lib/websitesSourcesData.ts"`) where TypeScript rejects it by default; record this so a later reader does not "fix" the extension off and break the script at runtime while `yarn typecheck` stays green. And **`verbatimModuleSyntax: true` already enforces the `import type` half of constraint (1) mechanically**, but nothing enforces the other half — `enum`, `namespace`, and constructor parameter properties all typecheck and then fail under Node. TypeScript here is 5.9.3, so add `"erasableSyntaxOnly": true` to `astro/tsconfig.json` and the whole constraint becomes a typecheck error instead of a runtime one. |
| Q4 — `CodeExamples.json` | **Keep importing it from `hugo/data/`.** `codeExampleLoader.ts:13-14` stays as-is. This file is committed and maintained by spec-repo automation, not produced by the Makefile, so it is not part of the build-step coupling this plan removes. Leaving it alone keeps it always present on a fresh clone with no network and needs no sync story. **Scope consequence, stated plainly: this plan decouples the build step, not the data.** An `@hugo-site` import remains in the code-example path, the loader reads from two trees (staged sources under `astro/api-code-examples/`, index under `hugo/data/`), the Vitest redirect in `vitest.unit.config.ts:25-32` keeps its Hugo-shaped paths, and the Q8 mock has to straddle both trees. Rejected alternatives: copying it during the fetch (consolidates the coupling but adds a copy step for a non-artifact); vendoring a committed copy (silent drift — automation updates only Hugo's copy, so newly staged examples would be absent from the index and never render, with nothing erroring); asking spec automation to write both (cleanest end state, but blocks on another team). |
| Q5 — Branch matching | **Port it as-is.** On `master`, clone the pinned tag. On any other branch, try a same-named branch in each SDK repo first and fall back to the tag. This preserves the coordinated-preview workflow (a spec-repo PR can be previewed against unreleased client code) and keeps the process recognizably Hugo's. Accepted cost: up to six failed clone attempts on an ordinary branch, since branch names rarely match across repos. The fetch script should make that failure quiet and expected — a failed branch clone is the normal path, not an error worth surfacing. Rejected: tag-only (deterministic but drops coordinated previews) and an opt-in override flag (same capability, lower cost, but diverges from Hugo's automatic behavior). |
| Q6 — SDK version pins | **Download the same tarball Hugo does, behind one isolated module.** Astro's fetch streams `latest-data-sources.tar.gz` over public HTTPS and pulls out just `./data/sdk_versions.json` — the most direct port, and it cannot drift from Hugo. **All of it is confined to a single file** (proposed: `scripts/lib/websitesSourcesData.ts`): the bucket name, the path/prefix variable, the URL builder, the fetch, the tar-member extraction, and the parse. `fetchApiCodeExamples.ts` imports one function that returns typed pins and knows nothing about S3 or tar. On the `astro/CLAUDE.md` "no S3 bucket names or key prefixes" rule: the confidentiality reading does not apply, because `dd-websites-sources` and the `staging` default are **already committed in this public repo** at `hugo/local/bin/py/build/get_websites_sources_data.py:16-17`. The rule sits under "No deploy code" and targets deploy mechanics — AWS CLI/SDK, CloudFront, IAM, credentials — none of which this touches; it is an unauthenticated GET, verified working with no credentials. Add a line to `astro/CLAUDE.md` recording the carve-out so the next reader does not re-derive it. Rejected: a committed pin file (reproducible and offline, but least faithful and drifts from Hugo); resolving latest GitHub releases (never stale, but non-reproducible builds); preferring `hugo/_vendor` when present (build inputs would then depend on whether an unrelated make target had run). |
| Q6a — Tar extraction | **Use `tar`, promoted to a direct `devDependency`.** `tar@7.5.22` is already in `node_modules`, but only **transitively** — so this means an explicit entry in `astro/package.json`, not relying on hoisting, which is unreliable under Yarn PnP and would break silently when an unrelated dependency drops it. Chosen over the zero-dependency route (Node 24.19 has `DecompressionStream("gzip")`, and walking tar's 512-byte headers to one member is roughly 40 lines) because hand-rolling a tar parser to avoid a single well-maintained, ubiquitous devDependency trades a one-line manifest change for a piece of bespoke binary-format code that someone has to understand later. Either route reads only the 8.4 MB gz stream and stops at the member's offset, so the ~90 MB extracted tree is never materialized; the choice is about maintenance, not cost. Confine it to `scripts/lib/websitesSourcesData.ts` per Q6 — nothing else imports `tar`. |
| Q7 — Clone shape | **Blobless + sparse.** Clone each repo with `--filter=blob:none --sparse` at the resolved ref, then `git sparse-checkout set examples`, so only the blobs we actually copy are fetched rather than the full ~900 MB of six trees (go 163M, java 178M, python 130M, ruby 139M, rust 157M, typescript 135M). This is the one deliberate divergence from `hugo/Makefile:216-219`'s plain `--depth 1 --branch <tag>`, and it is self-contained inside our fetch script — the process shape (resolve ref → clone → rewrite filenames → copy `examples/v*`) is unchanged. Requires a partial-clone-capable server; github.com supports `blob:none`. **Caching was investigated and is not implementable given Q6:** GitLab resolves `cache:key:files` before a job's script runs (documented at `documentation-ci/ci-templates/base.yml:77`), and Q6 fetches the pins at runtime, so there is no committed file to key a cache on. A cache would require reversing Q6. Nothing caches these clones today either — the only CI caches are Hugo modules, yarn, and pip (`base.yml:212-250`), and production deliberately runs `make clean-examples` first (`production.yml:24`). |
| Q7a — `documentation-ci` scope | **Document, don't change.** No `documentation-ci` commits are part of this work — there is no Astro CI job there to amend yet (`grep -ri astro` across that repo returns only prose in `DYNAMIC-PIPELINES-FINDINGS.md` and spike comments). Instead this plan carries a `Handoff: documentation-ci` section written **for the CI engineer**: what the feature adds, what it needs from a job, and what it means for pipeline cost. It is an artifact to hand over, not a task list for us. |
| Q7b — Other Hugo processes to port | **None. The six clones have exactly one consumer.** Checked because it would have widened scope: `hugo/Makefile:243` (`cp -Rn examples/$(1)/examples/v* ./content/en/api`) is the only thing that reads the clones. Grepping `hugo/local`, `hugo/layouts`, `hugo/config`, `hugo/package.json`, `Makefile`, and `Makefile.config` for `datadog-api-client` returns hits only inside the `EXAMPLES_template` block (`Makefile:27`, `222-260`); `EXAMPLES_DIR` at `Makefile:26` is defined and never referenced anywhere — dead. Of the other six steps in Hugo's `dependencies` chain (`Makefile:147`), only `build-api-derefs` (`Makefile:95` → `assets/scripts/build-api-derefs.js`) touches API docs, and Astro deliberately does not port it: `src/lib/api/refResolver.ts` resolves `$ref`s at render time instead, as its own comments note. `update_pre_build`'s `pull_config.yaml` has no `api` entries. So porting `all-examples` leaves no API-docs process unported. |
| Q8 — Test inputs | **Freeze the example sources as a fixture.** Add `tests/fixtures/api/examples/` holding the 48 files the seven `getOperationView` snapshots actually embed (~40 KB), and point the unit suite at it. **This closes a hole that predates this plan:** `vitest.unit.config.ts:15-43` redirects only the two `full_spec.yaml` and two `CodeExamples.json`; the `import.meta.glob` at `codeExampleLoader.ts:17-20` was never redirected, so unit tests read the live `hugo/content/en/api/` tree. Almost all of that tree is gitignored build output (`hugo/.gitignore:17-23` covers `.go`, `.java`, `.pybeta`, `.rbbeta`, `.ts`, `.rs`; only 67 legacy `.py` and 81 `.rb` files are tracked, against ~2,232 of each ignored extension on a built machine). The snapshots embed Go, Java, TypeScript and Rust, so on a fresh clone all seven fail as opaque diffs rather than as "you have not run the build." Q1 does not remove that coupling, it relocates it — from Hugo's build to `yarn fetch:examples` — and drops the fresh-clone floor from a couple of languages to zero, so the glob has to be repointed either way. **Mechanism is cheaper than the redirect already in the repo:** the glob resolves through an alias today, so give `astro/api-code-examples/` its own alias next to `@hugo-site` in `astro.config.mjs:185` and have `vitest.unit.config.ts` repoint that one alias — one line per config, no `resolveId` interception and no double-slash workaround (`vitest.unit.config.ts:37-39`). **Maintenance cost, measured not estimated:** `git log -- tests/fixtures/api` is a single commit (its creation) despite 14 upstream `CodeExamples.json` regenerations in the last 12 months, because only two things force an edit — adding an `ENDPOINT_AUDIT_CASES` entry (7 since creation, never changed) or adding a suffix to the fixture index, which is a hand edit already. Upstream drift is not a blind spot: `vitest.integration.config.ts` deliberately omits the plugin and `tests/integration/viewsBuilder.full-spec.test.ts` runs the same `auditCases.ts` against the live spec. Rejected: leaving the coupling (headless suite then needs a network fetch first); keeping the test glob pointed at `hugo/content/` after production moves off it (preserves snapshots byte-for-byte but tests a path production no longer uses). |
| Q8a — Dev fallback | **Prompt, and read the fixtures in place.** When `astro/api-code-examples/` is absent or empty, `yarn dev` asks the developer whether to run the fetch now or use the test fixtures. Choosing fixtures writes **nothing** — the loader reads `tests/fixtures/api/examples/` directly for that run. Consequence, accepted: the prompt fires on every `yarn dev` until a real fetch happens. That is the point — there is never fixture data sitting in the staged directory pretending to be real, and no marker file or clear-before-fetch step is needed. Offline dev shows genuine examples for the seven audited operations and none elsewhere. Rejected: copying fixtures into the staged dir (silences the prompt, but a later fetch then has to overwrite or clear it, and until it does the two are indistinguishable on disk); a separate sample set under `mocked-dependencies/` (a third copy of example data to rot); hard-failing (no offline dev at all). **This deliberately crosses the `mocked-dependencies/` vs. `tests/fixtures/` line that `astro/CLAUDE.md` draws** — the fixture is doing mock duty. The justification is that a second copy of the same 48 files would drift, and the prompt makes the substitution explicit rather than silent. Record the carve-out in `astro/CLAUDE.md` alongside the Q6 one. |
| Q8b — Fixture provenance banner | **Every fixture example carries a header comment.** Each of the 48 files starts with a note in its own language's comment syntax (`//` for Go, Java, TypeScript, Rust; `#` for Python, Ruby) reading, in substance: `NOTE: This code example was populated from the test fixtures in tests/fixtures/api/examples/.` So a developer who picked the fixture path at the prompt sees it on the rendered page, not just in terminal scrollback, and a surprising snapshot diff names its own source. Two knock-ons to handle at implementation: the seven `getOperationView` snapshots must be regenerated (`yarn test -u`) because the banner becomes part of the asserted `code` strings; and the fixture files then differ from their upstream originals by exactly one leading line, which still satisfies the "diffs cleanly against upstream" intent recorded at `.prettierignore:21-23`. |
| Q8c — Non-interactive dev | **Assumption, not a decision — flag at implementation.** A prompt must never hang a non-TTY process. Proposed default: with no TTY, `dev` takes the fixture path silently and logs why; `build` never prompts and always runs the real fetch, so no build can ship fixture data. Revisit if the Astro CI job ends up invoking `dev`. |
| Q9 — Filename quirks | **Port the rename as-is.** Fresh SDK output is staged as `.pybeta`/`.rbbeta`, the 148 committed legacy `.py`/`.rb` files come along too, and `codeExampleLoader.ts:70-71` keeps its four-extension precedence chain untouched. **The question as originally written mis-stated the reason for the rename**, so record the real one: it is not a Hugo rendering workaround. `hugo/config/_default/params.yaml:12-35` declares `py` as "python-legacy" and `pybeta` as "python" — two distinct languages — and the rename (belt-and-braced by `cp -Rn`) exists so freshly cloned SDK output lands *beside* the legacy files committed under `hugo/content/en/api/` rather than over them. Astro already collapses that pair into one Python entry with `.pybeta` preferred, so the rename's only value here is keeping the legacy files reachable. **Measured: it is worth 8 files out of 148.** 65 of 67 `.py` and 75 of 81 `.rb` have a modern sibling that wins today and would win identically without the rename. The legacy-only set is `MuteMonitor` (`.py`+`.rb`), `UnmuteMonitor` (`.py`+`.rb`), `CreateSlackIntegration`, `DeleteSlackIntegration`, `GetSlackIntegration` (`.rb`), and `GetUsageTrace` (`.rb`, and no longer in `data/api/v1/full_spec.yaml`). No current SDK clone has an example for any of those operations. Rejected: dropping the rename and the 8 files (simplest loader, but five live operations would render fewer language tabs in Astro than in Hugo); dropping the rename and vendoring the 8 into Astro as committed content (parity at ~8 KB, but Astro would then own hand-maintained API content); dropping the rename and globbing the 8 out of Hugo (parity with no vendoring, but the loader would read example sources from two trees with cross-tree precedence, and the Q8 fixture would have to straddle both). **Knock-on for Q8: none.** The extension set is unchanged, so the 48 fixture files keep the names they have and the sizing recorded in Q8 stands. |
| Q9a — Rust flat-to-nested | **Not a decision — it must be ported.** The `sed` at `hugo/Makefile:240-242` is a genuine format conversion, not a Hugo workaround: `datadog-api-client-rust` stores its examples flat (`examples/v1_aws-integration_CreateAWSAccount.rs`), while go, java, python, ruby and typescript all ship the nested `examples/v1/<category>/` layout the copy step expects. Astro needs the same conversion or it stages no Rust at all. Semantics to preserve: the two `sed` expressions replace the **2nd** underscore and then the **1st**, i.e. split on the first two underscores only — which is why suffixed names like `v1_usage-metering_GetUsageNetworkHosts_1249907835.rs` survive with their trailing underscore intact. Category slugs use hyphens, never underscores, so two splits is always right. In the fetch script this is a few lines of JS, not a shell rewrite. Also worth carrying over: the copy is scoped to `examples/v*`, which is what excludes `examples/datadog/` (go, python) and `examples/tsconfig.json` (typescript) from the staged tree. |
| Q9b — Where the legacy files come from | **Inference from Q9, flag at implementation.** "Port the rename as-is" settles the naming but not the sourcing: the 148 legacy `.py`/`.rb` files are committed **only** in `hugo/content/en/api/`, and no SDK clone produces them. Proposed default: the fetch script copies them from Hugo into `astro/api-code-examples/` as one more staging step, so the loader keeps reading exactly one tree and Q8's fixture stays single-tree. The alternative — a second `import.meta.glob` pointed at `@hugo-site/content/` — is a deeper coupling than Q4's and would split example sourcing across two trees with cross-tree precedence. Either way this is a read of Hugo, not a change to it, so it stays inside the `astro/CLAUDE.md` boundary. **This does not reintroduce a dependency on Hugo's build — it depends on Hugo's *repo*, and that is mechanically enforced.** `hugo/.gitignore:17-23` ignores `content/en/api/**/*.{go,java,pybeta,rbbeta,ts,rs}` and deliberately **not** `.py`/`.rb`, which is exactly why these 148 are tracked; they are present after a bare `git clone` with no network and no `make` ever run, and `make clean` (`git clean -Xf ./content`, ignored-only) cannot remove them. **Source them with `git ls-files 'content/en/api/v*/*/*.py' 'content/en/api/v*/*/*.rb'`, not a filesystem glob.** `git ls-files` reads the index rather than the working tree, so it returns the same 148 on a machine where Hugo *has* been built and structurally cannot pick up build output; a filesystem glob would return whatever Hugo happens to have staged. Same class of dependency as Q4 — committed content, not a build artifact — so the hard constraint that Astro never runs Hugo's build still holds. |
| Q10 — Hugo `/api` during overlap | **Confirmed, with one correction to the question's wording.** Hugo keeps rendering `/api` from its own staged tree and this plan writes nothing into `hugo/`. But "completely untouched" is not literally true: Q9b has Astro **reading** `hugo/content/en/api/` for the 148 committed legacy files, so Hugo remains a read dependency that outlives cutover unless those files move into `astro/`. Flag that as the one thing cutover does not automatically resolve. **The separation is enforced by a single mechanism worth naming, because everything else follows from it:** `hugo/.gitignore:17-23` ignores exactly `content/en/api/**/*.{go,java,pybeta,rbbeta,ts,rs}` and not `.py`/`.rb` — that one list is what makes fresh SDK output disposable and the 148 legacy files permanent, and it is why `make clean` (`git clean -Xf ./content`) can wipe the staged tree without touching them. **Two copies on disk during overlap: accepted, and smaller than it sounds.** Measured: `hugo/content/en/api/` holds 13,544 example files at 56 MB, and `astro/api-code-examples/` will hold the same 13,544 at ~55 MB. The dominant disk cost is not the staged output but the clones — Hugo's six full `--depth 1` trees are **900 MB**, and Q7's blobless + sparse clones mean Astro does not repeat that. So the overlap adds ~56 MB of duplicated output, not a second 900 MB. |
| Q10a — `astro/.gitignore` entry | **Missing today; add it as an explicit implementation step.** Q2 decided the staged tree is gitignored but did not say where the rule lives, and `astro/.gitignore` currently has no `api-code-examples/` entry. Without it the first `yarn fetch:examples` puts 13,544 untracked files in `git status`, in a public repo that has already hit pack-size trouble. One line, but it is the kind of one line that gets missed precisely because every decision above assumes it. |
| Q10b — Can the two copies diverge? | **Only in a narrow window; a footnote, not a design constraint.** Q5 kept branch-matching, so each fetch independently tries a same-named branch in each SDK repo before the pinned tag (`hugo/Makefile:211-220`, where `BRANCH` is the *documentation* repo's own branch from `Makefile:25`). Both fetches compute the same `BRANCH` from the same checkout and read the same `sdk_versions.json`, so they resolve **identically** on the common path — and tags do not move, so a `master` build cannot diverge at all. Divergence requires the *SDK-side* branch to change between the Hugo job's fetch and the Astro job's: created, deleted, or advanced (`--depth 1 --branch <name>` takes the tip, so an advancing branch is the likeliest). The jobs run minutes apart and this only affects the coordinated-preview workflow. Consequence if it happens: both sites render fine, they just show different code — noticeable only when someone compares Hugo `/api` against Astro `/api` on a preview branch, which is what the overlap is for. Accepted without mitigation; recorded so the symptom is diagnosable rather than mysterious. |

## CI requirements

**What a job that runs this feature needs.**

- Outbound HTTPS to `github.com` (six `git clone`s) and to the public `websites-sources`
  data-sources object on S3 (one unauthenticated `GET`, ~8.4 MB, streamed).
- **No credentials.** Not the AWS CLI, not an SDK, not a role. The S3 read is anonymous
  and was verified working with none; the clones are public repos over HTTPS.
- The `yarn fetch:examples` step must run before `astro build`. In the repo it is chained into the `dev` and `build` scripts, so a job that runs `yarn build` gets it without extra steps; a job that wants it as a separate, separately-timed stage can call `yarn fetch:examples` directly.

## Claude's plan

### Left for implementation, deliberately

Everything else below is decided. These three are not, and are flagged where they land:

1. **Q8c — non-TTY `dev`.** Proposed default: no TTY → take the fixture path silently
   and log why; `build` never prompts. Confirm before writing the prompt.
2. **Q9b — sourcing the 148 legacy files.** Proposed default: the fetch script stages
   them from Hugo via `git ls-files`. Decided in substance, but it is the one step that
   reads outside `astro/`, so it deserves a second look in review.
3. **Q10a — the `astro/.gitignore` line.** Not a decision, just the step most likely to
   be forgotten. It is listed as Step 0 for that reason.

### Shape

```
scripts/
  fetchApiCodeExamples.ts        # driver: resolve → clone → transform → stage
  lib/
    websitesSourcesData.ts       # ALL S3/tar knowledge lives here, and nowhere else
api-code-examples/               # gitignored staging target; the build's only input
  v1/<category>/<Operation>.<ext>
  v2/<category>/<Operation>.<ext>
tests/fixtures/api/examples/     # 48 frozen files, ~40 KB, banner-prefixed
```

The driver should read as the Makefile target does, because that was the point of Q1:
resolve pins → clone six repos → rename → nest Rust → copy `examples/v*` → stage the
legacy files.

### Step 0 — the wiring that everything assumes

Small, and worth doing first so nothing downstream is written against a missing
premise.

- `astro/.gitignore`: add `api-code-examples/` (Q10a).
- `astro/tsconfig.json`: add `"erasableSyntaxOnly": true` (Q3a). This makes the
  Node-can't-run-`enum` constraint a typecheck failure instead of a runtime one, before
  any of the new TypeScript exists to violate it.
- `astro/package.json`: add `tar` as a direct `devDependency` (Q6a).
- `astro/CLAUDE.md`: record the two carve-outs — the public-S3 read (Q6) and the
  fixture-as-mock exception (Q8a). Both are deviations from rules that file states
  plainly, so an unexplained deviation reads as a mistake to the next person.

### Step 1 — `scripts/lib/websitesSourcesData.ts`

One exported function returning the six typed pins. Streams
`latest-data-sources.tar.gz` over unauthenticated HTTPS, pipes through `tar`, stops at
`./data/sdk_versions.json`, parses, returns. Validate with Zod, matching the loader's
existing habit — a silently-missing pin should fail loudly rather than fall through to
a branch clone that also fails.

Everything about S3 and tar is confined here (Q6). The driver imports one function and
knows nothing about either. Tag formats differ per repo (`v2.65.0`,
`datadog-api-client-2.60.0`, bare `2.60.0`, `0.36.0`), so the return type is a
per-repo lookup, never a formula.

### Step 2 — `scripts/fetchApiCodeExamples.ts`

Per repo, in order:

1. **Resolve the ref** (Q5). On `master`, the pinned tag. Otherwise try a same-named
   branch, fall back to the tag. Up to six failed branch clones on an ordinary branch
   is the *normal* path — keep that quiet, or every developer sees six scary errors on
   every fetch.
2. **Clone** `--filter=blob:none --sparse`, then `git sparse-checkout set examples`
   (Q7). The one deliberate divergence from Hugo, and self-contained.
3. **Rename** `.py` → `.pybeta`, `.rb` → `.rbbeta` (Q9).
4. **Nest Rust** (Q9a). Split the flat name on its **first two underscores only** —
   `v1_aws-integration_CreateAWSAccount.rs` → `v1/aws-integration/CreateAWSAccount.rs`.
   Two splits, never a global replace: that is what preserves suffixed names like
   `v1_usage-metering_GetUsageNetworkHosts_1249907835.rs`. Category slugs use hyphens,
   never underscores, so two is always right.
5. **Copy `examples/v*`** into `api-code-examples/`. The `v*` scope is load-bearing —
   it is what excludes `examples/datadog/` (go, python) and `examples/tsconfig.json`
   (typescript).

Then once, after the six: **stage the 148 legacy files** (Q9b) with
`git ls-files 'content/en/api/v*/*/*.py' 'content/en/api/v*/*/*.rb'` against `hugo/`,
copying without clobbering. `git ls-files` rather than a filesystem glob is the whole
point — it reads the index, so it returns the same 148 whether or not Hugo has been
built, and cannot pick up Hugo's build output.

The script no-ops when the staged tree is present and current (Q3), so chaining it into
`dev` does not cost a minute on every restart.

### Step 3 — repoint the loader

Add an alias for `api-code-examples/` beside `@hugo-site` in `astro.config.mjs:185` and
`tsconfig.json`, then change the one glob at `codeExampleLoader.ts:17-20` to use it.
`FILE_KEY_RE` (`:22`) must change with it — it currently matches
`/content/en/api/(v1|v2)/…`, which the new tree does not contain.

Nothing else in the loader moves. `LANGUAGES` keeps its four-extension precedence
(`:70-71`) untouched, per Q9. The two `CodeExamples.json` imports (`:13-14`) stay
pointed at Hugo, per Q4.

### Step 4 — close the fixture hole

Per `astro/CLAUDE.md`, write this before Step 3 and watch it fail. It is the one place
here where red-to-green is genuinely available: the seven `getOperationView` snapshots
currently pass by reading live Hugo build output, so a correct fixture makes them fail
loudly the moment the glob moves.

- Freeze the 48 files the snapshots actually embed into `tests/fixtures/api/examples/`
  (~40 KB), each with the Q8b provenance banner in its own comment syntax.
- Repoint the new alias in `vitest.unit.config.ts` — one line, no `resolveId`
  interception and no double-slash workaround (contrast `:37-39`).
- Regenerate the seven snapshots (`yarn test -u`), since the banner is now part of the
  asserted `code` strings (Q8b).
- Leave `vitest.integration.config.ts` alone. It deliberately omits the redirect, which
  is what keeps upstream drift visible.

This fixes a hole that predates the plan: the glob was never redirected, so unit tests
have always read the live tree. Q1 does not create that problem, it lowers the
fresh-clone floor to zero and so forces the fix.

### Step 5 — dev fallback

When `api-code-examples/` is absent or empty, `yarn dev` asks: fetch now, or use the
fixtures? Choosing fixtures **writes nothing** — the loader reads
`tests/fixtures/api/examples/` in place for that run (Q8a). The prompt therefore fires
on every `yarn dev` until a real fetch happens, which is the intended behavior: there
is never fixture data sitting in the staged directory pretending to be real. Non-TTY
behavior is open item 1.

### Step 6 — verify

- `yarn typecheck` — also confirms Step 0's `erasableSyntaxOnly` holds for the new
  scripts.
- `yarn test:headless-ai src/lib/api` while iterating; full `yarn test-ai` before done.
- Delete `api-code-examples/`, run `yarn fetch:examples`, confirm 13,544 files / ~55 MB
  and that `git status` stays clean.
- Compare a rendered operation page against Hugo's `/api` for the same operation, for
  each of the six languages. The five legacy-only operations named in Q9 —
  `MuteMonitor`, `UnmuteMonitor`, `CreateSlackIntegration`, `DeleteSlackIntegration`,
  `GetSlackIntegration` — are the sharpest test, since they are exactly the pages that
  regress if Step 2's legacy staging is wrong. They fail *quietly*, by rendering fewer
  language tabs, so check them explicitly rather than trusting a green build.
- Recommend the production build to the user as the final step rather than running it.

### What this does not do

- **Does not decouple the data, only the build step** (Q4). `CodeExamples.json` is still
  imported from `hugo/data/`, and Q9b adds a read of `hugo/content/`. Both are committed
  content, so neither requires Hugo's build — but `astro/` is not Hugo-free after this.
- **Does not touch `documentation-ci`** (Q7a). See `Handoff` above.
- **Does not change Hugo** (Q10). Hugo keeps its own `all-examples`, and both trees
  exist until cutover — at which point Hugo's target and its single consumer
  (`Makefile:243`) can be deleted outright, per Q7b. Moving the 148 legacy files into
  `astro/` is the loose end cutover does not close by itself.
