---
further_reading:
- link: /api/latest/monitors/#edit-a-monitor
  tag: 설명서
  text: API를 통해 모니터 설정 업데이트하는 방법 알아보기
- link: /dashboards/functions/interpolation/#default-zero
  tag: 설명서
  text: 보간에 대해 알아보기
title: 스파스 메트릭 모니터링
---

## 개요

데이터를 자주 보고하는 모니터는 의도한 대로 평가하지 않고 예상치 못한 결과와 쿼리를 낼 수 있습니다. 내 데이터에 맞게 예상대로 평가가 이뤄지도록 모니터를 설정하는 도구와 작업이 있습니다.

이 가이드에서는 트러블슈팅 방법과 스파스 데이터로 모니터를 구성하는 방법을 설명합니다.
- [스파스 메트릭이 있는지 결정](#how-to-determine-whether-you-have-a-sparse-metric)
- 모니터 소스 확인 -> [메트릭 기반 모니터](#metric-based-monitor), [이벤트 기반 모니터](#event-based-monitor)
- [모니터가 일정에 따라 실행 중인가?](#schedule-based-monitoring)


## 스파스 메트릭이 있는지 확인하는 방법

대시보드 위젯, 노트북, [기존 모니터 내역 그래프][1]를 사용해 데이터 포인트에 마우스 커서를 올리고 데이터 포인트가 연속적인지, 혹은 각 지점이 있고 그 사이가 직선으로 연결되어 있는지 확인합니다.

노트북이나 위젯에서 **Bars** 디스플레이 옵션을 선택하고 데이터 포인트와 빈도를 확인합니다.

위젯에 나타나는 메트릭은 다음과 같이 표시됩니다.

{{< img src="monitors/guide/sparse_metrics/line_graph_sparse.png" alt="선 그래프에서 직선으로 상승과 하강을 그리는 메트릭 그래프" style="width:90%;" >}}

그러나 **Bars** 스타일이 적용된 경우에는 다음과 같이 표시됩니다.

{{< img src="monitors/guide/sparse_metrics/bar_graph_sparse.png" alt="위의 메트릭 선 그래프와 같은 데이터이나 각 데이터 포인트가 막대로 표시되어 스파스 메트릭의 간격을 확인할 수 있음" style="width:90%;" >}}

막대 그래프 디스플레이를 선택하면 데이터 포인트 간의 공백을 더욱 명확히 볼 수 있습니다.

그래프 편집기에 그래프 스타일을 변경할 수 있는 옵션이 없다면, 메트릭에 `default_zero()` 함수를 적용할 수 있습니다. 이 함수를 적용하면 데이터 공백을 표시하는 데 도움이 됩니다. 이 함수에 관한 자세한 정보는 [보간][2] 설명서를 참고하세요.

## 메트릭 기반 모니터

[메트릭][3], [변경][4], [이상 징후][5], [예측][6], [이상치][7] 모니터인가요? 다음 설정을 조정하세요.

* *Advanced options* **Do not require**(평가에 전체 데이터 창 필요 없음)을 선택합니다.
* 데이터 지연이 자주 발생하나요? 모니터 평가 지연에 시간을 추가(초 단위)할 수 있습니다. *Advanced options* 아래 **Delay monitor evaluation by X seconds** 필드에 값을 추가하세요.
* 예측 빈도에 따라 평가를 조정하세요(평균, 최댓값, 최솟값, 합계). 평가 기본값은 **avg by**로 되어 있으며, 이는 스파스 메트릭에 적합하지 않을 수 있습니다.
* **avg by** 애그리게이터를 사용할 경우, `default_zero()`와 같은 [보간 함수][2]를 추가해 메트릭 공백이 0으로 평가되도록 합니다.
* 쿼리에 산수를 사용하는 경우, [Monitor Arithmetic and Sparse Metrics][8]에서 자세한 지침을 확인하세요. 

## 이벤트 기반 모니터

[로그][9], [이벤트][10], [감사 트레일][11], 또는 [오류 추적][12] 모니터인가요? 다음을 참고하세요.

* 예상되는 모니터 동작에 맞게 "Missing data" 설정이 되어 있는지 확인하세요. **Evaluate as zero**, **Show NO DATA**, **Show NO DATA and notify**, 또는 **Show OK** 중 하나입니다.
  {{< img src="monitors/guide/sparse_metrics/data_is_missing.png" alt="모니터 구성 섹션의 'Set alert conditions' 섹션의 누락된 데이터 옵션 선택" style="width:80%;" >}}
* 평가 기간을 조정합니다. 데이터 포인트를 30분마다 사용할 수 있는 경우, 평가 기간에도 이를 고려해야 합니다.

## 일정 기반 모니터링

일일, 일간, 월간 특정 시간에 이벤트를 모니터링하고 있나요? 백업 작업 또는 내보내기와 같은 CRON 작업을 모니터링하고 있나요? [커스텀 일정][13] 사용을 고려해 보세요. 커스텀 일정을 사용하면 RRULES를 설정해 모니터 평가 시간과 알림 시간을 정의할 수 있습니다.

## 트러블슈팅

스파스 데이터 모니터링과 관련해 궁금한 점이 있으면 [Datadog 고객지원팀에 문의][14]하시기 바랍니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/status/#investigate-a-monitor-in-a-notebook
[2]: /ko/dashboards/functions/interpolation/#default-zero
[3]: /ko/monitors/types/metric/?tab=threshold
[4]: /ko/monitors/types/metric/?tab=change
[5]: /ko/monitors/types/anomaly/
[6]: /ko/monitors/types/forecasts/?tab=linear
[7]: /ko/monitors/types/outlier/?tab=dbscan
[8]: /ko/monitors/guide/monitor-arithmetic-and-sparse-metrics
[9]: /ko/monitors/types/log/
[10]: /ko/monitors/types/event/
[11]: /ko/monitors/types/audit_trail/
[12]: /ko/monitors/types/error_tracking/?tab=count
[13]: /ko/monitors/guide/custom_schedules/?tab=day
[14]: /ko/help/