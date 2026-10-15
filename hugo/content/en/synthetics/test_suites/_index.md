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
- link: "/synthetics/bits_testing/"
  tag: "Documentation"
  text: "Bits Testing"
- link: "/synthetics/troubleshooting/"
  tag: "Documentation"
  text: "Synthetic Monitoring Troubleshooting"
- link: "https://www.datadoghq.com/blog/test-suites/"
  tag: "Blog"
  text: "Get organized, actionable insights from complex test environments"
- link: "/synthetics/guide/how-synthetics-monitors-trigger-alerts/"
  tag: "Guide"
  text: "Understanding Synthetic Monitor Alerting"
---

## Overview

Synthetic Monitoring Test Suites let you organize multiple tests into a single collection for simplified management and troubleshooting. Group tests by user journey, environment, location, service, team, or any other dimension that fits your workflow. View aggregated results, identify failing components, and understand application performance across related tests, all from a unified view. Configure suite-level alerting to get a consolidated notification when a critical portion of your tests fail.

## Key features

- **Impact-driven alerting**: Receive a consolidated alert when a critical portion of the test suite fails.
- **Centralized visibility**: View all tests in a suite and their results in one place.
- **Simplified management**: Create and run test groups instead of managing individual tests separately.
- **Easier maintenance**: Identify which tests need updates when application changes are made.

## Create a test suite

To create a Synthetic Monitoring Test Suite:
1. In Datadog, navigate to {{< ui >}}Digital Experience{{< /ui >}}.
2. Click {{< ui >}}New Test Suite{{< /ui >}}.
3. Optionally, navigate to the [Synthetic Monitoring tests][1] page, and click {{< ui >}}\+ New Suite{{< /ui >}}.

To have Bits Testing group your existing tests into suites for you, see [Create test suites with Bits Testing](#create-test-suites-with-bits-testing).

## Test suite configuration

1. Enter a name for your suite (for example, `Checkout flow` or `API health checks`).
2. Click {{< ui >}}Add Tests{{< /ui >}} to include existing Synthetic Monitoring tests.  
   You can:
   - **Search** by name or tag.  
   - **Filter** by test type (such as Browser, API, Private Location, or Mobile).
   - **Select** one or more tests to include.
3. Click {{< ui >}}Add Tests{{< /ui >}} to confirm.
4. _Optionally, remove tests using the Remove Test from Suite icon next to each entry_.

5. Configure alerting for the suite:
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">Alerting for Test Suites is not supported for this <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}})</div>
{{% /site-region %}}

   - By default, all tests are marked as {{< ui >}}Critical{{< /ui >}}, and the alert triggers when any critical test fails. 

     **Note**: Suite alerts are separate from individual test alerts. To avoid duplicate notifications, mute alerts on individual tests included in the suite.
   - To exclude specific tests from triggering the suite-level alert, select them and mark them as {{< ui >}}Ignored{{< /ui >}}.
   - Adjust the alert threshold to trigger only when a specified percentage of critical tests fail.

   {{< img src="synthetics/test_suites/suite_alerting.png" alt="Suite alerting creation page, with the suite alerting drop-down expanded. " style="width:80%;">}}

   **Note**: For existing test suites, alerting is enabled with default settings. You can modify the configuration as needed.

6. Configure [monitor settings][2] (notification message, recipients, renotification) the same way you would for a single test.
7. Click {{< ui >}}Save Suite{{< /ui >}} when finished.

{{< img src="synthetics/test_suites/test_suite_creation_2.png" alt="Synthetic Monitoring Test Suite creation page" style="width:80%;">}}

## Create test suites with Bits Testing

{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">Creating test suites with Bits Testing is not supported for this <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

[Bits Testing][4] can group your existing Synthetic tests into suites. Describe in plain language how you want your tests grouped, and Bits Testing proposes suites of matching tests. You review each suite and choose which ones to create. This is separate from the test suites that a Bits Testing discovery job generates, which contain new tests.

You can ask Bits Testing for:

- **One suite**: Describe what the suite represents, for example, "Create a suite that monitors the checkout flow."
- **Several suites at once**: Describe how to split your tests, for example, one suite per team, per service, per environment, or per combination of service and environment.

To create test suites with Bits Testing:

1. In Synthetic Monitoring & Testing, click {{< ui >}}Bits Testing{{< /ui >}} in the top navigation.
2. Describe how you want your tests grouped, for example, `Create a test suite for each one of my teams`. You can also select one of the suggested prompts.
3. Review the suites Bits Testing plans to generate, then click the generate button (for example, {{< ui >}}Generate 5 Suites{{< /ui >}}, or {{< ui >}}Generate Suite{{< /ui >}} for a single suite).

   {{< img src="synthetics/test_suites/bits_testing_multiple_suites.png" alt="Bits Testing's response to a request for one test suite per team, listing five suite prompts and a Generate 5 Suites button." style="width:100%;" >}}

4. In the {{< ui >}}Review suggested suites{{< /ui >}} panel, select each suite in the list to see its description and tests. For each suite, you can:
   - Click {{< ui >}}Add Tests{{< /ui >}} to add tests, or select tests and click {{< ui >}}Remove From Suite{{< /ui >}} to remove them.
   - Set each test's {{< ui >}}Suite Alerting{{< /ui >}} value. For details, see [Test suite configuration](#test-suite-configuration).
   - Click {{< ui >}}Exclude Suite{{< /ui >}} to skip creating that suite.

   {{< img src="synthetics/test_suites/bits_testing_review_suites.png" alt="The Review suggested suites panel with five generated suites, one suite's description, and its tests with Suite Alerting set to Critical." style="width:100%;" >}}

5. Click the create button (for example, {{< ui >}}Create 5 Suites{{< /ui >}}).
6. Click {{< ui >}}View Suites{{< /ui >}} to open your new suites.

Suites that Bits Testing creates work like suites you create manually, including suite-level alerting and an automatically generated service level objective. See the [service level objectives](#service-level-objectives) section.

### Write a prompt for Bits Testing

Describe the business or operational area you want to monitor, not only the technical details. For example:

- `Create a suite for the checkout journey`
- `Create separate suites for each team and environment`
- `Group the tests that validate authentication`
- `Create one suite for each production service`

Your prompt can describe any grouping, such as a user journey, service, team, environment, shared platform capability, or release validation.

The suites Bits Testing proposes depend on the information in your existing tests and on how clearly you describe the grouping. Review each proposed suite before you create it.

## Service level objectives

When you create a test suite, Datadog automatically generates a service level objective (SLO) for it, with no configuration required. By default, the SLO uses a 7-day rolling window with a 99.9% target.

<div class="alert alert-info">Test suite permissions (view and edit) apply to the suite itself and are independent of the auto-generated SLO's permissions. Access to the SLO is determined by the user's <a href="/service_level_objectives/#permissions">SLO product permissions</a>. A user without test suite edit permissions can still edit the auto-generated SLO if they have SLO edit permissions.</div>

The SLO panel on the Test Suite details page shows the current SLO status and error budget. From this view, you can:

- **[Create alert](#create-an-alert)** to set up alerting when SLO performance degrades significantly. When an alert already exists, hover over the alert indicator to view additional details.
- **[View details](#view-details)** by clicking the eye icon to open the full SLO details page.
- **[View contributors](#contributors)** to see which tests are consuming error budget.
- **[Edit the SLO](#edit-the-service-level-objective)** by clicking the {{< img src="icons/pencil-mdi.svg" inline="true" style="width:16px;">}} pencil icon.

{{< img src="synthetics/test_suites/test_suite_slo_panel_v2.png" alt="Test Suite details page showing the SLO panel with a 7-day rolling window and error budget, the Primary Contributors section with top contributing tests, the Global Uptime timeline, and the Test Runs section." style="width:100%;">}}

### Create an alert

Click {{< ui >}}Create alert{{< /ui >}} on the SLO details panel to open the SLO Monitor configuration form, where you can set alert conditions and notification settings.

{{< img src="synthetics/test_suites/test_suite_slo_create_alert.png" alt="SLO Monitor creation form with alert condition and notification settings." style="width:80%;">}}

### View details

Click the eye icon to open the full SLO details page. From this page, you can view SLO status, error budget burndown, burn rate, and metric timeseries.

{{< img src="synthetics/test_suites/test_suite_slo_details.png" alt="Full SLO details page for a test suite, showing SLO status, error budget burndown, burn rate, and metric timeseries." style="width:90%;">}}

### Contributors

The contributors section highlights the tests with the largest impact on error budget consumption:

- **Total number of critical tests**: The total number of critical tests in the suite.
- **Error budget consumed by**: The number of tests that consumed error budget.
- **Top 3 contributors consumed**: The top three tests by percentage impact, based on how long each test was in an alert state while the suite was in alert.

{{< img src="synthetics/test_suites/test_suite_slo_contributors.png" alt="Primary Contributors section showing total critical tests, error budget consumed, and top three contributors by percentage impact." style="width:90%;">}}

### Edit the service level objective

To update the SLO time window (for example, to 30 days) or target, click the {{< img src="icons/pencil-mdi.svg" inline="true" style="width:16px;">}} pencil icon on the SLO panel. Because this SLO is automatically created from a test suite, you can only edit the time window, target, and warning thresholds.

   {{< img src="synthetics/test_suites/test_suite_slo_edit.png" alt="Edit SLO page for a test suite, showing the target and time window fields." style="width:90%;">}}

## View and manage test suites

After creating your suite, it appears in the {{< ui >}}Suites{{< /ui >}} tab on the [Synthetic Monitoring tests][1] page. You can also access test suites from {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Test Suites{{< /ui >}}.

To apply a [Scheduled downtime][3] to one or more test suites, select them using the checkboxes and click {{< ui >}}Add to Downtime{{< /ui >}}.

When viewing a test suite, three tabs are available:

- {{< ui >}}Tests in the Suite{{< /ui >}}: Lists all tests included in the suite.
- {{< ui >}}Test Runs{{< /ui >}}: Displays global uptime metrics and related test runs.
- {{< ui >}}Attributes{{< /ui >}}: Shows suite attributes such as `team`, monitors, and who created the test suite.

**Note**: Test runs appear in the suite only from the date the test was added. To view earlier results, check the individual test page. If you rename a test, previous runs remain listed under the original name. A maximum of 300 tests can be added per suite.

{{< img src="synthetics/test_suites/test_suite_summary_2.png" alt="Synthetic Monitoring Test Suite summary page" style="width:100%;">}}

## Run a test suite

You can trigger test runs in two ways:

- [Run all tests in the suite](#run-all-tests-in-the-suite)
- [Run selected tests](#run-selected-tests)

### Run all tests in the suite

From the suite detail page, click {{< ui >}}Run Suite Now{{< /ui >}} in the top right to trigger every test in the suite.

{{< img src="synthetics/test_suites/run_suite_now.png" alt="The test suite detail page with the Run Suite Now button in the top right." style="width:100%;" >}}

### Run selected tests

To run a subset of tests:

1. Navigate to the suite and click the {{< ui >}}Tests in the Suite{{< /ui >}} tab.
2. Select the tests you want to run using the checkboxes.
3. Click {{< ui >}}Run Tests Now{{< /ui >}}.

{{< img src="synthetics/test_suites/run_tests_now.png" alt="The Tests in the Suite tab with tests bulk selected and the Run Tests Now button visible." style="width:100%;" >}}

**Note**: You can run a maximum of 50 tests at a time with {{< ui >}}Run Tests Now{{< /ui >}}.

## Troubleshooting

If some tests fail to appear in a suite:

- Verify the tests are active and not deleted.
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
[3]: /synthetics/platform/downtime/
[4]: /synthetics/bits_testing/
