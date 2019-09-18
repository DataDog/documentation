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
  text: "Schedule downtime to mute a monitor"
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: "Consult your monitor status"
---

## Overview

Forecasting is an algorithmic feature that allows you to predict where a metric is heading in the future. It is well-suited for metrics with strong trends or recurring patterns. For example, if your application starts logging at a faster rate, forecasts can alert you a week before a disk fills up, giving you adequate time to update your log rotation policy. Or, you can forecast business metrics, such as user sign-ups, to track progress against your quarterly targets.

## Monitor creation

To create an [forecast monitor][1] in Datadog, use the main navigation: *Monitors --> New Monitor --> Forecast*.

The forecast monitor uses the `forecast` function from the Datadog query language. When you apply this function to a series, it returns the usual results with a forecast of future values.

When you create a forecast monitor, the alert triggers when any part of the range of forecasted values crosses the threshold.

### Define the metric

Any metric currently reporting to Datadog is available for monitors. For more information, see the [Metric Monitor][2] page.

After defining the metric, the forecast monitor provides two preview graphs in the editor:
{{< img src="monitors/monitor_types/forecasts/editor_graphs.png" alt="Editor graphs" responsive="true" style="width:95%;">}}

* The **Historical View** lets you explore the past metric data at different time scales.
* The **Evaluation Preview** shows a combination of historical and predicted metric data.

### Set alert conditions

* Trigger an alert when the edge of the forecast confidence bounds goes `above` or `below`
* the threshold within the next `24 hours`, `1 week`, `1 month`, etc.
* Alert threshold: >= `<NUMBER>`
* Alert [recovery threshold][3]: < `<NUMBER>`

#### Advanced Options

Datadog automatically analyzes your chosen metric and sets several parameters for you. However, the options are available for you to edit under **Advanced Options (auto)**:

{{< img src="monitors/monitor_types/forecasts/advanced_options.png" alt="Advanced options" responsive="true" style="width:80%;">}}

| Option                   | Description                                                                                                             |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Algorithm](#algorithms) | The forecast algorithm (`linear` or `seasonal`)                                                                         |
| Model                    | The forecast model (`default`, `simple`, or `reactive`) for the linear algorithm                                        |
| Seasonality              | The forecast seasonality (`hourly`, `daily`, `weekly`, or `monthly`) for the seasonal algorithm                         |
| [Rollup][4]              | The rollup interval&mdash;larger intervals between points avoids noise influence on the forecast.                       |
| Deviations               | The width of the range of forecasted values&mdash;A value of 1 or 2 is generally large enough for most "normal" points. |

##### Algorithms

There are two different forecast algorithms:

**Linear**: Use this algorithm for metrics that have no repeating seasonal pattern, and tend to have steady trends. On dashboards, linear uses the data within view to create a forecast of the same length. For example, if you set the time selector to "The Past Week", the forecast uses the past week of data to forecast the next week. For monitors, you can explicitly set the amount of history to use, and it is set to one week by default.

The linear algorithm has three different _models_ that control how sensitive the algorithm is to level shifts.

| Model    | Description                                                                                    |
|----------|------------------------------------------------------------------------------------------------|
| Default  | Adjusts to the most recent trend and extrapolates data while being robust to recent noise.     |
| Simple   | Does a robust linear regression through the entire history.                                    |
| Reactive | More easily extrapolates recent behavior, at the risk of overfitting to noise, spikes or dips. |

**Examples**:

{{< img src="monitors/monitor_types/forecasts/linear_simple.png" alt="linear simple" responsive="true" style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_reactive.png" alt="linear reactive" responsive="true" style="width:80%;" >}}

{{< img src="monitors/monitor_types/forecasts/linear_default.png" alt="linear default" responsive="true" style="width:80%;">}}

**Seasonal:** Use this algorithm for seasonal metrics. In monitors, Datadog auto-detects the seasonality of the metric and chooses between weekly, daily, and hourly seasonality. This algorithm requires at least two seasons of history for it to start forecasting, and potentially uses up to six.

Examples of seasonality options:

* **weekly**: the algorithm expects this Monday behaves like past Mondays.
* **daily**: the algorithm assumes that 7 pm today is like 7 pm from previous days.
* **hourly**: the algorithm expects that 7:15 behaves like 6:15, 5:15, 4:15, etc.

{{< img src="monitors/monitor_types/forecasts/seasonal.png" alt="seasonal" responsive="true" style="width:80%;">}}

### Accessing Advanced Options

Access advanced options under the **Advanced** tab in the **New Monitor** page. To specify them in the dashboards (using the JSON tab) or in the API, use this format:

For Linear: `forecast(metric_name, 'linear', 1, interval='60m', history='1w', model='default')`, where the options for `model` are: `default`, `simple`, and `reactive`.

For Seasonal: `forecast(metric_name, 'seasonal', 1, interval='60m', seasonality='weekly')`, where the options for `seasonality` are: `hourly`, `daily`, and `weekly`.

When using the API, specify the start and end times of the forecast itself. If you want the forecast for the next day, specify the start to be `now` and the end to be `1 day ahead`.

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][5] page.

## Troubleshooting

Not all functions may be nested inside of calls to the `forecast()` function. In particular, you may not include any of the following functions in a forecast monitor or dashboard query: `anomalies()`, `cumsum()`, `integral()`, `outliers()`, `piecewise_constant()`, `robust_trend()`, or `trend_line()`

## Further Reading

{{< partial name="whats-next/whats-next.html" responsive="true" >}}

[1]: https://app.datadoghq.com/monitors#create/forecast
[2]: /monitors/monitor_types/metric/#define-the-metric
[3]: /monitors/faq/what-are-recovery-thresholds
[4]: /graphing/functions/rollup
[5]: /monitors/notifications
