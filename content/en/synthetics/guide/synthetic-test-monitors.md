---
title: Use Synthetic Test Monitors

description: Learn about Synthetic monitors created with your Synthetic tests. 
further_reading:
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
- link: "/monitors/guide/integrate-monitors-with-statuspage/"
  tag: "Documentation"
  text: "Learn how to integrate monitors with Statuspage"
- link: "/synthetics/metrics/"
  tag: "Documentation"
  text: "Learn about Synthetic Monitoring metrics"
---

## Overview

When you create a Synthetic Monitoring test, Datadog automatically creates an associated monitor. You can set up notifications when the Synthetic test monitor alerts.

## Create a Synthetic test monitor

<div class="alert alert-info">You cannot create or import a Synthetic test monitor in <a href="/monitors/">Monitors</a>.</div>

Create a monitor in the **Monitor** section to send notifications when a Synthetic Monitoring test is failing. Monitors are associated with the Synthetic test you create and link to the alerting conditions set in your Synthetic test configuration. To use monitor attribute and tag variables, create a [metric monitor][1].

{{< img src="synthetics/guide/synthetics_test_monitors/configure_the_monitor_2.png" alt="Creating a monitor in your Synthetic test" style="width:90%;">}}

Customize the monitor name to search for it on the [**Manage Monitors**][2] page. To find a Synthetic test monitor, filter on `type:synthetics` in the search bar. You can use monitor [conditional variables][3] to characterize the notification message based on test state. 

The Synthetic test monitor integrates with notification channels such as email, Slack, Pagerduty, and Microsoft Teams. For more information, see [Notifications][4].

If you have multiple layers of notifications (for example, notifying more teams the longer a Synthetic test is alerting), Datadog recommends enabling [renotification][5] on your Synthetic monitors.

## Monitor messages use cases

The following monitor message use cases are available for Synthetic Monitoring:

Pre-filled monitor messages
: Pre-filled monitor messages provide a structured starting point for Synthetic test alerts. Each message includes a standardized title, summary, and footer containing test metadata, making it easier to understand the alert at a glance.

Template variables
: Template variables let you inject test-specific data into monitor notifications dynamically. These variables pull from the `synthetics.attributes` object.

Advanced usage
: Advanced usage includes techniques for surfacing deeper test insights or structuring complex messages using handlebars templating.

Conditional alerting
: Conditional alerting allows you to change the content of a monitor notification based on specific test results or failure conditions.

For more information, see the [Synthetic Monitoring enhanced monitor messages and notifications][9] guide.

## Tailor monitor notifications

Depending on your incident management strategy, you may want to involve multiple teams when a Synthetic test alerts. To notify Team B only on subsequent alerts after the first alert, surround the notification to Team B with `{{#is_renotify}}` and `{{/is_renotify}`. Use [conditional variables][3] to further characterize the notification message based on monitor attributes. 

{{< img src="synthetics/guide/synthetics_test_monitors/renotification_toggle_2.png" alt="Select the amount of time for the alerting monitor to renotify" style="width:90%;">}}

To enable the alerting monitor to renotify, click the toggle **Enable renotification**, then select a time option from the dropdown menu `If this monitor stays in alert status renotify every`.

## Integrate your Synthetic test monitor with Statuspage

If you use [Atlassian Statuspage][6] for visibility into your applications' and services' uptime, you can update the status of your systems with Synthetic test monitor notifications.

{{< img src="synthetics/guide/synthetics_test_monitors/statuspage_monitor_setup.png" alt="Add a Statuspage email address and status to the monitor name in your Synthetic test" style="width:95%;">}}

1. See the [Statuspage documentation][7] to generate a component-specific email address.
2. Add the generated email address into your test's notification message. For example, `@custom-statuspage-email@notifications.statuspage.io`.
3. Customize the monitor name to return `UP` or `DOWN` depending on the test state. For example, `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`.
4. Fill out the monitor notification section and add a summary in the monitor name. For example, `Shopist Checkout Functionality`.
5. Once you have configured your monitor, click **Save & Exit**.

For more information, see [Integrating Monitors with Statuspage][8].


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/metric/
[2]: /monitors/manage/
[3]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: /monitors/notify/#integrations/
[5]: /monitors/notify/#renotify
[6]: https://support.atlassian.com/statuspage/
[7]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[8]: /monitors/guide/integrate-monitors-with-statuspage/
[9]: /monitors/types/synthetic_monitoring/
