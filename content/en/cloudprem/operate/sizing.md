---
title: Cluster Sizing
aliases:
- /cloudprem/configure/cluster_sizing/
description: Learn about cluster sizing for CloudPrem
further_reading:
- link: "/cloudprem/configure/ingress/"
  tag: "Documentation"
  text: "Configure CloudPrem Ingress"
- link: "/cloudprem/configure/pipelines/"
  tag: "Documentation"
  text: "Configure CloudPrem Log Processing"
- link: "/cloudprem/introduction/architecture/"
  tag: "Documentation"
  text: "Learn more about CloudPrem Architecture"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

Proper cluster sizing ensures optimal performance, cost efficiency, and reliability for your CloudPrem deployment. Your sizing requirements depend on several factors including log ingestion volume, query patterns, and the complexity of your log data.

This guide provides baseline recommendations for dimensioning your CloudPrem cluster components—indexers, searchers, supporting services, and the PostgreSQL database.

<div class="alert alert-tip">
Use your expected daily log volume and peak ingestion rates as starting points, then monitor your cluster's performance and adjust sizing as needed.
</div>

## Indexers

Indexers receive logs from Datadog Agents, then process, index, and store them as index files (called _splits_) in object storage. Proper sizing is critical for maintaining ingestion throughput and ensuring your cluster can handle your log volume.

| Specification | Recommendation | Notes |
|---------------|----------------|-------|
| **Performance** | 5 MB/s per vCPU | Baseline throughput to determine initial sizing. Actual performance depends on log characteristics (size, number of attributes, nesting level) |
| **Memory** | 4 GB RAM per vCPU | |
| **Minimum Pod Size** | 2 vCPUs, 8 GB RAM | Recommended minimum for indexer pods |
| **Storage Capacity** | At least 250 GB | Required for temporary data while creating and merging index files |
| **Storage Type** | Network-attached block storage | For example: Amazon EBS gp3, Azure Managed Disks, or GCP Persistent Disk. Data is temporarily stored in a write-ahead log (WAL) before being uploaded to object storage. The WAL is not replicated, so using local (ephemeral) SSDs increases the risk of losing a few minutes of data if the disk fails. Network-attached block storage provides built-in redundancy. |
| **Disk I/O** | ~20 MB/s per vCPU | Equivalent to 320 IOPS per vCPU for Amazon EBS (assuming 64 KB IOPS) |


{{% collapse-content title="Example: Sizing for 1 TB of logs per day" level="h4" expanded=false %}}
To index 1 TB of logs per day (~11.6 MB/s), follow these steps:

1. **Calculate vCPUs:** `11.6 MB/s ÷ 5 MB/s per vCPU ≈ 2.3 vCPUs`
2. **Calculate RAM:** `2.3 vCPUs × 4 GB RAM ≈ 9 GB RAM`
3. **Add headroom:** Start with one indexer pod configured with **3 vCPUs, 12 GB RAM, and a 200 GB disk**. Adjust these values based on observed performance and redundancy needs.
{{% /collapse-content %}}

{{% collapse-content title="Sizing by event count" level="h4" expanded=false %}}
If you know your daily event count but not your byte volume, use this formula to estimate:

**Daily volume (TB) = (events per day × average event size in bytes) / 1,000,000,000,000**

For example, with 1 billion events/day at 1 KB average size:

`1,000,000,000 × 1,000 / 1,000,000,000,000 = 1 TB/day`

Typical log event sizes range from 500 bytes (short syslog) to 2-3 KB (JSON with Kubernetes tags). Measure a representative sample of your logs to get an accurate average.
{{% /collapse-content %}}

## Searchers

Searchers handle search queries from the Datadog UI, reading metadata from the Metastore and fetching data from object storage.

A general starting point is to provision roughly double the total number of vCPUs allocated to Indexers. See our sizing examples.

- **Performance:** Search performance depends heavily on the workload (query complexity, concurrency, amount of data scanned). For instance, term queries (`status:error AND message:exception`) are usually computationally less expensive than wildcard or whole event search queries.
- **Memory:** 4 GB of RAM per searcher vCPU. Provision more RAM if you expect many concurrent aggregation requests.

{{% collapse-content title="Impact of query patterns on searcher sizing" level="h4" expanded=false %}}
The number of searcher vCPUs you need varies significantly based on how you use CloudPrem:

- **Incident response** (searching for specific errors, grep-style queries): Relatively low searcher resources are needed, even with large datasets.
- **Dashboards with aggregations** (timeseries, top lists, percentiles over multi-day ranges): Significantly more searcher resources are required. Aggregation queries scan more data and consume more CPU and memory.

If your primary use case involves dashboards, plan for 2-3x more searcher vCPUs than the baseline recommendation.
{{% /collapse-content %}}

## Other services

Allocate the following resources for these lightweight components:

| Service | vCPUs | RAM | Replicas |
|---------|-------|-----|----------|
| **Control Plane** | 2 | 4 GB | 1 |
| **Metastore** | 2 | 4 GB | 2 |
| **Janitor** | 2 | 4 GB | 1 |

## Object storage estimation

CloudPrem compresses and indexes log data before storing it in object storage. The compression ratio depends on the log format, structure, and redundancy in your data.

| Metric | Typical range |
|--------|---------------|
| **Compression ratio** | 3x to 5x (raw input to stored size) |
| **Storage per TB/day ingested** | 200-350 GB/day on object storage |

To estimate your object storage requirements:

**Stored data per day = Daily volume / compression ratio**

**Total storage = Stored data per day × retention period (days)**

{{% collapse-content title="Example: Storage for 10 TB/day with 30-day retention" level="h4" expanded=false %}}
Assuming a 4x compression ratio:

1. **Stored per day:** `10 TB / 4 = 2.5 TB/day`
2. **Total for 30 days:** `2.5 TB × 30 = 75 TB`

Use standard-tier object storage (for example, S3 Standard, GCS Standard) for active data. Lower-cost tiers such as S3 Infrequent Access or GCS Nearline are not validated for use with CloudPrem.
{{% /collapse-content %}}

## PostgreSQL database

- **Instance Size:** For most use cases, a PostgreSQL instance with 1 vCPU and 4 GB of RAM is sufficient
- **AWS RDS Recommendation:** If using AWS RDS, the `t4g.medium` instance type is a suitable starting point
- **High Availability:** Enable Multi-AZ deployment with one standby replica for high availability

## Helm chart sizing tiers

The CloudPrem Helm chart provides predefined sizing tiers through the `indexer.podSize` and `searcher.podSize` parameters. Each tier sets the vCPU and memory resource limits for a pod, and automatically configures component-specific settings.

| Size | vCPUs | Memory |
|------|-------|--------|
| medium | 1 | 4 GB |
| large | 2 | 8 GB |
| xlarge | 4 | 16 GB |
| 2xlarge | 8 | 32 GB |
| 4xlarge | 16 | 64 GB |
| 6xlarge | 24 | 96 GB |
| 8xlarge | 32 | 128 GB |

Values defining the ingest queue sizes and search cache sizes are automatically applied when you set `indexer.podSize` in the [Helm chart](https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/sizing-map.yaml). For more details on each parameter, you can check the Quickwit documentation for [indexer parameters][2], [ingest api parameters][3] and [searcher parameters][3].

## Sizing examples

The following table provides starting-point configurations for common daily log volumes. These are baseline recommendations—adjust based on your observed performance.

| Daily volume | Indexer pods | Indexer podSize | Searcher pods | Searcher podSize | Object storage (30-day retention, ~4x compression) |
|-------------|-------------|-----------------|---------------|-------------------|-----------------------------------------------------|
| **1 TB/day** | 2 | large | 2 | xlarge | ~7.5 TB |
| **5 TB/day** | 4 | xlarge | 4 | 2xlarge | ~37.5 TB |
| **10 TB/day** | 8 | xlarge | 8 | 4xlarge | ~75 TB |
| **50 TB/day** | 16 | xlarge | 20 | 8xlarge | ~375 TB |
| **100 TB/day** | 32 | xlarge | 40 | 8xlarge | ~750 TB |

<div class="alert alert-info">
Searcher vCPUs in this table assume a mixed workload (searches and some dashboards). For dashboard-heavy use cases, increase searcher vCPUs by 2-3x. For search-only use cases (incident response, grep), you may be able to reduce them.
</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/sizing-map.yaml
[2]: https://quickwit.io/docs/configuration/node-config#indexer-configuration
[3]: https://quickwit.io/docs/configuration/node-config#ingest-api-configuration
[4]: https://quickwit.io/docs/configuration/node-config#searcher-configuration
