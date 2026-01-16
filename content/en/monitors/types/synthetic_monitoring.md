---
title: Synthetic Monitors
description: "Create and manage monitors for Synthetic tests to receive notifications when web and API tests fail or perform poorly."
aliases:
  - /synthetics/guide/synthetic-test-monitors/
further_reading:
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
- link: "/synthetics/notifications/"
  tag: "Documentation"
  text: "Learn more about Synthetic Monitoring Notifications"
---

## Overview

When you create a Synthetic test, Datadog automatically creates an associated monitor. You can set up notifications when the Synthetic test monitor alerts.

## Create a Synthetic test monitor

<div class="alert alert-info">You can only create <strong>Synthetic test monitors</strong> within the <a href="https://app.datadoghq.com/synthetics/tests">Synthetic Monitoring</a> section of the application. The general <a href="https://app.datadoghq.com/monitors">Monitors</a> page is used for creating other types of monitors, such as those based on metrics, logs, or processes.</div>

Create a monitor in the **Monitor** section of a new or existing Synthetic test to send notifications when a Synthetic Monitoring test is failing. Monitors are associated with the Synthetic test you create and link to the alerting conditions set in your Synthetic test configuration. To use monitor attribute and tag variables, create a [metric monitor][1].

Monitor messages in Synthetic Monitoring consist of:

- **Title**: The name of the monitor.
- **Custom message**: Optional text written when creating the monitor.
- **Auto-appended summary**: Includes failing locations, error messages, and links to the test.
- **Footer**: Includes details from the last failed test run. </br><br>

{{< img src="synthetics/guide/synthetics_test_monitors/configure_the_monitor_for_this_test_2.png" alt="Creating a monitor in your Synthetic test" style="width:90%;">}}

## View and manage Synthetic monitors

- Customize the monitor name to search for it on the [**Manage Monitors**][2] page. To find a Synthetic test monitor, filter on `type:synthetics` in the search bar. You can use monitor [conditional variables][3] to characterize the notification message based on test state. 

- The Synthetic test monitor integrates with notification channels such as email, Slack, Pagerduty, and Microsoft Teams. For more information, see [Notifications][4].

- If you have multiple layers of notifications (for example, notifying more teams the longer a Synthetic test is alerting), Datadog recommends enabling [renotification][5] on your Synthetic monitors.

### Tailor monitor notifications

Depending on your incident management strategy, you may want to involve multiple teams when a Synthetic test alerts. To notify Team B only on subsequent alerts after the first alert, surround the notification to Team B with `{{#is_renotify}}` and `{{/is_renotify}`. Use [conditional variables][3] to further characterize the notification message based on monitor attributes. 

{{< img src="synthetics/guide/synthetics_test_monitors/renotification_toggle_2.png" alt="Select the amount of time for the alerting monitor to renotify" style="width:90%;">}}

To enable renotification, toggle **Enable renotification** and select a time interval from the dropdown menu.

## Enhanced notifications

Use and enrich Synthetic monitors to send more detailed notifications when a Synthetic Monitoring test is failing. The following features are available:

Pre-filled monitor messages
: Pre-filled monitor messages provide a structured starting point for Synthetic test alerts. Each message includes a standardized title, summary, and footer containing test metadata, making it easier to understand the alert at a glance.

Template variables
: Template variables let you inject test-specific data into monitor notifications dynamically. These variables pull from the `synthetics.attributes` object.

Advanced usage
: Advanced usage includes techniques for surfacing deeper test insights or structuring complex messages using handlebars templating.

Conditional alerting
: Conditional alerting allows you to change the content of a monitor notification based on specific test results or failure conditions.

For more information, see [Synthetic Monitoring notifications][6].

## Best practices

- Always include a default `@notification` (outside any conditions) to prevent dropped messages.
- Avoid complex logic for paging tools like PagerDuty, which require consistent routing for recovery.
- Use conditional logic to override alert text, change priority, or split notifications between teams.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/metric/
[2]: /monitors/manage/
[3]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: /monitors/notify/#notification-recipients
[5]: /monitors/notify/#renotify
[6]: /synthetics/notifications
