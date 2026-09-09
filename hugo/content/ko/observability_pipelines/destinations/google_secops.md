---
description: Observability Pipelines Worker를 사용하여 Google SecOps로 로그를 전송하는 방법을 알아보십시오.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Google SecOps 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Google SecOps 목적지를 사용하여 Google SecOps로 로그를 전송하십시오.

Observability Pipelines Worker는 표준 Google 인증 방식을 사용합니다. 사용 케이스에 적합한 인증 방식을 선택하는 방법에 대한 자세한 내용은 [Google의 인증 방법][3]을 참조하십시오.

## 설정 {#setup}

<div class="alert alert-danger">비밀 관리의 경우: Google SecOps 엔드포인트 URL에 대한 식별자만 입력하십시오. 실제 값은 <b>입력하지 마세요.</b></div>

[파이프라인을 설정][8]할 때 Google SecOps 목적지를 구성하십시오. Pipelines는 [UI][1]에서 설정할 수 있으며, [API][9] 또는 [Terraform][10]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명하는 단계는 UI에서 설정합니다.

Pipelines UI에서 Google SecOps 목적지를 선택한 후:

1. Google SecOps 엔드포인트 URL에 대한 식별자를 입력하십시오. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. Google SecOps 인스턴스의 고객 ID를 입력하십시오.
1. 자격 증명 JSON 파일이 있는 경우, 해당 파일의 경로를 입력합니다. 자격 증명 파일은 `DD_OP_DATA_DIR/config` 아래에 배치해야 합니다. 또는 `GOOGLE_APPLICATION_CREDENTIALS` 환경 변수를 사용하여 자격 증명 경로를 제공할 수 있습니다.
    - Google Kubernetes Engine (GKE)에서 [워크로드 ID][6]를 사용하는 경우 `GOOGLE_APPLICATION_CREDENTIALS`가 자동으로 제공됩니다.
    - Worker는 표준 [Google 인증 방식][7]을 사용합니다.
1. 드롭다운 메뉴에서 {{< ui >}}JSON{{< /ui >}} 또는 {{< ui >}}Raw{{< /ui >}} 인코딩을 선택하십시오.
1. 로그 유형을 입력하십시오. 로그의 특정 필드를 기반으로 서로 다른 로그 유형으로 로그를 라우팅하려면 [템플릿 구문][4]을 참조하십시오.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 버퍼링 {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

**참고**: Google SecOps 목적지로 전송되는 로그에는 수집 레이블이 있어야 합니다. 예를 들어 로그가 A10 로드 밸런서에서 온 경우 수집 레이블`A10_LOAD_BALANCER`이 있어야 합니다. 사용 가능한 로그 유형 및 해당 수집 레이블 목록은 Google Cloud의 [기본 파서가 있는 지원 로그 유형][5]을 참조하십시오.

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Google Chronicle 엔드포인트 URL 식별자:
	- 기본 식별자는 `DESTINATION_GOOGLE_CHRONICLE_UNSTRUCTURED_ENDPOINT_URL`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/chronicle %}}

{{% /tab %}}
{{< /tabs >}}

## 상태 메트릭 {#health-metrics}

모든 목적지에서 내보내는 [구성 요소 메트릭][11] 및 [목적지 버퍼 메트릭][12]은 [Pipelines 사용량 메트릭][13] 설명서를 참조하십시오. Google SecOps 목적지 메트릭을 필터링하거나 그룹화하려면 태그 `component_type:gcp_chronicle_unstructured`을 사용하십시오.

## 목적지의 작동 방식 {#how-the-destination-works}

### 이벤트 배치 처리 {#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][2]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| 없음           | 1                 | 15                  |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/destinations/#event-batching
[3]: https://cloud.google.com/docs/authentication#auth-flowchart
[4]: /ko/observability_pipelines/destinations/#template-syntax
[5]: https://cloud.google.com/chronicle/docs/ingestion/parser-list/supported-default-parsers#with-default-parser
[6]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[7]: https://cloud.google.com/docs/authentication#auth-flowchart
[8]: /ko/observability_pipelines/configuration/set_up_pipelines/
[9]: /ko/api/latest/observability-pipelines/
[10]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[11]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[12]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[13]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/