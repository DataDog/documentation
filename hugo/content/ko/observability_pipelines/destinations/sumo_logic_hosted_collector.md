---
description: Observability Pipelines Worker를 사용하여 Sumo Logic Hosted Collector로 로그를
  전송하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Sumo Logic Hosted Collector 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Sumo Logic 목적지를 사용하여 Sumo Logic Hosted Collector로 로그를 전송합니다.

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리의 경우 엔드포인트 URL의 식별자만 입력하세요. 실제 값은 <b>입력하지 마세요.</b></div>

[파이프라인을 설정][3]할 때 Sumo Logic 목적지를 구성하세요. 파이프라인은 [UI][1]에서 설정할 수 있으며, [API][4] 또는 [Terraform][5]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명한 단계는 UI로 구성했습니다.

파이프라인 UI에서 Sumo Logic 목적지를 선택한 후 엔드포인트 URL에 대한 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

1. {{< ui >}}Encoding{{< /ui >}} 드롭다운 메뉴에서 파이프라인 출력을 `JSON`, `Logfmt` 또는 `Raw` 텍스트로 인코딩할지 선택합니다. 디코딩을 선택하지 않으면 기본값인 JSON이 사용됩니다.
1. {{< ui >}}source name{{< /ui >}}을 입력하여 Sumo Logic 컬렉터의 소스에 대해 구성된 기본값 `name`을 재정의합니다.
1. {{< ui >}}host name{{< /ui >}}을 입력하여 Sumo Logic 컬렉터의 소스에 대해 구성된 기본값 `host`를 재정의합니다.
1. {{< ui >}}category name{{< /ui >}}을 입력하여 Sumo Logic 컬렉터의 소스에 대해 구성된 기본값 `category`를 재정의합니다.
1. 사용자 지정 헤더 필드와 값을 추가하려면 {{< ui >}}Add Header{{< /ui >}}를 클릭합니다.

#### 버퍼링 옵션 {#buffering-options}

{{% observability_pipelines/destination_buffer %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Sumo Logic HTTP Collector URL 식별자:
	- Sumo Logic HTTP 소스 엔드포인트를 참조합니다. Observability Pipelines Worker는 처리된 로그를 이 엔드포인트로 전송합니다. 예를 들어 `https://<ENDPOINT>.collection.sumologic.com/receiver/v1/http/<UNIQUE_HTTP_COLLECTOR_CODE>`의 경우:
        - `<ENDPOINT>`는 Sumo 수집 엔드포인트입니다.
        - `<UNIQUE_HTTP_COLLECTOR_CODE>`는 HTTP 소스에 대한 업로드 URL에서 마지막 슬래시(`/`) 뒤에 오는 문자열입니다.
	- 기본 식별자는 `DESTINATION_SUMO_LOGIC_HTTP_COLLECTOR_URL`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}

## 상태 메트릭 {#health-metrics}

모든 목적지에서 내보내는 [구성 요소 메트릭][6] 및 [목적지 버퍼 메트릭][7]은 [Pipelines 사용량 메트릭][8] 설명서를 참조하세요. Sumo Logic 목적지 메트릭을 필터링하거나 그룹화하려면 태그 `component_type:sumo_logic`을 사용하세요.

## 목적지의 작동 방식 {#how-the-destination-works}

### 이벤트 배치 처리 {#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][2]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 시간 초과(초)   |
|----------------|-------------------|---------------------|
| 없음           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/destinations/#event-batching
[3]: /ko/observability_pipelines/configuration/set_up_pipelines/
[4]: /ko/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[8]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/