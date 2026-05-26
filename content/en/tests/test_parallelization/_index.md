---
title: Test Parallelization
---

## Overview

Test Parallelization helps you reduce CI testing time by distributing test files across CI nodes or local workers. It uses Test Optimization data to detect which test files should run, estimate their duration, and create an execution plan for the remaining runnable tests.

Test Parallelization is designed to work with [Test Impact Analysis][1]. Test Impact Analysis selects the tests affected by a code change, and Test Parallelization splits those remaining tests across the available CI capacity.

Use Test Parallelization when your test suite takes a long time to run. Datadog chooses the CI node or worker count based on historical test duration data.

## Compatibility

Test Parallelization is supported for the following language and frameworks:

| Language | Frameworks |
| -------- | ---------- |
| Ruby     | RSpec, Minitest |

Before setting up Test Parallelization, set up [Test Optimization][2]. Ruby projects require the `datadog-ci` gem version `1.31.0` or later.

## How it works

Test Parallelization uses the `ddtest` CLI to plan and run tests:

1. Run `ddtest plan` once to create a reusable `.testoptimization/` plan.
2. Share the `.testoptimization/` directory with each CI job that runs tests.
3. Run `ddtest run --ci-node <CI_NODE_INDEX>` in each CI job to execute only the files assigned to that CI node.

For single-node and multi-node examples, see [Set Up Test Parallelization][3].

## Next steps

{{< whatsnext desc="Install ddtest, configure your CI provider, and customize how Test Parallelization splits test files." >}}
{{< nextlink href="/tests/test_parallelization/setup/" >}}Set up Test Parallelization{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/configuration/" >}}Configure Test Parallelization{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/best_practices/" >}}Best Practices{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/troubleshooting/" >}}Troubleshooting{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /tests/test_impact_analysis/
[2]: /tests/setup/
[3]: /tests/test_parallelization/setup/
