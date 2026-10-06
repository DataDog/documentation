---
aliases:
- /ko/graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
- /ko/graphing/metrics/summary/
description: Datadog에 보고하는 메트릭 전체 목록 확인
further_reading:
- link: /metrics/explorer/
  tag: 설명서
  text: Metrics Explorer
- link: /metrics/distributions/
  tag: 설명서
  text: Metrics Distributions
title: Metrics Summary
---
## 개요 {#overview}

[Metrics Summary 페이지][1]에는 지정된 기간(지난 1시간, 지난 1일, 지난 1주) 동안 Datadog에 보고된 메트릭 목록이 표시됩니다. 

{{< ui >}}Metric{{< /ui >}} 또는 {{< ui >}}Tag{{< /ui >}} 검색 필드를 사용하여 메트릭 이름 또는 태그로 메트릭을 검색합니다.

{{< img src="metrics/summary/tag_advanced_filtering.png" alt="태그 검색 창에 NOT team:*를 입력한 메트릭 요약 페이지" style="width:75%;">}}

**참고**: 태그 값은 {{< ui >}}Tag{{< /ui >}} 검색 필드에 28시간 동안 유지됩니다. 지난 28시간 동안 제출되지 않은 값은 메트릭 세부 정보 측면 패널에 계속 표시되더라도 검색 옵션으로 나타나지 않습니다.

메트릭 검색 필드에서 향상된 퍼지 매칭 지원을 사용하여 관련 메트릭을 찾을 수도 있습니다.

{{< img src="metrics/summary/metric_advanced_filtering_fuzzy.png" alt="shopist checkout을 검색하는 퍼지 검색이 포함된 메트릭 요약 페이지" style="width:75%;">}}

부울 연산과 와일드카드 구문을 지원하는 태그 필터링으로 다음을 파악할 수 있습니다. 
* 특정 태그 키로 태그된 메트릭(예: `team`: `team:*`)
* 특정 태그 키가 누락된 메트릭(예: `team`: `NOT team:*`)

## 패싯 패널 {#facet-panel}

검색 창은 메트릭 목록을 필터링하기 위한 가장 포괄적인 작업 세트를 제공합니다. 하지만 패싯을 사용하여 다음과 같이 메트릭을 필터링할 수도 있습니다.

- {{< ui >}}Configuration{{< /ui >}}: 태그 구성이 있는 메트릭
- {{< ui >}}Percentiles{{< /ui >}}: 백분위수/고급 쿼리 기능으로 활성화된 분포 메트릭
- {{< ui >}}Historical Metrics{{< /ui >}}: 과거 메트릭 수집이 활성화된 메트릭 
- {{< ui >}}Query Activity{{< /ui >}}: 지난 30일, 60일 또는 90일 동안 Datadog이나 API를 통해 쿼리되지 않은 메트릭
- {{< ui >}}Related Assets{{< /ui >}}: 대시보드, 노트북, 모니터 및 SLO에서 사용 중인 메트릭
- {{< ui >}}Metric Type{{< /ui >}}: 분포 메트릭과 비분포 메트릭(카운트, 게이지, 비율) 구분
- {{< ui >}}Metric Origin{{< /ui >}}: 메트릭이 생성된 제품(예: 로그 또는 APM 스팬에서 생성된 메트릭) 다양한 메트릭 원본 유형에 대해 자세히 알아보려면 [메트릭 원본 정의][12]를 참조하세요.

### 정의 {#definitions}

메트릭이 지난 30일, 60일 또는 90일 동안 모니터, SLO, 실행된 노트북, 열린 대시보드, Metrics Explorer 쿼리에서 사용되지 않았거나 API 호출을 통해 액세스되지 않은 경우 **쿼리되지 않음**으로 간주됩니다.

메트릭은 활발하게 쿼리되었는지 여부와 관계없이 자산에 존재하는 한 **사용됨**으로 간주됩니다.

{{< img src="metrics/summary/facet_panel_2025-02-26.png" alt="메트릭 패싯 패널" style="width:75%;">}}

## 여러 메트릭 설정 {#configuration-of-multiple-metrics}

{{< ui >}}Configure Metrics{{< /ui >}}를 클릭하면 한 번에 여러 메트릭을 설정할 수 있는 다양한 옵션이 제공됩니다. 

{{< img src="metrics/summary/configurationbuttons10-11-2024.png" alt="대량 설정 버튼" style="width:100%;">}}

* {{< ui >}}Manage tags{{< /ui >}}: Metrics without Limits™를 사용해 네임스페이스와 일치하는 여러 Custom Metrics에서 태그를 지정하세요.

{{< img src="metrics/summary/tags-bulk-config.mp4" alt="대량 메트릭 태그 설정" video="true" style="width:100%;" >}}

* {{< ui >}}Enable or disable percentiles{{< /ui >}}: 여러 분포 메트릭에 걸쳐 백분위수 집계를 관리합니다. 자세한 내용은 [분포 페이지][31]를 참조하세요.

{{< img src="metrics/summary/percentile_aggregations_toggle_2025-04-16.png" alt="백분위수 집계를 관리하는 토글" style="width:100%;">}}

* {{< ui >}}Enable or disable historical metrics ingestion{{< /ui >}}: 과거 메트릭 데이터 수집을 관리합니다. 자세한 내용은 [과거 메트릭 수집 페이지][30]를 참조하세요.

## 메트릭 상세 정보 사이드 패널 {#metric-details-sidepanel}

메트릭 메타 데이터 및 태그와 관련된 자세한 정보를 보려면 아무 메트릭 이름을 클릭하여 상세 정보 사이드 패널을 표시하세요. 

{{< img src="metrics/summary/mwl_sidepanel.jpg" alt="메트릭 패널" style="width:75%;">}}

### 메트릭 이름 {#metric-name}

[Metrics Explorer][2], [대시보드][3] 등의 메트릭 이름입니다.

### Ingested Custom Metrics {#ingested-custom-metrics}

메트릭 이름은 연결된 태그 값 조합에 따라 여러 개의 수집된 Custom Metrics을 생성할 수 있습니다. 수집된 Custom Metrics은 코드와 함께 원래 제출된 모든 데이터를 나타냅니다.

[Custom Metrics][4] 설명서에서 자세히 알아보세요.

### Indexed Custom Metrics {#indexed-custom-metrics}

Ingested Custom Metrics와 달리, Indexed Custom Metrics는 Datadog 플랫폼 전반에서 쿼리 가능한 상태로 유지되는 메트릭을 나타냅니다. 이 숫자는 백분위수 집계를 추가하거나 제거하거나 Metrics without Limits™를 사용하여 영향을 받을 수 있습니다. [Metrics without Limits™][0] 설명서에서 자세히 알아보세요.

### 호스트 {#hosts}

메트릭을 보고하는 총 호스트 개수입니다.

### 태그 값 {#tag-values}

메트릭에 연결된 고유한 태그 값의 총 수입니다.

[태깅에 대해 자세히 알아보세요][5].

### 메트릭 메타데이터 {#metrics-metadata}

메트릭에 첨부된 메타데이터입니다. 대부분의 메타데이터는 메트릭 요약 페이지나 [Datadog API][6]를 사용하여 편집할 수 있습니다.

#### 메트릭 단위 {#metric-unit}

메트릭의 단위(바이트, 초, 요청, 쿼리 등)입니다. 자세한 내용은 [메트릭 단위][7] 페이지를 참조하세요.

Custom Metrics를 Datadog에 제출할 때 그래프의 메트릭 위에 마우스를 올리면 표시되는 [측정 단위][1]를 변경할 수 있습니다.

**참고**: 이는 메트릭 그래프가 표시되는 방식에는 영향을 주지 않습니다. 메트릭 위에 마우스를 올렸을 때 원시 값이 간주되는 측정 단위만 변경됩니다. 가독성을 위해 서식이 자동으로 적용됩니다. 예를 들어, 바이트(`B`)는 킬로바이트(`KiB`)로 표시될 수 있습니다.

#### 메트릭 종류 {#metric-type}

메트릭의 종류(게이지, 비율, 카운트, 분포)입니다. 자세한 내용은 [메트릭 종류][8] 페이지를 참조하세요.

**경고**: 메트릭 종류를 편집하면 **모든** 대시보드와 모니터에 대한 해당 메트릭의 행동이 변경됩니다.

#### 통합 이름 {#integration-name}

메트릭이 지원되는 [통합][9]에서 온 경우, 메타데이터는 통합 이름을 나열합니다. 이 정보는 편집할 수 없습니다.

#### 간격 {#interval}

메트릭의 수집 간격은 초 단위입니다.

#### 메트릭 설명 {#metric-description}

메트릭 설명은 메트릭이 무엇을 나타내는지, 왜 존재하는지, 일반적으로 어떻게 사용되는지 이해하는 데 도움이 됩니다. 이 필드를 사용하여 [Custom Metrics][4]에 대한 설명을 보고 업데이트하세요. 설명은 지원되는 [통합][9]에서 제공되는 메트릭에 대해 미리 채워집니다.

#### AI 생성 설명 {#ai-generated-description}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">선택한 Datadog 사이트에서 AI 생성 메트릭 설명을 사용할 수 없습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Custom Metrics의 경우, Datadog은 메트릭 이름, 의미 있는 태그, 쿼리 활동 및 연결된 소스 코드를 포함하여 사용 가능한 컨텍스트를 사용하여 설명을 자동으로 생성할 수 있습니다. 소스 코드를 추가 컨텍스트로 사용하려면 Datadog의 [GitHub][36], [GitLab][37] 또는 [Azure DevOps][38] 통합을 설치하고 [리포지토리][39]를 연결하세요.

{{< img src="metrics/summary/metric_ai_generated_descriptions_03062026.png" alt="메트릭 사이드패널의 AI 생성 설명" style="width:80%;">}}


## 소스 코드 {#source-code}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">선택한 Datadog 사이트에서 메트릭 소스 코드를 사용할 수 없습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

메트릭 사이드 패널의 소스 코드 섹션은 모든 커스텀 메트릭과 그 기본 컨텍스트를 중앙 집중식으로 보여줍니다.

메트릭 사이드 패널의 소스 코드 섹션을 사용하여 메트릭의 소스 코드를 식별하고, 생성 방식을 이해하며, 소유권을 확인하세요. 컨텍스트와 소유권에 대한 가시성을 제공하여 메트릭의 소스 파일, 커밋 기록 및 blame 데이터로 직접 연결함으로써 더 빠르게 문제를 해결하고 최적화할 수 있도록 돕습니다.

{{< img src="metrics/summary/metric_source_code_03262026.png" alt="메트릭 사이드패널의 소스 코드 예시" style="width:80%;">}}

### 누락된 메트릭 문제 해결 {#troubleshooting-missing-metrics}

메트릭이 소스 코드에 나타나지 않는 경우, 정의 방식 때문일 수 있습니다.

Datadog은 이름이 명시적인 문자열로 작성될 때 메트릭을 가장 잘 감지합니다. 변수, 상수 또는 사용자 지정 도우미를 사용하여 빌드된 메트릭은 감지되지 않을 수 있습니다.

메트릭이 누락되는 일반적인 이유는 다음과 같습니다.
- 메트릭 이름이 동적으로 생성됨  
- 메트릭이 사용자 지정 래퍼를 통해 전송됨  
- 리포지토리가 완전히 인덱싱되지 않음  

모범 사례:
- 가능한 경우 메트릭 이름을 명시적 문자열로 정의  

예:

변수를 사용하여 메트릭을 전송하는 것은 권장하지 않습니다.

```java
public static final String METRIC_NAME = "my.metric.name";
statsEmitter.distribution(METRIC_NAME, value, tags);
```

명시적 문자열로 메트릭을 전송하는 것이 권장됩니다.

```java
timer = meterRegistry.timer("my.metric.name");
```

메트릭 소스 코드의 전체 범위를 보장하려면 Datadog의 [GitHub][36], [GitLab][37] 또는 [Azure DevOps][38] 통합을 설치하고 모든 [리포지토리][39]가 연결되어 있는지 확인하세요.

### 태그 표 {#tags-table}

태그 표는 메트릭 데이터에서 활성 보고하는 모든 태그 키와 값을 살펴볼 수 있는 다양한 방법을 제공합니다.

태그 표를 사용하여 다음을 수행하세요.

- 태그 키를 {{< ui >}}Count{{< /ui >}} 열(고유한 태그 값 개수)로 정렬합니다.
- 특정 태그 키에 대해 페이지 매긴 태그 표를 검색합니다.
- 태그 표를 다운로드 가능한 CSV 파일로 내보냅니다.
- 메트릭에서 설정한 태그와 원래 제출된 태그 간에 전환합니다.

특정 키에 대해 다음을 수행하세요.

- 해당 태그 키의 모든 태그 값을 검사합니다.
- 특정 태그 `key:value` 항목을 사용하여 Metrics Summary 페이지에 표시된 메트릭 목록을 추가로 필터링합니다.
- Metrics Explorer에서 태그 `key:value` 페어별로 필터링한 메트릭 그래프를 엽니다.
- 애플리케이션 전반에서 필터링하기 위해 `key:value` 태그를 복사합니다.

{{< img src="metrics/summary/updated_tags_table.mp4" alt="태그 표" video=true style="width:75%;">}}

[태깅에 대해 자세히 알아보세요][5].

### 메트릭 관련 에셋 {#metrics-related-assets}

{{< img src="metrics/summary/related_assets_dashboards_08_05_2025.png" alt="지정된 메트릭 이름에 대한 관련 에셋" style="width:80%;">}}

조직에서 특정 메트릭 이름의 가치를 확인하려면 메트릭 관련 에셋을 사용하세요. 메트릭 관련 에셋은 특정 메트릭을 쿼리하는 모든 대시보드, 노트북, 모니터 또는 SLO를 의미합니다. 

1. 메트릭 상세 정보 사이드 패널 하단의 {{< ui >}}Related Assets{{< /ui >}} 섹션으로 스크롤합니다.
2. 드롭다운 버튼을 클릭하여 관심 있는 관련 에셋 유형(대시보드, 모니터, 노트북, SLO)을 조회합니다. 검색 창을 추가로 사용하여 특정 에셋을 조회할 수 있습니다.
3. {{< ui >}}Tags{{< /ui >}} 열은 각 에셋에 사용된 태그를 정확하게 보여줍니다.
   
## Custom Metrics 태그 카디널리티 탐색기 {#custom-metrics-tags-cardinality-explorer}

{{< img src="metrics/tagsexplorer.png" alt="급증하는 메트릭 이름에 대한 Custom Metrics 태그 카디널리티 탐색기" style="width:80%;">}}
특정 메트릭 이름이 왜 많은 수의 Custom Metrics를 생성하거나 급증하는지 확인하려면 Custom Metrics 태그 카디널리티 탐색기를 사용하세요. 이를 통해 급증의 원인이 되는 태그 키를 정확히 찾아낼 수 있으며, Metrics without Limits™를 사용하여 즉시 제외함으로써 비용을 절감할 수 있습니다.

## Metrics without Limits™ {#metrics-without-limits}
Metrics without Limits™는 에이전트나 코드 수준의 변경 없이 Custom Metrics의 크기를 제어할 수 있도록 해줍니다. 

**참고**: Metrics without Limits™는 Custom Metrics에 대해서만 사용할 수 있습니다.

[[메트릭 페이지][34]에서 {{< ui >}}Configure Metrics{{< /ui >}} > {{< ui >}}Manage tags{{< /ui >}}로 이동하거나, 메트릭 상세 정보 사이드 패널에서 {{< ui >}}Manage Tags{{< /ui >}} 버튼을 클릭하여 태그를 일괄 구성](#configuration-of-multiple-metrics)할 수 있습니다. 

{{< img src="metrics/distributions/managetags.png" alt="분포에 태그 구성하기" style="width:80%;">}}

1. {{< ui >}}Metrics Summary{{< /ui >}} 표에서 커스텀 분포 메트릭 이름을 클릭하여 메트릭 상세 정보 사이드 패널을 엽니다.
2. {{< ui >}}Manage Tags{{< /ui >}} 버튼을 클릭하여 태그 구성 모달을 엽니다.
3. 쿼리할 태그 또는 쿼리하지 않을 태그를 사용자 지정하려면 {{< ui >}}Include tags...{{< /ui >}} 또는 {{< ui >}}Exclude tags...{{< /ui >}}를 선택합니다. 태그 구성에 대한 자세한 내용은 [Metrics without Limits][10] 설명서를 참조하세요.
4. 카디널리티 추정 도구를 사용하여 제안된 태그 구성의 영향을 미리 확인한 후 {{< ui >}}Save{{< /ui >}}를 선택합니다.

**참고**: 카디널리티 추정 도구를 사용하려면 메트릭이 48시간보다 오래되어야 합니다.

### 쿼리 가능한 태그 {#queryable-tags}

Metrics without Limits™로 메트릭을 구성하면, 어떤 태그가 쿼리 가능한 상태로 남아 있는지, 즉 궁극적으로 _Indexed Custom Metrics_ 볼륨에 기여하는 태그를 조회할 수 있습니다. 또한 _Ingested Custom Metrics_ 볼륨에 기여하는, 원래 제출 및 수집된 모든 태그로 다시 전환할 수 있습니다. 

### 메트릭 출처 정의 {#metric-origin-definitions}

이 표는 패싯에서 볼 수 있는 메트릭 출처와 해당 메트릭이 제출된 위치 간의 매핑을 보여줍니다.

| 메트릭 출처           | 제출 위치                                                                |
| ------------------------| ----------------------------------------------------------------------------- |
| API Catalog             | APIM 엔드포인트에서 Datadog [Catalog][13] 제품이 전송한 시계열입니다.
| APM                     | 트레이스 및 스팬 메트릭에서 생성된 메트릭에 대해 Datadog APM 제품이 전송한 시계열입니다.
| Agent                   | [Agent integrations][10], [built-in integrations][9], [DogStatsD][32] 또는 [custom Agent checks][33]에서 수집되어 Datadog Agent가 전송한 시계열입니다.
| Cloud Security                     | Datadog [Cloud Security][14] 제품이 전송한 시계열입니다.
| Cloud Integrations      | AWS, Azure, Google Cloud 등 클라우드 제공업체의 각 Integrations에서 수집된 시계열입니다. 
| DBM                     | MySQL, Oracle, Postgres 활동/쿼리/잠금에 대한 인사이트를 포함하여 Datadog [Database Monitoring][15] 제품이 전송한 시계열입니다.
| DSM                     | DSM 스팬 및 트레이스에서 생성된 메트릭에 대해 Datadog [Data Streams Monitoring][16] 제품이 전송한 시계열입니다.
| Datadog Exporter        | [OpenTelemetry Collector][17] 또는 [Datadog Exporter][18]가 전송한 시계열입니다.
| Datadog Platform        | [메트릭 사용량 보고][11]에 사용되는 메트릭 수집기에서 전송한 시계열입니다.
| Events                  | Datadog Events 플랫폼에서 생성된 시계열입니다.
| Agent Observability       | Agent Observability 제품에서 `lmobs_to_metrics` 서비스를 사용하여 생성된 시계열입니다.
| Logs                    | Datadog [Logs][28] 플랫폼에서 생성된 시계열입니다.
| 메트릭 API             | Datadog의 [OTLP 수집 엔드포인트][21] 및 OTel 수신기, Datadog 통합 대응 항목, 추정 사용량 메트릭을 위한 포인트 또는 Datadog API 클라이언트를 사용하여 전송된 시계열입니다.
| CNM                     | Datadog [Cloud Network Monitoring][19] 제품에서 전송된 시계열입니다.
| Observability Pipelines | 오류 및 성능 메트릭을 포함하여 Datadog [Observability Pipelines][20]에서 전송된 시계열입니다.
| 기타                   | Datadog 통합 대응 항목이 없는 시계열입니다.
| Processes               | Datadog [Processes][22] 제품에서 생성된 시계열입니다.
| RUM                     | Datadog [Real User Monitoring][23] 제품에서 생성된 시계열입니다.
| SAAS Integrations       | Slack, Docker, PagerDuty 등과 같은 인기 있는 SAAS 플랫폼에서 수집된 시계열입니다.
| 서버리스              | Function, App Services, Cloud Run 및 Container App 메트릭을 포함하여 Datadog [Serverless][24] 플랫폼에서 전송된 시계열입니다.
| 카탈로그         | Datadog [Catalog][25] 제품에서 전송된 시계열은 [Scorecard][29] 메트릭을 포함합니다.
| Synthetic Monitoring    | Datadog [Synthetic Monitoring][26] 제품에서 생성된 합성 모니터링 및 지속적 테스트 메트릭입니다. 
| USM                     | Datadog [Universal Service Monitoring][27] 제품에서 생성된 시계열입니다. 

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[0]: /ko/metrics/metrics-without-limits
[1]: https://app.datadoghq.com/metric/summary
[2]: /ko/metrics/explorer/
[3]: /ko/dashboards/
[4]: /ko/metrics/custom_metrics/
[5]: /ko/getting_started/tagging/
[6]: /ko/api/v1/metrics/#edit-metric-metadata
[7]: /ko/metrics/units/
[8]: /ko/metrics/types/
[9]: /ko/integrations/
[10]: /ko/integrations/agent_metrics/
[11]: /ko/account_management/billing/usage_metrics/
[12]: /ko/metrics/summary/#metric-origin-definitions
[13]: /ko/internal_developer_portal/catalog/endpoints/
[14]: /ko/security/cloud_security_management/
[15]: /ko/database_monitoring/
[16]: /ko/data_streams/
[17]: /ko/opentelemetry/setup/collector_exporter/
[18]: /ko/opentelemetry/collector_exporter/
[19]: /ko/network_monitoring/cloud_network_monitoring/
[20]: /ko/observability_pipelines/
[21]: /ko/opentelemetry/setup/otlp_ingest_in_the_agent/
[22]: /ko/integrations/process/
[23]: /ko/monitors/types/real_user_monitoring/
[24]: /ko/serverless/
[25]: /ko/internal_developer_portal/catalog/
[26]: /ko/synthetics/
[27]: /ko/universal_service_monitoring/
[28]: /ko/logs/
[29]: /ko/internal_developer_portal/scorecards/
[30]: /ko/metrics/custom_metrics/historical_metrics/#bulk-configuration-for-multiple-metrics
[31]: /ko/metrics/distributions/#bulk-configuration-for-multiple-metrics
[32]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[33]: /ko/metrics/custom_metrics/agent_metrics_submission/
[34]: https://app.datadoghq.com/metric/overview
[35]: https://app.datadoghq.com/integrations?category=Source%20Control
[36]: https://app.datadoghq.com/integrations/github/configuration
[37]: https://app.datadoghq.com/integrations/gitlab-source-code
[38]: https://app.datadoghq.com/integrations/azure-devops-source-code?subPath=configuration
[39]: https://app.datadoghq.com/source-code/repositories
[40]: https://www.datadoghq.com/product-preview/metrics-source-code-attribution/