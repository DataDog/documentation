---
aliases:
- /ko/developers/faq/characteristics-of-datadog-histograms/
- /ko/graphing/metrics/distributions/
description: 전체 데이터셋에서 전역 백분위수를 계산합니다.
further_reading:
- link: /metrics/custom_metrics/dogstatsd_metrics_submission/
  tag: 설명서
  text: DogStatsD에서 분포 사용
kind: 설명서
title: 분포
---
## 개요

분포는 플러시 간격 동안 여러 호스트에서 전송된 값을 집계하여 전체 인프라스트럭처의 통계 분포를 측정하는 메트릭 유형입니다.

글로벌 분포는 서비스와 같은 논리적 개체를 기본 호스트와 독립적으로 계측합니다. 에이전트 측에서 집계하는 [히스토그램][1]과는 달리 글로벌 분포는 플러시 간격 동안 수집된 모든 원시 데이터를 전송하며, 집계는 Datadog의 [분산 분포 스케치 데이터 구조][2]를 사용하여 서버 측에서 발생합니다.

분포는 다른 메트릭 유형(카운트, 속도, 게이지, 히스토그램)과 함께 제공되지 않는 향상된 쿼리 기능 및 설정 옵션을 제공합니다:
* **백분위수 에그리게이터 계산**: 분포는 전체적으로 정확한 백분위수 집계(p50, p75, p90, p95, p99 또는 소수점 두 개까지 포함한 선택한 모든 백분위수)를 계산할 수 있도록호스트에서 집계되지 않은 원시 데이터를 나타내는 DDSketch 데이터 구조로 저장됩니다. 백분위수 에그리게이터를 활성화하면 다음과 같은 고급 쿼리 기능을 잠금 해제할 수 있습니다:

  * *모든 기간 동안의 단일 백분위수 값**

    _"지난 주 동안 애플리케이션의 99.9번째 백분위수 로드 시간은 얼마입니까?"_

  * **메트릭 모니터의 백분위수 임계값**:

    _"최근 5분 동안 애플리케이션 요청 지연 시간의 p95가 200ms를 초과할 경우 경고."_

  * **임계값 쿼리**:

    _"서비스 요청의 95%가 5초 이내에 완료되는 30일 SLO를 정의하고 싶습니다."_


* **태깅 사용자 지정**: 이 기능을 사용하면 호스트 수준의 세분화가 필요 없는 커스텀 메트릭(예: 체크아웃 서비스의 초당 트랜잭션 수)에 대한 태깅 체계를 제어할 수 있습니다.

구현에 대한 자세한 내용은 [개발 툴 섹션][1]을 참조하세요.

**참고:** 분포는 새 메트릭 유형이므로 Datadog에 제출하는 동안 새 메트릭 이름으로 계측해야 합니다.

## 고급 쿼리 기능 사용

`gauges``histograms`와 같은 다른 메트릭 유형과 마찬가지로, 분포에는 다음과 같은 사용 가능한 집계가 있습니다: `count``min``max``sum``avg`. 분포에는 처음에 다른 메트릭과 동일한 방식으로 커스텀 태그가 코드로 설정되어 있습니다. 그런 다음 메트릭을 보고한 호스트를 기반으로 호스트 태그로 확인됩니다.

그러나 메트릭 요약 페이지에서 배포에 있는 모든 쿼리 가능 태그에 대해 전역적으로 정확한 백분위수 집계 계산과 같은 고급 쿼리 기능을 사용하도록 설정할 수 있습니다. `p50``p75``p90``p95``p99` 및 사용자가 선택한 백분위수(최대 두 개의 소수점 99.99)에 대한 집계가 제공됩니다. 고급 쿼리를 활성화하면 임계값 쿼리의 잠금도 해제됩니다.

{{< img src="metrics/distributions/advancedquery.mp4" alt="고급 섹션에서 편집을 클릭하여 고급 쿼리 기능을 활성화하는 A 사용자" video=true width=65% >}}

분포 메트릭에 백분위수 집계를 적용하도록 선택한 후 다음 집계를 UI 그래프화에서 자동으로 사용할 수 있습니다:

{{< img src="metrics/distributions/graph_percentiles.mp4" alt="분포 메트릭 집계" video=true" >}}

다음과 같은 다양한 위젯과 경고에서 백분위수 집계를 사용할 수 있습니다:
* **모든 기간 동안의 단일 백분위수 값**

  _"지난 주 동안 애플리케이션에 대한 99.9백분위수의 요청 기간이 얼마입니까?"_

{< img src="metrics/distributions/percentile_qvw.jpg" alt="단일 메트릭의 99.99 백분위수 집계에 대한 단일 값(7.33s)을 표시하는 쿼리 값 위젯" style="width:80%;">}}

* **메트릭 모니터링의 백분위수 임계값**
  _"최근 5분 동안 애플리케이션 요청 지연 시간의 p95가 200ms를 초과할 경우 알림."_

{{< img src="metrics/distributions/percentile_monitor.jpg" alt="모니터에서 경고 조건에 대한 드롭다운을 사용하여 설정 중인 백분위수 임계값" style="width:80%;">}}

### 임계값 쿼리

<div class="alert alert-warning">
임계값 쿼리가 공개 베타에 있습니다.
</div>

분포 메트릭에서 전역적으로 정확하게 계산된 백분위수 분산 분포 스케치를 사용하도록 설정하면 원시 분포 메트릭 값이 숫자 임계값을 초과하거나 이보다 낮은 경우 원시 분포 메트릭 값의 수를 셀 수 있는 임계값 쿼리가 잠금이 해제됩니다. 이 기능을 사용하여 대시보드의 비정상적인 숫자 임계값과 비교하여 오류 또는 위반 수를 계산할 수 있습니다. 또는 임계값 쿼리를 사용하여 "지난 30일 동안 요청의 95%가 10초 이내에 완료되었습니다."와 같은 SLO를 정의할 수도 있습니다.

백분위수 분포에 대한 임계값 쿼리를 사용하면 메트릭을 제출하기 전에 임계값을 미리 정의할 필요가 없으며 Datadog에서 임계값을 조정할 수 있는 완전 유연성이 있습니다.

임계값 쿼리를 사용하는 방법:

1. 메트릭 요약 페이지의 분포 메트릭에서 백분위수를 사용하도록 설정합니다.
2. "카운트 값..." 애그리게이터(aggregator)를 사용하여 선택한 분포 메트릭을 그래프화 합니다.
3. 임계값 및 비교 연산자를 지정합니다.

{{< img src="metrics/distributions/threshold_queries.mp4" video=true alt="임계값이 8초 이상인 애그리게이터(aggregator) 카운트 값을 사용하여 시각화 중인 A 시간 급수" style="width:80%;" >}}

임계값 쿼리를 사용하여 메트릭 기반 SLO를 생성할 수 있습니다:
1. 메트릭 요약 페이지의 분포 메트릭에서 백분위수를 사용하도록 설정합니다.
2. 새 메트릭 기반 SLO를 생성하고 "카운트 값..." 애그리게이터(aggregator)를 사용하여 선택한 분포 메트릭에 대한 쿼리가 있는 "정상" 이벤트 수를 분자로 정의합니다."
3. 임계값 및 비교 연산자를 지정합니다.
{{< img src="metrics/distributions/threshold_SLO.jpg" alt="SLO에 대한 임계값 쿼리" style="width:80%;">}}

## 태깅 사용자 설정

분포는 호스트 수준의 세분성이 의미가 없는 경우 커스텀 메트릭에 대한 태깅을 제어할 수 있는 기능을 제공합니다. 태그 구성은 유지할 태그의 _allowlists_입니다.

태깅을 사용자 설정하는 방법

1. 메트릭 세부 정보 측면 패널을 열기 위해 메트릭 요약 테이블에서 커스텀 분포 메트릭 이름을 클릭합니다.
2. **Manage Tags** 버튼을 클릭하여 태그 설정 모델을 엽니다.
3. 쿼리에 사용할 수 있도록 유지할 태그를 사용자 지정하기 위해 **Custom...** 탭을 클릭합니다.

**참고**: 태그의 허용 목록 기반 사용자 지정에서는 태그 제외가 지원되지 않습니다. `!`로 시작하는 태그 추가는 허용되지 않습니다.

{{< img src="metrics/distributions/dist_manage.jpg" alt="태그 관리 버튼을 사용하여 분포에 태그 구성" style="width:80%;">}}

## 감사 이벤트
태그 설정 또는 백분위수 집계 변경 시 [이벤트 탐색기][3]에 이벤트가 생성됩니다. 이 이벤트는 변경 내용을 설명하고 변경한 사용자를 표시합니다.

분포 메트릭에 대한 태그 설정을 생성, 업데이트 또는 제거한 경우 다음 이벤트 검색의 예를 확인할 수 있습니다:
```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20tag%20configuration
```

백분위수 집계를 분포 메트릭에 추가하거나 제거한 경우 다음 이벤트 검색의 예를 확인할 수 있습니다:
```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20percentile%20aggregations
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/metrics/types/
[2]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[3]: https://app.datadoghq.com/event/explorer