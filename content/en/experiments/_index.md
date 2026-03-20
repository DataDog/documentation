---
title: Experiments
description: Plan, run, and analyze randomized experiments across your stack with Datadog Experiments.
further_reading:
- link: "/feature_management/"
  tag: "Documentation"
  text: "Feature Flags"
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
---

## Overview

Datadog Experiments helps you run and analyze randomized experiments, such as A/B tests, from rollout through results. It combines [Datadog Feature Flags][1] for assigning users to variants with statistical analysis to measure how each variant affects key outcome metrics.

You can use Feature Flags capabilities — including multi-variant testing, granular targeting, and canary rollouts — to deploy a change, then evaluate its impact using Datadog data or metrics from your own data warehouse.

## How Experiments work

1. Use [Datadog Feature Flags][1] to deploy a change and assign users to control and variant groups.
2. Select the metrics you want to evaluate.
3. As the experiment runs, Datadog compares performance between the control and each variant.
4. Review lift, confidence intervals, and statistical significance to understand the impact of the change.

## Data sources

Experiments can analyze metrics from:

- **[Product Analytics][2]** for user behavior and journey metrics
- **[Real User Monitoring (RUM)][3]** for client-side and performance signals
- **[Warehouse-native data sources][4]** for business and operational metrics from your own data warehouse

## Getting started

To start using Experiments, [install the Feature Flags SDK][5] and [create your first metrics][6].

If you already use Product Analytics or Real User Monitoring, you can start creating metrics right away.

<!-- THIS NEEDS THE GUIDES TO BE COMNPLETED FIRST

To connect your data warehouse, follow the appropriate setup guide:

- [Snowflake][7]
- [Databricks][8]
- [BigQuery][9]
- [Redshift][10]
 -->

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_management/
[2]: /product_analytics/
[3]: /real_user_monitoring/
[4]: /experiments/warehouse_native/
[5]: /feature_management/setup/
[6]: /experiments/metrics/
[7]: /experiments/warehouse_native/snowflake/
[8]: /experiments/warehouse_native/databricks/
[9]: /experiments/warehouse_native/bigquery/
[10]: /experiments/warehouse_native/redshift/
