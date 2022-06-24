---
title: Log Stream Widget
kind: documentation
description: "Display a filtered log stream in your Datadog dashboards."
aliases:
    - /graphing/widgets/log_stream/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

The Log Stream displays a log flow matching the defined query:

{{< img src="dashboards/widgets/log_stream/log_stream.png" alt="Log stream" >}}

## Setup

### Configuration

1. Enter a [search query][1] to filter the log stream.
2. Update the columns to display the values of your [facets][2] and [measures][2].
3. Give your graph a title or leave the box blank for the suggested title.

{{< img src="dashboards/widgets/log_stream/log_stream_setup.png" alt="Log stream setup" style="width:90%;">}}

## API

This widget can be used with the **Dashboards API**. See [Dashboards API][3] for more details.

The [widget JSON schema definition][4] for the log stream widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search/
[2]: /logs/explorer/facets/
[3]: /api/v1/dashboards/
[4]: /dashboards/graphing_json/widget_json/
