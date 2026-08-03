---
title: Break Out Metrics by Property
description: Break out an experiment metric by the values of an event property to compare lift across segments without creating a separate metric for each value.
further_reading:
- link: "/experiments/defining_metrics/"
  tag: "Documentation"
  text: "Create Experiment Metrics"
- link: "/experiments/reading_results/"
  tag: "Documentation"
  text: "Reading Experiment Results"
- link: "/experiments/statistics/analysis_methods/"
  tag: "Documentation"
  text: "Analysis Methods"
---

## Overview

A single metric often hides meaningful differences between segments of your users. A change that lifts revenue overall might help users on one device type while hurting users on another, and an aggregate result averages those effects together.

Metric property breakouts let you split a metric by the values of an event property-such as country, device type, or browser. This shows you the lift and confidence interval for each value alongside the overall result. You configure the properties and values you care about once on the metric. Datadog computes a separate result for each value, using the same analysis as the parent metric.

A breakout is purely additive: the overall metric is still calculated across all events, and each property value is reported as its own row underneath it.

<div class="alert alert-info">Metric property breakouts split a metric by the event properties you configure on the metric. To compare results by attributes captured when a subject was first exposed (such as a user's region or whether they are a new visitor), use <a href="/experiments/reading_results/#segment-level-results">segment-level results</a> instead.</div>

## Configure breakouts on a metric

You define breakouts when you [create or edit a metric][1]. Breakouts are supported for metrics built on Product Analytics, Real User Monitoring (RUM), and [warehouse][2] data.

1. Navigate to the [Metrics page][3] in Datadog Product Analytics and create a metric or open an existing one.
1. Configure the [metric definition][1].
1. In the {{< ui >}}Split by Metric Properties{{< /ui >}} section, click {{< ui >}}Add Property{{< /ui >}}.
1. Select a {{< ui >}}Property{{< /ui >}} to break out by (for example, **Country**, **Device Type**, or **Browser**). The available properties come from the metric's data source. For warehouse metrics, the property must be a column on the metric's [SQL model][2].
1. In the {{< ui >}}Values{{< /ui >}} column, select the property values you want to break out (for example, **CA**, **US**, and **UK**).
1. (Optional) Click {{< ui >}}Add Property{{< /ui >}} again to break out by additional properties, or click the trash icon to remove a property.
1. Click {{< ui >}}Save{{< /ui >}}.

{{< img src="/product_analytics/experiment/metric_property_breakouts/config.png" alt="The Split by Metric Properties section of the metric form showing a table with a Property column set to Country and a Values column with CA, US, and UK selected, and an Add Property button below." style="width:90%;" >}}

### How property values are discovered

Datadog discovers the available values for each property automatically. It scans the metric's data source over the previous 30 days and keeps the 50 most frequently observed values, ordered by how often they occur. This list refreshes once per day.

If you don't see a value you expect, it might occur too infrequently to rank among the top 50 values, or it might not have appeared in the data source within the last 30 days.

## View broken-out results

After an experiment runs against a metric that has breakouts configured, you can reveal the per-value results in the experiment's results scorecard.

1. Open your experiment's [results][4] and switch to the confidence-interval view.
1. Hover over a metric that has breakouts configured to reveal its row actions, then click the {{< ui >}}Split by Metric Properties{{< /ui >}} icon.
1. Select the properties you want to break out by, then click {{< ui >}}Apply{{< /ui >}}.

A {{< ui >}}Property{{< /ui >}} column appears. The parent metric row is labeled {{< ui >}}Overall{{< /ui >}}, and each selected property value appears as a sub-row (for example, **Country: UK**) with its own per-subject values, relative lift, and confidence interval.

{{< img src="/product_analytics/experiment/metric_property_breakouts/scorecard.png" alt="An experiment Decision Metrics scorecard with a Property column. The Demo Server Revenue primary metric row is labeled Overall with a 35.9% relative lift, and sub-rows labeled Country: UK, Country: US, and Country: CA each show their own control and treatment values, relative lift, and confidence interval bars." style="width:90%;" >}}

To remove a breakout, open the metric's actions again and click the hide action for that property (for example, {{< ui >}}Hide splits by Country{{< /ui >}}).

<div class="alert alert-info">Splitting and hiding breakouts is a display option that does not change the experiment or metric configuration, so anyone viewing the experiment can apply it. Breakouts are available in the confidence-interval view.</div>

### Break out exploration charts

When you [explore results][4] in a chart, use the {{< ui >}}Split by{{< /ui >}} selector and choose {{< ui >}}Metric property{{< /ui >}} followed by the property name to plot each property value as a separate series.

## How breakouts are calculated

For each property value you select, Datadog creates a *sub-metric*: a copy of the parent metric with an additional filter that keeps only the events where the property equals that value. For example, a breakout on `Country = US` analyzes the parent metric using only events where the country is `US`.

Each sub-metric flows through the same analysis pipeline as the parent metric, so every breakout value receives its own lift estimate, confidence interval, [CUPED][5] adjustment, and significance test, computed on its filtered subpopulation. The [analysis method][5] and confidence level configured for the experiment apply to every breakout.

Because each breakout analyzes a subset of the data, breakouts have smaller sample sizes than the parent metric. A breakout value may need more data than the overall metric to reach statistical significance.

## Supported metrics and constraints

Metric property breakouts have the following requirements and limitations:

| Aspect | Support |
|---|---|
| **Metric types** | Metrics using any [aggregation method][6] (such as count, sum, average, or percentile), as well as [ratio metrics][7]. Cross-source ratio metrics (where the numerator and denominator come from different data sources) are not supported. |
| **Data sources** | Product Analytics, RUM, and warehouse metrics. |
| **Properties** | The property must belong to the metric's data source. |
| **Values** | Select from the values Datadog discovers for the property (up to 50 of the most frequent values). |
| **Results view** | Breakouts appear in the confidence-interval view of experiment results. |

**Note**: [Outlier handling (winsorization)][1] configured on the parent metric is not applied to breakouts, because a threshold computed across the full population is not meaningful for a filtered subpopulation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /experiments/defining_metrics/
[2]: /experiments/defining_metrics/?tab=warehouse#create-a-sql-model
[3]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[4]: /experiments/reading_results/
[5]: /experiments/statistics/analysis_methods/
[6]: /experiments/defining_metrics/#aggregation-methods
[7]: /experiments/defining_metrics/#ratio-metrics
