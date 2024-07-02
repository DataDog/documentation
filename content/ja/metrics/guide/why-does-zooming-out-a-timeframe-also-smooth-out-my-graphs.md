---
title: Why does zooming out a timeframe also smooth out my graphs?
further_reading:
- link: /metrics/types/
  tag: Documentation
  text: Discover Datadog metrics types
- link: /dashboards/functions/rollup/
  tag: Documentation
  text: Learn more about the rollup function
aliases:
    - /graphing/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs
    - /dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs
---

Within Datadog, a graph can only contain a set number of points and, as the timeframe over which a metric is viewed increases, aggregation between points occurs so that the number of points remains under that set number. Thus, granularity is lost as the timeframe increases. For instance, for a four hour time window, data is aggregated to have one value per minute for a line graph, and one value per two minutes for a bar graph. As you zoom out by selecting a larger timeframe, the data shown on the graph represents a longer time period.

{{< img src="metrics/guide/smooth_line.mp4" alt="Smoothing a line graph" video="true" width="90%" >}}

When bars are displayed the rollup interval is more obvious:

{{< img src="metrics/guide/smoothing.mp4" alt="Smoothing a bar graph" video="true" width="90%" >}}

You can manually append the `.rollup()` function to your query to adjust the method and granularity of time aggregation. Datadog rolls up data points automatically by default, averaging values in the rollup interval for `GAUGE`, `RATE` and `COUNT` metric types.

**Note**: If you query your metrics through the UI of a Datadog widget, an [in-application metric types modifier][1] is added automatically to your `RATE` and `COUNT` metric types. This changes the `.rollup()` behavior: values are summed without any interpolation.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/custom_metrics/type_modifiers/
