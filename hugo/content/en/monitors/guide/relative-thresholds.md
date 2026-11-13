---
title: Relative Thresholds
description: "Configure relative thresholds (Preview) to compare metric values with historical baselines, including query syntax, recovery thresholds, and limitations."
---

## Overview

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Relative thresholds are in Preview and are available for metric monitors.
{{< /callout >}}

Relative thresholds let you alert when a metric deviates from its historical behavior, without choosing a fixed threshold.

Instead of alerting when a metric exceeds a specific value, such as 100 ms, alert when it exceeds a multiple of its historical baseline. For example, alert when a metric exceeds `1.5x` its average over the past week.

Relative thresholds are useful for metrics whose normal values vary between services, hosts, or other groups, or gradually change over time. They provide an alternative to static thresholds and anomaly detection when you want to detect a known degree of change.

## How relative thresholds work

A relative threshold compares two values:

- **Current value:** The metric value calculated over the monitor's evaluation window, such as the average over the last 5 minutes.
- **Historical threshold:** A threshold calculated from historical metric data, optionally multiplied by a factor.

For example, configure a monitor to alert when:

`Average over the last 5 minutes > 1.5x the average over the last week`

If a service's historical average request latency is 200 ms, its alert threshold is 300 ms. If the historical average later increases to 250 ms, its alert threshold becomes 375 ms.

Unlike a static threshold, the threshold adapts to the metric's historical behavior.

### Historical baseline

The historical threshold is calculated using an aggregation over a longer time window. The aggregation and time window determine how the baseline responds to past behavior.

Relative thresholds support historical windows from 1 week to 6 months.

**Historical thresholds are recalculated daily at midnight UTC.** The calculated threshold remains constant between updates, while the monitor continues evaluating current metric values at its configured evaluation frequency.

This provides a stable baseline that adjusts to longer-term changes without reacting immediately to every short-term fluctuation.

### Grouped monitors

For monitors grouped by dimensions such as `service`, `host`, or `region`, Datadog calculates a separate historical threshold for each group.

For example, a monitor grouped by `service` might have the following values:

| Service | Historical average | Multiplier | Alert threshold |
|---|---:|---:|---:|
| Service A | 100 ms | `1.5x` | 150 ms |
| Service B | 400 ms | `1.5x` | 600 ms |
| Service C | 800 ms | `1.5x` | 1200 ms |

Each service is evaluated independently against its own threshold.

This allows a single monitor to cover services with different normal operating characteristics without requiring separate static thresholds.

## Configure a relative threshold

To configure a relative threshold:

1. Create or edit a [metric monitor][1].
2. Define the metric and its evaluation window.
3. In the alert conditions, select a relative threshold.
4. Select the historical aggregation and lookback window.
5. Set a multiplier that determines how much the current value can deviate from the historical baseline.
6. Configure the alert direction and, optionally, a recovery threshold.
7. Review the resulting thresholds and monitor behavior before saving.

For example, set the alert threshold to `1.5x` the historical baseline to detect an increase. Set it to `0.7x` and choose the below direction to detect a drop.

### Query syntax

Relative thresholds are supported in metric monitors using Formulas and Functions queries.

The monitor query uses `threshold` as a placeholder for the calculated threshold:

```text
formula("query1").rollup("avg").last("5m") > threshold
```

The historical threshold is defined in `options.thresholds.critical_query`:

```text
formula("query1").rollup("avg").last("1w").multiplier(1.5)
```

The historical query has the following structure:

```text
formula("<EXPRESSION>").rollup("<AGGREGATION>").last("<WINDOW>").multiplier(<FACTOR>)
```

- `formula`: A formula referencing the metric query variables. Formulas can contain arithmetic expressions.
- `rollup`: The aggregation used to calculate the historical value, such as `avg`.
- `last`: The historical lookback window, such as `1w` or `1mo`.
- `multiplier`: An optional numeric multiplier applied to the aggregated historical value.

The multiplier applies to the result of the historical aggregation, rather than to individual datapoints. For a `1.5x` threshold, use `.multiplier(1.5)` in the query.

### API example

The following example alerts when the average job duration over 5 minutes exceeds `1.5x` its historical weekly average, grouped by job.

```json
{
  "name": "Job duration above historical baseline",
  "type": "query alert",
  "query": "formula(\"query1\").rollup(\"avg\").last(\"5m\") > threshold",
  "message": "Job duration is above its historical baseline.",
  "options": {
    "thresholds": {
      "critical_query": "formula(\"query1\").rollup(\"avg\").last(\"1w\").multiplier(1.5)",
      "critical_recovery_query": "formula(\"query1\").rollup(\"avg\").last(\"1w\").multiplier(1.2)"
    },
    "variables": [
      {
        "name": "query1",
        "data_source": "metrics",
        "query": "avg:example.job.duration{env:prod} by {job}"
      }
    ]
  }
}
```

Replace `example.job.duration` with your metric.

In this example:

- The monitor enters `ALERT` when the current average duration exceeds `1.5x` the historical weekly average.
- The monitor recovers when the current average falls to or below `1.2x` the historical weekly average.
- Each job has its own calculated threshold.

See the [Monitors API][2] for additional configuration options.

## Limitations

Relative thresholds have the following restrictions:

| Restriction | Description |
|---|---|
| Monitor types | Supported for metric monitors using Formulas and Functions queries. |
| Historical window | Must be between 1 week and 6 months and at least as long as the monitor's evaluation window. |
| Threshold types | Supports critical threshold queries and critical recovery threshold queries. Relative warning thresholds are not supported in this Preview. |
| Static thresholds | Relative and static thresholds cannot be combined in the same monitor. |
| Query result | The threshold query must produce a numeric threshold for each matching group that can be compared with the current evaluated value. |
| Historical data | Sufficient historical data must be available to calculate the threshold for a group. |
| Update frequency | Historical thresholds are recalculated daily rather than on every monitor evaluation. |

The monitor and historical queries must produce compatible results for comparison. If Datadog cannot calculate a historical threshold for a group, the monitor cannot perform the comparison for that group. For example, a group might have no matching historical data.

When historical data is unavailable, the monitor's [missing-data behavior][3] determines how the absence of an evaluable result is handled.

## When to use relative thresholds

Use relative thresholds to detect a meaningful change from an established baseline. The expected change should be expressible as a ratio.

### Detect gradual performance degradation

Monitor metrics such as request latency, processing duration, or queue processing time.

For example, alert when a job's execution time exceeds `1.5x` its historical average. This allows you to detect regressions even if different jobs have different execution times.

### Monitor resources with different baselines

Monitor a fleet of services or hosts without choosing individual thresholds for each resource.

For example, one service might normally consume 10% CPU while another consumes 60%. A relative threshold can identify increases from each service's normal behavior using a single grouped monitor.

### Detect changes in workloads that grow over time

Monitor metrics where the expected value increases or decreases gradually as a business or service evolves.

For example, alert when the duration of a regularly scheduled data processing job increases significantly compared to its historical average.

Because the threshold adapts over time, you don't need to repeatedly adjust a static threshold as normal operating conditions change.

## When not to use relative thresholds

Relative thresholds are not appropriate for every monitoring scenario.

### When there is a known absolute limit

If a metric has a clear failure boundary, use a static threshold.

For example, alerting when disk usage exceeds 90% is usually more appropriate than alerting when disk usage exceeds `1.5x` its historical average.

A relative threshold can rise alongside sustained degradation, potentially allowing an unhealthy value to become part of the baseline.

### When the historical baseline is near zero

Relative comparisons can be misleading when historical values are zero or small.

For example, increasing from one error per hour to three errors per hour is a 200% increase, but might not represent a meaningful incident.

Consider using an absolute threshold when small changes in low-volume metrics should not trigger alerts.

### When data has strong daily or weekly seasonality

Relative thresholds aggregate historical data over a longer period rather than modeling expected behavior for a particular time of day or day of week.

For example, request volume might consistently be lower overnight than during business hours. Comparing overnight traffic against an entire week's average could produce unwanted alerts.

For metrics with strong recurring patterns, consider an [anomaly detection monitor][4] or a [change alert][5].

### When groups are short-lived or data is extremely sparse

Relative thresholds require sufficient historical data to calculate a meaningful baseline.

New services, temporary resources, or infrequently reporting metrics might not have enough historical observations. This can prevent evaluation or produce baselines that do not accurately represent normal behavior.

For these cases, consider a static threshold or a monitor designed around the expected frequency of the data.

### When you need immediate adaptation

Historical thresholds update daily and are intended to detect deviations from longer-term behavior.

If the expected range needs to adapt continuously to changing conditions, consider another detection method, such as anomaly detection.

[1]: /monitors/types/metric/
[2]: /api/latest/monitors/#create-a-monitor
[3]: /monitors/configuration/?tab=thresholdalert#no-data
[4]: /monitors/types/anomaly/
[5]: /monitors/types/change-alert/
