---
title: Test Health
description: "Measure the impact of flaky tests and Test Optimization."
---

## Overview

The Test Health dashboard provides analytics to help teams manage and optimize their testing in CI. This includes sections showing the current impact of test flakiness and how Test Optimization is mitigating these problems.

## Summary metrics
Based on the current time frame and filter(s) applied, you can see the sum total of pipelines that failed due to flaky tests, the total time wasted in CI due to flaky tests, as well as how many pipelines were prevented from failing by Auto Test Retries, and how much time has been saved by Test Impact Analysis and Auto Test Retries.

### Pipelines Failed table
- **Pipeline Executions with Tests**: Number of pipeline executions with at least one or more test sessions.
- **Failures Due to Flaky Tests**: Number of pipeline executions that failed solely due to flaky tests. All tests that failed have one or more of the following tags: `@test.is_known_flaky` or `@test.is_new_flaky`.
- **Failures Due to Non-Flaky Tests**: Number of pipeline executions that failed due to tests without any flakiness. All tests that failed do not have any of the following tags: @test.is_known_flaky, @test.is_new_flaky, and @test.is_flaky.
- **Dev Experience - Test Failure Breakdown**: Ratio of Flaky Test Failures vs Non-Flaky Test Failures. When pipelines fail due to tests, how often is it a flaky test? A higher ratio of flaky test failures will lead to an erosion of trust in test results. Eventually, developers will stop paying attention to failing tests, assume they’re flakes, and hit retry.

### Time Wasted in CI
- **Total Testing Time**: Sum of the duration of all test sessions.
- **Time Lost Due to Flaky Tests**: Total duration of test sessions that failed solely due to flaky tests. All tests that failed have one or more of the following tags: `@test.is_known_flaky`, `@test.is_new_flaky`, or @test.is_flaky.
- **Time Lost Due to Non-Flaky Tests**: Total duration of test sessions that failed due to tests without any flakiness. All tests that failed do not have any of the following tags: @test.is_known_flaky, @test.is_new_flaky, and @test.is_flaky.
- **Dev Experience - Time Lost Breakdown**: Ratio of time lost due to Flaky Test Failures vs Non-Flaky Test Failures. When you lose time due to tests, how much is due to flaky tests? A higher ratio of time lost to flaky test failures will lead to developer frustration due to a slower feedback loop and a sense that development velocity is being bogged down by flaky tests.

### Pipelines Saved
- **Pipeline Executions with Tests**: Number of pipeline executions with at least one or more test sessions.
- **Saved by Auto Test Retries**: Number of CI pipelines with passed test sessions containing tests with `@test.is_retry:true` and `@test.is_new:false`.

### Time Saved in CI
- **Total Testing Time**: Sum of the duration of all test sessions.
- **Total Time Saved**: Sum of time saved by Test Impact Analysis and Auto Test Retries. % of Testing Time is calculated by (Total Time Saved / Total Testing Time). Total time saved can exceed total testing time through preventing unnecessary pipeline/job retries.
- **Saved by Test Impact Analysis**: Total duration indicated by `@test_session.itr.time_saved`.
- **Saved by Auto Test Retries**: Total duration of passed test sessions in which some tests initially failed but later passed due to the [Auto Test Retry][1] feature. These tests are tagged with `@test.is_retry:true` and `@test.is_new:false`.

## Use cases

### Enhance developer experience
By looking at **Dev Experience - Test Failure Breakdown** and **Dev Experience - Time Lost Breakdown**, you can identify how often flaky tests in particular are causing failures and wasting CI time. 

Test Optimization provides features to alleviate these issues:
- **[Auto Test Retries][1]** reduces the likelihood a flaky test will cause your pipeline to fail. This includes your known flaky tests and flaky tests that have yet to be identified. This also provides your developers with confidence in test results when a test is actually broken, as it will have failed all retries.
- **[Early Flake Detection][2]**, combined with **[Quality Gates][3]**, prevents new tests that are flaky from entering your default branch.
- **[Test Impact Analysis][4]** minimizes the flaky tests that run, by only running relevant tests based on code coverage. Skipping irrelevant tests also shortens the feedback loop for developers. 

### Maximize pipeline efficiency and reduce costs
Lengthy test suites slow down feedback loops to developers and running irrelevant tests incurs unnecessary costs. 

Test Optimization provides features to alleviate these issues:
- **[Auto Test Retries][1]**: If a single flaky test fails during your session, the entire duration of the CI job is lost. Auto Test Retries allow flaky tests to be easily rerun, increasing the likelihood of passing.
- **[Test Impact Analysis][4]**: By running only tests relevant to your code changes, you reduce the overall duration of the test session. You also prevent your pipelines from failing due to unrelated flaky tests if you skip them.


[1]: /tests/flaky_test_management/auto_test_retries/
[2]: /tests/flaky_test_management/early_flake_detection/
[3]: /quality_gates/
[4]: /tests/test_impact_analysis/
