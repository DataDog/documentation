---
title: SQL Server Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

<!-- TODO: Add dashboard screenshot once available -->
<!-- {{< img src="/opentelemetry/collector_exporter/sqlserver_metrics.png" alt="OpenTelemetry SQL Server metrics in a SQL Server dashboard" style="width:100%;" >}} -->

The [SQL Server receiver][1] allows for collection of SQL Server metrics and access to the [SQL Server Overview][2] and [SQL Server Metrics][7] dashboards. Configure the receiver according to the specifications of the latest version of the `sqlserverreceiver`.

For more information, see the OpenTelemetry project documentation for the [SQL Server receiver][1].

## Setup

To collect SQL Server metrics with OpenTelemetry for use with Datadog:

1. Configure the [SQL Server receiver][1] in your OpenTelemetry Collector configuration.
2. Optionally, configure the [host metrics receiver][5] if your OpenTelemetry Collector is running on the same server as your SQL Server database.
3. Optionally, configure the [file log receiver][6] if your OpenTelemetry Collector is running on the same server as your SQL Server database.
4. Configure service pipelines.
5. Ensure the OpenTelemetry Collector is [configured to export to Datadog][3].

### SQL Server receiver

The SQL Server receiver supports two collection methods: Windows Performance Counters (Windows only) or direct connection. This configuration uses the direct connection method.

```yaml
receivers:
  sqlserver:
    server: "<HOST>"
    port: <PORT>
    username: "<USERNAME>"
    password: "<PASSWORD>"
    collection_interval: 15s
    metrics:
      sqlserver.processes.blocked:
        enabled: true
      sqlserver.cpu.count:
        enabled: true
      sqlserver.computer.uptime:
        enabled: true
      sqlserver.database.io:
        enabled: true
      sqlserver.database.latency:
        enabled: true
      sqlserver.database.operations:
        enabled: true

processors:
  resource:
    attributes:
      - key: host.name
        value: "<HOST>"
        action: upsert
  transform/fix_rate_counters:
    metric_statements:
      - context: metric
        statements:
          - convert_gauge_to_sum("cumulative", true) where metric.name == "sqlserver.batch.request.rate"
          - convert_gauge_to_sum("cumulative", true) where metric.name == "sqlserver.batch.sql_compilation.rate"
          - convert_gauge_to_sum("cumulative", true) where metric.name == "sqlserver.batch.sql_recompilation.rate"
          - convert_gauge_to_sum("cumulative", true) where metric.name == "sqlserver.lock.wait.rate"
  cumulativetodelta:
    include:
      match_type: strict
      metrics:
        - sqlserver.database.io
        - sqlserver.database.latency
        - sqlserver.database.operations
        - sqlserver.batch.request.rate
        - sqlserver.batch.sql_compilation.rate
        - sqlserver.batch.sql_recompilation.rate
        - sqlserver.lock.wait.rate
  deltatorate:
    metrics:
      - sqlserver.batch.request.rate
      - sqlserver.batch.sql_compilation.rate
      - sqlserver.batch.sql_recompilation.rate
      - sqlserver.lock.wait.rate
```

See the [SQL Server receiver documentation][1] for detailed configuration options and requirements.

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

```yaml
receivers:
  filelog:
    include:
      - <PATH_TO_YOUR_SQLSERVER_LOG>
    operators:
      - type: regex_parser
        regex: '^(?P<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d+) (?P<message>.*)'
        timestamp:
          parse_from: attributes.timestamp
          layout: "%Y-%m-%d %H:%M:%S.%f"

processors:
  transform/logs:
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.name"], "<HOST>")
          - set(attributes["datadog.log.source"], "sqlserver")

```

### Service pipelines

```yaml
service:
  pipelines:
    metrics:
      receivers: [sqlserver]
      processors: [resource, transform/fix_rate_counters, cumulativetodelta, deltatorate]
      exporters: [datadog/exporter]
```

If you configured the host metrics receiver, add it to a separate metrics pipeline:

```yaml
    metrics/host:
      receivers: [hostmetrics]
      exporters: [datadog/exporter]
```

If you configured the file log receiver, add a logs pipeline:

```yaml
    logs:
      receivers: [filelog]
      processors: [transform/logs]
      exporters: [datadog/exporter]
```

## Data collected

{{< mapping-table resource="sqlserver.csv">}}

See [OpenTelemetry Metrics Mapping][4] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/sqlserverreceiver
[2]: https://app.datadoghq.com/dash/integration/236/sql-server---overview
[7]: https://app.datadoghq.com/dash/integration/33/sqlserver---metrics
[3]: /opentelemetry/setup/collector_exporter/
[4]: /opentelemetry/guide/metrics_mapping/
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver
