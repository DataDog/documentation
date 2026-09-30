---
title: Code Coverage Calculation
description: "Learn how Datadog merges coverage reports for a commit and how covered, uncovered, and partially covered lines affect total and patch coverage."
further_reading:
  - link: "/code_coverage"
    tag: "Documentation"
    text: "Code Coverage"
  - link: "/code_coverage/setup"
    tag: "Documentation"
    text: "Set up Code Coverage"
  - link: "/code_coverage/flags"
    tag: "Documentation"
    text: "Organize coverage data with flags"
  - link: "/code_coverage/carryforward"
    tag: "Documentation"
    text: "Keep total coverage accurate with carryforward"
  - link: "/code_coverage/configuration"
    tag: "Documentation"
    text: "Configure Code Coverage"
---

## Overview

A commit usually has more than one coverage report. A CI pipeline might run unit, integration, and end-to-end tests in separate jobs. It might also split a test suite across parallel workers, or run the same suite against several runtime versions. Each of those jobs uploads its own report.

Datadog merges all of the reports it receives for the same repository and commit into a single dataset. The total coverage and patch coverage of a commit are computed from that merged dataset, not from any individual report. You don't need to merge reports yourself before uploading them.

Because merging happens on the Datadog side, the coverage percentage shown in Datadog can differ from the percentage reported by a single coverage tool run. For related guidance, see [Discrepancy between Datadog UI and coverage report values][1].

## Report merging

Merging is keyed on the repository and commit SHA pair. Every report uploaded for the same repository and commit contributes to the same merged dataset, regardless of which CI job, pipeline, or machine produced it.

Merging is incremental. As each report arrives, its data is added to the merged dataset and the coverage values are recomputed. A commit's coverage reflects every report received for it so far. Wait until all of your CI jobs have finished uploading before comparing coverage percentages to PR Gate thresholds or to values from a single local report.

The merged dataset is also the basis for the following:

- The total and patch coverage displayed for a commit and for its pull request
- [PR Gate][2] evaluation
- Per-service and per-code-owner coverage in [Monorepo Support][3]

[Flags][4] add a second layer on top of this. Reports sharing a flag are merged together into that flag's own dataset, while the unflagged view merges every report for the commit. For details, see [How flags work with report merging][5].

If [carryforward][7] is enabled, reports carried forward from ancestor commits are merged in the same way as reports uploaded directly for the commit.

## Line coverage statuses

Within the merged dataset, each executable line of each file has one of the following statuses:

| Status | Meaning |
|---|---|
| Covered | The line was executed, and if it contains branches, every branch was executed. |
| Partially covered | The line was executed, but not all of its branches were. |
| Uncovered | The line was never executed. |

Non-executable lines, such as comments, blank lines, and closing brackets, are excluded from coverage calculations. For coverage tools that report these lines as uncovered, see [Inaccurate coverage from non-executable lines][6].

### Files present in multiple reports

When the same file appears in more than one report, Datadog merges the file's line data instead of picking one report over another. An executable line is counted as covered when **any** of the reports containing that file marks it as covered.

For example, consider a commit with two reports that both contain `src/checkout.go`:

| Line | Unit test report | Integration test report | Merged result |
|---|---|---|---|
| 10 | Covered | Uncovered | Covered |
| 11 | Uncovered | Covered | Covered |
| 12 | Uncovered | Uncovered | Uncovered |

The merged coverage of a commit is therefore usually higher than the coverage of any single report. Splitting a test suite across parallel CI jobs does not lower the reported coverage.

### Partial coverage

A line is partially covered when it was executed but not all of its branches were. This applies to `if` statements as well as ternary operators, and to any other construct where a single line contains multiple execution paths.

For example, in the following line, only one of the two paths runs if `user` is always non-null in your tests:

{{< code-block lang="javascript" >}}
const name = user ? user.name : "anonymous";
{{< /code-block >}}

The line is executed, so it is not uncovered, but the `"anonymous"` branch is never taken, so the line is reported as partially covered.

**Partially covered lines are not counted as covered.** They do not contribute to the total coverage percentage or to the patch coverage percentage. To count such a line as covered, add test cases that exercise all of its branches.

Partial coverage is derived from the branch data in your coverage reports. If your coverage tool or report format doesn't include branch information, lines that were executed are reported as covered rather than partially covered.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /code_coverage/setup#discrepancy-between-datadog-ui-and-coverage-report-values
[2]: /code_coverage/configuration#pr-gates
[3]: /code_coverage/monorepo_support
[4]: /code_coverage/flags
[5]: /code_coverage/flags#how-flags-work-with-report-merging
[6]: /code_coverage/setup#inaccurate-coverage-from-non-executable-lines
[7]: /code_coverage/carryforward
