---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: 설명서
  text: OpenTelemetry Collector 설정
title: MySQL 메트릭
---

## 개요

{{< img src="/opentelemetry/collector_exporter/mysql_metrics.png" alt="MySQL 대시보드의 OpenTelemetry MySQL 메트릭" style="width:100%;" >}}

MySQL 수신기를 사용하면 MySQL 메트릭을 수집하고 MySQL Overview 대시보드에 접근할 수 있습니다. `mysqlreceiver` 최신 버전 사양에 따라 수신기를 구성하세요.

자세한 내용은 OpenTelemetry 프로젝트 문서의 [MySQL receiver][1] 항목을 참고하세요.

## 설정

Datadog에서 사용할 MySQL 메트릭을 OpenTelemetry로 수집하는 방법:

1. OpenTelemetry Collector 구성에서 [MySQL 수신기][1]를 설정하세요.
2. OpenTelemetry Collector가 MySQL 데이터베이스와 동일한 서버에서 실행 중인 경우, 선택적으로 [호스트 메트릭 수신기][6]를 구성할 수 있습니다.
3. OpenTelemetry Collector가 MySQL 데이터베이스와 동일한 서버에서 실행 중인 경우, 선택적으로 [파일 로그 수신기][7]를 구성할 수 있습니다.
4. 서비스 파이프라인을 구성합니다.
5. OpenTelemetry Collector가 [Datadog로 내보내도록 구성][5]되어 있는지 확인하세요.

### MySQL 수신기

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

자세한 구성 옵션 및 요구 사항은 [MySQL 수신기 설명서][1]를 참고하세요.

### 호스트 메트릭 수신기

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

### 파일 로그 수신기

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

### 서비스 파이프라인

```yaml
service:
  pipelines:
    metrics/mysql-host-1:
      receivers: [mysql/mysql-host-1]
      exporters: [datadog/exporter]
      processors: [resource/mysql-host-1,cumulativetodelta,deltatorate,transform/mysql-host-1]
```

구성한 경우 `hostmetrics` 및 `filelog` 수신기를 추가합니다. 예:

```yaml
      receivers: [mysql/mysql-host-1,hostmetrics,filelog]
```

## 수집한 데이터

{{< mapping-table resource="mysql.csv">}}

자세한 정보는 [OpenTelemetry 메트릭 매핑][2]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver
[2]: /ko/opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/12/mysql---overview
[5]: /ko/opentelemetry/setup/collector_exporter/
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver