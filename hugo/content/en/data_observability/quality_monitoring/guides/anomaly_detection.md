---
title: Anomaly Detection for Data Observability Monitors
description: "Understand how the anomaly detection model works for Data Observability monitors, including training, model states, seasonality, metric-specific behaviors, and the AI review of flagged points."
further_reading:
  - link: '/data_observability/quality_monitoring/'
    tag: 'Documentation'
    text: 'Quality Monitoring'
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitor'
---

**Note**: This page applies to anomaly-based Data Observability monitors only. If your monitor uses the {{< ui >}}Thresholds{{< /ui >}} detection method, this content does not apply.

## Overview

By default, [Data Observability monitors][1] use an anomaly detection model tailored to common patterns in data quality metrics such as table freshness and row count.

The model learns from the metric's history to set expected bounds. When an observed value moves outside those bounds, an [AI reviewer](#ai-review-of-flagged-points) checks the point. The monitor alerts unless the reviewer finds that the value matches the metric's normal behavior.

## Training period

When you create an anomaly detection monitor, it enters a training period. During training, the monitor collects historical values to learn the metric's baseline behavior. It does not trigger alerts during this period, and the monitor chart appears in blue.

Training typically takes 3 to 7 days for a monitor that runs more than once a day. A monitor that runs once a day typically trains for 9 days. Because many data pipelines behave differently on weekends, the model needs to observe both weekday and weekend behavior. A monitor leaves training when it has both of the following:

- At least nine evaluations over at least 3 days.
- A full weekend and a full weekday of evaluations, or more than 7 days of history.

Some monitors follow different rules:

- **Freshness**: The monitor stays in training until it observes at least one table update. If it has observed only one update, it continues training for three times longer than that update's time.
- **Row Count**: In its first 7 days, the monitor stays in training on Saturdays and Sundays until it has evaluated on three weekend days. If the row count has stayed flat since before Monday, the monitor stays in training until the count changes or Monday ends (UTC). This hold ends after 8 days of history.
- **Custom SQL (Default) or Constant Value**: The monitor stays in training until it has at least 7 days of history.
- **Job duration**: Each job stays in training until it has at least five completed runs over at least 1 day. It also needs a full weekday (Monday through Friday) of runs, or more than 7 days of history. It doesn't wait for a weekend.

After training completes, the monitor can alert. The chart shows the observed values over time, with bounds above and below the line as a shaded area showing expected values. The color shows the current state:

| Color | State | Description |
|-------|-------|-------------|
| Blue | Training | The monitor is learning baseline behavior. No alerts are triggered. |
| Green | Normal | The observed value is within expected bounds. |
| Red | Alerting | The observed value fell outside expected bounds. |

<!-- SCREENSHOT: The monitor status page of a Row Count monitor that has finished training, with the chart's observed values, the shaded expected bounds, and a point outside the bounds in the alerting color. -->

## Alert state

When an anomaly is found, the model will remain in alert state for some time, until either the observed value returns to the original expected bounds or the anomaly has persisted long enough that the model considers it a new normal state. To resolve the monitor manually and return it to normal state, use [annotations][2].

## Metric-specific behavior

The model works differently for different metrics:

### Freshness

Freshness monitors alert when the time since the last refresh is longer than expected based on historical update patterns. The model adds a small buffer to the upper bound to avoid alerting on minor delays.

### Row count

Row count monitors alert not only when there is an unusual change, but also when a row count flatlines, meaning it has not changed for longer than normal. A stalled row count may indicate a broken pipeline.

### Percentage (such as nullness and uniqueness)

Percentage metrics are scaled from 0 to 100. If the metric has never been 0 or 100, a change to these values triggers an alert.

### Custom SQL

For Custom SQL monitors, select a model type for your metric: {{< ui >}}Freshness{{< /ui >}}, {{< ui >}}Percentage{{< /ui >}}, or {{< ui >}}Default{{< /ui >}}. The {{< ui >}}Default{{< /ui >}} model infers the range from the metric's history. For example, if a custom metric has never returned a negative value, the model constrains the lower bound to 0.

## Seasonality

The model adjusts for seasonal patterns, trends, and past annotations. For example, if a metric consistently drops on Sundays, the model treats lower values on Sundays as normal rather than anomalous.

The model detects the following seasonal patterns. The amount of history it uses depends on the pattern:

| Pattern | Description | History used |
|---------|-------------|--------------|
| Hour of day | Metrics that follow intraday patterns, such as higher row counts during business hours. | About the last month |
| Hour of week | Metrics with consistent patterns across a full week at hourly granularity. | About the last 3 months |
| Day of week | Metrics that differ across days of the week, such as lower activity on Sundays. | About the last 3 months |
| Day of month | Metrics with recurring patterns tied to the calendar month, such as end-of-month spikes. | Up to 400 days |

Not all seasonal patterns are available for all metric types. The model requires at least two complete cycles of normal history to detect a pattern, and typically detects it after three or more cycles. For example, a weekly pattern needs at least two weeks of history, and the model usually detects it after three weeks.

## Trends

The model accounts for whether a metric is growing or shrinking over time. For a metric that consistently adds rows each week, the model adjusts expectations based on the direction and rate of change rather than treating growth as anomalous.

## Annotations

Annotations let you immediately retrain the model when it misclassifies a point, either by missing an alert or by generating a false alert. Because data quality expectations are often metric-specific, annotations are the primary way to tune the model to your team's needs.

Annotations have two effects:
- **Correcting the current state**: Marking a flagged point as expected moves the monitor out of the alerting state to normal state at the next observation, so it can then alert on new anomalies.
- **Shaping future predictions**: The model uses annotated points to adjust future bounds, so feedback immediately improves accuracy.

See [Annotate bounds][2] on the Data Observability Monitor page for available annotation types and how to apply them.

## Model configuration

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Model configuration settings are in Preview.
{{< /callout >}}

The [model configuration settings][3] change how the model sets bounds:

- {{< ui >}}Sensitivity{{< /ui >}} adjusts the width of the bounds that the model computes. The default value is `3`. Move the slider toward {{< ui >}}More alerts{{< /ui >}} to narrow the bounds, or toward {{< ui >}}Fewer alerts{{< /ui >}} to widen them.
- {{< ui >}}Minimum upper bound size{{< /ui >}} and {{< ui >}}Minimum lower bound size{{< /ui >}} set the smallest distance between the predicted value and each bound. The model can still set wider bounds. Enter values in the metric's own units, such as rows for Row Count or percentage points for Nullness. For integer metrics such as Row Count, the model rounds the value up to a whole number.
- {{< ui >}}Model Instructions{{< /ui >}} inform the AI reviewer, which reads them when a value falls outside the bounds. See [Model Instructions](#model-instructions).

{{< ui >}}Alert after N consecutive anomalies{{< /ui >}} sets how many flagged evaluations in a row the monitor needs before it alerts.

## AI review of flagged points

Monitors that use the {{< ui >}}Anomalies{{< /ui >}} detection method send each newly flagged outlier to an AI reviewer before they alert.

The reviewer analyzes the metric's history. It compares the flagged value with earlier periods of normal behavior in the same context, such as the same hour or day of the week. The review has one of the following outcomes:

- If the reviewer finds earlier periods that match the flagged value's pattern and timing, it prevents the alert. The monitor widens the bounds at that point to include the observed value.
- If the reviewer doesn't dismiss the point, the monitor alerts as usual. Later points in the same anomaly aren't reviewed again.
- If the review doesn't run or doesn't finish, the point keeps its original bounds and the monitor alerts as usual. For example, this happens when the monitor has reached its daily review limit or the review times out. The review also doesn't run for organizations whose settings don't allow AI model providers, such as HIPAA-enabled organizations.

The reviewer can only dismiss flagged points. It doesn't narrow the bounds or create alerts. To get alerts on values that fall within the bounds, adjust {{< ui >}}Sensitivity{{< /ui >}} or annotate the bounds with {{< ui >}}Missed alert{{< /ui >}}.

The reviewer dismisses a Row Count value of `0` only when the metric's history shows that zeros are routine. For example, the metric has dropped to zero and recovered several times before. This applies even when the monitor's {{< ui >}}Model Instructions{{< /ui >}} describe the value as expected.

### Model Instructions

{{< ui >}}Model Instructions{{< /ui >}}, one of the Preview [model configuration settings][3], give the reviewer plain-language context about behavior you expect, such as `Don't alert on large increases during US holidays`. The reviewer reads them only for flagged points:

- If the instructions describe the flagged point as expected, the reviewer dismisses it, even when the metric's history alone doesn't support a dismissal.
- Instructions that name specific tables, columns, or group values apply only to the series that match them.
- Instructions can cover every point, for example by asking not to alert on the monitor at all. The reviewer then treats every flagged point as expected.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/data_observability/
[2]: /monitors/types/data_observability/#annotate-bounds
[3]: /monitors/types/data_observability/#model-configuration
