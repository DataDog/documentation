---
title: Event Monitor
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
  text: "Check your monitor status"
---

## Overview

Event monitors allow you to alert on events matching a search query.

## Monitor creation

To create a [event monitor][1] in Datadog, use the main navigation: *Monitors --> New Monitor --> Event*.

### Select events to count

As you fill in the parameters below, the list of events above the search fields is filtered.

* Match events containing `<TEXT>`
* with status `error`, `warning`, `info`, or `success`
* and priority `all`, `normal`, or `low`
* from `<SOURCE>`
* over `<TAGS>`
* exclude `<TAGS>`

Choose your alert grouping:

* **Simple alert** aggregates all reporting sources. You receive one alert when the aggregated value meets the set conditions.
* **Multi alert** applies the alert to each source according to your group parameters. You receive an alert for each group that meets the set conditions.

### Set alert conditions

* The count was `above`, `above or equal to`, `below`, or `below or equal to`
* `<THRESHOLD_NUMBER>`
* during the last `5 minutes`, `15 minutes`, `1 hour`, etc.

**Note**: Some providers introduce a significant delay between when an event is **posted**, and when the event is initiated. In this case, Datadog back-dates the event to the time of occurrence, which could place an incoming event outside the current monitor evaluation window. Widening your evaluation window can help account for the time difference.  If you need help adjusting your monitor settings appropriately, reach out to [Datadog Support][2].

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][3] page.

#### Event template variables

Event monitors have specific template variables you can include in the notification message:

| Template variable          | Definition                                                                     |
|----------------------------|--------------------------------------------------------------------------------|
| `{{event.id}}`             | The ID of the event.                                                           |
| `{{event.title}}`          | The title of the event.                                                        |
| `{{event.text}}`           | The text of the event.                                                         |
| `{{event.host.name}}`      | The name of the host that generated the event.                                 |
| `{{event.tags}}`           | A list of tags attached to the event.                                          |
| `{{event.tags.<TAG_KEY>}}` | The value for a specific tag key attached to the event. See the example below. |

##### {{event.tags.&lt;TAG_KEY&gt;}}

For the tags `env:test`, `env:staging`, and `env:prod`:

* `env` is the tag key.
* `test`, `staging`, and `prod` are the tag values.

The template variable is `{{event.tags.env}}`. The result of using this template variable is `test`, `staging`, or `prod`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/event
[2]: /help
[3]: /monitors/notifications
