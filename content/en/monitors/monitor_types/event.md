---
title: Event monitor
kind: documentation
description: "Monitor events gathered by Datadog"
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: "Consult your monitor status"
---

## Overview

Event monitors allows you to alert when an event matching your query occurs.

1. Select the query and parameters (status, priority, sources and tags) you want to monitor:
    {{< img src="monitors/monitor_types/event/event_monitor_selection.png" alt="event monitor selection" responsive="true" style="width:80%;">}}
2. Select the alert grouping:
    {{< img src="monitors/monitor_types/event/event_alert_grouping.png" alt="event monitor alert grouping" responsive="true" style="width:80%;">}}

3. Select the **alerting conditions**. The **threshold value** and **timeframe** options allows you to set the number of occurrence of an event required during a timeframe before triggering the monitor.
    {{< img src="monitors/monitor_types/event/event_monitor_alert_conditions.png" alt="event monitor alert conditions" responsive="true" style="width:80%;">}}

    **Note**: Some providers introduce a significant delay between when an event is **posted**, and when the event actually happened. In this case, Datadog back-dates the event to the time of occurrence, which can lead to odd monitor evaluation behavior. If you observe such behavior, reach out to [Datadog Support][1].
4. Configure your **notification options**:
    Refer to the [Notifications][2] dedicated documentation page for informations.

## Using event tags in Event Monitors

In Event Monitors, you can use the tags sent with events to identify events and customize the actions and messages of the Monitor. First, define the search parameters for the full text event search. If you are looking for a specific tag, you can include this in the search as well. For example:

`My Example Event #example-tag`

{{< img src="monitors/monitor_types/event/define_event.png" alt="define_event" responsive="true" style="width:80%;">}}

## Using event template variables in notifications

Include event-specific information in your event monitor notifications. Available template variables:

| Template variable        | Definition                                                               |
|--------------------------|--------------------------------------------------------------------------|
| `{{event.id}}`           | ID of the event                                                          |
| `{{event.title}}`        | Title of the event                                                       |
| `{{event.text}}`         | Text of the event                                                        |
| `{{event.host.name}}`    | Hostname that generated the event                                        |
| `{{event.tags.tagname}}` | Tags attached to the event, replace `tagname` with the name of your tag. |

{{< img src="monitors/monitor_types/event/event_notification_template.png" alt="event_notification_template" responsive="true" style="width:60%;">}}

Use `event.tags` and `event.tags.tagname` to retrieve the values of your tags in Markdown. For example:

{{< img src="monitors/monitor_types/event/whats_happening.png" alt="whats_happening" responsive="true" style="width:60%;">}}

When your alert triggers, any matching events that are found in Datadog with the tags appear in the message:

{{< img src="monitors/monitor_types/event/triggered_event.png" alt="triggered_event" responsive="true" style="width:60%;">}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: /monitors/notifications
