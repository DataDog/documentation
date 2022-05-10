---
title: Understanding Synthetic Tests and Alerting Monitors
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

When you create a Synthetic test, Datadog automatically creates an associated monitor. The monitor's alerting conditions in your test configuration impact how you are notified when a Synthetic test moves into an alerting state.

{{< img src="synthetics/guide/synthetics_test_monitors/synthetic_test_monitor.png" alt="Synthetic test monitor" style="width:100%;">}}

This guide describes how Synthetic test monitors behave, how to use a monitor's conditional variables in a Synthetic test configuration, and how to set downtimes and mute monitors.

## Create a Synthetic test monitor

<div class="alert alert-info">Alerting monitors created by Synthetic tests are not a <a href="/monitors/create/">monitor type</a>. You cannot create or import a Synthetic test monitor.</div>

Following the test creation workflow, create a monitor in the **Configure the monitor for this test** section to send notifications when a Synthetic test is failing. The Synthetic test monitor integrates with notification channels such as email, Slack, Pagerduty, and Microsoft Teams.

{{< img src="synthetics/guide/synthetics_test_monitors/configure_the_monitor_for_this_test.png" alt="Creating a monitor in your Synthetic test" style="width:90%;">}}

Customize the monitor name to identify it on the [**Manage Monitors**][1] page. You can also use [conditional variables][2] to characterize the notification message based on test state.

Synthetic test monitors do not support `{{#is_warning}}`, `{{^is_warning}}`, `{{#is_warning_recovery}}`, and `{{^is_warning_recovery}}` conditional variables. Datadog recommends enabling [renotification][3] on your monitors.

## Notify multiple teams with monitor renotifications

Depending on your incident management strategy, you may want to involve multiple teams when a Synthetic test alerts. You can use the available conditional variables to set which team are notified in your notification message. 

To enable renotifications, click the toggle left of `If this monitor stays in alert status renotify every` and select a time option from the dropdown menu.

## Integrate your Synthetic test monitor with Statuspage

If you use [Atlassian Statuspage][4] for visibility into your applications' and services' uptime, you can update the status of your systems with  Synthetic test monitor notifications.

1. See the [Statuspage documentation][5] to generate a component-specific email address.
2. Add the generated email address into your test's notification message.
3. Customize the monitor name to return `UP` or `DOWN` depending on the test state.

{{< img src="synthetics/guide/synthetics_test_monitors/statuspage_monitor_setup.png" alt="Add a Statuspage email address and status to the monitor name in your Synthetic test" style="width:95%;">}}

## Use Synthetic test metrics

You may want to group monitor notifications based on test run status or team. Use [Synthetic Monitoring Metrics][6] to fine tune your notification capabilities and individual test notifications by creating additional [metric monitors][7].


## Export Synthetic test uptime

In order to export the uptime for a Synthetic test, you need the `monitor_id` for the respective test. Use the [Monitors API][8] to query the [`Get an API test`][9] or [`Get a browser test` endpoint][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/manage/
[2]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[3]: /monitors/notify/#renotify
[4]: https://support.atlassian.com/statuspage/
[5]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[6]: /synthetics/metrics/
[7]: /monitors/create/types/metric/
[8]: /api/latest/monitors/
[9]: /api/latest/synthetics/#get-an-api-test
[10]: /api/latest/synthetics/#get-a-browser-test
