---
title: Real-Time Cloud Costs
private: true
description: View and analyze cloud spend in real time.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
---

{{< callout url="#" btn_hidden="true" header="Real-Time Costs is in Preview" >}}

## Overview

Real-Time Costs provide near real-time estimates of your Amazon EC2 compute spend, allowing you to see changes before they appear on your bill.

Use real-time costs to:
- Detect anomalies early
- Observe the impact of recent changes
- Monitor hourly or sub-hourly spend trends

Estimates are based on recent average hourly net amortized EC2 prices by instance type, region, and AWS account.

## Requirements

- Cloud Cost Management is enabled for the AWS account
- Datadog Agent is installed on each EC2 instance

## Usage

To use real-time costs it is recommended to always use the `sum` aggregation. In addition a `rollup` using a `sum` with an interval no less than 5min is recommended. `sum:aws.cost.net.amortized.realtime.estimated.test{*}.as_count().rollup(sum, 300)`

Using `count` shows the amount spent over the selected interval. For example if you set a 5-minute rollup, the count is the amount spent in 5 minutes. If the rollup is 1 hour, it would be about 12 times as large.
Using `rate` shows the amount spent per second. To convert this value to a different time unit, multiply accordingly. For example, multiplying the rate per second by 3,600 gives you the rate per hour.

You can learn more about rate metrics [here][1].

## Accuracy

- Sources of variance include:
  - Hourly averages that shift with your recent mix of on-demand, commitment, and spot spend
  - Minor differences in true instance start and end times vs what the agent reports
- Underestimation can occur when:
  - EC2 instances are not monitored by the Datadog Agent
  - Newly used instance types or regions have not yet appeared in CCM billing data
  - Estimates cover compute only (not EBS, networking, and so on)
- Overestimation can occur when:
  - Instances are monitored by the Datadog Agent but are not included in CCM billing data
- Preview accuracy:
  - During the preview period data may be unstable. Large temporary drops in cost or gaps may occur
  - For long-term trends, Datadog always recommends to use the accurate Cloud Cost metrics based on direct AWS billing data

## Limitations

Tagging may be inconsistent when compared to other CCM metrics.
Not all AWS billing or FinOps FOCUS tags can be replicated to the real-time cost metric.
Real-time costs also do not support tag pipelines. Real-time costs do not support Kubernetes resource tags such as `kube_namespace`. Therefore only tags that show up on Amazon EC2 instance directly are available. Tags that exist only on Kubernetes nodes are not available.

[1]: /metrics/types/?tab=rate#metric-types
