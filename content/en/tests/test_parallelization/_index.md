---
title: Test Parallelization
description: Reduce CI testing time by distributing test files across CI nodes or workers with Test Optimization data.
---

{{< callout url="https://www.datadoghq.com/product-preview/test-parallelization/" btn_hidden="false" header="Join the Preview!" >}}
Test Parallelization is in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

Test Parallelization helps you reduce CI testing time by distributing test files across CI nodes or local workers. It uses Test Optimization data to detect which test files should run, estimate their duration, and create an execution plan.

Test Parallelization is designed to work with [Test Impact Analysis][1]. Test Impact Analysis skips tests that are not affected by a code change. Test Parallelization splits the remaining test files evenly across the selected CI nodes.

Use Test Parallelization when your test suite takes a long time to run. When used with Test Impact Analysis, Test Parallelization runs only files with non-skipped tests. It also helps reduce CI costs by choosing only as many CI nodes as needed, which can lower total CPU minutes.

## Setup

Before setting up Test Parallelization, set up [Test Optimization][2]. Optionally, also set up [Test Impact Analysis][1] if you plan to use it with Test Parallelization. Then follow [Set Up Test Parallelization][3] to install `ddtest` and configure your CI provider.

## Compatibility

Test Parallelization is supported for the following language and frameworks:

| Language | Frameworks | Minimum library version |
| -------- | ---------- | ----------------------- |
| Ruby     | RSpec, Minitest | `datadog-ci` gem `1.31.0` or later |
| Python   | pytest | `ddtrace` package `4.11.0` or later |

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
{{< nextlink href="/tests/test_parallelization/best_practices/" >}}Best Practices for Test Parallelization{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/troubleshooting/" >}}Troubleshooting Test Parallelization{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /tests/test_impact_analysis/
[2]: /tests/setup/
[3]: /tests/test_parallelization/setup/
