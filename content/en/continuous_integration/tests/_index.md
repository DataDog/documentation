---
title: Exploring Tests
kind: documentation
aliases:
  - /continuous_integration/explore_tests/
further_reading:
    - link: "/monitors/types/ci/"
      tag: "Documentation"
      text: "Creating CI Test Monitors"
    - link: "/continuous_integration/guides/find_flaky_tests/"
      tag: "Documentation"
      text: "Finding Flaky Tests"
    - link: "/continuous_integration/guides/rum_integration/"
      tag: "Documentation"
      text: "Linking CI Visibility and RUM"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
    - link: "https://www.datadoghq.com/blog/ci-test-visibility-with-rum/"
      tag: "Blog"
      text: "Troubleshoot end-to-end tests with CI Visibility and RUM"
cascade:
    algolia:
        rank: 70
        tags: ['ci test', 'ci tests']
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

The [**Tests**][1] page provides a test-first view into your CI health by displaying important metrics and results from your tests. It can help you investigate performance problems and test failures that concern you the most because you work on the related code, not because you maintain the pipelines they are run in.

## Setup

{{< whatsnext desc="Choose a language to set up Test Visibility in Datadog:" >}}
    {{< nextlink href="continuous_integration/tests/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="continuous_integration/tests/junit_upload" >}}Uploading JUnit test report files to Datadog{{< /nextlink >}}
{{< /whatsnext >}}
## Explore tests

To see your tests, navigate to **CI** > **Tests** and select between the [**Branches**](#branches-view) or [**Default Branches** view](#default-branches-view).

### Branches view

The [Branches][2] view of the Tests page lists all branches from all Test Services that have reported test results. This tab is useful for individual developers to quickly see the status of tests that run on their code branches and troubleshoot test failures.

In this page, you can filter the list by name, test service, or commit SHA, or to show only your branches (branches that contain at least one commit authored by you) by enabling the **My branches** toggle and adding the email addresses you use in your Git configuration.

#### Test results

For each branch, the list shows test results for its latest commit: a consolidated number of tests broken down by status (which takes into account retries) and the number of new flaky tests introduced by the commit (a flaky test is defined as a test that both passes and fails on the same commit).

#### Test suite performance

There's also information about the wall time of the most recent test suite run, and a comparison to the average wall time of the default branch. _Wall time_ is the real time elapsed while the test suite runs, which is less than the sum of all test times when tests are run concurrently. The comparison of your branch's wall time to the default branch's wall time can help you determine if your commit is introducing performance regressions to your test suite.

Hovering over the commit author avatar shows detailed information about the latest commit.

#### Test regressions

A test run is marked as a regression when its duration is both five times the mean and greater than the max duration for the same test in the default branch.

A benchmark test run is marked as a regression when its duration is five times the standard deviation above the mean for the same test in the default branch. A benchmark test has @test.type:benchmark.

The mean and the max of the default branch is calculated over the last week of test runs.

Test regressions are evaluated per commit in an effort to tie performance regressions to specific code changes.

#### Investigate for more details

Click on the row to see test suite run details such as test results for the last commit on this branch (or you can switch branches), failing tests and the most common errors, slow tests, flaky tests, and a complete list of test runs over the time frame selected. You can filter this list of test runs by facet to get to the information you want to see most.

Click into one of the test runs to see the test trace as a flame graph or a span list. The _Runs (n)_ list on the left lets you quickly access traces for each retry of the test for the same commit.

#### Explore connections to services, resources, logs, and network events

Click the CI provider link to examine the Resource, Service, or Analytics page for the test. You can also find complete tags information and links to related log events and network monitoring events.

### Default Branches view

A _test service_ is a group of tests associated with, for example, a project or repo. It contains all the individual tests for your code, optionally organized into _test suites_ (which are like folders for your tests). The [Default Branches][3] view of the Tests page shows aggregated health metrics for the _default_ branch of each test service. This view is useful for teams to understand the overall health of the service over time.

The Default Branches view shows similar information to the Branches view, but applied to the default branch, and sorted by most recent. It compares the current wall time with the average default branch wall time, to give you an indication of how your test suite performance is trending over time.

Click on a row to see the analytics for tests run on the default branch, similar to examining for test run details from the Branches view.

## Explore test runs

On the [Test Runs][4] page, you can see the list of all runs over the selected time frame, filter by facet, and examine individual test run details. Each test run is reported as a trace, which in the case of integration tests includes calls made to datastores or third party services using regular [APM instrumentation][5].

Click into a particular test run to see the flame graph or span list for a test, for each time it's been run, similar to clicking into a test run from the Tests page.

You can also interactively plot graphs and top lists using the [Analytics][6] tab.

{{< img src="ci/ci-test-runs.png" alt="Test Runs analytics" style="width:100%;">}}

### How third-party services data is shown

Spans generated by third party services that are instrumented with APM and that are involved in integration tests appear in [APM][7]. You can filter spans that were generated as part of an integration test using the `Origin Service` facet and selecting the test service name used by the integration test.

### Test suite level visibility

In addition to tests, CI Visibility provides visibility over the whole testing phase of your project. On the [Test Runs][4] page, you can filter by test level: session, module, suite and test. Each test level represents a different level of aggregation of tests.

{{< img src="ci/ci-test-suite-visibility.png" alt="Test Suite Visibility" style="width:100%;">}}

#### Sessions
Test sessions are the highest level of aggregation. They correspond one to one to a test command, such as `yarn test`, `mvn test`, or `dotnet test`.

For [JUnit report uploads][14] there is 1 session per report upload.

#### Module
The definition of module changes slightly per language:

* In .NET a test module groups every test that is run under the same [unit test project][8].
* In Swift a test module groups every test that is run for a given bundle.
* In JavaScript the test modules map one-to-one to test sessions.
* In Java a test module groups every test that is run by the same Maven Surefire/Failsafe or Gradle Test task execution.
* In JUnit report uploads, the test modules map one-to-one to test sessions.

An example of a module is `SwiftLintFrameworkTests`, which corresponds to a test target in [`SwiftLint`][9].

#### Suite
A test suite is a group of tests exercising the same unit of code.

An example of a test suite is `src/commands/junit/__tests__/upload.test.ts`, which corresponds to a test file in [`datadog-ci`][10].

#### Compatibility
Not every language supported by CI Visibility has support for test suite level visibility:

* [Swift][11] has complete support since `dd-sdk-swift-testing>=2.1.0`.
* [.NET][12] has complete support since `dd-trace-dotnet>2.16.0`.
* [JavaScript][13] has limited support since `dd-trace-js>=3.3.0`.
* Java has complete support since `dd-trace-java>=1.12.0`.
* [JUnit report uploads][14] has complete support since `datadog-ci>=2.17.0`.

Additionally, test suite level visibility is only supported in Agentless mode.

## Use CI tests data

When creating a [dashboard][15] or a [notebook][16], you can use test execution data in your search query, which updates the visualization widget options.

## Alert on test data

When you evaluate failed or flaky tests, or the performance of a CI test on the [**Test Runs** page][4], click **Create Monitor** to create a [CI Test monitor][17]. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-services
[2]: https://app.datadoghq.com/ci/test-services?view=branches
[3]: https://app.datadoghq.com/ci/test-services?view=default-branches
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://www.datadoghq.com/auto-instrumentation/
[6]: https://app.datadoghq.com/ci/test-runs?viz=timeseries
[7]: /tracing/
[8]: https://learn.microsoft.com/en-us/visualstudio/test/create-a-unit-test-project?view=vs-2022#to-create-a-unit-test-project
[9]: https://github.com/realm/SwiftLint/blob/7738f0c0a5990201ca6556bdb2f13f8e67b5191d/Package.swift#L71
[10]: https://github.com/DataDog/datadog-ci/blob/6de6ea3bbffa57d8576422535061ca35c759feb6/src/commands/junit/__tests__/upload.test.ts
[11]: /continuous_integration/tests/swift/#test-suite-level-visibility-compatibility
[12]: /continuous_integration/tests/dotnet/#test-suite-level-visibility-compatibility
[13]: /continuous_integration/tests/javascript/#test-suite-level-visibility-compatibility
[14]: /continuous_integration/tests/junit_upload#test-suite-level-visibility-compatibility
[15]: https://app.datadoghq.com/dashboard/lists
[16]: https://app.datadoghq.com/notebook/list
[17]: /monitors/types/ci/
