---
title: Experiments
description: Plan, run, and analyze randomized experiments across your stack with Datadog Experiments.
further_reading:
- link: "https://www.datadoghq.com/blog/experiments"
  tag: "Blog"
  text: "Measure the business impact of every product change with Datadog Experiments"
- link: "/feature_flags/"
  tag: "Documentation"
  text: "Feature Flags"
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
---

## Overview

Datadog Experiments is a composable platform for end-to-end experimentation. An experiment in Datadog consists of two components:

1. A **randomized assignment** of [subjects][18] (typically users) to two or more variations—either from a [Datadog Feature Flag][1], or your randomization system of choice
2. A set of **metrics** to compare between variants—computed either within Datadog or with warehouse native analytics.

To get started, select a link from the table below. Otherwise, read on to learn more about Datadog Experiments.

| Quick Links | |
| :---- | :---- |
| [Connect a data warehouse][13] | Set up Snowflake, BigQuery, Redshift, or Databricks for warehouse-native experiment analysis |
| [Create a warehouse-native metric][14] | Define Metric SQL Models and experiment metrics from warehouse data |
| [Create a metric from Product Analytics or Real User Monitoring data][15] | Build experiment metrics from client-side RUM and Product Analytics events |
| [Launch an experiment using Datadog Feature Flags][16] | Plan your hypothesis, configure randomization with Feature Flags, and start your experiment |
| [Analyze an experiment that's already been randomized][17] | Define exposure data in your warehouse when randomization runs outside Datadog Feature Flags |
| [Understand experiment diagnostics][20] | Interpret automated checks for exposures, metrics, randomization, and analysis health |

## Randomization

Every experiment needs a way to assign subjects to a control or treatment variant. Datadog supports two approaches.

### Datadog Feature Flags

[Datadog Feature Flags][1] is the default way to randomize experiments. Create a flag, implement it with the [Feature Flags SDK][9], and pass a stable subject identifier as the `targetingKey` so the same user always receives the same variant. Datadog uses deterministic hashing to keep assignments consistent across sessions and devices.

When you [plan and launch an experiment][16], link it to a feature flag to define traffic splits, targeting rules, and rollout behavior. You can also create an experiment directly from a flag's detail page. To randomize by a unit other than user—for example, an organization—see [Subject Types][18].

### Bring your own randomization

If you randomize subjects outside Datadog—for example, with an in-house system—use [Exposure SQL Models][17] to tell Datadog who was exposed to each experiment and when. Exposure SQL Models query exposure records from your [connected warehouse][13] and map them to Datadog fields such as subject key, timestamp, experiment ID, and variant ID.

Datadog deduplicates exposure data automatically: if a user appears in multiple variants for the same experiment, that user is excluded from the analysis. When exposures come from your warehouse instead of Feature Flags, metrics built on Datadog SDK events are not supported—you need [warehouse-native metrics][14].

## Metrics

Experiment metrics define what you measure to decide whether a change succeeded. Create at least one primary metric before launching an experiment, and add secondary metrics as guardrails for unintended effects on performance, engagement, or revenue.

### Warehouse native mode

In warehouse native mode, Datadog runs experiment analysis directly in Snowflake, BigQuery, Redshift, or Databricks. After you [connect your warehouse][13], create a **Metric SQL Model** that maps warehouse tables to Datadog, then define metrics from that model. Map each model to one or more [subject types][18] and specify a timestamp column so Datadog can join metric events to experiment exposures.

Warehouse mode is required when you use [Exposure SQL Models][17] for randomization. It also suits teams whose source of truth for business metrics already lives in the warehouse.

### Product Analytics and RUM

For client-side experiments, build metrics from events collected by the [Real User Monitoring (RUM)][2] and [Product Analytics][3] SDKs. Define metrics from actions, views, sessions, and other event types, then choose an aggregation method such as count of events, count of unique users, or sum of a property.

This path works when randomization runs through [Datadog Feature Flags][1] and you want to measure user behavior, funnel conversion, or application performance without querying a warehouse. Product Analytics and RUM metrics are available in near real time as experiments launch.

## Statistics

Datadog applies statistical analysis to compare variants and estimate lift. When you set up an experiment, choose an [analysis method][11]—sequential frequentist, fixed-sample frequentist, or Bayesian—and optionally run a [sample size calculation][8] to estimate how long the experiment needs to run. After results are in, use [Global Lift][19] to understand how a targeted experiment lift translates to impact on your company-wide metric total, and [Cumulative Impact][12] to aggregate noise-adjusted effects across many experiments on the same metric.

{{< img src="/product_analytics/experiment/overview_metrics_view-1.png" alt="The Experiments metrics view showing business, funnel, and performance metrics with control and variant values and relative lift for each metric. A tooltip is open on the Revenue metric showing Non-CUPED values for Revenue per User, Total Revenue, and User Assignment Count across the control and variant groups." style="width:90%;" >}}

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/
[2]: /real_user_monitoring/
[3]: /product_analytics/#getting-started
[4]: /experiments/defining_metrics
[5]: /experiments/plan_and_launch_experiments
[6]: /getting_started/feature_flags/#create-your-first-feature-flag
[7]: /experiments/plan_and_launch_experiments#step-3---launch-your-experiment
[8]: /experiments/plan_and_launch_experiments/#run-a-sample-size-calculation-optional
[9]: /getting_started/feature_flags/#feature-flags-sdks
[10]: /experiments/guide/
[11]: /experiments/statistics/analysis_methods
[12]: /experiments/concepts/cumulative_impact
[13]: /experiments/guide/connecting_a_data_warehouse/
[14]: /experiments/defining_metrics/?tab=warehouse
[15]: /experiments/defining_metrics/?tab=productanalyticsorum
[16]: /experiments/plan_and_launch_experiments/
[17]: /experiments/concepts/exposure_sql/
[18]: /experiments/concepts/subject_types/
[19]: /experiments/statistics/global_lift
[20]: /experiments/diagnostics/
