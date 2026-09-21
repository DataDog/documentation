---
title: Anomaly Detection for Data Observability Monitors
description: "Understand how the anomaly detection model works for Data Observability monitors, including training, model states, seasonality, and metric-specific behaviors."
further_reading:
  - link: '/data_observability/quality_monitoring/'
    tag: 'Documentation'
    text: 'Quality Monitoring'
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitor'
---

**Note**: This page applies to anomaly-based Data Observability monitors only. If your monitor uses the **Threshold** detection method, this content does not apply.

## Overview

By default, [Data Observability monitors][1] use an anomaly detection model tailored to common patterns in data quality metrics such as table freshness and row count.

The model learns from the metric's history to set expected bounds. When an observed value falls outside those bounds, the monitor triggers an alert.

## Training period

When you create an anomaly detection monitor, it enters a training period. During training, the monitor collects historical values to learn the metric's baseline behavior. It does not trigger alerts during this period, and the monitor chart appears in blue.

Training typically takes between 3 and 9 days. Because many data pipelines behave differently on weekends, the model needs to observe both weekday and weekend behavior.

After training completes, the monitor can alert. The chart shows the observed values over time, with bounds above and below the line as a shaded area showing expected values. The color shows the current state:

| Color | State | Description |
|-------|-------|-------------|
| Blue | Training | The monitor is learning baseline behavior. No alerts are triggered. |
| Green | Normal | The observed value is within expected bounds. |
| Red | Alerting | The observed value fell outside expected bounds. |

## Alert state

When an anomaly is found, the model will remain in alert state for some time, until either the observed value returns to the original expected bounds or the anomaly has persisted long enough that the model considers it a new normal state. To resolve the monitor manually and return it to normal state, use [annotations][2].

## Metric-specific behavior

The model works differently for different metrics:

### Freshness

Freshness monitors alert when the time since the last refresh is longer than expected based on historical update patterns. The model adds a small buffer to the upper bound to avoid alerting on minor delays.

### Row count

Row count monitors alert not only when there is an unusual change, but also when a row count flatlines, meaning it has not changed for longer than normal. A stalled row count may indicate a broken pipeline.

### Percentage (e.g. nullness, uniqueness)

Percentage metrics are scaled from 0 to 100. If the metric has never been 0 or 100, a change to these values triggers an alert.

### Custom SQL

For Custom SQL monitors, select a model type for your metric: **Freshness**, **Percentage** or **Default**.  The **Default** model infers the range from the metric's history. For example, if a custom metric has never returned a negative value, the model constrains the lower bound to 0.

## Seasonality

The model uses up to 400 days of history to adjust for seasonal patterns, trends, and past annotations. For example, if a metric consistently drops on Sundays, the model treats lower values on Sundays as normal rather than anomalous.

The following seasonal patterns are detected:

| Pattern | Description |
|---------|-------------|
| Hour of day | Metrics that follow intraday patterns, such as higher row counts during business hours. |
| Hour of week | Metrics with consistent patterns across a full week at hourly granularity. |
| Day of week | Metrics that differ across days of the week, such as lower activity on Sundays. |
| Day of month | Metrics with recurring patterns tied to the calendar month, such as end-of-month spikes. |
| Weekday vs. weekend | Metrics with systematically different behavior on weekends versus weekdays. |

Not all seasonal patterns are available for all metric types. Additionally, the model requires multiple complete cycles of normal history before it can detect a given pattern.

## Trends

The model accounts for whether a metric is growing or shrinking over time. For a metric that consistently adds rows each week, the model adjusts expectations based on the direction and rate of change rather than treating growth as anomalous.

## Annotations

Annotations let you immediately retrain the model when it misclassifies a point, either by missing an alert or by generating a false alert. Because data quality expectations are often metric-specific, annotations are the primary way to tune the model to your team's needs.

Annotations have two effects:
- **Correcting the current state**: Marking a flagged point as expected moves the monitor out of the alerting state to normal state at the next observation, so it can then alert on new anomalies.
- **Shaping future predictions**: The model uses annotated points to adjust future bounds, so feedback immediately improves accuracy.

See [Annotate bounds][2] on the Data Observability Monitor page for available annotation types and how to apply them.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/data_observability/
[2]: /monitors/types/data_observability/#annotate-bounds
