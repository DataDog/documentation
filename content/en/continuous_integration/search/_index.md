---
title: Search and Manage CI Pipelines and Tests 
description: Learn how to search for your CI pipelines and tests.
aliases:
- /continuous_integration/guides/find_flaky_tests/
algolia:
   rank: 70
   tags: ['flaky test', 'flaky tests', 'test regression', 'test regressions', 'test service', 'test services']
further_reading:
- link: "/continuous_integration/explorer"
  tag: "Documentation"
  text: "Search and filter test runs or pipeline executions"
- link: "/continuous_integration/guides/flaky_test_management"
  tag: "Documentation"
  text: "Learn how to manage flaky tests"
---

## Overview

{{< tabs >}}
{{% tab "Pipelines" %}}

The [Pipelines page][101] is useful for developers who want to keep an eye on the build pipeline for their service.

{{< img src="/continuous_integration/pipelines.png" text="CI Pipelines page" style="width:100%" >}}

This page answers the following questions:

- Is the pipeline for your service performant and reliable, especially on the default branch?
- If not, what's the root cause?

You can access high-level accumulation and trends, including:

- An overview of the health of the whole build system, with aggregated stats for pipeline runs and branches.
- A window to quickly spotting and fixing immediate, urgent issues like broken pipelines to production.
- How each pipeline has run, over time, and with what results and trends.
- The breakdown of where time is spent in each build stage, over time, so you can focus your improvement efforts where it makes the biggest difference.

## Search for pipelines

To see your pipelines, navigate to [**CI** > **Pipelines**][101].

The [Pipelines page][101] shows aggregate stats for the default branch of each pipeline over the selected time frame, as well as the status of the latest pipeline execution. Use this page to see all your pipelines and get a quick view of their health. Only pipelines with Git information associated to the default branch (usually named `main` or `prod`), as well as pipelines without any Git information, are displayed on this page.

The metrics shown include build frequency, failure rate, median duration, and change in median duration on both an absolute and relative basis. This information reveals which pipelines are high-usage and potentially high-resource consumers, or are experiencing regressions. The last build result, duration, and last runtime shows you the effect of the last commit.

You can filter the page by pipeline name to see the pipelines you're most concerned with. Click on a pipeline that is slow or failing to dig into details that show what commit might have introduced the performance regression or build error. If you are using [Datadog Teams][106], you can filter for specific pipelines associated to your team using [custom tags][107] that match team handles.

## Pipeline details and executions

Click into a specific pipeline to see the _Pipeline Details_ page which provides views of the data for the pipeline you selected over a specified time frame.

{{< img src="ci/pipeline_branch_overview_updated.png" alt="Pipeline Details page for a single pipeline" style="width:100%;">}}

Get insights on the selected pipeline such as total and failed executions over time, build duration percentiles, error rates, and total time spent breakdown by stage. There are also summary tables for stages and jobs so you can quickly sort them in terms of duration, percentage of overall execution time, or failure rate.

The pipeline execution list shows all the times that pipeline (or its stages or jobs) ran during the selected time frame, for the selected branch. Use the facets on the left side to filter the list to exactly the pipelines, stages, or jobs you want to see.

### Explore connections to services, resources, and network events

Click one of the executions to open the pipeline execution view and see the flame graph or span list for the pipeline and its stages. The _Executions (n)_ list on the left side gives you quick access to the data for each retry of the pipeline for the same commit.

Click the CI provider link (`gitlab-ci gitlab.pipeline > documentation` in the following image) to investigate the Resource, Service, or Analytics page for the pipeline, stage, or job specifically. You can also find complete tags information and links to network monitoring events.

{{< img src="ci/ci-pipeline-execution.png" alt="Pipeline execution view with trace info and flamegraph display" style="width:100%;">}}

### Explore connections to logs

If job log collection is supported and enabled for the CI provider, related log events can be found in the _Logs_ tab of the pipeline execution view.

Job log collection is supported for the following providers:

- [GitHub Actions][103]
- [GitLab][104]
- [Jenkins][105]

#### AI-generated log summaries

{{% site-region region="us,us3,us5,eu,ap1" %}}

This feature is in private beta. To request access, fill out [this form][108].
{{% /site-region %}}
{{% site-region region="gov" %}}

AI-generated log summaries are not available for the {{< region-param key="dd_site_name" >}} site.
{{% /site-region %}}

Pipeline Visibility provides AI-generated explanations for pipeline errors based on your CI job logs. These explanations can be found on the **Failed Jobs** tab for each pipeline execution. You can use these summaries to determine whether an error in CI is associated with developer-written code or the CI pipeline itself, as well as troubleshoot execution failures.

[101]: https://app.datadoghq.com/ci/pipelines
[103]: /continuous_integration/pipelines/github/#enable-log-collection
[104]: /continuous_integration/pipelines/gitlab/#enable-job-log-collection-beta
[105]: /continuous_integration/pipelines/jenkins#enable-job-log-collection
[106]: /account_management/teams/ 
[107]: /continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux
[108]: https://docs.google.com/forms/d/e/1FAIpQLSfBuPfdyhgqjjduDYpOM5twJdkdDnTTxJdCCWonauaBxWTCnQ/viewform

{{% /tab %}}
{{% tab "Tests" %}}

The [Tests page][101] is useful for developers who want to keep an eye on their test results. 

{{< img src="/continuous_integration/tests.png" text="CI Tests page" style="width:100%" >}}

You can access low-level and immediate insights:

- See what tests are failing and why.
- See your last commit's test results.
- View the wall time of your tests in your feature branch and compare it to the default branch, to identify if you're about to introduce a performance regression.
- Find out if your commit introduces a new [flaky test][105] that wasn't flaky before, indicating that your code change is what's making it flaky. This gives you the opportunity to fix the problem before proceeding rather than contributing to the number of flaky tests in your CI.

You can also access high-level accumulation and trends:

- See the effects that changed code, added tests, and increased complexity have on your test suite performance over time.
- See which tests have become slower over time and identify the commit that introduced the regression.
- Take advantage of Datadog's automatic test flakiness detection and tracking, which shows you which tests are becoming more or less unreliable over time.

## Search for tests

To see your tests, navigate to [**CI** > **Tests**][101] and select between the [**Branches**](#branches-view) or [**Default Branches** view](#default-branches-view).

### Branches view

The [Branches][102] view of the Tests page lists all branches from all [test services][103] that have reported test results. This tab is useful for individual developers to quickly see the status of tests that run on their code branches and troubleshoot test failures.

In this page, you can filter the list by name, test service, or commit SHA, or to show only your branches (branches that contain at least one commit authored by you), enable the **My branches** toggle and add the email addresses you use in your Git configuration.

#### Test results

For each branch, you can see the test service, the number of failed, passed, and skipped tests, test regressions, wall time, the percentage of change compared to the default branch, when the commit was last updated, and the avatar of the author of the commit.

Click on a branch to explore the test details page, which includes information about the branch's latest commits, flaky tests, test performance, common error types, and all test runs.

{{< img src="continuous_integration/test_details.png" alt="Test Details page for a single branch" style="width:100%;">}}

#### Test suite performance

There is also information about the [wall time][104] of the most recent test suite run, and a comparison to the average wall time of the default branch. The comparison of your branch's wall time to the default branch's wall time can help you determine if your commit is introducing performance [regressions][106] to your test suite.

Hovering over the commit author avatar shows detailed information about the latest commit.

#### Test regressions

Test regressions are evaluated per commit in an effort to tie performance regressions to specific code changes.

#### Investigate for more details

Click on the row to see test suite run details such as test results for the last commit on this branch (or you can switch branches), failing tests and the most common errors, slow tests, flaky tests, and a complete list of test runs over the time frame selected. You can filter this list of test runs by facet to get to the information you want to see most.

Click into one of the test runs to see the test trace as a flame graph or a span list. The _Runs (n)_ list on the left lets you quickly access traces for each retry of the test for the same commit.

#### Explore connections to services, resources, logs, and network events

Click the CI provider link to examine the Resource, Service, or Analytics page for the test. You can also find complete tags information and links to related log events and network monitoring events.

### Default Branches view

The [Default Branches][107] view of the Tests page shows aggregated health metrics for the _default_ branch of each test service. This view is useful for teams to understand the overall health of the service over time.

The Default Branches view shows similar information to the Branches view, but applied to the default branch. It compares the current wall time with the average default branch wall time to give you an indication of how your test suite performance is trending over time.

[101]: https://app.datadoghq.com/ci/test-services
[102]: https://app.datadoghq.com/ci/test-services?view=branches
[103]: /glossary/#test-service
[104]: /glossary/#wall-time
[105]: /glossary/#flaky-test
[106]: /glossary/#test-regression
[107]: https://app.datadoghq.com/ci/test-services?view=default-branches

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
