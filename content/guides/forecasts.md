---
title: Forecasts
kind: guide
listorder: 24
beta: true
---

Forecasting is an algorithmic feature that allows you to predict where
a metric is heading in the future. It is well-suited for metrics with
strong trends or recurring patterns.

For example, if your application starts logging at a faster rate, forecasts can alert you a week before your disk fills up, giving you adequate time to update your log rotation policy. Or, you can forecast business metrics, such as user sign-ups, to track progress against your quarterly targets.

## How to Forecast Your Data

There is a `forecast` function in the Datadog query language. When you apply this function to a series, it returns the usual results along with a forecast of future values.

### Visualizing Forecasts in Dashboards

The chart below shows a dashboard tile of a forecast in “live” mode. The dashed pink line divides the history from the forecast, and the current time is indicated by the gray “Now” marker and line. The dotted green line shows the future values predicted by the forecast, and the range of predicted values within 3 deviations (a tunable parameter) is shown in lighter green.

{{< img src="forecasts/dashboard_live.png" >}}

When the dashboard is no longer in “live” mode, the vertical pink line and the gray line indicating “Now” will start to diverge. In the chart below, the dashed pink line is still splitting the history from the forecast, but we can see actual data (solid green) to the right of the pink line. The lighter green is still showing the range of predicted values and the dotted green line is still showing the predicted future values. The forecast is based only on the actual data observed before the dashed pink line. This view is useful for checking how accurate the forecast is against known data.

{{< img src="forecasts/dashboard_past.png" >}}

To create a forecast graph, start by adding a timeseries graph to your dashboard. As shown below, be sure to select “Timeseries” as the visualization type.

{{< img src="forecasts/screenshot.png" >}}

Now, click on the + icon (Add functions and modifiers) on the right side of your expression. Choose the “Forecast” function in the “Algorithms” submenu:

{{< img src="forecasts/screenshot2.png" >}}

You should immediately see the preview update to include the forecast visualization. A number of the graphing options will disappear, as forecasts have a unique visualization.

The function has two parameters. The first parameter is for selecting which algorithm (see Forecast Algorithms) will be used. The second parameter is deviations, and you can tune this to change the width of the range of forecasted values. A value of 2 or 3 should be large enough to accurately forecast most “normal” points. After successfully adding forecast, your editor should show something like this:

{{< img src="forecasts/screenshot3.png" >}}


### Forecast Alerts
In addition to viewing forecasts in dashboards, you can create monitors that trigger when metrics are forecast to reach a threshold. The alert will trigger when any part of the range of forecasted values crosses the threshold.

Navigate to the [New Monitor page](https://app.datadoghq.com/monitors#create/forecast) for **Forecast Alerts**. Then fill out the **Define the metric** section just as you would for any other metric monitor.

{{< img src="forecasts/alert_conditions.png" >}}
There are three required options for setting up a forecast alert:

<ol type="a">
  <li> This is the threshold at which an alert is triggered. For a metric like `system.disk.in_use` this should be set to 1.0, whereas for a metric like `system.mem.pct_usable` this should be set to 0.0. A recovery threshold is also required.
  <li> This is the the condition on which an alert is triggered. For a metric like `system.disk.in_use` this should be set to “above or equal to”, whereas for a metric like `system.mem.pct_usable` this should be set to “below or equal to”.
  <li> Control how far in advance you would like to be alerted before your metric hits its critical threshold.
</ol>

{{< img src="forecasts/alert_advanced.png" >}}

Datadog will automatically set the **Advanced** options for you by analyzing your metric. Note that any changes in the **Define the metric** section could change the advanced options.

<ol type="a">
  <li> You can change the forecasting algorithm to be used here. See the next section of this guide for tips on how to choose the best algorithm for your use case. Each algorithm also has additional settings that will be described in the next section.
  <li> We recommend using larger intervals between points to avoid having noise influence the forecast too much.
  <li> The number of deviations controls the width of the range of forecasted values. A value of 1 or 2 should be large enough to accurately forecast most “normal” points.

Complete all steps in the New Monitor form (**Say what’s happening**, etc.) and click **Save** to create the Forecast monitor.

Both the Monitor Edit page and the Monitor Status pages provide “Historical Context” so that you can see how the metric behaved in the past. This should provide some insight into what the forecast algorithm takes into account when predicting future values.

### Forecast Algorithms

There are two different forecast algorithms:

**Linear**: Use this algorithm for metrics that have no repeating seasonal pattern, and tend to have steady trends. On dashboards, linear will use the data within view to create a forecast of the same length. E.g., if the time selector is set to “The Past Week”, the forecast will use the past week of data to forecast the next week. For monitors, you can explicitly set the amount of history that is used, and it is set to one week by default.

{{< img src="forecasts/linear.png" >}}

The linear algorithm has three different _models_ that control how sensitive the algorithm is to level shifts.

The “simple” model does a robust linear regression through the entire history.

{{< img src="forecasts/linear_simple.png" >}}

The “reactive” model will more easily extrapolate recent behavior, at the risk of overfitting to noise, spikes or dips.

{{< img src="forecasts/linear_reactive.png" >}}

The “default” model is what Goldilocks would choose, and will adjust to the most recent trend and extrapolate that line, while being robust to recent noise.

{{< img src="forecasts/linear_default.png" >}}

**Seasonal:** Use this algorithm for seasonal metrics. In monitors, Datadog will auto-detect the seasonality of the metric and choose between weekly, daily, and hourly seasonality. This algorithm requires at least 2 seasons of history for it to start forecasting, and potentially uses up to 6.

{{< img src="forecasts/seasonal.png" >}}

### Accessing Advanced Options
The advanced options are exposed under the **Advanced** tab in the **New Monitor** page. To specify them in the dashboards (using the JSON tab) or in the API, the format is as follows.

For Linear: `forecast(metric_name, ‘linear’, 1, interval='60m', history='1w', model='default')`, where the options for `model` are: `default`, `simple`, and `reactive`

For Seasonal: `forecast(metric_name, ‘seasonal’, 1, interval='60m', seasonality=’weekly’)`, where the options for `seasonality` are: `hourly`, `daily`, `weekly`
