---
algolia:
  tags:
  - log metrics
  - generating logs from metrics
aliases:
- /ko/logs/processing/logs_to_metrics/
- /ko/logs/logs_to_metrics/
description: 수집된 로그에서 메트릭을 생성합니다.
further_reading:
- link: logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: 블로그
  text: CIDR 표기법 쿼리를 사용해 네트워크 트래픽 로그 필터링
- link: https://learn.datadoghq.com/courses/log-investigations
  tag: 학습 센터
  text: Alerting 및 Investigations 로그 추적
title: 수집된 로그에서 메트릭 생성
---
## 개요 {#overview}

<div class="alert alert-info">이 설명서에 개괄적으로 소개된 솔루션은 클라우드 기반 로깅 환경에 국한합니다. 온프레미스 로그에서 메트릭을 생성하려면 <a href="https://docs.datadoghq.com/observability_pipelines/configuration/explore_templates#generate-metrics">Observability Pipelines</a> 설명서를 참조하세요.</div>

Datadog의 [Logging without Limits][1]\*를 사용하면 스토리지 및 쿼리를 위해 인덱스에서 무엇을 포함 또는 제외할지 동적으로 결정할 수 있으며, 동시에 많은 유형의 로그는 KPI처럼 장기간 추세를 추적하는 텔레메트리 용도로 쓰입니다. 로그 기반 메트릭은 비용 효율적으로 수집 스트림 전체에서 로그 데이터를 요약하는 방법입니다. 이는 [제외 필터][2]를 사용하여 탐색을 위해 무엇을 저장할지 제한하더라도, 15개월 동안은 10초 단위의 세분성으로 로그 데이터 전체의 추세 및 이상치를 시각화할 수 있다는 의미입니다.

로그 기반 메트릭을 사용하면 쿼리와 일치하는 로그의 개수 메트릭을 생성하거나, 로그에 포함된 숫자 값(예: 요청 기간)의 [분포 메트릭][3]을 생성할 수 있습니다.

**청구 참고 사항:** 수집된 로그에서 생성된 메트릭은 [Custom Metrics][4]으로 청구됩니다.

## 로그 기반 메트릭 생성 {#generate-a-log-based-metric}

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="로그를 메트릭으로 생성" style="width:80%;">}}

새 로그 기반 메트릭을 생성하는 방법:

1. [메트릭 생성][5] 페이지로 이동합니다.
1. **메트릭 생성** 탭을 선택합니다.
1. **+새 메트릭**을 클릭합니다.

내보내기 메뉴에서 "새 메트릭 생성" 옵션을 선택하여 Analytics 검색에서 메트릭을 생성할 수도 있습니다.

{{< img src="logs/processing/logs_to_metrics/metrics_from_analytics2.jpg" alt="로그를 메트릭으로 생성" style="width:80%;">}}

### 새 로그 기반 메트릭 추가 {#add-a-new-log-based-metric}

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics2.png" alt="로그를 메트릭으로 만들기" style="width:80%;">}}

1. **로그 스트림을 필터링할 쿼리 입력**: 쿼리 구문은 [Log Explorer Search][6]에 대한 것과 같습니다. 지난 20분 내에 타임스탬프를 포함하여 수집된 로그만 집계 대상으로 간주됩니다. 인덱스는 쿼리에서 제외해야 합니다.
2. **추적하려는 필드 선택**: 쿼리와 일치하는 모든 로그의 개수를 생성하려면 `*`를 선택하고, 아니면 로그 속성을 입력하여(예: `@network.bytes_written`) 숫자 값을 집계하고 그에 상응하는 `count`, `min`,`max`, `sum` 및 `avg` 집계된 메트릭을 만듭니다. 로그 속성 패싯이 [measure][7]인 경우, 메트릭의 값은 로그 속성의 값입니다.
3. **`group by`**에 디멘션 추가: 기본적으로 로그 기반으로 생성된 메트릭에는 명시적으로 추가하지 않은 한 태그가 없습니다. 로그에 존재하는 모든 속성 또는 태그 디멘션(예: `@network.bytes_written`, `env`)을 사용하여 메트릭 [태그][8]를 만들 수 있습니다. 메트릭 태그는 출처 속성 또는 태그 이름과 같고, @을 포함하지 않습니다.
4. **백분위수 집계 추가**: 분포 메트릭의 경우, 선택적으로 p50, p75, p90, p95, p99 백분위수를 생성할 수 있습니다. 백분위수 메트릭도 사용자 지정 메트릭으로 간주하며, [그에 따라 청구][9]됩니다.
5. **메트릭 이름 지정**: 로그 기반 메트릭 이름은 [사용자 지정 메트릭 명명 규칙][10]을 따라야 합니다.

**참고**: 로그 기반 메트릭에 대한 데이터 포인트는 10초 간격으로 생성됩니다. 로그 기반 메트릭에 대하여 [대시보드 그래프][11]를 작성하면 `count unique` 파라미터는 10초 간격 이내의 값에 기반합니다.

{{< img src="logs/processing/logs_to_metrics/count_unique.png" alt="count unique 쿼리 파라미터가 강조 표시된 시계열 그래프 구성 페이지" style="width:80%;">}}

<div class="alert alert-danger">로그 기반 메트릭은 <a href="/metrics/custom_metrics/">사용자 지정 메트릭</a>으로 간주하며 그에 따라 청구됩니다. 청구에 영향을 미치지 않도록 타임스탬프, 사용자 ID, 요청 ID 또는 세션 ID와 같이 한계가 없거나 카디널리티가 극히 높은 속성을 기준으로 그룹화하지 마세요.</div>

### 로그 기반 메트릭 업데이트 {#update-a-log-based-metric}

메트릭이 생성되고 나서 다음과 같은 필드를 업데이트할 수 있습니다.

- 스트림 필터 쿼리: 메트릭으로 집계될 일치하는 로그 세트를 변경하기 위해
- 집계 그룹: 생성된 메트릭의 태그를 업데이트하거나 카디널리티를 관리하기 위해
- 백분위수 선택: **백분위수 계산** 상자를 선택하거나 선택 취소하여 백분위수 메트릭 제거 또는 생성

메트릭 유형 또는 이름을 변경하려면 새 메트릭을 만들어야 합니다.

## 로그 사용량 메트릭 {#logs-usage-metrics}

{{< img src="logs/processing/logs_to_metrics/estimated_usage_metrics.png" alt="권장 사용량 메트릭" style="width:80%;">}}

사용량 메트릭은 현재 Datadog 사용량을 준실시간으로 추정한 것입니다. 이것을 이용하여 다음과 같이 할 수 있습니다.

- 예상 사용량을 그래프로 표시합니다.
- 예상 사용량을 중심으로 모니터를 만듭니다.
- 사용량 급증 또는 급감에 관해 즉시 경보를 받습니다.
- 코드 변경이 사용량에 미치는 잠재적 영향을 준실시간으로 평가합니다.

Log Management 사용량 메트릭에는 3가지 태그가 함께 제공되어 좀 더 세분화된 모니터링이 가능합니다.

| 태그                     | 설명                                                           |
| ----------------------- | --------------------------------------------------------------------- |
|  `datadog_index`        | 로그를 의도한 인덱스와 매칭하는 라우팅 쿼리를 나타냅니다.  |
|  `datadog_is_excluded`  | 로그가 제외 쿼리와 일치하는지 아닌지를 나타냅니다.            |
|  `service`              | 로그 이벤트의 서비스 속성입니다.                               |

**참고**: `datadog_is_excluded` 및 `datadog_index` 필드에는 `N/A` 값이 있을 수 있습니다. 이는 로그가 수집되었지만, 명시적으로 인덱스로 라우팅될 포함 또는 제외 기준과 일치하지 않았음을 나타냅니다.

`datadog.estimated_usage.logs.ingested_events` 메트릭에서 추가 `status` 태그를 사용하여 로그 상태(`info`, `warning` 등)를 반영할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: /ko/logs/
[2]: /ko/logs/indexes/#exclusion-filters
[3]: /ko/metrics/distributions/#overview
[4]: /ko/metrics/custom_metrics/
[5]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[6]: /ko/logs/search_syntax/
[7]: /ko/logs/explorer/facets/#quantitative-facets-measures
[8]: /ko/getting_started/tagging/
[9]: /ko/account_management/billing/custom_metrics/?tab=countrategauge
[10]: /ko/metrics/custom_metrics/#naming-custom-metrics
[11]: /ko/dashboards/querying/