---
algolia:
  tags:
  - 로그 메트릭
  - 메트릭에서 로그 생성
aliases:
- /ko/logs/processing/logs_to_metrics/
- /ko/logs/logs_to_metrics/
description: 수집된 로그에서 메트릭을 생성합니다.
further_reading:
- link: logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: 블로그
  text: CIDR 표기법 쿼리를 사용하여 네트워크 트래픽 로그 필터링
title: 수집된 로그에서 메트릭 생성
---

## 개요

<div class="alert alert-info">이 문서에 설명된 솔루션은 클라우드 기반 로깅 환경에만 해당됩니다. 온프레미스 로그에서 메트릭을 생성하려면  <a href="https://docs.datadoghq.com/observability_pipelines/set_up_pipelines/generate_metrics/">Observability Pipelines</a> 설명서를 참조하세요.</div>

Datadog의 [제한 없는 로그 수집][1]\*을 사용하면 저장용 인덱스에서 무엇을 포함하거나 제외할지 동적으로 결정할 수 있습니다. 또한, 다양한 유형의 로그를 조회하고 장기간 KPI 등 동향을 추적하기 위해 원격 측정에 사용할 수 있습니다. 로그 기반 메트릭은 전체 수집 데이터 스트림을 요약하여 로그을 남기는 비용 효율적인 방법입니다. 즉, [제외 필터][2]를 사용하여 탐색을 위해 저장하는 항목을 제한하더라도 15개월 동안의 모든 로그 데이터에 대해 10초 단위로 동향을 시각화하고 이상 (징후)를 시각화할 수 있습니다.

로그 기반 메트릭을 사용하면 요청 기간 등 로그에 포함된 숫자 값의 [분포 메트릭][3] 또는 쿼리와 일치하는 로그 개수 메트릭을 생성할 수 있습니다.

**빌링 참고: 수집 로그에서 생성된 메트릭은 [커스텀 메트릭][4]으로 청구됩니다.

## 로그 기반 메트릭 생성

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="메트릭에 로그 생성" style="width:80%;">}}

새 로그 기반 메트릭을 생성하려면,

1. [메트릭 생성][5] 페이지로 이동합니다.
1. **메트릭 생성** 탭을 선택합니다.
1. **+ 새 메트릭**을 클릭합니다.

내보내기 메뉴에서 "새 메트릭 생성" 옵션을 선택하여 Analytics 검 에서 메트릭을 생성할 수도 있습니다.

{{< img src="logs/processing/logs_to_metrics/metrics_from_analytics2.jpg" alt="메트릭에 로그 생성" style="width:80%;">}}

### 새 로그 기반 메트릭 추가

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics2.png" alt="메트릭에 로그 생성" style="width:80%;">}}

1. **로그 스트림 필터링을 위한 쿼리 입력**: 쿼리 구문은 [로그 탐색기 검색][6]과 동일합니다. 지난 20분 내 타임스탬프로 수집된 로그만 집계에 고려됩니다.
2. **추적하려는 필드 선택**: `*`을 선택하여 쿼리와 일치하는 모든 로그의 개수를 생성하거나 로그 속성(예: `@network.bytes_written`)을 입력하여 숫자 값을 집계하고 해당 `count`, `min`, `max`, `sum` 및 `avg` 집계 메트릭을 생성합니다. 로그 속성 패싯이 [측정값][7]인 경우 메트릭의 값은 로그 속성 값입니다.
3. ** `group by`**에 차원을 추가합니다: 기본적으로 로그에서 생성된 메트릭에는 명시적으로 추가하지 않는 한 태그가 없습니다. 로그에 존재하는 모든 속성 또는 태그 차원(예: `@network.bytes_written`, `env`)을 사용하여 메트릭 [태그][8]을 만들 수 있습니다. 메트릭 태그 이름은 원래 속성 또는 이름과 동일합니다. 메트릭 태그 이름은  @를 제외한 태그 이름이나 원래 속성과 동일합니다.
4. **백분위수 집계 추가**: 분포 메트릭의 경우 선택적으로 p50, p75, p90, p95 및 p99 백분위수를 생성할 수 있습니다. 백분위수 메트릭은 또한 커스텀 메트릭으로 간주되며 [그에 따라 청구][9]됩니다.
5. **메트릭 이름 만들기**: 로그 기반 메트릭 이름은 [커스텀 메트릭명명 규칙][10]을 따라야 합니다.

**참고**: 로그 기반 메트릭의 데이터 포인트는 10초 간격으로 생성됩니다. 로그 기반 메트릭에 대한 [대시보드 그래프][11]를 생성하는 경우 `count unique` 파라미터는 10초 간격 내의 값을 기반으로 합니다.

{{< img src="logs/processing/logs_to_metrics/count_unique.png" alt="강조 표시된 고유한 개수 쿼리 파라미터를 포함하는 시계열 그래프 설정" style="width:80%;">}}

<div class="alert alert-danger">로그 기반 메트릭은 <a href="/메트릭/custom_metrics/">커스텀 메트릭</a>으로 간주되어 그에 따라 요금이 청구됩니다. 빌링에 영향을 미치지 않도록 타임스탬프, 사용자 ID, 요청 ID 또는 세션 ID 등 제한이 없거나 카디널리티가 매우 높은 태그를 기준으로 그룹을 생성하지 않아야 합니다</div>

### 로그 기반 메트릭 업데이트

메트릭이 생성되면 다음 필드를 업데이트할 수 있습니다:

- 스트림 필터 쿼리: 메트릭으로 집계하려는 일치 로그 세트를 변경합니다.
- 집계 그룹: 생성된 메트릭의 카티널리티를 관리하거나 태그를 업데이트합니다.
- 백분위수 선택 항목: **백분위수 계산** 상자를 선택하거나 선택 취소하여 백분위수 메트릭을 제거하거나 생성합니다.

메트릭 유형 또는 이름을 변경하려면 새 메트릭을 만들어야 합니다.

## 로그 사용량 메트릭

{{< img src="logs/processing/logs_to_metrics/estimated_usage_metrics.png" alt="권장 사용량 메트릭" style="width:80%;">}}

사용량 메트릭은 현재 Datadog 사용량을 거의 실시간으로 추정합니다. 이를 통해 다음을 수행할 수 있습니다.

- 예상 사용량을 그래프로 표시합니다.
- 예상 사용량을 중심으로 모니터를 생성합다.
- 사용량 급증 또는 감소에 대한 즉각적인 알림을 받으세요.
- 코드 변경이 사용량에 미치는 잠재적 영향을 거의 실시간으로 평가하세요.

로그 관리 사용량 메트릭에는 더욱 세분화된 모니터링에 사용할 수 있는 3가지 태그가 제공됩니다.

| 태그                     | 설명                                                           |
| ----------------------- | --------------------------------------------------------------------- |
|  `datadog_index`        | 로그를 의도한 인덱스에 일치시키는 라우팅 쿼리를 의미합니다.  |
|  `datadog_is_excluded`  | 로그가 제외 쿼리와 일치하는지를 나타냅니다.            |
|  `service`              | 로그 이벤트의 서비스 속성입니다.                               |

`datadog.estimated_usage.logs.ingested_events` 메트릭에서 사용 가능한 추가 `status` 태그를 통해 로그 상태를 반영할 수 있습니다(`info`, `warning` 등).

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*제한 없는 로그 수집은 Datadog, Inc.의 등록 상표입니다.

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