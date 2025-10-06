---
title: MySQL Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > MySQL Metrics
---

# MySQL Metrics

## Overview{% #overview %}

{% image
   source="http://localhost:1313/images/opentelemetry/collector_exporter/mysql_metrics.c85e1516ba5fafcd2a34f7f47a25f728.png?auto=format"
   alt="OpenTelemetry MySQL metrics in a MySQL dashboard" /%}

The [MySQL receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver) allows for collection of MySQL metrics and access to the [MySQL Overview](https://app.datadoghq.com/dash/integration/12/mysql---overview) dashboard. Configure the receiver according to the specifications of the latest version of the `mysqlreceiver`.

For more information, see the OpenTelemetry project documentation for the [MySQL receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver).

## Setup{% #setup %}

To collect MySQL metrics with OpenTelemetry for use with Datadog:

1. Configure the [MySQL receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver) in your OpenTelemetry Collector configuration.
1. Optionally, configure the [host metrics receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver) if your OpenTelemetry Collector is running on the same server as your MySQL database.
1. Optionally, configure the [file log receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver) if your OpenTelemetry Collector is running on the same server as your MySQL database.
1. Configure service pipelines.
1. Ensure the OpenTelemetry Collector is [configured to export to Datadog](http://localhost:1313/opentelemetry/setup/collector_exporter/).

### MySQL receiver{% #mysql-receiver %}

```
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

See the [MySQL receiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver) for detailed configuration options and requirements.

### Host metrics receiver{% #host-metrics-receiver %}

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

### File log receiver{% #file-log-receiver %}

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

### Service pipelines{% #service-pipelines %}

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

## Data collected{% #data-collected %}

See [OpenTelemetry Metrics Mapping](http://localhost:1313/opentelemetry/guide/metrics_mapping/) for more information.

## Further reading{% #further-reading %}

- [Setting Up the OpenTelemetry Collector](http://localhost:1313/opentelemetry/collector_exporter/)
