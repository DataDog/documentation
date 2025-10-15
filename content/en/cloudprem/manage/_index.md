---
title: Manage and monitor CloudPrem
description: Learn how to monitor, maintain, and operate your CloudPrem deployment
---

{{< callout btn_hidden="true" >}}
  Datadog CloudPrem is in Preview.
{{< /callout >}}

## Retention Policy

The retention policy specifies the duration for which data is retained before deletion. By default, the retention period is configured to 30 days. Data removal is performed automatically on a daily basis by the janitor, which deletes splits (index files) older than the defined retention threshold.

To modify the retention period, update the `seed.retention` parameter in the Helm chart values file using a human-readable string (for example, `15 days`, `6 months`, or `3 years`). After making this change, apply it by upgrading the Helm release with the `helm upgrade` command to ensure the new retention policy is enforced. Finally, you may restart the janitor pod, which will cause the new configuration to take effect immediately rather than waiting for the next scheduled evaluation.

1. Update the retention period:
{{< code-block lang="yaml" filename="datadog-values.yaml">}}
seed:
  retention: 6 months
{{< /code-block >}}

2. Upgrade the Helm chart release:
```shell
helm upgrade <RELEASE_NAME> datadog/cloudprem \
  -n <NAMESPACE_NAME> \
  -f datadog-values.yaml
```

3. Restart the janitor pod:
```shell
kubectl delete pod -l app.kubernetes.io/component=janitor -n <NAMESPACE_NAME>
```

## Dashboards

CloudPrem provides an out-of-the-box dashboard that monitors CloudPrem's key metrics.

### Setup

These metrics are exported by [DogStatsD][1]. You can either:

- Run DogStatsD as a standalone service, or
- Run the Datadog Agent (which includes DogStatsD by default)

Configure either option with your organization's API key to export these metrics. As soon as your CloudPrem cluster is connected to Datadog, the OOTB dashboard is automatically created, and you can access it from your [Dashboards list][2].

### Data Collected

| Metric | Description |
|---|---|
| **indexed_events.count**<br/>(Counter) | Number of indexed events |
| **indexed_events_bytes.count**<br/>(Counter) | Number of indexed bytes |
| **ingest_requests.count**<br/>(Counter) | Number of ingest requests |
| **object_storage_delete_requests.count**<br/>(Counter) | Number of delete requests on object storage |
| **object_storage_get_requests.count**<br/>(Counter) | Number of get requests on object storage |
| **object_storage_get_requests_bytes.count**<br/>(Counter) | Total bytes read from object storage using GET requests |
| **object_storage_put_requests.count**<br/>(Counter) | Number of PUT requests on object storage |
| **object_storage_put_requests_bytes.count**<br/>(Counter) | Total bytes written to object storage using PUT requests |
| **pending_merge_ops.gauge**<br/>(Gauge) | Number of pending merge operations |
| **search_requests.count**<br/>(Counter) | Number of search requests |
| **search_requests.duration_seconds**<br/>(Histogram) | Search request latency |
| **metastore_requests.count**<br/>(Counter) | Number of metastore requests |
| **metastore_requests.duration_seconds**<br/>(Histogram) | Metastore request latency |
| **cpu.usage.gauge**<br/>(Gauge) | CPU usage percentage |
| **uptime.gauge**<br/>(Gauge) | Service uptime in seconds |
| **memory.allocated_bytes.gauge**<br/>(Gauge) | Allocated memory in bytes |
| **disk.bytes_read.counter**<br/>(Counter) | Total bytes read from disk |
| **disk.bytes_written.counter**<br/>(Counter) | Total bytes written to disk |
| **disk.available_space.gauge**<br/>(Gauge) | Available disk space in bytes |
| **disk.total_space.gauge**<br/>(Gauge) | Total disk capacity in bytes |
| **network.bytes_recv.counter**<br/>(Counter) | Total bytes received over network |
| **network.bytes_sent.counter**<br/>(Counter) | Total bytes sent over network |

<!-- ## Alerts, autoscaling, upgrades

Coming soon. -->

[1]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent
[2]: https://app.datadoghq.com/dashboard/lists?q=cloudprem&p=1
