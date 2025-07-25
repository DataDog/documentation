---
title: Flaky Test Management
description: Track, triage, and manage flaky tests.
further_reading:
- link: "/continuous_integration/tests/"
  tag: "Documentation"
  text: "Learn about Test Optimization"
- link: "/tests/flaky_tests/"
  tag: "Documentation"
  text: "Learn about working with flaky tests"
- link: "https://www.datadoghq.com/knowledge-center/flaky-tests/"
  tag: "Knowledge Center"
  text: "Flaky Tests Overview"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Test Optimization is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

The [Flaky Test Management][1] page provides a centralized view to track, triage, and remediate flaky tests across your organization. You can view every test's status along with key impact metrics like number of pipeline failures, CI time wasted, and failure rate.

From this UI, you can act on flaky tests to mitigate their impact. Quarantine or disable problematic tests to keep known flakes from breaking builds, and create cases and Jira issues to track work toward fixes.

{{< img src="tests/flaky_management.png" alt="Overview of the Flaky Tests Management UI" style="width:100%;" >}}

## Change a flaky test's status

Use the status drop-down to change how a flaky test is handled in your CI pipeline. This can help reduce CI noise while retaining traceability and control. Available statuses are:

| Status    | Description |
| ----------- | ----------- |
| **Active** | The test is known to be flaky and is running in CI. |
| **Quarantined** | Keep the test running in the background, but failures don't affect CI status or break pipelines. This is useful for isolating flaky tests without blocking merges. |
| **Disabled** | Skip the test entirely in CI. Use this when a test is no longer relevant or needs to be temporarily removed from the pipeline. |
| **Fixed** | The test has passed consistently and is no longer flaky. If supported, use the [remediation flow](#confirm-fixes-for-flaky-tests) to confirm a fix and automatically apply this status, instead of manually changing it. |

<div class="alert alert-info"><strong>Note</strong>: Status actions have minimum version requirements for each programming language's instrumentation library. See <a href="#compatibility">Compatibility</a> for details.</div>

## Track evolution of flaky tests

Track the evolution of the number of flaky tests with the `test_optimization.test_management.flaky_tests` out-of-the-box metric. The metric is enriched with the tags below to help you investigate the counts in more detail.

- `repository_id`
- `branch`
- `flaky_status`
- `test_codeowners`
- `flaky_category`

The `branch` tag only exists when the test has flaked in the default branch of the repository during the last 30 days. This helps you discard flaky tests that have only exhibited flakiness in feature branches, as these may not be relevant. You can configure the default branch of your repositories under [Repository Settings][2].

## Investigate a flaky test

For more information about a specific flaky test, use these options in the actions menu at the end of each row:

- **View Last Failed Test Run**: Open the side panel with the details of the test's most recent failed run.
- **View related test executions**: Open the [Test Optimization Explorer][3] populated with all of the test's recent runs.

## Create cases for flaky tests

For any flaky test, you can create a case and use [Case Management][4] to track any work toward remediation. Click the **Create Case** button or use the actions menu at the end of the row.

## Confirm fixes for flaky tests

When you fix a flaky test, Test Optimization's remediation flow can confirm the fix by retrying the test multiple times. If successful, the test's status is automatically updated to `Fixed`. To enable the remediation flow:

1. For the test you are fixing, click **Fix this test** in the Flaky Test Management UI.
1. Copy the unique flaky test key that is displayed (for example, `DD_ABC123`).
1. Include the test key in your Git commit title or message for the fix (for example, `git commit -m "DD_ABC123"`).
1. When Datadog detects the test key in your commit, it automatically triggers the remediation flow for that test:
   - Retries any tests you're attempting to fix 20 times.
   - Runs tests even if they are marked as `Disabled`.
   - If all retries pass, updates the test's status to `Fixed`.
   - If any retry fails, keeps the test's current status (`Active`, `Quarantined`, or `Disabled`).

## AI-powered flaky test categorization

Flaky Test Management uses AI to automatically assign a root cause category to each flaky test based on execution patterns and error signals. This helps you filter, triage, and prioritize flaky tests more effectively.

<div class="alert alert-info"><strong>Note:</strong> A test must have at least one failed execution that includes both <code>@error.message</code> and <code>@error.stack</code> tags to be eligible for categorization. If the test was recently detected, categorization may take several minutes to complete.</div>

### Categories

| Category                | Description |
|-------------------------|-------------|
| **Concurrency**         | Test that invokes multiple threads interacting in an unsafe or unanticipated manner. Flakiness is caused by, for example, race conditions resulting from implicit assumptions about the ordering of execution, leading to deadlocks in certain test runs. |
| **Randomness**          | Test uses the result of a random data generator. If the test does not account for all possible cases, then the test may fail intermittently, e.g., only when the result of a random number generator is zero. |
| **Floating Point**      | Test uses the result of a floating-point operation. Floating-point operations can suffer from precision over- and under-flows, non-associative addition, etc., which—if not properly accounted for—can result in inconsistent outcomes (e.g., comparing a floating-point result to an exact real value in an assertion). |
| **Unordered Collection**| Test assumes a particular iteration order for an unordered-collection object. Since no order is specified, tests that assume a fixed order will likely be flaky for various reasons (e.g., collection-class implementation). |
| **Too Restrictive Range**| Test whose assertions accept only part of the valid output range. It intermittently fails on unhandled corner cases. |
| **Timeout**             | Test fails due to time limitations, either at the individual test level or as part of a suite. This includes tests that exceed their execution time limit (e.g., single test or the whole suite) and fail intermittently due to varying execution times. |
| **Order Dependency**    | Test depends on a shared value or resource modified by another test. Changing the test-run order can break those dependencies and produce inconsistent outcomes. |
| **Resource Leak**       | Test improperly handles an external resource (e.g., failing to release memory). Subsequent tests that reuse the resource may become flaky. |
| **Asynchronous Wait**   | Test makes an asynchronous call or waits for elements to load/render and does not explicitly wait for completion (often using a fixed delay). If the call or rendering takes longer than the delay, the test fails. |
| **IO**                  | Test is flaky due to its handling of input/output—for example, failing when disk space runs out during a write. |
| **Network**             | Test depends on network availability (e.g., querying a server). If the network is unavailable or congested, the test may fail. |
| **Time**                | Test relies on system time and may be flaky due to precision or timezone discrepancies (e.g., failing when midnight passes in UTC). |
| **Environment Dependency** | Test depends on specific OS, library versions, or hardware. It may pass on one environment but fail on another, especially in cloud-CI environments where machines vary nondeterministically. |
| **Unknown**             | Test is flaky for an unknown reason. |

## Compatibility

To use Flaky Test Management features, you must use Datadog's native instrumentation for your test framework. The table below outlines the minimum versions of each Datadog tracing library required to quarantine, disable, and attempt to fix flaky tests. Click a language name for setup information:

| Language        | Quarantine & Disable | Attempt to fix   |
| --------------- | -------------------- | ---------------- |
| [.NET][5]       | 3.13.0+              | 3.17.0+          |
| [Go][6]         | 1.73.0+              | Not available    |
| [Java][7]       | 1.48.0+              | 1.50.0+          |
| [JavaScript][8] | 5.44.0+              | 5.52.0+          |
| [Python][9]     | 3.3.0+               | 3.8.0+           |
| [Ruby][10]       | 1.13.0+              | 1.17.0+          |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test/flaky
[2]: https://app.datadoghq.com/source-code/repositories
[3]: /tests/explorer
[4]: /service_management/case_management
[5]: /tests/setup/dotnet/
[6]: /tests/setup/go/
[7]: /tests/setup/java/
[8]: /tests/setup/javascript/
[9]: /tests/setup/python/
[10]: /tests/setup/ruby/
