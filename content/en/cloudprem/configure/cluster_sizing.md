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

This document gives recommendations on dimensioning your CloudPrem cluster components, particularly indexers and searchers.

<div class="alert alert-info">
These are starting recommendations. Monitor your cluster's performance and resource utilization closely and adjust sizing as needed.
</div>

## Indexers

- **Performance:** Indexing performance depends heavily on the characteristics of the ingest logs, such as their size, number of attributes, and level of nesting. However, we recommend using a baseline indexing throughput of **5 MB/s per vCPU** to determine your initial sizing.
- **Memory:** We recommend 4 GB of RAM per vCPU.
- **Recommended Pod Sizes:** Datadog recommends deploying indexer pods with at least 2 vCPUs and 8 GB of RAM.
- **Storage:** Indexers require at least 200 GB of persistent storage (preferably local SSDs, but local HDDs or network-attached block storage volumes such as Amazon EBS, or Azure Managed Disks can also be used) to store temporary data while creating and merging index files. In addition, each indexer vCPU writes on disk at a rate of approximately 20 MB/s. For Amazon EBS volumes, this is equivalent to 320 IOPS per vCPU (assuming 64 KB IOPS).
- **Example Calculation:** To index 1 TB of logs per day (~11.6 MB/s):
  - Required vCPUs: `11.6 MB/s / 5 MB/s per vCPU ≈ 2.3 vCPUs`
  - Required RAM: `2.3 vCPUs × 4 GB RAM ≈ 9 GB RAM`
  - Adding some headroom, you could start with one indexer pod configured with 3 vCPUs, 12 GB RAM, and a 200 GB disk. Adjust these values based on observed performance and redundancy needs.

## Searchers

- **Performance:** Search performance depends heavily on the workload (query complexity, concurrency, amount of data scanned). For instance, term queries (`status:error AND message:exception`) are usually computationally less expensive than aggregations.
- **Rule of Thumb:** A general starting point is to provision roughly double the total number of vCPUs allocated to Indexers.
- **Memory:** We recommend 4 GB of RAM per searcher vCPU. Provision more RAM if you expect many concurrent aggregation requests.

## Other services

We recommend allocating the following resources for these lightweight components:

- **Control Plane:** 2 vCPUs, 4 GB RAM, 1 replica
- **Metastore:** 2 vCPUs, 4 GB RAM, 2 replicas
- **Janitor:** 2 vCPUs, 4 GB RAM, 1 replica

## PostgreSQL Database

- **Instance Size:** For most use cases, a PostgreSQL instance with 1 vCPU and 4 GB of RAM is sufficient
- **AWS RDS Recommendation:** If using AWS RDS, the `t4g.medium` instance type is a suitable starting point
- **High Availability:** Enable Multi-AZ deployment with one standby replica for high availability

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
