---
title: Getting Started with Monitors
kind: documentation
aliases:
  - /getting_started/application/monitors
further_reading:
- link: "https://www.datadoghq.com/blog/monitoring-101-alerting/"
  tag: "Blog"
  text: "Monitoring 101: Alerting on what matters"
- link: "/monitors/create/types/metric/"
  tag: "Documentation"
  text: "Metric Monitors"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor Notifications"
---

## Overview

A [metric monitor][1] provides alerts and notifications if a specific metric is above or below a certain threshold. This page provides instructions for setting up a metric monitor to alert on low disk space.

## Prerequisites

Before getting started, you need a [Datadog account][2] linked to a host with the [Datadog Agent][3] installed. To verify, check your [Infrastructure List][4] in Datadog.

## Setup

To create a [metric monitor][5] in Datadog, use the main navigation: *Monitors --> New Monitor --> Metric*.

### Choose the detection method

When you create a metric monitor, **Threshold Alert** is automatically selected as the detection method. A threshold alert compares metric values against user-defined thresholds. The goal for this monitor is to alert on a static threshold, so no change is necessary.

### Define the metric

To get an alert on low disk space, use the `system.disk.in_use` metric from the [Disk integration][6] and average the metric over `host` and `device`:

{{< img src="getting_started/application/metric_query.png" alt="alert setup"  >}}

After this is set, the monitor automatically updates to a `Multi Alert` that triggers a separate alert for each `host`, `device` reporting your metric.

### Set alert conditions

According to the [Disk integration documentation][6], `system.disk.in_use` is *the amount of disk space in use as a fraction of the total*. So, when this metric is reporting a value of `0.7`, the device is 70% full.

To alert on low disk space, the monitor should trigger when the metric is `above` the threshold. The threshold values are based on your preference. For this metric, values between `0` and `1` are appropriate:

{{< img src="getting_started/application/alert_thresholds.png" alt="alert setup"  >}}

For this example, the other settings in this section are left on the defaults. For more details, see the [Metric Monitors][7] documentation.

### Say what's happening

Before a monitor can be saved, it must have a title and message.

#### Title

The title must be unique for each monitor. Since this is a multi alert monitor, names are available for each group element (`host` and `device`) with message template variables:
```text
Disk space is low on {{device.name}} / {{host.name}}
```

#### Message

Use the message to tell your team how to resolve the issue, for example:
```text
Steps to free up disk space:
1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files
```

For different messages based on alert vs. warning thresholds, see the [Notification][8] documentation.

### Notify your team

Use this section to send notifications to your team through Email, Slack, PagerDuty, etc. You can search for team members and connected accounts with the drop-down box. When an `@notification` is added to this box, the notification is automatically added to the message box:

{{< img src="getting_started/application/message_notify.png" alt="Message and Notifications" style="width:70%;" >}}

Removing the `@notification` from either section removes it from both sections.

### Permissions

{{< img src="getting_started/monitors/monitor_rbac_restricted.jpg" alt="RBAC Restricted Monitor" style="width:90%;" >}}

Use this option to restrict the editing of your monitor to its creator and to specific roles in your org. For more information about roles, see [Role Based Access Control][9].

## View Monitors and Triage Alerts on Mobile

You can view Monitor Saved Views from your mobile home screen or view and mute monitors by downloading the [Datadog Mobile App][10], available on the [Apple App Store][11] and [Google Play Store][12]. This helps with triaging when you are away from your laptop or desktop.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Incidents on Mobile App">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/create/types/metric/
[2]: https://www.datadoghq.com
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors#create/metric
[6]: /integrations/disk/
[7]: /monitors/create/types/metric/?tab=threshold#set-alert-conditions
[8]: /monitors/notify/#conditional-variables
[9]: /account_management/rbac/
[10]: /mobile/
[11]: https://apps.apple.com/app/datadog/id1391380318
[12]: https://play.google.com/store/apps/details?id=com.datadog.app
