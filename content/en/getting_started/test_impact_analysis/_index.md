---
title: Getting Started with Test Impact Analysis
aliases:
- /getting_started/intelligent_test_runner
further_reading:
- link: 'https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/'
  tag: 'Blog'
  text: 'Streamline your CI testing with Datadog Intelligent Test Runner'
- link: '/test_impact_analysis/'
  tag: 'Documentation'
  text: 'Learn about Test Impact Analysis'
- link: '/tests/code_coverage/'
  tag: 'Documentation'
  text: 'Learn about Code Coverage'
algolia:
  tags: ["test impact analysis", "intelligent test runner", "ci test", "ci tests", "flaky test", "flaky tests"]
---

<div class="alert alert-warning"> This feature was formerly known as Intelligent Test Runner, and some tags still contain "itr".</div>

## Overview

[Test Impact Analysis][1] allows you to skip irrelevant tests unaffected by a code change.

With [Test Optimization][2], development teams can configure Test Impact Analysis for their test services, set branches to exclude (such as the default branch), and define files to be tracked (which triggers full runs of all tests when any tracked file changes).

{{< img src="/continuous_integration/itr_test_selection_diagram.png" alt="A Venn diagram of the components for Test Impact Analysis: tracked files, excluded branches, and skipped tests" caption="A Venn diagram displaying how Test Impact Analysis defines an excluded test by using tracked files, excluded branches, and passed tests." style="width:65%" >}}

Configure and enable Test Impact Analysis for your test services to reduce unnecessary testing time, enhance CI test efficiency, and reduce costs, while maintaining the reliability and performance across your CI environments. 

Test Impact Analysis uses [code coverage data][5] to determine whether or not tests should be skipped. For more information, see [How Test Impact Analysis Works in Datadog][10].

## Set up Test Impact Analysis

To set up Test Impact Analysis, see the following documentation for your programming language:

{{< partial name="continuous_integration/ci-itr-setup.html" >}}

</br>

## Enable Test Impact Analysis

To enable Test Impact Analysis:

1. Navigate to [**Software Delivery** > **Test Optimization** > **Settings**][3]. 
1. On the **Test Services** tab, click **Configure** in the `Test Impact Analysis` column for a service.

{{< img src="/getting_started/intelligent_test_runner/enable_settings.png" alt="Enable Test Impact Analysis for a test service on the Test Service Settings page" style="width:100%" >}}

You must have the `Test Impact Analysis Activation Write` permission. For more information, see the [Datadog Role Permissions documentation][4].

Disabling Test Impact Analysis on critical branches (such as your default branch) ensures comprehensive test coverage, whereas enabling it to run on feature or development branches helps maximize testing efficiency.

## Configure Test Impact Analysis

You can configure Test Impact Analysis to prevent specific tests from being skipped. These tests are known as *unskippable tests*, and are run regardless of [code coverage data][5]. 

To configure Test Impact Analysis:

1. For the test you want to enable it on, click **Configure**.
1. Click the **Status** toggle to enable Test Impact Analysis. 
1. Specify any branches to exclude (typically the default branch of a repository). Test Impact Analysis does not skip tests for these branches.
1. Specify file directories and files to track (for example, `documentation/content/**` or `domains/shopist/apps/api/BUILD.bazel`). Test Impact Analysis runs all CI tests when any of these tracked files change.
1. Click **Save Settings**.

{{< img src="/getting_started/intelligent_test_runner/configure_itr.png" alt="Enable Test Impact Analysis, provide branches for Test Impact Analysis to exclude, and add files for Test Impact Analysis to track and run tests when any changes happen" style="width:100%" >}}

Once you've configured Test Impact Analysis on a test service, execute a test suite run on your default branch. This establishes a baseline for Test Impact Analysis to accurately skip irrelevant tests in future commits. 

## Use Test Impact Analysis data

Explore the data collected by enabling Test Impact Analysis, such as the time savings achieved by skipping tests, as well as your organization's usage of Test Impact Analysis, to improve your CI efficiency.

{{< img src="/getting_started/intelligent_test_runner/dashboard.png" alt="The out-of-the-box dashboard displaying information about the time saved by tests skipped by Test Impact Analysis, and your organization's usage of Test Impact Analysis" style="width:100%" >}}

You can create [dashboards][6] to visualize your testing metrics, or use an [out-of-the-box dashboard][7] containing widgets populated with data collected by Test Impact Analysis to help you identify areas of improvement with usage patterns and trends. 

## Examine results in the Test Optimization Explorer

The [Test Optimization Explorer][8] allows you to create visualizations and filter test spans using the data collected from Test Optimization and Test Impact Analysis. When Test Impact Analysis is active, it displays the amount of time saved for each test session or commit. The duration bars turn purple to indicate active test skipping.

{{< tabs >}}
{{% tab "Session" %}}

Navigate to [**Software Delivery** > **Test Optimization** > **Test Runs**][101] and select `Session` to start filtering your test session span results.

{{< img src="/getting_started/intelligent_test_runner/itr_sessions.png" alt="Test session results in the Test Optimization Explorer filtered on tests skipped by Test Impact Analysis" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asession

{{% /tab %}}
{{% tab "Module" %}}

Navigate to [**Software Delivery** > **Test Optimization** > **Test Runs**][101] and select `Module` to start filtering your test module span results. 

{{< img src="/getting_started/intelligent_test_runner/itr_modules.png" alt="Test module results in the Test Optimization Explorer filtered on tests skipped by Test Impact Analysis" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Amodule

{{% /tab %}}
{{% tab "Suite" %}}

Navigate to [**Software Delivery** > **Test Optimization** > **Test Runs**][101] and select `Suite` to start filtering your test suite span results. 

{{< img src="/getting_started/intelligent_test_runner/itr_suites.png" alt="Test suite results in the Test Optimization Explorer filtered on tests skipped by Test Impact Analysis" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asuite

{{% /tab %}}
{{% tab "Test" %}}

Navigate to [**Software Delivery** > **Test Optimization** > **Test Runs**][101] and select `Test` to start filtering your test span results. 

{{< img src="/getting_started/intelligent_test_runner/itr_tests.png" alt="Test results in the Test Optimization Explorer filtered on tests skipped by Test Impact Analysis" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Atest

{{% /tab %}}
{{< /tabs >}}

Use the following out-of-the-box Test Impact Analysis [facets][9] to customize the search query:

Code Coverage Enabled
: Indicates whether code coverage tracking was active during the test session.

Skipped by ITR
: Number of tests that were skipped during the session by Test Impact Analysis.

Test Skipping Enabled
: Indicates if Test Impact Analysis was enabled for the test session.

Test Skipping Type
: The method or criteria used by Test Impact Analysis to determine which tests to skip.

Tests Skipped
: The total count of tests that were not executed during the test session, which may include tests that were configured to skip, or were set as manual exclusions.

Time Saved
: The length of time saved for the session by Test Impact Analysis usage.

For example, to filter test session runs that have `Test Skipping Enabled`, you can use `@test.itr.tests_skipping.enabled:true` in the search query. 

{{< img src="/getting_started/intelligent_test_runner/session_run.png" alt="A side panel displaying the first test session run where the Test Skipping feature is enabled for Test Impact Analysis" style="width:100%" >}}

Then, click on a test session run and see the amount of time saved by Test Impact Analysis in the **Test Session Details** section on the test session side panel.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/test_impact_analysis/
[2]: /tests/
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: /account_management/rbac/permissions/
[5]: /tests/code_coverage
[6]: /dashboards/
[7]: https://app.datadoghq.com/dash/integration/30941/ci-visibility---intelligent-test-runner
[8]: /tests/explorer/
[9]: /continuous_integration/explorer/facets/?tab=testruns
[10]: /tests/test_impact_analysis/how_it_works/