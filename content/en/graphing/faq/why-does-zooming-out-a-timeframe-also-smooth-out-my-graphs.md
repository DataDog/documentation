---
title: Why does zooming out a timeframe also smooth out my graphs?
kind: faq
disable_toc: true
further_reading:
- link: "/developers/metrics/types/"
  tag: "Documentation"
  text: "Discover Datadog metrics types"
- link: "/graphing/functions/rollup/"
  tag: "Documentation"
  text: "Learn more about the rollup function"
---

Within Datadog, a graph can only contain a set number of points and, as the timeframe over which a metric is viewed increases, aggregation between points occurs to stay below that set number. Thus you lose in granularity as you increase the timeframe. For instance, for a 4-hour time window, data is aggregated to have one value per minute. As you "zoom out" (i.e. select a larger timeframe) the data shown on the graph will represent larger time period.

You can manuall append the `.rollup()` function to your query to adjust the method and granularity of time aggregation. Datadog rolls up data points automatically by default, averaging values in the rollup interval for `GAUGE` metric type, for `RATE` and `COUNT` metric types the behaviour differs and values are summed without any interpollation, learn more with the documentation about [in-application metric types modifiers][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /developers/metrics/type_modifiers
