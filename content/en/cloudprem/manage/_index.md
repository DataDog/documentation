---
title: Manage and monitor CloudPrem
description: Learn how to monitor, maintain, and operate your CloudPrem deployment
---

{{< callout btn_hidden="true" >}}
  Datadog CloudPrem is in Preview.
{{< /callout >}}

## Dashboards

CloudPrem provides an Out-Of-The-Box dashboard which monitors CloudPrem's key metrics

### Setup

OOTB metrics are exported by [DogStatsD][1] which is bundled with the Datadog Agent. Run either DogStatsD or the Datadog Agent, configured with your organization's `API key`, to export these metrics. As soon as your CloudPrem cluster is connected to Datadog, the OOTB dashboard is automatically created. You can have access to it in your [dashboards page][2].

### Data Collected

| Metric | Description |
|---|---|
| **indexed_events.count**<br/>(Counter) | Number of indexed events |
| **indexed_events_bytes.count**<br/>(Counter) | Number of indexed bytes |
| **object_storage_delete_requests.count**<br/>(Counter) | Number of delete requests on object storage |
| **object_storage_get_requests.count**<br/>(Counter) | Number of get requests on object storage |
| **object_storage_get_requests_bytes.count**<br/>(Counter) | Total bytes read from object storage via GET requests |
| **object_storage_put_requests.count**<br/>(Counter) | Number of PUT requests on object storage |
| **object_storage_put_requests_bytes.count**<br/>(Counter) | Total bytes written to object storage via PUT requests |
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
