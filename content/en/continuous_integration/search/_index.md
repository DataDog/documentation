---
title: Search and Manage CI Tests and Pipelines 
description: Learn how to search for your CI tests and pipelines.
aliases:
- /continuous_integration/guides/find_flaky_tests/
- /continuous_integration/guides/flaky_test_management/
further_reading:
- link: "/continuous_integration/explorer"
  tag: "Documentation"
  text: "Search and filter test runs or pipeline executions"
---

## Overview

{{< tabs >}}
{{% tab "Tests" %}}

The [Tests page][101] is useful for developers who want to keep an eye on their test results. 

{{< img src="/continuous_integration/tests.png" text="CI Tests page" style="width:100%" >}}

You can access low-level and immediate insights:

- See what tests are failing and why.
- See your last commit's test results.
- View the wall time of your tests in your feature branch and compare it to the default branch, to identify if you're about to introduce a performance regression.
- Find out if your commit introduces a new flaky test that wasn't flaky before, indicating that your code change is what's making it flaky. This gives you the opportunity to fix the problem before proceeding rather than contributing to the number of flaky tests in your CI.

You can also access high-level accumulation and trends:

- See the effects that changed code, added tests, and increased complexity have on your test suite performance over time.
- See which tests have become slower over time and identify the commit that introduced the regression.
- Take advantage of Datadog's automatic test flakiness detection and tracking, which shows you which tests are becoming more or less unreliable over time.

[101]: https://app.datadoghq.com/ci/test-services

{{% /tab %}}
{{% tab "Pipelines" %}}

The [Pipelines page][101] is useful for developers who want to keep an eye on the build pipeline for their service.

{{< img src="/continuous_integration/pipelines.png" text="CI Pipelines page" style="width:100%" >}}

This page answers the following questions:

- Is the pipeline for your service succeeding, especially on the default branch?
- If not, what's the root cause?

You can access high-level accumulation and trends, including:

- An overview of the health of the whole build system, with aggregated stats for pipeline runs and branches.
- A window to quickly spotting and fixing immediate, urgent issues like broken pipelines to production.
- How each pipeline has run, over time, and with what results and trends.
- The breakdown of where time is spent in each build stage, over time, so you can focus your improvement efforts where it makes the biggest difference.

[101]: https://app.datadoghq.com/ci/pipelines

{{% /tab %}}
{{< /tabs >}}

## Search for tests

To see your tests, navigate to [**CI** > **Tests**][8] and select between the [**Branches**](#branches-view) or [**Default Branches** view](#default-branches-view).

### Branches view

The [Branches][2] view of the Tests page lists all branches from all Test Services that have reported test results. This tab is useful for individual developers to quickly see the status of tests that run on their code branches and troubleshoot test failures.

In this page, you can filter the list by name, test service, or commit SHA, or to show only your branches (branches that contain at least one commit authored by you), enable the **My branches** toggle and add the email addresses you use in your Git configuration.

#### Test results

For each branch, you can see the test service, the number of failed, passed, and skipped tests, test regressions, wall time, the percentage of change compared to the default branch, when the commit was last updated, and the avatar of the author of the commit.

Click on a branch to explore the test details page, which includes information about the branch's latest commits, flaky tests, test performance, common error types, and all test runs.

{{< img src="continuous_integration/test_details.png" alt="Test Details page for a single branch" style="width:100%;">}}

#### Test suite performance

There is also information about the wall time of the most recent test suite run, and a comparison to the average wall time of the default branch. _Wall time_ is the real time elapsed while the test suite runs, which is less than the sum of all test times when tests are run concurrently. The comparison of your branch's wall time to the default branch's wall time can help you determine if your commit is introducing performance regressions to your test suite.

Hovering over the commit author avatar shows detailed information about the latest commit.

#### Test regressions

A test run is marked as a regression when its duration is both five times the mean and greater than the max duration for the same test in the default branch.

A benchmark test run is marked as a regression when its duration is five times the standard deviation above the mean for the same test in the default branch. A benchmark test has `@test.type:benchmark`.

The mean and the max of the default branch is calculated over the last week of test runs.

Test regressions are evaluated per commit in an effort to tie performance regressions to specific code changes.

#### Investigate for more details

Click on the row to see test suite run details such as test results for the last commit on this branch (or you can switch branches), failing tests and the most common errors, slow tests, flaky tests, and a complete list of test runs over the time frame selected. You can filter this list of test runs by facet to get to the information you want to see most.

Click into one of the test runs to see the test trace as a flame graph or a span list. The _Runs (n)_ list on the left lets you quickly access traces for each retry of the test for the same commit.

#### Explore connections to services, resources, logs, and network events

Click the CI provider link to examine the Resource, Service, or Analytics page for the test. You can also find complete tags information and links to related log events and network monitoring events.

### Default Branches view

A _test service_ is a group of tests associated with, for example, a project or repo. It contains all the individual tests for your code, optionally organized into _test suites_ (which are like folders for your tests). The [Default Branches][3] view of the Tests page shows aggregated health metrics for the _default_ branch of each test service. This view is useful for teams to understand the overall health of the service over time.

The Default Branches view shows similar information to the Branches view, but applied to the default branch. It compares the current wall time with the average default branch wall time to give you an indication of how your test suite performance is trending over time.

### New flaky tests

For each branch, the list shows the number of new flaky tests introduced by the commit, the number of flaky commits, a comparison of the current wall time with the average default branch wall time, and the branch's latest commit details. 

A *flaky test* is a test that exhibit both a passing and failing status across multiple test runs for the same commit. If you commit some code and run it through CI, and a test fails, and you run it through CI again and the test passes, that test is unreliable as proof of quality code.

Flaky tests introduce risk and unpredictability into your CI system and end product. When people have to remember which tests are flaky, they lose trust in their test results, and a tremendous amount of time and resources are wasted on pipeline retries.

Use the following information to help prioritize flaky tests:

* **Average duration**: The average time the test takes to run.
* **First flaked** and **Last flaked**: The date and commit SHAs for when the test first and most recently exhibited flaky behavior.
* **Commits flaked**: The number of commits in which the test exhibited flaky behavior.
* **Failure rate**: The percentage of test runs that have failed for this test since it first flaked.
* **Trend**: A visualization that indicates whether a flaky test was fixed or it is still actively flaking.

Once you identify a flaky test you want to fix, click on the test to see links to view the most recent failed test run or the first flaky test run.

{{< img src="continuous_integration/flaky_test_options.png" alt="Advanced options for flaky tests" style="width:100%;">}}

If a flaky test has not failed in the past 30 days, it is automatically removed from the table. You can also manually remove a flaky test by clicking on the trash icon that appears when you hover over the test row. It is added again if it re-exhibits flaky behavior.

New flaky tests are tests that exhibit flaky behavior and didn't previously exist in the Flaky Tests table for the current branch or default branch of the repository.

<div class="alert alert-info">The table is limited to the 1000 flaky tests with the highest number of commits flaked for the selected time frame.</div>

### Test Runs page

1. Navigate to the [Test Runs][1] page.
2. In the facets list on the left sidebar, expand the **New Flaky** facet in the **Test** section, and check `true`.
All test runs that exhibited flakey behavior for the first time as per the definition above are displayed.

### Branches page

1. On the [Tests][2] page, select the **Branches** view.
2. Filter the table to see branches, services, or commits of interest to you.
3. Look at the **New Flaky** column to see the number of new flaky tests introduced by the latest commit as per the definition above.

#### Ignore new flaky tests detected by mistake

You can ignore new flaky tests for a particular commit if you determine that those flaky tests were detected by mistake. The tests reappear if the commit exhibits flakiness again.

Click on the **New Flaky** number and then click **Ignore flaky tests**.

{{< img src="ci/ignore-new-flaky-tests.png" alt="Ignore all new flaky tests for a commit" style="width:100%;">}}

### Known flaky failed tests

Known flaky failed tests are tests that have flaky behavior on the current or default branch of the repository.

### Test Runs page

1. Navigate to the [Test Runs][1] page.
2. In the facets list on the left sidebar, expand the **Known Flaky** facet in the **Test** section, and check `true`.
Failed test runs that were known to be flaky as per the definition above are displayed.

### Branches page

1. On the [Tests][2] page, select the **Branches** view.
2. Filter the table to see any branches, services, or commits of interest.
3. The **Failed** column contains the number of failed tests and known flaky failed tests in the latest commit.

{{< img src="ci/known-flaky-failed-tests.png" alt="CI Tests Branches view with a branch selected and a text box in the Failed column displaying 1 tests failed and 1 known flaky" style="width:100%;">}}


## Search for pipelines

To see your pipelines, navigate to [**CI** > **Pipelines**][7].

The [Pipelines page][7] shows aggregate stats for the default branch of each pipeline over the selected time frame, as well as the status of the latest pipeline execution. Use this page to see all your pipelines and get a quick view of their health. The Pipelines page shows metrics for the _default_ branch, usually named something like `main` or `prod`.

Metrics shown include build frequency, failure rate, average duration, and 95th percentile duration. This information reveals which pipelines are high-usage and potentially high resource consumers. The last build result, duration, and last runtime show you the effect of the last commit.

You can filter the page by pipeline name to see the pipelines you're most concerned with. Click on a pipeline that is slow or failing to dig into details that show what commit might have introduced the performance regression or build error.

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

- [GitHub Actions][4]
- [GitLab][5]
- [Jenkins][6]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/ci/test-services?view=branches
[3]: https://app.datadoghq.com/ci/test-services?view=default-branches
[4]: /continuous_integration/pipelines/github/#enable-log-collection
[5]: /continuous_integration/pipelines/gitlab/#enable-job-log-collection-beta
[6]: /continuous_integration/pipelines/jenkins#enable-job-log-collection
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/test-services
