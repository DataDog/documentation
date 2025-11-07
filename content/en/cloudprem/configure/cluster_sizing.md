---
title: Cluster Sizing
description: Learn about cluster sizing for CloudPrem
further_reading:
- link: "/cloudprem/configure/ingress/"
  tag: "Documentation"
  text: "Configure CloudPrem Ingress"
  tag: "Documentation"
  text: "Configure CloudPrem Log Processing"
- link: "/cloudprem/architecture/"
  tag: "Documentation"
  text: "Learn more about CloudPrem Architecture"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

Proper cluster sizing ensures optimal performance, cost efficiency, and reliability for your CloudPrem deployment. Your sizing requirements depend on several factors including log ingestion volume, query patterns, retention needs, and the complexity of your log data.

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
| **Storage Capacity** | At least 200 GB | Required for temporary data while creating and merging index files |
| **Storage Type** | Local SSDs (preferred) | Local HDDs or network-attached block storage (Amazon EBS, Azure Managed Disks) can also be used |
| **Disk I/O** | ~20 MB/s per vCPU | Equivalent to 320 IOPS per vCPU for Amazon EBS (assuming 64 KB IOPS) |


{{% collapse-content title="Example: Sizing for 1 TB of logs per day" level="h4" expanded=false %}}
To index 1 TB of logs per day (~11.6 MB/s), follow these steps:

1. **Calculate vCPUs:** `11.6 MB/s ÷ 5 MB/s per vCPU ≈ 2.3 vCPUs`
2. **Calculate RAM:** `2.3 vCPUs × 4 GB RAM ≈ 9 GB RAM`
3. **Add headroom:** Start with one indexer pod configured with **3 vCPUs, 12 GB RAM, and a 200 GB disk**. Adjust these values based on observed performance and redundancy needs.
{{% /collapse-content %}}

## Searchers

Searchers handle search queries from the Datadog UI, reading metadata from the Metastore and fetching data from object storage. Sizing searchers appropriately ensures responsive query performance.

A general starting point is to provision roughly double the total number of vCPUs allocated to Indexers.

- **Performance:** Search performance depends heavily on the workload (query complexity, concurrency, data scanned). For instance, term queries (`status:error AND message:exception`) are usually computationally less expensive than aggregations.
- **Memory:** 4 GB of RAM per searcher vCPU. Provision more RAM if you expect many concurrent aggregation requests.

## Other services

Allocate the following resources for these lightweight components:

| Service | vCPUs | RAM | Replicas |
|---------|-------|-----|----------|
| **Control Plane** | 2 | 4 GB | 1 |
| **Metastore** | 2 | 4 GB | 2 |
| **Janitor** | 2 | 4 GB | 1 |

## PostgreSQL database

- **Instance Size:** For most use cases, a PostgreSQL instance with 1 vCPU and 4 GB of RAM is sufficient
- **AWS RDS Recommendation:** If using AWS RDS, the `t4g.medium` instance type is a suitable starting point
- **High Availability:** Enable Multi-AZ deployment with one standby replica for high availability

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
