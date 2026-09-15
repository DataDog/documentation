---
code_lang: metrics
disable_toc: false
title: OpenTelemetry 메트릭 목적지
type: multi-code-lang
weight: 1
---
## 개요 {#overview}

Observability Pipelines의 OpenTelemetry 대상을 사용하여 {{< tooltip text=" OpenTelemetry destination" tooltip="액세스 권한을 요청하려면 계정 관리자에게 문의하세요." >}} HTTP/S를 통해 OpenTelemetry(OTel) Collector 또는 다른 OpenTelemetry Protocol(OTLP) 호환 엔드포인트로 메트릭을 전송합니다.

## 목적지 설정 {#set-up-destination}

<div class="alert alert-danger">시크릿 관리: HTTP/S 클라이언트 URI에 대한 식별자와 해당하는 경우 TLS 키 암호만 입력하세요. 실제 값은 <b>입력하지 마세요</b>.</div>

[파이프라인을 설정][3]할 때 OpenTelemetry 목적지를 구성하세요. 파이프라인은 [UI][1]에서 설정할 수 있으며, [API][4] 또는 [Terraform][5]을 사용하여 설정할 수 있습니다. 이 섹션에서는 UI를 기준으로 단계를 설명합니다.

파이프라인 UI에서 OpenTelemetry 목적지를 선택한 후 HTTP/S 클라이언트 URI에 대한 식별자를 입력하세요. 식별자가 참조하는 HTTP/S URI 엔드포인트의 예: `http://localhost:4319/v1/metrics`. 식별자 필드를 비워 두면 [기본값](#secret-defaults)이 사용됩니다.

**참고**:
- Worker는 카운터, 게이지, 히스토그램 메트릭만 OpenTelemetry로 보낼 수 있습니다. OpenTelemetry는 다른 메트릭 유형을 지원하지 않으므로 Worker는 해당 메트릭을 삭제합니다. 자세한 내용은 [지원되지 않는 메트릭 필터링](#filter-out-unsupported-metrics)을 참조하세요.
- Worker는 메트릭의 순서를 재정렬하지 않으며 일부 OTLP 수신기는 순서가 맞지 않는 샘플을 거부하므로, Datadog에서는 OTLP 수신기가 순서가 맞지 않는 샘플을 허용하도록 설정할 것을 권장합니다. 자세한 내용은 [순서가 맞지 않는 샘플 허용](#allow-out-of-order-samples)을 참조하세요.
- 보안 식별자를 입력한 후 환경 변수 사용을 선택하면, 환경 변수는 입력한 식별자 앞에 `DD_OP_`가 추가된 형태가 됩니다. 예를 들어 암호 식별자로 `PASSWORD_1`을 입력한 경우 해당 암호의 환경 변수는 `DD_OP_PASSWORD_1`입니다.

### 선택적 설정 {#optional-settings}

#### TLS 활성화 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

## 지원되지 않는 메트릭 필터링 {#filter-out-unsupported-metrics}

Worker는 카운터, 게이지, 히스토그램 메트릭만 OpenTelemetry로 보낼 수 있습니다. 다음 Datadog 메트릭은 OTLP 형식으로 변환할 수 없으므로 지원되지 않습니다.

- StatsD 유형 메트릭
- 분포 메트릭
- 스케치 메트릭

이러한 메트릭 중 하나가 인코딩되어 OpenTelemetry로 전송될 배치에 포함된 경우, Worker는 지원되지 않는 메트릭을 삭제하고 오류를 기록하며 `component_error_total` 메트릭을 업데이트합니다. Datadog에서는 [필터 프로세서][9]를 사용하여 지원되지 않는 메트릭 유형을 필터링할 것을 권장합니다.

## 순서가 맞지 않는 샘플 허용 {#allow-out-of-order-samples}

Worker는 메트릭 순서를 재조정하지 않기 때문에 특정 시리즈에 대해 항상 올바른 순서로 메트릭을 전송하지는 않습니다. 예를 들어, 첫 번째 메트릭 배치에 타임스탬프가 `10:03`, `10:04`, `10:05`인 메트릭이 포함되어 있고 두 번째 배치에 타임스탬프가 `10:01`, `10:02`, `10:06`인 메트릭이 포함되어 있는 경우, Worker는 해당 메트릭을 전송하기 전에 순서를 재조정하지 않습니다.

Prometheus OTLP 수신기와 같이 일부 OTLP 수신기는 순서가 맞지 않는 샘플을 거부하므로, 두 번째 메트릭 배치가 수신기에 의해 거부됩니다. 결과적으로 Worker는 잘못된 요청(`400`) 오류를 기록하고, OTLP 수신기가 배치 내의 일부 유효한 메트릭을 수락했더라도 거부된 전체 배치가 삭제됩니다.

Datadog에서는 순서가 맞지 않는 샘플이 삭제되는 것을 방지할 수 있도록 OTLP 수신기가 순서가 맞지 않는 샘플을 허용하도록 설정할 것을 권장합니다.

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- HTTP/S 클라이언트 URI 엔드포인트 식별자
  - Worker가 OpenTelemetry 데이터를 전송하는 HTTP/S URI 엔드포인트를 참조합니다. 식별자가 참조하는 HTTP/S URI 엔드포인트의 예: `http://localhost:4319/v1/metrics`.
  - 기본 식별자는 `DESTINATION_OTEL_HTTP_CLIENT_URI`입니다.
- HTTP/S 클라이언트 TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `DESTINATION_OTEL_HTTP_CLIENT_KEY_PASS`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opentelemetry_metrics %}}

{{% /tab %}}
{{< /tabs >}}

## 메트릭 {#metrics}

모든 목적지에서 내보내는 [구성 요소 메트릭][6] 및 [목적지 버퍼 메트릭][7]에 대해서는 [Pipelines 사용량 메트릭][8] 문서를 참조하세요. OpenTelemetry 목적지 메트릭을 필터링하거나 그룹화하려면 태그 `component_type:opentelemetry`를 사용하세요.

## 목적지가 작동하는 방식 {#how-the-destination-works}

### 이벤트 배치 {#event-batching}

이벤트 배치는 다음 조건 중 하나가 발생하면 플러시됩니다. 자세한 내용은 [이벤트 배치][2]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| N/A            | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/destinations/#event-batching
[3]: /ko/observability_pipelines/configuration/set_up_pipelines/
[4]: /ko/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[8]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[9]: /ko/observability_pipelines/processors/filter/