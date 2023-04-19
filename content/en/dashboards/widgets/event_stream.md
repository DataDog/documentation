---
title: Event Stream Widget
kind: documentation
description: "Display filtered events from the Event Stream."
aliases:
    - /graphing/widgets/event_stream/
further_reading:
- link: "/events/explorer/"
  tag: "Documentation"
  text: "Events Explorer"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/dashboards/graphing_json/widget_json/"
  tag: "Documentation"
  text: "Widget JSON schema"
- link: "/dashboards/graphing_json/request_json/"
  tag: "Documentation"
  text: "Request JSON schema"
---

The event stream is a widget version of the stream of events on the [Event Explorer view][1].

**Note:** This widget displays only the 100 most recent events.

## Setup

### Configuration

1. Enter a [search query][2] to filter the event stream.
1. Use the size parameter to choose to display either only the events title or the full event body.
1. Choose whether your widget has a custom time frame or the global time frame.
1. Give the graph a title.

## API

This widget can be used with the [Dashboards API][3].

The dedicated [widget JSON schema definition][4] for the event stream widget follows:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /events/
[2]: /events/explorer/#search-syntax
[3]: /api/latest/dashboards/
[4]: /dashboards/graphing_json/widget_json/
