---
title: Using Synthetic Test Monitors
kind: guide
description: Learn about Synthetic monitors created with your Synthetic tests. 
further_reading:
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Manage Monitors"
- link: "/synthetics/metrics/"
  tag: "Documentation"
  text: "Synthetic Monitoring Metrics"
---

## Overview

When you create a Synthetic test, Datadog automatically creates an associated monitor. You are notified when the Synthetic test monitor alerts.

{{< img src="synthetics/guide/synthetics_test_monitors/synthetic_test_monitor.png" alt="Synthetic test monitor" style="width:100%;">}}

## Create a Synthetic test monitor

<div class="alert alert-info">You cannot create or import a Synthetic test monitor in <a href="/monitors/create/">Monitors</a>.</div>

Create a monitor in the **Configure the monitor for this test** section to send notifications when a Synthetic test is failing. Monitors are associated with the Synthetic test you create and set alerting conditions for. 

{{< img src="synthetics/guide/synthetics_test_monitors/configure_the_monitor_for_this_test.png" alt="Creating a monitor in your Synthetic test" style="width:90%;">}}

Customize the monitor name to search for it on the [**Manage Monitors**][1] page. To find a Synthetic test monitor, filter on `type:synthetics` in the search bar. You can also use [conditional variables][2] to characterize the notification message based on test state.

The Synthetic test monitor integrates with notification channels such as email, Slack, Pagerduty, and Microsoft Teams. For more information, see [Notifications][3].

Synthetic test monitors do not support `{{#is_warning}}`, `{{^is_warning}}`, `{{#is_warning_recovery}}`, and `{{^is_warning_recovery}}` conditional variables. Datadog recommends enabling [renotification][4] on your monitors.

## Notify multiple teams with renotifications

Depending on your incident management strategy, you may want to involve multiple teams when a Synthetic test alerts. Add `{{#is_renotify}}` and `{{/is_renotify}` in the escalation message to notify Team A first, and Team B if the issue still occurs. You can use conditional variables to characterize the notification message based on team. 

{{< img src="synthetics/guide/synthetics_test_monitors/renotification_toggle.png" alt="Select the amount of time for the alerting monitor to renotify" style="width:90%;">}}

To enable the alerting monitor to renotify, click the toggle left of `If this monitor stays in alert status renotify every` and select a time option from the dropdown menu.

## Integrate your Synthetic test monitor with Statuspage

If you use [Atlassian Statuspage][5] for visibility into your applications' and services' uptime, you can update the status of your systems with  Synthetic test monitor notifications.

1. See the [Statuspage documentation][6] to generate a component-specific email address.
2. Add the generated email address into your test's notification message.
3. Customize the monitor name to return `UP` or `DOWN` depending on the test state.

{{< img src="synthetics/guide/synthetics_test_monitors/statuspage_monitor_setup.png" alt="Add a Statuspage email address and status to the monitor name in your Synthetic test" style="width:95%;">}}

## Use Synthetic test metrics

You may want to group monitor notifications based on test run status or team. Use [Synthetic Monitoring Metrics][7] to expand your notification capabilities by creating additional [metric monitors][8].

## Export Synthetic test uptime

In order to export the uptime for a Synthetic test, you need the `monitor_id` for the respective test. Use the [Monitors API][9] to query the [`Get an API test`][10] or [`Get a browser test` endpoint][11].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/manage/
[2]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[3]: /monitors/notify/#integrations/
[4]: /monitors/notify/#renotify
[5]: https://support.atlassian.com/statuspage/
[6]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[7]: /synthetics/metrics/
[8]: /monitors/create/types/metric/
[9]: /api/latest/monitors/
[10]: /api/latest/synthetics/#get-an-api-test
[11]: /api/latest/synthetics/#get-a-browser-test
