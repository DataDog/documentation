---
title: Real-Time Costs
description: View and analyze cloud spend in real time.
aliases:
- /cloud_cost_management/real_time_costs
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
---

{{< callout url="https://www.datadoghq.com/product-preview/real-time-costs" header="Join the Preview!">}}
Real-Time Costs is in Preview.
{{< /callout >}}

## Overview

Real-Time Costs provide near real-time estimates of your Amazon EC2 costs, including Kubernetes cost allocation, so that you can react to cost changes in minutes and hours, instead of days. Estimates are generated using real-time usage data from the Datadog Agent, based on recent average hourly net amortized EC2 prices by instance type, region, and AWS account.

Use real-time costs to:
- Detect anomalies early
- Observe the impact of recent changes
- Monitor hourly or sub-hourly spend trends
- Gain deeper visibility into rapidly changing Kubernetes clusters

Real-time costs are currently available in Preview for:
- Amazon EC2 spend (excluding EBS, networking, etc)
- Kubernetes running on EC2

## Requirements

- Cloud Cost Management is enabled for the AWS account
- Datadog Agent is installed on each EC2 instance
- (Optional) To see Kubernetes costs in real time, enable Datadog Container Monitoring for your clusters by following the setup guide in [Container Cost Allocation][2]

## How to query real-time costs

Real-time costs can be found under the standard "Metrics" source in Metrics Explorer and dashboards, and should be queried using `sum:aws.cost.net.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)`:
- the `sum` or `sum by` aggregation
- as `count` (learn more about [rate vs count metrics][1])
- rollup `sum`, minimum of 5 minutes (or 300 seconds in the query above, since real-time costs are updated every 5 minutes)

Rollups can be longer, such as 1 hour, to see costs on an hourly basis. Hourly costs can be helpful to better understand usage patterns before buying savings plans and reservations.

## Real-time Kubernetes allocation

Similar to the existing container cost allocation, EC2 instance costs are broken down into the Kubernetes pods that ran on them. All tags used on your pod are available in real time, including **custom tags on your pods**, such as team, service or env, and **out-of-the-box Kubernetes tags**:
- `allocated_spend_type`
- `kube_cluster_name`
- `kube_namespace`
- `kube_deployment`
- `kube_stateful_set`
- `pod_name`
- `pod_phase`
- `pod_status`

## Tags

Tags for real-time costs are similar to those on other Cloud Cost Management metrics, but not identical.
- All tag values are lowercase, normalized like Metrics data
- Tag Pipelines and Custom Allocation Rules are not applied
- Some Cost and Usage Report (CUR) specific tags and FOCUS tags may not exist on the real-time cost metric, since real-time costs are derived primarily using usage data collected by the Datadog Agent, not the CUR

## Accuracy

Real-time costs aim to be within 10% accuracy of the cost data from the daily EC2 costs on your CUR, for EC2 hosts monitored by the Datadog Agent. During the preview period data may be unstable. Large temporary drops in cost or gaps may occur. For long-term cost trend analysis, Datadog recommends using Cloud Cost metrics based on direct AWS billing data.

You can use the `estimated_hourly_cost` tag to understand the estimated unit cost of an instance type per hour.

- Sources of variance include:
  - Hourly averages that shift with your recent mix of on-demand, commitment, and spot spending
  - Minor differences between true instance start and end times versus what the agent reports
- Underestimation can occur when:
  - EC2 instances are not monitored by the Datadog Agent
  - Newly used instance types or regions have not yet appeared in CCM billing data
  - Estimates cover compute only (not EBS, networking, and so on)
- Overestimation can occur when:
  - Instances are monitored by the Datadog Agent but are not included in CCM billing data

[1]: /metrics/types/?tab=rate#metric-types
[2]: /cloud_cost_management/allocation/container_cost_allocation/
