---
title: Architecture
aliases:
- /cloudprem/architecture/
further_reading:
- link: "/cloudprem/install/"
  tag: "Documentation"
  text: "CloudPrem Installation Prerequisites"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

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


## Data flow

### Ingestion path (logs entering CloudPrem)

Logs are ingested into CloudPrem entirely within your infrastructure. The typical flow is:

1. Your applications emit logs to the **Datadog Agent** or **Observability Pipelines Worker**.
2. Logs are forwarded to CloudPrem **indexers** running in your cluster.
3. Indexers process and store logs as splits in your **object storage** (for example, Amazon S3 or Google Cloud Storage).

**No log data leaves your environment during ingestion.** Logs are stored exclusively in your own object storage.

### Query path (searching logs from Datadog UI)

When you search CloudPrem logs from the Datadog UI (for example, Log Explorer), the query flows through a secure connection between Datadog and your cluster:

1. The Datadog UI sends the search query to Datadog's backend.
2. Datadog's backend forwards the query to your CloudPrem cluster through the established connection (reverse connection or ingress).
3. **Searchers** in your cluster execute the query against your object storage.
4. Only the **matching log results** are sent back to Datadog for display in the UI.

**Only query results travel between your cluster and Datadog.** The full dataset remains in your object storage and is never transferred to Datadog.

## Connection to Datadog UI

There are two ways to connect the Datadog UI to CloudPrem:
- [**Reverse connection**][1]: Let CloudPrem initiate bi-directional gRPC requests to Datadog.
- [**Accept external requests from Datadog**][2]: Provide Datadog with a DNS endpoint for gRPC requests and configure a public Ingress to accept those requests.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloudprem/introduction/network/
[2]: /cloudprem/configure/ingress/
