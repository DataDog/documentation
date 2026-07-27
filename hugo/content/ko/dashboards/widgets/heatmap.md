---
aliases:
- /ko/graphing/widgets/heat_map/
- /ko/dashboards/widgets/heat_map/
description: 주어진 메트릭의 시간 히트 맵을 구축합니다.
further_reading:
- link: /product_analytics/heatmaps/
  tag: 설명서
  text: Heatmap에 대해 자세히 알아보기
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: https://www.datadoghq.com/blog/visualize-behavior-datadog-heatmaps/
  tag: 블로그
  text: Datadog Heatmap으로 사용자 행동 시각화
title: Heatmap 위젯
widget_type: 히트 맵
---

{{< img src="dashboards/widgets/heatmap/heatmap.png" alt="Heatmap 그래프 시각화 예시" style="width:100%;">}}

Heatmap 위젯은 다중 태그로 집계한 메트릭을 보여줍니다. Heatmap 위젯으로 OpenTelemetry 히스토그램, 분포 메트릭, 고해상도 및 데이터 디스플레이를 시각화합니다.

## 설정

### 설정

평소처럼 메트릭 쿼리를 설정합니다. '카운터' 히스토그램 모드로 OpenTelemetry 히스토그램을 그래프화합니다.

"`avg`/`max`/`min`/`sum by`/etc."에서부터 선택하여 연관된 태그에서 데이터를 볼 수 있도록 컨트롤하세요.

### 옵션

#### Y축 컨트롤

Y축 컨트롤은 UI 및 JSON 편집기에서 사용할 수 있습니다.

축 컨트롤을 이용해 다음을 할 수 있습니다.

* Y축을 특정 범위로 자릅니다.
* 절대 임계값에 따라 y축 범위를 자동으로 변경합니다. 해당 임계값은 "아웃라이어" 계열을 제거하기 위해 그래프의 한쪽 또는 양쪽 끝(하한 및 상한)에 적용할 수 있습니다.
* Y축 스케일을 선형에서 log, pow 또는 sqrt로 변경합니다.

*Y-Axis Controls* 버튼을 확장하여 Y축 스케일을 변경하세요.

다음 설정 옵션을 사용할 수 있습니다.

| 옵션                | 필수 | 설명                                                                                                                                                                                                       |
|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`/`Max`           | 아니요       | y축에 표시할 최솟값 및/또는 최댓값을 지정하세요. 이것은 숫자 또는 `Auto`를 기본값으로 사용합니다.                                                                                                   |
| `Scale`               | 아니요       | 스케일 유형을 지정합니다. 가능한 값: <br>-*linear*: 선형 스케일(기본값) <br>-*log*: 로그 스케일 <br>-*pow*: 2의 거듭제곱 스케일(2는 기본값, JSON에서 수정) <br>-*sqrt*: 제곱근 척도 |
| `Always include zero` | 아니요       | 항상 0을 포함하거나 축을 데이터 범위에 맞추세요. 기본값은 항상 0을 포함하는 것입니다.                                                                                                                     |

**참고**: 수학적 로그 함수는 음수 값을 허용하지 않기 때문에 Datadog 로그 스케일은 값이 동일한 부호(모두 > 0 또는 모두 < 0)인 경우에만 작동합니다. 그렇지 않으면 빈 그래프가 반환됩니다.

## API

이 위젯은 **[대시보드 API][2]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][3]에 대한 다음 표를 참조하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/events/explorer/#search-syntax
[2]: /ko/api/latest/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/