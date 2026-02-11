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

## Overview

Flags in Code Coverage let you organize and filter coverage data by custom categories. Use flags to separate coverage reports by test type (unit, integration, end-to-end), runtime version (JVM 17, JVM 21), or any other criteria relevant to your project.

With flags, you can:
- View coverage data filtered by a specific flag in the Datadog UI.
- Configure [PR Gates][1] that evaluate coverage thresholds for specific flags.
- Track coverage trends separately for different test suites or environments.

### Flags vs. monorepo support features

Code Coverage provides two complementary ways to filter coverage data:

- **[Monorepo support features][3]** (per-codeowner and per-service coverage) filter coverage data by **file paths**. Use these to see coverage data for files a particular team owns or for files belonging to a specific service.
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

<div class="alert alert-info">The <code>--flags</code> argument is available in <code>datadog-ci</code> v5.6.0 and later.</div>

To add flags to a coverage report, use the `--flags` option when uploading with the `datadog-ci` CLI:

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

In the [Code Coverage UI][4], select a repository and use the **Flag** filter to view coverage data for a specific flag. This filter appears alongside the Code Owner and Service filters.

{{< img src="/code_coverage/flags_filter.png" alt="Code Coverage UI showing the flag filter dropdown" style="width:100%" >}}

When you select a flag, the coverage metrics update to show only the data from reports tagged with that flag.

## Set up PR Gates with flags

You can configure [PR Gates][1] to enforce coverage thresholds for specific flags. This allows you to enforce different coverage requirements for different test types or runtime versions.

### Create a flag-specific gate

1. Navigate to [PR Gates rule creation][2].
2. Configure the coverage threshold (total or patch coverage).
3. In the **per flag** field, select one or more flags the gate should apply to.
4. Save the rule.

{{< img src="/code_coverage/flags_gate.png" alt="PR Gates configuration showing the flags scope option" style="width:100%" >}}

### How flag gates work

- **With flags specified**: The gate evaluates coverage separately for each specified flag. When multiple flags are specified, each is evaluated independently against the threshold. The gate does not combine coverage across flags.
- **Without flags specified**: The gate evaluates coverage for the entire repository.

### Example configurations

**Enforce high coverage for unit tests:**

- Condition type: `Overall Code Coverage`
- Threshold: `80%`
- Scope: `Flags`
- Flags: `unit-tests`

**Require all new code in integration tests to be tested:**

- Condition type: `Patch Code Coverage`
- Threshold: `100%`
- Scope: `Flags`
- Flags: `integration-tests`

**Enforce coverage for specific runtime versions:**

- Condition type: `Overall Code Coverage`
- Threshold: `75%`
- Scope: `Flags`
- Flags: `python-3.11`, `python-3.12`

### Multiple gates per repository

You can create multiple gates for the same repository, each applying to different flags. This allows you to enforce different coverage standards for different test types or runtime versions.

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

[1]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=code_coverage
[2]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=code_coverage
[3]: /code_coverage/monorepo_support
[4]: https://app.datadoghq.com/ci/code-coverage
