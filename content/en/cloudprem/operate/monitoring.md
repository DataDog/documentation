---
title: Monitor CloudPrem
description: Learn how to monitor specific metrics for your CloudPrem deployment
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Dashboards

CloudPrem provides an out-of-the-box dashboard that monitors CloudPrem's key metrics.

### Setup

These metrics are exported by [DogStatsD][1]. You can either:

- Run DogStatsD as a standalone service, or
- Run the Datadog Agent (which includes DogStatsD by default)

Configure either option with your organization's API key to export these metrics. As soon as your CloudPrem cluster is connected to Datadog, the OOTB dashboard is automatically created, and you can access it from your [Dashboards list][2].

<div class="alert alert-info">To display distribution metrics on your dashboard, you must <a href="/metrics/distributions/#enabling-advanced-query-functionality">enable advanced query functionality</a>.</div>

### Data Collected

| Metric | Description |
|---|---|
| **indexed_events.count**<br/>(Counter) | Number of indexed events |
| **indexed_events_bytes.count**<br/>(Counter) | Number of indexed bytes |
| **ingest_requests.count**<br/>(Counter) | Number of ingest requests |
| **ingest_requests.duration_seconds**<br/>(Histogram) | Ingest request latency |
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
