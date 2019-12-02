---
title: Metrics Explorer
kind: documentation
description: "Explore all of your metrics and perform analytics."
further_reading:
  - link: "graphing/metrics/summary"
    tag: "Documentation"
    text: "Metrics Summary"
  - link: "graphing/metrics/distributions"
    tag: "Documentation"
    text: "Metrics Distributions"
---

## Overview

The [Metrics Explorer][1] is a basic interface for examining metrics you send to Datadog. For more advanced options, create a [Notebook][2], [Screenboard][3], or [Timeboard][4].

## Graphing

Click on the **Graph** text box to see a list of metrics you are sending to Datadog. Search the list by typing in the text box. Select a metric to populate a real-time graph visualizations on the right side. Each metric you select creates a separate graph.

{{< img src="graphing/metrics/explorer/explorer.png" alt="Metrics Explorer" responsive="true" style="width:60%;" >}}

Control time-frame and graph size.d

### Scope

"Over" allows you to narrow your results by tag. Under "One graph per", you can choose to split a metric into multiple graphs by host, container, region, team, and more.

{{< img src="graphing/metrics/explorer/split-by-team.png" alt="Split By Team" responsive="true" style="width:60%;">}}

### Grouping

"One graph per"

### Space aggregation

"On each graph, aggregate with the"

### Options

By default, up to 20 graphs are shown. You can change this number by clicking on the "Options" gear.

### Export

You can also export these graphs to new and existing timeboards.

Individual graphs or all graphs.

### Snapshot

An individual graph

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /graphing/notebooks
[3]: /graphing/dashboards/screenboard
[4]: /graphing/dashboards/timeboard
