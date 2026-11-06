---
title: MongoDB Metrics
further_reading:
- link: "/opentelemetry/setup/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/mongodb_metrics.png" alt="The MongoDB - Overview dashboard, showing tiles for averaged uptime, healthy replica set members, and shard, primary, secondary, and config server counts." style="width:100%;" >}}

The [MongoDB receiver][1] collects MongoDB metrics that populate the [MongoDB - Overview][3] dashboard and MongoDB monitors. Configure the receiver according to the specifications of the latest version of the `mongodbreceiver`.

For more information, see the OpenTelemetry project documentation for the [MongoDB receiver][1].

## Setup

To collect MongoDB metrics with OpenTelemetry for use with Datadog:

1. Create a MongoDB user with the [`clusterMonitor` role][5], which includes the `serverStatus` and `listDatabases` actions.
2. Configure one [MongoDB receiver][1] for each `mongod` and `mongos` instance in your OpenTelemetry Collector configuration.
3. Configure the processors that convert the receiver's network and page fault counters to per-second rates.
4. Add the service pipelines to your Collector configuration.
5. Set up the OpenTelemetry Collector with the [recommended configuration][4], which exports to Datadog with the OTLP HTTP exporter (`otlp_http`).

### MongoDB user

Connect to MongoDB with `mongosh` as a user that can create users, and run:

```javascript
db.getSiblingDB("admin").createUser({
  user: "<USERNAME>",
  pwd: "<PASSWORD>",
  roles: [{ role: "clusterMonitor", db: "admin" }]
})
```

### MongoDB receiver

```yaml
receivers:
  mongodb/mongodb-node-1:
    hosts:
      - endpoint: "<HOST>:<PORT>"
    username: "<USERNAME>"
    password: "<PASSWORD>"
    direct_connection: true
    tls:
      insecure: true
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

- Sets `direct_connection: true` to keep each receiver on its own node. Without it, the driver discovers the replica set and reads the primary's `serverStatus` from every member, while the Agent reports each member separately.
- Sets `tls.insecure: true`, because the receiver connects with TLS by default and fails against a MongoDB server without TLS. If your MongoDB deployment uses TLS, remove this setting and configure the receiver's TLS options instead.
- Enables the latency metrics, the per-second operation metrics, and `mongodb.page_faults`, which are off by default in the receiver.
- Uses the `transform`, `cumulativetodelta`, and `deltatorate` processors to turn the network and page fault counters into per-second rates, which match the Agent's rate metrics. `initial_value: drop` discards the first point, which would otherwise report the whole total since startup.

Keep these requirements in mind:

- The user needs the `listDatabases` action. The connection and memory metrics are filtered to the `admin` database, and the receiver emits them only when it can list databases.
- Keep `mongodb.network.request.count` enabled, which is the default. The receiver records the `mongodb.network.io.*` metrics only while it is enabled.

See the [MongoDB receiver documentation][1] for detailed configuration options and requirements.

### Service pipelines

Add this pipeline under `service.pipelines` in your Collector configuration. The `otlp_http` exporter comes from the [recommended configuration][4].

```yaml
service:
  pipelines:
    metrics/mongodb-node-1:
      receivers: [mongodb/mongodb-node-1]
      processors: [transform/mongodb-node-1, cumulativetodelta/mongodb-node-1, deltatorate/mongodb-node-1]
      exporters: [otlp_http]
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
  - `mongodb.oplog.timediff`
  - `mongodb.oplog.usedsizemb`
  - `mongodb.replset.health`
  - `mongodb.replset.optime_lag`
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
