---
title: Architecture
private: true
further_reading:
- link: "/cloudprem/"
  tag: "Documentation"
  text: "CloudPrem Overview"
- link: "/cloudprem/installation/"
  tag: "Documentation"
  text: "Install CloudPrem and Send Logs with the Agent"
- link: "/cloudprem/ingress/"
  tag: "Documentation"
  text: "Configure CloudPrem Ingress"
- link: "/cloudprem/aws_config"
  tag: "Documentation"
  text: "Configure AWS"
- link: "/cloudprem/processing/"
  tag: "Documentation"
  text: "Configure CloudPrem Log Processing"
- link: "/cloudprem/cluster/"
  tag: "Documentation"
  text: "Learn more about Cluster Sizing and Operations"
- link: "/cloudprem/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"
---

<div class="alert alert-warning">CloudPrem is in Preview.</div>

## Overview

{{< img src="/cloudprem/overview_architecture.png" alt="CloudPrem architecture showing Indexers, Searchers, Metastore, and Control Plane components interacting with object storage" style="width:100%;" >}}

CloudPrem uses a decoupled architecture which separates the compute (indexing and searching) and data on an object storage. This allows for independent scaling and optimization of different cluster components based on workload demands.

## Components

The CloudPrem cluster, typically deployed on Kubernetes (EKS), consists of several components:

**Indexers**
: Responsible for receiving logs from Datadog Agents. Indexers process, index, and store logs in index files called _splits_ to the object storage (for example, Amazon S3).

**Searchers**
: Handle search queries from the Datadog UI, reading metadata from Metastore and fetching data from the object storage.

**Metastore**
: Stores metadata about the indexes, including split locations on the object storage. CloudPrem uses PostgreSQL for this purpose.

**Control Plane**
: Schedules indexing jobs called _indexing pipelines_ on indexers.

**Janitor**
: Performs maintenance tasks, applying retention policies, garbage collecting expired splits, and running delete query jobs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
