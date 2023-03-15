---
title: Event Timeline Widget
kind: documentation
description: "Display your Event Stream Timeline in a widget."
aliases:
    - /graphing/widgets/event_timeline/
further_reading:
- link: "/events/explorer/"
  tag: "Documentation"
- link: "/dashboards/widgets/event_stream/"
  tag: "Documentation"
  text: "Event Stream Widget"
  text: "Events Explorer"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"


---

The event timeline is a widget version of the timeline that appears at the top of the [Event Explorer view][1]:

{{< img src="dashboards/widgets/event_timeline/event_timeline_example.png" alt="Event timeline of Error status events over the last 2 days" >}}

## Setup

### Configuration

1. Enter a [search query][1] to filter the event stream.
2. Choose whether your widget has a custom timeframe or the dashboard's global timeframe.

## API

This widget can be used with the [Dashboards API][2].

The dedicated [widget JSON schema definition][3] for the event timeline widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /events/
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
