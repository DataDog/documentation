---
aliases:
- /ko/graphing/widgets/distribution/
description: 하나 이상의 태그에서 집계된 메트릭 디스트리뷰션을 그래프화하세요.
further_reading:
- link: /metrics/distributions/
  tag: 설명서
  text: 디스트리뷰션
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /dashboards/graphing_json/widget_json/
  tag: 설명서
  text: 위젯 JSON 스키마
- link: /dashboards/graphing_json/request_json/
  tag: 설명서
  text: JSON 스키마 요청
- link: /dashboards/querying/
  tag: 설명서
  text: 쿼리
title: 디스트리뷰션 위젯
widget_type: 디스트리뷰션
---

디스트리뷰션 시각화는 *호스트*와 같은 하나 이상의 태그에서 집계된 데이터를 보여줍니다. [히트맵][1]과 달리 디스트리뷰션 그래프의 x축은 시간이 아니라 양을 나타냅니다.

이 시각화는 단일 쿼리만 표시하며, 추가 쿼리는 무시됩니다.

**참고**: 이 시각화에서는 아웃라이어 감지를 수행할 수 없습니다.

{{< img src="/dashboards/widgets/distribution/distribution_fullscreen.png" alt="호스트별 JVM 힙(heap) 평균 디스트리뷰션 그래프">}}

## 설정

### 설정

1. 그래프로 표시할 데이터를 선택합니다. 디스트리뷰션 시각화는 메트릭, 실시간 프로세스, 애플리케이션 성능 모니터링(APM) 요청 레이턴시, 로그 이벤트, RUM 이벤트를 지원합니다.
**참고**: 이 시각화 유형은 데이터가 태그 키 전체에서 집계되는 경우(예: 각 `host`에 대해 집계되는 경우)에만 유용합니다.
1. "`avg`/`max`/`min`/`sum by`/" 컨트롤에서 선택하여 연관 태그에서 데이터를 확인하세요.
1. 사용 가능한 옵션으로 그래프를 사용자 설정합니다.

### 옵션

#### 백분위수 마커

APM 요청 디스트리뷰션을 사용하면 x축에 백분위수 마커를 추가할 수 있습니다.

{{< img src="dashboards/widgets/options/distribution_marker_controls.jpg" alt="마커 컨트롤 기본 설정" style="width:80%;">}}

#### X축 및 Y축 컨트롤

축 컨트롤은 UI 및 JSON 편집기에서 사용할 수 있습니다.

축 컨트롤을 통해 다음을 수행할 수 있습니다:

* x축과 y축을 특정 범위로 자릅니다.
* 백분위수 또는 절대 임계값에 따라 x축 범위를 자동으로 변경합니다. 해당 임계값은 "아웃라이어" 빈(bin)을 제거하기 위해 그래프의 한쪽 또는 양쪽 끝(하한 및 상한)에 적용할 수 있습니다.
* y축 스케일을 선형에서 로그로 변경하세요.

{{< img src="dashboards/widgets/options/distribution_axis_controls.jpg" alt="디스트리뷰션 축 컨트롤 기본 설정" style="width:80%;">}}

### 전체 화면

[표준 전체 화면 옵션][2] 외에도 x축 컨트롤을 사용하여 특정 백분위수를 확대할 수 있습니다.

## API

해당 위젯은 **[대시보드 API][3]**와 함께 사용할 수 있습니다.  [위젯 JSON 스키마 정의][4]에 대해서는 다음 표를 참조하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/widgets/heatmap/
[2]: /ko/dashboards/widgets/#full-screen
[3]: /ko/api/latest/dashboards/
[4]: /ko/dashboards/graphing_json/widget_json/