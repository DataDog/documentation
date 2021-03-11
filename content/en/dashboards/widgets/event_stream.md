---
title: Event Stream Widget
kind: documentation
description: "Display filtered events from the Even Stream."
aliases:
    - /graphing/widgets/event_stream/
further_reading:
- link: "/dashboards/screenboards/"
  tag: "Documentation"
  text: "Screenboard"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

{{< site-region region="us" >}}

The event stream is a widget version of the stream of events on the [Event Stream view][1].

Note: **this widget displays only the 100 most recent events**.

{{< img src="dashboards/widgets/event_stream/event_stream.png" alt="event stream" >}}

## Setup

{{< img src="dashboards/widgets/event_stream/event_stream_setup.png" alt="event stream setup"  style="width:80%;">}}

### Configuration

1. Enter a [search query][1] to filter the event stream.
2. On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.
3. Use the size parameter to choose to display either only the events title or the full event body.

### Options

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

Optionally define its size and alignment.

## API

This widget can be used with the **Dashboards API**. Refer to the [Dashboards API][2] documentation for additional reference.

The dedicated [widget JSON schema definition][3] for the event stream widget is:

[1]: /events/
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
[4]: /events/#event-explorer

{{< /site-region >}}

{{< site-region region="eu" >}}

The event stream is a widget version of the stream of events on the [Event Stream view][1].

Note: **this widget displays only the 100 most recent events**.

{{< img src="dashboards/widgets/event_stream/event_stream.png" alt="event stream" >}}

## Setup

{{< img src="dashboards/widgets/event_stream/event_stream_setup.png" alt="event stream setup"  style="width:80%;">}}

### Configuration

1. Enter a [search query][1] to filter the event stream.
2. On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.
3. Use the size parameter to choose to display either only the events title or the full event body.

### Options

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

Optionally define its size and alignment.

## API

This widget can be used with the **Dashboards API**. Refer to the [Dashboards API][2] documentation for additional reference.

The dedicated [widget JSON schema definition][3] for the event stream widget is:

[1]: /events/
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
[4]: /events/#event-explorer

{{< /site-region >}}

{{< site-region region="gov" >}}

The event stream is a widget version of the stream of events on the [Event Explorer view][4].

## Setup

### Configuration

1. Enter a [search query][4] to filter the event stream.
2. On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.
3. Use the size parameter to choose to display either only the events title or the full event body.

### Options

#### Title

Display a custom title for your widget by activating the `Show a Title` check box.

Optionally define its size and alignment.

## API

This widget can be used with the **Dashboards API**. Refer to the [Dashboards API][2] documentation for additional reference.

The dedicated [widget JSON schema definition][3] for the event stream widget is:

[1]: /events/
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
[4]: /events/#event-explorer

{{< /site-region >}}

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /events/
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
[4]: /events/#event-explorer
