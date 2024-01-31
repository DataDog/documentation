---
title: Monitoring Sparse Metrics
kind: guide
further_reading:
- link: "/api/latest/monitors/#edit-a-monitor"
  tag: "Documentation"
  text: "Learn more about updating monitor settings through the API"
- link: "/dashboards/functions/interpolation/#default-zero"
  tag: "Documentation"
  text: "Learn more about interpolation"
---

## Overview

When monitoring a metric that reports data infrequently, there are some tools and behaviors that should be considered to ensure a monitor's settings are appropriate for evaluating these queries as intended. 

## Source of the monitor

First, consider your source.

### Metric-based monitor

Is this a metric, change, anomaly, forecast or outlier monitor? Adjust the following settings:

* Under *Advanced options*, select **Do not require** a full window of data for evaluation.
* Is the data often delayed? Consider adding time (in seconds) to the monitor evaluation delay. Under *Advanced options* add a value to the **Delay monitor evaluation by X seconds** field.
* Adjust the evaluation (avg by, max by, min by, sum by) based on the expected frequency. The default evaluation is **avg by**, which may not be suited for sparse metrics.
* If you are using the **avg by** aggregator, consider adding an [interpolation function][1] like `default_zero()` to ensure the gaps in the metric are evaluated as zero.
* If you are using arithmetic in your query, take a look at [Monitor Arithmetic and Sparse Metrics][2] for some further guidance.


### Event-based Monitor 

Is this a log, event, audit trail or error tracking monitor? Look at the following:

* Under *Advanced options*, select the option for **Missing data options** that corresponds to your expected monitor behavior.
* Adjust the evaluation period. If datapoints are expected to be available every 30 minutes, then the evaluation period should account for that.


## Schedule-based monitoring

Are you monitoring an event that needs to happen at certain times of the day, week, month? A CRON task such as a backup job or export? Take a look at [Custom Schedules][3], which allow you to set RRULES to define when the monitor should evaluate and notify.

## How to determine whether you have a sparse metric

You can use a dashboard widget, a notebook, or even an [existing monitor's history graph][5] and hover over the datapoints to see if the datapoints seem continuous, as opposed to straight lines filling the gaps between each point.

In a notebook, or widget, select the **Bars** display option to see the points of data and their frequency.


A metric displayed in a widget may look like this:

{{< img src="monitors/guide/sparse_metrics/line_graph_sparse.png" alt="Metric graph with Line graph display going up and down in straigh lines" style="width:90%;" >}}

But when the **Bars** style is applied, it looks like this:

{{< img src="monitors/guide/sparse_metrics/bar_graph_sparse.png" alt="Same data as the Metric Line graph above, except with bars for each datapoint, highlighting gaps in between bars of sparse metrics" style="width:90%;" >}}

With the bar graph display, you can visualize the gaps between datapoints more clearly. 

If the graph editor does not have multiple options to change the graph style, you can apply the function `default_zero()` to the metric, which helps reveal the gaps in data. For more information on this function, see the [Interpolation][6] documentation.

[Reach out to the Datadog support team][4] if you have any questions regarding monitoring sparse data.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/functions/interpolation/#default-zero
[2]: /monitors/guide/monitor-arithmetic-and-sparse-metrics
[3]: /monitors/guide/custom_schedules/?tab=day
[4]: /help/
[5]: /monitors/manage/status/#investigate-a-monitor-in-a-notebook
[6]: /dashboards/functions/interpolation/#default-zero