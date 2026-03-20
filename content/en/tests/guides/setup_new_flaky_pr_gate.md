---
title: Set up a New Flaky Test PR Gate

description: Learn how to set up a New Flaky Test PR Gate.
further_reading:
- link: "/tests"
  tag: "Documentation"
  text: "Learn about Test Optimization"
- link: "/tests/flaky_tests"
  tag: "Documentation"
  text: "Learn about Flaky tests"
- link: "/tests/flaky_management"
  tag: "Documentation"
  text: "Learn about Flaky Test Management"
---

## Overview

A [New Flaky Test PR Gate][3] blocks pull requests that introduce at least one new flaky test. This helps keep flaky tests out of your default branch.

A new flaky test is a test that:

- was added in the pull request branch and has not run in any other branch
- exhibited [flaky behavior][2] for the first time

**IMPORTANT**: [Early Flake Detection][4] and automatic fix verification with [Attempt To Fix][8] are supported only with native libraries, not [JUnit XML uploads][10]. If you use JUnit XML uploads, verify fixes manually and mark the test as **Fixed** in [Flaky Tests Management][9].

Before you begin:

- Set up [Test Optimization][1] for your language.
- To improve detection of new flaky tests, enable [Early Flake Detection][4]. See [supported features][5].

## How it works

If Datadog detects at least one new flaky test in the feature branch, the PR gate fails.

## Set up the PR gate

1. Go to [Create Rule][3] and select **New Flaky Tests**.

{{< img src="pr_gates/setup/flaky_tests.png" alt="A PR Gate rule that fails when a pull request introduces at least one new flaky test" style="width:100%" >}}

2. Select the repositories where the rule should be evaluated. By default, it applies to all repositories in your organization.

3. Optional: enable [Early Flake Detection][4] to improve detection of new flaky tests.

After you create the PR gate, a new status check appears in pull requests from the selected repositories.

{{< img src="pr_gates/setup/pr_gate_preview.png" alt="Preview from new flaky test PR gate" style="width:100%" >}}

## In a pull request

The following screenshots use GitHub as an example. The status check and optional PR comment appear in the pull request.

If Datadog detects a new flaky test, the status check fails:

{{< img src="pr_gates/setup/failed_pr_gate.png" alt="GitHub pull request check failing because a new flaky test is detected" style="width:100%" >}}

If [PR comments][6] are enabled, Datadog adds a comment listing the new flaky tests and their error messages:

{{< img src="pr_gates/setup/new_flaky_test_pr_comment.png" alt="GitHub pull request comment showing the new flaky test" style="width:100%" >}}

When you open the failed check, Datadog shows the PR gate details in the Datadog UI:

{{< img src="pr_gates/setup/pr_gate_detail.png" alt="Datadog PR gate detail view" style="width:100%" >}}

## Make the PR gate pass

The PR gate stays red until the flaky test is marked as **Fixed** in [Flaky Tests Management][9].

There are two ways to mark the new flaky test as Fixed: 

1. **(Recommended)** Automatically triggered [Attempt To Fix][8]
2. Manually mark the test as [Fixed][12]


### Automatically triggered Attempt To Fix

If the new flaky test is reported by one of the [supported native libraries][7], the next test execution after detection automatically triggers [Attempt To Fix][8]. The native library retries the test to verify whether the flakiness has been resolved. The expected flow is:

1. Developer pushes a new test
2. CI runs and the test is detected as new flaky
3. New Flaky PR gate goes red
4. Developer pushes a fix for the flakiness
5. The native library retries the new flaky test to verify the fix
  a. If the fix has worked, the PR gate goes green.
  b. If the fix has not worked (the test is still randomly failing), the PR gate stays red.

### Manually mark the test as Fixed

**Important**: This is not necessary if the test is reported with a [supported native library][7].

If the new flaky test is reported with [JUnit XML upload][10], you must verify the fix yourself and then mark the test as fixed manually. The expected flow is:

1. Developer pushes a new test
2. CI runs and the test is detected as new flaky
3. New Flaky PR gate goes red
4. Developer pushes a fix for the flakiness
5. Verify the fix manually, for example by retrying CI or using programmatic retries
  a. If the fix worked, mark the test as Fixed manually. The PR gate goes green.
  b. If the fix hasn't worked, keep iterating. The PR gate stays red.

#### How to manually mark the new flaky test as fixed

In the Datadog UI, follow the link from the PR gate details:

{{< img src="pr_gates/setup/pr_gate_detail_test.png" alt="Datadog PR gate detail view with a link to Flaky Tests Management" style="width:100%" >}}

This opens [Flaky Tests Management][9] in the Datadog UI with the test selected:

{{< img src="pr_gates/setup/flaky_test_detail.png" alt="Datadog Flaky Tests Management view with the selected test" style="width:70%" >}}

Change the status from **Active** to **Fixed**:

{{< img src="pr_gates/setup/fix_flaky_test.png" alt="Datadog Flaky Tests Management status menu showing Fixed" style="width:70%" >}}

## Require the PR gate in GitHub

If you use GitHub, you can mark the PR gate as a required status check in branch protection.

By default, the PR gate is optional, so pull requests can still be merged when a new flaky test is detected:

{{< img src="pr_gates/setup/github_required_check.png" alt="GitHub branch protection rule requiring the PR gate status check" style="width:70%" >}}

For more information, see the GitHub documentation for [status checks][11].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/
[2]: /tests/flaky_tests
[3]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=test_optimization
[4]: /tests/flaky_tests/early_flake_detection
[5]: /tests/#supported-features
[6]: /source_code/features/#pr-comments
[7]: /tests/#setup
[8]: /tests/flaky_management/#confirm-fixes-for-flaky-tests
[9]: /tests/flaky_management
[10]: /tests/setup/junit_xml/
[11]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks
[12]: /tests/flaky_management/#change-a-flaky-tests-status