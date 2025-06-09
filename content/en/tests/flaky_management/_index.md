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

{{< callout url="https://www.datadoghq.com/product-preview/flaky-test-management/" >}}
Flaky Test Management is in Preview. Complete the form to request access.
{{< /callout >}}

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
| **Fixed** | The test has passed consistently and is no longer flaky. If supported, use the [remediation flow](#fix-a-flaky-test) to confirm a fix and automatically apply this status, instead of manually changing it. |

<div class="alert alert-info"><strong>Note:</strong> Status actions have minimum version requirements for each programming language. See <a href="#compatibility">Compatibility</a> for details.</div>

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

## Investigate a flaky test

For more information about a specific flaky test, use these options in the actions menu at the end of each row:

- **View Last Failed Test Run**: Open the side panel with the details of the test's most recent failed run.
- **View related test executions**: Open the [Test Optimization Explorer][2] populated with all of the test's recent runs.

## Create cases for flaky tests

For any flaky test, you can create a case and use [Case Management][3] to track any work toward remediation. Click the **Create Case** button or use the actions menu at the end of the row. 

## Compatibility

Flaky Test Management features have minimum version requirements for each programming language. The table below outlines the minimum versions needed to quarantine, disable, and attempt to fix flaky tests:

| Language   | Quarantine & Disable | Attempt to fix   |
| ---------- | -------------------- | ---------------- |
| .NET       | 3.13.0+              | 3.17.0+          |
| Go         | 1.73.0+              | Not available    |
| Java       | 1.48.0+              | 1.50.0+          |
| JavaScript | 5.44.0+              | 5.52.0+          |
| Python     | 3.3.0+               | 3.8.0+           |
| Ruby       | 1.13.0+              | 1.17.0+          |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test/flaky
[2]: /tests/explorer
[3]: /service_management/case_management
