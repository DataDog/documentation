---
title: Setup a New Flaky Test PR Gate

description: Learn how to setup a New Flaky Test PR Gate
further_reading:
- link: "/tests"
  tag: "Documentation"
  text: "Learn about Test Optimization"
---

## Overview

This guide walks you through setting up a [New Flaky Test PR Gate][3]. 

Before you begin, make sure that [Test Optimization][1] is already set up for your language. Additionally, it is recommended that [Early Flake Detection][4] is enabled for better flakiness detection.

### What is a Flaky Test 

A [flaky tests][2] is a test that exhibits both a passing and failing status across multiple test runs for the same commit. 

Flaky tests introduce risk and unpredictability into your CI system and end product. When people have to remember which tests are flaky, they lose trust in their test results, and a tremendous amount of time and resources are wasted on pipeline retries.

A [New Flaky Test PR Gate][3] prevents newly introduced flakiness from reaching the default branch.

## How New Flaky Test PR Gate works

New Flaky Test PR Gate is a type of [PR Gate][5] that prevents a Pull Request from being merged if at least one new flaky test is detected in the feature branch.

### What is a New Flaky Test? 

A test that:

- has been added in the PR's branch, that is, it has never run in any other branch.
- has shown flakiness for the first time, that is, we have no record of that test ever flaking before.

## How to set up a New Flaky Test PR Gate

1. Go to [Create Rule][6] and select **New Flaky Tests**:

{{< img src="pr_gates/setup/flaky_tests.png" alt="A PR Gate rule that fails when a pull request introduces at least one new flaky test" style="width:100%" >}}

2. Select the repositories this rule must be evaluated on. By default it is evaluated on all repositories in your organization.

3. Optionally enable [Early Flake Detection][4]. Early Flake Detection automatically retries newly added tests, which improves the likelihood that new flakiness is detected automatically. **Important note**: Early Flake Detection is only supported when using the native libraries, not JUnit XML upload. See [supported features][7] for more information.

After the PR gate is created, a new status check shows up in Pull Requests from the selected repositories:

{{< img src="pr_gates/setup/pr_gate_preview.png" alt="Preview from new flaky test PR gate" style="width:100%" >}}

## What it looks like in Pull Requests

If a new flaky test is detected, this is what the failed GitHub check looks like in the PR:

{{< img src="pr_gates/setup/failed_pr_gate.png" alt="The new flaky PR gate fails because a new flaky test is detected" style="width:100%" >}}

If [PR comments][8] are enabled, the list of new flaky tests shows up together with their error messages:

{{< img src="pr_gates/setup/new_flaky_test_pr_comment.png" alt="PR comment showing the new flaky test" style="width:100%" >}}

Click on the failed GitHub Check to go to the PR gate detail view:

{{< img src="pr_gates/setup/pr_gate_detail.png" alt="PR gate detail" style="width:100%" >}}

## How to turn the PR gate green

## How to unblock

## Native library vs JUnit XML

## Troubleshooting 



[1]: /tests/
[2]: /tests/flaky_tests
[3]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=test_optimization
[4]: /tests/flaky_tests/early_flake_detection
[5]: /pr_gates
[6]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=test_optimization
[7]: /tests/#supported-features
[8]: /source_code/features/#pr-comments