---
title: Metric Name Pricing for Custom Metrics
further_reading:
- link: "/account_management/billing/custom_metrics/"
  tag: "Documentation"
  text: "Custom Metrics billing (cardinality pricing)"
- link: "/metrics/custom_metrics/"
  tag: "Documentation"
  text: "Learn more about custom metrics"
- link: "/metrics/metrics-without-limits/"
  tag: "Documentation"
  text: "Metrics without Limits™"
- link: "/metrics/guide/custom_metrics_governance/"
  tag: "Guide"
  text: "Best practices for custom metrics governance"
algolia:
  tags: ['custom metrics billing', 'metric name pricing']
---

## Overview

Metric Name pricing bills custom metrics based on the number of unique metric names you submit and the volume of datapoints those names produce. It replaces the cardinality-based [Custom Metrics billing][1] model for organizations that opt in.

**Note**: This page applies if your contract uses Metric Name pricing SKUs. These SKUs are mutually exclusive with the Timeseries (cardinality) pricing SKUs. If your contract uses Timeseries pricing instead, see [Custom Metrics billing][1].

Datadog distinguishes ingested datapoints (every metric datapoint your services send) from indexed datapoints (the points that remain queryable after your tag and metric configuration is applied). You control your indexed volume with [Metrics without Limits™][4]. Excluding tags you don't need reduces the indexed datapoints you're billed for. Ingested datapoints are the raw inputs from which indexed values are computed, and indexed volume is always less than or equal to ingested volume.

## SKUs

Metric Name pricing introduces three SKUs:

| SKU                                  | What it bills                                                            |
|--------------------------------------|--------------------------------------------------------------------------|
| `metric_names/FLEX-METRIC-NAME`      | Each unique metric name submitted in a month with more than 100 indexed datapoints |
| `indexed_points/FLEX-INDEXED-POINTS` | Indexed datapoints above the 10M-per-metric-name baseline |
| `ingest_points/FLEX-INGEST-POINTS`   | Ingested datapoints above 5x your indexed volume |

These SKUs are mutually incompatible with the Timeseries (cardinality) pricing SKUs.

## Pricing structure

Both metric names and indexed datapoints are priced with marginal, volume-based discounting across 15 tiers. Higher-volume tiers have lower per-unit rates. As your usage increases, the portion that crosses into each higher tier is billed at that tier's rate. Previously billed usage is never repriced.

{{< img src="account_management/billing/metric_name_pricing/marginal-pricing-tiers.png" alt="Diagram showing marginal pricing across five volume tiers. Each tier has a per-unit rate, visualized as a bar height; higher-volume tiers (right side) have progressively shorter bars, indicating lower per-unit rates than lower-volume tiers (left side)." style="width:100%;" >}}

Per-unit rates vary by contract type:

| Contract type   | Rate relative to Annual baseline |
|-----------------|----------------------------------|
| Annual          | Baseline                         |
| Month-to-Month  | +20%                             |
| On-Demand       | +40%                             |

Specific rates and tier boundaries are defined in your contract. Contact [Sales][2] or your [Customer Success][3] Manager for details.

## Monthly and hourly usage

Metric Name pricing usage is tracked hourly and billed either hourly or monthly, depending on your contract. Each unique metric name is counted once per month, in the hour it first submits indexed datapoints. Every billed metric name includes 10 million indexed datapoints. Datapoints beyond that allowance accumulate in a single monthly overage bucket across all of your metrics.

At the end of the billing period, the total monthly bill is the sum of:

- The tiered metric names charge for the month's unique metric names
- The tiered indexed datapoints charge for the month's overage datapoints

Monthly counters reset for the next billing cycle.

Hourly billing produces the same total as monthly billing. Hourly processing affects when tier boundaries are crossed, not the final charge.

### Example

Suppose, over a single month, your hourly usage looks like:

| Hour | New metric names this hour | Cumulative metric names | New overage datapoints this hour | Cumulative overage datapoints |
|------|----------------------------|-------------------------|-----------------------------------|--------------------------------|
| 1-5  | +6                         | 6                       | +18M                              | 18M                            |
| 6    | +100                       | 106                     | +5M                               | 23M                            |
| 7    | +150                       | 256                     | +10M                              | 33M                            |
| 8    | +200                       | 456                     | +15M                              | 48M                            |
| 9    | +100                       | 556                     | +10M                              | 58M                            |

At the end of the month:

- The 556 metric names are billed across the marginal tiers they fall into.
- The 58 million overage datapoints are billed across the marginal tiers they fall into.

## Ingestion behavior

Under Metric Name pricing, every metric datapoint your services send to Datadog counts toward ingestion, independent of [Metrics without Limits™][4] configuration. Indexed volume depends on your tag and metric configuration.

Your free ingestion allowance covers ingested datapoints up to five times your indexed volume. You're charged for ingested datapoints only above that threshold in a given month.

{{< img src="account_management/billing/metric_name_pricing/ingestion-billing.png" alt="Diagram showing the ingestion billing relationship under Metric Name pricing. Ingested volume splits into a free ingestion zone (up to five times the indexed volume) and a billable overage zone above that threshold. Indexed volume sits below as a separate measurement equal to one segment of the free ingestion zone." style="width:100%;" >}}

**Note**: This is a change from the cardinality-based model, in which only metrics configured with Metrics without Limits™ contribute to ingested volume.

### Distribution metrics

For [Distribution metrics][5], a multiplier applies to both ingested and indexed datapoints, regardless of whether the metric is configured with Metrics without Limits™. The multiplier is **five times** by default (one each for the count, sum, min, max, and avg aggregations Datadog generates). When percentile aggregations (p50, p75, p90, p95, p99) are enabled, the multiplier is **ten times**.

- For unconfigured Distribution metrics, ingested and indexed volumes are equal after the multiplier is applied.
- For configured Distribution metrics, the multiplier applies to ingested volume, while indexed volume can be lower depending on tag configuration and indexing rules.

#### Example

A Distribution metric that submits 100 datapoints with default aggregations is billed as 500 datapoints (100 × 5). With percentile aggregations enabled, the same submissions are billed as 1,000 datapoints (100 × 10).

## Historical Metric Ingestion

[Historical Metric Ingestion][6] usage is calculated based on ingestion time, not the metric's original timestamp. Each HMI datapoint contributes to both ingested and indexed volume.

{{< img src="account_management/billing/metric_name_pricing/ingestion-billing-hmi.png" alt="Diagram showing HMI billing under Metric Name pricing. The ingested volume bar and the indexed volume bar are the same width, joined by a 1:1 ratio annotation. For HMI metrics, ingested volume always equals indexed volume." style="width:100%;" >}}

## Committed adoption

You can commit to a usage volume independently for metric names and for datapoints. Each commitment is priced at the marginal pricing tier the committed volume falls into. The full committed volume is billed at that tier's rate, and marginal discounting does not apply within the committed range. Usage above the committed amount follows the standard marginal schedule, starting at the tier boundary immediately above the committed volume.

For example, if you commit to 15,000 metric names that fall within Tier 6, all 15,000 are billed at the Tier 6 rate. If your actual usage reaches 75,000 metric names, the additional 60,000 follow the marginal schedule from Tier 6 through Tier 8.

## Usage Attribution

For the initial phase of Metric Name pricing, [Usage Attribution][7] is supported for indexed datapoints. Metric names cost is attributed in proportion to each tag's share of the total datapoints. A tag-defined group that contributes 20% of the datapoints is attributed 20% of the metric names cost.

Usage Attribution for ingestion is not supported in the initial phase.

## Custom and standard metrics

Datadog classifies metrics as custom (paid) or standard (free) based on metric name prefix, the same way as in cardinality pricing. Standard integrations follow the existing [custom metrics and standard integrations][8] rules.

## Troubleshooting

For technical questions, contact [Datadog support][9].

For billing questions, contact your [Customer Success][3] Manager.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/billing/custom_metrics/
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: /metrics/metrics-without-limits/
[5]: /metrics/types/?tab=distribution#metric-types
[6]: /metrics/custom_metrics/historical_metrics/
[7]: /account_management/plan_and_usage/usage_details/
[8]: /metrics/custom_metrics/#standard-integrations
[9]: /help/
