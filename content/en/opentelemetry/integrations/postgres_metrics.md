---
title: PostgreSQL Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

<!-- TODO: Add dashboard screenshot once available -->
<!-- {{< img src="/opentelemetry/collector_exporter/postgres_metrics.png" alt="OpenTelemetry PostgreSQL metrics in a PostgreSQL dashboard" style="width:100%;" >}} -->

The [PostgreSQL receiver][1] allows for collection of PostgreSQL metrics and access to the [PostgreSQL Overview][2] and [PostgreSQL Metrics][3] dashboards. Configure the receiver according to the specifications of the latest version of the `postgresqlreceiver`.

For more information, see the OpenTelemetry project documentation for the [PostgreSQL receiver][1].

## Setup

To collect PostgreSQL metrics with OpenTelemetry for use with Datadog:

1. Configure the [PostgreSQL receiver][1] in your OpenTelemetry Collector configuration.
2. Optionally, configure the [host metrics receiver][6] if your OpenTelemetry Collector is running on the same server as your PostgreSQL database.
3. Optionally, configure the [file log receiver][7] if your OpenTelemetry Collector is running on the same server as your PostgreSQL database.
4. Configure service pipelines.
5. Ensure the OpenTelemetry Collector is [configured to export to Datadog][4].

### PostgreSQL receiver

```yaml
receivers:
  postgresql/pg-host-1:
    endpoint: "<HOST>:<PORT>"
    username: "<USERNAME>"
    password: "<PASSWORD>"
    collection_interval: 15s
    metrics:
      postgresql.blks_hit:
        enabled: true
      postgresql.blks_read:
        enabled: true
      postgresql.database.locks:
        enabled: true
      postgresql.deadlocks:
        enabled: true
      postgresql.function.calls:
        enabled: true
      postgresql.sequential_scans:
        enabled: true
      postgresql.temp_files:
        enabled: true
      postgresql.temp.io:
        enabled: true
      postgresql.tup_deleted:
        enabled: true
      postgresql.tup_fetched:
        enabled: true
      postgresql.tup_inserted:
        enabled: true
      postgresql.tup_returned:
        enabled: true
      postgresql.tup_updated:
        enabled: true
      postgresql.wal.delay:
        enabled: true

processors:
  resource/pg-host-1:
    attributes:
      - action: insert
        key: datadog.host.name
        value: <HOST>
  cumulativetodelta: {}
  deltatorate:
    metrics:
      - postgresql.tup_returned
      - postgresql.tup_fetched
      - postgresql.tup_inserted
      - postgresql.tup_updated
      - postgresql.tup_deleted
      - postgresql.operations
      - postgresql.commits
      - postgresql.rollbacks
      - postgresql.blks_hit
      - postgresql.blks_read
      - postgresql.temp_files
      - postgresql.temp.io
      - postgresql.function.calls
      - postgresql.index.scans
      - postgresql.sequential_scans
      - postgresql.blocks_read
```

See the [PostgreSQL receiver documentation][1] for detailed configuration options and requirements.

### Host metrics receiver

```yaml
receivers:
  hostmetrics:
    scrapers:
      load:
      cpu:
        metrics:
         system.cpu.utilization:
           enabled: true
      memory:
      network:
```

### File log receiver

This example assumes PostgreSQL 15+ with `log_destination = 'jsonlog'` configured. If you use the default `stderr` log format, adjust the operators to match your `log_line_prefix`.

```yaml
receivers:
  filelog:
    include:
      - <PATH_TO_YOUR_POSTGRESQL_LOG>
    operators:
      - type: json_parser
        parse_from: body
        timestamp:
          parse_from: attributes.timestamp
          layout: "%Y-%m-%d %H:%M:%S.%L %Z"

processors:
  transform/logs:
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.name"], "<HOST>")
          - set(attributes["datadog.log.source"], "postgresql")

  batch: {}
```

### Service pipelines

```yaml
service:
  pipelines:
    metrics/pg-host-1:
      receivers: [postgresql/pg-host-1]
      processors: [resource/pg-host-1, cumulativetodelta, deltatorate]
      exporters: [datadog/exporter]
```

If you configured the host metrics receiver, add it to a separate metrics pipeline:

```yaml
    metrics/host:
      receivers: [hostmetrics]
      processors: [cumulativetodelta, deltatorate]
      exporters: [datadog/exporter]
```

If you configured the file log receiver, add a logs pipeline:

```yaml
    logs:
      receivers: [filelog]
      processors: [transform/logs, batch]
      exporters: [datadog/exporter]
```

## Data collected

{{< mapping-table resource="postgresql.csv">}}

See [OpenTelemetry Metrics Mapping][5] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/postgresqlreceiver
[2]: https://app.datadoghq.com/dash/integration/235/postgres---overview
[3]: https://app.datadoghq.com/dash/integration/17/postgres---metrics
[4]: /opentelemetry/setup/collector_exporter/
[5]: /opentelemetry/guide/metrics_mapping/
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver
