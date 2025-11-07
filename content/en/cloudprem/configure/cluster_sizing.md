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

- **Performance:** To index 5 MB/s of logs, CloudPrem needs approximately 1 vCPU and 2 GB of RAM.
- **Recommended Pod Sizes:** Datadog recommends that you deploy indexer pods with either:
  - 2 vCPUs and 4 GB of RAM
  - 4 vCPUs and 8 GB of RAM
  - 8 vCPUs and 16 GB of RAM
- **Storage:** Indexers require persistent storage (preferably SSDs, but local HDDs or remote EBS volumes can also be used) to store temporary data while constructing the index files.
  - Minimum: 100 GB per pod
  - Recommendation (for pods > 4 vCPUs): 200 GB per pod
- **Example Calculation:** To index 1 TB per day (~11.6 MB/s):
  - Required vCPUs: `(11.6 MB/s / 5 MB/s/vCPU) ≈ 2.3 vCPUs`
  - Rounding up, you might start with one indexer pod configured with 3 vCPUs and 6 GB RAM, requiring a 100 GB EBS volume. (Adjust this configuration based on observed performance and redundancy needs.)

## Searchers

- **Performance:** Search performance depends heavily on the workload (query complexity, concurrency, data scanned).
- **Rule of Thumb:** A general starting point is to provision roughly double the total number of vCPUs allocated to Indexers.
- **Memory:** We recommend 4 GB of RAM per searcher vCPU. Provision more RAM if you expect many concurrent aggregation requests.

## Other services

The following components are typically lightweight:

- **Control Plane:** 1 vCPU, 2 GB RAM
- **Metastore:** 1 vCPU, 2 GB RAM
- **Janitor:** 1 vCPU, 2 GB RAM

## Postgres Metastore backend

- **Instance Size:** For most use cases, a PostgreSQL instance with 1 vCPU and 4 GB of RAM is sufficient
- **AWS RDS Recommendation:** If using AWS RDS, the `t4g.medium` instance type is a suitable starting point
- **High Availability:** Enable Multi-AZ deployment with one standby replica for high availability

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
