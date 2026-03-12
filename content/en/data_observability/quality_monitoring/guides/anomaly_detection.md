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

Training typically takes between 3 and 7 days, depending on how frequently the underlying metric updates. Because many data pipelines behave differently on weekends, the model needs to observe both weekday and weekend behavior.

After training completes, the monitor begins alerting. The chart uses color to indicate the current evaluation state:

| Color | State | Description |
|-------|-------|-------------|
| Blue | Training | The monitor is learning baseline behavior. No alerts are triggered. |
| Green | Normal | The observed value is within expected bounds. |
| Red | Alerting | The observed value fell outside expected bounds. |

## Model states

The model often reuses prior predictions rather than generating new ones, such as when a value hasn't changed or when the monitor is in an alerting state. As a result, adding [annotations][2] is the primary way to get an alerting monitor back to a normal state and resume learning from new values.

## Metric-specific behavior

While the core model logic is shared across metric types, each type has additional rules:

| Metric type | Alert condition |
|-------------|----------------|
| Freshness | Time since last refresh is longer than expected based on historical update patterns. A small buffer is added to the upper bound to avoid alerting on minor delays. |
| Row count | Row count has not changed for longer than normal, indicating a stalled or broken pipeline. |
| Nullness, uniqueness | A jump to 0% or 100% when the metric has historically stayed away from those extremes. |
| Custom SQL (Default model) | Value falls outside the expected range inferred from history. If the metric has never returned a negative value, the lower bound is constrained to 0. |

### Freshness

Freshness monitors alert when the time since the last refresh is longer than expected based on historical update patterns. The model adds a small buffer to the upper bound to avoid alerting on minor delays.

### Row count

Row count monitors alert when a table's row count has flatlined, meaning it has not changed for longer than normal. A stalled row count may indicate a broken pipeline.

### Percentage (nullness, uniqueness)

Percentage metrics are bounded between 0 and 100. If the metric stays away from those extremes, a jump to 0% or 100% will trigger an alert.

### Custom SQL

For custom SQL monitors with the **Default** model type, the model infers the expected range from the metric's history. For example, if a custom metric has never returned a negative value, the model constrains the lower bound to 0.

## Seasonality

The model uses up to 400 days of history to detect seasonal patterns, account for trends, and incorporate feedback from past annotations. For example, if a metric consistently drops on Sundays, the model treats lower values on Sundays as normal rather than anomalous.

The following seasonal patterns are detected:

| Pattern | Description |
|---------|-------------|
| Hour of day | Metrics that follow intraday patterns, such as higher row counts during business hours. |
| Hour of week | Metrics with consistent patterns across a full week at hourly granularity. |
| Day of week | Metrics that differ across days of the week, such as lower activity on Sundays. |
| Day of month | Metrics with recurring patterns tied to the calendar month, such as end-of-month spikes. |
| Weekday vs. weekend | Metrics with systematically different behavior on weekends versus weekdays. |

Not all seasonal patterns are available for all metric types. Additionally, the model requires multiple complete cycles of normal ("green") history before it can detect a given pattern.

## Trends

The model accounts for whether a metric is growing or shrinking over time. For a metric that consistently adds rows each week, the model adjusts expectations based on the direction and rate of change rather than treating growth as anomalous.

## Annotations

Annotations let you provide feedback to the model when it misclassifies a point, either by missing an alert or by generating a false alert. Because data quality expectations are often business-specific, annotations are the primary way to tune the model to your team's needs over time.

Annotations have two effects:
- **Correcting the current state**: Marking a flagged point as expected moves the monitor out of the alerting state and resumes normal learning.
- **Shaping future predictions**: The model weights annotated points when generating future bounds, so repeated feedback improves accuracy over time.

See [Annotate bounds][2] on the Data Observability Monitor page for available annotation types and how to apply them.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/data_observability/
[2]: /monitors/types/data_observability/#annotate-bounds
