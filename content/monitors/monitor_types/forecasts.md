---
title: Forecasts monitor
kind: documentation
aliases:
- /guides/forecasts/ 
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: "Consult your monitor status"
---

Forecasting is an algorithmic feature that allows you to predict where
a metric is heading in the future. It is well-suited for metrics with
strong trends or recurring patterns.

For example, if your application starts logging at a faster rate, forecasts can alert you a week before your disk fills up, giving you adequate time to update your log rotation policy. Or, you can forecast business metrics, such as user sign-ups, to track progress against your quarterly targets.

## Forecast function

There is a `forecast` function in the Datadog query language. When you apply this function to a series, it returns the usual results along with a forecast of future values.

## Forecast monitor

The chart below shows a dashboard tile of a forecast in "live" mode. The dashed pink line divides the history from the forecast, and the current time is indicated by the gray "Now" marker and line. The dotted green line shows the future values predicted by the forecast, and the range of predicted values within 3 deviations (a tunable parameter) is shown in lighter green.

{{< img src="monitors/monitor_types/forecasts/dashboard_live.png" alt="dashboard live" responsive="true" style="width:80%;">}}

When the dashboard is no longer in "live" mode, the vertical pink line and the gray line indicating "Now" starts to diverge. In the chart below, the dashed pink line is still splitting the history from the forecast, but we can see actual data (solid green) to the right of the pink line. The lighter green is still showing the range of predicted values and the dotted green line is still showing the predicted future values. The forecast is based only on the actual data observed before the dashed pink line. This view is useful for checking how accurate the forecast is against known data.

{{< img src="monitors/monitor_types/forecasts/dashboard_past.png" alt="dashboard past" responsive="true" style="width:80%;">}}

To create a forecast graph, start by adding a timeseries graph to your dashboard. Be sure to select **Timeseries** as the visualization type. Now, click on the **+** icon on the right side of your expression. Choose the **Forecast** function in the **Algorithms** submenu. You should immediately see the preview update to include the forecast visualization. A number of the graphing options disappear, as forecasts have a unique visualization.

The function has two parameters. The first parameter is for selecting which algorithm (see [Forecast Algorithms](#forecast-algorithms)) is used. The second parameter is deviations, and you can tune this to change the width of the range of forecasted values. A value of 1 or 2 should be large enough to accurately forecast most "normal" points. After successfully adding **Forecast**, your editor should show something like this:

{{< img src="monitors/monitor_types/forecasts/query_editor.png" alt="query editor" responsive="true" style="width:80%;">}}

### Forecast Alerts
In addition to viewing forecasts in dashboards, you can create monitors that trigger when metrics are forecasted to reach a threshold. The alert triggers when any part of the range of forecasted values crosses the threshold. The prototypical use case is for monitoring a group of disks with similar usage patterns: `max:system.disk.in_use{service:service_name, device:/data} by {host}`.

Navigate to the [Monitor page][1] for **Forecast Alerts**. Then fill out the **Define the metric** section just as you would for any other metric monitor.

{{< img src="monitors/monitor_types/forecasts/alert_conditions.png" alt="alert conditions" responsive="true" style="width:80%;">}}

There are three required options for setting up a forecast alert:

* The threshold at which an alert is triggered. For a metric like `system.disk.in_use` this should be set to 1.0, whereas for a metric like `system.mem.pct_usable` this should be set to 0.0. A recovery threshold is also required.
* The condition on which an alert is triggered. For a metric like `system.disk.in_use` this should be set to "above or equal to", whereas for a metric like `system.mem.pct_usable` this should be set to "below or equal to".
* Control how far in advance you would like to be alerted before your metric hits its critical threshold.

{{< img src="monitors/monitor_types/forecasts/alert_advanced.png" alt="alert advanced" responsive="true" style="width:80%;" >}}

Datadog automatically sets the **Advanced** options for you by analyzing your metric. Note that any changes in the **Define the metric** section could change the advanced options.

* You can change the forecasting algorithm to be used here. See the [next section of this page][2] for tips on how to choose the best algorithm for your use case. Each algorithm also has additional settings is described in the next section.
* We recommend using larger intervals between points to avoid having noise influence the forecast too much.
* The number of deviations controls the width of the range of forecasted values. A value of 1 or 2 should be large enough to accurately forecast most "normal" points.

Complete all steps in the New Monitor form (**Say what's happening**, etc.) and click **Save** to create the Forecast monitor.

Both the Monitor Edit page and the Monitor Status pages provide "Historical Context" so that you can see how the metric behaved in the past. This should provide some insight into what the forecast algorithm takes into account when predicting future values.

## Forecast algorithms

There are two different forecast algorithms:

**Linear**: Use this algorithm for metrics that have no repeating seasonal pattern, and tend to have steady trends. On dashboards, linear uses the data within view to create a forecast of the same length. E.g., if the time selector is set to "The Past Week", the forecast uses the past week of data to forecast the next week. For monitors, you can explicitly set the amount of history that is used, and it is set to one week by default.

{{< img src="monitors/monitor_types/forecasts/linear.png" alt="linear" responsive="true" style="width:80%;" >}}

The linear algorithm has three different _models_ that control how sensitive the algorithm is to level shifts.

The "simple" model does a robust linear regression through the entire history.

{{< img src="monitors/monitor_types/forecasts/linear_simple.png" alt="linear simple" responsive="true" style="width:80%;">}}

The "reactive" model more easily extrapolates recent behavior, at the risk of overfitting to noise, spikes or dips.

{{< img src="monitors/monitor_types/forecasts/linear_reactive.png" alt="linear reactive" responsive="true" style="width:80%;" >}}

The "default" model is what Goldilocks would choose, and adjusts to the most recent trend and extrapolate that line, while being robust to recent noise.

{{< img src="monitors/monitor_types/forecasts/linear_default.png" alt="linear default" responsive="true" style="width:80%;">}}

**Seasonal:** Use this algorithm for seasonal metrics. In monitors, Datadog auto-detects the seasonality of the metric and choose between weekly, daily, and hourly seasonality. This algorithm requires at least 2 seasons of history for it to start forecasting, and potentially uses up to 6.

Examples of seasonality options:

* **weekly**: the algorithm expects that this Monday will behave like past Mondays.
* **daily**: the algorithm expects that 7pm today wlil be have like 7pm in past days.
* **hourly**: the algorithm expects that 7:15 will behave like 6:15, 5:15, 4:15, etc.

{{< img src="monitors/monitor_types/forecasts/seasonal.png" alt="seasonal" responsive="true" style="width:80%;">}}

### Accessing Advanced Options

The advanced options are exposed under the **Advanced** tab in the **New Monitor** page. To specify them in the dashboards (using the JSON tab) or in the API, the format is as follows.

For Linear: `forecast(metric_name, 'linear', 1, interval='60m', history='1w', model='default')`, where the options for `model` are: `default`, `simple`, and `reactive`.

For Seasonal: `forecast(metric_name, 'seasonal', 1, interval='60m', seasonality='weekly')`, where the options for `seasonality` are: `hourly`, `daily`, and `weekly`.

The start and end times to specify when using the API are the start and end times of the forecast itself. If you want the forecast for the next day you would specify the start to be `now` and the end to be `1 day ahead`.

### Things to Note

Not all functions may be nested inside of calls to the `forecast()` function. In particular, you may not include any of the following functions in a forecast monitor or dashboard query: `anomalies()`, `cumsum()`, `integral()`, `outliers()`, `piecewise_constant()`, `robust_trend()`, or `trend_line()`

## Further Reading

{{< partial name="whats-next/whats-next.html" responsive="true" >}}

[1]: https://app.datadoghq.com/monitors#create/forecast
[2]: /#forecast-algorithms
