---
title: Anomaly
description: Learn about how the anomaly detection method works.
disable_toc: false
---

## Overview

Anomaly detection analyzes logs to identify abnormal spikes in your log volume, which could indicate issues such as an attack, misconfiguration, or runaway process.

See [Create Rule][1] for instructions on how to configure an anomaly rule.

## How anomaly detection works

The anomaly detection rule:

- Aggregates incoming logs into time buckets and computes a baseline.
    - The upper bound reflects the 99.5th percentile of your recent history, using up to 2 weeks of historical logs.
- Checks on each evaluation for the most recent evaluation window and measures how much the series exceeds that bound.
    - A signal is triggered if the excess is large enough over the whole window.

The anomaly method adapts to your normal patterns and reduces noise from routine fluctuations.

**Note**: The anomaly method detects spikes only. It does not alert on drops in log volume.

### Seasonality and learning period

The algorithm automatically accounts for daily and weekly seasonality so regular peaks, such as end-of-week surges, do not alert.

A short learning period is applied for new rules or newly observed values for a `group by`.` During the learning period, data is collected to build a baseline.

## Best practices

- Scope the query narrowly. Filter by service, environment, team, or endpoint to reduce noise.
- Start with managed default rules for broad coverage, then add custom anomaly rules for high-volume log sources.

[1]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule?tab=anomaly
[2]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule/?tab=anomaly#rule-multi-triggering-rt-anomaly