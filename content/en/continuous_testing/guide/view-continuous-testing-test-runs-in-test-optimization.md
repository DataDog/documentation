---
title: View Continuous Testing Test Runs in Test Optimization

further_reading:
  - link: 'getting_started/continuous_testing'
    tag: 'Documentation'
    text: 'Getting Started with Continuous Testing'
  - link: '/tests/explorer/'
    tag: 'Documentation'
    text: 'Using the Test Optimization Explorer'
  - link: 'tests/flaky_tests'
    tag: 'Documentation'
    text: 'Working with Flaky Tests'

---
{{< site-region region="gov" >}}<div class="alert alert-danger"> Mobile Application Testing is not supported on this <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

[Continuous Testing][1] enables you to run [Synthetic Monitoring tests][2] within your CI/CD pipelines, automating software testing throughout your product's lifecycle. [Test Optimization][3] provides a test-first view into your CI health by displaying important metrics and results from your tests. 

You can use Test Optimization to view Continuous Testing test runs, giving you a unified overview of metrics and results from all your test frameworks, including Synthetic Monitoring, in one place.

## View Continuous Testing test runs in Test Optimization

1. Navigate to the [Test Runs][4] Explorer in Test Optimization.
2. Filter the **Test Framework** facet to **synthetics**:

{{< img src="continuous_testing/guide/view-continuous-testing-test-runs-in-test-optimization/test_optimization_test_run_explorer_3.png" alt="Test Optimization Test Runs explorer, filtered to synthetics framework facet" style="width:100%" >}}

Use this feature to search, filter, and analyze Continuous Testing test runs, combining both Test Optimization and Continuous Testing metadata in a single view.

For example:

- Use the **Flaky**, **New Flaky**, and **Known Flaky** facets to identify flaky test runs.
- Use the **Synthetics Teams** facet to analyze test run status and performance by team.
- Click **Export** and include the **@test.name** column to export a list of test runs and their names.

Select a Continuous Testing test run in the Test Optimization Explorer to view detailed information about that test run:

{{< img src="continuous_testing/guide/view-continuous-testing-test-runs-in-test-optimization/test_optimization_test_run_detail.png" alt="Test Optimization Test Runs details view" style="width:100%" >}}

Use these tabs on the side panel:

- **Overview**: Troubleshoot a flaky test by viewing the first and last commit it flaked.
- **History**: Visualize past runs by status and branch.
- **Performance**: Track the mean, minimum, maximum, p95, and trends for test run durations over time.

## Viewing test runs

From the Test Optimization Explorer, you can jump to a test run in the Synthetic Monitoring page. Click **View in Synthetics** from the details panel of a test run on the Test Optimization page.

{{< img src="continuous_testing/guide/view-continuous-testing-test-runs-in-test-optimization/view_in_synthetics.png" alt="Test Optimization Test Runs details view, highlighting View in Synthetics button" style="width:100%" >}}

Similarly, from the Synthetic Monitoring page, you jump to a test run in the Test Optimization Explorer. Click **View in Test Optimization** from the details panel of a test run on the Synthetic Monitoring page:

{{< img src="continuous_testing/guide/view-continuous-testing-test-runs-in-test-optimization/continuous_testing_test_run_detail.png" alt="Synthetics Test Runs details view, highlighting View in Test Optimization button"  style="width:100%" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/
[2]: /synthetics/
[3]: /tests/
[4]: https://app.datadoghq.com/ci/test/runs