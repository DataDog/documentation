---
aliases:
- /ko/observability_pipelines/destinations/cloudprem/
description: Observability Pipelines Worker를 사용하여 Datadog BYOC(Bring Your Own Cloud)
  Logs로 로그를 전송하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Datadog BYOC Logs 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 BYOC(Bring Your Own Cloud) Logs 목적지를 사용하여 Datadog BYOC Logs로 로그를 전송하세요.


## 전제 조건 {#prerequisites}

목적지를 구성하기 전에 BYOC Logs 클러스터를 배포해야 합니다. [BYOC Logs 설치 섹션][3]에서 설치 방법을 확인하세요.

## 설정 {#setup}

[파이프라인을 설정][4]할 때 BYOC Logs 목적지를 구성하세요. 파이프라인은 [UI][1]에서 설정할 수 있으며, [API][5] 또는 [Terraform][6]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명하는 단계는 UI에서 설정합니다.

### 선택적 버퍼링 {#optional-buffering}

파이프라인 UI에서 BYOC Logs 목적지를 선택한 후 버퍼링을 구성할 수 있습니다.

{{% observability_pipelines/destination_buffer %}}

{{< img src="observability_pipelines/destinations/cloudprem_settings.png" alt="BYOC Logs 목적지 설정" style="width:35%;" >}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- BYOC Logs 엔드포인트 URL 식별자:
	- Observability Pipelines가 로그를 전송하는 수집 엔드포인트를 참조합니다.
	- 시크릿 관리자에서:
		- 클러스터 URL을 정의합니다(예: `http://byoc-logs.acme.internal:7280`). **참고**: URL에는 포트가 포함되어야 합니다.
		- Worker가 엔드포인트 URL에 `/api/v2/logs` 및 `/api/v1/validate`를 추가하므로 전달 또는 방화벽 규칙을 사용하는 경우 이러한 엔드포인트가 허용되어야 합니다.
	- 기본 식별자는 `DESTINATION_CLOUDPREM_ENDPOINT_URL`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{< img src="observability_pipelines/destinations/cloudprem_env_vars.png" alt="BYOC Logs 환경 변수 필드가 표시된 설치 페이지" style="width:75%;" >}}

- BYOC Logs 엔드포인트 URL
	- Observability Pipelines는 BYOC Logs 수집 엔드포인트로 로그를 전송합니다. 클러스터 URL을 정의합니다(예: `http://byoc-logs.acme.internal:7280`). **참고**: URL에는 포트가 포함되어야 합니다.
	- Worker가 엔드포인트 URL에 `/api/v2/logs` 및 `/api/v1/validate`를 추가하므로 전달 또는 방화벽 규칙을 사용하는 경우 이러한 엔드포인트가 허용되어야 합니다.
  - 환경 변수 `DD_OP_DESTINATION_CLOUDPREM_ENDPOINT_URL`에 저장됩니다.

{{% /tab %}}
{{< /tabs >}}

## 상태 메트릭 {#health-metrics}

모든 목적지에서 내보내는 [구성 요소 메트릭][7] 및 [목적지 버퍼 메트릭][8]은 [파이프라인 사용량 메트릭][9] 설명서를 참조하세요. Datadog Logs 목적지 메트릭을 필터링하거나 그룹화하려면 태그 `component_type:datadog_logs`를 사용하세요.

## 목적지의 작동 방식 {#how-the-destination-works}

### 이벤트 배치 처리{#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][2]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| 1,000          | 4.25              | 5                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/destinations/#event-batching
[3]: /ko/byoc-logs/install/
[4]: /ko/observability_pipelines/configuration/set_up_pipelines/
[5]: /ko/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[9]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/