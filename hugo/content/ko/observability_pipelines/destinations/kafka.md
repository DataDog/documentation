---
description: Observability Pipelines Worker를 사용하여 Kafka 토픽으로 로그를 전송하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Kafka 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Kafka 목적지를 사용하여 Kafka 토픽으로 로그를 전송하세요.

### 이 목적지를 사용하는 경우 {#when-to-use-this-destination}

이 목적지를 사용할 수 있는 일반적인 시나리오는 다음과 같습니다.
- 다음 목적지로 로그를 라우팅하려면 다음 단계를 따르세요.
    - [Clickhouse][1]: 대량의 로그를 분석하는 데 사용되는 오픈 소스 열 지향 데이터베이스 관리 시스템입니다.
    - [Snowflake][2]: 저장 및 쿼리에 사용되는 데이터 웨어하우스입니다.
        - Snowflake의 API 통합은 Kafka를 통해 플랫폼으로 로그를 수집합니다.
    - [Databricks][3]: 분석 및 저장용 데이터 레이크하우스입니다.
    - [Azure Event Hub][4]: Microsoft 및 Azure 에코시스템의 수집 및 처리 서비스입니다.
- Kafka로 데이터를 라우팅하고 Kafka Connect 에코시스템을 사용합니다.
- Kafka를 통해 Apache Spark로 라우팅하여 데이터 분석과 머신러닝 워크로드 실행을 시작하기 전, Observability Pipelines로 데이터를 처리하고 정규화합니다.

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리: Kafka 부트스트랩 서버에 대한 식별자, 그리고 해당하는 경우 SASL 사용자 이름 및 비밀번호, TLS 키 암호에 대한 식별자만 입력하세요. 실제 값을 입력하지 <b>마세요</b>.</div>

[파이프라인을 설정][10]할 때 Kafka 목적지를 구성합니다. 파이프라인은 [UI][5]에서 설정할 수 있으며, [API][11] 또는 [Terraform][12]을 통해 설정할 수 있습니다. 이 섹션에서 설명한 단계는 UI로 구성했습니다.

파이프라인 UI에서 Kafka 목적지를 선택한 후 다음 단계를 따르세요.

1. Kafka 부트스트랩 서버에 대한 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. 로그를 전송하려는 토픽의 이름을 입력합니다.
1. 드롭다운 메뉴에서 출력 형식으로 {{< ui >}}Encoding{{< /ui >}}{{< ui >}}JSON{{< /ui >}} 또는 {{< ui >}}Raw message{{< /ui >}}를 선택합니다.

{{< img src="observability_pipelines/destinations/kafka_settings.png" alt="샘플 값이 포함된 Kafka 목적지" style="width:30%;" >}}

{{% observability_pipelines/secrets_env_var_note %}}

#### 선택적 설정 {#optional-settings}

##### TLS 활성화 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

##### SASL 인증 활성화 {#enable-sasl-authentication}

1. 스위치를 전환하여 {{< ui >}}SASL Authentication{{< /ui >}}을 활성화합니다.
1. Kafka SASL 사용자 이름과 비밀번호의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. 드롭다운 메뉴에서 메커니즘({{< ui >}}PLAIN{{< /ui >}}, {{< ui >}}SCHRAM-SHA-256{{< /ui >}} 또는 {{< ui >}}SCHRAM-SHA-512{{< /ui >}})을 선택합니다.

##### 압축 활성화 {#enable-compression}

1. 스위치를 {{< ui >}}Enable Compression{{< /ui >}}으로 전환합니다.
1. 드롭다운 메뉴에서 {{< ui >}}Compression Algorithm{{< /ui >}}압축 알고리즘({{< ui >}}gzip{{< /ui >}}, {{< ui >}}zstd{{< /ui >}}, {{< ui >}}lz4{{< /ui >}} 또는 {{< ui >}}snappy{{< /ui >}})을 선택합니다.
1. (선택 사항) 드롭다운 메뉴에서 {{< ui >}}Compression Level{{< /ui >}}을 선택합니다. 수준을 지정하지 않으면 알고리즘의 기본값이 사용됩니다.

##### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

##### 고급 옵션 {#advanced-options}

{{< ui >}}Advanced{{< /ui >}}을 클릭하여 다음 필드 중 하나를 설정합니다.

1. {{< ui >}}Message Key Field{{< /ui >}}: 파티셔닝, 그룹화, 정렬에 필요한 메시지 키가 포함된 로그 필드를 지정합니다.
1. {{< ui >}}Headers Key{{< /ui >}}: Kafka 헤더가 포함된 로그 필드를 지정합니다. 비워두면 헤더가 기록되지 않습니다.
1. {{< ui >}}Message Timeout (ms){{< /ui >}}: 로컬 메시지 시간 초과(밀리초 단위)입니다. 기본값은 `300,000 ms`입니다.
1. {{< ui >}}Socket Timeout (ms){{< /ui >}}: 네트워크 요청에 대한 기본 시간 초과(밀리초 단위)입니다. 기본값은 `60,000 ms`입니다.
1. {{< ui >}}Rate Limit Events{{< /ui >}}: Kafka 클라이언트가 속도 제한 시간 내에 전송할 수 있는 최대 요청 수입니다. 기본값은 속도 제한이 없습니다.
1. {{< ui >}}Rate Limit Time Window (secs){{< /ui >}}: 속도 제한 옵션에 사용되는 기간입니다.
    - 이벤트 속도 제한이 설정되지 않은 경우 이 설정은 적용되지 않습니다.
    - 기본값은 `1 second`가 설정되어 있고 {{< ui >}}Rate Limit Events{{< /ui >}}는 설정되지 않은 경우 {{< ui >}}Rate Limit Time Window{{< /ui >}}입니다.
1. [librdkafka 옵션](#librdkafka-options)을 추가하려면 {{< ui >}}Add Option{{< /ui >}}을 클릭하여 드롭다운 메뉴에서 옵션을 선택합니다.
    1. 해당 옵션에 대한 값을 입력합니다.
    1. [librdkafka 설명서][7]에서 값을 확인하여 올바른 유형인지, 설정된 범위 내에 있는지 확인합니다.
    1. {{< ui >}}Add Option{{< /ui >}}을 클릭하여 다른 librdkafka 옵션을 추가합니다.

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Kafka 부트스트랩 서버 식별자:
    - 클라이언트가 Kafka 클러스터에 연결하고 클러스터의 다른 모든 호스트를 검색하는 데 사용하는 부트스트랩 서버를 참조합니다.
	- 시크릿 관리자에서 호스트와 포트는 `host:port` 형식(예: `10.14.22.123:9092`)으로 입력해야 합니다. 서버가 두 개 이상인 경우 쉼표를 사용하여 구분하세요.
	- 기본 식별자는 `DESTINATION_KAFKA_BOOTSTRAP_SERVERS`입니다.
- Kafka TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `DESTINATION_KAFKA_KEY_PASS`입니다.
- SASL 인증(활성화된 경우):
	- Kafka SASL 사용자 이름 식별자:
		- 기본 식별자는 `DESTINATION_KAFKA_SASL_USERNAME`입니다.
	- Kafka SASL 암호 식별자:
		- 기본 식별자는 `DESTINATION_KAFKA_SASL_PASSWORD`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{< img src="observability_pipelines/destinations/kafka_env_var.png" alt="Kafka 환경 변수 필드가 표시된 설치 페이지" style="width:70%;" >}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/kafka %}}

{{% /tab %}}
{{< /tabs >}}

## librdkafka 옵션 {#librdkafka-options}

사용 가능한 librdkafka 옵션은 다음과 같습니다.

- client.id
- queue.buffering.max_messages
- transactional.id
- enable.idempotence
- acks

더 자세한 정보를 확인하고 값의 유형이 올바른지, 범위 내에 있는지 확인하려면 [librdkafka 설명서][7]를 참조하세요.

## 상태 메트릭 {#health-metrics}

모든 목적지에서 내보내는 [구성 요소 메트릭][13] 및 [목적지 버퍼 메트릭][14]은 [파이프라인 사용량 메트릭][8] 설명서를 참조하세요.

### Kafka 메트릭 {#kafka-metrics}

- `component_id` 태그를 사용하여 개별 구성 요소별로 필터링하거나 그룹화하세요.
- Kafka 목적지 메트릭에서 `component_type` 태그 값은 `kafka`입니다.

`pipelines.kafka_produced_messages_total`
: **설명**: 생성 후 Kafka 브로커로 전송된 메시지 수입니다.
: **메트릭 유형**: 개수

`pipelines.kafka_produced_messages_bytes_total`
: **설명**: 생성 후 Kafka 브로커로 전송된 메시지 바이트 수입니다.
: **메트릭 유형**: 개수

`pipelines.kafka_queue_messages`
: **설명**: 현재 librdkafka 프로듀서 대기열에 있는 메시지 수입니다.
: **메트릭 유형**: 게이지

`pipelines.kafka_queue_messages_bytes`
: **설명**: 현재 librdkafka 프로듀서 대기열에 있는 메시지의 총 크기(바이트)입니다.
: **메트릭 유형**: 게이지

`pipelines.kafka_requests_total`
: **설명**: Kafka 브로커로 전송된 요청 수입니다.
: **메트릭 유형**: 개수

`pipelines.kafka_requests_bytes_total`
: **설명**: Kafka 브로커로 보낸 바이트 수입니다.
: **메트릭 유형**: 개수

`pipelines.kafka_responses_total`
: **설명**: Kafka 브로커로부터 수신한 응답 수입니다.
: **메트릭 유형**: 개수

`pipelines.kafka_responses_bytes_total`
: **설명**: Kafka 브로커로부터 수신한 바이트 수입니다.
: **메트릭 유형**: 개수

### 이벤트 배치 처리{#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][9]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| 10,000         | 1                 | 1                   |

[1]: https://clickhouse.com/docs/engines/table-engines/integrations/kafka
[2]: https://docs.snowflake.com/en/user-guide/kafka-connector
[3]: https://docs.databricks.com/aws/en/connect/streaming/kafka
[4]: https://learn.microsoft.com/en-us/azure/event-hubs/azure-event-hubs-apache-kafka-overview
[5]: https://app.datadoghq.com/observability-pipelines
[7]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[8]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[9]: /ko/observability_pipelines/destinations/#event-batching
[10]: /ko/observability_pipelines/configuration/set_up_pipelines/
[11]: /ko/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[13]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[14]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics