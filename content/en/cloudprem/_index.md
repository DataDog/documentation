---
title: CloudPrem
description: Learn how to deploy and manage Datadog CloudPrem, a self-hosted log management solution for cost-effective log ingestion, processing, indexing, and search capabilities
private: true # This removes this page from search and limits the availability of this doc to only those that have the link
further_reading:
- link: "/cloudprem/installation/"
  tag: "Documentation"
  text: "Installation"
- link: "/cloudprem/ingress/"
  tag: "Documentation"
  text: "Ingress Configuration"
- link: "/cloudprem/cluster/"
  tag: "Documentation"
  text: "Cluster Sizing and Operations"
- link: "/cloudprem/advanced/"
  tag: "Documentation"
  text: "Advanced Configurations"
- link: "/cloudprem/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"
---

## Overview

Datadog CloudPrem is a self-hosted log management solution that enables cost-effective log ingestion, processing, indexing, and search capabilities within your own infrastructure. Built to meet data residency, stringent security, and high-volume requirements, CloudPrem integrates with the Datadog platform to provide log analysis, visualization, and alerting - all while keeping your log data at rest within your infrastructure boundaries.

{{< img src="/cloudprem/cloudprem_overview_diagram.png" alt="CloudPrem product overview diagram" style="width:100%;" >}}

## Architecture

CloudPrem uses a decoupled architecture which separates the compute (indexing and searching), and data on an object storage. This allows for independent scaling and optimization of different cluster components based on workload demands.

### Components

The CloudPrem cluster, typically deployed on Kubernetes (EKS), consists of several components:

**Indexers**
: Responsible for receiving logs from Datadog Agents. Indexers process, index, and store logs in index files called splits to the object storage (ex: Amazon S3).

**Searchers**
: Handle search queries from the Datadog UI, reading metadata from Metastore and index data from the object storage.

**Metastore**
: Stores metadata about the indexes, including splits locations on the object storage. CloudPrem uses PostgreSQL for this purpose.

**Janitor/Control Plane**
: Responsible for tasks like indexing tasks scheduling and delete tasks.


## Get started
### Prerequisites

Before getting started with CloudPrem, ensure you have:

- AWS account with necessary permissions
- Kubernetes cluster (EKS recommended)
- S3 bucket for log storage
- PostgreSQL database (RDS recommended)
- Datadog agent
- `kubectl`
- `helm`

### Installation

1. [Install CloudPrem][2]
2. [Send logs to CloudPrem](2)
3. [Configure logs processing](3)(optional)
4. [Configure your Datadog account to connect the Log Explorer to CloudPrem](2)

For detailed instructions, see the [Installation][2] documentation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/deploy/installation/ 
[2]: /cloudprem/installation/
[3]: /cloudprem/processing/