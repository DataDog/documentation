---
title: Getting Started with Test Visibility
further_reading:
- link: 'https://www.datadoghq.com/blog/ci-test-visibility-with-rum/'
  tag: 'Blog'
  text: 'Troubleshoot end-to-end tests with CI Test Visibility and RUM'
- link: '/tests/'
  tag: 'Documentation'
  text: 'Learn about Test Visibility'
- link: '/tests/guides/flaky_test_management'
  tag: 'Documentation'
  text: 'Learn about Flaky Test Management'
- link: '/tests/developer_workflows'
  tag: 'Documentation'
  text: 'Learn about enhancing developer workflows in Datadog'
algolia:
  tags: ["test visibility", "ci test", "ci tests", "flaky test", "flaky tests", "test run", "test runs", "test span", "test spans"]
---

## Overview

[Test Visibility][1] allows you to better understand your test posture, identify commits introducing flaky tests, identify performance regressions, and troubleshoot complex test failures. 

{{< img src="getting_started/test_visibility/list.png" alt="List of test services in Test Visibility" style="width:100%;" >}}

You can visualize the performance of your test runs as traces, where spans represent the execution of different parts of the test.

Test Visibility enables development teams to debug, optimize, and accelerate software testing across CI environments by providing insights about test performance, flakiness, and failures. Test Visibility automatically instruments each test and integrates intelligent test selection using the [Intelligent Test Runner][2], enhancing test efficiency and reducing redundancy. 

With historical test data, teams can understand performance regressions, compare the outcome of tests from feature branches to default branches, and establish performance benchmarks. By using Test Visibility, teams can improve their [developer workflows][14] and maintain quality code output. 

## Set up a test service

Test Visibility tracks the performance and results of your CI tests, and displays results of the test runs.

To start instrumenting and running tests, see the documentation for one of the following languages.

{{< partial name="continuous_integration/ci-tests-setup.html" >}}

</br>

Test Visibility is compatible with any CI provider and is not limited to those supported by CI Visibility. For more information about supported features, see [Test Visibility][3].

## Use CI test data

Access your tests’ metrics (such as executions, duration, distribution of duration, overall success rate, failure rate, and more) to start identifying important trends and patterns using the data collected from your tests across CI pipelines.

{{< img src="getting_started/test_visibility/tests_dashboard.png" alt="Out-of-the-box Test Visibility dashboard in Datadog" style="width:100%;" >}}

You can create [dashboards][4] for monitoring flaky tests, performance regressions, and test failures occurring within your tests. Alternatively, you can utilize an [out-of-the-box dashboard][5] containing widgets populated with data collected in Test Visibility to visualize the health and performance of your CI test sessions, modules, suites, and tests.

## Manage flaky tests

A [flaky test][6] is a test that exhibits both a passing and failing status across multiple test runs for the same commit. If you commit some code and run it through CI, and a test fails, and you run it through CI again and the same test now passes, that test is unreliable and marked as flaky.

You can access flaky test information in the **Flaky Tests** section of a test run’s overview page, or as a column on your list of test services on the [**Test List** page][7].

{{< img src="getting_started/test_visibility/commit_flaky_tests.png" alt="Flaky tests that can be ignored in the Commits section of a test run" style="width:100%;" >}}

For each branch, the list shows the number of new flaky tests, the number of commits flaked by the tests, total test time, and the branch’s latest commit details. 

Average duration
: The average time the test takes to run.

First flaked and Last flaked
: The date and commit SHAs for when the test first and most recently exhibited flaky behavior. 

Commits flaked
: The number of commits in which the test exhibited flaky behavior. 

Failure rate
: The percentage of test runs that have failed for this test since it first flaked. 

Trend
: A visualization that indicates whether a flaky test was fixed or it is still actively flaking.

Test Visibility displays the following graphs to help you understand your flaky test trends and the impact of your flaky tests in a commit’s **Flaky Tests** section:

New Flaky Test Runs
: How often new flaky tests are being detected.

Known Flaky Test Runs
: All of the test failures associated with the flaky tests being tracked. This shows every time a flaky test "flakes”.

To ignore new flaky tests for a commit that you’ve determined the flaky tests were detected by mistake, click on a test containing a **New Flaky** value with a dropdown option, and click **Ignore flaky tests**. For more information, see [Flaky Test Management][8].

## Examine results in the Test Visibility Explorer

The Test Visibility Explorer allows you to create visualizations and filter test spans using the data collected from your testing. Each test run is reported as a trace, which includes additional spans generated by the test request. 

{{< tabs >}}
{{% tab "Session" %}}

Navigate to [**Software Delivery** > **Test Visibility** > **Test Runs**][101] and select `Session` to start filtering your test session span results. 

{{< img src="/getting_started/test_visibility/session.png" alt="Test session results in the Test Visibility Explorer filtered on the Shopist repository" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asession

{{% /tab %}}
{{% tab "Module" %}}

Navigate to [**Software Delivery** > **Test Visibility** > **Test Runs**][101] and select `Module` to start filtering your test module span results. 

{{< img src="/getting_started/test_visibility/module.png" alt="Test module results in the Test Visibility Explorer filtered on the Shopist repository" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Amodule

{{% /tab %}}
{{% tab "Suite" %}}

Navigate to [**Software Delivery** > **Test Visibility** > **Test Runs**][101] and select `Suite` to start filtering your test suite span results. 

{{< img src="/getting_started/test_visibility/suite.png" alt="Test suite results in the Test Visibility Explorer filtered on the Shopist repository" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asuite

{{% /tab %}}
{{% tab "Test" %}}

Navigate to [**Software Delivery** > **Test Visibility** > **Test Runs**][101] and select `Test` to start filtering your test span results. 

{{< img src="/getting_started/test_visibility/test.png" alt="Test results in the Test Visibility Explorer filtered on the Shopist repository" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Atest

{{% /tab %}}
{{< /tabs >}}

Use [facets][9] to customize the search query and identify changes in time spent on each level of your test run.

Once you click on a test on the **Test List** page, you can see a flame graph or a list of spans on the **Trace** tab. 

{{< img src="/getting_started/test_visibility/failed_test_trace.png" alt="A stack trace of a failed test run on the Test List page" style="width:100%" >}}

You can identify bottlenecks in your test runs and examine individual levels ranked from the largest to smallest percentage of execution time.

## Add custom measures to tests

You can programmatically search and manage test events using the CI Visibility Tests API endpoint. For more information, see [the API documentation][10].

To enhance the data collected from your CI tests, you can programmatically add tags or measures (like memory usage) directly to the spans created during test execution. For more information, see [Add Custom Measures To Your Tests][11].

## Create a CI monitor

Alert relevant teams in your organization about test performance regressions when failures occur or new flaky tests occur. 

{{< img src="/getting_started/test_visibility/test_monitor.png" alt="A CI test monitor that triggers alerts when the amount of test failures exceeds one failure" style="width:100%" >}}

To set up a monitor that alerts when the amount of test failures exceeds a threshold of 1 failure:

1. Navigate to [**Monitors** > **New Monitor**][12] and select **CI**. 
1. Select a common monitor type for CI tests to get started, for example: `New Flaky Test` to trigger alerts when new flaky tests are added to your code base, `Test Failures` to trigger alerts for test failures, or `Test Performance` to trigger alerts for test performance regressions, or customize your own search query. In this example, select the `Branch (@git.branch)` facet to filter your test runs on the `main` branch.
1. In the `Evaluate the query over the` section, select last 15 minutes. 
1. Set the alert conditions to trigger when the evaluated value is above the threshold, and specify values for the alert or warning thresholds, such as `Alert threshold > 1`.
1. Define the monitor notification.
1. Set permissions for the monitor.
1. Click **Create**.

For more information, see the [CI Monitor documentation][13]. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/
[2]: /intelligent_test_runner/
[3]: /tests/#supported-features
[4]: /dashboards/
[5]: https://app.datadoghq.com/dash/integration/30897/ci-visibility---tests-dashboard
[6]: /glossary/?product=ci-cd#flaky-test
[7]: https://app.datadoghq.com/ci/test-services
[8]: /tests/guides/flaky_test_management
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /continuous_integration/explorer/facets/?tab=testruns
[10]: /api/latest/ci-visibility-tests/
[11]: /tests/guides/add_custom_measures/
[12]: https://app.datadoghq.com/monitors/create
[13]: /monitors/types/ci/?tab=tests#track-new-flaky-tests
[14]: /tests/developer_workflows