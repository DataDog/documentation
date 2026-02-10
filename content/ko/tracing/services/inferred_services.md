---
title: 추론된 서비스
description: 아웃바운드 요청 분석을 통해 데이터베이스 및 대기열과 같은 서비스 종속성을 자동으로 검색합니다.
aliases:
  - /tracing/guide/inferred-service-opt-in
further_reading:
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Datadog 서비스에 관해 자세히 알아보기"
---

## 개요

Datadog은 데이터베이스, 대기열, 타사 API 등 계측된 서비스의 종속성을 자동으로 검색합니다. 이는 해당 종속성이 직접 계측되지 않은 경우에도 마찬가지입니다. Datadog은 계측된 서비스의 아웃바운드 요청을 분석하여 이러한 종속성의 존재를 추론하고, 그와 관련된 성능 메트릭을 수집합니다.

{{< img src="tracing/visualization/service/dependencies_section.png" alt="Service page dependency map" style="width:90%;">}}

{{< site-region region="ap1,us3,us5,eu,us,ap2" >}}

[소프트웨어 카탈로그][1]에서 추론된 서비스를 둘러보려면 데이터베이스, 대기열 또는 타사 API와 같은 엔터티 유형 기준으로 항목을 필터링하세요. 각각의 [서비스 페이지][2]는 조사 대상인 서비스 유형에 맞춤 설정되어 있습니다. 예를 들어 데이터베이스 서비스 페이지에는 데이터베이스 관련 인사이트가 표시되며, [Database Monitoring][3]을 사용 중인 경우 데이터베이스 모니터링 데이터도 포함됩니다.

## 추론된 서비스 설정
{{< tabs >}}
{{% tab "Agent v7.60.0+" %}}
Datadog Agent 버전 [7.60.0][1]부터는 수동 구성 없이도 추론된 서비스를 확인할 수 있습니다. 필수 구성인 `apm_config.compute_stats_by_span_kind` 및 `apm_config.peer_tags_aggregation`이 기본적으로 활성화되어 있습니다.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.60.0

{{% /tab %}}
{{% tab "Agent v7.55.1 - v7.59.1" %}}

Datadog Agent 버전 [7.55.1][1]부터 [7.59.1][2]까지는 `datadog.yaml` 구성 파일에 다음을 추가하세요.

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true

{{< /code-block >}}

또는 Datadog Agent 구성에서 다음과 같은 환경 변수를 설정해도 됩니다.

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true
DD_APM_PEER_TAGS_AGGREGATION=true

{{< /code-block >}}

Helm을 사용하는 경우, `values.yaml` [파일][3]에 다음 환경 변수를 포함하세요.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.55.1
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.59.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Agent v7.50.3 - v7.54.1" %}}

Datadog Agent 버전 [7.50.3][1]부터 [7.54.1][2]까지는 `datadog.yaml` 구성 파일에 다음을 추가합니다.

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true
  peer_tags: \["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

또는 Datadog Agent 구성에서 다음과 같은 환경 변수를 설정해도 됩니다.

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true
DD_APM_PEER_TAGS_AGGREGATION=true
DD_APM_PEER_TAGS='\["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]'

{{< /code-block >}}

Helm을 사용하는 경우, `values.yaml` [파일][3]에 다음 환경 변수를 포함하세요.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.54.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "OpenTelemetry Collector" %}}

OpenTelemetry Collector의 경우, 권장 최소 버전은 `opentelemetry-collector-contrib` [v0.95.0][1] 이후 버전입니다. 이 경우, 다음 구성을 업데이트하세요.

{{< code-block lang="yaml"  collapsible="true" >}}

connectors:
  datadog/connector:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: \["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

Collector 버전이 v0.95.0보다 이전인 경우, 다음 Collector 구성을 업데이트합니다.

{{< code-block lang="yaml" collapsible="true" >}}

exporters:
  datadog:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: \["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]   

{{< /code-block >}}

**예**: [collector.yaml][2].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L375-L395
{{% /tab %}}
{{< /tabs >}}

## 추론된 엔터티 이름 지정

Datadog은 추론된 서비스 종속성의 이름과 유형을 결정하기 위해 표준 스팬 속성을 사용해 이를 `peer.*` 속성에 매핑합니다. 예를 들어 추론된 외부 API는 기본 명명 체계 `net.peer.name`을 사용합니다(예: `api.stripe.com`, `api.twilio.com`, `us6.api.mailchimp.com`). 추론된 데이터베이스는 기본 명명 체계 `db.instance`를 사용합니다. 추론된 엔터티의 이름을 변경하려면 [이름 변경 규칙][5]을 만들면 됩니다.

### 피어 태그

피어 태그 | 소스 속성
--------------------|-------------------
`peer.aws.dynamodb.table` | `tablename`
`peer.aws.kinesis.stream` | `streamname`
`peer.aws.s3.bucket` | `bucketname`, `aws.s3.bucket`
`peer.aws.sqs.queue` | `queuename`
`peer.cassandra.contact.points` | `db.cassandra.contact.points`
`peer.couchbase.seed.nodes` | `db.couchbase.seed.nodes`
`peer.db.name` | `db.name`, `mongodb.db`, `db.instance`, `cassandra.keyspace`, `db.namespace`
`peer.db.system` | `db.system`
`peer.hostname` | `peer.hostname`, `hostname`, `net.peer.name`, `db.hostname`, `network.destination.name`, `grpc.host`, `http.host`, `server.address`, `http.server_name`
`peer.kafka.bootstrap.servers` | `messaging.kafka.bootstrap.servers`
`peer.messaging.destination` | `topicname`, `messaging.destination`, `messaging.destination.name`, `messaging.rabbitmq.exchange`, `amqp.destination`, `amqp.queue`, `amqp.exchange`, `msmq.queue.path`, `aws.queue.name`
`peer.messaging.system` | `messaging.system`
`peer.rpc.service` | `rpc.service`
`peer.rpc.system` | `rpc.system`
`peer.service` | `peer.service`

**참고**: IP 주소 형식(예: 127.0.0.1)과 일치하는 피어 속성 값은 `blocked-ip-address`(으)로 수정 및 난독화되어 불필요한 노이즈를 방지하고 카디널리티가 높은 디멘션으로 메트릭이 태깅되지 않도록 합니다. 그 결과, 일부 `blocked-ip-address` 서비스가 계측된 서비스의 다운스트림 종속성으로 표시되는 상황이 발생할 수 있습니다.

#### 피어 태그의 우선순위

엔터티가 여러 태그의 조합으로 정의되는 경우, Datadog은 피어 태그 간의 특정 우선순위 순서를 사용하여 추론된 엔터티에 이름을 할당합니다. 

엔터티 유형 | 우선순위 순서
-----------|----------------
데이터베이스 | `peer.db.name` > `peer.aws.s3.bucket`(AWS S3인 경우) / `peer.aws.dynamodb.table`(AWS DynamoDB인 경우) / `peer.cassandra.contact.points`(Cassandra인 경우) / `peer.couchbase.seed.nodes`(Couchbase인 경우) > `peer.hostname` > `peer.db.system`
대기열 | `peer.messaging.destination` > `peer.kafka.bootstrap.servers`(Kafka인 경우) / `peer.aws.sqs.queue`(AWS SQS인 경우) / `peer.aws.kinesis.stream`(AWS Kinesis인 경우) > `peer.messaging.system`
추론된 서비스 | `peer.service` > `peer.rpc.service` > `peer.hostname`

`peer.db.name`과 같이 우선순위가 가장 높은 태그가 계측의 일부분으로 수집되지 않는 경우, Datadog은 우선순위가 두 번째로 높은 태그(예: `peer.hostname`)를 사용하며, 이 순서로 계속 진행합니다.

**참고**: Datadog은 추론된 데이터베이스 및 대기열에 `peer.service`를 설정하지 않습니다. `peer.service`는 우선순위가 가장 높은 피어 속성입니다. 이것을 설정하면 다른 모든 속성보다 우선하게 됩니다.

## 글로벌 기본 서비스 명명으로 마이그레이션

추론된 서비스를 사용하면 서비스 종속성이 기존 스팬 속성으로부터 자동으로 탐지됩니다. 따라서 이러한 종속성을 식별하려고 서비스 이름을 변경(`service` 태그 사용)하지 않아도 됩니다. 

`DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED`를 활성화해 Datadog 통합이 기본 글로벌 서비스 이름과 다른 서비스 이름을 설정하지 않도록 하세요. 이렇게 하면 지원되는 모든 트레이싱 라이브러리 언어 및 통합 전반에서 서비스 간 연결과 추론된 서비스가 Datadog 시각화에 표시되는 방식도 개선됩니다.

<div class="alert alert-danger">이 옵션을 활성화하면 기존 서비스 이름을 참조하는 기존 APM 메트릭, 커스텀 스팬 메트릭, 트레이스 분석, 보존 필터, 민감한 데이터 스캔, 모니터링, 대시보드 또는 노트북에 영향이 발생할 수 있습니다. 글로벌 기본 서비스 태그(<code>service:&lt;DD_SERVICE></code>)를 사용하려면 이러한 자산을 업데이트하세요.</div>

서비스 재정의를 제거하고 추론된 서비스로 마이그레이션하는 방법에 관한 설명은 [서비스 재정의 가이드][4]를 참조하세요.

[1]: /software_catalog/
[2]: /tracing/services/service_page
[3]: /database_monitoring/
[4]: /tracing/guide/service_overrides
[5]: /tracing/services/renaming_rules/

{{< /site-region >}}
{{< site-region region="gov" >}}
<div class="alert alert-info">추론된 서비스 기능은 사용자의 데이터센터에서 기본적으로 제공하지 않습니다. 액세스를 요청하려면 이 <a href="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA" target="_blank">양식</a>을 작성하세요.</div>

{{< /site-region >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}
