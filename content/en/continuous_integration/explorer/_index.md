---
title: Continuous Integration Visibility Explorer
kind: documentation
description: Learn about the CI Visibility Explorer for test runs and pipeline executions.
further_reading:
  - link: "/continuous_integration/pipelines/"
    tag: "Documentation"
    text: "Explore pipeline data to resolve build problems"
  - link: "/continuous_integration/tests/"
    tag: "Documentation"
    text: "Explore test data to find and fix problem tests"
  - link: "https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/"
    tag: "Blog"
    text: "Configure pipeline alerts with Datadog CI monitors"
---

## Overview

The CI Visibility Explorer allows you to [search and filter](#search-and-filter), [visualize](#visualize), and [export](#export) test runs or pipeline executions at multiple levels using any tag.

{{< tabs >}}
{{% tab "Test Runs" %}}

Navigate to [**CI** > **Test Runs**][101] to see your CI test run results across the following levels: **Session**, **Module**, **Suite**, and **Test**.

{{< img src="/continuous_integration/test_runs.png" text="Test Runs page" style="width:100%" >}}

The **Test** panel on the left lists default facets you can use to search for your tests.

| Facet                  | Description                                                                                                                                                                                                                                                                                                                                                                                                              |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Test Status            | The test status: `Passed` or `Failed`.                                                                                                                                                                                                                                                                                                                                                                                   |
| Duration               | Length of time for the test to complete.                                                                                                                                                                                                                                                                                                                                                                                 |
| Test Service           | The test service instrumented with CI Visibility.                                                                                                                                                                                                                                                                                                                                                                        |
| Test Name              | The name of the test.                                                                                                                                                                                                                                                                                                                                                                                                    |
| Test Suite             | The name of the service.                                                                                                                                                                                                                                                                                                                                                                                                 |
| Flaky                  | Whether or not a test is a flaky test: `true` or `false`, meaning that the test run has flaked in the commit.<br><br>Either this test run has failed and there was a previous test run for the same test and commit that passed, or this test run passed and there is a previous failure. This attribute is only present the first time a test is detected flaky in a commit.                                            |
| Has Parameters         | Whether or not a test has parameters: `true` or `false`.                                                                                                                                                                                                                                                                                                                                                                 |
| Known Flaky            | Whether or not a test is known to be flaky: `true` or `false`. <br><br>The test run has flaked in the commit (according to the "Flaky" definition) and it was already present on the "Flaky test" table of either the branch of the test run or the default branch of the repository. This means that the test was detected as flaky in the past, and that this failure may not be the result of a change in this commit. |
| Language               | The language of the service.                                                                                                                                                                                                                                                                                                                                                                                             |
| New Flaky              | Whether or not this flaky test has occurred before: `true` or `false`. <br><br>The test run has flaked in the commit (according to the "Flaky" description) and didn’t previously exist in the **Flaky Tests** table for the branch of the test run or default branch of the repository. This also means that the test has been added to the **Flaky Tests** table.                                                      |
| Performance Regression | Whether or not a test is a performance regression: `true` or `false`.                                                                                                                                                                                                                                                                                                                                                |
| Baseline Mean          | The mean duration of the same test in the default branch calculated over the last week of test runs.                                                                                                                                                                                                                                                                                                                     |
| Absolute Change        | The absolute difference between the test duration and the baseline mean.                                                                                                                                                                                                                                                                                                                                                 |
| Relative Change        | The relative difference between the test duration and the baseline mean.                                                                                                                                                                                                                                                                                                                                                 |
| Test Code Owners       | The team name of the service codeowners.                                                                                                                                                                                                                                                                                                                                                                                 |
| Test Fingerprint       | The fingerprint of the test.                                                                                                                                                                                                                                                                                                                                                                                             |
| Test Framework         | The framework of the test.                                                                                                                                                                                                                                                                                                                                                                                               |
| Test Full Name         | The full name of the test.                                                                                                                                                                                                                                                                                                                                                                                               |
| Test Module            | The module of the test.                                                                                                                                                                                                                                                                                                                                                                                                  |
| Test Traits            | The traits of the test such as `category:flaky`.                                                                                                                                                                                                                                                                                                                                                                         |
| Test Type              | The type of the test such as `test`.                                                                                                                                                                                                                                                                                                                                                                                     |

You can filter by test level: session, module, suite, and test run. Each test level represents a different level of aggregation of tests.

{{< img src="ci/ci-test-suite-visibility.png" alt="Test Suite Visibility" style="width:100%;">}}

### Sessions
Test sessions are the highest level of aggregation. They correspond one to one to a test command, such as `yarn test`, `mvn test`, or `dotnet test`.

For JUnit report uploads there is 1 session per report file uploaded.

### Module
The definition of module changes slightly per language:

* In .NET, a test module groups every test that is run under the same [unit test project][104].
* In Swift, a test module groups every test that is run for a given bundle.
* In JavaScript, the test modules map one-to-one to test sessions.
* In Java, a test module groups every test that is run by the same Maven Surefire/Failsafe or Gradle Test task execution.
* In JUnit report uploads, the test modules map one-to-one to test sessions.

An example of a module is `SwiftLintFrameworkTests`, which corresponds to a test target in [`SwiftLint`][105].

### Suite
A test suite is a group of tests exercising the same unit of code.

An example of a test suite is `src/commands/junit/__tests__/upload.test.ts`, which corresponds to a test file in [`datadog-ci`][106].

Test run data is available in [dashboards][102] and [notebooks][103], enabling build engineering teams to customize their communication about high-priority work and CI trends over time.

[101]: https://app.datadoghq.com/ci/test-runs
[102]: https://app.datadoghq.com/dashboard/lists
[103]: https://app.datadoghq.com/notebook/list
[104]: https://learn.microsoft.com/en-us/visualstudio/test/create-a-unit-test-project?view=vs-2022#to-create-a-unit-test-project
[105]: https://github.com/realm/SwiftLint/blob/7738f0c0a5990201ca6556bdb2f13f8e67b5191d/Package.swift#L71
[106]: https://github.com/DataDog/datadog-ci/blob/6de6ea3bbffa57d8576422535061ca35c759feb6/src/commands/junit/__tests__/upload.test.ts

{{% /tab %}}
{{% tab "Pipeline Executions" %}}

Navigate to [**CI** > **Pipeline Executions**][101] to see your CI pipeline execution results across the following levels: **Pipeline**, **Stage**, **Job**, **Step**, and **Command**.

{{< img src="/continuous_integration/pipeline_executions.png" text="CI Pipeline Executions page" style="width:100%" >}}

The **CI** panel on the left lists default facets you can use to search for your tests.

| Facet           | Description                                                   |
|-----------------|---------------------------------------------------------------|
| CI Status       | The pipeline status: `Success` or `Failure`.                  |
| Duration        | Length of time for the pipeline to execute.                   |
| Pipeline ID     | The ID of the pipeline.                                       |
| CI Provider     | The name of the CI provider.                                  |
| Node Labels     | The labels of the node.                                       |
| Node Name       | The name of the node.                                         |
| Partial Retry   | Whether or not a partial retry is enabled: `true` or `false`. |
| Pipeline Number | The number of the pipeline.                                   |
| Pipeline URL    | The URL of the pipeline.                                      |
| Queue time      | Length of time for the pipeline wait for the queue.           |

## Pipeline executions details and traces

You can see aggregated data about pipeline executions over the selected time frame. Use the search field and facets to scope the list down to the executions you want to investigate. Change the list to show pipelines, stages, or jobs using the buttons at the top.

Below are three graphs that visualize the durations of your most active pipelines, your failed pipelines over time, and the executions of your pipelines with an option to toggle to accumulated duration, respectively. These graphs are scoped to the level chosen at the top left (`Pipeline`, `Stage`, `Job`, and more.)

{{< img src="ci/pipeline_explorer_trends.png" alt="Explorer view trend graphs for Duration, Errored, and Executions" style="width:100%;">}}

Each pipeline execution is reported as a trace, which includes stage and job information. Access individual pipeline, stage, and job execution traces by clicking on an execution in the list (similar to clicking into a pipeline execution from the Pipeline Details page).


CI pipeline data is available in [dashboards][102] and [notebooks][103], enabling build engineering teams to customize their communication about high-priority work and CI trends over time.

[101]: https://app.datadoghq.com/ci/pipeline-executions
[102]: https://app.datadoghq.com/dashboard/lists
[103]: https://app.datadoghq.com/notebook/list
[104]: https://app.datadoghq.com/ci/pipeline-executions
[105]: https://app.datadoghq.com/ci/pipeline-executions?viz=timeseries

{{% /tab %}}
{{< /tabs >}}

## Search and filter

You can narrow down, broaden, or shift your focus on a subset of test runs or pipeline executions by clicking on the facets to the left or writing your own custom query in the search bar. When you select and deselect facets, the search bar automatically reflects your changes. Similarly, you can modify the search bar query or write a query from scratch in the search bar to select and deselect the facets on the left.

- To learn how to search for tests and pipelines, see [Search and Manage][1].
- To learn how to create queries, see [Search Syntax][2].

## Analyze

Group your queried test runs or pipeline executions into higher-level entities such as fields, patterns, and transactions in order to derive or consolidate information. By using [facets][3], which you do not need to create to search for attributes, you can accomplish the following actions:

- Search and keep track of the progress of tests running in a CI/CD pipeline.
- Investigate every CI/CD job execution to identify and troubleshoot failing test runs.
- Identify flaky tests to fix.

## Visualize

Select a visualization type to visualize the outcomes of your filters and aggregations and better understand your test runs or pipeline executions. For example, you can view your test results in a list to organize your test data into columns, or in a timeseries graph to measure your pipeline data over time.

## Export

Export your view in the CI Visibility Explorer to reuse it later or in different contexts.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/search
[2]: /continuous_integration/explorer/search_syntax
[3]: /continuous_integration/explorer/facets
