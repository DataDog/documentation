---
title: Log Stream Widget
kind: documentation
description: "Display a filtered log stream in your Datadog dashboards."
aliases:
    - /graphing/widgets/log_stream/
further_reading:
- link: "/dashboards/screenboards/"
  tag: "Documentation"
  text: "Screenboard"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The Log Stream displays a log flow matching the defined query:

{{< img src="dashboards/widgets/log_stream/log_stream.png" alt="Log stream" >}}

## Setup

### Configuration

{{< img src="dashboards/widgets/log_stream/log_stream_setup.gif" alt="Log stream setup" style="width:80%;">}}

Enter a [log query][1] to filter the log stream.

### Options

#### Columns

Display values of your [facets][2] and [measures][2] with columns.

#### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title" style="width:80%;">}}

Optionally define its size and alignment.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][3] for additional reference.

The dedicated [widget JSON schema definition][4] for the log stream widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search/
[2]: /logs/explorer/facets/
[3]: /api/v1/dashboards/
[4]: /dashboards/graphing_json/widget_json/
