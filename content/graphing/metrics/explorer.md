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

Use the [Metrics Explorer page][1] to begin examining the [metrics][2] collected from your application by Datadog.

Clicking into the "Graph" text box brings up a list of all the metrics that Datadog gathers from your application. You can also search the list by typing into the box. Selecting metrics populates real-time graph visualizations on the right hand side. By default, up to 20 graphs are shown. You can change this number by clicking on the "Options" gear.

{{< img src="graphing/metrics/explorer/explorer.png" alt="Metrics Explorer" responsive="true" style="width:60%;" >}}

"Over" allows you to narrow your results by tag. Under "One graph per", you can choose to split a metric into multiple graphs by host, container, region, team, and more.

{{< img src="graphing/metrics/explorer/split-by-team.png" alt="Split By Team" responsive="true" style="width:60%;">}}

You can also export these graphs to new and existing timeboards.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /developers/metrics
