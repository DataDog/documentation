---
title: CI/CD Optimization
description: "Monitor, troubleshoot, and optimize your CI/CD pipelines and test suites in Datadog."
aliases:
  - /continuous_integration/cicd_optimization/
---

CI/CD Optimization combines Datadog's CI Visibility and Test Optimization experiences into one unified interface. It provides a single place to understand, monitor, and improve your entire CI/CD ecosystem, from pipeline executions to individual test runs.

<div class="alert alert-info">You can return to the previous UI by clicking {{< ui >}}Switch Back{{< /ui >}} at the top of any page in CI/CD Optimization. To re-enable the new experience, click {{< ui >}}Try It Now{{< /ui >}}.</div>

## Unified CI/CD experience

This section provides an overview of CI/CD Optimization's key features, which retain essential functionality of CI Visibility and Test Optimization.

### CI/CD Health

Explore key CI reliability and performance metrics in the [CI/CD {{< ui >}}Health{{< /ui >}} page][8]. The dashboard includes widgets to track their evolution over time, suggestions to improve them, and an overview of your monitors' status.

{{< img src="cicd_optimization/cicd_health.png" alt="CI/CD Health dashboard" style="width:100%;" >}}

### Unified explorer

Browse pipeline executions and test runs from a single view in the [CI/CD {{< ui >}}Explorer{{< /ui >}}][3]. Toggle between pipelines and tests, and search, filter, and analyze each type of data. Narrow down results by specific levels of aggregation:

- **Pipelines**: Pipeline, Stage, Job, Step, or Command
- **Tests**: Session, Module, Suite, or Test

{{< img src="cicd_optimization/explorer.png" alt="Unified explorer with toggle for pipeline and test data" style="width:100%;" >}}

### Flaky Management

Get a high-level view of flakiness across your repositories in the {{< ui >}}Flaky Management Overview{{< /ui >}}. This page provides trend charts, prioritization suggestions, and tooling to validate your setup.

{{< img src="cicd_optimization/flaky_overview.png" alt="Flaky Management overview with trend charts and prioritization suggestions" style="width:100%;" >}}

Track and remediate flaky tests directly from the {{< ui >}}Flaky Management Explorer{{< /ui >}}. You can view flaky test trends, identify problematic tests, and take action to improve test reliability. See [Flaky Tests Management][5] for more information.

{{< img src="cicd_optimization/flaky_management.png" alt="Flaky Management interface showing flaky test trends and actions" style="width:100%;" >}}

### Continuous setup flow

Set up CI/CD Optimization for a repository in one continuous, guided process. After [connecting your CI provider][6] to Datadog, continue directly to the next step to [set up the test suite][7] you want to monitor.

{{< img src="cicd_optimization/setup_flow.png" alt="Continuous setup flow for CI provider and test suite" style="width:90%;" >}}

## Get started with CI/CD Optimization

{{< whatsnext desc="Get started with CI/CD Optimization:" >}}
    {{< nextlink href="/continuous_integration/pipelines/" >}}CI Pipeline Setup{{< /nextlink >}}
    {{< nextlink href="/tests/setup/" >}}Test Suite Setup{{< /nextlink >}}
    {{< nextlink href="/cicd/health/" >}}Health{{< /nextlink >}}
    {{< nextlink href="/continuous_integration/explorer/" >}}Explorer{{< /nextlink >}}
    {{< nextlink href="/tests/flaky_management/" >}}Flaky Test Management{{< /nextlink >}}
    {{< nextlink href="/cicd/features/" >}}Features{{< /nextlink >}}
    {{< nextlink href="/monitors/types/ci/?tab=pipelines" >}}Monitors{{< /nextlink >}}
    {{< nextlink href="/cicd/guides/" >}}Guides{{< /nextlink >}}
    {{< nextlink href="/cicd/troubleshooting/" >}}Troubleshooting{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /continuous_integration/
[2]: /tests/
[3]: /continuous_integration/explorer/
[4]: /tests/explorer/
[5]: /tests/flaky_management/
[6]: /continuous_integration/pipelines/
[7]: /tests/setup/
[8]: /cicd/health/
