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

## Overview

Data Observability monitors use an anomaly detection model tailored to common patterns in data quality metrics such as table freshness and row count. This model is designed for metrics that have irregular update patterns, sporadic large changes, and business-specific expectations of what is normal.

The model learns from the metric's history to set expected bounds. When an observed value falls outside those bounds, the monitor triggers an alert.

## Training period

When you first create an anomaly detection monitor, it enters a **training period**. During training, the monitor collects historical values to learn the metric's baseline behavior. It does not trigger alerts during this period, and the monitor chart appears in blue.

The training period typically ends after the model has observed at least one weekday and one full weekend (Saturday and Sunday), since many data pipelines behave differently on weekends than on weekdays. Depending on how often the underlying metric is updated, training can take between **3 and 7 days**. Metrics that update infrequently (such as daily) may require more observations before training completes.

After training completes, the monitor transitions to an active state and begins alerting. The chart shows green for normal values and red for outlier values.

## Model states

The anomaly detection model is stateful. The prediction for the current observation depends on the prior observation and whether it was inside or outside the bounds:

| State | Description |
|---|---|
| **Normal** | The prior observation was within bounds and the current value has changed. The model generates a new prediction based on history. |
| **No change** | The current value is identical to the prior value. The model reuses the prior prediction. This is common for row count metrics that do not change between refreshes. |
| **Recovering** | The prior observation was outside the bounds. The model reuses the prior prediction until the observed value returns to the expected range. |

Because the model reuses predictions during anomaly states, adding [annotations][1] is the primary way to reset the model and resume learning from new values.

## Metric-specific behavior

While the core model logic is shared across metric types, each type has additional rules:

### Freshness

Freshness monitors alert when the time since the last refresh is longer than expected based on historical update patterns. The model adds a small buffer to the upper bound to avoid alerting on minor delays. The lower bound is set to zero, since refreshing earlier than expected is not typically a problem.

### Row count

Row count monitors alert when a table's row count has flatlined — that is, when it has not changed for longer than normal. Flatline detection is important because a stalled row count may indicate a broken pipeline.

### Percentage (nullness, uniqueness)

Percentage metrics are bounded between 0 and 100. If the metric stays away from those extremes, a jump to 0% or 100% will trigger an alert.

### Custom SQL

For custom SQL monitors with "Default" model type, the model infers the expected range from the metric's history. For example, if a custom metric has never returned a negative value, the model constrains the lower bound to 0.

## Metric properties

The model analyzes up to 400 days of history to detect properties that inform how predictions are generated.

### Seasonality

Seasonality refers to regular, repeating patterns in a metric over time. The model detects and adjusts for the following seasonal patterns:

- **Hour of day**: Metrics that follow intraday patterns, such as higher row counts during business hours.
- **Hour of week**: Metrics with consistent patterns across a full week at hourly granularity.
- **Day of week**: Metrics that differ across days of the week (for example, lower activity on Sundays).
- **Day of month**: Metrics with recurring patterns tied to the calendar month, such as end-of-month spikes.
- **Weekday vs. weekend**: Metrics with systematically different behavior on weekends versus weekdays.

When seasonality is detected, the model shifts expected bounds to reflect the typical value at that point in the cycle rather than relying on a flat average.

### Stationarity

Stationarity describes whether a metric's average value is constant over time or trending in one direction.

- **Stationary metrics** have a consistent average (for example, a row count for a table that occasionally adds or drops rows in equal measure).
- **Non-stationary metrics** trend upward or downward over time (for example, a growing events table that adds millions of rows per week).

The model accounts for trend direction when setting bounds. For non-stationary metrics, it adjusts expectations based on the direction and rate of change rather than treating deviation from a flat baseline as anomalous.

## Annotations

Annotations let you provide feedback to the model when it misclassifies a point, either by alerting when it should not have or by missing an alert when it should have. Because data quality expectations are often business-specific, annotations are the primary way to tune the model to your team's needs over time.

See [Annotate bounds][1] on the Data Observability Monitor page for available annotation types and how to apply them.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/data_observability/#annotate-bounds
