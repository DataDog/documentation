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

## Parallelism selection

`ddtest plan` estimates how long each runnable test file takes, then evaluates every parallelism value between `--min-parallelism` and `--max-parallelism`.

In CI-node mode, these values are CI node counts. On a single CI node, these values are worker counts.

`ddtest` uses `--ci-job-overhead` to avoid always selecting the maximum number of CI nodes. With `--ci-job-overhead 25s`, `ddtest` adds another CI node only when that node is expected to save at least 25 seconds of wall-clock time.

Increase `--ci-job-overhead` to use fewer CI nodes. Decrease it to prefer faster wall-clock time. Use duration values such as `25s`, `1m`, or `1500ms`. Set `0s` to disable this overhead bias.

When scores tie, `ddtest` prefers fewer CI nodes or workers, then lower wall-clock time, then lower imbalance between workers.

## Worker environment variables

Use `--worker-env` to set environment variables for each worker. The value supports the `{{nodeIndex}}` and `{{workerIndex}}` placeholders.

`{{nodeIndex}}`
: The CI node index from `--ci-node` or `DD_TEST_OPTIMIZATION_RUNNER_CI_NODE`. In single-node runs, the value is `0`.

`{{workerIndex}}`
: The worker process index within the current CI node, starting at `0`.

For example, assign each worker its own test database:

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform ruby \
  --framework rspec \
  --worker-env "DATABASE_NAME_TEST=app_test{{nodeIndex}}_{{workerIndex}}"
{{< /code-block >}}

`ddtest` automatically sets `DD_TEST_SESSION_NAME` for each worker to `<DD_SERVICE>-node-<nodeIndex>-worker-<workerIndex>` when the variable is not set. If you set `DD_TEST_SESSION_NAME`, `ddtest` preserves it and expands the same placeholders before starting each worker.

## Plan artifacts

`ddtest plan` writes a `.testoptimization/` directory in the current working directory. Copy this directory from the planning job to every CI job that runs `ddtest run` or consumes `ddtest` plan file lists.

Most integrations should treat `.testoptimization/` as a generated artifact. The stable files for external consumers are:

| File | Description |
| ---- | ----------- |
| `.testoptimization/manifest.txt` | Plan layout version. |
| `.testoptimization/runner/test-files.txt` | Newline-delimited list of runnable test files. |
| `.testoptimization/runner/parallel-runners.txt` | Selected CI node count or worker count. |
| `.testoptimization/runner/skippable-percentage.txt` | Percentage of test time skipped by Test Impact Analysis. |
| `.testoptimization/runner/tests-split/runner-N` | Newline-delimited list of files assigned to index `N`. |
| `.testoptimization/github/config` | GitHub Actions matrix output, written when `ddtest` detects GitHub Actions. |
| `.testoptimization/cache/http/*.json` | Datadog Test Optimization cache data used by Datadog libraries during test execution. |

Files under `.testoptimization/runner/cache/` and `.testoptimization/tests-discovery/` are implementation details. Use them only for troubleshooting.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
