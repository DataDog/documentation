---
title: Evaluation Tracking
description: Monitor feature flag rollouts with evaluation metrics and real-time graphs in Datadog.
further_reading:
- link: "/feature_flags/concepts/targeting_rules"
  tag: "Documentation"
  text: "Targeting Rules and Filters"
- link: "/getting_started/feature_flags/"
  tag: "Documentation"
  text: "Getting Started with Feature Flags"
---

## Overview

Evaluation tracking helps you monitor how feature flags are performing in production. Each time your application evaluates an enabled feature flag with an SDK, Datadog can capture evaluation metrics so you can see rollout progress and variant distribution.

## Evaluations graph

On the feature flag details page, the **Evaluations** graph shows how often your flag is evaluated over time. Use this graph to monitor the rollout of a feature flag—for example, to confirm traffic increases as you enable a flag or advance a progressive rollout.

{{< img src="getting_started/feature_flags/real-time-flag-metrics.png" alt="Evaluations graph showing gradual ramp up in traffic" style="width:100%;" >}}

## Evaluation metrics

Evaluation metrics are captured each time you evaluate an enabled feature flag with an SDK. Metrics are broken down by **variant**, so you can see the actual distribution of traffic across variant values.

When `DD_METRICS_OTEL_ENABLED=true` is set for server-side SDKs, each evaluation records a `feature_flag.evaluations` counter metric tagged with the flag key, result variant, and evaluation reason. See [Server-Side Feature Flags](/feature_flags/server/) for configuration details.

## Targeting rule counts

In the **Targeting Rules & Rollouts** section, you can see a count of subjects that have encountered each targeting rule or your default variant. Use these counts to validate that your filters and percentages match expected traffic patterns.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
