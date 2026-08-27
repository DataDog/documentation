---
description: Observability Pipelines Worker를 사용하여 Datadog Log Management로 로그를 전송하는
  방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Datadog Logs 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Datadog Logs 목적지를 사용하여 Datadog Log Management로 로그를 전송하세요. [AWS PrivateLink](#aws-privatelink)를 사용하여 Observability Pipelines에서 Datadog으로 로그를 전송할 수도 있습니다.

## 설정 {#setup}

[파이프라인을 설정][4]할 때 Datadog Logs 목적지를 구성하세요. 파이프라인은 [UI][1]에서 설정할 수 있으며, [API][5] 또는 [Terraform][6]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명하는 단계는 UI에서 설정합니다.

<div class="alert alert-info">Observability Pipelines를 통해 로그를 라우팅하기 전에 <code>datadog.pipelines:false</code> 태그를 사용하는 인덱스, 파이프라인 또는 제외 필터를 검토하세요. Datadog Agent 소스에서 수집된 로그의 경우, Datadog Logs 목적지는 <code>source_type</code> 을 <code>datadog_agent</code> 로 설정합니다(로그 검색에서는<code>@source_type:datadog_agent</code> ). 그런 다음 Datadog은 해당 로그를 <code>datadog_agent</code> 로그로 평가합니다( <code>datadog.pipelines:false</code> 태그의 적용 여부를 결정할 때). 로그가 전달되기 전에 이 동작을 변경하려면 <a href="/observability_pipelines/processors/edit_fields/">Edit Fields 프로세서</a> 또는 <a href="/observability_pipelines/processors/custom_processor/">Custom Processor</a>를 사용하여 <code>source_type</code> 속성을 로그에서 제거하세요.</div>

### 선택적 설정 {#optional-settings}

파이프라인 UI에서 Datadog Logs 목적지를 선택한 후, 이러한 선택적 설정을 구성할 수 있습니다.

#### 여러 Datadog 조직으로 로그 라우팅 {#route-logs-to-multiple-datadog-organizations}

여러 Datadog 조직으로 로그를 라우팅할 수 있습니다. 라우팅이 설정되면 [구성 요소 또는 로그를 라우팅하는 특정 조직에 대한 메트릭을 조회](#view-metrics-for-the-component-or-specific-organizations)할 수 있습니다.

**참고**: 최대 100개의 Datadog 조직으로 라우팅할 수 있습니다.

{{< img src="observability_pipelines/destinations/multi_dd_orgs.png" alt="us1 및 us3 조직을 보여주는 Datadog Logs 목적지" style="width:45%;" >}}

여러 Datadog 조직으로의 라우팅을 설정하려면 {{< ui >}}Route to Multiple Organizations{{< /ui >}}을 클릭하세요.

- 아직 조직을 추가하지 않은 경우, [Datadog 조직 추가](#add-an-organization) 섹션에 설명된 대로 조직 세부 정보를 입력하세요.
- 이미 조직을 추가한 경우 다음을 수행하세요.
  - 표에서 조직을 클릭하여 편집하거나 삭제하세요.
  - 검색 창을 사용하여 이름, 필터 쿼리 또는 Datadog 사이트로 특정 조직을 찾은 다음, 조직을 선택하여 편집하거나 삭제하세요.
  - [조직의 메트릭](#view-metrics-for-the-component-or-specific-organizations)을 조회하세요.
  - 다른 Datadog 조직으로 라우팅하려면 {{< ui >}}Add organization{{< /ui >}}을 클릭하세요.

**참고**: 여러 Datadog 조직으로의 라우팅을 설정하지 않으면 로그는 기본 Datadog 조직으로 라우팅됩니다. 이것은 Worker를 설치할 때 사용한 API 키와 연결된 조직입니다.

#### 조직 추가 {#add-an-organization}

<div class="alert alert-warning">조직 필터와 일치하지 않는 로그는 삭제됩니다. <a href="#component-level-metrics">구성 요소 메트릭</a> <code>Data dropped (intentional)</code> 은 필터와 일치하지 않아 삭제된 로그 수를 보여줍니다.</div>

1. 조직의 이름을 입력합니다.
	- **참고**: 이름이 실제 Datadog 조직의 이름과 일치할 필요는 없습니다.
1. 필터 쿼리를 정의합니다. 지정한 필터 쿼리와 일치하는 로그만 해당 조직으로 전송됩니다. 필터 쿼리 작성에 대한 자세한 내용은 [Observability Pipelines 검색 구문][3]을 참조하세요.
1. Datadog 조직의 사이트를 선택합니다.
1. 해당 Datadog 조직의 API 키 식별자를 입력합니다.
	- **참고**: API 키 식별자만 입력하세요. 실제 API 키는 **입력하지 마세요**.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

#### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

## 시크릿 기본값 {#secret-defaults}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

이 목적지에는 시크릿 식별자가 없습니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

<!-- vale Datadog.words_case_sensitive = NO -->
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}
<!-- vale Datadog.words_case_sensitive = YES -->

{{% /tab %}}
{{< /tabs >}}

## 구성 요소 또는 특정 조직의 메트릭 조회 {#view-metrics-for-the-component-or-specific-organizations}

[구성 요소 수준](#component-level-metrics) 또는 [조직 수준](#organization-level-metrics)에서 메트릭을 조회할 수 있습니다.

### 구성 요소 수준 메트릭 {#component-level-metrics}

전체 Datadog Logs 목적지의 메트릭을 조회하려면:

1. [Observability Pipelines][1]로 이동합니다.
1. 파이프라인을 선택합니다.
1. {{< ui >}}Datadog Logs{{< /ui >}} 목적지의 톱니바퀴 아이콘을 클릭하고 {{< ui >}}View details{{< /ui >}}를 선택합니다.

**참고**: {{< ui >}}Data dropped (intentional){{< /ui >}} 메트릭은 조직의 어느 필터와도 일치하지 않는 로그를 보여줍니다.

### 조직 수준 메트릭 {#organization-level-metrics}

특정 Datadog 조직의 메트릭을 조회하려면:

1. [Observability Pipelines][1]로 이동합니다.
1. 파이프라인을 선택합니다.
1. {{< ui >}}Datadog Logs{{< /ui >}} 목적지를 클릭하여 조직을 표시합니다.
  {{< img src="observability_pipelines/destinations/multi_dd_orgs_highlighted.png" alt="us1 및 us3 조직이 강조 표시된 Datadog Logs 목적지" style="width:45%;" >}}
1. 메트릭을 확인할 조직을 클릭합니다.
1.  {{< ui >}}View Health Metrics{{< /ui >}}를 클릭합니다.

또는 Datadog Logs 목적지에서 {{< ui >}}Review Configured Organizations{{< /ui >}}를 클릭하세요. 그런 다음 해당 조직의 {{< ui >}}Metrics{{< /ui >}} 열에 있는 그래프 아이콘을 클릭하세요.

## 상태 메트릭 {#health-metrics}

모든 목적지에서 내보내는 [구성 요소 메트릭][7] 및 [목적지 버퍼 메트릭][8]에 대해서는 [Pipelines 사용량 메트릭][9] 설명서를 참조하세요.

{{< site-region region="us,ap1,ap2,uk1" >}}

## AWS PrivateLink {#aws-privatelink}

Observability Pipelines에서 AWS PrivateLink를 사용하여 Datadog으로 로그를 전송하려면 [AWS PrivateLink를 통해 Datadog에 연결][1]에서 설정 지침을 참조하세요. 설정해야 하는 두 가지 엔드포인트는 다음과 같습니다.

- 로그(사용자 HTTP 수집): {{< region-param key=http_endpoint_private_link code="true" >}}
- Remote Configuration: {{< region-param key=remote_config_endpoint_private_link code="true" >}}

**참고**: `obpipeline-intake.datadoghq.com` 엔드포인트는 Live Capture에 사용되며 PrivateLink 엔드포인트로 사용할 수 없습니다.

[1]: /ko/agent/guide/private-link/?tab=crossregionprivatelinkendpoints

{{< /site-region >}}
{{< site-region region="us3" >}}

<!-- vale Datadog.headings = NO -->
## Azure Private Link {#azure-private-link}
<!-- vale Datadog.headings = YES -->

Observability Pipelines에서 Azure Private Link를 사용하여 Datadog으로 로그를 전송하려면 [Azure Private Link를 통해 Datadog에 연결][1]에서 설정 지침을 참조하세요. 설정해야 하는 두 가지 엔드포인트는 다음과 같습니다.

- 로그(사용자 HTTP 수집): `http-intake.logs.us3.datadoghq.com`
- Remote Configuration: `config.us3.datadoghq.com`

**참고**: `obpipeline-intake.datadoghq.com` 엔드포인트는 Live Capture에 사용되며 Private Link 엔드포인트로 사용할 수 없습니다.

[1]: /ko/agent/guide/azure-private-link/?site=us3

{{< /site-region >}}

### Datadog Logs 메트릭 {#datadog-logs-metrics}

- 개별 구성 요소별로 필터링하거나 그룹화하려면 `component_id` 태그를 사용하세요.
- Datadog Logs 목적지 메트릭에서 `component_type`태그 값은 `datadog_logs`입니다.

`pipelines.datadog_logs_reserved_attribute_conflicts_total`
: **설명**: 의미를 지닌 필드를 Datadog [예약 속성][10]으로 재배치할 때 발생하는 충돌 수입니다. [예시](#example-of-relocating-fields-with-semantic-meaning-to-a-datadog-reserved-attribute)를 참조하세요. Worker 버전 2.18 이상에서 사용할 수 있습니다.
: **메트릭 유형**: count

#### 의미를 지닌 필드를 Datadog 예약 속성으로 재배치하는 예시 {#example-of-relocating-fields-with-semantic-meaning-to-a-datadog-reserved-attribute}

OpenTelemetry 소스는 다음 이벤트를 디코딩하며, 여기서 `severity_text`는 의미상 예약된 `status` 속성에 매핑됩니다.

```json
{
  "message": "GET /api/users returned 404",
  "severity_text": "WARN",
  "attributes": {
    "status": 404,
    "http.method": "GET"
  },
  "timestamp": "..."
}
```

그런 다음 프로세서가 이벤트를 평면화하여 `status`와 `severity_text`가 모두 최상위 수준에 존재하게 합니다.

```json
{
  "message": "GET /api/users returned 404",
  "severity_text": "WARN",
  "status": 404,
  "http.method": "GET",
  "timestamp": "..."
}
```

예약된 `status` 속성이 이미 존재하므로, 목적지는 충돌하는 필드에 의해 덮어쓰이는 것을 방지하기 위해 이름을 `_RESERVED_severity`로 변경합니다.

```json
{
  "message": "GET /api/users returned 404",
  "status": "WARN",
  "_RESERVED_severity": 404,
  "http.method": "GET",
  "timestamp": "..."
}
```

## 목적지의 작동 방식 {#how-the-destination-works}

### 이벤트 배치 처리 {#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][2]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| 1,000          | 4.25              | 5                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/destinations/#event-batching
[3]: /ko/observability_pipelines/search_syntax/logs/
[4]: /ko/observability_pipelines/configuration/set_up_pipelines/
[5]: /ko/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[9]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[10]: /ko/logs/log_configuration/attributes_naming_convention/#reserved-attributes