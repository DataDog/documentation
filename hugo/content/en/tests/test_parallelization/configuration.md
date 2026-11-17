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

For the guided setup, see [Set Up Test Parallelization](/tests/test_parallelization/setup/).

## Environment variables

Most `ddtest` settings can be passed as a CLI flag or as an environment variable. CLI flags take precedence over environment variables. Setting the framework explicitly also sets the platform. If detection finds multiple matching platforms or frameworks, select them explicitly.

Use `ruby` with `rspec` or `minitest`, `python` with `pytest`, and `javascript` with the JavaScript frameworks listed below. Keep the same settings in planning and execution.

`DD_TEST_OPTIMIZATION_RUNNER_PLATFORM`
: Programming language.<br/>
**CLI flag:** `--platform`<br/>
**Default:** Auto-detected from the current directory<br/>
**Supported values:** `ruby`, `python`, `javascript`

`DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK`
: Test framework.<br/>
**CLI flag:** `--framework`<br/>
**Default:** Auto-detected from the current directory<br/>
**Supported values:** `rspec`, `minitest`, `pytest`, `cucumber`, `cypress`, `jest`, `mocha`, `playwright`, `vitest`, `webdriverio` (alias: `wdio`)

`DD_TEST_OPTIMIZATION_RUNNER_COMMAND`
: Overrides the default test command. `ddtest` supplies selected test files and framework-specific settings. Supported for RSpec, Minitest, pytest, Cucumber.js, Cypress, Jest, Mocha, Playwright, and WebdriverIO. Vitest rejects this setting. For more information, see [Custom test commands](#custom-test-commands).<br/>
**CLI flag:** `--command`<br/>
**Default:** Empty<br/>
**Example:** `bundle exec rspec --profile`, `pnpm jest --runInBand`, `pytest`

`DD_TEST_OPTIMIZATION_RUNNER_VITEST_CONFIG`
: Vitest configuration file for planning and execution. Relative paths resolve from the working directory; this setting does not change that directory.<br/>
**CLI flag:** `--vitest-config`<br/>
**Default:** Empty (use Vitest configuration discovery)<br/>
**Example:** `vitest.ci.config.ts`

`DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM`
: Minimum CI node or worker count `ddtest` considers when planning. Use a positive integer no greater than the maximum.<br/>
**CLI flag:** `--min-parallelism`<br/>
**Default:** Physical CPU count<br/>
**Example:** `1`

`DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM`
: Maximum CI node or worker count `ddtest` considers when planning. Use a positive integer within your capacity budget.<br/>
**CLI flag:** `--max-parallelism`<br/>
**Default:** Physical CPU count<br/>
**Example:** `8`

`DD_TEST_OPTIMIZATION_RUNNER_CI_JOB_OVERHEAD`
: Non-negative modeled overhead per additional CI node or worker. A higher value favors fewer runners.<br/>See [Parallelism selection](#parallelism-selection) to learn more.<br/>
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
**Default:** `-1` (CI-node mode disabled)<br/>
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
: One glob matching test files. Defaults to `spec/**/*_spec.rb` for RSpec, `test/**/*_test.rb` for Minitest, pytest configuration or `**/{test_*,*_test}.py` for pytest, and native configuration for JavaScript frameworks. Quote globs and use braces to combine roots.<br/>
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
: Controls Test Impact Analysis skipping granularity for Ruby and Python. Ruby suite-level skipping requires `datadog-ci` 1.34.0 or later. Python suite mode discovers files without running pytest collection; see [pytest suite mode](#pytest-suite-mode). Set the environment variable in both planning and test jobs. Invalid values fall back to `test`.<br/>
**CLI flag:** `--test-skipping-mode`<br/>
**Default:** `test`<br/>
**Supported values:** `test`, `suite`

`DD_TEST_OPTIMIZATION_RUNNER_FORCE_FULL_TEST_DISCOVERY`
: Requests full test discovery when the framework supports it, including in suite-level skipping mode or when Test Impact Analysis is disabled. A valid discovery cache can still be reused. See [refreshing the discovery cache](/tests/test_parallelization/best_practices/#cache-test-discovery) to collect tests again.<br/>
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

`ddtest plan` estimates how long each runnable test file takes and compares useful parallelism values within `--min-parallelism` and `--max-parallelism`. Both bounds default to the physical CPU count available to the process. Set both explicitly to let the planner choose within a budget.

In CI-node mode, this value is the CI node count. On a single CI node, this value is the worker count.

Duration estimates come from Datadog test suite p50 timings when available and fall back to local discovery weights otherwise. Each candidate count is scored as expected slowest-worker time plus the node count multiplied by `--ci-job-overhead`.

When scores tie, `ddtest` prefers fewer CI nodes or workers, then lower expected wall time, then lower imbalance between workers.

`ddtest` uses the `--ci-job-overhead` setting to avoid always selecting the maximum number of CI nodes. The default value is `25s`. This is a planning estimate, not a measurement of your CI setup.

Increase `--ci-job-overhead` to use fewer CI nodes. Decrease it to prefer faster wall-clock time. Use duration values such as `25s`, `1m`, or `1500ms`. Set `0s` to remove the overhead penalty. This does not force the maximum count: useful file splits and tie-breaking still apply.

Set the non-negative `--target-time` to make `ddtest` first evaluate splits at or below that target. Use duration values such as `10m`, `300s`, or `1500ms`. The default value, `0s`, disables the target.

If no split can meet the target, `ddtest` logs a warning. It selects the split with the lowest expected wall time, ignoring CI job overhead.

## Custom test commands

Use `--command` to override the base command for RSpec, Minitest, pytest, Cucumber.js, Cypress, Jest, Mocha, Playwright, or WebdriverIO. The override applies to planning and execution. Vitest uses its Node.js API and rejects both `--command` and `DD_TEST_OPTIMIZATION_RUNNER_COMMAND`. Instead, use `--vitest-config` and [Vitest configuration](/tests/test_parallelization/best_practices/#vitest).

{{< code-block lang="bash" >}}
bin/ddtest run --platform ruby --framework rspec --command "bundle exec rspec --tag smoke"
{{< /code-block >}}

Keep options such as tags, seeds, and formatters. To customize test file selection, use `DD_TEST_OPTIMIZATION_RUNNER_TESTS_LOCATION` to include files and `DD_TEST_OPTIMIZATION_RUNNER_TESTS_EXCLUDE_PATTERN` to exclude them. Both accept file patterns, such as `spec/requests/**/*_spec.rb`.

`ddtest` supplies assigned files and discovery flags. A command must support the selected framework's arguments; arbitrary shell command chains and scripts that run several frameworks are not supported.

A wrapper separator before the framework executable is preserved, for example `npx -- jest --runInBand`. A framework's own `--` ends its options: discovery flags go before it, and execution replaces positional selection after it with assigned files.

For RSpec, remove test file and directory paths from your custom command and `.rspec` so they do not run on multiple workers. Use the include/exclude settings above and keep other options.

For Mocha, keep suite paths and shared `--file` and `--require` setup in your custom command. `ddtest` uses the suite paths during discovery and replaces them with each worker's assigned files during execution.

For pytest, the default is `python -m pytest <files>`. `--command` replaces that base command without adding `-m pytest`. Keep extra pytest options in `PYTEST_ADDOPTS`; `ddtest` preserves its value and appends `--ddtrace`.

Test workers run non-interactively. Standard input is closed; prompts and interactive debuggers are not supported.

### Positional file selections

To narrow native framework discovery, pass files, directories, or quoted globs to `ddtest plan`:

{{< code-block lang="bash" >}}
bin/ddtest plan tests/unit tests/integration --min-parallelism 1 --max-parallelism 4
bin/ddtest run
{{< /code-block >}}

Unlike `--tests-location`, positional selections accept directories. `ddtest run` accepts positional selections only when no saved plan exists. To change a saved selection, generate a new plan, then run it without positional arguments.

## Pytest test discovery

For pytest, `ddtest` discovers test files using this priority:

1. `--tests-location` when set.
2. Pytest configuration from `pytest.ini`, `pyproject.toml`, `tox.ini`, or `setup.cfg`, using `testpaths` and `python_files`.
3. The built-in pattern `**/{test_*,*_test}.py`.

`ddtest` resolves candidate globs to explicit files before invoking pytest. Multiple `testpaths` and `python_files` entries are combined. For custom roots or an alternate config selected with `-c`, set a matching `--tests-location`, such as `'{tests/unit,tests/integration}/**/test_*.py'`. Keep pytest collection overrides in `PYTEST_ADDOPTS` in both phases. A candidate glob does not replace pytest configuration.

Ruby and Python full discovery can fall back to file discovery when the tracer is absent or collection fails. `--strict-discovery` makes full-discovery failures fatal; canceled full discovery still falls back. Use `--force-full-test-discovery` when you need full discovery even in a mode that normally uses files.

### Pytest suite mode

Set the skipping mode to `suite` in both planning and test jobs to discover test files without importing test modules or `conftest.py` files:

{{< code-block lang="bash" >}}
export DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite
bin/ddtest plan --platform python --framework pytest --min-parallelism 1 --max-parallelism 10
bin/ddtest run --platform python --framework pytest
{{< /code-block >}}

Alternatively, pass `--test-skipping-mode suite` to both commands. The default is `test`. To return to test-level skipping, select `test` and regenerate the plan.

Suite mode reduces planning overhead by skipping pytest collection. It trades individual-test skipping for whole-suite skipping, and individual test counts are unavailable during planning. `ddtest` keeps files runnable when their suites are new or lack matching source-file metadata from Test Optimization. It applies Test Impact Analysis skipping in the plan, so the Datadog library does not skip retained files again during execution. Test reporting and coverage collection remain enabled.

File discovery uses the configured file patterns and filters to `.py` files. It excludes files under `.venv`, `venv`, `.tox`, `__pycache__`, `node_modules`, `site-packages`, and `.git`, even when selected explicitly.

Pytest selectors and exit codes behave as follows:

- Normal file-only planning does not apply selectors such as `-k` and `-m`. Pytest applies them during execution.
- When pytest collection runs during planning, it also applies these selectors.
- Cached discovery can reuse an earlier selection. After changing selectors, [include them in cache keys and refresh the cache](/tests/test_parallelization/best_practices/#cache-test-discovery).
- A worker with no matching tests succeeds in suite mode, so an entirely deselected run can succeed. Test failures and collection errors from workers still fail the run.
- Test mode preserves pytest exit-code-5 failures from workers, but an empty plan can succeed without starting pytest.

Files containing the literal `datadog_itr_unskippable` marker remain runnable, as do files beneath a `conftest.py` containing it. This conservative text check also recognizes comments. For dynamically constructed or imported markers, add a comment containing `datadog_itr_unskippable` to the affected file or ancestor `conftest.py`. Such comments protect `ddtest` planning; use actual pytest unskippable markers when running pytest directly with Test Impact Analysis.

Use test mode for custom collectors that group multiple suites into one file. Suite mode does not read or refresh the full-discovery cache. `--force-full-test-discovery` restores collection and cache updates without changing the suite-level skipping rules. `--strict-discovery` alone does not enable collection.

## JavaScript test discovery and instrumentation

JavaScript discovery uses each framework's native configuration. When the framework supports Test Impact Analysis, skipping operates at suite level. WebdriverIO supports balancing without Test Impact Analysis skipping.

| Framework | Discovery behavior | Execution behavior |
| --------- | ------------------ | ------------------ |
| Cucumber.js | Performs a serial dry run and uses Cucumber Messages to identify feature files selected by paths, profiles, tags, and name filters. | Replaces positional paths and rerun files with the feature files assigned to the worker. |
| Cypress | Resolves the effective Cypress project and configuration, including the testing type and spec pattern. | Replaces `--spec` with the spec files assigned to the worker. |
| Jest | Runs Jest with `--listTests`. | Appends `--runTestsByPath` and the files assigned to the worker. |
| Mocha | Loads Mocha's effective configuration and resolves its `spec` inputs. | Replaces configured `spec` inputs with the files assigned to the worker. |
| Playwright | Runs `playwright test --list` with a `ddtest` reporter, preserves selection options and positional filters, and deduplicates files included in multiple projects. | Replaces positional filters with exact file filters for the files assigned to the worker and removes `--shard` and interactive UI options. |
| Vitest | Loads Vitest/Vite configuration through the installed `vitest/node` API. | Runs only project/pool specifications whose canonical file paths match the assignment. A file can run in multiple selected projects. |
| WebdriverIO | Loads the effective WebdriverIO configuration and resolves spec files for the selected capabilities. Grouped specs are rejected. | Runs assigned files with each capability's selection preserved and native sharding disabled. |

Except for Vitest and WebdriverIO, `ddtest` uses the local framework executable under `node_modules/.bin` when available, with a package-manager fallback. WebdriverIO defaults to the project-local `node_modules/.bin/wdio` executable. Custom commands must invoke the framework directly, optionally through a package manager. `--tests-location` and `--tests-exclude-pattern` further restrict discovered files.

Vitest requires a project-installed package. Use the same `--vitest-config` in both phases. Configuration or discovery errors fail instead of falling back to a broader file system scan. Remove native sharding when `ddtest` owns the split.

For execution, `ddtest` selects a Datadog tracer in this order:

1. An existing Datadog CI require in `NODE_OPTIONS`.
2. The absolute preload path in `DD_TRACE_PACKAGE`, if set by an instrumentation action or your environment.
3. Project-resolvable `dd-trace/ci/init`.

An invalid explicit preload fails execution. An action-installed tracer does not also need a project dependency or `NODE_PATH`. Existing Node.js options and project loaders remain in place.

Vitest and WebdriverIO also need a Datadog register import. `ddtest` preserves an existing import, then checks `DD_TRACE_ESM_IMPORT`, the external tracer's adjacent `register.js`, and the project-local `dd-trace/register.js`. Discovery removes Datadog preloads to avoid reporting file listing as test execution.

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

Use values that describe the test execution environment. Set the same overrides in planning and workers, without merging distinct runtime environments. For example:

{{< code-block lang="bash" >}}
export DD_TEST_OPTIMIZATION_RUNTIME_TAGS='{"os.architecture":"x86_64","os.platform":"linux","os.version":"6.8.0-aws","runtime.name":"ruby","runtime.version":"3.3.0"}'
bin/ddtest run
{{< /code-block >}}

A complete set of `os.platform`, `os.architecture`, `os.version`, `runtime.name`, and `runtime.version` skips the runtime probe during planning. Partial overrides merge with detected values.

`ddtest` also accepts the runner-specific `DD_TEST_OPTIMIZATION_RUNNER_RUNTIME_TAGS` environment variable and the `--runtime-tags` CLI flag.

### Use CI runtime tags locally

To reuse Test Impact Analysis decisions from CI on your local machine, supply the runtime tags from the intended CI environment. For example, Linux CI and a macOS development machine have different runtime tags, so they do not automatically share skippable tests.

1. Open a CI test run in [Test Optimization Explorer](https://app.datadoghq.com/ci/test-runs). In the test details panel, find the `os` and `runtime` sections.
2. Copy `os.architecture`, `os.platform`, `os.version`, `runtime.name`, and `runtime.version` exactly as reported by that CI run.
3. Commit your local changes before running `ddtest`. Test Impact Analysis uses committed changes to determine which tests can be skipped.
4. Pass the copied tags as a JSON object to `--runtime-tags`, or set `DD_TEST_OPTIMIZATION_RUNNER_RUNTIME_TAGS`.

For example, when the CI environment reports these values:

{{< code-block lang="bash" >}}
bin/ddtest run --runtime-tags '{"os.architecture":"x86_64","os.platform":"linux","os.version":"6.8.0-aws","runtime.name":"ruby","runtime.version":"3.3.0"}'
{{< /code-block >}}

For Python, `runtime.name` is the implementation name, such as `CPython`, and `runtime.version` is the interpreter version. For JavaScript, use `node` for `runtime.name` and preserve the leading `v` in the Node.js version, such as `v22.16.0`.

## Plan artifacts

`ddtest plan` writes a `.testoptimization/` directory in the current working directory. Copy the complete directory, including hidden files, to every job that runs `ddtest run` or consumes its file lists. Generate a fresh plan for each workflow, suite, and execution environment; do not reuse a plan from a dependency cache. Paths are relative to the directory where planning ran.

Most integrations should treat `.testoptimization/` as a generated artifact. The stable files for external consumers are:

| File | Description |
| ---- | ----------- |
| `.testoptimization/manifest.txt` | Plan layout version. |
| `.testoptimization/runner/test-files.txt` | Newline-delimited list of test files to run. Each file contains at least one non-skipped test. |
| `.testoptimization/runner/parallel-runners.txt` | Selected CI node count or worker count. This value is at least 1, even when the plan has no tests to run. Use `has_tests` to skip test jobs. |
| `.testoptimization/runner/skippable-percentage.txt` | Percentage of test time skipped by Test Impact Analysis. |
| `.testoptimization/runner/tests-split/runner-N` | Newline-delimited list of files assigned to index `N`. |
| `.testoptimization/github/config` | GitHub Actions matrix output, written when `ddtest` detects GitHub Actions. |
| `.testoptimization/circleci/parameters.json` | CircleCI continuation parameters (`parallelism` and a Boolean `has_tests`), written when `ddtest` detects CircleCI. |

In GitHub Actions, `ddtest plan` writes `matrix` and `has_tests` to `$GITHUB_OUTPUT`. The `.testoptimization/github/config` file contains only the `matrix` output. `has_tests` is `true` when the plan contains at least one test file to run, and `false` otherwise. To skip test jobs when there is nothing to run, see the [CI setup examples][1].

The HTTP cache under `.testoptimization/cache/http/` supplies Test Optimization data to the Datadog SDKs. Keep it with the plan. Files under `runner/cache/` and `tests-discovery/` are internal to `ddtest`; use the supported file lists for custom integrations.

## Use a plan with another test runner

Use a `ddtest` plan when another runner executes the selected files. Keep Test Optimization instrumentation active. Choose one owner for partitioning. Give that runner the full runnable list and let it split, or consume each `runner-N` assignment without splitting the whole suite again.

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

[1]: /tests/test_parallelization/setup/#ci-examples
