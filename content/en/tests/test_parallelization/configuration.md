---
title: Configure Test Parallelization
further_reading:
  - link: "/tests/test_parallelization/setup/"
    tag: "Documentation"
    text: "Set up Test Parallelization"
  - link: "/tests/test_parallelization/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshooting Test Parallelization"
  - link: "/tests/test_parallelization/best_practices/"
    tag: "Documentation"
    text: "Test Parallelization best practices"
---

{{< callout url="https://www.datadoghq.com/product-preview/test-parallelization/" btn_hidden="false" header="Join the Preview!" >}}
Test Parallelization is in Preview. Complete the form to request access.
{{< /callout >}}

## Environment variables

Every `ddtest` setting can be passed as a CLI flag or as an environment variable. CLI flags take precedence over environment variables.

`DD_TEST_OPTIMIZATION_RUNNER_PLATFORM`
: Programming language.<br/>
**CLI flag:** `--platform`<br/>
**Default:** `ruby`<br/>
**Example:** `ruby`

`DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK`
: Test framework.<br/>
**CLI flag:** `--framework`<br/>
**Default:** `rspec`<br/>
**Example:** `rspec`, `minitest`

`DD_TEST_OPTIMIZATION_RUNNER_COMMAND`
: Overrides the default test command. `ddtest` appends selected test files and framework-specific flags to the command. For more information, see [Custom test commands][2].<br/>
**CLI flag:** `--command`<br/>
**Default:** Empty<br/>
**Example:** `bundle exec rspec --profile`

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
: Estimated overhead of launching an additional CI node. The `ddtest` planner adds another CI node only if that node reduces wall time by at least this value.<br/>See [Parallelism selection][3] to learn more.<br/>
**CLI flag:** `--ci-job-overhead`<br/>
**Default:** `25s`<br/>
**Example:** `25s`, `45s`, `1m`, `1500ms`, `0s`

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
: Sets environment variables for each worker process. Use `{{nodeIndex}}` and `{{workerIndex}}` placeholders to give each worker a unique value. For more information, see [Worker environment variables][1].<br/>
**CLI flag:** `--worker-env`<br/>
**Default:** Empty<br/>
**Example:** `DB_NAME=testdb{{nodeIndex}}_{{workerIndex}};FIXTURE=fixture{{nodeIndex}}`

`DD_TEST_OPTIMIZATION_RUNNER_TESTS_LOCATION`
: Glob pattern used to discover test files. Defaults to `spec/**/*_spec.rb` for RSpec and `test/**/*_test.rb` for Minitest.<br/>
**CLI flag:** `--tests-location`<br/>
**Default:** Framework default<br/>
**Example:** `custom/spec/**/*_spec.rb`

`DD_TEST_OPTIMIZATION_RUNNER_RUNTIME_TAGS`
: JSON string that overrides runtime tags used to fetch skippable tests. Use this when `ddtest` runs outside the CI environment used to calculate skippable tests.<br/>
**CLI flag:** `--runtime-tags`<br/>
**Default:** Empty<br/>
**Example:** `{"os.platform":"linux","os.version":"7.8.9","runtime.name":"ruby","runtime.version":"3.3.0"}`

`DD_TEST_OPTIMIZATION_RUNNER_REPORT_ENABLED`
: `ddtest` prints human-readable reports after command execution. Set to `false` to disable reports.<br/>
**Default:** `true`<br/>
**Example:** `false`

## Parallelism selection

`ddtest plan` estimates how long each runnable test file takes, then evaluates every parallelism value between `--min-parallelism` and `--max-parallelism`.

In CI-node mode, this value is the CI node count. On a single CI node, this value is the worker count.

The optimal parallelism value is determined by the following criteria (in decreasing priority):

- the lowest expected wall-clock time
- the smallest imbalance between nodes/workers
- the smallest number of nodes/workers

`ddtest` uses the `--ci-job-overhead` setting to avoid always selecting the maximum number of CI nodes. With the default value of `25s`, `ddtest` adds another CI node only when that node is expected to save at least 25 seconds of wall-clock time.

Increase `--ci-job-overhead` to use fewer CI nodes. Decrease it to prefer faster wall-clock time. Use duration values such as `25s`, `1m`, or `1500ms`. Set `0s` to always fan out test execution to `--max-parallelism` nodes.

## Custom test commands

Use `--command` to override the default test command:

{{< code-block lang="bash" >}}
bin/ddtest run --platform ruby --framework rspec --command "bin/integration-tests"
{{< /code-block >}}

When using `--command`, do not include test files in the command. `ddtest` appends test files and framework-specific flags to the command.

Do not include the `--` separator in `--command`. If the command contains `--`, `ddtest` emits a warning and removes the separator and everything after it.

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: #worker-environment-variables
[2]: #custom-test-commands
[3]: #parallelism-selection
