---
title: Architecture
further_reading:
- link: "/cloudprem/"
  tag: "Documentation"
  text: "Learn more about CloudPrem"
- link: "/cloudprem/installation/"
  tag: "Documentation"
  text: "CloudPrem Installation"
- link: "/cloudprem/ingress/"
  tag: "Documentation"
  text: "Ingress Configuration"
- link: "/cloudprem/cluster/"
  tag: "Documentation"
  text: "Cluster Sizing and Operations"
- link: "/cloudprem/aws_config"
  tag: "Documentation"
  text: "AWS Configuration"
- link: "/cloudprem/processing/"
  tag: "Documentation"
  text: "CloudPrem Log Processing"
- link: "/cloudprem/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting CloudPrem"
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
: Handle search queries from the Datadog UI, reading metadata from Metastore and index data from the object storage.

**Metastore**
: Stores metadata about the indexes, including splits locations on the object storage. CloudPrem uses PostgreSQL for this purpose.

**Janitor/Control Plane**
: Responsible for tasks like indexing tasks scheduling and delete tasks.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}