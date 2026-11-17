---
aliases:
- /ko/graphing/widgets/table/
description: 열, 행 및 정렬 기능을 사용하여 상세한 메트릭 및 이벤트 분석을 위한 표 형식 데이터를 표시합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /dashboards/querying/
  tag: 설명서
  text: 그래프화 쿼리 구축 방법 알아보기
- link: https://learn.datadoghq.com/courses/discovering-table-list-widgets
  tag: 학습 센터
  text: 표, 목록, SLO 및 아키텍처 위젯 목록 살펴보기
title: 표 위젯
widget_type: query_table
---
## 개요 {#overview}

테이블 시각화는 태그 키별로 그룹화하여 집계한 데이터 컬럼을 표시합니다. 표를 사용하여 여러 데이터 그룹 간의 값을 비교하고 추세, 변화 및 이상값을 확인합니다.

{{< img src="/dashboards/widgets/table/table_conditional_formatting.png" alt="조건부 서식이 적용된 표 위젯" style="width:100%;">}}

## 설정 {#setup}

### 구성 {#configuration}

1. 그래프로 표시할 데이터 선택:
    * 메트릭: 메트릭 쿼리를 설정하려면 [기본 그래프 가이드][1]를 참조하세요.
    * 비메트릭 데이터 소스: 이벤트 쿼리를 설정하려면 [로그 검색 문서][2]를 참조하세요.

2. {{< ui >}}\+ Add Query{{< /ui >}} 및 {{< ui >}}\+ Add Formula{{< /ui >}} 버튼을 사용하여 표에 열을 추가합니다.

### 옵션 {#options}

* 별칭을 설정하여 열 헤더의 이름을 변경하려면 {{< ui >}}as...{{< /ui >}} 버튼을 클릭합니다.
* 검색창 표시 여부를 설정합니다. {{< ui >}}Auto{{< /ui >}}는 기본값이며, 위젯 크기에 따라 검색창을 표시합니다. 즉 화면이 너무 작아지면 우선적으로 위젯에 데이터를 표시하고 검색창을 숨기지만, 전체 화면 모드에서 계속 사용할 수 있습니다.

#### 열 서식 지정 {#column-formatting}

열 서식 규칙을 사용하여 각 열의 셀 값 시각화를 사용자 지정합니다. 데이터에 대한 색상 코드를 생성하여 추세와 변화를 시각화합니다.
* 임계값 서식 지정: 특정 값 범위가 충족되면 색상으로 셀을 강조 표시합니다.
* 범위 서식 지정: 값 범위에 따라 셀 색상을 지정합니다.
* 텍스트 서식 지정: 가독성을 높이기 위해 셀을 별칭 텍스트 값으로 변경합니다.
* 추세 정보: 메트릭 및 이벤트 쿼리를 시각화합니다.

{{< img src="/dashboards/widgets/table/conditional_formatting_trends.png" alt="추세 표시기가 포함된 조건부 서식을 보여주는 표 위젯" style="width:100%;" >}}

#### 컨텍스트 링크 {#context-links}

[컨텍스트 링크][10]는 기본적으로 활성화되어 있으며, 켜거나 끌 수 있습니다. 컨텍스트 링크는 대시보드 위젯을 Datadog의 다른 페이지 또는 타사 애플리케이션과 연결합니다.

## N/A 값 {#na-values}

표 위젯의 열은 서로 독립적으로 쿼리됩니다. 이름이 일치하는 중첩 그룹은 실시간으로 결합되어 표의 행을 형성합니다. 그 과정의 결과로, 그룹이 전혀 겹치지 않아 N/A 셀이 표시되는 경우가 있을 수 있습니다. 이 문제를 완화하려면 다음을 수행하세요.
  * 열 간의 중첩을 최대화하려면 쿼리 한도를 더 높입니다.
  * 인사이트를 좌우한다고 볼 수 있는 하나의 열을 기준으로 표를 정렬합니다.

## API {#api}

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 자세한 내용은 [Dashboards API 설명서][8]를 참조하세요.

표 위젯의 전용 [위젯 JSON 스키마 정의][9]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/querying/#configuring-a-graph
[2]: /ko/logs/search_syntax/
[3]: /ko/tracing/trace_explorer/query_syntax/
[4]: /ko/real_user_monitoring/explorer/search_syntax
[5]: /ko/profiler/profile_visualizations
[6]: /ko/security_monitoring/explorer/
[7]: /ko/dashboards/guide/apm-stats-graph
[8]: /ko/api/latest/dashboards/
[9]: /ko/dashboards/graphing_json/widget_json/
[10]: /ko/dashboards/guide/context-links/
[11]: /ko/dashboards/querying/#advanced-graphing