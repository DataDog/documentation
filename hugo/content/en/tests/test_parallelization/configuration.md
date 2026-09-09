---
title: Configure Test Parallelization
description: Configure Test Parallelization environment variables, parallelism selection, worker settings, and plan artifacts.
further_reading:
  - link: "/tests/test_parallelization/setup/"
    tag: "Documentation"
    text: "Set up Test Parallelization"
  - link: "/tests/test_parallelization/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshooting Test Parallelization"
  - link: "/tests/test_parallelization/best_practices/"
    tag: "Documentation"
    text: "Test Parallelization Best Practices"
---

## Environment variables

Most `ddtest` settings can be passed as a CLI flag or as an environment variable. CLI flags take precedence over environment variables.

`DD_TEST_OPTIMIZATION_RUNNER_PLATFORM`
: Programming language.<br/>
**CLI flag:** `--platform`<br/>
**Default:** `ruby`<br/>
**Supported values:** `ruby`, `python`, `javascript`

`DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK`
: Test framework.<br/>
**CLI flag:** `--framework`<br/>
**Default:** `rspec`<br/>
**Supported values:** `rspec`, `minitest`, `pytest`, `cucumber`, `cypress`, `jest`, `mocha`, `playwright`, `vitest`

`DD_TEST_OPTIMIZATION_RUNNER_COMMAND`
: Overrides the default test command. `ddtest` appends selected test files and framework-specific flags to the command. Supported for all frameworks. Python support requires ddtest 1.7.0 or later. For ddtest versions prior to 1.7.0 with pytest, the command cannot be changed. Pass extra flags with `PYTEST_ADDOPTS`. For more information, see [Custom test commands](#custom-test-commands).<br/>
**CLI flag:** `--command`<br/>
**Default:** Empty<br/>
**Example:** `bundle exec rspec --profile`, `pnpm exec mocha --parallel`, `pytest`

`DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM`
: Minimum CI node or worker count `ddtest` considers when planning.<br/>
**CLI flag:** `--min-parallelism`<br/>
**Default:** Physical CPU count<br/>
**Example:** `1`

`DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM`
: Maximum CI node or worker count `ddtest` considers when planning.<br/>
**CLI flag:** `--max-parallelism`<br/>
**Default:** Physical CPU count<br/>
**Example:** `8`

`DD_TEST_OPTIMIZATION_RUNNER_CI_JOB_OVERHEAD`
: Estimated overhead of launching an additional CI node. The `ddtest` planner adds another CI node only if that node reduces wall-clock time by at least this value.<br/>See [Parallelism selection](#parallelism-selection) to learn more.<br/>
**CLI flag:** `--ci-job-overhead`<br/>
**Default:** `25s`<br/>
**Example:** `25s`, `45s`, `1m`, `1500ms`, `0s`

`DD_TEST_OPTIMIZATION_RUNNER_TARGET_TIME`
: Target wall time for the selected split. `ddtest` first considers splits at or below this wall time. If no split can meet the target within the configured parallelism range, `ddtest` selects the split with the lowest expected wall time. See [Parallelism selection](#parallelism-selection) to learn more.<br/>
**CLI flag:** `--target-time`<br/>
**Default:** `0s`<br/>
**Example:** `10m`, `300s`, `1500ms`, `0s`

`DD_TEST_OPTIMIZATION_RUNNER_CI_NODE`
: Runs only the files assigned to CI node `N`, where `N` is zero-indexed.<br/>
**CLI flag:** `--ci-node`<br/>
**Default:** `-1`<br/>
**Example:** `0`

`DD_TEST_OPTIMIZATION_RUNNER_CI_NODE_WORKERS`
: Number of workers to start on this CI node. Use a positive integer or `ncpu` to use all physical CPUs available.<br/>
**CLI flag:** `--ci-node-workers`<br/>
**Default:** `1`<br/>
**Example:** `2`, `ncpu`

`DD_TEST_OPTIMIZATION_RUNNER_WORKER_ENV`
: Sets environment variables for each worker process. Use `{{nodeIndex}}` and `{{workerIndex}}` placeholders to give each worker a unique value. For more information, see [Worker environment variables](#worker-environment-variables).<br/>
**CLI flag:** `--worker-env`<br/>
**Default:** Empty<br/>
**Example:** `DB_NAME=testdb{{nodeIndex}}_{{workerIndex}};FIXTURE=fixture{{nodeIndex}}`

`DD_TEST_OPTIMIZATION_RUNNER_TESTS_LOCATION`
: Glob pattern used to discover test files. Defaults to `spec/**/*_spec.rb` for RSpec, `test/**/*_test.rb` for Minitest, pytest configuration (`testpaths` and `python_files`) or `**/{test_*,*_test}.py` for pytest, and the effective configuration or default test matching for each JavaScript framework.<br/>
**CLI flag:** `--tests-location`<br/>
**Alias:** `KNAPSACK_PRO_TEST_FILE_PATTERN`<br/>
**Default:** Framework default<br/>
**Example:** `custom/spec/**/*_spec.rb`, `tests/**/*_test.py`, `packages/**/__tests__/**/*.test.ts`

`DD_TEST_OPTIMIZATION_RUNNER_TESTS_EXCLUDE_PATTERN`
: Glob pattern used to exclude test files from discovery.<br/>
**CLI flag:** `--tests-exclude-pattern`<br/>
**Alias:** `KNAPSACK_PRO_TEST_FILE_EXCLUDE_PATTERN`<br/>
**Default:** Empty<br/>
**Example:** `spec/system/**/*_spec.rb`

`DD_TEST_OPTIMIZATION_RUNNER_TEST_DISCOVERY_CACHE`
: Path to a restored test discovery cache file. `ddtest` imports it before planning and refreshes the internal discovery cache after successful full discovery.<br/>
**CLI flag:** `--test-discovery-cache`<br/>
**Default:** Empty<br/>
**Example:** `.ddtest-cache/tests-discovery.json`

`DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE`
: Controls whether Test Impact Analysis skipping uses test-level or suite-level granularity for Ruby. Invalid values fall back to `test`.<br/>
**CLI flag:** `--test-skipping-mode`<br/>
**Default:** `test`<br/>
**Supported values:** `test`, `suite`

`DD_TEST_OPTIMIZATION_RUNNER_FORCE_FULL_TEST_DISCOVERY`
: Forces full test discovery when the framework supports it, including in suite-level skipping mode.<br/>
**CLI flag:** `--force-full-test-discovery`<br/>
**Default:** `false`<br/>
**Supported values:** `true`, `false`

`DD_TEST_OPTIMIZATION_RUNNER_STRICT_DISCOVERY`
: Fails planning when full test discovery errors out. If full discovery is canceled (for example, by a timeout), `ddtest` still falls back to fast test file discovery instead of failing.<br/>
**CLI flag:** `--strict-discovery`<br/>
**Default:** `false`<br/>
**Example:** `true`

`DD_TEST_OPTIMIZATION_RUNNER_RUNTIME_TAGS`
: JSON string that overrides runtime tags used to fetch skippable tests. Use this when `ddtest` runs outside the CI environment used to calculate skippable tests.<br/>
**CLI flag:** `--runtime-tags`<br/>
**Alias:** `DD_TEST_OPTIMIZATION_RUNTIME_TAGS`<br/>
**Default:** Empty<br/>
**Example:** `{"os.platform":"linux","os.version":"7.8.9","runtime.name":"ruby","runtime.version":"3.3.0"}`

`DD_TEST_OPTIMIZATION_RUNNER_REPORT_ENABLED`
: Controls whether `ddtest` prints human-readable reports after command execution. This setting is only available as an environment variable.<br/>
**CLI flag:** None<br/>
**Default:** `true`<br/>
**Example:** `false`

## Parallelism selection

`ddtest plan` estimates how long each runnable test file takes, then evaluates every parallelism value between `--min-parallelism` and `--max-parallelism`.

In CI-node mode, this value is the CI node count. On a single CI node, this value is the worker count.

Duration estimates come from Datadog test suite p50 timings when available and fall back to local discovery weights otherwise. Each candidate count is scored as expected slowest-worker time plus the node count multiplied by `--ci-job-overhead`.

When scores tie, `ddtest` prefers fewer CI nodes or workers, then lower expected wall time, then lower imbalance between workers.

`ddtest` uses the `--ci-job-overhead` setting to avoid always selecting the maximum number of CI nodes. With the default value of `25s`, `ddtest` adds another CI node only when that node is expected to save at least 25 seconds of wall-clock time.

Increase `--ci-job-overhead` to use fewer CI nodes. Decrease it to prefer faster wall-clock time. Use duration values such as `25s`, `1m`, or `1500ms`. Set `0s` to always fan out test execution to `--max-parallelism` nodes.

Set `--target-time` to make `ddtest` first evaluate splits at or below that target. Use duration values such as `10m`, `300s`, or `1500ms`. The default value, `0s`, disables the target.

If no split can meet the target, `ddtest` logs a warning. It selects the split with the lowest expected wall time, ignoring CI job overhead.

## Custom test commands

Use `--command` to override the default test command for any supported framework:

{{< code-block lang="bash" >}}
bin/ddtest run --platform ruby --framework rspec --command "bin/integration-tests"
{{< /code-block >}}

For Ruby, Python, Jest, Vitest, Mocha, and Cypress, do not include test files in the command. `ddtest` provides the files assigned to each worker. Cucumber.js paths and Playwright positional filters can restrict discovery, but `ddtest` replaces them with the files assigned to the worker during execution.

Do not include the `--` separator in `--command`. If the command contains `--`, `ddtest` emits a warning and removes the separator and everything after it.

For pytest, `ddtest` runs `python -m pytest <files>` by default. For versions 1.7.0 and later, set `--command` to override the base command. For example, `--command pytest` runs the `pytest` console script instead of `python -m pytest`. `ddtest` runs `<command> <files>` and does not add `-m pytest`. To pass extra pytest flags without changing the base command, use `PYTEST_ADDOPTS`. `ddtest` appends `--ddtrace` to `PYTEST_ADDOPTS` automatically so the `ddtrace` pytest plugin loads without changing your pytest config.

For JavaScript, the custom command must invoke the selected framework directly. Package manager and executable wrappers are supported. For example:

{{< code-block lang="bash" >}}
bin/ddtest run --platform javascript --framework mocha --command "pnpm exec mocha --parallel"
{{< /code-block >}}

`ddtest` preserves supported framework options and replaces inputs that conflict with its assigned test files. See [Test Parallelization best practices](/tests/test_parallelization/best_practices/#configure-javascript-frameworks) for framework-specific examples and constraints.

## Pytest test discovery

For pytest, `ddtest` discovers test files using this priority:

1. `--tests-location` when set.
2. Pytest configuration from `pytest.ini`, `pyproject.toml`, `tox.ini`, or `setup.cfg`, using `testpaths` and `python_files`.
3. The built-in pattern `**/{test_*,*_test}.py`.

Pytest does not have an equivalent to RSpec's pattern flag, so `ddtest` resolves the pattern to explicit file paths before invoking the configured pytest command. The default is `python -m pytest`. For versions 1.7.0 and later, `--command` overrides it.

## JavaScript test discovery and instrumentation

JavaScript support uses suite-level Test Impact Analysis. `ddtest` plans, skips, and distributes test files rather than individual tests. It uses each framework's native configuration during discovery:

| Framework | Discovery behavior | Execution behavior |
| --------- | ------------------ | ------------------ |
| Cucumber.js | Performs a serial dry run and uses Cucumber Messages to identify feature files selected by paths, profiles, tags, and name filters. | Replaces positional paths and rerun files with the feature files assigned to the worker. |
| Cypress | Resolves the effective Cypress project and configuration, including the testing type and spec pattern. | Replaces `--spec` with the spec files assigned to the worker. |
| Jest | Runs Jest with `--listTests`. | Appends `--runTestsByPath` and the files assigned to the worker. |
| Mocha | Loads Mocha's effective configuration and resolves its `spec` inputs. | Replaces configured `spec` inputs with the files assigned to the worker. |
| Playwright | Runs `playwright test --list` with a `ddtest` reporter, preserves selection options and positional filters, and deduplicates files included in multiple projects. | Replaces positional filters with exact file filters for the files assigned to the worker and removes `--shard` and interactive UI options. |
| Vitest | Uses native file listing for Vitest 2.0 or later and a config-aware fallback for Vitest 1.6. | Runs Vitest with the files assigned to the worker. |

By default, `ddtest` uses the framework executable under `node_modules/.bin` when it is available and otherwise runs the framework through `npx`. Use `--command` for package managers, wrappers, profiles, projects, and other framework options. `--tests-location` and `--tests-exclude-pattern` further limit the discovered files.

During execution, `ddtest` prepends `-r dd-trace/ci/init` to `NODE_OPTIONS` unless it is already present. For Vitest, it also imports `dd-trace/register.js`. During discovery, `ddtest` removes these preloads so that listing tests does not produce test results.

## Worker environment variables

Use `--worker-env` to set environment variables for each worker. The value supports the `{{nodeIndex}}` and `{{workerIndex}}` placeholders.

`{{nodeIndex}}`
: The CI node index from `--ci-node` or `DD_TEST_OPTIMIZATION_RUNNER_CI_NODE`. In single-node runs, the value is `0`.

`{{workerIndex}}`
: The worker process index within the current CI node, starting at `0`.

The format is `ENV=value`. Separate multiple values with `;`.

For example, assign each worker its own test database:

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform ruby \
  --framework rspec \
  --worker-env "DB_NAME=testdb{{nodeIndex}}_{{workerIndex}}"
{{< /code-block >}}

`ddtest` automatically sets `DD_TEST_SESSION_NAME` for each worker to `<DD_SERVICE>-node-<nodeIndex>-worker-<workerIndex>` when the variable is not set. If you set `DD_TEST_SESSION_NAME`, `ddtest` preserves it and expands the same placeholders before starting each worker.

## Stabilize runtime tags

Test Impact Analysis skippable tests are scoped by runtime tags such as OS, architecture, and Ruby version. If `ddtest` often reports that 0 tests are skipped, check whether runtime tags vary across CI runners. For example, AWS runners can report different `os.version` values across jobs.

To make matching stable, set fixed runtime tags in the environment used by both `ddtest` and worker processes:

{{< code-block lang="bash" >}}
export DD_TEST_OPTIMIZATION_RUNTIME_TAGS='{"os.architecture":"x86_64","os.platform":"linux","os.version":"6.8.0-aws","runtime.name":"ruby","runtime.version":"3.3.0"}'
ddtest run
{{< /code-block >}}

`ddtest` also accepts the runner-specific `DD_TEST_OPTIMIZATION_RUNNER_RUNTIME_TAGS` environment variable and the `--runtime-tags` CLI flag.

## Plan artifacts

`ddtest plan` writes a `.testoptimization/` directory in the current working directory. Copy this directory from the planning job to every CI job that runs `ddtest run` or consumes `ddtest` plan file lists.

Most integrations should treat `.testoptimization/` as a generated artifact. The stable files for external consumers are:

| File | Description |
| ---- | ----------- |
| `.testoptimization/manifest.txt` | Plan layout version. |
| `.testoptimization/runner/test-files.txt` | Newline-delimited list of test files to run. Each file contains at least one non-skipped test. |
| `.testoptimization/runner/parallel-runners.txt` | Selected CI node count or worker count. |
| `.testoptimization/runner/skippable-percentage.txt` | Percentage of test time skipped by Test Impact Analysis. |
| `.testoptimization/runner/tests-split/runner-N` | Newline-delimited list of files assigned to index `N`. |
| `.testoptimization/github/config` | GitHub Actions matrix output, written when `ddtest` detects GitHub Actions. |

Files under `.testoptimization/runner/cache/`, `.testoptimization/tests-discovery/`, and `.testoptimization/cache/http/*.json` are implementation details. Use them only for troubleshooting.

## Use a plan with another test runner

Use a `ddtest` plan when you want `ddtest` to select runnable test files, but another runner executes them.

See [Plan artifacts](#plan-artifacts) for the `test-files.txt` and per-runner `tests-split/runner-N` files that another runner can consume.

For example, use `.testoptimization/runner/test-files.txt` with Knapsack Pro:

{{< code-block lang="bash" >}}
KNAPSACK_PRO_TEST_FILE_LIST_SOURCE_FILE=.testoptimization/runner/test-files.txt bundle exec rake knapsack_pro:queue:rspec
{{< /code-block >}}

For pytest, enable the `ddtrace` plugin with `PYTEST_ADDOPTS` and pass the file list to `python -m pytest`:

{{< code-block lang="bash" >}}
export PYTEST_ADDOPTS="${PYTEST_ADDOPTS:+$PYTEST_ADDOPTS }--ddtrace"
if [ -s .testoptimization/runner/test-files.txt ]; then
  xargs python -m pytest < .testoptimization/runner/test-files.txt
fi
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
