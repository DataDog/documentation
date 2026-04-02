---
title: Test Health
description: "Measure the impact of flaky tests and how Test Optimization improves CI usage."
further_reading:
- link: "tests/flaky_test_management"
  tag: "Documentation"
  text: "Learn about managing flaky tests"
- link: "tests/flaky_test_management/auto_test_retries"
  tag: "Documentation"
  text: "Learn about Auto Test Retries"
- link: "tests/test_impact_analysis"
  tag: "Documentation"
  text: "Learn about Test Impact Analysis"
- link: "tests/flaky_test_management/early_flake_detection"
  tag: "Documentation"
  text: "Learn about Early Flake Detection"
- link: "pr_gates"
  tag: "Documentation"
  text: "Learn about PR Gates"
---

## Overview

The [Test Health][5] dashboard provides analytics to help teams manage and optimize their testing in CI. This includes sections showing the current impact of test flakiness and how Test Optimization is mitigating these problems. 

The dashboard also provides [Test Health recommendations](#test-health-recommendations) to suggest specific Datadog features and strategies you can enable to reduce flaky test failures and recover CI time.

If you have [CI Visibility][7] enabled in your repositories, the data shown in the Test Health dashboard is correlated with your CI Visibility data. This provides enhanced insights into the relationship between test performance and overall CI health.

{{< img src="tests/test-health-2.png" alt="Test Health dashboard" style="width:100%;" >}}

## Summary metrics

Based on the current time frame and filters applied, the dashboard highlights the following key metrics:

- [**Pipelines Failed**](#pipelines-failed): Sum total of pipelines that failed due to flaky tests
- [**Time Wasted in CI**](#time-wasted-in-ci): Total time spent in CI due to flaky tests
- [**Pipelines Saved**](#pipelines-saved): How many pipelines were prevented from failing by Auto Test Retries
- [**Time Saved in CI**](#time-saved-in-ci): How much time has been saved by Test Impact Analysis and Auto Test Retries

### Pipelines Failed

This table provides details on pipeline executions, failures, and their impact on developer experience. 

| Metric | Description |
|--------|-------------|
| **Pipeline Executions with Tests**    | Number of pipeline executions with one or more test sessions. |
| **Failures Due to Flaky Tests**       | Number of pipeline executions that failed solely due to flaky tests. All tests that failed have one or more of the following tags: `@test.is_known_flaky` or `@test.is_new_flaky`. |
| **Failures Due to Non-Flaky Tests**   | Number of pipeline executions that failed due to tests without any flakiness. None of the failing tests have any of the following tags: `@test.is_known_flaky`, `@test.is_new_flaky`, and `@test.is_flaky`. |
| **Dev Experience - Test Failure Breakdown** | Ratio of flaky to non-flaky test failures. When pipelines fail due to tests, how often is it a flaky test? A higher ratio of flaky test failures erodes trust in test results. Developers may stop paying attention to failing tests, assume they're flakes, and manually retry. |

**Note**: If [CI Visibility][7] is enabled, a failed test is only counted in these metrics if the job where the test was executed failed (not the entire pipeline).

### Time Wasted in CI

This table provides details on testing time, time lost due to failures, and the impact on developer experience.

| Metric | Description |
|--------|-------------|
| **Total Testing Time**               | Sum of the duration of all test sessions. |
| **Time Lost Due to Flaky Tests**     | Total duration of test sessions that failed solely due to flaky tests. All tests that failed have one or more of the following tags: `@test.is_known_flaky`, `@test.is_new_flaky`, or `@test.is_flaky`. |
| **Time Lost Due to Non-Flaky Tests** | Total duration of test sessions that failed due to tests without any flakiness. All tests that failed do not have any of the following tags: `@test.is_known_flaky`, `@test.is_new_flaky`, and `@test.is_flaky`. |
| **Dev Experience - Time Lost Breakdown** | Ratio of time lost due to flaky vs. non-flaky test failures. When you lose time due to tests, how much is due to flaky tests? A higher ratio of time lost to flaky test failures leads to developer frustration. |

**Note**: If [CI Visibility][7] is enabled, the duration is based on the job's duration, not the test session's duration. Also, only jobs with test sessions are considered for the metrics.

### Pipelines Saved

This table shows how many pipelines [Auto Test Retries][1] have prevented from failing. 

<div class="alert alert-info">These metrics include test sessions in which a flaky test failed, and then was automatically retried and passed. Newer versions of test libraries provide more accurate results, as they include more precise telemetry regarding test retries.</div>

| Metric | Description |
|--------|-------------|
| **Pipeline Executions with Tests** | Number of pipeline executions with one or more test sessions. |
| **Saved by Auto Test Retries**     | Number of CI pipelines with passed test sessions containing tests with `@test.is_retry:true` and `@test.is_new:false`. |

**Note**: If [CI Visibility][7] is enabled, a passing test is only counted in these metrics if the job where the test was executed passed (not the entire pipeline).

### Time Saved in CI

This table shows how much CI usage time [Test Impact Analysis][4] and [Auto Test Retries][1] have saved.

| Metric | Description |
|--------|-------------|
| **Total Testing Time**            | Sum of the duration of all test sessions. |
| **Total Time Saved**              | Sum of time saved by Test Impact Analysis and Auto Test Retries. **% of Testing Time** is the percentage of time saved out of total testing time. Total time saved can exceed total testing time if you prevent a lot of unnecessary pipeline and job retries. |
| **Saved by Test Impact Analysis** | Total duration indicated by `@test_session.itr.time_saved`. |
| **Saved by Auto Test Retries**    | Total duration of passed test sessions in which some tests initially failed but later passed due to Auto Test Retries. These tests are tagged with `@test.is_retry:true` and `@test.is_new:false`. |

**Note**: If [CI Visibility][7] is enabled, the duration is based on the job's duration, not the test session's duration. Also, only passing jobs with test sessions are considered for the metrics.

## Use cases

### Enhance developer experience
Use **Dev Experience - Test Failure Breakdown** and **Dev Experience - Time Lost Breakdown** to identify how often flaky tests in particular cause failures and waste CI time. 

These Test Optimization features improve developer experience by reducing test failures and wasted time:
- **[Auto Test Retries][1]** reduces the likelihood a flaky test causes a pipeline to fail. This includes your known flaky tests and flaky tests that have yet to be identified. This also provides developers with confidence in test results when a test is actually broken, as it will have failed all retries.
- **[Early Flake Detection][2]**, combined with **[Quality Gates][3]**, prevents new tests that are flaky from entering your default branch.
- **[Test Impact Analysis][4]** minimizes the flaky tests that run, by only running relevant tests based on code coverage. Skipping irrelevant tests also shortens the feedback loop for developers. 

### Maximize pipeline efficiency and reduce costs
Lengthy test suites slow down feedback loops to developers, and running irrelevant tests incurs unnecessary costs. 

These Test Optimization features help you save CI time and costs:
- **[Auto Test Retries][1]**: If a single flaky test fails during your session, the entire duration of the CI job is lost. Auto Test Retries allow flaky tests to rerun, increasing the likelihood of passing.
- **[Test Impact Analysis][4]**: By running only tests relevant to your code changes, you reduce the overall duration of the test session. This also prevents pipelines from failing due to unrelated flaky tests if you skip them.

## Test Health recommendations

The Test Health dashboard provides data-driven, repository-specific suggestions for improving the reliability and efficiency of your testing. Select a repository with a light bulb icon to view recommended features, and use the toggles to turn on features directly from the dashboard.

{{< img src="tests/test-health-recommendations.png" alt="Recommendations side panel opened on the Test Health dashboard" style="width:100%;" >}}

Each recommendation estimates how much you can reduce test failures and CI time by enabling a specific Test Optimization feature. Recommendations may include the following:

- **[Auto Test Retries][1]**: Retry failing tests to avoid failing your build due to flaky tests.
- **[Test Impact Analysis][4]**: Automatically select and run only the relevant tests for a given commit based on the code being changed.

The dashboard only recommends features that are available in a given repository, based on [supported][6] programming languages and test frameworks.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/flaky_test_management/auto_test_retries/
[2]: /tests/flaky_test_management/early_flake_detection/
[3]: /pr_gates/
[4]: /tests/test_impact_analysis/
[5]: https://app.datadoghq.com/ci/test/health
[6]: /tests/#supported-features
[7]: /continuous_integration/
