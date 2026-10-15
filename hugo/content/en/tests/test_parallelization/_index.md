---
title: Test Parallelization
description: Reduce CI testing time by distributing test files across CI nodes or workers with Test Optimization data.
---

## Overview

Test Parallelization helps you shorten test runs and use CI resources more efficiently by balancing test files across CI nodes or local workers. It uses test duration data from Test Optimization to distribute work by expected runtime and reduce idle time.

Pair it with Test Impact Analysis to reduce CI costs further. Test Impact Analysis skips tests unaffected by your code change, and Test Parallelization automatically scales down the CI node count to match the remaining workload - saving the cost and time of provisioning and setting up unnecessary runners.

## Setup

Before setting up Test Parallelization, set up [Test Optimization][2]. Optionally, also set up [Test Impact Analysis][1] if you plan to use it with Test Parallelization. Then [choose your language and framework][3] and follow the instructions for GitHub Actions, CircleCI, or local workers on one CI node.

## Compatibility

Test Parallelization is supported for the following languages and frameworks:

| Language | Frameworks | Minimum library version |
| -------- | ---------- | ----------------------- |
| Ruby     | RSpec, Minitest | `datadog-ci` gem `1.42.0` or later |
| Python   | pytest | `ddtrace` package `4.11.0` or later |
| JavaScript | Cucumber.js, Cypress, Jest, Mocha, Playwright, Vitest | `dd-trace` package `5.125.0` or later for `v5` and `6.14.0` or later for `v6` |

For JavaScript, `ddtest` requires Cypress 12 or later, Mocha 8 or later, Playwright 1.18 or later, and Vitest 1.6 or later. Cucumber.js support is tested with versions 7 through 13.

## How it works

Test Parallelization uses the `ddtest` CLI to plan and run tests:

1. Run `ddtest plan` once to create a fresh `.testoptimization/` plan for that workflow, suite, and execution environment.
2. Share the complete `.testoptimization/` directory, including hidden files, with each CI job that runs tests.
3. Run `ddtest run --ci-node <CI_NODE_INDEX>` in each CI job to execute only the files assigned to that CI node.

For single-node and multi-node examples, see [Set Up Test Parallelization][3].

## Next steps

{{< whatsnext desc="Install ddtest, configure your CI provider, and customize how Test Parallelization splits test files." >}}
{{< nextlink href="/tests/test_parallelization/setup/" >}}Set up Test Parallelization{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/configuration/" >}}Configure Test Parallelization{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/best_practices/" >}}Best Practices for Test Parallelization{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/troubleshooting/" >}}Troubleshooting Test Parallelization{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /tests/test_impact_analysis/
[2]: /tests/setup/
[3]: /tests/test_parallelization/setup/
