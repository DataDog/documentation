---
title: Top List Widget
kind: documentation
widget_type: "toplist"
aliases:
    - /graphing/widgets/top_list/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/notebooks/"
  tag: "Documentation"
  text: "Notebooks"
---

The top list visualization enables you to display a list of Tag values like `hostname` or `service` with the most or least of any metric value, such as highest consumers of CPU, hosts with the least disk space, etc:

{{< img src="dashboards/widgets/toplist/toplist.png" alt="Top List" >}}

## Setup

{{< img src="dashboards/widgets/toplist/toplist_setup.png" alt="Top List" style="width:80%;">}}

### Configuration

1. Choose the data to graph:
    * Metric: See the [querying][1] documentation to configure a metric query.
    * Indexed Spans: See the [Trace search documentation][2] to configure an Indexed Span query.
    * Log Events: See the [Log search documentation][3] to configure a log event query.

2. Optional: configure conditional formatting depending on your entries' values.

### Options

#### Global time

On screenboards and notebooks, choose whether your widget has a custom timeframe or uses the global timeframe.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title" style="width:80%;">}}

Optionally define its size and alignment.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][4] for additional reference.

The dedicated [widget JSON schema definition][5] for the top list widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/querying/
[2]: /tracing/app_analytics/search/#search-bar
[3]: /logs/search_syntax/
[4]: /api/v1/dashboards/
[5]: /dashboards/graphing_json/widget_json/
