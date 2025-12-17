---
title: Test Suites
description: Organize Synthetic Monitoring tests into logical groups.
further_reading:
- link: /synthetics/
  tag: Documentation
  text: Learn about Synthetic Monitoring
- link: /monitors/types/synthetic_monitoring/
  tag: Documentation
  text: Configure Synthetic test monitors
- link: "/synthetics/troubleshooting/"
  tag: "Documentation"
  text: "Synthetic Monitoring Troubleshooting"
- link: "https://www.datadoghq.com/blog/test-suites/"
  tag: "Blog"
  text: "Get organized, actionable insights from complex test environments"
---

## Overview

Synthetic Monitoring Test Suites let you organize multiple tests into a single collection for simplified management and troubleshooting. Group tests by user journey, environment, location, service, team, or any other dimension that fits your workflow. View aggregated results, identify failing components, and understand application performance across related tests, all from a unified view. Configure suite-level alerting to receive a consolidated notification when a critical portion of your tests fail, helping you respond more efficiently to issues impacting important workflows. 

## Key features

- **Impact-driven alerting**: Receive a consolidated alert when a critical portion of the test suite fails.
- **Centralized visibility**: View all tests in a suite and their results in one place.
- **Simplified management**: Create and run test groups instead of managing individual tests separately.
- **Easier maintenance**: Identify which tests need updates when application changes are made.

## Create a test suite

To create a new Test Suite:
1. In Datadog, navigate to **Digital Experience**.
2. Click **New Test Suite**.
3. Optionally, navigate to the [Synthetic Monitoring tests][1] page, and click **+ New Suite**.

## Test suite configuration

1. Enter a name for your suite (for example, `Checkout flow` or `API health checks`).
2. Click **Add Tests** to include existing Synthetic Monitoring tests.  
   You can:
   - **Search** by name or tag.  
   - **Filter** by test type (such as Browser, API, Private Location, or Mobile).
   - **Select** one or more tests to include.
3. Click **Add Tests** to confirm.
4. _Optionally, remove tests using the Remove Test from Suite icon next to each entry_.
5. Configure alerting for the suite:
   - By default, all tests are marked as **Critical** and the alert triggers when any critical test fails. 

     **Note**: Suite alerts are separate from individual test alerts. To avoid duplicate notifications, mute alerts on individual tests included in the suite.
   - To exclude specific tests from triggering the suite-level alert, select them and mark them as **Ignored**.
   - Adjust the alert threshold to trigger only when a specified percentage of critical tests fail.

   {{< img src="synthetics/test_suites/suite_alerting.png" alt="Suite alerting creation page, with the suite alerting drop-down expanded. " style="width:80%;">}}

   **Note**: For existing test suites, alerting is enabled with default settings. You can modify the configuration as needed.

6. Configure [monitor settings][2] (notification message, recipients, renotification) the same way you would for a single test.
7. Click **Save suite** when finished.

{{< img src="synthetics/test_suites/test_suite_creation_2.png" alt="Synthetic Monitoring Test Suite creation page" style="width:80%;">}}

## View and manage

After creating your suite, it appears in the **Suites** tab on the [Synthetic Monitoring tests][1] page, or you can access test suites from **Digital Experience > Test Suites**. Click on a test suite to display the following:

- A **summary** of test results (success, failures, skipped).
- **Execution details** such as timing, environment, and test type.
- **Filters** to refine by location, time frame, or tag.

When viewing a test suite, three tabs are available:

- **Tests in the Suite**: Lists all tests included in the suite.
- **Test Runs**: Displays global uptime metrics and related test runs.
- **Attributes**: Shows suite attributes such as `team`, monitors and who created the test suite.

**Note**: Test runs appear in the suite only from the date the test was added. To view earlier results, check the individual test page. If you rename a test, previous runs remain listed under the original name. A maximum of 300 tests can be added per suite.

{{< img src="synthetics/test_suites/test_suite_summary_2.png" alt="Synthetic Monitoring Test Suite summary page" style="width:100%;">}}

## Troubleshooting

If some tests fail to appear in a suite:

- Ensure the tests are active and not deleted.
- Confirm you have the necessary permissions to view those tests.
- Refresh filters or clear search terms when adding tests.

If execution results look incomplete:

- Verify test run frequency and recent activity.
- Check for tag or location mismatches that could filter out runs.
- Re-save the Test Suite to refresh the association with its tests.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests
[2]: /synthetics/notifications/
