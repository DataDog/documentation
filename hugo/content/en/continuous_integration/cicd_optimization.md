---
title: CI/CD Optimization
further_reading:
  - link: "/continuous_integration/"
    tag: "Documentation"
    text: "CI Visibility"
  - link: "/tests/"
    tag: "Documentation"
    text: "Test Optimization"
---

CI/CD Optimization combines Datadog's [CI Visibility][1] and [Test Optimization][2] experiences into one unified interface. It provides a single place to understand, monitor, and improve your entire CI/CD ecosystem, from pipeline executions to individual test runs.

To enable the new experience, click {{< ui >}}Try It Now{{< /ui >}} at the top of any page in CI Visibility or Test Optimization. You can return to the previous UI at any time by clicking {{< ui >}}Switch Back{{< /ui >}}.

This page provides an overview of CI/CD Optimization's key features, some of which retain original functionality of CI Visibility and Test Optimization. Follow the links to legacy documentation for details on using each product within the unified UI.

## CI/CD Health

Explore key CI reliability and performance metrics in the CI/CD {{< ui >}}Health{{< /ui >}} page. The dashboard includes widgets to track their evolution over time, suggestions to improve them, and an overview of your monitors' status.

{{< img src="cicd_optimization/cicd_health.png" alt="CI/CD Health dashboard" style="width:100%;" >}}

## Unified explorer

Browse pipeline executions and test runs from a single view in the CI/CD {{< ui >}}Explorer{{< /ui >}}. Toggle between pipelines and tests, and narrow down results by specific levels of aggregation:

- **Pipelines**: Pipeline, Stage, Job, Step, or Command
- **Tests**: Session, Module, Suite, or Test

{{< img src="cicd_optimization/explorer.png" alt="Unified explorer with toggle for pipeline and test data" style="width:100%;" >}}

For details on searching, filtering, and analyzing each type of data, see [CI Visibility Explorer][3] and [Test Optimization Explorer][4].

## Flaky Management

Get a high-level view of flakiness across your repositories in the {{< ui >}}Flaky Management Overview{{< /ui >}}. This page provides trend charts, prioritization suggestions, and tooling to validate your setup.

{{< img src="cicd_optimization/flaky_overview.png" alt="Flaky Management overview with trend charts and prioritization suggestions" style="width:100%;" >}}

Track and remediate flaky tests directly from the {{< ui >}}Flaky Management Explorer{{< /ui >}}. You can view flaky test trends, identify problematic tests, and take action to improve test reliability. See [Flaky Tests Management][5] for more information.

{{< img src="cicd_optimization/flaky_management.png" alt="Flaky Management interface showing flaky test trends and actions" style="width:100%;" >}}

## Continuous setup flow

Set up CI/CD Optimization for a repository in one continuous, guided process. After [connecting your CI provider][6] to Datadog, continue directly to the next step to [set up the test suite][7] you want to monitor.

{{< img src="cicd_optimization/setup_flow.png" alt="Continuous setup flow for CI provider and test suite" style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

 [1]: /continuous_integration/
 [2]: /tests/
 [3]: /continuous_integration/explorer/
 [4]: /tests/explorer/
 [5]: /tests/flaky_management/
 [6]: /continuous_integration/pipelines/
 [7]: /tests/setup/
