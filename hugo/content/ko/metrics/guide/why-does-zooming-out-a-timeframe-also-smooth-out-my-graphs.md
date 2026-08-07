---
aliases:
- /ko/graphing/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs
- /ko/dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs
further_reading:
- link: /metrics/types/
  tag: 설명서
  text: Datadog 메트릭 유형 알아보기
- link: /dashboards/functions/rollup/
  tag: 설명서
  text: 롤업 기능에 대해 자세히 알아보기
title: 기간을 늘리면 그래프가 더 평탄해지는 이유가 무엇인가요?
---

Datadog 내에서 그래프는 정해진 수의 포인트만 포함할 수 있으며, 메트릭에 기간이 길어질수록 포인트 간 집계로 인해 포인트 수가 정의된 수 이하로 유지됩니다. 따라서 기간이 길어질수록 세분화가 줄어들게 됩니다. 예를 들어, 4시간 동안의 데이터는 선 그래프의 경우 1분에 하나의 값, 막대 그래프의 경우 2분에 하나의 값으로 집계됩니다. 더 긴 기간을 선택하여 축소하면 그래프에 표시되는 데이터가 더 긴 기간을 나타냅니다.

{{< img src="metrics/guide/smooth_line.mp4" alt="선 그래프 평활화" video="true" width="90%" >}}

막대가 표시되면 반영 간격이 더 명확해집니다.

{{< img src="metrics/guide/smoothing.mp4" alt="막대 그래프 평활화하기" 비디오="true" width="90%" >}}

쿼리에 `.rollup()` 기능을 수동으로 추가하여 시간 집계 방법과 세분화를 조정할 수 있습니다. Datadog는 기본적으로 데이터 포인트를 자동으로 반영하여 `GAUGE`, `RATE` 및 `COUNT` 메트릭 유형에 반영 간격의 값을 평균화합니다.

**참고**: Datadog 위젯 UI를 통해 메트릭을 쿼리하면 [애플리케이션 내 메트릭 유형 수정자][1]가 `RATE` 및 `COUNT` 메트릭 유형에 자동으로 추가됩니다. 이렇게 하면 `.rollup()` 동작이 변경되어 보간 없이 값이 합산됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/custom_metrics/type_modifiers/