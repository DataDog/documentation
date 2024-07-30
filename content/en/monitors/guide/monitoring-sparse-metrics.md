---
title: Monitoring Sparse Metrics
further_reading:
- link: "/api/latest/monitors/#edit-a-monitor"
  tag: "Documentation"
  text: "Learn more about updating monitor settings through the API"
- link: "/dashboards/functions/interpolation/#default-zero"
  tag: "Documentation"
  text: "Learn more about interpolation"
---

## Overview

Monitors that report data infrequently, can have unexpected results and queries may not evaluate as intended. There are tools and behaviors that you can use to ensure a monitor's settings are appropriate for your data and expected evaluations. 

This guide covers the following ways of troubleshooting and configuring monitors with sparse data:
- [Determine if you have sparse metrics](#how-to-determine-whether-you-have-a-sparse-metric)
- Consider the source of your monitor -> [Metric-based monitor](#metric-based-monitor), [Event-based monitor](#event-based-monitor)
- [Is the monitor running on a schedule?](#schedule-based-monitoring)


## How to determine whether you have a sparse metric

You can use a dashboard widget, a notebook, or even an [existing monitor's history graph][1] and hover over the datapoints to see if the datapoints seem continuous, as opposed to straight lines filling the gaps between each point.

In a notebook, or widget, select the **Bars** display option to see the points of data and their frequency.

A metric displayed in a widget may look like this:

{{< img src="monitors/guide/sparse_metrics/line_graph_sparse.png" alt="Metric graph with Line graph display going up and down in straight lines" style="width:90%;" >}}

But when the **Bars** style is applied, it looks like this:

{{< img src="monitors/guide/sparse_metrics/bar_graph_sparse.png" alt="Same data as the Metric Line graph above, except with bars for each datapoint, highlighting gaps in between bars of sparse metrics" style="width:90%;" >}}

With the bar graph display, you can visualize the gaps between datapoints more clearly. 

If the graph editor does not have multiple options to change the graph style, you can apply the function `default_zero()` to the metric, which helps reveal the gaps in data. For more information on this function, see the [Interpolation][2] documentation.

## Metric-based monitor

Is this a [metric][3], [change][4], [anomaly][5], [forecast][6], or [outlier][7] monitor? Adjust the following settings:

* Under *Advanced options*, select **Do not require** a full window of data for evaluation.
* Is the data often delayed? Consider adding time (in seconds) to the monitor evaluation delay. Under *Advanced options* add a value to the **Delay monitor evaluation by X seconds** field.
* Adjust the evaluation (avg by, max by, min by, sum by) based on the expected frequency. The default evaluation is **avg by**, which may not be suited for sparse metrics.
* If you are using the **avg by** aggregator, consider adding an [interpolation function][2] like `default_zero()` to ensure the gaps in the metric are evaluated as zero.
* If you are using arithmetic in your query, take a look at [Monitor Arithmetic and Sparse Metrics][8] for some further guidance.

## Event-based monitor 

Is this a [log][9], [event][10], [audit trail][11], or [error tracking][12] monitor? Look at the following:

* Verify the "Missing data" setting corresponds to your expected monitor behavior: **Evaluate as zero**, **Show NO DATA**, **Show NO DATA and notify**, or **Show OK**
  {{< img src="monitors/guide/sparse_metrics/data_is_missing.png" alt="Selection options for missing data in the 'Set alert conditions' section of monitor configurations" style="width:80%;" >}}
* Adjust the evaluation period. If datapoints are expected to be available every 30 minutes, then the evaluation period should account for that.

## Schedule-based monitoring

Are you monitoring an event that needs to happen at certain times of the day, week, month? A CRON task such as a backup job or export? Consider using [Custom Schedules][13], which allow you to set RRULES to define when the monitor should evaluate and notify.

## Troubleshooting

[Reach out to the Datadog support team][14] if you have any questions regarding monitoring sparse data.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/manage/status/#investigate-a-monitor-in-a-notebook
[2]: /dashboards/functions/interpolation/#default-zero
[3]: /monitors/types/metric/?tab=threshold
[4]: /monitors/types/metric/?tab=change
[5]: /monitors/types/anomaly/
[6]: /monitors/types/forecasts/?tab=linear
[7]: /monitors/types/outlier/?tab=dbscan
[8]: /monitors/guide/monitor-arithmetic-and-sparse-metrics
[9]: /monitors/types/log/
[10]: /monitors/types/event/
[11]: /monitors/types/audit_trail/
[12]: /monitors/types/error_tracking/?tab=count
[13]: /monitors/guide/custom_schedules/?tab=day
[14]: /help/
