---
title: Forecasts Monitor
kind: documentation
aliases:
- /guides/forecasts/
further_reading:
- link: "/monitors/notifications/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule downtime to mute a monitor"
- link: "/monitors/monitor_status/"
  tag: "Documentation"
  text: "Consult your monitor status"
---

## Overview

Forecasting is an algorithmic feature that allows you to predict where a metric is heading in the future. It is well-suited for metrics with strong trends or recurring patterns. For example, if your application starts logging at a faster rate, forecasts can alert you a week before a disk fills up, giving you adequate time to update your log rotation policy. Or, you can forecast business metrics, such as user sign-ups, to track progress against your quarterly targets.

## Monitor creation

To create a [forecast monitor][1] in Datadog, use the main navigation: *Monitors --> New Monitor --> Forecast*.

### Define the metric

Any metric currently reporting to Datadog is available for monitors. For more information, see the [Metric Monitor][2] page.

After defining the metric, the forecast monitor provides two preview graphs in the editor:
{{< img src="monitors/monitor_types/forecasts/editor_graphs.png" alt="Editor graphs"  style="width:95%;">}}

* The **Historical View** lets you explore the past metric data at different time scales.
* The **Evaluation Preview** shows a combination of historical and predicted metric data.

### Set alert conditions

* Trigger an alert when the edge of the forecast confidence bounds goes `above` or `below`.
* the threshold within the next `24 hours`, `1 week`, `1 month`, etc. or `custom` to set a value between 12 hours and 3 months.
* Alert threshold: >= `<NUMBER>`
* Alert [recovery threshold][3]: < `<NUMBER>`

#### Advanced options

Datadog automatically analyzes your chosen metric and sets several parameters for you. However, the options are available to edit under **Advanced Options**:

{{< img src="monitors/monitor_types/forecasts/advanced_options.png" alt="Advanced options"  style="width:80%;">}}

| Option                     | Description                                                                                                             |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Algorithm](#algorithms)   | The forecast algorithm (`linear` or `seasonal`)                                                                         |
| Model                      | The forecast model (`default`, `simple`, or `reactive`) for the linear algorithm                                        |
| Seasonality                | The forecast seasonality (`hourly`, `daily`, or `weekly`) for the seasonal algorithm                         |
| [Daylight&nbsp;savings][4] | Available for `seasonal` forecast monitors with `daily` or `weekly` seasonality.                            |
| [Rollup][5]                | The rollup interval&mdash;larger intervals between points avoid noise influence on the forecast.                        |
| Deviations                 | The width of the range of forecasted values&mdash;a value of 1 or 2 is generally large enough for most "normal" points. |

##### Algorithms

The available forecast algorithms are `linear` and `seasonal`:

{{< tabs >}}
{{% tab "Linear" %}}

Use the linear algorithm for metrics that have steady trends but no repeating seasonal pattern. There are three different _models_ which control the linear algorithm's sensitivity to level shifts:

| Model    | Description                                                                                |
|----------|--------------------------------------------------------------------------------------------|
| Default  | Adjusts to the most recent trend and extrapolates data while being robust to recent noise. |
| Simple   | Does a robust linear regression through the entire history.                                |
| Reactive | Extrapolates recent behavior better at the risk of overfitting to noise, spikes, or dips.  |

{{< img src="monitors/monitor_types/forecasts/linear_default.png" alt="linear default"  style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_simple.png" alt="linear simple"  style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_reactive.png" alt="linear reactive"  style="width:80%;" >}}

{{% /tab %}}
{{% tab "Seasonal" %}}

Use the seasonal algorithm for metrics with repeating patterns. There are three different _seasonality_ choices:

| Option  | Description                                                                                                                                        |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Hourly  | The algorithm expects the same minute after the hour behaves like past minutes after the hour, for example 5:15 behaves like 4:15, 3:15, etc.      |
| Daily   | The algorithm expects the same time today behaves like past days, for example 5pm today behaves like 5pm yesterday.                                |
| Weekly  | The algorithm expects that a given day of the week behaves like past days of the week, for example this Tuesday behaves like past Tuesdays.        |

**Note**: This algorithm requires at least two seasons of history and uses up to six seasons for forecasting.

{{< img src="monitors/monitor_types/forecasts/seasonal.png" alt="seasonal"  style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][6] page.

## API

To create forecast monitors programmatically, see the [Datadog API reference][7]. Datadog **strongly recommends** [exporting a monitor's JSON][8] to build the query for the API. By using the [monitor creation page][1] in Datadog, customers benefit from the preview graph and automatic parameter tuning to help avoid a poorly configured monitor.

Forecast monitors are managed using the [same API][9] as other monitors, but the contents of the `query` property deserves further explanation.

The `query` property in the request body should contain a query string in the following format:

```text
<aggregator>(<query_window>):forecast(<metric_query>, '<algorithm>', <deviations>, interval=<interval>[, history='<history>'][, model='<model>'][, seasonality='<seasonality>']) <comparator> <threshold>
```

* `aggregator`: Use `min` if the alert should trigger when the forecast goes below the threshold. Use `max` if the alert should trigger when the forecast goes above the threshold.
* `query_window`: A timeframe, for example: `last_4h` or `last_7d`. The timeframe is recommended to be around five times the `alert_window`, but it must be at least as large as `alert_window`. This parameter controls the time range displayed in graphs included in notifications. 
* `metric_query`: A standard Datadog metric query, for example: `min:system.disk.free{service:database,device:/data}by{host}`.
* `algorithm`: `linear` or `seasonal`
* `deviations`: A number greater than or equal to one. This parameter controls the size of the confidence bounds, allowing a monitor to be made more or less sensitive.
* `interval`: A positive integer representing the number of seconds in the rollup interval.
* `history`: A string representing the amount of past data that should be used for making the forecast, for example: `1w`, `3d`. This parameter is only used with the `linear` algorithm.
* `model`: The type of model to use: `default`, `simple`, or `reactive`. This parameter is only used with the `linear` algorithm.
* `seasonality`: The seasonality to use: `hourly`, `daily`, or `weekly`. This parameter is only used with the `seasonal` algorithm
* `comparator`: Use `<=` to alert when the forecast goes below the threshold. Use `>=` to alert when the forecast goes above the threshold.
* `threshold`: A critical alert will trigger when the forecast's confidence bounds reach this threshold.

## Troubleshooting

The following functions cannot be nested inside calls to the `forecast()` function:<br>
`anomalies`, `cumsum`, `integral`, `outliers`, `piecewise_constant`, `robust_trend`, or `trend_line`

## Further Reading

{{< partial name="whats-next/whats-next.html"  >}}

[1]: https://app.datadoghq.com/monitors#create/forecast
[2]: /monitors/monitor_types/metric/#define-the-metric
[3]: /monitors/faq/what-are-recovery-thresholds/
[4]: /monitors/faq/how-to-update-anomaly-monitor-timezone/
[5]: /dashboards/functions/rollup/
[6]: /monitors/notifications/
[7]: /api/v1/monitors/#create-a-monitor
[8]: /monitors/monitor_status/#settings
[9]: /api/v1/monitors/
