---
aliases:
- /ko/graphing/widgets/distribution/
description: 하나 이상의 태그에서 집계된 메트릭 디스트리뷰션을 그래프화하세요.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
kind: 설명서
title: 디스트리뷰션 위젯
---

디스트리뷰션 시각화는 *호스트*와 같은 하나 이상의 태그에서 집계된 데이터를 보여줍니다. [히트 맵][1]과 달리 디스트리뷰션 그래프의 x축은 시간이 아니라 양을 나타냅니다.

이 시각화는 단일 쿼리만 표시하며, 추가 쿼리는 무시됩니다.

**참고**: 이 시각화에서는 아웃라이어 감지를 수행할 수 없습니다.

{{< img src="dashboards/widgets/distribution/distribution.png" alt="디스트리뷰션 그래프">}}

## 구성

{{< img src="dashboards/widgets/distribution/distribution_setup.png" alt="디스트리뷰션 그래프 편집기 보기" style="width:100%;">}}

### 설정

평소와 같이 쿼리를 구성하세요. 디스트리뷰션 시각화는 메트릭, 라이브 프로세스, APM 요청 레이턴시, 로그 이벤트 및 RUM 이벤트를 지원합니다. **참고**: 이 시각화 유형은 데이터가 태그 키들 간에 집계되는 경우(예: 각 [호스트]를 위해 집계된 경우)에만 유용합니다. "`avg`/`max`/`min`/`sum by`/etc." 컨트롤을 선택하여 연관된 태그에서 데이터를 볼 수 있도록 컨트롤하세요.

### 옵션

#### 표시 기본 설정

{{< img src="dashboards/widgets/options/display_preferences.png" alt="표시 기본 설정" style="width:80%;">}}

##### 글로벌 시간

스크린보드에만 해당: 위젯에 커스텀 기간이 있는지 또는 스크린보드의 글로벌 기간이 있는지 선택하세요.

#### 마커

APM 요청 디스트리뷰션을 사용하면 x축에 백분위수 마커들을 추가할 수 있습니다.

{{< img src="dashboards/widgets/options/distribution_marker_controls.jpg" alt="마커 컨트롤 기본 설정" style="width:80%;">}}

#### X축 및 Y축 컨트롤

축 컨트롤은 UI 및 JSON 편집기를 통해 사용할 수 있습니다.

축 컨트롤을 통해 다음을 수행할 수 있습니다:

* x축과 y축을 특정 범위로 자릅니다.
* 백분율 또는 절댓값 기준치에 따라 x축 범위를 자동으로 변경합니다. 이 기준치는 "아웃라이어" 빈들을 제거하기 위해 그래프의 한쪽 또는 양쪽 끝(하한 및 상한)에 적용할 수 있습니다.
* y축 스케일을 선형에서 로그로 변경하세요.

{{< img src="dashboards/widgets/options/distribution_axis_controls.jpg" alt="디스트리뷰션 축 컨트롤 기본 설정" style="width:80%;">}}

#### 타이틀

`Show a Title` 확인란을 활성화하여 위젯의 커스텀 타이틀을 표시하세요.

{{< img src="dashboards/widgets/options/title.png" alt="위젯 타이틀" style="width:80%;">}}

선택적으로 크기와 정렬을 정의할 수 있습니다.

## 전체 화면

[표준 전체 화면 옵션][2] 외에도 x축 컨트롤을 사용하여 특정 백분위수를 확대할 수 있습니다.

{{< img src="dashboards/widgets/distribution/distribution_fullscreen.png" alt="디스트리뷰션 전체 화면 그래프" style="width:80%;">}}


## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 더 많은 정보를 원하신다면 [Dashboards API documentation][3]를 참조하세요.

디스트리뷰션 위젯의 전용 [위젯 JSON 스키마 정의][4]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/widgets/heat_map/
[2]: /ko/dashboards/widgets/#full-screen
[3]: /ko/api/v1/dashboards/
[4]: /ko/dashboards/graphing_json/widget_json/