---
title: Scheduled Downtime
description: Pause Synthetic test execution during planned maintenance windows to keep availability metrics accurate and reduce unnecessary test runs.
further_reading:
- link: "/synthetics/platform/settings/"
  tag: "Documentation"
  text: "Synthetic Monitoring Settings"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API Test"
- link: "/synthetics/test_suites/"
  tag: "Documentation"
  text: "Test Suites"
---

## Overview

Synthetic Monitoring Scheduled Downtime lets you pause Synthetic test execution during planned maintenance windows. Unlike the [Downtime feature for monitors][1], which mutes alerts but allows tests to continue running, Synthetic Monitoring Scheduled Downtime stops test execution entirely. This keeps your availability and performance metrics accurate and prevents unnecessary test runs and associated costs during expected outages.

**Note**: All downtime references on this page apply to Synthetic Monitoring only. For monitor-level downtime behavior, see [Downtimes][1].

{{< img src="synthetics/settings/synthetics_downtimes_updated.png" alt="The Downtimes page in Synthetic Monitoring Settings showing a list of configured downtimes on the left with a monthly calendar view of their scheduled time slots on the right" style="width:100%;" >}}

With Synthetic Monitoring Scheduled Downtime, you can:

- Pause tests during deployments, infrastructure updates, or third-party outages.
- Prevent availability and performance metrics from being skewed by planned maintenance.
- Reduce costs by stopping test executions during known downtime windows.
- Apply downtime to individual tests, multiple tests, or test suites in bulk.
- Resume tests automatically when the downtime window ends.

## Create a downtime

1. Navigate to [**Digital Experience > Synthetic Monitoring & Testing > Settings**][2] and click **Downtimes** in the left sidebar.
2. Click **+ New Downtime**.
3. Enter a name for the downtime.
4. Define one or more time slots to support recurring or multi-window schedules.
5. Select the Synthetic tests the downtime applies to.
6. Optionally, assign tags, environment, or team metadata.
7. Click **Save**.

Downtimes can be saved in an enabled or disabled state and modified at any time.

## Manage downtimes

The **Downtimes** page provides a list and calendar view of all configured downtimes. Use the calendar to see how scheduled time slots are distributed across the month.

{{< img src="synthetics/settings/synthetics_downtimes_updated.png" alt="The Downtimes page in Synthetic Monitoring Settings showing a list of configured downtimes on the left with a monthly calendar view of their scheduled time slots on the right" style="width:90%;" >}}

Use the filters at the top of the page to find specific downtimes:

- **Tag**: Filter by associated tags.
- **Environment**: Filter by environment.
- **Team**: Filter by team.
- **Status**: Filter by enabled or disabled status.

To modify or disable a downtime without deleting it, click the three-dot menu next to a downtime row.

## Apply downtime to tests

### During test creation

When creating a new Synthetic test, you can attach an existing downtime from the test configuration form:

1. In the test creation form, navigate to the **Downtimes** section.
2. Click **Select downtimes** and choose an existing downtime.

The test automatically pauses during the downtime's scheduled time slots.

**Note**: You cannot create a downtime from the test creation form. To create one, navigate to [**Settings > Downtimes**][2].

{{< img src="synthetics/settings/add_downtime_to_test_2.png" alt="The Downtimes section in the test creation form showing a Select downtimes dropdown expanded with available downtimes listed and a Manage downtimes link" style="width:90%;" >}}

### From the Tests or Test Suites page

To apply an existing downtime to multiple tests or test suites at once:

1. Navigate to [**Digital Experience > Synthetic Monitoring & Testing**][3].
2. Select one or more tests or test suites using the checkboxes.
3. Click **Add to Downtime** in the bulk actions bar.
4. Select an existing downtime from the list.

{{< img src="synthetics/settings/bulk_add_downtimes.png" alt="The Synthetic Monitoring Tests page with two tests selected and the Add to Downtime button highlighted in the bulk actions bar" style="width:90%;" >}}

## Best practices

- Use consistent tagging to simplify applying downtime across groups of tests.
- When viewing the calendar with multiple downtimes configured, filter by a specific downtime to avoid a crowded view.
- For complex recurrence patterns, split requirements into multiple time slots within the same downtime.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/downtimes/
[2]: https://app.datadoghq.com/synthetics/settings/downtimes
[3]: https://app.datadoghq.com/synthetics/tests
