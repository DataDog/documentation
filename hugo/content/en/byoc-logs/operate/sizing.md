---
title: Cluster Sizing
aliases:
- /cloudprem/configure/cluster_sizing/
- /cloudprem/operate/sizing/
description: Learn about cluster sizing for BYOC Logs
further_reading:
- link: "/byoc-logs/configure/ingress/"
  tag: "Documentation"
  text: "Configure BYOC Logs Ingress"
- link: "/byoc-logs/configure/pipelines/"
  tag: "Documentation"
  text: "Configure BYOC Logs Log Processing"
- link: "/byoc-logs/introduction/architecture/"
  tag: "Documentation"
  text: "Learn more about BYOC Logs Architecture"
---

{{< jqmath-vanilla >}}

## Overview

Size your BYOC (Bring Your Own Cloud) Logs cluster in three steps:

1. Estimate your daily ingest volume in TB/day.
2. Pick a [starter configuration](#starter-configurations) for that volume.
3. Monitor the cluster and adjust replica counts and pod sizes.

Searcher capacity depends on query concurrency, query complexity, and the amount of data scanned, not on ingest volume alone.

These recommendations assume modern x86 CPUs, such as those used in AWS M6 instance types, or equivalent CPUs from other cloud providers. ARM-based CPUs, such as AWS Graviton, may provide better cost efficiency at comparable throughput.

## Starter configurations

Use these totals as a starting point:

- **Indexers:** 2 vCPUs per TB/day
- **Compactors:** 1 vCPU per 2 TB/day
- **Searchers:** about twice the indexer vCPU total. Analytics-heavy workloads may need up to twice the searcher capacity in the table.

Object storage totals assume 30-day retention and a 6x compression ratio.

|   Daily volume | Indexers | Compactors | Searchers | Object storage |
|---------------:|---------:|-----------:|----------:|---------------:|
|   **1 TB/day** |   2 vCPU |   0.5 vCPU |    4 vCPU |          ~5 TB |
|  **10 TB/day** |  20 vCPU |     5 vCPU |   40 vCPU |         ~50 TB |
| **100 TB/day** | 200 vCPU |    50 vCPU |  400 vCPU |        ~500 TB |

Recommended size for each pod:

| Daily volume        | Indexers        | Compactors      | Searchers        |
|---------------------|----------------:|----------------:|-----------------:|
| **Up to 30 TB/day** |  4 vCPUs, 16 GB |  4 vCPUs, 16 GB |  16 vCPUs, 64 GB |
| **Above 30 TB/day** |  8 vCPUs, 32 GB |  8 vCPUs, 32 GB | 64 vCPUs, 256 GB |

<div class="alert alert-info">
<strong>Billing vs. provisioning:</strong> Provisioned vCPUs and billed vCPUs are different. A production cluster is intentionally overprovisioned to absorb ingestion and search spikes. Contact your Datadog representative for billing guidance.
</div>

## Size each component

The following sections explain how to adjust the starter configuration. For the role of each component, see [Architecture][2].

### Indexers

- **Performance:** 2 vCPUs per TB/day
- **Memory:** 4 GB RAM per vCPU
- **Storage type:** Network-attached block storage for the write-ahead log. See [Configure persistent storage for indexers][3].

{{% collapse-content title="Sizing by event count" level="h4" expanded=false %}}
If you know your daily event count but not your byte volume, use this formula to estimate:

$$\text"Daily volume (TB)" = {\text"events per day" × \text"average event size (bytes)"} / 10^{12}$$

For example, with 1 billion events/day at 1 KB average size:

`1,000,000,000 × 1,000 / 1,000,000,000,000 = 1 TB/day`

Typical log event sizes range from 500 bytes (short syslog) to 2-3 KB (JSON with Kubernetes tags). Measure a representative sample of your logs to get an accurate average.
{{% /collapse-content %}}

### Compactors

- **Performance:** 1 vCPU per 2 TB/day
- **Memory:** 4 GB RAM per vCPU
- **Storage type:** Local SSD. Instances with local SSDs, such as AWS M8gd, are recommended.

### Searchers

Size searchers for the expected search workload, not ingest volume alone. A starting point is about twice the indexer vCPU total.

- **Performance:** Term queries (`status:error AND message:exception`) usually cost less CPU than wildcard or whole-event searches. Aggregation queries need more CPU and memory.
- **Memory:** 4 GB RAM per searcher vCPU. Provision more RAM if you expect many concurrent aggregation requests.

If search latency is high, add searcher replicas or increase memory per pod. See [Scale searchers based on your query patterns][4].

### Other services

Allocate the following resources for these lightweight components:

| Service | vCPUs | RAM | Replicas |
|---------|-------|-----|----------|
| **Control Plane** | 2 | 4 GB | 1 |
| **Metastore** | 2 | 4 GB | 2 |
| **Janitor** | 2 | 4 GB | 1 |

### PostgreSQL database

- **Instance size:** For most use cases, a PostgreSQL instance with 1 vCPU and 4 GB of RAM is sufficient.
- **AWS RDS recommendation:** If using AWS RDS, the `t4g.medium` instance type is a suitable starting point.
- **High availability:** Enable Multi-AZ deployment with one standby replica.

Enable automated backups on the metastore database. See [Enable automated backups on your metastore database][5].

### Object storage

BYOC Logs compresses and indexes log data before storing it in object storage. Compression is typically 5x to 8x, or about 125-200 GB stored per TB ingested per day.

$$\text"Stored data per day" = {\text"Daily volume"} / {\text"compression ratio"}$$

$$\text"Total storage" = \text"Stored data per day" × \text"retention period (days)"$$

<div class="alert alert-info">
Use standard-tier object storage (for example, S3 Standard or GCS Standard) for active data. Lower-cost tiers such as S3 Infrequent Access or GCS Nearline are not validated for use with BYOC Logs.
</div>

To estimate PUT request volume and cost, see [Object Storage Request Estimation][6].

## Helm chart sizing tiers

Set `indexer.podSize` and `searcher.podSize` to match the per-pod CPU and memory in the [starter configuration](#starter-configurations). The default is `xlarge`. Each preset also applies ingest queue and search cache sizes.

| `podSize` | CPU | Memory |
|---|---:|---:|
| `large` | 2 | 8Gi |
| `xlarge` | 4 | 16Gi |
| `2xlarge` | 8 | 32Gi |
| `4xlarge` | 16 | 64Gi |
| `6xlarge` | 24 | 96Gi |
| `8xlarge` | 32 | 128Gi |

{{% collapse-content title="Actual Kubernetes requests" level="h3" expanded=false %}}
Requests are lower than the nominal values above, to leave room for kube-system, DaemonSets, and add-ons. The reservation amounts are based on the [GKE node reservation calculation](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes#resource_reservations). An additional 250m CPU and 512Mi memory per node is reserved for DaemonSets and add-ons.

| `podSize` | Actual CPU request | Actual memory request/limit |
|---|---:|---:|
| `large` | 1600m | 5700Mi |
| `xlarge` | 3600m | 13100Mi |
| `2xlarge` | 7600m | 28500Mi |
| `4xlarge` | 15600m | 59300Mi |
| `6xlarge` | 23600m | 90100Mi |
| `8xlarge` | 31600m | 120900Mi |

```text
Actual CPU request = (nominal pod CPU - Kubernetes system CPU reservation - 250m), rounded down to the nearest 100m
Actual memory request/limit = (nominal pod memory - Kubernetes system memory reservation - 512Mi), rounded down to the nearest 100Mi
```
{{% /collapse-content %}}

See the [Helm chart sizing map][1] for the complete configuration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/sizing-map.yaml
[2]: /byoc-logs/introduction/architecture/
[3]: /byoc-logs/operate/best_practices/#configure-persistent-storage-for-indexers
[4]: /byoc-logs/operate/best_practices/#scale-searchers-based-on-your-query-patterns
[5]: /byoc-logs/operate/best_practices/#enable-automated-backups-on-your-metastore-database
[6]: /byoc-logs/operate/object_storage_requests/
