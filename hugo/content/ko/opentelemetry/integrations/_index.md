---
further_reading:
- link: /opentelemetry/schema_semantics/metrics_mapping/
  tag: 설명서
  text: OpenTelemetry 메트릭 매핑
title: Integrations
---
이 페이지는 Datadog에서 지원하는 OpenTelemetry(OTel) 통합을 다룹니다. 이러한 통합을 통해 Datadog에서 OpenTelemetry를 사용하여 관측 가능성 데이터를 수집하고 모니터링할 수 있습니다.

## 개요 {#overview}

OpenTelemetry(OTel) 통합은 OpenTelemetry 표준을 사용하여 다양한 소스에서 관측 가능성 데이터(메트릭, 트레이스 및 로그)를 수집할 수 있게 해주는 구성 요소입니다. 이러한 통합은 OpenTelemetry Collector와 함께 작동하도록 설계되었으며, 이 Collector는 텔레메트리 데이터를 수신, 처리하고 Datadog과 같은 관측 가능성 백엔드로 내보냅니다.

모든 OpenTelemetry 통합의 전체 목록은 [OpenTelemetry 레지스트리][1]를 참조하세요. 이 레지스트리는 OpenTelemetry 생태계의 수신기, 익스포터 및 기타 구성 요소에 대한 정보를 제공합니다.

## 메트릭 요금 {#metric-pricing}

Datadog은 지원되는 OpenTelemetry 수신기에서 추가 비용 없이 메트릭을 수집합니다. 이러한 무료 메트릭은 다음과 같습니다.
- 각 수신기에 대한 `metadata.yaml` 파일에 정의되어 있습니다.
- [메트릭 매핑][14] 표에 나열되어 있습니다.

예를 들어, [`dockerstatsreceiver`][15] `metadata.yaml` 파일에는 추가 비용 없이 수집할 수 있는 메트릭이 나열되어 있습니다.

<div class="alert alert-danger">OpenTelemetry 수신기 설명서에 따라 수신기를 구성하세요. 수신기가 잘못 구성되면 메트릭이 사용자 지정 메트릭으로 분류되어 추가 요금이 발생할 수 있습니다.</div>

## Datadog 지원 OpenTelemetry 통합 {#datadog-supported-opentelemetry-integrations}

Datadog은 다음 OpenTelemetry 통합을 지원합니다.

### APM(Application Performance Monitoring) {#apm-application-performance-monitoring}

애플리케이션의 성능을 모니터링하고 최적화합니다.

- [트레이스 메트릭][2] - 히트, 오류, 지속 시간과 같은 APM 통계를 생성합니다.
- [런타임 메트릭][3] - Java, .NET 및 Go 애플리케이션에 대한 런타임 메트릭을 수집합니다.

### Collector {#collector}

OpenTelemetry Collector의 상태 및 성능을 모니터링합니다.

- [Collector Health Metrics][4] - OpenTelemetry Collector의 성능을 추적합니다.
- [Datadog 확장 프로그램][17] - Datadog Infrastructure Monitoring에서 Collector 구성 및 빌드 정보를 조회합니다.

### 컨테이너 및 호스트 {#containers-and-hosts}

컨테이너화된 환경 및 호스트 시스템에 대한 인사이트 확보:

- [Docker 메트릭][5] - Docker 컨테이너 성능을 모니터링합니다.
- [호스트 메트릭][6] - CPU, 디스크, 메모리 사용량과 같은 시스템 메트릭을 추적합니다.
- [Kubernetes 메트릭][18] - Kubernetes 인프라 메트릭을 수집하고 리소스 데이터를 Kubernetes Explorer로 전송합니다.
- [Podman 메트릭][16] - Podman 컨테이너 성능을 모니터링합니다.

### 웹 서버 및 프록시 {#web-servers-and-proxies}

웹 서버 및 프록시 기술을 모니터링합니다.

- [Apache 웹 서버 메트릭][7] - Apache HTTP Server에서 메트릭을 수집합니다.
- [NGINX 메트릭][8] - NGINX 웹 서버 성능을 모니터링합니다.
- [IIS 메트릭][9] - Internet Information Services(IIS) 메트릭을 추적합니다.
- [HAProxy 메트릭][10] - HAProxy 로드 밸런서 성능을 모니터링합니다.

### 데이터베이스 및 메시징 {#databases-and-messaging}

데이터베이스 및 메시징 시스템을 모니터링합니다.

- [MySQL 메트릭][11] - MySQL 데이터베이스 성능을 추적합니다.
- [PostgreSQL 메트릭][19] - PostgreSQL 데이터베이스 성능을 추적합니다.
- [SQL Server 메트릭][20] - SQL Server 데이터베이스 성능을 추적합니다.
- [Kafka 메트릭][12] - Apache Kafka 메시징 플랫폼을 모니터링합니다.

### 빅 데이터 및 처리 {#big-data-and-processing}

빅 데이터 처리 프레임워크를 모니터링합니다.

- [Apache Spark 메트릭][13] - Apache Spark 성능 메트릭을 추적합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/ecosystem/registry/
[2]: /ko/opentelemetry/integrations/trace_metrics
[3]: /ko/opentelemetry/integrations/runtime_metrics/
[4]: /ko/opentelemetry/integrations/collector_health_metrics/
[5]: /ko/opentelemetry/integrations/docker_metrics/
[6]: /ko/opentelemetry/integrations/host_metrics/
[7]: /ko/opentelemetry/integrations/apache_metrics/
[8]: /ko/opentelemetry/integrations/nginx_metrics/
[9]: /ko/opentelemetry/integrations/iis_metrics/
[10]: /ko/opentelemetry/integrations/haproxy_metrics/
[11]: /ko/opentelemetry/integrations/mysql_metrics/
[12]: /ko/opentelemetry/integrations/kafka_metrics/
[13]: /ko/opentelemetry/integrations/spark_metrics/
[14]: /ko/opentelemetry/mapping/metrics_mapping/#metrics-mappings
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/metadata.yaml
[16]: /ko/opentelemetry/integrations/podman_metrics/
[17]: /ko/opentelemetry/integrations/datadog_extension/
[18]: /ko/opentelemetry/integrations/kubernetes_metrics/
[19]: /ko/opentelemetry/integrations/postgres_metrics/
[20]: /ko/opentelemetry/integrations/sqlserver_metrics/