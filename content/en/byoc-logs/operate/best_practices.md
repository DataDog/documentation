---
title: Production Best Practices
description: Recommendations for running CloudPrem reliably in production.
further_reading:
- link: "/cloudprem/operate/sizing/"
  tag: "Documentation"
  text: "Cluster Sizing"
- link: "/cloudprem/operate/monitoring/"
  tag: "Documentation"
  text: "Monitor CloudPrem"
- link: "/cloudprem/operate/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to use self-hosted log management features.
{{< /callout >}}

## Overview

This page outlines operational best practices for running CloudPrem in production to help reduce common deployment issues.

## Enable monitoring from the start

Set up CloudPrem monitoring before sending production traffic. Without monitoring, diagnosing ingestion or search issues is difficult.

1. Deploy the Datadog Agent (or standalone DogStatsD) in the same cluster as CloudPrem.
2. Verify that CloudPrem metrics appear in the [out-of-the-box dashboard][1].
3. Confirm that key metrics are reporting: `indexed_events.count`, `search_requests.count`, `disk.available_space.gauge`.

See [Monitor CloudPrem][2] for detailed setup instructions.

## Use the podSize Helm parameter

Always use the `indexer.podSize` and `searcher.podSize` parameters in the Helm chart instead of manually setting CPU and memory resource limits.

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

**Recommended configuration:**
- **Size:** At least 250 GB per indexer pod
- **Storage class:** Network-attached block storage (for example, `gp3` on AWS, Persistent Disk on GCP, Managed Disks on Azure)

Note: Local SSDs are not recommended because the WAL is not replicated. Ephemeral disks can result in data loss if the disk fails. Use network-attached storage for built-in redundancy.

Example Helm values:
```yaml
indexer:
  persistentVolume:
    enabled: true
    storage: 250Gi
    storageClass: gp3
```

<div class="alert alert-warning">
Running indexers without persistent volumes may cause data loss during pod restarts or node failures. Always enable persistent storage for production deployments.
</div>

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
2. Use a larger `searcher.podSize` for more memory per pod (especially for aggregation-heavy workloads).

## Use Lambda search offloading on AWS

On AWS, CloudPrem can offload leaf search operations to AWS Lambda. Instead of provisioning searcher pods for peak query load, Lambda handles overflow automatically.

This is useful when:
- Your query load has significant peaks (for example, during incidents or business hours)
- You want to avoid over-provisioning searchers for occasional heavy aggregation queries
- You want to search over large time ranges without adding permanent searcher capacity

With Lambda offloading enabled, you can run fewer searcher pods sized for your baseline query load, and let Lambda absorb spikes. See [Lambda Search Offloading][4] for setup instructions.

## Keep your Helm chart version up to date

CloudPrem improvements and bug fixes are delivered through Helm chart updates.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists?q=cloudprem&p=1
[2]: /cloudprem/operate/monitoring/
[3]: /cloudprem/operate/sizing/#helm-chart-sizing-tiers
[4]: /cloudprem/configure/lambda/
