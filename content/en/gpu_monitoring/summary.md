---
title: GPU Monitoring Summary Page
description: "Real-time insights across your entire GPU fleet for better provisioning and cost optimization"

further_reading:
  - link: "/gpu-monitoring/fleet"
    tag: "Documentation"
    text: "GPU Fleet Details Page"
---

## Overview

The [GPU Monitoring Summary page][1] provides a snapshot summary of your entire GPU fleet under a specified time frame, like the past hour, day, week or month. This page answers key questions like:  

## Your GPU fleet at a glance
(INTRO SENTENCE HERE) 

### GPU Fleet Funnel Visualization 
This funnel visualization provides a breakdown of your entire GPU fleet across multiple cloud providers like AWS or Google Cloud. You can instantly breakdown your fleet by number of Kubernetes clusters, hosts or GPU devices. 
The funnel also highlights any performance issues or provisioning inefficiencies in your teams' resource utilization efforts such as idle devices, underutilized GPU cores or if there's resource starvation that requires rebalancing.

{{< img src="gpu_monitoring/funnel.png" alt="Funnel visualization titled 'Your GPU fleet at a glance.' Displays total, allocated, active, and effective devices. Highlights underutilized GPU cores and idle devices." style="width:100%;" >}}

The steps of the funnel are defined as follows: 
- **Total**: Any GPU device that is sending data during the selected timeframe.
- **Allocated** : How many of your GPUs have been allocated to a requesting workload?
- **Active**: How many of your allocated GPUs are actively used for a workload?
- **Effective** How many GPU devices are used and working more than 50% of their lifespan? 

### Understand your GPU spend
Quickly identify your total spend on GPU infrastructure and attribute the subset of those costs that are wasted spend from idle GPU devices that can be cost optimized. 

{{< img src="gpu_monitoring/cost_tiles.png" alt="Tiles that represent the total GPU spend over any timeframe and the subset of that total cost attributed to GPUs being idle." style="width:100%;" >}}

Note: Total cloud costs are calculated from AWS and Google Cloud costs over the selected timeframe. As cloud cost bills are available at a delay, the selected timeframe must be >= 2 days. And idle costs are the subset of that cost attributed to idle GPUs.

## Device distribution across your fleet 
This section provides insights around GPU allocation and capacity planning. You can troubleshoot failed workloads due to GPU constraints and improve the operational efficiency of your fleet with insights into device usage and allocation over time.

### Device Allocation Over Time
As AI workloads can spike resource usage unpredictably, it's important to align available GPUs with incoming workloads. Understand your operational efficiency by tracking your device allocation over time which identifies if you're overallocating GPUs that end up sitting idle or underprovisioning resources that stall critical jobs. 

{{< img src="gpu_monitoring/allocation.png" alt="Total, Allocated and Active device counts over time" style="width:100%;" >}}

For example, if you see a spike in the forecasted values for the number of allocated devices, your future workloads may be starved -- requiring you to add more GPU devices. 

### Cloud Provider Instance Breakdown 
If you rely on GPUs deployed through major cloud providers, this widget breaks down the cloud instance type within your fleet.

{{< img src="gpu_monitoring/instance_breakdown.png" alt="Total, Allocated and Active device counts over time" style="width:100%;" >}}

### Device Type Breakdown
In cases where your AI workloads fail, code performance may not be the issue but rather number of available GPU devices. This widget surfaces the availability across all of your GPU device types and highlights which device type pool is fully saturated (signalling that additional devices may be required). You can further combine this widget with the Unmet GPU requests by Service or Cluster widgets to understand for a given workload, which device type pool is already saturated and needs additional provisioning.

{{< img src="gpu_monitoring/device_type.png" alt="Availability by GPU device type" style="width:100%;" >}}

** Note:** For any device type, if the number of devices available is <5%, the device type will be highlighted in red.

### Pinpoint areas with insufficient GPU resources to guide provisioning decisions
Quickly identify the Kubernetes clusters with the most number of unmet GPU requests. 

{{< img src="gpu_monitoring/unmet_requests.png" alt="Availability by GPU device type" style="width:100%;" >}}

For example, for any of these services with a large number of GPU requests, you can also look at their _Device Type Breakdown_ widget to understand which device type the particular service relies on and the _Device Allocation over time_ widget to track historical demands to confirm if these services and device types are constantly underprovisioned.

** Note:** If there are no services or clusters listed and you are emitting the proper tags, this is indicative that all of your services and clusters have sufficient GPU resources during the selected timeframe. 

## Workload Optimization Opportunities 
GPUs are often the highest cost item within a team's infrastructure budget, so cost optimization of your setup is crucial. This section uncovers suboptimal workloads with inefficient GPU utilization -- linking wasted costs to specific workloads and their resource usage.

### Most Expensive Clusters
This widget uncovers your most expensive Kubernetes clusters and identifies their idle spend so you can reach out to the teams who are responsible for these clusters and find ways to decrease spend, such as reducing the number of idle or inefficient GPU devices. This table is sorted by _Total Cost_ to identify the most expensive clusters. 

{{< img src="gpu_monitoring/unmet_requests.png" alt="Availability by GPU device type" style="width:100%;" >}}

You can click into any one of these clusters to investigate its connected entities that contribute to its costs on the [GPU Fleet page][1]. 

{{< img src="gpu_monitoring/cluster_entities.png" alt="Availability by GPU device type" style="width:100%;" >}}

### Metric origin definitions

This table shows the mapping between the metric origin as seen in the facet and where it was submitted from:

| Metric Origin           | Submitted from                                                                |
| ------------------------| ----------------------------------------------------------------------------- |
| API Catalog             | Timeseries sent by the Datadog [Software Catalog][13] product from the APIM Endpoint.
| APM                     | Timeseries sent by the Datadog APM product for metrics generated from traces and span metrics.
| Agent                   | Timeseries sent by the Datadog Agent, collected from [Agent integrations][10], [built-in integrations][9], [DogStatsD][32], or [custom Agent checks][33].
| Cloud Security                     | Timeseries sent by the Datadog [Cloud Security][14] product.
| Cloud Integrations      | Timeseries collected from cloud providers like AWS, Azure, and Google Cloud etc. from their respective integrations. 
| DBM                     | Timeseries sent by the Datadog [Database Monitoring][15] product, including insights into MySQL, Oracle, and Postgres activities/queries/locks.
| DSM                     | Timeseries sent by the Datadog [Data Streams Monitoring][16] product, for metrics generated from the DSM spans and traces.
| Datadog Exporter        | Timeseries sent by the [OpenTelemetry Collector][17] or the [Datadog Exporter][18].
| Datadog Platform        | Timeseries sent by metrics intake that are used to [report metrics usage][11].
| Events                  | Timeseries generated from the Datadog Events platform.
| LLM Observability       | Timeseries emitted by the LLM Observability product using the `lmobs_to_metrics` service.
| Logs                    | Timeseries generated from the Datadog [Logs][28] platform.
| Metrics API             | Timeseries sent using Datadog's [OTLP Ingestion endpoint][21] and OTel receiver with a Datadog integration counterparts or points for estimated usage metrics or Datadog API Client.
| CNM                     | Timeseries sent by the Datadog [Cloud Network Monitoring][19] product.
| Observability Pipelines | Timeseries sent by the Datadog [Observability Pipielines][20] including error and performance metrics.
| Other                   | Timeseries that don't have a DD integration counterpart.
| Processes               | Timeseries generated from the Datadog [Processes][22] product.
| RUM                     | Timeseries generated from the Datadog [Real User Monitoring][23] product.
| SAAS Integrations       | Timeseries collected from popular SAAS platforms like Slack, Docker, PagerDuty etc.
| Serverless              | Timeseries sent by the Datadog [Serverless][24] platform including Function, App Services, Cloud Run, and Container App Metrics.
| Software Catalog         | Timeseries sent by the Datadog [Software Catalog][25] product including [Scorecard][29] metrics.
| Synthetic Monitoring    | Synthetic monitoring and continuous testing metrics generated from the Datadog [Synthetic Monitoring][26] product. 
| USM                     | Timeseries generated from the Datadog [Universal Service Monitoring][27] product. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mEnd=1758048728968&mPage=fleet&mStart=1758034328968&mView=nvidia
