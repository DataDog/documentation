---
title: Monitoring Sparse Metrics
kind: guide
further_reading:
- link: "/api/latest/monitors/#edit-a-monitor"
  tag: "Documentation"
  text: "Learn more about updating these settings via API"
- link: "/dashboards/functions/interpolation/#default-zero"
  tag: "Documentation"
  text: "Learn more about interpolation"
---

## Overview

When monitoring a metric that reports data infrequently, there are some tools and behaviors that should be considered to ensure a monitor's settings are appropriate for evaluating these queries as intended. 

## Source of the monitor

First, consider your source.

### Metric-based monitor

Is this a metric, change, anomaly or other metric-based monitor ? The following settings should be adjusted:

* Make sure that **Do not require a full window of data for evaluation** is set
* Is the data often delayed? Consider adjusting the monitor evaluation delay as well
* Adjust the evaluation (average, max, min, sum) based on the expected frequency. The default evaluation is **average**, which may not be suited for sparse metrics.
* If you are using **average**, think about adding an [interpolation function][1] like `default_zero()` to ensure the gaps in the metric are evaluated as zero.
* If you are using arithmetic in your query, take a look at [Monitor Arithmetic and Sparse Metrics][2] for some further guidance.


### Event-based Monitor 

Is this a log, event or other event-based monitor? Look at the following:

* Make sure that the "Missing data" setting corresponds to your expected monitor behavior: **Evaluate as zero**, **Show NO DATA**, **Show NO DATA and notify**, or **Show OK**
* Adjust the evaluation period, if data points are expected to be available every 30 minutes, then the evaluation period should account for that.


## Scheduled-based Monitoring

Are you monitoring for an event that needs to happen at certain times of the day, week, month? A CRON task (backup job, export, etc.)? Then you may want to look at [Custom Schedules][3] instead, which allow you to set RRULES to define when the monitor should evaluate and notify.

## Tip: How to determine whether you have a sparse metric

You can use a dashboard widget or a notebook, or even an existing monitor's history graph and hover over the datapoints to see if the datapoints seem continuous, as opposed to straight lines filling the gaps between each point.

In a notebook, or widget, you can use the **bar** graph view in order to see the points of data and their frequency.

### Example:

A metric displayed in a widget may look like this:

{{< img src="monitors/guide/sparse_metrics/line_graph_sparse.png" alt="Line graph going up and down in straigh lines" style="width:90%;" >}}

But when the **bar** style is applied, it looks like this:

{{< img src="monitors/guide/sparse_metrics/bar_graph_sparse.png" alt="Same graph as above, except with bars for each datapoint, and empty in between bars of different heights" style="width:90%;" >}}

By using bar graph display, you can visualize the gaps between data points more clearly. 

If you are trying to visuzlize this in a page that does not allow for a change in graph style, you can apply the function `default_zero()` to the metric, which should help reveal the gaps in data. However, this function also changes the evaluation of the metric, so be sure to understand the implications.

[Reach out to the Datadog support team][4] if you have any questions regarding monitoring sparse.

[1]: /dashboards/functions/interpolation/#default-zero
[2]: /monitors/guide/monitor-arithmetic-and-sparse-metrics
[3]: /monitors/guide/custom_schedules/?tab=day
[4]: /help/