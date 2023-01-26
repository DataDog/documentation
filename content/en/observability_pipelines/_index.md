---
title: Observability Pipelines
kind: Documentation
aliases:
  - /integrations/observability_pipelines/
further_reading:
  - link: /observability_pipelines/installation/
    tag: Documentation
    text: Set up Observability Pipelines 
  - link: https://www.datadoghq.com/blog/datadog-observability-pipelines/
    tag: Blog
    text: Take control of your telemetry data with Observability Pipelines
  - link: /observability_pipelines/configurations/
    tag: Documentation
    text: Learn more about Observability Pipelines configurations
  - link: /observability_pipelines/production_deployment_overview/integrate_datadog_and_the_observability_pipelines_worker/
    tag: Documentation
    text: Configure Datadog Agents to send data to Observability Pipelines
---

{{< img src="observability_pipelines/obs_pipelines.png" alt="A graphic showing different data sources on the left that flows into three hexagons named transform, reduce, and route, with arrows pointing to different destinations for the modified data" style="width:100%;" >}}

## What is Observability Pipelines and the Observability Pipelines Worker?

### Observability Pipelines Worker

Observability Pipelines Worker is an on-premise end-to-end data pipeline solution designed to collect, process, and route logs and metrics from any source to any destination. You can deploy Observability Pipelines as an aggregator within your infrastructure for central processing, collecting data from multiple upstream sources, and performing cross-host aggregation and analysis. With the Observability Pipelines Worker, you can also:

- Control your data volume before routing to manage costs.
- Route data anywhere to reduce vendor lock-in and simplify migrations.
- Transform logs and metrics by adding, parsing, enriching, and removing fields and tags.
- Redact sensitive data from your telemetry data.

### Observability Pipelines

Observability Pipelines is a control plane that enables you to monitor, build, and manage all of your Observability Pipelines Worker deployments at scale.

Add your Datadog API key to your Observability Pipelines configuration to monitor your pipelines in Datadog: Identify bottlenecks and latencies, fine-tune performance, monitor data delivery, and more.

## Get started

1. [Install the Observability Pipelines Worker][1].
2. [Set up configurations][2] to collect, transform and route your data.

## Explore Observability Pipelines

Start exploring and getting insights into your Observability Pipelines:

### Monitor the health of your pipelines

Get a holistic view of all of your pipelines' topologies and monitor key performance indicators, such as average load, error rate, and throughput for each of your flows. 

{{< img src="observability_pipelines/config-map.png" alt="The configuration map showing data coming from http, splunk_hec, and datadog, and flowing into different transforms and then sent to different destinations" style="width:80%;" >}}

### Quickly identify bottlenecks and optimize performance

Dive into specific configuration components to understand how observability data is flowing into your pipeline to troubleshoot and pinpoint performance bottlenecks and to optimize your pipeline. 

{{< img src="observability_pipelines/config-map-side-panel.png" alt="The S3 source configuration side panel showing graphs for events in and out per second, percentage of errors, and load average percentage" style="width:85%;" >}}

### Ensure data delivery and reduce latency. 

Find out if data is reaching its destination and get full visibility into any latency issues to meet SLIs and SLOs.

{{< img src="observability_pipelines/configuration-list.png" alt="The Observability Pipelines page showing a list of active and inactive pipelines with columns for created date, number of hosts, version, events in, bytes in, and error rate" style="width:85%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/installation/
[2]: /observability_pipelines/configurations/
