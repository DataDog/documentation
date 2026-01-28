---
title: Code Coverage Flags
description: "Use flags to organize and filter coverage reports by test type, runtime version, or other custom categories."
further_reading:
  - link: "/code_coverage"
    tag: "Documentation"
    text: "Code Coverage"
  - link: "/code_coverage/setup"
    tag: "Documentation"
    text: "Set up Code Coverage"
  - link: "/code_coverage/configuration"
    tag: "Documentation"
    text: "Configure Code Coverage"
---

{{< callout url="http://datadoghq.com/product-preview/code-coverage/" >}}
Code Coverage is in Preview. This product replaces Test Optimization's <a href="https://docs.datadoghq.com/tests/code_coverage">code coverage</a> feature, which is being deprecated. Complete the form to request access for the new Code Coverage product.
{{< /callout >}}

## Overview

Flags let you organize and filter coverage data by custom categories. Use flags to separate coverage reports by test type (unit, integration, end-to-end), runtime version (JVM 17, JVM 21), or any other criteria relevant to your project.

With flags, you can:
- View coverage data filtered by a specific flag in the Datadog UI.
- Configure [PR Gates][1] that evaluate coverage thresholds for specific flags.
- Track coverage trends separately for different test suites or environments.

### Flags vs. monorepo support features

Code Coverage provides two complementary ways to slice coverage data:

- **Monorepo support features** (per-codeowner and per-service coverage) filter coverage data by **file paths**. Use these to see coverage data for files a particular team owns or for files belonging to a specific service.
- **Flags** filter coverage data by **reports**. Use these when the same files can be covered by different test runs, such as unit tests vs. integration tests, or tests running on different runtime versions.

For example, the same source file might be covered by both unit tests and integration tests. Monorepo support features cannot distinguish between these because they operate on file paths. Flags allow you to track unit test coverage and integration test coverage separately by tagging each report with a flag indicating the test type or runtime version.

### How flags work with report merging

Datadog automatically merges coverage reports for the same commit. When using flags:

- Reports with the same flag are merged together.
- Each flag maintains its own separate coverage data.
- The overall (unflagged) coverage view shows the combined data from all reports.

When a report is tagged with multiple flags, its coverage data is merged into each flag independently. Consider the following example where three reports are uploaded for the same commit:

| Report | Flags |
|---|---|
| Report A | `unit-tests`, `jvm-11` |
| Report B | `unit-tests`, `jvm-17` |
| Report C | `integration-tests`, `jvm-11` |

The resulting coverage data for each flag is:

| Flag | Contains data from |
|---|---|
| `unit-tests` | Report A + Report B |
| `integration-tests` | Report C |
| `jvm-11` | Report A + Report C |
| `jvm-17` | Report B |
| Overall (no flag filter) | Report A + Report B + Report C |

This allows you to answer questions like "What is my unit test coverage?" (`unit-tests` flag) or "What is my coverage on JVM 11?" (`jvm-11` flag) from the same set of uploaded reports.

## Add flags to coverage reports

To add flags to a coverage report, use the `--flags` option when uploading with the `datadog-ci` CLI.

{{< code-block lang="shell" >}}
datadog-ci coverage upload --flags unit-tests coverage-unit.xml
{{< /code-block >}}

A single report can have multiple flags, allowing you to slice coverage data in different ways:

{{< code-block lang="shell" >}}
datadog-ci coverage upload --flags unit-tests --flags jvm-21 coverage.xml
{{< /code-block >}}

In this example, the coverage data is available under both the `unit-tests` and `jvm-21` flags. You can filter by either flag in the UI.

### Limitations

- Maximum of 32 flags per report. If a report is tagged with more than 32 flags, the first 32 are kept and the rest are ignored.
- Maximum flag name length is 1000 characters. Flags longer than 1000 characters are ignored.
- Flag names can contain alphanumeric characters, hyphens (`-`), underscores (`_`), periods (`.`), and colons (`:`).

## View coverage by flag

In the Code Coverage UI, use the **Flag** filter to view coverage data for a specific flag. This filter appears alongside the Code Owner and Service filters.

{{< img src="/code_coverage/flags_filter_placeholder.png" alt="Code Coverage UI showing the flag filter dropdown" style="width:100%" >}}
<!-- TODO: Add screenshot of the flag filter in the UI -->

When you select a flag, the coverage metrics update to show only the data from reports tagged with that flag.

## Configure PR Gates with flags

You can create [PR Gates][1] that evaluate coverage thresholds for specific flags. This allows you to enforce different coverage requirements for different test types.

Navigate to [PR Gates rule creation][2] and configure a rule to gate on total or patch coverage. In the scope section, select the **Flags** tab and enter the flag names you want to gate on. Use `*` or `**` as wildcards to match multiple flags.

{{< img src="/code_coverage/flags_gate_placeholder.png" alt="PR Gates configuration showing the flags scope option" style="width:100%" >}}
<!-- TODO: Add screenshot of the PR Gates flag configuration -->

## Common use cases

### Separate unit and integration tests

Upload unit test and integration test coverage with different flags to track them independently:

{{< code-block lang="shell" >}}
# After running unit tests
datadog-ci coverage upload --flags unit-tests unit-coverage.xml

# After running integration tests
datadog-ci coverage upload --flags integration-tests integration-coverage.xml
{{< /code-block >}}

### Track coverage across runtime versions

If your CI matrix tests against multiple runtime versions, flag each report accordingly:

{{< code-block lang="shell" >}}
datadog-ci coverage upload --flags python-3.11 coverage-py311.xml
datadog-ci coverage upload --flags python-3.12 coverage-py312.xml
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /code_coverage/setup/#pr-gates
[2]: https://app.datadoghq.com/ci/pr-gates/rule/create
