---
disable_toc: false
further_reading:
- link: monitors/manage/status/
  tag: 설명서
  text: 모니터링 상태 페이지에 대해 자세히 알아보기
- link: monitors/guide/monitor_aggregators/
  tag: 설명서
  text: 애그리게이터 모니터링에 대해 자세히 알아보기
title: 히스토리 그래프 및 평가 그래프 모니터링
---

## 개요

[상태 페이지 모니터링][1]에는 모니터링 평가에 대한 인사이트를 제공하는 두 그래프인 히스토리 그래프와 평가 그래프가 포함되어 있습니다. 본 지침에서는 다음을 알아봅니다.
- [히스토리 그래프 및 평가 그래프 정의하기](#evaluation-vs-history-graph)
- [두 그래프가 표시하는 값](#why-are-the-graphs-different)
- [모니터링 외의 평가 그래프 결과 복제하기](#troubleshooting-evaluation-graph-values)


## 히스토리 그래프 vs. 기록 그래프

히스토리 그래프
: 모니터링 쿼리에 제출되는 원시 데이터 포인트를 나타냅니다. 모니터링 상태 페이지는 노트북 및 대시보드에서 동일한 그래프 위젯을 사용합니다.

평가 그래프
:사용자가 정의한 알림 조건에 적용된 메트릭의 원시 데이터 포인트 결과를 표시합니다. 본 그래프의 데이터는 평가 기간으로 인해 집계 및 축소되었으므로, 쿼리 결과는 각 데이터 포인트에 대한 쿼리 값 위젯과 유사합니다.

원시 데이터 포인트를 Datadog에 모니터링용으로 제출하면 해당 정보는 히스토리 그래프에 시각화됩니다. 예를 들어, 지난 5분 동안 [10, 15, 12, 8, 11]와 같은 데이터 포인트가 있는 경우 히스토리 그래프에 각 값이 표시됩니다.

{{< img src="monitors/guide/history_and_evaluation_graphs/history_graph_query_config.png" alt="히스토리 그래프 표시 섹션이 강조 표시된 모니터링 메트릭 쿼리 설정" style="width:100%;" >}}

쿼리 평가를 설정하면 알림을 보낼 메트릭 값에 모니터링에 관한 다른 집계가 추가됩니다. 예를 들어, 모니터링을 설정하여 지난 5분 동안의 평균을 평가합니다. 평가 그래프에는 11.2 값이 단일 데이터 포인트로 표시됩니다.

`(10+15+12+8+11)/5 = 11.2`

{{< img src="monitors/guide/history_and_evaluation_graphs/eval_graph_evaluation_config.png" alt="평가 그래프 표시 섹션이 강조 표시된 메트릭 모니터링 평가 설정" style="width:100%;" >}}


## 그래프가 다른 이유는 무엇인가요?

일반적으로 두 그래프는 동일한 데이터 포인트 값을 시각화하지 않습니다. 그 외에도 여러 가지 다른 요인이 시각화 그래프 차이에 영향을 미칠 수 있습니다.

### as_count() 메트릭

수식에 `as_count` 메트릭이 있는 쿼리는 다른 평가 경로를 사용합니다. 평가는 수식 이전의 모든 집계를 적용합니다. 예를 들어, `A / B`를 사용하고 둘 다 `as_count` 평가 경로를 사용하는 경우 다음과 같이 평가됩니다.
```
(1+2+3+4+5) / (10+10+10+10+10) 
```

자세한 내용은 [모니터링 평가의 as_count()][2] 지침을 확인하세요.

### 수식 사용

수식을 사용하는 경우, 모니터링은 수식의 모니터링 평가에 대해 개별 쿼리가 아니라 함수 집계를 적용합니다. 즉, 쿼리에서 AVG(`avg by`) 집계 함수를 사용하고 있지만 평가 설정에서 지난 X 분 동안의 SUM(`sum by`)을 사용하고 있는 경우, 편집 페이지/히스토리 그래프 값이 평가 그래프의 값과 일치하지 않습니다. 예를 확인하려면 [트러블슈팅](#troubleshooting-different-graph-values) 섹션을 참조하세요.

### 평가 딜레이

평가 딜레이를 사용할 때 평가 그래프가 기록 그래프의 타이밍과 일대일로 매칭되지 않습니다. 예를 들어, 5분 평가 딜레이를 추가하는 경우 5분 전의 히스토리 그래프에서 데이터 포인트를 확인하여 평가 그래프와 상호 연관시켜야 합니다.

### 메트릭 집계 메소드

쿼리 및 평가 집계에서 사용하는 집계 메소드에 따라 다른 결과를 확인할 수 있습니다. 히스토리 및 편집 페이지에서는 쿼리의 집계 메소드를 사용하나 평가 그래프에서는 **평가** 옵션이 정한 집계 메소드를 사용합니다.

모니터링 설정에서 선택한 집계 메소드에 따라 편집 페이지에서 확인할 수 있는 값과 다른 값이 표시될 수 있습니다. 예를 들어 모니터링 쿼리가 AVG를 사용하지만 지난 X분/시간 동안의 최소값 알림을 받길 원하는 경우, 평가 그래프에는 MIN값이 표시되고 히스토리/편집 페이지 그래프에는 AVG값이 표시됩니다. 이는 해당 모니터링이 메트릭 쿼리에서 설정한 집계 메소드가 아니라 모니터링 평가에서 설정한 집계 메소드에 대해 경고하기 때문입니다.

## 평가 그래프 값 트러블슈팅

노트북 [쿼리 값 위젯][3]을 사용하여 특정 시점에서 모니터링이 평가하는 내용을 시각화할 수 있습니다. 모니터링(모든 수식 또는 함수와 같이)에서 쿼리를 가져온 후 그래프의 타임 프레임을 평가 기간으로 설정합니다. 그러면 데이터가 하나의 단일 포인트로 집계되어 표시됩니다.

다음 예시에서는 조사하려는 평가 그래프에서 타임프레임을 가져옵니다. 평가 그래프 데이터 요소 위로 마우스를 올려 값과 시간을 확인합니다. 예를 들어, 평가 그래프의 10:50:35에 `0.38` 데이터 포인트가 표시되는데 히스토리 그래프에는 같은 시간대에 `0.26`이 표시되는 이유를 조사하려고 합니다.

이 값의 문제를 해결하려면 모니터링 편집 페이지를 열고 모니터링 설정을 노트북 쿼리 값 위젯으로 전송합니다.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshoot_monitor_eval_config.png" alt="지난 5분 동안 p95 쿼리 집계와 p95 모니터링 평가 집계를 포함하는 메트릭을 보여주는 설정 예시" style="width:90%;" >}}

편집 페이지 설정 필드 모니터링:
- 메트릭 쿼리 **a**: `proc.test_process.cpu.total_pct` p95 기준(모든 항목)
- 평가 집계 모니터링: 쿼리의 `percentile (p95)`을 평가합니다.
- 평가 기간 모니터링: `last 5 minutes`

동일한 설정을 노트북 쿼리 값 위젯으로 전송합니다.
1. 위젯 드롭다운에 **쿼리 값**이 표시되어야 합니다.
1. 트러블슈팅하는 데이터 포인트에 해당하는 기간을 선택합니다.
1. 모니터링 설정에서 메트릭 쿼리 입력: `proc.test_process.cpu.total_pct`. 메트릭 집계 `p95 by`를 추가합니다.
1. 평가가 모니터링 평가(`percentile (p95)`)와 일치하는지 확인합니다.
1. 쿼리 값이 모니터링의 평가 데이터 포인트와 일치하는지 확인합니다.

| 구성                 | 모니터링     | 쿼리 값 위젯 |
| -------------                 | ----------- | ------------------ |
| 메트릭 쿼리                  |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_query.png" alt="지난 5분 동안 p95 쿼리 집계와 p95 모니터링 평가 집계를 포함하는 메트릭을 보여주는 설정 예시" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_query.png" alt="메트릭 쿼리와 매칭되는 필드가 강조 표시된 쿼리 값 위젯 설정" style="width:100%;" >}}|
| 집계 모니터링            |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_aggregation.png" alt="p95 쿼리 집계가 있는 메트릭을 보여주는 설정 예시로 p95 모니터링 평가 집계가 강조 표시됨" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_aggregation.png" alt="모니터링 집계와 매칭되는 필드가 강조 표시된 쿼리 값 위젯 설정" style="width:100%;" >}}|
| 평가 기간            |{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_monitor_eval_window.png" alt="p95 쿼리 집계가 있는 메트릭을 보여주는 설정 예시로 지난 5분 동안 모니터링 평가 기간이 강조 표시됨" style="width:100%;" >}}|{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_widget_eval_window.png" alt="모니터링 평가 기간과 매칭되는 필드가 강조 표시된 쿼리 값 위젯 설정" style="width:100%;" >}}|

### 수식이 포함된 평가 그래프 트러블슈팅

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formula_eval_graph.png" alt="13:55:29에 마우스를 올리면 9.17 데이터 포인트가 표시되는 평가 그래프" style="width:100%;" >}}

본 예시에서는 노트북 쿼리 값 위젯에서 다중 쿼리 및 수식이 있는 모니터링 평가 그래프의 값을 트러블슈팅합니다. 평가 그래프에서 조사하려는 데이터 포인트에 마우스를 올립니다. 본 예시에서는 13:55:29의 `9.17` 평가 그래프 값을 트러블슈팅합니다.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formula_monitor_config.png" alt="두 개의 메트릭 쿼리와 지난 5분 동안 쿼리의 최소값을 평가하는 수식 'a+b'를 보여주는 모니터링 설정" style="width:80%;" >}}

편집 페이지 설정 필드 모니터링
- 메트릭 쿼리 **a**: `proc.test_process.cpu.total_pct` 평균 기준(모든 항목)
- 메트릭 쿼리 **b**: `system.cpu.user` 평균 기준(모든 항목)
- 평가 집계 모니터링: 쿼리의 `min`을 평가합니다.
- 평가 기간 모니터링: `last 5 minutes`

동일한 설정을 노트북 쿼리 값 위젯으로 한 번에 하나의 메트릭을 전송합니다.

**메트릭 a**
1. 위젯 드롭다운에 **쿼리 값**이 표시되어야 합니다.
1. 13:55:29 부근 5분에 해당하는 타임프레임을 선택합니다. 이 경우 13:50 ~ 13:55(1:50 ~ 1:55)입니다.
1. 모니터링 설정에서 메트릭 쿼리 입력: `proc.test_process.cpu.total_pct`. 메트릭 집계 `avg`를 추가합니다.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formulas_query_a.png" alt="평균 집계를 포함하는 메트릭을 표시하는 쿼리 값 위젯" style="width:80%;" >}}

**메트릭 b**
1. 위젯 드롭다운에 **쿼리 값**이 표시되어야 합니다.
1. 13:55:29 부근 5분에 해당하는 타임프레임을 선택합니다. 이 경우 13:50 ~ 13:55(1:50 ~ 1:55)입니다.
1. 모니터링 설정에서 메트릭 쿼리 입력: `system.cpu.user`. 메트릭 집계 `avg`를 추가합니다.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshooting_formulas_query_b.png" alt="평균 집계를 포함하는 메트릭을 표시하는 쿼리 값 위젯" style="width:80%;" >}}

모니터링 평가 `Min`는 지난 5분 동안의 쿼리의 최소값을 취합니다.

{{< img src="monitors/guide/history_and_evaluation_graphs/troubleshoot_formulas_multi_query.png" alt="각각 평균 메트릭 집계와 최소 평가 집계를 포함하는 쿼리 두 개를 표시하는 쿼리 값 위젯" style="width:80%;" >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/status
[2]: /ko/monitors/guide/as-count-in-monitor-evaluations/
[3]: /ko/dashboards/widgets/query_value/