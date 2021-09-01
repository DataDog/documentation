---
title: How does Datadog render graphs? My graph doesn't show the values I'm expecting.
kind: faq
aliases:
    - /graphing/faq/how-does-datadog-render-graphs-my-graph-doesn-t-show-the-values-i-m-expecting
---

This article aims at quickly presenting you Datadog's method to render graphs so that you have a better idea how to choose your graph settings.

You may find more information in the full guide article [From the query to the graph][1].

Here are all parameters for a graph query, as displayed in the JSON tab of the Timeboard graph editor:

query_parameter

Metric: the metric you want to graph

1. Scope: which data the system should take into account to render your graph. Useful if different hosts are reporting the same metric or/and if the metric is submitted with different tags

2. Time-aggregation: this parameter is optional, for most graphs, you don't need it. By default the system aggregates by average.

* [In-depth explanation about time-aggregation][2].
* [How to set up your parameters with the rollup function][3]

3. Space-aggregation: After time-aggregation has been performed, Datadog combines these different source in a unique timeseries that is displayed as a graph. By default for each time, Datadog averages values across several sources, but it can also take the min/max/sum.

4. Functions: this parameter is optional, if you have specified functions they would apply. [Check the available functions][1].

You can also use arithmetic on queries.

[1]: /dashboards/functions/
[2]: /dashboards/faq/what-is-the-granularity-of-my-graphs-am-i-seeing-raw-data-or-aggregates-on-my-graph/
[3]: /dashboards/functions/rollup/
