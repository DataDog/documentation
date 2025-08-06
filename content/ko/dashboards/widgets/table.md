---
aliases:
- /ko/graphing/widgets/table/
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /dashboards/querying/
  tag: 설명서
  text: 그래프화 쿼리 구축 방법 알아보기
title: 표 위젯
widget_type: query_table
---

## 개요

테이블 시각화는 태그 키별로 그룹화하여 집계한 데이터의 열을 표시합니다. 테이블로 여러 데이터 그룹에서 값을 비교하고 트렌드, 변경 사항, 이상치를 확인할 수 있습니다.

{{< img src="/dashboards/widgets/table/table_conditional_formatting.png" alt="조건부 서식이 적용된 테이블 위젯" style="width:100%;">}}

## 설정

### 설정

1. 그래프화할 데이터를 선택합니다.
    * 메트릭: 메트릭 쿼리를 설정하려면 [기본 그래프 가이드][1]를 참조하세요.
    * 비메트릭 데이터 소스: 이벤트 쿼리를 설정하려면 [로그 검색 문서][2]를 참조하세요.

2. **+ Add Query** 및 **+ Add Formula** 버튼을 사용하여 표에 추가 열을 추가합니다.

### 옵션

* 별칭을 설정하여 열 헤더의 이름을 바꾸고 **as...** 버튼을 클릭합니다.
* 검색창 표시 여부를 설정합니다. **Auto**는 기본값이며, 위젯 크기에 따라 검색창을 표시합니다. 즉 화면이 너무 작아지면 우선적으로 위젯에 데이터를 표시하고 검색창을 숨기지만, 전체 화면 모드에서 계속 사용할 수 있습니다.

#### 열 서식 지정

열 서식 지정 규칙으로 각 열의 셀 값 시각화를 사용자 지정합니다. 데이터에 상응하는 색상 코드를 생성하여 트렌드와 변화를 시각화합니다.
* 임계값 서식 지정: 특정 값 범위가 충족되면 색상으로 셀을 강조 표시합니다.
* 범위 서식 지정: 값 범위에 따라 코드 셀 색상을 지정합니다.
* 텍스트 서식 지정: 가독성을 높이기 위해 셀을 별칭 텍스트 값으로 변경합니다.
* Trending information: vizualize metrics and events queries.

{{< img src="/dashboards/widgets/table/conditional_formatting_trends.png" alt="Table widget showing conditional formatting with trend indicators" style="width:100%;" >}}

#### 컨텍스트 링크

기본값으로 [컨텍스트 링크][10]가 활성화되어 있으며, 활성화 및 비활성화로 토글할 수 있습니다. 컨텍스트 링크로 대시보드 위젯과 Datadog의 다른 페이지나 타사 애플리케이션를 연결할 수 있습니다.

## N/A 값

표 위젯의 열은 서로 독립적으로 쿼리됩니다. 이름이 일치하는 오버래핑 그룹은 실시간으로 결합되어 표의 행을 형성합니다. 그 프로세스의 결과로 전체 오버랩이 없고 N/A 셀이 표시되는 상황이 일어날 수 있습니다. 이를 완화하는 방법은 다음과 같습니다.
  * 쿼리 한도를 더 높은 숫자로 높여 열 간의 오버랩을 최대화합니다.
  * 내 인사이트에 '중심'이 되는 하나의 열에 맞추어 테이블을 정렬합니다.

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 자세한 내용은 [대시보드 API 가이드][8]를 참조하세요.

표 위젯의 전용 [위젯 JSON 스키마 정의][9]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

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