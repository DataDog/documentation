---
title: Create Monitor
kind: documentation
autotocdepth: 2
hideguides: true
customnav: monitornav
---

## Overview

Monitoring all of your infrastructure in one place wouldn't be complete without
the ability to know when critical changes are occurring. Datadog gives you the
ability to create monitors that will actively check metrics, integration
availability, network endpoints, and more.

Once a monitor is created, you will be notified when its conditions are met.
You can notify team members via email, 3rd party services (e.g. Pagerduty or
Hipchat) or other custom endpoints via webhooks.

Triggered monitors will appear in the event stream, allowing collaboration around active issues in your applications or infrastructure. Datadog provides a high-level view of open issues on the [Triggered Monitors](https://app.datadoghq.com/monitors/triggered) page as well as general monitor management on the [Manage Monitors](https://app.datadoghq.com/monitors) page.

### Glossary

Here is a quick overview of the different terms used:

- **Status**: Each check run submits a status of OK, WARNING or CRITICAL.
- **Check**: Emits one or more statuses.
- **Monitor**: Sends notifications based on a sequence of check statuses, metric
  threshold or other alerting conditions.
- **Monitor type**: host-, metric-, integration-, process-, network-, event-based, and custom. See side navigation to drill into a specific type.
- **Tags**: Configurable labels that can be applied to each metric and host. See the [Tagging](/guides/tagging) page for more details.

## Creating a Monitor

Navigate to the [Create Monitors](https://app.datadoghq.com/monitors#/create)
page by hovering over **Monitors** in the main menu and clicking **New Monitor** in the sub-menu (depending on your chosen theme and screen resolution, the main menu may be at the top or on the left). You will be presented with a list of monitor types on the left. See the [Monitoring Reference](/monitors/monitor_types) to learn more about all monitor types.

{{< img src="monitors/index/nav.png" >}}

## Export your monitor

You can export the configuration JSON for a monitor right from the create screen. 

If you manage and deploy monitors programmatically, it's easier to define the monitor in the UI and export the JSON right away:

{{< img src="monitors/index/export_monitor_json.jpg" alt="export monitor" >}}

## What's next ? 

* [Learn how to create a monitor](/monitors/monitor_types)
* [Configure your monitor notifications](/monitors/notifications)
* [Manage your monitors](/monitors/manage_monitor)
* [Schedule a dowtime to mute a monitor](/monitors/downtimes)
* [See all your checks into one place](/monitors/check_summary)
* [Consult our FAQ](/monitors/faq)