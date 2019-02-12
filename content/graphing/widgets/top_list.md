---
title: Top List Widget
kind: documentation
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
---

The top list visualization is perfect when you want to see the list of hosts with the most or least of any metric value, such as highest consumers of CPU, hosts with the least disk space, etc: 

{{< img src="graphing/widgets/toplist/toplist.png" alt="Top List" responsive="true">}}

## Setup

{{< img src="graphing/widgets/toplist/toplist_setup.png" alt="Top List" responsive="true" style="width:80%;">}}

### Configuration

1. Choose the data to graph:
    * Metric: See [the main graphing documentation][1] to configure a metric query.
    * APM Events: See [the trace search documentation][2] to configure an APM event query.
    * Log Events: See [the log search documentation][3] to configure an APM event query.

2. Optional - Configure a conditional formating depending of your entries values.

### Options
#### Global time

On Screenboard only, choose whether or not your widget has a custom timeframe or the global timeframe of the Screenboard.

#### Title

Display a custom title for you widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## API

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /graphing
[2]: /tracing/visualization/search/#search-bar
[3]: https://docs.datadoghq.com/logs/explorer/search/#search-syntax
