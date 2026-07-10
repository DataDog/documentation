---
title: Code Coverage Carryforward
description: "Reuse coverage data from ancestor commits when not every CI job runs, so total coverage stays accurate on every pull request."
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
  - link: "/code_coverage/flags"
    tag: "Documentation"
    text: "Organize coverage data with flags"
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!">}}Carryforward is in Preview and is subject to change.{{< /callout >}}

## Overview

In large repositories, CI pipelines often run only the subset of test jobs that are relevant to the files changed in a pull request. For example, a PR that touches only frontend code may skip backend unit tests and integration tests. When that happens, only some of the coverage reports are uploaded for the commit, and the total coverage metric drops because the data from the skipped jobs is missing.

Carryforward solves this problem. When a coverage report is missing for a commit, Datadog reuses the most recent matching report from an ancestor commit so that total coverage reflects what the result would have been if every CI job had run.

Carryforward works at the [flag][1] level. For each flag that has no uploaded report on the target commit, Datadog looks back through the commit's ancestors and reuses the latest report tagged with that flag.

{{< img src="code_coverage/carryforward_overview.png" alt="Diagram showing commit A with two uploaded reports, and commit B with one uploaded report and one carried forward from commit A." style="width:80%" >}}

## Prerequisites

Carryforward builds on top of [Code Coverage flags][1]. Do the following before you enable carryforward:

- Tag every coverage report with one or more flags using the `--flags` option on `datadog-ci coverage upload`. See [Add flags to coverage reports][2].
- Use a stable set of flags across CI runs. The same flags should be produced whenever the corresponding tests or tested code change. If your CI distributes tests randomly across workers or generates a different set of reports on each run, carryforward results are not meaningful.

For the consistency requirement, assign one CI job per coverage report. For example, use separate jobs for unit tests, backend integration tests, and UI tests, with each job tagging its report with a stable flag.

## Enable carryforward

Carryforward is configured in the `code-coverage.datadog.yml` file at the root of your repository.

### Enable carryforward for all flags

Set the top-level `carryforward` field to `true` to enable carryforward for every flag in the repository:

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
carryforward: true
{{< /code-block >}}

### Enable carryforward for specific flags

To enable carryforward for only a subset of flags, leave the top-level `carryforward` field unset (or `false`) and opt in per flag using the `flags` map:

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
flags:
  unit-tests:
    carryforward: true
  integration-tests:
    carryforward: true
{{< /code-block >}}

### Disable carryforward for specific flags

When carryforward is enabled at the repository level, you can disable it for individual flags. This is useful for flaky test suites or report types where reusing ancestor data is not appropriate:

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
carryforward: true
flags:
  nightly-tests:
    carryforward: false
{{< /code-block >}}

In this example, carryforward applies to every flag except `nightly-tests`.

## How carryforward works

When a new commit is pushed to a repository where carryforward is enabled, Datadog follows these steps:

1. Looks back through the commit's ancestors.
2. For every flag with carryforward enabled, finds the most recent report tagged with that flag.
3. Reuses the coverage data from those ancestor reports for the new commit, until a fresh report for the flag is uploaded.

Carried-forward data is automatically replaced as soon as a real report is uploaded for the same flag on the new commit. The merged total coverage on the commit always reflects a combination of the following:

- Fresh reports uploaded for the commit
- Carried-forward reports for flags where no fresh report was uploaded

## Use with PR Gates

While carryforward is in Preview, Datadog recommends starting with a non-blocking [PR Gate][3] to observe how carryforward affects evaluation before enforcing it as a merge requirement.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /code_coverage/flags
[2]: /code_coverage/flags#add-flags-to-coverage-reports
[3]: /code_coverage/configuration#pr-gates
