---
title: Test Visibility Explorer
kind: documentation
description: Learn how to search and filter your test runs in the Test Visibility Explorer.
further_reading:
  - link: "/continuous_integration/tests/"
    tag: "Documentation"
    text: "Explore test data to find and fix problem tests"
  - link: "https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/"
    tag: "Blog"
    text: "Configure pipeline alerts with Datadog CI monitors"
---

## Overview

The Test Visibility Explorer allows you to [search and filter](#search-and-filter), [visualize](#visualize), and [export](#export) test runs at multiple levels using any tag. 

Navigate to [**Software Delivery** > **Test Visibility** > **Test Runs**][6] to see your CI test run results across the following levels: **Session**, **Module**, **Suite**, and **Test**.

{{< img src="/continuous_integration/test_runs.png" text="Test Runs page" style="width:100%" >}}

## Common facets

The **Test** panel on the left lists default facets you can use to search for your test runs.

| Facet | Description |
|---|---|
| Test Status | The outcome of the test: `Passed`, `Failed`, or `Skipped`. |
| Duration | Length of time for the test to complete. |
| Test Service | The [test service][12] instrumented with CI Visibility. |
| Test Full Name | Identifier for a test that includes the test name, test suite name, and configuration or parameter if present. |
| Test Name | A concise name for a test case. Defined in the test itself. |
| Test Suite | A [group of tests][13] exercising the same unit of code depending on your language and testing framework. |
| Flaky | Exhibits both a passing and failing status across multiple test runs for the same commit. |
| Has Parameters | Whether or not a test has parameters: `true` or `false`. |
| Known Flaky | Whether or not a test is known to be flaky: `true` or `false`. <br><br>This test run failed and the test is identified as a flaky test in the current branch or the default branch. |
| Language | The programming language of the library that generated the test. |
| New Flaky | Whether or not this flaky test has occurred before: `true` or `false`. <br><br>The test run identifies the test as flaky in the commit. The test wasn't previously identified as a flaky test in the current branch or the default branch. |
| Performance Regression | A test run is marked as a regression when its duration is both five times the mean and greater than the max duration for the same test in the default branch. |
| Baseline Mean | For a test regression, indicates the mean duration of the same test in the default branch calculated over the last week of test runs. |
| Baseline Standard Deviation | For a test regression, indicates the standard deviation of the same test in the default branch calculated over the last week of test runs durations. |
| Absolute Change | For a test regression, indicates the absolute change of the test run duration compared to the baseline mean. |
| Relative Change | For a test regression, Indicates the relative change of the test run duration compared to the baseline mean. |
| Standard Deviation Change | Indicates if the test has been newly added. |
| Test Code Owners | The name of the test's codeowners as inferred from the repository configuration. |
| Test Fingerprint | The unique identifier for an individual test run. |
| Test Framework | The underlying framework or set of tools used for creating and executing tests. |
| Test Command | The command that was used to execute tests. |
| Test Bundle | Equivalent to a test module. This is used by earlier Datadog testing library versions. |
| Test Full Name | The full name of the test. |
| Test Module | The module of the test, which varies depending on the language:<br><br>In .NET, a test module groups every test that is run under the same unit test project.<br>In Swift, a test module groups every test that is run for a given bundle.<br>In JavaScript, the test modules map one-to-one to test sessions.<br>In Java, a test module groups every test that is run by the same Maven Surefire, Failsafe, or Gradle Test task execution.<br>In Python, a test module groups every test that is run under the same `.py` file as part of a test suite, which is typically managed by a framework like `unittest` or `pytest`.<br>In Ruby, a test module groups every test that is run within the same test file, which is typically managed by a framework like `RSpec` or `Minitest`. |
| Test Traits | The traits of the test such as `category:flaky`. |
| Test Type | The type of the test such as `unit benchmark` or `browser`. |
| RUM Active | Indicates if the test was run inside of an active [Real User Monitoring][14] web session. |
| Is New | Indicates if the test has been newly added. |
| Is Retry | Indicates if the test has been run as a result of a retry. |
| Code Coverage Enabled | Indicates if the [Intelligent Test Runner][16] has enabled [code coverage][17] per test for the session. |
| Skipped by ITR | Number of tests that were skipped during the session by the Intelligent Test Runner. |
| Test Skipping Enabled | Whether the test session or module is allowed to be skipped by the Intelligent Test Runner. |
| Test Skipping Type | The method or criteria used by the Intelligent Test Runner to determine which tests to skip. |
| Test Skipped | The total count of tests that were not executed during the test session, which may include tests that were configured to skip, or were set as manual exclusions. |
| Time Saved | The length of time saved for the session by Intelligent Test Runner usage. |
| Early Flake Detection Enabled | Indicates if the test has been run using [Early Flake Detection][15]. |
| Early Flake Detection Abort Reason | Indicates the Early Flake Detection abort reason for a test. |

You can filter by test level: session, module, suite, and test run. Each test level represents a different level of aggregation of tests.

{{< img src="ci/ci-test-suite-visibility.png" alt="Test Suite Visibility" style="width:100%;">}}

For more information about common facets that you can use as part of your search query in the Test Visibility Explorer, see [Test Run Facets][3].

### Sessions

Test sessions are the highest level of aggregation. They correspond one to one to a test command, such as `yarn test`, `mvn test`, or `dotnet test`.

For JUnit report uploads there is 1 session per report file uploaded.

### Module

The definition of module changes slightly per language:

* In .NET, a test module groups every test that is run under the same [unit test project][9].
* In Swift, a test module groups every test that is run for a given bundle.
* In JavaScript, the test modules map one-to-one to test sessions.
* In Java, a test module groups every test that is run by the same Maven Surefire/Failsafe or Gradle Test task execution.
* In JUnit report uploads, the test modules map one-to-one to test sessions.

An example of a module is `SwiftLintFrameworkTests`, which corresponds to a test target in [`SwiftLint`][10].

### Suite

A test suite is a group of tests exercising the same unit of code.

An example of a test suite is `src/commands/junit/__tests__/upload.test.ts`, which corresponds to a test file in [`datadog-ci`][11].

Test run data is available in [dashboards][7] and [notebooks][8], enabling build engineering teams to customize their communication about high-priority work and CI trends over time.

## Search and filter

You can narrow down, broaden, or shift your focus on a subset of test runs by clicking on the facets to the left or writing your own custom query in the search bar. When you select and deselect facets, the search bar automatically reflects your changes. Similarly, you can modify the search bar query or write a query from scratch in the search bar to select and deselect the facets on the left.

- To learn how to search for tests, see [Search and Manage][1].
- To learn how to create queries, see [Search Syntax][2].

## Analyze

Group your queried test runs into higher-level entities such as fields, patterns, and transactions in order to derive or consolidate information. By using [facets][3], which you do not need to create to search for attributes, you can accomplish the following actions:

- Search and keep track of the progress of tests running in a CI/CD pipeline.
- Investigate every CI/CD job execution to identify and troubleshoot failing test runs.
- Identify [flaky tests][5] to fix.

## Visualize

Select a visualization type to visualize the outcomes of your filters and aggregations and better understand your test runs. For example, you can view your test results in a list to organize your test data into columns, or in a [timeseries graph][18] to measure your CI test data over time.

## Export

[Export your view][4] in the Test Visibility Explorer to reuse it later or in different contexts.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/search
[2]: /tests/explorer/search_syntax
[3]: /tests/explorer/facets
[4]: /tests/explorer/saved_views
[5]: /tests/guides/flaky_test_management
[6]: https://app.datadoghq.com/ci/test-runs
[7]: https://app.datadoghq.com/dashboard/lists
[8]: https://app.datadoghq.com/notebook/list
[9]: https://learn.microsoft.com/en-us/visualstudio/test/create-a-unit-test-project?view=vs-2022#to-create-a-unit-test-project
[10]: https://github.com/realm/SwiftLint/blob/7738f0c0a5990201ca6556bdb2f13f8e67b5191d/Package.swift#L71
[11]: https://github.com/DataDog/datadog-ci/blob/6de6ea3bbffa57d8576422535061ca35c759feb6/src/commands/junit/__tests__/upload.test.ts
[12]: /glossary/?product=ci-cd#test-service
[13]: /glossary/?product=ci-cd#test-suite 
[14]: /real_user_monitoring/
[15]: /tests/early_flake_detection/
[16]: /intelligent_test_runner/
[17]: /tests/code_coverage/
[18]: https://app.datadoghq.com/ci/test-runs?viz=timeseries 