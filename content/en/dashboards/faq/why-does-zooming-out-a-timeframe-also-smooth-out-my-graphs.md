---
title: Why does zooming out a timeframe also smooth out my graphs?
kind: faq
aliases:
    - /graphing/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs
---
Within Datadog, a graph can only contain a set number of points and, as the timeframe over which a metric is viewed increases, aggregation between points occurs to stay below that set number. Thus you will lose in granularity as you increase the timeframe. For instance, for a 4-hour time window, data is aggregated to have one value per minute. As you "zoom out" (i.e. select a larger timeframe) the data shown on the graph will represent larger time period.

You can append the [`.rollup()` function][1] to your query to adjust the method and granularity of time aggregation. Datadog rolls up data points automatically, based on the in-app metric type: `gauge` metrics are averaged, whereas `count` and `rate` metrics are summed. If you wanted to aggregate the sum of the metric over a one day period, you could append .rollup(sum, 86400) to your query. If you want to keep an eye on the max values, you may use the maximum aggregation .rollup(max).

Here is a bar graph displaying a week's worth of cpu usage for a host without using the .rollup() function:

{{< img src="graphing/faq/smooth_1.png" alt="smooth_1" responsive="true" >}}

And here is the same metric, graphed using a day-long rollup with .rollup(86400):

{{< img src="graphing/faq/smooth_2.png" alt="smooth_2" responsive="true" >}}

[See here][2] for more detailed information about the .rollup() function.

[1]: /graphing/functions/rollup
[2]: /graphing/miscellaneous/functions
