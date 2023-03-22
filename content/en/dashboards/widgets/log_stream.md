---
title: Log Stream Widget
kind: documentation
description: "Display a filtered log stream in your Datadog dashboards."
aliases:
    - /graphing/widgets/log_stream/
further_reading:
- link: "/logs/explorer/analytics/"
  tag: "Documentation"
  text: "Log Analytics"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"

---

The Log Stream displays a log flow matching the defined query.

## Setup

{{< img src="/dashboards/widgets/log_stream/log_stream_config.png" alt="Log stream configuration filtered by source:nodejs with three columns for date, host, and service " style="width:100%;" >}}

### Configuration

1. Enter a [search query][1] to filter the log stream.
1. You can group logs into event subsets of [Log Analytics][2], which include `Patterns` and `Transactions`.
1. Update the columns to display the values of your [facets][3] and [measures][4].
1. Give your graph a title or leave the box blank for the suggested title.

## API

This widget can be used with the **Dashboards API**. See [Dashboards API][5] for more details.

The [widget JSON schema definition][6] for the log stream widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search/
[2]: /logs/explorer/analytics/
[3]: /logs/explorer/facets/
[4]: /logs/explorer/facets/#measures
[5]: /api/latest/dashboards/
[6]: /dashboards/graphing_json/widget_json/
