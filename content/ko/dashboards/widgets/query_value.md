---
aliases:
- /ko/graphing/widgets/query_value/
description: 주어진 메트릭 쿼리에 대해 집계된 값 표시
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 쿼리 값 위젯
---

쿼리 값은 주어진 메트릭, APM 또는 로그 쿼리의 현재 값을 표시합니다. 해당 값이 예상 범위에 있는지 여부를 나타내기 위해 조건부 서식(예: 녹색/노란색/빨간색 배경)이 제공됩니다. 이는 시계열 데이터의 부수적인 배경으로 보완될 수 있습니다. 쿼리 값으로 표시되는 값은 즉각적인 측정이 필요하지 않습니다.

위젯은 보고된 최신 값 또는 해당 기간에 걸친 모든 쿼리 값에서 계산된 집계 결과를 표시할 수 있습니다. 이러한 시각화는 인프라스트럭처 쿼리를 보여주는, 협소하지만 명확한 창을 제공합니다.

{{< img src="dashboards/widgets/query_value/query_value1.png" alt="쿼리 값 위젯" style="width:80%;" >}}

## 구성

{{< img src="dashboards/widgets/query_value/query-value-widget-setup1.png" alt="쿼리 값 위젯 구성" style="width:80%;">}}

### 설정

1. 그래프화할 데이터를 선택합니다.
    * 메트릭: 메트릭 쿼리를 구성하려면 [쿼리 가이드][1]를 참조하세요.
    * 인덱싱된 스팬: 인덱싱된 스팬 쿼리를 구성하려면 [Trace search documentation][2]을 참조하세요.
    * 로그 이벤트: 로그 이벤트 쿼리를 구성하려면 [Log search documentation][3]을 참조하세요.
2. 쿼리 값을 지정된 시간 프레임에 속하는 모든 데이터 요소의 `avg`, `min`, `sum`, `max` 또는 `last` 값으로 계산되는 단일 값으로 줄입니다.
3. 단위와 형식을 선택합니다. 자동 형식은 단위에 따라 대시보드를 확장합니다.
4. (선택 사항) 표시된 값에 따라 조건부 형식을 설정합니다.
5. (선택 사항) 다음과 같이 시계열 배경을 오버레이합니다.
    * Min to Max: 하한에서 상한을 보여주는 확장 그래프.
    * Line: 영(0)을 포함하는 확장 그래프.
    * Bars: 불연속적이고 주기적인 측정 값을 표시.

### 옵션

#### 글로벌 시간

스크린보드에만 해당: 위젯에 커스텀 타임프레임이 있는지 또는 스크린보드의 글로벌 타임프레임이 있는지 선택하세요.

#### 타이틀

`Show a Title` 확인란을 활성화하여 위젯의 커스텀 타이틀을 표시하세요.

{{< img src="dashboards/widgets/options/title.png" alt="위젯 타이틀" style="width:80%;">}}

선택적으로 크기와 정렬을 정의할 수 있습니다.

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 더 많은 정보를 원하신다면 [대시보드 API 가이드][4]를 참조하세요.

쿼리 값 위젯의 전용 [위젯 JSON 스키마 정의][5]는 다음과 같습니다.

{{< dashboards-widgets-api >}}



{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/querying/#overview
[2]: /ko/tracing/app_analytics/search/#search-bar
[3]: /ko/logs/search_syntax/
[4]: /ko/api/v1/dashboards/
[5]: /ko/dashboards/graphing_json/widget_json/