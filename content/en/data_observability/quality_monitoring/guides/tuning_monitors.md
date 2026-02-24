---
title: Tuning Monitors
description: "Guidance for improving the behavior of anomaly detection models that power your Quality Monitoring monitors."
further_reading:
  - link: '/data_observability/quality_monitoring'
    tag: 'Documentation'
    text: 'Quality Monitoring Overview'
---

## Overview

If your monitors are producing too many false alerts or missing real issues, use the steps below to improve their behavior.

## Troubleshooting failing alerts

### The monitor is alerting but the current value looks normal

- **Annotate the data point.** Click a recent failing data point and annotate it:
  - **Reset for now**: Marks the behavior as OK but alerts if it happens again. Use this for one-time anomalies.
  - **Expected**: Permanently expands the expected range to include the annotated behavior. Use this if you expect similar patterns in the future.
- **Increase the Deviations value.** This widens the expected range and reduces sensitivity. Increasing Deviations to its maximum will roughly double the width of the range.
- **Update the training window start date** to a point after the current normal pattern began. The model retrains on the more recent data. See [Model Training Periods][1] for details.

## Tuning predictions

### The expected range is wider than I want

- **Decrease the Deviations value.** This narrows the expected range. Decreasing Deviations to its minimum will shrink the range by roughly two-thirds.
- **Switch to the Thresholds detection method.** This is best when you have a clear idea of what values are acceptable, rather than relying on the model to learn them.
- **Remove Expected annotations from the monitor history.** Data points annotated as **Expected** permanently widen the range. Re-annotating them as **Missed alert** undoes this.
- **Update the training window start date.** If the metric is less volatile now than in the past, setting the start date to when the more stable pattern began trains the model on more predictable data.
- **Add a complementary monitor.** For example:
  - Pairing a freshness monitor with a row count monitor can catch issues that either monitor might miss alone.
  - A group by columns monitor on a subset of your data can surface issues that are harder to detect at the full table level. For example, grouping row count by data source can catch when a single source stops sending data.

### The expected range is fluctuating in unexpected ways

- **Annotate failing data points that were actually normal** as **Missed alert** in the monitor history. This helps the model learn what you consider normal.
- **Use a WHERE clause in your custom SQL** to feed the model a more predictable subset of the data. Update the training window start date to exclude historical observations from before the WHERE clause was applied.

### My custom SQL monitor is not behaving as expected

- **Use a model type that matches your query's aggregation.** For example, use the **Row Count** model type if your query returns a count, or **Percentage** if it returns a value between 0 and 100.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/quality_monitoring/guides/model_training_periods
