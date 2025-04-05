---
title: Cluster Sizing and Operations
description: Learn about cluster sizing, scaling, monitoring, and maintenance for CloudPrem
further_reading:
- link: "/cloudprem/"
  tag: "Documentation"
  text: "Learn more about CloudPrem"
- link: "/cloudprem/installation/"
  tag: "Documentation"
  text: "Installation"
- link: "/cloudprem/ingress/"
  tag: "Documentation"
  text: "Ingress Configuration"
- link: "/cloudprem/advanced/"
  tag: "Documentation"
  text: "Advanced Configurations"
- link: "/cloudprem/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting CloudPrem"
---

## Overview

This document offers comprehensive guidance on dimensioning and managing CloudPrem cluster components, covering indexers, searchers, and auxiliary services.

Find specific resource requirements (CPU, RAM, storage) for each component, along with practical examples for capacity planning. Use these guidelines to properly size your initial deployment and scale components as your needs grow. The recommendations provided help you maintain optimal performance while efficiently utilizing your infrastructure resources.

<div class="alert alert-info">
These are starting recommendations. Monitor your cluster's performance and resource utilization closely and adjust sizing as needed.
</div>

## Indexers

- **Performance:** To index 5MB/s of logs, CloudPrem needs approximately 1 vCPU and 2GB of RAM.
- **Recommended Pod Sizes:** We recommend deploying indexer pods with either:
  - 2 vCPUs and 4GB of RAM
  - 4 vCPUs and 8GB of RAM
  - 8 vCPUs and 16GB of RAM
- **Storage:** An indexer stores temporary data and requires persistent storage (e.g., AWS EBS).
  - Minimum: 100GB per pod
  - Recommendation (for pods > 4 vCPUs): 200GB per pod
- **Example Calculation:** To index 1 TB per day (~11.6 MB/s):
  - Required vCPUs: `(11.6 MB/s / 5 MB/s/vCPU) ≈ 2.3 vCPUs`
  - Rounding up, you might start with one indexer pod configured with 3 vCPUs and 6GB RAM, requiring a 100GB EBS volume. (Adjust based on observed performance and redundancy needs)

## Searchers

- **Performance:** Search performance depends heavily on the workload (query complexity, concurrency, data scanned)
- **Rule of Thumb:** A general starting point is to provision roughly double the total number of vCPUs allocated to Indexers
- **Memory:** We recommend 4GB of RAM per searcher vCPU. Provision more RAM if you expect many concurrent aggregation requests

## Other services

The following components are typically lightweight:

- **Control Plane:** 1 vCPU, 2GB RAM
- **Metastore:** 1 vCPU, 2GB RAM
- **Janitor:** 1 vCPU, 2GB RAM

## Postgres Metastore backend

- **Instance Size:** For most use cases, a PostgreSQL instance with 1 vCPU and 4GB of RAM is sufficient
- **AWS RDS Recommendation:** If using AWS RDS, the `t4g.medium` instance type is a suitable starting point
- **High Availability:** Enable Multi-AZ deployment with one standby replica for high availability


## Further reading

{{< partial name="whats-next/whats-next.html" >}} 