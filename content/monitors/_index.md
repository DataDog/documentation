---
title: Alerting
kind: documentation
aliases:
    - /guides/monitors/
    - /guides/monitoring/
    - /guides/alerting/
description: Create & manage your notifications
---

## Overview

Monitoring all of your infrastructure in one place wouldn't be complete without
the ability to know when critical changes are occurring. Datadog gives you the
ability to create monitors that actively check metrics, integration
availability, network endpoints, and more.

Once a monitor is created, you are notified when its conditions are met.
You can notify team members via email, 3rd party services (e.g. Pagerduty or
Hipchat) or other custom endpoints via Webhooks.

Triggered monitors appear in the [event stream](/graphing/event_stream/), allowing collaboration around active issues in your applications or infrastructure. Datadog provides a high-level view of open issues on the [Triggered Monitors](https://app.datadoghq.com/monitors/triggered) page as well as general monitor management on the [Manage Monitors](https://app.datadoghq.com/monitors) page.

Monitors can be managed programmatically, refer to the [Datadog API docs](/api/#monitors) for detailed information on managing monitors through the API using the available [libraries](/developers/libraries) or cURL.

In this section you can:

* [Learn how to create a monitor](/monitors/monitor_types)
* [Configure your monitor notifications](/monitors/notifications)
* [Manage your monitors](/monitors/manage_monitor)
* [Schedule a downtime to mute a monitor](/monitors/downtimes)
* [See all your checks into one place](/monitors/check_summary)
* [Consult our FAQ](/monitors/faq)

### Glossary

Here is a quick overview of the different terms used:

- **Status**: Each check run submits a status of OK, WARNING or CRITICAL.
- **Check**: Emits one or more statuses.
- **Monitor**: Sends notifications based on a sequence of check statuses, metric
  threshold or other alerting conditions.
- **Monitor type**: host-, metric-, integration-, process-, network-, event-based, and custom. See side navigation to drill into a specific type.
- **Tags**: Configurable labels that can be applied to each metric and host. See the [Tagging](/agent/tagging) page for more details.

## Creating a Monitor

Navigate to the [Create Monitors](https://app.datadoghq.com/monitors#/create)
page by hovering over **Monitors** in the main menu and clicking **New Monitor** in the sub-menu (depending on your chosen theme and screen resolution, the main menu may be at the top or on the left). You are presented with a list of monitor types on the left. See the [Monitoring Reference](/monitors/monitor_types) to learn more about all monitor types.

{{< img src="monitors/index/nav.png" alt="navigation" responsive="true" popup="true">}}

## Export your monitor

You can export the configuration JSON for a monitor right from the create screen.

If you manage and deploy monitors programmatically, it's easier to define the monitor in the UI and export the JSON right away:

{{< img src="monitors/index/export_monitor_json.jpg" alt="export monitor" responsive="true" popup="true" >}}

## Auditing Monitors

Any changes to monitors creates an event in the [event stream](/graphing/event_stream) that explains the change and shows the user that made the actual change.

Assuming you've made changes to your Monitors, you can see examples with the following event search:
```
https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all
```

We also provide you with the ability to be notified on changes to a monitor you create. At the bottom of the Monitor Editor there's an option to notify alert recipients for all changes to the monitor:

{{< img src="monitors/index/Monitor_Change_notifications.png" alt="Monitor_Change_notifications" responsive="true" popup="true">}}

Setting the above to **Notify** send an email for the monitor audit events to all people who are alerted in a specific monitor.

## Manually resolve your monitor

It only makes sense in a couple cases to manually resolve your monitor:

* If the monitor is in a "no data" state then resolving it hides it from the triggered monitors page.
* If the monitor is in the triggered state but has stopped reporting data then
resolving it hides it from the triggered monitors page.

Otherwise the monitor picks up the current state on the next evaluation. 

In other words, if the value is still above/below the configured threshold then the monitor may re-trigger upon the next evaluation (in about 60 seconds).

## Managing Monitors

There are multiple community projects for maintaining or managing Monitors along with some other Datadog components via the API's:

* https://github.com/trueaccord/DogPush
* https://github.com/winebarrel/barkdog
* https://github.com/airbnb/interferon
* https://github.com/rapid7/dogwatch
* https://www.terraform.io/docs/providers/datadog/r/monitor.html
