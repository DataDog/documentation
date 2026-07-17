---
aliases:
- /ko/developers/faq/characteristics-of-datadog-histograms/
- /ko/graphing/metrics/distributions/
description: 전체 데이터 세트에서 전역 백분위수를 계산합니다.
further_reading:
- link: /metrics/custom_metrics/dogstatsd_metrics_submission/
  tag: 설명서
  text: DogStatsD에서 분포 사용
- link: /metrics/open_telemetry/otlp_metric_types/
  tag: 설명서
  text: OTLP 메트릭 유형
title: 분포
---
## 개요 {#overview}

분포는 플러시 간격 동안 여러 호스트에서 전송된 값을 집계하여 전체 인프라의 통계 분포를 측정하는 메트릭 유형입니다.

전역 분포는 서비스와 같은 논리적 개체를 기저 호스트와 별도로 계측합니다. 에이전트 측에서 집계하는 [히스토그램][1]과는 달리 전역 분포는 플러시 간격 동안 수집된 모든 원시 데이터를 전송하며 집계는 Datadog의 [DDSketch 데이터 구조][2]를 사용하여 서버 측에서 발생합니다.

OpenTelemetry를 사용하는 경우, OTLP 히스토그램 메트릭이 기본적으로 Datadog 분포에 매핑됩니다. 이 매핑 및 사용 가능한 구성 옵션에 관한 자세한 내용은 [OTLP 메트릭 유형][5]을 참조하세요.

분포는 다른 메트릭 유형(카운트, 레이트, 게이지, 히스토그램)에서는 제공되지 않는 향상된 쿼리 기능 및 설정 옵션을 제공합니다.
* **백분위수 집계 계산**: 분포는 DDSketch 데이터 구조로 저장되며, 이 구조는 원시, 집계되지 않은 데이터를 나타내어 모든 호스트의 원시 데이터에서 전역적으로 정확한 백분위수 집계를(p50, p75, p90, p95, p99 또는 소수점 두 자리까지 선택한 모든 백분위수) 계산할 수 있습니다. 백분위수 집계를 활성화하면 다음과 같은 고급 쿼리 기능을 사용할 수 있습니다. 

  * **모든 기간 동안의 단일 백분위수 값**:
  
     _"지난 한 주 동안 애플리케이션의 99.9번째 백분위수 로드 시간은 얼마야?"_

  * **모든 기간에 대한 표준 편차**:
  
     _"지난 한 달 동안 애플리케이션의 CPU 사용량 표준 편차(stddev)는 얼마야?"_

  * **메트릭 모니터의 백분위수 임계값**:
  
    _"지난 5분 동안 애플리케이션 요청 지연 시간의 p95가 200ms를 초과하면 알려줘."_

  * **임계값 쿼리**:
  
    _"서비스에 대한 요청의 95%가 5초 이내에 완료되는 30일 SLO를 정의하고 싶어."_


* **태깅 사용자 지정**: 이 기능을 사용하면 호스트 수준의 세분화가 필요 없는 사용자 지정 메트릭(예: 체크아웃 서비스의 초당 트랜잭션 수)에 대한 태깅 체계를 제어할 수 있습니다.

**참고:** 분포 메트릭 데이터는 다른 유형과는 다르게 저장되므로, `distribution`에 사용한 메트릭 이름을 다른 메트릭 유형에 사용하면 안 됩니다.

## 고급 쿼리 기능 활성화 {#enabling-advanced-query-functionality}

`gauges` 또는 `histograms`와 같은 다른 메트릭 유형과 마찬가지로 분포에서도 `count`, `min`, `max`, `sum` 및 `avg`의 집계를 사용할 수 있습니다. 분포는 처음에는 다른 메트릭과 같은 방식으로 태그됩니다(코드에 설정된 사용자 지정 태그 사용). 그런 다음, 메트릭을 보고하는 호스트에 따라 호스트 태그로 리졸브됩니다. 

단, Metrics Summary 페이지에서 분포에서 쿼리할 수 있는 모든 태그에 대하여 전역적으로 정확한 백분위수 집계의 계산과 같은 고급 쿼리 기능을 활성화할 수 있습니다. 이렇게 하면 `p50`, `p75`, `p90`, `p95`, `p99` 또는 원하는 사용자 정의 백분위수의 집계를 얻을 수 있습니다(99.99와 같이 소수점 두 자리까지 가능). 고급 쿼리를 활성화하면 임계값 쿼리 및 표준 편차도 사용할 수 있습니다.

{{< img src="metrics/distributions/metric_detail_enable_percentiles.mp4" alt="메트릭 세부 정보 패널의 고급 섹션 아래에서 구성을 클릭하여 고급 백분위수 및 임계값 쿼리 기능을 활성화하는 사용자" video=true width=80% >}}

분포 메트릭에 백분위수 집계를 적용하도록 선택한 후 다음 집계를 그래프 UI에서 자동으로 사용할 수 있습니다.

{{< img src="metrics/distributions/graph_percentiles.mp4" alt="분포 메트릭 집계" video=true" >}}

다음과 같은 다양한 위젯과 경고에서 백분위수 집계를 사용할 수 있습니다. 
* **모든 기간의 단일 백분위수 값**

   _"지난 한 주 동안 애플리케이션의 99.9번째 백분위수 요청 시간은 얼마였어?"_ 

{{< img src="metrics/distributions/percentile_qvw.jpg" alt="단일 메트릭의 99.99 백분위수 집계에 대하여 단일 값(7.33s)을 표시하는 쿼리 값 위젯" style="width:80%;">}}

* **메트릭 모니터의 백분위수 임계값**
  _"지난 5분 동안 애플리케이션 요청 지연 시간의 p95가 200ms를 초과하면 알려줘."_ 

{{< img src="metrics/distributions/percentile_monitor.jpg" alt="모니터에서 경보 조건 드롭다운을 사용하여 백분위수 임계값을 설정하는 모습 " style="width:80%;">}}

### 다중 메트릭 일괄 구성 {#bulk-configuration-for-multiple-metrics}

다중 메트릭을 위한 백분위수 집계를 각각 설정하지 않고도 한 번에 활성화 또는 비활성화할 수 있습니다.

1. [Metrics Summary 페이지][4]로 이동하여 **메트릭 구성** 드롭다운을 클릭합니다.
1. **백분위수 활성화**를 선택합니다.
1. 메트릭 네임스페이스 접두사를 지정하여 해당 네임스페이스와 일치하는 모든 메트릭을 선택합니다.
1. (선택 사항) 네임스페이스의 모든 메트릭에 대하여 백분위수를 비활성화하려면 **백분위수 집계** 토글을 클릭하세요.

{{< img src="metrics/summary/percentile_aggregations_toggle.png" alt="백분위수 집계를 관리하는 토글" style="width:100%;" >}}

### 임계값 쿼리 {#threshold-queries}

분포 메트릭에서 DDSketch로 계산된 전역적으로 정확한 백분위수를 활성화하면 임계값 쿼리를 사용할 수 있으며, 여기에서 원시 분포 메트릭 값이 숫자 임계값을 초과하는지 해당 값 미만인지 계수할 수 있습니다. 이 기능을 사용하여 대시보드의 이상치 숫자 임계값에 대하여 오류 또는 위반 사항 수를 계수할 수 있습니다. 또는 임계값 쿼리를 사용하여 "지난 30일간 요청의 95%가 10초 이내에 완료됨"과 같은 SLO를 정의할 수도 있습니다. 

백분위수 분포에 대한 임계값 쿼리를 사용하면 메트릭을 제출하기 전에 임계값을 미리 정의할 필요가 없고, Datadog에서 완전히 유연하게 임계값을 조정할 수 있습니다.

임계값 쿼리를 사용하는 방법: 

1. Metrics Summary 페이지의 분포 메트릭에서 백분위수를 활성화합니다.
2. "count values..." 애그리게이터를 사용하여 선택한 분포 메트릭의 그래프를 작성합니다.
3. 임계값 및 비교 연산자를 지정합니다.

{{< img src="metrics/distributions/threshold_queries.mp4" video=true alt="count values 애그리게이터를 사용하여 시각화 중인 시계열 그래프(임계값 8초 초과)" style="width:80%;" >}}

마찬가지로, 임계값 쿼리를 사용하여 메트릭 기반 SLO를 생성할 수 있습니다. 
1. Metrics Summary 페이지의 분포 메트릭에서 백분위수를 활성화합니다.
2. 새 메트릭 기반 SLO를 생성하고 "count values..." 애그리게이터를 사용하여 선택한 분포 메트릭에 대한 쿼리가 있는 "정상" 이벤트의 수를 분자로 정의합니다.
3. 임계값 및 비교 연산자를 지정합니다.
{{< img src="metrics/distributions/threshold_SLO.png" alt="SLO를 위한 임계값 쿼리" style="width:80%;">}}

## 태깅 사용자 지정 {#customize-tagging}

분포는 호스트 수준 세분화가 의미가 없는 사용자 지정 메트릭에 대한 태깅을 제어할 수 있는 기능을 제공합니다. 태그 구성은 유지하고자 하는 태그의 _허용 목록_입니다. 

태깅을 사용자 지정하는 방법:

1. Metrics Summary 표에서 사용자 지정 분포 메트릭 이름을 클릭하여 메트릭 세부 정보 측면 패널을 엽니다.
2. **태그 관리** 버튼을 클릭하여 태그 구성 모달을 엽니다.
3. **사용자 지정...** 탭을 클릭하여 쿼리에 사용할 수 있도록 유지할 태그를 사용자 지정합니다. 

**참고**: 허용 목록에 기반한 태그 사용자 지정에서는 태그 제외가 지원되지 않습니다. `!`로 시작하는 태그는 추가할 수 없습니다.

{{< img src="metrics/distributions/dist_manage.jpg" alt="태그 관리 버튼을 사용하여 분포에서 태그 구성" style="width:80%;">}}

## 감사 이벤트 {#audit-events}
태그 구성 또는 백분위수 집계를 변경하면 [이벤트 탐색기][3]에 이벤트가 생성됩니다. 이 이벤트에 변경 사항이 설명되고 해당 변경 사항을 적용한 사용자가 표시됩니다.

분포 메트릭에서 태그 구성을 생성, 업데이트 또는 제거한 경우, 다음 이벤트 검색을 사용하여 예시를 확인할 수 있습니다.

```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20tag%20configuration
```

백분위수 집계를 분포 메트릭에 추가했거나 분포 메트릭에서 제거한 경우, 다음 이벤트 검색을 사용하여 예시를 확인할 수 있습니다.

```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20percentile%20aggregations
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/metrics/types/
[2]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[3]: https://app.datadoghq.com/event/explorer
[4]: https://app.datadoghq.com/metric/summary
[5]: /ko/metrics/open_telemetry/otlp_metric_types/