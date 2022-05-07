---
title: Event Stream Widget
kind: documentation
description: "Display filtered events from the Even Stream."
aliases:
    - /graphing/widgets/event_stream/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

The event stream is a widget version of the stream of events on the [Event Explorer view][1].

**Note:** This widget displays only the 100 most recent events.

## Setup

### Configuration

1. Enter a [search query][2] to filter the event stream.
2. On screenboards only, choose whether your widget has a custom time frame or the screenboard's global time frame.
3. Use the size parameter to choose to display either only the events title or the full event body.
4. Give the graph a title.
5. Click the **Done** button.

## API

This widget can be used with the **Dashboards API**. See [Dashboards API][3] for additional reference.

The dedicated [widget JSON schema definition][4] for the event stream widget follows:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /events/
[2]: /events/explorer/#search-syntax
[3]: /api/latest/dashboards/
[4]: /dashboards/graphing_json/widget_json/
