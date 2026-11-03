---
description: Observability Pipelines Worker를 사용하여 Kafka 토픽에서 로그를 수집하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Kafka 소스
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Kafka 소스를 사용하여 Kafka 토픽에서 로그를 수신하세요. Kafka 소스는 [librdkafka][2]를 사용합니다.

[Kafka 소스를 사용하여 Azure Event Hub 로그를 Observability Pipelines로 보낼][6] 수도 있습니다.

## 전제 조건 {#prerequisites}

{{% observability_pipelines/prerequisites/kafka %}}

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리: Kafka 서버, 사용자 이름, 비밀번호 및 해당하는 경우 TLS 키 암호에 대한 식별자만 입력하세요. 실제 값은 입력하지 <b>마세요</b>.</div>

[파이프라인을 설정할 때][1] 이 소스를 설정하세요. 파이프라인은 [UI][7]에서 설정할 수 있으며, [API][8] 또는 [Terraform][9]을 사용하여 설정할 수 있습니다. 이 섹션의 지침은 UI에서 소스를 설정하기 위한 것입니다.

파이프라인 UI에서 Kafka 소스를 선택한 후 다음 단계를 따르세요.

1. Kafka 서버에 대한 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. Kafka 사용자 이름에 대한 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. Kafka 비밀번호에 대한 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. 그룹 ID를 입력합니다.
1. 토픽 이름을 입력합니다. 토픽이 두 개 이상인 경우 {{< ui >}}Add Field{{< /ui >}}를 클릭하여 추가 토픽을 입력합니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

#### SASL 인증 활성화 {#enable-sasl-authentication}

1. 스위치를 전환하여 {{< ui >}}SASL Authentication{{< /ui >}}을 활성화합니다.
1. 드롭다운 메뉴에서 메커니즘({{< ui >}}PLAIN{{< /ui >}}, {{< ui >}}SCHRAM-SHA-256{{< /ui >}} 또는 {{< ui >}}SCHRAM-SHA-512{{< /ui >}})을 선택합니다.

#### TLS 활성화 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### 추가 librdkafka 옵션 추가 {#add-additional-librdkafka-options}

1. {{< ui >}}Advanced{{< /ui >}}를 클릭한 다음 {{< ui >}}Add Option{{< /ui >}}을 클릭합니다.
1. 드롭다운 메뉴에서 옵션을 선택합니다.
1. 해당 옵션에 대한 값을 입력합니다.
1. [librdkafka 문서][4]에서 값을 확인하여 올바른 유형인지, 설정된 범위 내에 있는지 확인합니다.
1. {{< ui >}}Add Option{{< /ui >}}을 클릭하여 다른 librdkafka 옵션을 추가합니다.

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Kafka 부트스트랩 서버 식별자:
	- 클라이언트가 Kafka 클러스터에 연결하고 클러스터의 다른 모든 호스트를 검색하는 데 사용하는 부트스트랩 서버를 참조합니다.
	- 시크릿 관리자에서 호스트와 포트는 `host:port` 형식(예: `10.14.22.123:9092`)으로 입력해야 합니다. 서버가 두 개 이상인 경우 쉼표를 사용하여 구분하세요.
	- 기본 식별자는 `SOURCE_KAFKA_BOOTSTRAP_SERVERS`입니다.
- Kafka SASL 사용자 이름 식별자:
	- 기본 식별자는 `SOURCE_KAFKA_SASL_USERNAME`입니다.
- Kafka SASL 암호 식별자:
	- 기본 식별자는 `SOURCE_KAFKA_SASL_PASSWORD`입니다.
- Kafka TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `SOURCE_KAFKA_KEY_PASS`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/kafka %}}

{{% /tab %}}
{{< /tabs >}}

## librdkafka 옵션 {#librdkafka-options}

사용 가능한 librdkafka 옵션은 다음과 같습니다.

- auto.offset.reset
- auto.commit.interval.ms
- client.id
- coordinator.query.interval.ms
- enable.auto.commit
- enable.auto.offset.store
- fetch.max.bytes
- fetch.message.max.bytes
- fetch.min.bytes
- fetch.wait.max.ms
- group.instance.id
- heartbeat.interval.ms
- queued.min.messages
- session.timeout.ms
- socket.timeout.ms

더 자세한 정보를 확인하고 값의 유형이 올바른지, 범위 내에 있는지 확인하려면 [librdkafka 문서][3]를 참조하세요.

## 상태 메트릭 {#health-metrics}

모든 소스에서 내보내는 [구성 요소 메트릭][10] 및 [소스 버퍼 메트릭][11]은 [파이프라인 사용량 메트릭][12] 설명서를 참조하세요.

### Kafka 메트릭 {#kafka-metrics}

- `component_id` 태그를 사용하여 개별 구성 요소별로 필터링하거나 그룹화하세요.
- `component_type` 태그는 이러한 메트릭에 대해 `kafka`입니다.

`pipelines.kafka_consumer_lag`
: **설명**: 토픽 및 파티션별 Kafka 소비자 지연입니다. 값이 높으면 소스가 들어오는 메시지 속도를 따라가지 못하고 있음을 나타냅니다.
: **메트릭 유형**: 게이지

`pipelines.kafka_consumed_messages_total`
: **설명**: Worker가 Kafka 브로커에서 소비한 메시지 수입니다.
: **메트릭 유형**: 카운트

`pipelines.kafka_consumed_messages_bytes_total`
: **설명**: Worker가 Kafka 브로커에서 소비한 메시지 바이트 수입니다.
: **메트릭 유형**: 카운트

`pipelines.kafka_requests_total`
: **설명**: Worker가 Kafka 브로커로 보낸 요청 수입니다.
: **메트릭 유형**: 개수

`pipelines.kafka_requests_bytes_total`
: **설명**: Worker가 Kafka 브로커로 보낸 바이트 수입니다.
: **메트릭 유형**: 개수

`pipelines.kafka_responses_total`
: **설명**: Worker가 Kafka 브로커에 데이터를 쓴 후 수신한 응답 수입니다.
: **메트릭 유형**: 개수

`pipelines.kafka_responses_bytes_total`
: **설명**: Worker가 Kafka 브로커에 데이터를 쓴 후 수신한 바이트 수입니다.
: **메트릭 유형**: 개수

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/
[2]: https://github.com/confluentinc/librdkafka/tree/master
[3]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[4]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[6]: /ko/observability_pipelines/sources/azure_event_hubs/
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /ko/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[11]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[12]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/