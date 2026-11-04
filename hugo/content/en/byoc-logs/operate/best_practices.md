---
title: BYOC Logs Production Best Practices
description: Recommendations for running BYOC Logs reliably in production.
further_reading:
- link: "/byoc-logs/operate/sizing/"
  tag: "Documentation"
  text: "Cluster Sizing"
- link: "/byoc-logs/operate/monitoring/"
  tag: "Documentation"
  text: "Monitor BYOC Logs"
- link: "/byoc-logs/operate/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"
---

## Overview

This page outlines operational best practices for running BYOC (Bring Your Own Cloud) Logs in production to help reduce common deployment issues.

## Enable monitoring from the start

Set up BYOC Logs monitoring before sending production traffic. Without monitoring, diagnosing ingestion or search issues is difficult.

1. Deploy the Datadog Agent (or standalone DogStatsD) in the same cluster as BYOC Logs.
2. Verify that BYOC Logs metrics appear in the [out-of-the-box dashboard][1].
3. Confirm that key metrics are reporting: `indexed_events.count`, `search_requests.count`, `disk.available_space.gauge`.

See [Monitor BYOC Logs][2] for detailed setup instructions.

## Use the podSize Helm parameter

For Helm deployments, use the `indexer.podSize` and `searcher.podSize` parameters to select resource limits and their associated tuning.

For Operator deployments, configure resources, memory limits, and storage in the `DatadogBYOCCluster` instead. The Operator derives engine cache and queue settings from those resources. You still need to size the workload and provision sufficient nodes. See [Operator resource configuration][6].

The `podSize` parameter automatically configures component-specific settings (cache sizes, queue limits, concurrent search settings) that are tuned for each tier. Manually setting resources without these tuned values can lead to degraded performance.

```yaml
indexer:
  podSize: xlarge   # 4 vCPUs, 16 GB RAM + tuned settings
searcher:
  podSize: 2xlarge  # 8 vCPUs, 32 GB RAM + tuned settings
```

See [Helm chart sizing tiers][3] for the full list of available sizes and their configurations.

## Configure persistent storage for indexers

Indexers use a write-ahead log (WAL) to temporarily buffer data before uploading splits to object storage. Configure persistent volumes to prevent data loss if an indexer pod restarts.

**Recommended configuration**:
- **Size**: At least 250 GB per indexer pod
- **Storage class**: Network-attached block storage (for example, `gp3` on AWS, Persistent Disk on GCP, Managed Disks on Azure)

**Note**: Local SSDs are not recommended because the WAL is not replicated. Ephemeral disks can result in data loss if the disk fails. Use network-attached storage for built-in redundancy, and always enable persistent volumes for production deployments.

Example Helm values:

```yaml
indexer:
  persistentVolume:
    enabled: true
    storage: 250Gi
    storageClass: gp3
```

For Operator-managed indexers, configure persistent storage with `spec.components.indexer.storage.volumeClaimTemplate`. Set the StorageClass and capacity before deployment. See the [Operator storage example][6].

## Enable automated backups on your metastore database

BYOC Logs stores metadata in a PostgreSQL database (Amazon RDS, Cloud SQL, or Azure Database for PostgreSQL, depending on your cloud provider). Enable automated backups on this database for disaster recovery.

For example, on AWS, set a nonzero `--backup-retention-period` when you create the RDS instance. See [Create an RDS database][5] for an example command.

## Monitor disk capacity on indexers

Indexer disk usage grows as the WAL accumulates data and during merge operations. If disk space runs out, indexers stop ingesting logs.

- Set up an alert on `disk.available_space.gauge` that notifies you when available space drops below 20% of total capacity.
- Monitor `pending_merge_ops.gauge`. A growing backlog of pending merges can indicate indexers are falling behind.

## Scale searchers based on your query patterns

Searcher sizing depends more on query patterns than ingestion volume:

- **Term searches** (for example, `status:error AND service:web`): Lower resource requirements
- **Aggregation queries** (timeseries, top lists, percentiles): Higher CPU and memory requirements, especially for multi-day time ranges

If you observe search timeouts or slow dashboard loads, adjust capacity:
1. Increase the number of searcher pods.
2. For Helm, use a larger `searcher.podSize`. For the Operator, increase `spec.components.searcher.resources` memory requests and limits, especially for aggregation-heavy workloads.

## Use Lambda search offloading on AWS

On AWS, BYOC Logs can offload leaf search operations to AWS Lambda. Instead of provisioning searcher pods for peak query load, Lambda handles overflow automatically.

This is useful when:
- Your query load has significant peaks (for example, during incidents or business hours)
- You want to avoid over-provisioning searchers for occasional heavy aggregation queries
- You want to search over large time ranges without adding permanent searcher capacity

With Lambda offloading enabled, you can run fewer searcher pods sized for your baseline query load, and let Lambda absorb spikes. See [Lambda Search Offloading][4] for setup instructions.

## Keep your Helm chart version up to date

The commands in this section apply to the engine Helm chart. For Operator deployments, upgrading the Operator also updates the default engine and Worker images unless their versions are pinned through `spec.imageOverrides`. Review all affected components and follow [Operator update guidance][7].

BYOC Logs improvements and bug fixes are delivered through Helm chart updates.

Refresh the Datadog repository and upgrade to the latest chart version with your existing values file:

```shell
helm repo update datadog
helm upgrade <RELEASE_NAME> datadog/cloudprem \
  --namespace datadog-byoc-logs \
  --values values.yaml
```

To list the available chart versions before upgrading:

```shell
helm search repo datadog/cloudprem --versions
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists?q=byoc&p=1
[2]: /byoc-logs/operate/monitoring/
[3]: /byoc-logs/operate/sizing/#helm-chart-sizing-tiers
[4]: /byoc-logs/configure/lambda/
[5]: /byoc-logs/install/aws_eks/#create-an-rds-database
[6]: /byoc-logs/operate/sizing/#operator-resource-configuration
[7]: /byoc-logs/operate/updates/#operator-managed-deployments
