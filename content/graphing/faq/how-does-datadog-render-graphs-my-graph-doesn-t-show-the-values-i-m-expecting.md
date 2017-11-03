---
title: How does Datadog render graphs? My graph doesn't show the values I'm expecting.
kind: faq
customnav: graphingnav
---

This article aims at quickly presenting you Datadog's method to render graphs so that you have a better idea how to choose your graph settings.

You may find more information in the full guide article From the query to the graph: http://help.datadoghq.com/hc/en-us/articles/204820019

Here are all parameters for a graph query, as displayed in the JSON tab of the Timeboard graph editor:

query_parameter

Metric: the metric you want to graph

1. Scope: which data the system should take into account to render your graph. Useful if different hosts are reporting the same metric or/and if the metric is submitted with different tags

2. Time-aggregation: this parameter is optional, for most of your graphs you won't need it. By default the system aggregates by average.
In-depth explanation about time-aggregation: http://help.datadoghq.com/hc/en-us/articles/205597415
How to set up your parameters with the rollup function: http://help.datadoghq.com/hc/en-us/articles/204526615-What-is-the-rollup-function-

3. Space-aggregation: After time-aggregation has been performed, Datadog will combine these different source in a unique timeseries that will be displayed as a graph. By default for each time, Datadog averages values across several sources, but it can also take the min/max/sum.
More info here: http://help.datadoghq.com/hc/en-us/articles/204526575-What-does-the-sum-mean-in-front-of-the-metric-in-a-query-

4. Functions: this parameter is optional, if you have specified functions they will apply.
Check the available functions here: http://docs.datadoghq.com/graphing/#functions

You can also use arithmetic on queries.