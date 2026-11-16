---
description: Observability Pipelines Worker를 사용하여 OpenTelemetry Collector에서 로그, 메트릭
  또는 트레이스를 수집하는 방법을 확인하세요.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: 블로그
  text: Observability Pipelines를 사용하여 환경 내의 메트릭 볼륨과 태그 관리하기
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: 블로그
  text: Observability Pipelines를 사용하여 AI 앱의 OTel 데이터를 ClickHouse 및 Datadog으로 라우팅하기
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: 메트릭
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: OpenTelemetry 소스
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 OpenTelemetry(OTel) 소스를 사용하여 HTTP 또는 gRPC를 통해 OTel Collector에서 로그 또는 메트릭을 수집하세요.

**참고**:
- Datadog Distribution of OpenTelemetry (DDOT) Collector를 사용하는 경우, OpenTelemetry 소스를 사용하여 [Observability Pipelines로 데이터를 전송하세요](#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines).
- Splunk HEC Distribution of the OpenTelemetry Collector를 사용하는 경우, [Splunk HEC 소스][4]를 사용하여 Observability Pipelines로 로그를 전송하세요.

### 이 소스를 사용하는 경우 {#when-to-use-this-source}

이 소스를 사용할 수 있는 일반적인 시나리오는 다음과 같습니다.

- 데이터 수집 및 라우팅을 위한 표준 방법으로 [OpenTelemetry][1]를 사용하고 있으며, 데이터를 여러 목적지로 라우팅하기 전에 정규화하려는 경우입니다.
- 여러 소스에서 데이터를 수집하고 일관된 처리를 위해 중앙 집중식 장소에서 집계하려는 경우입니다.
    - 예를 들어, 일부 서비스는 OpenTelemetry를 사용하여 로그를 내보내고 다른 서비스는 Datadog Agent나 다른 Observability Pipelines [소스][2]를 사용하는 경우, 모든 데이터를 Observability Pipelines로 전송하여 처리할 수 있습니다.

## 전제 조건 {#prerequisites}

포워더가 SSL을 사용하도록 전역적으로 설정된 경우 적절한 TLS 인증서 및 개인 키를 만드는 데 사용한 비밀번호가 필요합니다.

## 설정 {#setup}

<div class="alert alert-danger">Secrets Management의 경우 OpenTelemetry HTTP 및 gRPC 리스너 주소의 식별자만 입력하고, 해당되는 경우 TLS 키 비밀번호를 입력하세요. 실제 값을 입력하지 <b>마세요</b>.</div>

[파이프라인을 설정할][6] 때 이 소스를 설정하세요. 파이프라인은 [UI][10]에서 설정할 수 있으며, [API][11] 또는 [Terraform][12]을 사용하여 설정할 수 있습니다. 이 섹션의 지침은 UI에서 소스를 설정하기 위한 것입니다.

파이프라인 UI에서 OpenTelemetry 소스를 선택한 후 다음 단계를 따르세요.

1. HTTP 리스너 주소의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. gRPC 리스너 주소의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택 사항 TLS 설정 {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

{{< img src="observability_pipelines/sources/otel_settings.png" alt="OpenTelemetry 소스 설정" style="width:35%;" >}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- HTTP 주소 식별자:
	- Observability Pipelines Worker가 OTel Collector로부터 데이터를 수신하는 HTTP 소켓 주소를 참조합니다.
	- 기본 식별자는 `SOURCE_OTEL_HTTP_ADDRESS`입니다.
- gRPC 주소 식별자:
	- Observability Pipelines Worker가 OTel Collector로부터 데이터를 수신하는 gRPC 소켓 주소를 참조합니다.
	- 기본 식별자는 `SOURCE_OTEL_GRPC_ADDRESS`입니다.
- TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `SOURCE_OTEL_KEY_PASS`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/opentelemetry %}}

{{% /tab %}}
{{< /tabs >}}

## Observability Pipelines Worker로 데이터 전송 {#send-data-to-the-observability-pipelines-worker}

OTel 익스포터가 HTTP 또는 gRPC를 가리키도록 구성하세요. Worker는 각 프로토콜에 대해 구성 가능한 리스너 포트를 노출합니다.

<div class="alert alert-info">아래 표시된 4318(HTTP) 및 4317(gRPC) 포트는 예시일 뿐입니다. Worker에서 두 프로토콜 중 하나에 대한 포트 값을 구성할 수 있습니다. OTel 익스포터가 선택한 포트 값과 일치하는지 확인하세요.</a></div>

{{< tabs >}}
{{% tab "로그" %}}

### HTTP 구성 예시 {#http-configuration-example}

Worker는 기본 포트인 4318번 포트에서 HTTP 엔드포인트를 노출합니다. Worker에서 포트 값을 구성할 수 있습니다.

예를 들어, Python에서 HTTP를 통해 OTel 로그 익스포터를 구성하는 방법은 다음과 같습니다.

```python
    from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
    http_exporter = OTLPLogExporter(
        endpoint="http://worker:4318/v1/logs"
    )
```

### gRPC 구성 예시 {#grpc-configuration-example}

Worker는 기본 포트인 4317번 포트에서 gRPC 엔드포인트를 노출합니다. Worker에서 포트 값을 구성할 수 있습니다.

예를 들어, Python에서 gRPC를 통해 OTel 로그 익스포터를 구성하는 방법은 다음과 같습니다.

```python
    from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter
    grpc_exporter = OTLPLogExporter(
        endpoint="grpc://worker:4317"
    )
```

리스너 주소 환경 변수를 다음 기본값으로 설정합니다. Worker에서 다른 포트 값을 구성한 경우 대신 해당 값을 사용합니다.

- HTTP 리스너 주소: `worker:4318`
- gRPC 리스너 주소: `worker:4317`

{{% /tab %}}

{{% tab "메트릭" %}}

### HTTP 구성 예시 {#http-configuration-example-1}

Worker는 기본 포트인 4318번 포트에서 HTTP 엔드포인트를 노출합니다. Worker에서 포트 값을 구성할 수 있습니다.

예를 들어, Python에서 HTTP를 통해 OTel 메트릭 익스포터를 구성하는 방법은 다음과 같습니다.

```python
    from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter
    http_exporter = OTLPMetricExporter(
        endpoint="http://worker:4318/v1/metrics"
    )
```

### gRPC 구성 예시 {#grpc-configuration-example-1}

Worker는 기본 포트인 4317번 포트에서 gRPC 엔드포인트를 노출합니다. Worker에서 포트 값을 구성할 수 있습니다.

예를 들어, Python에서 gRPC를 통해 OTel 메트릭 익스포터를 구성하는 방법은 다음과 같습니다.

```python
    from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import OTLPMetricExporter
    grpc_exporter = OTLPMetricExporter(
        endpoint="grpc://worker:4317"
    )
```

리스너 주소 환경 변수를 다음 기본값으로 설정합니다. Worker에서 다른 포트 값을 구성한 경우 대신 해당 값을 사용합니다.

- HTTP 리스너 주소: `worker:4318`
- gRPC 리스너 주소: `worker:4317`

{{% /tab %}}
{{< /tabs >}}

## Datadog Distribution of OpenTelemetry Collector에서 Observability Pipelines로 데이터 전송 {#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines}

{{< tabs >}}
{{% tab "로그" %}}

Datadog Distribution of the OpenTelemetry(DDOT) Collector에서 로그를 전송하려면 다음 단계를 따르세요.
1. Helm을 사용하여 DDOT Collector를 배포합니다. 지침은 [Kubernetes DaemonSet으로 DDOT Collector 설치][5]를 참조하세요.
1. Observability Pipelines에서 [OpenTelemetry 소스](#set-up-the-source-in-the-pipeline-ui)를 사용하여 [파이프라인을 설정합니다][6].
    1. (필요시) Datadog은 로그에 `source` 필드가 없는 경우 `op_otel_ddot:true` 필드를 추가하는 [Edit Fields 프로세서][7]를 파이프라인에 추가할 것을 권장합니다.
    1. Worker를 설치할 때 OpenTelemetry 소스 환경 변수에 대해 다음 단계를 따르세요.
        1. HTTP 리스너를 `0.0.0.0:4318`로 설정합니다.
        1. gRPC 리스너를 `0.0.0.0:4317`로 설정합니다.
    1. Worker를 설치하고 파이프라인을 배포한 후, Observability Pipelines로 로그를 전송하는 익스포터를 포함하도록 OpenTelemetry Collector의 [`otel-config.yaml`][9]을 업데이트합니다. 예:
        ```
        exporters:
            otlphttp:
                endpoint: http://opw-observability-pipelines-worker.<NAMESPACE>.svc.cluster.local:4318
        ...
        service:
            pipelines:
                logs:
                    exporters: [otlphttp]
        ```
        Replace `<NAMESPACE>` with the Kubernetes namespace where the Observability Pipelines Worker is deployed (for example, `default`).
    1. Redeploy the Datadog Agent with the updated [`otel-config.yaml`][9]. For example, if the Agent is installed in Kubernetes:
        ```
        helm upgrade --install datadog-agent datadog/datadog \
        --values ./agent.yaml \
        --set-file datadog.otelCollector.config=./otel-config.yaml
        ```

**참고**:
- DDOT는 Datadog Agent가 아닌 Observability Pipelines로 로그를 전송하므로, 다음 설정은 DDOT에서 Observability Pipelines로 로그를 전송하는 데 적용되지 않습니다.
    - `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED`
    - `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL`
- DDOT에서 전송된 로그에는 Datadog이 로그를 올바르게 구문 분석하지 못하게 하는 중첩된 객체가 포함될 수 있습니다. 이 문제를 해결하려면 Datadog은 [Custom Processor][8]를 사용하여 중첩된 `resource` 객체를 평면화할 것을 권장합니다.
- DDOT Collector와 Observability Pipelines Worker가 동일한 호스트에서 실행 중인 경우, 기본 OTLP 수신기 포트(4317/4318)가 충돌할 수 있습니다. 일반적인 Kubernetes 배포에서는 Collector와 Worker가 별도의 포드에서 실행되므로 이 문제는 발생하지 않습니다.

[5]: /ko/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /ko/observability_pipelines/configuration/set_up_pipelines/
[7]: /ko/observability_pipelines/processors/edit_fields#add-field
[8]: /ko/observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/ko/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector

{{% /tab %}}

{{% tab "메트릭" %}}

Datadog Distribution of the OpenTelemetry(DDOT) Collector에서 메트릭을 전송하려면 다음 단계를 따르세요.
1. Helm을 사용하여 DDOT Collector를 배포합니다. 지침은 [Kubernetes DaemonSet으로 DDOT Collector 설치][5]를 참조하세요.
1. Observability Pipelines에서 [OpenTelemetry 소스](#set-up-the-source-in-the-pipeline-ui)를 사용하여 [파이프라인을 설정합니다][6].
    1. (필요시) Datadog은 파이프라인에 `op_otel_ddot:true` 필드를 추가하는 [Edit Fields 프로세서][7]를 추가할 것을 권장합니다.
    1. Worker를 설치할 때 OpenTelemetry 소스 환경 변수에 대해 다음 단계를 따르세요.
        1. HTTP 리스너를 `0.0.0.0:4318`로 설정합니다.
        1. gRPC 리스너를 `0.0.0.0:4317`로 설정합니다.
    1. Worker를 설치하고 파이프라인을 배포한 후, OpenTelemetry Collector의 [`otel-config.yaml`][9]을 업데이트하여 Observability Pipelines로 메트릭을 전송하는 익스포터를 포함합니다. 예:
        ```
        exporters:
            otlphttp:
                endpoint: http://opw-observability-pipelines-worker.<NAMESPACE>.svc.cluster.local:4318
        ...
        service:
            pipelines:
                metrics:
                    exporters: [otlphttp]
        ```
        Replace `<NAMESPACE>` with the Kubernetes namespace where the Observability Pipelines Worker is deployed (for example, `default`).
    1. Redeploy the Datadog Agent with the updated [`otel-config.yaml`][9]. For example, if the Agent is installed in Kubernetes:
        ```
        helm upgrade --install datadog-agent datadog/datadog \
        --values ./agent.yaml \
        --set-file datadog.otelCollector.config=./otel-config.yaml
        ```

**참고**:
- DDOT는 Datadog Agent가 아닌 Observability Pipelines로 메트릭을 전송하므로, 다음 설정은 DDOT에서 Observability Pipelines로 메트릭을 전송하는 데 적용되지 않습니다.
    - `DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_ENABLED`
    - `DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_URL`
- DDOT에서 전송된 메트릭에는 Datadog이 메트릭을 올바르게 구문 분석하지 못하게 하는 중첩된 객체가 있을 수 있습니다. 이 문제를 해결하려면 Datadog은 [Custom Processor][8]를 사용하여 중첩된 `resource` 객체를 평면화할 것을 권장합니다.
- DDOT Collector와 Observability Pipelines Worker가 동일한 호스트에서 실행 중인 경우, 기본 OTLP 수신기 포트(4317/4318)가 충돌할 수 있습니다. 일반적인 Kubernetes 배포에서는 Collector와 Worker가 별도의 포드에서 실행되므로 이 문제는 발생하지 않습니다.

[5]: /ko/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /ko/observability_pipelines/configuration/set_up_pipelines/
[7]: /ko/observability_pipelines/processors/edit_fields#add-field
[8]: /ko/observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/ko/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/collector/
[2]: /ko/observability_pipelines/sources/
[3]: /ko/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options
[4]: /ko/observability_pipelines/sources/splunk_hec/#send-logs-from-the-splunk-distributor-of-the-opentelemetry-collector-to-observability-pipelines
[5]: /ko/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /ko/observability_pipelines/configuration/set_up_pipelines/
[7]: /ko/observability_pipelines/processors/edit_fields#add-field
[8]: /ko/observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/ko/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector
[10]: https://app.datadoghq.com/observability-pipelines
[11]: /ko/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline