---
aliases:
- /ko/graphing/widgets/treemap/
description: 하나 이상의 데이터세트의 그래프 비율
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /dashboards/widgets/pie_chart/
  tag: 설명서
  text: 파이 차트 위젯
title: 트리맵 위젯
---

트리맵 위젯을 사용하면 하나 이상의 데이터세트의 비율을 표시할 수 있습니다. 이 위젯은 해당 비율의 단일 데이터세트 또는 중첩된 비율의 여러 데이터세트를 표시할 수 있습니다.

{{< img src="dashboards/widgets/treemap/treemap_overview.png" alt="실제 사용자 모니터링(RUM) 데이터세트에서 파생된 고유 페이지 보기가 포함된 트리맵 위젯이 국가 및 브라우저 수준 모두에 표시됩니다. 색상으로 구분되는 외부 그룹은 사용자의 국가를 보여줍니다.">}}

## 설정

1. 메트릭 또는 이벤트에서 하나 이상의 데이터 소스를 선택합니다.
    * 메트릭: 메트릭 쿼리를 구성하려면 [쿼리][1] 가이드를 참조하세요.
    * 이벤트: 로그 이벤트 쿼리를 설정하려면 [로그 검색][2] 가이드를 참조하세요.
2. (선택 사항) [수식][3]으로 쿼리를 수정합니다.
3. 그래프를 맞춤 설정합니다.

## 맞춤 설정

### 컨텍스트 링크

[컨텍스트 링크][4]는 기본적으로 활성화되어 있으며, 켜거나 끌 수 있습니다. 컨텍스트는 대시보드 위젯을 다른 페이지(Datadog 또는 제3자)와 연결합니다.

## 표시 및 상호 작용

### 필터링 및 초점

여러 데이터 그룹이 한 번에 표시되는 경우 장치를 단일 범주로 필터링하고 그 안에 있는 비율을 볼 수 있습니다.

단일 범주를 필터링하고 초점을 맞추려면 해당 범주의 바깥 부분을 마우스로 가리키고 클릭합니다. 이전 보기로 돌아가려면 위젯의 왼쪽 상단 헤더에 있는 **back** 버튼을 클릭하세요.

{{< img src="dashboards/widgets/treemap/focus_animation.mp4" alt="트리맵 위젯에서 한 번에 하나의 범주를 필터링하고 보는 방법을 보여주는 애니메이션." video="true">}}

### 컨텍스트 메뉴에 액세스

컨텍스트 메뉴에 액세스하려면 먼저 개별 범주 위로 마우스를 가져가세요. 이는 다음 예에서 **Canada** 또는 **Canada > Chrome**과 같은 중첩된 범주 또는 그룹일 수 있습니다. 이후 오른쪽 상단 모서리에 수직 줄임표 버튼이 나타납니다. 클릭하면 컨텍스트 메뉴가 나타납니다.

{{< img src="dashboards/widgets/treemap/context_menu.png" alt="해당 범주 위로 마우스를 가져가면 삼중 줄임표 버튼이 나타납니다.">}}

### 전체 화면

전체 화면에서 트리맵 위젯을 보면 [전체 화면 옵션][5]의 표준 세트가 나타납니다.

## API

이 위젯은 [Dashboards API][6]와 함께 사용할 수 있습니다.

트리맵 위젯의 전용 [위젯 JSON 스키마 정의][7]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 파이 차트 위젯

트리맵 위젯과 마찬가지로 [파이 차트 위젯][8]도 중첩된 비율을 표시하는 데 사용할 수 있습니다. 둘의 주요 차이점은 파이 차트는 방사형 조각으로 비율을 표시하고, 트리맵은 중첩된 사각형을 표시한다는 것입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/querying
[2]: /ko/logs/explorer/search_syntax/
[3]: /ko/dashboards/functions/
[4]: /ko/dashboards/guide/context-links/
[5]: /ko/dashboards/widgets/#full-screen
[6]: /ko/api/latest/dashboards/
[7]: /ko/dashboards/graphing_json/widget_json/
[8]: /ko/dashboards/widgets/pie_chart/