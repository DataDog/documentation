---
description: 하나 이상의 데이터세트 비율을 그래프화합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /dashboards/widgets/treemap/
  tag: 설명서
  text: 트리맵 위젯
kind: 설명서
title: 파이 차트 위젯
---

파이 차트 위젯은 해당 비율이 있는 단일 데이터세트 또는 중첩된 비율이 있는 여러 데이터세트를 표시할 수 있습니다.

{{< img src="dashboards/widgets/pie_chart/pie_chart_overview.png" alt="파이 차트 위젯. 가장 안쪽 고리는 사용자의 국가를 나타내고 가장 바깥쪽 고리는 각 국가에서 사용되는 브라우저의 점유율을 표시하기 위해 비례적으로 분할됩니다." style="width:60%;">}}


## 설정

1. 메트릭 또는 이벤트에서 하나 이상의 데이터 소스를 선택합니다.
    * 메트릭: 메트릭 쿼리를 설정하려면 [쿼리][1] 가이드를 참조하세요.
    * 이벤트: 로그 이벤트 쿼리를 설정하려면 [로그 검색][2] 가이드를 참조하세요.
2. (선택 사항) [수식][3]으로 쿼리를 수정합니다.
3. 그래프를 맞춤 설정합니다.

## 그래프 맞춤 설정

### 총량 표시

차트 중앙에 총 개수를 표시할지 여부를 선택합니다. 기본적으로 **Automatic** 옵션은 그래프가 특정 크기에 도달하면 총 개수를 표시합니다.

### 범례 구성

범례를 끄고 **Aside** 옵션을 사용하여 차트 세그먼트 바로 위에 표시하거나 각 값, 색상 및 비율을 나열하는 **표**로 표시할 수 있습니다.

기본적으로 **Automatic** 옵션은 대시보드 내에서 라벨이 지정된 어사이드 범례를 표시하고 전체 화면에서 열 때 **Aside** 및 **Table** 범례를 모두 표시합니다.

{{< img src="dashboards/widgets/pie_chart/legend_automatic.png" alt="파이 차트 범례 및 라벨 지정 옵션: Automatic, Table, Aside 및 None" style="width:80%;">}}

### 컨텍스트 링크

[컨텍스트 링크][4]는 기본적으로 활성화되어 있으며, 켜거나 끌 수 있습니다. 컨텍스트는 대시보드 위젯을 다른 페이지(Datadog 또는 제3자)와 연결합니다.

## 표시 및 상호 작용

### 필터링 및 초점

여러 데이터 그룹이 한 번에 표시되는 경우 단일 범주를 선택하고 그 내에서 비율을 볼 수 있습니다.

단일 범주를 보려면 해당 범주 고리의 외부 부분을 마우스로 가리키고 클릭합니다. 이전 보기로 돌아가려면 커서를 차트 중앙으로 이동하고 클릭합니다.

{{< img src="dashboards/widgets/pie_chart/interaction_animation.mp4" alt="단일 범주를 필터링하고 초점을 맞추는 파이 차트 상호 작용의 애니메이션" video="true" style="width:80%;">}}

### 전체 화면

파이 차트 위젯을 전체 화면으로 보면 [전체 화면 옵션][5]의 표준 세트가 나타납니다.

## API

이 위젯은 [Dashboards API][6]와 함께 사용할 수 있습니다.

## 트리맵 위젯

파이 차트 위젯과 마찬가지로 [트리맵][7]도 중첩된 비율을 표시하는 데 사용할 수 있습니다. 둘의 주요 차이점은 파이 차트는 방사형 조각으로 비율을 표시하고, 트리맵은 중첩된 사각형을 표시한다는 것입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/dashboards/querying
[2]: /kr/logs/explorer/search_syntax/
[3]: /kr/dashboards/functions/
[4]: /kr/dashboards/guide/context-links/
[5]: /kr/dashboards/widgets/#full-screen
[6]: /kr/api/latest/dashboards/
[7]: /kr/dashboards/widgets/treemap/