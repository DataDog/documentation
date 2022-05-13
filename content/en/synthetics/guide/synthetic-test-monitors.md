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

Customize the monitor name to search for it on the [**Manage Monitors**][1] page. You can use [conditional variables][2] to characterize the notification message based on test state. To find a Synthetic test monitor, filter on `type:synthetics` in the search bar.

The Synthetic test monitor integrates with notification channels such as email, Slack, Pagerduty, and Microsoft Teams. For more information, see [Notifications][3].

Synthetic test monitors do not support tag and attribute variables or the `{{#is_warning}}`, `{{^is_warning}}`, `{{#is_warning_recovery}}`, and `{{^is_warning_recovery}}` conditional variables in the the monitor name. To use tag and attribute variables, create a [metric monitor][4].

If you have multiple layers of notifications (for example, with warning thresholds), Datadog recommends enabling [renotification][5] on your monitors.

## Notify multiple teams with renotifications

Depending on your incident management strategy, you may want to involve multiple teams when a Synthetic test alerts. Add `{{#is_renotify}}` and `{{/is_renotify}` in the escalation message to notify Team A first, and Team B if the issue still occurs. You can use conditional variables to characterize the notification message based on team. 

{{< img src="synthetics/guide/synthetics_test_monitors/renotification_toggle.png" alt="Select the amount of time for the alerting monitor to renotify" style="width:90%;">}}

To enable the alerting monitor to renotify, click the toggle left of `If this monitor stays in alert status renotify every` and select a time option from the dropdown menu.

## Integrate your Synthetic test monitor with Statuspage

If you use [Atlassian Statuspage][6] for visibility into your applications' and services' uptime, you can update the status of your systems with  Synthetic test monitor notifications.

{{< img src="synthetics/guide/synthetics_test_monitors/statuspage_monitor_setup.png" alt="Add a Statuspage email address and status to the monitor name in your Synthetic test" style="width:95%;">}}

1. See the [Statuspage documentation][7] to generate a component-specific email address.
2. Add the generated email address into your test's notification message. For example, `@custom-statuspage-email@notifications.statuspage.io`.
3. Customize the monitor name to return `UP` or `DOWN` depending on the test state. For example, `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`.
4. Fill out the monitor notification section and add a summary in the monitor name. For eaxmple, `Shopist Checkout Functionality`.
5. Once you have configured your monitor, click **Save & Exit**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/manage/
[2]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[3]: /monitors/notify/#integrations/
[4]: /monitors/create/types/metric/
[5]: /monitors/notify/#renotify
[6]: https://support.atlassian.com/statuspage/
[7]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
