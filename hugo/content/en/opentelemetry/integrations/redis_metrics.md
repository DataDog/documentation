---
title: Redis Metrics
further_reading:
- link: "/opentelemetry/setup/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/redis_metrics.png" alt="The Redis - Overview dashboard, showing tiles for hit rate, blocked clients, keyspace size, unsaved changes, and primary link down time." style="width:100%;" >}}

The [Redis receiver][1] collects Redis metrics that populate the [Redis - Overview][3] dashboard and the Redis high memory monitor. Configure the receiver according to the specifications of the latest version of the `redisreceiver`.

For more information, see the OpenTelemetry project documentation for the [Redis receiver][1].

## Setup

To collect Redis metrics with OpenTelemetry for use with Datadog:

1. Configure the [Redis receiver][1] in your OpenTelemetry Collector configuration.
2. Configure the processors that convert the receiver's cumulative sums to the metric types Datadog expects.
3. Add the service pipelines to your Collector configuration.
4. Set up the OpenTelemetry Collector with the [recommended configuration][4], which exports to Datadog with the OTLP HTTP exporter (`otlp_http`).

### Redis receiver

```yaml
receivers:
  redis/redis-host-1:
    endpoint: "<HOST>:<PORT>"
    password: "<PASSWORD>"
    collection_interval: 10s
    metrics:
      redis.maxmemory:
        enabled: true

processors:
  resource/redis-host-1:
    attributes:
      - action: insert
        key: datadog.host.name
        value: <HOSTNAME>
  transform/redis-host-1:
    metric_statements:
      - context: metric
        statements:
          - convert_sum_to_gauge() where metric.name == "redis.keys.evicted"
          - convert_sum_to_gauge() where metric.name == "redis.keys.expired"
          - convert_sum_to_gauge() where metric.name == "redis.connections.rejected"
  cumulativetodelta/redis-host-1:
    include:
      match_type: strict
      metrics:
        - redis.commands.processed
        - redis.cpu.time
        - redis.keyspace.hits
        - redis.keyspace.misses
  deltatorate/redis-host-1:
    metrics:
      - redis.commands.processed
      - redis.cpu.time
      - redis.keyspace.hits
      - redis.keyspace.misses
```

Replace `<HOST>` and `<PORT>` with the address of your Redis server, and `<HOSTNAME>` with the host name to show in Datadog. If your Redis server doesn't require a password, remove the `password` line.

`redis.mem.maxmemory` reports a value only when `maxmemory` is set on your Redis server.

See the [Redis receiver documentation][1] for detailed configuration options and requirements.

### Service pipelines

Add this pipeline under `service.pipelines` in your Collector configuration. The `otlp_http` exporter comes from the [recommended configuration][4].

```yaml
service:
  pipelines:
    metrics/redis-host-1:
      receivers: [redis/redis-host-1]
      processors: [resource/redis-host-1, transform/redis-host-1, cumulativetodelta/redis-host-1, deltatorate/redis-host-1]
      exporters: [otlp_http]
```

## Data collected

{{< mapping-table resource="redis.csv">}}

The `db` attribute on `redis.db.keys` and `redis.db.expires` maps to the Datadog `redis_db` tag.

For the full mapping between OpenTelemetry and Datadog metric names, see [OpenTelemetry Metrics Mapping][2].

### Known limitations

- The receiver sets `db` to the bare database index, such as `0`, while the Agent tags `redis_db:db0`. OpenTelemetry series appear as `redis_db:0`, so filters such as `redis_db:db0` don't match them. The Redis - Overview dashboard doesn't filter or group by `redis_db`.
- These Datadog metrics have no Redis receiver equivalent:
  - `redis.info.latency_ms`
  - `redis.key.length`
  - `redis.replication.delay`
  - `redis.replication.master_link_down_since_seconds`
  - `redis.slowlog.micros.95percentile`
  - `redis.slowlog.micros.count`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/redisreceiver
[2]: /opentelemetry/mapping/metrics_mapping/
[3]: https://app.datadoghq.com/dash/integration/15/redis---overview
[4]: /opentelemetry/setup/collector_exporter/
