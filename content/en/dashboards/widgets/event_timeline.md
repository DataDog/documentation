---
title: Event Timeline Widget
kind: documentation
description: "Display your Event Stream Timeline in a widget."
aliases:
    - /graphing/widgets/event_timeline/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

The event timeline is a widget version of the timeline that appears at the top of the [Event Stream view][1]:

{{< img src="dashboards/widgets/event_timeline/event_timeline.png" alt="Event timeline example"  >}}

## Setup

{{< img src="dashboards/widgets/event_timeline/event_timeline_setup.png" alt="Event timeline example" style="width:80%;">}}

### Configuration

1. Enter a [search query][1] to filter the event stream.
2. On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

### Options

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title" style="width:80%;">}}

Optionally define its size and alignment.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][2] for additional reference.

The dedicated [widget JSON schema definition][3] for the event timeline widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /events/
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
