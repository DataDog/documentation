---
title: Getting Started with Monitors
aliases:
  - /getting_started/application/monitors
further_reading:
- link: "https://www.datadoghq.com/blog/monitoring-101-alerting/"
  tag: "Blog"
  text: "Monitoring 101: Alerting on what matters"
- link: "https://learn.datadoghq.com/courses/introduction-to-observability"
  tag: "Learning Center"
  text: "Introduction to Observability"
- link: "/monitors/types/metric/"
  tag: "Documentation"
  text: "Metric Monitors"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor Notifications"
- link: "https://dtdg.co/fe"
  tag: "Foundation Enablement"
  text: "Join an interactive session on creating effective monitors"
---

## Overview

With Datadog alerting, you have the ability to create monitors that actively check metrics, integration availability, network endpoints, and more. Use monitors to draw attention to the systems that require observation, inspection, and intervention.

This page is an introduction to monitors and outlines instructions for setting up a metric monitor. A [metric monitor][1] provides alerts and notifications if a specific metric is above or below a certain threshold. For example, a metric monitor can alert you when disk space is low. 

This guide covers:
- Monitor creation and configuration
- Setting up monitor alerts
- Customizing notification messages
- Monitor permissions

## Prerequisites

Before getting started, you need a Datadog account linked to a host with the Datadog Agent installed. To learn more about the Agent, see the [Getting started with the Agent guide][2], or navigate to **[Integrations > Agent][3]** to view installation instructions.

To verify that the Datadog Agent is running, check that your [Infrastructure List][4] in Datadog is populated.

## Create a monitor

To create a monitor, navigate to **[Monitors > New Monitor][5]** and select **Metric**.

## Configure

The main components of monitor configuration are:

- **Choose the detection method**: How are you measuring what will be alerted on? Are you concerned about a metric value crossing a threshold, a change in a value crossing a threshold, an anomalous value, or something else?
- **Define the metric**: What value are you monitoring to alert? The disk space in your system? The number of errors encountered for logins?
- **Set the alert conditions**: When does an engineer need to be woken up? 
- **Configure notifications and automations**: What information needs to be in the alert?
- **Define permissions and audit notifications**: Who has access to these alerts, and who should be notified if the alert is modified?

### Choose the detection method

When you create a metric monitor, **Threshold Alert** is automatically selected as the detection method. A threshold alert compares metric values against user-defined thresholds. The goal for this monitor is to alert on a static threshold, so no change is necessary.

### Define the metric

To get an alert on low disk space, use the `system.disk.in_use` metric from the [Disk integration][6] and average the metric over `host` and `device`:

{{< img src="getting_started/monitors/monitor_query.png" alt="Define the metric for system.disk.in_use avg by host and device" style="width:100%" >}}

### Set alert conditions

According to the [Disk integration documentation][6], `system.disk.in_use` is *the amount of disk space in use as a fraction of the total*. So, when this metric is reporting a value of `0.7`, the device is 70% full.

To alert on low disk space, the monitor should trigger when the metric is `above` the threshold. The threshold values are based on your preference. For this metric, values between `0` and `1` are appropriate:

Set the following thresholds:
```
Alert threshold: > 0.9
Warning threshold: > 0.8
```

For this example, leave the other settings in this section on the defaults. For more details, see the [Metric Monitors][7] documentation.

{{< img src="getting_started/monitors/monitor_alerting_conditions.png" alt="Set the alert and warning thresholds for the monitor to trigger alerts" style="width:80%" >}}

### Notifications and automations

When this monitor is triggered to alert, a notification message is sent. In this message, you can include conditional values, instructions for resolution, or a summary of what the alert is. At a minimum, a notification must have a title and message.

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

To add conditional messages based on alert vs. warning thresholds, see the available [Notification Variables][8] you can include in your message.

#### Notify your services and your team members

Send notifications to your team through email, Slack, PagerDuty, and more. You can search for team members and connected accounts with the dropdown box. 

{{< img src="getting_started/monitors/monitor_notification.png" alt="Add a monitor message and automations to your alert notification" style="width:100%;" >}}

To add a workflow from [Workflow Automation][14] or a case from [Case Management][15] to the alert notification, click **Add Workflow** or **Add Case**. You can also tag [Datadog Team][16] members by using the `@team` handle.

Leave the other sections as-is. For more information on what each configuration option does, see the [Monitor configuration][9] documentation.

### Permissions

Click **Edit Access** to restrict the editing of your monitor to its creator and to specific roles in your org. Optionally, select `Notify` to be alerted when the monitor is modified.

{{< img src="getting_started/monitors/monitor_permissions.png" alt="Set access permissions for a monitor and options for audit notifications" style="width:80%;" >}}

For more information about roles, see [Role Based Access Control][10].

## View Monitors and Triage Alerts on Mobile

You can view Monitor Saved Views from your mobile home screen or view and mute monitors by downloading the [Datadog Mobile App][11], available on the [Apple App Store][12] and [Google Play Store][13]. This helps with triaging when you are away from your laptop or desktop.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Incidents on Mobile App">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/metric/
[2]: /getting_started/agent/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors#create/metric
[6]: /integrations/disk/
[7]: /monitors/types/metric/?tab=threshold#set-alert-conditions
[8]: /monitors/notify/variables/
[9]: /monitors/configuration/?tab=thresholdalert#alert-grouping
[10]: /account_management/rbac/
[11]: /service_management/mobile/
[12]: https://apps.apple.com/app/datadog/id1391380318
[13]: https://play.google.com/store/apps/details?id=com.datadog.app
[14]: /service_management/workflows/
[15]: /service_management/case_management/
[16]: /account_management/teams/