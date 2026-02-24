---
title: Model Training Periods
description: "Understand when Quality Monitoring models train, how long training takes, and what to expect during the training period."
further_reading:
  - link: '/data_observability/quality_monitoring'
    tag: 'Documentation'
    text: 'Quality Monitoring Overview'
---

## Overview

Quality Monitoring monitors use machine learning models to establish a baseline of normal behavior for your data. Before a monitor can detect anomalies, the model must first learn what "normal" looks like for the metric it is watching. This process is called the training period.

## When does training occur?

A monitor enters training in the following situations:

- **Initial setup**: When a monitor is first created, the model trains on historical data to establish its initial baseline.
- **Training window changes**: If you update the training window start date to exclude older observations, the model retrains on the narrower history.
- **Significant annotation changes**: Adding or removing **Expected** annotations that substantially affect the training history can cause the model to retrain.

## What happens during training?

While a monitor is in training, the model is still learning the baseline pattern and may not send alerts. This is expected behavior. Training typically completes within a week, depending on the amount of historical data available and the frequency at which the metric is collected.

## Tips for shorter training periods

- Make sure the metric being monitored has enough historical data. Monitors on metrics with sparse or infrequent data points may take longer to train.
- Set the training window start date to a point where the data reflects the current normal pattern. Training on outdated or irregular data can slow convergence and produce less accurate bounds.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
