---
description: Observability Pipelines Worker를 사용하여 OpenSearch로 로그를 전송하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: OpenSearch 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 OpenSearch 목적지를 사용하여 로그를 OpenSearch로 전송하세요.

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리의 경우 OpenSearch 엔드포인트 URL, 사용자 이름 및 비밀번호의 식별자만 입력하세요. 실제 값은 <b>입력하지 마세요</b>.</div>

[파이프라인을 설정][6]할 때 OpenSearch 목적지를 구성하세요. 파이프라인은 [UI][1]에서 설정할 수 있으며, [API][7] 또는 [Terraform][8]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명하는 단계는 UI에서 설정합니다.

파이프라인 UI에서 OpenSearch 목적지를 선택한 후 다음 단계를 따르세요.

1. OpenSearch 엔드포인트 URL의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. OpenSearch 사용자 이름의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. OpenSearch 비밀번호의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. {{< ui >}}Mode{{< /ui >}} 드롭다운 메뉴에서 {{< ui >}}Bulk{{< /ui >}} 또는 {{< ui >}}Data streams{{< /ui >}}를 선택합니다.
	- {{< ui >}}Bulk{{< /ui >}} 모드
		- OpenSearch의 [Bulk API][4]를 사용하여 일괄 처리된 이벤트를 표준 인덱스로 직접 전송합니다.
		- 인덱스 명명 및 수명 주기 관리를 직접 제어하려는 경우 이 모드를 선택하세요. 데이터는 지정한 인덱스에 추가되며, 롤오버, 삭제 및 매핑 처리는 사용자가 담당합니다.
		- {{< ui >}}Bulk{{< /ui >}} 모드 구성 방법:
			- 필요시 {{< ui >}}Index{{< /ui >}} 필드에 OpenSearch 인덱스 이름을 입력하세요. [템플릿 구문][3]을 사용하여 로그의 특정 필드를 기반으로 로그를 다른 인덱스로 동적으로 라우팅할 수 있습니다(예: `logs-{{service}})`.
	- {{< ui >}}Data streams{{< /ui >}} 모드
		- Uses  [OpenSearch Data Streams][5] for log storage. Data streams automatically manage backing indexes and rollovers, making them ideal for timeseries log data.
		- Choose this mode when you want OpenSearch to manage the index lifecycle for you. Data streams ensures smooth rollovers, Index Lifecycle Management (ILM) compatibility, and optimized handling of time-based data.
		- To configure {{< ui >}}Data streams{{< /ui >}} 모드를 구성하려면, 필요시 다음 정보를 입력해 데이터 스트림 이름(기본값: `logs-generic-default)을 정의하세요`) by entering the following information:).
			- In the {{< ui >}}Type{{< /ui >}} 필드에 수집되는 데이터 범주를 입력하세요(예: `logs`.).
			- In the {{< ui >}}Dataset{{< /ui >}} 필드에 형식을 지정하거나 데이터 구조를 설명하는 데이터 소스를 입력하세요(예: `apache`.).
			- In the {{< ui >}}Namespace{{< /ui >}} 필드에 데이터 스트림을 구성하기 위한 그룹화를 입력하세요(예: `production`.).
			- You can use [template syntax][3] for the {{< ui >}}Type{{< /ui >}}, {{< ui >}}Dataset{{< /ui >}}, {{< ui >}}Namespace{{< /ui >}} 필드를 사용하여 로그의 특정 필드를 기반으로 데이터 스트림 이름을 동적으로 구성하세요.
			- In the UI, there is a preview of the data stream name you configured. With the above example inputs, the data stream name that the Worker writes to is `logs-apache-production`.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

#### OpenSearch 인덱스 {#opensearch-index}

OpenSearch 인덱스 이름을 입력하세요. 로그의 특정 필드를 기반으로 서로 다른 인덱스로 로그를 라우팅하려면 [템플릿 구문][3]을 참조하세요.

#### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- OpenSearch 엔드포인트 URL 식별자:
	- 기본 식별자는 `DESTINATION_OPENSEARCH_ENDPOINT_URL`입니다.
- OpenSearch 인증 사용자 이름 식별자:
	- 기본 식별자는 `DESTINATION_OPENSEARCH_USERNAME`입니다.
- OpenSearch 인증 비밀번호 식별자:
	- 기본 식별자는 `DESTINATION_OPENSEARCH_PASSWORD`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

{{% /tab %}}
{{< /tabs >}}

## 상태 메트릭 {#health-metrics}

모든 목적지에서 내보내는 [구성 요소 메트릭][9] 및 [목적지 버퍼 메트릭][10]에 대해서는 [Pipelines 사용량 메트릭][11] 설명서를 참조하세요. Elasticsearch 목적지 메트릭을 필터링하거나 그룹화하려면 `component_type:elasticsearch` 태그를 사용하세요.

## 목적지의 작동 방식 {#how-the-destination-works}

### 이벤트 배치 처리 {#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][2]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| 없음           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/destinations/#event-batching
[3]: /ko/observability_pipelines/destinations/#template-syntax
[4]: https://docs.opensearch.org/latest/api-reference/document-apis/bulk/
[5]: https://docs.opensearch.org/latest/im-plugin/data-streams/
[6]: /ko/observability_pipelines/configuration/set_up_pipelines/
[7]: /ko/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[9]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[10]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[11]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/