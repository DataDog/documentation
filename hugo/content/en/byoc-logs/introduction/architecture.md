---
title: Architecture
description: Understand how Observability Pipelines and the BYOC Logs engine collect, store, maintain, and query logs in your environment.
aliases:
- /cloudprem/architecture/
- /cloudprem/introduction/architecture/
further_reading:
- link: "/observability_pipelines/"
  tag: "Documentation"
  text: "Observability Pipelines"
- link: "/byoc-logs/install/"
  tag: "Documentation"
  text: "BYOC Logs Installation Prerequisites"
- link: "/byoc-logs/introduction/network/"
  tag: "Documentation"
  text: "Connect BYOC Logs to Datadog"
---

## Overview

{{< img src="/cloudprem/overview_architecture_v2.png" alt="BYOC Logs architecture showing log sources sending data through Observability Pipelines to the BYOC Logs engine. The engine contains indexers, compactors, searchers, a control plane, a metastore, and a janitor, and uses object storage and PostgreSQL. Searchers connect to the Datadog UI." style="width:100%;" >}}

BYOC (Bring Your Own Cloud) Logs consists of two main blocks:

- [**Observability Pipelines**][1] collects, processes, and routes logs.
- The **BYOC Logs engine** indexes, stores, and queries logs. Datadog distributes the engine as the `datadog/cloudprem` Docker image.

The Observability Pipelines Worker and the BYOC Logs engine process log data in your environment. Datadog hosts the pipeline configuration UI and Log Explorer, and routes queries to the engine.

The BYOC Logs engine separates compute from object storage. You can scale ingestion, compaction, and search independently based on workload demand while keeping log data in your object storage.

## Architecture components

### Observability Pipelines

Observability Pipelines is the ingestion block for BYOC Logs. The Observability Pipelines Worker receives logs from Datadog Agents and other sources, applies the processing rules defined in your pipeline, and routes the processed logs to the BYOC Logs engine. You configure the pipeline in Datadog, and the Worker runs in your environment.

### BYOC Logs engine

The BYOC Logs engine runs in your environment. In Kubernetes deployments, the `datadog/cloudprem` image runs with different roles:

**Indexers**
: Receive processed logs from Observability Pipelines, create index files called *splits*, and write the splits to object storage.

**Compactors**
: Read splits from object storage, merge them, and write the merged splits back. Compactors run on dedicated nodes to isolate merge work from indexing.

**Searchers**
: Execute queries from Datadog, read index metadata through the metastore, and retrieve matching data from object storage.

**Metastore**
: Provides access to index metadata, including the locations of splits in object storage. The metastore persists this metadata in PostgreSQL.

**Control plane**
: Schedules indexing jobs called *indexing pipelines* on indexers.

**Janitor**
: Performs maintenance tasks, applying retention policies, garbage collecting expired splits, and running delete query jobs.

### Data stores

The engine uses two data stores in your environment:

- **Object storage** stores indexed log data as splits. Supported services include Amazon S3, Azure Blob Storage, Google Cloud Storage, and S3-compatible storage.
- **PostgreSQL** stores index metadata used by the metastore.

## Data flow

### Ingestion and compaction path

Logs remain in your environment throughout ingestion:

1. Applications and other sources send logs to an **Observability Pipelines Worker**.
2. The Worker processes the logs and routes them to the BYOC Logs engine.
3. **Indexers** create splits in object storage and register their metadata through the metastore.
4. **Compactors** asynchronously merge splits on dedicated nodes and write the merged splits back to object storage.

**No log data leaves your environment during ingestion.** Logs are stored exclusively in your own object storage.

### Query path

When you search BYOC Logs data in Log Explorer, the query travels over a secure connection between Datadog and the BYOC Logs engine:

1. The Datadog UI sends the search query to Datadog's backend.
2. Datadog forwards the query to the engine through a reverse connection or ingress.
3. **Searchers** use metadata from PostgreSQL to retrieve matching data from object storage.
4. The engine returns only the matching results to Datadog for display.

**Only query results travel between your environment and Datadog.** The full dataset remains in your object storage and is never transferred to Datadog.

## Connection to Datadog UI

Connect the Datadog UI to the BYOC Logs engine in one of two ways:

- **[Reverse connection][2]**: Let the engine initiate a secure connection to Datadog.
- **[External requests from Datadog][3]**: Provide Datadog with a DNS endpoint and configure a public ingress to accept requests.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/
[2]: /byoc-logs/introduction/network/
[3]: /byoc-logs/configure/ingress/
