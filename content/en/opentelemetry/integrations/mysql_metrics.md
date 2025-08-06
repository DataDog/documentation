---
title: MySQL Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/mysql_metrics.png" alt="OpenTelemetry MySQL metrics in a MySQL dashboard" style="width:100%;" >}}

The [MySQL receiver][1] allows for collection of MySQL metrics and access to the [MySQL Overview][4] dashboard. Configure the receiver according to the specifications of the latest version of the `mysqlreceiver`.

For more information, see the OpenTelemetry project documentation for the [MySQL receiver][1].

## Setup

To collect MySQL metrics with OpenTelemetry for use with Datadog:

1. Configure the [MySQL receiver][1] in your OpenTelemetry Collector configuration.
2. Optionally, configure the [host metrics receiver][6] if your OpenTelemetry Collector is running on the same server as your MySQL database.
3. Optionally, configure the [file log receiver][7] if your OpenTelemetry Collector is running on the same server as your MySQL database.
4. Configure service pipelines.
5. Ensure the OpenTelemetry Collector is [configured to export to Datadog][5].

### MySQL receiver

```yaml:
receivers:
  mysql/mysql-host-1:
    endpoint: "<HOST>:<PORT>"
    username: "<USERNAME>"
    password: "<PASSWORD>"
    collection_interval: 10s
    metrics:
      mysql.connection.count:
        enabled: true
      mysql.connection.errors:
        enabled: true
      mysql.commands:
        enabled: true
      mysql.query.slow.count:
        enabled: true
      mysql.max_used_connections:
        enabled: true

processors:
  resource/mysql-host-1:
    attributes:
      - action: insert
        key: datadog.host.name
        value: <HOST>
  transform/mysql-host-1:
    metric_statements:
      - convert_sum_to_gauge() where metric.name == "mysql.locks"
  cumulativetodelta: {}
  deltatorate:
    metrics:
      - mysql.connection.count
      - mysql.commands
      - mysql.operations
      - mysql.query.slow.count
      - mysql.connection.errors
      - mysql.log_operations
      - system.network.io
```

See the [MySQL receiver documentation][1] for detailed configuration options and requirements.

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
      - <PATH_TO_YOUR_MYSQL_ERROR_LOG>
      - <PATH_TO_YOUR_MYSQL_LOG_FILE>
    operators:
      - type: json_parser
        parse_from: body
        timestamp:
          parse_from: attributes.timestamp
          layout: "%Y-%m-%dT%H:%M:%SZ"

processors:
  transform/logs:
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.name"], "<HOST>")
          - set(attributes["datadog.log.source"], "mysql")

  batch: {}
```

### Service pipelines

```yaml
service:
  pipelines:
    metrics/mysql-host-1:
      receivers: [mysql/mysql-host-1]
      exporters: [datadog/exporter]
      processors: [resource/mysql-host-1,cumulativetodelta,deltatorate,transform/mysql-host-1]
```

Add `hostmetrics` and `filelog` receiver if you configured them, for example:

```yaml
      receivers: [mysql/mysql-host-1,hostmetrics,filelog]
```

## Data collected

{{< mapping-table resource="mysql.csv">}}

See [OpenTelemetry Metrics Mapping][2] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver
[2]: /opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/12/mysql---overview
[5]: /opentelemetry/setup/collector_exporter/
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver
