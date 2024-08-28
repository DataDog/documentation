---
aliases:
- /ko/graphing/widgets/top_list/
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /notebooks/
  tag: 설명서
  text: 노트북
- link: /dashboards/guide/context-links/#overview/
  tag: 설명서
  text: 컨텍스트 링크
title: 상위 목록 위젯
widget_type: toplist
---

상위 목록을 표시하면 태그 값을 가장 높거나 낮은 메트릭 또는 이벤트 값으로 볼 수 있습니다. 예를 들어 CPU 사용량이 가장 높은 것, 디스크 공간이 가장 낮은 호스트, 또는 비용이 가장 높은 클라우드 제품 등을 확인할 수 있습니다.

## 설정

{{< img src="dashboards/widgets/toplist/top_list_graph_display.png" alt="Stacked, Relative, Formatting Rules 디스플레이 모드를 보여주는 그래프 디스플레이 옵션 구성" style="width:100%;" >}}

### 구성

1. 그래프화할 데이터를 선택합니다.
    * 메트릭: 메트릭 쿼리를 설정하려면 [쿼리][1] 가이드를 참조하세요.
    * 메트릭 데이터 외 소스: 이벤트 쿼리를 구성하려면 [트레이스 검색 설명서][2] 또는 [로그 검색 설명서][3]를 참고하세요.

2. 선택 사항: 추가 [그래프 디스플레이](#graph-display) 구성을 참고하세요.

### 옵션

#### 그래프 디스플레이

상위 목록 가시화에 컨텍스트를 추가할 수 있는 디스플레이 모드를 구성할 수 있는 선택 옵션이 있습니다.

* 쿼리 각 차원의 상세 내역을 보여주기 위해 여러 그룹을 스택된 형태로 표시합니다. **Stacked**가 기본값입니다. **Flat**으로 전환할 수 있습니다.
* **Relative** 디스플레이 모드를 선택하면 전체 백분율 값을 표시하고 **Absolute** 디스플레이 모드를 선택하면 쿼리 중인 데이터의 원시 개수를 보여줍니다.
  **참고**: Relative 디스플레이는 개수를 셀 수 있는 데이터에만 적용됩니다(예: 개수 메트릭 또는 로그 이벤트).
* 항목 값에 따라 **Visual Formatting Rules** 조건 형식을 구성합니다.

#### 컨텍스트 링크

기본값으로 [컨텍스트 링크][4]가 활성화되어 있고 활성화 및 비활성화로 토글할 수 있습니다. 컨텍스트 링크로 대시보드 위젯과 Datadog의 다른 페이지나 타사 애플리케이션를 연결할 수 있습니다.

#### 글로벌 시간

스크린보드 및 노트북에서 위젯에 커스텀 시간 프레임이 있는지 또는 글로벌 시간 프레임을 사용하는지를 선택하세요.

## API

이 위젯을 **[Dashboards API][5]**와 사용할 수 있습니다. [위젯 JSON 스키마 정의][6]를 보려면 다음 표를 참고하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/querying/
[2]: /ko/tracing/trace_explorer/query_syntax/#search-bar
[3]: /ko/logs/search_syntax/
[4]: /ko/dashboards/guide/context-links
[5]: /ko/api/latest/dashboards/
[6]: /ko/dashboards/graphing_json/widget_json/