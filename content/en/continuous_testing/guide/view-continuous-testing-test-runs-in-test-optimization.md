---
title: View Continuous Testing Test Runs in Test Optimization

further_reading:
  - link: 'getting_started/continuous_testing'
    tag: 'Documentation'
    text: 'Getting Started with Continuous Testing'
  - link: 'getting_started/test_optimization'
    tag: 'Documentation'
    text: 'Getting Started with Test Optimization'
  - link: 'tests/flaky_tests'
    tag: 'Documentation'
    text: 'Working with Flaky Tests'

---

## Overview

[Continuous Testing][1] allows you run [Synthetic tests][2] within your CI/CD pipelines to automate software testing for a product's entire lifecycle. [Test Optimization][3] provides a test-first view into your CI health by displaying important metrics and results from your tests. 

You can view Continuous Testing test runs in Test Optimization to get a consolidated view of metrics and results across all of your test frameworks, including Synthetics, in one place.

## View Continuous Testing test runs in Test Optimization

Navigate to [Test Runs][4] in Test Optimization and filter the **Test Framework** facet to **synthetics**:

{{< img src="continuous_testing/guide/view-continuous-testing-test-runs-test-optimization/test_optimization_test_runs_explorer.png"  style="width:100%" >}}

Use this to search, filter, and analyze Continuous Testing test runs using both Test Optimization and Continuous Testing metadata in one view.

For example:

- Use the **Flaky**, **New Flaky** and **Known Flaky** facets to identify flaky test runs
- Use the **Synthetics Teams** facet to analyze test run status and performance by team
- Use the **@test.name** column to export a list of test runs and their names

Open a Continuous Testing test run in Test Optimization to see detailed information about the test run:

{{< img src="continuous_testing/guide/view-continuous-testing-test-runs-test-optimization/test_runs_detail.png"  style="width:100%" >}}

For example:

- Use the **Overview** tab to troubleshoot a flaky test by viewing the first and last commit it flaked
- Use the **History** tab to visualize past runs by status and branch
- Use the **Performance** tab to measure the mean, min, max, p95, and trend of the duration of test runs over time

To view a Continuous Testing test run in Synthetics from Test Optimization, click **View in Synthetics** from the Test Optimization test run page.

To view a Continuous Testing test run in Test Optimization from Synthetics, click **View in Test Optimization** from the Synthetics test run page:

{{< img src="continuous_testing/guide/view-continuous-testing-test-runs-test-optimization/continuous_testing_test_run_detail.png"  style="width:100%" >}}

## Pricing

Continuous Testing test runs are available for free in Test Optimization (spans are excluded from billing).


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/
[2]: /synthetics/
[3]: /tests/
[4]: /tests/explorer/