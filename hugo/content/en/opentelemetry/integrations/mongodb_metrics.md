---
title: MongoDB Metrics
further_reading:
- link: "/opentelemetry/setup/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

<!-- TODO: Add dashboard screenshot once available -->
<!-- {{< img src="/opentelemetry/collector_exporter/mongodb_metrics.png" alt="OpenTelemetry MongoDB metrics in the MongoDB Overview dashboard" style="width:100%;" >}} -->

The [MongoDB receiver][1] collects MongoDB metrics that populate the [MongoDB - Overview][3] dashboard and MongoDB monitors. Configure the receiver according to the specifications of the latest version of the `mongodbreceiver`.

For more information, see the OpenTelemetry project documentation for the [MongoDB receiver][1].

## Setup

To collect MongoDB metrics with OpenTelemetry for use with Datadog:

1. Create a MongoDB user with the [`clusterMonitor` role][5], which includes the `serverStatus` and `listDatabases` actions.
2. Configure one [MongoDB receiver][1] for each `mongod` and `mongos` instance in your OpenTelemetry Collector configuration.
3. Configure service pipelines.
4. Verify that the OpenTelemetry Collector is [configured to export to Datadog][4].

### MongoDB receiver

```yaml
receivers:
  mongodb/mongodb-node-1:
    hosts:
      - endpoint: "<HOST>:<PORT>"
    username: "<USERNAME>"
    password: "<PASSWORD>"
    direct_connection: true
    collection_interval: 10s
    metrics:
      mongodb.operation.latency.time:
        enabled: true
      mongodb.commands.rate:
        enabled: true
      mongodb.deletes.rate:
        enabled: true
      mongodb.getmores.rate:
        enabled: true
      mongodb.inserts.rate:
        enabled: true
      mongodb.queries.rate:
        enabled: true
      mongodb.updates.rate:
        enabled: true
      mongodb.page_faults:
        enabled: true

processors:
  transform/mongodb-node-1:
    metric_statements:
      - context: metric
        statements:
          - set(metric.is_monotonic, true) where metric.name == "mongodb.network.io.receive"
          - set(metric.is_monotonic, true) where metric.name == "mongodb.network.io.transmit"
  cumulativetodelta/mongodb-node-1:
    initial_value: drop
    include:
      match_type: strict
      metrics:
        - mongodb.network.io.receive
        - mongodb.network.io.transmit
        - mongodb.page_faults
  deltatorate/mongodb-node-1:
    metrics:
      - mongodb.network.io.receive
      - mongodb.network.io.transmit
      - mongodb.page_faults
```

This configuration does the following:

- Sets `direct_connection: true` to keep each receiver on its own node. Without it, the driver discovers the replica set and reads the primary's `serverStatus` from every member. The Agent reports each member separately.
- Enables the latency metrics, the per-second operation metrics, and `mongodb.page_faults`, which are off by default in the receiver.
- Uses the `transform`, `cumulativetodelta`, and `deltatorate` processors to turn the network and page fault counters into per-second rates, which match the Agent's rate metrics. `initial_value: drop` discards the first point, which would otherwise report the whole total since startup.

Keep these requirements in mind:

- The user needs the `listDatabases` action. The connection and memory metrics are filtered to the `admin` database, and the receiver emits them only when it can list databases.
- Keep `mongodb.network.request.count` enabled, which is the default. The receiver records the `mongodb.network.io.*` metrics only while it is enabled.

See the [MongoDB receiver documentation][1] for detailed configuration options and requirements.

### Service pipelines

```yaml
service:
  pipelines:
    metrics/mongodb-node-1:
      receivers: [mongodb/mongodb-node-1]
      processors: [transform/mongodb-node-1, cumulativetodelta/mongodb-node-1, deltatorate/mongodb-node-1]
      exporters: [datadog/exporter]
```

## Data collected

{{< mapping-table resource="mongodb.csv">}}

The receiver's `db.namespace` attribute maps to the Datadog `db` tag.

For the full mapping between OpenTelemetry and Datadog metric names, see [OpenTelemetry Metrics Mapping][2].

### Known limitations

- OpenTelemetry series have no `replset_name` or `clustername` tag. Dashboard widgets and monitors grouped by these tags show OpenTelemetry data in a single untagged group.
- `mongodb.uptime` is not mapped. The receiver reports it in milliseconds, and the Agent reports it in seconds under the same metric name.
- `mongodb.stats.datasize` is not mapped. The receiver runs `dbStats` on every node, while the Agent runs it only on standalone, `mongos`, or unsharded primary nodes.
- These Datadog metrics have no MongoDB receiver equivalent:
  - `mongodb.chunks.jumbo`
  - `mongodb.chunks.total`
  - `mongodb.globallock.currentqueue.readers`
  - `mongodb.globallock.currentqueue.writers`
  - `mongodb.oplog.logsizemb`
  - `mongodb.oplog.usedsizemb`
  - `mongodb.oplog.timediff`
  - `mongodb.replset.optime_lag`
  - `mongodb.replset.health`
  - `mongodb.sessions.count`
  - `mongodb.stats.fstotalsize`
  - `mongodb.stats.fsusedsize`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mongodbreceiver
[2]: /opentelemetry/mapping/metrics_mapping/
[3]: https://app.datadoghq.com/dash/integration/13/mongodb---overview
[4]: /opentelemetry/setup/collector_exporter/
[5]: https://www.mongodb.com/docs/manual/reference/built-in-roles/#mongodb-authrole-clusterMonitor
