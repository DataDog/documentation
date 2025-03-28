---
title: Test Health
description: Understanding and Quantifying the impact of your tests
further_reading:
- link: "/continuous_integration/tests/"
  tag: "Documentation"
  text: "Learn about Test Optimization"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Test Optimization is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Effective test optimization involves not only identifying flaky tests but also providing insights that help Developer Experience teams (such as DevOps or Platform teams) clearly demonstrate value and manage their CI pipelines and test sessions more efficiently. The impact of failing jobs extends across multiple dimensions, including increased infrastructure costs from rerunning test jobs, decreased deployment frequency, and lost developer focus time.

Test Health provides insights at the repository and test service levels, focusing on pipelines that failed due to flaky tests, time wasted in CI due to flaky tests, pipelines prevented from failing by Test Optimization, and time saved in CI thanks to the Test Optimization product.

## Key Metrics

### Pipelines Failed
- **Failures due to non-flaky tests**: Count of CI pipelines with failed test sessions containing non-flaky test failures.
- **Failures due to flaky tests**: Count of CI pipelines with failed test sessions where all test failures are flaky (`@test.is_known_flaky` or `@test.is_new_flaky`).
- **Percentage of failures due to flaky tests**: `(Flaky Failures / Total Failures)`.

### Time Wasted in CI
- **Lost duration due to failed tests**: Total duration of failed test sessions containing test failures.
- **Lost duration due to flaky tests**: Total duration of failed test sessions where all test failures are flaky (`@test.is_known_flaky` or `@test.is_new_flaky`).

### Pipelines Saved

- **Number of pipelines saved due to auto-retries**: Number of CI pipelines with passed test sessions containing tests with `@test.is_retry:true` and `@test.is_new:false`.
- **Percentage of pipelines saved due to auto-retries**: `(Number of CI pipelines saved due to auto-retries / Total number of CI pipelines with tests)`.

### Time Saved in CI
- **Saved time due to auto-retries**: Total duration of passed test sessions in which some tests initially failed but later passed due to the [Auto Test Retry][1] feature. These tests are tagged with `@test.is_retry:true` and `@test.is_new:false`.
- **Saved time due to Test Impact Analysis**: Total duration indicated by `@test_session.itr.time_saved`.

## Common Use Cases

Platform and DevOps teams conduct thorough evaluations within strict budgets. Their decision-making criteria heavily focus on measurable value relative to costs. During evaluations or Proof of Concepts (POCs), it's critical for these teams to quickly demonstrate the quantifiable impact of flaky tests and improvements in overall test reliability.

Test Health provides these teams with metrics and insights necessary to quantify the potential impact of Test Optimization in their repositories.

### Reduce Team Frustration from Unreliable Test Pipelines
We quantify the **Developer Experience** by comparing the number of failures caused by legitimate regressions versus failures due to unreliable tests. The **Pipelines Failed** section provides insights to evaluate the criticality of flaky tests (percentage of testing time due to flaky tests).

Test Optimization provides features to alleviate these issues:
- **[Auto Test Retries][1]** reduce the risk of flaky tests ruining entire test sessions.
- **[Early Flake Detection][2]**, combined with **[Quality Gates][3]**, prevents flaky tests from entering your main branches.
- **[Test Impact Analysis][4]** minimizes impact by running only relevant tests based on code coverage.

### Reduce Lost Time in Your Pipelines
In most cases, tests serve as gating checks for pipelines (if a test fails, the pipeline fails and becomes blocked). **Test Health** provides insights to understand the impact of failing tests in your Continuous Integration provider.

Test Optimization provides features to alleviate these issues:
- **[Auto Test Retries][1]**: If a single flaky test fails during your session, the entire duration of the CI job is lost. Auto Test Retries allow flaky tests to be easily rerun, increasing the likelihood of passing.
- **[Test Impact Analysis][4]**: By running only tests relevant to your code changes, you reduce the overall duration of the test session.


[1]: /tests/flaky_test_management/auto_test_retries/
[2]: /tests/flaky_test_management/early_flake_detection/
[3]: /quality_gates/
[4]: /tests/test_impact_analysis/