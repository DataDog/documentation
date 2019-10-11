---
title: Forecasts Monitor
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

To create a [forecast monitor][1] in Datadog, use the main navigation: *Monitors --> New Monitor --> Forecast*.

### Define the metric

Any metric currently reporting to Datadog is available for monitors. For more information, see the [Metric Monitor][2] page.

After defining the metric, the forecast monitor provides two preview graphs in the editor:
{{< img src="monitors/monitor_types/forecasts/editor_graphs.png" alt="Editor graphs" responsive="true" style="width:95%;">}}

* The **Historical View** lets you explore the past metric data at different time scales.
* The **Evaluation Preview** shows a combination of historical and predicted metric data.

### Set alert conditions

* Trigger an alert when the edge of the forecast confidence bounds goes `above` or `below`.
* the threshold within the next `24 hours`, `1 week`, `1 month`, etc.
* Alert threshold: >= `<NUMBER>`
* Alert [recovery threshold][3]: < `<NUMBER>`

#### Advanced Options

Datadog automatically analyzes your chosen metric and sets several parameters for you. However, the options are available to edit under **Advanced Options**:

{{< img src="monitors/monitor_types/forecasts/advanced_options.png" alt="Advanced options" responsive="true" style="width:80%;">}}

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

{{< img src="monitors/monitor_types/forecasts/linear_default.png" alt="linear default" responsive="true" style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_simple.png" alt="linear simple" responsive="true" style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_reactive.png" alt="linear reactive" responsive="true" style="width:80%;" >}}

{{% /tab %}}
{{% tab "Seasonal" %}}

Use the seasonal algorithm for metrics with repeating patterns. There are three different _seasonality_ choices:

| Option  | Description                                                                                                                                        |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Hourly  | The algorithm expects the same minute after the hour behaves like past minutes after the hour, for example 5:15 behaves like 4:15, 3:15, etc.      |
| Daily   | The algorithm expects the same time today behaves like past days, for example 5pm today behaves like 5pm yesterday.                                |
| Weekly  | The algorithm expects that a given day of the week behaves like past days of the week, for example this Tuesday behaves like past Tuesdays.        |

**Note**: This algorithm requires at least two seasons of history and uses up to six seasons for forecasting.

{{< img src="monitors/monitor_types/forecasts/seasonal.png" alt="seasonal" responsive="true" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][6] page.

## API

To create forecast monitors programmatically, see the [Datadog API reference][7]. Datadog recommends [exporting a monitor's JSON][8] to build the query for the API.

## Troubleshooting

The following functions cannot be nested inside calls to the `forecast()` function:<br>
`anomalies`, `cumsum`, `integral`, `outliers`, `piecewise_constant`, `robust_trend`, or `trend_line`

## Further Reading

{{< partial name="whats-next/whats-next.html" responsive="true" >}}

[1]: https://app.datadoghq.com/monitors#create/forecast
[2]: /monitors/monitor_types/metric/#define-the-metric
[3]: /monitors/faq/what-are-recovery-thresholds
[4]: /monitors/faq/how-to-update-anomaly-monitor-timezone
[5]: /graphing/functions/rollup
[6]: /monitors/notifications
[7]: /api/#create-a-monitor
[8]: /monitors/monitor_status/#settings
